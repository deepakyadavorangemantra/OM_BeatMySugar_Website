import React from 'react'
import Menu from './Header'
import Footer from './Footer'

class PrescriptionAddress extends React.Component
{
    render()
    {
        return(
            <div>
                <Menu></Menu>
                <main>
                        <div class="container">
                    <div class="container-box doctors-section">
                    <ul class="checkout-progress-bar mt-2">
                        <li >
                            <span>Upload Prescription</span>
                        </li>
                        <li >
                            <span>Select Medicines</span>
                        </li>
                        <li class="active">
                            <span>Address</span>
                        </li>
                    </ul>
                    <div class="row">
                        <div class="col-lg-12">
                            <ul class="checkout-steps">
                                <li>
                                    <h2 class="step-title">Address Details</h2>

                                    <form action="#">
                                        <div class="form-group required-field">
                                            <label>Name </label>
                                            <input type="text" class="form-control" required=""/>
                                        </div>

                                        <div class="form-group required-field">
                                            <label>Phone Number </label>
                                            <div class="form-control-tooltip">
                                                <input type="tel" class="form-control" required=""/>
                                                <span class="input-tooltip" data-toggle="tooltip" title="" data-placement="right" data-original-title="For delivery questions."><i class="icon-question-circle"></i></span>
                                            </div>
                                        </div>

                                      
                                        <div class="form-group required-field">
                                            <label>Street </label>
                                            <input type="text" class="form-control" required=""/>
                                           
                                        </div>

                                        <div class="form-group required-field">
                                            <label>City  </label>
                                            <input type="text" class="form-control" required=""/>
                                        </div>

                                        <div class="form-group required-field">
                                            <label>State  </label>
                                            <input type="text" class="form-control" required=""/>
                                        </div>

                                    

                                        <div class="form-group required-field">
                                            <label>Zip/Postal Code </label>
                                            <input type="text" class="form-control" required=""/>
                                        </div>

                                        <div class="form-group required-field">
                                            <label>Country  </label>
                                            <input type="text" class="form-control" required=""/>
                                        </div>


                                       
                                    </form>

                                    
                                </li>

                               
                            </ul>
                        </div>

                       
                    </div>

                    <div class="row">
                        <div class="col-lg-8">
                            <div class="checkout-steps-action">
                                <a href="checkout-review.html" class="btn btn-primary float-left">Submit</a>
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

export default PrescriptionAddress