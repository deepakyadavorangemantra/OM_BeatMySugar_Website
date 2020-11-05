/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import logo from './logo.svg';

import Header from './Header'
import Footer from './Footer'
// // import News from './News';
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
          });

        var log = localStorage.getItem('CustomerLoginDetails')
        var login = JSON.parse(log)


        var arr = []
        if(login != null && login != ''){


            Notiflix.Loading.Dots('');

            PostApiCall.postRequest({
    
                customer_id : login.fld_userid,
      

            
            },"GetAddressCustomer").then((results) => 
            
     
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
       
    
                
                },"DeleteCustomerAddress").then((results) => 
                

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

                                       
                                    </div>
                            
                                </div>
                            </div>
                           
                            
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
