import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './Header'
import Footer from './Footer'
import GetApiCall from './GetApi'
import Parser from 'html-react-parser';


import ItemsCarousel from 'react-items-carousel';
import sa from 'lodash/range';



class HomeSample extends React.Component {

    constructor(props){
        super(props)
        this.state={
            Device: [],
            Foot: [],
            Book : [],
            activeItemIndex : 0,
            Blog : []
     
        }
    }

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

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
        })
 
          
    
    
      })
          })



          GetApiCall.getRequest("GetFootCareWeb").then((results) => {
    
            results.json().then(data => ({
              data: data,
              status: results.status
          })
      ).then(res => {
        //   console.log(res.data.data)
     
        const result = [];
        const map = new Map();
        for (const item of res.data.data) {
            if(!map.has(item.fld_footcareid)){
                map.set(item.fld_footcareid, true);    // set any value to Map
                result.push({
                    fld_footcareid: item.fld_footcareid,
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
           Foot: result,
        })
 
          
    
    
      })
          })


          GetApiCall.getRequest("GetBooksWeb").then((results) => {
    
            results.json().then(data => ({
              data: data,
              status: results.status
          })
      ).then(res => {
        //   console.log(res.data.data
     
        const result = [];
        const map = new Map();
        for (const item of res.data.data) {
            if(!map.has(item.fld_bookid)){
                map.set(item.fld_bookid, true);    // set any value to Map
                result.push({
                    fld_bookid: item.fld_bookid,
                    fld_title : item.fld_title,
                    fld_productprice : item.fld_productprice,
                    fld_discountprice : item.fld_discountprice,
                    fld_discountpercent : item.fld_discountpercent,
                    fld_photo : item.fld_photo,
                    fld_authorname : item.fld_authorname

                });
            }
        }
        // console.log(result)
        this.setState({
           Book: result,
        })
 
          
    
    
      })
          })
    

          GetApiCall.getRequest("GetBlog").then(resultdes =>
            resultdes.json().then(obj => {

               

                var arr = []
                for(var i = 0 ; i < 4 ; i ++){

                    arr.push(obj.data[i])

                    this.setState({
                        Blog : arr
                     })
                }

            }))




         
    }


truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
      }



render(){



    
  return (
    <div className="App">
      <div class="page-wrapper">
        <Menu></Menu>

        <main class="main">
                <div class="container">
                    <div class="home-slider-container">
                        <div class="home-slider owl-carousel owl-theme owl-theme-light">
                            <div class="home-slide">
                                <div class="slide-bg owl-lazy" data-src="assets/images/banners/banner-1.jpg"></div>
                                <div class="">
                                    <div class="home-slide-content">
                                      
                                       
                                        <h1>Lorem Ipsum is simply dummy text</h1>
                                        <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br/>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,<br/> when an unknown printer took a galley of type and scrambled</h3>
                                        
                                      
                                    </div>
                                </div>
                            </div>
    
                            <div class="home-slide">
                                <div class="slide-bg owl-lazy" data-src="assets/images/banners/banner-2.jpg"></div>
                                <div class="">
                                        <div class="home-slide-content">
                                      
                                       
                                            <h1>Lorem Ipsum is simply dummy text</h1>
                                            <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br/>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,<br/> when an unknown printer took a galley of type and scrambled</h3>
                                            
                                          
                                            </div>
                                </div>
                            </div>
                            <div class="home-slide">
                                <div class="slide-bg owl-lazy" data-src="assets/images/banners/banner-3.jpg"></div>
                                <div class="">
                                        <div class="home-slide-content">
                                      
                                       
                                            <h1>Lorem Ipsum is simply dummy text</h1>
                                            <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br/>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,<br/> when an unknown printer took a galley of type and scrambled</h3>
                                            
                                          
                                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container margin-top margin-bottom">
                        <h3 class="section-title">Medicines</h3>
                        <div class="row margin-top margin-bottom medicine-section">
                            <div class="col-md-4">
                                <a href="/allopathyListing">
                                <div class="medicine-box">
                                    <img src="assets/images/medicine/allopathy.jpg"/>
                                    <div class="medicine-content-box allopathy-box">
                                        <p>Allopathy</p>
                                    </div>

                                </div>
                            </a>
                            </div>
                            <div class="col-md-4">
                                    <a href="/ayurvedaListing">
                                    <div class="medicine-box">
                                            <img src="assets/images/medicine/ayurveda.jpg"/>
                                            <div class="medicine-content-box ayurveda-box">
                                                <p>Ayurveda</p>
                                            </div>
                                        </div>
                                        </a>
                            </div>
                            {/* <div class="col-md-3">
                                    <div class="medicine-box">
                                            <img src="assets/images/medicine/homeopathy.jpg"/>
                                            <div class="medicine-content-box homeopathy-box">
                                                <p>Homeopathy</p>
                                            </div>
                                        </div>
                            </div>  */}
                            <div class="col-md-4">
                                    <div class="medicine-box">
                                            <img src="assets/images/medicine/vitaminsandsuppliments.jpg"/>
                                            <div class="medicine-content-box vitamin-box">
                                                <p>Health  & Supplements</p>
                                            </div>
                                        </div>
                            </div>
                        </div>
                </div> 

                <div class="clearfix"></div>

              
                
                <div class="container">
                    <h3 class="section-title">Health Care Devices</h3>
                    <div>
                        <a href="/healthcareDeviceListing" class="view-all-btn-health">View All</a>
                    </div>
                    <div class="margin-top-position healthcare-slider">
                {/* <div class="partners-carousel owl-carousel owl-theme"> */}

                {/* <div  class="partner">
                            <img src= 'assets/images/not-avail.png'  alt="logo"/>
                            <div class="product-details">
                                <p class="product-title"><a href="/deviceDetails">qwerty</a></p>
                                <p class="small-desc">By: qwerty</p>
                                <p class="price"><span><s>&#8377;434</s></span> &#8377;666</p>
                                <p class="discount-price">You Save &#8377;23 (12%)</p>
                             
                                    <ul class="group-buttons">
                                        <li> <button href="#" class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> ADD TO CART</button></li>
                                        <li><button class="like-btn"><i class="fas fa-heart"></i></button> </li>
                                        <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li>
                                    </ul>
                                   
                            </div>
                            </div>
                            <div  class="partner">
                            <img src= 'assets/images/not-avail.png'  alt="logo"/>
                            <div class="product-details">
                                <p class="product-title"><a href="/deviceDetails">qwerty</a></p>
                                <p class="small-desc">By: qwerty</p>
                                <p class="price"><span><s>&#8377;434</s></span> &#8377;666</p>
                                <p class="discount-price">You Save &#8377;23 (12%)</p>
                             
                                    <ul class="group-buttons">
                                        <li> <button href="#" class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> ADD TO CART</button></li>
                                        <li><button class="like-btn"><i class="fas fa-heart"></i></button> </li>
                                        <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li>
                                    </ul>
                                   
                            </div>
                            </div> */}
      <ItemsCarousel
        // Placeholder configurations
        // enablePlaceholder
        // numberOfPlaceholderItems={5}
        // minimumPlaceholderTime={1000}
        // placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}

        // Carousel configurations
        infiniteLoop={false}
    gutter={12}
    // activePosition={'center'}
    chevronWidth={60}
    disableSwipe={false}
    alwaysShowChevrons={true}
    numberOfCards={6}
    slidesToScroll={1}
    outsideChevron={false}
    showSlither={true}
    firstAndLastGutter={true}
    activeItemIndex={this.state.activeItemIndex}
    requestToChangeActive={value => this.setState({ activeItemIndex: value })}
    rightChevron={<div class="slider-button healthcare-arrow-right"><button>{<i class="fas fa-chevron-right"></i>}</button></div>}
    leftChevron={<div class="slider-button healthcare-arrow-left"><button>{<i class="fas fa-chevron-left"></i>}</button></div>}
      >

        {this.state.Device.map(
                              (device,index) => (
                               
                        <div  class="partner" >
                            <div id='overlay'>Out Of Stock</div>
                            <img src={(device.fld_photo == 'null' || device.fld_photo == null || device.fld_photo == '') ? 'assets/images/not-avail.png' : device.fld_photo } alt="logo"/>
                            <div class="product-details">
                                <p class="product-title"><a href="/deviceDetails">{device.fld_itemname}</a></p>
                                <p class="small-desc">By: {device.fld_pharma}</p>
                                <p class="price"><span><s>&#8377;{device.fld_productprice}</s></span> &#8377;{device.fld_discountprice}</p>
                                <p class="discount-price">You Save &#8377;{parseFloat(device.fld_productprice - device.fld_discountprice).toFixed(2)} ({device.fld_discountpercent}%)</p>
                             <p class="brief-desc"></p>
                                    <ul class="group-buttons">
                                        <li> <button href="#" class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> ADD TO CART</button></li>
                                        <li><button class="like-btn"><i class="fas fa-heart"></i></button> </li>
                                        <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li>
                                    </ul>
                                   
                            </div>
                           
                        </div>

                      

                              ))}
      </ItemsCarousel>

         
              {/* {this.state.Device.map(
                              (device,index) => (
                               
                        <div  class="partner">
                            <img src={(device.fld_photo == 'null' || device.fld_photo == null || device.fld_photo == '') ? 'assets/images/not-avail.png' : device.fld_photo } alt="logo"/>
                            <div class="product-details">
                                <p class="product-title"><a href="/deviceDetails">{device.fld_itemname}</a></p>
                                <p class="small-desc">By: {device.fld_brand}</p>
                                <p class="price"><span><s>&#8377;{device.fld_productprice}</s></span> &#8377;{device.fld_discountprice}</p>
                                <p class="discount-price">You Save &#8377;{parseFloat(device.fld_productprice - device.fld_discountprice).toFixed(2)} ({device.fld_discountpercent}%)</p>
                             
                                    <ul class="group-buttons">
                                        <li> <button href="#" class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> ADD TO CART</button></li>
                                        <li><button class="like-btn"><i class="fas fa-heart"></i></button> </li>
                                        <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li>
                                    </ul>
                                   
                            </div>
                           
                        </div>

                      

                              ))} */}
                    
                      
                    {/* </div> */}
                </div>
                
                </div>

             
                <div class="container mb-2 mb-lg-4 mb-xl-5 healthcare-slider" style={{marginTop:'30px'}}>
                    <h2 class="title pull-left mb-3 section-title">Foot Care Essentials</h2>
                    <div>
                        <a href="/footcareListing" class="view-all-btn-products">View All</a>
                    </div>
                    {/* <div class="owl-carousel owl-theme featured-products"> */}


                    <ItemsCarousel
        // Placeholder configurations
        // enablePlaceholder
        // numberOfPlaceholderItems={5}
        // minimumPlaceholderTime={1000}
        // placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}

        // Carousel configurations
        infiniteLoop={false}
    gutter={12}
    // activePosition={'center'}
    chevronWidth={60}
    disableSwipe={false}
    alwaysShowChevrons={true}
    numberOfCards={6}
    slidesToScroll={1}
    outsideChevron={false}
    showSlither={true}
    firstAndLastGutter={true}
    activeItemIndex={this.state.activeItemIndex}
    requestToChangeActive={value => this.setState({ activeItemIndex: value })}
    requestToChangeActive={value => this.setState({ activeItemIndex: value })}
    rightChevron={<div class="slider-button healthcare-arrow-right"><button>{<i class="fas fa-chevron-right"></i>}</button></div>}
    leftChevron={<div class="slider-button healthcare-arrow-left"><button>{<i class="fas fa-chevron-left"></i>}</button></div>}
      >
                    {this.state.Foot.map(
                              (foot,index) => (

                        <div class="partner">
                           
                                <img src={(foot.fld_photo == 'null' || foot.fld_photo == null || foot.fld_photo == '') ? 'assets/images/not-avail.png' : foot.fld_photo } alt="product"/>
                                             
                               
                                
                              
                           
                            <div class="product-details">
                               
                                    <p class="product-title" >
                                        <a href="">{this.truncate(foot.fld_itemname, 50)}</a></p>
                               
                                    <p class="small-desc">By: {foot.fld_pharma}</p>
                                    <p class="price"><span><s>&#8377;{foot.fld_productprice}</s></span> &#8377;{foot.fld_discountprice}</p>
                                    <p class="discount-price">You Save &#8377;{parseFloat(foot.fld_productprice - foot.fld_discountprice).toFixed(2)} ({foot.fld_discountpercent}%)</p>
                                   
                               
                                    <p class="brief-desc"></p>
                                    <ul class="group-buttons">
                                        <li> <button href="#" class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> ADD TO CART</button></li>
                                        <li><button class="like-btn"><i class="fas fa-heart"></i></button> </li>
                                        <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li>
                                    </ul>
                            </div>
                        </div>

                        ))}
                      </ItemsCarousel>
                    {/* </div> */}
                </div>

                <div class="container" style={{marginTop:'30px'}}>
                        <h3 class="section-title">Diagnostic Labs</h3>
                        <div>
                            <a href="/labDetails" class="view-all-btn-labs">View All</a>
                        </div>
                        <div class="margin-top-position bg-white">
                    <div class="labs owl-carousel owl-theme">
                        <a href="/labDetails" class="partner">
                            <img src="assets/images/labs/lalpath.png" alt="logo"/>
                            <p class="book-title">Dr. Lal PathLabs Ltd.</p>
                        </a>
                        <a href="/labDetails" class="partner">
                                <img src="assets/images/labs/maxlab.png" alt="logo"/>
                                <p class="book-title">Max Lab</p>
                            </a>
                            <a href="/labDetails" class="partner">
                                    <img src="assets/images/labs/medanta.png" alt="logo"/>
                                    <p class="book-title">Medanta The Medicity</p>
                                </a>
                                <a href="/labDetails" class="partner">
                                        <img src="assets/images/labs/metropolis.png" alt="logo"/>
                                        <p class="book-title">Metropolis Laboratories</p>
                                    </a>
                                    <a href="/labDetails" class="partner">
                                            <img src="assets/images/labs/srl.png" alt="logo"/>
                                            <p class="book-title">SRL Limited</p>
                                        </a>
                                        <a href="/labDetails" class="partner">
                                                <img src="assets/images/labs/thyrocare.png" alt="logo"/>
                                                <p class="book-title">Thyrocare Laboratories Ltd.</p>
                                            </a>
                                            <a href="/labDetails" class="partner">
                                                <img src="assets/images/labs/lalpath.png" alt="logo"/>
                                                <p class="book-title">Dr. Lal PathLabs Ltd.</p>
                                            </a>
                                            <a href="/labDetails" class="partner">
                                                    <img src="assets/images/labs/maxlab.png" alt="logo"/>
                                                    <p class="book-title">Max Lab</p>
                                                </a>
                                                <a href="/labDetails" class="partner">
                                                        <img src="assets/images/labs/medanta.png" alt="logo"/>
                                                        <p class="book-title">Medanta The Medicity</p>
                                                    </a>
                               
                        </div>
                    </div>
                    </div>

                <div class="container margin-top margin-bottom healthcare-slider">
                        <h3 class="section-title margin-bottom">Books</h3>
                        <div>
                            <a href="/bookListing" class="view-all-btn-book">View All</a>
                           
                        </div>
                        {/* <div class="books-carousel owl-carousel owl-theme"> */}
                          

                                <div class="book-section-bg">
                        <ItemsCarousel
        // Placeholder configurations
        // enablePlaceholder
        // numberOfPlaceholderItems={5}
        // minimumPlaceholderTime={1000}
        // placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}

        // Carousel configurations
        infiniteLoop={false}
    gutter={12}
    // activePosition={'center'}
    chevronWidth={60}
    disableSwipe={false}
    alwaysShowChevrons={true}
    numberOfCards={6}
    slidesToScroll={1}
    outsideChevron={false}
    showSlither={true}
    firstAndLastGutter={true}
    activeItemIndex={this.state.activeItemIndex}
    requestToChangeActive={value => this.setState({ activeItemIndex: value })}
    rightChevron={<div class="slider-button healthcare-arrow-right"><button>{<i class="fas fa-chevron-right"></i>}</button></div>}
    leftChevron={<div class="slider-button healthcare-arrow-left"><button>{<i class="fas fa-chevron-left"></i>}</button></div>}
      >

                        {this.state.Book.map(
                              (book,index) => (
                            <div class="partners book">
                               <img src={(book.fld_photo == 'null' || book.fld_photo == null || book.fld_photo == '') ? 'assets/images/not-avail.png' : book.fld_photo }/>
                               {/* <div class="button"><a href="/bookDetails"> Quick View </a></div> */}
                                <div class="product-details">
                              <p class="product-title">{book.fld_title}</p>
<p class="price"><span><s>&#8377;{book.fld_productprice}</s></span> &#8377;{book.fld_discountprice}</p>
                              <p class="author-name">By <span>{book.fld_authorname}</span></p>
                              <p class="discount-price">You Save &#8377;{parseFloat(book.fld_productprice - book.fld_discountprice).toFixed(2)} ({book.fld_discountpercent}%)</p>
                              <p class="brief-desc"></p>
                                    <ul class="group-buttons">
                                            <li> <button href="#" class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> ADD TO CART</button></li>
                                            <li><button class="like-btn"><i class="fas fa-heart"></i></button> </li>
                                            <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li>
                                        </ul>
                              </div>
                                </div>
                                
                              ))}
                               
                         </ItemsCarousel> 
                         </div>     
                        {/* </div> */}
                </div>

                <div class="clearfix"></div>

                <div class="container margin-bottom brands-slider" style={{marginTop:'30px'}}>
                        <h3 class="section-title">Brands</h3>
                        <div>
                            <a href="/bookListing" class="view-all-btn-partners">View All</a>
                        </div>
                        <div class="margin-top-position bg-white">
                    <div class="partners-carousel-brands owl-carousel owl-theme">
                        <a href="#" class="partner">
                            <img src="assets/images/logo/aurobindo.png" alt="logo"/>
                        </a>
                        <a href="#" class="partner">
                            <img src="assets/images/logo/cipla.png" alt="logo"/>
                        </a>
                        <a href="#" class="partner">
                                <img src="assets/images/logo/mylan.png" alt="logo"/>
                            </a>
                            <a href="#" class="partner">
                                    <img src="assets/images/logo/reddy.png" alt="logo"/>
                                </a>
                                <a href="#" class="partner">
                                        <img src="assets/images/logo/torrent.png" alt="logo"/>
                                    </a>
                           
                                    <a href="#" class="partner">
                                            <img src="assets/images/logo/sun-pharma.png" alt="logo"/>
                                        </a>
                                        <a href="#" class="partner">
                                            <img src="assets/images/logo/aurobindo.png" alt="logo"/>
                                        </a>
                                        <a href="#" class="partner">
                                            <img src="assets/images/logo/cipla.png" alt="logo"/>
                                        </a>
                                        <a href="#" class="partner">
                                                <img src="assets/images/logo/mylan.png" alt="logo"/>
                                            </a>
                               
                        </div>
                    </div>
                    </div>
    
                    <div class="app-section margin-top margin-bottom">
                        <div class="row app-section-bg">
                            <div class="col-md-6">
                                    <img src="assets/images/mobile.png" class="app-image"/>
                                    <h3 class="app-title">Download App</h3>
                                    <p class="app-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                                    <ul class="app-list-images">
                                        <li><img src="assets/images/android.png"/></li>
                                        <li><img src="assets/images/apple.png" style={{width:'165px'}}/></li>
                                    </ul>
                                </div>
                            <div class="col-md-6 border-left-shadow">
                                <h3 class="app-title center-block text-center">Testimonials</h3>
                                <div class="testimonial-slider owl-carousel owl-theme">
                                    <div class="testimonial center-block">
                                        <img src="http://magento2.codazon.com/unlimited/pub/media/wysiwyg/codazon/main-content-01/testimonial/test-02.jpg" class="user-image center-block"/>
                                        <p class="user-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                                        <p class="user-name">Charles K. Silvey
                                        </p>
                                    </div>
                                    <div class="testimonial center-block">
                                        <img src="http://magento2.codazon.com/unlimited/pub/media/wysiwyg/codazon/main-content-01/testimonial/test-03.jpg" class="user-image center-block"/>
                                        <p class="user-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                                        <p class="user-name">Charles K. Silvey
                                        </p>
                                    </div>
                                    <div class="testimonial center-block">
                                        <img src="http://magento2.codazon.com/unlimited/pub/media/wysiwyg/codazon/main-content-01/testimonial/test-02.jpg" class="user-image center-block"/>
                                        <p class="user-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                                        <p class="user-name">Charles K. Silvey
                                        </p>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>

                    </div>

                <div class="container blog-section">
                    <h2 class="title pull-left mb-3 section-title">Health Information</h2>
                    <div>
                        <a href="#" class="view-all-btn">View All</a>
                    </div>
                    <div class="row">

                    {this.state.Blog.map(
                              (blog,index) => (

                        <div class="col-md-3">
                            <div class="blog-box">
                               
                                <img src={blog.fld_coverimage}/>
                            
                                <span class="grid-item-date">
                              <span class="grid-item-day">{blog.fld_updateon.split(' ')[1].split(',')[0]}</span>
                                        <span class="grid-item-month">{blog.fld_updateon.split(' ')[0]}</span>
                                    </span>
                                <div class="content-box">
                              <h3>{blog.fld_title}</h3>
                              <p class="name-title"><span>By</span> {blog.fld_bywhom}</p>
                              <p>{Parser(('<p>'+blog.fld_shortdescription+'</p>').replace(/font-family/g, '').replace(/color/g, ''))}</p>
                                <ul class="comments-list" style={{marginBottom:'0px'}}>
                                    <li> 
                              <a href=""><i class="fas fa-thumbs-up"></i> {blog.fld_likecount}</a>
                                    </li>
                                    <li> 
                              <a href=""><i class="fas fa-comments"></i> {blog.fld_commentcount}</a>
                                        </li>   
                                    <li style={{float:'right'}}>
                                            <a href="" class="read-more-btn">Read More</a>
                                        </li>
                                </ul>
                                </div>
                            </div>
                        </div>

                              ))}
                       
                        {/* <div class="col-md-3">
                                <div class="blog-box">
                                    <img src="https://demo.imithemes.com/vestige-wp/wp-content/uploads/sites/5/2015/07/image5.jpg"/>
                                    <span class="grid-item-date">
                                            <span class="grid-item-day">20</span>
                                            <span class="grid-item-month">Jul</span>
                                        </span>
                                    <div class="content-box">
                                        <h3>Painting the imaginations</h3>
                                        <p class="name-title"><span>By</span> BeatMySugar</p>
                                        <p>Dolphins have a streamlined fusiform body, adapted for fast swimming. The tail fin, called the fluke, is used for propulsion while the pectoral fins, together</p>
                                    <ul class="comments-list"  style={{marginBottom:'0px'}}>
                                            <li> 
                                                    <a href="#"><i class="fas fa-thumbs-up"></i> 3</a>
                                                </li>
                                        <li> 
                                            <a href=""><i class="fas fa-comments"></i> 3</a>
                                        </li>
                                        <li style={{float:'right'}}>
                                                <a href="#" class="read-more-btn">Read More</a>
                                            </li>
                                    </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3">
                                    <div class="blog-box">
                                        <img src="https://demo.imithemes.com/vestige-wp/wp-content/uploads/sites/5/2015/07/image7.jpg"/>
                                        <span class="grid-item-date">
                                                <span class="grid-item-day">20</span>
                                                <span class="grid-item-month">Jul</span>
                                            </span>
                                        <div class="content-box">
                                            <h3>Painting the imaginations</h3>
                                            <p class="name-title"><span>By</span> BeatMySugar</p>
                                            <p>Dolphins have a streamlined fusiform body, adapted for fast swimming. The tail fin, called the fluke, is used for propulsion while the pectoral fins, together</p>
                                        <ul class="comments-list" style={{marginBottom:'0px'}}>
                                                <li> 
                                                        <a href=""><i class="fas fa-thumbs-up"></i> 3</a>
                                                    </li>
                                            <li> 
                                                <a href=""><i class="fas fa-comments"></i> 3</a>
                                            </li>
                                            <li style={{float:'right'}}>
                                                    <a href="" class="read-more-btn">Read More</a>
                                                </li>
                                        </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                        <div class="blog-box">
                                            <img src="https://demo.imithemes.com/vestige-wp/wp-content/uploads/sites/5/2015/07/image5.jpg"/>
                                            <span class="grid-item-date">
                                                    <span class="grid-item-day">20</span>
                                                    <span class="grid-item-month">Jul</span>
                                                </span>
                                            <div class="content-box">
                                                <h3>Painting the imaginations</h3>
                                                <p class="name-title"><span>By</span> BeatMySugar</p>
                                                <p>Dolphins have a streamlined fusiform body, adapted for fast swimming. The tail fin, called the fluke, is used for propulsion while the pectoral fins, together</p>
                                            <ul class="comments-list" style={{marginBottom:'0px'}}>
                                                    <li> 
                                                            <a href=""><i class="fas fa-thumbs-up"></i> 3</a>
                                                        </li>
                                                <li> 
                                                    <a href=""><i class="fas fa-comments"></i> 3</a>
                                                </li>
                                                <li style={{float:'right'}}>
                                                        <a href="" class="read-more-btn">Read More</a>
                                                    </li>
                                            </ul>
                                            </div>
                                        </div>
                                    </div> */}
                    </div>

                </div>

                <div class="container margin-top">
                        
                    </div>
            </main>
         <Footer></Footer>
                </div>
                </div>
    
   
  );
}
}

export default HomeSample;
