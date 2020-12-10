import React, { Component } from 'react'
import GetApiCall from "../GetApi";
import Parser from "html-react-parser";
import Notiflix from "notiflix-react";
import moment from "moment";
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";
import PostApiCall from "../Api";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { connect } from "react-redux";
import { 
  setcartitemcount,
  setcartamount
} from "../Actions/actionType";

class BannerHP extends Component {
    constructor(props) {
        super(props)
    
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
            bannerHome:[],
            images:[]
          };
    }
    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

    componentDidMount() {


      let images=[]
      PostApiCall.postRequest(
        {
          verticle : 'Home',
          type:''
        }
        ,"Get_AdBannerWebsite").then(resultdes =>
        resultdes.json().then(obj => {
          // console.log(obj.data)
          if(obj.data){
            obj.data.map(singledata=>{
             images.push(singledata.fld_image)
            })
          }
          var sortedimages = obj.data.sort((a, b) =>
            a.fld_order - b.fld_order
          )
          // console.log(dtfl)
            this.setState({
              bannerHome:sortedimages,
              images:images
            }) 
          }))
  
    }
    
    render() {
      const banner = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
        slidesToScroll: 1,
        arrows: false,
        autoplaySpeed: 5000
      };
      var image=[]
        return (
            <div>
            <div class="container">
           
         
         
            <div class="home-slider-container d-none d-sm-none d-md-block">
                  <Slider {...banner}>
           
                    {this.state.bannerHome&&this.state.bannerHome.map(info=>{
                      image.push(info.fld_image)
                    return  <div>
                    {/* <a href={info.fld_url} target="_blank"> */}
                       <img 
                       onClick={()=>{
                         if(info.fld_url != ''){
                          window.open(info.fld_url, '_blank');
                         }
                       
                       }}
                       src={info.fld_image}></img>
                    {/* </a> */}
                      </div>

                    })
                    }                      
                  </Slider>
            </div>

            <div class="home-slider-container d-md-none d-sm-block">
               <Slider {...banner}>
               
                    {this.state.bannerHome&&this.state.bannerHome.map(info=>{
                      image.push(info.fld_mobileimage)
                    return  <div>
                        <img 
                         onClick={()=>{
                          if(info.fld_url != ''){
                            window.open(info.fld_url, '_blank');
                           }
                         }}
                        src={info.fld_mobileimage}></img>
                      </div>

                    })
                    }                      
                  </Slider>
              </div>
         
         
            </div>

            </div>
        )
    }
}


export default BannerHP
