import React, { Component } from 'react'
import GetApiCall from "../GetApi";
import Parser from "html-react-parser";
import Notiflix from "notiflix-react";
import moment from "moment";
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";
import PostApiCall from "../Api";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { connect } from "react-redux";
import { 
  setcartitemcount,
  setcartamount
} from "../Actions/actionType";

class DiwaliOffersHP extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            ProductData: [],

            activeItemIndex: 0,
          
          };
    }

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

    componentDidMount() {
    //   Notiflix.Loading.Init({
    //     svgColor: "#507dc0",
    //   });
  
    //   Notiflix.Loading.Dots("Please wait...");
  
      GetApiCall.getRequest("GetFestiveOfferHomePageWebsite").then((results) => {
        results
          .json()
          .then((data) => ({
            data: data,
            status: results.status,
          }))
          .then((res) => {
              
            console.log(res.data.data)

              var prdt = [...res.data.data]
              var cn = 0
              var filt = []

              for(var i = 0; i < Object.keys(res.data.data).length; i++){

                if(res.data.data[i].fld_category == 'Food'){

                  PostApiCall.postRequest(
                    {
                     id: res.data.data[i].fld_productid,
                    },
                    "GetFestiveFoodVariantDetails"
     
                  ).then((results) =>
         
                    results.json().then((obj) => {
        
                      if (results.status == 200 || results.status == 201 ) {

                        

                        filt = prdt.filter(val => val.fld_productid == obj.data[0].fld_id && val.fld_category == 'Food')

                        // console.log(obj.data)
                       
                        prdt[prdt.indexOf(filt[0])].ProdInfo = obj.data[0]

                        cn++
                        if(cn == Object.keys(res.data.data).length){

                          this.setState({
                            ProductData : prdt
                          })
                          
                        }
                       
                      }
                    }))

                }else if(res.data.data[i].fld_category == 'Footwear'){

                  PostApiCall.postRequest(
                    {
                     id: res.data.data[i].fld_productid,
                    },
                    "GetFestiveFootwearVariantDetails"
     
                  ).then((results) =>
         
                    results.json().then((obj) => {
        
                      if (results.status == 200 || results.status == 201 ) {

                        filt = prdt.filter(val => val.fld_productid == obj.data[0].fld_id && val.fld_category == 'Footwear')

                        // console.log(filt)

                        prdt[prdt.indexOf(filt[0])].ProdInfo = obj.data[0]

                        cn++
                        if(cn == Object.keys(res.data.data).length){

                          this.setState({
                            ProductData : prdt
                          })
                          
                        }
                       
                      }
                    }))

                }else{

                  PostApiCall.postRequest(
                    {
                     id: res.data.data[i].fld_productid,
                    },
                    "GetFestiveSocksVariantDetails"
     
                  ).then((results) =>
         
                    results.json().then((obj) => {
        
                      if (results.status == 200 || results.status == 201 ) {

                        filt = prdt.filter(val => val.fld_productid == obj.data[0].fld_id && val.fld_category == 'Socks')

                        prdt[prdt.indexOf(filt[0])].ProdInfo = obj.data[0]

                        cn++
                        if(cn == Object.keys(res.data.data).length){

                          this.setState({
                            ProductData : prdt
                          })
                          
                        }
                       
                      }
                    }))

                }

              }
  
            // var dtar = [...res.data.data];
            // for (var i = 0; i < Object.keys(res.data.data).length; i++) {
            //   // console.log(dtar[i])
            //   if (res.data.data[i].Variant != null) {
            //     dtar[i].SelectedVar = res.data.data[i].Variant.split("^")[0];
            //   } else {
            //     //   dtar.splice(dtar[i])
            //   }
            // }
            // console.log(dtar)
            // this.setState({
            //   Food: dtar,
            // });
          });
      });
  
    }
    

    OnProductClicked(info){
      console.log(info)
      if(info.fld_category == 'Food')
      {

        window.location.href = `/food/${
          info.ProdInfo.fld_category.replace(/\W|_/g,"") +'/'+
          info.ProdInfo.fld_foodid +
          "/" +
          info.ProdInfo.fld_id +
          "/" +
          info.ProdInfo.fld_name.replace(/\W|_/g,"")
        }`;

      }else if(info.fld_category == 'Footwear')
      {

        window.location.href = `/footwear/${
          info.ProdInfo.fld_footid +
          "/" +
          info.ProdInfo.fld_id +
          "/" +
          info.ProdInfo.fld_name.replace(/\W|_/g,"")
            
        }`;

      }else
      {
        window.location.href = `/socks/${
          info.ProdInfo.fld_socksid +
          "/" +
          info.ProdInfo.fld_id +
          "/" +
          info.ProdInfo.fld_name.replace(/\W|_/g,"")
        }`;
      }
     
    }

    AddToCartFootwear(info){


      var log = localStorage.getItem("CustomerLoginDetails");
                                           var login = JSON.parse(log);
                                           if (login != null && login != "") {
                                             Notiflix.Loading.Dots("");      
                                             PostApiCall.postRequest(
                                               {
                                                 customer_id: login.fld_userid,
                                                 variant_id: info.ProdInfo.fld_id,
                                                 product_category: "Footwear",
                                                 quantity: 1,
                                                 amount: info.ProdInfo.fld_discountprice,
                                                 updated_on: moment().format("lll"),
                                                 updated_by: login.fld_userid,
                                                 url : `/footwear/${ info.ProdInfo.fld_footid +"/" +info.ProdInfo.fld_id +"/" +info.ProdInfo.fld_name.replace(/\W|_/g,"")
                                                    
                                                }`
                                               },
                                               "AddShoppingCart"
                                             ).then((results) =>
                                               results.json().then((obj) => {
                                                 if (
                                                   results.status == 200 ||
                                                   results.status == 201
                                                 ) {
                                                   Notiflix.Loading.Remove();
                                                   Notiflix.Notify.Info(
                                                     "Product added to Cart."
                                                   );
                                                   this.props.setcartitemcount(obj.data.length)
                                                   this.props.setcartamount(obj.data.reduce(function (result, item) {
                                                     return result + (item.fld_amount*item.fld_quantity);
                                                   }, 0))
                                                 } else {
                                                   Notiflix.Loading.Remove();
                                                   Notiflix.Notify.Failure(
                                                     "Something went wrong, try again later."
                                                   );
                                                 }
                                               })
                                             );
                                           } else {
                                            var cart_info = JSON.parse(localStorage.getItem('BMSCartData'))
                                            var newCart = cart_info != null ? cart_info : []
                                            if(cart_info != null){
                                              var item = newCart.filter(val => val.fld_variantid == info.ProdInfo.fld_id && val.fld_productcategory == 'Footwear')
                                              if(item[0] != undefined){
                                                var newIndex = newCart.indexOf(item[0])
                                                newCart[newIndex].fld_quantity =  newCart[newIndex].fld_quantity + 1
                                                localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                  this.props.setcartitemcount(newCart.length)
                                                  this.props.setcartamount(newCart.reduce(function (result, item) {
                                                    return result + (item.fld_amount*item.fld_quantity);
                                                  }, 0))
                                                Notiflix.Notify.Info("Product added to Cart.");
                                              }else{
                                                const addNewCartData ={
                                                  fld_variantid : info.ProdInfo.fld_id,
                                                  fld_productcategory : 'Footwear',
                                                  fld_quantity : 1,
                                                  fld_amount : info.ProdInfo.fld_discountprice,
                                                  fld_addedon : moment().format('lll'),
                                                  fld_url : `/footwear/${
                                                    info.ProdInfo.fld_footid +
                                                    "/" +
                                                    info.ProdInfo.fld_id +
                                                    "/" +
                                                    info.ProdInfo.fld_name.replace(/\W|_/g,"")
                                                  }`
    
                                                }
    
                                                newCart.push(addNewCartData)
                                               
                                                localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                this.props.setcartitemcount(newCart.length)
                                                this.props.setcartamount(newCart.reduce(function (result, item) {
                                                  return result + (item.fld_amount*item.fld_quantity);
                                                }, 0))
                                                Notiflix.Notify.Info("Product added to Cart.");
    
                                              }
                                            }else
                                            {
    
                                              const addNewCartData ={
                                                fld_variantid : info.ProdInfo.fld_id,
                                                fld_productcategory : 'Footwear',
                                                fld_quantity : 1,
                                                fld_amount : info.ProdInfo.fld_discountprice,
                                                fld_addedon : moment().format('lll'),
                                                fld_url : `/footwear/${
                                                  info.ProdInfo.fld_footid +
                                                  "/" +
                                                  info.ProdInfo.fld_id +
                                                  "/" +
                                                  info.ProdInfo.fld_name.replace(/\W|_/g,"")
                                                }`
                                              }
    
                                              newCart.push(addNewCartData)
                                              localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                              this.props.setcartitemcount(newCart.length)
                                              this.props.setcartamount(newCart.reduce(function (result, item) {
                                                return result + (item.fld_amount*item.fld_quantity);
                                              }, 0))
                                                     Notiflix.Notify.Info("Product added to Cart.");
                                            }
                                          }
    }


    AddToCartSocks(info){


      var log = localStorage.getItem("CustomerLoginDetails");
                                           var login = JSON.parse(log);
                                          if (login != null && login != "") {
                                             Notiflix.Loading.Dots("");
                                              PostApiCall.postRequest(
                                               {
                                                 customer_id: login.fld_userid,
                                                 variant_id: info.ProdInfo.fld_id,
                                                 product_category: "Socks",
                                                 quantity: 1,
                                                 amount: info.ProdInfo.fld_discountprice,
                                                 updated_on: moment().format("lll"),
                                                 updated_by: login.fld_userid,
                                                 url : `/socks/${info.ProdInfo.fld_socksid +"/" +info.ProdInfo.fld_id +"/" +info.ProdInfo.fld_name.replace(/\W|_/g,"")
                                                }`
                                               },
                                               "AddShoppingCart"
                                             ).then((results) =>
                                               results.json().then((obj) => {
                                                 if (
                                                   results.status == 200 ||
                                                   results.status == 201
                                                 ) {
                                                   Notiflix.Loading.Remove();
                                                   Notiflix.Notify.Info(
                                                     "Product added to Cart."
                                                   );
    
                                                   this.props.setcartitemcount(obj.data.length)
                                                   this.props.setcartamount(obj.data.reduce(function (result, item) {
                                                     return result + (item.fld_amount*item.fld_quantity);
                                                   }, 0))
    
                                                 } else {
                                                   Notiflix.Loading.Remove();
                                                   Notiflix.Notify.Failure(
                                                     "Something went wrong, try again later."
                                                   );
                                                 }
                                               })
                                             );
                                           } else {
                                            var cart_info = JSON.parse(localStorage.getItem('BMSCartData'))
                                            var newCart = cart_info != null ? cart_info : []
                                            if(cart_info != null){
                                          
                                              var item = newCart.filter(val => val.fld_variantid == info.ProdInfo.fld_id && val.fld_productcategory == 'Socks')
                                              if(item[0] != undefined){
                                                var newIndex = newCart.indexOf(item[0])
                                                newCart[newIndex].fld_quantity =  newCart[newIndex].fld_quantity + 1
                                                localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                this.props.setcartitemcount(newCart.length)
                                                this.props.setcartamount(newCart.reduce(function (result, item) {
                                                  return result + (item.fld_amount*item.fld_quantity);
                                                }, 0))
                                                Notiflix.Notify.Info("Product added to Cart.");
                                              }else{
                                                const addNewCartData ={
                                                  fld_variantid : info.ProdInfo.fld_id,
                                                  fld_productcategory : 'Socks',
                                                  fld_quantity : 1,
                                                  fld_amount : info.ProdInfo.fld_discountprice,
                                                  fld_addedon : moment().format('lll'),
                                                  fld_url :`/socks/${
                                                    info.ProdInfo.fld_socksid +
                                                    "/" +
                                                    info.ProdInfo.fld_id +
                                                    "/" +
                                                    info.ProdInfo.fld_name.replace(/\W|_/g,"")
                                                  }`
    
                                                }
    
                                                newCart.push(addNewCartData)
                                                localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                this.props.setcartitemcount(newCart.length)
                                                this.props.setcartamount(newCart.reduce(function (result, item) {
                                                  return result + (item.fld_amount*item.fld_quantity);
                                                }, 0))
                                                Notiflix.Notify.Info("Product added to Cart.");
                                              }
                                            }else
                                            {
                                              const addNewCartData ={
                                                fld_variantid : info.ProdInfo.fld_id,
                                                fld_productcategory : 'Socks',
                                                fld_quantity : 1,
                                                fld_amount : info.ProdInfo.fld_discountprice,
                                                fld_addedon : moment().format('lll'),
                                                fld_url :`/socks/${
                                                  info.ProdInfo.fld_socksid +
                                                  "/" +
                                                  info.ProdInfo.fld_id +
                                                  "/" +
                                                  info.ProdInfo.fld_name.replace(/\W|_/g,"")
                                                }`
                                              }
                                              newCart.push(addNewCartData)
                                              localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                              this.props.setcartitemcount(newCart.length)
                                              this.props.setcartamount(newCart.reduce(function (result, item) {
                                                return result + (item.fld_amount*item.fld_quantity);
                                              }, 0))
                                                     Notiflix.Notify.Info("Product added to Cart.");
                                            }
                                           }
    
    }


    AddToCartFood(info){

      var log = localStorage.getItem("CustomerLoginDetails");
                  var login = JSON.parse(log);                                          
   
                                           if (login != null && login != "") {
                                             Notiflix.Loading.Dots("");
   
                                             PostApiCall.postRequest(
                                               {
                                                 customer_id: login.fld_userid,
                                                 variant_id: info.ProdInfo.fld_id,
                                                 product_category: "Food",
                                                 quantity: 1,
                                                 amount: info.ProdInfo.fld_discountprice,
                                                 updated_on: moment().format("lll"),
                                                 updated_by: login.fld_userid,
                                                 url : `/food/${info.ProdInfo.fld_foodid +"/" +info.ProdInfo.fld_id +"/" +info.ProdInfo.fld_name.replace(/\W|_/g,"")
                                                 }`
                                               },
                                               "AddShoppingCart"
                                             ).then((results) =>
                                               results.json().then((obj) => {
                                                 if (
                                                   results.status == 200 ||
                                                   results.status == 201
                                                 ) {
                                                   Notiflix.Loading.Remove();
                                                   Notiflix.Notify.Info(
                                                     "Product added to Cart."
                                                   );
                                                   console.log(obj.data)
                                                   this.props.setcartitemcount(obj.data.length)
                                                   this.props.setcartamount(obj.data.reduce(function (result, item) {
                                                     return result + (item.fld_amount*item.fld_quantity);
                                                   }, 0))
   
                                                 } else {
                                                   Notiflix.Loading.Remove();
                                                   Notiflix.Notify.Failure(
                                                     "Something went wrong, try again later."
                                                   );
                                                 }
                                               })
                                             );
                                           } else {
                                             var cart_info = JSON.parse(localStorage.getItem('BMSCartData'))
                                             var newCart = cart_info != null ? cart_info : []
                                             if(cart_info != null){
                                               var item = newCart.filter(val => val.fld_variantid == info.ProdInfo.fld_id && val.fld_productcategory == 'Food')
                                               if(item[0] != undefined){
                                                 var newIndex = newCart.indexOf(item[0])
                                                 newCart[newIndex].fld_quantity =  newCart[newIndex].fld_quantity + 1
                                                 localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                 this.props.setcartitemcount(newCart.length)
                                                 this.props.setcartamount(newCart.reduce(function (result, item) {
                                                   return result + (item.fld_amount*item.fld_quantity);
                                                 }, 0))
                                                 Notiflix.Notify.Info("Product added to Cart.");
     
                                               }else{
                                                 const addNewCartData ={
                                                   fld_variantid : info.ProdInfo.fld_id,
                                                   fld_productcategory : 'Food',
                                                   fld_quantity : 1,
                                                   fld_amount : info.ProdInfo.fld_discountprice,
                                                   fld_addedon : moment().format('lll'),
                                                   fld_url : `/food/${
                                                     info.ProdInfo.fld_foodid +
                                                     "/" +
                                                     info.ProdInfo.fld_id +
                                                     "/" +
                                                     info.ProdInfo.fld_name.replace(/\W|_/g,"")
                                                   }`
                                                 }
                                                 newCart.push(addNewCartData)
                                                 localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                 this.props.setcartitemcount(newCart.length)
                                                 this.props.setcartamount(newCart.reduce(function (result, item) {
                                                   return result + (item.fld_amount*item.fld_quantity);
                                                 }, 0))
                                                 Notiflix.Notify.Info("Product added to Cart.");
                                               }
                                             }else
                                             {
     
                                               const addNewCartData ={
                                                 fld_variantid : info.ProdInfo.fld_id,
                                                 fld_productcategory : 'Food',
                                                 fld_quantity : 1,
                                                 fld_amount : info.ProdInfo.fld_discountprice,
                                                 fld_addedon : moment().format('lll'),
                                                 fld_url : `/food/${
                                                   info.ProdInfo.fld_foodid +
                                                   "/" +
                                                   info.ProdInfo.fld_id +
                                                   "/" +
                                                   info.ProdInfo.fld_name.replace(/\W|_/g,"")
                                                 }`
     
                                               }
     
                                               newCart.push(addNewCartData)
                                           
                                               localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                               this.props.setcartitemcount(newCart.length)
                                               this.props.setcartamount(newCart.reduce(function (result, item) {
                                                 return result + (item.fld_amount*item.fld_quantity);
                                               }, 0))
                                                      Notiflix.Notify.Info("Product added to Cart.");
                                             }
                                           }
   
   }

    AddToCartDiwali(info){
      if(info.fld_category == 'Food'){

        this.AddToCartFood(info)
    
      }else if(info.fld_category == 'Footwear'){
    
        this.AddToCartFootwear(info)
      }else
      {
    this.AddToCartSocks(info)
      }
    }



  

    render() {
        const settings = {
            centerMode: false,
            centerPadding: "60px",
            dots: false,
            infinite: true,
            arrows: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [
              {
                breakpoint: 1250,
                settings: {
                  arrows: false,
                  centerMode: false,
                  centerPadding: "40px",
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: false,
                },
              },
              {
                breakpoint: 990,
                settings: {
                  arrows: false,
                  centerMode: false,
                  centerPadding: "40px",
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: false,
                },
              },
      
              {
                breakpoint: 740,
                settings: {
                  arrows: false,
                  centerMode: false,
                  centerPadding: "40px",
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 740,
                settings: {
                  arrows: false,
                  centerMode: false,
                  centerPadding: "40px",
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  arrows: false,
                  centerMode: false,
                  centerPadding: "40px",
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ],
          };


          
        return (
            <div>
            <div class="container blog-section">
        <h3 class="section-title margin-bottom">{this.state.ProductData[0] != undefined ? this.state.ProductData[0].fld_title : ''}</h3>
            <div>
            </div>
            <div class="row healthcare-slider ">
              <div class="col-md-12">
                <div class="row">
                  <ul class="related-products-list home-page">
                    <Slider {...settings}>
                      {this.state.ProductData.map((info, index) => (
                        <li>
                          <div class="partner product-inner">
                            <div
                              id="overlay"
                              style={{
                                display:
                                  info.ProdInfo.fld_availability == "In stock"
                                    ? "none"
                                    : "",
                              }}
                            >
                              Out Of Stock
                            </div>

                            <img
                              class="book-image"
                              src={info.ProdInfo.Photos.split("#")[0]}
                              onClick={() => {
                             this.OnProductClicked((info))
                              }}
                            />

                            <div class="product-details">
                              <p class="product-title ">
                                <a
                                  onClick={() => {
                                    this.OnProductClicked((info))
                                     }}
                                >
                                  {info.ProdInfo.fld_name}
                                </a>
                              </p>
                              <p>
                                <p class="small-desc item-name">
                                  <span
                                    style={{
                                      color: "#222222",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Brand:
                                  </span>{" "}
                                  {info.ProdInfo.fld_brand}{" "}
                                </p>
                                
                              </p>

                              <p class="discount-height">
                                {info.ProdInfo.fld_discountpercent == 0 ? (
                                  <p class="price">
                                    &#8377; {info.ProdInfo.fld_discountprice}
                                  </p>
                                ) : (
                                  <p class="price">
                                    &#8377; {info.ProdInfo.fld_discountprice}{" "}
                                    <span>
                                      <s>
                                        &#8377;{" "}
                                        {info.ProdInfo.fld_price}
                                      </s>
                                    </span>
                                  </p>
                                )}

                                {info.ProdInfo.fld_discountpercent == 0 ? (
                                  ""
                                ) : (
                                  <p class="discount-price">
                                    {" "}
                                    You Save &#8377;{" "}
                                    {parseFloat(
                                      info.ProdInfo.fld_price -
                                      info.ProdInfo.fld_discountprice
                                    ).toFixed(2)}{" "}
                                    ({info.ProdInfo.fld_discountpercent}% )
                                  </p>
                                )}
                              </p>

                              <p class="brief-desc"></p>
                              <ul class="group-buttons">
                                <li>
                                  {" "}
                                  <button
                                    class="add-to-cart-btn"
                                    onClick={() => {
                                    this.AddToCartDiwali(info)
                                      // va
                                    }}
                                  >
                                    <i class="fas fa-shopping-cart"></i> ADD
                                    TO CART
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => {

                                      this.AddToWishlistDiwali(info)
                                     
                                    }}
                                    class="like-btn"
                                  >
                                    <i class="fas fa-heart"></i>
                                  </button>{" "}
                                </li>
                              </ul>
                            
                             
                            </div>
                          </div>
                        </li>
                      ))}
                    </Slider>
                 
                 
                  </ul>
                </div>
              </div>
            </div>
          </div>

            </div>
            
        )
    }


    AddToWishlistDiwali(info){
      var log = localStorage.getItem(
        "CustomerLoginDetails"
      );
      var login = JSON.parse(log);

      if (login != null && login != "") {
        Notiflix.Loading.Dots("");

        PostApiCall.postRequest(
          {
            customer_id: login.fld_userid,
            // customer_id : 13,
            variant_id: info.ProdInfo.fld_id,
            product_category: info.fld_category ,
            quantity: 1,
            updated_on: moment().format(
              "lll"
            ),
            updated_by: login.fld_userid,

          },
          "AddWishlist"
        ).then((results) =>
          results.json().then((obj) => {
            if (
              results.status == 200 ||
              results.status == 201
            ) {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Info(
                "Product added to Wishlist."
              );
            } else {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure(
                "Something went wrong, try again later."
              );
            }
          })
        );
      } else {
        Notiflix.Notify.Failure(
          "Please Login to add products to your wishlist."
        );
      }
    }
}




function mapStateToProps(state) {
  return {
    CartReducer: state.CartReducer
  };
}

export default connect(
  mapStateToProps,
  {
    setcartitemcount,
    setcartamount
  }
)(DiwaliOffersHP)
