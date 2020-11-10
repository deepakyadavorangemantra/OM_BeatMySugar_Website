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
             
               // const objs = JSON.parse(result._bodyText)
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
        // console.log(response);
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
           
             // const objs = JSON.parse(result._bodyText)
             results.json().then(obj => {
  
           
             if(results.status == 200 || results.status == 201){


              PostApiCall.postRequest({
    
                user_email : response.email,
               login_type : 'Login',
               last_action_date_time : moment().format('lll').toString()
    
              
              },"AddUserLoginSession").then((results1) => 
              
                // const objs = JSON.parse(result._bodyText)
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
         
           // const objs = JSON.parse(result._bodyText)
           results.json().then(obj => {

         
           if(results.status == 200 || results.status == 201){

            PostApiCall.postRequest({
    
              user_email : response.profileObj.email,
             login_type : 'Login',
             last_action_date_time : moment().format('lll').toString()
  
            
            },"AddUserLoginSession").then((results1) => 
            
              // const objs = JSON.parse(result._bodyText)
              results1.json().then(obj => {
  
  
              if(results1.status == 200 || results1.status==201){
           
                  
           
            // console.log(obj.data)
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
                                       {/* <img src="assets/images/facebook.jpg"/>
                                       
                                    
                                           <img src="assets/images/google.jpg" class="margin-top-5" onClick={()=>{
                                          firebase.auth()
                                      
                                       }}  /> */}
                                        
                                          
                                        {/* <FacebookLogin
                                                  
                                                appId="481436436037785" //APP ID NOT CREATED YET
                                                fields="name,email,picture"
                                                callback={this.responseFacebook}
                                                className="acount-btn dropbtn"
                                              /> */}
                                              
                                              {/* <br />
                                              <br /> */}


                                              {/* <GoogleLogin
                                                className="googlekeybutton"
                                                clientId="247460357089-maqdecd495ligtqftbvddlm9p6p36mic.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                                                buttonText="LOGIN WITH GOOGLE"
                                                fields="name,email,picture"
                                                onSuccess={this.responseGoogle}
                                                onFailure={this.responseGoogle}
                                              /> */}
                                     
                                     <h3 className="welcomefont text-center">Login</h3>
                                           
                                        {/* <p class="text-center or-text">(OR)</p> */}
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
                                           {/* <p><a href="#" class="forgot-pass">Forgot Password ?</a></p> */}
                                           {/* <p class="new-customer-btn">New Customer ? <a href="/RegisterWithUs" class="register">Register</a></p> */}
                                           <p class="new-customer-btn">New Customer ? <span class="register" onClick={()=>{
                                            //  this.props.history.push('/RegisterWithUs')
                                            window.location.href = '/RegisterWithUs'
                                           }}>Register</span></p>
                                      
                                       </div>
                                       
                                  
                      
                      
                    </div>


                    {/* <div>
                                    <h3 className="welcomefont">Welcome to Beat My Sugar</h3>
                                       
                                  
                                    <a class="acount-btn dropbtn" style={{textAlign:'center'}}>Logout</a>
                      
                    </div> */}
                       
                       
                
      
   
 </div>
  );
  }
}

export default LoginPage;
