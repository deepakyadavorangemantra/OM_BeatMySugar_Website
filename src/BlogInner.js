/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
// import News from "./News";

import Parser from "html-react-parser";
import GetApiCall from "./GetApi";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
  Navbar,
  Form,
  Nav,
  NavDropdown,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import BlogCategorySection from "./BlogCategorySection";
import BlogSection from "./BlogSection";

import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  EmailShareButton,
} from "react-share";

import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  RedditIcon,
  TumblrIcon,
  LivejournalIcon,
  MailruIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  EmailIcon,
} from "react-share";

import { connect } from "react-redux";
import { setBlogDetails } from "./Actions/actionType";

import moment from "moment";
import BlogTagsSection from "./BlogTagsSections";

class BlogInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginData: [],
      comment: "",
      BlogComments: [],
      shareUrl: "",
      thumb: false,
      likeCount: 0,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    Notiflix.Loading.Init({
      svgColor: "#507dc0",

    });



    Notiflix.Loading.Dots("Please wait...");

   

    PostApiCall.postRequest(
      {
        blog_id: this.props.match.params.blogid.split("-")[0],
      },
      "GetBlogDetails"
    ).then((resultsblog) =>
  
      resultsblog.json().then((objblog) => {
        if (resultsblog.status == 200 || resultsblog.status == 201) {
       
          var blog = objblog.data[0];



          this.props.setBlogDetails(blog);
       
          this.setState({
            likeCount: blog.fld_likecount,
            shareUrl: window.location.href,
          });

          var login = localStorage.getItem("CustomerLoginDetails");
          var details = JSON.parse(login);


          this.setState({
            LoginData: details,
          });

          if (details != null) {
            PostApiCall.postRequest(
              {
                blog_id: blog.fld_id,
                user_email: details.fld_email,
              },
              "GetBlogCustomerLikedStatus"
            ).then((results) =>
            
              results.json().then((obj) => {
                if (results.status == 200 || results.status == 201) {
            
                  if (JSON.stringify(obj.data) != "[]") {
                    this.setState({
                      thumb: obj.data[0].fld_liked == 0 ? false : true,
                    });
                  }
                }
              })
            );
          }

          PostApiCall.postRequest(
            {
              blog_id: blog.fld_id,
            },
            "GetBlogComments"
          ).then((results) =>

            results.json().then((obj) => {
              if (results.status == 200 || results.status == 201) {
          

                this.setState({
                  BlogComments: obj.data,
                });
              }
            })
          );

          Notiflix.Loading.Remove();
        }
      })
    );
  }

  onPostCommnet() {
    if (this.state.LoginData != null) {
      if (this.state.comment != "") {
        Notiflix.Loading.Dots("Please wait...");

        PostApiCall.postRequest(
          {
            blog_id: this.props.BlogDetails.BlogDetails.fld_id,
            customer_email: this.state.LoginData.fld_email,
            comment: this.state.comment,
            approval_status: "Pending",
            updated_on: moment().format("lll").toString(),
            updated_by: 0,
          },
          "AddBlogComments"
        ).then((results) =>
       
          results.json().then((obj) => {
            if (results.status == 200 || results.status == 201) {
              Notiflix.Loading.Remove();


                confirmAlert({
                  title: 'Comment Posted',
                  message: 'You are successfully posted a comment, it will be published after sometime.',
                  buttons: [
                    {
                      label: 'Ok',
                      onClick: () => {
                        window.location.reload();

                        }
                      }
                    ]
                  });
             
            } else {
              Notiflix.Loading.Remove();
            }
          })
        );
      } else {
        Notiflix.Notify.Failure("Please enter Comment to Post.");
      }
    } else {
      Notiflix.Notify.Info("Please Login to post comments.");
    }
  }


  onViewContributor(name, id){

window.location.href = `/contributors/${id+"-"+name.replace( / /g,'-')}`
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <main class="main">
          <nav aria-label="breadcrumb" class="breadcrumb-nav">
            <div class="container">
              <ol class="breadcrumb">
               
              </ol>
            </div>
            {/* <!-- End .container --> */}
          </nav>
          <div class="container ">
            <div class="row margin-btm-50">
              <div class="col-md-9">
                <article class="entry single">
                  <div class="entry-media">
                    <img
                      src={this.props.BlogDetails.BlogDetails.fld_coverimage}
                      alt="Post"
                      class="blog-banner-image"
                    />
                  </div>
                  {/* <!-- End .entry-media --> */}

                  <div class="entry-body">
                    <div class="row">
                      <div class="col-md-12">
                        <h2 class="entry-title">
                          {this.props.BlogDetails.BlogDetails.fld_title}
                        </h2>
                        <div class="entry-meta">
                          <span>
                            <i class="icon-calendar"></i>
                            Published on {moment(
                              this.props.BlogDetails.BlogDetails.fld_publishdate
                            ).format("ll")}
                          </span>
                         
                       
                       {this.props.BlogDetails.BlogDetails.fld_lastsavedon == '' || this.props.BlogDetails.BlogDetails.fld_lastsavedon == null
                       ? '' :
                       <span style={{float : 'right'}}>
                       <i class="icon-calendar"></i>
                       Updated on {moment(
                              this.props.BlogDetails.BlogDetails.fld_publishdate
                            ).format("ll")}
                     </span>
                       }
                         
                        </div>
                      </div>
                      <div class="col-md-12 cont-box">
                        <div class="row">
                          <div class="col-md-6 blog-user-box">
                            <div class="row no-gutters">
                              <div class="col-md-2 col-xs-2 col-sm-2">
                                <div class="text-center">
                                  <img
                                  onClick={()=>{this.onViewContributor(this.props.BlogDetails.BlogDetails.fld_writtenby,this.props.BlogDetails.BlogDetails.fld_writtenbyid)}}
                                    src={this.props.BlogDetails.BlogDetails.fld_contributorphoto =='' || this.props.BlogDetails.BlogDetails.fld_contributorphoto == null  ? "/assets/images/user.png" : this.props.BlogDetails.BlogDetails.fld_contributorphoto}
                                    class="blog-user-image"
                                  ></img>
                                </div>
                              </div>
                              <div class="col-md-10">
                                <p>
                      Written by <a
                       onClick={()=>{this.onViewContributor(this.props.BlogDetails.BlogDetails.fld_writtenby,this.props.BlogDetails.BlogDetails.fld_writtenbyid)}}

                      ><b>{this.props.BlogDetails.BlogDetails.fld_writtenby}</b></a>
                                  <br></br>
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {this.props.BlogDetails.BlogDetails.fld_contributordesig}
                                  </span>
                                </p>
                                <p style={{ fontSize: "13px" }}>
                                {Parser(
                        (
                          "<p>" +
                          this.props.BlogDetails.BlogDetails.fld_contributorshort +
                          "</p>"
                        ).replace(/font-family/g, "")
                      )}
                                </p>
                              </div>
                            </div>

                       
                          </div>

                          {this.props.BlogDetails.BlogDetails.fld_reviewedby == '' || this.props.BlogDetails.BlogDetails.fld_reviewedby == null
                              ? '' : 

                          <div class="col-md-6 blog-user-box">
                            <div class="row no-gutters">
                              <div class="col-md-2 col-xs-2 col-sm-2">
                                <div class="text-center">
                                  <img
                                  onClick={()=>{this.onViewContributor(this.props.BlogDetails.BlogDetails.fld_reviewedby,this.props.BlogDetails.BlogDetails.fld_reviewedbyid)}}
                                    src= {this.props.BlogDetails.BlogDetails.fld_reviewedbyphoto == '' || this.props.BlogDetails.BlogDetails.fld_reviewedbyphoto == null ? "/assets/images/user.png" : this.props.BlogDetails.BlogDetails.fld_reviewedbyphoto}
                                    class="blog-user-image"
                                  ></img>
                                </div>
                              </div>
                            
                              <div class="col-md-10">
                                <p>
                                  Reviewed & Edited by <a
                                  onClick={()=>{this.onViewContributor(this.props.BlogDetails.BlogDetails.fld_reviewedby,this.props.BlogDetails.BlogDetails.fld_reviewedbyid)}}
                                
                                  ><b>{this.props.BlogDetails.BlogDetails.fld_reviewedby}</b></a>
                                  <br></br>{" "}
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      fontWeight: "600",
                                    }}
                                  >
                                     {this.props.BlogDetails.BlogDetails.fld_reviewedbydesig}
                                  </span>
                                </p>
                                <p style={{ fontSize: "13px" }}>
                                {Parser(
                        (
                          "<p>" +
                          this.props.BlogDetails.BlogDetails.fld_reviewedbyshort +
                          "</p>"
                        ).replace(/font-family/g, "")
                      )}
                                </p>
                              </div>
                            
                            </div>
                          
                  
                          </div>
  }
                        </div>
                      </div>
                    </div>

                    <div class="entry-content">
                      {Parser(
                        (
                          "<p>" +
                          this.props.BlogDetails.BlogDetails
                            .fld_content +
                          "</p>"
                        ).replace(/font-family/g, "")
                      )}
                     
                    </div>
                    {/* <!-- End .entry-content --> */}

                    <div class="entry-share">
                      <div className="like">
                        <h3>
                          <a
                            style={{ float: "right" }}
                            onClick={() => {
                 
                              var login = localStorage.getItem(
                                "CustomerLoginDetails"
                              );
                              var details = JSON.parse(login);

           

                              if (details != null) {
                                this.setState(
                                  {
                                    thumb: !this.state.thumb,
                                  },
                                  () => {
                                    this.setState({
                                      likeCount: this.state.thumb
                                        ? this.state.likeCount + 1
                                        : this.state.likeCount - 1,
                                    });

                                    PostApiCall.postRequest(
                                      {
                                        like: this.state.thumb ? 1 : 0,
                                        blog_id: this.props.BlogDetails.BlogDetails.fld_id,
                                        user_email: this.state.LoginData.fld_email,
                                        updated_on: moment().format("lll").toString(),
                                        updated_by: 0,
                                      },
                                      "AddCustomerBlogLikeStatus"
                                    ).then((results) =>
                                     
                                      results.json().then((obj) => {
                                        if (results.status == 200 || results.status == 201) {
                                          PostApiCall.postRequest(
                                            {
                                              like: this.state.thumb ? 1 : 0,
                                              blog_id: this.props.BlogDetails.BlogDetails.fld_id,
                                            },
                                            "UpdateLikeCount"
                                          ).then((results) =>
                                       
                                            results.json().then((obj) => {
                                              if (results.status == 200 ||results.status == 201) {
                                              }
                                            })
                                          );
                                        }
                                      })
                                    );
                                  }
                                );
                              } else {
                                Notiflix.Notify.Info(
                                  "Please Login to like the Blog."
                                );
                              }
                            }}
                          >
                            <i
                              class="fas fa-thumbs-up"
                              style={{
                                color: this.state.thumb ? "#507dbe" : "#7A7D82",
                              }}
                            ></i>
                            {this.state.likeCount}
                          </a>
                        </h3>
                      </div>

                      <div className="pull-right">
                        <ul className="social">
                          <li>
                            <FacebookShareButton
                              url={this.state.shareUrl}
                           
                            >
                              <FacebookIcon size={32} round={false} />
                            </FacebookShareButton>
                          </li>
                          <li>
                            <TwitterShareButton
            
                              url={this.state.shareUrl}
                            >
                              <TwitterIcon size={32} round={false} />
                            </TwitterShareButton>
                          </li>
                          <li>
                            <LinkedinShareButton
                   
                              url={this.state.shareUrl}
                            >
                              <LinkedinIcon size={32} round={false} />
                            </LinkedinShareButton>
                          </li>
                          <li>
                            <EmailShareButton
                        
                              url={this.state.shareUrl}
                            >
                              <EmailIcon size={32} round={false} />
                            </EmailShareButton>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div
                      class="comment-respond"
                      style={{
                        borderTop: "1px solid #ddd",
                        paddingTop: "13px",
                      }}
                    >
                      <h3>
                        {this.props.BlogDetails.BlogDetails.fld_commentcount}{" "}
                        Comments
                      </h3>

                      <form action="#">
                    
                        <div class="form-group">
                          <div class="row">
                            <div class="col-md-1">
                              <img
                                src="/assets/images/user.png"
                                class="user-commentbox-img"
                              />
                            </div>
                            <div class="col-md-11 minus-left">
                              <p>
                                <b>
                                  {this.state.LoginData != null
                                    ? this.state.LoginData.fld_name
                                    : "Guest User"}
                                </b>
                                <br />
                                Post your Comment.....
                              </p>

                              <ul class="commentbox-social">
                  
                              </ul>
                            </div>
                          </div>
                     
                          <textarea
                            cols="30"
                            rows="5"
                            class="form-control"
                            value={this.state.comment}
                            onChange={(text) => {
                              this.setState({
                                comment: text.target.value,
                              });
                            }}
                          ></textarea>
                   
                        </div>
                        {/* <!-- End .form-group --> */}

                       
                        <div class="form-footer">
                          <Button
                         
                            class="btn btn-primary"
                            onClick={this.onPostCommnet.bind(this)}
                          >
                            Post Comment
                          </Button>
                        </div>
     
                      </form>
                      <div class="comment-box" style={{paddingTop: '15px'}}>
                        {this.state.BlogComments.map((blog, index) => (
                          <div class="row">
                            <div class="col-md-1">
                              <img
                                src="/assets/images/user.png"
                                class="user-commentbox-img"
                              />
                            </div>
                            <div class="col-md-11 minus-left">
                              <p>
                                <b>{blog.fld_name}</b>
                              </p>
                              <p>{blog.fld_comment}</p>
                              <ul class="commentbox-social">
                      
                              </ul>
                            </div>
                          </div>
                        ))}
                       
                      </div>
                    </div>
                    {/* <!-- End .comment-respond --> */}
                  </div>
                  {/* <!-- End .entry-body --> */}
                </article>
                {/* <!-- End .entry --> */}
              </div>


              <BlogCategorySection />
          
   
            </div>
          </div>


                  
                    <BlogSection />
                       
                       
                
                <div class=" container">
                  <div class="container-box container-box-lg info-boxes">
                                        <div class="row">
                                          <div class="col-md-12">
                                          
                                         <p style={{textAlign:"justify",fontSize:"13px"}}><b>Disclaimer:</b> BeatMySugar is a platform to provide common knowledge around diabetes, related medicines, health products, diet, and other associated health conditions. Absence of any information does not imply or assure that the use of a particular medicine, diet or therapy is/is not safe, appropriate, or effective for you or anyone else. This content is only for general awareness and informational purposes only and is not a substitute or alternative to the advice of your doctor, nurse, or other qualified healthcare provider.

</p>
<p style={{textAlign:"justify",fontSize:"13px"}}>BeatMySugar does not assume any responsibility for any outcome arising out of the information provided on this platform. Please take the advice of your doctor or nurse or a qualified healthcare provider for the management of your health condition, which includes but is not limited to any change in your medicine, diet, physical activity or moving on to a new therapy. Do not delay in seeking the doctor's advice when needed for any product or health condition, even if you have read about that on our platform.</p>
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
    BlogDetails: state.BlogReducer,
  };
}

export default connect(mapStateToProps, {
  setBlogDetails,
})(BlogInner);
