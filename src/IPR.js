import React from 'react';
import logo from './logo.svg';
import Header from './Header'
import Footer from './Footer'
import News from './News';



class IPR extends React.Component {


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
                                                        <h2 class="title pull-left section-title">INTELLECTUAL PROPERTY RIGHTS </h2>
                                                        <p><b>1.	COPYRIGHTS, TRADEMARKS AND OTHER INTELLECTUAL PROPERTY RIGHTS</b></p>
                                                        <p>1.1.	As per the Terms & Conditions of “BeatMySugar”, the Website/App grants access to Users/Customers to view the content solely for visiting, ordering, and communicating only. All materials in this Website/App, including, but not limited to, images, illustrations, text, logos, and page headers that are part of this Website/App are copyrights and/or intellectual properties owned by “BeatMySugar”. All other trademarks not owned by “www.beatmysugar.com” that appear on this Website/App are the property of their respective owners, who may or may not be affiliated with, connected to, or sponsored by “www.beatmysugar.com”.</p>
                                                       
                                                      

                                                        <p>1.2.	You hereby agree that You will not reproduce, duplicate or copy the content of “www.beatmysugar.com” for any purpose unless You have been specifically permitted to do so in a separate agreement with this Website/App.</p>

                                                        <p><b>2. PROTECTING COPYRIGHTS AND OTHER INTELLECTUAL PROPERTY </b></p>
                                                        <p>2.1.	BeatMySugar respects the intellectual property of others and requires that our users and members do the same. You shall not upload, embed, post, email, transmit or otherwise make available any content that infringes any copyright, patent, trademark, trade secret, privacy, publicity, or other proprietary rights of any person or entity. BeatMySugar’s policy is to terminate, in appropriate circumstances, the membership of such Users and members. If You believe Your work has been copied and posted on or through the Website/App in a way that constitutes copyright and/or trademark infringement, please send Your complaint to the Grievance Officer. </p>
    
                                                    </div>
                                            
                                  </div>
                                 
                                </div>
                    </div>
 <Footer></Footer>                        
 </div>
  );
  }
}

export default IPR;
