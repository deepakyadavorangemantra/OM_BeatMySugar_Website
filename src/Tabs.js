/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import logo from './logo.svg';
import Header from './Header'
import Footer from './Footer'
import News from './News';

import GetApiCall from "./GetApi";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import moment from "moment";
import Parser from 'html-react-parser';

import { connect } from "react-redux";
import {
 
  setcartitemcount,
  setcartamount
} from "./Actions/actionType";

class Tabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Food: [],
      FoodCategory: [],
  
      LoginData: [],
      FoodVariantRef : [],
    
      done : false,
      SearchDataRef : [],

      FootDetails : [],
      SocksDetails : [],
      BlogDetails : [],
      SearchText :'',
      AccessoriesDetails : [],
      AccessoriesRef : [],

      CovidDetails : [],
      CovidRef : []
  
    };
  }


  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    });

    Notiflix.Loading.Dots("");

    var arr = [];

    var login = localStorage.getItem("CustomerLoginDetails");
    var details = JSON.parse(login);

    this.setState({
      LoginData: details,
      // CategorySelected : this.props.match.params.category
    });

    var search = this.props.match.params.key

    this.setState({
      SearchText : search
    })
    // console.log(this.props.match.params.category)
    PostApiCall.postRequest(
      {
        category: 0,
      },
      "GetFoodListingSearchPageWeb"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {


          // console.log(obj.data)

          var srDt= []
          if(search != null){


            obj.data.filter(item => {
              if (item.fld_name.toLowerCase().includes(search.toLowerCase())
              || item.fld_brand.toLowerCase().includes(search.toLowerCase())
              || item.fld_category.toLowerCase().includes(search.toLowerCase())
              || item.Filters.toLowerCase().includes(search.toLowerCase())
              ) {
                srDt.push(item)
              }
            })


            var dtar = [...srDt];

            var cou = 0 
            for (var i = 0; i < Object.keys(srDt).length; i++) {
              // console.log(dtar[i].SelectedVar)
              if (srDt[i].Variant != null) {
                dtar[i].SelectedVar = srDt[i].Variant.split("^")[0];
                dtar[i].Selectdd = srDt[i].Variant.split("^")[0].split('#')[1]+' '+srDt[i].Variant.split("^")[0].split('#')[2]+' - ₹'+srDt[i].Variant.split("^")[0].split('#')[3]
              }else{
                // dtar.splice(obj.data[i])
              }
              cou = cou +1 
              if(cou == Object.keys(srDt).length){
                
              }
            }
            // console.log(dtar)
            var finlar = []
            for (var i = 0; i < dtar.length; i++) {
              if(dtar[i].Variant != null){
                finlar.push(dtar[i])
              }

            }
           
            
            this.setState({
              Food: finlar ,
              FoodRef: finlar ,
              FoodVariantRef : finlar ,
              SearchDataRef : finlar ,
              done : true
            },
            ()=>{
              Notiflix.Loading.Remove();
            });

            Notiflix.Loading.Remove();


          }else
          {
            Notiflix.Loading.Remove();
          }

        }
      }))



      GetApiCall.getRequest("GetFootwearListing").then((results) => {
        results
          .json()
          .then((data) => ({
            data: data,
            status: results.status,
          }))
          .then((res) => {
    
            // console.log(res.data.data)
  
            var srDtfoot= []
            if(search != null){
  
              res.data.data.filter(item => {
                if (item.fld_name.toLowerCase().includes(search.toLowerCase())
                || item.fld_brand.toLowerCase().includes(search.toLowerCase())
                // || item.fld_description.toLowerCase().includes(search.toLowerCase())
                ) {
                  srDtfoot.push(item)
                  
                }
              })
              this.setState({
    
                FootDetails: srDtfoot,
                FootRef : res.data.data,
         
                
              });
            }else
            {
              
            }
            
           
           
          });
  
  
          });



          PostApiCall.postRequest(
            {
              category: 0,
            },
            "GetAccessoriesListingSearchPageWeb"
          ).then((results) =>
            results.json().then((obj) => {
              if (results.status == 200 || results.status == 201) {
      
              console.log(obj.data)
    
              var srDt= []
              if(search != null){
    
               obj.data.filter(item => {
                  if (item.fld_name.toLowerCase().includes(search.toLowerCase())
                  || item.fld_brand.toLowerCase().includes(search.toLowerCase())
                  // || item.fld_description.toLowerCase().includes(search.toLowerCase())
                  ) {
                    srDt.push(item)
                    
                  }
                })
                this.setState({
      
                  AccessoriesDetails: srDt,
                  AccessoriesRef : obj.data,
            
                  
                });
              }else
            {

            }
          }
          }));



          PostApiCall.postRequest(
            {
              category: 0,
            },
            "GetCovidListingSearchPageWeb"
          ).then((results) =>
            results.json().then((obj) => {
              if (results.status == 200 || results.status == 201) {
      
              console.log(obj.data)
    
              var srDt= []
              if(search != null){
    
               obj.data.filter(item => {
                  if (item.fld_name.toLowerCase().includes(search.toLowerCase())
                  || item.fld_brand.toLowerCase().includes(search.toLowerCase())
                  // || item.fld_description.toLowerCase().includes(search.toLowerCase())
                  ) {
                    srDt.push(item)
                    
                  }
                })
                this.setState({
      
                 CovidDetails: srDt,
                  CovidRef : obj.data,
            
                  
                });
              }else
            {

            }
          }
          }));
  


          GetApiCall.getRequest("GetSocksListing").then((results) => {
            results
              .json()
              .then((data) => ({
                data: data,
                status: results.status,
              }))
              .then((res) => {
      
                var srDtsocks= []
                if(search != null){
      
                  res.data.data.filter(item => {
                    if (item.fld_name.toLowerCase().includes(search.toLowerCase())
                    || item.fld_brand.toLowerCase().includes(search.toLowerCase())
                    // || item.fld_description.toLowerCase().includes(search.toLowerCase())
                    ) {
                      srDtsocks.push(item)
                      
                    }
                  })
                  this.setState({
        
                    SocksDetails: srDtsocks,

                  });
      
                }
                
        
              
              });
      
                // Notiflix.Loading.Remove();
              });



              var srDtblog= []
              if(search != null){
    
                    GetApiCall.getRequest("GetBlogSearchWebsite").then(resultdes =>
                            resultdes.json().then(obj => {
                            
                
                    
                                    // console.log(obj.data)
    
                obj.data.filter(item => {
                  if (item.fld_title.toLowerCase().includes(search.toLowerCase())
                  || item.fld_shortdescription.toLowerCase().includes(search.toLowerCase())
                  || item.fld_content.toLowerCase().includes(search.toLowerCase())
                  ) {
                    srDtblog.push(item)
                  }
                })
                
                this.setState({
                  BlogDetails: srDtblog
                })
                // Notiflix.Loading.Remove()
            }))
            }
      

    }
    

    truncate(source, size) {
      // console.log(source)
      if (source != null) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
      }
    }

    onBlogView(blog){

      window.location.href = `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'')}/${(blog.fld_subcategory != '' && blog.fld_subcategory != null ? blog.fld_subcategory.replace( /\W|_/g,'') : moment(blog.fld_publishdate).format('ll'))+"/" }${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'')}`


    }

  render(){
  return (

    <div className="App">    
<Header></Header>

<nav aria-label="breadcrumb" class="breadcrumb-nav">
                        <div class="container">
                            <ol class="breadcrumb">
                                {/* <li class="breadcrumb-item"><a href="/"><i class="icon-home"></i></a></li>
                                <li class="breadcrumb-item" aria-current="page">Disclaimer</li> */}
                                {/* <li class="breadcrumb-item" aria-current="page">Diabetes</li>
                                <li class="breadcrumb-item" aria-current="page">Type 1 Diabetes</li>
                                <li class="breadcrumb-item active" aria-current="page">Type 1 diabetes causes and risk factors */}
                                    {/* </li> */}
                            </ol>
                        </div>
                        {/* <!-- End .container --> */}
                    </nav>
                    <div class="container">
                        
                        <div class="row marginbtm-240">
                                <div class="col-md-12">
                        <div id="tabs">
                            <div class="row">
                                <div class="col-md-12">
                               
                                </div>
                                <div class="col-md-12">
                              <h3 class="section-title margin-bottom search-title">You Searched For - {this.state.SearchText}</h3>
                                    <div class="search-all">
                                   
                                   
                                    <div class="search-results-text">
                                        <p>Search Results In</p>
                                    </div>
                                <ul>
 
 <li><a href="#tabs-2">Food & Supplements ({this.state.Food.length})</a></li>
 <li><a href="#tabs-3">Footwear ({this.state.FootDetails.length})</a></li>
 <li><a href="#tabs-4">Socks ({this.state.SocksDetails.length})</a></li>
 <li><a href="#tabs-5">Covid Essentials ({this.state.CovidDetails.length})</a></li>
 <li><a href="#tabs-6">Accessories ({this.state.AccessoriesDetails.length})</a></li>
 <li><a href="#tabs-7">Health Knowledge ({this.state.BlogDetails.length})</a></li>
</ul>
                                </div>
                                </div>
                            </div>

  
  
  <div id="tabs-2">
   <div class="row">
  <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="">
                  {this.state.Food.length == 0 && this.state.done ? (
                
                      <div class="col-md-12">
                        <img src="/assets/images/No-product-Found.png" style={{    margin: 'auto'}}/>
                      </div>
                 
                  ) : (
                    <div class="col-md-12">
                      {/* <h2 class="light-title section-title" style={{marginBottom: "20px"}}>{this.state.CategorySelected} </h2> */}
                    </div>
                  )}
                  <ul class="search-products-list">
                
             
                  {this.state.Food.map((info, index) => (
                   <li
                      style={{ display: info.Variant == null ? "none" : "" }}
                    >
                      <div class="partner book-inner">
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
                          src={info.SelectedVar.split("@")[0].split("$")[1]}
                          onClick={() => {
                            window.location.href = `/food/${
                              info.fld_category.replace(/\W|_/g,"") +
                              "/" +
                              info.fld_id +
                              "/" +
                              info.SelectedVar.split("#")[7].split("$")[0] +
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
                                  info.fld_category.replace(/\W|_/g,"") +
                                  "/" +
                                  info.fld_id +
                                  "/" +
                                  info.SelectedVar.split("#")[7].split("$")[0] +
                                  "/" +
                                  info.fld_name.replace(/\W|_/g,"")
                                }`;
                              }}
                            >
                              {info.SelectedVar.split("#")[0]}
                            </a>
                          </p>
                          {/* {book.fld_discountpercent == 0.0 ? ( */}
                          <p class="food-height">
                            <p class="small-desc item-name">
                              <span
                                style={{ color: "#222222", fontWeight: "600" }}
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
                                value={info.Selectdd}
                                onChange={(dt) => {
                                  var dr = [...this.state.Food];
                                  for (var i = 0;i < info.Variant.split("^").length;i++) {
                                    if ( dt.target.value ==info.Variant.split("^")[i].split("#")[1] + " " +info.Variant.split("^")[i].split("#")[2] + " - ₹" + info.Variant.split("^")[i].split("#")[3]) {
                                      // console.log(info.Variant.split(',')[i])
                                      dr[index].SelectedVar = info.Variant.split("^")[i];
                                      dr[index].Selectdd = info.Variant.split("^")[i].split("#")[1] + " " +info.Variant.split("^")[i].split("#")[2] + " - ₹" + info.Variant.split("^")[i].split("#")[3]
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
                                    &#8377; {info.SelectedVar.split("#")[4]}
                                  </s>
                                </span>
                              </p>
                            )}

                            {info.SelectedVar.split("#")[5] == 0 ? (
                              <p style={{height:'40px'}}></p>
                            ) : (
                              <p class="discount-price">
                                {" "}
                               You
                                Save &#8377;{" "}
                                {parseFloat(
                                  info.SelectedVar.split("#")[4] -
                                    info.SelectedVar.split("#")[3]
                                ).toFixed(2)} ({info.SelectedVar.split("#")[5]}%)
                              </p>
                            )}
                          </p>

                          <p class="brief-desc"></p>
                          <ul class="group-buttons">
                            <li
                              style={{
                                display:
                                  info.SelectedVar.split("#")[6] == "In stock"
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
                                <i class="fas fa-shopping-cart"></i> ADD TO CART
                              </button>
                            </li>
                            <li>
                              <button
                                class="like-btn"
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
                                        updated_on: moment().format("lll"),
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
                    </ul>
                </div>
              </div>
              </div>    
            
  </div>
  <div id="tabs-3">
    
  <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="row">
                  {this.state.FootDetails.length ==0 && this.state.done ?  
                  <div class="col-md-12">
                        <img src="/assets/images/No-product-Found.png" style={{    margin: 'auto'}}/>
                      </div>
               : ''}
             <ul class="search-products-list">
              
                {this.state.FootDetails.map((info, index)=>(
 <li>

                  <div class="">
                  <div class="partner product-inner ">
                    <div id="overlay" style={{display : info.fld_availability =='In stock' ? 'none' : ''}}>Out Of Stock</div>

                    <img
                      src={info.Photos.split(',')[0]}
                      alt="product"
                      class="footcare-image img-center"
                      onClick={()=>{
                        window.location.href = `/footwear/${info.fld_footid+"/"+info.fld_id+"/"+info.fld_name.replace(/\W|_/g,"")}`
                      }}
                    />

                    <div class="product-details">
                      <p class="product-title">
                        <a 
                        onClick={()=>{
                          window.location.href = `/footwear/${info.fld_footid+"/"+info.fld_id+"/"+info.fld_name.replace(/\W|_/g,"")}`
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
                            this.AddToCartFootwear(info)
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
                                      product_category : 'Footwear',
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
                  </div>

                  </li>
                ))}
               
              
             </ul>
              </div>
            </div>


  </div>
  <div id="tabs-4">
  <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="row">
              
              {this.state.SocksDetails.length ==0  && this.state.done ?  
                <div class="col-md-12">
              <img src="/assets/images/No-product-Found.png" style={{    margin: 'auto'}}/>
              </div>: ''}
              <ul class="search-products-list">
               

               
              {this.state.SocksDetails.map((info, index)=>(
 <li>
<div class="">
<div class="partner product-inner ">
  <div id="overlay" style={{display : info.fld_availability =='In stock' ? 'none' : ''}}>Out Of Stock</div>

  <img
    src={info.Photos.split(',')[0]}
    alt="product"
    class="footcare-image img-center"
    onClick={()=>{
      window.location.href = `/socks/${info.fld_socksid+"/"+info.fld_id+"/"+info.fld_name.replace(/\W|_/g,"")}`
    }}
  />

  <div class="product-details">
    <p class="product-title">
      <a class="item-name"
      onClick={()=>{
        window.location.href = `/socks/${info.fld_socksid+"/"+info.fld_id+"/"+info.fld_name.replace(/\W|_/g,"")}`
      }}
      >
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
          this.AddToCartSocks(info)
  
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
                  product_category : 'Socks',
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
</div>

</li>
))}
 
                </ul>
              </div>
            </div>

  </div>


  <div id="tabs-5">
  <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="row">
              
              {this.state.CovidDetails.length ==0  && this.state.done ?  
                <div class="col-md-12">
              <img src="/assets/images/No-product-Found.png" style={{    margin: 'auto'}}/>
              </div>: ''}
              <ul class="search-products-list">
               

               
              {this.state.CovidDetails.map((info, index)=>(
 <li>
<div class="">
<div class="partner product-inner ">
  <div id="overlay" style={{display : info.fld_availability =='In stock' ? 'none' : ''}}>Out Of Stock</div>

  <img
    src={info.Photos.split(',')[0]}
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
      <a class="item-name"
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
      >
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
          this.AddToCartCovid(info)
  
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
</div>

</li>
))}
 
                </ul>
              </div>
            </div>

  </div>
 

  <div id="tabs-6">
  <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="row">
              
              {this.state.AccessoriesDetails.length ==0  && this.state.done ?  
                <div class="col-md-12">
              <img src="/assets/images/No-product-Found.png" style={{    margin: 'auto'}}/>
              </div>: ''}
              <ul class="search-products-list">
               

               
              {this.state.AccessoriesDetails.map((info, index)=>(
 <li>
<div class="">
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
      <a class="item-name"
      onClick={()=>{
        window.location.href = `/accessories/${info.fld_accessoriesid+"/"+info.fld_id+"/"+info.fld_name.replace(/\W|_/g,"")}`
      
      }}
      >
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
</div>

</li>
))}
 
                </ul>
              </div>
            </div>

  </div>
 
 
  <div id="tabs-7">
  <div class="col-lg-12 col-md-12 col-sm-12">
  <div class="row">
  {this.state.BlogDetails.length == 0  ? 
                
                <div class="col-md-12">
                  <img src="/assets/images/article_not_found.png" style={{    margin: 'auto'}}/>
                </div> : ''
  }
  {this.state.BlogDetails.map(
    (blog,index) => (

        <div class="col-lg-3 col-md-4 col-sm-4 col-12"  key={index}>
              <div class="blog-box-inner blog-box">
                       <img 
                       onClick={()=>{this.onBlogView(blog)}}
                       src={blog.fld_previewimage} />
                       {/* <span class="grid-item-date">
                              <span class="grid-item-day">{moment(blog.fld_publishdate).format('ll').split(' ')[1].split(',')[0]}</span>
                                        <span class="grid-item-month">{moment(blog.fld_publishdate).format('ll').split(' ')[0]} ' {moment(blog.fld_publishdate).format("YY")}</span>
                                       
                                    </span> */}
                       <div class="blog-masonry-textbox content-box">
                         <a onClick={()=>{this.onBlogView(blog)}}>  <h3 class="blog-masonry-title" style={{overflow : 'hidden'}}>{blog.fld_title}</h3></a>
                           <p class="name-title"><span>By</span> {blog.fld_writtenby}</p>
                           <p class="border-btm blog-desc-short">
                              
                           {Parser(((blog.fld_shortdescription).replace(/font-family/g, '')
                           ))}
                          
                               </p>
                              
                           <ul class="comments-list" style={{marginBottom:"0px"}}>
                                   <li><p class="date">{moment(blog.fld_publishdate).format('ll')}</p></li>
                                   <li > 
                                      <i class="fas fa-thumbs-up" ></i> { blog.fld_likecount}
                                   </li>
                                   <li > 
                                        <i class="fas fa-comments" ></i> { blog.fld_commentcount}
                                       </li>   
                                       <li style={{float:"right"}}>
                                               <div onClick={()=>{this.onBlogView(blog)}}><a  class="read-more-btn-blog">Read More</a></div>
                                      </li>
                                 
                              </ul>
                      </div>
         
                  </div>
        </div>	
        
    ))}
    </div>
    </div>
  </div>
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
                                               variant_id: info.SelectedVar.split("#")[7].split("$")[0],
                                               product_category: "Food",
                                               quantity: 1,
                                               amount: info.SelectedVar.split("#")[3],
                                               updated_on: moment().format("lll"),
                                               updated_by: login.fld_userid,
                                               url : `/food/${info.fld_id +"/" +info.SelectedVar.split("#")[7].split("$")[0] +"/" +info.fld_name.replace(/\W|_/g,"")
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
   
                                         
                                             var item = newCart.filter(val => val.fld_variantid == info.SelectedVar.split("#")[7].split('$')[0] && val.fld_productcategory == 'Food')
   
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
                                              url : `/footwear/${ info.fld_footid +"/" +info.fld_id +"/" +info.fld_name.replace(/\W|_/g,"")
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
                                               fld_productcategory : 'Footwear',
                                               fld_quantity : 1,
                                               fld_amount : info.fld_discountprice,
                                               fld_addedon : moment().format('lll'),
                                               fld_url : `/footwear/${
                                                 info.fld_footid +
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
                                             fld_productcategory : 'Footwear',
                                             fld_quantity : 1,
                                             fld_amount : info.fld_discountprice,
                                             fld_addedon : moment().format('lll'),
                                             fld_url : `/footwear/${
                                               info.fld_footid +
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
                                              url : `/socks/${info.fld_socksid +"/" +info.fld_id +"/" +info.fld_name.replace(/\W|_/g,"")
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
 
                                       
                                           var item = newCart.filter(val => val.fld_variantid == info.fld_id && val.fld_productcategory == 'Socks')
 
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
                                               fld_productcategory : 'Socks',
                                               fld_quantity : 1,
                                               fld_amount : info.fld_discountprice,
                                               fld_addedon : moment().format('lll'),
                                               fld_url :`/socks/${
                                                 info.fld_socksid +
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
                                             fld_productcategory : 'Socks',
                                             fld_quantity : 1,
                                             fld_amount : info.fld_discountprice,
                                             fld_addedon : moment().format('lll'),
                                             fld_url :`/socks/${
                                               info.fld_socksid +
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


AddToCartCovid(info){


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



                                             
                                               // window.location.reload();

                                               this.props.setcartitemcount(obj.data.length)
                                               this.props.setcartamount(obj.data.reduce(function (result, item) {
                                                 return result + (item.fld_amount*item.fld_quantity);
                                               }, 0))
                                               Notiflix.Notify.Info(
                                                "Product added to Cart."
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
                                             fld_amount :  info.fld_discountprice,
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
)(Tabs);
