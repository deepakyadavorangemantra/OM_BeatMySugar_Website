import React from 'react';
import logo from './logo.svg';

import Header from './Header'
import Footer from './Footer'
// // import News from './News';
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import GetApiCall from "./GetApi";
import moment from "moment";



class Returnorder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            SelectReturn:'No longer Needed',
            SelectData:[
                { value: "Expired product", label: "Expired product" },
                { value: "Damaged Product", label: "Damaged Product" },
                { value: "Incorrect product", label: "Incorrect product" },
                { value: "Any Other", label: "Any Other" },
                
            ],
            Comments:'',
            ReturnOrderData : [],
            MainOrderData : [],
            ProductUrl : '',
            ProductImageData : [],
            LoginData:[],
            ImageApiUrl: "https://images.beatmysugar.com/api/Image/SaveImage",
        }
    }
    componentDidMount() {
        Notiflix.Loading.Init({
          svgColor: "#507dc0",
        });
    
        var log = localStorage.getItem("CustomerLoginDetails");
        var loginData = JSON.parse(log);

        this.setState({
          LoginData: loginData,
        });

        var rt = JSON.parse(localStorage.getItem("ReturnOrderData"))
        var rt1 = JSON.parse(localStorage.getItem("ReturnMainOrder"))
        this.setState({
            ReturnOrderData : rt,
            MainOrderData : rt1
        })
     } 


    onChangeComment(comment){
        this.setState({
            Comments:comment.target.value
        })
    }
    onChangeSelect(selectneed){
        this.setState({
            SelectReturn:selectneed.target.value
        })
    }

    

    onPost = () => {
        Notiflix.Loading.Dots()
       
        const form = new FormData();

        form.append("file", this.state.ProductImageData);
        form.append("foldername", "CustomerReturn");
        form.append("filename", 'Return-'+this.state.ReturnOrderData.fld_orderdetailid);
         fetch(this.state.ImageApiUrl, {
         method: 'POST',
             body: form
               }).then((image) => {
              image.json().then(data => ({
               data: data,
               status: image.status
         })
     ).then(res => {
                                                                      
        var log = localStorage.getItem("CustomerLoginDetails");
        var login = JSON.parse(log);
          PostApiCall.postRequest(
           {
         orderdetailid : this.state.ReturnOrderData.fld_orderdetailid,
         productphoto : "https://images.beatmysugar.com/images/CustomerReturn/" + res.data.Message.split(",")[2].split("=")[1].trim(),
         reasonforreturn : this.state.SelectReturn,
         comment : this.state.Comments,
         returnrequestedon : moment().format("lll"),
         updatedon : moment().format("lll"),
         updatedby : login.fld_userid,
           },
        "Add_ReturnMaster"
      ).then((results) =>
          results.json().then((obj) => {
           if (results.status == 200 || results.status == 201) {
               Notiflix.Loading.Remove()
               Notiflix.Notify.Success('Your product return request is successfully added.')
               window.location.href = '/orderhistory'
       }
    else{
        Notiflix.Loading.Remove();
        Notiflix.Notify.Failure("Something went wrong, try again later.");
     }
   
       }
       ))
    })
})

    }

    SaveReturnOrder(){

        if(JSON.stringify(this.state.ProductImageData) != '[]'){
            if(this.state.SelectReturn!=''){

                if(this.state.SelectReturn == 'Any Other'){

                    if(this.state.Comments != '')
                    {
                        this.onPost();
                    }else
                    {
                        Notiflix.Notify.Failure('Please tell us the about reason to return this item.')
                    }


                }else
                {
                    this.onPost();
                }
            
               
            }
            else{
                Notiflix.Notify.Failure('Please select why are you returning product.')
            }
        }
        else
              {
                Notiflix.Notify.Failure('Please upload product image.')
           }
    
    }

  render(){
  return (

    <div className="App">    
<Header></Header>


  <div class="account-section">             
<div class="co">
                <div class="container" style={{background:"none"}}>
                    <div class="row mt-2">
                        <div class="col-lg-9 order-lg-last ">
                            <div class="dashboard-content">
                            
                            <div class="row order-filter-section">
                               
                               
                                <div class="clearfix"></div>
                                <div class="col-md-12">
                                <div class="card">
                                        <div class="card-header">
                                            Return Order                                            
                                          </div>

                                        <div class="card-body order-history" style={{    font:"normal 400 1.4rem / 17px 'Open Sans',sans-serif"}}>
                                         
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <img src={this.state.ReturnOrderData != undefined && this.state.ReturnOrderData != null && this.state.ReturnOrderData.Photo != undefined ? this.state.ReturnOrderData.Photo.split('#')[0] : ''} style={{    width: "150px"}}></img>
                                                </div>
                                                <div class="col-md-4">
                                                <p>Order No</p>
                                                     <h4>{this.state.MainOrderData.fld_ordernumber}</h4>
                                                    <h4 style={{lineHeight:"17px"}}>{this.state.ReturnOrderData.fld_prodname}
                                                  </h4>
                                                    <h4><span style={{fontWeight:"700"}}>QTY</span> - {this.state.ReturnOrderData.fld_quantity} </h4>
                                                    <p>Total Paid</p>
                                                  <h4>₹{parseFloat(this.state.ReturnOrderData.fld_price*this.state.ReturnOrderData.fld_quantity).toFixed(2)}</h4>
                                                </div>
                                                <div class="col-md-5">
                                                <h4>Upload Product Image *</h4>
                                                <input type="file" className="form-control" style={{display:'block'}}
                                                accept="image/*"
                                                onChange={(e)=>{
                                                    e.preventDefault();
                                                    if(e.target.files[0] != undefined){
                                                    if (e.target.files[0].size < 100000) {
                                                    const reader = new FileReader();
                                                    const file = e.target.files[0];
                                                    reader.onloadend = () => {
                                                      this.setState({
                                                        file: file,
                                                        ProductUrl : reader.result,
                                                        ProductImageData : file
                                                      });
                                                   }
                                                    reader.readAsDataURL(file);
                                                } else {
                                                    Notiflix.Notify.Failure("File too large, upload file less than 100 kb.");
                                                  }
                                                }
                                                }}/>
                                                    <h4>Why are you Returning this ? *</h4>
                                                   <select class="form-control"
                                                   value={this.state.SelectReturn}
                                                   onChange={this.onChangeSelect.bind(this)}>
                                                   {this.state.SelectData.map(selecttype => (
                                                <option key={selecttype.value} value={selecttype.value}>
                                                      {selecttype.label}
                                                 </option>
                                                 ))}
                                                   </select>
                                                   <div 
                                                   >
                                                   <h4>Comments</h4>
                                                   <textarea class="form-control" placeholder="Comments" style={{height:"100px"}}
                                                   value={this.state.Comments}
                                                   onChange={this.onChangeComment.bind(this)}></textarea>
                                                   
                                                </div>  
                                                <a 
                                                   onClick={this.SaveReturnOrder.bind(this)} class="btn return-btn">Return</a>
                                                </div>
                                               
                                                <div class="col-md-3">
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            
                                </div>

                              
                            </div>
                           
                           
                        </div>
                        </div>
                        <aside class="sidebar col-lg-3">
                            <div class="widget widget-dashboard">

                            <ul class="list">
                                    <li >
                                        <a href="/account">Account Dashboard</a>
                                        <p>Get an Overview of your Account</p>
                                    </li>

                                    <li class="">
                                        <a href="/orderhistory">My Orders</a>
                                        <p>Check Shipping Status, Re Order Items</p>
                                    </li>

                                    <li class="">
                                        <a href="/wishlist">My Wishlist</a>
                                        <p>Add item to cart, Remove item</p>
                                    </li>

                                    <li class="" >
                                        <a href="/editprofile">My Profile</a>
                                        <p>Your Name, Phone Number, Password</p>
                                    </li>

                                    <li class="">
                                        <a href="/addressbook">My Address Book</a>
                                        <p>Add, Edit address</p>
                                    </li>
                                  
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            </div>
 <Footer></Footer>                        
 </div>
  );
  }
}

export default Returnorder;
