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

class HealthHP extends Component {
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
          };
    }
    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

    componentDidMount() {
    //   Notiflix.Loading.Init({
    //     svgColor: "#507dc0",
    //   });
  
    //   Notiflix.Loading.Dots("Please wait...");
    
      GetApiCall.getRequest("GetBlogNine").then((resultdes) =>
        resultdes.json().then((obj) => {
          // console.log(obj.data)
  
          if (JSON.stringify(obj.data) != "[]") {
            var arr = [];
            for (var i = 0; i < 4; i++) {
              arr.push(obj.data[i]);
  
              this.setState({
                Blog: arr,
              });
            }
          }
  
          Notiflix.Loading.Remove();
        })
      );
    }
    
    onBlogView(blog) {
        window.location.href = `/healthknowledge/${blog.fld_category.replace(/ /g,"-" )}/${
          (blog.fld_subcategory != "" && blog.fld_subcategory != null
            ? blog.fld_subcategory.replace(/\W|_/g,"")
            : moment(blog.fld_publishdate).format("ll")) + "/"
        }${
          blog.fld_id +
          "-" +
          blog.fld_title.replace(/\W|_/g,"")
        }`;
      }

    render() {
        return (
            <div>
            <div class="container blog-section">
            <h3 class="section-title margin-bottom">Health Knowledge</h3>
            <div>
              <a href="/healthknowledge" class="view-all-btn">
                View More
              </a>
            </div>
            <div class="row">
              {this.state.Blog.map((blog, index) => (
                <div class="col-md-4 col-lg-3 col-sm-4">
                  <div class="blog-box">
                    <img
                      onClick={() => {
                        this.onBlogView(blog);
                      }}
                      src={blog.fld_previewimage}
                    />

                    <div class="content-box">
                      <a
                        onClick={() => {
                          this.onBlogView(blog);
                        }}
                      >
                        <h3 style={{ overflow: "hidden" }}>
                          {blog.fld_title}
                        </h3>
                      </a>
                      <p class="name-title">
                        <span>By</span> {blog.fld_writtenby}
                      </p>
                      <p class="border-btm blog-desc-short">
                        {Parser(
                          ("<p>" + blog.fld_shortdescription + "</p>")
                            .replace(/font-family/g, "")
                            .replace(/color/g, "")
                        )}
                      </p>
                      <ul
                        class="comments-list"
                        style={{ marginBottom: "0px", paddingLeft: "0px" }}
                      >
                        <li>
                          <p class="date">
                            {moment(blog.fld_publishdate).format("ll")}
                          </p>
                        </li>
                        <li>
                          <i class="fas fa-thumbs-up"></i>{" "}
                          {blog.fld_likecount}
                        </li>
                        <li>
                          <i class="fas fa-comments"></i>{" "}
                          {blog.fld_commentcount}
                        </li>
                        <li class="blog-btn">
                          <a
                            class="read-more-btn-blog"
                            style={{ color: "#1b65a9" }}
                            onClick={() => {
                              this.onBlogView(blog);
                            }}
                          >
                            Read More
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

            </div>
        )
    }
}

export default HealthHP
