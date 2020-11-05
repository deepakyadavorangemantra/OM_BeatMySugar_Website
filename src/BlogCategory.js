/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import logo from './logo.svg';
import Header from './Header'
import Footer from './Footer'
// import News from './News';
import GetApiCall from './GetApi'
import moment from 'moment'
import Notiflix from "notiflix-react";
import Parser from 'html-react-parser';
import Masonry from 'react-masonry-component';
import BlogCategorySection from './BlogCategorySection'
import { connect } from "react-redux";
import PostApiCall from "./Api";
import BlogSection from "./BlogSection";
import {
 
  setBlogData
} from "./Actions/actionType";

const masonryOptions = {
    transitionDuration: 0
};



class BlogCategory extends React.Component {


    constructor(props){
        super(props);
        this.state={

                BlogCategoryTitle : '',
                Blog : []
           
        }
    }

    componentDidMount(){

  window.scrollTo(0, 0)
        
    

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
      
          });
      
          Notiflix.Loading.Dots('Please wait...');

       
          this.setState({
              BlogCategoryTitle : this.props.match.params.sub == undefined ?  this.props.match.params.category.replace( /-/g,' ')
              : this.props.match.params.sub.replace( /-/g,' ')
          })

          PostApiCall.postRequest({

            category : this.props.match.params.sub == undefined ?  this.props.match.params.category.replace( /-/g,' ')
            : this.props.match.params.sub.replace( /-/g,' ')
                 
        },"GetBlogWithCategoryWebsite").then((results) => 
        
          results.json().then(obj => {
           
          if(results.status == 200 || results.status == 201){
 
    this.setState({
        Blog : obj.data
    })
 
     Notiflix.Loading.Remove()



          }
        }))
    }


    truncate(source, size) {
      return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }
 
    

    render(){


        return (
      
          <div >
      
              <Header></Header>
             
      
      <main class="main">
                     
                      {/* <!-- End .container --> */}
      
                      <div class="container doctors-section">
        <h3 class="section-title">{this.state.BlogCategoryTitle}</h3>
                          <div class="row">
      
                         
      
                                    <div class="col-md-9">
                                        
                                      
                                                  <div class="row">
                                                     
      
      
       {this.state.Blog.map(
          (blog,index) => (
      
      
         
            <div class="col-lg-4 col-md-6 col-sm-6 col-12"  key={index}>
            <div class="blog-box-inner blog-box">
                    <img 
                     onClick={()=>{
      
      
                      if( blog.fld_subcategory == null || blog.fld_subcategory.replace( / /g,'-') == ''){
                        window.location.href = this.state.BlogCategoryTitle == blog.fld_category ? `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/blog-details/${blog.fld_id+"-"+blog.fld_title.replace( / /g,'-')}` : 
                        `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/${blog.fld_subcategory.replace( / /g,'-')}/${blog.fld_id+"-"+blog.fld_title.replace( / /g,'-')}`
                      
                      }else
                      {
                        window.location.href = this.state.BlogCategoryTitle == blog.fld_category ? `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/blog-details/${blog.fld_id+"-"+blog.fld_title.replace( / /g,'-')}` : 
                        `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/${blog.fld_subcategory.replace( / /g,'-')}/${blog.fld_id+"-"+blog.fld_title.replace( / /g,'-')}`
                      
                      }
                    }}
                    src={blog.fld_previewimage} />
                   
                    <div class="blog-masonry-textbox content-box">
                    <a 
                     onClick={()=>{
      
      
                      if( blog.fld_subcategory == null || blog.fld_subcategory.replace( / /g,'-') == ''){
                        window.location.href = this.state.BlogCategoryTitle == blog.fld_category ? `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/blog-details/${blog.fld_id+"-"+blog.fld_title.replace( / /g,'-')}` : 
                        `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/${blog.fld_subcategory.replace( / /g,'-')}/${blog.fld_id+"-"+blog.fld_title.replace( / /g,'-')}`
                      
                      }else
                      {
                        window.location.href = this.state.BlogCategoryTitle == blog.fld_category ? `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/blog-details/${blog.fld_id+"-"+blog.fld_title.replace( / /g,'-')}` : 
                        `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/${blog.fld_subcategory.replace( / /g,'-')}/${blog.fld_id+"-"+blog.fld_title.replace( / /g,'-')}`
                      
                      }
                    }}
                     >      <h3 class="blog-masonry-title" style={{overflow : 'hidden'}}>{blog.fld_title}</h3></a> 
                    <p class="name-title"><span>By</span> {blog.fld_writtenby}</p>
                        <p class="border-btm blog-desc-short">
                            
                        {Parser(((blog.fld_shortdescription).replace(/font-family/g, '')
                
                        ))}
                        
                            </p>
                            
                        <ul class="comments-list" style={{marginBottom:"0px"}}>
                                <li><p class="date">{moment(blog.fld_publishdate).format('ll')}</p></li>
                                <li > 
                                    <i class="fas fa-thumbs-up" ></i> { blog.fld_likecount}
                                </li>
                                <li > 
                                      <i class="fas fa-comments" ></i> { blog.fld_commentcount}
                                    </li>   
                                    <li style={{float:"right"}}>
                                            <div onClick={()=>{
      
                                        
                                         
                                  
                                              if( blog.fld_subcategory == null || blog.fld_subcategory.replace( / /g,'-') == '' ){
                                                window.location.href = this.state.BlogCategoryTitle == blog.fld_category ? `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/blog-details/${blog.fld_id+"-"+blog.fld_title.replace( / /g,'-')}` : 
                                                `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/${blog.fld_subcategory.replace( / /g,'-')}/${blog.fld_id+"-"+blog.fld_title.replace( / /g,'-')}`
                                              
                                              }else
                                              {
                                                window.location.href = this.state.BlogCategoryTitle == blog.fld_category ? `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/blog-details/${blog.fld_id+"-"+blog.fld_title.replace( / /g,'-')}` : 
                                                `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/${blog.fld_subcategory.replace( / /g,'-')}/${blog.fld_id+"-"+blog.fld_title.replace( / /g,'-')}`
                                              
                                              }
                                             
                                            }}><a  class="read-more-btn-blog">Read More</a></div>
                                    </li>
                               
                            </ul>
                    </div>
       
                </div>
      </div>	
      
      
          
      ))
          } 
      
          
      
   
                                                  </div>
                                                 
                                              </div>
                               
                                 
                                 <BlogCategorySection></BlogCategorySection>
                            
                             
                             </div>
                                 
                                  </div>
                                
                    
                  </main>
                  
              
                  {/* <!-- End .main --> */}
      
      <Footer></Footer>
          
       </div>
        );
        }
}

function mapStateToProps(state) {
    return {
      BlogDetails: state.BlogReducer
    };
  }
  
  export default connect(
    mapStateToProps,
    {
      setBlogData,
      
    }
  )(BlogCategory);
  
