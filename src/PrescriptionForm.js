import React from 'react'
import Menu from './Header'
import Footer from './Footer'
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import GetApiCall from './GetApi'
import moment from 'moment'

class PrescriptionForm extends React.Component
{

    constructor(props){
        super(props)
        this.state={
            image : [],
            count : 0
        }
    }


   async Save(){


        var log = localStorage.getItem('CustomerLogin')
        var login = JSON.parse(log)

        // console.log(login)

      var pdata =   localStorage.getItem('PrescriptionData')
      var presc = JSON.parse(pdata)

    //   console.log(presc.IsYou)

    var i =0 ; 

        if(this.state.image.length > 0){

            for ( i =0 ; i < Object.keys(this.state.image).length;i++){


                this.setState({
                    count : this.state.count + 1
                })
                // console.log(this.state.image[i].split(',')[0].split('/')[1].split(';')[0])

                if(this.state.image[i].split(',')[0].split('/')[1].split(';')[0] == 'jpeg' || this.state.image[i].split(',')[0].split('/')[1].split(';')[0] == 'jpg' || this.state.image[i].split(',')[0].split('/')[1].split(';')[0] == 'png')
    {

     

     await   PostApiCall.postRequest({
    
            customerid : login.fld_userid,
            // customer_id : 13,
             is_yours : presc.IsYou,
             name : presc.Name,
             dob : presc.Dob,
             gender : presc.Gender,
             imageurl : 'http://backoffice.beatmysugar.com/Images/CustomerPrescription/'+login.fld_name+login.fld_userid+"-"+i+'.png',
           updated_on : moment().format('lll').toString(),
           updated_by : login.fld_userid
        // updated_by :13
        
        },"AddCustomerPrescription")


        await  PostApiCall.postRequest({

                    
            photo : this.state.image[i],
            file_name : login.fld_name+login.fld_userid+"-"+i,
            image_url : '/var/www/backoffice.beatmysugar.com/Images/CustomerPrescription/'
            
         
         },"AddImage").then((results) => 
                
         // const objs = JSON.parse(result._bodyText)
         results.json().then(obj => {

       
         if(results.status == 200 || results.status==201){

            if(i == this.state.image.length-1){
                window.location.href = '/'
            }
         }
        }))

    


        }else if(this.state.image[i].split(',')[0].split('/')[1].split(';')[0] == 'pdf'){


            await   PostApiCall.postRequest({
    
                customerid : login.fld_userid,
                // customer_id : 13,
                 is_yours : presc.IsYou,
                 name : presc.Name,
                 dob : presc.Dob,
                 gender : presc.Gender,
                 imageurl : 'http://backoffice.beatmysugar.com/Images/CustomerPrescription/'+login.fld_name+login.fld_userid+"-"+i+'.pdf',
               updated_on : moment().format('lll').toString(),
               updated_by : login.fld_userid
            // updated_by :13
            
            },"AddCustomerPrescription")

            await    PostApiCall.postRequest({

                photo : this.state.image[i],
                file_name : login.fld_name+login.fld_userid+"-"+i,
                image_url : '/var/www/backoffice.beatmysugar.com/Images/CustomerPrescription/'
                
             
             },"AddPdf").then((results) => 
                
             // const objs = JSON.parse(result._bodyText)
             results.json().then(obj => {

           
             if(results.status == 200 || results.status==201){

                if(i == this.state.image.length-1){
                    window.location.href = '/'
                }
             }
            }))
    
                
    
    
            
        

        }

        

    
        // if(i == (Object.keys(this.state.image).length -1)){
    
        //             window.location.href = '/'
    
        // 

        // console.log(this.state.count == this.state.image.length-1)

        
        
            }
            

    }

  
    // console.log(i)

            

        else{
            Notiflix.Notify.Failure('Please Upload Prescription.')
        }
       
    }


    render()
    {
        return(
            <div>
                <Menu></Menu>
                <main>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-8">
                                <div class="container-box doctors-section prescription-box">
                    <ul class="checkout-progress-bar mt-2">
                        <li >
                            <span>Personal Information</span>
                        </li>
                        <li class="active">
                            <span>Upload Prescription</span>
                        </li>
                        {/* <li>
                            <span>Address</span>
                        </li> */}
                    </ul>
                    <div class="row">
                        <div class="col-lg-12">
                            <ul class="checkout-steps" >
                                <li>
                                <div class="form-group required-field">
                                            <label>Upload File </label>
                                            <div class="form-control-tooltip">
                                                <input type="file" class="" required="" onChange={(event)=>{
                                                      if(event.target.files[0].size < 5000000){

                                                        if (event.target.files && event.target.files[0]) {
                                                          let reader = new FileReader();
                                                          reader.onload = (e) => {
                                                            // console.log(e.target.result)
                                                            // this.setState({image: e.target.result});
                                                            
                                                            

                                                            this.setState(prevState => ({
                                                                image: [...prevState.image,  e.target.result]
                                                              }))

                                                            
                                                            
                                                          }
                                                          reader.readAsDataURL(event.target.files[0]);
                                                        }
                                                        }
                                                        else
                                                        {
                                                          Notiflix.Notify.Failure('File too large, upload file less than 5 MB.');
                                                      
                                                        }
                                                }} />
                                                <span class="input-tooltip" data-toggle="tooltip" title="" data-placement="right" data-original-title="We'll send your order confirmation here."><i class="icon-question-circle"></i></span>
                                            </div>

                                            </div>

                                            <div class="row" >
                                            {this.state.image.map((image,index)=>(

                                                <div class="col-md-3">
                                                     {image.split(',')[0].split('/')[1].split(';')[0] == 'pdf' ? 
                                                      
                                                      <span><img  src={'https://static.123apps.com/pdf/i/fav/256.png'}
                                                      style={{    height: '200px',    width: '150px',    margin: '20px'}}
                                                      >
                                                          

                                                      </img>
                                                      <i class="fa fa-times-circle" 
                                                      style={{position: 'absolute',
                                                        marginLeft: '158px',
                                                        marginTop: '-228px',
                                                        fontSize: '20px'}}
                                                        onClick={()=>{
                                                            var arr = [...this.state.image]
 
                                                            arr.splice(index, 1)
                                                            this.setState({
                                                                image : arr
                                                            })
                                                        }}
                                                      ></i>
                                                      </span>
                                                     :
                                                     <span>
                                                     <img  src={image}
                                                     style={{    height: '200px',    width: '150px',    margin: '20px'}}
                                                     ></img>
                                                     <i class="fa fa-times-circle" 
                                                     style={{position: 'absolute',
                                                       marginLeft: '158px',
                                                       marginTop: '-228px',
                                                       fontSize: '20px'}}
                                                       onClick={()=>{
                                                           var arr = [...this.state.image]

                                                           arr.splice(index, 1)
                                                           this.setState({
                                                               image : arr
                                                           })
                                                       }}
                                                     ></i>
                                                     </span>
                                                    }                                           
                                               
                                                </div>
                                            ))}
                                            </div>
                                           
                                    
                                </li>

                               
                            </ul>
                        </div>

                       <div  class="col-md-8 preview-img">
                           
                       </div>

                      
                    </div>

                    <div class="row">
                        <div class="col-lg-8">
                            <div class="checkout-steps-action">
                                <button onClick={this.Save.bind(this)} class="btn btn-primary float-left">Save</button>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4"></div>
                </div>
                                </div>
                                <div class="col-md-4">
                                <div class="container-box doctors-section prescription-box" style={{padding:"20px 30px"}}>
                                        <h3 class="title">Valid Prescription Guide</h3>

                                        <ul>
                                            <li>Dont crop out any part of the image</li>
                                            <li>Avoid Blurred image</li>
                                            <li>Include details of doctor and patient + clinic visit date</li>
                                            <li>Medicines will be dispensed as per prescription</li>
                                            <li>Supported file types : jpeg, jpg, png, pdf</li>
                                            <li>Maximum allowed file size : 5mb</li>
                                        </ul>
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

export default PrescriptionForm