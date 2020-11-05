/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import logo from './logo.svg';

import Header from './Header'
import Footer from './Footer'
// // import News from './News';
import Notiflix from "notiflix-react";
import PostApiCall from './Api';
import moment from 'moment';
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";

class Diabeticprofile extends React.Component {


    constructor(props){
        super(props)
        this.state={
            ProfileData : [],
            isDiabetic : 'No',


            NumRegex : /^0|[0-9]\d*$/,
            MobileRegex : /^[0-9]*$/,
            AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
            SpecialRegex : /[-!$%^&*()_+|~=`'"{}\[\]:\/;<>?,.@#]/,
            EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            UrlRegex : /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,



            DiabetesType : [
                { value: "Select..", label: "Select.." },
                {label : 'T1',value:'T1'},
                {label : 'T2',value:'T2'},
                {label : 'GDM',value:'GDM'},
                {label : 'Pre-Diabetic',value:'Pre-Diabetic'},
                {label : 'Others',value:'Others'}
            ],
            TypeSelected : '',
            DateDiagnosed : '',

            isFamilyDiabetic : 'No',


         TitleData: [
            { value: "Dr.", label: "Dr." },
            { value: "Mr.", label: "Mr." },
            { value: "Ms.", label: "Ms." },
       
           
          ],



          RelationshipData : [
            { value: "Select..", label: "Select.." },
            { value: "Father", label: "Father" },
            { value: "Mother", label: "Mother" },
            { value: "Brother", label: "Brother" },
            { value: "Sister", label: "Sister" },
            { value: "Spouse", label: "Spouse" },
            { value: "Son", label: "Son" },
            { value: "Daughter", label: "Daughter" },

          ],
          OccupationData:[
            { value: "Select..", label: "Select.." },
            {value:"Student", label:"Student"},
            {value:"Self Employed", label:"Self Employed"},
            {value:"Salaried", label:"Salaried"},
            {value:"Professional", label:"Professional"},
            {value:"Home Maker", label:"Home Maker"},
            {value:"Others", label:"Others"},
        ],
          Title : 'Dr.',
          Name : '',
          Dob : '',
          Relationship : '',
          Email : '',
          Mobile : '',
          TypeFamilySelected : '',
          DateFamilyDiagnosed : '',
          Occupation : [],
          FamilyProfileData : []
        }
    }



    componentDidMount() {
       
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
       
          });

          
          Notiflix.Loading.Dots('');


          var login=localStorage.getItem('CustomerLoginDetails');
          var ProfileData=JSON.parse(login)

          PostApiCall.postRequest(
            {
              id:ProfileData.fld_userid
            },
            "GetUserInfoByID"
          ).then((results) =>
            results.json().then((obj) => {
              if (results.status == 200 || results.status == 201) {
         
 
        this.setState({
            ProfileData : obj.data[0],
            isDiabetic : obj.data[0].fld_areyoudiabetic == null ? 'No' : obj.data[0].fld_areyoudiabetic,
            TypeSelected : obj.data[0].fld_typeofdiabetic == null ? this.state.DiabetesType[0].label : obj.data[0].fld_typeofdiabetic,
            DateDiagnosed : obj.data[0].fld_diagnosed == null ? '' : new Date(obj.data[0].fld_diagnosed)
        })



    }
}))

PostApiCall.postRequest(
    {
      userid:ProfileData.fld_userid
    },
    "Get_UserFamilyInfoByIDWeb"
  ).then((results) =>
    results.json().then((obj) => {
      if (results.status == 200 || results.status == 201) {

        if(obj.data.length > 0){

            this.setState({
                isFamilyDiabetic : 'Yes'
            })

        }else
        {
            this.setState({
                isFamilyDiabetic : 'No'
            })
        }
        this.setState({
            FamilyProfileData:obj.data
        })

        Notiflix.Loading.Remove()
      }
    }))
        }


        OnSelfDia(){


            Notiflix.Loading.Dots('');

            PostApiCall.postRequest({

             
              
               id :this.state.ProfileData.fld_userid,
               areyoudiabetic : this.state.isDiabetic,
               typeofdiabetic : this.state.TypeSelected,
               diagnosed : this.state.DateDiagnosed,
               updatedby : this.state.ProfileData.fld_userid,
               updatedon : moment().format('lll'),
              
        
            },"UpdateUserDiabeticProfile").then((results) => 
                
            
   
              results.json().then(obj => {
        
            
              if(results.status == 200 || results.status==201){

                Notiflix.Loading.Remove()
                Notiflix.Notify.Success('Your diabetic profile has been updated.')
                window.location.reload()

              }

            }))
        }


        OnSaveDia(){
            if(this.state.isDiabetic == 'No'){

                this.OnSelfDia()
            }else{

                if(this.state.DiabetesType != ''){

        


                        this.OnSelfDia()

                 
                }else
                {
                    Notiflix.Notify.Failure('Please select which type of diabetes you have.')
                }

            }
        }


        OnSaveFamilyProfile(){
            if(this.state.Name != ''){
        
                    if(this.state.Relationship != 'Select..' && this.state.Relationship != ''){
                        
                        if(this.state.DiabetesFamilyType != 'Select..' && this.state.DiabetesFamilyType != ''){

                     


                                Notiflix.Loading.Dots('');

                                PostApiCall.postRequest({
                    
                                 
                                  
                                     userid : this.state.ProfileData.fld_userid,
                                     diabeticmember : 'Yes',
                                     title : this.state.Title,
                                     name : this.state.Name,
                                     dob : this.state.Dob,
                                     relation :this.state.Relationship,
                                     type : this.state.TypeFamilySelected,
                                     diagnosedate : this.state.DateFamilyDiagnosed,
                                     occupation : this.state.Occupation,
                                     email : this.state.Email,
                                     mobile : this.state.Mobile,
                                     updatedon : moment().format('lll'),
                                     updatedby : this.state.ProfileData.fld_userid
                                  
                            
                                },"AddUserFamilyInfoMapping").then((results) => 
                                    
                                
                      
                                  results.json().then(obj => {
                            
                                
                                  if(results.status == 200 || results.status==201){
                    
                                    Notiflix.Loading.Remove()
                                    Notiflix.Notify.Success('Family profile has been updated.')
                                    window.location.reload()
                    
                                  }
                    
                                }))

                           
                        }else
                        {
                            Notiflix.Notify.Failure('Please select which type of diabetes they have.')
                        }
                        
                    }else
                    {
                        Notiflix.Notify.Failure('Please select your relationship with the family member.')
                    }
               
            }else
            {
                Notiflix.Notify.Failure('Please enter name of your family member.')
            }
        }


  render(){
  return (

    <div className="App">    
<Header></Header>


  <div class="account-section">             
<div class="co">
                <div class="container" style={{background:"none"}}>
                    <div class="row mt-2">
                        <div class="col-lg-9 order-lg-last ">
                            <div class="dashboard-content" style={{    marginBottom: '3%'}}>
                            <h2>Diabetic Profile
</h2>
                            
                           
                             <form onSubmit={(e)=>{
                                 e.preventDefault()
                             }}>
                              
                                <div class="row">
                                    <div class="col-md-12">
                                    <div class="form-group required-field">
                                   <h3>Do you have Diabetes?</h3>
                                    </div>
                                    </div>
                                    <div class="col-md-1">
                                    <div class="custom-control custom-checkbox"
                       
                                    onClick={()=>{

                                        if(this.state.isDiabetic == 'Yes'){
                                            this.setState({
                                                isDiabetic : 'No'
                                            })
                                        }else{
                                            this.setState({
                                                isDiabetic : 'Yes'
                                            })  
                                        }
                                    }}
                                    >
                                    <input type="checkbox" class="custom-control-input" 
                                 checked={this.state.isDiabetic =='Yes' ? true : false}
                                    />
                                    <label class="custom-control-label" >Yes</label>
                                </div>
                                    </div>

                                    <div class="col-md-1">
                                    <div class="custom-control custom-checkbox"
                                     onClick={()=>{

                                        if(this.state.isDiabetic == 'Yes'){
                                            this.setState({
                                                isDiabetic : 'No'
                                            })
                                        }else{
                                            this.setState({
                                                isDiabetic : 'Yes'
                                            })  
                                        }
                                    }}
                                    >
                                    <input type="checkbox" class="custom-control-input" 
                                    checked={this.state.isDiabetic =='No' ? true : false}
                                   
                                    />
                                    <label class="custom-control-label" >No</label>
                                </div>
                                    </div>
                                </div>
                              

                                <div style={{display: this.state.isDiabetic == 'Yes' ? '': 'none'}}>
                                    <div class="row">
                                    <div class="col-md-6">
                                            <div class="form-group required-field">
                                                <label for="acc-pass2">Type of Diabetes</label>
                                               <select class="form-control"
                                               value={this.state.TypeSelected}
                                               onChange={(text)=>{

                                                this.setState({
                                                    TypeSelected : text.target.value
                                                })

                                               }}
                                               >
                                                   {this.state.DiabetesType.map((dt,index)=>(
                                                       <option key={dt.label} value={dt.label}>{dt.label}</option>
                                                   ))}
                                               </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                        <label for="acc-pass2">When were you diagnosed with diabetes ?</label>

                                            <div class="input-group required-field">
                                                

                                    <DatePicker
                                disabled={this.state.isVisible}
                                onKeyDown={(e) => e.preventDefault()}
                                maxDate={new Date()}
                                value={this.state.DateDiagnosed}
                                onChange={(text)=>{
                                    this.setState({
                                        DateDiagnosed : new Date(text)
                                    })
                                }}
                               maxDetail={"year"}
                               clearIcon={null}
                                 
                                />
                                            </div>
                                        </div>

                                        
                                    </div>
                              
                                </div>

                                <div class="required text-right">* Required Field</div>
                                <div class="form-footer">
                                   

                                    <div class="form-footer-right">
                                        <button 
                                        onClick={this.OnSaveDia.bind(this)}
                                        type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="dashboard-content" style={{    marginBottom: '3%'}}>
                            <h2>Family Information
</h2>
                           
                           
                             <form onSubmit={(e)=>{

                                 e.preventDefault()

                             }}>
                              
                                <div class="row">
                                    <div class="col-md-12">
                                    <div class="form-group required-field">
                                   <h3>Any family member with diabetes </h3>
                                    </div>
                                    </div>
                                    <div class="col-md-1">
                                    <div class="custom-control custom-checkbox"
                                     onClick={()=>{

                                        if(this.state.isFamilyDiabetic == 'Yes'){
                                            this.setState({
                                                isFamilyDiabetic : 'No'
                                            })
                                        }else{
                                            this.setState({
                                                isFamilyDiabetic : 'Yes'
                                            })  
                                        }
                                    }}
                                    >
                                    <input 
                                       checked={this.state.isFamilyDiabetic =='Yes' ? true : false}
                                    type="checkbox" class="custom-control-input" />
                                    <label class="custom-control-label" for="diabetic-profile">Yes</label>
                                </div>
                                    </div>

                                    <div class="col-md-1">
                                    <div class="custom-control custom-checkbox"
                                    
                                    onClick={()=>{

                                        if(this.state.isFamilyDiabetic == 'Yes'){
                                            this.setState({
                                                isFamilyDiabetic : 'No'
                                            })
                                        }else{
                                            this.setState({
                                                isFamilyDiabetic : 'Yes'
                                            })  
                                        }
                                    }}
                                    >
                                    <input 
                                       checked={this.state.isFamilyDiabetic =='No' ? true : false}
                                    type="checkbox" class="custom-control-input"  />
                                    <label class="custom-control-label" for="change-pass-checkbox-no">No</label>
                                </div>
                                    </div>
                                </div>
                              

                                <div  style={{display: this.state.isFamilyDiabetic == 'Yes' ? '': 'none'}}>
                                    <div class="row">
                                    <div class="col-md-6">
                                            <div class="form-group required-field">
                                                <label for="acc-pass2">Title</label>
                                               <select class="form-control"
                                                onChange={(text)=>{

                                                    this.setState({
                                                        Title : text.target.value
                                                    })

                                                }}
                                               value={this.state.Title}
                                               >
                                               {this.state.TitleData.map(title => (
                           
                                                <option key={title.value} value={title.value}>
                                                    {title.label}
                                                </option>
                                                ))}
                                               </select>
                                            </div>
                                        </div>
                                       
                                        <div class="col-md-6">
                                            <div class="form-group required-field">
                                                <label for="acc-pass2">Name</label>
                                                <input 
                                                onChange={(text)=>{
                                                    this.setState({
                                                        Name : text.target.value
                                                    })
                                                }}
                                                value={this.state.Name}
                                                type="text" class="form-control" />
                                            </div>
                                        </div>

                                        
                                    </div>

                                    <div class="row">
                                   
                                        <div class="col-md-6">
                                        <label for="acc-pass2">Date of Birth</label>
                                            <div class="input-group required-field">
                                                
                                               
                                              
                                <DatePicker
                                
                                onKeyDown={(e) => e.preventDefault()}
                                value={this.state.Dob}
                                                onChange={(text)=>{

                                                    this.setState({
                                                        Dob : new Date(text)
                                                    })

                                                }}
                                            
                                  maxDate={new Date()}
                                  clearIcon={null}
                                />
                                                
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group required-field">
                                                <label for="acc-pass2">Your Relationship</label>
                                               <select 
                                               value={this.state.Relationship}
                                               onChange={(text)=>{

                                                this.setState({
                                                    Relationship : text.target.value
                                                })

                                               }}
                                               class="form-control">
                                                    {this.state.RelationshipData.map(title => (
                           
                                                        <option key={title.value} value={title.value}>
                                                            {title.label}
                                                        </option>
                                                        ))}
                                                    
                                               </select>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div class="row">
                                   
                                   <div class="col-md-6">
                                       <div class="form-group">
                                           <label for="acc-pass2">Email</label>
                                           <input type="text" class="form-control" 
                                           value={this.state.Email}
                                           onChange={(text)=>{

                                            this.setState({
                                                Email : text.target.value
                                            })

                                           }}
                                           />
                                       </div>
                                   </div>

                                   <div class="col-md-6">
                                       <div class="form-group ">
                                           <label for="acc-pass2">Mobile Number</label>
                                           <input type="text" class="form-control" 
                                           value={this.state.Mobile}
                                           onChange={(text)=>{

                                            if(this.state.NumRegex.test(text.target.value) && text.target.value.length <= 10)
                                            {
                                            this.setState({
                                                Mobile : text.target.value
                                            })
                                        }

                                           }}/>
                                       </div>
                                   </div>
                                
                                   
                               </div>
                               
                               <div class="row">
                                    <div class="col-md-6">
                                            <div class="form-group required-field">
                                                <label for="acc-pass2">Type of Diabetes</label>
                                               <select class="form-control"
                                               value={this.state.TypeFamilySelected}
                                               onChange={(text)=>{

                                                this.setState({
                                                    TypeFamilySelected : text.target.value
                                                })

                                               }}
                                               >
                                                   {this.state.DiabetesType.map((dt,index)=>(
                                                       <option key={dt.label} value={dt.label}>{dt.label}</option>
                                                   ))}
                                               </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                        <label for="acc-pass2">When was she/he diagnosed with diabetes ?</label>
                                            <div class="input-group required-field">
                                               
                                               
                                               

                                                        <DatePicker
                                                        
                                                        onKeyDown={(e) => e.preventDefault()}
                                                        value={this.state.DateFamilyDiagnosed}
                                                onChange={(text)=>{
                                                    this.setState({
                                                        DateFamilyDiagnosed : new Date(text)
                                                    })
                                                }}
                                                                        maxDetail={"year"}
                                        
                                                        maxDate={new Date()}
                                                        clearIcon={null}
                                                        />
                                                
                                            </div>
                                        </div>

                                        
                                    </div>
                              
                                    <div class="row">
                                <div class="col-md-6">
                                            <div class="form-group ">
                                                <label for="acc-pass2">Occupation</label>
                                               <select class="form-control"
                                                onChange={(text)=>{

                                                    this.setState({
                                                        Occupation : text.target.value
                                                    })

                                                }}
                                               value={this.state.Occupation}
                                               >
                                               {this.state.OccupationData.map(title => (
                           
                                                <option key={title.value} value={title.value}>
                                                    {title.label}
                                                </option>
                                                ))}
                                               </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                <div class="required text-right">* Required Field</div>
                                <div class="form-footer">
                                   

                                    <div class="form-footer-right">
                                        <button type="submit" 
                                        onClick={this.OnSaveFamilyProfile.bind(this)}
                                        class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                                </div>
                                </div>
                           
                                </div>

                                
                           
                            </form>
                        </div>

                        <div class="dashboard-content" >
                            <div class="row">
                            {this.state.FamilyProfileData.map((info,index)=>(
                            <div class="col-md-4">
                        <div class="card" style={{marginBottom:"10px",marginTop:"10px"}}>
                                        <div class="card-header">
                                            Family Member
                                            
                                             <a onClick={()=>{


                                                Notiflix.Loading.Dots('');

                                                PostApiCall.postRequest({
                                                
                                                    id : info.fld_id,

                                                },"DeleteUserFamilyInfoMapping").then((results) => 
                                                    

                                     
                                                results.json().then(obj => {


                                                if(results.status == 200 || results.status==201){

                                                    Notiflix.Loading.Remove()
                                                    Notiflix.Notify.Success('Family profile has been updated.')
                                                    window.location.reload()

                                                }

                                                }))

                                             }} class="card-edit">Remove</a>
                                        
                                        </div>

                                              

                                                    <div class="card-body">
                                                    <p><b>Name -</b> {info.fld_title} {info.fld_name}</p>
                                                    <p><b>DOB -</b> {info.fld_dob == '' ? '' : moment(info.fld_dob).format('ll')}</p>
                                                <p><b>Relationship -</b> {info.fld_relation}</p>
                                                <p><b>Mobile -</b>  {info.fld_mobile}</p>
                                                <p><b>Email -</b> {info.fld_email}</p>
                                                <p><b>Occupation -</b> {info.fld_occupation}</p>
                                                <p><b>Type of Diabetes -</b> {info.fld_type}</p>
                                                <p><b>Diagnosed date -</b> {info.fld_diagnosedate == '' ? '' : moment(info.fld_diagnosedate).format('MMM YYYY')}</p>
                                                    </div>
                                               
                                       
                                    </div>
                                    </div>
                                     ))}
                                    </div>
                                  
                        </div>
                       

                      
                        </div>
                        <aside class="sidebar col-lg-3">
                            <div class="widget widget-dashboard">

                            <ul class="list">
                                    <li >
                                        <a href="/account">Account Dashboard</a>
                                        <p>Get an Overview of your Account</p>
                                    </li>

                                    <li class="">
                                        <a href="/orderhistory">My Orders</a>
                                        <p>Check Shipping Status, Re Order Items</p>
                                    </li>

                                    <li class="">
                                        <a href="/wishlist">My Wishlist</a>
                                        <p>Add item to cart, Remove item</p>
                                    </li>

                                    <li class="" >
                                        <a href="/editprofile">My Profile</a>
                                        <p>Your Name, Phone Number, Email</p>
                                    </li>

                                    <li class="">
                                        <a href="/addressbook">My Address Book</a>
                                        <p>Add, Edit address</p>
                                    </li>
                                    <li class="">
                                        <a href="/diabeticprofile">Diabetic Profile</a>
                                        <p>Types of Diabetes</p>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            </div>
 <Footer></Footer>                        
 </div>
  );
  }
}

export default Diabeticprofile;
