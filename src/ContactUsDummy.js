import React from 'react';
import Menu from './Header';
import Footer from './Footer';
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import moment from 'moment'

class Contact extends React.Component
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
  


            Name : '',
            CompanyName : '',
            Mobile : '',
            Email : '',
            Message : ''
        }
    }

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
            //  #507dc0'
          });
    }


    Submit(){
        if(this.state.Name != ''){
            if(this.state.CompanyName != ''){
               
                    if(this.state.Email != ''){
                        if(this.state.EmailRegex.test(this.state.Email)){


                            if(this.state.Mobile != '' && this.state.Mobile.length != 10){
                                Notiflix.Notify.Failure('Please enter a valid Mobile Number.'); 
                            }else
                            {
                        if(this.state.Message != ''){


                            Notiflix.Loading.Dots('Please wait...');

                            PostApiCall.postRequest({

                                name : this.state.Name,
                                email : this.state.Email.trim(),
                                mobile : this.state.Mobile,
                                company : this.state.CompanyName,
                                message : this.state.Message
                              
                             
                             },"ContactUsMailer").then((results2) => 
                             
                               // const objs = JSON.parse(result._bodyText)
                               results2.json().then(obj2 => {
             
                             
                               if(results2.status == 200 || results2.status == 201){

                                Notiflix.Loading.Remove()
                                Notiflix.Notify.Success('We'+"'"+'ve received your message. We'+"'"+ 'll get back soon.');
                                window.location.reload()

                               }

                            }))



                            


                        }
                        else
                    {
                        Notiflix.Notify.Failure('Please enter a Message.'); 
                    }
                }
            }
                        else
                    {
                        Notiflix.Notify.Failure('Please enter a valid Email Address.'); 
                    }
                }
                    else
                    {
                        Notiflix.Notify.Failure('Please enter your Email Address.'); 
                    }
                    
                }
                
            else
            {
                Notiflix.Notify.Failure('Please enter your Company Name.'); 
            }
        }else
        {
            Notiflix.Notify.Failure('Please enter your Name'); 
        }
    }

    render()
    {
        return(
            <div>
           
                <main class="main">
           
            <div class="container">

                <div class="contact-box">
                    <div class="row">
                        <div class="col-md-12">
                        <h2 style={{marginBottom: "5px"}}>Want to connect with BeatMySugar.</h2>
                        <p style={{fontSize: "12px"}}>Get in touch with us and our team would be glad to assist you.</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="address-box">
                            <div class="contact-info">
                                <img src="/assets/images/bms-logo.png"></img>
                                <div >
                                    <p>Rx Health Management India Pvt Ltd</p>
                                    <p>12th Floor, Puri 81 Business Hub,</p>
                                    <p>Sec-81, Faridabad,</p>
                                    <p>Haryana – 121 001. INDIA.</p>
                                </div>

                                <div >
                                    <table>
                                        <tr>
                                            <td>
                                            <i class="icon-mobile"></i>
                                            </td>
                                            <td>
                                            <p><b>Customer Support</b></p>
                                    <p>For any queries/suggestions, connect with our customer care</p>
                                   <p>Call Us at +91 90244 22444</p>
                                   <p>Email us at wecare@beatmysugar.com </p>
                                            </td>
                                        </tr>
                                    </table>
                                
                                    <table>
                                        <tr>
                                            <td>
                                            <i class="icon-mail"></i>
                                            </td>
                                            <td>
                                            <p><b>Looking to work with us</b></p>
                                   
                                   <p>Send us your resume to hr@beatmysugar.com</p>
                                   
                                            </td>
                                        </tr>
                                    </table>

                                    <table>
                                        <tr>
                                            <td>
                                            <i class="icon-cart"></i>
                                            </td>
                                            <td>
                                            <p><b>Wish to list your products with us</b></p>
                                            <p>Send us an enquiry with your company and product details to
                                    vendor@beatmysugar.com</p>
                                   
                                            </td>
                                        </tr>
                                    </table>
                                  
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-md-8">

                        <iframe class='iframe-contactus' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28079.170145951513!2d77.32772678800701!3d28.392200880829673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd480055cd3d%3A0x3ff458fc75f3db42!2sPuri%2081%20Business%20Hub!5e0!3m2!1sen!2sin!4v1576822810434!5m2!1sen!2sin" width="600" height="450" frameborder="0"  allowfullscreen=""></iframe>
                        </div>
                    </div>
                </div>
            
            </div>

        </main>
             
            </div>
        )
    }
}

export default Contact;