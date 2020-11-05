/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Menu from './Header'
import Footer from './Footer'

import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import Parser from "html-react-parser";
import GetApiCall from './GetApi'
import moment from 'moment'


import { connect } from "react-redux";
import {
 
  setcartitemcount,
  setcartamount
} from "./Actions/actionType";


class CartUpdated extends React.Component
{

    constructor(props){
        super(props)
        this.state={
            Cart : [],
            RawData : [],
            quantity : [],
            cartPrice : [],
            SubTotal : 0,
            MrpSubTotal : 0,
            BaseSubTotal :0,
            GstValue : 0,


            FoodData : [],
            FootwearData : [],
            SocksData : [],


            ExtraCharges : [],
            ShippingCharge : 0,
            COD : 0,
            ShippingTh : 0,
            Offer : 0,
            PayCod : false,

            OfferData : [],
            SelectedCouponData : [] ,

            showoffer : false,
            Couponcode : '',
            done : false

           
        }

    }

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor: "#507dc0",
  
          });
      this.getUpdatedCart()

    }

    getUpdatedCart(){

        var log = localStorage.getItem('CustomerLoginDetails')
        var login = JSON.parse(log)


        var arr = []
        var subt = 0
        var mrpt = 0
        var baset = 0
        var gstval = 0
        var cn = 0

        if(login != null && login != ''){

            Notiflix.Loading.Dots('');

            PostApiCall.postRequest(
                {
                    product_category: 'Food',
                    customer_id : login.fld_userid,
                },
                "GetCartFoodVariant"
              ).then((results) =>
                results.json().then((obj) => {
                  if (results.status == 200 || results.status == 201) {
               
                    if(obj.data.length > 0){
                        arr.push(obj.data)


                    }

                    this.setState({
                      FoodData: obj.data,
                      Cart : arr
                    },
                    ()=>{
                        cn = cn +1

                        PostApiCall.postRequest(
                            {
                                product_category: 'Footwear',
                                customer_id : login.fld_userid
                            },
                            "GetCartFootwearVariant"
                          ).then((results) =>
                            results.json().then((obj) => {
                              if (results.status == 200 || results.status == 201) {
                           
                                if(obj.data.length > 0){
                                    arr.push(obj.data)
            
                                }
                               
                                this.setState({
                                  FootwearData: obj.data,
                                  Cart : arr
                                },
                                ()=>{
                                    cn = cn +1

                                    PostApiCall.postRequest(
                                        {
                                            product_category: 'Socks',
                                            customer_id : login.fld_userid
                                        },
                                        "GetCartSocksVariant"
                                      ).then((results) =>
                                        results.json().then((obj) => {
                                          if (results.status == 200 || results.status == 201) {
                                       
                                           if(obj.data.length > 0){
                                                arr.push(obj.data)
                        
                                              
                                            }
                        
                                            this.setState({
                                              SocksData: obj.data,
                                              Cart : arr
                                            },
                                            ()=>{
                                                cn = cn +1
                        
                                      
                                                this.setState({
                                                    done : true
                                                })
                                                Notiflix.Loading.Remove()
                        
                                                for(var i = 0 ; i<Object.keys(this.state.Cart).length;i++){
                        
                                                    for(var j = 0 ; j<Object.keys(this.state.Cart[i]).length;j++){
                                                        subt = subt + this.state.Cart[i][j].fld_discountprice*this.state.Cart[i][j].fld_quantity
                                                        mrpt = mrpt + this.state.Cart[i][j].fld_price*this.state.Cart[i][j].fld_quantity
                                                        baset = baset + (this.state.Cart[i][j].fld_discountprice/(1+(this.state.Cart[i][j].fld_gstpercent/100)))*this.state.Cart[i][j].fld_quantity
                                                        gstval = gstval + ((this.state.Cart[i][j].fld_discountprice/(1+(this.state.Cart[i][j].fld_gstpercent/100)))*this.state.Cart[i][j].fld_quantity)*(this.state.Cart[i][j].fld_gstpercent/100)
                                                        this.setState({
                                                            SubTotal : subt,
                                                            MrpSubTotal : mrpt,
                                                            BaseSubTotal : baset,
                                                            GstValue : gstval
                                                        })
                                                        this.props.setcartitemcount(this.state.Cart.length)
                                                        this.props.setcartamount(subt)
                                                    }
                                             
                                                }
                                            });
                        
                                        }
                                    }))
            
                                   
                                });
            
                            }
                        }))
                    });
                 

                }
            }))

           

           

      
      
            
            GetApiCall.getRequest("GetExtraCharges").then(resultdes =>
                resultdes.json().then(obj => {
               
       
                for(var i =0 ; i<Object.keys(obj.data).length;i++){

                    if(obj.data[i].fld_type == 'Shipping'){
                        this.setState({
                            ShippingCharge : obj.data[i].fld_price,
                            ShippingTh : obj.data[i].fld_thresholdvalue
                        })
                    }
                    else  if(obj.data[i].fld_type == 'COD'){
                        this.setState({
                            COD : obj.data[i].fld_price
                        })
                    }

                }
                
                  this.setState({
                      ExtraCharges : obj.data
                  })
    
    
      
                }))


                GetApiCall.getRequest("GetOfferWebsite").then(resultdes =>
                    resultdes.json().then(obj => {
                   
                      this.setState({
                          OfferData : obj.data,
                      
                      })
                    
        
        
             
                    }))
    
         

         
        }else
        {
            this.getCartUpdatedWithoutLogin()
        }
    }

    getCartUpdatedWithoutLogin(){


            var arr = []
            var subt = 0
            var mrpt = 0
            var baset = 0
            var gstval = 0
            var cn = 0
    
        
    
            var fdData = []
            var crtData = []
            var ftData =[]
            var skData = []
    
          
    
            var cart_info = JSON.parse(localStorage.getItem('BMSCartData'))
    
            console.log(cart_info)
    
            if(cart_info != null){
    
                Notiflix.Loading.Dots('');
    
                for(var i = 0 ; i<cart_info.length;i++){
    
                    if(cart_info[i].fld_productcategory == 'Food'){
    
                        PostApiCall.postRequest(
                    {
                        id : cart_info[i].fld_variantid,
                        quantity : cart_info[i].fld_quantity,
                        url : cart_info[i].fld_url
                    },
                    "GetCartFoodVariantCookie"
                  ).then((results) =>
                    results.json().then((obj) => {
                      if (results.status == 200 || results.status == 201) {
    
                     
    
    
                        fdData.push(obj.data[0])
                        crtData.push(obj.data[0])
    
                            
                            cn = cn +1
    
                            if(cn == cart_info.length){
                                
                               
                                this.setState({
                                    done : true,
                                    CartData : crtData,
                                    FootwearData : ftData,
                                    FoodData : fdData,
                                    SocksData : skData
                                },()=>{
                                    for(var j = 0 ; j<Object.keys(this.state.CartData).length;j++){
                                        subt = subt + this.state.CartData[j].fld_discountprice*this.state.CartData[j].fld_quantity
                                        mrpt = mrpt + this.state.CartData[j].fld_price*this.state.CartData[j].fld_quantity
                                        baset = baset + (this.state.CartData[j].fld_discountprice/(1+(this.state.CartData[j].fld_gstpercent/100)))*this.state.CartData[j].fld_quantity
                                        gstval = gstval + ((this.state.CartData[j].fld_discountprice/(1+(this.state.CartData[j].fld_gstpercent/100)))*this.state.CartData[j].fld_quantity)*(this.state.CartData[j].fld_gstpercent/100)
                                        this.setState({
                                            SubTotal : subt,
                                            MrpSubTotal : mrpt,
                                            BaseSubTotal : baset,
                                            GstValue : gstval
                                        })
                                        this.props.setcartitemcount(this.state.CartData.length)
                                        this.props.setcartamount(subt)
                                        Notiflix.Loading.Remove()
                                    }
                                })
                                
    
                            }
                
    
                        
    
                      }
                    }))
    
    
    
                    }else if(cart_info[i].fld_productcategory == 'Footwear')
                    {
                        PostApiCall.postRequest(
                            {
                                id : cart_info[i].fld_variantid,
                                quantity : cart_info[i].fld_quantity,
                                url : cart_info[i].fld_url
                            },
                            "GetCartFootwearVariantCookie"
                          ).then((results) =>
                            results.json().then((obj) => {
                              if (results.status == 200 || results.status == 201) {
            
            
                                ftData.push(obj.data[0])
                                crtData.push(obj.data[0])
            
                                    
                                    cn = cn +1
            
                                    if(cn == cart_info.length){
                                        
                               
                                        this.setState({
                                            done : true,
                                            CartData : crtData,
                                            FootwearData : ftData,
                                            FoodData : fdData,
                                            SocksData : skData
                                        },()=>{
                                            for(var j = 0 ; j<Object.keys(this.state.CartData).length;j++){
                                                subt = subt + this.state.CartData[j].fld_discountprice*this.state.CartData[j].fld_quantity
                                                mrpt = mrpt + this.state.CartData[j].fld_price*this.state.CartData[j].fld_quantity
                                                baset = baset + (this.state.CartData[j].fld_discountprice/(1+(this.state.CartData[j].fld_gstpercent/100)))*this.state.CartData[j].fld_quantity
                                                gstval = gstval + ((this.state.CartData[j].fld_discountprice/(1+(this.state.CartData[j].fld_gstpercent/100)))*this.state.CartData[j].fld_quantity)*(this.state.CartData[j].fld_gstpercent/100)
                                                this.setState({
                                                    SubTotal : subt,
                                                    MrpSubTotal : mrpt,
                                                    BaseSubTotal : baset,
                                                    GstValue : gstval
                                                })
                                                this.props.setcartitemcount(this.state.CartData.length)
                                                this.props.setcartamount(subt)
                                                Notiflix.Loading.Remove()
                                            }
                                        })
                                        
            
                                    }
                         
            
                                
            
                              }
                            }))
                    }
    
                    else if(cart_info[i].fld_productcategory == 'Socks')
                    {
                        PostApiCall.postRequest(
                            {
                                id : cart_info[i].fld_variantid,
                                quantity : cart_info[i].fld_quantity,
                                url : cart_info[i].fld_url
                            },
                            "GetCartSocksVariantCookie"
                          ).then((results) =>
                            results.json().then((obj) => {
                              if (results.status == 200 || results.status == 201) {
            
            
                                skData.push(obj.data[0])
                        crtData.push(obj.data[0])
    
                            
                            cn = cn +1
    
                            if(cn == cart_info.length){
                                
                                
                                this.setState({
                                    done : true,
                                    CartData : crtData,
                                    FootwearData : ftData,
                                    FoodData : fdData,
                                    SocksData : skData
                                },()=>{
                                    for(var j = 0 ; j<Object.keys(this.state.CartData).length;j++){
                                        subt = subt + this.state.CartData[j].fld_discountprice*this.state.CartData[j].fld_quantity
                                        mrpt = mrpt + this.state.CartData[j].fld_price*this.state.CartData[j].fld_quantity
                                        baset = baset + (this.state.CartData[j].fld_discountprice/(1+(this.state.CartData[j].fld_gstpercent/100)))*this.state.CartData[j].fld_quantity
                                        gstval = gstval + ((this.state.CartData[j].fld_discountprice/(1+(this.state.CartData[j].fld_gstpercent/100)))*this.state.CartData[j].fld_quantity)*(this.state.CartData[j].fld_gstpercent/100)
                                        this.setState({
                                            SubTotal : subt,
                                            MrpSubTotal : mrpt,
                                            BaseSubTotal : baset,
                                            GstValue : gstval
                                        })
                                        this.props.setcartitemcount(this.state.CartData.length)
                                        this.props.setcartamount(subt)
                                        Notiflix.Loading.Remove()
                                    }
                                })
                                
    
                            }
                  
    
                        
    
                      }
                    }))
                    }
    
    
                }
            }else
            {
                this.setState({
                    done : true
                })
            }
           
        
    
           
               
    
          
          
                
                GetApiCall.getRequest("GetExtraCharges").then(resultdes =>
                    resultdes.json().then(obj => {
                   
                  
                    for(var i =0 ; i<Object.keys(obj.data).length;i++){
    
                        if(obj.data[i].fld_type == 'Shipping'){
                            this.setState({
                                ShippingCharge : obj.data[i].fld_price,
                                ShippingTh : obj.data[i].fld_thresholdvalue
                            })
                        }
                        else  if(obj.data[i].fld_type == 'COD'){
                            this.setState({
                                COD : obj.data[i].fld_price
                            })
                        }
    
                    }
                    
                      this.setState({
                          ExtraCharges : obj.data
                      })
        
        
               
                    }))
    
    
                    GetApiCall.getRequest("GetOfferWebsite").then(resultdes =>
                        resultdes.json().then(obj => {
                       
                          this.setState({
                              OfferData : obj.data,
                        
                          })
                    
            
            
                         
                        }))
        
             
      
       
        
    }

    render()
    {
        return (
            <div>
                <Menu></Menu>
                  <div class="container">
                 
                  {this.state.SubTotal == 0 && this.state.done ? (
                 <div class="container-box cart-section">
                <div class="col-md-12">
                  <img src="/assets/images/Empty-Cart.png" style={{    margin: 'auto'}}/>
                </div>
                </div>
            ) : (
              <div class="col-md-12">
               
              </div>
            )}
       
                        <div class="container-box cart-section" style={{display : this.state.SubTotal > 0 && this.state.done ? '' : 'none'}}>
                            <div class="row">
                            
                                <div class="col-lg-8 col-md-12 col-sm-12">

                               
                                  
        
                                    <div class="cart-discount" style={{display : this.state.showoffer ? '' : 'none'}}>
                                      
                                        <form onSubmit={(e)=>{
                                            e.preventDefault()
                                        }}>
                                            <div class="input-group">
                                              
                                                <div class="input-group-append">
                                                    
                                                </div>

                                              
                                            </div>
                                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Apply Coupon</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" >
          <h4 class="no-coupons-text" style={{display : this.state.OfferData.length > 0 ? 'none' : ''}}>No Coupons Available</h4>
      <div class="input-group">
                                               <input type="text" value={this.state.Couponcode} class="form-control form-control-sm" placeholder="Enter discount code" 
                                               onChange={(text)=>{
                                                   this.setState({
                                                       Couponcode : text.target.value
                                                   })
                                               }}
                                               />
                                                <div class="input-group-append">
                                                    <button class="btn btn-sm btn-primary" type="submit" data-dismiss="modal" aria-hidden="true" 
                                                    onClick={()=>{
                                                        var cn = 0
                                                        var count = 0 
                                                        var dt = []
                                                        for(var i = 0 ;i<this.state.OfferData.length ;i ++){
     
                                                         if(this.state.OfferData[i].fld_code == this.state.Couponcode){
                                                             if(this.state.SubTotal >= this.state.OfferData[i].fld_minimumdiscountprice)
                                                             {

                                                                this.setState({
                                                                    SelectedCouponData : this.state.OfferData[i]
                                                                })
                                                                dt = this.state.OfferData[i]
                                                                cn = 1
                                                             }else
                                                             {
                                                                this.setState({
                                                                    showoffer : false,
                                                        
                                                                })
                                                                cn = 2
                                                              
                                                            
                                                                
                                                                Notiflix.Report.Failure('Oops!','Offer can only be applied above '+this.state.OfferData[i].fld_minimumdiscountprice+'.',
                                                                'Ok');
                                                            }
                                                            
                                                           
                                                         }
                                                         count = count +1
     
                                                         if(count == this.state.OfferData.length){
                                                             if(cn == 0){
     
                                                                Notiflix.Report.Failure('Oops!','Sorry, your offer code is not valid.',
                                                                'Ok');
     
                                                             }
                                                             else if(cn == 2){

                                                             }
                                                             else
                                                             {
                                                                 this.setState({
                                                                     showoffer : false,
                                                                     Offer : this.state.BaseSubTotal*(dt.fld_pricepercent/100)
                                                                 })
                                                        

                                                                var gstvl = 0
                                                                var bse = 0

                                                                for(var i = 0 ; i<Object.keys(this.state.Cart).length;i++){
                        
                                                                    for(var j = 0 ; j<Object.keys(this.state.Cart[i]).length;j++){

                                                                        bse = (this.state.Cart[i][j].fld_discountprice/(1+(this.state.Cart[i][j].fld_gstpercent/100)))*this.state.Cart[i][j].fld_quantity

                                                                        gstvl = gstvl + (bse-(bse*dt.fld_pricepercent/100))*(this.state.Cart[i][j].fld_gstpercent/100)

                                                                        this.setState({
                                                                            GstValue : gstvl
                                                                        })



                                                                    }
                                                                }
                                                                Notiflix.Report.Success('Congratulations!','You'+"'"+'ve got a discount.',
                                                                'Ok'); 
                                                             }
                                                         }
     
                                                        }
                                                    }} >Apply Discount</button>
                                                </div>

                                              
                                            </div>
                                            {this.state.OfferData.map((info,index)=>(
                                                <div class="offer-content" style={{display : info.fld_showonwebsite == 'No' ? 'none' : ''}}>
                                                <h3>{info.fld_name}</h3>
                                                <a class="coupon-apply-btn" 
                                                onClick={()=>{
                                                    this.setState({
                                                       Couponcode : info.fld_code
                                                    })
                                                }}
                                                >Apply</a>
                                                <div class="clearfix"></div>
                                                  <p>{info.fld_caption}</p>
                                            <p class="coupon">{info.fld_code}</p>   
                                                <span style={{marginTop:"5px",marginLeft:"0px",fontSize:"13px",display:"block"}}>*Offer valid till {moment(info.fld_enddate).format('ll')}. Minimum cart value Rs.500</span>                                       
                                                <div class="accordion" id="accordionExample">
                                               
                                              
                                                <div class="card">
                                                <div class="card-header" id={"headingThree"+index}>
                                                <h2 class="mb-0">
                                                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target={"#collapseThree"+index} aria-expanded="false" aria-controls={"collapseThree"+index}>
                                                Offer Description

                                                </button>
                                                </h2>
                                                </div>
                                                <div id={"collapseThree"+index} class="collapse" aria-labelledby={"headingThree"+index} data-parent="#accordionExample">
                                                <div class="card-body">
                                                {Parser(('<p>'+info.fld_description+'</p>').replace(/font-family/g, ''))}
                                                </div>
                                                </div>
                                                </div>
                                                <div class="card">
                                                <div class="card-header" id={"headingfour"+index}>
                                                <h2 class="mb-0">
                                                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target={"#collapseFour"+index} aria-expanded="false" aria-controls={"collapseFour"+index}>
                                                Terms & Condition

                                                </button>
                                                </h2>
                                                </div>
                                                <div id={"collapseFour"+index} class="collapse" aria-labelledby={"headingfour"+index} data-parent="#accordionExample">
                                                <div class="card-body">
                                                {Parser(('<p>'+info.fld_termscondition+'</p>').replace(/font-family/g, ''))}
                                                </div>
                                                </div>
                                                </div>
                                                </div>

                                                </div>


                                            ))}
                                          
                                            
      </div>
     
    </div>
  </div>
</div>
                                        
                                        </form>
                                    </div>
                                </div>
        
                                
                            </div>

                            <div class="row">
                                <div class="col-md-8">
                                    <div class="title-col">
                                    <div class="row ">
                                        <div class="col-md-3"></div>
                                        <div class="col-md-4">
                                            <p class="cart-title">Item Description</p>
                                        </div>
                                        <div class="col-md-2">
                                        <p class="cart-title">Quantity</p>
                                        </div>
                                        <div class="col-md-1">
                                        <p class="cart-title">Amount</p>
                                        </div>
                                        <div class="col-md-2">

                                        </div>
                                    </div>
                                    </div>

                                    {/* ------------------ Food & Supplements ------------------------- */}
                                    <div class="title-sub-col" style={{display : this.state.FoodData.length == 0 ? 'none' : ''}}>
                                    <div class="row ">
                                        <div class="col-md-3"><p class="cart-sub-title">Food & Supplements</p></div>
                                        <div class="col-md-4">
                                            <p class="cart-sub-title">{this.state.FoodData.length} Item{this.state.FoodData.length == 1 ? '' : 's'} (₹ {this.state.FoodData.reduce(function (result, item) {
  return result + (item.fld_discountprice*item.fld_quantity);
}, 0)})</p>
                                        </div>
                                        <div class="col-md-2">
                                        
                                        </div>
                                        <div class="col-md-1">
                                       
                                        </div>
                                        <div class="col-md-2"></div>
                                    </div>
                                    </div>
                                    {this.state.FoodData.map((info,index)=>(
                                    <div class="cart-details">
                                    <div class="row ">
                                        <div 
                                        onClick={()=>{
                                            
                                            if(info.fld_url != '' && info.fld_url != null)
                                            {
                                                window.location.href = info.fld_url
                                            }
                                           
                                        }}
                                        class="col-md-3">
                                            <img src={info.VariantImage.split('#')[0]} class="img-responsive cart-img"></img>
                                        </div>
                                        <div class="col-md-4">
                                           <p 
                                           onClick={()=>{
                                        
                                            if(info.fld_url != '' && info.fld_url != null)
                                            {
                                                window.location.href = info.fld_url
                                            }
                                           
                                        }}
                                           class="cart-product-name">{info.fld_name} 
                                            </p>
                                            <p><b>Brand</b> - {info.fld_brand}</p>
                                            <p><b>Nett Weight</b> - {info.fld_productweight +" "+ info.fld_productunit}</p>
                                            <div class="cart-price">
                                                {info.fld_discountpercent == 0 ?
                                                <p class=""> <p class="price"><b>Price </b> - ₹ {info.fld_discountprice}</p>
                                              </p>
                                            :
                                            <p class=""> <p class="price"><b>Price </b> - ₹ {info.fld_discountprice} <span><s>₹ {info.fld_price}</s></span></p>
                                            <p class="discount-price"> You Save ₹ {info.fld_price-info.fld_discountprice} ({info.fld_discountpercent}% )</p></p>}
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="cart-btn">
                                        <form>
                                            <div 
                                             onClick={()=>{
                                               this.RemoveFromCartFood(info) 
                                        
                                               
                                          }} 
                                          
                                            class="value-button" id="decrease" value="Decrease Value">-</div>
                                        <input type="number" id="number" value={info.fld_quantity} disabled/>
                                            <div 
                                               onClick={()=>{
                                                this.AddToCartFood(info)
                                            
                                               
                                            }} 
                                            class="value-button" id="increase" value="Increase Value">+</div>
                                            </form>
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <p class="cart-amount">₹ {info.fld_quantity*info.fld_discountprice}</p>
                                        </div>
                                        <div class="col-md-2"
                                         onClick={()=>{
                                                    
                                           this.DeleteFromCartFood(info)
                                       
                                    }} 
                                        >
                                        <a 
                                        title="Remove product" class="btn-remove"><span class="">Remove</span></a>
                                        </div>
                                    </div>
                                    </div>
                                    ))}


  {/* ------------------ Footwear ------------------------- */}


  <div class="title-sub-col" style={{display : this.state.FootwearData.length == 0 ? 'none' : ''}}>
                                    <div class="row ">
                                        <div class="col-md-3"><p class="cart-sub-title">Footwear</p></div>
                                        <div class="col-md-4">
                                        <p class="cart-sub-title">{this.state.FootwearData.length} Item{this.state.FootwearData.length == 1 ? '' : 's'} (₹ {this.state.FootwearData.reduce(function (result, item) {
  return result + (item.fld_discountprice*item.fld_quantity);
}, 0)})</p>
                                        </div>
                                        <div class="col-md-2">
                                        
                                        </div>
                                        <div class="col-md-1">
                                       
                                        </div>
                                        <div class="col-md-2"></div>
                                    </div>
                                    </div>
                                    {this.state.FootwearData.map((info,index)=>(
                                    <div class="cart-details">
                                    <div class="row ">
                                        <div 
                                        onClick={()=>{
                               
                                            if(info.fld_url != '' && info.fld_url != null)
                                            {
                                                window.location.href = info.fld_url
                                            }
                                           
                                        }}
                                        class="col-md-3">
                                            <img src={info.VariantImage.split('#')[0]} class="img-responsive cart-img"></img>
                                        </div>
                                        <div class="col-md-4">
                                           <p 
                                           onClick={()=>{
                                
                                            if(info.fld_url != '' && info.fld_url != null)
                                            {
                                                window.location.href = info.fld_url
                                            }
                                           
                                        }}
                                           class="cart-product-name">{info.fld_name} 
                                            </p>
                                            <p><b>Brand</b> - {info.fld_brand}</p>
                                            {/* <p><b>Nett Weight</b> - {info.fld_productweight +" "+ info.fld_productunit}</p> */}
                                            <div class="cart-price">
                                                {info.fld_discountpercent == 0 ?
                                                <p class=""> <p class="price"><b>Price </b> - ₹ {info.fld_discountprice}</p>
                                              </p>
                                            :
                                            <p class=""> <p class="price"><b>Price </b> - ₹ {info.fld_discountprice} <span><s>₹ {info.fld_price}</s></span></p>
                                            <p class="discount-price"> You Save ₹ {info.fld_price-info.fld_discountprice} ({info.fld_discountpercent}% )</p></p>}
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="cart-btn">
                                        <form>
                                            <div 
                                               onClick={()=>{
                                                this.RemoveFromCartFootwear(info) 
                                         
                                                
                                           }} 
                                            class="value-button" id="decrease" value="Decrease Value">-</div>
                                       
                                        <input type="number" id="number" value={info.fld_quantity} disabled/>
                                            <div 
                                                 onClick={()=>{
                                                    this.AddToCartFootwear(info)
                                                
                                                   
                                                }} 
                                            class="value-button" id="increase" value="Increase Value">+</div>
                                            </form>
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <p class="cart-amount">₹ {info.fld_quantity*info.fld_discountprice}</p>
                                        </div>
                                        <div class="col-md-2"
                                            onClick={()=>{
                                                    
                                                this.DeleteFromCartFootwear(info)
                                        
                                           
                                        }} 
                                        >
                                        <a 
                                        title="Remove product" class="btn-remove"><span class="">Remove</span></a>
                                        </div>
                                    </div>
                                    </div>
                                    ))}



  {/* ------------------ Socks ------------------------- */}


  <div class="title-sub-col" style={{display : this.state.SocksData.length == 0 ? 'none' : ''}}>
                                    <div class="row ">
                                        <div class="col-md-3"><p class="cart-sub-title">Socks</p></div>
                                        <div class="col-md-4">
                                        <p class="cart-sub-title">{this.state.SocksData.length} Item{this.state.SocksData.length == 1 ? '' : 's'} (₹ {this.state.SocksData.reduce(function (result, item) {
  return result + (item.fld_discountprice*item.fld_quantity);
}, 0)})</p>
                                        </div>
                                        <div class="col-md-2">
                                        
                                        </div>
                                        <div class="col-md-1">
                                       
                                        </div>
                                        <div class="col-md-2"></div>
                                    </div>
                                    </div>
                                    {this.state.SocksData.map((info,index)=>(
                                    <div class="cart-details">
                                    <div class="row ">
                                        <div 
                                        onClick={()=>{
                                       
                                            if(info.fld_url != '' && info.fld_url != null)
                                            {
                                                window.location.href = info.fld_url
                                            }
                                           
                                        }}
                                        class="col-md-3">
                                            <img src={info.VariantImage.split('#')[0]} class="img-responsive cart-img"></img>
                                        </div>
                                        <div class="col-md-4">
                                           <p 
                                           onClick={()=>{
                                         
                                            if(info.fld_url != '' && info.fld_url != null)
                                            {
                                                window.location.href = info.fld_url
                                            }
                                           
                                        }}
                                           class="cart-product-name">{info.fld_name} 
                                            </p>
                                            <p><b>Brand</b> - {info.fld_brand}</p>
                                          
                                            <div class="cart-price">
                                                {info.fld_discountpercent == 0 ?
                                                <p class=""> <p class="price"><b>Price </b> - ₹ {info.fld_discountprice}</p>
                                              </p>
                                            :
                                            <p class=""> <p class="price"><b>Price </b> - ₹ {info.fld_discountprice} <span><s>₹ {info.fld_price}</s></span></p>
                                            <p class="discount-price"> You Save ₹ {info.fld_price-info.fld_discountprice} ({info.fld_discountpercent}% )</p></p>}
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="cart-btn">
                                        <form>
                                            <div 
                                              onClick={()=>{
                                                this.RemoveFromCartSocks(info) 
                                         
                                                
                                           }} 
                                            class="value-button" id="decrease" value="Decrease Value">-</div>
                                       
                                        <input type="number" id="number" value={info.fld_quantity} disabled/>
                                            <div 
                                                  onClick={()=>{
                                                    this.AddToCartSocks(info)
                                                
                                                   
                                                }} 
                                            class="value-button" id="increase" value="Increase Value">+</div>
                                            </form>
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <p class="cart-amount">₹ {info.fld_quantity*info.fld_discountprice}</p>
                                        </div>
                                        <div class="col-md-2"
                                            onClick={()=>{
                                                    
                                                this.DeleteFromCartSocks(info)
                                        
                                           
                                        }} 
                                        >
                                        <a 
                                        title="Remove product" class="btn-remove"><span class="">Remove</span></a>
                                        </div>
                                    </div>
                                    </div>
                                    ))}







                                    <div class="row cart-buttons">
                                <div class="col-md-6">
                                <a href="/" class="btn btn-outline-secondary">Continue Shopping</a>
                                </div>
                                <div class="col-md-6">
                                    <div class="pull-right text-right">
                                <a 
                                   onClick={()=>{
                                    this.ClearShoppingCart()
                            
                                   
                              }} 
                                class="btn btn-outline-secondary btn-clear-cart ">Clear Shopping Cart</a>
                                </div>
                                </div>
                            </div>
                                </div>
                                <div class="col-md-4">
                                <div class="cart-summary">
                                    <h3>Order Summary</h3>
                                    <p class="cart-text">{this.state.Cart.length} item{this.state.Cart.length == 1 ? '' : 's'} in cart</p>
                                    <table class="table table-totals">
                                        <tbody>
                                         
                                                <tr>
                                                <td>Subtotal (MRP)</td>
                                                <td>₹ {parseFloat(this.state.MrpSubTotal).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                <td>Discounted Subtotal</td>
                            <td>₹ {parseFloat(this.state.SubTotal).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                <td>Base Price Value</td>
                                                <td>₹ {parseFloat(this.state.BaseSubTotal).toFixed(2)}</td>
                                                </tr>
                                                <tr class="coupon-box">
                                                    <td>
                                                        <div class="input-group-append">
                                                        <button class="btn btn-sm btn-primary" type="submit" data-toggle="modal" data-target="#exampleModal"
                                                    onClick={()=>{
                                                        this.setState({
                                                            showoffer : true
                                                        })
                                                    }}
                                                    >Apply Discount</button>
                                                          </div>
                                                            <p class="applied-coupon"> {JSON.stringify(this.state.SelectedCouponData) == '[]' ? <p></p> : this.state.SelectedCouponData.fld_code}</p>
                                                            </td>
                                                            <td> 
                                                                </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Coupon Discount Amount</td>
                                                                    <td>{JSON.stringify(this.state.SelectedCouponData) == '[]' ? 0
                                               : <p>-  ₹
                                               {(parseFloat(this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)).toFixed(2))}</p> }</td>
                                                                    </tr>
                                                                    <tr>
                                                                    <td>GST Value</td>
                                                <td>{parseFloat(this.state.GstValue).toFixed(2)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                    <td>Shipping Charges</td>
                                                                    <td>{(this.state.BaseSubTotal - this.state.Offer) < this.state.ShippingTh ? this.state.ShippingCharge : 0.00}</td>
                                                                    </tr>
                                                                    
                                                                    </tbody>
                                                                    
                                                                        </table>
                                                                        <div class="checkout-methods">
                                                                            <button 
                                                                            onClick={()=>{

                                                                                var log = localStorage.getItem(
                                                                                    "CustomerLoginDetails"
                                                                                  );
                                                                                  var login = JSON.parse(log);
                                          
                                                                                  if (login != null && login != "") {

                                                                                const SummaryData ={

                                                                                    OfferCode : JSON.stringify(this.state.SelectedCouponData) == '[]' ? '' : this.state.SelectedCouponData.fld_code,
                                                                                    SubTotalAmt : parseFloat(this.state.SubTotal).toFixed(2),
                                                                                    BaseSubTotalAmt : parseFloat(this.state.BaseSubTotal).toFixed(2),
                                                                                    MrpSubTotalAmt : parseFloat(this.state.MrpSubTotal).toFixed(2),
                                                                                    GstValue : parseFloat(this.state.GstValue).toFixed(2),
                                                                                    OfferPercent : this.state.SelectedCouponData.fld_pricepercent,
                                                                                    YouSaved : parseFloat((this.state.MrpSubTotal-this.state.SubTotal)+this.state.Offer).toFixed(2),
                                                                                  
                                                                                    OfferAmt : JSON.stringify(this.state.SelectedCouponData) == '[]' ? 0.00 : parseFloat(((this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))).toFixed(2),
                                                                                    ShippngAmt : (this.state.BaseSubTotal - this.state.Offer) < this.state.ShippingTh ? this.state.ShippingCharge : 0.00,
                                                                                    CodAmt : this.state.PayCod ? this.state.COD : 0.00,
                                                                                    TotalAmt :
                                                                                    JSON.stringify(this.state.SelectedCouponData) == '[]' ? 
                                                                                    (this.state.BaseSubTotal) < this.state.ShippingTh ? 
                                                                                    this.state.PayCod ? parseFloat(this.state.BaseSubTotal+this.state.ShippingCharge+this.state.COD+this.state.GstValue).toFixed(2)
                                                                                    : parseFloat(this.state.BaseSubTotal+this.state.ShippingCharge+this.state.GstValue).toFixed(2) : 
                                                                                    this.state.PayCod ? parseFloat(this.state.BaseSubTotal+this.state.COD+this.state.GstValue).toFixed(2)
                                                                                    : parseFloat(this.state.BaseSubTotal+this.state.GstValue).toFixed(2)
                                                                                    :
                                                                                    (this.state.BaseSubTotal - (this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100))) < this.state.ShippingTh ? 
                                                                                    this.state.PayCod ? parseFloat(this.state.BaseSubTotal-((this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))+this.state.ShippingCharge+this.state.COD+this.state.GstValue).toFixed(2)
                                                                                    : parseFloat(this.state.BaseSubTotal-((this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))+this.state.ShippingCharge+this.state.GstValue).toFixed(2) : 
                                                                                    this.state.PayCod ? parseFloat(this.state.BaseSubTotal-((this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))+this.state.COD+this.state.GstValue).toFixed(2)
                                                                                    : parseFloat((this.state.BaseSubTotal-((this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100))))+this.state.GstValue).toFixed(2)
                                                                                }
                                                                                localStorage.setItem('CartData',JSON.stringify(this.state.Cart))
                                                                                localStorage.setItem('OfferData',JSON.stringify(this.state.SelectedCouponData))
                                                                                localStorage.setItem('SummaryData',JSON.stringify(SummaryData))
                                                                                window.location.href = '/selectaddress'

                                                                            }
                                                                            else{
                                                                                const path ={
                                                                                    isCart : true
                                                                                }
                                                                                localStorage.setItem('PathCame',JSON.stringify(path))
                                                                                window.location.href = '/login'
                                                                            }
                                                                            }}
                                                                            class="btn btn-block btn-sm btn-primary">Select Shipping Address</button>
                                                                            </div>
                                                                            </div>
                                                                            <div class="cart-summary cart-box-footer">
                                                                            <table class="footer-table">
                                                                            <tfoot class="cart-footer">
                                                                        <tr><td>Payable Amount</td>
                                                <td style={{textAlign:"right"}}>₹{
                                                    JSON.stringify(this.state.SelectedCouponData) == '[]' ? 
                                                    (this.state.BaseSubTotal) < this.state.ShippingTh ? 
                                                    this.state.PayCod ? parseFloat(this.state.BaseSubTotal+this.state.ShippingCharge+this.state.COD+this.state.GstValue).toFixed(2)
                                                    : parseFloat(this.state.BaseSubTotal+this.state.ShippingCharge+this.state.GstValue).toFixed(2) : 
                                                    this.state.PayCod ? parseFloat(this.state.BaseSubTotal+this.state.COD+this.state.GstValue).toFixed(2)
                                                    : parseFloat(this.state.BaseSubTotal+this.state.GstValue).toFixed(2)
                                                    :
                                                    (this.state.BaseSubTotal - (this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100))) < this.state.ShippingTh ? 
                                                    this.state.PayCod ? parseFloat(this.state.BaseSubTotal-((this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))+this.state.ShippingCharge+this.state.COD+this.state.GstValue).toFixed(2)
                                                    : parseFloat(this.state.BaseSubTotal-((this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))+this.state.ShippingCharge+this.state.GstValue).toFixed(2) : 
                                                    this.state.PayCod ? parseFloat(this.state.BaseSubTotal-((this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))+this.state.COD+this.state.GstValue).toFixed(2)
                                                    : parseFloat((this.state.BaseSubTotal-((this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100))))+this.state.GstValue).toFixed(2)
                                                   }</td></tr>
                                                                        </tfoot>
                                                                        </table>
                                                                            </div>
                                                                            <div class="cart-summary last cart-box-footer" style={{textAlign:"left"}}>  
                                                                                <table class="footer-table">
                                                                                    <tfoot class="cart-footer">
                                                                                        <tr>
                                                                                            <td><i class="fas fa-check-circle"></i> You have saved </td>
                                                                                            <td style={{textAlign:"right"}}>₹{parseFloat((this.state.MrpSubTotal-this.state.SubTotal)+this.state.Offer).toFixed(2)} </td>
                                                                                        </tr>
                                                                                    </tfoot>
                                                                                </table>
                                                                               
                                                                               
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
                                                   variant_id: info.fld_id,
                                                   product_category: "Food",
                                                   quantity: 1,
                                                   amount: info.fld_discountprice,
                                                   updated_on: moment().format("lll"),
                                                   updated_by: login.fld_userid,
                                                   url : info.fld_url
                                         
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
                                                     this.getUpdatedCart()
     
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
       
                                             
                                                 var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Food')
       
                                             
                                                 if(item[0] != undefined){
       
                                                   var newIndex = newCart.indexOf(item[0])
       
                                                   newCart[newIndex].fld_quantity =  newCart[newIndex].fld_quantity + 1
       
                                                
       
                                                   localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                   this.props.setcartitemcount(newCart.length)
                                                   this.props.setcartamount(newCart.reduce(function (result, item) {
                                                     return result + (item.fld_amount*item.fld_quantity);
                                                   }, 0))
                                                   Notiflix.Notify.Info("Product added to Cart.");
                                                   this.getUpdatedCart()
                                                   
       
                                                 }
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
                                                   url : info.fld_url
                                             
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
                                                     this.getUpdatedCart()
      
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
      
                                            
                                                var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Footwear')
      
                                      
                                                if(item[0] != undefined){
      
                                                  var newIndex = newCart.indexOf(item[0])
      
                                                  newCart[newIndex].fld_quantity =  newCart[newIndex].fld_quantity + 1
      
                                              
      
                                                  localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                    this.props.setcartitemcount(newCart.length)
                                                    this.props.setcartamount(newCart.reduce(function (result, item) {
                                                      return result + (item.fld_amount*item.fld_quantity);
                                                    }, 0))
                                                  Notiflix.Notify.Info("Product added to Cart.");
                                                  this.getUpdatedCart()
                                                  
      
                                                }
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
                                                   url : info.fld_url
                                              
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
                                                     this.getUpdatedCart()
      
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
      
                                            
                                                var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Socks')
      
                                              
                                                if(item[0] != undefined){
      
                                                  var newIndex = newCart.indexOf(item[0])
      
                                                  newCart[newIndex].fld_quantity =  newCart[newIndex].fld_quantity + 1
      
                                     
      
                                                  localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                  this.props.setcartitemcount(newCart.length)
                                                  this.props.setcartamount(newCart.reduce(function (result, item) {
                                                    return result + (item.fld_amount*item.fld_quantity);
                                                  }, 0))
                                                  Notiflix.Notify.Info("Product added to Cart.");
                                                  this.getUpdatedCart()
                                                  
      
                                                }
                                              }
      
                                             }
      
      }


      RemoveFromCartFood(info){

        var log = localStorage.getItem('CustomerLoginDetails')
                                                var login = JSON.parse(log)
                                        

                                                if (login != null && login != "") {
                                        
                                                if(info.fld_quantity - 1 == 0)
                                                {
                                        
                                                    Notiflix.Loading.Dots('');
                                                                                        
                                                    PostApiCall.postRequest({
                                            
                                                        cart_id : info.fld_cartid,
                                                       
                                                    
                                                    },"DeleteItemShoppingCart").then((results) => 
                                                    
                                             
                                                      results.json().then(obj => {
                                            
                                                    
                                                      if(results.status == 200 || results.status==201){
                                            
                                                        Notiflix.Loading.Remove()
                                                        this.props.setcartitemcount(obj.data.length)
                                                        this.props.setcartamount(obj.data.reduce(function (result, item) {
                                                          return result + (item.fld_amount*item.fld_quantity);
                                                        }, 0))
                                                        this.getUpdatedCart()
                                            
                                                      }else{
                                                        Notiflix.Loading.Remove()
                                                        Notiflix.Notify.Failure('Something went wrong, try again later.') 
                                                      }
                                            
                                                   }))
                                                }
                                                else
                                                {
                                                    Notiflix.Loading.Dots('');
                                        
                                                    PostApiCall.postRequest({
                                            
                                                        customer_id : login.fld_userid,
                                                  
                                                        variant_id : info.fld_id,
                                                        product_category : 'Food',
                                                        quantity :1,
                                                       updated_on : moment().format('lll'),
                                                       updated_by : login.fld_userid
                                             
                                                    
                                                    },"DeductShoppingCart").then((results) => 
                                                    
                                              
                                                      results.json().then(obj => {
                                           
                                                    
                                                      if(results.status == 200 || results.status==201){
                                        
                                                      
                                                        Notiflix.Loading.Remove()
                                                        this.props.setcartitemcount(obj.data.length)
                                                        this.props.setcartamount(obj.data.reduce(function (result, item) {
                                                          return result + (item.fld_amount*item.fld_quantity);
                                                        }, 0))
                                                        Notiflix.Notify.Info('Product quantity updated.')
                                                        this.getUpdatedCart()
                                                      
                                           
                                                      }else{
                                                        Notiflix.Loading.Remove()
                                                        Notiflix.Notify.Failure('Something went wrong, try again later.') 
                                                      }
                                           
                                                   }))
                                                }
                                        
                                            }

                                            else
                                            {
                                                var cart_info = JSON.parse(localStorage.getItem('BMSCartData'))

                                            
                                                var newCart = cart_info != null ? cart_info : []
                                        
                                                if(info.fld_quantity - 1 == 0)
                                                {
                                        
                                                    var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Food')

                                                    if(item[0] != undefined){

                                                        var newIndex = newCart.indexOf(item[0])

                                                        newCart.splice(newIndex,1)
                                                        localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                        this.props.setcartitemcount(newCart.length)
                                                        this.props.setcartamount(newCart.reduce(function (result, item) {
                                                            return result + (item.fld_amount*item.fld_quantity);
                                                          }, 0))
                                                        this.getUpdatedCart()

                                                    }

                                                }
                                                else
                                                {
                                                    var item1 = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Food')

                                   
                                                    if(item1[0] != undefined){
                  
                                                      var newIndex1 = newCart.indexOf(item1[0])
                  
                                                      newCart[newIndex1].fld_quantity =  newCart[newIndex1].fld_quantity - 1
                  
                                                
                  
                                                      localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                      this.props.setcartitemcount(newCart.length)
                                                      this.props.setcartamount(newCart.reduce(function (result, item) {
                                                        return result + (item.fld_amount*item.fld_quantity);
                                                      }, 0))
                                                      this.getUpdatedCart()
                                               

                                                    }
                                                }
                                        
                                            }
                                                 
      }

      RemoveFromCartFootwear(info){

        var log = localStorage.getItem('CustomerLoginDetails')
                                                var login = JSON.parse(log)
                                        

                                                if (login != null && login != "") {
                                        
                                                if(info.fld_quantity - 1 == 0)
                                                {
                                        
                                                    Notiflix.Loading.Dots('');
                                                                                        
                                                    PostApiCall.postRequest({
                                            
                                                        cart_id : info.fld_cartid,
                                                       
                                                    
                                                    },"DeleteItemShoppingCart").then((results) => 
                                                    
                                                
                                                      results.json().then(obj => {
                                            
                                                    
                                                      if(results.status == 200 || results.status==201){
                                            
                                                        Notiflix.Loading.Remove()
                                                        this.props.setcartitemcount(obj.data.length)
                                                        this.props.setcartamount(obj.data.reduce(function (result, item) {
                                                          return result + (item.fld_amount*item.fld_quantity);
                                                        }, 0))
                                                        this.getUpdatedCart()
                                            
                                                      }else{
                                                        Notiflix.Loading.Remove()
                                                        Notiflix.Notify.Failure('Something went wrong, try again later.') 
                                                      }
                                            
                                                   }))
                                                }
                                                else
                                                {
                                                    Notiflix.Loading.Dots('');
                                        
                                                    PostApiCall.postRequest({
                                            
                                                        customer_id : login.fld_userid,
                                               
                                                        variant_id : info.fld_id,
                                                        product_category : 'Footwear',
                                                        quantity :1,
                                                       updated_on : moment().format('lll'),
                                                       updated_by : login.fld_userid
                                            
                                                    
                                                    },"DeductShoppingCart").then((results) => 
                                             
                                                      results.json().then(obj => {
                                           
                                                    
                                                      if(results.status == 200 || results.status==201){
                                        
                                                      
                                                        Notiflix.Loading.Remove()
                                                        this.props.setcartitemcount(obj.data.length)
                                                        this.props.setcartamount(obj.data.reduce(function (result, item) {
                                                          return result + (item.fld_amount*item.fld_quantity);
                                                        }, 0))
                                                        Notiflix.Notify.Info('Product quantity updated.')
                                                        this.getUpdatedCart()
                                                      
                                           
                                                      }else{
                                                        Notiflix.Loading.Remove()
                                                        Notiflix.Notify.Failure('Something went wrong, try again later.') 
                                                      }
                                           
                                                   }))
                                                }
                                        
                                            }

                                            else
                                            {
                                                var cart_info = JSON.parse(localStorage.getItem('BMSCartData'))

                                             
                                                var newCart = cart_info != null ? cart_info : []
                                        
                                                if(info.fld_quantity - 1 == 0)
                                                {
                                        
                                                    var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Footwear')

                                                    if(item[0] != undefined){

                                                        var newIndex = newCart.indexOf(item[0])

                                                        newCart.splice(newIndex,1)
                                                        localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                        this.props.setcartitemcount(newCart.length)
                                                        this.props.setcartamount(newCart.reduce(function (result, item) {
                                                            return result + (item.fld_amount*item.fld_quantity);
                                                          }, 0))
                                                        this.getUpdatedCart()

                                                    }

                                                }
                                                else
                                                {
                                                    var item1 = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Footwear')

                                               
                                                    if(item1[0] != undefined){
                  
                                                      var newIndex1 = newCart.indexOf(item1[0])
                  
                                                      newCart[newIndex1].fld_quantity =  newCart[newIndex1].fld_quantity - 1
                  
                                             
                  
                                                      localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                      this.props.setcartitemcount(newCart.length)
                                                      this.props.setcartamount(newCart.reduce(function (result, item) {
                                                        return result + (item.fld_amount*item.fld_quantity);
                                                      }, 0))
                                                      this.getUpdatedCart()
                                                  

                                                    }
                                                }
                                        
                                            }
                                                 
      }


      RemoveFromCartSocks(info){

        var log = localStorage.getItem('CustomerLoginDetails')
                                                var login = JSON.parse(log)
                                        

                                                if (login != null && login != "") {
                                        
                                                if(info.fld_quantity - 1 == 0)
                                                {
                                        
                                                    Notiflix.Loading.Dots('');
                                                                                        
                                                    PostApiCall.postRequest({
                                            
                                                        cart_id : info.fld_cartid,
                                                       
                                                    
                                                    },"DeleteItemShoppingCart").then((results) => 
                                                    
                                               
                                                      results.json().then(obj => {
                                            
                                                    
                                                      if(results.status == 200 || results.status==201){
                                            
                                                        Notiflix.Loading.Remove()
                                                        this.props.setcartitemcount(obj.data.length)
                                                        this.props.setcartamount(obj.data.reduce(function (result, item) {
                                                          return result + (item.fld_amount*item.fld_quantity);
                                                        }, 0))
                                                        this.getUpdatedCart()
                                            
                                                      }else{
                                                        Notiflix.Loading.Remove()
                                                        Notiflix.Notify.Failure('Something went wrong, try again later.') 
                                                      }
                                            
                                                   }))
                                                }
                                                else
                                                {
                                                    Notiflix.Loading.Dots('');
                                        
                                                    PostApiCall.postRequest({
                                            
                                                        customer_id : login.fld_userid,
                                             
                                                        variant_id : info.fld_id,
                                                        product_category : 'Socks',
                                                        quantity :1,
                                                       updated_on : moment().format('lll'),
                                                       updated_by : login.fld_userid
                                                
                                                    },"DeductShoppingCart").then((results) => 
                                                    
                                                     
                                                      results.json().then(obj => {
                                           
                                                    
                                                      if(results.status == 200 || results.status==201){
                                        
                                                  
                                                        Notiflix.Loading.Remove()
                                                        this.props.setcartitemcount(obj.data.length)
                                                        this.props.setcartamount(obj.data.reduce(function (result, item) {
                                                          return result + (item.fld_amount*item.fld_quantity);
                                                        }, 0))
                                                        Notiflix.Notify.Info('Product quantity updated.')
                                                        this.getUpdatedCart()
                                                      
                                           
                                                      }else{
                                                        Notiflix.Loading.Remove()
                                                        Notiflix.Notify.Failure('Something went wrong, try again later.') 
                                                      }
                                           
                                                   }))
                                                }
                                        
                                            }

                                            else
                                            {
                                                var cart_info = JSON.parse(localStorage.getItem('BMSCartData'))

                                        
                                                var newCart = cart_info != null ? cart_info : []
                                        
                                                if(info.fld_quantity - 1 == 0)
                                                {
                                        
                                                    var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Socks')

                                                    if(item[0] != undefined){

                                                        var newIndex = newCart.indexOf(item[0])

                                                        newCart.splice(newIndex,1)
                                                        localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                        this.props.setcartitemcount(newCart.length)
                                                        this.props.setcartamount(newCart.reduce(function (result, item) {
                                                            return result + (item.fld_amount*item.fld_quantity);
                                                          }, 0))
                                                        this.getUpdatedCart()

                                                    }

                                                }
                                                else
                                                {
                                                    var item1 = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Socks')

                                          
                                                    if(item1[0] != undefined){
                  
                                                      var newIndex1 = newCart.indexOf(item1[0])
                  
                                                      newCart[newIndex1].fld_quantity =  newCart[newIndex1].fld_quantity - 1
                  
                            
                  
                                                      localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                      this.props.setcartitemcount(newCart.length)
                                                      this.props.setcartamount(newCart.reduce(function (result, item) {
                                                        return result + (item.fld_amount*item.fld_quantity);
                                                      }, 0))
                                                      this.getUpdatedCart()
                                         
                                                    }
                                                }
                                        
                                            }
                                                 
      }


      DeleteFromCartFood(info){


        var log = localStorage.getItem(
            "CustomerLoginDetails"
          );
          var login = JSON.parse(log);

          if (login != null && login != "") {


            Notiflix.Loading.Dots('');
                                    
            PostApiCall.postRequest({
    
                cart_id : info.fld_cartid,
               
            
            },"DeleteItemShoppingCart").then((results) => 
            
           
              results.json().then(obj => {
    
            
              if(results.status == 200 || results.status==201){
    
               
                Notiflix.Loading.Remove()
                this.props.setcartitemcount(obj.data.length)
                this.props.setcartamount(obj.data.reduce(function (result, item) {
                  return result + (item.fld_amount*item.fld_quantity);
                }, 0))
                this.getUpdatedCart()
    
              }else{
                Notiflix.Loading.Remove()
                Notiflix.Notify.Failure('Something went wrong, try again later.') 
              }
    
           }))

          }
          else
          {

          
        var cart_info = JSON.parse(localStorage.getItem('BMSCartData'))

                              
                                            var newCart = cart_info != null ? cart_info : []
                                    
                                            if(info.fld_quantity - 1 == 0)
                                            {
                                    
                                                var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Food')

                                                if(item[0] != undefined){

                                                    var newIndex = newCart.indexOf(item[0])

                                                    newCart.splice(newIndex,1)
                                                    localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                    this.props.setcartitemcount(newCart.length)
                                                    this.props.setcartamount(newCart.reduce(function (result, item) {
                                                        return result + (item.fld_amount*item.fld_quantity);
                                                      }, 0))
                                                    this.getUpdatedCart()
                                         

                                                }

                                            }
                                       
      }
    }

    DeleteFromCartFootwear(info){


        var log = localStorage.getItem(
            "CustomerLoginDetails"
          );
          var login = JSON.parse(log);

          if (login != null && login != "") {


            Notiflix.Loading.Dots('');
                                    
            PostApiCall.postRequest({
    
                cart_id : info.fld_cartid,
               
            
            },"DeleteItemShoppingCart").then((results) => 
            
         
              results.json().then(obj => {
    
            
              if(results.status == 200 || results.status==201){
    
                
              
                Notiflix.Loading.Remove()
                this.props.setcartitemcount(obj.data.length)
                this.props.setcartamount(obj.data.reduce(function (result, item) {
                  return result + (item.fld_amount*item.fld_quantity);
                }, 0))
                this.getUpdatedCart()
    
              }else{
                Notiflix.Loading.Remove()
                Notiflix.Notify.Failure('Something went wrong, try again later.') 
              }
    
           }))

          }
          else
          {

          
        var cart_info = JSON.parse(localStorage.getItem('BMSCartData'))

                                   
                                            var newCart = cart_info != null ? cart_info : []
                                    
                                            if(info.fld_quantity - 1 == 0)
                                            {
                                    
                                                var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Footwear')

                                                if(item[0] != undefined){

                                                    var newIndex = newCart.indexOf(item[0])

                                                    newCart.splice(newIndex,1)
                                                    localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                    this.props.setcartitemcount(newCart.length)
                                                    this.props.setcartamount(newCart.reduce(function (result, item) {
                                                        return result + (item.fld_amount*item.fld_quantity);
                                                      }, 0))
                                                    this.getUpdatedCart()
                                                   

                                                }

                                            }
                                       
      }
    }

    DeleteFromCartSocks(info){


        var log = localStorage.getItem(
            "CustomerLoginDetails"
          );
          var login = JSON.parse(log);

          if (login != null && login != "") {


            Notiflix.Loading.Dots('');
                                    
            PostApiCall.postRequest({
    
                cart_id : info.fld_cartid,
               
            
            },"DeleteItemShoppingCart").then((results) => 
            
            
              results.json().then(obj => {
    
            
              if(results.status == 200 || results.status==201){
    
   
                Notiflix.Loading.Remove()
                this.props.setcartitemcount(obj.data.length)
                this.props.setcartamount(obj.data.reduce(function (result, item) {
                  return result + (item.fld_amount*item.fld_quantity);
                }, 0))
                this.getUpdatedCart()
    
              }else{
                Notiflix.Loading.Remove()
                Notiflix.Notify.Failure('Something went wrong, try again later.') 
              }
    
           }))

          }
          else
          {

          
        var cart_info = JSON.parse(localStorage.getItem('BMSCartData'))

                                  
                                            var newCart = cart_info != null ? cart_info : []
                                    
                                            if(info.fld_quantity - 1 == 0)
                                            {
                                    
                                                var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Socks')

                                                if(item[0] != undefined){

                                                    var newIndex = newCart.indexOf(item[0])

                                                    newCart.splice(newIndex,1)
                                                    localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                    this.props.setcartitemcount(newCart.length)
                                                    this.props.setcartamount(newCart.reduce(function (result, item) {
                                                        return result + (item.fld_amount*item.fld_quantity);
                                                      }, 0))
                                                    this.getUpdatedCart()
                                               

                                                }

                                            }
                                       
      }
    }



    ClearShoppingCart(){


        var log = localStorage.getItem(
            "CustomerLoginDetails"
          );
          var login = JSON.parse(log);

          if (login != null && login != "") {


            Notiflix.Loading.Dots('');
                            
            PostApiCall.postRequest({
    
                customer_id : login.fld_userid,
                

            },"ClearShoppingCart").then((results) => 
            
           
              results.json().then(obj => {
   
            
              if(results.status == 200 || results.status==201){

            
                window.location.href = '/'
         
   
              }else{
                Notiflix.Loading.Remove()
                Notiflix.Notify.Failure('Something went wrong, try again later.') 
              }
   
           }))

          }
          else
          {

          
            localStorage.removeItem('BMSCartData')
            window.location.href = '/'
          

                                       
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
  )(CartUpdated);