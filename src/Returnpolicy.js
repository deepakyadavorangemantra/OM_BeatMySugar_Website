import React from 'react';
import logo from './logo.svg';
import Header from './Header'
import Footer from './Footer'
import News from './News';



class Returnpolicy extends React.Component {


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
                                                        <h2 class="title pull-left section-title">RETURN / REFUND / EXCHANGE & CANCELLATION</h2>
                                                        <h4><b>1.	CANCELLATION </b></h4>
                                                        <p><b>1.1.	Cancellation by Vendor/Service Providers</b></p>
                                                        <p>There may be certain orders that Vendor/Service Providers are unable to accept and have the right to cancel either by the Vendor/Service Providers directly or Vendor/Service Providers can instruct Us to cancel such order. Some situations that may result in Customer’s order being cancelled which include, without limitation, non-availability of the Products or quantities ordered by Customers or inaccuracies or errors in pricing information. All such cancellation shall be without any recourse to the Customer and any liability to the Vendor/Service Providers or to Us. </p>
                                                       
                                                      

                                                        <p><b>1.2.	Cancellation by Customer</b></p>
                                                        <p>In case of requests for order cancellations, Vendor/Service Providers reserve the right to accept or reject requests for order cancellations as per its policy and contractual obligations. The Customer can cancel the order within 12 hours of placing it. As part of usual business practice, if Vendor/Service Providers receive a cancellation notice and the order has not been processed, Vendor/Service Providers may cancel the order and refund the entire amount to the Customer within a reasonable period of time. Vendor/Service Providers shall not be able to cancel orders that have already been processed by Vendor/Service Providers. The Customer agrees not to dispute the decision made by Vendor/Service Providers and accept Vendor/Service Provider’s decision regarding the cancellation.</p>

                                                        <h4><b>2.	RETURN/REFUND/EXCHANGE</b></h4>
                                                        <p>2.1.	Customer's Product related complaint about refund/replacement/exchange shall be processed in accordance with the Vendor/Service Providers’ return/refund/exchange Policy available at their respective websites. Both Customer and Vendor/Service Providers agree to such Return/Refund/Exchange Policy of the Vendor/Service Providers. </p>
                                                        <p>2.2.	How to request a return/refund/exchange: To request a return/refund/exchange, simply email Us Your order details, including the reason why You are requesting a return/refund/exchange. As a facilitator between the Customer and Vendor/Service Providers, We take Customer feedback very seriously and continually use it to improve Our quality of service.</p>
                                                        <p>2.3.	If You have any queries, do call our helpdesk at +91-90244-22444, email us at wecare@beatmysugar.com or contact our customer support executives through online chat. We're here for you!</p>
    
                                                    </div>
                                            
                                  </div>
                                 
                                </div>
                    </div>
 <Footer></Footer>                        
 </div>
  );
  }
}

export default Returnpolicy;
