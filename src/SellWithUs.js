import React from 'react';
import Menu from './Header';
import Footer from './Footer';
import PostApiCall from "./Api";
import GetApiCall from './GetApi';
import Notiflix from "notiflix-react";
import moment from 'moment';
import Select from 'react-select';
import { connect } from "react-redux";
import {setCompanyName,
    setAddress,setCountry,setState,setCity,setPincode,
    settitle,
    setname,
    setdesignation,
    setemail,setmobile,setworking,setabout,setclearsell
} from './Actions/actionType';

class Sellwithus extends React.Component
{
    constructor(props){
        super(props)
        this.state={

            NumRegex : /^0|[0-9]\d*$/,
            MobileRegex : /^[0-9]*$/,
            AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
            SpecialRegex : /[-!$%^&*()_+|~=`'"{}\[\]:\/;<>?,.@#]/,
            EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            UrlRegex : /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  
            ProductData:[{'label':'Medicine','value' : 'medicine'},{'label':'Food','value' : 'Food'},{'label':'Footcare','value' : 'Footcare'},{'label':'Devices','value' : 'Devices'},{'label':'Food Delivery','value' : 'Food Delivery'}
            ],
            ProductService:[],


        TitleData: [
            { value: "Dr.", label: "Dr." },
            { value: "Mr.", label: "Mr." },
            { value: "Ms.", label: "Ms." },
       
           
          ],
          CountryData : [],
          CityData : [],
          StateData : [],
          CountryId: 0,
          StateId : 0,
          CityId : 0,

          bannerfood:[],
          images:[]
        }
    }

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
            //  #507dc0'
          });


          PostApiCall.postRequest(
            {
              verticle : 'Sell With Us',
              type:''
            }
            ,"Get_AdBannerWebsite").then(resultdes =>
          resultdes.json().then(obj => {
            // console.log(obj.data)
       
            if(obj.data.length > 0)
            {
              this.setState({
                bannerfood:[obj.data[0]],
                // images:images
              })   }      
            }))



          GetApiCall.getRequest("GetCountry").then(resultdes =>
            resultdes.json().then(obj => {
  
                  this.setState({
                    CountryData : obj.data ,
                    
                  })
  
              if(obj.data.length != 0 ){
                this.props.setCountry(obj.data[100].label)
                 
                this.setState({
                    CountryId : 101,
                    
                })
              }

              PostApiCall.postRequest({
  
                countryid : obj.data[100].value,

              },"GetState").then((results) => 
              
                // const objs = JSON.parse(result._bodyText)
                results.json().then(objstate => {
          
              
                if(results.status == 200 || results.status==201){


                    if(objstate.data.length != 0 ){
                        this.props.setState(objstate.data[0].label)
                        this.setState({
                            StateId : objstate.data[0].value,
                             StateData : objstate.data,
                           
                        })
                      }


                      PostApiCall.postRequest({
  
                        stateid : objstate.data[0].value,
        
                      },"GetCity").then((resultscity) => 
                      
                        // const objs = JSON.parse(result._bodyText)
                        resultscity.json().then(objcity => {
                  
                      
                        if(resultscity.status == 200 || resultscity.status==201){
        
        
                            if(objcity.data.length != 0 ){
                                this.props.setCity(objcity.data[0].label)
                                // this.props.setpermanentcity(objcity.data[0].label)
                                this.setState({
                                    CityId : objcity.data[0].value,
                                    CityData : objcity.data,
                                                                         })
                              }
        
                        }
                    }))

                }
            }))
             
        
            // Notiflix.Loading.Remove()
        
        }) 
        );
    }

    onChangeCompany(company){
        this.props.setCompanyName(company.target.value)
    }
    onChangeAddress(address){
        //  console.log(address.target.value)
     this.props.setAddress(address.target.value)
       
    }

    onChangeCountry(country){
        // this.props.setvendorcountry(country.target.value)
        this.setState({
            CountryId : country.target.value
          })
         this.props.setCountry(this.state.CountryData[country.target.value - 1].label);
         
         Notiflix.Loading.Dots('Please wait...');

         PostApiCall.postRequest(
           {
             countryid: country.target.value
           },
           "GetState"
         ).then(results =>
 
           results.json().then(obj => {
             if (results.status == 200 || results.status == 201) {
               
                this.props.setState(obj.data[0].label)

                this.setState({
                    StateId : obj.data[0].value
                  })
         
                               PostApiCall.postRequest(
                                 {
                                   stateid: obj.data[0].value
                                 },
                                 "GetCity"
                               ).then(resultscity =>
                               
                                 resultscity.json().then(objcity => {
                                   if (resultscity.status == 200 || resultscity.status == 201) {
                               
                                     this.setState({
                                      CityData : objcity.data,
                                      StateData : obj.data
                                     })
                                        if(objcity.data.length >  0){
                                            this.props.setCity(objcity.data[0].label)
                                     
                                            this.setState({
                                       
                                              CityId : objcity.data[0].value
                                            })
                                        }
                                     Notiflix.Loading.Remove()
                                     
         
                                   }
                                 })
                               );
              
             }
           })
         );
    }
    onChangeState(state){
        this.setState({
            StateId: state.target.value
          })

          Notiflix.Loading.Dots('Please wait...');
      
          for(var i = 0;i<Object.keys(this.state.StateData).length;i++){
        
            if(this.state.StateData[i].value == state.target.value){
          
              this.props.setState(this.state.StateData[i].label);
            }
          }
      
          PostApiCall.postRequest(
            {
              stateid: state.target.value
            },
            "GetCity"
          ).then(results =>
            // const objs = JSON.parse(result._bodyText)
            results.json().then(obj => {
              if (results.status == 200 || results.status == 201) {

                if(obj.data.length > 0){
                this.props.setCity(obj.data[0].label)
            this.setState({
              CityData : obj.data,
                CityId : obj.data[0].value
            })
        }
        Notiflix.Loading.Remove()        
        // this.props.cityData(obj.data)
                
              }
            })
          );

    }
    onChangeCity(city){
        this.setState({
            CityId : city.target.value
          })
      
          for(var i = 0;i<Object.keys(this.state.CityData).length;i++){
        
            if(this.state.CityData[i].value == city.target.value){
          
              this.props.setCity(this.state.CityData[i].label);
            }
          }
    }

 onChangePincode(pincode){
        if((this.state.MobileRegex.test(pincode.target.value)) && (pincode.target.value.length <= 6)){
 
        this.props.setPincode(pincode.target.value)
    }
}

onChangeTitle(title){
    this.props.settitle(title.target.value)
}
onChangeName(name){
    this.props.setname(name.target.value)
}
 onChangeDesignation(designation){
    this.props.setdesignation(designation.target.value)
 }
    onChangeEmail(email){
        this.props.setemail(email.target.value)
    }
    onChangeMobile(mobile){
        if((this.state.MobileRegex.test(mobile.target.value)) && (mobile.target.value.length <= 10)){
  
        this.props.setmobile(mobile.target.value)
    }
}
    onChangeAbout(about){
        this.props.setabout(about.target.value)
    }
    onChangeWorking(working){
        this.props.setworking(working.target.value)
    }
    
    SaveSellWithUS(){
        // console.log('Country:'+this.props.SellCredentials.Country)
        //                                                         console.log('Stete:'+this.props.SellCredentials.State)
        //                                                         console.log('City:'+this.props.SellCredentials.City)

        //  console.log(this.props.SellCredentials)
        if(this.props.SellCredentials.CompanyName!=''){
            if(this.props.SellCredentials.Address!=''){
                if(this.props.SellCredentials.Country!=''){
                    if(this.props.SellCredentials.State!=''){
                        if(this.props.SellCredentials.City!=''){
                            if(this.props.SellCredentials.Pincode!=''){
                                if(this.props.SellCredentials.Pincode.length == 6){
                                    if(this.props.SellCredentials.Title!=''){
                                     if(this.props.SellCredentials.Name!=''){
                                         if(this.props.SellCredentials.Designation!=''){
                                             if(this.props.SellCredentials.Email!=''){
                                                 if(this.state.EmailRegex.test(this.props.SellCredentials.Email)){
                                                   if(this.props.SellCredentials.Mobile!=''){
                                                       if(this.props.SellCredentials.Mobile.length==10){
                                                        if(this.state.ProductService.length > 0){
                                                           if(this.props.SellCredentials.CurrentlyWorking!=''){
                                                             if(this.props.SellCredentials.About!=''){
                                                                
                                                                Notiflix.Loading.Dots('');
                                                                  var producttype= ''

                                                                for(var i =0 ;i<this.state.ProductService.length ;i++){
                                               
                                                                   if(i == 0)
                                                                   {
                                                                       producttype = this.state.ProductService[i].value
                                                                   }else{
                                                                    producttype = producttype  + ', '+this.state.ProductService[i].value
                                                                   }
                                               
                                                                } 

                                                                
                                                              

                                                                PostApiCall.postRequest({
                                                                     companyname :this.props.SellCredentials.CompanyName,
                                                                     address :this.props.SellCredentials.Address,
                                                                     country : this.props.SellCredentials.Country,
                                                                     state : this.props.SellCredentials.State,
                                                                     city : this.props.SellCredentials.City,
                                                                     pincode : this.props.SellCredentials.Pincode,
                                                                     title :this.props.SellCredentials.Title,
                                                                     personname : this.props.SellCredentials.Name,
                                                                     persondesignation : this.props.SellCredentials.Designation,
                                                                     email : this.props.SellCredentials.Email,
                                                                     mobile : this.props.SellCredentials.Mobile,
                                                                     services : producttype,
                                                                     workingwith : this.props.SellCredentials.CurrentlyWorking,
                                                                     aboutbusiness : this.props.SellCredentials.About,
                                                                     updatedby : 0,
                                                                     updatedon : moment().format('lll'),
                                                                     
                                                               
                                                                   },"AddSellWithUs").then((results) => 
                                                                       
                                                                   
                                                                  //    const objs = JSON.parse(result._bodyText)
                                                                     results.json().then(obj => {
                                                               
                                                                   
                                                                     if(results.status == 200 || results.status==201){
                                                                      this.props.setclearsell()
                                                           
                                                                      Notiflix.Loading.Remove()
                                                           
                                                                      Notiflix.Notify.Success('Thank ypu! We will contact you soon.')
                                                                      window.location.href = '/sellwithus'
                                                                      
                                                           
                                                                  }
                                                                  else{
                                                                      Notiflix.Loading.Remove()
                                                                      Notiflix.Notify.Failure('Something went wrong, try again later.')
                                                                    } 
                                                                  }
                                                                     )
                                                                   )
                                                           

                                                             }
                                                             else{
                                                                Notiflix.Notify.Failure('Tell us about your business.') 
                                                              }                                
                                                           }
                                                           else{
                                                            Notiflix.Notify.Failure('Please list the portals you are currently working with.') 
                                                          }
                                                        }
                                                        else{
                                                            Notiflix.Notify.Failure('Please select products/services.') 
                                                          }
                                                       }
                                                       else{
                                                        Notiflix.Notify.Failure('Please enter valid mobile number.') 
                                                      }
                                                   }
                                                   else{
                                                    Notiflix.Notify.Failure('Please enter mobile number.') 
                                                  }
                                                 }
                                                 else{
                                                    Notiflix.Notify.Failure('Please enter valid email address.') 
                                                  }

                                             }
                                             else{
                                                Notiflix.Notify.Failure('Please enter email address.') 
                                              }
                                         }
                               else{
                                Notiflix.Notify.Failure('Please enter contac tperson designation.') 
                              }
                                     }
                                     else{
                                        Notiflix.Notify.Failure('Please enter contact person name.') 
                                      }
                                    }
                                else{
                                Notiflix.Notify.Failure('Please select title.') 
                              }        
                                }
                                else{
                                    Notiflix.Notify.Failure('Please enter valid pincode.') 
                                  }
                            }
                            else{
                                Notiflix.Notify.Failure('Please enter pincode.') 
                              }
                        }
                        else{
                            Notiflix.Notify.Failure('Please selcet city.') 
                          }
                    }
                    else{
                        Notiflix.Notify.Failure('Please select state.') 
                      }

                }
                else{
                    Notiflix.Notify.Failure('Please select country.') 
                  }

            }
            else{
                Notiflix.Notify.Failure('Please enter complete address.') 
              }

        }
        else{
            Notiflix.Notify.Failure('Please enter your company name.') 
          }
    }
    

    render()
    {
        return(
            <div>
                <Menu></Menu>
                <main class="main">
           
            <div class="container">

          
            <div class="ad-banner">

<div class="d-none d-sm-none d-md-block">
{this.state.bannerfood && this.state.bannerfood.map(info=>(

// image.push(info.fld_image)
// console.log(this.state.images,"images")    
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
        
        
                <div class=" doctors-section" style={{marginTop:"0px"}}>
                    <div class="row">
                        <div class="col-md-12" >
                            <div class="write-to-us" style={{height: "100%", padding: "40px 45px 40px",background: "#fff",}}>
                            <h1 class="light-title">Sell With Us</h1>
                            {/* <form action="#"> */}
                                <div class = "row">
                                <div class="form-group required-field col-md-12">
                                    <label for="contact-name">Vendor Company Name</label>
                                    <input type="text" class="form-control" 
                                    value={this.props.SellCredentials.CompanyName}
                                    onChange={this.onChangeCompany.bind(this)}
                                    required=""/>
                                </div>
                                <div class="form-group required-field col-md-12">
                                <label for="contact-message">Address</label>
                                <textarea cols="30" rows="5" class="form-control" type="text"
                                 value={this.props.SellCredentials.Address}
                                 onChange={this.onChangeAddress.bind(this)}
                                ></textarea>
                            </div>

                                <div class="form-group required-field col-md-3">
                                    <label for="contact-email">Country</label>
                                    <select className="form-control"
                                    value={this.state.CountryId}
                                    onChange={this.onChangeCountry.bind(this)}>
                                    {this.state.CountryData.map(
                                        schedule => (
                                            <option
                                            key={schedule.label}
                                            value={schedule.value}
                                            >
                                            {schedule.label}
                                            </option>
                                        )
                                        )}
                                       
                                    </select>
                                   
                                </div>
                                <div class="form-group required-field col-md-3">
                                <label for="contact-email">State</label>
                                <select className="form-control"
                                value={this.state.StateId}
                                onChange={this.onChangeState.bind(this)}>
                                { this.state.StateData.map(
                                    schedule => (
                                        <option
                                        key={schedule.label}
                                        value={schedule.value}
                                        >
                                        {schedule.label}
                                        </option>
                                    )
                                    )}
                                </select>
                               
                               </div>
                               <div class="form-group required-field col-md-3">
                                    <label for="contact-email">City</label>
                                    <select className="form-control"
                                    value={this.state.CityId}
                                    onChange={this.onChangeCity.bind(this)}>
                                    { this.state.CityData.map(
                                        schedule => (
                                            <option
                                            key={schedule.label}
                                            value={schedule.value}
                                            >
                                            {schedule.label}
                                            </option>
                                        )
                                        )} 
                                    </select>
                                   
                                </div>
                                <div class="form-group required-field col-md-3">
                                    <label for="contact-name">Pincode</label>
                                    <input type="text" class="form-control" 
                                    required=""
                                    value={this.props.SellCredentials.Pincode}
                                onChange={this.onChangePincode.bind(this)}/>
                                </div>

                                </div>
                                <div class = "row">
                                <div class="col-md-6">
                                   <div className="row">
                                   <div class="form-group col-md-2 required-field">
                                   <label for="contact-phone">Title</label>
                                   <select className="form-control"
                                   value={this.props.SellCredentials.Title}
                                   onChange={this.onChangeTitle.bind(this)}>
                                   {this.state.TitleData.map(title => (
                           
                                    <option key={title.value} value={title.value}>
                                      {title.label}
                                 </option>
                                 ))}
                                   </select>
                               </div>
                               <div class="form-group col-md-10 required-field">
                               <label for="contact-phone">Contact Person Name</label>
                               <input type="text" class="form-control"
                               value={this.props.SellCredentials.Name}
                                onChange={this.onChangeName.bind(this)}
                               required=""/>
                           </div>
                                   </div>
                                </div>
                                <div class="form-group col-md-6 required-field">
                                    <label for="contact-phone">Contact Person Designation</label>
                                    <input type="text" class="form-control"
                                    value={this.props.SellCredentials.Designation}
                                onChange={this.onChangeDesignation.bind(this)}
                                    required=""/>
                                </div>
                                <div class="form-group col-md-6 required-field">
                                    <label for="contact-phone">Email Address</label>
                                    <input type="email" class="form-control"
                                    value={this.props.SellCredentials.Email}
                                onChange={this.onChangeEmail.bind(this)}
                                     />
                                </div>
                                <div class="form-group col-md-6 required-field">
                                    <label for="contact-phone">Mobile</label>
                                    <input type="text" class="form-control"
                                    value={this.props.SellCredentials.Mobile}
                                    onChange={this.onChangeMobile.bind(this)}
                                    />
                                </div>
                                <div class="form-group col-md-12 required-field">
                                <label for="contact-phone">Product/Services</label>
                                <Select isMulti
                                options={this.state.ProductData}
                                          value={this.state.ProductService}
                                               onChange={(ps)=>{
                                              this.setState({ProductService : ps})
                                           }}
                                         isMulti
                               />
                            </div>

                            <div class="form-group col-md-12 required-field">
                            <label for="contact-phone">Currently Working With, Listed On Which Portals ?</label>
                            <textarea cols="30" rows="5" class="form-control" type="text"
                            value={this.props.SellCredentials.CurrentlyWorking}
                            onChange={this.onChangeWorking.bind(this)}
                            ></textarea>
                          </div>

                          <div class="form-group col-md-12 required-field">
                            <label for="contact-phone">Tell Us More About Your Business</label>
                            <textarea  type="text" cols="30" rows="5" class="form-control" required=""
                            value={this.props.SellCredentials.About}
                            onChange={this.onChangeAbout.bind(this)}
                            ></textarea>
                          </div>


                              
                                </div>
                               

                                <div class="form-footer">
                                    <button type="submit" class="btn btn-primary"
                                   onClick={this.SaveSellWithUS.bind(this)}
                                    >Submit</button>
                                </div>
                            {/* </form> */}
                            </div>
                        </div>

                        <div class="col-md-4">
                            

                           
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                    
                        <div class="doctors-box icon-box-border">
                        <h1 class="light-title" style={{fontSize:"20px"}}>Why <strong>BeatMySugar ?</strong> </h1>
                            <div class="row">
                                <div class="col-md-2">
                                    <div class="icon-box">
                                    <img src="assets/images/icon-1.png" alt="PAN India Reach" style={{width:"100px"}}></img>
                                    <h4>PAN India <br></br>Reach</h4>
                                    <p>Get a bigger and better reach by selling to millions of Pre-Diabetic & Diabetics PAN India.</p>
                                </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="icon-box">
                                    <img src="assets/images/icon-2.png" alt="Sell Anytime of the Day" style={{width:"100px"}}></img>
                                    <h4>Sell Anytime <br></br>of the Day</h4>
                                    <p>Don’t let the time be a constraint for you, sell with us at any time of the day.
</p>
                                </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="icon-box">
                                    <img src="assets/images/icon-3.png" alt="Targeted Customer Reach" style={{width:"100px"}}></img>
                                    <h4>Targeted Customer Reach
</h4>
                                    <p>”Your future prospects resemble your best customers, and this is the place you should start”. Reach out to your potential Customer(s) with our help.
</p>
                                </div>
                                </div>

                                <div class="col-md-2">
                                    <div class="icon-box">
                                    <img src="assets/images/icon-4.png" alt="Hassle Free Delivery" style={{width:"100px"}}></img>
                                    <h4>Hassle Free <br></br>Delivery</h4>
                                    <p>Ensure swift and secured delivery with the help of our logistics partner(s).

</p>
                                </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="icon-box">
                                    <img src="assets/images/icon-5.png" alt="Complete Transparency" style={{width:"100px"}}></img>
                                    <h4>Complete <br></br>Transparency
</h4>
                                    <p>Make your sales with complete clarity & transparency.


</p>
                                </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="icon-box">
                                    <img src="assets/images/icon-6.png" alt="Easy Account Settlement" style={{width:"100px"}}></img>
                                    <h4>Easy Account Settlement</h4>
                                    <p>Simplified, secured and timely payments directly in your bank account.


</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                    
                        <div class="doctors-box icon-box-border">
                        <h1 class="light-title" style={{fontSize:"20px"}}> <strong>Process</strong> </h1>
                            <div class="row">
                                <div class="col-md-1"></div>
                                <div class="col-md-2">
                                    <div class="icon-box">
                                    <img src="assets/images/process-icon-1.png" alt="Register With Us" style={{width:"100px"}}></img>
                                    <h4>Register <br></br>With Us </h4>
                                    <p>Sign up with us and make your your Products / Services visible to millions of Pre-Diabetic & Diabetics.
</p>
                                </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="icon-box">
                                    <img src="assets/images/process-icon-2.png" alt="List your Products / Services on your Portal" style={{width:"100px"}}></img>
                                    <h4>List your Products / Services on your Portal</h4>
                                    <p>BeatMySugar team will assist your onboarding & Product / Services listing(s).
</p>
                                </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="icon-box">
                                    <img src="assets/images/process-icon-3.png" style={{width:"100px"}} alt="Receive Orders"></img>
                                    <h4>Receive <br></br>Order(s)</h4>
                                    <p>Order request(s) will reach you in a seamless manner. You need to keep the Ordered item(s) packed and ready for dispatch.
</p>
                                </div>
                                </div>

                                <div class="col-md-2">
                                    <div class="icon-box">
                                    <img src="assets/images/process-icon-4.png" style={{width:"100px"}} alt="Deliver Orders"></img>
                                    <h4>Deliver <br></br>Order</h4>
                                    <p>Our logistics partner(s) will pick it up from you and deliver it to the Customer, ensuring seamless and hassle free timely delivery.


</p>
                                </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="icon-box">
                                    <img src="assets/images/process-icon-5.png" alt="Receive Payments" style={{width:"100px"}}></img>
                                    <h4>Receive <br></br>Payment(s)</h4>
                                    <p>We ensure simplified, secured and timely payments directly in your bank account.



</p>
                                </div>
                                </div>
                               {/* <div class="col-md-12">
                                   <p style={{marginTop:"20px"}}>Connect with us today: wecare@beatmysugar.com, +91-90244-22444
</p>
                               </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      
        </main>
                <Footer></Footer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      SellCredentials: state.SellReducers
    };
  }
  
  export default connect(
    mapStateToProps,
    {
        settitle,
        setCompanyName,
        setAddress,setCountry,setState,setCity,setPincode,
        setname,
        setdesignation,
        setemail,setmobile,setworking,setabout,setclearsell
      
    }
  )(Sellwithus);
  
