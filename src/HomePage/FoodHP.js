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

class FoodHP extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            Device: [],
            Foot: [],
            Book: [],
            activeItemIndex: 0,
            Blog: [],
            Doctor: [],
            DoctorRef: [],
            Nutri: [],
      
            Food: [],
            Footwear: [],
            Socks: [],
          };
    }

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

    componentDidMount() {
    //   Notiflix.Loading.Init({
    //     svgColor: "#507dc0",
    //   });
  
    //   Notiflix.Loading.Dots("Please wait...");
  
      GetApiCall.getRequest("GetFoodHomePageWebsite").then((results) => {
        results
          .json()
          .then((data) => ({
            data: data,
            status: results.status,
          }))
          .then((res) => {
            //   console.log(res.data.data)
  
            var dtar = [...res.data.data];
            for (var i = 0; i < Object.keys(res.data.data).length; i++) {
              // console.log(dtar[i])
              if (res.data.data[i].Variant != null) {
                dtar[i].SelectedVar = res.data.data[i].Variant.split("^")[0];
              } else {
                //   dtar.splice(dtar[i])
              }
            }
            console.log(dtar)
            this.setState({
              Food: dtar,
            });
          });
      });
  
    }
    
    AddToCartFood(info){

        var log = localStorage.getItem("CustomerLoginDetails");
                    var login = JSON.parse(log);                                          
     
                                             if (login != null && login != "") {
                                               Notiflix.Loading.Dots("");
     
                                               PostApiCall.postRequest(
                                                 {
                                                   customer_id: login.fld_userid,
                                                   variant_id: info.SelectedVar.split("#")[7].split("$")[0],
                                                   product_category: "Food",
                                                   quantity: 1,
                                                   amount: info.SelectedVar.split("#")[3],
                                                   updated_on: moment().format("lll"),
                                                   updated_by: login.fld_userid,
                                                   url : `/food/${info.fld_id +"/" +info.SelectedVar.split("#")[7].split("$")[0] +"/" +info.fld_name.replace(/\W|_/g,"")
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
                                                 var item = newCart.filter(val => val.fld_variantid == info.SelectedVar.split("#")[7].split('$')[0] && val.fld_productcategory == 'Food')
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
                                                     fld_variantid : info.SelectedVar.split("#")[7].split('$')[0],
                                                     fld_productcategory : 'Food',
                                                     fld_quantity : 1,
                                                     fld_amount : info.SelectedVar.split("#")[3],
                                                     fld_addedon : moment().format('lll'),
                                                     fld_url : `/food/${
                                                       info.fld_id +
                                                       "/" +
                                                       info.SelectedVar.split("#")[7].split("$")[0] +
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
                                                   fld_variantid : info.SelectedVar.split("#")[7].split('$')[0],
                                                   fld_productcategory : 'Food',
                                                   fld_quantity : 1,
                                                   fld_amount : info.SelectedVar.split("#")[3],
                                                   fld_addedon : moment().format('lll'),
                                                   fld_url : `/food/${
                                                     info.fld_id +
                                                     "/" +
                                                     info.SelectedVar.split("#")[7].split("$")[0] +
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
            <h3 class="section-title margin-bottom">Food & Supplements</h3>
            <div>
            </div>
            <div class="row healthcare-slider ">
              <div class="col-md-12">
                <div class="row">
                  <ul class="related-products-list home-page">
                    <Slider {...settings}>
                      {this.state.Food.map((info, index) => (
                        <li>
                          <div class="partner product-inner">
                            <div
                              id="overlay"
                              style={{
                                display:
                                  info.SelectedVar.split("#")[6] == "In stock"
                                    ? "none"
                                    : "",
                              }}
                            >
                              Out Of Stock
                            </div>

                            <img
                              class="book-image"
                              src={
                                info.SelectedVar.split("@")[0].split("$")[1]
                              }
                              onClick={() => {
                                // console.log(info)
                                window.location.href = `/food/${
                                  info.fld_category.replace(/\W|_/g,"") +'/'+
                                  info.fld_id +
                                  "/" +
                                  info.SelectedVar.split("#")[7].split(
                                    "$"
                                  )[0] +
                                  "/" +
                                  info.fld_name.replace(/\W|_/g,"")
                                }`;
                              }}
                            />

                            <div class="product-details">
                              <p class="product-title ">
                                <a
                                  onClick={() => {
                                    window.location.href = `/food/${
                                      info.fld_category.replace(/\W|_/g,"") +'/'+
                                      info.fld_id +
                                      "/" +
                                      info.SelectedVar.split("#")[7].split(
                                        "$"
                                      )[0] +
                                      "/" +
                                      info.fld_name.replace(/\W|_/g,"")
                                    }`;
                                  }}
                                >
                                  {info.SelectedVar.split("#")[0]}
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
                                  {info.fld_brand}{" "}
                                </p>
                                {info.VariantDropDown == "" ||
                                info.VariantDropDown == null ||
                                info.VariantDropDown == "NULL" ? (
                                  ""
                                ) : (
                                  <select
                                    id="cars"
                                    name="cars"
                                    onChange={(dt) => {
                                      var dr = [...this.state.Food];
                                      for (
                                        var i = 0;
                                        i < info.Variant.split("^").length;
                                        i++
                                      ) {
                                        if (
                                          dt.target.value ==
                                          info.Variant.split("^")[i].split(
                                            "#"
                                          )[1] +
                                            " " +
                                            info.Variant.split("^")[i].split(
                                              "#"
                                            )[2] +
                                            " - ₹" +
                                            info.Variant.split("^")[i].split(
                                              "#"
                                            )[3]
                                        ) {
                                          dr[
                                            index
                                          ].SelectedVar = info.Variant.split(
                                            "^"
                                          )[i];
                                        }
                                      }

                                      this.setState({
                                        Food: dr,
                                      });
                                    }}
                                  >
                                    {info.VariantDropDown.split(",").map(
                                      (dt, i) => (
                                        <option value={dt}>{dt}</option>
                                      )
                                    )}
                                  </select>
                                )}
                              </p>

                              <p class="discount-height">
                                {info.SelectedVar.split("#")[5] == 0 ? (
                                  <p class="price">
                                    &#8377; {info.SelectedVar.split("#")[3]}
                                  </p>
                                ) : (
                                  <p class="price">
                                    &#8377; {info.SelectedVar.split("#")[3]}{" "}
                                    <span>
                                      <s>
                                        &#8377;{" "}
                                        {info.SelectedVar.split("#")[4]}
                                      </s>
                                    </span>
                                  </p>
                                )}

                                {info.SelectedVar.split("#")[5] == 0 ? (
                                  ""
                                ) : (
                                  <p class="discount-price">
                                    {" "}
                                    You Save &#8377;{" "}
                                    {parseFloat(
                                      info.SelectedVar.split("#")[4] -
                                        info.SelectedVar.split("#")[3]
                                    ).toFixed(2)}{" "}
                                    ({info.SelectedVar.split("#")[5]}% )
                                  </p>
                                )}
                              </p>

                              <p class="brief-desc"></p>
                              <ul class="group-buttons">
                                <li
                                  style={{
                                    display:
                                      info.SelectedVar.split("#")[6] ==
                                      "In stock"
                                        ? ""
                                        : "none",
                                  }}
                                >
                                  {" "}
                                  <button
                                    class="add-to-cart-btn"
                                    onClick={() => {
                                       this.AddToCartFood(info)

                                      
                                    }}
                                  >
                                    <i class="fas fa-shopping-cart"></i> ADD
                                    TO CART
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => {
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
                                            variant_id: info.SelectedVar.split(
                                              "#"
                                            )[7],
                                            product_category: "Food",
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
)(FoodHP)
