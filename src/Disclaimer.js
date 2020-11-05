import React from 'react';
import logo from './logo.svg';
import Header from './Header'
import Footer from './Footer'
// // import News from './News';



class Disclaimer extends React.Component {


  render(){
  return (

    <div className="App">    
<Header></Header>

<nav aria-label="breadcrumb" class="breadcrumb-nav">
                        <div class="container">
                            <ol class="breadcrumb">
                            
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
                                                        <h2 class="title pull-left section-title">DISCLAIMER</h2>
                                                       
                                                        <p>The information contained in the Website is thoughtfully and carefully placed but is not meant to substitute for the advice given by Your doctor or other health care professional. You should not use the information available on or through the Website to diagnose or treat a health problem or disease or prescribe any medication. Information and statements regarding the Products have not been evaluated by the Food Safety and Standards Authority of India (FSSAI) and The Central Drugs Standard Control Organisation (CDSCO) unless Vendor/Service Provider personally has it approved by FSSAI and CDSCO. Read all product packaging carefully before use. </p>

                                                        <p>In addition to this, you are also requested to go through the disclaimers provided on each page of the Website before availing the products and services listed on the Website. </p>
    
                                                    </div>
                                            
                                  </div>
                                 
                                </div>
                    </div>
 <Footer></Footer>                        
 </div>
  );
  }
}

export default Disclaimer;
