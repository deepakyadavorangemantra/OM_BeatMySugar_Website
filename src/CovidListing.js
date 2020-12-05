/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-dupe-class-members */
/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import GetApiCall from "./GetApi";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import moment from "moment";

import { connect } from "react-redux";
import {
 
  setcartitemcount,
  setcartamount
} from "./Actions/actionType";

class CovidListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Food: [],
      FoodCategory: [],
      BrandData: [],
      BrandFilter: [],

      CategorySelected: "",

      SelCatTemp: "",

      LoginData: [],
      FoodVariantRef : [],
      FlavourData : [],
      FlavourFilter : [],
      AdditionalData : [],
      AdditionalFilter : [],

      PriceData : [],
      PriceFilter : [],
      BrandDataRef : [],

      done : false,
      SearchDataRef : [],
      sortBy:'New Arrivals',
      ItemCount:0,
      Cart:[],
      quantity: [],
      FoodData:[],
      FoodRef:[],
      bannerfood:[],
      images:[],
      FoodDetails : []
    };
  }

  componentDidMount() {

    let images=[]
    PostApiCall.postRequest(
      {
        verticle : 'Covid Essentials',
        type:'Listing Page'
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
      CategorySelected : this.props.match.params.category
    });

    var search = JSON.parse(localStorage.getItem('SearchText'))

    // console.log(this.props.match.params.category)

   
 


    PostApiCall.postRequest(
      {
        category: this.props.match.params.id,
      },
      "GetCovidListing"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {


        
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
  
              FoodDetails: srDt,
              FoodVariantRef : obj.data,
              SearchDataRef : srDt
              
            });
          }else
          {
            console.log(obj.data)
            this.setState({
  
              FoodDetails: obj.data,
              FoodVariantRef : obj.data,
              
            });
          }
          
          Notiflix.Loading.Remove(); 
         
        }
      })
    );



    PostApiCall.postRequest(
      {
        category: this.props.match.params.id,
      },
      "GetCovidBrandData"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {

          // console.log(obj.data)
        this.setState({
          BrandData: obj.data,
          BrandDataRef : obj.data,
        });
      }
    })
    );

   

    GetApiCall.getRequest("GetFoodPriceDataFilter").then(resultdes =>
      resultdes.json().then(obj => {
        // console.log(obj.data)
          this.setState({
              
          PriceData : obj.data
        })

      }))

    PostApiCall.postRequest(
      {
        category: this.props.match.params.id,
      },
      "GetCovidFilterDataFilter"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {

          // console.log(obj.data)
        this.setState({
          AdditionalData: obj.data,
        });
      }
    })
    );
   
 
 
 
 
    this.getUpdatedCart(); }

  truncate(source, size) {
    // console.log(source)
    if (source != null) {
      return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }
  }

  
 

OnSubmitBrandFilter(){
  // console.log(this.state.BrandFilter)
  var  newData = []
  var count = 0;

  if( this.state.BrandFilter.length > 0){
  for(var i =0 ; i < this.state.BrandFilter.length;i++){
    this.state.FoodVariantRef.filter(item => {
      if (item.fld_brand.includes(this.state.BrandFilter[i])) {
        newData.push(item)
      }
    })

    count = count + 1

    if(count == this.state.BrandFilter.length){
   
      if(newData.length == 0){

        this.setState({
          FoodDetails : newData
        })

        Notiflix.Loading.Remove()

      }else
      {
        // console.log(newData[0])
        this.OnSubmitPriceFilter(newData)
      }
     

    }
  
  }

}
else
{
  var search = JSON.parse(localStorage.getItem('SearchText'))

  if(search != null){

    this.OnSubmitPriceFilter(this.state.SearchDataRef)

  }else
  {
    this.OnSubmitPriceFilter(this.state.FoodVariantRef)
  }

 
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
            FoodDetails : newData
          })
  
          Notiflix.Loading.Remove()
  
        }else
        {
  
          this.OnSubmitFilter(newData)
        }
       
  
      }
    
    }
  
  }
  else
  {
    this.OnSubmitFilter(Ref)
  }
  
  }



getUpdatedCart() {
  var log = localStorage.getItem("CustomerLoginDetails");
  var login = JSON.parse(log);

  var arr = [];
  var subt = 0;
  var mrpt = 0;
  var baset = 0;
  var gstval = 0;
  var cn = 0;
  // console.log(login)
  if (login != null && login != "") {
    Notiflix.Loading.Dots("");

    PostApiCall.postRequest(
      {
        product_category: "Covid",
        customer_id: login.fld_userid,
      },
      "GetCartFoodVariant"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {
          if (obj.data.length > 0) {
            arr.push(obj.data);

            console.log(obj.data);
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

              // console.log(this.state.Cart)
              this.setState({
                done: true,
              });
              Notiflix.Loading.Remove();

            })
          }
        }
      )
    )
    GetApiCall.getRequest("GetExtraCharges").then((resultdes) =>
      resultdes.json().then((obj) => {
        // console.log(obj.data)
        for (var i = 0; i < Object.keys(obj.data).length; i++) {
          if (obj.data[i].fld_type == "Shipping") {
            this.setState({
              ShippingCharge: obj.data[i].fld_price,
              ShippingTh: obj.data[i].fld_thresholdvalue,
            });
          } else if (obj.data[i].fld_type == "COD") {
            this.setState({
              // COD : obj.data[i].fld_price
            });
          }
        }

        this.setState({
          ExtraCharges: obj.data,
        });

        // Notiflix.Loading.Remove();
      })
    );

  
    //  Notiflix.Loading.Remove()
  } else {
    this.getCartUpdatedWithoutLogin();
  }
}

getCartUpdatedWithoutLogin() {
  var arr = [];
  var subt = 0;
  var mrpt = 0;
  var baset = 0;
  var gstval = 0;
  var cn = 0;

  var fdData = [];
  var crtData = [];
  var ftData = [];
  var skData = [];

  var cart_info = JSON.parse(localStorage.getItem("BMSCartData"));

  // console.log(cart_info)

  if (cart_info != null) {
    Notiflix.Loading.Dots("");

    for (var i = 0; i < cart_info.length; i++) {
      if (cart_info[i].fld_productcategory == "Covid") {
        PostApiCall.postRequest(
          {
            id: cart_info[i].fld_variantid,
            quantity: cart_info[i].fld_quantity,
            url: cart_info[i].fld_url,
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

              fdData.push(obj.data[0]);
              crtData.push(obj.data[0]);

              cn = cn + 1;

              if (cn == cart_info.length) {
                // console.log(this.state.)
                this.setState(
                  {
                    done: true,
                    CartData: crtData,
                    FootwearData: ftData,
                    FoodData: fdData,
                    SocksData: skData,
                  },
                  () => {
                    for (
                      var j = 0;
                      j < Object.keys(this.state.CartData).length;
                      j++
                    ) {
                      subt =
                        subt +
                        this.state.CartData[j].fld_discountprice *
                          this.state.CartData[j].fld_quantity;
                      mrpt =
                        mrpt +
                        this.state.CartData[j].fld_price *
                          this.state.CartData[j].fld_quantity;
                      baset =
                        baset +
                        (this.state.CartData[j].fld_discountprice /
                          (1 + this.state.CartData[j].fld_gstpercent / 100)) *
                          this.state.CartData[j].fld_quantity;
                      gstval =
                        gstval +
                        (this.state.CartData[j].fld_discountprice /
                          (1 + this.state.CartData[j].fld_gstpercent / 100)) *
                          this.state.CartData[j].fld_quantity *
                          (this.state.CartData[j].fld_gstpercent / 100);
                      this.setState({
                        SubTotal: subt,
                        MrpSubTotal: mrpt,
                        BaseSubTotal: baset,
                        GstValue: gstval,
                      });
                      this.props.setcartitemcount(this.state.CartData.length);
                      this.props.setcartamount(subt);
                      Notiflix.Loading.Remove();
                    }
                  }
                );
              }
              //   });
            }
          })
        );
      } else if (cart_info[i].fld_productcategory == "Footwear") {
        PostApiCall.postRequest(
          {
            id: cart_info[i].fld_variantid,
            quantity: cart_info[i].fld_quantity,
            url: cart_info[i].fld_url,
          },
          "GetCartFootwearVariantCookie"
        ).then((results) =>
          results.json().then((obj) => {
            if (results.status == 200 || results.status == 201) {
              ftData.push(obj.data[0]);
              crtData.push(obj.data[0]);

              cn = cn + 1;

              if (cn == cart_info.length) {
                // console.log(ftData)
                this.setState(
                  {
                    done: true,
                    CartData: crtData,
                    FootwearData: ftData,
                    FoodData: fdData,
                    SocksData: skData,
                  },
                  () => {
                    for (
                      var j = 0;
                      j < Object.keys(this.state.CartData).length;
                      j++
                    ) {
                      subt =
                        subt +
                        this.state.CartData[j].fld_discountprice *
                          this.state.CartData[j].fld_quantity;
                      mrpt =
                        mrpt +
                        this.state.CartData[j].fld_price *
                          this.state.CartData[j].fld_quantity;
                      baset =
                        baset +
                        (this.state.CartData[j].fld_discountprice /
                          (1 + this.state.CartData[j].fld_gstpercent / 100)) *
                          this.state.CartData[j].fld_quantity;
                      gstval =
                        gstval +
                        (this.state.CartData[j].fld_discountprice /
                          (1 + this.state.CartData[j].fld_gstpercent / 100)) *
                          this.state.CartData[j].fld_quantity *
                          (this.state.CartData[j].fld_gstpercent / 100);
                      this.setState({
                        SubTotal: subt,
                        MrpSubTotal: mrpt,
                        BaseSubTotal: baset,
                        GstValue: gstval,
                      });
                      this.props.setcartitemcount(this.state.CartData.length);
                      this.props.setcartamount(subt);
                      Notiflix.Loading.Remove();
                    }
                  }
                );
              }
              //   });
            }
          })
        );
      } else if (cart_info[i].fld_productcategory == "Socks") {
        PostApiCall.postRequest(
          {
            id: cart_info[i].fld_variantid,
            quantity: cart_info[i].fld_quantity,
            url: cart_info[i].fld_url,
          },
          "GetCartSocksVariantCookie"
        ).then((results) =>
          results.json().then((obj) => {
            if (results.status == 200 || results.status == 201) {
              skData.push(obj.data[0]);
              crtData.push(obj.data[0]);

              cn = cn + 1;

              if (cn == cart_info.length) {
                // console.log(this.state.)
                this.setState(
                  {
                    done: true,
                    CartData: crtData,
                    FootwearData: ftData,
                    FoodData: fdData,
                    SocksData: skData,
                  },
                  () => {
                    for (
                      var j = 0;
                      j < Object.keys(this.state.CartData).length;
                      j++
                    ) {
                      subt =
                        subt +
                        this.state.CartData[j].fld_discountprice *
                          this.state.CartData[j].fld_quantity;
                      mrpt =
                        mrpt +
                        this.state.CartData[j].fld_price *
                          this.state.CartData[j].fld_quantity;
                      baset =
                        baset +
                        (this.state.CartData[j].fld_discountprice /
                          (1 + this.state.CartData[j].fld_gstpercent / 100)) *
                          this.state.CartData[j].fld_quantity;
                      gstval =
                        gstval +
                        (this.state.CartData[j].fld_discountprice /
                          (1 + this.state.CartData[j].fld_gstpercent / 100)) *
                          this.state.CartData[j].fld_quantity *
                          (this.state.CartData[j].fld_gstpercent / 100);
                      this.setState({
                        SubTotal: subt,
                        MrpSubTotal: mrpt,
                        BaseSubTotal: baset,
                        GstValue: gstval,
                      });
                      this.props.setcartitemcount(this.state.CartData.length);
                      this.props.setcartamount(subt);
                      Notiflix.Loading.Remove();
                    }
                  }
                );
              }
              //   });
            }
          })
        );
      }
    }
  } else {
    this.setState({
      done: true,
    });
  }

  GetApiCall.getRequest("GetExtraCharges").then((resultdes) =>
    resultdes.json().then((obj) => {
      // console.log(obj.data)
      for (var i = 0; i < Object.keys(obj.data).length; i++) {
        if (obj.data[i].fld_type == "Shipping") {
          this.setState({
            ShippingCharge: obj.data[i].fld_price,
            ShippingTh: obj.data[i].fld_thresholdvalue,
          });
        } else if (obj.data[i].fld_type == "COD") {
          this.setState({
            // COD : obj.data[i].fld_price
          });
        }
      }

      this.setState({
        ExtraCharges: obj.data,
      });

      // Notiflix.Loading.Remove();
    })
  );

  GetApiCall.getRequest("GetOfferWebsite").then((resultdes) =>
    resultdes.json().then((obj) => {
      this.setState({
        OfferData: obj.data,
        //   done: true
      });
      //   Notiflix.Loading.Remove()

      // Notiflix.Loading.Remove();
    })
  );

  //  Notiflix.Loading.Remove()

  // }
}

OnSubmitFilter(Ref){

  console.log(Ref)

  var  newData = []
  var count = 0;

  if( this.state.AdditionalFilter.length > 0){
  for(var i =0 ; i < this.state.AdditionalFilter.length;i++){

    Ref.filter(item => {
     
      item.Filters.split(',').filter(item2 => {
     
        if (item2.includes(this.state.AdditionalFilter[i])) {
          newData.push(item)
            // return true;
        }
      })
    
    })
    // console.log(newData)
  
    count = count + 1

    if(count == this.state.AdditionalFilter.length){

      
      var resArr = [];
      newData.forEach(function(item){
      var i = resArr.findIndex(x => x.fld_code == item.fld_code);
      if(i <= -1){
        resArr.push(item);
      }
    });
 
        this.setState({
            FoodDetails : resArr
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
    FoodDetails : resArr1
  })

  Notiflix.Loading.Remove()
}

}


onChangeSortBy=(e)=>{
  e.preventDefault()
  this.setState({
    ...this.state,
   sortBy:e.target.value
  })
}
onIncrementHandler=(e)=>{
  e.preventDefault()
   this.setState({...this.state,
    ItemCount:this.state.ItemCount+1
    
  })
}
onDecrementHandler=(e)=>{
  e.preventDefault()
   this.setState({...this.state,
    ItemCount:this.state.ItemCount-1
  })
}





  render() {

    let itemCount=0;
    let CartInfo=''
  
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
    
        <main class="main">
          <div class="container healthcare-slider doctors-section">
            {/* <h3 class="section-title">Food</h3> */}
            <div class="row">
             
            </div>
            <div class="row">
              {/* {this.state.Book.map((book, index) => ( */}
              <div class="col-md-3 col-sm-3 col-xs-3 col-3">
              <div class="sidebar-overlay"></div>
              <div class="sidebar-toggle">
                <i class="icon-sliders"></i>
              </div>
              </div>
                <div class="col-md-9 col-sm-9 col-xs-9 col-9">
                <div class="sort-dropdown">
                  <span>Sort By</span>
                    <select onChange={this.onChangeSortBy.bind(this)}>

                    <option value='New Arrivals'>New Arrivals</option>
                     
                      <option value='High to Low' >Price : High to Low</option>
                      <option value='Low to High'>Price : Low to High</option>
                    </select>
                </div>  
              </div>
            
              <aside class="sidebar-product col-lg-2 col-sm-4 padding-left-lg mobile-sidebar">
                <div class="sidebar-wrapper">
                  
                  <div class="filter-side">
                  <div class="brands">
                  <h5 style={{borderTop: '0px',paddingTop:'0px'}}>{this.state.CategorySelected} <br/>( {this.state.FoodDetails.length}{this.state.FoodDetails.length == 1 ? ' Product' : ' Products'} )</h5>
                  </div>

                    <h4 >Filters</h4>

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
                        {this.state.BrandData.map((dt, i) => (
                          <li>
                            <input
                              checked={
                                this.state.BrandFilter.includes(dt.fld_name)
                                  ? true
                                  : false
                              }
                              type="checkbox"
                              name="checkbox3"
                              
                              class="css-checkbox"
                              onChange={() => {
                                var ar = [...this.state.BrandFilter];

                                if (ar.includes(dt.fld_name)) {
                                  ar.splice(ar.indexOf(dt.fld_name), 1);
                                } else {
                                  ar.push(dt.fld_name);
                                }

                                this.setState({
                                  BrandFilter: ar,
                                },()=>{
                                  this.OnSubmitBrandFilter()
                                });
                              }}
                            />
                            <label class="css-label">
                              {dt.fld_name} ( {(this.state.FoodVariantRef.filter(val => val.fld_brand == dt.fld_name).length)} )
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
                  <h5 style={{display : this.state.AdditionalData.length ==0 ? 'none' : ''}}>Additional Filters</h5>
                  <ul >
                 
                  {this.state.AdditionalData.map((dt, i) => (
                          <li>
                            <input
                              checked={
                                this.state.AdditionalFilter.includes(dt.fld_filter)
                                  ? true
                                  : false
                              }
                              type="checkbox"
                              name="checkbox3"
                             
                              class="css-checkbox"
                              onChange={() => {
                                var ar = [...this.state.AdditionalFilter];

                                if (ar.includes(dt.fld_filter)) {
                                  ar.splice(ar.indexOf(dt.fld_filter), 1);
                                } else {
                                  ar.push(dt.fld_filter);
                                }

                                this.setState({
                                  AdditionalFilter: ar,
                                },()=>{
                                  this.OnSubmitBrandFilter()
                                });
                              }}
                            />
                            <label class="css-label">
                              {dt.fld_filter}
                            </label>
                          </li>
                        ))}
                   
                   
                  
                  </ul>
                </div>
             
                    <a  class="filter-btn btn"
                     onClick={()=>{
                       this.setState({
                         BrandFilter: [],
                         PriceFilter : [],
                         FlavourFilter : [],
                         AdditionalFilter : [],
                         FoodDetails : this.state.FoodRef

                       })
                     }}
                >
                     Reset Filters
                    </a>
                  </div>
                </div>
             
              </aside>

              <div class="col-lg-10 col-md-12 col-sm-12">
              <div class="row">
                  {this.state.FoodDetails.length==0 && this.state.done ?  
                  <div class="col-md-12">
                        <img src="/assets/images/No-product-Found.png" style={{    margin: 'auto'}}/>
                      </div>
               : ''}
                {this.state.FoodDetails.sort((a,b)=>{
                     if(this.state.sortBy!==''){
                       if(this.state.sortBy==='Low to High'){
                   return parseInt(a.fld_discountprice)-parseInt(b.fld_discountprice)
                    
                       }
                       else if(this.state.sortBy==='High to Low'){
                   return parseInt(b.fld_discountprice)-parseInt(a.fld_discountprice)
                      
                       }
                       else if(this.state.sortBy==='New Arrivals'){
                         
                        return new Date(b.fld_updatedon)-new Date(a.fld_updatedon)

                       }
                     }
                   

                  }).filter((info,index)=>{
                    if(info.fld_brand===this.props.brandName&&this.props.brandName!==null){
                      console.log(this.props.brandName,"brand")

                     
                      return info
                    }
                    else if(!this.props.brandName){
                     return info
                    }
                  }).map((info, index)=>(
                   
                  <div class="col-lg-3 col-md-4 col-sm-4">
                    
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

                          


                        {this.state.FoodData.find(cart=>{
                               itemCount=cart.fld_quantity
                               CartInfo=cart
                              return cart.fld_covidid==info.fld_covidid})!==undefined?   <li class="cart-btn2">
                       
                       <div     onClick={() => {
                         this.getUpdatedCart()
                               this.RemoveFromCartFood(CartInfo);
                             }} class="value-button" id="decrease" value="Decrease Value">-</div>
                       <input type="number" id="number" disabled value={itemCount} />
                       <div  onClick={() => {
                         this.getUpdatedCart()
                               this.AddToCartFood(info);
                             }}
                              class="value-button" id="increase" value="Increase Value">+</div>
                     </li>
                       :<span>{()=>{
                         CartInfo=''
                       }}</span>
                            }



                        {/* <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li> */}
                      </ul>
                    </div>
                  </div>
                  
                  </div>


                ))}
               
            
              </div>
          
            </div>
            
              {/* ))} */}
              {/* <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div>

                       <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div>

                       <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div>

                       <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div>

                       <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div>

                       <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div>

                       <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div> */}
            </div>
          </div>
        </main>
        <div class="container">
          <div class="container-box container-box-lg info-boxes ">
          <div class="row">
            <div class="col-md-12">
              <p style={{ textAlign: "justify", fontSize: "13px" }}>
                <b>Disclaimer:</b> BeatMySugar team always puts in their best
                effort towards making the Vendor/Service Provider ensure that
                the product information given on the website is correct and
                updated. However, there could be a change in the
                ingredients/components list or warnings and precautions from the
                business operator/manufacturer/vendor/service provider’s end.
                Always read the product labels for ingredients, directions for
                use, warnings, and precautions before using the product.
              </p>
              <p style={{ textAlign: "justify", fontSize: "13px" }}>
                We strongly recommend you to read the labels carefully and
                consume the product only when you are convinced that the product
                is fit for your consumption as different people have different
                healthcare needs. It is advisable to consult your doctor or
                nutritionist before using a product.{" "}
                <a
                  href="https://www.beatmysugar.com/"
                  style={{ fontWeight: 700, color: "#000" }}
                >
                  www.BeatMySugar.com
                </a>
                , being only a facilitator and not the business
                operator/manufacturer/vendor/service provider, is not legally
                liable and does not assume any responsibility for any untoward
                occurrence from the usage of any product available on the website. All liabilities rest with the business
                operator/manufacturer/vendor/service provider.
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
)(CovidListing);