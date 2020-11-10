import React from 'react';
import Menu from './Header'
import Footer from './Footer'
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import GetApiCall from './GetApi'
import moment from 'moment'

class Prescription extends React.Component
{

    constructor(props){
        super(props)
        this.state= {
            Name: "",
            DobDay: "",
            DobMonth : '',
            DobYear : '',
            Gender: "Male",
            IsYou : "No",
            DayData: [],
            MonthData: [],
            YearData: []
        }
    }

    onChangeYou(you){

        // console.log(gender.target.value)
      this.setState({
         IsYou: you.target.value 
      })

    }

    onChangeGender(gender){

        // console.log(gender.target.value)
      this.setState({
          Gender: gender.target.value 
      })

    }

    onChangeDobDay(day){

        this.setStae({
            DobDay : day.target.value
        })
    }

    onChangeDobMonth(month){

        this.setStae({
            DobMonth: month.target.value
        })
    }

    onChangeDobYear(year){

        this.setStae({
            DobYear : year.target.value
        })
    }


    componentDidMount(){


        var day = []
        var monthdata = ['January','February','March','April','May','June','July','August','September','October','November','December']
        var month = []
        var year = []

        for(var i = 1 ;i <= 31 ;i ++){
            day.push({label : i,value : i})
        }


        const date2 = new Date();
        // console.log(Math.abs(date2.getUTCFullYear() - 1970)) 
for(var i = 0 ; i < Math.abs(date2.getUTCFullYear() - 1960)  ;i++){
    year.push({label : (date2.getUTCFullYear() - 2)-i,value : (date2.getUTCFullYear() - 2)-i})
}


        for(var i = 0 ;i < 12 ;i ++){
       month.push({label : monthdata[i],value : monthdata[i]})
        }


        this.setState({
            MonthData: month,
            DayData : day,
            YearData : year,

            DobDay : day[0].label,
            DobMonth : month[0].label,
            DobYear : year[0].label
        })


    }
  

    Save(){
        if(this.state.IsYou == 'No'){

            if(this.state.Name != ''){

                const pres = {
                    IsYou : this.state.IsYou,
                    Name : this.state.Name,
                    Dob : this.state.DobDay+'-'+this.state.DobMonth+'-'+this.state.DobYear,
                    Gender : this.state.Gender
                }

                localStorage.setItem('PrescriptionData',JSON.stringify(pres))


                window.location.href = '/uploadprescription'



            }else{
                Notiflix.Notify.Failure('Please Enter Patient'+"'"+'s Name.')
            }

        }else{

            const pres = {
                IsYou : this.state.IsYou,
                Name : '',
                Dob : '',
                Gender : ''
            }

            localStorage.setItem('PrescriptionData',JSON.stringify(pres))


            window.location.href = '/uploadprescription'

        }
    }


    render()
    {
        return(
            <div>   
                <Menu></Menu>
                    <main>
                        <div class="container">
                    <div class="container-box doctors-section">
                    <ul class="checkout-progress-bar mt-2">
                        <li class="active">
                            <span>Personal Information</span>
                        </li>
                        <li>
                            <span>Upload Prescription</span>
                        </li>
                        
                    </ul>
                    <div class="row">
                        <div class="col-lg-12">
                            <ul class="checkout-steps">
                                <li>
                                    <h2 class="step-title">Personal Information</h2>

                                    {/* <form action="#">
                                        <div class="form-group required-field">
                                            <label>Upload File </label>
                                            <div class="form-control-tooltip">
                                                <input type="file" class="" required=""/>
                                                <span class="input-tooltip" data-toggle="tooltip" title="" data-placement="right" data-original-title="We'll send your order confirmation here."><i class="icon-question-circle"></i></span>
                                            </div>
                                        </div>

                                       
                                    </form> */}


<div class="col-md-6" style={{paddingTop : '2%', paddingBottom : '2%'}}>
                                {/* <form class="white-bg"> */}
                                <div class="row">
                                        <div class="col-md-12">
                                            <label>Is this prescription yours?</label>

                                        </div>
                                        <div class="col-md-6">
                                                <div class="radio-btn">
                                                        <span>Yes</span><input type="radio"  value="Yes" class=""
                                                        checked={this.state.IsYou == 'Yes' ? true : false}
                                                        onChange={this.onChangeYou.bind(this)}
                                                        /> 
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                                <div class="radio-btn">
                                                        <span>No</span><input type="radio"  value="No" class=""
                                                          checked={this.state.IsYou == 'No' ? true : false}
                                                        onChange={this.onChangeYou.bind(this)}/> 
                                            </div>
                                        </div>
                                        {/* <div class="col-md-4">
                                                <div class="radio-btn">
                                                        <span>Others</span><input type="radio" value="Others" class=""
                                                          checked={this.state.Gender == 'Others' ? true : false}
                                                              onChange={this.onChangeGender.bind(this)} /> 
                                            </div>
                                        </div> */}
                                    </div>
                                        <div style={{display:this.state.IsYou == 'Yes' ? 'none' : ''}}>
                                    <div class="form-group required-field" style={{paddingTop : '2%'}}>
                                        <label for="acc-email">Full Name</label>
                                        <input 
                                        
                                        class="form-control"  required=""/>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <label>Date of Birth</label>
                                        </div>
                                        <div class="col-md-4">
                                               
                                                <select  class="form-control"
                                                value={this.state.DobDay}
                                                onChange={this.onChangeDobDay.bind(this)}
                                                >
                                                {this.state.DayData.map(
                              spec => (
                                <option key={spec.value} value={spec.label}>
                                  {spec.label}
                                </option>
                              )
                            )}
                                                      </select>
                                        </div>
                                        <div class="col-md-4">
                                               
                                                <select  class="form-control"
                                                   value={this.state.DobMonth}
                                                   onChange={this.onChangeDobMonth.bind(this)}
                                                >
                                                {this.state.MonthData.map(
                              spec => (
                                <option key={spec.value} value={spec.label}>
                                  {spec.label}
                                </option>
                              )
                            )}
                                                      </select>
                                        </div>
                                        <div class="col-md-4">
                                               
                                                <select  class="form-control"
                                                   value={this.state.DobYear}
                                                   onChange={this.onChangeDobYear.bind(this)}
                                                >
                                                {this.state.YearData.map(
                              spec => (
                                <option key={spec.value} value={spec.label}>
                                  {spec.label}
                                </option>
                              )
                            )}
                                                      </select>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <label>Gender</label>

                                        </div>
                                        <div class="col-md-4">
                                                <div class="radio-btn">
                                                        <span>Male</span><input type="radio"  value="Male" class=""
                                                        checked={this.state.Gender == 'Male' ? true : false}
                                                        onChange={this.onChangeGender.bind(this)}
                                                        /> 
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                                <div class="radio-btn">
                                                        <span>Female</span><input type="radio"  value="Female" class=""
                                                          checked={this.state.Gender == 'Female' ? true : false}
                                                        onChange={this.onChangeGender.bind(this)}/> 
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                                <div class="radio-btn">
                                                        <span>Others</span><input type="radio" value="Others" class=""
                                                          checked={this.state.Gender == 'Others' ? true : false}
                                                              onChange={this.onChangeGender.bind(this)} /> 
                                            </div>
                                        </div>
                                    </div>

                                    </div>

                                
                                {/* </form> */}
                                </div>
                               

                                    
                                </li>

                               
                            </ul>
                        </div>

                       
                    </div>

                    <div class="">
                        <div class="col-lg-8">
                            <div class="checkout-steps-action">
                                <button onClick={this.Save.bind(this)} class="btn btn-primary float-left">NEXT</button>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4"></div>
                </div>
                </div>
                    </main>
                <Footer></Footer>
            </div>
        )
    }
}

export default Prescription