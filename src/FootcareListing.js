/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import GetApiCall from "./GetApi";
import Notiflix from "notiflix-react";
import PostApiCall from "./Api";
import moment from "moment";


import { connect } from "react-redux";
import {
 
  setcartitemcount,
  setcartamount
} from "./Actions/actionType";

class FootcareListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Foot: [],
      FootDetails: [],
      SizeData :[],
      ColorData : [],
      BrandData : [],
      FootVariantRef : [],
      FootRef : [],

      GenderFilter : [],
      SizeFilter : [],
      ColorFilter : [],
      BrandFilter : [],


      RefTemp : [],

      BrandDataRef: [],
      TypeData : [],
      TypeFilter : [],
      PriceData : [],
      PriceFilter : [],

      GenderData : [
        {fld_gender : 'Male'},
        {fld_gender : 'Female'},
        {fld_gender : 'Unisex'},
      ],


      done : false ,
      SearchDataRef : []
    };
  }

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",

    });

    Notiflix.Loading.Dots("");

    var arr = [];

    var search = JSON.parse(localStorage.getItem('SearchText'))



    GetApiCall.getRequest("GetFootwearListing").then((results) => {
      results
        .json()
        .then((data) => ({
          data: data,
          status: results.status,
        }))
        .then((res) => {
  
 

          var srDt= []
          if(search != null){

            res.data.data.filter(item => {
              if (item.fld_name.toLowerCase().includes(search.toLowerCase())
              || item.fld_brand.toLowerCase().includes(search.toLowerCase())
        
              ) {
                srDt.push(item)
                
              }
            })
            this.setState({
  
              FootDetails: srDt,
              FootRef : res.data.data,
              SearchDataRef : srDt
              
            });
          }else
          {
            this.setState({
  
              FootDetails: res.data.data,
              FootRef : res.data.data,
              
            });
          }
          
          Notiflix.Loading.Remove(); 
         
        });


        });


        GetApiCall.getRequest("GetFootwearTypeDataWebsite").then(resultdes =>
          resultdes.json().then(obj => {
     
              this.setState({
                  
              TypeData : obj.data
            })

          }))


        GetApiCall.getRequest("GetFootwearColorDataWebsite").then(resultdes =>
          resultdes.json().then(obj => {
   
              this.setState({
                  
              ColorData : obj.data
            })

          }))

          GetApiCall.getRequest("GetFootwearBrandData").then(resultdes =>
            resultdes.json().then(obj => {
                this.setState({
                    
                BrandData : obj.data,
                BrandDataRef : obj.data
              })
  
            }))


            GetApiCall.getRequest("GetFootwearPriceDataFilter").then(resultdes =>
              resultdes.json().then(obj => {
                
                  this.setState({
                      
                  PriceData : obj.data
                })
        
              }))
        

        GetApiCall.getRequest("GetFootwearSizeDataWebsite").then(resultdes =>
          resultdes.json().then(obj => {
             

            var dt = []
            for(var i=0;i<Object.keys(obj.data).length ; i++){

              dt.push(parseInt(obj.data[i].fld_size))

            }
            dt.sort(function(a, b){return a - b})
            this.setState({
              SizeData : dt
            })
       
          }))


          GetApiCall.getRequest("GetFilterFootwearListing").then((results) => {
            results
              .json()
              .then((data) => ({
                data: data,
                status: results.status,
              }))
              .then((res) => {
        
          
                this.setState({
        
                  FootVariantRef: res.data.data,
                  done : true
                });
                Notiflix.Loading.Remove();
              });
      
           
              });
  }

  truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }



  OnSubmitBrandFilter(){
  
    var  newData = []
    var count = 0;
  
    if( this.state.BrandFilter.length > 0){
    for(var i =0 ; i < this.state.BrandFilter.length;i++){
      this.state.FootVariantRef.filter(item => {
        if (item.fld_brand.includes(this.state.BrandFilter[i])) {
          newData.push(item)
        }
      })
  
      count = count + 1
  
      if(count == this.state.BrandFilter.length){
     
        if(newData.length == 0){
  
          this.setState({
            FootDetails : newData
          })
  
          Notiflix.Loading.Remove()
  
        }else
        {
          


      

          this.OnSubmitGenderFilter(newData)
        }
       
  
      }
    
    }
  
  }
  else
  {
  var search = JSON.parse(localStorage.getItem('SearchText'))
    if(search != null){
      this.OnSubmitGenderFilter(this.state.SearchDataRef)
    }else{
      this.OnSubmitGenderFilter(this.state.FootVariantRef)
    }
  }
  }
  
  

  OnSubmitGenderFilter(Ref){
  
    var  newData = []
    var count = 0;
  
    if( this.state.GenderFilter.length > 0){
    for(var i =0 ; i < this.state.GenderFilter.length;i++){
  
      Ref.filter(item => {
        if (item.fld_gender.includes(this.state.GenderFilter[i]) || item.fld_gender.includes('Unisex')) {
          newData.push(item)
        }
      })
    
      count = count + 1
  
      if(count == this.state.GenderFilter.length){
  
        if(newData.length == 0){
  
          this.setState({
            FootDetails : newData
          })
  
          Notiflix.Loading.Remove()
  
        }else
        {
  
          this.OnSubmitSizeFilter(newData)
        }
       
  
      }
    
    }
  
  }
  else
  {
    this.OnSubmitSizeFilter(Ref)
  }
  
  }


  OnSubmitSizeFilter(Ref){
  
    var  newData = []
    var count = 0;
  
    if( this.state.SizeFilter.length > 0){
    for(var i =0 ; i < this.state.SizeFilter.length;i++){
  
      Ref.filter(item => {
        if (item.fld_size.includes(this.state.SizeFilter[i])) {
          newData.push(item)
        }
      })
    
      count = count + 1
  
      if(count == this.state.SizeFilter.length){
  
        if(newData.length == 0){
  
          this.setState({
            FootDetails : newData
          })
  
          Notiflix.Loading.Remove()
  
        }else
        {
  
          this.OnSubmitPriceFilter(newData)
        }
       
  
      }
    
    }
  
  }
  else
  {
    this.OnSubmitPriceFilter(Ref)
  }
  
  }

  OnSubmitPriceFilter(Ref){
  
    var  newData = []
    var count = 0;
  
    if( this.state.PriceFilter.length > 0){
    for(var i =0 ; i < this.state.PriceFilter.length;i++){

      Ref.filter(item => {
        if (item.fld_discountprice >= this.state.PriceFilter[i].fld_min && item.fld_discountprice <= this.state.PriceFilter[i].fld_max) {
          newData.push(item)
        }
      })
  
      
    
      count = count + 1
  
      if(count == this.state.PriceFilter.length){
  
        if(newData.length == 0){
  
          this.setState({
            FootDetails : newData
          })
  
          Notiflix.Loading.Remove()
  
        }else
        {
  
          this.OnSubmitColorFilter(newData)
        }
       
  
      }
    
    }
  
  }
  else
  {
    this.OnSubmitColorFilter(Ref)
  }
  
  }
  

  OnSubmitColorFilter(Ref){
  
    var  newData = []
    var count = 0;
  
    if( this.state.ColorFilter.length > 0){
    for(var i =0 ; i < this.state.ColorFilter.length;i++){
  
      Ref.filter(item => {
        if (item.fld_color.includes(this.state.ColorFilter[i])) {
          newData.push(item)
        }
      })
    
      count = count + 1
  
      if(count == this.state.ColorFilter.length){
  
        if(newData.length == 0){
  
          this.setState({
            FootDetails : newData
          })
  
          Notiflix.Loading.Remove()
  
        }else
        {
  
          this.OnSubmitTypeFilter(newData)
        }
       
  
      }
    
    }
  
  }
  else
  {
    this.OnSubmitTypeFilter(Ref)
  }
  
  }


  OnSubmitTypeFilter(Ref){
  
    var  newData = []
    var count = 0;
  
    if( this.state.TypeFilter.length > 0){
    for(var i =0 ; i < this.state.TypeFilter.length;i++){
  
      Ref.filter(item => {
        if (item.fld_type.includes(this.state.TypeFilter[i])) {
          newData.push(item)
        }
      })
    
      count = count + 1
  
      if(count == this.state.TypeFilter.length){
  
        var resArr = [];
        newData.forEach(function(item){
        var i = resArr.findIndex(x => x.fld_code == item.fld_code);
        if(i <= -1){
          resArr.push(item);
        }
      });


  
          this.setState({
            FootDetails : resArr
          })
  
          Notiflix.Loading.Remove()
  
       
      }
    
    }
  
  }
  else
  {



    var resArr1 = [];
    Ref.forEach(function(item){
    var i = resArr1.findIndex(x => x.fld_code == item.fld_code);
    if(i <= -1){
      resArr1.push(item);
    }
  });

    this.setState({
      FootDetails : resArr1
    })

    Notiflix.Loading.Remove()
  }
  
  }

  render() {
    return (
      <div>
        <Menu></Menu>
        <div class="container ad-banner">
          <div id="myTarget" class="d-none d-sm-none d-md-block"></div>
          <div id="myTargetMobile" class="d-md-none d-sm-block"></div>
        </div>
        <main class="main">
        <div class="container doctors-section">

          <div class="row healthcare-slider">
            
            <div class="sidebar-overlay"></div>
                <div class="sidebar-toggle">
                  <i class="icon-sliders"></i>
                </div>
                <aside class="sidebar-product col-lg-2 col-md-4 col-sm-4 padding-left-lg mobile-sidebar">
                  <div class="sidebar-wrapper">
              <div class="filter-side">
              <div class="brands">
                  <h5 style={{borderTop: '0px',paddingTop:'0px'}}>Footwear <br/>( {this.state.FootDetails.length} Products )</h5>
                  </div>
                <div class="row">
                  <div class="col-md-12"><h4>Filters</h4></div>
               
                </div>
                
                <div class="brands">
                  <h5 style={{display : this.state.BrandData.length ==0 ? 'none' : ''}}>Brands</h5>
                  <div class="search">
                  <input 
                  onChange={(text)=>{

                    this.setState({
        
                      BrandData : text.target.value == '' ? this.state.BrandDataRef :this.state.BrandDataRef.filter(item  => 
                     {
    
                     if (item.fld_name.toLowerCase().includes(text.target.value.toLowerCase()) 
                     
                     ){
                       return true
                     }
                   
                     }
                     )
                         })
                 

                  }}
                  type="text" placeholder="Search"></input>
                </div>
                  <ul  id="style-3">
                  {this.state.BrandData.map((dt,i)=>(
                    <li>
                      <input
                       checked={this.state.BrandFilter.includes(dt.fld_name) ? true : false}
                        type="checkbox"
                        name="checkbox3"
                        id="checkbox3"
                        class="css-checkbox"
                        onChange={()=>{
                          var ar = [...this.state.BrandFilter]

                          if(ar.includes(dt.fld_name)){

                            ar.splice(ar.indexOf(dt.fld_name),1)

                          }else{
                            ar.push(dt.fld_name)
                          }

                          this.setState({
                            BrandFilter : ar
                          },
                          ()=>{
                            
                            this.OnSubmitBrandFilter()
                          });

                        }}
                      />
                      <label  class="css-label">
                        {dt.fld_name} ( {dt.fld_prodcount} )
                      </label>
                    </li>
                  ))}
                  </ul>
                 
             
                </div>

           
                <div class="brands">
                  <h5>Gender</h5>
                  <ul  id="style-3">
                  {this.state.GenderData.map((dt,i)=>(
                    <li>
                      <input
                       checked={this.state.GenderFilter.includes(dt.fld_gender) ? true : false}
                        type="checkbox"
                        name="checkbox3"
                        id="checkbox3"
                        class="css-checkbox"
                        onChange={()=>{
                          var ar = [...this.state.GenderFilter]

                          if(ar.includes(dt.fld_gender)){

                            ar.splice(ar.indexOf(dt.fld_gender),1)

                          }else{
                            ar.push(dt.fld_gender)
                          }

                          this.setState({
                            GenderFilter : ar
                          },
                          ()=>{
                            
                            this.OnSubmitBrandFilter()
                          });

                        }}
                      />
                      <label class="css-label">
                        {dt.fld_gender}
                      </label>
                    </li>
                  ))}
                  
                  </ul>
                </div>
             
                <div class="brands">
                  <h5 style={{display : this.state.SizeData.length ==0 ? 'none' : ''}}>Size</h5>
                  <ul  id="style-3">
                    {this.state.SizeData.map((dt,i)=>(
                            <li>
                            <input
                            checked={this.state.SizeFilter.includes(dt) ? true : false}
                              type="checkbox"
                              name="checkbox3"
                              id="checkbox3"
                              class="css-checkbox"
                              onChange={()=>{
                                var ar = [...this.state.SizeFilter]
      
                                if(ar.includes(dt)){
      
                                  ar.splice(ar.indexOf(dt),1)
      
                                }else{
                                  ar.push(dt)
                                }
      
                                this.setState({
                                  SizeFilter : ar
                                },
                                ()=>{
                                  
                                  this.OnSubmitBrandFilter()
                                });
      
                              }}

                            />
                            <label  class="css-label">
                              {dt}
                            </label>
                          </li>
                    ))}
                 
                   
                   
                  </ul>
                </div>


                <div class="brands">
                  <h5 style={{display : this.state.PriceData.length ==0 ? 'none' : ''}}>Price</h5>
                  <ul >
                 
                    
                         
                  {this.state.PriceData.map((dt, i) => (
                          <li>
                            <input
                              checked={
                                this.state.PriceFilter.includes(dt)
                                  ? true
                                  : false
                              }
                              type="checkbox"
                              name="checkbox3"
                              id="checkbox3"
                              class="css-checkbox"
                              onChange={() => {
                                var ar = [...this.state.PriceFilter];

                                if (ar.includes(dt)) {
                                  ar.splice(ar.indexOf(dt), 1);
                                } else {
                                  ar.push(dt);
                                }

                                this.setState({
                                  PriceFilter: ar,
                                },
                                ()=>{
                                  
                                  this.OnSubmitBrandFilter()
                                });
                              }}
                            />
                            <label  class="css-label">
                              {dt.fld_label.replace(/[?]/g,'₹')}
                            </label>
                          </li>
                        ))}
                   
                   
                  
                  </ul>
                </div>


                <div class="brands">
                  <h5 style={{display : this.state.ColorData.length ==0 ? 'none' : ''}}>Color</h5>
                  <ul  id="style-3">
                  {this.state.ColorData.map((dt,i)=>(
                    <li>
                      <input
                       checked={this.state.ColorFilter.includes(dt.fld_color) ? true : false}
                        type="checkbox"
                        name="checkbox3"
                        id="checkbox3"
                        class="css-checkbox"
                        onChange={()=>{
                          var ar = [...this.state.ColorFilter]

                          if(ar.includes(dt.fld_color)){

                            ar.splice(ar.indexOf(dt.fld_color),1)

                          }else{
                            ar.push(dt.fld_color)
                          }

                          this.setState({
                            ColorFilter : ar
                          },
                          ()=>{
                            
                            this.OnSubmitBrandFilter()
                          });

                        }}
                      />
                      <label  class="css-label">
                       {dt.fld_color}
                      </label>
                    </li>
                  ))}
                    
                    
                  </ul>
                </div>

             

                <div class="brands">
                  <h5 style={{display : this.state.TypeData.length ==0 ? 'none' : ''}}>Type</h5>
                  <ul  id="style-3">
                  {this.state.TypeData.map((dt,i)=>(
                    <li>
                      <input
                       checked={this.state.TypeFilter.includes(dt.fld_type) ? true : false}
                        type="checkbox"
                        name="checkbox3"
                        id="checkbox3"
                        class="css-checkbox"
                        onChange={()=>{
                          var ar = [...this.state.TypeFilter]

                          if(ar.includes(dt.fld_type)){

                            ar.splice(ar.indexOf(dt.fld_type),1)

                          }else{
                            ar.push(dt.fld_type)
                          }

                          this.setState({
                            TypeFilter : ar
                          },
                          ()=>{
                            
                            this.OnSubmitBrandFilter()
                          });

                        }}
                      />
                      <label  class="css-label">
                       {dt.fld_type}
                      </label>
                    </li>
                  ))}
                    
                    
                  </ul>

                  <a 
                   onClick={()=>{
                    this.setState({
                      BrandFilter: [],
                      GenderFilter : [],
                      SizeFilter : [],
                      PriceFilter : [],
                      ColorFilter : [],
                      TypeFilter : [],

                      FootDetails : this.state.FootRef

                    })
                   
                  }}
                  class="filter-btn btn">Reset Filters</a>
             
                </div>

             
               
               
               
              </div>
            </div>
            </aside>
            <div class="col-lg-10 col-md-12 col-sm-12">
              <div class="row">
                  {this.state.FootDetails.length ==0 && this.state.done ?  
                  <div class="col-md-12">
                        <img src="/assets/images/No-product-Found.png" style={{    margin: 'auto'}}/>
                      </div>
               : ''}
                {this.state.FootDetails.map((info, index)=>(

                  <div class="col-lg-3 col-md-4 col-sm-4">
                  <div class="partner product-inner ">
                    <div id="overlay" style={{display : info.fld_availability =='In stock' ? 'none' : ''}}>Out Of Stock</div>

                    <img
                      src={info.Photos.split(',')[0]}
                      alt="product"
                      class="footcare-image img-center"
                      onClick={()=>{
                        window.location.href = `/footwear/${info.fld_footid+"/"+info.fld_id+"/"+info.fld_name.replace( / /g,'-').replace( /\//g,'-').replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')}`
                      }}
                    />

                    <div class="product-details">
                      <p class="product-title">
                        <a 
                        onClick={()=>{
                          window.location.href = `/footwear/${info.fld_footid+"/"+info.fld_id+"/"+info.fld_name.replace( / /g,'-').replace( /\//g,'-').replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')}`
                        }}
                        class="item-name">
                          {info.fld_name}
                        </a>
                      </p>
                      <p class="small-desc item-name"><span style={{color:"#222222",fontWeight:"600"}}>Brand:</span> {info.fld_brand}</p>
                    
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
                             
                                      variant_id : info.fld_id,
                                      product_category : 'Footwear',
                                      quantity :1,
                                     updated_on : moment().format('lll'),
                                     updated_by : login.fld_userid
                       
                                  
                                  },"AddWishlist").then((results) => 
                                  
                                   
                                    results.json().then(obj => {
                         
                                  
                                    if(results.status == 200 || results.status==201){
                      
                                      
                                      Notiflix.Loading.Remove()
                                      Notiflix.Notify.Info('Product added to Wishlist.')
                               
                                     
                         
                                    }else{
                                      Notiflix.Loading.Remove()
                                      Notiflix.Notify.Failure('Something went wrong, try again later.') 
                                    }
                         
                                 }))
                      
                              }else{
                              
                                  Notiflix.Notify.Failure('Please Login to add products to your wishlist.')
                              }
                      
                          }}
                          
                          class="like-btn">
                        
                            <i class="fas fa-heart"></i>
                          </button>{" "}
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
      
      </main>
        <div class="container">
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
)(FootcareListing);
