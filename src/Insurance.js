import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import moment from "moment";
import { connect } from "react-redux";
import {
  setinsuredaddress,
  setinsuredname,
  setdob,
  setinsuredemail,
  setinsuredmobile,
  setinsuredtype,
  setinsuredsum,
  setinsureddisease,
  setinsuredpolicy,
  setinsureddisclosure,
  setinsuredheight,
  setinsuredweight,
  setclearinsurance,
} from "./Actions/actionType";
import DatePicker from "react-date-picker";

class Insurance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NumRegex: /^0|[0-9]\d*$/,
      MobileRegex: /^[0-9]*$/,
      AlphaNumericRegex: /^[a-zA-Z0-9]*$/,
      SpecialRegex: /[-!$%^&*()_+|~=`'"{}\[\]:\/;<>?,.@#]/,
      EmailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      UrlRegex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      Status: "Yes",
      Policy: "Yes",
      PolicyData: [
        { value: "Health", label: "Health" },
        { value: "Life", label: "Life" },
      ],
    };
  }

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",

    });
  }

  onChangeName(name) {
    this.props.setinsuredname(name.target.value);
  }
  onChangeDOB(dob) {
    this.props.setdob(new Date(dob));
  }
  onChangeAddress(address) {
    this.props.setinsuredaddress(address.target.value);
  }
  onChangeEmail(email) {
    this.props.setinsuredemail(email.target.value);
  }
  onChangeMobile(mobile) {
    if (
      this.state.NumRegex.test(mobile.target.value) &&
      mobile.target.value.length <= 10
    ) {
      this.props.setinsuredmobile(mobile.target.value);
    }
  }
  onChangeType(type) {
    this.props.setinsuredtype(type.target.value);
  }
  onChangeSum(sum) {
    this.props.setinsuredsum(sum.target.value);
  }
  onChangeDisease(disease) {
    this.props.setinsureddisease(disease.target.value);
  }
  onChangePolicy(policy) {
    this.props.setinsuredpolicy(policy.target.value);
  }
  onChangeDisclosure(disclosure) {
    this.props.setinsureddisclosure(disclosure.target.value);
  }

  onChangeHeight(height) {
    this.props.setinsuredheight(height.target.value);
  }
  onChangeWeight(weight) {
    this.props.setinsuredweight(weight.target.value);
  }
  onPost = () => {
    Notiflix.Loading.Dots("");

    PostApiCall.postRequest(
      {
        name: this.props.InsuranceCredentials.InsuredName,
        dob: this.props.InsuranceCredentials.DOB,
        address: this.props.InsuranceCredentials.Address,
        email: this.props.InsuranceCredentials.Email,
        mobile: this.props.InsuranceCredentials.Mobile,
        type: this.props.InsuranceCredentials.TypeOfInsurance,
        sumassured: this.props.InsuranceCredentials.SumAssured,
        currentdisease: this.state.Status,
        currentdiseasedescription: this.props.InsuranceCredentials
          .CurrentDisease,
        insurancepolicy: this.state.Policy,
        insurancepolicydescription: this.props.InsuranceCredentials
          .InsurancePolicy,
        selfdisclousre: this.props.InsuranceCredentials.SelfDisclosure,
        height: this.props.InsuranceCredentials.Height,
        weight: this.props.InsuranceCredentials.Weight,
        updatedon: moment().format("lll"),
        updatedby: 0,
      },
      "AddInsurance"
    ).then((results) =>

      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {
          this.props.setclearinsurance();

          Notiflix.Loading.Remove();

          Notiflix.Notify.Success('Thank you! We will contact you soon.')
          window.location.href = '/insurance'
        } else {
          Notiflix.Loading.Remove()
          Notiflix.Notify.Failure('Something went wrong, try gain later.')
        }
      })
    );
  };

  SaveInsurance() {
    
    if (this.props.InsuranceCredentials.InsuredName != "") {
      if (this.props.InsuranceCredentials.DOB != "") {
        if (this.props.InsuranceCredentials.Email != "") {
          if (
            this.state.EmailRegex.test(this.props.InsuranceCredentials.Email)
          ) {
            if (this.props.InsuranceCredentials.Mobile != "") {
              if (this.props.InsuranceCredentials.Mobile.length == 10) {
                if (this.props.InsuranceCredentials.TypeOfInsurance != "") {
                  if (this.props.InsuranceCredentials.SumAssured != "") {
                    if (this.state.Status == "Yes") {
                      if (this.props.InsuranceCredentials.CurrentDisease) {
                        if (this.state.Policy == "Yes") {
                          if (
                            this.props.InsuranceCredentials.InsurancePolicy !=
                            ""
                          ) {
                            this.onPost();
                          } else {
                            Notiflix.Notify.Failure(
                              "Please write about insurance policy."
                            );
                          }
                        } else {
                          if (this.state.Policy == "No") {
                            this.onPost();
                          }
                          Notiflix.Notify.Failure("Please select insuranc.");
                        }
                      } else {
                        Notiflix.Notify.Failure(
                          "Please write about Current Disease."
                        );
                      }
                    } else {
                      if (this.state.Status == "No") {
                        if (this.state.Policy == "Yes") {
                          if (
                            this.props.InsuranceCredentials.InsurancePolicy !=
                            ""
                          ) {
                            this.onPost();
                          } else {
                            Notiflix.Notify.Failure(
                              "Please write about insurance policy."
                            );
                          }
                        } else {
                          if (this.state.Policy == "No") {
                            this.onPost();
                          } else {
                            Notiflix.Notify.Failure(
                              "Please select insurance policy."
                            );
                          }
                        }
                      } else {
                        Notiflix.Notify.Failure(
                          "Please select Current Disease."
                        );
                      }
                    }
                  } else {
                    Notiflix.Notify.Failure("Please enter sum assured.");
                  }
                } else {
                  Notiflix.Notify.Failure("Please select type of insurance.");
                }
              } else {
                Notiflix.Notify.Failure("Please enter valid mobile number.");
              }
            } else {
              Notiflix.Notify.Failure("Please enter mobile number.");
            }
          } else {
            Notiflix.Notify.Failure("Please enter valid email address.");
          }
        } else {
          Notiflix.Notify.Failure("Please enter email address of the insured.");
        }
      } else {
        Notiflix.Notify.Failure("Please select date of birth of the insured.");
      }
    } else {
      Notiflix.Notify.Failure("Please enter name of the insured.");
    }
  }

  render() {
    return (
      <div>
        <Menu></Menu>
        <main class="main">
          <div class="container">
            <div
              class="contact-banner d-none d-sm-none d-md-block"
              
            >
              <img src="/assets/images/insurance-banner.jpg" alt="Insurance Banner"></img>
            </div>

            <div
              class="contact-banner d-md-none d-sm-block"
              alt="Insurance Banner"
              style={{
                background: "url('assets/images/adbanners/ad-banner-1.jpg')",
              }}
            ></div>

<div class="">
            <div class="row">
              <div class="col-md-12">
                <div class="doctors-box">
                  <h4>Why a Diabetic person should get Health Insurance ?</h4>
                  <p>
                    Buying Health Insurance for Diabetes is the key to winning a
                    battle against Diabetes. Let’s understand the reasons why
                    you should take insurance and live a peaceful life.
                  </p>
                  <ul>
                    <li>
                      Diabetes puts you at a danger of many critical diseases
                      like blindness, kidney failure, heart attack, skin
                      problems etc, which could lead to expensive treatments.
                      The treatment cost is going up and hence one should go for
                      an insurance policy.
                    </li>
                    <li>
                      Health Insurance plan protects you from financial issues
                      and enables access to prompt and quality medical care in
                      case of an illness.
                    </li>
                    <li>
                      The rising incidences and claims,makes sense to purchase a
                      health insurance plan at early stage, to cover the disease
                      and financial stress.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        

            <div class=" doctors-section" style={{marginTop:"0px"}}>
              <div class="row">
                <div class="col-md-12">
                  <div
                    class="write-to-us"
                    style={{
                      height: "100%",
                      padding: "40px 45px 40px",
                      background: "#fff",
                    }}
                  >
                    <h1 class="light-title">Fill in your Details</h1>
              
                    <div class="row">
                      <div class="form-group required-field col-md-6">
                        <label for="contact-name">Name Of The Insured</label>
                        <input
                          type="text"
                          class="form-control"
                          value={this.props.InsuranceCredentials.InsuredName}
                          onChange={this.onChangeName.bind(this)}
                          required=""
                        />
                      </div>
                      <div class="form-group required-field col-md-6">
                        <label for="contact-name">Date Of Birth</label>
                        <div class="input-group required-field">
                                              

                                                          <DatePicker
                                                              
                                                              onKeyDown={(e) => e.preventDefault()}
                                                              value={this.props.InsuranceCredentials.DOB}
                                                              onChange={this.onChangeDOB.bind(this)}
                                                              clearIcon={null}
                                                              maxDate={new Date()}
                                                                         
                                                              />
                                          
                                                </div>
                      
                      </div>
                      <div class="form-group col-md-12">
                        <label for="contact-message">
                          Communication Address
                        </label>
                        <textarea
                          cols="30"
                          rows="5"
                          class="form-control"
                          required=""
                          value={this.props.InsuranceCredentials.Address}
                          onChange={this.onChangeAddress.bind(this)}
                        ></textarea>
                      </div>
                    </div>
                    <div class="row">
                      <div class="form-group col-md-6 required-field">
                        <label for="contact-phone">Email Address</label>
                        <input
                          type="email"
                          class="form-control"
                          value={this.props.InsuranceCredentials.Email}
                          onChange={this.onChangeEmail.bind(this)}
                        />
                      </div>
                      <div class="form-group col-md-6 required-field">
                        <label for="contact-phone">Mobile</label>
                        <input
                          type="text"
                          class="form-control"
                          value={this.props.InsuranceCredentials.Mobile}
                          onChange={this.onChangeMobile.bind(this)}
                        />
                      </div>
                      <div class="form-group col-md-6 required-field">
                        <label for="contact-phone">
                          Type Of Insurance Cover Required
                        </label>
                        <select
                          className="form-control"
                          value={
                            this.props.InsuranceCredentials.TypeOfInsurance
                          }
                          onChange={this.onChangeType.bind(this)}
                        >
                          {this.state.PolicyData.map((policy) => (
                            <option key={policy.value} value={policy.value}>
                              {policy.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div class="form-group col-md-6 required-field">
                        <label for="contact-phone">Sum Assured Required</label>
                        <input
                          type="text"
                          class="form-control"
                          value={this.props.InsuranceCredentials.SumAssured}
                          onChange={this.onChangeSum.bind(this)}
                        />
                      </div>

                      <div class="form-group col-md-12">
                        <label for="contact-phone">
                          Any Current Disease/Illness{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <br />
                        <label class="radio-inline">
                          <input
                            type="radio"
                            name="optradio1"
                            checked={this.state.Status == "Yes" ? true : false}
                            onChange={() => {
                              this.setState({
                                Status: "Yes",
                              });
                            }}
                          />{" "}
                          Yes
                        </label>
                        <label
                          class="radio-inline"
                          style={{ marginLeft: "10px" }}
                        >
                          <input
                            type="radio"
                            name="optradio1"
                            checked={this.state.Status == "No" ? true : false}
                            onChange={() => {
                              this.setState({
                                Status: "No",
                              });
                            }}
                          />{" "}
                          No
                        </label>
                        <textarea
                          cols="30"
                          rows="5"
                          class="form-control"
                          required=""
                          style={{
                            display: this.state.Status == "No" ? "none" : "",
                          }}
                          value={this.props.InsuranceCredentials.CurrentDisease}
                          onChange={this.onChangeDisease.bind(this)}
                        ></textarea>
                      </div>

                      <div class="form-group col-md-12">
                        <label for="contact-phone">
                          Any Other Insurance Policy{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <br />
                        <label class="radio-inline">
                          <input
                            type="radio"
                            name="optradio"
                            checked={this.state.Policy == "Yes" ? true : false}
                            onChange={() => {
                              this.setState({
                                Policy: "Yes",
                              });
                            }}
                          />{" "}
                          Yes
                        </label>
                        <label
                          class="radio-inline"
                          style={{ marginLeft: "10px" }}
                        >
                          <input
                            type="radio"
                            name="optradio"
                            checked={this.state.Policy == "No" ? true : false}
                            onChange={() => {
                              this.setState({
                                Policy: "No",
                              });
                            }}
                          />{" "}
                          No
                        </label>{" "}
                        <textarea
                          cols="30"
                          rows="5"
                          class="form-control"
                          required=""
                          style={{
                            display: this.state.Policy == "No" ? "none" : "",
                          }}
                          value={
                            this.props.InsuranceCredentials.InsurancePolicy
                          }
                          onChange={this.onChangePolicy.bind(this)}
                        ></textarea>
                      </div>
                      <div class="form-group col-md-12">
                        <label for="contact-phone">Any Self Disclosure</label>
                        <textarea
                          cols="30"
                          rows="5"
                          class="form-control"
                          required=""
                          value={this.props.InsuranceCredentials.SelfDisclosure}
                          onChange={this.onChangeDisclosure.bind(this)}
                        ></textarea>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="contact-phone">
                          Height Of Insured Member
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          value={this.props.InsuranceCredentials.Height}
                          onChange={this.onChangeHeight.bind(this)}
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="contact-phone">
                          Weight Of Insured Member
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          value={this.props.InsuranceCredentials.Weight}
                          onChange={this.onChangeWeight.bind(this)}
                        />
                      </div>
                    </div>

                    <div class="form-footer">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={this.SaveInsurance.bind(this)}
                      >
                        Submit
                      </button>
                    </div>
        
                  </div>
                </div>

                <div class="col-md-4"></div>
              </div>
            </div>
          </div>
          <div class="container insurance-icons">
            <div class="row">
              <div class="col-md-12">
                <div class="doctors-box">
                  <h4>Why BeatMySugar?</h4>
                  <div class="row icon-box-border">
                    <div class="col-md-3">
                      <div class="icon-box">
                        <img
                          src="assets/images/insurance-icon-1.png"
                          alt="Multiple Options to Choose From"
                          style={{ width: "100px" }}
                        ></img>
                        <h4>
                         Multiple Options to Choose From
                        </h4>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="icon-box">
                        <img
                          src="assets/images/insurance-icon-2.png"
                          alt="Insurance at Best Price"
                          style={{ width: "100px" }}
                        ></img>
                        <h4>
                          Insurance at Best Price
                        </h4>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="icon-box">
                        <img
                          src="assets/images/insurance-icon-3.png"
                          alt="Get the Policy that Best Suits You"
                          style={{ width: "100px" }}
                        ></img>
                        <h4>
                          Get the Policy that Best Suits You
                        </h4>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="icon-box">
                        <img
                          src="assets/images/insurance-icon-4.png"
                          alt="Constant Support"
                          style={{ width: "100px" }}
                        ></img>
                        <h4>
                          Constant Support
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    InsuranceCredentials: state.InsuranceReducers,
  };
}

export default connect(mapStateToProps, {
  setinsuredaddress,
  setinsuredname,
  setdob,
  setinsuredemail,
  setinsuredmobile,
  setinsuredtype,
  setinsuredsum,
  setinsureddisease,
  setinsuredpolicy,
  setinsureddisclosure,
  setinsuredheight,
  setinsuredweight,
  setclearinsurance,
})(Insurance);
