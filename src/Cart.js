import React from 'react';
import Menu from './Header'
import Footer from './Footer'

import PostApiCall from "./Api";
import Notiflix from "notiflix-react";

import GetApiCall from './GetApi'
import moment from 'moment'
// import { array } from '../../../Library/Caches/typescript/3.6/node_modules/@types/prop-types';




class Cart extends React.Component
{

    constructor(props){
        super(props)
        this.state={
            Cart : [],
            RawData : [],
            quantity : [],
            cartPrice : [],
            SubTotal : 0
           
        }

    }

    componentDidMount(){
        var log = localStorage.getItem('CustomerLogin')
        var login = JSON.parse(log)


        var arr = []
        if(login != null && login != ''){

            PostApiCall.postRequest({
    
                customer_id : login.fld_userid,
                // customer_id : 13,

            
            },"GetShoppingCartData").then((results) => 
            
              // const objs = JSON.parse(result._bodyText)
              results.json().then(obj => {
   
            
              if(results.status == 200 || results.status==201){

                // console.log(obj.data)
                this.setState({RawData : obj.data,
                })

               

                var data = []
           
                for(var i=0 ; i <Object.keys(obj.data).length ; i++){

                    // console.log(parseFloat((obj.data[i].fld_numofitems*obj.data[i].fld_value)).toFixed(2))
                    this.setState({
                        SubTotal : this.state.SubTotal + (obj.data[i].fld_numofitems*obj.data[i].fld_value)
                    })

                    if(obj.data[i].fld_productcategory == 'Books'){


                        // console.log(obj.data[i].fld_productid)
                        PostApiCall.postRequest({

                            book_id : obj.data[i].fld_productid
                          
                                  
                         },"GetBookDetailsWebsite").then((results1) => 
                         
                           results1.json().then(obj1 => {
                            
                           if(results1.status == 200 || results1.status == 201){
                            
                        //    console.log(obj1.data)

                          for(var j=0 ;j<Object.keys(obj.data).length;j++){
                       
                              if(obj.data[j].fld_productid == obj1.data[0].fld_bookid){
                                //   console.log(obj.data[j])
                                this.setState(prevState => ({
                                    quantity: [...prevState.quantity, obj.data[j].fld_numofitems]
                                  })
                                  )  
                                  this.setState(prevState => ({
                                    cartPrice: [...prevState.cartPrice, obj.data[j].fld_value]
                                  })
                                  )  
                              }
                          }
                            
                            this.setState(prevState => ({
                                Cart: [...prevState.Cart, obj1.data[0]]
                              })
                              )
                          
                           }}))

                    }else if(obj.data[i].fld_productcategory == 'Footcare'){



                        PostApiCall.postRequest({

                            foot_id : obj.data[i].fld_productid
                                  
                         },"GetFootDetailsWebsite").then((results1) => 
                         
                           results1.json().then(obj1 => {
                            
                           if(results1.status == 200 || results1.status == 201){
                            
                        //    console.log(obj1.data)

                          for(var j=0 ;j<Object.keys(obj.data).length;j++){
                              if(obj.data[j].fld_productid == obj1.data[0].fld_footcareid){
                                //   console.log(obj.data[j])
                                this.setState(prevState => ({
                                    quantity: [...prevState.quantity, obj.data[j].fld_numofitems]
                                  })
                                  )  
                                  this.setState(prevState => ({
                                    cartPrice: [...prevState.cartPrice, obj.data[j].fld_value]
                                  })
                                  )  
                              }
                          }
                            
                            this.setState(prevState => ({
                                Cart: [...prevState.Cart, obj1.data[0]]
                              })
                              )
                          
                           }}))

                    }
                    else if(obj.data[i].fld_productcategory == 'Allopathy'){


                        PostApiCall.postRequest({

                            medicine_id : obj.data[i].fld_productid
                                  
                         },"GetAllopathyDetailsWebsite").then((results1) => 
                         
                           results1.json().then(obj1 => {
                            
                           if(results1.status == 200 || results1.status == 201){
                            
                        //    console.log(obj1.data)

                          for(var j=0 ;j<Object.keys(obj.data).length;j++){
                              if(obj.data[j].fld_productid == obj1.data[0].fld_medicineid){
                                //   console.log(obj.data[j])
                                this.setState(prevState => ({
                                    quantity: [...prevState.quantity, obj.data[j].fld_numofitems]
                                  })
                                  )  
                                  this.setState(prevState => ({
                                    cartPrice: [...prevState.cartPrice, obj.data[j].fld_value]
                                  })
                                  )  
                              }
                          }
                            
                            this.setState(prevState => ({
                                Cart: [...prevState.Cart, obj1.data[0]]
                              })
                              )
                          
                           }}))

                    }
                    else if(obj.data[i].fld_productcategory == 'Ayurveda'){

                        PostApiCall.postRequest({

                            medicine_id : obj.data[i].fld_productid
                                  
                         },"GetAyuvedicDetailsWebsite").then((results1) => 
                         
                           results1.json().then(obj1 => {
                            
                           if(results1.status == 200 || results1.status == 201){
                            
                        //    console.log(obj1.data)

                          for(var j=0 ;j<Object.keys(obj.data).length;j++){
                              if(obj.data[j].fld_productid == obj1.data[0].fld_medicineid){
                                //   console.log(obj.data[j])
                                this.setState(prevState => ({
                                    quantity: [...prevState.quantity, obj.data[j].fld_numofitems]
                                  })
                                  )  
                                  this.setState(prevState => ({
                                    cartPrice: [...prevState.cartPrice, obj.data[j].fld_value]
                                  })
                                  )  
                              }
                          }
                            
                            this.setState(prevState => ({
                                Cart: [...prevState.Cart, obj1.data[0]]
                              })
                              )
                          
                           }}))
                        

                    }else if(obj.data[i].fld_productcategory == 'Device'){


                        PostApiCall.postRequest({

                            device_id : obj.data[i].fld_productid
                                  
                         },"GetAyurvedaDetailsWebsite").then((results1) => 
                         
                           results1.json().then(obj1 => {
                            
                           if(results1.status == 200 || results1.status == 201){
                            
                        //    console.log(obj1.data)

                          for(var j=0 ;j<Object.keys(obj.data).length;j++){
                              if(obj.data[j].fld_productid == obj1.data[0].fld_deviceid){
                                //   console.log(obj.data[j])
                                this.setState(prevState => ({
                                    quantity: [...prevState.quantity, obj.data[j].fld_numofitems]
                                  })
                                  )  
                                  this.setState(prevState => ({
                                    cartPrice: [...prevState.cartPrice, obj.data[j].fld_value]
                                  })
                                  )  
                              }
                          }
                            
                            this.setState(prevState => ({
                                Cart: [...prevState.Cart, obj1.data[0]]
                              })
                              )
                          
                           }}))


                    }else if(obj.data[i].fld_productcategory == 'Food'){


                        PostApiCall.postRequest({

                            food_id : obj.data[i].fld_productid
                                  
                         },"GetFoodDetailsWebsite").then((results1) => 
                         
                           results1.json().then(obj1 => {
                            
                           if(results1.status == 200 || results1.status == 201){
                            
                        //    console.log(obj1.data)

                          for(var j=0 ;j<Object.keys(obj.data).length;j++){
                              if(obj.data[j].fld_productid == obj1.data[0].fld_foodid){
                                //   console.log(obj.data[j])
                                this.setState(prevState => ({
                                    quantity: [...prevState.quantity, obj.data[j].fld_numofitems]
                                  })
                                  )  
                                  this.setState(prevState => ({
                                    cartPrice: [...prevState.cartPrice, obj.data[j].fld_value]
                                  })
                                  )  
                              }
                          }
                            
                            this.setState(prevState => ({
                                Cart: [...prevState.Cart, obj1.data[0]]
                              })
                              )
                          
                           }}))

                    }



                }

        
             
   
              }else{
                Notiflix.Notify.Failure(obj.data) 
              }
   
           }))

         
         
        }

    }

    render()
    {
        return (
            <div>
                <Menu></Menu>
                  <div class="container">
                        <div class="container-box cart-section">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="cart-table-container table-responsive">
                                        <table class="table table-cart">
                                            <thead>
                                                <tr>
                                                    <th class="product-col" style={{width:"50%"}}>Product</th>
                                                    <th class="price-col" style={{width:"20%"}}>Price</th>
                                                    <th class="qty-col" style={{width:"20%"}}>Qty</th>
                                                    <th style={{width:"10%"}}>Subtotal</th>
                                                </tr>
                                            </thead>
                                           

                                            {this.state.Cart.map(
                              (cart,index) => (
                                <tbody>
                                
                                                <tr class="product-row">
                                                    <td class="product-col">
                                                        <figure class="product-image-container">
                                                            <a class="product-image">
                                                                <img src={cart.Photo != null && cart.Photo != '' ? cart.Photo.split(',')[0] : '/assets/images/not-avail.png'} alt="product"/>
                                                            </a>
                                                        </figure>
                                                        <h2 class="product-title">
                                                            <a >{cart.fld_title  != undefined ? cart.fld_title : cart.fld_itemname}</a>
                                                        </h2>
                                                    </td>
                                                    <td>&#8377;{(this.state.RawData[index].fld_productcategory == 'Books' || this.state.RawData[index].fld_productcategory == 'Device' || this.state.RawData[index].fld_productcategory == 'Footcare')
                                                ? parseFloat(this.state.cartPrice[index]) : parseFloat(this.state.cartPrice[index])
                                                }</td>
                                                    <td>
                                                        {this.state.quantity[index]}
                                                        {/* <input class="vertical-quantity form-control" type="text" disabled={true}/> */}
                                                    </td>
                                                    <td>&#8377;{(this.state.quantity[index])*((this.state.RawData[index].fld_productcategory == 'Books' || this.state.RawData[index].fld_productcategory == 'Device' || this.state.RawData[index].fld_productcategory == 'Footcare')
                                                ? parseFloat(this.state.cartPrice[index]) : parseFloat(this.state.cartPrice[index])) } </td>
                                                    </tr> 
                                                <tr class="product-action-row">
                                                    <td colspan="4" class="clearfix">
                                                        <div class="float-left">
                                                            <a href="#" class="btn-move">Move to Wishlist</a>
                                                        </div>
                                                        
                                                        <div class="float-right">
                                                            {/* <a href="#" title="Edit product" class="btn-edit"><span class="sr-only">Edit</span><i class="icon-pencil"></i></a> */}
                                                            <a href="#" title="Remove product" class="btn-remove"><span class="sr-only">Remove</span></a>
                                                        </div>
                                                    </td>
                                                </tr>
        
                                                </tbody>
                                            
                                               
                              ))}
                                           
        
                                            <tfoot>
                                                <tr>
                                                    <td colspan="4" class="clearfix">
                                                        <div class="float-left">
                                                            <a href="category.html" class="btn btn-outline-secondary">Continue Shopping</a>
                                                        </div>
        
                                                        <div class="float-right">
                                                            <a href="#" class="btn btn-outline-secondary btn-clear-cart">Clear Shopping Cart</a>
                                                            <a href="#" class="btn btn-outline-secondary btn-update-cart">Update Shopping Cart</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
        
                                    <div class="cart-discount">
                                        <h4>Apply Discount Code</h4>
                                        <form action="#">
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control-sm" placeholder="Enter discount code"  required />
                                                <div class="input-group-append">
                                                    <button class="btn btn-sm btn-primary" type="submit">Apply Discount</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
        
                                <div class="col-lg-4">
                                    <div class="cart-summary">
                                        <h3>Summary</h3>
        
                                    
        
                                        <table class="table table-totals">
                                            <tbody>
                                                <tr>
                                                    <td>Subtotal</td>
                                            <td>&#8377;{parseFloat(this.state.SubTotal).toFixed(2)}</td>
                                                </tr>
        
                                                <tr>
                                                    <td>Shipping Charges</td>
                                                    <td>&#8377;0.00</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td>Order Total</td>
                                                    <td>&#8377;{parseFloat(this.state.SubTotal).toFixed(2)}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
        
                                        <div class="checkout-methods">
                                            <button onClick={()=>{
                                                // console.log(this.state.Cart)

                                                for(var i = 0 ; i<Object.keys(this.state.Cart).length;i++){

                                                    if(this.state.Cart[i].fld_prescriptionrequired != undefined){
                                                        // console.log(this.state.Cart[i])
                                                        if(this.state.Cart[i].fld_prescriptionrequired){


                                                            Notiflix.Confirm.Show('Alert','You have added a prescribed medicine to your cart, please upload a valid prescription. Do you want to continue?','Yes','No',
                                                            function(){ 
                                                                // Yes button callback
                                                                window.location.href = '/checkout'
                                                                },function(){
                                                                     // No button callback
                                                                     ;});


                                                        }

                                                    }

                                                }
                                                // window.location.href = '/checkout'
                                            }}
                                            class="btn btn-block btn-sm btn-primary">Go to Checkout</button>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer></Footer>
                    </div>
    
        );
    }
}

export default Cart;