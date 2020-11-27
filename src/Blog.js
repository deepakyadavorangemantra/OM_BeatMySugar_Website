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
        
        // console.log('in Blog')

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
            //  #507dc0'
          });
      
          Notiflix.Loading.Dots('Please wait...');

          var search = JSON.parse(localStorage.getItem('SearchText'))


          var srDt= []
          if(search != null){

                GetApiCall.getRequest("GetBlogSearchWebsite").then(resultdes =>
                        resultdes.json().then(obj => {
                        
            
                
                                // console.log(obj.data)

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
            
                //         }
                
                        this.props.setBlogData(obj.data)
                        this.setState({
                                done : true
                            })
            
                        }))
            
        }

       


        GetApiCall.getRequest("GetBlogCategoryWebsite").then(resultdes =>
                resultdes.json().then(obj => {
                
//        console.log(obj.data)
this.setState({
BlogCategory : obj.data
})
    
                }))
    }


 
    
    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
      }


      onBlogView(blog){

        window.location.href = `/healthknowledge/${blog.fld_category.replace( /\W|_/g,'-')}/${(blog.fld_subcategory != '' && blog.fld_subcategory != null ? blog.fld_subcategory.replace( /\W|_/g,'-') : moment(blog.fld_publishdate).format('ll'))+"/" }${blog.fld_id+"-"+blog.fld_title.replace( /\W|_/g,'-')}`


      }

  render(){


  return (

    <div className="App">

        <Header></Header>
       

<main class="main">
               
                {/* <!-- End .container --> */}

                <div class="container doctors-section">
                        {/* <h3 class="section-title">Health Knowledge</h3> */}
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
                       {/* <span class="grid-item-date">
                              <span class="grid-item-day">{moment(blog.fld_publishdate).format('ll').split(' ')[1].split(',')[0]}</span>
                                        <span class="grid-item-month">{moment(blog.fld_publishdate).format('ll').split(' ')[0]} ' {moment(blog.fld_publishdate).format("YY")}</span>
                                       
                                    </span> */}
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
        
        

        // <img src={blog.fld_previewimage} class="img-responsive"/>
   
//       <div class="col-lg-4 col-md-6 col-sm-6 col-12"  key={index}>
//       <div class="blog-box-inner">
//               <img src={blog.fld_previewimage} class="img-responsive"/>
//               <div class="blog-masonry-textbox">
//                   <h3 class="blog-masonry-title">{blog.fld_title}</h3>
//                   <p class="name-title"><span>By</span> {blog.fld_bywhom}</p>
//                   <p class="border-btm">
                      
//                   {Parser(((blog.fld_shortdescription).replace(/font-family/g, '')
//                   ))}
                  
//                       </p>
                      
//                   <ul class="comments-list" style={{marginBottom:"0px"}}>
//                           <li><p class="date">{moment(blog.fld_publishdate).format('ll')}</p></li>
//                           <li > 
//                               <a ><i class="fas fa-thumbs-up" ></i> { blog.fld_likecount}</a>
//                           </li>
//                           <li > 
//                                   <a><i class="fas fa-comments" ></i> { blog.fld_commentcount}</a>
//                               </li>   
//                               <li style={{float:"right"}}>
//                                       <div onClick={()=>{

//                                         window.location.href = `/healthknowledge/${blog.fld_category.replace( / /g,'-')}/${(blog.fld_subcategory != '' ? blog.fld_subcategory.replace( / /g,'-') : '')+"/" }${blog.fld_blogid+"-"+blog.fld_title.replace( / /g,'-')}`
         
//                                       }}><a  class="read-more-btn-blog">Read More</a></div>
//                               </li>
                         
//                       </ul>
//               </div>
 
//           </div>
// </div>	


    
))
    } 

    

{/* </div> */}
{/* </Masonry>                                    */}
               {/* {this.props.BlogDetails.BlogData.map(
                              (blog,index) => (
                             
                                <div class="col-lg-4 col-md-6 col-sm-6 col-12 grid-item" key={index}>
                                <div class="blog-masonry-box">
                                        <img src={blog.fld_previewimage} class="img-responsive"/>
                                        <div class="blog-masonry-textbox">
                                            <h3 class="blog-masonry-title">{blog.fld_title}</h3>
                                            <p class="name-title"><span>By</span> {blog.fld_bywhom}</p>
                                            <p class="border-btm">
                                            {Parser((blog.fld_shortdescription).replace(/font-family/g, '').replace(/color/g, ''))}

                                                </p>
                                                
                                            <ul class="comments-list" style={{marginBottom:"0px"}}>
                                                    <li><p class="date">{moment(blog.fld_publishdate).format('ll')}</p></li>
                                                    <li > 
                                                        <a ><i class="fas fa-thumbs-up" ></i> { blog.fld_likecount}</a>
                                                    </li>
                                                    <li > 
                                                            <a><i class="fas fa-comments" ></i> { blog.fld_commentcount}</a>
                                                        </li>   
                                                        <li style={{float:"right"}}>
                                                                <div onClick={()=>{
                                                                    // console.log(index)
                                                                    localStorage.setItem('BlogDetails',JSON.stringify(this.props.BlogDetails.BlogData[index]))
                                                                    this.props.history.push(`Blog/${blog.fld_title}`)
                                                                }}><a  class="read-more-btn-blog">Read More</a></div>
                                                        </li>
                                                   
                                                </ul>
                                        </div>
                           
                                    </div>
                        </div>	
                      

                              
                          ))
                              } */}

                        
      
              
                                                    {/* <div class="col-lg-4 col-md-6 col-sm-6 col-12 grid-item">
                                                            <div class="blog-masonry-box">
                                                                    <img src="assets/images/blog/diabetes-2.jpg" class="img-responsive"/>
                                                                    <div class="blog-masonry-textbox">
                                                                        <h3 class="blog-masonry-title">Gestational diabetes mellitus</h3>
                                                                        <p class="name-title"><span>By</span> BeatMySugar</p>
                                                                        <p class="border-btm">Gestational diabetes mellitus (GDM) is defined as any degree of glucose intolerance with onset or first recognition during pregnancy (1). The definition applies whether insulin or only diet modification is used for treatment and whether or not the condition persists after pregnancy. Risk assessment for GDM should be undertaken at the first prenatal visit. Women with clinical characteristics consistent with a high risk of GDM (marked obesity, personal history of GDM, glycosuria, or a strong family history of diabetes) should undergo glucose testing (see below) as soon as feasible. If they are found not to have GDM at that initial screening</p>
                                                                        <ul class="comments-list" style={{marginBottom:"0px"}}>
                                                                                <li><p class="date">24. JAN 2019</p></li>
                                                                                <li > 
                                                                                    <a href=""><i class="fas fa-thumbs-up"></i> 3</a>
                                                                                </li>
                                                                                <li > 
                                                                                        <a href=""><i class="fas fa-comments"></i> 3</a>
                                                                                    </li>   
                                                                                    <li style={{float:"right"}}>
                                                                                            <a href="blog-inner.html" class="read-more-btn-blog">Read More</a>
                                                                                    </li>
                                                                               
                                                                            </ul>
                                                                    </div>
                                                                </div>			
                                                    </div>
                                                  
                                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12 grid-item cat1">
                                                            <div class="blog-masonry-box">
                                                                    <img src="assets/images/blog/hypo.jpg" class="img-responsive"/>
                                                                    <div class="blog-masonry-textbox">
                                                                        <h3 class="blog-masonry-title">Hypoglycemia Condition</h3>
                                                                        <p class="name-title"><span>By</span> BeatMySugar</p>
                                                                        <p class="border-btm">Hypoglycemia is a condition caused by a very low level of blood sugar (glucose), your body's main energy source.

                                                                                Hypoglycemia is often related to the treatment of diabetes. However, a variety of conditions — many rare — can cause low blood sugar in people without diabetes. Like fever, hypoglycemia isn't a disease itself — it's an indicator of a health problem.</p>
                                                                                <ul class="comments-list" style={{marginBottom:"0px"}}>
                                                                                        <li><p class="date">24. JAN 2019</p></li>
                                                                                        <li > 
                                                                                            <a href=""><i class="fas fa-thumbs-up"></i> 3</a>
                                                                                        </li>
                                                                                        <li > 
                                                                                                <a href=""><i class="fas fa-comments"></i> 3</a>
                                                                                            </li>   
                                                                                            <li style={{float:"right"}}>
                                                                                                    <a href="blog-inner.html" class="read-more-btn-blog">Read More</a>
                                                                                            </li>
                                                                                       
                                                                                    </ul>
                                                                    </div>
                                                                </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12 grid-item cat1">
                                                            <div class="blog-masonry-box">
                                                                    <img src="assets/images/blog/physical.jpg" class="img-responsive"/>
                                                                    <div class="blog-masonry-textbox">
                                                                        <h3 class="blog-masonry-title">Diabetes Physical Activity</h3>
                                                                        <p class="name-title"><span>By</span> BeatMySugar</p>
                                                                        <p class="border-btm">The adoption and maintenance of physical activity are critical foci for blood glucose management and overall health in individuals with diabetes and prediabetes. Recommendations and precautions vary depending on individual characteristics and health status. In this Position Statement, we provide a clinically oriented review and evidence-based recommendations regarding physical activity and exercise in people with type 1 diabetes, type 2 diabetes, gestational diabetes mellitus, and prediabetes.</p>
                                                                        <ul class="comments-list" style={{marginBottom:"0px"}}>
                                                                                <li><p class="date">24. JAN 2019</p></li>
                                                                                <li > 
                                                                                    <a href=""><i class="fas fa-thumbs-up"></i> 3</a>
                                                                                </li>
                                                                                <li > 
                                                                                        <a href=""><i class="fas fa-comments"></i> 3</a>
                                                                                    </li>   
                                                                                    <li style={{float:"right"}}>
                                                                                            <a href="blog-inner.html" class="read-more-btn-blog">Read More</a>
                                                                                    </li>
                                                                               
                                                                            </ul>
                                                                    </div>
                                                                </div>
                                                    </div>	
                                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12 grid-item cat1">
                                                            <div class="blog-masonry-box">
                                                                    <img src="assets/images/blog/tablets.jpg" class="img-responsive"/>
                                                                    <div class="blog-masonry-textbox">
                                                                        <h3 class="blog-masonry-title">Oral Antibiotic Medicine</h3>
                                                                        <p class="name-title"><span>By</span> BeatMySugar</p>
                                                                        <p class="border-btm">One drug makes up the class of oral diabetes medications known as the biguanides, and that is metformin (Glucophage). It works by decreasing production of glucose by the liver and by making muscle more sensitive to insulin. The thiazolidinediones, rosiglitazone (Avandia) and pioglitazone (Actos), work in a similar way.
                                                                            </p>
                                                                            <ul class="comments-list" style={{marginBottom:"0px"}}>
                                                                                    <li><p class="date">24. JAN 2019</p></li>
                                                                                    <li > 
                                                                                        <a href=""><i class="fas fa-thumbs-up"></i> 3</a>
                                                                                    </li>
                                                                                    <li > 
                                                                                            <a href=""><i class="fas fa-comments"></i> 3</a>
                                                                                        </li>   
                                                                                        <li style={{float:"right"}}>
                                                                                                <a href="blog-inner.html" class="read-more-btn-blog">Read More</a>
                                                                                        </li>
                                                                                   
                                                                                </ul>
                                                                    </div>
                                                                </div>
                                                    </div>				
                                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12 grid-item cat2 cat3">
                                                            <div class="blog-masonry-box">
                                                                    <img src="assets/images/blog/food.jpg" class="img-responsive"/>
                                                                    <div class="blog-masonry-textbox">
                                                                        <h3 class="blog-masonry-title">Types of diets for diabetics</h3>
                                                                        <p class="name-title"><span>By</span> BeatMySugar</p>
                                                                        <p class="border-btm">Foods to eat for a type 2 diabetic diet meal plan include complex carbohydrates such as brown rice, whole wheat, quinoa, oatmeal, fruits, vegetables, beans, and lentils. Foods to avoid include simple carbohydrates, which are processed, such as sugar, pasta, white bread, flour, and cookies, pastries.
                                                                            </p>
                                                                            <ul class="comments-list" style={{marginBottom:"0px"}}>
                                                                                    <li><p class="date">24. JAN 2019</p></li>
                                                                                    <li > 
                                                                                        <a href=""><i class="fas fa-thumbs-up"></i> 3</a>
                                                                                    </li>
                                                                                    <li > 
                                                                                            <a href=""><i class="fas fa-comments"></i> 3</a>
                                                                                        </li>   
                                                                                        <li style={{float:"right"}}>
                                                                                                <a href="blog-inner.html" class="read-more-btn-blog">Read More</a>
                                                                                        </li>
                                                                                   
                                                                                </ul>
                                                                    </div>
                                                                </div>			
                                                    </div>
                                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12 grid-item cat1">
                                                            <div class="blog-masonry-box">
                                                                    <img src="assets/images/blog/diabetes.jpg" class="img-responsive"/>
                                                                    <div class="blog-masonry-textbox">
                                                                        <h3 class="blog-masonry-title">Type 1 diabetes causes and risk factors</h3>
                                                                        <p class="name-title"><span>By</span> BeatMySugar</p>
                                                                        <p class="border-btm">Type 1 diabetes, once known as juvenile diabetes or insulin-dependent diabetes, is a chronic condition in which the pancreas produces little or no insulin. Insulin is a hormone needed to allow sugar (glucose) to enter cells to produce energy.

                                                                            </p>
                                                                            <ul class="comments-list" style={{marginBottom:"0px"}}>
                                                                                    <li><p class="date">24. JAN 2019</p></li>
                                                                                    <li > 
                                                                                        <a href=""><i class="fas fa-thumbs-up"></i> 3</a>
                                                                                    </li>
                                                                                    <li > 
                                                                                            <a href=""><i class="fas fa-comments"></i> 3</a>
                                                                                        </li>   
                                                                                        <li style={{float:"right"}}>
                                                                                                <a href="blog-inner.html" class="read-more-btn-blog">Read More</a>
                                                                                        </li>
                                                                                   
                                                                                </ul>
                                                                    </div>
                                                                </div>
                                                    </div>					
                                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12 grid-item cat2 cat3">
                                                            <div class="blog-masonry-box">
                                                                    <img src="assets/images/blog/diabetes-2.jpg" class="img-responsive"/>
                                                                    <div class="blog-masonry-textbox">
                                                                        <h3 class="blog-masonry-title">Gestational diabetes mellitus</h3>
                                                                        <p class="name-title"><span>By</span> BeatMySugar</p>
                                                                        <p class="border-btm">Gestational diabetes mellitus (GDM) is defined as any degree of glucose intolerance with onset or first recognition during pregnancy (1). The definition applies whether insulin or only diet modification is used for treatment and whether or not the condition persists after pregnancy. Risk assessment for GDM should be undertaken at the first prenatal visit. Women with clinical characteristics consistent with a high risk of GDM (marked obesity, personal history of GDM, glycosuria, or a strong family history of diabetes) should undergo glucose testing (see below) as soon as feasible. If they are found not to have GDM at that initial screening</p>
                                                                        <ul class="comments-list" style={{marginBottom:"0px"}}>
                                                                                <li><p class="date">24. JAN 2019</p></li>
                                                                                <li > 
                                                                                    <a href=""><i class="fas fa-thumbs-up"></i> 3</a>
                                                                                </li>
                                                                                <li > 
                                                                                        <a href=""><i class="fas fa-comments"></i> 3</a>
                                                                                    </li>   
                                                                                    <li style={{float:"right"}}>
                                                                                            <a href="blog-inner.html" class="read-more-btn-blog">Read More</a>
                                                                                    </li>
                                                                               
                                                                            </ul>
                                                                    </div>
                                                                </div>			
                                                    </div>
                                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12 grid-item cat1">
                                                            <div class="blog-masonry-box">
                                                                    <img src="assets/images/blog/hypo.jpg" class="img-responsive"/>
                                                                    <div class="blog-masonry-textbox">
                                                                        <h3 class="blog-masonry-title">Hypoglycemia Condition</h3>
                                                                        <p class="name-title"><span>By</span> BeatMySugar</p>
                                                                        <p class="border-btm">Hypoglycemia is a condition caused by a very low level of blood sugar (glucose), your body's main energy source.

                                                                                Hypoglycemia is often related to the treatment of diabetes. However, a variety of conditions — many rare — can cause low blood sugar in people without diabetes. Like fever, hypoglycemia isn't a disease itself — it's an indicator of a health problem.</p>
                                                                                <ul class="comments-list" style={{marginBottom:"0px"}}>
                                                                                        <li><p class="date">24. JAN 2019</p></li>
                                                                                        <li > 
                                                                                            <a href=""><i class="fas fa-thumbs-up"></i> 3</a>
                                                                                        </li>
                                                                                        <li > 
                                                                                                <a href=""><i class="fas fa-comments"></i> 3</a>
                                                                                            </li>   
                                                                                            <li style={{float:"right"}}>
                                                                                                    <a href="blog-inner.html" class="read-more-btn-blog">Read More</a>
                                                                                            </li>
                                                                                       
                                                                                    </ul>
                                                                    </div>
                                                                </div>
                                                    </div>
                                                   */}
                                                {/* </div>		 */}
                                            </div>
                                           
                                        </div>
                              {/* </div> */}
                           
                           <BlogCategorySection></BlogCategorySection>
                       {/* <div class="col-md-3">
                       <div class="MainMenu">
                                         
                                          
                                            <h2 class="sidebar-title ">Categories</h2>

                                            <div class="gw-sidebar">
                                                    <div id="gw-sidebar" class="gw-sidebar">
                                                      <div class="nano-content">
                                                        <ul class="gw-nav gw-nav-list">
                                                         
                                                    
                                                          
                                                        
                                                    
                                                           {this.state.BlogCategory.map((cat,index)=>(
                                                            cat.fld_subcategory=='' ? 
                                                            <li>  <a href="javascript:void(0)" id="tabs">{cat.fld_category}</a> </li>
                                                            :
                                                            <li class="init-arrow-down" > 
                                                               <a href="javascript:void(0)" > 
                                                               <span class="gw-menu-text" >{cat.fld_category}</span> 
                                                               <b class="gw-arrow icon-arrow-up8"></b>
                                                               </a>
                                                       
                                                               <ul class="gw-submenu" >
                                                               {cat.fld_subcategory.split(',').map((sub,index)=>(
                                                          sub == '' ? ' ':
                                                           <li>  <a href="javascript:void(0)" id="tabs">{sub}</a> </li>
                                                           ))}
                                                              
                                                            </ul>
                                                        </li>
                                                               ))}
                                                        
                                                         
                                                        
                                                        </ul>
                                                      </div>
                                                    </div>
                                                  </div>

                                                 
                                                  <h2 class="sidebar-title margin-top-20">Tags</h2>
                                                  <p class="tags">Insulin, Sugar, Medicine, Diabetes, Diet, Yoga, Hypoglycemia, Diagnostic Labs, Ayurveda, Sugar Free, Ketoacideosis</p>
                                        </div>
                                        </div>
                       
                        */}
                       
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
  
