import React from 'react';
import logo from './logo.svg';

import Header from './Header'
import News from './News';
import Footer from "./Footer";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import GetApiCall from './GetApi'
import moment from 'moment'


class Editaddress extends React.Component {



    constructor(props){
        super(props)
        this.state={
            Name : '',
            Mobile : '',
            Address :'',
            Street : '',
            Landmark : '',
            City : '',
            State : '',
            Country : '',
            Pincode : '',

            CityId : '',
            StateId : '',
            CountryId : '',

            CountryData : [],
            StateData : [],
            CityData : [],



            NumRegex: /^0|[0-9]\d*$/,
            MobileRegex: /^[0-9]*$/,
            AlphaNumericRegex: /^[a-zA-Z0-9]*$/,
            SpecialRegex: /[-!$%^&*()_+|~=`'"{}\[\]:\/;<>?,.@#]/,
            EmailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            UrlRegex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      

        }
    }

    componentDidMount(){

      Notiflix.Loading.Dots('');

        GetApiCall.getRequest("GetCountry").then(resultdes =>
            resultdes.json().then(objcountry => {
           
              this.setState({
                  CountryData : objcountry.data
              })
      
              
              this.setState({ CountryId: 101 ,
            Country : objcountry.data[100].label
            });

      
              PostApiCall.postRequest(
                {
                  countryid: 101
                },
                "GetState"
              ).then(results =>
         
                results.json().then(obj => {
                  if (results.status == 200 || results.status == 201) {
                   
                    this.setState({
                        StateData : obj.data
                    })
                  
                    this.setState({ StateId: obj.data[0].value,
                    State : obj.data[0].label
                    });
      
                    PostApiCall.postRequest(
                      {
                        stateid: obj.data[0].value
                      },
                      "GetCity"
                    ).then(results =>
                      // const objs = JSON.parse(result._bodyText)
                      results.json().then(objcity => {
                        if (results.status == 200 || results.status == 201) {
                     
      
                         
                          this.setState({ CityId: objcity.data[0].value,
                        CityData : objcity.data,
                            City : objcity.data[0].label
                        });
                          Notiflix.Loading.Remove();
                       
                        }
                      })
                    );
      
                  }
                })
              );
        
            })
          );

    }

    onChangeCountry(country) {
        this.setState({
          CountryId: country.target.value
        });
        // console.log(this.props.masterDetails.CountryData[country.target.value - 1]);
        // this.props.countryDiag(
        //   this.state.CountryData[country.target.value - 1].label
        // );
        this.setState({
            Country : this.state.CountryData[country.target.value - 1].label
        })
    
        Notiflix.Loading.Dots('Please wait...');

        PostApiCall.postRequest(
          {
            countryid: country.target.value
          },
          "GetState"
        ).then(results =>
          // const objs = JSON.parse(result._bodyText)
          results.json().then(obj => {
            if (results.status == 200 || results.status == 201) {
            //   this.props.stateDataDiag(obj.data);
              this.setState({
                  StateData : obj.data
              })
    
              PostApiCall.postRequest(
                {
                  stateid: obj.data[0].value
                },
                "GetCity"
              ).then(results =>
                // const objs = JSON.parse(result._bodyText)
                results.json().then(objcity => {
                  if (results.status == 200 || results.status == 201) {
                    // this.props.cityDataDiag(objcity.data);
                    // this.props.stateDiag(obj.data[0].label);
                    this.setState({ City: objcity.data[0].value ,
                    State : obj.data[0].label,
                    CityData : objcity.data
                    });
                    Notiflix.Loading.Remove()
                  }
                })
              );
            }
          })
        );
      }
    
      onChangeState(state) {
        this.setState({
          StateId: state.target.value
        });
    
        for (
          var i = 0;
          i < Object.keys(this.state.StateData).length;
          i++
        ) {
          if (
            this.state.StateData[i].value == state.target.value
          ) {
            // this.props.stateDiag(this.props.diagnosticReducer.StateData[i].label);
            this.setState({
                State : this.state.StateData[i].label
            })
          }
        }

        Notiflix.Loading.Dots('Please wait...');
    
        PostApiCall.postRequest(
          {
            stateid: state.target.value
          },
          "GetCity"
        ).then(results =>
          // const objs = JSON.parse(result._bodyText)
          results.json().then(obj => {
            if (results.status == 200 || results.status == 201) {
            //   this.props.cityDataDiag(obj.data);
            this.setState({
                CityData : obj.data,
                City : obj.data[0].label,
                // CityId : obj.data[0].value
            })
      

            Notiflix.Loading.Remove()  
            }
          })
        );
      }
      onChangeCity(city) {
        // this.props.setstaffpermanentcity(city.target.value);
        this.setState({
          CityId: city.target.value
        });
    
        for (
          var i = 0;
          i < Object.keys(this.state.CityData).length;
          i++
        ) {
          if (this.state.CityData[i].value == city.target.value) {
            // this.props.cityDiag(this.state.CityData[i].label);
            this.setState({
                City : this.state.CityData[i].label
            })
          }
        }
      }



      onSave(){

       

        if(this.state.Name != ''){

            if(this.state.Mobile != ''){

                if(this.state.Mobile.length == 10){

                if(this.state.Address != ''){

                    if(this.state.Street != ''){

                        if(this.state.Country != ''){

                            if(this.state.State != ''){

                                if(this.state.City != ''){

                                    if(this.state.Pincode != ''){

                                        // console.log(this.state)
                                        Notiflix.Loading.Dots('Please wait...');
                                        var log = localStorage.getItem('CustomerLoginDetails')
                                        var login = JSON.parse(log)

                                        PostApiCall.postRequest(
                                            {
                                                 user_id : login.fld_userid,
                                                 name : this.state.Name,
                                                 mobile : this.state.Mobile,
                                                 address : this.state.Address,
                                                 street : this.state.Street,
                                                 landmark : this.state.Landmark,
                                                 country : this.state.Country,
                                                 state : this.state.State,
                                                 city : this.state.City,
                                                 pincode : this.state.Pincode,
                                                 updated_by : login.fld_userid,
                                                 updated_on : moment().format('lll').toString(),
                                            },
                                            "AddUserAddressMapping"
                                          ).then(results =>
                                            // const objs = JSON.parse(result._bodyText)
                                            results.json().then(obj => {
                                              if (results.status == 200 || results.status == 201) {

                                                // this.props.history.goBack();
                                                window.location.href = '/addressbook'
                                             
                                              }
                                            })
                                          );




                                    }else{
                                        Notiflix.Notify.Failure('Please Enter Pincode.')
                                    }

                                }else{
                                    Notiflix.Notify.Failure('Please select City.')
                                }
                            }else{
                                Notiflix.Notify.Failure('Please select State.')
                            }
                        }else{
                            Notiflix.Notify.Failure('Please select Country.')
                        }
                    }else{
                        Notiflix.Notify.Failure('Please Enter Area, Colony, Street, Sector, Village.')
                    }
                }else{
                    Notiflix.Notify.Failure('Please Enter Flat, House No., Building, Company, Apartment.')
                }
            }else{
                Notiflix.Notify.Failure('Please Enter a valid Mobile Number.')
            }
            }else{
                Notiflix.Notify.Failure('Please Enter your Mobile Number.')
            }

        }else{
            Notiflix.Notify.Failure('Please Enter your Full Name.')
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
                            <div class="dashboard-content">
                            <h2>Add New Address
</h2>
                            {/* <div class="row">
                                <div class="col-md-6">
                                <div class="card">
                                        <div class="card-header">
                                            Contact Information
                                            <a href="#" class="card-edit">Edit your Account Details</a>
                                        </div>

                                        <div class="card-body">
                                            <p>
                                            <i class="fas fa-user" style={{fontSize:"12px",marginRight:"7px"}}></i> Saravan Kumar</p>
                                            <p><i class="fas fa-envelope" style={{fontSize:"12px",marginRight:"7px"}}></i> saravan@globaltrendz.com</p>
                                            <p><i class="fas fa-phone-volume" style={{fontSize:"12px",marginRight:"7px"}}></i> 9500027017
                                                
                                            </p>
                                            <a href="#">Change Password</a>
                                        </div>
                                    </div>
                            
                                </div>
                            </div> */}
                           
                             <form onSubmit={(e)=>{
                                 e.preventDefault()
                             }}>
                                <div class="row">
                                    <div class="col-sm-11">
                                        <div class="row">
                                           
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                <div class="col-md-12 " >
                                {/* <form class="white-bg"> */}
                                    <div class="row">
                                        <div class="col-sm-12">
                                            
                                            <div class="row">
                                                <div class="col-md-12">
                                                <div class="form-group required-field">
                                                        <label for="acc-name">Full Name</label>
                                                        <input type="text" class="form-control" 
                                                        value={this.state.Name}
                                                        onChange={(text)=>{
                                                            this.setState({
                                                                Name : text.target.value
                                                            })
                                                        }}
                                                        required=""/>
                                                    </div>
                                                    <div class="form-group required-field">
                                                        <label for="acc-name">Mobile Number</label>
                                                        <input type="text"
                                                         value={this.state.Mobile}
                                                         onChange={(text)=>{
                                                            if((this.state.MobileRegex.test(text.target.value)) && (text.target.value.length <= 10)){

                                                             this.setState({
                                                                 Mobile: text.target.value
                                                             })
                                                            }
                                                         }}
                                                        class="form-control"  required=""/>
                                                    </div>
                                                    <div class="form-group required-field">
                                                        <label for="acc-name">Flat, House No., Building, Company, Apartment</label>
                                                        <input type="text" class="form-control" 
                                                         value={this.state.Address}
                                                         onChange={(text)=>{
                                                             this.setState({
                                                                 Address : text.target.value
                                                             })
                                                         }}
                                                        required=""/>
                                                    </div>
                                                </div>

                                            

                                            
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group required-field">
                                        <label for="acc-email">Area, Colony, Street, Sector, Village</label>
                                        <input 
                                        // type="email" 
                                         value={this.state.Street}
                                         onChange={(text)=>{
                                             this.setState({
                                                 Street : text.target.value
                                             })
                                         }}
                                        class="form-control"  required=""/>
                                    </div>

                                    <div class="form-group">
                                        <label for="acc-email">Landmark</label>
                                        <input 
                                         value={this.state.Landmark}
                                         onChange={(text)=>{
                                             this.setState({
                                                 Landmark : text.target.value
                                             })
                                         }}
                                        class="form-control" required=""/>
                                    </div>
                                

                                    <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-email">Country</label>
                                        <select class="form-control"
                                        disabled
                                          value={this.state.CountryId}
                                          onChange={this.onChangeCountry.bind(this)}
                                        >
                                          
                                            {this.state.CountryData.map(user => (
                              <option key={user.value} value={user.value}>
                                {user.label}
                              </option>
                            ))}
                                        </select>
                                    </div>
                                            </div>
                                        <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-password">State</label>
                                        
                                        <select class="form-control"
                                          value={this.state.StateId}
                                          onChange={this.onChangeState.bind(this)}
                                        >
                                          
                                            {this.state.StateData.map(user => (
                              <option key={user.value} value={user.value}>
                                {user.label}
                              </option>
                            ))}
                                        </select>
                                    </div>
                                        </div>
                                        <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-email">City</label>
                                     
                                        <select class="form-control"
                                          value={this.state.CityId}
                                          onChange={this.onChangeCity.bind(this)}
                                        >
                                          
                                            {this.state.CityData.map(user => (
                              <option key={user.value} value={user.value}>
                                {user.label}
                              </option>
                            ))}
                                        </select>
                                    </div>
                                            </div>

                                            <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-password">Pincode</label>
                                        <input 
                                         value={this.state.Pincode}
                                         onChange={(text)=>{
                                            if((this.state.MobileRegex.test(text.target.value)) && (text.target.value.length <= 6)){

                                             this.setState({
                                                 Pincode : text.target.value
                                             })
                                            }
                                         }}
                                        class="form-control"  required=""/>
                                    </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                      
                                       
                                    </div>

                                

                                 
                                {/* </form> */}
                                </div>
                               
                                </div>

                               
                                

                                <div class="mb-2"></div>

                               

                              

                                <div class="required text-right">* Required Field</div>
                                <div class="form-footer">
                                    {/* <a href="#"><i class=""></i>Edit</a> */}

                                    <div class="form-footer-right">
                                        <button 
                                          onClick={this.onSave.bind(this)}
                                        type="submit" class="btn btn-primary">Save Address</button>
                                    </div>
                                </div>
                            </form>
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

export default Editaddress;
