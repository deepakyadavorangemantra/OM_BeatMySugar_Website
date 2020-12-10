/* eslint-disable no-loop-func */
import React from "react";
import Menu from "./Header";
import Footer from "./Footer";


class MaintenancePage extends React.Component {
  

  render() {
    return (
      <div>
      
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
                                                        {/* <h2 class="pull-left section-title text-center" style={{color:"#000",fontSize:"30px"}}>Payment Failed !</h2> */}
                                                       <img src="/assets/images/maintenance.jpg"></img>
                                             
                                                    </div>
                                                    </div>
                                  </div>
                                 
                                </div>
                    </div>

      </div>
    );
  }
}

export default MaintenancePage;
