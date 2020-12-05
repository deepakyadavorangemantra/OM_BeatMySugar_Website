import React from 'react';
import logo from './logo.svg';
import Header from './Header'
import Footer from './Footer'
import GetApiCall from './GetApi'
import moment from 'moment'
import Collapse from "@kunukn/react-collapse";


class BlogTagsSection extends React.Component {


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



                  GetApiCall.getRequest("GetBlogTags").then(resultdes =>
                    resultdes.json().then(obj => {
                    
    
                      
                   this.setState({
                       BlogTags: obj.data[0].Tags
                   })
        
    
                   
        
                    }))
    }



  render(){


  return (

  
                       <div class="col-md-3">
                       <div class="MainMenu">
                                         
                                          
                                           


                                                 
                                                  <h2 class="sidebar-title margin-top-20">Tags</h2>
                                                               <p class="tags">{this.state.BlogTags}</p>
                                        </div>
                                       
     
  
                                        </div>
                       
                       
                       
      
  );
  }
}

export default BlogTagsSection
  
