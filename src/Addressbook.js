/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import logo from './logo.svg';

import Header from './Header'
import Footer from './Footer'
import News from './News';
import Menu from './Header'
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";


class Addressbook extends React.Component {


    constructor(props){
        super(props)
        this.state={
            AddressData : [],
           
           
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

            
            },"GetAddressCustomer").then((results) => 
            
              // const objs = JSON.parse(result._bodyText)
              results.json().then(obj => {
   
            
              if(results.status == 200 || results.status==201){

                this.setState({
                    AddressData : obj.data
                })

                Notiflix.Loading.Remove()
              }
            }))

         
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
                            <h2>Address Book</h2>
                            <div class="row">

                                    {this.state.AddressData.map((dt,index)=>(
  <div class="col-md-6">
  <div class="card">
          <div class="card-header">
             Address
              
              <a 
              onClick={()=>{

                Notiflix.Loading.Dots('');

                PostApiCall.postRequest({
    
                    id : dt.fld_id,
                    // customer_id : 13,
    
                
                },"DeleteCustomerAddress").then((results) => 
                
                  // const objs = JSON.parse(result._bodyText)
                  results.json().then(obj => {
       
                
                  if(results.status == 200 || results.status==201){

                    Notiflix.Notify.Success('Address book has been updated.')
                    Notiflix.Loading.Remove()
                    window.location.reload()

                  }}
                  ))


              }}
              class="card-edit">Delete</a>
              <a 
              onClick={()=>{
                  localStorage.setItem('AddressData',JSON.stringify(dt))
                  window.location.href = '/editaddress'
              }}
              class="card-edit">Edit</a>
          </div>

          <div class="card-body" style={{    font:"normal 400 1.4rem / 17px 'Open Sans',sans-serif"}}>
                                    <p><b>{dt.fld_name}</b></p>
            <p>{dt.fld_address},</p>
          <p>{dt.fld_street}, </p>
                                    <p>{dt.fld_landmark}</p>
                                    <p>{dt.fld_city} -{dt.fld_pincode}</p>
          <p>{dt.fld_state}, {dt.fld_country}.</p>
              
          </div>
      </div>

  </div>

                                    ))}

                              
                                <div class="col-md-6">
                                <div class="card">
                                        <div class="card-header">
                                           Address
                                            
                                            <a href="/addnewaddress" class="card-edit">Add new address</a>
                                            
                                        </div>

                                        {/* <div class="card-body" style={{    font:"normal 400 1.4rem / 17px 'Open Sans',sans-serif"}}>
                                            <p>Saravan Kumar</p>
                                          <p>No - 167, 1st lain,</p>
                                        <p>P.V Koil Street, </p>
                                        <p>Royapuram</p>
                                        <p>Chennai -13</p>
                                        <p>Tamil Nadu, India.</p>
                                            
                                        </div> */}
                                    </div>
                            
                                </div>
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
                                        <p>Your Name, Phone Number, Password</p>
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

export default Addressbook;
