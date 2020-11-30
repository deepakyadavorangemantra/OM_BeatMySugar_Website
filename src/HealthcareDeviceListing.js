import React from 'react';
import Menu from './Header'
import Footer from './Footer'
import GetApiCall from './GetApi'

class HealthcareDeviceListing extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            Device: [],
            DeviceDetails : []
        }
    }


    componentDidMount(){

 
        GetApiCall.getRequest("GetDevicesWeb").then((results) => {
    
            results.json().then(data => ({
              data: data,
              status: results.status
          })
      ).then(res => {
        //   console.log(res.data.data
     
        const result = [];
        const map = new Map();
        for (const item of res.data.data) {
            if(!map.has(item.fld_deviceid)){
                map.set(item.fld_deviceid, true);    // set any value to Map
                result.push({
                    fld_deviceid: item.fld_deviceid,
                    fld_itemname : item.fld_itemname,
                    fld_productprice : item.fld_productprice,
                    fld_discountprice : item.fld_discountprice,
                    fld_discountpercent : item.fld_discountpercent,
                    fld_photo : item.fld_photo,
                    fld_brand : item.fld_brand,
                    fld_pharma : item.fld_pharma

                });
            }
        }
        // console.log(result)
        this.setState({
            Device: result,
            DeviceDetails : res.data.data
        })
 
          
    
    
      })
          })
    
         
    }

    render()
    {
        return (
            <div>
                <Menu></Menu>
                 <div class="container doctors-section healthcare-list">
                    <h3 class="section-title">Healthcare Devices</h3>
              <div class="row ">
              {this.state.Device.map(
                              (device,index) => (
                  <div class="col-md-2">
                        <div class="partner partner-inner-page">
                                <img src={(device.fld_photo == 'null' || device.fld_photo == null || device.fld_photo == '') ? 'assets/images/not-avail.png' : device.fld_photo } alt="logo"/>
                                <div class="product-details">
                                    <p class="product-title"><a 
                                    onClick={()=>{
                                        // var arr =[]
                                        // for(var i=0 ;i<Object.keys(this.state.DeviceDetails).length ; i++){

                                        //     if(device.fld_deviceid == this.state.DeviceDetails[i].fld_deviceid){
                                        //         arr.push(this.state.DeviceDetails[i])
                                    window.location.href = `/device/${device.fld_deviceid+"/"+device.fld_itemname.replace(/\W|_/g,"")}`
                                                
                                        //     }

                                        // }
                                        // localStorage.setItem('DeviceDetails',JSON.stringify(arr))
                                        // window.location.href = '/deviceDetails'
                                      
                                    }}
                                    >{device.fld_itemname}</a></p>
                                    <p class="small-desc">By: {device.fld_pharma}</p>
                                    <p class="price"><span><s>₹{device.fld_productprice}</s></span> ₹{device.fld_discountprice}</p>
                                    <p class="discount-price">You Save ₹{parseFloat(device.fld_productprice - device.fld_discountprice).toFixed(2)} ({device.fld_discountpercent}%)</p>
                                  <p class="brief-desc"></p>
                                 
                                        <ul class="group-buttons">
                                            <li> <button href="#" class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> ADD TO CART</button></li>
                                            <li><button class="like-btn"><i class="fas fa-heart"></i></button> </li>
                                            <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li>
                                        </ul>
                                       
                                </div>
                               
                            </div>
                  
              </div>
                              ))}
              {/* <div class="col-md-2">
                    <div class="partner partner-inner-page">
                            <img src="assets/images/healthcaredevices/accu-check.jpg" alt="logo"/>
                            <div class="product-details">
                                <p class="product-title"><a href="device.html">ACCU-CHEK ACTIVE 10 STRIPS</a></p>
                                <p class="small-desc">By: Accu-Chek</p>
                                <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                <p class="discount-price">You Save ₹75 (20%)</p>
                                <p class="brief-desc">The Accu-Check Test Strips are the perfect choice for type 1 and type 2 diabetics.</p>
                             
                                    <ul class="group-buttons">
                                        <li> <button href="#" class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> ADD TO CART</button></li>
                                        <li><button class="like-btn"><i class="fas fa-heart"></i></button> </li>
                                        <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li>
                                    </ul>
                                   
                            </div>
                           
                        </div>
              
          </div>
          <div class="col-md-2">
                <div class="partner partner-inner-page">
                        <img src="assets/images/healthcaredevices/accu-check.jpg" alt="logo"/>
                        <div class="product-details">
                            <p class="product-title"><a href="device.html">ACCU-CHEK ACTIVE 10 STRIPS</a></p>
                            <p class="small-desc">By: Accu-Chek</p>
                            <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                            <p class="discount-price">You Save ₹75 (20%)</p>
                            <p class="brief-desc">The Accu-Check Test Strips are the perfect choice for type 1 and type 2 diabetics.</p>
                         
                                <ul class="group-buttons">
                                    <li> <button href="#" class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> ADD TO CART</button></li>
                                    <li><button class="like-btn"><i class="fas fa-heart"></i></button> </li>
                                    <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li>
                                </ul>
                               
                        </div>
                       
                    </div>
          
      </div>
      <div class="col-md-2">
            <div class="partner partner-inner-page">
                    <img src="assets/images/healthcaredevices/accu-check.jpg" alt="logo"/>
                    <div class="product-details">
                        <p class="product-title"><a href="device.html">ACCU-CHEK ACTIVE 10 STRIPS</a></p>
                        <p class="small-desc">By: Accu-Chek</p>
                        <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                        <p class="discount-price">You Save ₹75 (20%)</p>
                        <p class="brief-desc">The Accu-Check Test Strips are the perfect choice for type 1 and type 2 diabetics.</p>
                     
                            <ul class="group-buttons">
                                <li> <button href="#" class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> ADD TO CART</button></li>
                                <li><button class="like-btn"><i class="fas fa-heart"></i></button> </li>
                                <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li>
                            </ul>
                           
                    </div>
                   
                </div>
      
  </div>
  <div class="col-md-2">
        <div class="partner partner-inner-page">
                <img src="assets/images/healthcaredevices/accu-check.jpg" alt="logo"/>
                <div class="product-details">
                    <p class="product-title"><a href="device.html">ACCU-CHEK ACTIVE 10 STRIPS</a></p>
                    <p class="small-desc">By: Accu-Chek</p>
                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                    <p class="discount-price">You Save ₹75 (20%)</p>
                    <p class="brief-desc">The Accu-Check Test Strips are the perfect choice for type 1 and type 2 diabetics.</p>
                 
                        <ul class="group-buttons">
                            <li> <button href="#" class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> ADD TO CART</button></li>
                            <li><button class="like-btn"><i class="fas fa-heart"></i></button> </li>
                            <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li>
                        </ul>
                       
                </div>
               
            </div>
  
</div>
<div class="col-md-2">
        <div class="partner partner-inner-page">
                <img src="assets/images/healthcaredevices/accu-check.jpg" alt="logo"/>
                <div class="product-details">
                    <p class="product-title"><a href="device.html">ACCU-CHEK ACTIVE 10 STRIPS</a></p>
                    <p class="small-desc">By: Accu-Chek</p>
                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                    <p class="discount-price">You Save ₹75 (20%)</p>
                    <p class="brief-desc">The Accu-Check Test Strips are the perfect choice for type 1 and type 2 diabetics.</p>
                 
                        <ul class="group-buttons">
                            <li> <button href="#" class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> ADD TO CART</button></li>
                            <li><button class="like-btn"><i class="fas fa-heart"></i></button> </li>
                            <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li>
                        </ul>
                       
                </div>
               
            </div>
  
</div>
         */}
            </div>
            </div>
            <Footer></Footer>
            </div>
        );
    }
}

export default HealthcareDeviceListing;