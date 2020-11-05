import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import OtpInput from "react-otp-input";
import firebase from "firebase";

// import GetApiCall from "./GetApi";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import moment from "moment";

var done = "no";
class MobileVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isVisible: false,
      password: "",
      EmailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

      EnteredOtp: "",
      CustomerData: [],
      ResendCount: 0,
      MobileOtp: "",
    };
  }

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
   
    });

    var data = localStorage.getItem("CustormerRegister");
    var customer = JSON.parse(data);

  

    if (customer != null) {
      this.setState({
        CustomerData: customer,
        MobileOtp: customer.mobotp,
      });
    }
  }

  onSave() {
    console.log(this.state.MobileOtp);

    if (this.state.EnteredOtp != "") {
      if (this.state.EnteredOtp == this.state.MobileOtp) {
      

        Notiflix.Loading.Dots("Please wait...");

        PostApiCall.postRequest(
          {
            name: this.state.CustomerData.name,
            email: this.state.CustomerData.email,
            mobile: this.state.CustomerData.mobile,
            password: this.state.CustomerData.password,
            gender: this.state.CustomerData.gender,
            dob: this.state.CustomerData.dob,
            age: this.state.CustomerData.age,
            source: this.state.CustomerData.source,
            login_type: this.state.CustomerData.login_type,
            updated_on: this.state.CustomerData.updated_on,
            updated_by: this.state.CustomerData.updated_by,
            mobile_verify: "Yes",
            email_verify: "No",
            totalsugarkubs: 0,
          },
          "RegisterCustomer"
        ).then((results) =>
      
          results.json().then((obj) => {
            if (results.status == 200 || results.status == 201) {
             

              PostApiCall.postRequest(
                {
                  name: this.state.CustomerData.name,
                  email: this.state.CustomerData.email,
                },
                "CustomerRegistrationMailer"
              ).then((results1) =>
        
                results1.json().then((obj1) => {
                  if (results1.status == 200 || results1.status == 201) {
                    PostApiCall.postRequest(
                      {
                        name: this.state.CustomerData.name,
                        mobile: this.state.CustomerData.mobile,
                      },
                      "CustomerRegistrationMobileOTP"
                    );

                    Notiflix.Loading.Remove();

                    Notiflix.Notify.Success(
                      "You are successfully registered with BeatMySugar."
                    );

                    var path = JSON.parse(localStorage.getItem("PathCame"));
           
              if (path != null && path != "") {
                localStorage.removeItem("CustormerRegister");
                localStorage.removeItem('PathCame')
                window.location.href = "/cart";
              }else{
                localStorage.removeItem("CustormerRegister");
                window.location.href = "/";
              }
                  
                  } else {
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Success(
                      "Something went wrong, please try again later."
                    );
                    var path = JSON.parse(localStorage.getItem("PathCame"));
                    if (path != null && path != "") {
                      localStorage.removeItem('PathCame')
                     window.location.href = "/cart";
                    }else
                    {
                      window.location.href = "/";
                    }
                    
                  }
                })
              );
             
            } else {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Success(
                "Something went wrong, please try again later."
              );
              var path = JSON.parse(localStorage.getItem("PathCame"));
              if (path != null && path != "") {
                localStorage.removeItem('PathCame')
               window.location.href = "/cart";
              }else
              {
                window.location.href = "/";
              }
            }
          })
        );


       
      } else {
        Notiflix.Notify.Failure("Invalid OTP.");
      }
    } else {
      Notiflix.Notify.Failure("Please enter OTP to Register.");
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
        "https://www.instaalerts.zone/SendSMS/sendmsg.php?uname=globaltrendz&pass=abc321&send=RIGHTC&dest=" +
          this.state.CustomerData.mobile +
          "&msg=Hi " +
          this.state.CustomerData.name +
          ", OTP for your mobile number verification is :" +
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
    return (
      <div>
        <Menu></Menu>
        <main>
          <div class="container product-section">
            <div class="row ">
            <div class="col-lg-4 col-md-3 col-sm-3"></div>
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="login-section">
                  <h3>Enter One Time Password (OTP)</h3>
                  <h5>
                    One Time Password (OTP) has been sent to your <br />
                    mobile number <b>{this.state.CustomerData.mobile}</b>
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
                      />
                    </div>

                    <button
                      class="login-page-btn"
                      onClick={this.onSave.bind(this)}
                    >
                      Next
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
  }
}

export default MobileVerification;
