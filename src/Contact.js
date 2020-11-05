import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import moment from "moment";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NumRegex: /^0|[0-9]\d*$/,
      MobileRegex: /^[0-9]*$/,
      AlphaNumericRegex: /^[a-zA-Z0-9]*$/,
      SpecialRegex: /[-!$%^&*()_+|~=`'"{}\[\]:\/;<>?,.@#]/,
      EmailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      UrlRegex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,

      Name: "",
      CompanyName: "",
      Mobile: "",
      Email: "",
      Message: "",
    };
  }

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",

    });
  }

  Submit() {
    if (this.state.Name != "") {
      
        if (this.state.Email != "") {
          if (this.state.EmailRegex.test(this.state.Email)) {
            if (this.state.Mobile != "" && this.state.Mobile.length != 10) {
              Notiflix.Notify.Failure("Please enter a valid Mobile Number.");
            } else {
              if (this.state.Message != "") {
                Notiflix.Loading.Dots("Please wait...");

                PostApiCall.postRequest(
                  {
                    name: this.state.Name,
                    email: this.state.Email.trim(),
                    mobile: this.state.Mobile,
                    company: this.state.CompanyName,
                    message: this.state.Message,
                  },
                  "ContactUsMailer"
                ).then((results2) =>
   
                  results2.json().then((obj2) => {
                    if (results2.status == 200 || results2.status == 201) {
                      Notiflix.Loading.Remove();
                      Notiflix.Notify.Success(
                        "We" +
                          "'" +
                          "ve received your message. We" +
                          "'" +
                          "ll get back soon."
                      );
                      window.location.reload();
                    }
                  })
                );
              } else {
                Notiflix.Notify.Failure("Please enter a Message.");
              }
            }
          } else {
            Notiflix.Notify.Failure("Please enter a valid Email Address.");
          }
        } else {
          Notiflix.Notify.Failure("Please enter your Email Address.");
        }
    
    } else {
      Notiflix.Notify.Failure("Please enter your Name");
    }
  }

  render() {
    return (
      <div>
        <Menu></Menu>
        <main class="main">
          <div class="container">
            <div class="contact-banner d-none d-sm-none d-md-block">
              <img src="assets/images/contact-banner.jpg"/>
            </div>

            <div
              class="contact-banner d-md-none d-sm-block"
              style={{
                background: "url('assets/images/adbanners/ad-banner-2.jpg')",
              }}
            ></div>
            <div class="contact-box">
              <div class="row">
                <div class="col-md-12">
               
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div
                    class="write-to-us"
                    style={{
                      height: "100%",
                      padding: "40px 45px 40px",
                      background: "#fff",
                    }}
                  >
                    <h1 class="light-title">
                      Write to <strong>Us</strong>
                    </h1>
                    <p style={{ textAlign: "left" }}>
                      We would definitely get back to you !
                    </p>
                 
                    <div class="row">
                      <div class="form-group required-field col-md-6">
                        <label for="contact-name">Name</label>
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.Name}
                          onChange={(text) => {
                            this.setState({
                              Name: text.target.value,
                            });
                          }}
                          required=""
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <label for="contact-email">Company Name</label>
                        <input
                          type="email"
                          class="form-control"
                          value={this.state.CompanyName}
                          onChange={(text) => {
                            this.setState({
                              CompanyName: text.target.value,
                            });
                          }}
                          required=""
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="form-group col-md-6 required-field">
                        <label for="contact-phone">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          value={this.state.Email}
                          onChange={(text) => {
                            this.setState({
                              Email: text.target.value,
                            });
                          }}
                          required=""
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="contact-phone">Mobile</label>
                        <input
                          class="form-control"
                          value={this.state.Mobile}
                          onChange={(text) => {
                            if (
                              this.state.MobileRegex.test(text.target.value) &&
                              text.target.value.length <= 10
                            ) {
                              this.setState({
                                Mobile: text.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div class="form-group required-field">
                      <label for="contact-message">Message</label>
                      <textarea
                        cols="30"
                        rows="5"
                        class="form-control"
                        required=""
                        value={this.state.Message}
                        onChange={(text) => {
                          this.setState({
                            Message: text.target.value,
                          });
                        }}
                      ></textarea>
                    </div>

                    <div class="form-footer">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={this.Submit.bind(this)}
                      >
                        Submit
                      </button>
                    </div>
             
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="address-box">
                    <iframe
                      class="iframe-contactus"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28079.170145951513!2d77.32772678800701!3d28.392200880829673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd480055cd3d%3A0x3ff458fc75f3db42!2sPuri%2081%20Business%20Hub!5e0!3m2!1sen!2sin!4v1576822810434!5m2!1sen!2sin"
                      width="600"
                      height="100"
                      frameborder="0"
                      allowfullscreen=""
                    ></iframe>
                    <div class="contact-info">
                      <img src="/assets/images/bms-logo.png"></img>
                      <div>
                        <p>Rx Health Management India Pvt Ltd</p>
                        <p>12th Floor, Puri 81 Business Hub,</p>
                        <p>Sec-81, Faridabad,</p>
                        <p>Haryana – 121 001. INDIA.</p>
                      </div>

                      <div>
                        <table style={{width:"100%"}}>
                          <tr>
                            <td style={{width:"10%"}}>
                              <img src="/assets/images/customer-support.png" class="small-icon"></img>
                            </td>
                            <td style={{width:"85%"}}>
                              <p>
                                <b>Customer Support</b>
                              </p>
                              <p>
                                For any queries/suggestions, connect with our
                                customer care
                              </p>
                              <p>
                                Call Us at{" "}
                                <a href="tel:9024422444">+91 90244 22444 </a><br></br>
                                (10am - 6pm IST, MON to SAT) 
                              </p>
                              <p>
                                Email us at{" "}
                                <a href="mailto:wecare@beatmysugar.com">
                                  wecare@beatmysugar.com{" "}
                                </a>
                              </p>
                            </td>
                          </tr>
                        </table>

                        <table style={{width:"100%"}}>
                          <tr>
                            <td style={{width:"10%"}}>
                            <img src="/assets/images/work-with-us.png" class="small-icon"></img>
                            </td>
                            <td style={{width:"85%"}}>
                              <p>
                              <a href="/careers" target="_blank" style={{color:'#000'}}> <b>Looking to work with us</b></a>
                              </p>

                              <p>
                                Send us your resume to{" "}
                                <a href="mailto:hr@beatmysugar.com">
                                  hr@beatmysugar.com
                                </a>
                              </p>
                            </td>
                          </tr>
                        </table>

                        <table style={{width:"100%"}}>
                          <tr>
                            <td style={{width:"10%"}}>
                            <img src="/assets/images/list-your-products.png" class="small-icon"></img>
                            </td>
                            <td style={{width:"85%"}}>
                              <p>
                                <a href="/sellwithus" target="_blank" style={{color:'#000'}}><b>Wish to list your products with us</b></a>
                              </p>
                              <p>
                                Send us an enquiry with your company and product
                                details to
                                <a href="mailto:vendor@beatmysugar.com">
                                  {" "}
                                  vendor@beatmysugar.com
                                </a>
                              </p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-4"></div>
              </div>
            </div>

            <div class=" doctors-section">
              <div class="row mt-2">
                <div class="col-md-4"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default Contact;
