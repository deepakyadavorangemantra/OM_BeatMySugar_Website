import React from 'react';
import Menu from './Header'
import Footer from './Footer'
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";

class Checkout extends React.Component
{

    constructor(props){
        super(props)
        this.state={
            SubTotal : 0,
            ShippingAddress : [],
            SelectedAddress : 0,

            CartData : [],
            SelectedShippingAddress : [],
            SelectedBillingAddress : [],
            SameAsShip : false
           
        }

    }

    componentDidMount(){
        var log = localStorage.getItem('CustomerLoginDetails')
        var login = JSON.parse(log)


        var cartdt = JSON.parse(localStorage.getItem('CartData'))


        // console.log(cartdt)

        var crdt = []
        for(var i = 0 ; i<Object.keys(cartdt).length;i++){

            for(var j = 0 ; j<Object.keys(cartdt[i]).length;j++){
                // subt = subt + this.state.Cart[i][j].fld_discountprice*this.state.Cart[i][j].fld_quantity
                crdt.push(cartdt[i][j])
                this.setState({
                    CartData : crdt
                })
            }
     
        }



        var arr = []
        if(login != null && login != ''){



            PostApiCall.postRequest({
    
                customer_id : login.fld_userid,
                // customer_id : 13,

            
            },"GetAddressCustomer").then((results) => 
            
              // const objs = JSON.parse(result._bodyText)
              results.json().then(obj => {
   
            
              if(results.status == 200 || results.status==201){

                this.setState({
                    ShippingAddress : obj.data
                })

              }
            }))

         
        }

    }

    render()
    {
        return (
            <div>
                <Menu></Menu>
                 <div class="container checkout-section">
                        <div class="container-box">
                            <ul class="checkout-progress-bar mt-2">
                                <li class="active">
                                    <span>Shipping Address</span>
                                </li>
                                <li>
                                    <span>Review &amp; Payments</span>
                                </li>
                            </ul>
                            <div class="row">
                                <div class="col-lg-8">
                                    <ul class="checkout-steps">
                                        <li>
                                            <h2 class="step-title">Shipping Address</h2>
        
                                            <div class="shipping-step-addresses">
                                                
                                                {this.state.ShippingAddress.map((address,index)=>(
                                                <div class={this.state.SelectedShippingAddress.fld_id == address.fld_id  ? "shipping-address-box active" : "shipping-address-box"}>
                                                    <address>
                                                {address.fld_address}  <br/>
                                                        {address.fld_street}, {address.fld_landmark}, {address.fld_city} <br/>
                                                        {address.fld_state}, {address.fld_country} {address.fld_pincode} <br/>
                                                        {address.fld_country} <br/>
                                                        Mob : {address.fld_mobile} <br/>
                                                    </address>
        
                                                    <div class="address-box-action clearfix">
                                                        {/* <a href="#" class="btn btn-sm btn-link">
                                                            Edit
                                                        </a> */}
        
                                                        <a onClick={()=>{
                                                            this.setState({
                                                                SelectedShippingAddress : address
                                                            })
                                                        }} class="btn btn-sm btn-outline-secondary">
                                                            Ship Here
                                                        </a>
                                                    </div>
                                                </div>
                                                ))}
                                                {/* <div class="shipping-address-box active">
                                                    <address>
                                                        Susan Mason <br/>
                                                        123 Street Name, City Name <br/>
                                                        Los Angeles, California 03100 <br/>
                                                        United States <br/>
                                                        (123) 789-6150 <br/>
                                                    </address>
        
                                                    <div class="address-box-action clearfix">
                                                        <a href="#" class="btn btn-sm btn-link">
                                                            Edit
                                                        </a>
        
                                                        <a href="#" class="btn btn-sm btn-outline-secondary float-right">
                                                            Ship Here
                                                        </a>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <a href="/newaddress" class="btn btn-sm btn-outline-secondary btn-new-address">+ New Address</a>
                                        </li>
        
        
                                     
                                    </ul>
                                </div>
        
                                <div class="col-lg-4">
                                    <div class="order-summary">
                                        <h3>Summary</h3>
        
                                        <h4>
                                            <a data-toggle="collapse" href="#order-cart-section" class="collapsed" role="button" aria-expanded="false" aria-controls="order-cart-section">{this.state.CartData.length} product{this.state.CartData.length > 1 ? 's' : ''} in Cart</a>
                                        </h4>
        
                                        <div class="collapse" id="order-cart-section">
                                            <table class="table table-mini-cart">
                                                <tbody>

                                                {this.state.CartData.map(
                              (cart,index) => (
                                                    <tr>
                                                        <td class="product-col">
                                                           
                                                            <div class="col-sm-10">
                                                                <h2 class="product-title">
                                                                    <a href="product.html">{cart.fld_name}</a>
                                                                </h2>
        
                                                                <span class="product-qty">Qty: {cart.fld_quantity}</span>
                                                            </div>
                                                            <td class="price-col">&#8377;{parseFloat(cart.fld_quantity * cart.fld_discountprice).toFixed(2) }</td>
                                                        </td>
                                                   
                                                    </tr>
                              ))}
                                                    {/* <tr>
                                                        <td class="product-col">
                                                           
                                                            <div>
                                                                <h2 class="product-title">
                                                                    <a href="product.html">Bgr Tablet</a>
                                                                </h2>
        
                                                                <span class="product-qty">Qty: 4</span>
                                                            </div>
                                                        </td>
                                                        <td class="price-col">&#8377;7.90</td>
                                                    </tr> */}
                                                </tbody>    
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
        
                            <div class="row">
                                <div class="col-lg-8">
                                    <ul class="checkout-steps">
                                        <li>
                                            <h2 class="step-title" style={{marginBottom:"20px",marginTop:"20px"}}>Billing Address</h2><span  ><input type="checkbox" checked={this.state.SameAsShip}
                                            onChange={()=>{
                                                if(this.state.SameAsShip){
                                                    this.setState({
                                                        SameAsShip : false,
                                                        SelectedBillingAddress : []
                                                    })
                                                }else{
                                                    if(JSON.stringify(this.state.SelectedShippingAddress) == '[]'){
                                                        Notiflix.Notify.Failure('Please select shipping address.')
                                                    }else
                                                    {
                                                        this.setState({
                                                            SameAsShip : true,
                                                            SelectedBillingAddress : this.state.SelectedShippingAddress
                                                        }) 
                                                    }
                                                   
                                                }
                                            }}
                                            /> Same as shipping address</span>
        
                                            <div class="shipping-step-addresses" style={{display : this.state.SameAsShip ? 'none' : ''}}>
                                                
                                            {this.state.ShippingAddress.map((address,index)=>(
                                                <div class={this.state.SelectedBillingAddress.fld_id == address.fld_id  ? "shipping-address-box active" : "shipping-address-box"}>
                                                    <address>
                                                {address.fld_address}  <br/>
                                                        {address.fld_street}, {address.fld_landmark}, {address.fld_city} <br/>
                                                        {address.fld_state}, {address.fld_country} {address.fld_pincode} <br/>
                                                        {address.fld_country} <br/>
                                                        Mob : {address.fld_mobile} <br/>
                                                    </address>
        
                                                    <div class="address-box-action clearfix">
                                                        {/* <a href="#" class="btn btn-sm btn-link">
                                                            Edit
                                                        </a> */}
        
                                                        <a onClick={()=>{
                                                            this.setState({
                                                                SelectedBillingAddress : address
                                                            })
                                                        }} class="btn btn-sm btn-outline-secondary">
                                                            Bill Here
                                                        </a>
                                                    </div>
                                                </div>
                                                ))}
                                                {/* <div class="shipping-address-box active">
                                                    <address>
                                                        Susan Mason <br/>
                                                        123 Street Name, City Name <br/>
                                                        Los Angeles, California 03100 <br/>
                                                        United States <br/>
                                                        (123) 789-6150 <br/>
                                                    </address>
        
                                                    <div class="address-box-action clearfix">
                                                        <a href="#" class="btn btn-sm btn-link">
                                                            Edit
                                                        </a>
        
                                                        <a href="#" class="btn btn-sm btn-outline-secondary float-right">
                                                            Ship Here
                                                        </a>
                                                    </div>
                                                </div> */}
                                            </div>
                                            {/* <a href="/newaddress" class="btn btn-sm btn-outline-secondary btn-new-address">+ New Address</a> */}
                                        </li>
        
        
                                     
                                    </ul>
                                </div>
        
                              
                            </div>
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="checkout-steps-action">
                                    <button class="btn btn-sm btn-primary" type="submit" onClick={
                                            ()=>{
                                                // console.log(this.state.ShippingAddress[this.state.SelectedAddress])
                                               if(this.state.SelectedShippingAddress != ''){
                                                   if(this.state.SelectedBillingAddress != ''){
                                                    localStorage.setItem('CustomerShippingAddress',JSON.stringify(this.state.SelectedShippingAddress))
                                                    localStorage.setItem('CustomerBillingAddress',JSON.stringify(this.state.SelectedBillingAddress ))
                                                    window.location.href = '/placeorder'
                                                   }else
                                                   {
                                                    Notiflix.Notify.Failure('Please select your billing address.')  
                                                   }
                                               
                                                
                                               }
                                               else{
                                                Notiflix.Notify.Failure('Please select your shipping address.') 
                                               }
                                                   
                                                
                                             
                                            }
                                        } class="btn btn-primary float-right">NEXT</button>
                                    </div>
                                </div>
                            </div>
        
                            <div class="mb-4"></div>
                        </div>
                    </div>
                    <Footer></Footer>
            </div>
        );
    }
}

export default Checkout;