import React from 'react';
import logo from './logo.svg';
import Header from './Header'
import Footer from './Footer'
// // import News from './News';

import Notiflix from "notiflix-react";
import Parser from "html-react-parser";
import PostApiCall from './Api';



class Careers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CareerData : []
         
        };
      }

      componentDidMount() {
       
        Notiflix.Loading.Init({
            svgColor : '#507dc0'

          });


        Notiflix.Loading.Init({
            svgColor: "#507dc0",
   
          });
      
      
      
          PostApiCall.postRequest(
            {
              id: this.props.match.params.id,
            },
            "GetCareerByID"
          ).then((results) =>
            results.json().then((obj) => {
              if (results.status == 200 || results.status == 201) {

                this.setState({
                    CareerData : obj.data[0]                   
                })
              
              }
            }))
    

        }
    

  render(){
  return (

    <div className="App">    
<Header></Header>

<nav aria-label="breadcrumb" class="breadcrumb-nav">
                        <div class="container">
                            <ol class="breadcrumb">
                                
                            </ol>
                        </div>
                        {/* <!-- End .container --> */}
                    </nav>


                    <div class="container">
                        
                        <div class="row">
    
                       
    
                                  <div class="col-md-12">
                                    
                                                 <div class="privacy-box marginbtm-240" style={{background:' #fff',
                                                 padding: '15px',marginBottom:'19%',fontWeight: '700',
                                                
                                                 color:'#6b6b6b',
                                                
                                                 letterSpacing:'.01rem',
                                                 font: '500 16px/1.35 Rajdhani,Helvetica Neue,Verdana,Arial,sans-serif',textAlign:'justify'
                                             }}>
                                                        <h2 class="title pull-left section-title">CAREERS</h2>
                                                       
                                                     <p class="job-title"><b>1.{this.state.CareerData.fld_title}  </b></p>
                                                    <p>Location - {this.state.CareerData.fld_city + ','}</p>
                                                     <p>Employment Type - {this.state.CareerData.fld_employmenttype}</p>
                                                     <p>Experience - {Parser(('<span>'+ this.state.CareerData.fld_workexperience +'</span>').replace(/font-family/g, '').replace(/color/g, '').replace(/&amp;/g, '&').replace(/<p>/g, ''))}</p>  
                                                 
                                                 <p><b>Job Description </b></p>
                                                 <p style={{paddingLeft:'8px'}}>{Parser(('<span>'+ this.state.CareerData.fld_jobdescription +'</span>').replace(/font-family/g, '').replace(/color/g, '').replace(/&amp;/g, '&').replace(/<p>/g, ''))} </p>
                                                   
                                                        <p>The above job description is not an all-inclusive list of duties and responsibilities. The candidate is expected to follow any other instructions, and perform other related duties if required, as per the business needs and demands.</p>
                                                        <p>Write to - <span><a href= "mailto:hr@beatmysugar.com">hr@beatmysugar.com</a></span></p>

                                                </div>
                                            
                                  </div>
                                 
                                </div>
                    </div>
    
 <Footer></Footer>                        
 </div>
  );
  }
}

export default Careers;
