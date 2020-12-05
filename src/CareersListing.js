import React from "react";
import logo from "./logo.svg";
import Header from "./Header";
import Footer from "./Footer";
import News from "./News";
import GetApiCall from "./GetApi";
import PostApiCall from "./Api";
import moment from "moment";

import Notiflix from "notiflix-react";
import Parser from "html-react-parser";

class CareersListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CareerData: [],

      bannerfood:[],
      images:[]
    };
  }

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    });

   
    PostApiCall.postRequest(
      {
        verticle : 'Careers',
        type:''
      }
      ,"Get_AdBannerWebsite").then(resultdes =>
    resultdes.json().then(obj => {
      // console.log(obj.data)
      if(obj.data.length > 0)
      {
        this.setState({
          bannerfood:[obj.data[0]],
          // images:images
        })   }  
      }))

        
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

     
        <div class="container ad-banner">

<div class="d-none d-sm-none d-md-block">
{this.state.bannerfood && this.state.bannerfood.map(info=>(

// image.push(info.fld_image)
// console.log(this.state.images,"images")    
<img 
 onClick={()=>{
  if(info.fld_url != ''){
    window.open(info.fld_url, '_blank');
   }
 }}
src={info.fld_image}/>     
        ))
}

</div>

  <div id="myTargetMobile" class="d-md-none d-sm-block">

  {this.state.bannerfood && this.state.bannerfood.map(info=>(

<img 
 onClick={()=>{
  if(info.fld_url != ''){
    window.open(info.fld_url, '_blank');
   }
 }}
src={info.fld_mobileimage}/>   

  ))
}

  </div>


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
