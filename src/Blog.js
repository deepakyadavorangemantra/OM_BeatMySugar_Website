import React from 'react';
import logo from './logo.svg';
import Header from './Header'
import Footer from './Footer'


// // import News from './News';

import GetApiCall from './GetApi'

import moment from 'moment'

import Notiflix from "notiflix-react";

import Parser from 'html-react-parser';

import Masonry from 'react-masonry-component';

import BlogCategorySection from './BlogCategorySection'



import { connect } from "react-redux";
import {
 
  setBlogData
} from "./Actions/actionType";

const masonryOptions = {
    transitionDuration: 0
};



class Blog extends React.Component {


    constructor(props){
        super(props);
        this.state={

                BlogCategory : [],
                done : false,
           
        }
    }

    componentDidMount(){

  window.scrollTo(0, 0)
        
        

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
         
          });
      
          Notiflix.Loading.Dots('Please wait...');

          var search = JSON.parse(localStorage.getItem('SearchText'))


          var srDt= []
          if(search != null){

                GetApiCall.getRequest("GetBlogSearchWebsite").then(resultdes =>
                        resultdes.json().then(obj => {
                        
            
                
                               

            obj.data.filter(item => {
              if (item.fld_title.toLowerCase().includes(search.toLowerCase())
              || item.fld_shortdescription.toLowerCase().includes(search.toLowerCase())
              || item.fld_content.toLowerCase().includes(search.toLowerCase())
              ) {
                srDt.push(item)
              }
            })
            
            this.props.setBlogData(srDt)
            this.setState({
                done : true
            })
            Notiflix.Loading.Remove()
        }))
        }else
        {

                GetApiCall.getRequest("GetBlogNine").then(resultdes =>
                        resultdes.json().then(obj => {
                        
            
                 Notiflix.Loading.Remove()
            
         
                
                        this.props.setBlogData(obj.data)
                        this.setState({
                                done : true
                            })
            
                        }))
            
        }

       


        GetApiCall.getRequest("GetBlogCategoryWebsite").then(resultdes =>
                resultdes.json().then(obj => {
                

this.setState({
BlogCategory : obj.data
})
    
                }))
    }


 
    
    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
      }


      onBlogView(blog){

        window.location.href = `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/${(blog.fld_subcategory != '' && blog.fld_subcategory != null ? blog.fld_subcategory.replace( / /g,'-') : moment(blog.fld_publishdate).format('ll'))+"/" }${blog.fld_id+"-"+blog.fld_title.replace( / /g,'-')}`


      }

  render(){


  return (

    <div className="App">

        <Header></Header>
       

<main class="main">
               
                {/* <!-- End .container --> */}

                <div class="container doctors-section">
                      
                    <div class="row">

                   

                              <div class="col-md-9">
                                  
                                
                                            <div class="row">
                                               
 {this.props.BlogDetails.BlogData.length == 0 && this.state.done ? 
                
                <div class="col-md-12">
                  <img src="/assets/images/article_not_found.png" style={{    margin: 'auto'}}/>
                </div> : ''
  }

 {this.props.BlogDetails.BlogData.map(
    (blog,index) => (

        <div class="col-lg-4 col-md-6 col-sm-6 col-12"  key={index}>
              <div class="blog-box-inner blog-box">
                       <img 
                       onClick={()=>{this.onBlogView(blog)}}
                       src={blog.fld_previewimage} />
                      
                       <div class="blog-masonry-textbox content-box">
                         <a onClick={()=>{this.onBlogView(blog)}}>  <h3 class="blog-masonry-title" style={{overflow : 'hidden'}}>{blog.fld_title}</h3></a>
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
                                               <div onClick={()=>{this.onBlogView(blog)}}><a  class="read-more-btn-blog">Read More</a></div>
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
                            <div class="container">
                                    <div class="container-box container-box-lg info-boxes ">
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
  )(Blog);
  
