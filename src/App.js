/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Menu from "./Header";
import Footer from "./Footer";
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

class App extends React.Component {
  constructor(props) {
    super(props);
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
    Notiflix.Loading.Init({
      svgColor: "#507dc0",

    });

    Notiflix.Loading.Dots("Please wait...");

    GetApiCall.getRequest("GetFoodHomePageWebsite").then((results) => {
      results
        .json()
        .then((data) => ({
          data: data,
          status: results.status,
        }))
        .then((res) => {


          var dtar = [...res.data.data];
          for (var i = 0; i < Object.keys(res.data.data).length; i++) {

            if (res.data.data[i].Variant != null) {
              dtar[i].SelectedVar = res.data.data[i].Variant.split("^")[0];
            } else {
             
            }
          }
          console.log(dtar)
          this.setState({
            Food: dtar,
          });
        });
    });

    GetApiCall.getRequest("GetFootwearHomePageWebsite").then((results) => {
      results
        .json()
        .then((data) => ({
          data: data,
          status: results.status,
        }))
        .then((res) => {
 

          this.setState({
            Footwear: res.data.data,
          });
        });
    });

    GetApiCall.getRequest("GetSocksHomePageWebsite").then((results) => {
      results
        .json()
        .then((data) => ({
          data: data,
          status: results.status,
        }))
        .then((res) => {
      

          this.setState({
            Socks: res.data.data,
          });
        });
    });

    GetApiCall.getRequest("GetBlogNine").then((resultdes) =>
      resultdes.json().then((obj) => {


        if (JSON.stringify(obj.data) != "[]") {
          var arr = [];
          for (var i = 0; i < 4; i++) {
            arr.push(obj.data[i]);

            this.setState({
              Blog: arr,
            });
          }
        }

        Notiflix.Loading.Remove();
      })
    );
  }

  truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  onDocDetailsView(doc) {
    window.location.href = `/doctor/${
      doc.fld_id +
      "-" +
      doc.fld_name
        .replace(/ /g, "-")
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
    }`;
  }

  onDietDetailsView(doc) {
    window.location.href = `/dietitian/${
      doc.fld_id +
      "-" +
      doc.fld_name
        .replace(/ /g, "-")
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
    }`;
  }

  onBlogView(blog) {
    window.location.href = `/healthknowledge/${blog.fld_category.replace(
      / /g,
      "-"
    )}/${
      (blog.fld_subcategory != "" && blog.fld_subcategory != null
        ? blog.fld_subcategory.replace(/ /g, "-")
        : moment(blog.fld_publishdate).format("ll")) + "/"
    }${
      blog.fld_id +
      "-" +
      blog.fld_title
        .replace(/ /g, "-")
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
    }`;
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
      <div className="App">
        <div class="page-wrapper">
          <Menu></Menu>

         
          <main class="main">
            <section class="">
                <div class="container ">
                  <div class="mobile-search-bar">
                  <div class="row">
                    <div class="col-md-10 col-10">
                        <input type="text" class="form-control" placeholder="Search"></input>
                    </div>
                    <div class="col-md-2 col-2">
                        <button class="search-button-mobile"><i class="icon-magnifier"></i></button>
                      </div>
                  </div>
                  </div>
                </div>
            </section>
            <div class="container">
              <div class="home-slider-container d-none d-sm-none d-md-block">
                <div class="home-slider owl-carousel owl-theme owl-theme-light">
                  <div class="home-slide">
                    <div
                      class="slide-bg owl-lazy img-fluid"
                      data-src="assets/images/home-banners/bms_external-01.jpg"
                      alt="BeatMysugar Banner"
                    ></div>
                   
                  </div>

                  <div class="home-slide">
                    <div
                      class="slide-bg owl-lazy img-fluid"
                      data-src="assets/images/home-banners/bms_external-02.jpg"
                      alt="BeatMysugar Banner"
                    ></div>
                   
                  </div>
                  <div class="home-slide">
                    <div
                      class="slide-bg owl-lazy img-fluid"
                      data-src="assets/images/home-banners/bms_external-03.jpg"
                      alt="BeatMysugar Banner"
                    ></div>
                    
                  </div>

                  <div class="home-slide">
                    <div
                      class="slide-bg owl-lazy img-fluid"
                      data-src="assets/images/home-banners/bms_external-04.jpg"
                      alt="BeatMysugar Banner"
                    ></div>
                    
                  </div>

                  <div class="home-slide">
                    <div
                      class="slide-bg owl-lazy img-fluid"
                      data-src="assets/images/home-banners/bms_external-05.jpg"
                      alt="BeatMysugar Banner"
                    ></div>
                    
                  </div>
                  <div class="home-slide">
                    <div
                      class="slide-bg owl-lazy img-fluid"
                      data-src="assets/images/home-banners/bms_external-06.jpg"
                      alt="BeatMysugar Banner"
                    ></div>
                    
                  </div>
                </div>
              </div>

              <div class="home-slider-container d-md-none d-sm-block">
                <div class="home-slider owl-carousel owl-theme owl-theme-light">
                  <div class="home-slide">
                    <div
                      class="slide-bg owl-lazy"
                      data-src="assets/images/home-banners/mobile-banners/BMS_Home_Page_Mobile1.jpg"
                      alt="BeatMysugar Banner"
                    ></div>
                    
                  </div>

                  <div class="home-slide">
                    <div
                      class="slide-bg owl-lazy"
                      data-src="assets/images/home-banners/mobile-banners/BMS_Home_Page_Mobile2.jpg"
                      alt="BeatMysugar Banner"
                    ></div>
                   
                  </div>
                  <div class="home-slide">
                    <div
                      class="slide-bg owl-lazy"
                      data-src="assets/images/home-banners/mobile-banners/BMS_Home_Page_Mobile3.jpg"
                      alt="BeatMysugar Banner"
                    ></div>
                    
                  </div>

                  <div class="home-slide">
                    <div
                      class="slide-bg owl-lazy"
                      data-src="assets/images/home-banners/mobile-banners/BMS_Home_Page_Mobile4.jpg"
                      alt="BeatMysugar Banner"
                    ></div>
                    
                  </div>

                  <div class="home-slide">
                    <div
                      class="slide-bg owl-lazy"
                      data-src="assets/images/home-banners/mobile-banners/BMS_Home_Page_Mobile5.jpg"
                      alt="BeatMysugar Banner"
                    ></div>
                   
                  </div>
                  <div class="home-slide">
                    <div
                      class="slide-bg owl-lazy"
                      data-src="assets/images/home-banners/mobile-banners/BMS_Home_Page_Mobile6.jpg"
                      alt="BeatMysugar Banner"
                    ></div>
                    
                  </div>
                </div>
              </div>
            </div>

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
                                alt="Food & Supplements"
                                class="book-image"
                                src={
                                  info.SelectedVar.split("@")[0].split("$")[1]
                                }
                                onClick={() => {
                                  window.location.href = `/food/${
                                    info.fld_category.replace(
                                      /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                      "-"
                                    ) +'/'+
                                    info.fld_id +
                                    "/" +
                                    info.SelectedVar.split("#")[7].split(
                                      "$"
                                    )[0] +
                                    "/" +
                                    info.fld_name
                                      .replace(/ /g, "-")
                                      .replace(/\//g, "-")
                                      .replace(
                                        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                        "-"
                                      )
                                  }`;
                                }}
                              />

                              <div class="product-details">
                                <p class="product-title ">
                                  <a
                                    onClick={() => {
                                      window.location.href = `/food/${
                                        info.fld_category.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,) +'/'+
                                        info.fld_id +
                                        "/" +
                                        info.SelectedVar.split("#")[7].split(
                                          "$"
                                        )[0] +
                                        "/" +
                                        info.fld_name
                                          .replace(/ /g, "-")
                                          .replace(/\//g, "-")
                                          .replace(
                                            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                            "-"
                                          )
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

            <div class="container blog-section">
              <h3 class="section-title margin-bottom">Footwear</h3>
              <div>
       
              </div>
              <div class="row healthcare-slider">
                <div class="col-md-12">
                  <div class="row">
                    <ul class="related-products-list">
                      <Slider {...settings}>
                        {this.state.Footwear.map((info, index) => (
                          <li>
                            <div class="partner product-inner ">
                              <div
                                id="overlay"
                                style={{
                                  display:
                                    info.fld_availability == "In stock"
                                      ? "none"
                                      : "",
                                }}
                              >
                                Out Of Stock
                              </div>

                              <img
                                src={info.Photos.split(",")[0]}
                                alt="Footwear"
                                class="footcare-image img-center"
                                onClick={() => {
                                  window.location.href = `/footwear/${
                                    info.fld_footid +
                                    "/" +
                                    info.fld_id +
                                    "/" +
                                    info.fld_name
                                      .replace(/ /g, "-")
                                      .replace(/\//g, "-")
                                      .replace(
                                        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                        "-"
                                      )
                                  }`;
                                }}
                              />

                              <div class="product-details">
                                <p class="product-title">
                                  <a
                                    onClick={() => {
                                      window.location.href = `/footwear/${
                                        info.fld_footid +
                                        "/" +
                                        info.fld_id +
                                        "/" +
                                        info.fld_name
                                          .replace(/ /g, "-")
                                          .replace(/\//g, "-")
                                          .replace(
                                            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                            "-"
                                          )
                                      }`;
                                    }}
                                    class="item-name"
                                  >
                                    {info.fld_name}
                                  </a>
                                </p>
                                <p class="small-desc item-name">
                                  <span
                                    style={{
                                      color: "#222222",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Brand:
                                  </span>{" "}
                                  {info.fld_brand}
                                </p>
                      
                                <p class="discount-height">
                                  {info.fld_discountpercent == 0 ? (
                                    <p class="price">
                                      &#8377; {info.fld_discountprice}
                                    </p>
                                  ) : (
                                    <p class="price">
                                      &#8377; {info.fld_discountprice}{" "}
                                      <span>
                                        <s>&#8377; {info.fld_price}</s>
                                      </span>
                                    </p>
                                  )}
                                  {info.fld_discountpercent == 0 ? (
                                    ""
                                  ) : (
                                    <p class="discount-price">
                                      {" "}
                                      You Save &#8377;{" "}
                                      {info.fld_price -
                                        info.fld_discountprice}{" "}
                                      ({info.fld_discountpercent}%)
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
                                      this.AddToCartFootwear(info)
                             
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
                                  
                                              variant_id: info.fld_id,
                                              product_category: "Footwear",
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

            <div class="container blog-section">
              <h3 class="section-title margin-bottom">Socks</h3>
              <div>
             
              </div>
              <div class="row healthcare-slider">
                <div class="col-md-12">
                  <div class="row">
                    <ul class="related-products-list">
                      <Slider {...settings}>
                        {this.state.Socks.map((info, index) => (
                          <li>
                            <div class="partner product-inner ">
                              <div
                                id="overlay"
                                style={{
                                  display:
                                    info.fld_availability == "In stock"
                                      ? "none"
                                      : "",
                                }}
                              >
                                Out Of Stock
                              </div>

                              <img
                                src={info.Photos.split(",")[0]}
                                alt="Socks"
                                class="footcare-image img-center"
                                onClick={() => {
                                  window.location.href = `/socks/${
                                    info.fld_socksid +
                                    "/" +
                                    info.fld_id +
                                    "/" +
                                    info.fld_name
                                      .replace(/ /g, "-")
                                      .replace(/\//g, "-")
                                      .replace(
                                        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                        "-"
                                      )
                                  }`;
                                }}
                              />

                              <div class="product-details">
                                <p class="product-title">
                                  <a
                                    onClick={() => {
                                      window.location.href = `/socks/${
                                        info.fld_socksid +
                                        "/" +
                                        info.fld_id +
                                        "/" +
                                        info.fld_name
                                          .replace(/ /g, "-")
                                          .replace(/\//g, "-")
                                          .replace(
                                            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                            "-"
                                          )
                                      }`;
                                    }}
                                    class="item-name"
                                  >
                                    {info.fld_name}
                                  </a>
                                </p>
                                <p class="small-desc item-name">
                                  <span
                                    style={{
                                      color: "#222222",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Brand:
                                  </span>{" "}
                                  {info.fld_brand}
                                </p>
                         
                                <p class="discount-height">
                                  {info.fld_discountpercent == 0 ? (
                                    <p class="price">
                                      &#8377; {info.fld_discountprice}
                                    </p>
                                  ) : (
                                    <p class="price">
                                      &#8377; {info.fld_discountprice}{" "}
                                      <span>
                                        <s>&#8377; {info.fld_price}</s>
                                      </span>
                                    </p>
                                  )}
                                  {info.fld_discountpercent == 0 ? (
                                    ""
                                  ) : (
                                    <p class="discount-price">
                                      {" "}
                                      You Save &#8377;{" "}
                                      {info.fld_price -
                                        info.fld_discountprice}{" "}
                                      ({info.fld_discountpercent}% )
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
                                       this.AddToCartSocks(info)
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
                                   
                                              variant_id: info.fld_id,
                                              product_category: "Socks",
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

            <div class="container blog-section">
              <h3 class="section-title margin-bottom">Health Knowledge</h3>
              <div>
                <a href="/healthknowledge" class="view-all-btn">
                  View More
                </a>
              </div>
              <div class="row">
                {this.state.Blog.map((blog, index) => (
                  <div class="col-md-4 col-lg-3 col-sm-4">
                    <div class="blog-box">
                      <img
                        alt="Blog"
                        onClick={() => {
                          this.onBlogView(blog);
                        }}
                        src={blog.fld_previewimage}
                      />

                   
                      <div class="content-box">
                        <a
                          onClick={() => {
                            this.onBlogView(blog);
                          }}
                        >
                          <h3 style={{ overflow: "hidden" }}>
                            {blog.fld_title}
                          </h3>
                        </a>
                        <p class="name-title">
                          <span>By</span> {blog.fld_writtenby}
                        </p>
                        <p class="border-btm blog-desc-short">
                          {Parser(
                            ("<p>" + blog.fld_shortdescription + "</p>")
                              .replace(/font-family/g, "")
                              .replace(/color/g, "")
                          )}
                        </p>
                        <ul
                          class="comments-list"
                          style={{ marginBottom: "0px", paddingLeft: "0px" }}
                        >
                          <li>
                            <p class="date">
                              {moment(blog.fld_publishdate).format("ll")}
                            </p>
                          </li>
                          <li>
                            <i class="fas fa-thumbs-up"></i>{" "}
                            {blog.fld_likecount}
                          </li>
                          <li>
                            <i class="fas fa-comments"></i>{" "}
                            {blog.fld_commentcount}
                          </li>
                          <li class="blog-btn">
                            <a
                              class="read-more-btn-blog"
                              style={{ color: "#1b65a9" }}
                              onClick={() => {
                                this.onBlogView(blog);
                              }}
                            >
                              Read More
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          

            <div class="clearfix"></div>

            

           

            <div class="container margin-top"></div>
          </main>
        

          <Footer></Footer>
        </div>
      </div>
    );
  }

AddToCartFood(info){

   var log = localStorage.getItem(
                                          "CustomerLoginDetails"
                                        );
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
                                              url : `/food/${info.fld_id +"/" +info.SelectedVar.split("#")[7].split("$")[0] +"/" +info.fld_name
                                                  .replace(/ /g, "-")
                                                  .replace(/\//g, "-")
                                                  .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
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
                                                  info.fld_name
                                                    .replace(/ /g, "-")
                                                    .replace(/\//g, "-")
                                                    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
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
                                                info.fld_name
                                                  .replace(/ /g, "-")
                                                  .replace(/\//g, "-")
                                                  .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
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



AddToCartFootwear(info){


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
                                             product_category: "Footwear",
                                             quantity: 1,
                                             amount: info.fld_discountprice,
                                             updated_on: moment().format("lll"),
                                             updated_by: login.fld_userid,
                                             url : `/footwear/${ info.fld_footid +"/" +info.fld_id +"/" +info.fld_name
                                                .replace(/ /g, "-")
                                                .replace(/\//g, "-")
                                                .replace(
                                                  /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                                  "-"
                                                )
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

                                      
                                          var item = newCart.filter(val => val.fld_variantid == info.fld_id && val.fld_productcategory == 'Footwear')

                                   
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
                                              fld_variantid : info.fld_id,
                                              fld_productcategory : 'Footwear',
                                              fld_quantity : 1,
                                              fld_amount : info.fld_discountprice,
                                              fld_addedon : moment().format('lll'),
                                              fld_url : `/footwear/${
                                                info.fld_footid +
                                                "/" +
                                                info.fld_id +
                                                "/" +
                                                info.fld_name
                                                  .replace(/ /g, "-")
                                                  .replace(/\//g, "-")
                                                  .replace(
                                                    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                                    "-"
                                                  )
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
                                            fld_productcategory : 'Footwear',
                                            fld_quantity : 1,
                                            fld_amount : info.fld_discountprice,
                                            fld_addedon : moment().format('lll'),
                                            fld_url : `/footwear/${
                                              info.fld_footid +
                                              "/" +
                                              info.fld_id +
                                              "/" +
                                              info.fld_name
                                                .replace(/ /g, "-")
                                                .replace(/\//g, "-")
                                                .replace(
                                                  /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                                  "-"
                                                )
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
                                             product_category: "Socks",
                                             quantity: 1,
                                             amount: info.fld_discountprice,
                                             updated_on: moment().format("lll"),
                                             updated_by: login.fld_userid,
                                             url : `/socks/${info.fld_socksid +"/" +info.fld_id +"/" +info.fld_name
                                                .replace(/ /g, "-")
                                                .replace(/\//g, "-")
                                                .replace(
                                                  /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                                  "-"
                                                )
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

                                      
                                          var item = newCart.filter(val => val.fld_variantid == info.fld_id && val.fld_productcategory == 'Socks')

                                
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
                                              fld_variantid : info.fld_id,
                                              fld_productcategory : 'Socks',
                                              fld_quantity : 1,
                                              fld_amount : info.fld_discountprice,
                                              fld_addedon : moment().format('lll'),
                                              fld_url :`/socks/${
                                                info.fld_socksid +
                                                "/" +
                                                info.fld_id +
                                                "/" +
                                                info.fld_name
                                                  .replace(/ /g, "-")
                                                  .replace(/\//g, "-")
                                                  .replace(
                                                    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                                    "-"
                                                  )
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
                                            fld_productcategory : 'Socks',
                                            fld_quantity : 1,
                                            fld_amount : info.fld_discountprice,
                                            fld_addedon : moment().format('lll'),
                                            fld_url :`/socks/${
                                              info.fld_socksid +
                                              "/" +
                                              info.fld_id +
                                              "/" +
                                              info.fld_name
                                                .replace(/ /g, "-")
                                                .replace(/\//g, "-")
                                                .replace(
                                                  /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                                  "-"
                                                )
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
)(App);

