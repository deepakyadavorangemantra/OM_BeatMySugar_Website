import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PostApiCall from "./Api";
import Parser from "html-react-parser";
import Notiflix from "notiflix-react";
import GetApiCall from "./GetApi";
import moment from "moment";
import BlogSection from "./BlogSection";

class ContributorDetails extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      SelectedContributors: [],
      Contributors : [],
      SocialPosts1: "",
      SocialPosts2: "",
      BreadCrumCity: "",
      Name : ''
    };
  }


  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",

    });

    Notiflix.Loading.Dots("Please wait...");

  

    PostApiCall.postRequest(
      {
        id: this.props.match.params.contributorid.split("-")[0],
      },
      "GetContributorDetailsWebsite"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {

          this.setState({
            SelectedContributors: obj.data[0],
            
          });

 
        }
      })
    );

    

    GetApiCall.getRequest("GetContributorsWebsite").then((resultdes) =>
    resultdes.json().then((obj) => {

      this.setState({
        Contributors : obj.data
      })
      Notiflix.Loading.Remove()
    }))

  }


  onViewContributor(name, id){
  
    window.location.href = `/contributors/${id+"-"+name.replace( / /g,'-')}`
      }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <nav aria-label="breadcrumb" class="breadcrumb-nav">
          <div class="container">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/">
                  <i class="icon-home"></i>
                </a>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                Contributors
              </li>
              
          
              <li class="breadcrumb-item" aria-current="page">
                {this.state.SelectedContributors.fld_name}
              </li>
             
         
            </ol>
          </div>
          {/* <!-- End .container --> */}
        </nav>
        <main class="main">
          <div class="container doctors-section">
          <h3 class="section-title" style={{color : '',marginBottom : '30px'}}>Meet Our Knowledge Contributors</h3>
            <div class="row">
              <div class="col-md-12">
                <div class="doctors-box doctor-inner-page">
                  <div class="row">
                    <div class="col-md-2">
                      <img src={this.state.SelectedContributors.fld_photo == '' ||this.state.SelectedContributors.fld_photo == null ?  "/assets/images/user.png" : this.state.SelectedContributors.fld_photo} />
                    </div>
                    <div class="col-md-10 doctors-details ">
                   <h3>{this.state.SelectedContributors.fld_title+' '+this.state.SelectedContributors.fld_name}</h3>

                    <p>{this.state.SelectedContributors.fld_designation}</p>

                      <div class="clearfix"></div>

                      <p class="doc-desc cont-desc">
                      { Parser(
                            ("<p>" + this.state.SelectedContributors.fld_shortdescription + "</p>")
                              .replace(/font-family/g, "")
                              .replace(/color/g, "")
                          )}
                      </p>

                      <p class="profile-sec">
                        <b>Profile</b>
                      </p>
                      <p class="profile">
                      { Parser(
                            ("<p>" + this.state.SelectedContributors.fld_profile + "</p>")
                              .replace(/font-family/g, "")
                              .replace(/color/g, "")
                          )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <h3 class="section-title">Other Contributors</h3>
              </div>
            </div>
            <div class="row">
            {this.state.Contributors.map(
                              (doc,index) => (
              <div class="col-md-4">
                <div class="doctors-box hvr-underline-reveal">
                  <div class="row">
                    <div class="col-md-3">
                      <img 
                      onClick={()=>{this.onViewContributor(doc.fld_name,doc.fld_id)}}
                      src={doc.fld_photo == '' ||doc.fld_photo == null ?  "/assets/images/user.png" : doc.fld_photo}  />
                    </div>
                    <div class="col-md-9 doctors-details">
                      <h3>{doc.fld_title+' '+doc.fld_name}</h3>
                      <p>{doc.fld_designation}</p>

                      <div class="clearfix"></div>
                      <div class="doctors-details doctor-contact-details contributor-sec">
                        <p style={{ fontSize: "13px", lineHeight: "18px" }}>
                        { Parser(
                            ("<p>" + doc.fld_shortdescription + "</p>")
                              .replace(/font-family/g, "")
                              .replace(/color/g, "")
                          )}
                        </p>
                      </div>
                      <a
                          onClick={()=>{this.onViewContributor(doc.fld_name,doc.fld_id)}}
                        class="btn view-profile-btn"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="doctors-box">
                  <h4>Editorial Policy</h4>
                  <p>The aim of the Health Knowledge vertical of BeatMySugar is to bring you quality health content in an easy to understand language. The medical writing team at BeatMySugar puts in a lot of effort to write complex scientific information in a simple and easy to understand manner while making sure that the basics of the information remain intact.
</p>
                          <h4>Our writers and reviewers
</h4>
<p>The content for BeatMySugar’s website is curated and then written by medical writers, registered nutritionists/dietitians, diabetes educators, and other contributors. The medical content is reviewed by physicians/medical specialists with vast experience in clinical practice.</p>
                          <h4>Sources and references for content</h4>
                          <p>Our team members source the content from various medical journals like review articles, research articles, standard guidelines, and consensus statements released by the national and international governing health bodies and textbooks and patient leaflets available for writing information for the medicines.
</p>
                          <h4>Process of content creation and updates
</h4>
                          <p>Our medical writing team curates content from various authentic sources and writes the articles in a simplified and easy to read format. Once the articles are prepared, these are reviewed by our medical reviewers for consistency, accuracy, and fact-checking.
 
 With continuous new research and innovation coming in, our team of writers and reviewers makes a lot of effort to regularly update the content. To keep the content updated, our team regularly looks out for new research articles and health news space for any change in standards of practice, clinical guidelines, consensus statements, or and if there is any new information available with regards to the medicines or devices.
 </p>
 <h4>Feedback</h4>
 <p>We also look forward to your feedback on our content to make it better. You can write to us at - wecare@beatmysugar.com for any issue with our content if it is not clear, seems incomplete, inaccurate, or not updated. Our writing team will look into the feedback and would make the necessary changes wherever required and republish it. </p>
               <p>We are putting in our best efforts, and it is our continuous endeavor to create a health knowledge platform that would possibly have all the information in the area of diabetes and its associated conditions.
</p>
<p>BeatMySugar is a platform to provide common knowledge around diabetes, related medicines, health products, diet, and other associated health conditions. Absence of any information does not imply or assure that the use of a particular medicine, diet or therapy is/is not safe, appropriate, or effective for you or anyone else. This content is only for general awareness and informational purposes only and is not a substitute or alternative to the advice of your doctor, nurse, or other qualified healthcare provider.
</p>
<p>BeatMySugar does not assume any responsibility for any outcome arising out of the information provided on this platform. Please take the advice of your doctor or nurse or a qualified healthcare provider for the management of your health condition, which includes but is not limited to any change in your medicine, diet, physical activity or moving on to a new therapy. Do not delay in seeking the doctor's advice when needed for any product or health condition, even if you have read about that on our platform.
 
 </p>
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

export default ContributorDetails;
