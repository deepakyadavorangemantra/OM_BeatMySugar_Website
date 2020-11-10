import React from 'react';
import Menu from './Header'
import Footer from './Footer'
import GetApiCall from './GetApi'


class LabListing extends React.Component
{


    constructor(props){
        super(props)
        this.state={
            Lab : [],
            
        }
    }
    
    componentDidMount(){
    
     
        GetApiCall.getRequest("GetLabWeb").then((results) => {
    
            results.json().then(data => ({
              data: data,
              status: results.status
          })
      ).then(res => {
        //   console.log(res.data.data)
    
     
    
     
        this.setState({
            Lab: res.data.data,
        })
    
    
          
    
    
      })
          })
    
         
    }
    


    render()
    {
        return(
            <div>
                <Menu></Menu>
                    <main>
                        <div class="container doctors-section">
                        <h3 class="section-title">Labs</h3>
                            <div class="row">

                            {this.state.Lab.map(
                              (lab,index) => (

                                <div class="col-md-3">
                                    <div class="lablist doctors-details">
                                        <p class="lab-title">{lab.fld_name} in {lab.fld_city}</p>
                                        <p class="Registration-number">Registration Number - {lab.fld_regno}</p>
                                        <img class="lab-list-img" src={lab.fld_logo == '' ? 'assets/images/not-avail.png' : lab.fld_logo} 
                                        // style={{width:"200px",height:"148px",marginTop:"20px",marginBottom:"30px"}}
                                        ></img>
                                        <a class="lab-btn" onClick={()=>{

                                           window.location.href = `/lab/${lab.fld_diagnosticcenterid+"-"+lab.fld_name.replace( / /g,'-')}`

                                        }}>View Details</a>
                                    </div>
                                </div>
                              ))}

                                {/* <div class="col-md-3">
                                    <div class="lablist doctors-details">
                                        <p class="lab-title">Thyrocare Laboratories Ltd. Lab Tests in New Delhi</p>
                                        <p class="Registration-number">Registration Number - GHGSHD4564</p>
                                        <img src="assets/images/thyrocare.png" style={{width:"200px",marginTop:"20px",marginBottom:"30px"}}></img>
                                        <a href="" class="lab-btn">View Details</a>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="lablist doctors-details">
                                        <p class="lab-title">Thyrocare Laboratories Ltd. Lab Tests in New Delhi</p>
                                        <p class="Registration-number">Registration Number - GHGSHD4564</p>
                                        <img src="assets/images/thyrocare.png" style={{width:"200px",marginTop:"20px",marginBottom:"30px"}}></img>
                                        <a href="" class="lab-btn">View Details</a>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="lablist doctors-details">
                                        <p class="lab-title">Thyrocare Laboratories Ltd. Lab Tests in New Delhi</p>
                                        <p class="Registration-number">Registration Number - GHGSHD4564</p>
                                        <img src="assets/images/thyrocare.png" style={{width:"200px",marginTop:"20px",marginBottom:"30px"}}></img>
                                        <a href="" class="lab-btn">View Details</a>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="lablist doctors-details">
                                        <p class="lab-title">Thyrocare Laboratories Ltd. Lab Tests in New Delhi</p>
                                        <p class="Registration-number">Registration Number - GHGSHD4564</p>
                                        <img src="assets/images/thyrocare.png" style={{width:"200px",marginTop:"20px",marginBottom:"30px"}}></img>
                                        <a href="" class="lab-btn">View Details</a>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </main>
                <Footer></Footer>
            </div>
        )
    }
}

export default LabListing