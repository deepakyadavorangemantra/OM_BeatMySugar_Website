import React, { Component } from 'react'
import GetApiCall from "./GetApi";
import Parser from "html-react-parser";
import Notiflix from "notiflix-react";
import moment from "moment";
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";
import PostApiCall from "./Api";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { connect } from "react-redux";
import { 
  setcartitemcount,
  setcartamount
} from "./Actions/actionType";

class AccessoriesHP extends Component {
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
  
    GetApiCall.getRequest("GetAccessoriesHomePageWebsite").then((results) => {
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
  
    
            this.setState({
  
              ProductData: obj.data,
            
              
            });
        
          
          Notiflix.Loading.Remove(); 
        }
    })});

  
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
        <h3 class="section-title margin-bottom">Accessories</h3>
            <div>
            </div>
            <div class="row healthcare-slider ">
              <div class="col-md-12">
                <div class="row">
                  <ul class="related-products-list home-page">
                    <Slider {...settings}>
                      {this.state.ProductData.map((info, index) => (
                        <li>
                        
                        <div class="partner product-inner ">
                    <div id="overlay" style={{display : info.fld_availability =='In stock' ? 'none' : ''}}>Out Of Stock</div>

                    <img
                      src={info.Photos.split(',')[0]}
                      alt="product"
                      class="footcare-image img-center"
                      onClick={()=>{
                        window.location.href = `/accessories/${info.fld_accessoriesid+"/"+info.fld_id+"/"+info.fld_name.replace(/\W|_/g,"")}`
                      }}
                    />

                    <div class="product-details">
                      <p class="product-title">
                        <a 
                        onClick={()=>{
                          window.location.href = `/accessories/${info.fld_accessoriesid+"/"+info.fld_id+"/"+info.fld_name.replace(/\W|_/g,"")}`
                        }}
                        class="item-name">
                          {info.fld_name}
                        </a>
                      </p>
                      <p class="small-desc item-name"><span style={{color:"#222222",fontWeight:"600"}}>Brand:</span> {info.fld_brand}</p>
                      {/* <p>
                      <p class="price"> &#8377;{foot.fld_productprice}</p>
                      <p class="extrapheight"></p>
                    </p> */}
                      <p class="discount-height">
                      {info.fld_discountpercent == 0 ? 
    
    <p class="price">
      
    &#8377; {info.fld_discountprice}
    
  </p>
    :
      <p class="price">
      
        &#8377; {info.fld_discountprice}
        {" "}<span>
          <s>&#8377;  {info.fld_price}</s>
        </span>
        
      </p>
  }

                        {info.fld_discountpercent == 0 ? '' :
      <p class="discount-price">  You Save &#8377; {info.fld_price - info.fld_discountprice} ({info.fld_discountpercent}%)</p>
    }
                      </p>

                      <p class="brief-desc"></p>
                      <ul class="group-buttons">

                         <li style={{display : info.fld_availability =='In stock' ? '' : 'none'}}>
                          {" "}
                          <button class="add-to-cart-btn"
                          
                          onClick={()=>{
                     
                            this.AddToCartAccessories(info)
                        }}
        

                          >
                            <i class="fas fa-shopping-cart"></i> ADD TO CART
                          </button>
                        </li>

                      
                        <li>
                          <button
                            onClick={()=>{
                              var log = localStorage.getItem('CustomerLoginDetails')
                              var login = JSON.parse(log)
                      
                      
                              if(login != null && login != ''){
                      
                                  Notiflix.Loading.Dots('');
                      
                                  PostApiCall.postRequest({
                          
                                      customer_id : login.fld_userid,
                                      // customer_id : 13,
                                      variant_id : info.fld_id,
                                      product_category : 'Accessories',
                                      quantity :1,
                                     updated_on : moment().format('lll'),
                                     updated_by : login.fld_userid
                                  // updated_by :13
                                  
                                  },"AddWishlist").then((results) => 
                                  
                                    // const objs = JSON.parse(result._bodyText)
                                    results.json().then(obj => {
                         
                                  
                                    if(results.status == 200 || results.status==201){
                      
                                      
                                      Notiflix.Loading.Remove()
                                      Notiflix.Notify.Info('Product added to Wishlist.')
                                      // window.location.reload()
                                     
                         
                                    }else{
                                      Notiflix.Loading.Remove()
                                      Notiflix.Notify.Failure('Something went wrong, try again later.') 
                                    }
                         
                                 }))
                      
                              }else{
                              // console.log('please login first')
                                  Notiflix.Notify.Failure('Please Login to add products to your wishlist.')
                              }
                      
                          }}
                          
                          class="like-btn">
                        
                            <i class="fas fa-heart"></i>
                          </button>{" "}
                        </li>

                          


                    


                        {/* <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li> */}
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

    AddToCartAccessories(info){


        var log = localStorage.getItem(
                                               "CustomerLoginDetails"
                                             );
                                             var login = JSON.parse(log);
      
                                             if (login != null && login != "") {
                                               Notiflix.Loading.Dots("");
      
                                               PostApiCall.postRequest(
                                                 {
                                                   customer_id: login.fld_userid,
                                                   variant_id: info.fld_id,
                                                   product_category: "Accessories",
                                                   quantity: 1,
                                                   amount: info.fld_discountprice,
                                                   updated_on: moment().format("lll"),
                                                   updated_by: login.fld_userid,
                                                   url : `/accessories/${ info.fld_accessoriesid +"/" +info.fld_id +"/" +info.fld_name.replace(/\W|_/g,"")
                                                  }`
                                                   // updated_by :13
                                                 },
                                                 "AddShoppingCart"
                                               ).then((results) =>
                                                 // const objs = JSON.parse(result._bodyText)
                                                 results.json().then((obj) => {
                                                   if (
                                                     results.status == 200 ||
                                                     results.status == 201
                                                   ) {
                                                     Notiflix.Loading.Remove();
      
      
      
                                                     Notiflix.Notify.Info(
                                                       "Product added to Cart."
                                                     );
                                                     // window.location.reload();
      
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
      
                                              // console.log(cart_info)
                                              var newCart = cart_info != null ? cart_info : []
      
                                              if(cart_info != null){
      
                                            
                                                var item = newCart.filter(val => val.fld_variantid == info.fld_id && val.fld_productcategory == 'Footwear')
      
                                                // console.log(item)
                                                if(item[0] != undefined){
      
                                                  var newIndex = newCart.indexOf(item[0])
      
                                                  newCart[newIndex].fld_quantity =  newCart[newIndex].fld_quantity + 1
      
                                                  // console.log(newCart)
      
                                                  localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                    this.props.setcartitemcount(newCart.length)
                                                    this.props.setcartamount(newCart.reduce(function (result, item) {
                                                      return result + (item.fld_amount*item.fld_quantity);
                                                    }, 0))
                                                  Notiflix.Notify.Info("Product added to Cart.");
      
                                                  
      
                                                }else{
      
                                                  const addNewCartData ={
                                                    fld_variantid : info.fld_id,
                                                    fld_productcategory : 'Accessories',
                                                    fld_quantity : 1,
                                                    fld_amount : info.fld_discountprice,
                                                    fld_addedon : moment().format('lll'),
                                                    fld_url : `/accessories/${
                                                      info.fld_accessoriesid +
                                                      "/" +
                                                      info.fld_id +
                                                      "/" +
                                                      info.fld_name.replace(/\W|_/g,"")
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
                                                  fld_variantid : info.fld_id,
                                                  fld_productcategory : 'Accessories',
                                                  fld_quantity : 1,
                                                  fld_amount : info.fld_discountprice,
                                                  fld_addedon : moment().format('lll'),
                                                  fld_url : `/accessories/${
                                                    info.fld_accessoriesid +
                                                    "/" +
                                                    info.fld_id +
                                                    "/" +
                                                    info.fld_name.replace(/\W|_/g,"")
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
)(AccessoriesHP)
