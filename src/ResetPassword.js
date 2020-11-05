import React from 'react';
import Header from './Header'
import Footer from './Footer'

class ResetPassword extends React.Component
{
    render()
    {
        return(
            <div>
                <Header></Header>
                <main class="main">
           

            <div class="container">
                <div class="doctors-section password-box">
                    <div class="heading">
                        <h2 class="title">Reset Password</h2>
                        <p>Please enter your email address below to receive a password reset link.</p>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                        <form action="#">
                        <div class="form-group required-field">
                            <label for="reset-email">Email</label>
                            <input type="email" class="form-control" id="reset-email" name="reset-email" required=""/>
                        </div>

                        <div class="form-footer">
                            <button type="submit" class="btn btn-primary">Reset My Password</button>
                        </div>
                    </form>
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

export default ResetPassword;