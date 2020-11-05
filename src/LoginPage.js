import React from 'react';
import logo from './logo.svg';
import './index.css';

import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';

// import GetApiCall from "./GetApi";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import moment from 'moment'
import {Navbar, Form, Nav, NavDropdown, FormControl, Button, Dropdown   } from 'react-bootstrap';





class LoginPage extends React.Component {

  constructor(props){
    super(props)
    this.state={
      email : '',
      password : '',
      EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    }
  }

  



      onLogin(){

        
        console.log('clicked')
       
        if(this.state.email != ''){

          if(this.state.EmailRegex.test(this.state.email)){

            if(this.state.password != ''){

              Notiflix.Loading.Dots('Please wait...');

              PostApiCall.postRequest({

                 email : this.state.email,
                 password : this.state.password,
                 login_type : 'Login',
                 last_action_date_time :  moment().format('lll').toString()
               
             
             },"CustomerLoginAuth").then((results) => 
             
      
               results.json().then(obj => {

             
               if(results.status == 200 || results.status == 201){

                localStorage.setItem('CustomerLogin',JSON.stringify(obj.data[0]))

                Notiflix.Loading.Remove()
                window.location.reload()


               }else{
                Notiflix.Loading.Remove()
                Notiflix.Notify.Failure(obj.data);
               }

              }))
            }

            else
            {
              Notiflix.Notify.Failure('Please enter Password.');
            }

          }

          else
          {
            Notiflix.Notify.Failure('Please enter valid Email Address.');
          }

        }else
        {
          Notiflix.Notify.Failure('Please enter your Email Address.');
        }
      }


       responseFacebook = (response) => {
    
        if(response.name != null && response.name != undefined ){


          Notiflix.Loading.Dots('Please wait...');

          PostApiCall.postRequest({
  
              name : response.name,
              email : response.email,
              mobile : '',
              password : '',
              gender : '',
              dob : '',
              age : '',
              source : 'Website',
              login_type : 'Facebook',
              updated_on : moment().format('lll').toString(),
              updated_by : 0
           
           },"RegisterCustomer").then((results) => 
           
         
             results.json().then(obj => {
  
           
             if(results.status == 200 || results.status == 201){


              PostApiCall.postRequest({
    
                user_email : response.email,
               login_type : 'Login',
               last_action_date_time : moment().format('lll').toString()
    
              
              },"AddUserLoginSession").then((results1) => 
              
            
                results1.json().then(obj => {
    
    
                if(results1.status == 200 || results1.status==201){
             
                    
  
              const data = {
                fld_name : response.name,
                fld_email : response.email
              }
  
              localStorage.setItem('CustomerLogin',JSON.stringify(data))
  
                  Notiflix.Loading.Remove()
                  window.location.reload()
  
            }
            }))
  
             }
  
            }))

        }
        
      }
  
     responseGoogle = (response) => {
        console.log(response);

        if(response.profileObj != null && response.profileObj != undefined){

        Notiflix.Loading.Dots('Please wait...');

        PostApiCall.postRequest({

            name : response.profileObj.name,
            email : response.profileObj.email,
            mobile : '',
            password : '',
            gender : '',
            dob : '',
            age : '',
            source : 'Website',
            login_type : 'Google',
            updated_on : moment().format('lll').toString(),
            updated_by : 0
         
         },"RegisterCustomer").then((results) => 
         
           
           results.json().then(obj => {

         
           if(results.status == 200 || results.status == 201){

            PostApiCall.postRequest({
    
              user_email : response.profileObj.email,
             login_type : 'Login',
             last_action_date_time : moment().format('lll').toString()
  
            
            },"AddUserLoginSession").then((results1) => 
            
          
              results1.json().then(obj => {
  
  
              if(results1.status == 200 || results1.status==201){
           
           
            const data = {
              fld_name : response.profileObj.name,
              fld_email : response.profileObj.email
            }

            localStorage.setItem('CustomerLogin',JSON.stringify(data))

                Notiflix.Loading.Remove()
                window.location.reload()

              }
            }))

           }

          }))
        }
      }

  render(){
  return (

    <div className="App">

                                    <div>
                                      
                                     
                                     <h3 className="welcomefont text-center">Login</h3>
                                           
                                      
                                       <div class="input-box">
                                           <input type="text" placeholder="Email" class="input-boxes" 
                                           value={this.state.email}
                                           onChange={(text)=>{
                                             this.setState({
                                               email : text.target.value 
                                             })
                                           }}
                                           />
                                           <input type="password" placeholder="Password" class="input-boxes"
                                            value={this.state.password}
                                           onChange={(text)=>{
                                             this.setState({
                                               password : text.target.value
                                             })
                                           }}
                                           />
                                           <button class="signin-btn" onClick={this.onLogin.bind(this)} >Sign In</button>
                                          
                                           <p class="new-customer-btn">New Customer ? <span class="register" onClick={()=>{
                                           
                                            window.location.href = '/RegisterWithUs'
                                           }}>Register</span></p>
                                      
                                       </div>
                                       
                                  
                      
                      
                    </div>


                  
                       
                
      
   
 </div>
  );
  }
}

export default LoginPage;
