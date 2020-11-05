import React from "react";
import logo from "./logo.svg";

import Header from "./Header";
import Footer from "./Footer";
// import News from "./News";
import PostApiCall from "./Api";
import GetApiCall from "./GetApi";
import Notiflix from "notiflix-react";
import moment from "moment";
import Select from "react-select";
import { connect } from "react-redux";
import DatePicker from "react-date-picker";

import "react-datepicker/dist/react-datepicker.css";
import {
  setprofiletitle,
  setprofilename,
  setprofileemail,
  setprofilemobile,
  setprofiledob,
  setprofilegender,
  setprofilemarital,
  setprofileoccupation,
  setchangeoldpassword,
  setchangenewpassword,
  setchangeconfirmpassword,
  setclearprofile,
} from "./Actions/actionType";

const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img
        for="photo-upload"
        src={src}
        style={{ width: "100%", height: "100%", borderRadius: "5%" }}
      />
    </div>
    <input accept="image/*" id="photo-upload" type="file" onChange={onChange} />
  </label>
);

class Editprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NumRegex: /^0|[0-9]\d*$/,
      MobileRegex: /^[0-9]*$/,
      AlphaNumericRegex: /^[a-zA-Z0-9]*$/,
      SpecialRegex: /[-!$%^&*()_+|~=`'"{}\[\]:\/;<>?,.@#]/,
      EmailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      UrlRegex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,

      TitleData: [
        { value: "Dr.", label: "Dr." },
        { value: "Mr.", label: "Mr." },
        { value: "Ms.", label: "Ms." },
      ],
      GenderData: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Others", label: "Others" },
      ],
      OccupationData: [
        { value: "Select Occupation", label: "Select Occupation" },
        { value: "Student", label: "Student" },
        { value: "Self Employed", label: "Self Employed" },
        { value: "Salaried", label: "Salaried" },
        { value: "Professional", label: "Professional" },
        { value: "Home Maker", label: "Home Maker" },
        { value: "Others", label: "Others" },
      ],
      MaritalData: [
        { value: "Select Marital Status", label: "Select Marital Status" },
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
        { value: "Divorced", label: "Divorced" },
      ],
      imagePreviewUrl:
        "https://talentview.asia/wp-content/uploads/Wait-Staff-Icon-2.png",
      ImageData: [],
      ImageApiUrl: "https://images.beatmysugar.com/api/Image/SaveImage",
      Data: [],
      ProfileData: [],

      isVisible: true,
      date: new Date(),
    };
  }

  onChange = (date) => this.setState({ date });

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",

    });

    Notiflix.Loading.Dots("");

    this.props.setclearprofile();

    var login = localStorage.getItem("CustomerLoginDetails");
    var ProfileData = JSON.parse(login);

    
    this.setState({
      ProfileData: ProfileData,
    });

    PostApiCall.postRequest(
      {
        id: ProfileData.fld_userid,
      },
      "GetUserInfoByID"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {
          this.setState({
            Data: obj.data[0],
            imagePreviewUrl:
              obj.data[0].fld_profileimage == null ||
              obj.data[0].fld_profileimage == "" ||
              obj.data[0].fld_profileimage == "NULL"
                ? "https://talentview.asia/wp-content/uploads/Wait-Staff-Icon-2.png"
                : obj.data[0].fld_profileimage,
          });

          console.log(new Date(obj.data[0].fld_dob));

          this.props.setprofilename(
            obj.data[0].fld_name.split(" ").slice(1).join(" ")
          );
          this.props.setprofiletitle(obj.data[0].fld_name.split(" ")[0]);
          this.props.setprofileemail(obj.data[0].fld_email);
          this.props.setprofilegender(obj.data[0].fld_gender);
          this.props.setprofiledob(new Date(obj.data[0].fld_dob));
        
          this.props.setprofilemarital(obj.data[0].fld_maritalstatus);
          this.props.setprofilemobile(obj.data[0].fld_mobile);
          this.props.setprofileoccupation(obj.data[0].fld_occupation);

          Notiflix.Loading.Remove();
        }
      })
    );

   
  }

  photoUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0].size < 100000) {
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          ImageData: file,
        });
      };
      reader.readAsDataURL(file);
    } else {
      Notiflix.Notify.Failure("File too large, upload file less than 100 kb.");
    }
  };

  onChangeTitle(Title) {
    this.props.setprofiletitle(Title.target.value);
  }
  onChangeName(name) {
    this.props.setprofilename(name.target.value);
  }
  onChangeEmail(email) {
    this.props.setprofileemail(email.target.value);
  }

  onChangeMobile(mobile) {
    if (
      this.state.NumRegex.test(mobile.target.value) &&
      mobile.target.value.length <= 10
    ) {
      this.props.setprofilemobile(mobile.target.value);
    }
  }
  onChangeDOB(dob) {

    this.props.setprofiledob(new Date(dob));
  
  }
  onChangeGender(gender) {
    this.props.setprofilegender(gender.target.value);
  }
  onChangeMarital(maritalstatus) {
    this.props.setprofilemarital(maritalstatus.target.value);
  }
  onChangeOccupation(occupation) {
    this.props.setprofileoccupation(occupation.target.value);
  }
  onChangePassword(oldpassword) {
    this.props.setchangeoldpassword(oldpassword.target.value);
  }
  onChangeNewPswrd(newpassword) {
    this.props.setchangenewpassword(newpassword.target.value);
  }

  onChangeConfirmpswrd(confirmpassword) {
    this.props.setchangeconfirmpassword(confirmpassword.target.value);
  }

  Saveprofile() {


    if (this.props.ProfileCredentials.Title != "") {
      if (this.props.ProfileCredentials.Name != "") {
        if (this.props.ProfileCredentials.email != "") {
          if (this.state.EmailRegex.test(this.props.ProfileCredentials.Email)) {
            if (this.props.ProfileCredentials.Mobile != "") {
              if (this.props.ProfileCredentials.Mobile.length == 10) {
                if (this.props.ProfileCredentials.DOB != "") {
                  if (this.props.ProfileCredentials.Gender != "") {
             

                    var log = localStorage.getItem("CustomerLoginDetails");
                    var login = JSON.parse(log);

                    Notiflix.Loading.Dots("");

                    PostApiCall.postRequest(
                      {
                        id: this.state.ProfileData.fld_userid,
                        name:
                          this.props.ProfileCredentials.Title +
                          " " +
                          this.props.ProfileCredentials.Name,
                        dob: moment(this.props.ProfileCredentials.DOB).format(
                          "l"
                        ),
                        gender: this.props.ProfileCredentials.Gender,
                        maritalstatus: this.props.ProfileCredentials.Marital,
                        occuption: this.props.ProfileCredentials.Occupation,
                        updatedby: login.fld_userid,
                        updatedon: moment().format("lll"),
                      },
                      "UpdateUserInfoBasic"
                    ).then((results) =>
                     
                      results.json().then((obj) => {
                        if (results.status == 200 || results.status == 201) {
                          if (JSON.stringify(this.state.ImageData) != "[]") {
                            const form = new FormData();

                            form.append("file", this.state.ImageData);
                            form.append("foldername", "Customer");
                            form.append(
                              "filename",
                              this.state.ProfileData.fld_userid
                            );

                            fetch(this.state.ImageApiUrl, {
                              method: "POST",
                              body: form,
                            }).then((image) => {
                              image
                                .json()
                                .then((data) => ({
                                  data: data,
                                  status: image.status,
                                }))
                                .then((res) => {
                                  PostApiCall.postRequest(
                                    {
                                      id: this.state.ProfileData.fld_userid,
                                      photo:
                                        "https://images.beatmysugar.com/images/Customer/" +
                                        res.data.Message.split(",")[2]
                                          .split("=")[1]
                                          .trim(),
                                      updatedby: this.state.ProfileData
                                        .fld_userid,
                                      updatedon: moment().format("lll"),
                                    },
                                    "UpdateCustomerPhoto"
                                  ).then((results1) =>
                                    results1.json().then((obj1) => {
                                      if (
                                        results1.status == 200 ||
                                        results1.status == 201
                                      ) {
                                        var login = JSON.parse(
                                          localStorage.getItem(
                                            "CustomerLoginDetails"
                                          )
                                        );
                                        var pdt = [login];

                                        pdt[0].fld_name =
                                          this.props.ProfileCredentials.Title +
                                          " " +
                                          this.props.ProfileCredentials.Name;

                                        localStorage.setItem(
                                          "CustomerLoginDetails",
                                          JSON.stringify(pdt[0])
                                        );

                                        Notiflix.Loading.Remove();
                                        Notiflix.Notify.Success(
                                          "Profile successfully Updated."
                                        );
                                        window.location.href = "/editprofile";
                                      }
                                    })
                                  );
                                });
                            });
                          } else {
                   

                            var login = JSON.parse(
                              localStorage.getItem("CustomerLoginDetails")
                            );
                            var pdt = [login];

                            pdt[0].fld_name =
                              this.props.ProfileCredentials.Title +
                              " " +
                              this.props.ProfileCredentials.Name;

                            localStorage.setItem(
                              "CustomerLoginDetails",
                              JSON.stringify(pdt[0])
                            );

                            Notiflix.Loading.Remove();
                            Notiflix.Notify.Success(
                              "Profile successfully Updated."
                            );
                            window.location.href = "/editprofile";
                          }
                        } else {
                          Notiflix.Loading.Remove();
                          Notiflix.Notify.Failure("Something went Wrong.");
                        }
                      })
                    );

                  
                  } else {
                    Notiflix.Notify.Failure("Please select gender.");
                  }
                } else {
                  Notiflix.Notify.Failure("Please select date of birth.");
                }
              } else {
                Notiflix.Notify.Failure("Please enter valid mobile number.");
              }
            } else {
              Notiflix.Notify.Failure("Please enter your mobile number.");
            }
          } else {
            Notiflix.Notify.Failure("Please enter valid email address.");
          }
        } else {
          Notiflix.Notify.Failure("Please enter your email address.");
        }
      } else {
        Notiflix.Notify.Failure("Please enter your full name.");
      }
    } else {
      Notiflix.Notify.Failure("Please select title.");
    }
  }

  render() {
    return (
      <div className="App">
        <Header></Header>

        <div class="account-section">
          <div class="co">
            <div class="container" style={{ background: "none" }}>
              <div class="row mt-2">
                <div class="col-lg-9 order-lg-last ">
                  <div class="dashboard-content">
                    <h2>Basic Information</h2>
                   

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div class="row">
                        <div class="col-sm-11">
                          <div class="row">
                            <div class="col-md-3">
                              <div class="form-group ">
                                <label for="acc-password">
                                  Upload Profile Pic
                                </label>
                                <br></br>
                                <div class="div1">
                                  <ImgUpload
                                    onChange={this.photoUpload}
                                    src={this.state.imagePreviewUrl}
                                  />
                                </div>
                              </div>
                            </div>

                            <div
                              class="col-md-9"
                              style={{ textAlign: "end" }}
                              onClick={() => {
                                this.setState({
                                  isVisible: false,
                                });
                              }}
                            >
                              <button class="btn btn-primary">
                                Edit My Profile
                              </button>
                              
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group required-field">
                                <label for="acc-name">Title</label>
                                <select
                                  class="form-control"
                                  disabled={this.state.isVisible}
                                  value={this.props.ProfileCredentials.Title}
                                  onChange={this.onChangeTitle.bind(this)}
                                >
                                  {this.state.TitleData.map((title) => (
                                    <option
                                      key={title.value}
                                      value={title.value}
                                    >
                                      {title.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group required-field">
                                <label for="acc-name">Name</label>
                                <input
                                  disabled={this.state.isVisible}
                                  type="text"
                                  class="form-control"
                                  id="acc-name"
                                  name="acc-name"
                                  value={this.props.ProfileCredentials.Name}
                                  onChange={this.onChangeName.bind(this)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-11">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group required-field">
                                <label for="acc-name">Email</label>
                                <input
                                  disabled={true}
                                  type="text"
                                  class="form-control"
                                  value={this.props.ProfileCredentials.Email}
                                  onChange={this.onChangeEmail.bind(this)}
                                />
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="form-group required-field">
                                <label for="acc-lastname">Mobile</label>
                                <input
                                  disabled={true}
                                  type="text"
                                  class="form-control"
                                  id="acc-lastname"
                                  name="acc-lastname"
                                  value={this.props.ProfileCredentials.Mobile}
                                  onChange={this.onChangeMobile.bind(this)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-11">
                          <div class="row">
                            <div class="col-md-6">
                              <label for="acc-name">Date of Birth</label>
                              <div class="input-group required-field">
                               

                                <DatePicker
                                  disabled={this.state.isVisible}
                                  onKeyDown={(e) => e.preventDefault()}
                                  onChange={this.onChangeDOB.bind(this)}
                                  value={this.props.ProfileCredentials.DOB}
                          
                                  clearIcon={null}
                                  maxDate={new Date()}
                                />
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="form-group required-field">
                                <label for="acc-lastname">Gender</label>
                                <select
                                  disabled={this.state.isVisible}
                                  class="form-control"
                                  value={this.props.ProfileCredentials.Gender}
                                  onChange={this.onChangeGender.bind(this)}
                                >
                                  {this.state.GenderData.map((gender) => (
                                    <option
                                      key={gender.value}
                                      value={gender.value}
                                    >
                                      {gender.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-11">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group ">
                                <label for="acc-name">Martial Status</label>
                                <select
                                  disabled={this.state.isVisible}
                                  class="form-control"
                                  value={this.props.ProfileCredentials.Marital}
                                  onChange={this.onChangeMarital.bind(this)}
                                >
                                  {this.state.MaritalData.map((marital) => (
                                    <option
                                      key={marital.value}
                                      value={marital.value}
                                    >
                                      {marital.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="form-group ">
                                <label for="acc-lastname">Occupation</label>
                                <select
                                  disabled={this.state.isVisible}
                                  class="form-control"
                                  value={
                                    this.props.ProfileCredentials.Occupation
                                  }
                                  onChange={this.onChangeOccupation.bind(this)}
                                >
                                  {this.state.OccupationData.map(
                                    (occupation) => (
                                      <option
                                        key={occupation.value}
                                        value={occupation.value}
                                      >
                                        {occupation.label}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="mb-2"></div>

                    

                      <div class="required text-right">* Required Field</div>
                      <div class="form-footer">
           

                        <div class="form-footer-right">
                          <button
                            class="btn btn-primary"
                            disabled={this.state.isVisible}
                            onClick={this.Saveprofile.bind(this)}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <aside class="sidebar col-lg-3">
                  <div class="widget widget-dashboard">
                    <ul class="list">
                      <li>
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

                      <li class="">
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

function mapStateToProps(state) {
  return {
    ProfileCredentials: state.ProfileReducers,
  };
}

export default connect(mapStateToProps, {
  setprofiletitle,
  setprofilename,
  setprofileemail,
  setprofilemobile,
  setprofiledob,
  setprofilegender,
  setprofilemarital,
  setprofileoccupation,
  setchangeoldpassword,
  setchangenewpassword,
  setchangeconfirmpassword,
  setclearprofile,
})(Editprofile);
