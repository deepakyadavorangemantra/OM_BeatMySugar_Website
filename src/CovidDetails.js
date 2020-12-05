/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import Parser from "html-react-parser";

import PostApiCall from "./Api";
import Notiflix from "notiflix-react";

import GetApiCall from "./GetApi";
import moment from "moment";
import ReactImageMagnify from "react-image-magnify";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { connect } from "react-redux";
import {
 
  setcartitemcount,
  setcartamount
} from "./Actions/actionType";

class CovidDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FoodMaster: [],
      FoodVariants : [],

      SelectedVariant : [],

      selectedFootImg : '',

      SelectedColor: "",
      SelectedSize: "",

      SizeData: [],
      ColorData: [],

      RelatedProducts : [],
      PackData : [],
      SelectedPack : '',

      quantity : 1,
      done : false,
      bannerfood:[],
      images:[],
      images1:[],
      SideBannerFood : []
    };
  }
  


  componentDidMount() {

    let images=[]
    let images1=[]
    PostApiCall.postRequest(
      {
        verticle : 'Covid Essentials',
        type:'Detail Page'
      }
      ,"Get_AdBannerWebsite").then(resultdes =>
      resultdes.json().then(obj => {
        if(obj.data.length > 0)
        {
          this.setState({
            bannerfood:[obj.data[0]]
            // images:images
          }) 
          }
        }))

        PostApiCall.postRequest(
          {
            verticle : 'Covid Essentials',
            type:'Detail Page Side Banner'
          }
          ,"Get_AdBannerWebsite").then(resultdes =>
          resultdes.json().then(obj => {
          
            if(obj.data.length > 0)
            {
              this.setState({
                SideBannerFood:[obj.data[0]]
                // images1:images1
              }) 
            }
            }))

    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    });


    Notiflix.Loading.Dots("");

    PostApiCall.postRequest(
      {
        id: this.props.match.params.covidid,
      },
      "GetCovidMasterDetailsWebsite"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {
     
          this.setState({
            FoodMaster: obj.data[0],
          });

          // console.log(obj.data[0])

  PostApiCall.postRequest(
      {
        category : obj.data[0].fld_category,
        id : obj.data[0].fld_id
      },
      "GetCovidCategoryListingWebsite"
    ).then((results1) =>
      results1.json().then((obj1) => {
        if (results1.status == 200 || results1.status == 201) {

          console.log(obj1.data)
     
          var dtar = [...obj1.data]
              for(var i =0 ;i<Object.keys(obj1.data).length;i++){

                // console.log(dtar[i])
                if(obj1.data[i].Variant != null){
                  dtar[i].SelectedVar = obj1.data[i].Variant.split('^')[0] 
                }else
                {
                  // dtar.splice(dtar[i])
                }
            

              }
          this.setState({
            RelatedProducts: dtar
          });

          

        }
      })
    );
        }
      })
    );


    PostApiCall.postRequest(
      {
        id: this.props.match.params.covidid,
      },
      "GetCovidVariantDetailsWebsite"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {
          console.log(obj.data)

          this.setState({
            FoodVariants: obj.data,
            done : true
          });
          Notiflix.Loading.Remove();
          for (var i = 0; i < Object.keys(obj.data).length; i++) {
            if (obj.data[i].fld_id == this.props.match.params.varid) {
              this.setState({
                SelectedVariant: obj.data[i],
                SelectedColor: obj.data[i].fld_color,
                SelectedSize: obj.data[i].fld_size,
              });
            }
          }

          var size = []
          for(var i =0 ;i<Object.keys(obj.data).length;i++){


            size.push(obj.data[i].fld_size)
          
              this.setState({
                SizeData : Array.from(new Set(size))
              })

          }

          var color = [];
          for (var i = 0; i < Object.keys(obj.data).length; i++) {
            color.push(obj.data[i].fld_color);

            // this.setState({
            //   ColorData : Array.from(new Set(color))
            // })
          }

          color = Array.from(new Set(color));

          var colorfootwear = [];

          for (var i = 0; i < color.length; i++) {
            for (var j = 0; j < Object.keys(obj.data).length; j++) {
              if (obj.data[j].fld_color == color[i]) {
                if (this.search(color[i], colorfootwear)) {
                }
                // if(obj.data[j].fld_id != this.props.match.params.varid)
                else {
                  colorfootwear.push({
                    color: color[i],
                    imgurl: obj.data[j].Photos.split("#")[0],
                  });

                  this.setState({
                    ColorData: colorfootwear,
                  });
                }
              }
            }
            
          }


           var cn = 0

        for(var i =0 ;i<Object.keys(obj.data).length;i++){

            if(obj.data[i].fld_id == this.props.match.params.varid){

          
          
              // console.log(obj.data[i])
              this.setState({
                SelectedVariant : obj.data[i],
                SelectedPack : obj.data[i].Pack
              })
            }
          }


                var pack = []
          for(var i =0 ;i<Object.keys(obj.data).length;i++){


            cn = cn +1
            pack.push(obj.data[i].Pack)
          
              this.setState({
                PackData : pack 
              })

              if(cn == Object.keys(obj.data).length){
                Notiflix.Loading.Remove();
                this.setState({
                  done : true
                })
              }

          }

          
        }
      })
    );

    // var cn = 0
    // PostApiCall.postRequest(
    //   {
    //     id: this.props.match.params.covidid,
    //   },
    //   "GetCovidVariantDetailsWebsite"
    // ).then((results) =>
    //   results.json().then((obj) => {
    //     if (results.status == 200 || results.status == 201) {

    //       // console.log(obj.data)

    //       this.setState({
    //         FoodVariants: obj.data,
    //       });

    //       for(var i =0 ;i<Object.keys(obj.data).length;i++){

    //         if(obj.data[i].fld_id == this.props.match.params.varid){

          
          
    //           // console.log(obj.data[i])
    //           this.setState({
    //             SelectedVariant : obj.data[i],
    //             SelectedPack : obj.data[i].Pack
    //           })

              


    //         }

    //       }


    //       var pack = []
    //       for(var i =0 ;i<Object.keys(obj.data).length;i++){


    //         cn = cn +1
    //         pack.push(obj.data[i].Pack)
          
    //           this.setState({
    //             PackData : pack 
    //           })

    //           if(cn == Object.keys(obj.data).length){
    //             Notiflix.Loading.Remove();
    //             this.setState({
    //               done : true
    //             })
    //           }

    //       }
    //     }
    //   })
    // );
 
  }


  search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].color === nameKey) {
            return myArray[i];
        }
    }
}

  AddToCart() {


    var log = localStorage.getItem('CustomerLoginDetails')
    var login = JSON.parse(log);

    if (login != null && login != "") {

      Notiflix.Loading.Dots('');

      PostApiCall.postRequest(
        {
          customer_id: login.fld_userid,
          variant_id: this.state.SelectedVariant.fld_id,
          product_category: "Covid",
          quantity: this.state.quantity,
          updated_on: moment().format("lll"),
          updated_by: login.fld_userid,
          amount : this.state.SelectedVariant.fld_discountprice,
          url : `/covidessentials/${
            this.props.match.params.covidid +
            "/" +
            this.props.match.params.varid +
            "/" +
            this.props.match.params.covidname }`
        
        },
        "AddShoppingCart"
      ).then((results) =>

        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {

            Notiflix.Loading.Remove()
            
            this.props.setcartitemcount(obj.data.length)
            this.props.setcartamount(obj.data.reduce(function (result, item) {
              return result + (item.fld_amount*item.fld_quantity);
            }, 0))
            Notiflix.Notify.Info("Product Added to Cart");
            // window.location.reload()

          } else {
            Notiflix.Loading.Remove()
            Notiflix.Notify.Failure('Something went wrong, try again later.') 
          }
        })
      );
    } else {

      var cart_info = JSON.parse(localStorage.getItem('BMSCartData'))

      // console.log(cart_info)
      var newCart = cart_info != null ? cart_info : []

      if(cart_info != null){

    
        var item = newCart.filter(val => val.fld_variantid == this.state.SelectedVariant.fld_id && val.fld_productcategory == 'Covid')

        // console.log(item)
        if(item[0] != undefined){

          var newIndex = newCart.indexOf(item[0])

          newCart[newIndex].fld_quantity =  newCart[newIndex].fld_quantity + 1

          console.log(newCart)

          localStorage.setItem('BMSCartData',JSON.stringify(newCart))
          this.props.setcartitemcount(newCart.length)
          this.props.setcartamount(newCart.reduce(function (result, item) {
            return result + (item.fld_amount*item.fld_quantity);
          }, 0))
          Notiflix.Notify.Info("Product added to Cart.");

          

        }else{

          const addNewCartData ={
            fld_variantid : this.state.SelectedVariant.fld_id,
            fld_productcategory : 'Covid',
            fld_quantity : this.state.quantity,
            fld_amount : this.state.SelectedVariant.fld_discountprice,
            fld_addedon : moment().format('lll'),
            fld_url :`/covidessentials/${
              this.props.match.params.covidid +
              "/" +
              this.props.match.params.varid +
              "/" +
              this.props.match.params.covidname
              
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
          fld_variantid : this.state.SelectedVariant.fld_id,
          fld_productcategory : 'Covid',
          fld_quantity : this.state.quantity,
          fld_amount : this.state.SelectedVariant.fld_discountprice,
          fld_addedon : moment().format('lll'),
          fld_url :`/covidessentials/${
            this.props.match.params.covidid +
            "/" +
            this.props.match.params.varid +
            "/" +
            this.props.match.params.foodname
            
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



  truncate(source, size) {
    // console.log(source)
    if (source != null) {
      return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }
  }

  render() {

    var image=[]
    var image1=[]

    const settings = {
   
      centerMode: false,
      centerPadding: '60px',
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
          breakpoint: 1024,
          settings: {
            arrows: false,
            centerMode: false,
            centerPadding: '40px',
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            centerMode: false,
            centerPadding: '40px',
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: false,
            centerPadding: '40px',
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
};


    return (
      <div>
        <Menu></Menu>
   
        <div class="container ad-banner">

<div class="d-none d-sm-none d-md-block">
{this.state.bannerfood && this.state.bannerfood.map(info=>(

<img 
onClick={()=>{
  if(info.fld_url != ''){
    window.open(info.fld_url, '_blank');
   }
}}
src={info.fld_image}/>  
))
}

</div>

  <div id="myTargetMobile" class="d-md-none d-sm-block">

  {this.state.bannerfood && this.state.bannerfood.map(info=>(
    <img 
    onClick={()=>{
      if(info.fld_url != ''){
        window.open(info.fld_url, '_blank');
       }
    }}
   src={info.fld_mobileimage}/>  
  ))
}

  </div>


</div>
       
        <main class="main" style={{display : this.state.done ? '' : 'none'}}>
          <div class="container">
            <div class="container-box" style={{ marginTop: "40px" }}>
              <div class="row">
                <div class="col-lg-9">
                  <div class="product-single-container product-single-default">
                    <div class="row">
                      <div class="col-lg-1 col-md-2">
                      <div class="image-list">
                      {this.state.SelectedVariant.Photos != undefined ?
                       this.state.SelectedVariant.Photos.split('#').map(
                                                  (url,index) => (
                                                            <img src={url} onMouseOver={()=>{
                                                                this.setState({
                                                                    selectedFootImg : url
                                                                })
                                                            }}></img>
                                                           
                                                            ))
                                                          :''
                                                          }
                      </div>
                      </div>
                      <div class="col-lg-5 col-md-4 product-single-gallery">
                        <div class="product-slider-container product-item">
                          <div class="product-item product-single-image">
                          <ReactImageMagnify
                            {...{
                              smallImage: {
                                alt: "Wristwatch by Ted Baker London",
                                isFluidWidth: true,
                                src: this.state.selectedFootImg == '' ? this.state.SelectedVariant.Photos != undefined ?  this.state.SelectedVariant.Photos.split('#')[0] : '' : this.state.selectedFootImg,
                              },
                              largeImage: {
                                src: this.state.selectedFootImg == '' ? this.state.SelectedVariant.Photos != undefined ?  this.state.SelectedVariant.Photos.split('#')[0] : '' : this.state.selectedFootImg,
                                width: 1500,
                                height: 2000,
                              },
                              lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
                              isHintEnabled: true,
                              shouldHideHintAfterFirstActivation: false,
                              enlargedImageContainerDimensions: {
                                width: "150%",
                                height: "200%",
                              },
                            }}
                          />
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-5 col-md-6 food-sec">
                        <div class="product-single-details">
                        <h1 class="product-title">
                        {this.state.SelectedVariant.fld_name}
                        </h1>
                          <div class="ratings-container">
                          {/* <a href="#" class="rating-link"> */}
                               {/* <span class="company-name">{this.state.SelectedVariant.fld_sku}</span> */}
                            {/* </a> */}
                            <p class="rating-link">
                              Brand <span class="company-name">{this.state.FoodMaster.fld_brand}</span>
                            </p>
                            <p class="rating-link">
                              Sold By <span class="company-name">{this.state.FoodMaster.fld_company}</span>
                            </p>
                            <p class="rating-link">
                          Country Of Origin  <span class="company-name">{this.state.FoodMaster.fld_countryoforigin}</span>
                            </p>
                          </div>
                          {/* <p>
                            <span class="product-price">&#8377;700.00</span>
                            <p class="extrapheight"></p>
                          </p> */}
                             {this.state.SelectedVariant.fld_discountpercent == 0 ?
                          
                          <div>
                          <div class="price-box">
                                    <span class="product-price">&#8377; {parseFloat(this.state.SelectedVariant.fld_discountprice).toFixed(2)}</span>
                          
                            
                          </div>
                          
                          </div>
                        :
                        <div>
                        <div class="price-box">
                                  <span class="product-price">&#8377; {parseFloat(this.state.SelectedVariant.fld_discountprice).toFixed(2)}</span>
                          <span class="old-price">
                            <strike>&#8377;{parseFloat(this.state.SelectedVariant.fld_price).toFixed(2)}</strike>
                          </span>
                          
                        </div>
                        
                        <p class="discount-price"><span class="old-price old-price-updated" style={{padding:"0px"}}> You Save &#8377; {parseFloat(this.state.SelectedVariant.fld_price - this.state.SelectedVariant.fld_discountprice).toFixed(2)} ({this.state.SelectedVariant.fld_discountpercent}%)</span></p>
                        </div>
                        }
                           <p class="tax">Inclusive of All Taxes</p>
                      
                        
                         
                      <ul class="product-list">
                          <li
                            class="stock"
                            style={{
                              display:
                              this.state.SelectedVariant.fld_availability == "In stock"
                                  ? ""
                                  : "none",
                            }}
                          >
                            
                            In Stock <span style={{ color: "#bdbdbd" }}>|</span>
                          </li>

                          <li
                            class="return"
                            style={{
                              display:
                              this.state.SelectedVariant.fld_availability == "Out of stock"
                                  ? ""
                                  : "none",
                            }}
                          >
                            <i class="fas fa-times-circle"></i> Out Of Stock{" "}
                            <span style={{ color: "#bdbdbd" }}>|</span>
                          </li>

                          <li
                            class="return"
                            style={{
                              display:
                                this.state.FoodMaster.fld_returnable == "No"
                                  ? ""
                                  : "none",
                            }}
                          >
                            <i class="fas fa-times-circle"></i> Not Returnable
                          </li>
                         
                          <li
                            class="return"
                            style={{
                              display:
                              this.state.SelectedVariant.fld_availability == "Banned"
                                  ? "none"
                                  : "none",
                            }}
                          >
                            Banned
                          </li>
                          <li
                            class="return"
                            style={{
                              display:
                              this.state.SelectedVariant.fld_availability ==
                                "Discontinued"
                                  ? "none"
                                  : "none",
                            }}
                          >
                            Discontinued
                          </li>
                          <li
                            class="returnable"
                            style={{
                              display:
                                this.state.FoodMaster.fld_returnable == "Yes"
                                  ? ""
                                  : "none",
                            }}
                          >
                            Returnable
                          </li>
                        </ul>


                        <select id="cars" name="cars"
                        style={{display : this.state.SelectedPack == 'N/A' || this.state.SelectedPack == null ? 'none' : ''}}
                        value ={this.state.SelectedPack}
                        onChange={(dt)=>{
                          var dr = [...this.state.FoodVariants]
                          for(var i =0 ;i<this.state.FoodVariants.length;i++){

                            if(this.state.FoodVariants[i].Pack == dt.target.value){

                            window.location.href = `/covidessentials/${this.state.FoodMaster.fld_category.replace(/\W|_/g,"")+"/"+this.state.FoodMaster.fld_id+"/"+this.state.FoodVariants[i].fld_id+"/"+this.state.FoodVariants[i].fld_name.replace(/\W|_/g,"")}`


                            }

                          }
                       
                        }}>
            {this.state.PackData.map((dt,i)=>(
                          <option value={dt}>{dt}</option>
                          ))}
 

</select>


<div class="size-chart-updated" style={{display : this.state.SelectedSize == 'N/A' || this.state.SelectedSize == null ? 'none' : ''}}>
                          <p>
                            <b>Sizes Available (UK)</b>
                          </p>
                          <span>
                            {/* <a
                              href=""
                              style={{
                                marginLeft: "5px",
                                color: "#000",
                                textDecoration: "underline",
                                fontSize: "13px",
                              }}
                              data-toggle="modal"
                              data-target="#exampleModal"
                            >
                              Size Chart
                            </a> */}
                          </span>
                          <ul>
                            {this.state.SizeData.map((dt, i) => (
                              <li>
                                <a
                                  class={
                                    dt == this.state.SelectedSize
                                      ? "size-selected"
                                      : ""
                                  }
                                  onClick={() => {
                                    for (
                                      var i = 0;
                                      i < this.state.FootVariants.length;
                                      i++
                                    ) {
                                      if (
                                        this.state.FoodVariants[i].fld_size ==
                                          dt &&
                                        this.state.FoodVariants[i].fld_color ==
                                          this.state.SelectedColor
                                      ) {
                                        window.location.href = `/covidessentials/${this.state.FoodMaster.fld_category.replace(/\W|_/g,"")+"/"+this.state.FoodMaster.fld_id+"/"+this.state.FoodVariants[i].fld_id+"/"+this.state.FoodVariants[i].fld_name.replace(/\W|_/g,"")}`

                                      }
                                    }
                                  }}
                                >
                                  {dt}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div class="size-chart-updated" style={{display : this.state.SelectedColor == 'N/A' || this.state.SelectedColor == null ? 'none' : ''}}>
                          <p>
                            <b>Colors Available</b>
                          </p>
                          <ul>
                            {this.state.ColorData.map((dt, i) => (
                              <li
                                class={
                                  dt.color == this.state.SelectedColor
                                    ? "color-selected"
                                    : ""
                                }
                                onClick={() => {
                                  for ( var i = 0;i < this.state.FoodVariants.length;i++) {
                                    if (this.state.FoodVariants[i].fld_size == this.state.SelectedSize &&this.state.FoodVariants[i].fld_color ==dt.color) {
                                      window.location.href = `/covidessentials/${this.state.FoodMaster.fld_category.replace(/\W|_/g,"")+"/"+this.state.FoodMaster.fld_id+"/"+this.state.FoodVariants[i].fld_id+"/"+this.state.FoodVariants[i].fld_name.replace(/\W|_/g,"")}`

                                    }
                                  }
                                }}
                              >
                                <img
                                  src={dt.imgurl}
                                  style={{ height: "50px" }}
                                ></img>
                                {dt.color == this.state.SelectedColor ? (
                                  <div class="overlay"></div>
                                ) : (
                                  ""
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                     


                          <div class="product-action product-all-icons">
                            <div class="product-single-qty">
                              <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                <span class="input-group-btn input-group-prepend">
                                  <button
                                    class="btn btn-outline btn-down-icon bootstrap-touchspin-down"
                                    type="button"
                                    onClick={() => {
                                      if (this.state.quantity > 1) {
                                        this.setState({
                                          quantity: this.state.quantity - 1,
                                        });
                                      }
                                    }}
                                  ></button>
                                </span>
                                <input
                                  class="quantity-box"
                                  type="text"
                                  value={this.state.quantity}
                                />
                                <span class="input-group-btn input-group-append">
                                  <button
                                    class="btn btn-outline btn-up-icon bootstrap-touchspin-up"
                                    type="button"
                                    onClick={() => {
                                      this.setState({
                                        quantity: this.state.quantity + 1,
                                      });
                                    }}
                                  ></button>
                                </span>
                              </div>
                            </div>

                            <a
                              class="paction add-cart"
                              title="Add to Cart"
                              style={{
                                display: this.state.SelectedVariant.fld_availability == 'In stock' ? '' : 'none'
                              }}
                              onClick={this.AddToCart.bind(this)}
                            >
                              <span>Add to Cart</span>
                            </a>
                            <a
                              
                              onClick={()=>{
                                var log = localStorage.getItem('CustomerLoginDetails')
                                var login = JSON.parse(log)
                        
                        
                                if(login != null && login != ''){
                        
                                    Notiflix.Loading.Dots('');
                        
                                    PostApiCall.postRequest({
                            
                                      customer_id: login.fld_userid,

                                      variant_id: this.state.SelectedVariant.fld_id,
                                      product_category: "Covid",
                                      quantity: this.state.quantity,
                                      updated_on: moment().format("lll"),
                                      updated_by: login.fld_userid,
                                    
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
                            
                            class="paction add-wishlist"
                            title="Add to Wishlist"
                        
                        >
                              <span>Add to Wishlist</span>
                            </a>
                            {/* <a href="#" class="paction add-compare" title="Add to Compare">
                                                    <span>Add to Compare</span>
                                                </a> */}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12 ">
                        <div class="detail-description">
                      <h4>Key Ingredients</h4>
<p>
{Parser(('<p>'+this.state.FoodMaster.fld_keyingredients+'</p>').replace(/font-family/g, ''))}

</p>
</div>
                 </div>

                 <div class="col-md-12 ">
                        <div class="detail-description">
                   <h4>Product Description</h4>
                   <p style={{textAlign: "justify"}}>
                   {Parser(('<p>'+this.state.FoodMaster.fld_description+'</p>').replace(/font-family/g, ''))}
                  

</p>
</div>

                 </div>
                    </div>
                  </div>
                </div>

                <div class="sidebar-overlay"></div>
                <div class="sidebar-toggle d-none d-sm-none d-xs-none">
                  <i class="icon-sliders"></i>
                </div>
              
                <aside class="sidebar-product col-lg-3 padding-left-lg mobile-sidebar">
                  <div class="sidebar-wrapper">
                    <div class="widget widget-info">
                    <ul>
                      <li>
                        <img src="/assets/images/free-shiping.png" class="side-bar-icon"></img>
                        <h4 >
                          FREE
                          <br />
                          SHIPPING
                        </h4>
                      </li>
                      <li>
                      <img src="/assets/images/genuine-products.png" class="side-bar-icon"></img>
                        <h4>
                          100% GENUINE
                          <br />
                          PRODUCTS
                        </h4>
                      </li>
                      <li>
                      <img src="/assets/images/customer-support.png" class="side-bar-icon"></img>
                        <h4>
                          ONLINE
                          <br />
                          SUPPORT 
                        </h4>
                      </li>
                    </ul>
                    </div>
                

      

                  <div class="widget widget-banner">
                    <div class="banner banner-image">
                      <a href="#">
                        {/* <img
                          src="/assets/images/banners/banner-sidebar.jpg"
                          alt="Banner Desc"
                        /> */}
                        <div>
                        {this.state.SideBannerFood && this.state.SideBannerFood.map(info=>(
                          <img 
                          onClick={()=>{
                            if(info.fld_url != ''){
                              window.open(info.fld_url, '_blank');
                             }
                          }}
                          src={info.fld_image}/>  
                        ))
                          }
                     

                        </div>
                      </a>
                    </div>
                  </div>
                  
                </div>
              </aside>
          
              </div>
            </div>
          </div>
        </main>
        <div class="container doctors-section food-section">
          <h3 class="section-title" style={{display : this.state.RelatedProducts.length == 0 ? 'none' : ''}}>Related Products</h3>
          <div class="row healthcare-slider">
            <div class="col-md-12">
              <div class="row">
<ul class="related-products-list">
<Slider {...settings}>
                {this.state.RelatedProducts.map((info,index)=>(

<li style={{display : info.fld_name == '' ? 'none' : ''}}>
<div class="partner product-inner ">
                    <div id="overlay" style={{display : info.fld_availability =='In stock' ? 'none' : ''}}>Out Of Stock</div>

                    <img
                      src={info.Photos != null && info.Photos != '' ? info.Photos.split(',')[0] : ''}
                      alt="product"
                      class="footcare-image img-center"
                      onClick={()=>{
                        window.location.href = `/covidessentials/${
                          info.fld_category.replace(/\W|_/g,"") +
                          "/" +
                          info.fld_covidid +
                          "/" +
                          info.fld_id +
                          "/" +
                          info.fld_name.replace(/\W|_/g,"")
                        }`;
                      }}
                    />

                    <div class="product-details">
                      <p class="product-title">
                        <a 
                        onClick={()=>{
                          window.location.href = `/covidessentials/${
                            info.fld_category.replace(/\W|_/g,"") +
                            "/" +
                            info.fld_covidid +
                            "/" +
                            info.fld_id +
                            "/" +
                            info.fld_name.replace(/\W|_/g,"")
                          }`;
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
                            this.getUpdatedCart()
                            this.AddToCartFood(info)
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
                                      product_category : 'Covid',
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
        <div class="container">
          <div class="container-box container-box-lg info-boxes ">
                                        <div class="row">
                                          <div class="col-md-12">
                                          
                                         <p style={{textAlign:"justify",fontSize:"13px"}}><b>Disclaimer:</b> BeatMySugar team always puts in their best effort towards making the Vendor/Service Provider ensure that the product information given on the website is correct and updated. However, there could be a change in the ingredients/components list or warnings and precautions from the business operator/manufacturer/vendor/service provider’s end. Always read the product labels for ingredients, directions for use, warnings, and precautions before using the product.


</p>
<p style={{textAlign:"justify",fontSize:"13px"}}>We strongly recommend you to read the labels carefully and consume the product only when you are convinced that the product is fit for your consumption as different people have different healthcare needs. It is advisable to consult your doctor or nutritionist before using a product. <a href="https://www.beatmysugar.com/" style={{fontWeight:700,color:"#000"}}>www.BeatMySugar.com</a>, being only a facilitator and not the business operator/manufacturer/vendor/service provider, is not legally liable and does not assume any responsibility for any untoward occurrence from the usage of any product available on the website. All liabilities rest with the business operator/manufacturer/vendor/service provider.  
</p>
                                          </div>
                                         
                                        
                    
                                         
                                        
                                                 
                                        </div>
                    
                                        </div>
                    
                                      
                                    </div>
           
       
        <Footer></Footer>
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
                                               variant_id: info.fld_id,
                                               product_category: "Covid",
                                               quantity: 1,
                                               amount: info.fld_discountprice,
                                               updated_on: moment().format("lll"),
                                               updated_by: login.fld_userid,
                                               url : `/covidessentials/${info.fld_covidid +"/" +info.fld_id +"/" +info.fld_name.replace(/\W|_/g,"")
                                                   
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
   
                                         
                                             var item = newCart.filter(val => val.fld_variantid == info.fld_id && val.fld_productcategory == 'Covid')
   
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
                                                 fld_productcategory : 'Covid',
                                                 fld_quantity : 1,
                                                 fld_amount : info.fld_discountprice,
                                                 fld_addedon : moment().format('lll'),
                                                 fld_url : `/covidessentials/${
                                                   info.fld_covidid +
                                                   "/" +
                                                   info.fld_id +
                                                   "/" +
                                                   info.fld_name.replace(/\W|_/g,"")
                                                 }`
   
                                               }
   
                                               newCart.push(addNewCartData)
                                               // console.log(newCart.length)
                                              
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
                                               fld_productcategory : 'Covid',
                                               fld_quantity : 1,
                                               fld_amount : info.fld_discountprice,
                                               fld_addedon : moment().format('lll'),
                                               fld_url : `/covidessentials/${
                                                 info.fld_covidid +
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
)(CovidDetails);
