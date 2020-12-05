import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import PostApiCall from "./Api";
import Parser from "html-react-parser";
import Notiflix from "notiflix-react";
import GetApiCall from "./GetApi";
import moment from "moment";
import BlogCategorySection from "./BlogCategorySection";

class DoctorDetails extends React.Component {
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

    GetApiCall.getRequest("GetBlogNine").then((resultdes) =>
      resultdes.json().then((obj) => {
        var arr = [];
        for (var i = 0; i < 4; i++) {
          arr.push(obj.data[i]);

          this.setState({
            Blog: arr,
          });
        }

        Notiflix.Loading.Remove();
      })
    );
  }

  truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }


  onBlogView(blog){

    window.location.href = `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'')}/${(blog.fld_subcategory != '' && blog.fld_subcategory != null ? blog.fld_subcategory.replace( /\W|_/g,'') : moment(blog.fld_publishdate).format('ll'))+"/" }${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'')}`


  }

  render() {
    return (
      <div >
        <div >
          <div>
            <div >
              <div style={{ marginTop: "20px" }} class="container">
             
              <div class=" blog-section">
                    <h3 class="section-title margin-bottom">Health Knowledge</h3>
                    <div>
                        <a href="/healthknowledge" class="view-all-btn">View More</a>
                    </div>
                    <div class="row">

                    {this.state.Blog.map(
                              (blog,index) => (

                        <div class="col-md-3">
                            <div class="blog-box">
                               
                                <img 
                                     onClick={()=>{this.onBlogView(blog)}}
                                src={blog.fld_previewimage}/>
                            
                                {/* <span class="grid-item-date">
                              <span class="grid-item-day">{moment(blog.fld_publishdate).format('ll').split(' ')[1].split(',')[0]}</span>
                                        <span class="grid-item-month">{moment(blog.fld_publishdate).format('ll').split(' ')[0]} ' {moment(blog.fld_publishdate).format("YY")}</span>
                                       
                                    </span> */}
                                <div class="content-box">
                                <a  
                                onClick={()=>{this.onBlogView(blog)}}
                                > 
                                <h3 style={{overflow : 'hidden'}}>{blog.fld_title}</h3></a>
                              <p class="name-title"><span>By</span> {blog.fld_writtenby}</p>
                              <p class="border-btm blog-desc-short">{Parser(('<p>'+blog.fld_shortdescription+'</p>').replace(/font-family/g, '').replace(/color/g, ''))}</p>
                                <ul class="comments-list" style={{marginBottom:'0px',paddingLeft : '0px'}}>
                                <li><p class="date">{moment(blog.fld_publishdate).format('ll')}</p></li>
                                    <li> 
                              <i class="fas fa-thumbs-up"></i> {blog.fld_likecount}
                                    </li>
                                    <li> 
                             <i class="fas fa-comments"></i> {blog.fld_commentcount}
                                        </li>   
                                    <li style={{float:'right'}}>
                                            <a 
                                            class="read-more-btn-blog"
                                            style={{color: '#1b65a9'}}
                                            onClick={()=>{this.onBlogView(blog)}}>Read More</a>
                                        </li>
                                </ul>
                                </div>
                            </div>
                        </div>

                              ))}
                       
                       
                    </div>

                </div>

             
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorDetails;
