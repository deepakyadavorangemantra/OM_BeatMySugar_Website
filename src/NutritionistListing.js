import React from 'react';
import Menu from './Header'
import Footer from './Footer'
import GetApiCall from './GetApi'
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import Parser from 'html-react-parser';

var doc = []
class Nutritionist extends React.Component
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
            HealthCenterMapping : [],

            bannerfood : [],
            images : []
        }
    }


  
   
    
    componentDidMount(){
    

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
            //  #507dc0'
          });
      
          Notiflix.Loading.Dots('Please wait...');


          PostApiCall.postRequest(
            {
              verticle : 'Dietitian',
              type:'Listing Page'
            }
            ,"Get_AdBannerWebsite").then(resultdes =>
          resultdes.json().then(obj => {
            if(obj.data.length > 0)
            {
              this.setState({
                bannerfood:[obj.data[0]]
                // images:images
              })  }   
            }))
      
  
    
     
        GetApiCall.getRequest("GetNutritionistWeb").then((results) => {
    
            results.json().then(data => ({
              data: data,
              status: results.status
          })
      ).then(res => {
        //   console.log(res.data.data)
    
     
    
     
        this.setState({
            Doctor: res.data.data,
            DoctorRef : res.data.data
        })
    
        Notiflix.Loading.Remove()
          
    
    
      })
          })




      GetApiCall.getRequest("GetHealthCenterNutritionistWeb").then((results) => {

        results.json().then(data => ({
          data: data,
          status: results.status
      })
  ).then(res => {

    const uniqueArr = [... new Set(res.data.data.map(un => un.fld_city))]
    // console.log(res.data.data)
    this.setState({
        HealthCenterCity : uniqueArr,
        HealthCenterMapping : res.data.data
    })

})
})

    
      

    }



    handleKeyDown = (e) => {
        // e.target.blur(); 
        if(e.keyCode === 40) { //up or down
            document.activeElement.blur();
            return false;
        }
    
    }

  onViewDetails(doc){
    window.location.href = `/dietitian/${doc.fld_id+"-"+doc.fld_name.replace(/\W|_/g,"")}`

  }
   
    render()
    {
        return(
            <div >
                <Menu></Menu>

                <div class="container ad-banner">

<div class="d-none d-sm-none d-md-block">
{this.state.bannerfood && this.state.bannerfood.map(info=>(

<img 
onClick={()=>{
  if(info.fld_url != ''){
    window.open(info.fld_url, '_blank');
   }
}}
src={info.fld_image}/>  
))
}

</div>

  <div id="myTargetMobile" class="d-md-none d-sm-block">

  {this.state.bannerfood && this.state.bannerfood.map(info=>(
    <img 
    onClick={()=>{
      if(info.fld_url != ''){
        window.open(info.fld_url, '_blank');
       }
    }}
   src={info.fld_mobileimage}/>  
  ))
}

  </div>


</div>
       
   {/* <main class="main"> */}
            <div class="container doctors-section">
            <h3 class="section-title custom-size" style={{color : '000',marginBottom : '30px'}}>Find a Nutritionist / Dietician Near You</h3>
            <div >
                      
                   
              
                    
                         <div class="header sticky-header">
            <div class="header-middle">
                <div class="container-fluid bg-color" style={{background : '#1b65a9'}}>
                    
            
                 <div class="row" style={{width:"100%"}}> 
                       
                         <div class="col-md-5 header-search col-sm-1" >
                                <div class="header-search-wrapper" >
                                    <input type="search" class="form-control"  style={{marginBottom : '0px'}}
                                    value={this.state.HeaderText}
                                    onChange={(text)=>{

                                        // console.log(text.target.value)
                                                this.setState({
                                                
                                             Doctor : text.target.value == '' ? this.state.DoctorRef :this.state.DoctorRef.filter(item  => 
                                            {
                                        
                                        
                           
                                            if ( item.fld_name.toLowerCase().includes(text.target.value.toLowerCase())  
                                                // ||  item.fld_specialization.toLowerCase().includes(text.target.value.toLowerCase()) 
                                                // || item.Spec != undefined && item.Spec !== null ? item.Spec.includes(text.target.value.toLowerCase()) : ''
                                                // || item.HealthCenterCity != undefined ? item.HealthCenterCity.toLowerCase().includes(text.target.value.toLowerCase()) : ''
                                            
                                            ){
                                              return true
                                            }
                                          
                                            //   // item.oyo_id.includes(text.toUpperCase())
                                            }
                                            )
                                                })
                                        
                                              }}
                                    name="q" id="q" placeholder="Search by Nutritionist / Dietitian Name..." required/>
                                    
                                    {/* <button class="btn" type="submit"><i class="icon-magnifier"></i></button> */}
                                 
                                    {/* <button class="btn" type="submit"><i class="icon-magnifier"
                                    // onClick={this.Results.bind(this)}
                                    ></i></button> */}
                                </div>
                            </div>
                            <div class="col-md-4" >
                            <div class="row" style={{marginTop:"10px"}}>
                       <div class="col-md-4 " >
                       <h4 class="section-title filter-title" style={{marginLeft:"10px",marginBottom : '0px',color : '#fff',font: '600 18px/1.35 Rajdhani, Helvetica Neue, Verdana, Arial, sans-serif'}}>Filter By </h4>
                       </div>
                    
                     <div class="col-md-8 col-12" >
                        
                        <div class="dropdown-location custom-size-dropdown">
                       <select class="float-right" 
                       onChange={(city)=>{
                           doc = []

                           if(city.target.value != 'All' && city.target.value != 'Select Location'){

                           
                           
                          
                           for(var i = 0 ;i <Object.keys(this.state.HealthCenterMapping).length;i++){

                               if(this.state.HealthCenterMapping[i].fld_city == city.target.value){

                                   // console.log(this.state.HealthCenterMapping[i].fld_doctorid)
                                   for(var j = 0 ;j <Object.keys(this.state.DoctorRef).length;j++){

                                    // console.log(this.state.HealthCenterMapping[i])

                                       if(this.state.HealthCenterMapping[i].fld_dietitianid == this.state.DoctorRef[j].fld_id){

                                        //    console.log(this.state.DoctorRef[j])
                                           doc.push(this.state.DoctorRef[j])

                                          
                                          
                                       }

                                   }

                               }

                           }

                           var resArr = [];
                           doc.forEach(function(item){
                           var i = resArr.findIndex(x => x.fld_id == item.fld_id);
                           if(i <= -1){
                             resArr.push(item);
                           }
                         });

                            this.setState({
                                            Doctor : resArr
                                        })
                         
                       }
                       else{
                           this.setState({
                               Doctor : this.state.DoctorRef
                           })  
                       }
                          

                       }}
                       >
                             <option value="Select Location">Select Location</option>
                                <option value="All">All</option>
                          {this.state.HealthCenterCity.map((city,index)=>(
                           <option >{city}</option>

                          ))} 
                          
                       </select>
                   
                        </div> 
                    </div>
              
               
                </div>
               </div>
               <div class="col-md-3">
                           
                           </div>
               </div>
                </div>
            </div>

        
        </div>
        

        </div>

        <div>
         <div >
            <div >
                <div class="container-fluid" style={{background : '#fff',padding: '10px 20px'}}>
                   

               <div class="row " refs='mydiv' style={{background : '#fff'}}>
               {this.state.Doctor.map(
                              (doc,index) => (
                  <div class="col-md-6" style={{padding : '0px'}} >
                       <div class="doctors-box hvr-underline-reveal" style={{margin: '10px 10px'}}>
                            <div class="row">
                                <div class="col-md-4">
                                    <img src={doc.fld_photo} class="nutritionist-image"/>
                                </div>
                                <div class="col-md-8 doctors-details">
                                 <a onClick={()=>{this.onViewDetails(doc)}}>   <h3>{doc.fld_title+' '+doc.fld_name}</h3></a>

                                    <div class="specialist">
                                    {doc.Qual.split(',').map(
                              (doc1,index1) => (
                                    <p>{doc1}</p>
                              ))}
                                    </div>
                                    {/* <div class="clearfix"></div> */}
                                  {/* <p >{Parser(('<p>'+doc.fld_medicalassociation+'</p>').replace(/font-family/g, '').replace(/color/g, ''))}</p> */}
                                    <div class="clearfix"></div>
                                    
                                    {doc.fld_overallexperience == 0 ? <p style={{    height: '20px'}}></p> : 
                              <p style={{    height: '20px'}}>Overall {doc.fld_overallexperience} years of experience  </p>
                              } 
                                    
                                    
                                    {doc.HealthCenterName == null ?  <br/> :   <p class="doctors-clinics">{doc.HealthCenterName.split(',')[0]}  {doc.HealthCenterName.split(',').length-1 != 0 ?  'and' : ''} { doc.HealthCenterName.split(',').length-1 != 0 ?  <a 
                                    onClick={()=>{this.onViewDetails(doc)}}>{doc.HealthCenterName.split(',').length-1} more clinics</a> : <p></p>}</p>}
                                    {doc.HealthCenterCity == null ?  <br/> :  <p class="doctors-location"><i class="fas fa-map-marker-alt"></i> {doc.HealthCenterCity == null ? '' : doc.HealthCenterCity}</p>}
                                    <a class="btn view-profile-btn"
                                   onClick={()=>{this.onViewDetails(doc)}}
                                    >View Profile</a>
                                </div>
                                {/* <div class="col-md-4 doctors-details doctor-contact-details">
                                    <p><a href="#" style={{textTransform:"lowercase"}}><i class="fas fa-envelope"></i> {doc.fld_email}</a></p>
                                    <p><a href="#" style={{textTransform:"lowercase"}}><i class="fas fa-phone-volume"></i> +91 {doc.fld_mobile}</a></p>
                                    <ul class="doctor-social-media">
                                    {(doc.fld_facebooklink == null || doc.fld_facebooklink == '') ? '' : <li ><a href=""><i class="icon-facebook"></i></a></li> }
                                        {(doc.fld_linkedinlink == null || doc.fld_linkedinlink == '') ? '' :   <li ><a href=""><i class="icon-linkedin"></i></a></li> }
                                      {(doc.fld_twitterlink == null || doc.fld_twitterlink == '') ? '' :  <li><a href=""><i class="icon-twitter"></i></a></li> }
                                      
                                    
                                    </ul>
                                </div> */}
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
                   {/* </main> */}
                   <div class="container">
                       <div class="container-box container-box-lg info-boxes ">
                                        <div class="row">
                                          <div class="col-md-12">
                                          
                                         <p style={{textAlign:"justify",fontSize:"13px"}}><b>Disclaimer:</b> You understand that the Website/App, apart from acting as a facilitator between vendors and customers, also acts as a facilitator between doctors/registered medical practitioners/dietitians/ nutritionists etc. (“Medical Practitioners”) and users/patients, where users/patients can locate Medical Practitioners and make appointments for consultation. Patients/users can use the Website/App freely to easily locate Medical Practitioners. We are not a party to such interaction and take no liability that arises from any such acts/omissions of Medical Practitioners.
</p>
<p style={{textAlign:"justify",fontSize:"13px"}}>We shall not be held liable neither to the Medical Practitioners nor to the patients/users for any offer of service/consultation/communication made between them for whatsoever reason it may be. Further, We shall not be held liable either by the Medical Practitioners nor the patients/users for any technical mishap of whatever kind resulting from the consultation with the Medical Practitioners. </p>
                                          </div>
                                         
                                        
                    
                                         
                                        
                                                 
                                        </div>
                    
                                       
                                        </div>
                                      
                                    </div>
                   <Footer></Footer>
            </div>
        )
    }
}

export default Nutritionist;