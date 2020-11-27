/* eslint-disable no-loop-func */
import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import GetApiCall from "./GetApi";
import moment from "moment";

class PaymentSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShippingAddress: [],
      BillingAddress: [],
      CartData: [],
      SummaryData: [],
      OfferData: [],

      NumRegex: /^0|[0-9]\d*$/,
      MobileRegex: /^[0-9]*$/,
      AlphaNumericRegex: /^[a-zA-Z0-9]*$/,
      SpecialRegex: /[-!$%^&*()_+|~=`"{}\[\]:\/;<>?,.@#]/,
      EmailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      UrlRegex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,


      TxnId : '',
      MerKey : 'a6JOJL',
      MerSalt : 'cri53U9i',
      CustomerLoginData : [],
      CustomerHash : ''
   
   
    };
  }

  
  render() {
    return (
      <div>
        <Menu></Menu>
        <div class="container">
                        
                        <div class="row marginbtm-240">
    
                       
    
                                  <div class="col-md-12">
                                    
                                  <div class="privacy-box" style={{background:' #fff',
                                  padding: '15px',fontWeight: '700',
                                 
                                  color:'#6b6b6b',
                                 
                                  letterSpacing:'.01rem',
                                  font: '500 16px/1.35 Rajdhani,Helvetica Neue,Verdana,Arial,sans-serif',
                                  textAlign:'justify',
                                  marginTop:'30px'
                              }}>
                                <div class="payment-box">
                                                 
                                                       <img src="/assets/images/404-Page-Not-Found.png" class="payment-failed"></img>
                                                   <div class="center-block">
                                                  
                                                   </div>
                                                    </div>
                                                    </div>
                                  </div>
                                 
                                </div>
                    </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default PaymentSuccess;
