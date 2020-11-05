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

class FoodListing extends React.Component {
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
      SearchDataRef : []


      
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
      CategorySelected : this.props.match.params.category
    });

    var search = JSON.parse(localStorage.getItem('SearchText'))


    PostApiCall.postRequest(
      {
        category: this.props.match.params.id,
      },
      "GetFoodListing"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {


   

          var srDt= []
          if(search != null){


            obj.data.filter(item => {
              if (item.fld_name.toLowerCase().includes(search.toLowerCase())
              || item.fld_brand.toLowerCase().includes(search.toLowerCase())
              || item.Filters.toLowerCase().includes(search.toLowerCase())
           
              ) {
                srDt.push(item)
              }
            })


            var dtar = [...srDt];
            for (var i = 0; i < Object.keys(srDt).length; i++) {
     
              if (srDt[i].Variant != null) {
                dtar[i].SelectedVar = srDt[i].Variant.split("^")[0];
                dtar[i].Selectdd = srDt[i].Variant.split("^")[0].split('#')[1]+' '+srDt[i].Variant.split("^")[0].split('#')[2]+' - ₹'+srDt[i].Variant.split("^")[0].split('#')[3]
              }else{
      
              }
            }
            var finlar = []
            for (var i = 0; i < dtar.length; i++) {
              if(dtar[i].Variant != null){
                finlar.push(dtar[i])
              }

            }
         
            this.setState({
              Food: finlar,
              FoodRef: finlar,
              FoodVariantRef : finlar,
              SearchDataRef : finlar,
              done : true
            });
            Notiflix.Loading.Remove();


            var dtar1 = [...obj.data];
            for (var i = 0; i < Object.keys(obj.data).length; i++) {
      
              if (obj.data[i].Variant != null) {
                dtar1[i].SelectedVar = obj.data[i].Variant.split("^")[0];
                dtar1[i].Selectdd = obj.data[i].Variant.split("^")[0].split('#')[1]+' '+obj.data[i].Variant.split("^")[0].split('#')[2]+' - ₹'+obj.data[i].Variant.split("^")[0].split('#')[3]
              }else{
   
              }
            }

            var finlar2 = []
            for (var i = 0; i < dtar1.length; i++) {
              if(dtar1[i].Variant != null){
                finlar2.push(dtar1[i])
              }

            }

            this.setState({
           
              FoodVariantRef :finlar2 ,
      
            });


          }
            else
            {

              var dtar2 = [...obj.data];
              for (var i = 0; i < Object.keys(obj.data).length; i++) {
      
                if (obj.data[i].Variant != null) {
                  dtar2[i].SelectedVar = obj.data[i].Variant.split("^")[0];
                  dtar2[i].Selectdd = obj.data[i].Variant.split("^")[0].split('#')[1]+' '+obj.data[i].Variant.split("^")[0].split('#')[2]+' - ₹'+obj.data[i].Variant.split("^")[0].split('#')[3]
                }else{
         
                }
              }

              var finlar1 = []
              for (var i = 0; i < dtar2.length; i++) {
                if(dtar2[i].Variant != null){
                  finlar1.push(dtar2[i])
                }
  
              }
              
          
              this.setState({
                Food: finlar1,
                FoodRef: finlar1,
                FoodVariantRef : finlar1,
                done : true
              });
              Notiflix.Loading.Remove();

            }
         
        }
      })
    );



    PostApiCall.postRequest(
      {
        category: this.props.match.params.id,
      },
      "GetFoodBrandData"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {

          
        this.setState({
          BrandData: obj.data,
          BrandDataRef : obj.data,
        });
      }
    })
    );

    PostApiCall.postRequest(
      {
        category: this.props.match.params.id,
      },
      "GetFoodFlavourDataFilter"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {


        this.setState({
          FlavourData: obj.data,
        });
      }
    })
    );


    GetApiCall.getRequest("GetFoodPriceDataFilter").then(resultdes =>
      resultdes.json().then(obj => {
  
          this.setState({
              
          PriceData : obj.data
        })

      }))

    PostApiCall.postRequest(
      {
        category: this.props.match.params.id,
      },
      "GetFoodFilterDataFilter"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {

       
        this.setState({
          AdditionalData: obj.data,
        });
      }
    })
    );
    
  }

  truncate(source, size) {
    // console.log(source)
    if (source != null) {
      return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }
  }

  
 

OnSubmitBrandFilter(){

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
          Food : newData
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
     
      if(item.Variant != null){
        item.Variant.split('^').filter(item2=> {
     
          if (item2.split('#')[3] >= this.state.PriceFilter[i].fld_min && item2.split('#')[3] <= this.state.PriceFilter[i].fld_max) {
      
            newData.push(item)
        
          }
      })
      }
  
    
    })
  
    count = count + 1

    if(count == this.state.PriceFilter.length){

      if(newData.length == 0){

        this.setState({
          Food : newData
        })

        Notiflix.Loading.Remove()

      }else
      {

       

    
        var resArr = [];
        newData.forEach(function(item){
        var i = resArr.findIndex(x => x.fld_id == item.fld_id);
        if(i <= -1){
          resArr.push(item);
        }
      });
     

      var dtar = [...resArr];

      for(var j =0 ; j < this.state.PriceFilter.length;j++){

          for (var i = 0; i < Object.keys(resArr).length; i++) {
          
            resArr[i].Variant.split('^').filter((item2,ind)=> {
     
              if (item2.split('#')[3] >= this.state.PriceFilter[j].fld_min && item2.split('#')[3] <= this.state.PriceFilter[j].fld_max) {
        
              dtar[i].SelectedVar = resArr[i].Variant.split("^")[ind];
              dtar[i].Selectdd = resArr[i].Variant.split("^")[ind].split('#')[1]+' '+resArr[i].Variant.split("^")[ind].split('#')[2]+' - ₹'+resArr[i].Variant.split("^")[ind].split('#')[3];
           
              }
          })
          }
        }

        this.OnSubmitFlavourFilter(dtar)
      }
     

    }
  
  }

}
else
{
  this.OnSubmitFlavourFilter(Ref)
}

}


OnSubmitFlavourFilter(Ref){

  var  newData = []
  var count = 0;

  if( this.state.FlavourFilter.length > 0){
  for(var i =0 ; i < this.state.FlavourFilter.length;i++){

    Ref.filter(item => {
     
      if(item.fld_flavour != null && item.fld_flavour != 'NULL' ){
        if (item.fld_flavour.includes(this.state.FlavourFilter[i])) {
          newData.push(item)
        }
      }
      
    })
  
    count = count + 1

    if(count == this.state.FlavourFilter.length){

      if(newData.length == 0){

        this.setState({
          Food : newData
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

OnSubmitFilter(Ref){



  var  newData = []
  var count = 0;

  if( this.state.AdditionalFilter.length > 0){
  for(var i =0 ; i < this.state.AdditionalFilter.length;i++){

    Ref.filter(item => {
     
      item.Filters.split(',').filter(item2 => {
     
        if (item2.includes(this.state.AdditionalFilter[i])) {
          newData.push(item)
            
        }
      })
    
    })

  
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
          Food : resArr
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
    Food : resArr1
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
          <div class="container healthcare-slider doctors-section">
     
            <div class="row">
            

              <div class="sidebar-overlay"></div>
              <div class="sidebar-toggle">
                <i class="icon-sliders"></i>
              </div>
              <aside class="sidebar-product col-lg-2 col-sm-4 padding-left-lg mobile-sidebar">
                <div class="sidebar-wrapper">
                  
                  <div class="filter-side">
                  <div class="brands">
                  <h5 style={{borderTop: '0px',paddingTop:'0px'}}>{this.state.CategorySelected} <br/>( {this.state.Food.length} Products )</h5>
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
                              {dt.fld_name} ( {dt.fld_prodcount} )
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
                         Food : this.state.FoodRef

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
                  {this.state.Food.length == 0 && this.state.done ? (
                
                      <div class="col-md-12">
                        <img src="/assets/images/No-product-Found.png" style={{    margin: 'auto'}}/>
                      </div>
                 
                  ) : (
                    <div class="col-md-12">
                      
                    </div>
                  )}

                  {this.state.Food.map((info, index) => (
                    <div
                      class="col-md-4 col-lg-3 col-sm-4"
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
                              info.fld_category.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,) +
                              "/" +
                              info.fld_id +
                              "/" +
                              info.SelectedVar.split("#")[7].split("$")[0] +
                              "/" +
                              info.fld_name
                                .replace(/ /g, "-")
                                .replace(/\//g, "-")
                                .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
                            }`;
                          }}
                        />

                        <div class="product-details">
                          <p class="product-title ">
                            <a
                              onClick={() => {
                                window.location.href = `/food/${
                                  info.fld_category.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,) +
                                  "/" +
                                  info.fld_id +
                                  "/" +
                                  info.SelectedVar.split("#")[7].split("$")[0] +
                                  "/" +
                                  info.fld_name
                                    .replace(/ /g, "-")
                                    .replace(/\//g, "-")
                                    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
                                }`;
                              }}
                            >
                              {info.SelectedVar.split("#")[0]}
                            </a>
                          </p>
                    
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
                   
                                      dr[index].SelectedVar = info.Variant.split("^")[i];
                                      dr[index].Selectdd = info.Variant.split("^")[i].split("#")[1] + " " +info.Variant.split("^")[i].split("#")[2] + " - ₹" + info.Variant.split("^")[i].split("#")[3]
                                    }
                                  }

                                  this.setState({
                                    Food: dr,
                                  });
                    
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
                                      
                                        variant_id: info.SelectedVar.split(
                                          "#"
                                        )[7],
                                        product_category: "Food",
                                        quantity: 1,
                                        updated_on: moment().format("lll"),
                                        updated_by: login.fld_userid,
                                    
                                      },
                                      "AddWishlist"
                                    ).then((results) =>
                                     
                                      results.json().then((obj) => {
                                        if (
                                          results.status == 200 ||
                                          results.status == 201
                                        ) {
                                          Notiflix.Loading.Remove();
                                          Notiflix.Notify.Info(
                                            "Product added to Wishlist."
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
                                  
                                    Notiflix.Notify.Failure(
                                      "Please Login to add products to your wishlist."
                                    );
                                  }
                                }}
                              >
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
                                               variant_id: info.SelectedVar.split("#")[7].split("$")[0],
                                               product_category: "Food",
                                               quantity: 1,
                                               amount: info.SelectedVar.split("#")[3],
                                               updated_on: moment().format("lll"),
                                               updated_by: login.fld_userid,
                                               url : `/food/${info.fld_id +"/" +info.SelectedVar.split("#")[7].split("$")[0] +"/" +info.fld_name
                                                   .replace(/ /g, "-")
                                                   .replace(/\//g, "-")
                                                   .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
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
   
                                           
                                           var newCart = cart_info != null ? cart_info : []
   
                                           if(cart_info != null){
   
                                         
                                             var item = newCart.filter(val => val.fld_variantid == info.SelectedVar.split("#")[7].split('$')[0] && val.fld_productcategory == 'Food')
   
                                           
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
                                                   info.fld_name
                                                     .replace(/ /g, "-")
                                                     .replace(/\//g, "-")
                                                     .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
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
                                                 info.fld_name
                                                   .replace(/ /g, "-")
                                                   .replace(/\//g, "-")
                                                   .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
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
)(FoodListing);
