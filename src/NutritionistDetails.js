import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import PostApiCall from "./Api";
import Parser from "html-react-parser";
import Notiflix from "notiflix-react";
import GetApiCall from "./GetApi";
import moment from "moment";
import BlogSection from "./BlogSection";

class NutritionistDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Doctor: [],
      DoctorHealthCenter: [],
      Blog: [],
      SocialPosts1: "",
      SocialPosts2: "",
      BreadCrumCity: "",
    };
  }

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    });

    Notiflix.Loading.Dots("Please wait...");

    PostApiCall.postRequest(
      {
        id: this.props.match.params.nutritionistid.split("-")[0],
      },
      "GetNutritionistDetailsWeb"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {
          this.setState({
            Doctor: obj.data[0],
          });
          Notiflix.Loading.Remove();
        }
      })
    );

    PostApiCall.postRequest(
      {
        id: this.props.match.params.nutritionistid.split("-")[0],
      },
      "GetNutritionistHealthCenterWeb"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {
          this.setState({
            DoctorHealthCenter: obj.data,
          });
        }
      })
    );

    GetApiCall.getRequest("GetSocialPosts").then((resultdes) =>
      resultdes.json().then((obj) => {
        //  Notiflix.Loading.Remove()

        //         }

        var x = Math.floor(Math.random() * obj.data.length);
        var y = Math.floor(Math.random() * obj.data.length);

        do {
          y = Math.floor(Math.random() * obj.data.length);
        } while (y == x);

        this.setState({
          SocialPosts1: obj.data[x].fld_imageurl,
          SocialPosts2: obj.data[y].fld_imageurl,
        });

        //    console.log(obj.data[x])
      })
    );

   
  }

  truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  render() {
    return (
      <div>
        <Menu></Menu>
        <main class="main">
          <nav aria-label="breadcrumb" class="breadcrumb-nav">
            <div class="container">
              <ol class="breadcrumb">
                {/* <li class="breadcrumb-item">
                  <a href="/">
                    <i class="icon-home"></i>
                  </a>
                </li>
                <li class="breadcrumb-item" aria-current="page">
                  Nutritionists / Dietitians
                </li>
                {this.state.BreadCrumCity != "" ? (
                  <li class="breadcrumb-item" aria-current="page">
                    {this.state.BreadCrumCity}
                  </li>
                ) : (
                  ""
                )}
                
                <li class="breadcrumb-item active" aria-current="page">
                  {this.state.Doctor.fld_name}
                </li> */}
              </ol>
            </div>
            {/* <!-- End .container --> */}
          </nav>
          <div class="container doctors-section" style={{ marginTop: "0px" }}>
            <div class="row ">
              <div class="col-md-9">
                <div class="doctors-box doctor-inner-page">
                  <div class="row">
                    <div class="col-md-3">
                      <img
                        src={this.state.Doctor.fld_photo}
                        class="doctor-details-image"
                      />
                    </div>
                    <div class="col-md-6 doctors-details ">
                      <h3>
                        {this.state.Doctor.fld_name == undefined
                          ? ""
                          : this.state.Doctor.fld_name}
                      </h3>

                      <div class="specialist">
                        {this.state.Doctor.Qual != undefined ? (
                          this.state.Doctor.Qual.split(",").map(
                            (doc1, index1) => (
                              <span>
                                <p>{doc1}</p>
                              </span>
                            )
                          )
                        ) : (
                          <div></div>
                        )}

                        {/* <span><p>Dentist</p></span>
                                            <span><p>Orthodontist</p></span> */}
                      </div>

                      <div class="clearfix"></div>

                      {this.state.Doctor.fld_overallexperience == undefined || this.state.Doctor.fld_overallexperience == 0
                        ? "" :
                    <p>
                      <i class="fas fa-angle-double-right"></i> Overall{" "}
                      
                         {this.state.Doctor.fld_overallexperience}{" "}
                      years of experience
                    </p>}

                    {this.state.Doctor.fld_profile == '' || this.state.Doctor.fld_profile == null || this.state.Doctor.fld_profile == 'NULL'
                        ? ""
                        :
                    <p class="doc-desc">
                      <b>Profile</b>
                      <br></br>
                      { Parser(
                            ("<p>" + this.state.Doctor.fld_profile + "</p>")
                              .replace(/font-family/g, "")
                              .replace(/color/g, "")
                          )}
                    </p>}
                    {this.state.Doctor.fld_medicalassociation == '' || this.state.Doctor.fld_medicalassociation == null || this.state.Doctor.fld_medicalassociation == 'NULL'
                        ? ""
                        : 
                    <p class="doc-desc">
                      <b>Medical Association</b>
                      <br></br>
                      {Parser(
                            ("<p>" + this.state.Doctor.fld_profile + "</p>")
                              .replace(/font-family/g, "")
                              .replace(/color/g, "")
                          )}
                    </p>}

                    {this.state.Doctor.fld_rewardsrecognition == '' || this.state.Doctor.fld_rewardsrecognition == null || this.state.Doctor.fld_rewardsrecognition == 'NULL'
                        ? ""
                        : 
                    <p class="doc-desc">
                      <b>Rewards & Recognition</b>
                      <br></br>
                     {Parser(
                            ("<p>" + this.state.Doctor.fld_profile + "</p>")
                              .replace(/font-family/g, "")
                              .replace(/color/g, "")
                          )}
                    </p>}



                      <div class="margin-top-space">
                        {this.state.Doctor.fld_teleonlineconsultation == "No" &&
                        this.state.Doctor.fld_homevisit == "No" ? (
                          <p></p>
                        ) : (
                          <p>
                            <b>Consultations</b>
                          </p>
                        )}
                        {this.state.Doctor.fld_teleonlineconsultation ==
                        "No" ? (
                          ""
                        ) : (
                          <p>
                            <i class="fas fa-globe"></i> Available for
                            Online/Tele Consultation
                          </p>
                        )}
                        {this.state.Doctor.fld_homevisit == "No" ? (
                          ""
                        ) : (
                          <p>
                            <i class="fas fa-home"></i> Available for Home Visit
                          </p>
                        )}
                      </div>
                    </div>
                    {/* <div class="col-md-3 doctors-details doctor-contact-details doctor-details-inner contactdetails-align">
                                    <p><a href={"mailto:"+this.state.Doctor.fld_email} style={{textTransform:"lowercase"}}><i class="fas fa-envelope"></i> {this.state.Doctor.fld_email}</a></p>
                                    <p><a href={"tel:(+91)" + this.state.Doctor.fld_mobile} style={{textTransform:"lowercase"}}><i class="fas fa-phone-volume"></i> +91 {this.state.Doctor.fld_mobile}</a></p>
                                    <ul class="doctor-social-media">
                                    {(this.state.Doctor.fld_facebooklink == null || this.state.Doctor.fld_facebooklink == '') ? '' : <li><a href={this.state.Doctor.fld_facebooklink}><i class="icon-facebook"></i></a></li> } 
                                    {(this.state.Doctor.fld_instagramlink == null || this.state.Doctor.fld_instagramlink == '') ? '' : <li><a href={this.state.Doctor.fld_instagramlink}><i class="icon-instagram"></i></a></li> }  
                                    {(this.state.Doctor.fld_twitterlink == null || this.state.Doctor.fld_twitterlink == '') ? '' :  <li><a href={this.state.Doctor.fld_twitterlink}><i class="icon-twitter"></i></a></li> }  
                                    {(this.state.Doctor.fld_linkedinlink == null || this.state.Doctor.fld_linkedinlink == '') ? '' :  <li><a href={this.state.Doctor.fld_linkedinlink}><i class="icon-linkedin"></i></a></li>}  
                          
                                    </ul>
                                  
                                </div> */}
                  </div>
                </div>

                <div
                  class="doctors-box doctor-inner-page doctors-details"
                  style={{
                    display:
                      this.state.DoctorHealthCenter.length == 0 ? "none" : "",
                  }}
                >
                  <div class="row">
                    <div class="col-md-12">
                      <h4>Health Centers Associated With</h4>
                    </div>

                    {this.state.DoctorHealthCenter.map((doc, index) => (
                      <div class="col-md-3">
                        <p>
                          <b>
                            {doc.fld_city}, {doc.fld_state}
                          </b>
                        </p>
                        <table>
                          <tr>
                            <td>
                              {" "}
                              <i class="fas fa-map-marker-alt margin-space"></i>
                            </td>
                            <td>
                              <span>{doc.fld_name}</span>
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>{doc.fld_address}</td>
                          </tr>

                          <tr>
                            <td></td>
                            <td>Landmark: {doc.fld_landmark},</td>
                          </tr>
                          <tr>
                            <td></td>
                            {/* <td>
                                                    <p><a href="#" style={{textTransform:"lowercase"}}><i class="fas fa-phone-volume"></i> {doc.fld_phone}</a></p>
                                                    </td> */}
                          </tr>
                          <tr>
                            <td></td>
                            <td>
                              {/* <b>Timings</b> */}
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            {/* <td>Mon - Sat</td> */}
                          </tr>
                          <tr>
                            <td>
                              {/* <i class="fas fa-clock"></i> */}
                            </td>
                            {/* <td>
                              {doc.fld_fromtime.split(":")[0] +
                                ":" +
                                doc.fld_fromtime.split(":")[1] +
                                " " +
                                doc.fld_fromtime.split(" ")[1]}{" "}
                              -{" "}
                              {doc.fld_totime.split(":")[0] +
                                ":" +
                                doc.fld_totime.split(":")[1] +
                                " " +
                                doc.fld_totime.split(" ")[1]}
                            </td> */}
                          </tr>
                          {/* <tr class="location">
                                                            <td><i class="fas fa-map-marked-alt margin-space"></i></td>
                                                            <td><a href="">Get Location</a></td>
                                                        </tr> */}
                        </table>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
              class="col-md-3"
              //    class="col-lg-4 col-md-6 col-sm-6 col-12"
            >
             <div style={{marginTop: '0px',marginBottom:"30px",padding:"20px",background:"#fff"}}>
    <div id="blogbanner"></div>
</div>           
            </div>

              
            </div>
           
          </div>
          <BlogSection />
          <div class="container">
            <div class="container-box container-box-lg info-boxes ">
                                        <div class="row">
                                          <div class="col-md-12">
                                          
                                         <p style={{textAlign:"justify",fontSize:"13px"}}><b>Disclaimer:</b> You understand that the Website/App, apart from acting as a facilitator between vendors and customers, also acts as a facilitator between doctors/registered medical practitioners/dietitians/ nutritionists etc. (“Medical Practitioners”) and users/patients, where users/patients can locate Medical Practitioners and make appointments for consultation. Patients/users can use the Website/App freely to easily locate Medical Practitioners. We are not a party to such interaction and take no liability that arises from any such acts/omissions of Medical Practitioners.
</p>
<p style={{textAlign:"justify",fontSize:"13px"}}>We shall not be held liable neither to the Medical Practitioners nor to the patients/users for any offer of service/consultation/communication made between them for whatsoever reason it may be. Further, We shall not be held liable either by the Medical Practitioners nor the patients/users for any technical mishap of whatever kind resulting from the consultation with the Medical Practitioners. </p>
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

export default NutritionistDetails;
