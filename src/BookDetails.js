import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import Parser from "html-react-parser";

import PostApiCall from "./Api";
import Notiflix from "notiflix-react";

import GetApiCall from "./GetApi";
import moment from "moment";

import ReactImageMagnify from "react-image-magnify";

class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Book: [],
      quantity: 1,
      Photo: [],
      selectedBook: "",
    };
  }
  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    });

    // Notiflix.Loading.Dots("");

    PostApiCall.postRequest(
      {
        book_id: this.props.match.params.bookid.split("-")[0],
      },
      "GetBookDetailsWebsite"
    ).then((results) =>
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {
          this.setState({
            Book: obj.data[0],
          });
          if (obj.data[0].Photo != null && obj.data[0].Photo != "") {
            this.setState({
              Photo: obj.data[0].Photo.split(","),
            });
          }
        }

        Notiflix.Loading.Remove();
      })
    );
  }

  AddToCart() {
    // console.log(this.state.Book)

    var log = localStorage.getItem("CustomerLogin");
    var login = JSON.parse(log);

    if (login != null && login != "") {
      Notiflix.Loading.Dots("");

      PostApiCall.postRequest(
        {
          customer_id: login.fld_userid,
          // customer_id : 13,
          product_id: this.state.Book.fld_bookid,
          product_category: "Books",
          value: this.state.Book.fld_discountprice,
          number_of_items: this.state.quantity,
          updated_on: moment().format("lll").toString(),
          updated_by: login.fld_userid,
          // updated_by :13
        },
        "AddShoppingCart"
      ).then((results) =>
        // const objs = JSON.parse(result._bodyText)
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Info("Product Added to Cart");
            window.location.reload();
          } else {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Failure("Something went wrong, try again later.");
          }
        })
      );
    } else {
      // console.log('please login first')
      Notiflix.Notify.Failure("Please Login to add Products to your cart.");
    }
  }

  AddWishlist() {
    // console.log(this.state.Book)

    var log = localStorage.getItem("CustomerLogin");
    var login = JSON.parse(log);

    if (login != null && login != "") {
      Notiflix.Loading.Dots("");

      PostApiCall.postRequest(
        {
          customer_id: login.fld_userid,
          // customer_id : 13,
          product_id: this.state.Book.fld_bookid,
          product_category: "Books",
          value: this.state.Book.fld_discountprice,
          number_of_items: this.state.quantity,
          updated_on: moment().format("lll").toString(),
          updated_by: login.fld_userid,
          // updated_by :13
        },
        "AddWishlist"
      ).then((results) =>
        // const objs = JSON.parse(result._bodyText)
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Info("Product Added to Wishlist");
            window.location.reload();
          } else {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Failure("Something went wrong, try again later.");
          }
        })
      );
    } else {
      // console.log('please login first')
      Notiflix.Notify.Failure("Please Login to add Products to your wishlist.");
    }
  }

  render() {
    return (
      <div>
        <Menu></Menu>
        <div class="container ad-banner">
          <img src="../assets/images/images.png"></img>
        </div>
        <div class="container">
          <div class="container-box" style={{ marginTop: "40px" }}>
            <div class="row">
              <div class="col-lg-9">
                <div class="product-single-container product-single-default">
                  <div class="row">
                    {/* <ReactImageMagnify {...{
                                                        smallImage: {
                                                            alt: 'Wristwatch by Ted Baker London',
                                                            isFluidWidth: true,
                                                            src: this.state.selectedBook,
                                                        },
                                                        largeImage: {
                                                            src: this.state.selectedBook,
                                                            width: 1200,
                                                            height: 1800
                                                        }
                                                    }} /> */}
                    <div class="col-lg-1 col-md-1">
                      <div class="image-list">
                        <img src="../assets/images/cauliflowerbook.jpg"></img>{" "}
                        <img src=" https://backoffice.beatmysugar.com/Images/Books/Books-DB352.png"></img>{" "}
                        <img src=" https://backoffice.beatmysugar.com/Images/Books/Books-DB352.png"></img>
                      </div>
                    </div>
                    <div class="col-lg-5 col-md-5 product-single-gallery">
                      <div class="product-slider-container product-item">
                        <div class="product-item product-single-image">
                          <ReactImageMagnify
                            {...{
                              smallImage: {
                                alt: "Wristwatch by Ted Baker London",
                                isFluidWidth: true,
                                src: "../assets/images/square-footwear.png",
                                width: 200,
                                height: 200,
                              },
                              largeImage: {
                                src: "../assets/images/cauliflowerbook.jpg",
                                width: 1000,
                                height: 1500,
                                zIndex: 999,
                              },
                              lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
                              isHintEnabled: true,
                              shouldHideHintAfterFirstActivation: false,
                              enlargedImageContainerDimensions: {
                                width: "150%",
                                height: "80%",
                                zIndex: 999,
                              },
                            }}
                          />
                        </div>

                        {/* {this.state.Photo.map(
                                                  (book,index) => (

                                                    
                                                <div class="product-item">
                                                    <img class="product-single-image" src={book} onMouseOver={()=>{
                                                        console.log(book)
                                                    }}/>
                                                </div>
                                                  ))} */}
                        {/* <div class="product-item">
                                                    <img class="product-single-image" src="assets/images/cauliflowerbook.jpg" data-zoom-image="assets/images/cauliflowerbook.jpg"/>
                                                </div>
                                                <div class="product-item">
                                                        <img class="product-single-image" src="assets/images/cauliflowerbook.jpg" data-zoom-image="assets/images/cauliflowerbook.jpg"/>
                                                    </div>
                                                    <div class="product-item">
                                                        <img class="product-single-image" src="assets/images/cauliflowerbook.jpg" data-zoom-image="assets/images/cauliflowerbook.jpg"/>
                                                    </div> */}

                        {/* </div>
                                           
                                            <span class="prod-full-screen">
                                                <i class="icon-plus"></i>
                                            </span>
                                        </div>
                                        <div class="prod-thumbnail row owl-dots" id='carousel-custom-dots'>
                                        {this.state.Photo.map(
                                                  (book,index) => (

                                            <div class="col-3 owl-dot">
                                                <img src={book}/>
                                            </div>
                                                  ))} */}
                        {/* <div class="col-3 owl-dot">
                                                <img src="assets/images/cauliflowerbook.jpg"/>
                                            </div>
                                            <div class="col-3 owl-dot">
                                                    <img src="assets/images/cauliflowerbook.jpg"/>
                                                </div>
                                                <div class="col-3 owl-dot">
                                                    <img src="assets/images/cauliflowerbook.jpg"/>
                                                </div> */}
                      </div>
                    </div>

                    <div class="col-lg-5 col-md-5">
                      <div class="product-single-details">
                        <p class="item-code"></p>
                        <h1 class="product-title">
                          The Cauliflower Diet - Revolutionery way to lose diet
                        </h1>

                        <div class="ratings-container">
                        <span>
                            {" "}
                            <a href="#" class="rating-link">
                              {" "}
                              <span class="company-name">SKU12012</span>
                            </a>
                          </span>
                          <span>
                            {" "}
                            <a href="#" class="rating-link">
                              Author{" "}
                              <span class="company-name">Radha Thomas</span>
                            </a>
                          </span>
                          <span>
                            {" "}
                            <a href="#" class="rating-link">
                              Published By{" "}
                              <span class="company-name">Global Trendz</span>
                            </a>
                          </span>
                        </div>

                        {/* <p>
                          <span class="product-price">&#8377; 700.00</span>
                          <p class="extrapheight"></p>
                        </p> */}

                        <p>
                        
                        <div class="price-box">
                          <span class="product-price">&#8377; 500.00</span>
                          <span class="old-price">
                            <strike>&#8377;700.00</strike>
                          </span>
                          
                        </div>
                        
                        <p class="discount-price"><span class="old-price old-price-updated" style={{padding:"0px"}}> 20% discount </span>You Save &#8377; 200.00</p>
                        
                        </p>

                        <div class="product-desc">
                          <p>
                            <b>Available as</b>
                          </p>
                          <p class="dashed-border">Paper Back</p>
                          {/* <select class="book-size">
                                                        <option>Select</option>
                                                        <option>Papper Back</option>
                                                    <option>E-Book</option>
                                                   
                                                </select> */}
                        </div>
                        <div class="product-desc">
                          <p>
                            <b>Language</b>
                          </p>
                          <p class="dashed-border"> English</p>
                          {/* <select class="book-size">
                                                        <option>Select</option>
                                                        <option>Papper Back</option>
                                                    <option>E-Book</option>
                                                   
                                                </select> */}
                        </div>
                        <br />
                       

                     
                     <ul class="product-list">
                                                  <li class="stock" >In Stock</li>
                                                    <li class="return" >
                                                            <i class="fas fa-times-circle"></i> Not Returnable
                                                    </li>
                                                </ul> 

                        <ul class="product-list">
                          <li
                            class="stock"
                            style={{
                              display:
                                this.state.Book.fld_availability == "Instock"
                                  ? ""
                                  : "none",
                            }}
                          >
                            {" "}
                            In Stock <span style={{ color: "#bdbdbd" }}>|</span>
                          </li>
                          <li
                            class="return"
                            style={{
                              display:
                                this.state.Book.fld_returnable == "No"
                                  ? ""
                                  : "none",
                            }}
                          >
                            <i class="fas fa-times-circle"></i> Not Returnable
                          </li>
                          <li
                            class="return"
                            style={{
                              display:
                                this.state.Book.fld_availability == "Outofstock"
                                  ? ""
                                  : "none",
                            }}
                          >
                            <i class="fas fa-times-circle"></i> Out Of Stock{" "}
                            <span style={{ color: "#bdbdbd" }}>|</span>
                          </li>
                          <li
                            class="return"
                            style={{
                              display:
                                this.state.Book.fld_availability == "Banned"
                                  ? "none"
                                  : "none",
                            }}
                          >
                            Banned
                          </li>
                          <li
                            class="return"
                            style={{
                              display:
                                this.state.Book.fld_availability ==
                                "Discontinued"
                                  ? "none"
                                  : "none",
                            }}
                          >
                            Discontinued
                          </li>
                          <li
                            class="returnable"
                            style={{
                              display:
                                this.state.Book.fld_returnable == "Yes"
                                  ? ""
                                  : "none",
                            }}
                          >
                            Returnable
                          </li>
                        </ul>

                        <div class="product-action product-all-icons">
                          <div class="product-single-qty">
                            <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                              <span class="input-group-btn input-group-prepend">
                                <button
                                  class="btn btn-outline btn-down-icon bootstrap-touchspin-down"
                                  type="button"
                                  onClick={() => {
                                    if (this.state.quantity > 1) {
                                      this.setState({
                                        quantity: this.state.quantity - 1,
                                      });
                                    }
                                  }}
                                ></button>
                              </span>
                              <input
                                class="quantity-box"
                                type="text"
                                value={this.state.quantity}
                              />
                              <span class="input-group-btn input-group-append">
                                <button
                                  class="btn btn-outline btn-up-icon bootstrap-touchspin-up"
                                  type="button"
                                  onClick={() => {
                                    this.setState({
                                      quantity: this.state.quantity + 1,
                                    });
                                  }}
                                ></button>
                              </span>
                            </div>
                          </div>

                          <a
                            class="paction add-cart"
                            title="Add to Cart"
                            style={{
                              display:
                                this.state.Book.fld_availability ==
                                  "Outofstock" ||
                                this.state.Book.fld_availability == "Banned" ||
                                this.state.Book.fld_availability ==
                                  "Discontinued"
                                  ? "none"
                                  : "",
                            }}
                            onClick={this.AddToCart.bind(this)}
                          >
                            <span>Add to Cart</span>
                          </a>
                          <a
                            onClick={this.AddWishlist.bind(this)}
                            class="paction add-wishlist"
                            title="Add to Wishlist"
                          >
                            <span>Add to Wishlist</span>
                          </a>
                          {/* <a href="#" class="paction add-compare" title="Add to Compare">
                                                    <span>Add to Compare</span>
                                                </a> */}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 detail-description">
                   <h4>About Book</h4>
                   <p style={{textAlign: "justify"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

</p>
<h4>
                          About Author
                          </h4>
                          <p>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


                          </p>
                 </div>
                  </div>
                </div>
              </div>

              <div class="sidebar-overlay"></div>
              <div class="sidebar-toggle">
                <i class="icon-sliders"></i>
              </div>
              <aside class="sidebar-product col-lg-3 padding-left-lg mobile-sidebar">
                <div class="sidebar-wrapper">
                  <div class="widget widget-info">
                    <ul>
                      <li>
                        <i class="icon-shipping"></i>
                        <h4>
                          FREE
                          <br />
                          SHIPPING
                        </h4>
                      </li>
                      <li>
                        <i class="icon-us-dollar"></i>
                        <h4>
                          100% MONEY
                          <br />
                          BACK GUARANTEE
                        </h4>
                      </li>
                      <li>
                        <i class="icon-online-support"></i>
                        <h4>
                          ONLINE
                          <br />
                          SUPPORT 24/7
                        </h4>
                      </li>
                    </ul>
                  </div>

                  <div class="widget widget-banner">
                    <div class="banner banner-image">
                      <a href="#">
                        <img
                          src="/assets/images/banners/banner-sidebar.jpg"
                          alt="Banner Desc"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div class="container doctors-section food-section">
          <h3 class="section-title">Related Products</h3>
          <div class="row ">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-2">
                  <div class="partner partner-inner-page">
                    <div id="overlay" style={{}}>
                      Out Of Stock
                    </div>
                    <img
                      src={"../assets/images/cauliflowerbook.jpg"}
                      alt="product"
                      class="footcare-image img-center"
                    />

                    <div class="product-details">
                      <p class="product-title">
                        <a>Lorem Ipsum</a>
                      </p>
                      <p class="small-desc item-name"><span style={{color:"#222222",fontWeight:"600"}}>Author:</span> Radha Thomas</p>

                      {/* <p class="product-info">Box of 400 gm Powder</p> */}
                      {/* <p>
                      <p class="price"> &#8377; 200.00</p>
                      <p class="extrapheight"></p>
                    </p> */}
                      <p>
                        <p class="price">
                        
                          &#8377; 150.00
                          {" "} <span>
                            <s>&#8377; 200.00</s>
                          </span>
                        </p>
                        <p class="discount-price">20% discount, You Save &#8377; 20</p>
                      </p>
                     
                      <ul class="group-buttons">
                        <li>
                          {" "}
                          <button href="#" class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"></i> ADD TO CART
                          </button>
                        </li>
                        <li>
                          <button class="like-btn">
                            <i class="fas fa-heart"></i>
                          </button>{" "}
                        </li>
                        {/* <li>
                          <button class="like-btn">
                            <i class="fas fa-info-circle"></i>
                          </button>{" "}
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="partner partner-inner-page">
                    <div id="overlay" style={{}}>
                      Out Of Stock
                    </div>
                    <img
                      src={"../assets/images/cauliflowerbook.jpg"}
                      alt="product"
                      class="footcare-image img-center"
                    />

                    <div class="product-details">
                      <p class="product-title">
                        <a>Lorem Ipsum</a>
                      </p>
                      <p class="small-desc item-name"><span style={{color:"#222222",fontWeight:"600"}}>Author:</span> Radha Thomas</p>

                      {/* <p class="product-info">Box of 400 gm Powder</p> */}
                      {/* <p>
                      <p class="price"> &#8377; 200.00</p>
                      <p class="extrapheight"></p>
                    </p> */}
                      <p>
                        <p class="price">
                        
                          &#8377; 150.00
                          {" "} <span>
                            <s>&#8377; 200.00</s>
                          </span>
                        </p>
                        <p class="discount-price">20% discount, You Save &#8377; 20</p>
                      </p>
                     
                      <ul class="group-buttons">
                        <li>
                          {" "}
                          <button href="#" class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"></i> ADD TO CART
                          </button>
                        </li>
                        <li>
                          <button class="like-btn">
                            <i class="fas fa-heart"></i>
                          </button>{" "}
                        </li>
                        {/* <li>
                          <button class="like-btn">
                            <i class="fas fa-info-circle"></i>
                          </button>{" "}
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="partner partner-inner-page">
                    <div id="overlay" style={{}}>
                      Out Of Stock
                    </div>
                    <img
                      src={"../assets/images/cauliflowerbook.jpg"}
                      alt="product"
                      class="footcare-image img-center"
                    />

                    <div class="product-details">
                      <p class="product-title">
                        <a>Lorem Ipsum</a>
                      </p>
                      <p class="small-desc item-name"><span style={{color:"#222222",fontWeight:"600"}}>Author:</span> Radha Thomas</p>

                      {/* <p class="product-info">Box of 400 gm Powder</p> */}
                      {/* <p>
                      <p class="price"> &#8377; 200.00</p>
                      <p class="extrapheight"></p>
                    </p> */}
                      <p>
                        <p class="price">
                        
                          &#8377; 150.00
                          {" "} <span>
                            <s>&#8377; 200.00</s>
                          </span>
                        </p>
                        <p class="discount-price">20% discount, You Save &#8377; 20</p>
                      </p>
                     
                      <ul class="group-buttons">
                        <li>
                          {" "}
                          <button href="#" class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"></i> ADD TO CART
                          </button>
                        </li>
                        <li>
                          <button class="like-btn">
                            <i class="fas fa-heart"></i>
                          </button>{" "}
                        </li>
                        {/* <li>
                          <button class="like-btn">
                            <i class="fas fa-info-circle"></i>
                          </button>{" "}
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="col-md-2">
                  <div class="partner partner-inner-page">
                    <div id="overlay" style={{}}>
                      Out Of Stock
                    </div>
                    <img
                      src={"../assets/images/cauliflowerbook.jpg"}
                      alt="product"
                      class="footcare-image img-center"
                    />

                    <div class="product-details">
                      <p class="product-title">
                        <a>Lorem Ipsum</a>
                      </p>
                      <p class="small-desc item-name"><span style={{color:"#222222",fontWeight:"600"}}>Author:</span> Radha Thomas</p>

                      {/* <p class="product-info">Box of 400 gm Powder</p> */}
                      {/* <p>
                      <p class="price"> &#8377; 200.00</p>
                      <p class="extrapheight"></p>
                    </p> */}
                      <p>
                        <p class="price">
                        
                          &#8377; 150.00
                          {" "} <span>
                            <s>&#8377; 200.00</s>
                          </span>
                        </p>
                        <p class="discount-price">20% discount, You Save &#8377; 20</p>
                      </p>
                     
                      <ul class="group-buttons">
                        <li>
                          {" "}
                          <button href="#" class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"></i> ADD TO CART
                          </button>
                        </li>
                        <li>
                          <button class="like-btn">
                            <i class="fas fa-heart"></i>
                          </button>{" "}
                        </li>
                        {/* <li>
                          <button class="like-btn">
                            <i class="fas fa-info-circle"></i>
                          </button>{" "}
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="col-md-2">
                  <div class="partner partner-inner-page">
                    <div id="overlay" style={{}}>
                      Out Of Stock
                    </div>
                    <img
                      src={"../assets/images/cauliflowerbook.jpg"}
                      alt="product"
                      class="footcare-image img-center"
                    />

                    <div class="product-details">
                      <p class="product-title">
                        <a>Lorem Ipsum</a>
                      </p>
                      <p class="small-desc item-name"><span style={{color:"#222222",fontWeight:"600"}}>Author:</span> Radha Thomas</p>

                      {/* <p class="product-info">Box of 400 gm Powder</p> */}
                      {/* <p>
                      <p class="price"> &#8377; 200.00</p>
                      <p class="extrapheight"></p>
                    </p> */}
                      <p>
                        <p class="price">
                        
                          &#8377; 150.00
                          {" "} <span>
                            <s>&#8377; 200.00</s>
                          </span>
                        </p>
                        <p class="discount-price">20% discount, You Save &#8377; 20</p>
                      </p>
                     
                      <ul class="group-buttons">
                        <li>
                          {" "}
                          <button href="#" class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"></i> ADD TO CART
                          </button>
                        </li>
                        <li>
                          <button class="like-btn">
                            <i class="fas fa-heart"></i>
                          </button>{" "}
                        </li>
                        {/* <li>
                          <button class="like-btn">
                            <i class="fas fa-info-circle"></i>
                          </button>{" "}
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="col-md-2">
                  <div class="partner partner-inner-page">
                    <div id="overlay" style={{}}>
                      Out Of Stock
                    </div>
                    <img
                      src={"../assets/images/cauliflowerbook.jpg"}
                      alt="product"
                      class="footcare-image img-center"
                    />

                    <div class="product-details">
                      <p class="product-title">
                        <a>Lorem Ipsum</a>
                      </p>
                      <p class="small-desc item-name"><span style={{color:"#222222",fontWeight:"600"}}>Author:</span> Radha Thomas</p>

                      {/* <p class="product-info">Box of 400 gm Powder</p> */}
                      {/* <p>
                      <p class="price"> &#8377; 200.00</p>
                      <p class="extrapheight"></p>
                    </p> */}
                      <p>
                        <p class="price">
                        
                          &#8377; 150.00
                          {" "} <span>
                            <s>&#8377; 200.00</s>
                          </span>
                        </p>
                        <p class="discount-price">20% discount, You Save &#8377; 20</p>
                      </p>
                     
                      <ul class="group-buttons">
                        <li>
                          {" "}
                          <button href="#" class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"></i> ADD TO CART
                          </button>
                        </li>
                        <li>
                          <button class="like-btn">
                            <i class="fas fa-heart"></i>
                          </button>{" "}
                        </li>
                        {/* <li>
                          <button class="like-btn">
                            <i class="fas fa-info-circle"></i>
                          </button>{" "}
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-box container-box-lg info-boxes container">
                                        <div class="row">
                                          <div class="col-md-12">
                                          
                                         <p style={{textAlign:"justify",fontSize:"13px"}}><b>Disclaimer:</b> Books sold by Vendors on the website are not intended as a substitute for medical advice from physicians/doctors. The reader should regularly consult a physician/doctor in matters relating to his/her health and particularly with respect to any symptoms that may require diagnosis or medical attention.



</p>

                                          </div>
                                         
                                        
                    
                                         
                                        
                                                 
                                        </div>
                    
                                       
                    
                                      
                                    </div>
           
       
        <Footer></Footer>
      </div>
    );
  }
}

export default BookDetails;
