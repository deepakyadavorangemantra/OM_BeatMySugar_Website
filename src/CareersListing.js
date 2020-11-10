import React from "react";
import logo from "./logo.svg";
import Header from "./Header";
import Footer from "./Footer";
import News from "./News";
import GetApiCall from "./GetApi";

import moment from "moment";

import Notiflix from "notiflix-react";
import Parser from "html-react-parser";

class CareersListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CareerData: [],
    };
  }

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    });

   
        
            Notiflix.Loading.Dots('Please wait...');
  
            GetApiCall.getRequest("GetCareerWebsite").then(resultdes =>
              resultdes.json().then(obj => {
             
              // console.log(obj.data)
              
                this.setState({
                   CareerData : obj.data
                })
  
                Notiflix.Loading.Remove()
              }))
            
    
  }

  render() {
    return (
      <div className="App">
        <Header></Header>

      
        <div class="container" >
          <div
            class="contact-banner d-none d-sm-none d-md-block"
           
          >
            <img src="/assets/images/careers-banner.jpg" alt="Careers"></img>
          </div>

          <div
            class="contact-banner d-md-none d-sm-block"
            alt="Careers"
            style={{
              background: "url('assets/images/careers-banner-mobile.jpg')",
            }}
          ></div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-10">
              <div class="row">
                {this.state.CareerData.map((career, index) => (
                  <div class="col-md-6" style={{ marginBottom: "2%" }}
                  
                  onClick={() => {
                    window.location.href = `/careers/${
                      career.fld_id +
                      "/" +
                      career.fld_title
                        .replace(/ /g, "-")
                        .replace(/\//g, "-")
                    }`;
                  }}
                  >
                    <div class="job-card">
                      <div class="job-icon">
                        <i class="fas fa-briefcase-medical"></i>
                      </div>
                      <div>
                        <h2>{career.fld_title}</h2>
                        <h5>{career.fld_employmenttype}</h5>
                        <ul>
                          <li>
                            
                            <p><i class="fas fa-suitcase"></i>{Parser(
                              career.fld_workexperience
                                .replace(/font-family/g, "")
                                .replace(/<p>/g, "")
                            )}</p>
                          </li>{" "}
                          <br />
                          <li>
                            <i class="fas fa-map-marker-alt"></i>{" "}
                            {career.fld_city}
                          </li>
                        </ul>
                        <p>
                          <b>Qualification : </b>{" "}
                          {Parser(
                            career.fld_qualification
                              .replace(/font-family/g, "")
                              .replace(/&amp;/g, "&")
                              .replace(/<p>/g, "")
                          )}
                        </p>
                        {/* <a
                          onClick={() => {
                            window.location.href = `/careers/${
                              career.fld_id +
                              "/" +
                              career.fld_title
                                .replace(/ /g, "-")
                                .replace(/\//g, "-")
                            }`;
                          }}
                          class="view-job"
                          style={{ color: "#507dbe" }}
                        >
                          View Job
                        </a> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
    );
  }
}

export default CareersListing;
