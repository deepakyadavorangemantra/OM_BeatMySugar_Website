import React from 'react';
import Menu from './Header'
import Footer from './Footer'
import GetApiCall from './GetApi'

class AyurvedaListing extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            Med: [],
            MedDetails : []
     
        }
    }


    componentDidMount(){

        var arr = []
 
        GetApiCall.getRequest("GetAyurvedicMedicineWeb").then((results) => {
    
            results.json().then(data => ({
              data: data,
              status: results.status
          })
      ).then(res => {
        //   console.log(res.data.data
     
        const result = [];
        const map = new Map();
        for (const item of res.data.data) {
            if(!map.has(item.fld_medicineid)){
                map.set(item.fld_medicineid, true);    // set any value to Map
                result.push({
                    fld_medicineid: item.fld_medicineid,
                    fld_itemname : item.fld_itemname,
                    fld_price : item.fld_productprice,
                    fld_discountedprice : item.fld_discountprice,
                    fld_percent : item.fld_discountpercent,
                    fld_photo : item.fld_photo,
                    fld_brand : item.fld_brand,
                    fld_pharma : item.fld_pharma

                });
            }
        }
        // console.log(result)
        this.setState({
            Med: result,
            MedDetails : res.data.data
        })
 
          
    
    
      })
          })
    
         
    }


    render()
    {
        return (
            <div>
                <Menu></Menu>
                 <div class="container doctors-section">
                    <h3 class="section-title">Ayurveda</h3>
              <div class="row ">
              {this.state.Med.map(
                              (medicine,index) => (
                  <div class="col-md-2">
                        <div class="partner partner-inner-page">
                                <img src={(medicine.fld_photo == 'null' || medicine.fld_photo == null || medicine.fld_photo == '') ? 'assets/images/not-avail.png' : medicine.fld_photo } alt="logo"/>
                                <div class="product-details">
                                    <p class="product-title"><a  onClick={()=>{
                                       
                                       window.location.href = `/ayurveda/${medicine.fld_medicineid+"/"+medicine.fld_itemname.replace(/\W|_/g,"")}`

                                      
                                    }}>{medicine.fld_itemname}</a></p>
                                    <p class="small-desc">By: {medicine.fld_pharma}</p>
                                    <p class="price"><span><s>₹{medicine.fld_price}</s></span> ₹{medicine.fld_discountedprice}</p>
                                    <p class="discount-price">You Save ₹{parseFloat(medicine.fld_price - medicine.fld_discountedprice).toFixed(2)} ({medicine.fld_percent}%)</p>
                                    {/* <p class="brief-desc">The Accu-Check Test Strips are the perfect choice for type 1 and type 2 diabetics.</p> */}
                                 
                                        <ul class="group-buttons">
                                            <li> <button href="#" class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> ADD TO CART</button></li>
                                            <li><button class="like-btn"><i class="fas fa-heart"></i></button> </li>
                                            <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li>
                                        </ul>
                                       
                                </div>
                               
                            </div>
                  </div>
                              ))}
              </div>

              


            </div>
            <Footer></Footer>
           </div>
           
        );
    }
}

export default AyurvedaListing;