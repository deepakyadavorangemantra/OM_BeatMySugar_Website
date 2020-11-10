    import React from "react";
    import Menu from './Header'
    import Footer from './Footer'

    class Profile extends React.Component
    {
        render()
        {
            return(
                <div>
                    <Menu></Menu>
                    <div class="container">
                    <div class="container-box doctors-section" style={{height:"100%",background:"none"}}>
                        <div class="row mt-2 ">
                        
                            <div class="col-lg-9 order-lg-last ">
                                <div class="row dashboard-content">
                                    <div class="col-md-12 col-lg-12 col-sm-12">
                                    <h2>Personal Information</h2>
                                
                                <form action="#">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="row">

                                            <div class="col-md-6">
                                                    <div class="form-group required-field">
                                                        <label for="acc-name">Title</label>
                                                        <select class="form-control">
                                                            <option>Mr.</option>
                                                            <option>Mrs.</option>
                                                            <option>Dr.</option>
                                                        </select>

                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-group required-field">
                                                        <label for="acc-name">First Name</label>
                                                        <input type="text" class="form-control" id="acc-name" name="acc-name" required=""/>
                                                    </div>
                                                </div>

                                            

                                                <div class="col-md-6">
                                                    <div class="form-group required-field">
                                                        <label for="acc-lastname">Last Name</label>
                                                        <input type="text" class="form-control" id="acc-lastname" name="acc-lastname" required=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group required-field">
                                        <label for="acc-email">Email</label>
                                        <input type="email" class="form-control" id="acc-email" name="acc-email" required=""/>
                                    </div>

                                    <div class="form-group required-field">
                                        <label for="acc-email">Mobile</label>
                                        <input type="email" class="form-control" id="acc-email" name="acc-email" required=""/>
                                    </div>

                                    <div class="form-group required-field">
                                        <label for="acc-password">Password</label>
                                        <input type="password" class="form-control" id="acc-password" name="acc-password" required=""/>
                                    </div>
                                    <div class="row">
                                    <div class="col-md-3">
                                    <div class="form-group required-field">
                                        
                                        <label for="acc-password">Upload Profile Pic</label><br></br>
                                        <input type="file" />
                                    </div>
                                    </div>
                                    <div class="col-md-3">
                                        <img src="assets/images/user.png" style={{width:"150px",border:"1px solid #eaeaea"}}></img>
                                    </div>
                                    </div>

                                    <div class="mb-2"></div>

                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="change-pass-checkbox" value="1"/>
                                        <label class="custom-control-label" for="change-pass-checkbox">Change Password</label>
                                    </div>

                                   

                                    <div id="account-chage-pass">
                                        <h3 class="mb-2">Change Password</h3>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group required-field">
                                                    <label for="acc-pass2">Password</label>
                                                    <input type="password" class="form-control" id="acc-pass2" name="acc-pass2"/>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group required-field">
                                                    <label for="acc-pass3">Confirm Password</label>
                                                    <input type="password" class="form-control" id="acc-pass3" name="acc-pass3"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                
                                    <div class="form-footer">
                                        <a href="#"><i class="icon-pencil"></i>Edit</a>

                                        <div class="form-footer-right">
                                            <button type="submit" class="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </form>

                                    </div>
                                </div>


                                <div class="row dashboard-content" id="addressbook">
                                    <div class="col-md-12 col-lg-12 col-sm-12">
                                    <h2>Address Book</h2>
                                
                                <form action="#">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group required-field">
                                                        <label for="acc-name">Building Number / Flat Name</label>
                                                        <input type="text" class="form-control" id="acc-name" name="acc-name" required=""/>
                                                    </div>
                                                </div>

                                            

                                            
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group required-field">
                                        <label for="acc-email">Street Name</label>
                                        <input type="email" class="form-control" id="acc-email" name="acc-email" required=""/>
                                    </div>

                                

                                    <div class="row">
                                        <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-password">State</label>
                                        <input type="password" class="form-control" id="acc-password" name="acc-password" required=""/>
                                    </div>
                                        </div>
                                        <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-email">City</label>
                                        <input type="email" class="form-control" id="acc-email" name="acc-email" required=""/>
                                    </div>
                                            </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-password">Pincode</label>
                                        <input type="password" class="form-control" id="acc-password" name="acc-password" required=""/>
                                    </div>
                                        </div>
                                        <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-email">Country</label>
                                        <input type="email" class="form-control" id="acc-email" name="acc-email" required=""/>
                                    </div>
                                            </div>
                                    </div>

                                

                                    <div class="form-footer">
                                        <a href="#"><i class="icon-pencil"></i>Edit</a>

                                        <div class="form-footer-right">
                                            <button type="submit" class="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </form>

                                    </div>
                                </div>



                                <div class="row dashboard-content" id="patientsinformation">
                                    <div class="col-md-12 col-lg-12 col-sm-12">
                                    <h2>Patients Information</h2>
                                
                                <form action="#">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group required-field">
                                                        <label for="acc-name">Patients Name</label>
                                                        <input type="text" class="form-control" id="acc-name" name="acc-name" required=""/>
                                                    </div>
                                                </div>

                                            

                                            
                                            </div>
                                        </div>
                                    </div>

                                   

                                

                                    <div class="row">
                                        <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-password">Date of Birth</label>
                                        <input type="password" class="form-control" id="acc-password" name="acc-password" required=""/>
                                    </div>
                                        </div>
                                        <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-email">Relationship</label>
                                        <input type="email" class="form-control" id="acc-email" name="acc-email" required=""/>
                                    </div>
                                            </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-password">Blood Type</label>
                                        <input type="password" class="form-control" id="acc-password" name="acc-password" required=""/>
                                    </div>
                                        </div>
                                        <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-email">Weight (kgs)</label>
                                        <input type="email" class="form-control" id="acc-email" name="acc-email" required=""/>
                                    </div>
                                            </div>
                                    </div>

                                    <div class="">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group required-field">
                                                        <label for="acc-name">Medical Condition</label>
                                                        <input type="text" class="form-control" id="acc-name" name="acc-name" required=""/>
                                                    </div>
                                                </div>

                                            

                                            
                                            </div>
                                        </div>

                                        <div class="">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group required-field">
                                                        <label for="acc-name">Allergies and Reactions</label>
                                                        <input type="text" class="form-control" id="acc-name" name="acc-name" required=""/>
                                                    </div>
                                                </div>

                                            

                                            
                                            </div>
                                        </div>
                                    
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h3>Emergency Contact</h3>
                                            </div>
                                        <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-password">Name</label>
                                        <input type="password" class="form-control" id="acc-password" name="acc-password" required=""/>
                                    </div>
                                        </div>
                                        <div class="col-md-6">
                                        <div class="form-group required-field">
                                        <label for="acc-email">Mobile</label>
                                        <input type="email" class="form-control" id="acc-email" name="acc-email" required=""/>
                                    </div>
                                            </div>
                                    </div>
                                

                                    <div class="form-footer">
                                        <a href="#"><i class="icon-pencil"></i>Edit</a>

                                        <div class="form-footer-right">
                                            <button type="submit" class="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </form>

                                    </div>
                                </div>
                                
                            
                            </div>

                            <aside class="sidebar col-lg-3">
                                <div class="widget widget-dashboard">
                                    <h3 class="widget-title">Profile</h3>

                                    <ul class="list scrolling-box">
                                        <li class="active"><a href="#id1">Personal Information</a></li>
                                        
                                        <li><a href="#addressbook">Address Book</a></li>
                                    
                                        <li><a href="#patientsinformation">Patients Information</a></li>
                                        
                                    </ul>
                                </div>
                            </aside>
                        </div>

                        
                    </div>
                </div>
                <Footer></Footer>
                </div>
            )
        }
    } 

    export default Profile;