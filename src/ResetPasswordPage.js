import React from 'react';
import Header from './Header'
import Footer from './Footer'
import OtpInput from 'react-otp-input';
import Menu from './Header';
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import moment from 'moment'

class ResetPasswordPage extends React.Component
{
    constructor(props){
        super(props)
        this.state ={
            OTPView : true,
            MailerOtp : '',
            CustomerEmail : '',
            newPass : '',
            conPass : '',

            isVisibleCon : false,
            isVisiblePass : false

        }
    }

    componentDidMount(){
        var data = localStorage.getItem('OTPForgot')
        var customer = JSON.parse(data)
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
            //  #507dc0'
          });
// console.log(customer)
if(customer != null){
    this.setState({
        MailerOtp : customer.otp,
        CustomerEmail : customer.email
    })
}
        
    }

    Resend(){
        if(this.state.ResendCount > 3){
    
            Notiflix.Notify.Info('You exceeded the limit to resend OTP.');
    
        }else{
        var random =  Math.floor(100000 + Math.random() * 900000)
    
        PostApiCall.postRequest({
    
            email : this.state.CustomerEmail,
            otp : random
          
         
         },"ForgotPasswordMailer").then((results2) => 
         
           // const objs = JSON.parse(result._bodyText)
           results2.json().then(obj2 => {
    
         
           if(results2.status == 200 || results2.status == 201){
    
            this.setState({
                ResendCount : this.state.ResendCount + 1,
                MailerOtp : random
            })
           }
        }))
    }
    
    }

    ResetPass(){
        if(this.state.newPass != ''){
            if(this.state.conPass != ''){
                if(this.state.newPass == this.state.conPass){

                    Notiflix.Loading.Dots('Please wait...');
    
                            PostApiCall.postRequest({
    
                                 
                                    email : this.state.CustomerEmail,
                                    password : this.state.newPass,
                                    
                                 
                                 },"UpdateCustomerPassword").then((results) => 
                                 
                                  
                                   results.json().then(obj => {
                 
                                 
                                   if(results.status == 200 || results.status == 201){
    
    
    
                                    Notiflix.Loading.Remove()
    
                                    Notiflix.Notify.Success('You password has been successfully recovered.');

                                    localStorage.removeItem('OTPForgot')
                                    window.location.href= "/login"
                       }
    
    
                    }))


                }else{
                    Notiflix.Notify.Failure('Password Mismatch.'); 
                }
            }else{
                Notiflix.Notify.Failure('Please enter Confirm Password.');  
            }

        }else{
            Notiflix.Notify.Failure('Please enter New Password.'); 
        }
    }


    onSave(){

 

        if(this.state.EnteredOtp != ''){
    
            if(this.state.EnteredOtp == this.state.MailerOtp){
    
                this.setState({
                    OTPView : false
                })
    
                // Notiflix.Loading.Dots('Please wait...');
    
                //             PostApiCall.postRequest({
    
                //                     name : this.state.CustomerData.name,
                //                     email : this.state.CustomerData.email,
                //                     mobile : this.state.CustomerData.mobile,
                //                     password : this.state.CustomerData.password,
                //                     gender : this.state.CustomerData.gender,
                //                     dob : this.state.CustomerData.dob,
                //                     age : this.state.CustomerData.age,
                //                     source :this.state.CustomerData.source,
                //                     login_type : this.state.CustomerData.login_type,
                //                     updated_on : this.state.CustomerData.updated_on,
                //                     updated_by : this.state.CustomerData.updated_by
                                 
                //                  },"RegisterCustomer").then((results) => 
                                 
                //                    // const objs = JSON.parse(result._bodyText)
                //                    results.json().then(obj => {
                 
                                 
                //                    if(results.status == 200 || results.status == 201){
    
    
                //                     // console.log(JSON.parse(JSON.stringify(obj.data[0])).Result)
                //                     // console.log((JSON.parse(JSON.stringify(obj.data[0]))).Result)
    
                //                     // if(((JSON.parse(JSON.stringify(obj.data[0]))).Result) == 'Successfully Registered'){
    
                //                         PostApiCall.postRequest({
    
                //                             name : this.state.CustomerData.name,
                //                             email : this.state.CustomerData.email,
                                          
                                         
                //                          },"CustomerRegistraionMailer").then((results1) => 
                                         
                //                            // const objs = JSON.parse(result._bodyText)
                //                            results1.json().then(obj1 => {
                         
                                         
                //                            if(results1.status == 200 || results1.status == 201){
    
                //                             Notiflix.Loading.Remove()
    
                //                             Notiflix.Notify.Success('You are successfully registered with BeatMySugar.');
    
                //                             window.location.href= "/"
                                        
                                    
    
                                 
                                        
                //                         }
                //                     }))
                //                     // }
                //                     // else
                //                     // {
                //                     //     Notiflix.Notify.Failure('Email Address Already Registered.');
                //                     // }
                //        }
    
    
                //     }))
    
            }else
            {
                Notiflix.Notify.Failure('Invalid OTP.');   
            }
    
        }else
        {
            Notiflix.Notify.Failure('Please enter OTP to Register.');
        }
    }
    


    render()
    {
        if(this.state.OTPView){
            return(
              <div>
              <Menu></Menu>
                  <main >
              <div class="container product-section">
              <div class="row ">
                  <div class="col-lg-4 col-md-3 col-sm-3"></div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                      <div class="login-section">
                          <h3>Enter One Time Password (OTP)</h3>
            <h5>One Time Password (OTP) has been sent to your <br/>email <b>{this.state.CustomerEmail}</b><br/> Please enter the same to reset your password.</h5>
                          
                          <div class="input-boxes reset-password" >
                            
                          <div>
    <OtpInput
    onChange={otp => this.setState({
    EnteredOtp : otp
    
    })}
    value = {this.state.EnteredOtp}
    numInputs={6}
    //   separator={<span>-<span>}
    inputStyle={{
    width : '5rem'
    }}
    onKeyPress={(e) => {
        if(e.key === 'Enter'){
            this.onSave()
        }
      }} 
    
    
    />
    </div>
    
                          
                              <button class="login-page-btn" onClick={this.onSave.bind(this)} >Submit</button>
                          </div>
                          <div class="userlinks">
                            
                              <a class="account" style={{color : '#507dbe'}} onClick={this.Resend.bind(this)}>Resend OTP</a>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-4 col-md-3 col-sm-3"></div>
              </div>
          </div>
          </main>
          <Footer></Footer>
          </div>
            )
          }
          else{
    
        return(
            <div>
                <Header></Header>
                <main class="main">
           

                <div class="container product-section">
              <div class="row ">
              <div class="col-lg-4 col-md-3 col-sm-3"></div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                      <div class="login-section">
                          <h3>Reset your Password</h3>
                          {/* <h5>Enter your new password twice<br/> so we can verify you typed it in correctly.</h5> */}

                         
    
                          
                          <div class="input-boxes-login">
                            {/* <label for="reset-email">New Password</label> */}
                            <input  
                            type={this.state.isVisiblePass ? 'text' : "Password"}
                            placeholder="Enter New Password" 
                            value={this.state.newPass}
                            onChange={(text)=>{
                                this.setState({
                                    newPass : text.target.value
                                })
                            }}
                            />
                            <span class="password-visible-reset"><i class="fas fa-eye" style={{color : this.state.isVisiblePass ? '#507dbe' : 'grey'}} onClick={()=>{
                                                            this.setState({
                                                                isVisiblePass : !this.state.isVisiblePass
                                                            })
                                                        }}></i></span>
                        

                        {/* <div class="form-group required-field"> */}
                            {/* <label for="reset-email">Confirm New Password</label> */}
                            <input placeholder="Reenter Password"
                            type={this.state.isVisibleCon ? 'text' : "Password"} 
                             value={this.state.conPass}
                             onKeyPress={(e) => {
                                if(e.key === 'Enter'){
                                    this.ResetPass()
                                }
                              }} 
                            onChange={(text)=>{
                                
                                this.setState({
                                    conPass : text.target.value
                                })
                            }}
                            />
                            <span class="password-visible-reset"><i class="fas fa-eye" style={{color : this.state.isVisibleCon ? '#507dbe' : 'grey'}} onClick={()=>{
                                                            this.setState({
                                                                isVisibleCon : !this.state.isVisibleCon
                                                            })
                                                        }}></i></span>
                        {/* </div> */}

                        {/* <div class="form-footer"> */}
                            <button class="login-page-btn" onClick={this.ResetPass.bind(this)}>Save</button>
                        {/* </div> */}
                        </div>
                    {/* </form> */}
                        </div>
                    </div>
                   
                </div>
            </div>
        </main>
                <Footer></Footer>
            </div>
          
        )
          }
    }
}

export default ResetPasswordPage;