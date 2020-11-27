import React from 'react';
import Menu from './Header';
import Footer from './Footer';
import PostApiCall from "./Api";
import moment from 'moment'


class Logout extends React.Component
{
    constructor(props){
        super(props)
       
      }

componentDidMount(){

    var login = localStorage.getItem('CustomerLoginDetails')
    var details = JSON.parse(login)

    localStorage.removeItem('CustomerLoginDetails')
                               
    window.location.href = '/'

    if(details != null){

    
                                        PostApiCall.postRequest({
    
                                            user_email : details.fld_email,
                                           login_type : 'Logout',
                                           last_action_date_time : moment().format('lll').toString()
                                
                                          
                                          },"AddUserLoginSession").then((results) => 
                                          
                                            // const objs = JSON.parse(result._bodyText)
                                            results.json().then(obj => {
                                
                                
                                            if(results.status == 200 || results.status==201){
                                         
                                              
                                                
                                            }
                                          }))
                                        }
}


  

    render()
    {
        return (
            <div>
                <Menu></Menu>
                    <main >
                       
                    </main>
                <Footer></Footer>
            </div>
        )
    }
}

export default Logout;
