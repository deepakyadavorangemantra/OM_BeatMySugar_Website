import React from 'react';
import logo from './logo.svg';
import Header from './Header'
import Footer from './Footer'
import GetApiCall from './GetApi'
import moment from 'moment'
import Collapse from "@kunukn/react-collapse";


class BlogCategorySection extends React.Component {


    constructor(props){
        super(props);
        this.state={

                BlogCategory : [],
                SocialPosts : '',
                BlogTags:[],
                isOpen : -1
           
        }
    }

    componentDidMount(){



      // console.log(this.divElement.clientHeight)
     


        GetApiCall.getRequest("GetBlogCategoryWebsite").then(resultdes =>
                resultdes.json().then(obj => {
                
      //  console.log(obj.data)
this.setState({
BlogCategory : obj.data
})
    
                }))

                GetApiCall.getRequest("GetSocialPosts").then(resultdes =>
                  resultdes.json().then(obj => {
                  
  
          var x = Math.floor((Math.random() * obj.data.length));
          
                 this.setState({
                     SocialPosts: obj.data[x].fld_imageurl
                 })
      
  
                 
      
                  }))

                  GetApiCall.getRequest("GetBlogTags").then(resultdes =>
                    resultdes.json().then(obj => {
                    
    
                      // console.log(obj.data)
                   this.setState({
                       BlogTags: obj.data
                   })
        
    
                   
        
                    }))
    }



  render(){


  return (

  
                       <div class="col-md-3">
                       <div class="MainMenu">
                                         
                                          
                                            <h2 class="sidebar-title ">Categories</h2>

                                            {/* <div class="gw-sidebar">
                                                    <div id="gw-sidebar" class="gw-sidebar">
                                                      <div class="nano-content">
                                                        <ul class="gw-nav gw-nav-list">
                                                         
                                                    
                                                          
                                                        
                                                    
                                                           {this.state.BlogCategory.map((cat,index)=>(
                                                            cat.fld_subcategory=='' ? 
                                                            <li>  <a href={'/healthknowledge/'+cat.fld_category.replace( / /g,'-')} id="tabs">{cat.fld_category}</a> </li>
                                                            :
                                                            <li class="init-arrow-down" > 
                                                               <a href="javascript:void(0)" > 
                                                               <span class="gw-menu-text" >{cat.fld_category}</span> 
                                                               <b class="gw-arrow icon-arrow-up8"></b>
                                                               </a>
                                                       
                                                               <ul class="gw-submenu" >
                                                               {cat.fld_subcategory.split(',').map((sub,index)=>(
                                                          sub == '' ? ' ':
                                                           <li>  <a href={'/healthknowledge/'+cat.fld_category.replace( / /g,'-')+"/"+sub.trim().replace( / /g,'-')} id="tabs">{sub}</a> </li>
                                                           ))}
                                                              
                                                            </ul>
                                                        </li>
                                                               ))}
                                                        
                                                         
                                                        
                                                        </ul>
                                                      </div>
                                                    </div>
                                                  </div> */}

{this.state.BlogCategory.map((cat,index)=>(
  // console.log(cat.fld_subcategory)
                                                            cat.fld_subcategory=='' || cat.fld_subcategory==null  ? 

                                                            <div 
                                                            style={{borderBottom : '1px solid lightgray', 
                                                            padding: '8px 15px 8px 15px',fontSize: '13px',
                                                            }}
                                                            >
                                                               <a 
                                                                  style={{color : '#585858'}}
                                                                  onClick={()=>{
                                                                    localStorage.setItem('BlogCat', JSON.stringify(cat.fld_category))
                                                                    localStorage.removeItem('BlogSubCat')
                                                                    window.location.href = '/healthknowledge/'+cat.fld_category.replace( /\W|_/g,'-')
                                                                  }}
                                                             id="tabs">{cat.fld_category}</a> 
                                                            </div>
                                                            
                                                          
   :
   <div>
<div 
style={{borderBottom : '1px solid lightgray', fontSize: '13px',
paddingTop:'8px',paddingBottom:'8px',paddingRight:'15px',paddingLeft:'15px',cursor:'pointer',
color : this.state.isOpen == index ? '#507dbe' : '',
fontWeight : this.state.isOpen == index ? 'bold' : '',

}}
onClick={()=>{
this.setState({
  isOpen : this.state.isOpen == index ? -1 : index
})
}}>
  
  <span
  style={{verticalAlign: 'middle'}}
  >{cat.fld_category}</span>
<span><i class="fa fa-angle-down" aria-hidden="true" 
style={{float: 'right',    paddingTop: '7px', display:this.state.isOpen == index ? 'none' : '',
  fontSize: '17px'}}
></i></span>
<span><i class="fa fa-angle-up" aria-hidden="true"
style={{float: 'right',    paddingTop: '7px', display:this.state.isOpen == index ? '' : 'none',
  fontSize: '17px'}}
></i></span>
</div>

<Collapse isOpen={this.state.isOpen == index ? true : false} style={{    padding: '0px'}}>
{cat.fld_subcategory.split('+').map((sub,index)=>(
                                                          sub == '' ? ' ':
    <div  style={{    padding: '7px 0 9px 43px',borderBottom:'1px solid lightgrey',fontSize:'14px'}}>

    <a 
    style={{color : '#585858',fontSize:'14px', }}
    onClick={()=>{
      localStorage.setItem('BlogCat', JSON.stringify(cat.fld_category))
      localStorage.setItem('BlogSubCat', JSON.stringify(sub.split('<')[0].trim()))
      window.location.href = '/healthknowledge/'+cat.fld_category.replace( /\W|_/g,'-')+"/"+sub.split('<')[0].trim().replace( /\W|_/g,'-')
    }}
    
     id="tabs">{sub.split('<')[0]}</a>

    </div>
       ))}
  </Collapse>
  
</div>

))}


                                                 <div>
                                                  {/* <h2 class="sidebar-title margin-top-20">Tags</h2> */}
                                                  <div>
                                                  <div class="specialist-tag row" style={{    padding: '15px'}} >  
                                                  {this.state.BlogTags != undefined ? this.state.BlogTags.map(
                              (tag,index1) => (
                                  <div >
                               
                                    {/* <span><p >{tag.fld_tag}</p></span> */}
                                </div>
                               )): '' } </div>
                                           </div>
                                        </div></div>
                                       
     
                                        <div style={{marginTop: '30px',marginBottom:"30px",padding:"20px",background:"#fff"}}>
    <div id="blogbanner"></div>
</div>           
<div style={{marginBottom : '30px',width:"330px"}}>

<div class="fb-page" data-href="https://www.facebook.com/beatmysugarofficial/" data-tabs="timeline" data-width="400" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/beatmysugarofficial/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/beatmysugarofficial/">Beatmysugar</a></blockquote></div>

</div>
                                        </div>
                       
                       
                       
      
  );
  }
}

export default BlogCategorySection
  
