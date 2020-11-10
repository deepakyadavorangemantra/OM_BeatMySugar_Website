import React from 'react';
import Menu from './Header'
import Footer from './Footer'
import PostApiCall from "./Api";
import Parser from 'html-react-parser';

class LabDetails extends React.Component
{


    constructor(props){
        super(props)
        this.state={
            Lab : [],
            LabBranch : []
        }
    }

    componentDidMount(){

        //  console.log(this.props.match.params.doctorid.split('-')[0])

        PostApiCall.postRequest({

            lab_id : this.props.match.params.labid.split('-')[0]
                 
        },"GetLabDetailsWeb").then((results) => 
        
          results.json().then(obj => {
           
          if(results.status == 200 || results.status == 201){

            // console.log(obj.data[0].fld_accreditation.toString().toLowerCase().includes('iso'))
            this.setState({
                Lab : obj.data[0]
            })
          }

        }))



        PostApiCall.postRequest({

            lab_id : this.props.match.params.labid.split('-')[0]
                 
        },"GetLabBranchesWeb").then((results) => 
        
          results.json().then(obj => {
           
          if(results.status == 200 || results.status == 201){

            this.setState({
                LabBranch: obj.data
            })
          }

        }))

    }

    render()
    {
        return (
            <div>
                <Menu></Menu>
                <div class="container doctors-section">
                   
                   <div class="row ">
                       <div class="col-md-12">
                           <div class="doctors-box doctor-inner-page">
                                <div class="row">
                                    <div class="col-md-2">
                                        <img src={this.state.Lab.fld_logo == undefined ? '' : this.state.Lab.fld_logo}/>
                                    </div>
                                    <div class="col-md-7 doctors-details ">
                                        <p class="lab-title">{this.state.Lab.fld_name == undefined ? '' : this.state.Lab.fld_name} in {this.state.Lab.fld_city == undefined ? '' : this.state.Lab.fld_city}</p>
                                        <p class="Registration-number">Registration Number - <span>{this.state.Lab.fld_regno == undefined ? '' : this.state.Lab.fld_regno}</span></p>
                                            <p class="doc-desc">{ this.state.Lab.fld_profile == undefined ? '' : Parser(('<p>'+this.state.Lab.fld_profile+'</p>').replace(/font-family/g, '').replace(/color/g, ''))}
                                                </p>
                                       <ul class="certification-list">
                                           <li>
                                             
                                            {this.state.Lab.fld_accreditation == undefined ? '' : this.state.Lab.fld_accreditation.toString().toLowerCase().includes('iso') ? 
                                             <img src="/assets/images/iso.jpg"/>
                                            :
                                            ''
                                            } 
                                             
                                           </li>
                                           <li>
                                           {this.state.Lab.fld_accreditation == undefined ? '' : this.state.Lab.fld_accreditation.toString().toLowerCase().includes('nabl') ? 
                                            <img src="/assets/images/nabl.jpg" style={{width:"40px"}}/>
                                            :
                                            ''
                                            } 
                                               
                                           </li>

                                           <li>
                                           {this.state.Lab.fld_accreditation == undefined ? '' : this.state.Lab.fld_accreditation.toString().toLowerCase().includes('cap') ? 
                                            <img src="/assets/images/cap.jpg" style={{width:"40px"}}/>
                                            :
                                            ''
                                            } 
                                               
                                           </li>


                                           <li>
                                           {this.state.Lab.fld_accreditation == undefined ? '' : this.state.Lab.fld_accreditation.toString().toLowerCase().includes('nabh') ? 
                                            <img src="/assets/images/nabh.png" style={{width:"40px"}}/>
                                            :
                                            ''
                                            } 
                                               
                                           </li>
                                       </ul>
                                       
                                       <p class="doc-desc">{ this.state.Lab.fld_facilitiesavailable == undefined ? '' : Parser(('<p>'+this.state.Lab.fld_facilitiesavailable+'</p>').replace(/font-family/g, '').replace(/color/g, ''))}
                                                </p>
                                      
                                        {/* <div class="specialist">
                                            <span><p>Thyroid profile Total</p></span>
                                            <span><p>Complete Blood Count</p></span>
                                            <span><p>Kidney Function Test</p></span>
                                            <span><p>Thyroid profile Total</p></span>
                                            <span><p>Complete Blood Count</p></span>
                                            <span><p>Kidney Function Test</p></span>
                                        </div> */}
                                      
                                    </div>
                                    <div class="col-md-3 doctors-details doctor-contact-details doctor-details-inner contactdetails-align">
                                      
                                       <p><b>Address</b></p>
                                       <table style={{lineHeight:"20px",fontSize:"13px"}}>
                                            {/* <tr>
                                                <td> <i class="fas fa-map-marker-alt margin-space"></i></td>
                                                <td>
                                                      32 Smiles Multispeciality Dental Clinic
                                                </td>
                                            </tr>
                                            <tr>
                                                    <td></td>
                                                    <td>
                                                            130, Green Garden Layout, 
                                                    </td>
                                                </tr> */}
                                                <tr>
                                                        <td></td>
                                                        <td>
                                                                {this.state.Lab.fld_address}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                            <td></td>
                                                            <td>
                                                                    Landmark: {this.state.Lab.fld_landmark},
                                                            </td>
                                                        </tr>
                                                       
                                            </table>
                                            <p><a href={"mailto:"+this.state.Lab.fld_email} style={{textTransform:"lowercase"}}><i class="fas fa-envelope"></i> {this.state.Lab.fld_email}</a></p>
                                            <p><a href={"tel:(+91)" + this.state.Lab.fld_mobile} style={{textTransform:"lowercase"}}><i class="fas fa-phone-volume"></i> +91 {this.state.Lab.fld_mobile}</a></p>
                                            <p><a href={ "+"+this.state.Lab.fld_phone} style={{textTransform:"lowercase"}}><i class="fas fa-phone-volume"></i> +{this.state.Lab.fld_phone}</a></p>
                                            <p style={{display : this.state.Lab.fld_workingdays == '' ? 'none' : ''}}><i class="fas fa-calendar-alt"></i> {this.state.Lab.fld_workingdays} </p>
                                            <p><i class="fas fa-clock"></i> {this.state.Lab.fld_fromtime} -  {this.state.Lab.fld_totime}</p>
    
                                            <p class="contact-dtails-lab"><b>Contact Details</b></p>
                                            <p><i class="fas fa-user"></i> {this.state.Lab.fld_contactpersonname} - {this.state.Lab.fld_contactpersondesignation}</p>
                                            <p><a href={"mailto:"+this.state.Lab.fld_contactpersonemail} style={{textTransform:"lowercase"}}><i class="fas fa-envelope"></i> {this.state.Lab.fld_contactpersonemail}</a></p>
                                            <p><a href={"tel:(+91)" + this.state.Lab.fld_contactpersonmobile} style={{textTransform:"lowercase"}}><i class="fas fa-phone-volume"></i> +91 {this.state.Lab.fld_contactpersonmobile}</a></p>
                                            
                                           
                                            <ul class="doctor-social-media">
                                            {(this.state.Lab.fld_facebook == null || this.state.Lab.fld_facebook == '') ? '' : <li><a href={this.state.Lab.fld_facebook}><i class="icon-facebook"></i></a></li> } 
                                    {(this.state.Lab.fld_instagram == null || this.state.Lab.fld_instagram == '') ? '' : <li><a href={this.state.Lab.fld_instagram}><i class="icon-instagram"></i></a></li> }  
                                    {(this.state.Lab.fld_twitter == null || this.state.Lab.fld_twitter == '') ? '' :  <li><a href={this.state.Lab.fld_twitter}><i class="icon-twitter"></i></a></li> }  
                                    {(this.state.Lab.fld_linkedin == null || this.state.Lab.fld_linkedin == '') ? '' :  <li><a href={this.state.Lab.fld_linkedin}><i class="icon-linkedin"></i></a></li>}  
                           
                                            </ul>
                                    </div>
                                </div>
                           </div>
    
                         
                       </div>
                      
                    
                   </div>
                   <div class="row">

                   {this.state.LabBranch.map(
                              (lab,index) => (

                        <div class="col-md-3 ">
                                   <div class="doctors-details doctor-contact-details doctor-details-inner contactdetails-align lab-branches">   
                                        <p class="lab-title">{this.state.Lab.fld_name == undefined ? '' : this.state.Lab.fld_name} in {lab.fld_city}</p>
                                <table style={{lineHeight:"20px",fontSize:"13px"}}>
                                     {/* <tr>
                                         <td> <i class="fas fa-map-marker-alt margin-space"></i></td>
                                         <td>
                                               32 Smiles Multispeciality Dental Clinic
                                         </td>
                                     </tr> */}
                                     {/* <tr>
                                             <td></td>
                                             <td>
                                                     130, Green Garden Layout, 
                                             </td>
                                         </tr> */}
                                         <tr>
                                                 <td></td>
                                                 <td>
                                                         {lab.fld_address}
                                                 </td>
                                             </tr>
                                             <tr>
                                                     <td></td>
                                                     <td>
                                                             Landmark: {lab.fld_landmark},
                                                     </td>
                                                 </tr>
                                                
                                     </table>
                                     <p><a href={"mailto:"+lab.fld_email} style={{textTransform:"lowercase"}}><i class="fas fa-envelope"></i> {lab.fld_email}</a></p>
                                     <p><a href={"tel:(+91)" + lab.fld_mobile} style={{textTransform:"lowercase"}}><i class="fas fa-phone-volume"></i> +91 {lab.fld_mobile}</a></p>
                                     <p><a href={"tel:(+91)" + lab.fld_phone} style={{textTransform:"lowercase"}}><i class="fas fa-phone-volume"></i> +{lab.fld_phone}</a></p>
                                     <p><i class="fas fa-calendar-alt"></i> {lab.fld_workingdays} </p>
                                     <p><i class="fas fa-clock"></i> {lab.fld_fromtime} - {lab.fld_totime}</p>
        
                                     <p class="contact-dtails-lab"><b>Contact Details</b></p>
                                     <p><i class="fas fa-user"></i> {lab.fld_contactpersonname} - {lab.fld_contactpersondesignation}</p>
                                     <p><a href={"mailto:"+lab.fld_contactpersonemail} style={{textTransform:"lowercase"}}><i class="fas fa-envelope"></i> {lab.fld_contactpersonemail}</a></p>
                                     <p><a href={"tel:(+91)" + lab.fld_contactpersonmobile} style={{textTransform:"lowercase"}}><i class="fas fa-phone-volume"></i> +91 {lab.fld_contactpersonmobile}</a></p>
                                     
                                    
                                     <ul class="doctor-social-media">
                                     {(this.state.Lab.fld_facebook == null || this.state.Lab.fld_facebook == '') ? '' : <li><a href={this.state.Lab.fld_facebook}><i class="icon-facebook"></i></a></li> } 
                                    {(this.state.Lab.fld_instagram == null || this.state.Lab.fld_instagram == '') ? '' : <li><a href={this.state.Lab.fld_instagram}><i class="icon-instagram"></i></a></li> }  
                                    {(this.state.Lab.fld_twitter == null || this.state.Lab.fld_twitter == '') ? '' :  <li><a href={this.state.Lab.fld_twitter}><i class="icon-twitter"></i></a></li> }  
                                    {(this.state.Lab.fld_linkedin == null || this.state.Lab.fld_linkedin == '') ? '' :  <li><a href={this.state.Lab.fld_linkedin}><i class="icon-linkedin"></i></a></li>}  
                           
                                     </ul>
                             </div>
                            </div>
    
                              ))}
                            {/* <div class="col-md-3 ">
                                    <div class="doctors-details doctor-contact-details doctor-details-inner contactdetails-align lab-branches">   
                                         <p class="lab-title">Thyrocare Laboratories Ltd. Lab Tests in Chennai</p>
                                 <table style={{lineHeight:"20px",fontSize:"13px"}}>
                                      <tr>
                                          <td> <i class="fas fa-map-marker-alt margin-space"></i></td>
                                          <td>
                                                32 Smiles Multispeciality Dental Clinic
                                          </td>
                                      </tr>
                                      <tr>
                                              <td></td>
                                              <td>
                                                      130, Green Garden Layout, 
                                              </td>
                                          </tr>
                                          <tr>
                                                  <td></td>
                                                  <td>
                                                          Sai Baba Temple Road, Silver Springs Layout,
                                                  </td>
                                              </tr>
                                              <tr>
                                                      <td></td>
                                                      <td>
                                                              Landmark: Near Pavani Prestige,
                                                      </td>
                                                  </tr>
                                                 
                                      </table>
                                      <p><a href="#" style={{textTransform:"lowercase"}}><i class="fas fa-envelope"></i> thyrocare@gmail.com</a></p>
                                      <p><a href="#" style={{textTransform:"lowercase"}}><i class="fas fa-phone-volume"></i> +91 95000 27017</a></p>
                                      <p><a href="#" style={{textTransform:"lowercase"}}><i class="fas fa-phone-volume"></i> +044 5969 7250</a></p>
                                      <p><i class="fas fa-calendar-alt"></i> Mon - Sun </p>
                                      <p><i class="fas fa-clock"></i> 9:00 AM - 6:00 PM</p>
         
                                      <p class="contact-dtails-lab"><b>Contact Details</b></p>
                                      <p><i class="fas fa-user"></i> Mr. Sarath - Manager</p>
                                      <p><a href="#" style={{textTransform:"lowercase"}}><i class="fas fa-envelope"></i> sarath@gmail.com</a></p>
                                      <p><a href="#" style={{textTransform:"lowercase"}}><i class="fas fa-phone-volume"></i> +91 95000 27017</a></p>
                                      
                                     
                                      <ul class="doctor-social-media">
                                          <li><a href=""><i class="icon-facebook"></i></a></li>
                                          <li><a href=""><i class="icon-instagram"></i></a></li>
                                          <li><a href=""><i class="icon-twitter"></i></a></li>
                                        
                                          <li><a href=""><i class="icon-linkedin"></i></a></li>
                                      </ul>
                              </div>
                             </div> */}
                   </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default LabDetails;