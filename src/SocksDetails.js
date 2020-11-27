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

class SocksDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SocksMaster: [],
      SocksVariants : [],

      SelectedVariant : [],

      selectedFootImg : '',


      SelectedColor : '',
      SelectedSize : '',


      SizeData :[],
      ColorData : [],



      RelatedProducts : [],

      quantity : 1,
      done : false,

      bannerfood:[],
      SideBannerFood : []
    };
  }


   componentDidMount() {

    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    });


    Notiflix.Loading.Dots("");


    PostApiCall.postRequest(
      {
        verticle : 'Socks',
        type:'Detail Page'
      }
      ,"Get_AdBannerWebsite").then(resultdes =>
      resultdes.json().then(obj => {

        // console.log(obj.data)
        // if(obj.data){
        //   obj.data.map(singledata=>{
        //     images.push({src:singledata.fld_image,
        //       url:singledata.fld_url})
        //   })
        // }
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
            verticle : 'Socks',
            type:'Detail Page Side Banner'
          }
          ,"Get_AdBannerWebsite").then(resultdes =>
          resultdes.json().then(obj => {
          
            // if(obj.data){
            //   obj.data.map(singledata=>{
            //    images1.push( singledata.fld_image)
            //   })
            // }
            if(obj.data.length > 0)
            {
              this.setState({
                SideBannerFood:[obj.data[0]]
                // images1:images1
              }) 
            }
            }))



    PostApiCall.postRequest(
      {
        id: this.props.match.params.socksid,
      },
      "GetSocksMasterDetailsWebsite"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {
     
          this.setState({
            SocksMaster: obj.data[0],
          });

  

  PostApiCall.postRequest(
      {
        gender : obj.data[0].fld_gender,
        id : this.props.match.params.varid
      },
      "GetSocksGenderListingWebsite"
    ).then((results1) =>
      results1.json().then((obj1) => {
        if (results1.status == 200 || results1.status == 201) {
     
          this.setState({
            RelatedProducts: obj1.data,
          });

          

        }
      })
    );
        }
      })
    );

    PostApiCall.postRequest(
      {
        id: this.props.match.params.socksid,
      },
      "GetSocksVariantDetailsWebsite"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {

          // console.log(obj.data)

          this.setState({
            SocksVariants: obj.data,
            done : true
          });
          Notiflix.Loading.Remove();

          for(var i =0 ;i<Object.keys(obj.data).length;i++){

            if(obj.data[i].fld_id == this.props.match.params.varid){

          
              this.setState({
                SelectedVariant : obj.data[i],
                SelectedColor : obj.data[i].fld_color,
                SelectedSize : obj.data[i].fld_size
              })

            }

          }


          var size = []
          for(var i =0 ;i<Object.keys(obj.data).length;i++){


            size.push(obj.data[i].fld_size)
          
              this.setState({
                SizeData : Array.from(new Set(size))
              })

          }


          var color = []
          for(var i =0 ;i<Object.keys(obj.data).length;i++){

            color.push( obj.data[i].fld_color)
          
              // this.setState({
              //   ColorData : Array.from(new Set(color))
              // })

          }

          color = Array.from(new Set(color))

          var colorfootwear = []

          for(var i =0 ;i<color.length;i++){

            for(var j =0 ;j<Object.keys(obj.data).length;j++){

              if((obj.data[j].fld_color == color[i])){
                if(this.search(color[i], colorfootwear)){

                }
                else 
                // if(obj.data[j].fld_id != this.props.match.params.varid)
                {
                  colorfootwear.push({
                    color : color[i],
                    imgurl : obj.data[j].Photos.split('#')[0]
                  })

                  this.setState({
                    ColorData : colorfootwear
                  })
                }
              }

            }

          }
          


        
        }
      })
    );
  }


  search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].color === nameKey) {
            return myArray[i];
        }
    }
}


truncate(source, size) {
  // console.log(source)
  if (source != null) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
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
        product_category: "Socks",
        quantity: this.state.quantity,
        updated_on: moment().format("lll"),
        updated_by: login.fld_userid,
        amount : this.state.SelectedVariant.fld_discountprice,
        url : `/socks${
          this.props.match.params.socksid +
          "/" +
          this.props.match.params.varid +
          "/" +
          this.props.match.params.socksname
          
        }`
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

        
            var item = newCart.filter(val => val.fld_variantid == this.state.SelectedVariant.fld_id && val.fld_productcategory == 'Socks')

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
                fld_variantid : this.state.SelectedVariant.fld_id,
                fld_productcategory : 'Socks',
                fld_quantity : this.state.quantity,
                fld_amount : this.state.SelectedVariant.fld_discountprice,
                fld_addedon : moment().format('lll'),
                fld_url :`/socks${
                  this.props.match.params.socksid +
                  "/" +
                  this.props.match.params.varid +
                  "/" +
                  this.props.match.params.socksname
                  
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
              fld_productcategory : 'Socks',
              fld_quantity : this.state.quantity,
              fld_amount : this.state.SelectedVariant.fld_discountprice,
              fld_addedon : moment().format('lll')

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
            arrows: true,
            centerMode: false,
            centerPadding: '40px',
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
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


      
        {JSON.stringify(this.state.SelectedVariant) == '[]' && this.state.done ? (
                
                <div class="col-md-12">
                  <img src="/assets/images/No-product-Found.png" style={{    margin: 'auto'}}/>
                </div>
           
            ) : (
              <div class="col-md-12">
                {/* <h2 class="light-title section-title" style={{marginBottom: "20px"}}>{this.state.CategorySelected} </h2> */}
              </div>
            )}


        <div class="container" style={{display : this.state.done & JSON.stringify(this.state.SelectedVariant) != '[]' ? '' : 'none'}}>
          <div class="container-box " style={{ marginTop: "40px" }}>
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

                        {/* {this.state.Photo.map(
                                                  (book,index) => (

                                                    
                                                <div class="product-item">
                                                    <img class="product-single-image" src={book} onMouseOver={()=>{
                                                        console.log(book)
                                                    }}/>
                                                </div>
                                                  ))} */}
                        {/* <div class="product-item">
                                                    <img class="product-single-image" src="assets/images/cauliflowerbook.jpg" data-zoom-image="assets/images/cauliflowerbook.jpg"/>
                                                </div>
                                                <div class="product-item">
                                                        <img class="product-single-image" src="assets/images/cauliflowerbook.jpg" data-zoom-image="assets/images/cauliflowerbook.jpg"/>
                                                    </div>
                                                    <div class="product-item">
                                                        <img class="product-single-image" src="assets/images/cauliflowerbook.jpg" data-zoom-image="assets/images/cauliflowerbook.jpg"/>
                                                    </div> */}

                        {/* </div>
                                           
                                            <span class="prod-full-screen">
                                                <i class="icon-plus"></i>
                                            </span>
                                        </div>
                                        <div class="prod-thumbnail row owl-dots" id='carousel-custom-dots'>
                                        {this.state.Photo.map(
                                                  (book,index) => (

                                            <div class="col-3 owl-dot">
                                                <img src={book}/>
                                            </div>
                                                  ))} */}
                        {/* <div class="col-3 owl-dot">
                                                <img src="assets/images/cauliflowerbook.jpg"/>
                                            </div>
                                            <div class="col-3 owl-dot">
                                                    <img src="assets/images/cauliflowerbook.jpg"/>
                                                </div>
                                                <div class="col-3 owl-dot">
                                                    <img src="assets/images/cauliflowerbook.jpg"/>
                                                </div> */}
                      </div>
                    </div>
                    {/* <div class="col-lg-7 col-md-6 product-single-gallery">
                                        <div class="product-slider-container product-item">
                                            <div class="product-single-carousel owl-carousel owl-theme">
                                                <div class="product-item">
                                                    <img class="product-single-image" src="assets/images/dio.jpg" data-zoom-image="assets/images/dio.jpg"/>
                                                </div>
                                                <div class="product-item">
                                                    <img class="product-single-image" src="assets/images/dio-1.jpg" data-zoom-image="assets/images/dio-1.jpg"/>
                                                </div>
                                                <div class="product-item">
                                                        <img class="product-single-image" src="assets/images/dio.jpg" data-zoom-image="assets/images/dio.jpg"/>
                                                    </div>
                                                    <div class="product-item">
                                                        <img class="product-single-image" src="assets/images/dio-1.jpg" data-zoom-image="assets/images/dio-1.jpg"/>
                                                    </div>
                                              
                                            </div>
                                           
                                            <span class="prod-full-screen">
                                                <i class="icon-plus"></i>
                                            </span>
                                        </div>
                                        <div class="prod-thumbnail row owl-dots" id='carousel-custom-dots'>
                                            <div class="col-3 owl-dot">
                                                <img src="assets/images/dio.jpg"/>
                                            </div>
                                            <div class="col-3 owl-dot">
                                                <img src="assets/images/dio-1.jpg"/>
                                            </div>
                                            <div class="col-3 owl-dot">
                                                    <img src="assets/images/dio.jpg"/>
                                                </div>
                                                <div class="col-3 owl-dot">
                                                    <img src="assets/images/dio-1.jpg"/>
                                                </div>
                                           
                                        </div>
                                    </div> */}

<div class="col-lg-5 col-md-6">
                      <div class="product-single-details">
                        {/* <p class="item-code">{this.state.Foot.fld_itemcode}</p> */}
                                  <h1 class="product-title">{this.state.SelectedVariant.fld_name}</h1>

                        <div class="ratings-container">
                         
                          {/* <a href="#" class="rating-link">
                                  <span class="company-name">{this.state.SelectedVariant.fld_sku}</span>
                          </a> */}
                          <p class="rating-link">
                                  Brand <span class="company-name">{this.state.SocksMaster.fld_brand}</span>
                          </p>
                          <p class="rating-link">
                            Sold By <span class="company-name">{this.state.SocksMaster.fld_company}</span>
                          </p>
                          <p class="rating-link">
                          Country Of Origin  <span class="company-name">{this.state.SocksMaster.fld_countryoforigin}</span>
                          </p>
                        </div>

                          {this.state.SelectedVariant.fld_discountpercent == 0 ?
                          
                          <div>
                          <div class="price-box">
                                    <span class="product-price">&#8377; {this.state.SelectedVariant.fld_discountprice}</span>
                          
                            
                          </div>
                          
                          </div>
                        :
                        <div>
                        <div class="price-box">
                                  <span class="product-price">&#8377; {this.state.SelectedVariant.fld_discountprice}</span>
                          <span class="old-price">
                            <strike>&#8377;{this.state.SelectedVariant.fld_price}</strike>
                          </span>
                          
                        </div>
                        
                        <p class="discount-price"><span class="old-price old-price-updated" style={{padding:"0px"}}>  You Save &#8377; {this.state.SelectedVariant.fld_price - this.state.SelectedVariant.fld_discountprice} ({this.state.SelectedVariant.fld_discountpercent}%)</span></p>
                        </div>
                        }
                         
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
                                this.state.SocksMaster.fld_returnable == "No"
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
                                this.state.SocksMaster.fld_returnable == "Yes"
                                  ? ""
                                  : "none",
                            }}
                          >
                            Returnable
                          </li>
                        </ul>


                      

                        {/* <div class="product-desc">
                          <p>
                            <b>Size</b>
                          </p>

                          <select class="footcare-size">
                            {this.state.GenderSelect == "Male" ? (
                              this.state.Male.map((male, index) => (
                                <option>{male}</option>
                              ))
                            ) : this.state.GenderSelect == "Select" ? (
                              <option></option>
                            ) : (
                              this.state.Female.map((female, index) => (
                                <option>{female}</option>
                              ))
                            )}
                          </select>
                          <span>
                            <a href="" class="sizechart-link">
                              Size Chart
                            </a>
                          </span>
                        </div> */}

                        <div class="size-chart-updated free-size">
                        <p>
                            <b>Sizes Available</b>
                          </p>
                        <ul>
                          {this.state.SizeData.map((dt,i)=>(
                      
                             <li>
                             <a class={dt == this.state.SelectedSize ? "size-selected" : '' }
                             onClick={()=>{
                               for(var i =0;i<this.state.SocksVariants.length;i++){

                                if(this.state.SocksVariants[i].fld_size == dt && this.state.SocksVariants[i].fld_color == this.state.SelectedColor){

                                  window.location.href = `/socks/${this.state.SocksVariants[i].fld_socksid+"/"+this.state.SocksVariants[i].fld_id+"/"+this.state.SocksVariants[i].fld_name.replace( / /g,'-').replace( /\//g,'-').replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')}`

                                }

                               }
                             }}
                             >{dt}</a>
                           </li>
                           
                          ))}
                        
                        </ul>
                        </div>

                        <div class="size-chart-updated">
                        <p>
                            <b>Colors Available</b>
                          </p>
                        <ul>
                        {this.state.ColorData.map((dt,i)=>(
                               
                             <li class={dt.color == this.state.SelectedColor ? "color-selected" : ''}
                             onClick={()=>{
                              for(var i =0;i<this.state.SocksVariants.length;i++){

                               if(this.state.SocksVariants[i].fld_size ==this.state.SelectedSize && this.state.SocksVariants[i].fld_color == dt.color){

                                 window.location.href = `/socks/${this.state.SocksVariants[i].fld_socksid+"/"+this.state.SocksVariants[i].fld_id+"/"+this.state.SocksVariants[i].fld_name.replace( / /g,'-').replace( /\//g,'-').replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')}`

                               }

                              }
                            }}
                             >
                             {/* <img src={dt.imgurl} style={{height: '50px'}} ></img> */}
                             <a style={{    width: '100%'}}>{dt.color}</a>
                             {dt.color == this.state.SelectedColor ? <div class="overlay"></div> : ''}
                           </li>
                           
                          ))}
                        
                        </ul>
                        </div>
                        <p></p>
                        {/* <div class="product-desc">
                          <p>
                            <b>Know your Product</b>
                          </p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged.
                        </div>

                        <div class="product-desc">
                          <p>
                            <b>Product Information</b>
                          </p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged.
                        </div> */}

                       

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
                              display:
                              this.state.SelectedVariant.fld_availability == "In stock"
                                  ? ""
                                  : "none",
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
                                    product_category: "Socks",
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
                 
                 <div class="col-md-12 detail-description">
                   <h4>Product Description</h4>
                   <p style={{textAlign: "justify"}}>
                   {Parser(('<p>'+this.state.SocksMaster.fld_description+'</p>').replace(/font-family/g, ''))}
</p>
                 </div>
                  
                
                  </div>
                  
                </div>
                
              </div>

              <div class="sidebar-overlay"></div>
              <div class="sidebar-toggle">
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

        <div class="container product-section">
          <h3 class="section-title" style={{display : this.state.RelatedProducts.length == 0 ? 'none' : ''}}>Related Products</h3>
          <div class="row healthcare-slider">
            <div class="col-md-12">
              <div class="row">
               
          <ul class="related-products-list">
          <Slider {...settings}>

              {this.state.RelatedProducts.map((info, index)=>(
                <li>
                  <div class="partner product-inner ">
                    <div id="overlay" style={{display : info.fld_availability =='In stock' ? 'none' : ''}}>Out Of Stock</div>

                    <img
                    src={info.Photos.split(',')[0]}
                      alt="product"
                      class="footcare-image img-center"
                      onClick={()=>{
                        window.location.href = `/socks/${info.fld_socksid+"/"+info.fld_id+"/"+info.fld_name.replace( / /g,'-').replace( /\//g,'-').replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')}`
                      }}
                    />

                    <div class="product-details">
                      <p class="product-title">
                      <a 
                        onClick={()=>{
                          window.location.href = `/socks/${info.fld_socksid+"/"+info.fld_id+"/"+info.fld_name.replace( / /g,'-').replace( /\//g,'-').replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')}`
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
      <p class="discount-price"> You Save &#8377; {info.fld_price - info.fld_discountprice} ({info.fld_discountpercent}% )</p>
    }
    </p>
                      <p class="brief-desc"></p>
                      <ul class="group-buttons">
                        <li>
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
        <div class=" container">
          <div class="container-box container-box-lg info-boxes">
                                        <div class="row">
                                          <div class="col-md-12">
                                          
                                         <p style={{textAlign:"justify",fontSize:"13px"}}><b>Disclaimer:</b> BeatMySugar team always put in their best effort towards making the vendor/service provider ensure that the product information given on the website is correct and updated. However, always read the product labels for direction for use, warnings, and precautions before using the product. It is advisable to consult your doctor or healthcare provider before using a product. <a href="https://www.beatmysugar.com/" style={{fontWeight:700,color:"#000"}}>www.BeatMySugar.com</a>, being only a facilitator and not the business operator/manufacturer/vendor/service provider, is not legally liable and does not assume any responsibility for any untoward occurrence from the use of any product available on the website. All liabilities rest with the business operator/ manufacturer/vendor/service provider.  




</p>

                                          </div>
                                         
                                        
                    
                                         
                                        
                                                 
                                        </div>
                    
                                       
                                        </div>
                                      
                                    </div>
        <Footer></Footer>
      </div>
    );
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
)(SocksDetails);
