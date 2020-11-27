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
import DiwaliOffersHP from "./DiwaliOffersHP";
import { connect } from "react-redux";
import { setcartitemcount, setcartamount } from "./Actions/actionType";

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
      ProductData: [],

      bannerHome: [],
      images: [],
    };
  }

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    });

    Notiflix.Loading.Dots("Please wait...");

    let images = [];
    PostApiCall.postRequest(
      {
        verticle: "Home",
        type: "",
      },
      "Get_AdBannerWebsite"
    ).then((resultdes) =>
      resultdes.json().then((obj) => {
        console.log(obj.data);
        if (obj.data) {
          obj.data.map((singledata) => {
            images.push(singledata.fld_image);
          });
        }
        this.setState({
          bannerHome: obj.data,
          images: images,
        });
      })
    );

    GetApiCall.getRequest("GetFestiveOfferListing").then((results) => {
      results
        .json()
        .then((data) => ({
          data: data,
          status: results.status,
        }))
        .then((res) => {
          // console.log(res.data.data)

          var prdt = [...res.data.data];
          var cn = 0;
          var filt = [];

          for (var i = 0; i < Object.keys(res.data.data).length; i++) {
            if (res.data.data[i].fld_category == "Food") {
              PostApiCall.postRequest(
                {
                  id: res.data.data[i].fld_productid,
                },
                "GetFestiveFoodVariantDetails"
              ).then((results) =>
                results.json().then((obj) => {
                  if (results.status == 200 || results.status == 201) {
                    filt = prdt.filter(
                      (val) =>
                        val.fld_productid == obj.data[0].fld_id &&
                        val.fld_category == "Food"
                    );

                    // console.log(obj.data)

                    prdt[prdt.indexOf(filt[0])].ProdInfo = obj.data[0];

                    cn++;
                    if (cn == Object.keys(res.data.data).length) {
                      this.setState({
                        ProductData: prdt,
                        ProductDataRef: prdt,
                      });
                    }
                  }
                })
              );
            } else if (res.data.data[i].fld_category == "Footwear") {
              PostApiCall.postRequest(
                {
                  id: res.data.data[i].fld_productid,
                },
                "GetFestiveFootwearVariantDetails"
              ).then((results) =>
                results.json().then((obj) => {
                  if (results.status == 200 || results.status == 201) {
                    filt = prdt.filter(
                      (val) =>
                        val.fld_productid == obj.data[0].fld_id &&
                        val.fld_category == "Footwear"
                    );

                    // console.log(filt)

                    prdt[prdt.indexOf(filt[0])].ProdInfo = obj.data[0];

                    cn++;
                    if (cn == Object.keys(res.data.data).length) {
                      this.setState({
                        ProductData: prdt,
                        ProductDataRef: prdt,
                      });
                    }
                  }
                })
              );
            } else {
              PostApiCall.postRequest(
                {
                  id: res.data.data[i].fld_productid,
                },
                "GetFestiveSocksVariantDetails"
              ).then((results) =>
                results.json().then((obj) => {
                  if (results.status == 200 || results.status == 201) {
                    filt = prdt.filter(
                      (val) =>
                        val.fld_productid == obj.data[0].fld_id &&
                        val.fld_category == "Socks"
                    );

                    prdt[prdt.indexOf(filt[0])].ProdInfo = obj.data[0];

                    cn++;
                    if (cn == Object.keys(res.data.data).length) {
                      this.setState({
                        ProductData: prdt,
                        ProductDataRef: prdt,
                      });
                    }
                  }
                })
              );
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
          // console.log(dtar)
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
          //   console.log(res.data.data)

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
          //   console.log(res.data.data)

          this.setState({
            Socks: res.data.data,
          });
        });
    });

    GetApiCall.getRequest("GetBlogNine").then((resultdes) =>
      resultdes.json().then((obj) => {
        // console.log(obj.data)

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
      /\W|_/g,
      "-"
    )}/${
      (blog.fld_subcategory != "" && blog.fld_subcategory != null
        ? blog.fld_subcategory.replace(/\W|_/g, "-")
        : moment(blog.fld_publishdate).format("ll")) + "/"
    }${
      blog.fld_id +
      "-" +
      blog.fld_title
        .replace(/\W|_/g, "-")
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
    }`;
  }

  OnProductClicked(info) {
    console.log(info);
    if (info.fld_category == "Food") {
      window.location.href = `/food/${
        info.ProdInfo.fld_category.replace(
          /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
          "-"
        ) +
        "/" +
        info.ProdInfo.fld_foodid +
        "/" +
        info.ProdInfo.fld_id +
        "/" +
        info.ProdInfo.fld_name
          .replace(/ /g, "-")
          .replace(/\//g, "-")
          .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
      }`;
    } else if (info.fld_category == "Footwear") {
      window.location.href = `/footwear/${
        info.ProdInfo.fld_footid +
        "/" +
        info.ProdInfo.fld_id +
        "/" +
        info.ProdInfo.fld_name
          .replace(/ /g, "-")
          .replace(/\//g, "-")
          .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
      }`;
    } else {
      window.location.href = `/socks/${
        info.ProdInfo.fld_socksid +
        "/" +
        info.ProdInfo.fld_id +
        "/" +
        info.ProdInfo.fld_name
          .replace(/ /g, "-")
          .replace(/\//g, "-")
          .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
      }`;
    }
  }

  AddToCartFootwear(info) {
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
          url: `/footwear/${
            info.ProdInfo.fld_footid +
            "/" +
            info.ProdInfo.fld_id +
            "/" +
            info.ProdInfo.fld_name
              .replace(/ /g, "-")
              .replace(/\//g, "-")
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
          }`,
        },
        "AddShoppingCart"
      ).then((results) =>
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Info("Product added to Cart.");
            this.props.setcartitemcount(obj.data.length);
            this.props.setcartamount(
              obj.data.reduce(function (result, item) {
                return result + item.fld_amount * item.fld_quantity;
              }, 0)
            );
          } else {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Failure("Something went wrong, try again later.");
          }
        })
      );
    } else {
      var cart_info = JSON.parse(localStorage.getItem("BMSCartData"));
      var newCart = cart_info != null ? cart_info : [];
      if (cart_info != null) {
        var item = newCart.filter(
          (val) =>
            val.fld_variantid == info.ProdInfo.fld_id &&
            val.fld_productcategory == "Footwear"
        );
        if (item[0] != undefined) {
          var newIndex = newCart.indexOf(item[0]);
          newCart[newIndex].fld_quantity = newCart[newIndex].fld_quantity + 1;
          localStorage.setItem("BMSCartData", JSON.stringify(newCart));
          this.props.setcartitemcount(newCart.length);
          this.props.setcartamount(
            newCart.reduce(function (result, item) {
              return result + item.fld_amount * item.fld_quantity;
            }, 0)
          );
          Notiflix.Notify.Info("Product added to Cart.");
        } else {
          const addNewCartData = {
            fld_variantid: info.ProdInfo.fld_id,
            fld_productcategory: "Footwear",
            fld_quantity: 1,
            fld_amount: info.ProdInfo.fld_discountprice,
            fld_addedon: moment().format("lll"),
            fld_url: `/footwear/${
              info.ProdInfo.fld_footid +
              "/" +
              info.ProdInfo.fld_id +
              "/" +
              info.ProdInfo.fld_name
                .replace(/ /g, "-")
                .replace(/\//g, "-")
                .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
            }`,
          };

          newCart.push(addNewCartData);

          localStorage.setItem("BMSCartData", JSON.stringify(newCart));
          this.props.setcartitemcount(newCart.length);
          this.props.setcartamount(
            newCart.reduce(function (result, item) {
              return result + item.fld_amount * item.fld_quantity;
            }, 0)
          );
          Notiflix.Notify.Info("Product added to Cart.");
        }
      } else {
        const addNewCartData = {
          fld_variantid: info.ProdInfo.fld_id,
          fld_productcategory: "Footwear",
          fld_quantity: 1,
          fld_amount: info.ProdInfo.fld_discountprice,
          fld_addedon: moment().format("lll"),
          fld_url: `/footwear/${
            info.ProdInfo.fld_footid +
            "/" +
            info.ProdInfo.fld_id +
            "/" +
            info.ProdInfo.fld_name
              .replace(/ /g, "-")
              .replace(/\//g, "-")
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
          }`,
        };

        newCart.push(addNewCartData);
        localStorage.setItem("BMSCartData", JSON.stringify(newCart));
        this.props.setcartitemcount(newCart.length);
        this.props.setcartamount(
          newCart.reduce(function (result, item) {
            return result + item.fld_amount * item.fld_quantity;
          }, 0)
        );
        Notiflix.Notify.Info("Product added to Cart.");
      }
    }
  }

  AddToCartSocks(info) {
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
          url: `/socks/${
            info.ProdInfo.fld_socksid +
            "/" +
            info.ProdInfo.fld_id +
            "/" +
            info.ProdInfo.fld_name
              .replace(/ /g, "-")
              .replace(/\//g, "-")
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
          }`,
        },
        "AddShoppingCart"
      ).then((results) =>
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Info("Product added to Cart.");

            this.props.setcartitemcount(obj.data.length);
            this.props.setcartamount(
              obj.data.reduce(function (result, item) {
                return result + item.fld_amount * item.fld_quantity;
              }, 0)
            );
          } else {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Failure("Something went wrong, try again later.");
          }
        })
      );
    } else {
      var cart_info = JSON.parse(localStorage.getItem("BMSCartData"));
      var newCart = cart_info != null ? cart_info : [];
      if (cart_info != null) {
        var item = newCart.filter(
          (val) =>
            val.fld_variantid == info.ProdInfo.fld_id &&
            val.fld_productcategory == "Socks"
        );
        if (item[0] != undefined) {
          var newIndex = newCart.indexOf(item[0]);
          newCart[newIndex].fld_quantity = newCart[newIndex].fld_quantity + 1;
          localStorage.setItem("BMSCartData", JSON.stringify(newCart));
          this.props.setcartitemcount(newCart.length);
          this.props.setcartamount(
            newCart.reduce(function (result, item) {
              return result + item.fld_amount * item.fld_quantity;
            }, 0)
          );
          Notiflix.Notify.Info("Product added to Cart.");
        } else {
          const addNewCartData = {
            fld_variantid: info.ProdInfo.fld_id,
            fld_productcategory: "Socks",
            fld_quantity: 1,
            fld_amount: info.ProdInfo.fld_discountprice,
            fld_addedon: moment().format("lll"),
            fld_url: `/socks/${
              info.ProdInfo.fld_socksid +
              "/" +
              info.ProdInfo.fld_id +
              "/" +
              info.ProdInfo.fld_name
                .replace(/ /g, "-")
                .replace(/\//g, "-")
                .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
            }`,
          };

          newCart.push(addNewCartData);
          localStorage.setItem("BMSCartData", JSON.stringify(newCart));
          this.props.setcartitemcount(newCart.length);
          this.props.setcartamount(
            newCart.reduce(function (result, item) {
              return result + item.fld_amount * item.fld_quantity;
            }, 0)
          );
          Notiflix.Notify.Info("Product added to Cart.");
        }
      } else {
        const addNewCartData = {
          fld_variantid: info.ProdInfo.fld_id,
          fld_productcategory: "Socks",
          fld_quantity: 1,
          fld_amount: info.ProdInfo.fld_discountprice,
          fld_addedon: moment().format("lll"),
          fld_url: `/socks/${
            info.ProdInfo.fld_socksid +
            "/" +
            info.ProdInfo.fld_id +
            "/" +
            info.ProdInfo.fld_name
              .replace(/ /g, "-")
              .replace(/\//g, "-")
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
          }`,
        };
        newCart.push(addNewCartData);
        localStorage.setItem("BMSCartData", JSON.stringify(newCart));
        this.props.setcartitemcount(newCart.length);
        this.props.setcartamount(
          newCart.reduce(function (result, item) {
            return result + item.fld_amount * item.fld_quantity;
          }, 0)
        );
        Notiflix.Notify.Info("Product added to Cart.");
      }
    }
  }

  AddToCartFood(info) {
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
          url: `/food/${
            info.ProdInfo.fld_foodid +
            "/" +
            info.ProdInfo.fld_id +
            "/" +
            info.ProdInfo.fld_name
              .replace(/ /g, "-")
              .replace(/\//g, "-")
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
          }`,
        },
        "AddShoppingCart"
      ).then((results) =>
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Info("Product added to Cart.");
            console.log(obj.data);
            this.props.setcartitemcount(obj.data.length);
            this.props.setcartamount(
              obj.data.reduce(function (result, item) {
                return result + item.fld_amount * item.fld_quantity;
              }, 0)
            );
          } else {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Failure("Something went wrong, try again later.");
          }
        })
      );
    } else {
      var cart_info = JSON.parse(localStorage.getItem("BMSCartData"));
      var newCart = cart_info != null ? cart_info : [];
      if (cart_info != null) {
        var item = newCart.filter(
          (val) =>
            val.fld_variantid == info.ProdInfo.fld_id &&
            val.fld_productcategory == "Food"
        );
        if (item[0] != undefined) {
          var newIndex = newCart.indexOf(item[0]);
          newCart[newIndex].fld_quantity = newCart[newIndex].fld_quantity + 1;
          localStorage.setItem("BMSCartData", JSON.stringify(newCart));
          this.props.setcartitemcount(newCart.length);
          this.props.setcartamount(
            newCart.reduce(function (result, item) {
              return result + item.fld_amount * item.fld_quantity;
            }, 0)
          );
          Notiflix.Notify.Info("Product added to Cart.");
        } else {
          const addNewCartData = {
            fld_variantid: info.ProdInfo.fld_id,
            fld_productcategory: "Food",
            fld_quantity: 1,
            fld_amount: info.ProdInfo.fld_discountprice,
            fld_addedon: moment().format("lll"),
            fld_url: `/food/${
              info.ProdInfo.fld_foodid +
              "/" +
              info.ProdInfo.fld_id +
              "/" +
              info.ProdInfo.fld_name
                .replace(/ /g, "-")
                .replace(/\//g, "-")
                .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
            }`,
          };
          newCart.push(addNewCartData);
          localStorage.setItem("BMSCartData", JSON.stringify(newCart));
          this.props.setcartitemcount(newCart.length);
          this.props.setcartamount(
            newCart.reduce(function (result, item) {
              return result + item.fld_amount * item.fld_quantity;
            }, 0)
          );
          Notiflix.Notify.Info("Product added to Cart.");
        }
      } else {
        const addNewCartData = {
          fld_variantid: info.ProdInfo.fld_id,
          fld_productcategory: "Food",
          fld_quantity: 1,
          fld_amount: info.ProdInfo.fld_discountprice,
          fld_addedon: moment().format("lll"),
          fld_url: `/food/${
            info.ProdInfo.fld_foodid +
            "/" +
            info.ProdInfo.fld_id +
            "/" +
            info.ProdInfo.fld_name
              .replace(/ /g, "-")
              .replace(/\//g, "-")
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
          }`,
        };

        newCart.push(addNewCartData);

        localStorage.setItem("BMSCartData", JSON.stringify(newCart));
        this.props.setcartitemcount(newCart.length);
        this.props.setcartamount(
          newCart.reduce(function (result, item) {
            return result + item.fld_amount * item.fld_quantity;
          }, 0)
        );
        Notiflix.Notify.Info("Product added to Cart.");
      }
    }
  }

  AddToCartDiwali(info) {
    if (info.fld_category == "Food") {
      this.AddToCartFood(info);
    } else if (info.fld_category == "Footwear") {
      this.AddToCartFootwear(info);
    } else {
      this.AddToCartSocks(info);
    }
  }

  render() {
    const banner2 = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true,
      slidesToScroll: 1,
      arrows: false,
      autoplaySpeed: 5000,
    };
    const Mobilebanner = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true,
      slidesToScroll: 1,
      arrows: false,
      autoplaySpeed: 5000,
    };
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

    const banner = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true,
      slidesToScroll: 1,
      arrows: false,
      autoplaySpeed: 5000,
    };
    const testimonialSlider = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      autoplay: true,
      slidesToScroll: 1,
      arrows: false,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 990,
          settings: {
            arrows: false,
            centerMode: false,
            centerPadding: "40px",
            slidesToShow: 1,
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
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    var image = [];

    return (
      <div className="App">
        <div class="page-wrapper">
          <Menu></Menu>

          {/* <div class="row">
      
      <div class="col-sm-6 text-center"><div class="loader1">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div></div>
    </div> */}
          <main class="main">
            <div class="container">
              <div class="home-slider-container d-none d-sm-none d-md-block">
                <Slider {...banner}>
                  {this.state.bannerHome &&
                    this.state.bannerHome.map((info) => {
                      image.push(info.fld_image);
                      return (
                        <div>
                          {/* <a href={info.fld_url} target="_blank"> */}
                          <img
                            onClick={() => {
                              if (info.fld_url != "") {
                                window.open(info.fld_url, "_blank");
                              }
                            }}
                            src={info.fld_image}
                          ></img>
                          {/* </a> */}
                        </div>
                      );
                    })}
                </Slider>
              </div>

              <div class="home-slider-container d-md-none d-sm-block">
                <Slider {...banner}>
                  {this.state.bannerHome &&
                    this.state.bannerHome.map((info) => {
                      image.push(info.fld_mobileimage);
                      return (
                        <div>
                          <img
                            onClick={() => {
                              if (info.fld_url != "") {
                                window.open(info.fld_url, "_blank");
                              }
                            }}
                            src={info.fld_mobileimage}
                          ></img>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
            <div>
              <DiwaliOffersHP />
              {/* <div class="container blog-section">
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
          </div> */}
            </div>

            <div class="container blog-section">
              <h3 class="section-title margin-bottom">Food & Supplements</h3>
              <div>
                {/* <a href="/healthknowledge" class="view-all-btn">View More</a> */}
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
                                    ) +
                                    "/" +
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
                                        info.fld_category.replace(
                                          /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi
                                        ) +
                                        "/" +
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
                                {/* {book.fld_discountpercent == 0.0 ? ( */}
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
                                            // console.log(info.Variant.split(',')[i])
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
                                        // console.log(dt.target.value)
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
                                        this.AddToCartFood(info);

                                        // var log = localStorage.getItem(
                                        //   "CustomerLoginDetails"
                                        // );
                                        // var login = JSON.parse(log);

                                        // if (login != null && login != "") {
                                        //   Notiflix.Loading.Dots("");

                                        //   PostApiCall.postRequest(
                                        //     {
                                        //       customer_id: login.fld_userid,
                                        //       // customer_id : 13,
                                        //       variant_id: info.SelectedVar.split(
                                        //         "#"
                                        //       )[7],
                                        //       product_category: "Food",
                                        //       quantity: 1,
                                        //       updated_on: moment().format(
                                        //         "lll"
                                        //       ),
                                        //       updated_by: login.fld_userid,
                                        //       // updated_by :13
                                        //     },
                                        //     "AddShoppingCart"
                                        //   ).then((results) =>
                                        //     // const objs = JSON.parse(result._bodyText)
                                        //     results.json().then((obj) => {
                                        //       if (
                                        //         results.status == 200 ||
                                        //         results.status == 201
                                        //       ) {
                                        //         Notiflix.Loading.Remove();
                                        //         Notiflix.Notify.Info(
                                        //           "Product added to Cart."
                                        //         );
                                        //         window.location.reload();
                                        //       } else {
                                        //         Notiflix.Loading.Remove();
                                        //         Notiflix.Notify.Failure(
                                        //           "Something went wrong, try again later."
                                        //         );
                                        //       }
                                        //     })
                                        //   );
                                        // } else {
                                        //   // console.log('please login first')
                                        //   Notiflix.Notify.Failure(
                                        //     "Please Login to add products to your cart."
                                        //   );
                                        // }
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
                                            // const objs = JSON.parse(result._bodyText)
                                            results.json().then((obj) => {
                                              if (
                                                results.status == 200 ||
                                                results.status == 201
                                              ) {
                                                Notiflix.Loading.Remove();
                                                Notiflix.Notify.Info(
                                                  "Product added to Wishlist."
                                                );
                                                // window.location.reload()
                                              } else {
                                                Notiflix.Loading.Remove();
                                                Notiflix.Notify.Failure(
                                                  "Something went wrong, try again later."
                                                );
                                              }
                                            })
                                          );
                                        } else {
                                          // console.log('please login first')
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

            <div class="container blog-section">
              <h3 class="section-title margin-bottom">Footwear</h3>
              <div>
                {/* <a href="/healthknowledge" class="view-all-btn">View More</a> */}
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
                                {/* <p>
                      <p class="price"> &#8377;{foot.fld_productprice}</p>
                      <p class="extrapheight"></p>
                    </p> */}
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
                                        this.AddToCartFootwear(info);
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
                                              variant_id: info.fld_id,
                                              product_category: "Footwear",
                                              quantity: 1,
                                              updated_on: moment().format(
                                                "lll"
                                              ),
                                              updated_by: login.fld_userid,
                                              // updated_by :13
                                            },
                                            "AddWishlist"
                                          ).then((results) =>
                                            // const objs = JSON.parse(result._bodyText)
                                            results.json().then((obj) => {
                                              if (
                                                results.status == 200 ||
                                                results.status == 201
                                              ) {
                                                Notiflix.Loading.Remove();
                                                Notiflix.Notify.Info(
                                                  "Product added to Wishlist."
                                                );
                                                // window.location.reload()
                                              } else {
                                                Notiflix.Loading.Remove();
                                                Notiflix.Notify.Failure(
                                                  "Something went wrong, try again later."
                                                );
                                              }
                                            })
                                          );
                                        } else {
                                          // console.log('please login first')
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

            <div class="container blog-section">
              <h3 class="section-title margin-bottom">Socks</h3>
              <div>
                {/* <a href="/healthknowledge" class="view-all-btn">View More</a> */}
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
                                {/* <p>
                      <p class="price"> &#8377;{foot.fld_productprice}</p>
                      <p class="extrapheight"></p>
                    </p> */}
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
                                        this.AddToCartSocks(info);
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
                                            // const objs = JSON.parse(result._bodyText)
                                            results.json().then((obj) => {
                                              if (
                                                results.status == 200 ||
                                                results.status == 201
                                              ) {
                                                Notiflix.Loading.Remove();
                                                Notiflix.Notify.Info(
                                                  "Product added to Wishlist."
                                                );
                                                // window.location.reload()
                                              } else {
                                                Notiflix.Loading.Remove();
                                                Notiflix.Notify.Failure(
                                                  "Something went wrong, try again later."
                                                );
                                              }
                                            })
                                          );
                                        } else {
                                          // console.log('please login first')
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

                      {/* <span class="grid-item-date">
                              <span class="grid-item-day">{moment(blog.fld_publishdate).format('ll').split(' ')[1].split(',')[0]}</span>
                                        <span class="grid-item-month">{moment(blog.fld_publishdate).format('ll').split(' ')[0]} ' {moment(blog.fld_publishdate).format("YY")}</span>
                                       
                                    </span> */}
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

            {/* <div class="container">
              <div class="app-section margin-top margin-bottom">
                <div class="app-section-bg">
                  <div class="row ">
                    <div class="col-md-12">
                      <h3 class="app-title center-block text-center">
                        Testimonials
                      </h3>
                      <Slider {...testimonialSlider}>
                        <div class="testimonial center-block">
                          <i class="fas fa-quote-right testimonial-quote"></i>
                          <p class="user-text">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries,
                          </p>
                          <p class="user-name">Charles K. Silvey</p>
                          <p class="testimonial-city">Chennai</p>
                        </div>
                        <div class="testimonial center-block">
                          <i class="fas fa-quote-right testimonial-quote"></i>
                          <p class="user-text">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries,
                          </p>
                          <p class="user-name">Charles K. Silvey</p>
                          <p class="testimonial-city">Chennai</p>
                        </div>
                        <div class="testimonial center-block">
                          <i class="fas fa-quote-right testimonial-quote"></i>
                          <p class="user-text">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries,
                          </p>
                          <p class="user-name">Charles K. Silvey</p>
                          <p class="testimonial-city">Chennai</p>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div class="container">
                <section class="promotionWrapper" style={{backgroundImage: "url(/assets/images/Parallax/parallax1.jpg)"}}>
                <div class="overlay">
    <div class="container">
      <div class="promotionInfo"> 
  
        <h3>At BeatMySugar, we care for you because we are either managing the condition ourselves, or have seen our loved ones struggle with Diabetes.</h3>
       
       
      </div>
    </div>
    </div>
  </section>
                </div> */}

            <div class="clearfix"></div>

            {/* 
                <div class="container margin-top margin-bottom healthcare-slider">
                        <h3 class="section-title margin-bottom">Doctors</h3>
                        <div>
                            <a href="/doctor" class="view-all-btn-book">View All Doctors</a>
                           
                        </div>
                        <div class="row">

                        {this.state.Doctor.map(
                              (doc,index) => (

                            <div class="col-md-2">
                                    <div class="doctors-list">
                                        <img src={doc.fld_photo}></img>
                                        <a onClick={()=>{this.onDocDetailsView(doc)}}>  <p class="doctor-name">{doc.fld_title+' '+this.truncate(doc.fld_name,15)}</p></a>
                                        <p class="doctor-qualification">{doc.Qual}</p>
                              {doc.fld_overallexperience == 0 ? <p class="doctor-qualification"></p> : 
                              <p class="doctor-qualification">Overall {doc.fld_overallexperience} years of experience 
                             
                              </p>
                              }  
                                       
                                        {doc.HealthCenterCity == null ?  <br/> :   <p class="doctor-qualification"><i class="fas fa-map-marker-alt"></i> {doc.HealthCenterCity == null ? '' : doc.HealthCenterCity}</p>}

                                        <div class="border-line"></div>
                                        <a onClick={()=>{this.onDocDetailsView(doc)}} style={{color:"white"}} class="viewprofile-btn">View Profile</a>
                                    </div>
                            </div>
                              ))}

                          
                        </div>
                       
                </div>

             */}

            {/* <div class="container margin-top margin-bottom healthcare-slider marginbtm-240">
                        <h3 class="section-title margin-bottom custom-size">Nutritionists / Dietitians</h3>
                        <div>
                            <a href="/dietitian" class="view-all-btn-book">View All</a>
                           
                        </div>
                        <div class="row">
                        {this.state.Nutri.map(
                              (doc,index) => (

                            <div class="col-md-2">
                                    <div class="doctors-list dietitians">
                                        <img src={doc.fld_photo}></img>
                                      <a
                                      onClick={()=>{this.onDietDetailsView(doc)}}
                                      > <p class="doctor-name">{this.truncate(doc.fld_name,20)}</p></a> 
                                        <p class="doctor-qualification">{doc.Qual}</p>
                                      {doc.fld_overallexperience == 0 ? <p class="doctor-qualification"></p> : 
                              <p class="doctor-qualification">Overall {doc.fld_overallexperience} years of experience </p>
                              }  
                                      
                                    {doc.HealthCenterCity == null ?  <br/> :  <p class="doctors-location"><i class="fas fa-map-marker-alt" style={{color: '#507dbe'}}></i> {doc.HealthCenterCity == null ? '' : doc.HealthCenterCity}</p>}
                                                     
                                        <div class="border-line"></div>
                                        <a style={{color:"white"}}  onClick={()=>{this.onDietDetailsView(doc)}} class="viewprofile-btn">View Profile</a>
                                    </div>
                            </div>

                              ))}
                          
                        </div>
                       
                </div> */}

            <div class="clearfix"></div>

            {/* <div class="app-section margin-top margin-bottom">
                        <div class="row app-section-bg"> */}
            {/* <div class="col-md-6">
                                    <img src="assets/images/mobile.png" class="app-image"/>
                                    <h3 class="app-title">Download App</h3>
                                    <p class="app-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                                    <ul class="app-list-images">
                                        <li><img src="assets/images/android.png"/></li>
                                        <li><img src="assets/images/apple.png" style={{width:'165px'}}/></li>
                                    </ul>
                                </div>
                            <div class="col-md-6 border-left-shadow">
                                <h3 class="app-title center-block text-center">Testimonials</h3>
                                <div class="testimonial-slider owl-carousel owl-theme">
                                    <div class="testimonial center-block">
                                        <img src="http://magento2.codazon.com/unlimited/pub/media/wysiwyg/codazon/main-content-01/testimonial/test-02.jpg" class="user-image center-block"/>
                                        <p class="user-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                                        <p class="user-name">Charles K. Silvey
                                        </p>
                                    </div>
                                    <div class="testimonial center-block">
                                        <img src="http://magento2.codazon.com/unlimited/pub/media/wysiwyg/codazon/main-content-01/testimonial/test-03.jpg" class="user-image center-block"/>
                                        <p class="user-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                                        <p class="user-name">Charles K. Silvey
                                        </p>
                                    </div>
                                    <div class="testimonial center-block">
                                        <img src="http://magento2.codazon.com/unlimited/pub/media/wysiwyg/codazon/main-content-01/testimonial/test-02.jpg" class="user-image center-block"/>
                                        <p class="user-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                                        <p class="user-name">Charles K. Silvey
                                        </p>
                                    </div> */}

            {/* </div> */}
            {/* </div> */}
            {/* </div>

                    </div> */}

            <div class="container margin-top"></div>
          </main>
          {/* <div class="container-box container-box-lg info-boxes container">
                                        <div class="row">
                                          <div class="col-md-12">
                                            <h3>Join Our Team</h3>
                                            <p style={{fontSize : '14px'}}>If you have the traits of <span><i>"challenging the status quo", "self driven", "hunger to learn & contribute", "vibrancy of a team person"</i></span>.<br/>Let's have a chat over a cup of coffee / tea.<br/><br/>Do reach out to us <span><a href="mailto:hr@beatmysugar.com" style={{color: '#507dbe'}}>hr@beatmysugar.com</a></span> 
                                            
</p>
<p><a href="/careers" class="career-btn">View Job Openings</a></p>
                                          </div>
                                         
                                        
                    
                                         
                                        
                                                 
                                        </div>
                    
                                       
                    
                                      
                                    </div> */}

          <Footer></Footer>
        </div>
      </div>
    );
  }

  AddToCartFood(info) {
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
          url: `/food/${
            info.fld_id +
            "/" +
            info.SelectedVar.split("#")[7].split("$")[0] +
            "/" +
            info.fld_name
              .replace(/ /g, "-")
              .replace(/\//g, "-")
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
          }`,
          // updated_by :13
        },
        "AddShoppingCart"
      ).then((results) =>
        // const objs = JSON.parse(result._bodyText)
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
            Notiflix.Loading.Remove();

            Notiflix.Notify.Info("Product added to Cart.");
            // window.location.reload();

            console.log(obj.data);
            this.props.setcartitemcount(obj.data.length);
            this.props.setcartamount(
              obj.data.reduce(function (result, item) {
                return result + item.fld_amount * item.fld_quantity;
              }, 0)
            );
          } else {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Failure("Something went wrong, try again later.");
          }
        })
      );
    } else {
      var cart_info = JSON.parse(localStorage.getItem("BMSCartData"));

      // console.log(cart_info)
      var newCart = cart_info != null ? cart_info : [];

      if (cart_info != null) {
        var item = newCart.filter(
          (val) =>
            val.fld_variantid == info.SelectedVar.split("#")[7].split("$")[0] &&
            val.fld_productcategory == "Food"
        );

        // console.log(item)
        if (item[0] != undefined) {
          var newIndex = newCart.indexOf(item[0]);

          newCart[newIndex].fld_quantity = newCart[newIndex].fld_quantity + 1;

          // console.log(newCart)

          localStorage.setItem("BMSCartData", JSON.stringify(newCart));
          this.props.setcartitemcount(newCart.length);
          this.props.setcartamount(
            newCart.reduce(function (result, item) {
              return result + item.fld_amount * item.fld_quantity;
            }, 0)
          );
          Notiflix.Notify.Info("Product added to Cart.");
        } else {
          const addNewCartData = {
            fld_variantid: info.SelectedVar.split("#")[7].split("$")[0],
            fld_productcategory: "Food",
            fld_quantity: 1,
            fld_amount: info.SelectedVar.split("#")[3],
            fld_addedon: moment().format("lll"),
            fld_url: `/food/${
              info.fld_id +
              "/" +
              info.SelectedVar.split("#")[7].split("$")[0] +
              "/" +
              info.fld_name
                .replace(/ /g, "-")
                .replace(/\//g, "-")
                .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
            }`,
          };

          newCart.push(addNewCartData);
          // console.log(newCart.length)

          localStorage.setItem("BMSCartData", JSON.stringify(newCart));
          this.props.setcartitemcount(newCart.length);
          this.props.setcartamount(
            newCart.reduce(function (result, item) {
              return result + item.fld_amount * item.fld_quantity;
            }, 0)
          );
          Notiflix.Notify.Info("Product added to Cart.");
        }
      } else {
        const addNewCartData = {
          fld_variantid: info.SelectedVar.split("#")[7].split("$")[0],
          fld_productcategory: "Food",
          fld_quantity: 1,
          fld_amount: info.SelectedVar.split("#")[3],
          fld_addedon: moment().format("lll"),
          fld_url: `/food/${
            info.fld_id +
            "/" +
            info.SelectedVar.split("#")[7].split("$")[0] +
            "/" +
            info.fld_name
              .replace(/ /g, "-")
              .replace(/\//g, "-")
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
          }`,
        };

        newCart.push(addNewCartData);

        localStorage.setItem("BMSCartData", JSON.stringify(newCart));
        this.props.setcartitemcount(newCart.length);
        this.props.setcartamount(
          newCart.reduce(function (result, item) {
            return result + item.fld_amount * item.fld_quantity;
          }, 0)
        );
        Notiflix.Notify.Info("Product added to Cart.");
      }
    }
  }

  AddToCartFootwear(info) {
    var log = localStorage.getItem("CustomerLoginDetails");
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
          url: `/footwear/${
            info.fld_footid +
            "/" +
            info.fld_id +
            "/" +
            info.fld_name
              .replace(/ /g, "-")
              .replace(/\//g, "-")
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
          }`,
          // updated_by :13
        },
        "AddShoppingCart"
      ).then((results) =>
        // const objs = JSON.parse(result._bodyText)
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
            Notiflix.Loading.Remove();

            Notiflix.Notify.Info("Product added to Cart.");
            // window.location.reload();

            this.props.setcartitemcount(obj.data.length);
            this.props.setcartamount(
              obj.data.reduce(function (result, item) {
                return result + item.fld_amount * item.fld_quantity;
              }, 0)
            );
          } else {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Failure("Something went wrong, try again later.");
          }
        })
      );
    } else {
      var cart_info = JSON.parse(localStorage.getItem("BMSCartData"));

      // console.log(cart_info)
      var newCart = cart_info != null ? cart_info : [];

      if (cart_info != null) {
        var item = newCart.filter(
          (val) =>
            val.fld_variantid == info.fld_id &&
            val.fld_productcategory == "Footwear"
        );

        // console.log(item)
        if (item[0] != undefined) {
          var newIndex = newCart.indexOf(item[0]);

          newCart[newIndex].fld_quantity = newCart[newIndex].fld_quantity + 1;

          // console.log(newCart)

          localStorage.setItem("BMSCartData", JSON.stringify(newCart));
          this.props.setcartitemcount(newCart.length);
          this.props.setcartamount(
            newCart.reduce(function (result, item) {
              return result + item.fld_amount * item.fld_quantity;
            }, 0)
          );
          Notiflix.Notify.Info("Product added to Cart.");
        } else {
          const addNewCartData = {
            fld_variantid: info.fld_id,
            fld_productcategory: "Footwear",
            fld_quantity: 1,
            fld_amount: info.fld_discountprice,
            fld_addedon: moment().format("lll"),
            fld_url: `/footwear/${
              info.fld_footid +
              "/" +
              info.fld_id +
              "/" +
              info.fld_name
                .replace(/ /g, "-")
                .replace(/\//g, "-")
                .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
            }`,
          };

          newCart.push(addNewCartData);

          localStorage.setItem("BMSCartData", JSON.stringify(newCart));
          this.props.setcartitemcount(newCart.length);
          this.props.setcartamount(
            newCart.reduce(function (result, item) {
              return result + item.fld_amount * item.fld_quantity;
            }, 0)
          );
          Notiflix.Notify.Info("Product added to Cart.");
        }
      } else {
        const addNewCartData = {
          fld_variantid: info.fld_id,
          fld_productcategory: "Footwear",
          fld_quantity: 1,
          fld_amount: info.fld_discountprice,
          fld_addedon: moment().format("lll"),
          fld_url: `/footwear/${
            info.fld_footid +
            "/" +
            info.fld_id +
            "/" +
            info.fld_name
              .replace(/ /g, "-")
              .replace(/\//g, "-")
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
          }`,
        };

        newCart.push(addNewCartData);

        localStorage.setItem("BMSCartData", JSON.stringify(newCart));
        this.props.setcartitemcount(newCart.length);
        this.props.setcartamount(
          newCart.reduce(function (result, item) {
            return result + item.fld_amount * item.fld_quantity;
          }, 0)
        );
        Notiflix.Notify.Info("Product added to Cart.");
      }
    }
  }

  AddToCartSocks(info) {
    var log = localStorage.getItem("CustomerLoginDetails");
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
          url: `/socks/${
            info.fld_socksid +
            "/" +
            info.fld_id +
            "/" +
            info.fld_name
              .replace(/ /g, "-")
              .replace(/\//g, "-")
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
          }`,
          // updated_by :13
        },
        "AddShoppingCart"
      ).then((results) =>
        // const objs = JSON.parse(result._bodyText)
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
            Notiflix.Loading.Remove();

            Notiflix.Notify.Info("Product added to Cart.");
            // window.location.reload();

            this.props.setcartitemcount(obj.data.length);
            this.props.setcartamount(
              obj.data.reduce(function (result, item) {
                return result + item.fld_amount * item.fld_quantity;
              }, 0)
            );
          } else {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Failure("Something went wrong, try again later.");
          }
        })
      );
    } else {
      var cart_info = JSON.parse(localStorage.getItem("BMSCartData"));

      // console.log(cart_info)
      var newCart = cart_info != null ? cart_info : [];

      if (cart_info != null) {
        var item = newCart.filter(
          (val) =>
            val.fld_variantid == info.fld_id &&
            val.fld_productcategory == "Socks"
        );

        // console.log(item)
        if (item[0] != undefined) {
          var newIndex = newCart.indexOf(item[0]);

          newCart[newIndex].fld_quantity = newCart[newIndex].fld_quantity + 1;

          // console.log(newCart)

          localStorage.setItem("BMSCartData", JSON.stringify(newCart));
          this.props.setcartitemcount(newCart.length);
          this.props.setcartamount(
            newCart.reduce(function (result, item) {
              return result + item.fld_amount * item.fld_quantity;
            }, 0)
          );
          Notiflix.Notify.Info("Product added to Cart.");
        } else {
          const addNewCartData = {
            fld_variantid: info.fld_id,
            fld_productcategory: "Socks",
            fld_quantity: 1,
            fld_amount: info.fld_discountprice,
            fld_addedon: moment().format("lll"),
            fld_url: `/socks/${
              info.fld_socksid +
              "/" +
              info.fld_id +
              "/" +
              info.fld_name
                .replace(/ /g, "-")
                .replace(/\//g, "-")
                .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
            }`,
          };

          newCart.push(addNewCartData);

          localStorage.setItem("BMSCartData", JSON.stringify(newCart));
          this.props.setcartitemcount(newCart.length);
          this.props.setcartamount(
            newCart.reduce(function (result, item) {
              return result + item.fld_amount * item.fld_quantity;
            }, 0)
          );
          Notiflix.Notify.Info("Product added to Cart.");
        }
      } else {
        const addNewCartData = {
          fld_variantid: info.fld_id,
          fld_productcategory: "Socks",
          fld_quantity: 1,
          fld_amount: info.fld_discountprice,
          fld_addedon: moment().format("lll"),
          fld_url: `/socks/${
            info.fld_socksid +
            "/" +
            info.fld_id +
            "/" +
            info.fld_name
              .replace(/ /g, "-")
              .replace(/\//g, "-")
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
          }`,
        };

        newCart.push(addNewCartData);

        localStorage.setItem("BMSCartData", JSON.stringify(newCart));
        this.props.setcartitemcount(newCart.length);
        this.props.setcartamount(
          newCart.reduce(function (result, item) {
            return result + item.fld_amount * item.fld_quantity;
          }, 0)
        );
        Notiflix.Notify.Info("Product added to Cart.");
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    CartReducer: state.CartReducer,
  };
}

export default connect(mapStateToProps, {
  setcartitemcount,
  setcartamount,
})(App);
