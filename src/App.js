/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Menu from "./Header";
import Footer from "./Footer";
import GetApiCall from "./GetApi";
import Parser from "html-react-parser";
import Notiflix from "notiflix-react";
import moment from "moment";
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";
import PostApiCall from "./Api";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DiwaliOffersHP from "./DiwaliOffersHP";
import { connect } from "react-redux";
import { setcartitemcount, setcartamount } from "./Actions/actionType";
import FoodHP from "./HomePage/FoodHP";
import FootwearHP from "./HomePage/FootwearHP";
import SocksHP from "./HomePage/SocksHP";
import BannerHP from "./HomePage/BannerHP";
import HealthHP from "./HomePage/HealthHP";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Device: [],
      Foot: [],
      Book: [],
      activeItemIndex: 0,
      Blog: [],
      Doctor: [],
      DoctorRef: [],
      Nutri: [],

      Food: [],
      Footwear: [],
      Socks: [],
      ProductData: [],

      bannerHome: [],
      images: [],
    };
  }

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

 
  render() {
   
    return (
      <div className="App">
        <div class="page-wrapper">
          <Menu></Menu>

          <main class="main">
           <BannerHP />
            <div>
              <DiwaliOffersHP />
           
            </div>
           <FoodHP />
           <FootwearHP/>
           <SocksHP />
        <HealthHP />
            {/* <div class="container">
              <div class="app-section margin-top margin-bottom">
                <div class="app-section-bg">
                  <div class="row ">
                    <div class="col-md-12">
                      <h3 class="app-title center-block text-center">
                        Testimonials
                      </h3>
                      <Slider {...testimonialSlider}>
                        <div class="testimonial center-block">
                          <i class="fas fa-quote-right testimonial-quote"></i>
                          <p class="user-text">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries,
                          </p>
                          <p class="user-name">Charles K. Silvey</p>
                          <p class="testimonial-city">Chennai</p>
                        </div>
                        <div class="testimonial center-block">
                          <i class="fas fa-quote-right testimonial-quote"></i>
                          <p class="user-text">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries,
                          </p>
                          <p class="user-name">Charles K. Silvey</p>
                          <p class="testimonial-city">Chennai</p>
                        </div>
                        <div class="testimonial center-block">
                          <i class="fas fa-quote-right testimonial-quote"></i>
                          <p class="user-text">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries,
                          </p>
                          <p class="user-name">Charles K. Silvey</p>
                          <p class="testimonial-city">Chennai</p>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div class="container">
                <section class="promotionWrapper" style={{backgroundImage: "url(/assets/images/Parallax/parallax1.jpg)"}}>
                <div class="overlay">
    <div class="container">
      <div class="promotionInfo"> 
  
        <h3>At BeatMySugar, we care for you because we are either managing the condition ourselves, or have seen our loved ones struggle with Diabetes.</h3>
       
       
      </div>
    </div>
    </div>
  </section>
                </div> */}

            <div class="clearfix"></div>

            {/* 
                <div class="container margin-top margin-bottom healthcare-slider">
                        <h3 class="section-title margin-bottom">Doctors</h3>
                        <div>
                            <a href="/doctor" class="view-all-btn-book">View All Doctors</a>
                           
                        </div>
                        <div class="row">

                        {this.state.Doctor.map(
                              (doc,index) => (

                            <div class="col-md-2">
                                    <div class="doctors-list">
                                        <img src={doc.fld_photo}></img>
                                        <a onClick={()=>{this.onDocDetailsView(doc)}}>  <p class="doctor-name">{doc.fld_title+' '+this.truncate(doc.fld_name,15)}</p></a>
                                        <p class="doctor-qualification">{doc.Qual}</p>
                              {doc.fld_overallexperience == 0 ? <p class="doctor-qualification"></p> : 
                              <p class="doctor-qualification">Overall {doc.fld_overallexperience} years of experience 
                             
                              </p>
                              }  
                                       
                                        {doc.HealthCenterCity == null ?  <br/> :   <p class="doctor-qualification"><i class="fas fa-map-marker-alt"></i> {doc.HealthCenterCity == null ? '' : doc.HealthCenterCity}</p>}

                                        <div class="border-line"></div>
                                        <a onClick={()=>{this.onDocDetailsView(doc)}} style={{color:"white"}} class="viewprofile-btn">View Profile</a>
                                    </div>
                            </div>
                              ))}

                          
                        </div>
                       
                </div>

             */}

            {/* <div class="container margin-top margin-bottom healthcare-slider marginbtm-240">
                        <h3 class="section-title margin-bottom custom-size">Nutritionists / Dietitians</h3>
                        <div>
                            <a href="/dietitian" class="view-all-btn-book">View All</a>
                           
                        </div>
                        <div class="row">
                        {this.state.Nutri.map(
                              (doc,index) => (

                            <div class="col-md-2">
                                    <div class="doctors-list dietitians">
                                        <img src={doc.fld_photo}></img>
                                      <a
                                      onClick={()=>{this.onDietDetailsView(doc)}}
                                      > <p class="doctor-name">{this.truncate(doc.fld_name,20)}</p></a> 
                                        <p class="doctor-qualification">{doc.Qual}</p>
                                      {doc.fld_overallexperience == 0 ? <p class="doctor-qualification"></p> : 
                              <p class="doctor-qualification">Overall {doc.fld_overallexperience} years of experience </p>
                              }  
                                      
                                    {doc.HealthCenterCity == null ?  <br/> :  <p class="doctors-location"><i class="fas fa-map-marker-alt" style={{color: '#507dbe'}}></i> {doc.HealthCenterCity == null ? '' : doc.HealthCenterCity}</p>}
                                                     
                                        <div class="border-line"></div>
                                        <a style={{color:"white"}}  onClick={()=>{this.onDietDetailsView(doc)}} class="viewprofile-btn">View Profile</a>
                                    </div>
                            </div>

                              ))}
                          
                        </div>
                       
                </div> */}

            <div class="clearfix"></div>

            {/* <div class="app-section margin-top margin-bottom">
                        <div class="row app-section-bg"> */}
            {/* <div class="col-md-6">
                                    <img src="assets/images/mobile.png" class="app-image"/>
                                    <h3 class="app-title">Download App</h3>
                                    <p class="app-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                                    <ul class="app-list-images">
                                        <li><img src="assets/images/android.png"/></li>
                                        <li><img src="assets/images/apple.png" style={{width:'165px'}}/></li>
                                    </ul>
                                </div>
                            <div class="col-md-6 border-left-shadow">
                                <h3 class="app-title center-block text-center">Testimonials</h3>
                                <div class="testimonial-slider owl-carousel owl-theme">
                                    <div class="testimonial center-block">
                                        <img src="http://magento2.codazon.com/unlimited/pub/media/wysiwyg/codazon/main-content-01/testimonial/test-02.jpg" class="user-image center-block"/>
                                        <p class="user-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                                        <p class="user-name">Charles K. Silvey
                                        </p>
                                    </div>
                                    <div class="testimonial center-block">
                                        <img src="http://magento2.codazon.com/unlimited/pub/media/wysiwyg/codazon/main-content-01/testimonial/test-03.jpg" class="user-image center-block"/>
                                        <p class="user-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                                        <p class="user-name">Charles K. Silvey
                                        </p>
                                    </div>
                                    <div class="testimonial center-block">
                                        <img src="http://magento2.codazon.com/unlimited/pub/media/wysiwyg/codazon/main-content-01/testimonial/test-02.jpg" class="user-image center-block"/>
                                        <p class="user-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                                        <p class="user-name">Charles K. Silvey
                                        </p>
                                    </div> */}

            {/* </div> */}
            {/* </div> */}
            {/* </div>

                    </div> */}

            <div class="container margin-top"></div>
          </main>
          {/* <div class="container-box container-box-lg info-boxes container">
                                        <div class="row">
                                          <div class="col-md-12">
                                            <h3>Join Our Team</h3>
                                            <p style={{fontSize : '14px'}}>If you have the traits of <span><i>"challenging the status quo", "self driven", "hunger to learn & contribute", "vibrancy of a team person"</i></span>.<br/>Let's have a chat over a cup of coffee / tea.<br/><br/>Do reach out to us <span><a href="mailto:hr@beatmysugar.com" style={{color: '#507dbe'}}>hr@beatmysugar.com</a></span> 
                                            
</p>
<p><a href="/careers" class="career-btn">View Job Openings</a></p>
                                          </div>
                                         
                                        
                    
                                         
                                        
                                                 
                                        </div>
                    
                                       
                    
                                      
                                    </div> */}

          <Footer></Footer>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    CartReducer: state.CartReducer,
  };
}

export default connect(mapStateToProps, {
  setcartitemcount,
  setcartamount,
})(App);
