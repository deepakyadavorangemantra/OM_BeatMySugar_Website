import React from 'react';
import logo from './logo.svg';

import Header from './Header'
import Footer from './Footer'
import News from './News';



class Returnorderpayment extends React.Component {


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
                               
                               
                                <div class="clearfix"></div>
                                <div class="col-md-12">
                                <div class="card">
                                        <div class="card-header">
                                            Return Order                                            
                                            
                                            
                                        </div>

                                        <div class="card-body order-history" style={{    font:"normal 400 1.4rem / 17px 'Open Sans',sans-serif"}}>
                                         
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <img src="assets/images/accu-check.jpg" style={{    width: "150px"}}></img>
                                                </div>
                                                <div class="col-md-4">
                                                <p>Order No</p>
                                                  <h4>BMS12012</h4>
                                                    <h4 style={{lineHeight:"17px"}}>Accu Chek Active Meter + 10 Strips Free
</h4>
<h4><span style={{fontWeight:"700"}}>QTY</span> - 3 </h4>
<p>Total Paid</p>
                                                  <h4>Rs.166.00</h4>
                                                </div>
                                                <div class="col-md-3">
                                                   
                                                <p>Address</p>
                                                  <h4>No 167, 1st Lane,</h4>
                                                  <h4>P.V Koil St,</h4>
                                                  <h4>Royapuram,</h4>
                                                  <h4>Chennai-13.</h4>
                                                   <a href="" style={{textDecoration:"underline!important"}}>Change Address</a>
                                                </div>  
                                               
                                                <div class="col-md-3">
                                                <a href="" class="btn return-btn">Return Order</a>
                                                <a href="" class="btn return-btn">Cancel</a>
                                                </div>
                                            </div>
                                        </div>
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

export default Returnorderpayment;
