/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import logo from './logo.svg';
import Header from './Header'
import Footer from './Footer'
import News from './News';
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
        
        // console.log('in Blog')

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
            //  #507dc0'
          });
      
          Notiflix.Loading.Dots('Please wait...');

          // console.log(this.props.match.params.sub == undefined)

          var ct = JSON.parse(localStorage.getItem('BlogCat'))
          var sbct = JSON.parse(localStorage.getItem('BlogSubCat'))

          console.log(ct)
          console.log(sbct)

          this.setState({
              BlogCategoryTitle : sbct == undefined ?  ct
              : sbct
          })

          PostApiCall.postRequest({

            category : sbct == undefined ?  ct
            : sbct
                 
        },"GetBlogWithCategoryWebsite").then((results) => 
        
          results.json().then(obj => {
           
          if(results.status == 200 || results.status == 201){
    //     GetApiCall.getRequest("GetBlogNine").then(resultdes =>
    //         resultdes.json().then(obj => {
            
    // console.log(obj.data)
    this.setState({
        Blog : obj.data
    })
 
     Notiflix.Loading.Remove()

    // //         }
    
    //         this.props.setBlogData(obj.data)
           

    //         }))


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
                                          {/* <div class="row"> */}
                                      
                                                  <div class="row">
                                                      {/* <div class="row"> */}
                                                      {/* <Masonry
                      className={'row'} // default ''
                      elementType={'ul'} // default 'div'
                      // style={{    marginBottom: '200px'}}
                      options={masonryOptions} // default {}
                      disableImagesLoaded={false} // default false
                      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                      // imagesLoadedOptions={imagesLoadedOptions} // default {}
                  > */}
      
      
       {this.state.Blog.map(
          (blog,index) => (
      
      
              // <img src={blog.fld_previewimage} class="img-responsive"/>
         
            <div class="col-lg-4 col-md-6 col-sm-6 col-12"  key={index}>
            <div class="blog-box-inner blog-box">
                    <img 
                     onClick={()=>{
      
      
                      if( blog.fld_subcategory == null || blog.fld_subcategory.replace( /\W|_/g,'-') == ''){
                        window.location.href = this.state.BlogCategoryTitle == blog.fld_category ? `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'-')}/blog-details/${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'-')}` : 
                        `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'-')}/${blog.fld_subcategory.replace( /\W|_/g,'-')}/${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'-')}`
                      
                      }else
                      {
                        window.location.href = this.state.BlogCategoryTitle == blog.fld_category ? `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'-')}/blog-details/${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'-')}` : 
                        `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'-')}/${blog.fld_subcategory.replace( /\W|_/g,'-')}/${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'-')}`
                      
                      }
                    }}
                    src={blog.fld_previewimage} />
                    {/* <span class="grid-item-date">
                              <span class="grid-item-day">{moment(blog.fld_publishdate).format('ll').split(' ')[1].split(',')[0]}</span>
          <span class="grid-item-month">{moment(blog.fld_publishdate).format('ll').split(' ')[0]} ' {moment(blog.fld_publishdate).format("YY")}</span>
                                       
                                    </span> */}
                    <div class="blog-masonry-textbox content-box">
                    <a 
                     onClick={()=>{
      
      
                      if( blog.fld_subcategory == null || blog.fld_subcategory.replace( /\W|_/g,'-') == ''){
                        window.location.href = this.state.BlogCategoryTitle == blog.fld_category ? `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'-')}/blog-details/${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'-')}` : 
                        `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'-')}/${blog.fld_subcategory.replace( /\W|_/g,'-')}/${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'-')}`
                      
                      }else
                      {
                        window.location.href = this.state.BlogCategoryTitle == blog.fld_category ? `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'-')}/blog-details/${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'-')}` : 
                        `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'-')}/${blog.fld_subcategory.replace( /\W|_/g,'-')}/${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'-')}`
                      
                      }
                    }}
                     >      <h3 class="blog-masonry-title" style={{overflow : 'hidden'}}>{blog.fld_title}</h3></a> 
                    <p class="name-title"><span>By</span> {blog.fld_writtenby}</p>
                        <p class="border-btm blog-desc-short">
                            
                        {Parser(((blog.fld_shortdescription).replace(/font-family/g, '')
                      //   .replace('color', '')
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
      
                                        
                                              // console.log(this.state.BlogCategoryTitle )
                                  
                                              if( blog.fld_subcategory == null || blog.fld_subcategory.replace( /\W|_/g,'-') == '' ){
                                                window.location.href = this.state.BlogCategoryTitle == blog.fld_category ? `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'-')}/blog-details/${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'-')}` : 
                                                `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'-')}/${blog.fld_subcategory.replace( /\W|_/g,'-')}/${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'-')}`
                                              
                                              }else
                                              {
                                                window.location.href = this.state.BlogCategoryTitle == blog.fld_category ? `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'-')}/blog-details/${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'-')}` : 
                                                `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'-')}/${blog.fld_subcategory.replace( /\W|_/g,'-')}/${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'-')}`
                                              
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
                                 {/* <BlogSection /> */}
                             
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
  
