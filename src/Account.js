import React from 'react';
import logo from './logo.svg';

import Header from './Header'
import Footer from './Footer'
// // import News from './News';
import Notiflix from "notiflix-react";

class Account extends React.Component {

    constructor(props){
        super(props)
        this.state={
            ProfileData : []
        }
    }


    componentDidMount() {
       
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
          });


          var login=localStorage.getItem('CustomerLoginDetails');
          var ProfileData=JSON.parse(login)

          this.setState({
              ProfileData : ProfileData
          })

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
                            <h2>Account Dashboard</h2>
                            <div class="row">
                                <div class="col-md-6">
                                <div class="card">
                                        <div class="card-header">
                                            Contact Information
                                            <a href="/editprofile" class="card-edit">Edit your Account Details</a>
                                        </div>

                                        <div class="card-body">
                                            <p>
  <i class="fas fa-user" style={{fontSize:"12px",marginRight:"7px"}}></i> {this.state.ProfileData.fld_name}</p>
                                            <p><i class="fas fa-envelope" style={{fontSize:"12px",marginRight:"7px"}}></i> {this.state.ProfileData.fld_email}</p>
                                            <p><i class="fas fa-phone-volume" style={{fontSize:"12px",marginRight:"7px"}}></i> {this.state.ProfileData.fld_mobile}
                                                
                                            </p>
                                      
                                        </div>
                                    </div>
                            
                                </div>
                            </div>
                           
                          
                        </div>
                        </div>
                        <aside class="sidebar col-lg-3">
                            <div class="widget widget-dashboard d-md-block d-sm-none d-xs-none">

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

export default Account;
