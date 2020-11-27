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
// import { array } from '../../../Library/Caches/typescript/3.6/node_modules/@types/prop-types';

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
            AccessoriesData : [],


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
            done : false,
            CodMasterData : [],
            CovidData : []

           
        }

    }

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor: "#507dc0",
            //  #507dc0'
          });

             GetApiCall.getRequest("GetCodMaster").then(resultdes =>
            resultdes.json().then(obj => {
                console.log(obj.data)
                this.setState({
                CodMasterData : obj.data[0],
                  COD : obj.data[0].fld_amount
              })

            
            }))

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


                        console.log(obj.data)
                        // for(var i = 0 ; i<Object.keys(obj.data).length;i++){
                        //     subt = subt + obj.data[i].fld_discountprice
                        // }

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
            
                                    // for(var i = 0 ; i<Object.keys(obj.data).length;i++){
                                    //     subt = subt + obj.data[i].fld_discountprice
                                    // }
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
                        
                                                // for(var i = 0 ; i<Object.keys(obj.data).length;i++){
                                                //     subt = subt + obj.data[i].fld_discountprice
                                                // }
                                            }
                        
                                            this.setState({
                                              SocksData: obj.data,
                                              Cart : arr
                                            },
                                            ()=>{
                                                cn = cn +1


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
                                                            GstValue : gstval,
                                                            GstValueRef : gstval
                                                        })
                                                        this.props.setcartitemcount(this.state.Cart.length)
                                                        this.props.setcartamount(subt)
                                                    }
                                             
                                                }
                                              })
                                            }
                                            }))
                                              })
                                            }
                                          }))
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
               
                // console.log(obj.data)
                for(var i =0 ; i<Object.keys(obj.data).length;i++){

                    if(obj.data[i].fld_type == 'Shipping'){
                        this.setState({
                            ShippingCharge : obj.data[i].fld_price,
                            ShippingTh : obj.data[i].fld_thresholdvalue
                        })
                    }
                    else  if(obj.data[i].fld_type == 'COD'){
                        this.setState({
                            // COD : obj.data[i].fld_price
                        })
                    }

                }
                
                  this.setState({
                      ExtraCharges : obj.data
                  })
    
    
                  // Notiflix.Loading.Remove();
                }))


                GetApiCall.getRequest("GetOfferWebsite").then(resultdes =>
                    resultdes.json().then(obj => {
                   
                      this.setState({
                          OfferData : obj.data,
                        //   done: true
                      })
                    //   Notiflix.Loading.Remove()
        
        
                      // Notiflix.Loading.Remove();
                    }))
    
         
        //  Notiflix.Loading.Remove()
         
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
            var accData = []
            var covData = []
    
          
    
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
    
                        // console.log(obj.data[0])
    
                        // this.setState(prevState => ({
                        //     FoodData: [...prevState.FoodData, obj.data[0]]
                        //   }));
    
                        //   this.setState(prevState => ({
                        //     CartData: [...prevState.FoodData, obj.data[0]]
                        //   }),()=>{
    
    
                        fdData.push(obj.data[0])
                        crtData.push(obj.data[0])
    
                            
                            cn = cn +1
    
                            if(cn == cart_info.length){
                                
                                // console.log(this.state.)
                                this.setState({
                                    done : true,
                                    CartData : crtData,
                                    FootwearData : ftData,
                                    FoodData : fdData,
                                    SocksData : skData,
                                    AccessoriesData : accData,
                                    CovidData : covData
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
                                            GstValue : gstval,
                                            GstValueRef : gstval
                                        })
                                        this.props.setcartitemcount(this.state.CartData.length)
                                        this.props.setcartamount(subt)
                                        Notiflix.Loading.Remove()
                                    }
                                })
                                
    
                            }
                        //   });
    
                        
    
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
                                        
                                        // console.log(ftData)
                                        this.setState({
                                            done : true,
                                            CartData : crtData,
                                            FootwearData : ftData,
                                            FoodData : fdData,
                                            SocksData : skData,
                                            AccessoriesData : accData,
                                            CovidData : covData
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
                                                    GstValue : gstval,
                                                    GstValueRef : gstval
                                                })
                                                this.props.setcartitemcount(this.state.CartData.length)
                                                this.props.setcartamount(subt)
                                                Notiflix.Loading.Remove()
                                            }
                                        })
                                        
            
                                    }
                                //   });
            
                                
            
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
                                
                                // console.log(this.state.)
                                this.setState({
                                    done : true,
                                    CartData : crtData,
                                    FootwearData : ftData,
                                    FoodData : fdData,
                                    SocksData : skData,
                                    AccessoriesData : accData,
                                    CovidData : covData
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
                                            GstValue : gstval,
                                            GstValueRef : gstval
                                        })
                                        this.props.setcartitemcount(this.state.CartData.length)
                                        this.props.setcartamount(subt)
                                        Notiflix.Loading.Remove()
                                    }
                                })
                                
    
                            }
                        //   });
    
                        
    
                      }
                    }))
                    }

                    else if(cart_info[i].fld_productcategory == 'Accessories')
                    {
                        PostApiCall.postRequest(
                            {
                                id : cart_info[i].fld_variantid,
                                quantity : cart_info[i].fld_quantity,
                                url : cart_info[i].fld_url
                            },
                            "GetCartAccessoriesVariantCookie"
                          ).then((results) =>
                            results.json().then((obj) => {
                              if (results.status == 200 || results.status == 201) {
            
            
                                accData.push(obj.data[0])
                        crtData.push(obj.data[0])
    
                            
                            cn = cn +1
    
                            if(cn == cart_info.length){
                                
                                // console.log(this.state.)
                                this.setState({
                                    done : true,
                                    CartData : crtData,
                                    FootwearData : ftData,
                                    FoodData : fdData,
                                    SocksData : skData,
                                    AccessoriesData : accData,
                                    CovidData : covData
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
                                            GstValue : gstval,
                                            GstValueRef : gstval
                                        })
                                        this.props.setcartitemcount(this.state.CartData.length)
                                        this.props.setcartamount(subt)
                                        Notiflix.Loading.Remove()
                                    }
                                })
                                
    
                            }
                        //   });
    
                        
    
                      }
                    }))
                    }
    
    
                    else if(cart_info[i].fld_productcategory == 'Covid')
                    {
                        PostApiCall.postRequest(
                            {
                                id : cart_info[i].fld_variantid,
                                quantity : cart_info[i].fld_quantity,
                                url : cart_info[i].fld_url
                            },
                            "GetCartCovidVariantCookie"
                          ).then((results) =>
                            results.json().then((obj) => {
                              if (results.status == 200 || results.status == 201) {
            
            
                                covData.push(obj.data[0])
                        crtData.push(obj.data[0])
    
                            
                            cn = cn +1
    
                            if(cn == cart_info.length){
                                
                                // console.log(this.state.)
                                this.setState({
                                    done : true,
                                    CartData : crtData,
                                    FootwearData : ftData,
                                    FoodData : fdData,
                                    SocksData : skData,
                                    AccessoriesData : accData,
                                    CovidData : covData
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
                                            GstValue : gstval,
                                            GstValueRef : gstval
                                        })
                                        this.props.setcartitemcount(this.state.CartData.length)
                                        this.props.setcartamount(subt)
                                        Notiflix.Loading.Remove()
                                    }
                                })
                                
    
                            }
                        //   });
    
                        
    
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
                   
                    // console.log(obj.data)
                    for(var i =0 ; i<Object.keys(obj.data).length;i++){
    
                        if(obj.data[i].fld_type == 'Shipping'){
                            this.setState({
                                ShippingCharge : obj.data[i].fld_price,
                                ShippingTh : obj.data[i].fld_thresholdvalue
                            })
                        }
                        else  if(obj.data[i].fld_type == 'COD'){
                            this.setState({
                                // COD : obj.data[i].fld_price
                            })
                        }
    
                    }
                    
                      this.setState({
                          ExtraCharges : obj.data
                      })
        
        
                      // Notiflix.Loading.Remove();
                    }))
    
    
                    GetApiCall.getRequest("GetOfferWebsite").then(resultdes =>
                        resultdes.json().then(obj => {
                       
                          this.setState({
                              OfferData : obj.data,
                            //   done: true
                          })
                        //   Notiflix.Loading.Remove()
            
            
                          // Notiflix.Loading.Remove();
                        }))
        
             
            //  Notiflix.Loading.Remove()
             
            // }
       
        
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
                {/* <h2 class="light-title section-title" style={{marginBottom: "20px"}}>{this.state.CategorySelected} </h2> */}
              </div>
            )}
       
                        <div class="container-box cart-section" style={{display : this.state.SubTotal > 0 && this.state.done ? '' : 'none'}}>
                            <div class="row">
                            
                                <div class="col-lg-8 col-md-12 col-sm-12">

                               
                                  
        
                                    <div class="cart-discount" style={{display : this.state.showoffer ? '' : 'none'}}>
                                        {/* <h4>Apply Discount Code</h4> */}
                                        <form onSubmit={(e)=>{
                                            e.preventDefault()
                                        }}>
                                            <div class="input-group">
                                                {/* <input type="text" class="form-control form-control-sm" placeholder="Enter discount code"  required /> */}
                                                <div class="input-group-append">
                                                    {/* <button class="btn btn-sm btn-primary" type="submit" data-toggle="modal" data-target="#exampleModal">Apply Discount</button> */}
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
                                                        if(this.state.OfferData.length <= 0){
                                                          Notiflix.Report.Failure('Oops!','Sorry, your offer code is not valid.',
                                                          'Ok');

                                                        }
                                                        for(var i = 0 ;i<this.state.OfferData.length ;i++){
     
                                                         if(this.state.OfferData[i].fld_code == this.state.Couponcode){
                                                             if(this.state.SubTotal >= this.state.OfferData[i].fld_minimumdiscountprice)
                                                             {

                                                                this.setState({
                                                                    SelectedCouponData : this.state.OfferData[i]
                                                                })
                                                                dt = this.state.OfferData[i]
                                                                cn = 1
                                                             }
                                                             else
                                                             {
                                                                this.setState({
                                                                    showoffer : false,
                                                        
                                                                })
                                                                cn = 2
                                                               //  console.log(dt)
                                                                // Notiflix.Notify.Failure('Offer can be applied above '+this.state.OfferData[i].fld_minimumdiscountprice+'.')  
                                                            
                                                                
                                                                Notiflix.Report.Failure('Oops!','Offer can only be applied above '+this.state.OfferData[i].fld_minimumdiscountprice+'.',
                                                                'Ok');
                                                            }
                                                            
                                                           
                                                         }else{
                                                          Notiflix.Report.Failure('Oops!','Sorry, your offer code is not valid.',
                                                          'Ok');
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
                                                                //  console.log(dt)

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
        
                                {/* <div class="col-lg-4" style={{display : this.state.Cart.length > 0 ? '' : 'none'}}>
                                    <div class="cart-summary">
                                        <h3>Summary</h3>
        
                                    
        
                                        <table class="table table-totals">
                                            <tbody>
                                                <tr>
                                                    <td>Subtotal</td>
                                            <td>&#8377;{parseFloat(this.state.SubTotal).toFixed(2)}</td>
                                                </tr>
                                                <tr>
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
                                                </td>
                                               
                                               {JSON.stringify(this.state.SelectedCouponData) == '[]' ? <td> </td>
                                               : <td>-  &#8377; {
                                            //     (parseFloat(this.state.SubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)).toFixed(2)) 
                                            //     > this.state.SelectedCouponData.fld_maximumdiscountprice ? 
                                            //    (parseFloat(this.state.SelectedCouponData.fld_maximumdiscountprice).toFixed(2)) : 
                                               (parseFloat(this.state.SubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)).toFixed(2))} 
                                               <br/> <span>{this.state.SelectedCouponData.fld_code}</span> </td>}
                                               
                                                </tr>
        
                                                <tr>
                                                    <td>Shipping Charges</td>
                                                        <td>&#8377; {(this.state.SubTotal - this.state.Offer) < this.state.ShippingTh ? this.state.ShippingCharge : 0.00}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td>Order Total</td>
                                                    <td>&#8377;{
                                                    JSON.stringify(this.state.SelectedCouponData) == '[]' ? 
                                                    (this.state.SubTotal) < this.state.ShippingTh ? 
                                                    this.state.PayCod ? parseFloat(this.state.SubTotal+this.state.ShippingCharge+this.state.COD).toFixed(2)
                                                    : parseFloat(this.state.SubTotal+this.state.ShippingCharge).toFixed(2) : 
                                                    this.state.PayCod ? parseFloat(this.state.SubTotal+this.state.COD).toFixed(2)
                                                    : parseFloat(this.state.SubTotal).toFixed(2)
                                                    :
                                                    (this.state.SubTotal - (this.state.SubTotal*(this.state.SelectedCouponData.fld_pricepercent/100))) < this.state.ShippingTh ? 
                                                    this.state.PayCod ? parseFloat(this.state.SubTotal-((this.state.SubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))+this.state.ShippingCharge+this.state.COD).toFixed(2)
                                                    : parseFloat(this.state.SubTotal-((this.state.SubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))+this.state.ShippingCharge).toFixed(2) : 
                                                    this.state.PayCod ? parseFloat(this.state.SubTotal-((this.state.SubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))+this.state.COD).toFixed(2)
                                                    : parseFloat(this.state.SubTotal-((this.state.SubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))).toFixed(2)
                                                   }</td>
                                                </tr>
                                            </tfoot>
                                            <tr>
                                                <td><input type="checkbox"
                                                checked={this.state.PayCod} 
                                                onChange={()=>{
                                                    if(this.state.PayCod){

                                                        this.setState({
                                                            PayCod : false
                                                        })

                                                    }else
                                                    {
                                                        this.setState({
                                                            PayCod : true
                                                        })

                                                    }
                                                }}
                                                /><span style={{    margin: '5px'}}>Cash on Delivery</span></td>
                                                <td>&#8377; {this.state.PayCod ? this.state.COD : 0.00}</td>
                                            </tr> 
                                        </table>
        
                                        <div class="checkout-methods">
                                            <button onClick={()=>{
                                                // console.log(this.state.Cart)

                                                // for(var i = 0 ; i<Object.keys(this.state.Cart).length;i++){

                                                //     if(this.state.Cart[i].fld_prescriptionrequired != undefined){
                                                //         // console.log(this.state.Cart[i])
                                                //         if(this.state.Cart[i].fld_prescriptionrequired){


                                                //             Notiflix.Confirm.Show('Alert','You have added a prescribed medicine to your cart, please upload a valid prescription. Do you want to continue?','Yes','No',
                                                //             function(){ 
                                                //                 // Yes button callback
                                                //                 window.location.href = '/checkout'
                                                //                 },function(){
                                                //                      // No button callback
                                                //                      ;});


                                                //         }

                                                //     }

                                                // }

                                                const SummaryData ={
                                                    SubTotalAmt : parseFloat(this.state.SubTotal).toFixed(2),
                                                    OfferPercent : this.state.SelectedCouponData.fld_pricepercent,
                                                    OfferAmt : JSON.stringify(this.state.SelectedCouponData) == '[]' ? 0.00 : parseFloat(((this.state.SubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))).toFixed(2),
                                                    ShippngAmt : (this.state.SubTotal - this.state.Offer) < this.state.ShippingTh ? this.state.ShippingCharge : 0.00,
                                                    CodAmt : this.state.PayCod ? this.state.COD : 0.00,
                                                    TotalAmt :
                                                     JSON.stringify(this.state.SelectedCouponData) == '[]' ? 
                                                    (this.state.SubTotal ) < this.state.ShippingTh ? 
                                                    this.state.PayCod ? parseFloat(this.state.SubTotal+this.state.ShippingCharge+this.state.COD).toFixed(2)
                                                    : parseFloat(this.state.SubTotal+this.state.ShippingCharge).toFixed(2) : 
                                                    this.state.PayCod ? parseFloat(this.state.SubTotal+this.state.COD).toFixed(2)
                                                    : parseFloat(this.state.SubTotal).toFixed(2)
                                                    :
                                                    (this.state.SubTotal - (this.state.SubTotal*(this.state.SelectedCouponData.fld_pricepercent/100))) < this.state.ShippingTh ? 
                                                    this.state.PayCod ? parseFloat(this.state.SubTotal-((this.state.SubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))+this.state.ShippingCharge+this.state.COD).toFixed(2)
                                                    : parseFloat(this.state.SubTotal-((this.state.SubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))+this.state.ShippingCharge).toFixed(2) : 
                                                    this.state.PayCod ? parseFloat(this.state.SubTotal-((this.state.SubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))+this.state.COD).toFixed(2)
                                                    : parseFloat(this.state.SubTotal-((this.state.SubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))).toFixed(2)
                                                }
                                                localStorage.setItem('CartData',JSON.stringify(this.state.Cart))
                                                localStorage.setItem('OfferData',JSON.stringify(this.state.SelectedCouponData))
                                                localStorage.setItem('SummaryData',JSON.stringify(SummaryData))
                                                window.location.href = '/selectaddress'
                                            }}
                                            class="btn btn-block btn-sm btn-primary">Select Shipping Address</button>
                                           
                                        </div>
                                    </div>
                                </div>
                          */}
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
                                            // console.log(info.fld_url)
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
                                            // console.log(info.fld_url)
                                            if(info.fld_url != '' && info.fld_url != null)
                                            {
                                                window.location.href = info.fld_url
                                            }
                                           
                                        }}
                                           class="cart-product-name">{info.fld_name} 
                                            </p>
                                            <p><b>Brand</b> - {info.fld_brand}</p>
                                            <p><b>Net Weight</b> - {info.fld_productweight +" "+ info.fld_productunit}</p>
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
                                            // console.log(info.fld_url)
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
                                            // console.log(info.fld_url)
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
                                            // console.log(info.fld_url)
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
                                            // console.log(info.fld_url)
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




     {/* ------------------ Accessories ------------------------- */}
     <div class="title-sub-col" style={{display : this.state.AccessoriesData.length == 0 ? 'none' : ''}}>
                                    <div class="row ">
                                        <div class="col-md-3"><p class="cart-sub-title">Accessories</p></div>
                                        <div class="col-md-4">
                                            <p class="cart-sub-title">{this.state.AccessoriesData.length} Item{this.state.AccessoriesData.length == 1 ? '' : 's'} (₹ {this.state.AccessoriesData.reduce(function (result, item) {
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
                                    {this.state.AccessoriesData.map((info,index)=>(
                                    <div class="cart-details">
                                    <div class="row ">
                                        <div 
                                        onClick={()=>{
                                            // console.log(info.fld_url)
                                            if(info.fld_url != '' && info.fld_url != null)
                                            {
                                                // window.location.href = info.fld_url
                                                if(info.fld_url[0] != undefined){
                                                  window.location.href = info.fld_url[0]
                                                }else
                                                {
                                                  window.location.href = info.fld_url
                                                }
                                               
                                            }
                                           
                                        }}
                                        class="col-md-3">
                                            <img src={info.VariantImage.split('#')[0]} class="img-responsive cart-img"></img>
                                        </div>
                                        <div class="col-md-4">
                                           <p 
                                           onClick={()=>{
                                            // console.log(info.fld_url)
                                            if(info.fld_url != '' && info.fld_url != null)
                                            {
                                              if(info.fld_url[0] != undefined){
                                                window.location.href = info.fld_url[0]
                                              }else
                                              {
                                                window.location.href = info.fld_url
                                              }
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
                                               this.RemoveFromCartAccessories(info) 
                                        
                                               
                                          }} 
                                          
                                            class="value-button" id="decrease" value="Decrease Value">-</div>
                                        <input type="number" id="number" value={info.fld_quantity} disabled/>
                                            <div 
                                               onClick={()=>{
                                                this.AddToCartAccessories(info)
                                            
                                               
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
                                                    
                                           this.DeleteFromCartAccessories(info)
                                       
                                    }} 
                                        >
                                        <a 
                                        title="Remove product" class="btn-remove"><span class="">Remove</span></a>
                                        </div>
                                    </div>
                                    </div>
                                    ))}



   {/* ------------------ Accessories ------------------------- */}
   <div class="title-sub-col" style={{display : this.state.CovidData.length == 0 ? 'none' : ''}}>
                                    <div class="row ">
                                        <div class="col-md-3"><p class="cart-sub-title">Covid Essentials</p></div>
                                        <div class="col-md-4">
                                            <p class="cart-sub-title">{this.state.CovidData.length} Item{this.state.CovidData.length == 1 ? '' : 's'} (₹ {this.state.CovidData.reduce(function (result, item) {
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
                                    {this.state.CovidData.map((info,index)=>(
                                    <div class="cart-details">
                                    <div class="row ">
                                        <div 
                                        onClick={()=>{
                                            // console.log(info.fld_url)
                                            if(info.fld_url != '' && info.fld_url != null)
                                            {
                                                // window.location.href = info.fld_url
                                                if(info.fld_url[0] != undefined){
                                                  window.location.href = info.fld_url[0]
                                                }else
                                                {
                                                  window.location.href = info.fld_url
                                                }
                                               
                                            }
                                           
                                        }}
                                        class="col-md-3">
                                            <img src={info.VariantImage.split('#')[0]} class="img-responsive cart-img"></img>
                                        </div>
                                        <div class="col-md-4">
                                           <p 
                                           onClick={()=>{
                                            // console.log(info.fld_url)
                                            if(info.fld_url != '' && info.fld_url != null)
                                            {
                                              if(info.fld_url[0] != undefined){
                                                window.location.href = info.fld_url[0]
                                              }else
                                              {
                                                window.location.href = info.fld_url
                                              }
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
                                               this.RemoveFromCartCovid(info) 
                                        
                                               
                                          }} 
                                          
                                            class="value-button" id="decrease" value="Decrease Value">-</div>
                                        <input type="number" id="number" value={info.fld_quantity} disabled/>
                                            <div 
                                               onClick={()=>{
                                                this.AddToCartCovid(info)
                                            
                                               
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
                                                    
                                           this.DeleteFromCartCovid(info)
                                       
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
                                                                    <td>{JSON.stringify(this.state.SelectedCouponData) == '[]' ? '₹ 0'
                                               : <p>-  ₹ 
                                               {' '}{(parseFloat(this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)).toFixed(2))}</p> }</td>
                                                                    </tr>
                                                                    <tr>
                                                                    <td>GST Value</td>
                                                <td>₹ {parseFloat(this.state.GstValue).toFixed(2)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                    <td>Shipping Charges</td>
                                                                    <td>₹ {(this.state.BaseSubTotal - this.state.Offer) < this.state.ShippingTh ? this.state.ShippingCharge :'0.00'}</td>
                                                                    </tr>

                                                                    <tr>
                                                                <td><input type="checkbox"
                                                                checked={this.state.PayCod} 
                                                                onChange={()=>{
                                                                    if(this.state.PayCod){

                                                                        this.setState({
                                                                            PayCod : false
                                                                        })

                                                                    }else
                                                                    {
                                                                        this.setState({
                                                                            PayCod : true
                                                                        })

                                                                    }
                                                                }}
                                                                /><span style={{    margin: '5px'}}>Cash on Delivery</span></td>
                                                                <td>&#8377; {this.state.PayCod ? this.state.COD : '0.00'}</td>
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
                                                                                    // OfferPercent : '5',
                                                                                    OfferAmt : JSON.stringify(this.state.SelectedCouponData) == '[]' ? 0.00 : parseFloat(((this.state.BaseSubTotal*(this.state.SelectedCouponData.fld_pricepercent/100)))).toFixed(2),
                                                                                    ShippngAmt : (this.state.BaseSubTotal - this.state.Offer) < this.state.ShippingTh ? this.state.ShippingCharge : 0.00,
                                                                                    CodAmt : this.state.PayCod ? this.state.COD : 0.00,
                                                                                    PayMode : this.state.PayCod ? 'COD' : 'Online',
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

      this.setState({
        SelectedCouponData : [],
        // GstValue : this.state.GstValueRef
      })
    
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
       
                                               // console.log(cart_info)
                                               var newCart = cart_info != null ? cart_info : []
       
                                               if(cart_info != null){
       
                                             
                                                 var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Food')
       
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
                                                   this.getUpdatedCart()
                                                   
       
                                                 }
                                               }
                                               
     
                                             }
     
     }


     AddToCartFootwear(info){

      this.setState({
        SelectedCouponData : [],
        // GstValue : this.state.GstValueRef
      })

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
      
                                              // console.log(cart_info)
                                              var newCart = cart_info != null ? cart_info : []
      
                                              if(cart_info != null){
      
                                            
                                                var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Footwear')
      
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
                                                  this.getUpdatedCart()
                                                  
      
                                                }
                                              }  
      
                                             }
      
      }
      
      
      
      AddToCartSocks(info){
      
        this.setState({
          SelectedCouponData : [],
          // GstValue : this.state.GstValueRef
        })
      
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
      
                                              // console.log(cart_info)
                                              var newCart = cart_info != null ? cart_info : []
      
                                              if(cart_info != null){
      
                                            
                                                var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Socks')
      
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
                                                  this.getUpdatedCart()
                                                  
      
                                                }
                                              }
      
                                             }
      
      }

      AddToCartAccessories(info){
      
        this.setState({
          SelectedCouponData : [],
          // GstValue : this.state.GstValueRef
        })
      
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
                                                   url : info.fld_url
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
      
                                              // console.log(cart_info)
                                              var newCart = cart_info != null ? cart_info : []
      
                                              if(cart_info != null){
      
                                            
                                                var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Accessories')
      
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
                                                  this.getUpdatedCart()
                                                  
      
                                                }
                                              }
      
                                             }
      
      }

      AddToCartCovid(info){
      
        this.setState({
          SelectedCouponData : [],
          // GstValue : this.state.GstValueRef
        })
      
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
                                                   url : info.fld_url
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
      
                                              // console.log(cart_info)
                                              var newCart = cart_info != null ? cart_info : []
      
                                              if(cart_info != null){
      
                                            
                                                var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Covid')
      
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
                                                  this.getUpdatedCart()
                                                  
      
                                                }
                                              }
      
                                             }
      
      }


      RemoveFromCartFood(info){

  
        this.setState({
          SelectedCouponData : [],
          // GstValue : this.state.GstValueRef
        })


        var log = localStorage.getItem('CustomerLoginDetails')
                                                var login = JSON.parse(log)
                                        

                                                if (login != null && login != "") {
                                        
                                                if(info.fld_quantity - 1 == 0)
                                                {
                                        
                                                    Notiflix.Loading.Dots('');
                                                                                        
                                                    PostApiCall.postRequest({
                                            
                                                        cart_id : info.fld_cartid,
                                                       
                                                    
                                                    },"DeleteItemShoppingCart").then((results) => 
                                                    
                                                      // const objs = JSON.parse(result._bodyText)
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
                                                        // customer_id : 13,
                                                        variant_id : info.fld_id,
                                                        product_category : 'Food',
                                                        quantity :1,
                                                       updated_on : moment().format('lll'),
                                                       updated_by : login.fld_userid
                                                    // updated_by :13
                                                    
                                                    },"DeductShoppingCart").then((results) => 
                                                    
                                                      // const objs = JSON.parse(result._bodyText)
                                                      results.json().then(obj => {
                                           
                                                    
                                                      if(results.status == 200 || results.status==201){
                                        
                                                        // Notiflix.Loading.Remove()
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

                                                // console.log(cart_info)
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

                                                    // console.log(item)
                                                    if(item1[0] != undefined){
                  
                                                      var newIndex1 = newCart.indexOf(item1[0])
                  
                                                      newCart[newIndex1].fld_quantity =  newCart[newIndex1].fld_quantity - 1
                  
                                                    //   console.log(newCart)
                  
                                                      localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                      this.props.setcartitemcount(newCart.length)
                                                      this.props.setcartamount(newCart.reduce(function (result, item) {
                                                        return result + (item.fld_amount*item.fld_quantity);
                                                      }, 0))
                                                      this.getUpdatedCart()
                                                    //   Notiflix.Notify.Info("Product added to Cart.");

                                                    }
                                                }
                                        
                                            }
                                                 
      }

      RemoveFromCartFootwear(info){

        this.setState({
          SelectedCouponData : [],
          // GstValue : this.state.GstValueRef
        })

        var log = localStorage.getItem('CustomerLoginDetails')
                                                var login = JSON.parse(log)
                                        

                                                if (login != null && login != "") {
                                        
                                                if(info.fld_quantity - 1 == 0)
                                                {
                                        
                                                    Notiflix.Loading.Dots('');
                                                                                        
                                                    PostApiCall.postRequest({
                                            
                                                        cart_id : info.fld_cartid,
                                                       
                                                    
                                                    },"DeleteItemShoppingCart").then((results) => 
                                                    
                                                      // const objs = JSON.parse(result._bodyText)
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
                                                        // customer_id : 13,
                                                        variant_id : info.fld_id,
                                                        product_category : 'Footwear',
                                                        quantity :1,
                                                       updated_on : moment().format('lll'),
                                                       updated_by : login.fld_userid
                                                    // updated_by :13
                                                    
                                                    },"DeductShoppingCart").then((results) => 
                                                    
                                                      // const objs = JSON.parse(result._bodyText)
                                                      results.json().then(obj => {
                                           
                                                    
                                                      if(results.status == 200 || results.status==201){
                                        
                                                        // Notiflix.Loading.Remove()
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

                                                // console.log(cart_info)
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

                                                    // console.log(item)
                                                    if(item1[0] != undefined){
                  
                                                      var newIndex1 = newCart.indexOf(item1[0])
                  
                                                      newCart[newIndex1].fld_quantity =  newCart[newIndex1].fld_quantity - 1
                  
                                                    //   console.log(newCart)
                  
                                                      localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                      this.props.setcartitemcount(newCart.length)
                                                      this.props.setcartamount(newCart.reduce(function (result, item) {
                                                        return result + (item.fld_amount*item.fld_quantity);
                                                      }, 0))
                                                      this.getUpdatedCart()
                                                    //   Notiflix.Notify.Info("Product added to Cart.");

                                                    }
                                                }
                                        
                                            }
                                                 
      }


      RemoveFromCartSocks(info){

        this.setState({
          SelectedCouponData : [],
          // GstValue : this.state.GstValueRef
        })
       
        var log = localStorage.getItem('CustomerLoginDetails')
                                                var login = JSON.parse(log)
                                        

                                                if (login != null && login != "") {
                                        
                                                if(info.fld_quantity - 1 == 0)
                                                {
                                        
                                                    Notiflix.Loading.Dots('');
                                                                                        
                                                    PostApiCall.postRequest({
                                            
                                                        cart_id : info.fld_cartid,
                                                       
                                                    
                                                    },"DeleteItemShoppingCart").then((results) => 
                                                    
                                                      // const objs = JSON.parse(result._bodyText)
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
                                                        // customer_id : 13,
                                                        variant_id : info.fld_id,
                                                        product_category : 'Socks',
                                                        quantity :1,
                                                       updated_on : moment().format('lll'),
                                                       updated_by : login.fld_userid
                                                    // updated_by :13
                                                    
                                                    },"DeductShoppingCart").then((results) => 
                                                    
                                                      // const objs = JSON.parse(result._bodyText)
                                                      results.json().then(obj => {
                                           
                                                    
                                                      if(results.status == 200 || results.status==201){
                                        
                                                        // Notiflix.Loading.Remove()
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

                                                // console.log(cart_info)
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

                                                    // console.log(item)
                                                    if(item1[0] != undefined){
                  
                                                      var newIndex1 = newCart.indexOf(item1[0])
                  
                                                      newCart[newIndex1].fld_quantity =  newCart[newIndex1].fld_quantity - 1
                  
                                                    //   console.log(newCart)
                  
                                                      localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                      this.props.setcartitemcount(newCart.length)
                                                      this.props.setcartamount(newCart.reduce(function (result, item) {
                                                        return result + (item.fld_amount*item.fld_quantity);
                                                      }, 0))
                                                      this.getUpdatedCart()
                                                    //   Notiflix.Notify.Info("Product added to Cart.");

                                                    }
                                                }
                                        
                                            }
                                                 
      }


      RemoveFromCartAccessories(info){

        this.setState({
          SelectedCouponData : [],
          // GstValue : this.state.GstValueRef
        })
       
        var log = localStorage.getItem('CustomerLoginDetails')
                                                var login = JSON.parse(log)
                                        

                                                if (login != null && login != "") {
                                        
                                                if(info.fld_quantity - 1 == 0)
                                                {
                                        
                                                    Notiflix.Loading.Dots('');
                                                                                        
                                                    PostApiCall.postRequest({
                                            
                                                        cart_id : info.fld_cartid,
                                                       
                                                    
                                                    },"DeleteItemShoppingCart").then((results) => 
                                                    
                                                      // const objs = JSON.parse(result._bodyText)
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
                                                        // customer_id : 13,
                                                        variant_id : info.fld_id,
                                                        product_category : 'Accessories',
                                                        quantity :1,
                                                       updated_on : moment().format('lll'),
                                                       updated_by : login.fld_userid
                                                    // updated_by :13
                                                    
                                                    },"DeductShoppingCart").then((results) => 
                                                    
                                                      // const objs = JSON.parse(result._bodyText)
                                                      results.json().then(obj => {
                                           
                                                    
                                                      if(results.status == 200 || results.status==201){
                                        
                                                        // Notiflix.Loading.Remove()
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

                                                // console.log(cart_info)
                                                var newCart = cart_info != null ? cart_info : []
                                        
                                                if(info.fld_quantity - 1 == 0)
                                                {
                                        
                                                    var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Accessories')

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
                                                    var item1 = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Accessories')

                                                    // console.log(item)
                                                    if(item1[0] != undefined){
                  
                                                      var newIndex1 = newCart.indexOf(item1[0])
                  
                                                      newCart[newIndex1].fld_quantity =  newCart[newIndex1].fld_quantity - 1
                  
                                                    //   console.log(newCart)
                  
                                                      localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                      this.props.setcartitemcount(newCart.length)
                                                      this.props.setcartamount(newCart.reduce(function (result, item) {
                                                        return result + (item.fld_amount*item.fld_quantity);
                                                      }, 0))
                                                      this.getUpdatedCart()
                                                    //   Notiflix.Notify.Info("Product added to Cart.");

                                                    }
                                                }
                                        
                                            }
                                                 
      }

      RemoveFromCartCovid(info){

        this.setState({
          SelectedCouponData : [],
          // GstValue : this.state.GstValueRef
        })
       
        var log = localStorage.getItem('CustomerLoginDetails')
                                                var login = JSON.parse(log)
                                        

                                                if (login != null && login != "") {
                                        
                                                if(info.fld_quantity - 1 == 0)
                                                {
                                        
                                                    Notiflix.Loading.Dots('');
                                                                                        
                                                    PostApiCall.postRequest({
                                            
                                                        cart_id : info.fld_cartid,
                                                       
                                                    
                                                    },"DeleteItemShoppingCart").then((results) => 
                                                    
                                                      // const objs = JSON.parse(result._bodyText)
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
                                                        // customer_id : 13,
                                                        variant_id : info.fld_id,
                                                        product_category : 'Covid',
                                                        quantity :1,
                                                       updated_on : moment().format('lll'),
                                                       updated_by : login.fld_userid
                                                    // updated_by :13
                                                    
                                                    },"DeductShoppingCart").then((results) => 
                                                    
                                                      // const objs = JSON.parse(result._bodyText)
                                                      results.json().then(obj => {
                                           
                                                    
                                                      if(results.status == 200 || results.status==201){
                                        
                                                        // Notiflix.Loading.Remove()
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

                                                // console.log(cart_info)
                                                var newCart = cart_info != null ? cart_info : []
                                        
                                                if(info.fld_quantity - 1 == 0)
                                                {
                                        
                                                    var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Covid')

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
                                                    var item1 = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Covid')

                                                    // console.log(item)
                                                    if(item1[0] != undefined){
                  
                                                      var newIndex1 = newCart.indexOf(item1[0])
                  
                                                      newCart[newIndex1].fld_quantity =  newCart[newIndex1].fld_quantity - 1
                  
                                                    //   console.log(newCart)
                  
                                                      localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                      this.props.setcartitemcount(newCart.length)
                                                      this.props.setcartamount(newCart.reduce(function (result, item) {
                                                        return result + (item.fld_amount*item.fld_quantity);
                                                      }, 0))
                                                      this.getUpdatedCart()
                                                    //   Notiflix.Notify.Info("Product added to Cart.");

                                                    }
                                                }
                                        
                                            }
                                                 
      }

      DeleteFromCartFood(info){

        this.setState({
          SelectedCouponData : [],
          // GstValue : this.state.GstValueRef
        })

        var log = localStorage.getItem(
            "CustomerLoginDetails"
          );
          var login = JSON.parse(log);

          if (login != null && login != "") {


            Notiflix.Loading.Dots('');
                                    
            PostApiCall.postRequest({
    
                cart_id : info.fld_cartid,
               
            
            },"DeleteItemShoppingCart").then((results) => 
            
              // const objs = JSON.parse(result._bodyText)
              results.json().then(obj => {
    
            
              if(results.status == 200 || results.status==201){
    
                
                // window.location.reload()
                // this.getUpdatedCart()
                // console.log(obj.data)
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

                                            // console.log(cart_info)
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
                                                    // Notiflix.Notify.Failure('Product removed from cart.')

                                                }

                                            }
                                       
      }
    }

    DeleteFromCartFootwear(info){

      this.setState({
        SelectedCouponData : [],
        // GstValue : this.state.GstValueRef
      })

        var log = localStorage.getItem(
            "CustomerLoginDetails"
          );
          var login = JSON.parse(log);

          if (login != null && login != "") {


            Notiflix.Loading.Dots('');
                                    
            PostApiCall.postRequest({
    
                cart_id : info.fld_cartid,
               
            
            },"DeleteItemShoppingCart").then((results) => 
            
              // const objs = JSON.parse(result._bodyText)
              results.json().then(obj => {
    
            
              if(results.status == 200 || results.status==201){
    
                
                // window.location.reload()
                // this.getUpdatedCart()
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

                                            // console.log(cart_info)
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
                                                    // Notiflix.Notify.Failure('Product removed from cart.')

                                                }

                                            }
                                       
      }
    }

    DeleteFromCartSocks(info){

      this.setState({
        SelectedCouponData : [],
        // GstValue : this.state.GstValueRef
      })

        var log = localStorage.getItem(
            "CustomerLoginDetails"
          );
          var login = JSON.parse(log);

          if (login != null && login != "") {


            Notiflix.Loading.Dots('');
                                    
            PostApiCall.postRequest({
    
                cart_id : info.fld_cartid,
               
            
            },"DeleteItemShoppingCart").then((results) => 
            
              // const objs = JSON.parse(result._bodyText)
              results.json().then(obj => {
    
            
              if(results.status == 200 || results.status==201){
    
                
                // window.location.reload()
                // this.getUpdatedCart()
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

                                            // console.log(cart_info)
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
                                                    // Notiflix.Notify.Failure('Product removed from cart.')

                                                }

                                            }
                                       
      }
    }

    DeleteFromCartAccessories(info){

      this.setState({
        SelectedCouponData : [],
        // GstValue : this.state.GstValueRef
      })

        var log = localStorage.getItem(
            "CustomerLoginDetails"
          );
          var login = JSON.parse(log);

          if (login != null && login != "") {


            Notiflix.Loading.Dots('');
                                    
            PostApiCall.postRequest({
    
                cart_id : info.fld_cartid,
               
            
            },"DeleteItemShoppingCart").then((results) => 
            
              // const objs = JSON.parse(result._bodyText)
              results.json().then(obj => {
    
            
              if(results.status == 200 || results.status==201){
    
                
                // window.location.reload()
                // this.getUpdatedCart()
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

                                            // console.log(cart_info)
                                            var newCart = cart_info != null ? cart_info : []
                                    
                                            if(info.fld_quantity - 1 == 0)
                                            {
                                    
                                                var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Accessories')

                                                if(item[0] != undefined){

                                                    var newIndex = newCart.indexOf(item[0])

                                                    newCart.splice(newIndex,1)
                                                    localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                    this.props.setcartitemcount(newCart.length)
                                                    this.props.setcartamount(newCart.reduce(function (result, item) {
                                                        return result + (item.fld_amount*item.fld_quantity);
                                                      }, 0))
                                                    this.getUpdatedCart()
                                                    // Notiflix.Notify.Failure('Product removed from cart.')

                                                }

                                            }
                                       
      }
    }

    DeleteFromCartCovid(info){

      this.setState({
        SelectedCouponData : [],
        // GstValue : this.state.GstValueRef
      })

        var log = localStorage.getItem(
            "CustomerLoginDetails"
          );
          var login = JSON.parse(log);

          if (login != null && login != "") {


            Notiflix.Loading.Dots('');
                                    
            PostApiCall.postRequest({
    
                cart_id : info.fld_cartid,
               
            
            },"DeleteItemShoppingCart").then((results) => 
            
              // const objs = JSON.parse(result._bodyText)
              results.json().then(obj => {
    
            
              if(results.status == 200 || results.status==201){
    
                
                // window.location.reload()
                // this.getUpdatedCart()
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

                                            // console.log(cart_info)
                                            var newCart = cart_info != null ? cart_info : []
                                    
                                            if(info.fld_quantity - 1 == 0)
                                            {
                                    
                                                var item = newCart.filter(val => val.fld_variantid == info.fld_variantid && val.fld_productcategory == 'Covid')

                                                if(item[0] != undefined){

                                                    var newIndex = newCart.indexOf(item[0])

                                                    newCart.splice(newIndex,1)
                                                    localStorage.setItem('BMSCartData',JSON.stringify(newCart))
                                                    this.props.setcartitemcount(newCart.length)
                                                    this.props.setcartamount(newCart.reduce(function (result, item) {
                                                        return result + (item.fld_amount*item.fld_quantity);
                                                      }, 0))
                                                    this.getUpdatedCart()
                                                    // Notiflix.Notify.Failure('Product removed from cart.')

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
            
              // const objs = JSON.parse(result._bodyText)
              results.json().then(obj => {
   
            
              if(results.status == 200 || results.status==201){

                // Notiflix.Loading.Remove()
                // Notiflix.Notify.Info('.')
                // window.location.reload()
                window.location.href = '/'
                // this.getUpdatedCart()
   
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