/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-loop-func */
import React from 'react';
import logo from './logo.svg';

import Header from './Header'
import Footer from './Footer'
import News from './News';
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import moment from 'moment'


var filterDt  = []

class Orderhistory extends React.Component {


    constructor(props){
        super(props)
        this.state={
            OrderHistoryData : [],
            OrderHistoryRef : [],
           ProdData : [],
           SearchText : ''
           
        }

    }

    componentDidMount(){


        Notiflix.Loading.Init({
            svgColor : '#507dc0'
            //  #507dc0'
          });

        var log = localStorage.getItem('CustomerLoginDetails')
        var login = JSON.parse(log)


        var arr = []
        if(login != null && login != ''){


            Notiflix.Loading.Dots('');

            PostApiCall.postRequest({
    
                customer_id : login.fld_userid,
                // customer_id : 13,

            
            },"GetOrderHistoryWebsite").then((results) => 
            
              // const objs = JSON.parse(result._bodyText)
              results.json().then(obj => {

                console.log(obj.data)
   
            
              if(results.status == 200 || results.status==201){

                var infData = []
              

                var c = 0
                var c1 = 0
                var cs = 0

                if(obj.data.length> 0 )
                {

                for(var i = 0 ;i<Object.keys(obj.data).length;i++){

                    // console.log(obj.data[i].OrderDet.split('#'))
                    c= c +1

                    for(var j=0;j<obj.data[i].OrderDet.split('#').length;j++){

                        // console.log(obj.data[i].OrderDet.split('#')[j])
                        cs= obj.data[i].OrderDet.split('#').length

                        if(obj.data[i].OrderDet.split('#')[j].split('^')[2] == 'Food'){




                            PostApiCall.postRequest({

                                orderid : obj.data[i].fld_orderid,
                                productid : obj.data[i].OrderDet.split('#')[j].split('^')[3]
                         
                         },"GetFoodOrderDetail").then((results2) => 
                         
                           // const objs = JSON.parse(result._bodyText)
                           results2.json().then(obj2 => {
                        
                         
                           if(results2.status == 200 || results2.status==201){

                            // console.log(obj2.data)
                           
                            infData.push(obj2.data)
                            this.setState({
                                ProdData : infData
                            })


                            c1= c1+1

                            if(c== Object.keys(obj.data).length && c1 == cs){
                                Notiflix.Loading.Remove()
                                this.setState({
                                    OrderHistoryData : obj.data,
                                    OrderHistoryRef : obj.data,
                                })
                            }

                           }

                        }))


                        }else if(obj.data[i].OrderDet.split('#')[j].split('^')[2] == 'Footwear'){

                            PostApiCall.postRequest({

                                orderid : obj.data[i].fld_orderid,
                                productid : obj.data[i].OrderDet.split('#')[j].split('^')[3]
                         
                         },"GetFootwearOrderDetail").then((results2) => 
                         
                           // const objs = JSON.parse(result._bodyText)
                           results2.json().then(obj2 => {
                        
                         
                           if(results2.status == 200 || results2.status==201){

                            // console.log(obj2.data)
                           
                            infData.push(obj2.data)
                            this.setState({
                                ProdData : infData
                            })

                            c1= c1+1

                            if(c== Object.keys(obj.data).length && c1 == cs){
                                Notiflix.Loading.Remove()
                                this.setState({
                                    OrderHistoryData : obj.data,
                                    OrderHistoryRef : obj.data,
                                })
                            }

                           }

                        }))



                        }else if(obj.data[i].OrderDet.split('#')[j].split('^')[2] == 'Socks'){

                            PostApiCall.postRequest({

                                orderid : obj.data[i].fld_orderid,
                                productid : obj.data[i].OrderDet.split('#')[j].split('^')[3]
                         
                         },"GetSocksOrderDetail").then((results2) => 
                         
                           // const objs = JSON.parse(result._bodyText)
                           results2.json().then(obj2 => {
                        
                         
                           if(results2.status == 200 || results2.status==201){

                            // console.log(obj2.data)
                           
                            infData.push(obj2.data)
                            this.setState({
                                ProdData : infData
                            })

                            c1= c1+1

                            if(c== Object.keys(obj.data).length && c1 == cs){
                                Notiflix.Loading.Remove()
                                this.setState({
                                    OrderHistoryData : obj.data,
                                    OrderHistoryRef : obj.data,
                                })
                            }

                           }

                        }))

                        }

                    }

                    // if(c== Object.keys(obj.data).length){
                    //     Notiflix.Loading.Remove()
                    // }
                       
                }

            }
                else{
                    Notiflix.Loading.Remove()
                }
                
                // this.setState({
                //     OrderHistoryData : obj.data,
                //     OrderHistoryRef : obj.data,
                // })

               
              }
            }))

         
        }
    }


    OnOrderAgain(info){

        var cn = 0 
        var cn1 = 0

        var log = localStorage.getItem("CustomerLoginDetails");
          var login = JSON.parse(log);

          Notiflix.Loading.Dots("");

        for(var i =0 ; i<this.state.ProdData.length;i++){

            if(this.state.ProdData[i][0].fld_orderid == info.fld_orderid){
                // console.log(this.state.ProdData[i])

                if(this.state.ProdData[i][0].fld_category == 'Food'){


          

                    PostApiCall.postRequest(
                      {
                        customer_id: login.fld_userid,
                        variant_id: this.state.ProdData[i][0].fld_productid,
                        product_category: "Food",
                        quantity: this.state.ProdData[i][0].fld_quantity,
                        updated_on: moment().format("lll"),
                        updated_by: login.fld_userid,
                      },
                      "AddShoppingCart"
                    ).then((results) =>
                      // const objs = JSON.parse(result._bodyText)
                      results.json().then((obj) => {
                        if (results.status == 200 || results.status == 201 ) {

                            cn = cn +1

                            if(cn == this.state.ProdData.length){

                                Notiflix.Loading.Remove();
                                window.location.href = '/cart'
                                
                            }

        

                        } else {
                        //   Notiflix.Loading.Remove();
                        //   Notiflix.Notify.Failure( "Something went wrong, try again later.");
                        }

                      }))


                }else if(this.state.ProdData[i][0].fld_category == 'Footwear'){

                    PostApiCall.postRequest(
                        {
                          customer_id: login.fld_userid,
                          variant_id: this.state.ProdData[i][0].fld_productid,
                          product_category: "Footwear",
                          quantity: this.state.ProdData[i][0].fld_quantity,
                          updated_on: moment().format("lll"),
                          updated_by: login.fld_userid,
                        },
                        "AddShoppingCart"
                      ).then((results) =>
                        // const objs = JSON.parse(result._bodyText)
                        results.json().then((obj) => {
                          if (results.status == 200 || results.status == 201 ) {
  
                              cn = cn +1
  
                              if(cn == this.state.ProdData.length){
  
                                  Notiflix.Loading.Remove();
                                  window.location.href = '/cart'
                                  
                              }
  
          
  
                          } else {
                          //   Notiflix.Loading.Remove();
                          //   Notiflix.Notify.Failure( "Something went wrong, try again later.");
                          }
  
                        }))
                    
                }else if(this.state.ProdData[i][0].fld_category == 'Socks'){

                    PostApiCall.postRequest(
                        {
                          customer_id: login.fld_userid,
                          variant_id: this.state.ProdData[i][0].fld_productid,
                          product_category: "Socks",
                          quantity: this.state.ProdData[i][0].fld_quantity,
                          updated_on: moment().format("lll"),
                          updated_by: login.fld_userid,
                        },
                        "AddShoppingCart"
                      ).then((results) =>
                        // const objs = JSON.parse(result._bodyText)
                        results.json().then((obj) => {
                          if (results.status == 200 || results.status == 201 ) {
  
                              cn = cn +1
  
                              if(cn == this.state.ProdData.length){
  
                                  Notiflix.Loading.Remove();
                                  window.location.href = '/cart'
                                  
                              }
  
          
  
                          } else {
                          //   Notiflix.Loading.Remove();
                          //   Notiflix.Notify.Failure( "Something went wrong, try again later.");
                          }
  
                        }))
                    
                }

            }else{


                cn = cn +1
                
                if(cn == this.state.ProdData.length){

                    Notiflix.Loading.Remove();
                    window.location.href = '/cart'
                    
                }

            }

        }

    }

  render(){
  return (

    <div className="App">    
<Header></Header>


  <div class="account-section">             
<div class="co">
                <div class="container" style={{background:"none"}}>
                    <div class="row mt-2">
                        <div class="col-lg-9 order-lg-last ">
                            <div class="dashboard-content">
                            
                            <div class="row order-filter-section">
                                {/* <div class="col-md-6 order-filter-section">
                                    <h3 class="orders-placed">Orders placed in the last</h3>
                                    <select class="order-placed-select form-control">
                                        <option>All Orders</option>
                                        <option>1 month</option>
                                        <option>3 months</option>
                                        <option>6 months</option>
                                        <option>12 months</option>
                                    </select>
                                    
                                </div> */}
                                <div class="col-md-6 order-filter-section">
                                <div class="input-group order-search-box">
            <input
            value={this.state.SearchText}
            onChange={(text)=>{
                this.setState({
                    SearchText : text.target.value
                })

                filterDt = []

                if(text.target.value == ''){

                    this.setState({
                        OrderHistoryData : this.state.OrderHistoryRef
                    })

                }
                else{
                    
                    for(var i=0;i<this.state.OrderHistoryRef.length;i++){

                        if(this.state.OrderHistoryRef[i].fld_ordernumber.toLowerCase().includes(text.target.value.toLowerCase())){

                            filterDt.push(this.state.OrderHistoryRef[i])

                        }


                    }

                    this.setState({
                        OrderHistoryData : filterDt
                    })
                }
              
            }}
            class="form-control py-2 border-right-0 border" type="search" placeholder="Search by Order no" id="example-search-input"/>
            <span class="input-group-append">
              <button class="btn btn-outline-secondary border-left-0 border" type="button">
                    <i class="fa fa-search"></i>
              </button>
            </span>
        </div>
                                </div>
                                <div class="clearfix"></div>

                                {this.state.OrderHistoryData.map((info,index)=>(

<div class="col-md-12">
<div class="card">
        <div class="card-header">
                                {info.fld_numofitems} Item{info.fld_numofitems > 1 ? 's': ''}, ORDER COMPLETE
            
            
             <button class="btn btn-primary card-edit"
             style={{color:'white'}}
             onClick={()=>{
                this.OnOrderAgain(info)
            }} >Order Again</button>
            {/* <a href="/returnorder" class="card-edit">Return Order</a> */}
        </div>

        <div class="card-body order-history" style={{    font:"normal 400 1.4rem / 17px 'Open Sans',sans-serif"}}>
          <div class="row ">
              <div class="col-md-3">
                  <p>Order No</p>
                                <h4>{info.fld_ordernumber}</h4>
              </div>
              <div class="col-md-3">
              <p>Date</p>
                <h4>{info.fld_updatedon}</h4>

              </div>
              <div class="col-md-3">
              <p>Address</p>
                  <h4>{info.fld_deliveryaddress},</h4>
                  <h4>{info.fld_shippingstreet},</h4>
                  <h4>{info.fld_shippingcity},</h4>
                  <h4>{info.fld_shippingstate}-{info.fld_shippingpincode}.</h4>
              </div>
              <div class="col-md-3">
                  <p>Total Paid</p>
                  <h4>₹{info.fld_netcost}</h4>
              </div>
          </div>
            <hr></hr>
            {this.state.ProdData.map((dt,i)=>(
                <div>
                {dt[0].fld_orderid == info.fld_orderid ?
                <div class="row">
                <div class="col-md-3">
                    <img src={dt[0].Photo.split('#')[0]} style={{    width: "150px"}}></img>
                </div>
                <div class="col-md-3">
                    <h4 style={{lineHeight:"17px"}}>{dt[0].fld_prodname}
                </h4>
                </div>
                <div class="col-md-3">
                    <h4><span style={{fontWeight:"700"}}>QTY</span> - {dt[0].fld_quantity} </h4>
                    <h4><span style={{fontWeight:"700"}}>Price</span> - {dt[0].fld_price}</h4>
             
                </div>  

                <div class="col-md-3">



<button class="btn btn-primary card-edit"
style={{color:'white'}}
onClick={()=>{
//  console.log(dt[0].fld_orderdetailid)
localStorage.setItem('ReturnMainOrder',JSON.stringify(info))
 localStorage.setItem('ReturnOrderData',JSON.stringify(dt[0]))
 window.location.href = '/returnitem'
}}
style={{display : dt[0].fld_returnable == 'Yes' && (dt[0].fld_returnstatus==null || dt[0].fld_returnstatus=='') ? ((Math.ceil((Math.abs((new Date(info.fld_updatedon)) - new Date()))/(1000*60*60*24))) <= (dt[0].fld_returnabledays)) ? '' : 'none' : 'none'}}
>
Return Item
</button>

<button class="btn btn-primary card-edit"
style={{color:'white'}}
         style={{display : dt[0].fld_returnstatus !=null && dt[0].fld_returnstatus !=''  ? '' : 'none' }}
>
Return Requested
</button>
    {/* <a href="/trackorder" class="track-item">Track Item</a> */}
</div>

                </div>
                
           :''}
           </div>
            ))}
           
        </div>
    </div>

</div>

                                ))}
                               
                             
                               
                            </div>
                           
                            {/* <form action="#">
                                <div class="row">
                                    <div class="col-sm-11">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group required-field">
                                                    <label for="acc-name">First Name</label>
                                                    <input type="text" class="form-control" id="acc-name" name="acc-name" required/>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="acc-mname">First Name</label>
                                                    <input type="text" class="form-control" id="acc-mname" name="acc-mname"/>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-group required-field">
                                                    <label for="acc-lastname">Last Name</label>
                                                    <input type="text" class="form-control" id="acc-lastname" name="acc-lastname" required/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group required-field">
                                    <label for="acc-email">Email</label>
                                    <input type="email" class="form-control" id="acc-email" name="acc-email" required/>
                                </div>

                                <div class="form-group required-field">
                                    <label for="acc-password">Password</label>
                                    <input type="password" class="form-control" id="acc-password" name="acc-password" required/>
                                </div>

                                <div class="mb-2"></div>

                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="change-pass-checkbox" value="1"/>
                                    <label class="custom-control-label" for="change-pass-checkbox">Change Password</label>
                                </div>

                                <div id="account-chage-pass">
                                    <h3 class="mb-2">Change Password</h3>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group required-field">
                                                <label for="acc-pass2">Password</label>
                                                <input type="password" class="form-control" id="acc-pass2" name="acc-pass2"/>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group required-field">
                                                <label for="acc-pass3">Confirm Password</label>
                                                <input type="password" class="form-control" id="acc-pass3" name="acc-pass3"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="required text-right">* Required Field</div>
                                <div class="form-footer">
                                    <a href="#"><i class="icon-angle-double-left"></i>Back</a>

                                    <div class="form-footer-right">
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </form> */}
                        </div>
                        </div>
                        <aside class="sidebar col-lg-3">
                            <div class="widget widget-dashboard">

                            <ul class="list">
                                    <li >
                                        <a href="/account">Account Dashboard</a>
                                        <p>Get an Overview of your Account</p>
                                    </li>

                                    <li class="">
                                        <a href="/orderhistory">My Orders</a>
                                        <p>Check Shipping Status, Re Order Items</p>
                                    </li>

                                    <li class="">
                                        <a href="/wishlist">My Wishlist</a>
                                        <p>Add item to cart, Remove item</p>
                                    </li>

                                    <li class="" >
                                        <a href="/editprofile">My Profile</a>
                                        <p>Your Name, Phone Number, Email</p>
                                    </li>

                                    <li class="">
                                        <a href="/addressbook">My Address Book</a>
                                        <p>Add, Edit address</p>
                                    </li>
                                    <li class="">
                                        <a href="/diabeticprofile">Diabetic Profile</a>
                                        <p>Types of Diabetes</p>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            </div>
 <Footer></Footer>                        
 </div>
  );
  }
}

export default Orderhistory;
