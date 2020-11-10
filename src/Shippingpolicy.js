import React from 'react';
import logo from './logo.svg';
import Header from './Header'
import Footer from './Footer'
import News from './News';



class Shippingpolicy extends React.Component {


  render(){
  return (

    <div className="App">    
<Header></Header>

<nav aria-label="breadcrumb" class="breadcrumb-nav">
                        <div class="container">
                            <ol class="breadcrumb">
                                {/* <li class="breadcrumb-item"><a href="/"><i class="icon-home"></i></a></li>
                                <li class="breadcrumb-item" aria-current="page">Disclaimer</li> */}
                                {/* <li class="breadcrumb-item" aria-current="page">Diabetes</li>
                                <li class="breadcrumb-item" aria-current="page">Type 1 Diabetes</li>
                                <li class="breadcrumb-item active" aria-current="page">Type 1 diabetes causes and risk factors */}
                                    {/* </li> */}
                            </ol>
                        </div>
                        {/* <!-- End .container --> */}
                    </nav>
                    <div class="container">
                        
                        <div class="row marginbtm-240">
    
                       
    
                                  <div class="col-md-12">
                                    
                                  <div class="privacy-box" style={{background:' #fff',
                                  padding: '15px',marginBottom:'19%',fontWeight: '700',
                                 
                                  color:'#6b6b6b',
                                 
                                  letterSpacing:'.01rem',
                                  font: '500 16px/1.35 Rajdhani,Helvetica Neue,Verdana,Arial,sans-serif',
                                  textAlign:'justify'
                              }}>
                                                        <h2 class="title pull-left section-title">DELIVERY / SHIPPING POLICY</h2>
                                                       
                                                        <p><b>DELIVERY / SHIPPING POLICY</b></p>
                                                        <p>1.1.	Customer's Product related complaint about delivery/shipping shall be processed in accordance with the Vendor/Service Providers’ Delivery/Shipping Policy available at their respective websites. Both Customer and Vendor/Service Providers agree to such Delivery/Shipping Policy of the Vendor/Service Providers. </p>
                                                       <p>1.2.	How to raise issues regarding delivery/shipping: To raise issues regarding delivery/shipping, simply email Us Your order details and your concern regarding delivery/shipping. As a facilitator between the Customer and Vendor/Service Providers, We take Customer feedback very seriously and use it to continually  improve Our quality of service.</p>
                                                       <p>1.3.	Due to unforeseeable circumstances such as COVID-19 etc. there may be a delay in delivery of the Products/Services by the Vendor/Service Providers. Your patience and cooperation will be appreciated during such circumstances.</p>
                                                       <p>1.4.	If You have any queries, do call our helpdesk at +91-90244-22444 or email us at wecare@beatmysugar.com. We're here for you! </p>
    
                                                    </div>
                                            
                                  </div>
                                 
                                </div>
                    </div>
 <Footer></Footer>                        
 </div>
  );
  }
}

export default Shippingpolicy;
