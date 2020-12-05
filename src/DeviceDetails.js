import React from 'react';
import Menu from './Header'
import Footer from './Footer'
import Parser from 'html-react-parser';

import PostApiCall from "./Api";
import Notiflix from "notiflix-react";

import GetApiCall from './GetApi'
import moment from 'moment'

import ReactImageMagnify from 'react-image-magnify';

class DeviceDetails extends React.Component
{

    constructor(props){
        super(props)
        this.state={
            Device : [],
            Photo : [],
            quantity : 1,
            selectedBook : '',
        }
    }
    componentDidMount(){

     
    PostApiCall.postRequest({

        device_id : this.props.match.params.deviceid.split('-')[0]
              
     },"GetDeviceDetailsWebsite").then((results) => 
     
       results.json().then(obj => {
        
       if(results.status == 200 || results.status == 201){

         this.setState({
             Device : obj.data[0],
            
         })
         if(obj.data[0].Photo != null && obj.data[0].Photo != ''){
             this.setState({
              
                 Photo : obj.data[0].Photo.split(',')
             })  
         }
       }

     }))

    }


    AddToCart(){
        // console.log(this.state.Book)

        var log = localStorage.getItem('CustomerLogin')
        var login = JSON.parse(log)


        if(login != null && login != ''){

            PostApiCall.postRequest({
    
                customer_id : login.fld_userid,
                // customer_id : 13,
                product_id : this.state.Device.fld_deviceid,
                product_category : 'Device',
                value : this.state.Device.fld_discountprice,
                number_of_items :this.state.quantity,
               updated_on : moment().format('lll').toString(),
               updated_by : login.fld_userid
            // updated_by :13
            
            },"AddShoppingCart").then((results) => 
            
              // const objs = JSON.parse(result._bodyText)
              results.json().then(obj => {
   
            
              if(results.status == 200 || results.status==201){

                Notiflix.Notify.Info('Product Added to Cart')
                window.location.reload()
   
              }else{
                Notiflix.Notify.Failure(obj.data) 
              }
   
           }))

        }else{
        // console.log('please login first')
            Notiflix.Notify.Failure('Please Login to add Products to your cart.')
        }

        

      
    }

    render()
    {
        return (
            <div>
                <Menu></Menu>
                  <div class="container">
                <div class="container-box product-section">
                    <div class="row">
                        <div class="col-lg-9">
                            <div class="product-single-container product-single-default">
                                <div class="row">
                                <div class="col-lg-1 col-md-1">
                                <div class="image-list">
                                                        {this.state.Photo.map(
                                                  (book,index) => (
                                                            <img src={book} onMouseOver={()=>{
                                                                this.setState({
                                                                    selectedBook : book
                                                                })
                                                            }}></img>
                                                            // <img src=" http://backoffice.beatmysugar.com/Images/Books/Books-DB352.png"></img>
                                                            // <img src=" http://backoffice.beatmysugar.com/Images/Books/Books-DB352.png"></img>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-5 col-md-5 product-single-gallery">
                                        <div class="product-slider-container product-item" >
                                          
                                        <div class="product-item product-single-image">
                                                   
                                        <ReactImageMagnify {...{
                                                        smallImage: {
                                                            alt: 'Wristwatch by Ted Baker London',
                                                            isFluidWidth: true,
                                                            src: this.state.selectedBook == '' ? this.state.Photo[0] : this.state.selectedBook,
                                                        },
                                                        largeImage: {
                                                            src: this.state.selectedBook == '' ? this.state.Photo[0] : this.state.selectedBook,
                                                            width: 1200,
                                                            height: 1800
                                                        },
                                                        lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                                                        isHintEnabled: true,
                                                        shouldHideHintAfterFirstActivation: false,
                                                        enlargedImageContainerDimensions: {
                                                            width: '192%',
                                                            height: '100%'
                                                        }
                                                    }} /> 
                                                    </div>
                                                    </div>
                                    </div>
                                    {/* <div class="col-lg-7 col-md-6 product-single-gallery">
                                        <div class="product-slider-container product-item">
                                            <div class="product-single-carousel owl-carousel owl-theme">
                                                <div class="product-item">
                                                    <img class="product-single-image" src="assets/images/accu-check.jpg" data-zoom-image="assets/images/accu-check.jpg"/>
                                                </div>
                                                <div class="product-item">
                                                    <img class="product-single-image" src="assets/images/accu-check-2.jpg" data-zoom-image="assets/images/accu-check-2.jpg"/>
                                                </div>
                                                <div class="product-item">
                                                        <img class="product-single-image" src="assets/images/accu-check.jpg" data-zoom-image="assets/images/accu-check.jpg"/>
                                                    </div>
                                                    <div class="product-item">
                                                        <img class="product-single-image" src="assets/images/accu-check-2.jpg" data-zoom-image="assets/images/accu-check-2.jpg"/>
                                                    </div>
                                              
                                            </div>
                                          
                                            <span class="prod-full-screen">
                                                <i class="icon-plus"></i>
                                            </span>
                                        </div>
                                        <div class="prod-thumbnail row owl-dots" id='carousel-custom-dots'>
                                            <div class="col-3 owl-dot">
                                                <img src="assets/images/accu-check.jpg"/>
                                            </div>
                                            <div class="col-3 owl-dot">
                                                <img src="assets/images/accu-check-2.jpg"/>
                                            </div>
                                            <div class="col-3 owl-dot">
                                                    <img src="assets/images/accu-check.jpg"/>
                                                </div>
                                                <div class="col-3 owl-dot">
                                                    <img src="assets/images/accu-check-2.jpg"/>
                                                </div>
                                           
                                        </div>
                                    </div> */}

                                    <div class="col-lg-5 col-md-6">
                                        <div class="product-single-details">
                                                
                                            <h1 class="product-title">{this.state.Device.fld_itemname}
</h1>
                                                
                                            <div class="ratings-container">
                                              
                                            
                                            <a href="#" class="rating-link">By <span class="company-name">{this.state.Device.fld_brand}</span></a>
                                                {/* <a href="#" class="rating-link">By <span class="company-name">{this.state.Device.fld_brand}</span></a> */}
                                               
                                            </div>

                                            <div class="price-box">
                                                
                                                <span class="product-price">&#8377;{this.state.Device.fld_discountprice}</span>
                                                <span class="old-price"><strike>&#8377;{this.state.Device.fld_productprice}</strike> ({this.state.Device.fld_discountpercent}% Discount)</span>
                                            </div>
                                            <p class="discount-price">You Save &#8377;{parseFloat(this.state.Device.fld_productprice - this.state.Device.fld_discountprice).toFixed(2)}</p>
                                            <p class="tax">Inclusive of All Taxes</p>
                                            <div class="product-desc">
                                            <p><b>Know your Product</b></p>
                                                <p> {Parser(('<p>'+this.state.Device.fld_knowyourproduct+'</p>').replace(/font-family/g, '').replace(/color/g, ''))}</p>
                                            </div><br/>

                                            <div class="product-desc">
                                                    <p><b>Product Information</b></p>
                                                    <p> {Parser(('<p>'+this.state.Device.fld_description+'</p>').replace(/font-family/g, '').replace(/color/g, ''))}
</p>
                                                </div>

                                                <ul class="product-list">
                                                <li class="stock" style={{display : this.state.Device.fld_availability == 'Instock' ? '' : 'none' }}> In Stock <span style={{color : '#bdbdbd'}}>|</span></li>
                                                    <li class="return" style={{display : this.state.Device.fld_returnable == 'No' ? '' : 'none' }} >
                                                            <i class="fas fa-times-circle"></i> Not Returnable
                                                    </li>
                                                    <li class="return" style={{display : this.state.Device.fld_availability == 'Outofstock' ? '' : 'none' }} >
                                                            <i class="fas fa-times-circle"></i> Out Of Stock <span style={{color : '#bdbdbd'}}>|</span>
                                                    </li>
                                                    <li class="return" style={{display : this.state.Device.fld_availability == 'Banned' ? 'none' : 'none' }}>
                                                             Banned
                                                    </li>
                                                    <li class="return" style={{display : this.state.Device.fld_availability == 'Discontinued' ? 'none' : 'none' }} >
                                                             Discontinued
                                                    </li>
                                                    <li class="returnable" style={{display : this.state.Device.fld_returnable == 'Yes' ? '' : 'none' }} >
                                                             Returnable
                                                    </li>
                                                </ul>
                                          
                                                <div class="product-action product-all-icons">
                                            <div class="product-single-qty">
                                                <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                                    <span class="input-group-btn input-group-prepend">
                                                        <button class="btn btn-outline btn-down-icon bootstrap-touchspin-down" type="button" 
                                                        onClick={()=>{
                                                            if(this.state.quantity > 1){
                                                                this.setState({
                                                                    quantity : this.state.quantity - 1
                                                                })
                                                            }
                                                            
                                                        }}></button>
                                                        </span>
                                                        <input class="quantity-box" type="text" value={this.state.quantity}/>
                                                            <span class="input-group-btn input-group-append">
                                                                <button class="btn btn-outline btn-up-icon bootstrap-touchspin-up" type="button"
                                                                  onClick={()=>{
                                                                    this.setState({
                                                                        quantity : this.state.quantity + 1
                                                                    })
                                                                }}
                                                                ></button>
                                                                </span>
                                                                </div>
                                                                </div>

                                                <a class="paction add-cart" title="Add to Cart"
                                                style={{display : this.state.Device.fld_availability == 'Outofstock' ||  this.state.Device.fld_availability == 'Banned' ||
                                                this.state.Device.fld_availability == 'Discontinued' ? 'none' : ''}}
                                                onClick={this.AddToCart.bind(this)}
                                                
                                                >
                                                    <span>Add to Cart</span>
                                                </a>
                                                <a href="#" class="paction add-wishlist" title="Add to Wishlist">
                                                    <span>Add to Wishlist</span>
                                                </a>
                                                {/* <a href="#" class="paction add-compare" title="Add to Compare">
                                                    <span>Add to Compare</span>
                                                </a> */}
                                            </div>

                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                         
                        </div>

                        <div class="sidebar-overlay"></div>
                        <div class="sidebar-toggle"><i class="icon-sliders"></i></div>
                        <aside class="sidebar-product col-lg-3 padding-left-lg mobile-sidebar">
                            <div class="sidebar-wrapper">
                               

                                <div class="widget widget-info">
                                    <ul>
                                        <li>
                                            <i class="icon-shipping"></i>
                                            <h4>FREE<br/>SHIPPING</h4>
                                        </li>
                                        <li>
                                            <i class="icon-us-dollar"></i>
                                            <h4>100% MONEY<br/>BACK GUARANTEE</h4>
                                        </li>
                                        <li>
                                            <i class="icon-online-support"></i>
                                            <h4>ONLINE<br/>SUPPORT 24/7</h4>
                                        </li>
                                    </ul>
                                </div>

                                <div class="widget widget-banner">
                                    <div class="banner banner-image">
                                        <a href="#">
                                            <img src="/assets/images/banners/banner-sidebar.jpg" alt="Banner Desc"/>
                                        </a>
                                    </div>
                                </div>

                           
                            </div>
                        </aside>
                    </div>

                </div>
            </div>
            <Footer></Footer>
            </div>
        );
    }
}

export default DeviceDetails;