import React from "react";
import logo from "./logo.svg";

import Header from "./Header";
import Footer from "./Footer";

import LoginPage from "./LoginPage";
import GetApiCall from "./GetApi";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import moment from "moment";
import {
  Navbar,
  Form,
  Nav,
  NavDropdown,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import firebase from "firebase";

import { connect } from "react-redux";
import {
  setCustomerName,
  setCustomerMobile,
  setCustomerEmail,
  setCustomerDobDay,
  setCustomerDobMonth,
  setCustomerDobYear,
  setCustomerGender,
  setCustomerPassword,
  setCustomerConfirmPassword,
  setCustomerDayData,
  setCustomerMonthData,
  setCustomerYearData,
  setCustomerClearData,
} from "./Actions/actionType";

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NumRegex: /^0|[0-9]\d*$/,
      MobileRegex: /^[0-9]*$/,
      AlphaNumericRegex: /^[a-zA-Z0-9]*$/,
      SpecialRegex: /[-!$%^&*()_+|~=`'"{}\[\]:\/;<>?,.@#]/,
      EmailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      UrlRegex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,

      isVisibleCon: false,
      isVisiblePass: false,
      Captcha: false,
      VerificationId: "",

      TitleData: [
        { label: "Mr.", value: "Mr." },
        { label: "Ms.", value: "Ms." },
        { label: "Dr.", value: "Dr." },
      ],
      Title: "Mr.",
    };
  }

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    });

    this.props.setCustomerClearData();
    //  Notiflix.Loading.Dots('Please wait...');

    Notiflix.Notify.Init({
      // width:'100%',
      position: "right-top",
      distance: "2%",
      cssAnimationStyle: "from-top",
      useIcon: true,
      fontFamily: "Arial",
      fontSize: "13.5px",
      fontAwesomeIconStyle: "shadow", // 'shadow' - 'basic'
      fontAwesomeIconSize: "34px",
      plainText: true,
      // ...
    });

    var day = [];
    var monthdata = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var month = [];
    var year = [];

    for (var i = 1; i <= 31; i++) {
      day.push({ label: i, value: i });
    }

    const date2 = new Date();
    // console.log(Math.abs(date2.getUTCFullYear() - 1970))
    for (var i = 0; i < Math.abs(date2.getUTCFullYear() - 1920); i++) {
      year.push({
        label: date2.getUTCFullYear() - 1 - i,
        value: date2.getUTCFullYear() - 1 - i,
      });
    }

    for (var i = 0; i < 12; i++) {
      month.push({ label: monthdata[i], value: monthdata[i] });
    }

    this.props.setCustomerDayData(day);
    this.props.setCustomerMonthData(month);
    this.props.setCustomerYearData(year);

    this.props.setCustomerDobDay(day[0].label);
    this.props.setCustomerDobMonth(month[0].label);
    this.props.setCustomerDobYear(year[0].label);
  }

  onChangeName(name) {
    if (
      !this.state.NumRegex.test(name.target.value) &&
      !this.state.SpecialRegex.test(name.target.value)
    ) {
      this.props.setCustomerName(name.target.value);
    }
  }
  onChangeMobile(mobile) {
    if (
      this.state.MobileRegex.test(mobile.target.value) &&
      mobile.target.value.length <= 10
    ) {
      this.props.setCustomerMobile(mobile.target.value);
    }
  }

  onChangeEmail(email) {
    this.props.setCustomerEmail(email.target.value);
  }

  onChangePassword(password) {
    this.props.setCustomerPassword(password.target.value);
  }

  onChangeConfirmPassword(password) {
    this.props.setCustomerConfirmPassword(password.target.value);
  }

  onChangeDobDay(day) {
    this.props.setCustomerDobDay(day.target.value);
  }

  onChangeDobMonth(month) {
    this.props.setCustomerDobMonth(month.target.value);
  }

  onChangeDobYear(year) {
    this.props.setCustomerDobYear(year.target.value);
  }

  onChangeGender(gender) {
    console.log(gender.target.value);
    this.props.setCustomerGender(gender.target.value);
  }

  SaveData() {

   
    // console.log(this.props.Register)

    // this.props.history.push('/')
    // window.location.href= "/"

    if (this.props.Register.Name != "") {
      if (
        this.props.Register.Mobile.length != 10 &&
        this.props.Register.Mobile.length != ""
      ) {
        Notiflix.Notify.Failure("Please enter valid Mobile Number.");
      } else {
        if (this.props.Register.Email != "") {
          if (this.state.EmailRegex.test(this.props.Register.Email)) {
            if (this.props.Register.Password != "") {
              if (this.props.Register.ConfirmPassword != "") {
                if (
                  this.props.Register.Password ==
                  this.props.Register.ConfirmPassword
                ) {
                  //if(this.state.Captcha){

                  Notiflix.Loading.Dots("Please wait...");

                  var random = Math.floor(100000 + Math.random() * 900000);
                  var random2 = Math.floor(100000 + Math.random() * 900000);

                  PostApiCall.postRequest(
                    {
                      email: this.props.Register.Email.trim(),
                      mobile: this.props.Register.Mobile.trim(),
                    },
                    "IfEmailExists"
                  ).then((results1) =>
                    // const objs = JSON.parse(result._bodyText)
                    results1.json().then((obj1) => {
                      if (results1.status == 200 || results1.status == 201) {
                        // PostApiCall.postRequest(
                        //   {
                        //     name: this.props.Register.Name,
                        //     mobile: this.props.Register.Mobile,
                        //     otp: random2,
                        //   },
                        //   "VerifyMobileOTP"
                        // );

                        fetch(
                          "https://www.instaalerts.zone/SendSMS/sendmsg.php?uname=globaltrendz&pass=abc321&send=BMSIND&dest=" +
                            this.props.Register.Mobile +
                            "&msg=Hi " +
                            this.state.Title + ' ' +this.props.Register.Name +
                            ", OTP for your mobile number verification is :" +
                            random2 +
                            ". DO NOT share this OTP with anyone. Team BeatMySugar"
                        ).then((res) => res.json());

                        // PostApiCall.postRequest(
                        //   {
                        //     name: this.state.Title + ' ' +this.props.Register.Name,
                        //     email: this.props.Register.Email.trim(),
                        //     otp: random,
                        //   },
                        //   "VerifyMailMailer"
                        // ).then((results2) =>
                        //   // const objs = JSON.parse(result._bodyText)
                        //   results2.json().then((obj2) => {
                        //     if (
                        //       results2.status == 200 ||
                        //       results2.status == 201
                        //     ) {
                              const data = {
                                otp: random,
                                mobotp: random2,
                                verify: this.state.VerificationId,
                                name: this.state.Title + ' ' +this.props.Register.Name,
                                email: this.props.Register.Email.trim(),
                                mobile: this.props.Register.Mobile,
                                password: this.props.Register.Password,
                                gender: this.props.Register.Gender,
                                dob:
                                  this.props.Register.DobYear +
                                  "-" +
                                  moment().month(this.props.Register.DobMonth).format("MM")+
                                  "-" +
                                  this.props.Register.DobDay,
                                age:
                                  new Date().getUTCFullYear() -
                                  this.props.Register.DobYear,
                                source: "Website",
                                login_type: "Manual",
                                updated_on: moment().format("lll").toString(),
                                updated_by: 0,
                              };
                              localStorage.setItem(
                                "CustormerRegister",
                                JSON.stringify(data)
                              );
                              Notiflix.Loading.Remove();
                              window.location.href = "/verifymobile";
                        //     }
                        //   })
                        // );
                      } else {
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Failure(obj1.data);
                      }
                    })
                  );

                  //             PostApiCall.postRequest({

                  //                 name : this.props.Register.Name,
                  //                 email : this.props.Register.Email.trim(),
                  //                 mobile : this.props.Register.Mobile,
                  //                 password : this.props.Register.Password,
                  //                 gender : this.props.Register.Gender,
                  //                 dob : this.props.Register.DobYear+"-"+this.props.Register.DobMonth+"-"+this.props.Register.DobDay,
                  //                 age : new Date().getUTCFullYear() - this.props.Register.DobYear,
                  //                 source : 'Website',
                  //                 login_type : 'Manual',
                  //                 updated_on : moment().format('lll').toString(),
                  //                 updated_by : 0

                  //              },"RegisterCustomer").then((results) =>

                  //                // const objs = JSON.parse(result._bodyText)
                  //                results.json().then(obj => {

                  //                if(results.status == 200 || results.status == 201){

                  //                 // console.log(JSON.parse(JSON.stringify(obj.data[0])).Result)
                  //                 // console.log((JSON.parse(JSON.stringify(obj.data[0]))).Result)

                  //                 if(((JSON.parse(JSON.stringify(obj.data[0]))).Result) == 'Successfully Registered'){

                  //                     PostApiCall.postRequest({

                  //                         name : this.props.Register.Name,
                  //                         email : this.props.Register.Email.trim(),

                  //                      },"CustomerRegistraionMailer").then((results1) =>

                  //                        // const objs = JSON.parse(result._bodyText)
                  //                        results1.json().then(obj1 => {

                  //                        if(results1.status == 200 || results1.status == 201){

                  //                         Notiflix.Loading.Remove()

                  //                     Notiflix.Report.Success(

                  //                         'Registration Successful',
                  //                         'You are successfully registered with BeatMySugar.',
                  //                         'Ok'

                  //                     )

                  //                     window.location.href= "/"

                  //                     }
                  //                 }))
                  //                 }
                  //                 else
                  //                 {
                  //                     Notiflix.Notify.Failure('Email Address Already Registered.');
                  //                 }
                  //    }

                  // }))

                  // }else
                  // {
                  // Notiflix.Notify.Failure('Please verify Captcha.');
                  //}
                } else {
                  Notiflix.Notify.Failure(
                    "Password & Confirm Password donot match."
                  );
                }
              } else {
                Notiflix.Notify.Failure("Please enter Confirm Password.");
              }
            } else {
              Notiflix.Notify.Failure("Please set your Password.");
            }
          } else {
            Notiflix.Notify.Failure("Please enter valid Email Address.");
          }
        } else {
          Notiflix.Notify.Failure("Please enter your Email Address.");
        }
      }
    } else {
      Notiflix.Notify.Failure("Please enter your Full Name.");
    }
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-2 col-sm-2"></div>
            <div class="col-lg-6 col-md-8 col-sm-8">
              <div class="top-position-reg">
                <div class="left-box">
                  <img
                    src="/assets/images/register.jpg"
                    className="imgRegister"
                  />
                  <div class="after">
                    Let's Get <br />
                    <span>Started</span>
                  </div>
                </div>
                <div class="right-box">
                  <div class="">
                    <div class="col-lg-12 dashboard-content">
                      <h2>Create a new account</h2>

                      <form action="#">
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group required-field">
                                  <div class="row">
                                    <div class="col-md-4 col-sm-3 col-xs-3">
                                      <select
                                        class="form-control registration-select-box title-box"
                                        style={{
                                          height: "42px",
                                        }}
                                        value={this.state.Title}
                                        onChange={(text) => {
                                          this.setState({
                                            Title: text.target.value,
                                          });
                                        }}
                                      >
                                        {this.state.TitleData.map((spec) => (
                                          <option
                                            key={spec.value}
                                            value={spec.label}
                                          >
                                            {spec.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div class="col-md-8 col-sm-9 col-xs-9">
                                      <input
                                        type="text"
                                        class="form-control"
                                        Placeholder="Full Name"
                                        value={this.props.Register.Name}
                                        onChange={this.onChangeName.bind(this)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* <!-- End .form-group --> */}
                              </div>
                              {/* <!-- End .col-md-4 --> */}
                            </div>
                            {/* <!-- End .row --> */}
                          </div>
                          {/* <!-- End .col-sm-11 --> */}
                        </div>
                        {/* <!-- End .row --> */}

                        <div class="form-group required-field">
                          <input
                            type="text"
                            Placeholder="Mobile Number"
                            class="form-control"
                            value={this.props.Register.Mobile}
                            onChange={this.onChangeMobile.bind(this)}
                          />
                        </div>
                        {/* <!-- End .form-group --> */}

                        <div class="form-group required-field">
                          <input
                            type="text"
                            Placeholder="Email Address"
                            class="form-control"
                            value={this.props.Register.Email}
                            onChange={this.onChangeEmail.bind(this)}
                          />
                        </div>
                        {/* <!-- End .form-group --> */}

                        <div class="form-group required-field">
                          <input
                            type={
                              this.state.isVisiblePass ? "text" : "Password"
                            }
                            Placeholder="Password"
                            class="form-control"
                            value={this.props.Register.Password}
                            onChange={this.onChangePassword.bind(this)}
                          />
                          <span class="password-visible-reg">
                            <i
                              class="fas fa-eye"
                              style={{
                                color: this.state.isVisiblePass
                                  ? "#507dbe"
                                  : "grey",
                              }}
                              onClick={() => {
                                this.setState({
                                  isVisiblePass: !this.state.isVisiblePass,
                                });
                              }}
                            ></i>
                          </span>
                        </div>

                        <div class="form-group required-field">
                          <input
                            type={this.state.isVisibleCon ? "text" : "Password"}
                            Placeholder="Confirm Password"
                            class="form-control"
                            value={this.props.Register.ConfirmPassword}
                            onChange={this.onChangeConfirmPassword.bind(this)}
                          />
                          <span class="password-visible-reg">
                            <i
                              class="fas fa-eye"
                              style={{
                                color: this.state.isVisibleCon
                                  ? "#507dbe"
                                  : "grey",
                              }}
                              onClick={() => {
                                this.setState({
                                  isVisibleCon: !this.state.isVisibleCon,
                                });
                              }}
                            ></i>
                          </span>
                        </div>
                        {/* <!-- End .form-group --> */}

                        <div class="row">
                          <div class="col-md-12">
                            <label>Gender</label>
                          </div>
                          <div class="col-md-4">
                            <div class="radio-btn">
                              <span>Male</span>
                              <input
                                type="radio"
                                value="Male"
                                class=""
                                checked={
                                  this.props.Register.Gender == "Male"
                                    ? true
                                    : false
                                }
                                onChange={this.onChangeGender.bind(this)}
                              />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="radio-btn">
                              <span>Female</span>
                              <input
                                type="radio"
                                value="Female"
                                class=""
                                checked={
                                  this.props.Register.Gender == "Female"
                                    ? true
                                    : false
                                }
                                onChange={this.onChangeGender.bind(this)}
                              />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="radio-btn">
                              <span>Others</span>
                              <input
                                type="radio"
                                value="Others"
                                class=""
                                checked={
                                  this.props.Register.Gender == "Others"
                                    ? true
                                    : false
                                }
                                onChange={this.onChangeGender.bind(this)}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <label>Birthday</label>
                          </div>
                          <div class="col-md-4">
                            <select
                              class="form-control registration-select-box"
                              value={this.props.Register.DobDay}
                              onChange={this.onChangeDobDay.bind(this)}
                            >
                              {this.props.Register.DayData.map((spec) => (
                                <option key={spec.value} value={spec.label}>
                                  {spec.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div class="col-md-4">
                            <select
                              class="form-control registration-select-box"
                              value={this.props.Register.DobMonth}
                              onChange={this.onChangeDobMonth.bind(this)}
                            >
                              {this.props.Register.MonthData.map((spec) => (
                                <option key={spec.value} value={spec.label}>
                                  {spec.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div class="col-md-4">
                            <select
                              class="form-control registration-select-box"
                              value={this.props.Register.DobYear}
                              onChange={this.onChangeDobYear.bind(this)}
                            >
                              {this.props.Register.YearData.map((spec) => (
                                <option key={spec.value} value={spec.label}>
                                  {spec.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div class="row" style={{ marginBottom: "15px" }}>
                          <div class="col-md-12">
                            {/* <div id={'recaptcha-container'}/> */}
                            <p class="disclaimer-text">
                              By clicking 'Send OTP', you agree to BeatMySugar POLICIES ( mentioned at the bottom of the page ). 
                              You would receive SMS notifications from us.
                            </p>
                          </div>
                        </div>

                        <div class="form-footer">
                          <div class="form-footer-right">
                            {/* <a class="btn btn-primary" onClick={this.SaveData.bind(this)}>Register with us</a> */}

                            <Button
                              class="btn btn-primary"
                              onClick={this.SaveData.bind(this)}
                            >
                              Send OTP
                            </Button>
                          </div>
                        </div>
                        {/* <!-- End .form-footer --> */}
                      </form>
                    </div>
                    {/* <!-- End .col-lg-9 --> */}
                    <div class="col-lg-4"></div>
                  </div>
                  {/* <!-- End .row --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Register: state.RegisterReducer,
  };
}

export default connect(mapStateToProps, {
  setCustomerName,
  setCustomerMobile,
  setCustomerEmail,
  setCustomerDobDay,
  setCustomerDobMonth,
  setCustomerDobYear,
  setCustomerGender,
  setCustomerPassword,
  setCustomerConfirmPassword,
  setCustomerDayData,
  setCustomerMonthData,
  setCustomerYearData,
  setCustomerClearData,
})(RegistrationPage);
