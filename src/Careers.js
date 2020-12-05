import React from 'react';
import logo from './logo.svg';
import Header from './Header'
import Footer from './Footer'
import News from './News';

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
            //  #507dc0'
          });
        //    Notiflix.Loading.Dots('');

        Notiflix.Loading.Init({
            svgColor: "#507dc0",
            //  #507dc0'
          });
      
      
      
          PostApiCall.postRequest(
            {
              id: this.props.match.params.id,
            },
            "GetCareerByID"
          ).then((results) =>
            results.json().then((obj) => {
              if (results.status == 200 || results.status == 201) {

                console.log(obj.data[0] )

                this.setState({
                    CareerData : obj.data[0]                   
                })
              
              }
            }))
    
//           var det = localStorage.getItem('CareerDetails')
//           var CareerData = JSON.parse(det)
//            console.log(CareerData)
//         this.setState({
//               Title:CareerData.fld_title,
//               Location:CareerData.fld_city,
//               State:CareerData.fld_state,
//               Country:CareerData.fld_country,

//               EmploymentType:CareerData.fld_employmenttype,
//               Experience:CareerData.fld_workexperience,
//               Qualification:CareerData.fld_qualification,
//               Description:CareerData.fld_jobdescription,

 
//   })
        }
    

  render(){
  return (

    <div className="App">    
<Header></Header>

<nav aria-label="breadcrumb" class="breadcrumb-nav">
                        <div class="container">
                            <ol class="breadcrumb">
                                {/* <li class="breadcrumb-item"><a href="/"><i class="icon-home"></i></a></li>
                                <li class="breadcrumb-item" aria-current="page">Careers</li> */}
                                {/* <li class="breadcrumb-item" aria-current="page">Diabetes</li>
                                <li class="breadcrumb-item" aria-current="page">Type 1 Diabetes</li>
                                <li class="breadcrumb-item active" aria-current="page">Type 1 diabetes causes and risk factors */}
                                    {/* </li> */}
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
                                                       
                                                     <p class="job-title"><b>{this.state.CareerData.fld_title}  </b></p>
                                                     <p>Qualification -  {this.state.CareerData.fld_qualification != undefined ? Parser((this.state.CareerData.fld_qualification).replace(/font-family/g, "").replace(/&amp;/g, "&").replace(/<p>/g, "")) : ''}</p>
                                                    <p>Location - {this.state.CareerData.fld_city + ','}</p>
                                                     <p>Employment Type - {this.state.CareerData.fld_employmenttype}</p>
                                                     <p>Experience - {Parser(('<span>'+ this.state.CareerData.fld_workexperience +'</span>').replace(/font-family/g, '').replace(/color/g, '').replace(/&amp;/g, '&').replace(/<p>/g, ''))}</p>  
                                                 
                                                 <p><b>Job Description </b></p>
                                                 <p style={{paddingLeft:'8px'}}>{Parser(('<span>'+ this.state.CareerData.fld_jobdescription +'</span>').replace(/font-family/g, '').replace(/color/g, '').replace(/&amp;/g, '&').replace(/<p>/g, ''))} </p>
                                                    {/*<ul style={{listStyle:'none'}}>
                                                        <li>• Write effective medical/clinical content in a scientifically accurate and in an engaging manner. Convert complex scientific content into easy to understand content for the target audience</li>
                                                        <li>• Write articles in his/her own unique way - authentic, trustworthy and free from plagiarism</li>
                                                        <li>• Write clear, concise and grammatically correct content</li>
                                                        <li>• Know authentic and reliable online and offline sources for content search</li>
                                                        <li>• Fact check the information with healthcare professionals and subject matter experts</li>
                                                        <li>• Ability to work independently with minimal supervision</li>
                                                    </ul>
                                                    <p>Project management</p>
                                                    <ul style={{listStyle:'none'}}>
                                                        <li>• Multi-task and possess excellent project management skills with attention to details</li>
                                                        <li>• Understand the business needs and work on various projects accordingly, set realistic timeline expectations; ability to deliver within agreed timelines</li>
                                                    </ul>
                                                    <p>Team player</p>
                                                    <ul style={{listStyle:'none'}}>
                                                        <li>• Excellent interpersonal skills, active listening; establish and maintains professional and productive working relationships within the team with cross-functional teams</li>
                                                        <li>• Coordinate effectively with external stakeholders like subject matter experts (SMEs) and designers for various projects</li>
                                                    </ul>
                                                    <p>Learning agility and flexibility</p>
                                                    <ul style={{listStyle:'none'}}>
                                                        <li>• Keen to learn and explore innovative ways of working</li>
                                                        <li>• Flexible and open to taking on new initiatives and projects</li>
                                                        <li>• Work effectively under pressure, flexible in work timings and schedules as per the needs of the project</li>
                                            </ul>*/}
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
