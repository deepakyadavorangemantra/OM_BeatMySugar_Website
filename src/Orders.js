import React from 'react';
import Menu from './Header'
import Footer from './Footer'

class AyurvedaListing extends React.Component
{
    render()
    {
        return (
            <div>
                <Menu></Menu>
                  <div class="container doctors-section">
                <div class="container-box">
                    <div class="row mt-2">
                        <div class="col-lg-9 order-lg-last dashboard-content">
                            <h2>My Orders</h2>

                          

                           

                          
                            <div class="card">
                                <div class="card-header">
                                    Order Placed - 15 October 2019
                                    <span class="order-total">Total : &#8377;300</span>
                                    <a href="#" class="card-edit">Edit</a>
                                </div>

                                <div class="card-body">
                                    <div class="row">
                                       <div class="col-md-2">
                                           <img src="assets/images/bgr.jpg" class="order-image"/>
                                       </div>
                                       <div class="col-md-8">
                                           <h4 class="order-name">BGR 10 STRIPS</h4>
                                           <p class="order-by">By : Accu check </p>
                                           <h5 class="delivery-status">Delivered</h5>
                                           <p class="order-address">Address: Pio Printers pvt ltd, 83,East madha church street, Royapuram., CHENNAI, TAMIL NADU 600013</p>
                                            <p class="order-price">&#8377;300.00</p>
                                        </div>
                                        <div class="col-md-2">
                                            <a href="" class="buy-btn">Buy it again</a>
                                            <a href="" class="buy-btn">Cancel Order</a>
                                            <a href="" class="buy-btn">Return Order</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <aside class="sidebar col-lg-3">
                            <div class="widget widget-dashboard">
                                <h3 class="widget-title">My Account</h3>

                                <ul class="list">
                                    <li class="active"><a href="#">Account Dashboard</a></li>
                                  
                                  
                                    <li><a href="#">My Orders</a></li>
                                  
                                    <li><a href="#">My Tags</a></li>
                                    <li><a href="#">My Wishlist</a></li>
                                   
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>     
              
            </div>
            <Footer></Footer>
            </div>
        );
    }
}

export default AyurvedaListing;