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
class EmailVerification extends React.Component {
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
      MailerOtp: "",
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
        MailerOtp: customer.otp,
      });
    }
  }

  onSave() {
    console.log(this.state.CustomerData.mobile);

    if (this.state.EnteredOtp != "") {
      if (this.state.EnteredOtp == this.state.MailerOtp) {
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
            email_verify: "Yes",
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

                    localStorage.removeItem("CustormerRegister");
                    window.location.href = "/";
                  } else {
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Success(
                      "Something went wrong, please try again later."
                    );
                    window.location.href = "/";
                  }
                })
              );
             
            } else {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Success(
                "Something went wrong, please try again later."
              );
              window.location.href = "/";
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

  onSkip() {
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

          
          fetch(
            "https://www.instaalerts.zone/SendSMS/sendmsg.php?uname=globaltrendz&pass=abc321&send=RIGHTC&dest=" +
              this.state.CustomerData.mobile +
              "&msg=Hi " +
              this.state.CustomerData.name +
              ", Welcome to BeatMySugar, your very own world for Simplifying Diabetes Management. Team BeatMySugar"
          ).then((response) => response.json());

         

          PostApiCall.postRequest(
            {
              name: this.state.CustomerData.name,
              email: this.state.CustomerData.email,
            },
            "CustomerRegistrationMailer"
          ).then((results1) =>
     
            results1.json().then((obj1) => {
              if (results1.status == 200 || results1.status == 201) {
                

                Notiflix.Loading.Remove();

                Notiflix.Notify.Success(
                  "You are successfully registered with BeatMySugar."
                );

                localStorage.removeItem("CustormerRegister");
                window.location.href = "/";

               
              } else {
                Notiflix.Loading.Remove();
                Notiflix.Notify.Success(
                  "Something went wrong, please try again later."
                );
                window.location.href = "/";
              }
            })
          );
         
        } else {
          Notiflix.Loading.Remove();
          Notiflix.Notify.Success(
            "Something went wrong, please try again later."
          );
          window.location.href = "/";
        }
      })
    );
  }

  Resend() {
    if (this.state.ResendCount > 3) {
      Notiflix.Notify.Info("You exceeded the limit to resend OTP.");
    } else {
      var random = Math.floor(100000 + Math.random() * 900000);

      PostApiCall.postRequest(
        {
          name: this.state.CustomerData.name,
          email: this.state.CustomerData.email,
          otp: random,
        },
        "VerifyMailMailer"
      ).then((results2) =>
     
        results2.json().then((obj2) => {
          if (results2.status == 200 || results2.status == 201) {
            this.setState({
              ResendCount: this.state.ResendCount + 1,
              MailerOtp: random,
            });
          }
        })
      );
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
                    email <b>{this.state.CustomerData.email}</b>
                    <br /> Please enter the same to verify you email.
                  </h5>

                  <div class="input-boxes otp-field">
                    <div>
                      <OtpInput
                        onChange={(otp) =>
                          this.setState({
                            EnteredOtp: otp,
                          })
                        }
                        value={this.state.EnteredOtp}
                        numInputs={6}
                 
                        inputStyle={{
                          width: "5rem",
                        }}
                      />
                    </div>

                    <button
                      class="login-page-btn"
                      onClick={this.onSave.bind(this)}
                    >
                      Register with us
                    </button>
                    <div class="userlinks">
                      <a
                        class="account"
                        style={{ color: "#507dbe" }}
                        onClick={this.Resend.bind(this)}
                      >
                        Resend OTP
                      </a>
                    </div>
                    <button
                      class="login-page-btn skipbtn1"
                      onClick={this.onSkip.bind(this)}
                    >
                      Skip & Register
                    </button>
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

export default EmailVerification;
