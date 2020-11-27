import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
// import GetApiCall from "./GetApi";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert'; // Import
import OtpInput from "react-otp-input";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isVisible: false,
      password: "",
      NumRegex: /^0|[0-9]\d*$/,
      MobileRegex: /^[0-9]*$/,
      AlphaNumericRegex: /^[a-zA-Z0-9]*$/,
      SpecialRegex: /[-!$%^&*()_+|~=`'"{}\[\]:\/;<>?,.@#]/,
      EmailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      UrlRegex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,

      OTPView: false,
      EnteredOtp: "",
      IsPasswordEnter : false,
      ButtonText : 'Login',
      OtpVisible : false,


      CustomerData: [],
      ResendCount: 0,
      MobileOtp: "",
    };
  }
  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    });
  }

  onLogin() {
    // console.log('clicked')

    if(this.state.ButtonText == 'Send OTP'){

      if(this.state.email != ''){

        Notiflix.Loading.Dots()

        PostApiCall.postRequest(
          {
            email: '',
            mobile: this.state.email,
          },
          "IfMobileExists"
        ).then((results1) =>
          // const objs = JSON.parse(result._bodyText)
          results1.json().then((obj1) => {
            if (results1.status == 200 || results1.status == 201) {

              this.setState({
                CustomerData : obj1.data[0]
              })

              var random = Math.floor(100000 + Math.random() * 900000);

              fetch(
                "https://www.instaalerts.zone/SendSMS/sendmsg.php?uname=globaltrendz&pass=abc321&send=BMSIND&dest=" +
                  this.state.email +
                  "&msg=Hi " +
                  JSON.parse(JSON.stringify(obj1.data[0])).fld_name + 
                  ", OTP for login is :" +
                  random +
                  ". DO NOT share this OTP with anyone. Team BeatMySugar"
              ).then((res) => res.json());

              this.setState({
                OtpVisible : true,
                MobileOtp : random
              })
              Notiflix.Loading.Remove()

            }else
            {
              Notiflix.Loading.Remove()
              Notiflix.Notify.Failure('Your mobile is not regitered with us, Click Create Account to Register.');
          

            }
          }))


      }else
      {
        Notiflix.Notify.Failure("Please enter your Mobile.");
      }





    }else{

      this.OnLoginInitiatedEmail()

    }

  
  }



  OnLoginViaOTP() {
    // console.log(this.state.MobileOtp);

    if (this.state.EnteredOtp != "") {
      if (this.state.EnteredOtp == this.state.MobileOtp) {


        Notiflix.Loading.Dots()

        PostApiCall.postRequest(
          {
            mobile: this.state.email,
          },
          "CustomerAuthMobile"
        ).then((results) =>
          // const objs = JSON.parse(result._bodyText)
          results.json().then((obj) => {
            if (results.status == 200 || results.status == 201) {
              localStorage.setItem(
                "CustomerLoginDetails",
                JSON.stringify(obj.data[0])
              );

              Notiflix.Loading.Remove();
              // window.location.reload()

              var path = JSON.parse(localStorage.getItem("PathCame"));
          

              if (path != null && path != "") {
                localStorage.removeItem('PathCame')
                window.location.href = "/cart";
              }else{
                window.location.href = "/";
              }
          
            } else {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure(obj.data);
            }
          })
        );

      } else {
        Notiflix.Notify.Failure("Invalid OTP.");
      }
    } else {
      Notiflix.Notify.Failure("Please enter OTP.");
    }
  }


  OnLoginInitiatedEmail(){
    if (this.state.email != "") {
      // if(this.state.EmailRegex.test(this.state.email)){

      if (this.state.password != "") {
        Notiflix.Loading.Dots("Please wait...");


    
        PostApiCall.postRequest(
          {
            email: this.state.email,
            password: this.state.password,
            login_type: "Login",
            last_action_date_time: moment().format("lll").toString(),
          },
          "CustomerLoginAuth"
        ).then((results) =>
          // const objs = JSON.parse(result._bodyText)
          results.json().then((obj) => {
            if (results.status == 200 || results.status == 201) {
              localStorage.setItem(
                "CustomerLoginDetails",
                JSON.stringify(obj.data[0])
              );

              Notiflix.Loading.Remove();
              // window.location.reload()
              var path = JSON.parse(localStorage.getItem("PathCame"));
          

              if (path != null && path != "") {
                localStorage.removeItem('PathCame')
                window.location.href = "/cart";
              }else{
                window.location.href = "/";
              }


            } else {
              Notiflix.Loading.Remove();
              if(obj.data == 'Email Not Verified.'){

                confirmAlert({
                  title: 'Email Not Verified',
                  message: 'Your email is not yet verified, do you want to verify it?',
                  buttons: [
                    {
                      label: 'Send Verification Link',
                      onClick: () => {
                          // Notiflix.Loading.Dots('');
                          // console.log('send verify mail mailer.')

                          PostApiCall.postRequest(
                            {
           
                              email: this.state.email,
                
                            },
                            "GetUserInfoEmail"
                          ).then((resultse) =>
                            // const objs = JSON.parse(result._bodyText)
                            resultse.json().then((obje) => {
                              if (
                                resultse.status == 200 ||
                                resultse.status == 201
                              ) {


                           PostApiCall.postRequest(
                          {
                            name: JSON.parse(JSON.stringify(obje.data[0])).fld_name,
                            email: this.state.email,
                            otp: '123456',
                          },
                          "VerifyMailMailer"
                        ).then((results2) =>
                          // const objs = JSON.parse(result._bodyText)
                          results2.json().then((obj2) => {
                            if (
                              results2.status == 200 ||
                              results2.status == 201
                            ) {

                            }
                          }))

                        }
                      }))



                        }
                      },
                      {
                        label: 'Continue Login with Mobile',
                        onClick: () =>{
                          this.setState({
                            ButtonText : 'Login',
                            email : '',
                            password : '',
                            IsPasswordEnter : false

                          })
                        }
                      }
                    ]
                  });

            
              }else if(obj.data == 'Invalid Email.')
              {

                Notiflix.Notify.Failure('Your email is not regitered with us, Click Create Account to Register.');
                // Notiflix.Notify.Failure('You have entered an invalid email address.');
              }else
              {
                Notiflix.Notify.Failure(obj.data)
              }
              // Notiflix.Notify.Failure(obj.data);
            }
          })
        );
      } else {
        Notiflix.Notify.Failure("Please enter Password.");
      }

      // }

      // else
      // {
      //   Notiflix.Notify.Failure('Please enter valid Email Address.');
      // }
    } else {
      Notiflix.Notify.Failure("Please enter your Email.");
    }
  }

  responseFacebook = (response) => {
    // console.log(response);
    if (response.name != null && response.name != undefined) {
      Notiflix.Loading.Dots("Please wait...");

      PostApiCall.postRequest(
        {
          name: response.name,
          email: response.email,
          mobile: "",
          password: "",
          gender: "",
          dob: "",
          age: "",
          source: "Website",
          login_type: "Facebook",
          updated_on: moment().format("lll").toString(),
          updated_by: 0,
        },
        "RegisterCustomer"
      ).then((results) =>
        // const objs = JSON.parse(result._bodyText)
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
            PostApiCall.postRequest(
              {
                user_email: response.email,
                login_type: "Login",
                last_action_date_time: moment().format("lll").toString(),
              },
              "AddUserLoginSession"
            ).then((results1) =>
              // const objs = JSON.parse(result._bodyText)
              results1.json().then((obj) => {
                if (results1.status == 200 || results1.status == 201) {
                  const data = {
                    fld_name: response.name,
                    fld_email: response.email,
                  };

                  localStorage.setItem("CustomerLogin", JSON.stringify(data));

                  Notiflix.Loading.Remove();
                  window.location.reload();
                }
              })
            );
          }
        })
      );
    }
  };

  responseGoogle = (response) => {
    // console.log(response);

    if (response.profileObj != null && response.profileObj != undefined) {
      Notiflix.Loading.Dots("Please wait...");

      PostApiCall.postRequest(
        {
          name: response.profileObj.name,
          email: response.profileObj.email,
          mobile: "",
          password: "",
          gender: "",
          dob: "",
          age: "",
          source: "Website",
          login_type: "Google",
          updated_on: moment().format("lll").toString(),
          updated_by: 0,
        },
        "RegisterCustomer"
      ).then((results) =>
        // const objs = JSON.parse(result._bodyText)
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
            PostApiCall.postRequest(
              {
                user_email: response.profileObj.email,
                login_type: "Login",
                last_action_date_time: moment().format("lll").toString(),
              },
              "AddUserLoginSession"
            ).then((results1) =>
              // const objs = JSON.parse(result._bodyText)
              results1.json().then((obj) => {
                if (results1.status == 200 || results1.status == 201) {
                  // console.log(obj.data)
                  const data = {
                    fld_name: response.profileObj.name,
                    fld_email: response.profileObj.email,
                  };

                  localStorage.setItem("CustomerLogin", JSON.stringify(data));

                  Notiflix.Loading.Remove();
                  window.location.reload();
                }
              })
            );
          }
        })
      );
    } else {
      Notiflix.Notify.Failure("Something went wrong, try again later.");
    }
  };

  Recover() {
    if (this.state.email != "") {
      Notiflix.Loading.Dots("Please wait...");

      var random = Math.floor(100000 + Math.random() * 900000);


      PostApiCall.postRequest(
        {
          email: this.state.email,
          mobile: '',
        },
        "IfEmailExists"
      ).then((results1) =>
        // const objs = JSON.parse(result._bodyText)
        results1.json().then((obj1) => {
          // console.log(obj1.data)
          if (results1.status == 200 || results1.status == 201) {

            Notiflix.Loading.Remove();
            Notiflix.Notify.Failure("Email Address doesn't exists.");
            
          }
          else{

            PostApiCall.postRequest(
              {
                email: this.state.email,
              },
              "GetIfEmailVerified"
            ).then((resultsv) =>
              // const objs = JSON.parse(result._bodyText)
              resultsv.json().then((objv) => {
                // console.log(obj1.data)
                if (resultsv.status == 200 || resultsv.status == 201) {

            PostApiCall.postRequest(
              {
                email: this.state.email
              },
              "GetCustomerEmailDetails"
            ).then((results3) =>
              // const objs = JSON.parse(result._bodyText)
              results3.json().then((obj3) => {
                // console.log(obj1.data)
                if (results3.status == 200 || results3.status == 201) {
            
            PostApiCall.postRequest(
              {
                name : JSON.parse(JSON.stringify(obj3.data[0])).fld_name,
                email: this.state.email,
                otp: random,
              },
              "ForgotPasswordMailer"
            ).then((results2) =>
              // const objs = JSON.parse(result._bodyText)
              results2.json().then((obj2) => {
                if (results2.status == 200 || results2.status == 201) {
                  const data = {
                    otp: random,
                    email: this.state.email,
                  };
                  localStorage.setItem("OTPForgot", JSON.stringify(data));
                  Notiflix.Loading.Remove();
                  window.location.href = "/recoverpassword";
                }
              })
            );
          }
        }))

      }
      else
      {
        Notiflix.Loading.Remove();
        Notiflix.Notify.Failure("Email Address is not verified.");
      }
    }))
   
      }
    }))
    } else {
      Notiflix.Notify.Failure("Please enter your Email Address.");
    }
  }




  Resend() {
    if (this.state.ResendCount > 3) {
      Notiflix.Notify.Info("You exceeded the limit to resend OTP.");
    } else {
      var random = Math.floor(100000 + Math.random() * 900000);

      this.setState({
        MobileOtp: random,
      });

      fetch(
        "https://www.instaalerts.zone/SendSMS/sendmsg.php?uname=globaltrendz&pass=abc321&send=BMSIND&dest=" +
          this.state.CustomerData.fld_mobile +
          "&msg=Hi " +
          this.state.CustomerData.fld_name +
          ", OTP for login verification is :" +
          random +
          ". DO NOT share this OTP with anyone. BeatMySugar.com"
      ).then((response) => response.json());

      Notiflix.Notify.Info("OTP has been sent to your mobile number.");
      this.setState({
        ResendCount: this.state.ResendCount + 1,
        MobileOtp: random,
      });
    }
  }

  render() {
    if(this.state.OtpVisible){
      return (
        <div>
          <Menu></Menu>
          <main>
            <div class="container product-section">
              <div class="row ">
              <div class="col-lg-4 col-md-3 col-sm-3"></div>
                <div class="col-lg-4 col-md-6 col-sm-6">
                  <div class="login-section">
                    {/* <h3>Enter OTP</h3> */}
                    <h3>Enter One Time Password (OTP)</h3>
                    <h5>
                      One Time Password (OTP) has been sent to your <br />
                      mobile number <b>{this.state.email}</b>
                      <br /> Please enter the same to verify you mobile.
                    </h5>
  
                    <div class="input-boxes otp-field">
                      <div >
                        <OtpInput
                          class="otp-box"
                          onChange={(otp) =>
                            this.setState({
                              EnteredOtp: otp,
                            })
                          }
                          value={this.state.EnteredOtp}
                          numInputs={6}
                          //   separator={<span>-<span>}
                        />
                      </div>
  
                      <button
                        class="login-page-btn"
                        onClick={this.OnLoginViaOTP.bind(this)}
                      >
                        Login
                      </button>
                    </div>
                    <div class="userlinks">
                      <a
                        class="account"
                        style={{ color: "#507dbe" }}
                        onClick={this.Resend.bind(this)}
                      >
                        Resend OTP
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-3 col-sm-3"></div>
              </div>
            </div>
          </main>
         
          <Footer></Footer>
        </div>
      );
    }else
    {
    return (
      <div>
        <Menu></Menu>
        <main>
          <div class="container product-section">
            <div class="row ">
              <div class="col-lg-4 col-md-3 col-sm-3"></div>
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="login-section">
                  <h3>Login to BeatMySugar</h3>

                  {/* <ul class="login-list-img">
                                            <li> */}
                  {/* <img src="assets/images/fb.png"></img> */}
                  {/* <FacebookLogin 
        appId="481436436037785" //APP ID NOT CREATED YET
        fields="name,email,picture"
        callback={this.responseFacebook}
      /> */}
                  {/* </li> 
                                            <li> */}
                  {/* <img src="assets/images/google.png"></img> */}
                  {/* <GoogleLogin
        clientId="247460357089-maqdecd495ligtqftbvddlm9p6p36mic.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
        buttonText="LOGIN WITH GOOGLE"
        fields="name,email,picture"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      /> */}
                  {/* </li>
                                        </ul> */}
                  {/* <p>- OR USING EMAIL -</p> */}
                  <div class="input-boxes-login col-md-12">
                    <input
                
                      stype="text"
                      Placeholder="Email or Mobile"
                      value={this.state.email}
                      onChange={(text) => {

                        this.setState({
                          email: text.target.value,
                        });
                        if(this.state.NumRegex.test(text.target.value)){
                          this.setState({
                            IsPasswordEnter : false,
                            ButtonText : 'Send OTP'
                          })
                        }else if(text.target.value == ''){
                          this.setState({
                            IsPasswordEnter : false,
                            ButtonText : 'Send OTP'
                          })
                        }
                        else
                        {
                          this.setState({
                            IsPasswordEnter : true,
                            ButtonText : 'Login'
                          })
                        }
                      
                      }}
                    ></input>
                    <input style={{display : this.state.IsPasswordEnter ? '' : 'none'}}
                      type={this.state.isVisible ? "text" : "Password"}
                      Placeholder="Password"
                      value={this.state.password}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          this.onLogin();
                        }
                      }}
                      onChange={(text) => {
                        this.setState({
                          password: text.target.value,
                        });
                      }}
                    ></input>{" "}
                    <span class="password-visible">
                      <i 
                        class="fas fa-eye"
                        style={{
                          color: this.state.isVisible ? "#507dbe" : "grey",
                          display : this.state.IsPasswordEnter ? '' : 'none'
                        }}
                        onClick={() => {
                          this.setState({
                            isVisible: !this.state.isVisible,
                          });
                        }}
                      ></i>
                    </span>
                    <button
                      class="login-page-btn"
                      onClick={this.onLogin.bind(this)}
                    >
                      {this.state.ButtonText}
                    </button>
                  </div>
                  <div class="userlinks">
                    <a
                      class="password"
                      onClick={this.Recover.bind(this)}
                      style={{ color: "#507dbe" ,display:this.state.ButtonText =='Send OTP' ? 'none' : ''}}
                    >
                      Recover Password
                    </a>
                    <a href="/Register" class="account">
                      Create Account
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-3 col-sm-3"></div>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    );
                      }
  }
}

export default Login;
