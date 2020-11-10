import React from 'react';
import Menu from './Header'
import Footer from './Footer'
import GetApiCall from './GetApi'
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";


// var doc = []
class AyurvedaListing extends React.Component
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

        DocSpecialization : [],
        SpecRef : [],

        SelectedLocation : 'Select Location',
        SelectedSpecialisation : 'Select Specialization'
    }
}

componentDidMount(){


    Notiflix.Loading.Init({
        svgColor : '#507dc0'
        //  #507dc0'
      });
  
      Notiflix.Loading.Dots('Please wait...');
 
    GetApiCall.getRequest("GetDoctorWeb").then((results) => {

        results.json().then(data => ({
          data: data,
          status: results.status
      })
  ).then(res => {
    //   console.log(res.data.data.Spec)


    this.setState({
        Doctor: res.data.data,
        DoctorRef : res.data.data,
        // DocSpecialization : res.data.data.Spec.split(',')
    })

    var sp = []
    var data =[]
  
    for(var i =0 ; i<Object.keys(res.data.data).length ;i++){
        // sp.push(res.data.data[i].fld_specialization)

        data = res.data.data[i].Spec != undefined ?  res.data.data[i].Spec.split(',') : ''
        for(var j =0 ; j<data.length;j++)
{

    sp.push(data[j].trim())
}       
 
    }

    // console.log(sp)
    const unique = [... new Set(sp.map(un => un))]

    // console.log(unique)

    this.setState({
        DocSpecialization : unique
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
    // console.log(uniqueArr)
    this.setState({
        HealthCenterCity : uniqueArr,
        HealthCenterMapping : res.data.data
    })

})
})


     
}


onViewDetails(doc){
    window.location.href = `/doctor/${doc.fld_id+"-"+doc.fld_name.replace( / /g,'-').replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')}`
}


OnFilterSpec(){

    // console.log('in spec')

    var cn = 0
    var doc = []

    // console.log(this.state.SelectedSpecialisation)

    if(this.state.SelectedSpecialisation != 'All' && this.state.SelectedSpecialisation !=  'Select Specialization'){


            for(var i = 0 ;i <Object.keys(this.state.DoctorRef).length;i++){


                // console.log(this.state.DoctorRef[i].Spec.includes(this.state.SelectedSpecialisation))
                           
                                    if((this.state.DoctorRef[i].Spec != null ? this.state.DoctorRef[i].Spec.includes(this.state.SelectedSpecialisation) : '')){

              
                                            doc.push(this.state.DoctorRef[i])
                                    
                                            cn = cn + 1

                                            if(cn == Object.keys(this.state.DoctorRef).length){
                                                this.OnFilterLocation(doc)   
                                            }
                

                                    }else
                                    {
                                        cn = cn + 1

                                        if(cn == Object.keys(this.state.DoctorRef).length){
                                            this.OnFilterLocation(doc)   
                                        }
                                    }

                                }

    }else
    {
        this.OnFilterLocation(this.state.DoctorRef)
    }


}



OnFilterLocation(doc){

    // console.log(doc)
    var doc1 = [] 

    if(this.state.SelectedLocation != 'All' && this.state.SelectedLocation != 'Select Location'){

                           
                           
        for(var i = 0 ;i <Object.keys(this.state.HealthCenterMapping).length;i++){

            if(this.state.HealthCenterMapping[i].fld_city == this.state.SelectedLocation){

                // console.log(this.state.HealthCenterMapping[i].fld_doctorid)
                for(var j = 0 ;j <doc.length;j++){

                    if(this.state.HealthCenterMapping[i].fld_doctorid == doc[j].fld_id){

                        // console.log(this.state.DoctorRef[j])
                        doc1.push(doc[j])
                       
                    }

                }

            }

        }

     //    console.log(doc)

        var resArr = [];
        doc1.forEach(function(item){
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

        // console.log(doc)

        this.setState({
            Doctor : doc
        })  
    }

}

    render()
    {
        return (
            <div>
                <Menu></Menu>
                <div class="container ad-banner">
          <div id="myTarget"></div>
        </div>
                 <div class="container doctors-section">
                 <h3 class="section-title" style={{color : '',marginBottom : '30px'}}>Find a Doctor Near You</h3>
                 <div>
         <div class="header sticky-header">
            <div class="header-middle">
                <div class="container-fluid bg-color" style={{background : '#1b65a9'}}>
                    
            
                <div class="row" style={{width:"100%"}}>
                        
                         <div class="col-md-6 header-search " >
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
                                    name="q" id="q" placeholder="Search by Doctor Name..." required/>
                                    
                                    {/* <button
                                    
                                    class="btn" type="submit"><i class="icon-magnifier"></i></button> */}
                                 
                                    {/* <button class="btn" type="submit"><i class="icon-magnifier"
                                    // onClick={this.Results.bind(this)}
                                    ></i></button> */}
                                </div>
                            </div>
                            <div class="col-md-6 " >
                            <div class="row" style={{marginTop:"10px"}}>
                       <div class="col-md-2" style={{padding : '0px'}}>
                       <h4 class="section-title filter-title" style={{paddingLeft:"10px",marginBottom : '0px',color : '#fff',font: '600 18px/1.35 Rajdhani, Helvetica Neue, Verdana, Arial, sans-serif'}}>Filter By </h4>
                       </div>
                         <div class="col-md-4 col-12">
                        
                             <div class="dropdown-location">
                            <select 
                            value={this.state.SelectedSpecialisation}
                            onChange={(spec)=>{
                                // doc = []

                                this.setState({
                                    SelectedSpecialisation : spec.target.value
                                },()=>{
                                    this.OnFilterSpec()
                                })

                             

                            //     if(spec.target.value != 'All' && spec.target.value !=  'Select Specialization'){

                                
                                
                            //     for(var i = 0 ;i <Object.keys(this.state.DoctorRef).length;i++){

                            //         // console.log(spec.target.value )
                            //         if((this.state.DoctorRef[i].Spec != null ? this.state.DoctorRef[i].Spec.includes(spec.target.value) : '')){

              
                            //                 doc.push(this.state.DoctorRef[i])
                                    
                    
                            //             // console.log(this.state.HealthCenterMapping[i].fld_doctorid)
                            //             // for(var j = 0 ;j < this.state.DoctorRef[i].Spec != undefined ? Object.keys(this.state.DoctorRef[i].Spec.split(',')).length : 0;j++){

                            //             //     if(this.state.DoctorRef[i].Spec[j] == spec.target.value ){

                            //             //         // console.log(this.state.DoctorRef[j])
                            //             //         doc.push(this.state.DoctorRef[j])
                                               
                            //             //     }

                            //             // }

                            //         }

                            //     }


                            //     if(this.state.SelectedLocation != 'All' && this.state.SelectedLocation != 'Select Location'){


                            //         for(var j = 0 ;j <Object.keys(this.state.HealthCenterMapping).length;j++){


                            //             if(this.state.HealthCenterMapping[j].fld_city == this.state.SelectedLocation){


                            //                 for(var k = 0 ;k <doc.length;k++){

                            //                     if(this.state.HealthCenterMapping[j].fld_doctorid == doc[k].fld_id){
         
                            //                         // console.log(this.state.DoctorRef[j])
                            //                         doc.push(doc[k])

                            //                         this.setState({
                            //                             Doctor : doc
                            //                         })
                                                   
                            //                     }
         
                            //                 }

                            //             }


                            //         }

                            //     }else{
                            //         this.setState({
                            //             Doctor : doc
                            //         })
                            //     }
                               
                            // }
                            // else{
                            //     this.setState({
                            //         Doctor : this.state.DoctorRef
                            //     })  
                            // }
                               

                            }}
                            >
                                <option value="Select Specialization">Select Specialization</option>
                                <option value="All">All</option>
                               {this.state.DocSpecialization.map((spec,index)=>(
                                <option >{spec}</option>

                               ))} 
                               
                            </select>
                        
                             </div>
                         </div>
                   
                    
                    
                   
                     <div class="col-md-5 col-12" >
                        
                        <div class="dropdown-location">
                       <select 
                       value={this.state.SelectedLocation}
                       onChange={(city)=>{
                        //    doc = []
                           this.setState({
                               SelectedLocation : city.target.value
                           },()=>{
                            this.OnFilterSpec()
                           })
                           

                    //        if(city.target.value != 'All' && city.target.value != 'Select Location'){

                           
                           
                    //        for(var i = 0 ;i <Object.keys(this.state.HealthCenterMapping).length;i++){

                    //            if(this.state.HealthCenterMapping[i].fld_city == city.target.value){

                    //                // console.log(this.state.HealthCenterMapping[i].fld_doctorid)
                    //                for(var j = 0 ;j <Object.keys(this.state.DoctorRef).length;j++){

                    //                    if(this.state.HealthCenterMapping[i].fld_doctorid == this.state.DoctorRef[j].fld_id){

                    //                        // console.log(this.state.DoctorRef[j])
                    //                        doc.push(this.state.DoctorRef[j])
                                          
                    //                    }

                    //                }

                    //            }

                    //        }

                    //     //    console.log(doc)

                    //        var resArr = [];
                    //        doc.forEach(function(item){
                    //        var i = resArr.findIndex(x => x.fld_id == item.fld_id);
                    //        if(i <= -1){
                    //          resArr.push(item);
                    //        }
                    //      });

                    //        this.setState({
                    //            Doctor : resArr
                    //        })
                    //    }
                    //    else{
                    //        this.setState({
                    //            Doctor : this.state.DoctorRef
                    //        })  
                    //    }
                          

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
               </div>
                </div>
            </div>

        
        </div>
        
        
        </div>
        
        <div>
         <div >
            <div >
                <div class="container-fluid" style={{background : '#fff',padding: '10px 20px'}}>
                    
            
                <div class="row " style={{background : '#fff'}}>
               {this.state.Doctor.map(
                              (doc,index) => (
                   <div class="col-md-6" style={{padding : '0px'}} >
                       <div class="doctors-box hvr-underline-reveal" style={{margin: '10px 10px'}}>
                            <div class="row">
                                <div class="col-md-4">
                                    <img src={doc.fld_photo} class="doctors-listing-image"/>
                                </div>
                                <div class="col-md-8 doctors-details">
                                  <a onClick={()=>{this.onViewDetails(doc)}}>  <h3 >{doc.fld_title +' '+doc.fld_name}</h3></a>
                                 
                                    <p>{ doc.Qual}</p>
                                    <div class="specialist">
                                

                                        {doc.Spec != undefined ? doc.Spec.split(',').map(
                              (doc1,index1) => (
                                  <div >
                               
                                    <span><p>{doc1 }</p></span>
                                </div>
                               )): '' }
                               

                                    </div>
                                    <div class="clearfix"></div>
                                    {doc.fld_overallexperience == 0 ? <p style={{    height: '20px'}}></p> : 
                              <p style={{    height: '20px'}}>Overall {doc.fld_overallexperience} years of experience 
                              {/* <br/> {doc.fld_diabetesexperience == 0 ? '' : doc.fld_diabetesexperience+' years of Diabetic experience' */}
                                </p>
                              } 
                                   
                                    {doc.HealthCenterName == null ?  <br/> :   <p class="doctors-clinics">{doc.HealthCenterName.split(',')[0]}  {doc.HealthCenterName.split(',').length-1 != 0 ?  'and' : ''} { doc.HealthCenterName.split(',').length-1 != 0 ?  <a 
                                    
                                    onClick={()=>{this.onViewDetails(doc)}}
                                    
                                    >{doc.HealthCenterName.split(',').length-1} more clinics</a> : <p></p>}</p>}
                                    {doc.HealthCenterCity == null ?  <br/> :  <p class="doctors-location"><i class="fas fa-map-marker-alt"></i> {doc.HealthCenterCity == null ? '' : doc.HealthCenterCity}</p>}
                                    <a  class="btn view-profile-btn" onClick={()=>{this.onViewDetails(doc)}}>View Profile</a>
                                </div>
                                {/* <div class="col-md-4 doctors-details doctor-contact-details"> */}
                                    {/* <p><a href="#" style={{textTransform:"lowercase"}}><i class="fas fa-envelope"></i> {doc.fld_email}</a></p> */}
                                    {/* <p><a href="#" style={{textTransform:"lowercase"}}><i class="fas fa-phone-volume"></i> {doc.fld_mobile}</a></p> */}
                                    {/* <ul class="doctor-social-media">
                                    {(doc.fld_facebooklink == null || doc.fld_facebooklink == '') ? '' : <li><a href={doc.fld_facebooklink}><i class="icon-facebook"></i></a></li> } 
                                    {(doc.fld_instagramlink == null || doc.fld_instagramlink == '') ? '' : <li><a href={doc.fld_instagramlink}><i class="icon-instagram"></i></a></li> }  
                                    {(doc.fld_twitterlink == null || doc.fld_twitterlink == '') ? '' :  <li><a href={doc.fld_twitterlink}><i class="icon-twitter"></i></a></li> }  
                                    {(doc.fld_linkedinlink == null || doc.fld_linkedinlink == '') ? '' :  <li><a href={doc.fld_linkedinlink}><i class="icon-linkedin"></i></a></li>}  
                            
                                    </ul> */}
                                {/* </div> */}
                            </div>
                       </div>
                   </div>
                     )
                     )}

               </div>
           
               
                </div>
          
            </div>

        
        </div>
        </div>
        
                  
          
            </div>
            <div class="container">
                <div class="container-box container-box-lg info-boxes ">
                                        <div class="row">
                                          <div class="col-md-12">
                                          
                                         <p style={{textAlign:"justify",fontSize:"13px"}}><b>Disclaimer:</b> You understand that the Website/App, apart from acting as a facilitator between vendors and customers, also acts as a facilitator between doctors/registered medical practitioners/dietitians/ nutritionists etc. (“Medical Practitioners”) and users/patients, where users/patients can locate Medical Practitioners and make appointments for consultation. Patients/users can use the Website/App freely to easily locate Medical Practitioners. We are not a party to such interaction and take no liability that arises from any such acts/omissions of Medical Practitioners.
</p>
<p style={{textAlign:"justify",fontSize:"13px"}}>We shall not be held liable neither to the Medical Practitioners nor to the patients/users for any offer of service/consultation/communication made between them for whatsoever reason it may be. Further, We shall not be held liable either by the Medical Practitioners nor the patients/users for any technical mishap of whatever kind resulting from the consultation with the Medical Practitioners.</p>
                                          </div>
                                         
                                        
                    
                                         
                                        
                                                 
                                        </div>
                    
                                       
                                        </div>
                                      
                                    </div>
            <Footer></Footer>
            </div>
        
        );
    }
}

export default AyurvedaListing;