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

class DiwalioffersListing extends React.Component {
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
      ProductData:[],
      ProductDataRef : []

      
    };
  }

  componentDidMount() {
    //   Notiflix.Loading.Init({
    //     svgColor: "#507dc0",
    //   });
  
      Notiflix.Loading.Dots("Please wait...");
  
      GetApiCall.getRequest("GetFestiveOfferListing").then((results) => {
        results
          .json()
          .then((data) => ({
            data: data,
            status: results.status,
          }))
          .then((res) => {
              
            // console.log(res.data.data)

              var prdt = [...res.data.data]
              var cn = 0
              var filt = []

              for(var i = 0; i < Object.keys(res.data.data).length; i++){

                if(res.data.data[i].fld_category == 'Food'){

                  PostApiCall.postRequest(
                    {
                     id: res.data.data[i].fld_productid,
                    },
                    "GetFestiveFoodVariantDetails"
     
                  ).then((results) =>
         
                    results.json().then((obj) => {
        
                      if (results.status == 200 || results.status == 201 ) {

                        

                        filt = prdt.filter(val => val.fld_productid == obj.data[0].fld_id && val.fld_category == 'Food')

                        // console.log(obj.data)
                       
                        prdt[prdt.indexOf(filt[0])].ProdInfo = obj.data[0]

                        cn++
                        if(cn == Object.keys(res.data.data).length){

                          this.setState({
                            ProductData : prdt,
                            ProductDataRef : prdt,
                            done : true
                          })
                          Notiflix.Loading.Remove()
                        }
                       
                      }
                    }))

                }else if(res.data.data[i].fld_category == 'Footwear'){

                  PostApiCall.postRequest(
                    {
                     id: res.data.data[i].fld_productid,
                    },
                    "GetFestiveFootwearVariantDetails"
     
                  ).then((results) =>
         
                    results.json().then((obj) => {
        
                      if (results.status == 200 || results.status == 201 ) {

                        filt = prdt.filter(val => val.fld_productid == obj.data[0].fld_id && val.fld_category == 'Footwear')

                        // console.log(filt)

                        prdt[prdt.indexOf(filt[0])].ProdInfo = obj.data[0]

                        cn++
                        if(cn == Object.keys(res.data.data).length){

                          this.setState({
                            ProductData : prdt,
                            ProductDataRef : prdt,
                            done : true
                          })
                          Notiflix.Loading.Remove()
                        }
                       
                      }
                    }))

                }else{

                  PostApiCall.postRequest(
                    {
                     id: res.data.data[i].fld_productid,
                    },
                    "GetFestiveSocksVariantDetails"
     
                  ).then((results) =>
         
                    results.json().then((obj) => {
        
                      if (results.status == 200 || results.status == 201 ) {

                        filt = prdt.filter(val => val.fld_productid == obj.data[0].fld_id && val.fld_category == 'Socks')

                        prdt[prdt.indexOf(filt[0])].ProdInfo = obj.data[0]

                        cn++
                        if(cn == Object.keys(res.data.data).length){

                          this.setState({
                            ProductData : prdt,
                            ProductDataRef : prdt,
                            done : true
                          })
                          Notiflix.Loading.Remove()
                        }
                       
                      }
                    }))

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
  


     GetApiCall.getRequest(
        "GetAllFoodBrandData"
      ).then((results) =>
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
  
            GetApiCall.getRequest("GetAllFootwearBrandData").then(resultdes =>
              resultdes.json().then(objfoot => {

                GetApiCall.getRequest("GetAllSocksBrandData").then(results =>
                  results.json().then(objs => {


                    
                      this.setState({
                          
                      BrandData : [].concat(obj.data, objfoot.data, objs.data),
                      BrandDataRef : [].concat(obj.data, objfoot.data, objs.data),
                      // done : true

                    })
        
                  }))
              }))
          // this.setState({
          //   BrandData: obj.data,
          //   BrandDataRef : obj.data,
          // });
        }
      })
      );


      GetApiCall.getRequest("GetSocksPriceDataFilter").then(resultdes =>
        resultdes.json().then(obj => {
          // console.log(obj.data)
            this.setState({
                
            PriceData : obj.data,
            // done : true
          })
  
        }))

    }

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
    this.state.ProductDataRef.filter(item => {
      if (item.ProdInfo.fld_brand.includes(this.state.BrandFilter[i])) {
        newData.push(item)
      }
    })

    count = count + 1

    if(count == this.state.BrandFilter.length){
   
      if(newData.length == 0){

        this.setState({
          ProductData : newData
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
    this.OnSubmitPriceFilter(this.state.ProductDataRef)
  }

 
}
}



OnSubmitPriceFilter(Ref){

  var  newData = []
  var count = 0;

  if( this.state.PriceFilter.length > 0){
  for(var i =0 ; i < this.state.PriceFilter.length;i++){

    Ref.filter(item => {
     
      if(item != null){
       
     
          if (item.ProdInfo.fld_discountprice >= this.state.PriceFilter[i].fld_min && item.ProdInfo.fld_discountprice <= this.state.PriceFilter[i].fld_max) {
          //  console.log(item)
            newData.push(item)
              // return true;
          }
      }
  
    
    })
  
    count = count + 1

    if(count == this.state.PriceFilter.length){

      if(newData.length == 0){

        this.setState({
          ProductData : newData
        })

        Notiflix.Loading.Remove()

      }else
      {

       
        // console.log(newData)
    
      //   var resArr = [];
      //   newData.forEach(function(item){
      //   var i = resArr.findIndex(x => x.fld_id == item.ProdInfo.fld_id);
      //   if(i <= -1){
      //     resArr.push(item);
      //   }
      // });
     

      // var dtar = [...resArr];

      // for(var j =0 ; j < this.state.PriceFilter.length;j++){

      //     for (var i = 0; i < Object.keys(resArr).length; i++) {
      //       // console.log(dtar[i].SelectedVar)
      //       resArr[i].Variant.split('^').filter((item2,ind)=> {
     
      //         if (item2.split('#')[3] >= this.state.PriceFilter[j].fld_min && item2.split('#')[3] <= this.state.PriceFilter[j].fld_max) {
      //         //  console.log(item)
      //         dtar[i].SelectedVar = resArr[i].Variant.split("^")[ind];
      //         dtar[i].Selectdd = resArr[i].Variant.split("^")[ind].split('#')[1]+' '+resArr[i].Variant.split("^")[ind].split('#')[2]+' - ₹'+resArr[i].Variant.split("^")[ind].split('#')[3];
      //             // return true;
      //         }
      //     })
      //     }
      //   }
          // console.log(dtar)
        // this.OnSubmitFlavourFilter(dtar)
        this.setState({
          ProductData : newData
        })

  Notiflix.Loading.Remove()
      }
     

    }
  
  }

}
else
{
  this.setState({
    ProductData : Ref
  })

  Notiflix.Loading.Remove()
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

  // console.log(Ref)

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


onChangeSortBy=(e)=>{
  e.preventDefault()
  this.setState({
    ...this.state,
   sortBy:e.target.value
  })
}



OnProductClicked(info){
  if(info.fld_category == 'Food')
  {

    window.location.href = `/food/${
      info.ProdInfo.fld_category.replace(
        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
        "-"
      ) +'/'+
      info.ProdInfo.fld_foodid +
      "/" +
      info.ProdInfo.fld_id +
      "/" +
      info.ProdInfo.fld_name
        .replace(/ /g, "-")
        .replace(/\//g, "-")
        .replace(
          /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
          "-"
        )
    }`;

  }else if(info.fld_category == 'Footwear')
  {

    window.location.href = `/footwear/${
      info.ProdInfo.fld_footid +
      "/" +
      info.ProdInfo.fld_id +
      "/" +
      info.ProdInfo.fld_name
        .replace(/ /g, "-")
        .replace(/\//g, "-")
        .replace(
          /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
          "-"
        )
    }`;

  }else
  {
    window.location.href = `/socks/${
      info.ProdInfo.fld_socksid +
      "/" +
      info.ProdInfo.fld_id +
      "/" +
      info.ProdInfo.fld_name
        .replace(/ /g, "-")
        .replace(/\//g, "-")
        .replace(
          /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
          "-"
        )
    }`;
  }
 
}

AddToWishlistDiwali(info){
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
        variant_id: info.ProdInfo.fld_id,
        product_category: info.fld_category ,
        quantity: 1,
        updated_on: moment().format(
          "lll"
        ),
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
}


AddToCartFootwear(info){


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
                                             url : `/footwear/${ info.ProdInfo.fld_footid +"/" +info.ProdInfo.fld_id +"/" +info.ProdInfo.fld_name
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
                                          var item = newCart.filter(val => val.fld_variantid == info.ProdInfo.fld_id && val.fld_productcategory == 'Footwear')
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
                                              fld_variantid : info.ProdInfo.fld_id,
                                              fld_productcategory : 'Footwear',
                                              fld_quantity : 1,
                                              fld_amount : info.ProdInfo.fld_discountprice,
                                              fld_addedon : moment().format('lll'),
                                              fld_url : `/footwear/${
                                                info.ProdInfo.fld_footid +
                                                "/" +
                                                info.ProdInfo.fld_id +
                                                "/" +
                                                info.ProdInfo.fld_name
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
                                            fld_variantid : info.ProdInfo.fld_id,
                                            fld_productcategory : 'Footwear',
                                            fld_quantity : 1,
                                            fld_amount : info.ProdInfo.fld_discountprice,
                                            fld_addedon : moment().format('lll'),
                                            fld_url : `/footwear/${
                                              info.ProdInfo.fld_footid +
                                              "/" +
                                              info.ProdInfo.fld_id +
                                              "/" +
                                              info.ProdInfo.fld_name
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


AddToCartSocks(info){


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
                                             url : `/socks/${info.ProdInfo.fld_socksid +"/" +info.ProdInfo.fld_id +"/" +info.ProdInfo.fld_name
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
                                      
                                          var item = newCart.filter(val => val.fld_variantid == info.ProdInfo.fld_id && val.fld_productcategory == 'Socks')
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
                                              fld_variantid : info.ProdInfo.fld_id,
                                              fld_productcategory : 'Socks',
                                              fld_quantity : 1,
                                              fld_amount : info.ProdInfo.fld_discountprice,
                                              fld_addedon : moment().format('lll'),
                                              fld_url :`/socks/${
                                                info.ProdInfo.fld_socksid +
                                                "/" +
                                                info.ProdInfo.fld_id +
                                                "/" +
                                                info.ProdInfo.fld_name
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
                                            fld_variantid : info.ProdInfo.fld_id,
                                            fld_productcategory : 'Socks',
                                            fld_quantity : 1,
                                            fld_amount : info.ProdInfo.fld_discountprice,
                                            fld_addedon : moment().format('lll'),
                                            fld_url :`/socks/${
                                              info.ProdInfo.fld_socksid +
                                              "/" +
                                              info.ProdInfo.fld_id +
                                              "/" +
                                              info.ProdInfo.fld_name
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


AddToCartFood(info){

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
                                             url : `/food/${info.ProdInfo.fld_foodid +"/" +info.ProdInfo.fld_id +"/" +info.ProdInfo.fld_name
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
                                               Notiflix.Notify.Info(
                                                 "Product added to Cart."
                                               );
                                               console.log(obj.data)
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
                                           var item = newCart.filter(val => val.fld_variantid == info.ProdInfo.fld_id && val.fld_productcategory == 'Food')
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
                                               fld_variantid : info.ProdInfo.fld_id,
                                               fld_productcategory : 'Food',
                                               fld_quantity : 1,
                                               fld_amount : info.ProdInfo.fld_discountprice,
                                               fld_addedon : moment().format('lll'),
                                               fld_url : `/food/${
                                                 info.ProdInfo.fld_foodid +
                                                 "/" +
                                                 info.ProdInfo.fld_id +
                                                 "/" +
                                                 info.ProdInfo.fld_name
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
                                             fld_variantid : info.ProdInfo.fld_id,
                                             fld_productcategory : 'Food',
                                             fld_quantity : 1,
                                             fld_amount : info.ProdInfo.fld_discountprice,
                                             fld_addedon : moment().format('lll'),
                                             fld_url : `/food/${
                                               info.ProdInfo.fld_foodid +
                                               "/" +
                                               info.ProdInfo.fld_id +
                                               "/" +
                                               info.ProdInfo.fld_name
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

AddToCartDiwali(info){
  if(info.fld_category == 'Food'){

    this.AddToCartFood(info)

  }else if(info.fld_category == 'Footwear'){

    this.AddToCartFootwear(info)
  }else
  {
this.AddToCartSocks(info)
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
            {/* <h3 class="section-title">Food</h3> */}
            <div class="row">
             
            </div>
            <div class="row">
              {/* {this.state.Book.map((book, index) => ( */}
              {/* <div class="col-md-3 col-sm-3 col-xs-3 col-3">
              <div class="sidebar-overlay"></div>
              <div class="sidebar-toggle">
                <i class="icon-sliders"></i>
              </div>
              </div> */}
                {/* <div class="col-md-9 col-sm-9 col-xs-9 col-9">
                <div class="sort-dropdown">
                  <span>Sort By</span>
                    <select onChange={this.onChangeSortBy.bind(this)}>

                    <option value='New Arrivals'>New Arrivals</option>
                     
                      <option value='High to Low' >Price : High to Low</option>
                      <option value='Low to High'>Price : Low to High</option>
                    </select>
                </div>  
              </div> */}
            
              <aside class="sidebar-product col-lg-2 col-sm-4 padding-left-lg mobile-sidebar">
                <div class="sidebar-wrapper">
                  
                  <div class="filter-side">
                  <div class="brands">
                  <h5 style={{borderTop: '0px',paddingTop:'0px'}}>{this.state.ProductData[0] != undefined ? this.state.ProductData[0].fld_title : ''} <br/> ( {this.state.ProductData.length} Products )</h5>
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

                {/* <div class="brands">
                  <h5 style={{display : this.state.FlavourData.length ==0 ? 'none' : ''}}>Flavors</h5>
                  <ul >
                 
                
                 
                  {this.state.FlavourData.map((dt, i) => (
                          <li>
                            <input
                              checked={
                                this.state.FlavourFilter.includes(dt.fld_flavour)
                                  ? true
                                  : false
                              }
                              type="checkbox"
                              name="checkbox3"
                              id="checkbox3"
                              class="css-checkbox"
                              onChange={() => {
                                var ar = [...this.state.FlavourFilter];

                                if (ar.includes(dt.fld_flavour)) {
                                  ar.splice(ar.indexOf(dt.fld_flavour), 1);
                                } else {
                                  ar.push(dt.fld_flavour);
                                }

                                this.setState({
                                  FlavourFilter: ar,
                                },()=>{
                                  this.OnSubmitBrandFilter()
                                });
                              }}
                            />
                            <label for="checkbox3" class="css-label">
                              {dt.fld_flavour}
                            </label>
                          </li>
                        ))}
                  
                   
                   
                  
                  </ul>
                </div>
              */}
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
                        ProductData : this.state.ProductDataRef,
                        BrandFilter : [],
                        PriceFilter : []

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
                
                  {this.state.ProductData.length == 0 && this.state.done ? (
                
                      <div class="col-md-12">
                      
                        <img src="/assets/images/No-product-Found.png" style={{    margin: 'auto'}}/>
                      </div>
                 
                  ) : (
                    <div class="col-md-12">
                      {/* <h2 class="light-title section-title" style={{marginBottom: "20px"}}>{this.state.CategorySelected} </h2> */}
                    </div>
                  )}
                   
                  {this.state.ProductData.sort((a,b)=>{
                  
                     if(this.state.sortBy!==''){
                       if(this.state.sortBy==='Low to High'){
                   return parseInt(a.ProdInfo.fld_discountprice)-parseInt(b.ProdInfo.fld_discountprice)
                    
                       }
                       else if(this.state.sortBy==='High to Low'){
                   return parseInt(b.ProdInfo.fld_discountprice)-parseInt(a.ProdInfo.fld_discountprice)
                      
                       }
                       else if(this.state.sortBy==='New Arrivals'){
                         
                        return new Date(b.fld_updatedon[0])-new Date(a.fld_updatedon[0])

                       }
                     }
                   

                  }).map((info, index) => (
                  
                      <div class="col-md-4 col-lg-3 col-sm-4">
                        {/* {console.log(info)} */}
                        <div className="partner book-inner">
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
)(DiwalioffersListing);
