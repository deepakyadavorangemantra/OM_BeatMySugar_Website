import React from 'react';
import Menu from './Header'
import Footer from './Footer'
import GetApiCall from './GetApi'
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";


var doc = []
class Results extends React.Component
{

constructor(props){
    super(props)
    this.state={
        Doctor : [],
        DoctorRef : [],
        DocQualificationRef : [],
        DocQualification : [],
        DocSpecializationRef : [],

        HealthCenterCity : [],
        HealthCenterMapping : []
    }
}

componentDidMount(){


    Notiflix.Loading.Init({
        svgColor : '#507dc0'
      });
  
      Notiflix.Loading.Dots('Please wait...');
 
    GetApiCall.getRequest("GetDoctorWeb").then((results) => {

        results.json().then(data => ({
          data: data,
          status: results.status
      })
  ).then(res => {


    this.setState({
        Doctor: res.data.data,
        DoctorRef : res.data.data
    })

    Notiflix.Loading.Remove()

  })
      })




      GetApiCall.getRequest("GetHealthCenterDoctorWeb").then((results) => {

        results.json().then(data => ({
          data: data,
          status: results.status
      })
  ).then(res => {

    const uniqueArr = [... new Set(res.data.data.map(un => un.fld_city))]
    this.setState({
        HealthCenterCity : uniqueArr,
        HealthCenterMapping : res.data.data
    })

})
})


     
}

    render()
    {
        return (
            <div>
                <Menu></Menu>
                 <div class="container doctors-section">
                     <div class="row">
                         <div class="col-md-6">
                            <h3 class="section-title">Search Results</h3>
                         </div>
                         <div class="col-md-6 ">
                             <div class="dropdown-location">
                            <select class="float-right"
                            onChange={(city)=>{
                                doc = []

                                if(city.target.value != 'All'){

                                
                                
                                for(var i = 0 ;i <Object.keys(this.state.HealthCenterMapping).length;i++){

                                    if(this.state.HealthCenterMapping[i].fld_city == city.target.value){

                                        for(var j = 0 ;j <Object.keys(this.state.DoctorRef).length;j++){

                                            if(this.state.HealthCenterMapping[i].fld_doctorid == this.state.DoctorRef[j].fld_doctorid){

                                                doc.push(this.state.DoctorRef[j])
                                               
                                            }

                                        }

                                    }

                                }
                                this.setState({
                                    Doctor : doc
                                })
                            }
                            else{
                                this.setState({
                                    Doctor : this.state.DoctorRef
                                })  
                            }
                               

                            }}
                            >
                                <option value="All">All</option>
                               {this.state.HealthCenterCity.map((city,index)=>(
                                <option >{city}</option>

                               ))} 
                               
                            </select>
                        
                            </div>
                         </div>
                     </div>
                   
               <div class="row ">
               {this.state.Doctor.map(
                              (doc,index) => (
                   <div class="col-md-6">
                       <div class="doctors-box hvr-underline-reveal">
                            <div class="row">
                                <div class="col-md-3">
                                    <img src={doc.fld_photo} class="doctors-listing-image"/>
                                </div>
                                <div class="col-md-9 doctors-details">
                                    <h3>Dr. {doc.fld_doctorname}</h3>
                                    <p>{doc.fld_qualification + ', ' + doc.Qual}</p>
                                    <div class="specialist">
                                 

                                        {doc.Spec != undefined ? doc.Spec.split(',').map(
                              (doc1,index1) => (
                                    <span><p>{doc1}</p></span>
                               )): '' }
                                        

                                    </div>
                                    <div class="clearfix"></div>
                                    <p>Overall {doc.fld_overallexperience} years of experience 
                                    </p>
                                   
                                    {doc.HealthCenterName == null ?  <br/> :   <p class="doctors-clinics">{doc.HealthCenterName.split(',')[0]}  {doc.HealthCenterName.split(',').length-1 != 0 ?  'and' : ''} { doc.HealthCenterName.split(',').length-1 != 0 ?  <a href="">{doc.HealthCenterName.split(',').length-1} more clinics</a> : <p></p>}</p>}
                                    {doc.HealthCenterCity == null ?  <br/> :  <p class="doctors-location"><i class="fas fa-map-marker-alt"></i> {doc.HealthCenterCity == null ? '' : doc.HealthCenterCity}</p>}
                                    <a  class="btn view-profile-btn" onClick={()=>{
                                    window.location.href = `/doctor/${doc.fld_doctorid+"-"+doc.fld_doctorname.replace( / /g,'-')}`

                                    }}>View Profile</a>
                                </div>
                                
                            </div>
                       </div>
                   </div>
                     )
                     )}

               </div>
            </div>
            <Footer></Footer>
            </div>
        
        );
    }
}

export default Results;