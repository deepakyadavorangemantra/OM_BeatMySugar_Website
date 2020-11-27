/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PostApiCall from "./Api";
import moment from "moment";
import LoginPage from "./LoginPage";
import GetApiCall from "./GetApi";
import Notiflix from "notiflix-react";
import Collapse from "@kunukn/react-collapse";

import { connect } from "react-redux";
import {
 
  setcartitemcount,
  setcartamount
} from "./Actions/actionType";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginData: [],
      CartItemCount: 0,
      CartValue: 0,
      Doctor: [],
      Nutritionists: [],

      HeaderText: "",
      CategorySelect: "All",
      SubTotal: 0,

      FoodCategory: [],

      SearchBarCategory: [],
      SearchSelectedCategory: "All",
      SearchText: "",
      
      OfferData : [],

      AccessoriesCategory : [],
      AccessoriesData : [],
      CovidCategory : []
    };
  }

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    });

    var login = localStorage.getItem("CustomerLoginDetails");
    var details = JSON.parse(login);

    this.setState({
      LoginData: details,
    });


    GetApiCall.getRequest("GetFestiveOfferHomePageWebsite").then((results) => {
      results
        .json()
        .then((data) => ({
          data: data,
          status: results.status,
        }))
        .then((res) => {
          // console.log(res.data.data)
          this.setState({
            OfferData : res.data.data
          })
        })
    });

    GetApiCall.getRequest("GetFoodCategoryWebsiteData").then((resultdes) =>
      resultdes.json().then((obj) => {
        // console.log(obj.data)
        this.setState({
          FoodCategory: obj.data,
        });

        GetApiCall.getRequest("GetAccessoriesCategoryWebsiteData").then((resultacc) =>
        resultacc.json().then((objacc) => {
          // console.log(obj.data)
          this.setState({
            AccessoriesCategory: objacc.data,
          });
        

          GetApiCall.getRequest("GetCovidCategoryWebsiteData").then((resultcov) =>
          resultcov.json().then((objcov) => {
            // console.log(obj.data)
            this.setState({
              CovidCategory: objcov.data,
            });


        var dts = [];
        dts.push({
          fld_category: "All",
          fld_id: 0,
          fld_status: "Active",
          fld_page: "search",
        });
        dts.push(...obj.data);
        dts.push({
          fld_category: "Footwear",
          fld_id: 0,
          fld_status: "Active",
          fld_page: "footwear",
        });
        dts.push({
          fld_category: "Socks",
          fld_id: 0,
          fld_status: "Active",
          fld_page: "socks",
        });
        dts.push(...objcov.data);
        dts.push(...objacc.data);
        dts.push({
          fld_category: "Health Knowledge",
          fld_id: 0,
          fld_status: "Active",
          fld_page: "healthknowledge",
        });
        // console.log(dts)
        this.setState({
          SearchBarCategory: dts,
          // SearchSelectedCategory : dts[0].fld_category
          // CategorySelected : obj.data[0].fld_category,
          // FoodRef : obj.data
        });
      }))
    }))
      })
    );



   

    this.getUpdatedCart();
  }

  getUpdatedCart() {
    var log = localStorage.getItem("CustomerLoginDetails");
    var login = JSON.parse(log);

    var count = 0 

    if (login != null && login != "") {


      var cart_info = JSON.parse(localStorage.getItem('BMSCartData'))

      var newCart = cart_info != null ? cart_info : []

      if(cart_info != null){


        for(var i = 0 ; i< newCart.length;i++){

          if(newCart[i].fld_productcategory == 'Food')
          {
          PostApiCall.postRequest(
            {
              customer_id: login.fld_userid,
              variant_id: newCart[i].fld_variantid,
              product_category: "Food",
              quantity: newCart[i].fld_quantity,
              amount: newCart[i].fld_amount,
              updated_on: moment().format("lll"),
              updated_by: login.fld_userid,
              url : newCart[i].fld_url
              // updated_by :13
            },
            "AddShoppingCart"
          // eslint-disable-next-line no-loop-func
          ).then((results) =>
            // const objs = JSON.parse(result._bodyText)
            results.json().then((obj) => {

              if (results.status == 200 || results.status == 201 ) {

                count = count + 1

                if(count == newCart.length)
                {
                  this.SyncCartData(login)
                }

              }else
              {
                count = count + 1

                if(count == newCart.length)
                {
                  this.SyncCartData(login)
                }

              }
            }))
          }
         else if(newCart[i].fld_productcategory == 'Footwear')
          {
          PostApiCall.postRequest(
            {
              customer_id: login.fld_userid,
              variant_id: newCart[i].fld_variantid,
              product_category: "Footwear",
              quantity: newCart[i].fld_quantity,
              amount: newCart[i].fld_amount,
              updated_on: moment().format("lll"),
              updated_by: login.fld_userid,
              url : newCart[i].fld_url
              // updated_by :13
            },
            "AddShoppingCart"
          ).then((results) =>
            // const objs = JSON.parse(result._bodyText)
            results.json().then((obj) => {

              if (results.status == 200 || results.status == 201 ) {
                count = count + 1

                if(count == newCart.length)
                {
                  this.SyncCartData(login)
                }

              }else
              {
                count = count + 1

                if(count == newCart.length)
                {
                  this.SyncCartData(login)
                }

              }
            }))
          }
         else if(newCart[i].fld_productcategory == 'Socks')
          {
          PostApiCall.postRequest(
            {
              customer_id: login.fld_userid,
              variant_id: newCart[i].fld_variantid,
              product_category: "Socks",
              quantity: newCart[i].fld_quantity,
              amount: newCart[i].fld_amount,
              updated_on: moment().format("lll"),
              updated_by: login.fld_userid,
              url : newCart[i].fld_url
              // updated_by :13
            },
            "AddShoppingCart"
          ).then((results) =>
            // const objs = JSON.parse(result._bodyText)
            results.json().then((obj) => {

              if (results.status == 200 || results.status == 201 ) {

                count = count + 1

                if(count == newCart.length)
                {
                  this.SyncCartData(login)
                }


              }else{
                count = count + 1

                if(count == newCart.length)
                {
                  this.SyncCartData(login)
                }

              }
            }))
          }
          else if(newCart[i].fld_productcategory == 'Accessories')
          {
          PostApiCall.postRequest(
            {
              customer_id: login.fld_userid,
              variant_id: newCart[i].fld_variantid,
              product_category: "Accessories",
              quantity: newCart[i].fld_quantity,
              amount: newCart[i].fld_amount,
              updated_on: moment().format("lll"),
              updated_by: login.fld_userid,
              url : newCart[i].fld_url
              // updated_by :13
            },
            "AddShoppingCart"
          ).then((results) =>
            // const objs = JSON.parse(result._bodyText)
            results.json().then((obj) => {

              if (results.status == 200 || results.status == 201 ) {

                count = count + 1

                if(count == newCart.length)
                {
                  this.SyncCartData(login)
                }


              }else{
                count = count + 1

                if(count == newCart.length)
                {
                  this.SyncCartData(login)
                }

              }
            }))
          }

          else if(newCart[i].fld_productcategory == 'Covid')
          {
          PostApiCall.postRequest(
            {
              customer_id: login.fld_userid,
              variant_id: newCart[i].fld_variantid,
              product_category: "Covid",
              quantity: newCart[i].fld_quantity,
              amount: newCart[i].fld_amount,
              updated_on: moment().format("lll"),
              updated_by: login.fld_userid,
              url : newCart[i].fld_url
              // updated_by :13
            },
            "AddShoppingCart"
          ).then((results) =>
            // const objs = JSON.parse(result._bodyText)
            results.json().then((obj) => {

              if (results.status == 200 || results.status == 201 ) {

                count = count + 1

                if(count == newCart.length)
                {
                  this.SyncCartData(login)
                }


              }else{
                count = count + 1

                if(count == newCart.length)
                {
                  this.SyncCartData(login)
                }

              }
            }))
          }
        }


      }else{

        this.SyncCartData(login)

      }
     
    }else
    {
      var cart_info1 = JSON.parse(localStorage.getItem('BMSCartData'))

      var newCart1 = cart_info1 != null ? cart_info1 : []

      if(cart_info1 != null){
        this.props.setcartitemcount(newCart1.length)
        this.props.setcartamount(newCart1.reduce(function (result, item) {
          return result + (item.fld_amount*item.fld_quantity);
        }, 0))
      }
    }
  }


  SyncCartData(login){

     // Notiflix.Loading.Dots("");

     var arr = [];
     var subt = 0;
     var cc = 0;
     var cn = 0;

      PostApiCall.postRequest(
        {
          product_category: "Food",
          customer_id: login.fld_userid,
        },
        "GetCartFoodVariant"
      ).then((results) =>
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
            if (obj.data.length > 0) {
              arr.push(obj.data);

              // for(var i = 0 ; i<Object.keys(obj.data).length;i++){
              //     subt = subt + obj.data[i].fld_discountprice
              // }
            }

            this.setState(
              {
                FoodData: obj.data,
                Cart: arr,
              },
              () => {
                cn = cn + 1;

                PostApiCall.postRequest(
                  {
                    product_category: "Footwear",
                    customer_id: login.fld_userid,
                  },
                  "GetCartFootwearVariant"
                ).then((results) =>
                  results.json().then((obj) => {
                    if (results.status == 200 || results.status == 201) {
                      if (obj.data.length > 0) {
                        arr.push(obj.data);

                        // for(var i = 0 ; i<Object.keys(obj.data).length;i++){
                        //     subt = subt + obj.data[i].fld_discountprice
                        // }
                      }

                      this.setState(
                        {
                          FootwearData: obj.data,
                          Cart: arr,
                        },
                        () => {
                          cn = cn + 1;

                          PostApiCall.postRequest(
                            {
                              product_category: "Socks",
                              customer_id: login.fld_userid,
                            },
                            "GetCartSocksVariant"
                          ).then((results) =>
                            results.json().then((obj) => {
                              if (
                                results.status == 200 ||
                                results.status == 201
                              ) {
                                if (obj.data.length > 0) {
                                  arr.push(obj.data);

                                  // for(var i = 0 ; i<Object.keys(obj.data).length;i++){
                                  //     subt = subt + obj.data[i].fld_discountprice
                                  // }
                                }

                                this.setState(
                                  {
                                    SocksData: obj.data,
                                    Cart: arr,
                                  },
                                  () => {
                                    cn = cn + 1;

                                    PostApiCall.postRequest(
                                      {
                                        product_category: "Accessories",
                                        customer_id: login.fld_userid,
                                      },
                                      "GetCartAccessoriesVariant"
                                    ).then((results) =>
                                      results.json().then((obj) => {
                                        if (results.status == 200 ||results.status == 201) {
                                          if (obj.data.length > 0) {
                                            arr.push(obj.data);
          
                                            // for(var i = 0 ; i<Object.keys(obj.data).length;i++){
                                            //     subt = subt + obj.data[i].fld_discountprice
                                            // }
                                          }
          
                                          this.setState(
                                            {
                                              AccessoriesData: obj.data,
                                              Cart: arr,
                                            },
                                            () => {
                                              cn = cn + 1;


                                              PostApiCall.postRequest(
                                                {
                                                  product_category: "Covid",
                                                  customer_id: login.fld_userid,
                                                },
                                                "GetCartCovidVariant"
                                              ).then((results) =>
                                                results.json().then((obj) => {
                                                  if (results.status == 200 ||results.status == 201) {
                                                    if (obj.data.length > 0) {
                                                      arr.push(obj.data);
                    
                                                      // for(var i = 0 ; i<Object.keys(obj.data).length;i++){
                                                      //     subt = subt + obj.data[i].fld_discountprice
                                                      // }
                                                    }
                    
                                                    this.setState(
                                                      {
                                                        CovidData: obj.data,
                                                        Cart: arr,
                                                      },
                                                      () => {
                                                        cn = cn + 1;
          
                                    // console.log(this.state.Cart)

                                    for (var i = 0; i < Object.keys(this.state.Cart).length; i++) {
                                      for (var j = 0;j < Object.keys(this.state.Cart[i]).length; j++ ) {
                                        subt = subt + this.state.Cart[i][j].fld_discountprice *this.state.Cart[i][j].fld_quantity;
                                        cc = cc + 1;

                                        this.props.setcartitemcount(cc)
                                        this.props.setcartamount(subt)
                                        this.setState({
                                          SubTotal: subt,
                                          CartItemCount: cc,
                                        });
                                        localStorage.removeItem('BMSCartData')
                                      }
                                    }
                                  })
                                }
                              }))
                                  })
                                }
                              }))
                                  }
                                );
                              }
                            })
                          );
                        }
                      );
                    }
                  })
                );
              }
            );
          }
        })
      );
      

      // Notiflix.Loading.Remove();
  }

  Results() {
    // console.log(this.state.HeaderText)
    // console.log(this.state.CategorySelect)
  }

  render() {
    return (
      <div>
    
        <div class="header-top d-none d-md-block">
          <div class="container">
            <div class="top-header">
              <div class="row ">
                <div class="col-md-6">
                  <ul class="social-icons-list-top">
                    <a
                      href="https://www.facebook.com/pg/beatmysugarofficial"
                      target="_blank"
                    >
                      <li>
                        <i class="fab fa-facebook-f"></i>
                      </li>
                    </a>
                    <a
                      href="https://www.instagram.com/beatmysugarofficial"
                      target="_blank"
                    >
                      {" "}
                      <li>
                        <i class="fab fa-instagram"></i>
                      </li>
                    </a>
                    <a
                      href="https://www.twitter.com/BeatMySugar"
                      target="_blank"
                    >
                      {" "}
                      <li>
                        <i class="fab fa-twitter"></i>
                      </li>
                    </a>

                    <a
                      href="https://www.youtube.com/channel/UCvM_zxRafVoBumfBKud1swg"
                      target="_blank"
                    >
                      {" "}
                      <li>
                        <i class="fab fa-youtube"></i>
                      </li>
                    </a>

                    <a
                      href="https://www.linkedin.com/company/beatmysugar/"
                      target="_blank"
                    >
                      {" "}
                      <li>
                        <i class="fab fa-linkedin-in"></i>
                      </li>
                    </a>
                  </ul>
                </div>
                <div class="col-md-6">
                  <ul
                    class="social-icons-list-top float-right"
                    style={{ fontSize: "14px" }}
                  >
                    <li>
                      <a href="mailto:wecare@beatmysugar.com">
                        <i
                          class="fas fa-envelope"
                          style={{ color: "#507dbe" }}
                        ></i>{" "}
                        wecare@beatmysugar.com
                      </a>
                    </li>
                    <li>
                      <a href="tel:(+91) 9024422444">
                        <i
                          class="fas fa-phone-volume"
                          style={{ color: "#507dbe" }}
                        ></i>{" "}
                        +91 90244 22444
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <header class="container">
          <div class="header sticky-header">
            <div class="header-middle">
              <div class="container-fluid bg-color">
                <div class="header-left">
                  <a href="/" class="logo">
                    <img
                      src="/assets/images/bms-logo.png"
                      alt="BeatMySugar Logo"
                      class="logo-width"
                    />
                  </a>
                </div>
                {/* 
                   <div className="header-center">
                   <h3 className="header-text d-none d-md-block">Simplifying Diabetes Management</h3>
                </div> */}

                <div class="header-center">
                  <div class="header-search">
                    {/* <a href="#" class="search-toggle" role="button">
                      <i class="icon-magnifier"></i>
                    </a> */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div class="header-search-wrapper">
                        <div class="select-custom">
                          <select
                            value={this.state.SearchSelectedCategory}
                            onChange={(text) => {
                              this.setState({
                                SearchSelectedCategory: text.target.value,
                              });
                            }}
                          >
                            {/* <option value="Select Search Category">Select Search Category</option> */}
                            {this.state.SearchBarCategory.map((cat, index) => (
                              <option
                                value={cat.fld_category}
                                label={cat.fld_category}
                              >
                                {cat.fld_category}
                              </option>
                            ))}
                              {/* <option
                              value={"Diwali offer"}
                              label={"Diwali Offers"}
                            >
                              Diwali Offers
                            </option> */}
                      
                          </select>
                        </div>
                        <input
                          class="form-control"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              if (
                                this.state.SearchSelectedCategory ==
                                "Select Search Category"
                              ) {
                                Notiflix.Notify.Info(
                                  "Please select search category."
                                );
                              } else {
                                if (this.state.SearchText == "") {
                                  Notiflix.Notify.Info(
                                    "Please enter product name to search."
                                  );
                                } else {
                                  for (var i = 0;i < this.state.SearchBarCategory.length;i++) {
                                    if ( this.state.SearchSelectedCategory ==this.state.SearchBarCategory[i].fld_category) {
                                      if (this.state.SearchBarCategory[i].fld_page == "food") {
                                        localStorage.setItem(
                                          "SearchText",
                                          JSON.stringify(this.state.SearchText)
                                        );
                                        window.location.href = `/food/${
                                          this.state.SearchBarCategory[i].fld_id +
                                          "/" +
                                          this.state.SearchBarCategory[i].fld_category.replace(
                                            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                            "-"
                                          )
                                        }`;
                                      } else if (this.state.SearchBarCategory[i].fld_page == "accessories") {

                                        localStorage.setItem("SearchText",JSON.stringify(this.state.SearchText));

                                        window.location.href = `/accessories/${
                                          this.state.SearchBarCategory[i].fld_id +
                                          "/" +
                                          this.state.SearchBarCategory[i].fld_category.replace(
                                            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                            "-"
                                          )
                                        }`;

                                      }
                                      else if (this.state.SearchBarCategory[i].fld_page == "covid") {

                                        localStorage.setItem("SearchText",JSON.stringify(this.state.SearchText));

                                        window.location.href = `/covidessentials/${
                                          this.state.SearchBarCategory[i].fld_id +
                                          "/" +
                                          this.state.SearchBarCategory[i].fld_category.replace(/\W|_/g,"") 
                                        }`;

                                      }
                                      else if (
                                        this.state.SearchBarCategory[i].fld_page == "search"
                                      ) {
                                        // localStorage.setItem('SearchText',JSON.stringify(this.state.SearchText))
                                        window.location.href = `/search/${this.state.SearchText.replace(
                                          /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                          "-"
                                        )}`;
                                      } else {
                                        localStorage.setItem(
                                          "SearchText",
                                          JSON.stringify(this.state.SearchText)
                                        );
                                        // console.log(this.state.SearchBarCategory[i])
                                        window.location.href ="/" +this.state.SearchBarCategory[i].fld_page;
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }}
                          value={this.state.SearchText}
                          onChange={(text) => {
                            this.setState({
                              SearchText: text.target.value,
                            });
                          }}
                          placeholder=""
                          required=""
                        />
                        {/* <ul class="search-ac">
                          <li>
                            <a href="#0">
                              <div class="row">
                                <div class="col-md-2">
                                  <img src="assets/images/accu-check.jpg"></img>
                                </div>
                                <div class="col-md-8">
                                  <p class="brand">
                                    <b>Brand</b>
                                  </p>
                                  <p>Accu check 14 strips</p>
                                </div>

                                <div class="col-md-2">
                                  <p>Rs.500</p>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a href="#0">
                              <div class="row">
                                <div class="col-md-2">
                                  <img src="https://images.beatmysugar.com/images/Food/BMS-DFF-10008-8-0.png"></img>
                                </div>
                                <div class="col-md-8">
                                  <p class="brand">
                                    <b>Brand</b>
                                  </p>
                                  <p>
                                    Keeros Roasted Supersnacks Multigrain &
                                    Multiseed Jars
                                  </p>
                                </div>

                                <div class="col-md-2">
                                  <p>Rs.500</p>
                                </div>
                              </div>
                            </a>
                          </li>
                        </ul>
                       */}

                        <button
                          class="btn"
                          onClick={() => {
                            // console.log('test')
                            if (
                              this.state.SearchSelectedCategory ==
                              "Select Search Category"
                            ) {
                              Notiflix.Notify.Info(
                                "Please select search category."
                              );
                            } else {
                              if (this.state.SearchText == "") {
                                Notiflix.Notify.Info(
                                  "Please enter product name to search."
                                );
                              } else {
                                for (
                                  var i = 0;
                                  i < this.state.SearchBarCategory.length;
                                  i++
                                ) {
                                  if (
                                    this.state.SearchSelectedCategory ==
                                    this.state.SearchBarCategory[i].fld_category
                                  ) {
                                    if (this.state.SearchBarCategory[i].fld_page == "food") {
                                      localStorage.setItem(
                                        "SearchText",
                                        JSON.stringify(this.state.SearchText)
                                      );
                                      window.location.href = `/food/${
                                        this.state.SearchBarCategory[i].fld_id +
                                        "/" +
                                        this.state.SearchBarCategory[
                                          i
                                        ].fld_category.replace(
                                          /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                          "-"
                                        )
                                      }`;
                                    } 
                                    else if (this.state.SearchBarCategory[i].fld_page == "accessories") {

                                      localStorage.setItem("SearchText",JSON.stringify(this.state.SearchText));

                                      window.location.href = `/accessories/${
                                        this.state.SearchBarCategory[i].fld_id +
                                        "/" +
                                        this.state.SearchBarCategory[i].fld_category.replace(
                                          /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                          "-"
                                        )
                                      }`;

                                    }
                                    else if (this.state.SearchBarCategory[i].fld_page == "covid") {

                                      localStorage.setItem("SearchText",JSON.stringify(this.state.SearchText));

                                      window.location.href = `/covidessentials/${
                                        this.state.SearchBarCategory[i].fld_id +
                                        "/" +
                                        this.state.SearchBarCategory[i].fld_category.replace(/\W|_/g,"") 
                                      }`;

                                    }
                                    else if (
                                      this.state.SearchBarCategory[i]
                                        .fld_page == "search"
                                    ) {
                                      // localStorage.setItem('SearchText',JSON.stringify(this.state.SearchText))
                                      window.location.href = `/search/${this.state.SearchText.replace(
                                        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                        "-"
                                      )}`;
                                    } else {
                                      localStorage.setItem(
                                        "SearchText",
                                        JSON.stringify(this.state.SearchText)
                                      );
                                      window.location.href =
                                        "/" +
                                        this.state.SearchBarCategory[i]
                                          .fld_page;
                                    }
                                  }
                                }
                              }
                            }
                          }}
                        >
                          <i class="icon-magnifier"></i>
                        </button>
                      </div>
                    </form>

                    {/* <form action="#" method="get">
                                <div class="header-search-wrapper">
                                    <input type="search" class="form-control" 
                                    value={this.state.HeaderText}
                                    onChange={(text)=>{
                                        this.setState({
                                            HeaderText : text.target.value
                                        })
                                    }}
                                    name="q" id="q" placeholder="Search for Doctor & Nutritionists" required/>
                                    {/* <div class="select-custom">
                                        <select id="cat" name="cat">
                                            <option value="">110001 Delhi</option>
                                            <option value="4">600001 Chennai</option>
                                           
                                           
                                        </select>
                                    </div> */}
                    {/* <div class="select-custom">
                                        <select value={this.state.CategorySelect} onChange={(text)=>{
                                            this.setState({
                                                CategorySelect : text.target.value
                                            })
                                        }}>
                                            <option value="All">All Categories</option> */}
                    {/* <option value="4">Medicine</option>
                                            <option value="12">Healthcare Devices</option>
                                            <option value="13">Foot Care Essentials</option>
                                            <option value="66">Services</option>
                                            <option value="67">Diagnostic Lab Tests</option> */}
                    {/* <option value="Doctors">Doctors</option>
                                             <option value="Nutritionists">Nutritionists</option>
                                           
                                        </select>
                                    </div>
                                 
                                    <button class="btn" type="submit"><i class="icon-magnifier"
                                    onClick={this.Results.bind(this)}
                                    ></i></button>
                                </div>
                            </form> */}
                  </div>
                </div>

                <div class="header-right">
                  {/* <button class="search-menu-toggler active" type="button">
                    <i class="icon-magnifier"></i>
                  </button> */}

                  <button class="cart-mobile" type="button"
                  onClick={()=>{
                    window.location.href = '/cart'
                  }}
                  >
                    
                    <span class="cart-items-mobile">
                    {this.props.CartReducer.ItemCount}
                        </span>
                        <i class="fas fa-shopping-cart"></i> <span style={{fontSize:"13px"}}>| ₹{parseFloat(this.props.CartReducer.TotalAmount).toFixed(2)}</span>
                  </button>

                  <button class="mobile-menu-toggler active" type="button">
                    <i class="icon-menu"></i>
                  </button>
                  <ul class="top-right d-none d-sm-none d-md-block">
                    <li style={{borderRight : '0px'}}>
                      <div
                        // style={{
                        //   display:
                        //     this.state.LoginData != null &&
                        //     this.state.LoginData != ""
                        //       ? ""
                        //       : "none",
                        // }}
                      >
                        <a href="/cart" class="d-none d-md-block">
                          <i class="fas fa-shopping-cart"></i>{" "}
                          <span class="cart-items">
                            {this.props.CartReducer.ItemCount}
                          </span>
                          |{" "}
                          <span style={{ fontSize: "17px", fontWeight: "600" }}>
                            &#x20b9;
                          </span>
                          <span style={{ fontSize: "15px", fontWeight: "600" }}>
                            {parseFloat(this.props.CartReducer.TotalAmount).toFixed(2)}
                          </span>{" "}
                        </a>
                      </div>
                    </li>
                    <li>
                      <div
                        style={{
                          display:
                            this.state.LoginData != null &&
                            this.state.LoginData != ""
                              ? ""
                              : "none",
                        }}
                      >
                        <a href="/wishlist" class="d-none d-md-block">
                          <i class="fas fa-heart"></i> Wishlist
                        </a>
                      </div>
                    </li>

                    {this.state.LoginData != null &&
                    this.state.LoginData != "" ? (
                      <li class="dropdown">
                        <p class="acount-btn dropbtn">
                          <a>
                            {" "}
                            <span class="welcome-text">
                              {" "}
                              <i class="fas fa-user"></i> My Account
                            </span>
                            {/* {this.state.LoginData.fld_name}{" "} */}
                            <i class="fas fa-caret-down"></i>
                          </a>{" "}
                        </p>
                        {/* | <a href="/Logout"><i class="fas fa-sign-out-alt"></i> Logout</a> */}
                        <div
                          id="myDropdown"
                          class="dropdown-content login-dropdown"
                        >
                          <div class="dropdown-head">
                            <h3 class="section-title dropdown-title">
                              Welcome,{" "}
                            </h3>
                            <p class="dropdown-name">
                              {this.state.LoginData.fld_name}{" "}
                            </p>
                          </div>

                          <a href="/account" class="">
                            Dashboard
                          </a>

                          <a href="/orderhistory" class="">
                            My Orders
                          </a>

                          <a href="/wishlist" class="">
                            My Wishlist
                          </a>

                          <a href="/editprofile" class="">
                            My Profile
                          </a>

                          <a href="/addressbook" class="">
                            My Address Book
                          </a>

                          <a href="/diabeticprofile" class="">
                            Diabetic Profile
                          </a>

                          <a href="/Logout" class="">
                            Logout
                          </a>
                        </div>
                      </li>
                    ) : (
                      // <li class="dropdown">

                      //     <a class=" dropbtn" >
                      //         <i class="fa fa-user"></i>

                      //      </a>

                      //             <div id="myDropdown" class="dropdown-content">

                      //                 <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" class="user-image"/>
                      //                    <p style={{textAlign:"center"}}><span class="user-name">Welcome, {this.state.LoginData.fld_name}</span></p>

                      //                    <div class="clearfix"></div>
                      //                     <div >
                      //                         <ul class="account-settings-list">
                      //                             <li><a href="/Profile"><i class="fas fa-user"></i> My Profile</a></li>

                      //               <li>

                      //                    <a href='/Logout' class="acount-btn logout-btn" style={{textAlign:'center'}}

                      //                    >Logout</a></li>
                      //                 </ul>

                      //     </div>

                      //                   </div>
                      //         </li>

                      <li class="dropdown">
                        <p class="acount-btn dropbtn">
                          <a href="/Login">
                            <i class="fas fa-user"></i> Login{" "}
                          </a>{" "}
                          |{" "}
                          <a href="/register">
                            <i class="fas fa-sign-in-alt"></i> Sign Up
                          </a>
                        </p>

                        {/* <div id="myDropdown" class="dropdown-content login-dropdown">
                                    
                                    <a href="/Login"><i class="fas fa-user"></i>Login</a>
                                    <a href="/register"><i class="fas fa-sign-in-alt"></i>Sign Up</a>
                                      </div> */}
                      </li>
                    )}
                    {/* <li class="dropdown">
                                <a href="#" class="acount-btn dropbtn" >MY ACCOUNT</a> 
                                <div id="myDropdown" class="dropdown-content">
                                    
                                       <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" class="user-image"/>
                                       <span class="user-name">Welcome, Saravan Kumar B</span>
                                     
                                       <div class="clearfix"></div>
                                        <div>
                                            <ul class="account-settings-list">
                                                <li><a href=""><i class="fas fa-user"></i> My Profile</a></li>
                                                <li><a href=""><i class="fas fa-box"></i> Orders</a></li>
                                                <li><a href=""><i class="fas fa-heart"></i> Wishlist</a></li>
                                                <li><a href=""><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                                            </ul>
                                        </div>
                                    
                                      </div>
                            </li> */}
                  </ul>
                </div>
              </div>
            </div>

            <div class="header-bottom">
              <div class="container-fluid no-padding">
                <nav class="main-nav">
                  <ul class="menu sf-arrows" style={{ paddingLeft: "10px" }}>
                    {/* <li class="hvr-overline-from-left">
                      <a href="/" class="">
                        Home
                      </a>
                    </li> */}
                    <li class="hvr-overline-from-left">
                      <a href="/aboutus" class="">
                        About Us
                      </a>
                    </li>

                    <li class="hvr-overline-from-left">
                      <a
                        href="/healthknowledge"
                        onClick={() => {
                          localStorage.removeItem("SearchText");
                          window.location.href = "/healthknowledge";
                        }}
                        class=""
                      >
                        Health Knowledge
                      </a>{" "}
                    </li>

                    <li class="hvr-overline-from-left">
                      <a href="javascript: void(0);" class="">
                        Food & Supplements{" "}
                      </a>
                      <ul>
                        {this.state.FoodCategory.map((cat, index) => (
                          <li>
                            <a
                              onClick={() => {
                                localStorage.removeItem("SearchText");
                                window.location.href = `/food/${
                                  cat.fld_id +
                                  "/" +
                                  cat.fld_category.replace(
                                    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                    "-"
                                  )
                                }`;
                              }}
                              class=""
                            >
                              {cat.fld_category}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li class="hvr-overline-from-left">
                      <a href="javascript: void(0);" class="">
                        Footcare{" "}
                      </a>
                      <ul>
                        <li>
                          <a
                            onClick={() => {
                              localStorage.removeItem("SearchText");
                              window.location.href = "/footwear";
                            }}
                          >
                            Footwear
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              localStorage.removeItem("SearchText");
                              window.location.href = "/socks";
                            }}
                          >
                            Socks
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li class="hvr-overline-from-left">
                      <a href="javascript: void(0);" class="">
                       Covid Essentials{" "}
                       <span class="new-option" >
                       *New
                       </span>
                      </a>
                      <ul>
                        {this.state.CovidCategory.map((cat, index) => (
                          <li>
                            <a
                              onClick={() => {
                                localStorage.removeItem("SearchText");
                                window.location.href = `/covidessentials/${
                                  cat.fld_id +
                                  "/" +
                                  cat.fld_category.replace(
                                    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                    "-"
                                  )
                                }`;
                              }}
                              class=""
                            >
                              {cat.fld_category}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>


                    <li class="hvr-overline-from-left">
                      <a href="javascript: void(0);" class="">
                       Accessories{" "}
                       <span class="new-option" >
                       *New
                       </span>
                      </a>
                      <ul>
                        {this.state.AccessoriesCategory.map((cat, index) => (
                          <li>
                            <a
                              onClick={() => {
                                localStorage.removeItem("SearchText");
                                window.location.href = `/accessories/${
                                  cat.fld_id +
                                  "/" +
                                  cat.fld_category.replace(
                                    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                    "-"
                                  )
                                }`;
                              }}
                              class=""
                            >
                              {cat.fld_category}
                         
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li class="hvr-overline-from-left" style={{    marginRight: '10px',display : JSON.stringify(this.state.OfferData) == '[]' ? 'none' : ''}}>
                      <a href="/festive-offers" class="" style={{marginRight:'10px'}}>
                        {/* {console.log(this.state.OfferData)} */}
                     {this.state.OfferData[0] != undefined ? this.state.OfferData[0].fld_title : ''}
                     <span class="new-option" style={{dispaly :  JSON.stringify(this.state.OfferData) != '[]' ? '' : 'none'}}>
                       {/* <img class="new-option" src="/assets/images/lamp.png"></img> */}
                       *New
                       </span>
                     
                      </a>
                    </li>

                    {/* <li><a href="/allopathy">Allopathy</a></li> 

                    {/* <li><a  href="/ayurveda" >Ayurveda</a> </li> */}

                    {/* <li><a href="#">Health Supplements</a></li> */}

                    {/* <li class="hvr-overline-from-left">
                                <a 
                                href="/device"
                                 class="">Healthcare Devices</a>
                               
                            </li>      */}

                    {/* <li class="hvr-overline-from-left"><a href="/food" class="">Food</a>
                               
                               </li>  */}

                    {/* <li class="hvr-overline-from-left">
                                <a 
                                href="/footcare"
                                 class="">Foot Care</a>
                               
                            </li> */}

                    {/* <li class="hvr-overline-from-left"><a 
                            href="/book"
                             class="">Books</a>
                               
                            </li> */}

                    <li class="hvr-overline-from-left">
                      <a href="/insurance">Insurance</a>
                    </li>

                    <li class="hvr-overline-from-left">
                      <a href="/doctor" class="">
                        Doctors
                      </a>
                    </li>
                    <li class="hvr-overline-from-left">
                      <a href="/dietitian" class="">
                        Dietitians
                      </a>
                    </li>
                 

                    {/* <li class="hvr-overline-from-left"><a 
                            href="/socks"
                             class="">Socks</a>
                               
                            </li> */}

                    {/* <li class="hvr-overline-from-left"><a 
                            href="/book"
                             class="">Books</a>
                               
                            </li> */}
                    {/* <li class="hvr-overline-from-left"><a 
                            href="/careers"
                             class="">Careers</a>
                               
                            </li> */}
                    {/* <li class="hvr-overline-from-left">
                      <a href="/contactus" class="">
                        Contact Us
                      </a>
                    </li> */}
                    {/* <li class="hvr-overline-from-left">
                                <a href="#" class="">Lifestyle Services</a>
                                <ul>
                                    <li><a 
                                    href="/nutritionist"
                                    >Dietitians </a></li>
                                    <li><a href="/yoga">Yoga</a>
                                     
                                    </li>
                                   
                                </ul>
                               
                            </li> */}
                    {/* <li class="hvr-overline-from-left"><a 
                            href="/lab"
                             class="">Diagonstic Labs</a>
                               
                            </li> */}

                    {/* <li style={{ float: "right", paddingRight: "10px" }}>
                          <a href="/personalinformation" class="cont-details prescription-btn">Upload Prescription</a>
                      <h3
                     
                        className="header-text d-none d-md-block "
                        style={{ padding: "13px 7px" }}
                      >
                        Simplifying Diabetes Management
                      </h3>
                    </li> */}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </header>

        <section class="">
                <div class="container ">
                  <div class="mobile-search-bar">
                  <div class="row">
                    <div class="col-md-10 col-10">
                        <input type="text" class="form-control" placeholder="Search"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {

                            window.location.href = `/search/${this.state.SearchText.replace(
                              /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                              "-"
                            )}`;
                            
                          }
                        }}
                        value={this.state.SearchText}
                          onChange={(text) => {
                            this.setState({
                              SearchText: text.target.value,
                            });
                          }}
                        ></input>
                    </div>
                    <div class="col-md-2 col-2">
                        <button class="search-button-mobile"
                        onClick={()=>{
                          window.location.href = `/search/${this.state.SearchText.replace(
                            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                            "-"
                          )}`;
                          
                        }}
                        ><i class="icon-magnifier"></i></button>
                      </div>
                  </div>
                  </div>
                </div>
            </section>
            
        <div class="mobile-menu-overlay"></div>
        <div class="mobile-menu-container">
          <div class="mobile-menu-wrapper">
            {/* <div class="header-left">
        <a href="/" class="logo">
                            <img src="/assets/images/bms-logo.png" alt="BeatMySugar Logo" class="logo-width"/>
                        </a>
                        </div> */}

            <nav class="mobile-nav">
              {this.state.LoginData != null && this.state.LoginData != "" ? (
                <div class="user-name-box">
                  <img
                    src={
                      this.state.LoginData.fld_profileimage == null ||
                      this.state.LoginData.fld_profileimage == ""
                        ? "/assets/images/user.png"
                        : this.state.LoginData.fld_profileimage
                    }
                    alt="BeatMySugar Logo"
                    class="logo-width user-image-sidebar"
                  />
                  <p class="user-name">
                    Welcome, {this.state.LoginData.fld_name}{" "}
                  </p>
                </div>
              ) : (
                <div class="user-name-box">
                  <p class="user-name">
                    <a href="/login" class="">
                      Login
                    </a>{" "}
                    <a href="/register">
                      <i class="fas fa-sign-in-alt"></i> Sign Up
                    </a>
                  </p>
                </div>
              )}

              {/* <div class="user-name-box">
            <img
                  src="/assets/images/user.png"
                  alt="BeatMySugar Logo"
                  class="logo-width user-image-sidebar"
                 
                />
                <p class="user-name"><a href="/Login">Log In</a> <a href="/register">Sign Up</a></p>
                </div> */}
              {/* {this.state.LoginData != null && this.state.LoginData != "" ? ( */}
                <div class="bottom-bar">
                  <ul>
                    <li>
                      <a href="/cart">
                        <i class="fas fa-shopping-cart"> </i>{" "}
                        <span class="cart-items">
                          {this.props.CartReducer.ItemCount}
                        </span>{" "}
                        ₹{parseFloat(this.props.CartReducer.TotalAmount).toFixed(2)}
                      </a>
                    </li>
                    {/* <li>
                      <a href="/wishlist">
                        <i class="fas fa-heart"> </i> Wishlist
                      </a>
                    </li> */}
                  </ul>
                </div>
              {/* ) : (
                ""
              )} */}
              <div class="clearfix"></div>
              <ul class="mobile-menu">
                <li class="hvr-overline-from-left">
                  <a href="/" class="">
                    Home
                  </a>
                </li>
                <li class="hvr-overline-from-left">
                  <a href="/aboutus" class="">
                    About Us
                  </a>
                </li>

                <li class="hvr-overline-from-left">
                  <a
                    onClick={() => {
                      localStorage.removeItem("SearchText");
                      window.location.href = "/healthknowledge";
                    }}
                    class=""
                  >
                    Health Knowledge
                  </a>{" "}
                </li>

                {/* <li><a href="/allopathy">Allopathy</a></li> */}

                {/* <li><a  href="/ayurveda" >Ayurveda</a> </li> */}

                {/* <li><a href="#">Health Supplements</a></li> */}

                {/* <li class="hvr-overline-from-left">
                                <a 
                                href="/device"
                                 class="">Healthcare Devices</a>
                               
                            </li>      */}

                {/* <li class="hvr-overline-from-left"><a href="/food" class="">Food</a>
                               
                               </li>  */}

                {/* <li class="hvr-overline-from-left">
                                <a 
                                href="/footcare"
                                 class="">Foot Care</a>
                               
                            </li> */}

                {/* <li class="hvr-overline-from-left"><a 
                            href="/book"
                             class="">Books</a>
                               
                            </li> */}

                <div>
                  <div
                    style={{
                      paddingTop: "11px",
                      paddingBottom: "11px",
                      paddingRight: "15px",
                      paddingLeft: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.setState({
                        isOpen: this.state.isOpen == "Food" ? -1 : "Food",
                      });
                    }}
                  >
                    <span
                      class="hvr-overline-from-left"
                      style={{ verticalAlign: "middle" }}
                    >
                      Food & Supplements
                    </span>
                    <span>
                      <i
                        class="fa fa-angle-down"
                        aria-hidden="true"
                        style={{
                          float: "right",
                          paddingTop: "7px",
                          display: this.state.isOpen == "Food" ? "none" : "",
                          // fontSize: '17px'
                        }}
                      ></i>
                    </span>
                    <span>
                      <i
                        class="fa fa-angle-up"
                        aria-hidden="true"
                        style={{
                          float: "right",
                          paddingTop: "7px",
                          display: this.state.isOpen == "Food" ? "" : "none",
                          // fontSize: '17px'
                        }}
                      ></i>
                    </span>
                  </div>

                  <Collapse
                    isOpen={this.state.isOpen == "Food" ? true : false}
                    style={{ padding: "0px" }}
                  >
                    <div style={{ padding: "7px 0 9px 20px" }}>
                      {this.state.FoodCategory.map((cat, index) => (
                        <li>
                          <a
                            onClick={() => {
                              localStorage.removeItem("SearchText");
                              window.location.href = `/food/${
                                cat.fld_id +
                                "/" +
                                cat.fld_category.replace(
                                  /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                  "-"
                                )
                              }`;
                            }}
                            class=""
                          >
                            {cat.fld_category}
                          </a>
                        </li>
                      ))}
                    </div>
                  </Collapse>
                </div>

                <div>
                  <div
                    style={{
                      paddingTop: "11px",
                      paddingBottom: "11px",
                      paddingRight: "15px",
                      paddingLeft: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.setState({
                        isOpen: this.state.isOpen == "Foot" ? -1 : "Foot",
                      });
                    }}
                  >
                    <span
                      class="hvr-overline-from-left"
                      style={{ verticalAlign: "middle" }}
                    >
                      Footcare
                    </span>
                    <span>
                      <i
                        class="fa fa-angle-down"
                        aria-hidden="true"
                        style={{
                          float: "right",
                          paddingTop: "7px",
                          display: this.state.isOpen == "Foot" ? "none" : "",
                          // fontSize: '17px'
                        }}
                      ></i>
                    </span>
                    <span>
                      <i
                        class="fa fa-angle-up"
                        aria-hidden="true"
                        style={{
                          float: "right",
                          paddingTop: "7px",
                          display: this.state.isOpen == "Foot" ? "" : "none",
                          // fontSize: '17px'
                        }}
                      ></i>
                    </span>
                  </div>

                  <Collapse
                    isOpen={this.state.isOpen == "Foot" ? true : false}
                    style={{ padding: "0px" }}
                  >
                    <div style={{ padding: "7px 0 9px 20px" }}>
                      <li>
                        <a
                          onClick={() => {
                            localStorage.removeItem("SearchText");
                            window.location.href = "/footwear";
                          }}
                        >
                          Footwear
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            localStorage.removeItem("SearchText");
                            window.location.href = "/socks";
                          }}
                        >
                          Socks
                        </a>
                      </li>
                    </div>
                  </Collapse>
                </div>


                <div>
                  <div
                    style={{
                      paddingTop: "11px",
                      paddingBottom: "11px",
                      paddingRight: "15px",
                      paddingLeft: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.setState({
                        isOpen: this.state.isOpen == "Covid" ? -1 : "Covid",
                      });
                    }}
                  >
                    <span
                      class="hvr-overline-from-left"
                      style={{ verticalAlign: "middle" }}
                    >
                      Covid Essentials
                      <span class="new-option" style={{color : 'green'}}>
                       *New
                       </span>
                    </span>
                    <span>
                      <i
                        class="fa fa-angle-down"
                        aria-hidden="true"
                        style={{
                          float: "right",
                          paddingTop: "7px",
                          display: this.state.isOpen == "Covid" ? "none" : "",
                          // fontSize: '17px'
                        }}
                      ></i>
                    </span>
                    <span>
                      <i
                        class="fa fa-angle-up"
                        aria-hidden="true"
                        style={{
                          float: "right",
                          paddingTop: "7px",
                          display: this.state.isOpen == "Covid" ? "" : "none",
                          // fontSize: '17px'
                        }}
                      ></i>
                    </span>
                  </div>

                  <Collapse
                    isOpen={this.state.isOpen == "Covid" ? true : false}
                    style={{ padding: "0px" }}
                  >
                    <div style={{ padding: "7px 0 9px 20px" }}>
                      {this.state.CovidCategory.map((cat, index) => (
                        <li>
                          <a
                            onClick={() => {
                              localStorage.removeItem("SearchText");
                              window.location.href = `/covidessentials/${
                                cat.fld_id +
                                "/" +
                                cat.fld_category.replace(
                                  /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                  "-"
                                )
                              }`;
                            }}
                            class=""
                          >
                            {cat.fld_category}
                          </a>
                        </li>
                      ))}
                    </div>
                  </Collapse>
                </div>





                <div>
                  <div
                    style={{
                      paddingTop: "11px",
                      paddingBottom: "11px",
                      paddingRight: "15px",
                      paddingLeft: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.setState({
                        isOpen: this.state.isOpen == "Accessories" ? -1 : "Accessories",
                      });
                    }}
                  >
                    <span
                      class="hvr-overline-from-left"
                      style={{ verticalAlign: "middle" }}
                    >
                      Accessories
                      <span class="new-option" style={{color : 'green'}}>
                       *New
                       </span>
                    </span>
                    <span>
                      <i
                        class="fa fa-angle-down"
                        aria-hidden="true"
                        style={{
                          float: "right",
                          paddingTop: "7px",
                          display: this.state.isOpen == "Accessories" ? "none" : "",
                          // fontSize: '17px'
                        }}
                      ></i>
                    </span>
                    <span>
                      <i
                        class="fa fa-angle-up"
                        aria-hidden="true"
                        style={{
                          float: "right",
                          paddingTop: "7px",
                          display: this.state.isOpen == "Accessories" ? "" : "none",
                          // fontSize: '17px'
                        }}
                      ></i>
                    </span>
                  </div>

                  <Collapse
                    isOpen={this.state.isOpen == "Accessories" ? true : false}
                    style={{ padding: "0px" }}
                  >
                    <div style={{ padding: "7px 0 9px 20px" }}>
                      {this.state.AccessoriesCategory.map((cat, index) => (
                        <li>
                          <a
                            onClick={() => {
                              localStorage.removeItem("SearchText");
                              window.location.href = `/accessories/${
                                cat.fld_id +
                                "/" +
                                cat.fld_category.replace(
                                  /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                  "-"
                                )
                              }`;
                            }}
                            class=""
                          >
                            {cat.fld_category}
                          </a>
                        </li>
                      ))}
                    </div>
                  </Collapse>
                </div>



                <li class="hvr-overline-from-left" style={{display : JSON.stringify(this.state.OfferData) == '[]' ? 'none' : ''}}>
                <a href="/festive-offers" class="" >
                        {/* {console.log(this.state.OfferData)} */}
                       
                     {this.state.OfferData[0] != undefined ? this.state.OfferData[0].fld_title : ''}
                     <span class="new-option" style={{dispaly :  JSON.stringify(this.state.OfferData) != '[]' ? '' : 'none',color : 'green'}}>
                       {/* <img class="new-option" src="/assets/images/lamp.png"></img> */}
                       *New
                       </span>
                      </a>
                    </li>
                {/* <li class="hvr-overline-from-left">
                  <a 
       
                   class="">
                    Footcare
                  </a>
                  <ul>
                        <li>
                          <a 
                           onClick={()=>{
                            localStorage.removeItem('SearchText')
                            window.location.href = '/footwear'
                          }}
                         >Footwear</a>
                        </li>
                        <li>
                          <a 
                           onClick={()=>{
                            localStorage.removeItem('SearchText')
                            window.location.href = '/socks'
                          }}
                          >Socks</a>
                        </li>
                      </ul>
                </li>

               */}
                <li class="hvr-overline-from-left">
                  <a href="/insurance">Insurance</a>
                </li>

                <li class="hvr-overline-from-left">
                  <a href="/doctor" class="">
                    Doctors
                  </a>
                </li>
                <li class="hvr-overline-from-left">
                  <a href="/dietitian" class="">
                    Dietitians
                  </a>
                </li>
                {/* 
                <li class="hvr-overline-from-left" style={{borderTop:"1px solid  #e6e6e6"}}>
                  <a href="/Login" class="">
                    Login
                  </a>
                </li>
                <li class="hvr-overline-from-left">
                  <a href="/register" class="">
                    Sign Up
                  </a>
                </li> */}

                <div
                  style={{
                    display:
                      this.state.LoginData != null && this.state.LoginData != ""
                        ? ""
                        : "none",
                  }}
                >
                  <div
                    style={{
                      paddingTop: "11px",
                      paddingBottom: "11px",
                      paddingRight: "15px",
                      paddingLeft: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.setState({
                        isOpen: this.state.isOpen == "Account" ? -1 : "Account",
                      });
                    }}
                  >
                    <span
                      class="hvr-overline-from-left"
                      style={{ verticalAlign: "middle" }}
                    >
                      My Account
                    </span>
                    <span>
                      <i
                        class="fa fa-angle-down"
                        aria-hidden="true"
                        style={{
                          float: "right",
                          paddingTop: "0px",
                          display: this.state.isOpen == "Account" ? "none" : "",
                          // fontSize: '17px'
                        }}
                      ></i>
                    </span>
                    <span>
                      <i
                        class="fa fa-angle-up"
                        aria-hidden="true"
                        style={{
                          float: "right",
                          paddingTop: "0px",
                          display: this.state.isOpen == "Account" ? "" : "none",
                          // fontSize: '17px'
                        }}
                      ></i>
                    </span>
                  </div>

                  <Collapse
                    isOpen={this.state.isOpen == "Account" ? true : false}
                    style={{ padding: "0px" }}
                  >
                    <div style={{ padding: "7px 0 9px 20px" }}>
                      <li class="hvr-overline-from-left">
                        <a href="/account" class="">
                          Dashboard
                        </a>
                      </li>
                      <li class="hvr-overline-from-left">
                        <a href="/orderhistory" class="">
                          My Orders
                        </a>
                      </li>
                      <li class="hvr-overline-from-left">
                        <a href="/wishlist" class="">
                          My Wishlist
                        </a>
                      </li>
                      <li class="hvr-overline-from-left">
                        <a href="/editprofile" class="">
                          My Profile
                        </a>
                      </li>
                      <li class="hvr-overline-from-left">
                        <a href="/addressbook" class="">
                          My Address Book
                        </a>
                      </li>
                      <li class="hvr-overline-from-left">
                        <a href="/diabeticprofile" class="">
                          Diabetic Profile
                        </a>
                      </li>

                      <li class="hvr-overline-from-left">
                        <a href="/Logout" class="">
                          Logout
                        </a>
                      </li>
                    </div>
                  </Collapse>
                </div>
              </ul>
              <div class="sidebar-contactdetails">
                <div class="sidebar-contactdetails-box">
                  <p> Email</p>
                  <a href="mailto:wecare@beatmysugar.com">
                    wecare@beatmysugar.com
                  </a>
                </div>
                <div class="sidebar-contactdetails-box">
                  <p> Phone Number</p>
                  <a href="tel:9024422444">+91 90244 22444</a>
                </div>
                <div class="sidebar-contactdetails-box">
                  <ul
                    class="social-icons-list-top"
                    style={{ paddingLeft: "0px!important" }}
                  >
                    <a
                      href="https://www.facebook.com/pg/beatmysugarofficial"
                      target="_blank"
                    >
                      <li>
                        <i class="fab fa-facebook-f"></i>
                      </li>
                    </a>
                    <a
                      href="https://www.instagram.com/beatmysugarofficial"
                      target="_blank"
                    >
                      {" "}
                      <li>
                        <i class="fab fa-instagram"></i>
                      </li>
                    </a>
                    <a
                      href="https://www.twitter.com/BeatMySugar"
                      target="_blank"
                    >
                      {" "}
                      <li>
                        <i class="fab fa-twitter"></i>
                      </li>
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCvM_zxRafVoBumfBKud1swg"
                      target="_blank"
                    >
                      {" "}
                      <li>
                        <i class="fab fa-youtube"></i>
                      </li>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/beatmysugar/"
                      target="_blank"
                    >
                      {" "}
                      <li>
                        <i class="fab fa-linkedin-in"></i>
                      </li>
                    </a>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div class="search-menu-overlay"></div>
        <div class="search-menu-container">
          <div class="search-menu-wrapper">
            <div class="searchbox-sidebar">
              <h2 class="light-title section-title">Search on BeatMySugar</h2>
              <div class="selectbox">
                <label></label>
                <select
                  class="form-control"
                  value={this.state.SearchSelectedCategory}
                  onChange={(text) => {
                    this.setState({
                      SearchSelectedCategory: text.target.value,
                    });
                  }}
                >
                  {/* <option value="Select Search Category">Select Search Category</option> */}
                  {this.state.SearchBarCategory.map((cat, index) => (
                    <option value={cat.fld_category} label={cat.fld_category}>
                      {cat.fld_category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      if (
                        this.state.SearchSelectedCategory ==
                        "Select Search Category"
                      ) {
                        Notiflix.Notify.Info("Please select search category.");
                      } else {
                        if (this.state.SearchText == "") {
                          Notiflix.Notify.Info(
                            "Please enter product name to search."
                          );
                        } else {
                          for (
                            var i = 0;
                            i < this.state.SearchBarCategory.length;
                            i++
                          ) {
                            if (
                              this.state.SearchSelectedCategory ==
                              this.state.SearchBarCategory[i].fld_category
                            ) {
                              if (
                                this.state.SearchBarCategory[i].fld_page ==
                                "food"
                              ) {
                                localStorage.setItem(
                                  "SearchText",
                                  JSON.stringify(this.state.SearchText)
                                );
                                window.location.href = `/food/${
                                  this.state.SearchBarCategory[i].fld_id +
                                  "/" +
                                  this.state.SearchBarCategory[
                                    i
                                  ].fld_category.replace(
                                    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                    "-"
                                  )
                                }`;
                              } 
                              
                              else if (this.state.SearchBarCategory[i].fld_page == "accessories") {

                                localStorage.setItem("SearchText",JSON.stringify(this.state.SearchText));

                                window.location.href = `/accessories/${
                                  this.state.SearchBarCategory[i].fld_id +
                                  "/" +
                                  this.state.SearchBarCategory[i].fld_category.replace(
                                    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                    "-"
                                  )
                                }`;

                              }
                              else if (this.state.SearchBarCategory[i].fld_page == "covid") {

                                localStorage.setItem("SearchText",JSON.stringify(this.state.SearchText));

                                window.location.href = `/covidessentials/${
                                  this.state.SearchBarCategory[i].fld_id +
                                  "/" +
                                  this.state.SearchBarCategory[i].fld_category.replace(/\W|_/g,"") 
                                }`;

                              }

                              else if (
                                this.state.SearchBarCategory[i].fld_page ==
                                "search"
                              ) {
                                // localStorage.setItem('SearchText',JSON.stringify(this.state.SearchText))
                                window.location.href = `/search/${this.state.SearchText.replace(
                                  /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                  "-"
                                )}`;
                              } else {
                                localStorage.setItem(
                                  "SearchText",
                                  JSON.stringify(this.state.SearchText)
                                );
                                window.location.href =
                                  "/" +
                                  this.state.SearchBarCategory[i].fld_page;
                              }
                            }
                          }
                        }
                      }
                    }
                  }}
                  value={this.state.SearchText}
                  onChange={(text) => {
                    this.setState({
                      SearchText: text.target.value,
                    });
                  }}
                  type="text"
                  placeholder=""
                  class="form-control"
                ></input>
              </div>
              <a
                onClick={() => {
                  // console.log('test')
                  if (
                    this.state.SearchSelectedCategory ==
                    "Select Search Category"
                  ) {
                    Notiflix.Notify.Info("Please select search category.");
                  } else {
                    if (this.state.SearchText == "") {
                      Notiflix.Notify.Info(
                        "Please enter product name to search."
                      );
                    } else {
                      for (
                        var i = 0;
                        i < this.state.SearchBarCategory.length;
                        i++
                      ) {
                        if (
                          this.state.SearchSelectedCategory ==
                          this.state.SearchBarCategory[i].fld_category
                        ) {
                          if (
                            this.state.SearchBarCategory[i].fld_page == "food"
                          ) {
                            localStorage.setItem(
                              "SearchText",
                              JSON.stringify(this.state.SearchText)
                            );
                            window.location.href = `/food/${
                              this.state.SearchBarCategory[i].fld_id +
                              "/" +
                              this.state.SearchBarCategory[
                                i
                              ].fld_category.replace(
                                /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                "-"
                              )
                            }`;
                          } 
                          

                          else if (this.state.SearchBarCategory[i].fld_page == "accessories") {

                            localStorage.setItem("SearchText",JSON.stringify(this.state.SearchText));

                            window.location.href = `/accessories/${
                              this.state.SearchBarCategory[i].fld_id +
                              "/" +
                              this.state.SearchBarCategory[i].fld_category.replace(
                                /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                "-"
                              )
                            }`;

                          }
                          else if (this.state.SearchBarCategory[i].fld_page == "covid") {

                            localStorage.setItem("SearchText",JSON.stringify(this.state.SearchText));

                            window.location.href = `/covidessentials/${
                              this.state.SearchBarCategory[i].fld_id +
                              "/" +
                              this.state.SearchBarCategory[i].fld_category.replace(/\W|_/g,"") 
                            }`;

                          }
                          
                          else if (
                            this.state.SearchBarCategory[i].fld_page == "search"
                          ) {
                            // localStorage.setItem('SearchText',JSON.stringify(this.state.SearchText))
                            window.location.href = `/search/${this.state.SearchText.replace(
                              /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                              "-"
                            )}`;
                          } else {
                            localStorage.setItem(
                              "SearchText",
                              JSON.stringify(this.state.SearchText)
                            );
                            window.location.href =
                              "/" + this.state.SearchBarCategory[i].fld_page;
                          }
                        }
                      }
                    }
                  }
                }}
                class="sidebar-search-btn"
              >
                Search <i class="icon-magnifier"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
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
)( Menu);
