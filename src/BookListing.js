import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import GetApiCall from "./GetApi";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import moment from "moment";

class BookListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Book: [],
      BookImage: [],
      BookDetails: [],
    };
  }

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    });

    // Notiflix.Loading.Dots("");

    var arr = [];

    // GetApiCall.getRequest("GetBooksWeb").then((results) => {
    //   results
    //     .json()
    //     .then((data) => ({
    //       data: data,
    //       status: results.status,
    //     }))
    //     .then((res) => {
    //       //   console.log(res.data.data

    //       const result = [];
    //       const map = new Map();
    //       for (const item of res.data.data) {
    //         if (!map.has(item.fld_bookid)) {
    //           map.set(item.fld_bookid, true); // set any value to Map
    //           result.push({
    //             fld_bookid: item.fld_bookid,
    //             fld_title: item.fld_title,
    //             fld_productprice: item.fld_productprice,
    //             fld_discountprice: item.fld_discountprice,
    //             fld_discountpercent: item.fld_discountpercent,
    //             fld_photo: item.fld_photo,
    //             fld_authorname: item.fld_authorname,
    //           });
    //         }
    //       }
    //       // console.log(result)
    //       this.setState({
    //         Book: result,
    //         BookDetails: res.data.data,
    //       });

    //       Notiflix.Loading.Remove();
    //     });
    // });
  }

  truncate(source, size) {
    // console.log(source)
    if (source != null) {
      return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }
  }

  render() {
    return (
      <div>
        <Menu></Menu>
        <div class="container ad-banner">
          <img src="../assets/images/images.png"></img>
        </div>
        <main class="main">
        <div class="container healthcare-slider doctors-section">
          {/* <h3 class="section-title">Books</h3> */}
          <div class="row">
            {/* {this.state.Book.map((book, index) => ( */}
              <div class="sidebar-overlay"></div>
                <div class="sidebar-toggle">
                  <i class="icon-sliders"></i>
                </div>
                <aside class="sidebar-product col-md-2 padding-left-lg mobile-sidebar">
                  <div class="sidebar-wrapper">

              <div class="filter-side">
                <h4>Filters</h4>
                <div class="search">
                  <input type="text" placeholder="Search"></input>
                </div>
                <div class="brands">
                  <h5>Brands</h5>
                  <ul class="scrollbar" id="style-3">
                    <li>
                      <input
                        type="checkbox"
                        name="checkbox3"
                        id="checkbox3"
                        class="css-checkbox"
                      />
                      <label for="checkbox3" class="css-label">
                        Panlin
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        name="checkbox3"
                        id="checkbox3"
                        class="css-checkbox"
                      />
                      <label for="checkbox3" class="css-label">
                        Foot Cure
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        name="checkbox3"
                        id="checkbox3"
                        class="css-checkbox"
                      />
                      <label for="checkbox3" class="css-label">
                        Hochste
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        name="checkbox3"
                        id="checkbox3"
                        class="css-checkbox"
                      />
                      <label for="checkbox3" class="css-label">
                        Podiastore
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        name="checkbox3"
                        id="checkbox3"
                        class="css-checkbox"
                      />
                      <label for="checkbox3" class="css-label">
                        Panlin
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        name="checkbox3"
                        id="checkbox3"
                        class="css-checkbox"
                      />
                      <label for="checkbox3" class="css-label">
                        Foot Cure
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        name="checkbox3"
                        id="checkbox3"
                        class="css-checkbox"
                      />
                      <label for="checkbox3" class="css-label">
                        Hochste
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        name="checkbox3"
                        id="checkbox3"
                        class="css-checkbox"
                      />
                      <label for="checkbox3" class="css-label">
                        Podiastore
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            </aside>
            <div class="col-md-10">
              <div class="row">
                <div class="col-md-3">
                  <div class="partner book-inner">
                    <div
                      id="overlay"
                      // style={{
                      //   display:
                      //     book.fld_availability == "Outofstock" ? "" : "none",
                      // }}
                    >
                      Out Of Stock
                    </div>

                    <img
                      //   onClick={() => {
                      //     window.location.href = `/book/${
                      //       book.fld_bookid + "-" + book.fld_title.replace(/ /g, "-")
                      //     }`;
                      //   }}
                      class="book-image"
                      src={"../assets/images/cauliflowerbook.jpg"}
                    />
                    {/* <div class="button"><a onClick={()=>{
                                       
                                    window.location.href = `/book/${book.fld_bookid+"-"+book.fld_title.replace( / /g,'-')}`
                                 
                                      
                                    }}> Quick View </a></div> */}
                    <div class="product-details">
                      <p class="product-title ">
                        <a
                        //   onClick={() => {
                        //     window.location.href = `/book/${
                        //       book.fld_bookid +
                        //       "-" +
                        //       book.fld_title.replace(/ /g, "-")
                        //     }`;
                        //   }}
                        >
                          Cauliflower Diet
                        </a>
                      </p>
                      {/* {book.fld_discountpercent == 0.0 ? ( */}
                     
                      <p>
                      <p class="small-desc item-name"><span style={{color:"#222222",fontWeight:"600"}}>Author:</span> Radha Thomas</p>

<p class="price">

  &#8377; 100.00
  {" "}<span>
    <s>&#8377; 200.00</s>
  </span>
</p>
                      </p>
                      <p>
                        <p class="price">
                          <span>
                            <s></s>
                          </span>{" "}
                        </p>
                        <p class="discount-price">20% discount, You Save &#8377; 50</p>
                      </p>

                      <p class="brief-desc"></p>
                      <ul class="group-buttons">
                        <li>
                          {" "}
                          <button class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"></i> ADD TO CART
                          </button>
                        </li>
                        <li>
                          <button class="like-btn">
                            <i class="fas fa-heart"></i>
                          </button>{" "}
                        </li>
                        {/* <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li> */}
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="col-md-3">
                  <div class="partner book-inner">
                    <div
                      id="overlay"
                      // style={{
                      //   display:
                      //     book.fld_availability == "Outofstock" ? "" : "none",
                      // }}
                    >
                      Out Of Stock
                    </div>

                    <img
                      //   onClick={() => {
                      //     window.location.href = `/book/${
                      //       book.fld_bookid + "-" + book.fld_title.replace(/ /g, "-")
                      //     }`;
                      //   }}
                      class="book-image"
                      src={"../assets/images/cauliflowerbook.jpg"}
                    />
                    {/* <div class="button"><a onClick={()=>{
                                       
                                    window.location.href = `/book/${book.fld_bookid+"-"+book.fld_title.replace( / /g,'-')}`
                                 
                                      
                                    }}> Quick View </a></div> */}
                    <div class="product-details">
                      <p class="product-title ">
                        <a
                        //   onClick={() => {
                        //     window.location.href = `/book/${
                        //       book.fld_bookid +
                        //       "-" +
                        //       book.fld_title.replace(/ /g, "-")
                        //     }`;
                        //   }}
                        >
                          Cauliflower Diet
                        </a>
                      </p>
                      {/* {book.fld_discountpercent == 0.0 ? ( */}
                     
                      <p>
                      <p class="small-desc item-name"><span style={{color:"#222222",fontWeight:"600"}}>Author:</span> Radha Thomas</p>

<p class="price">

  &#8377; 100.00
  {" "}<span>
    <s>&#8377; 200.00</s>
  </span>
</p>
                      </p>
                      <p>
                        <p class="price">
                          <span>
                            <s></s>
                          </span>{" "}
                        </p>
                        <p class="discount-price">20% discount, You Save &#8377; 50</p>
                      </p>

                      <p class="brief-desc"></p>
                      <ul class="group-buttons">
                        <li>
                          {" "}
                          <button class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"></i> ADD TO CART
                          </button>
                        </li>
                        <li>
                          <button class="like-btn">
                            <i class="fas fa-heart"></i>
                          </button>{" "}
                        </li>
                        {/* <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li> */}
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="col-md-3">
                  <div class="partner book-inner">
                    <div
                      id="overlay"
                      // style={{
                      //   display:
                      //     book.fld_availability == "Outofstock" ? "" : "none",
                      // }}
                    >
                      Out Of Stock
                    </div>

                    <img
                      //   onClick={() => {
                      //     window.location.href = `/book/${
                      //       book.fld_bookid + "-" + book.fld_title.replace(/ /g, "-")
                      //     }`;
                      //   }}
                      class="book-image"
                      src={"../assets/images/cauliflowerbook.jpg"}
                    />
                    {/* <div class="button"><a onClick={()=>{
                                       
                                    window.location.href = `/book/${book.fld_bookid+"-"+book.fld_title.replace( / /g,'-')}`
                                 
                                      
                                    }}> Quick View </a></div> */}
                    <div class="product-details">
                      <p class="product-title ">
                        <a
                        //   onClick={() => {
                        //     window.location.href = `/book/${
                        //       book.fld_bookid +
                        //       "-" +
                        //       book.fld_title.replace(/ /g, "-")
                        //     }`;
                        //   }}
                        >
                          Cauliflower Diet
                        </a>
                      </p>
                      {/* {book.fld_discountpercent == 0.0 ? ( */}
                     
                      <p>
                      <p class="small-desc item-name"><span style={{color:"#222222",fontWeight:"600"}}>Author:</span> Radha Thomas</p>

<p class="price">

  &#8377; 100.00
  {" "}<span>
    <s>&#8377; 200.00</s>
  </span>
</p>
                      </p>
                      <p>
                        <p class="price">
                          <span>
                            <s></s>
                          </span>{" "}
                        </p>
                        <p class="discount-price">20% discount, You Save &#8377; 50</p>
                      </p>

                      <p class="brief-desc"></p>
                      <ul class="group-buttons">
                        <li>
                          {" "}
                          <button class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"></i> ADD TO CART
                          </button>
                        </li>
                        <li>
                          <button class="like-btn">
                            <i class="fas fa-heart"></i>
                          </button>{" "}
                        </li>
                        {/* <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li> */}
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="col-md-3">
                  <div class="partner book-inner">
                    <div
                      id="overlay"
                      // style={{
                      //   display:
                      //     book.fld_availability == "Outofstock" ? "" : "none",
                      // }}
                    >
                      Out Of Stock
                    </div>

                    <img
                      //   onClick={() => {
                      //     window.location.href = `/book/${
                      //       book.fld_bookid + "-" + book.fld_title.replace(/ /g, "-")
                      //     }`;
                      //   }}
                      class="book-image"
                      src={"../assets/images/cauliflowerbook.jpg"}
                    />
                    {/* <div class="button"><a onClick={()=>{
                                       
                                    window.location.href = `/book/${book.fld_bookid+"-"+book.fld_title.replace( / /g,'-')}`
                                 
                                      
                                    }}> Quick View </a></div> */}
                    <div class="product-details">
                      <p class="product-title ">
                        <a
                        //   onClick={() => {
                        //     window.location.href = `/book/${
                        //       book.fld_bookid +
                        //       "-" +
                        //       book.fld_title.replace(/ /g, "-")
                        //     }`;
                        //   }}
                        >
                          Cauliflower Diet
                        </a>
                      </p>
                      {/* {book.fld_discountpercent == 0.0 ? ( */}
                     
                      <p>
                      <p class="small-desc item-name"><span style={{color:"#222222",fontWeight:"600"}}>Author:</span> Radha Thomas</p>

<p class="price">

  &#8377; 100.00
  {" "}<span>
    <s>&#8377; 200.00</s>
  </span>
</p>
                      </p>
                      <p>
                        <p class="price">
                          <span>
                            <s></s>
                          </span>{" "}
                        </p>
                        <p class="discount-price">20% discount, You Save &#8377; 50</p>
                      </p>

                      <p class="brief-desc"></p>
                      <ul class="group-buttons">
                        <li>
                          {" "}
                          <button class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"></i> ADD TO CART
                          </button>
                        </li>
                        <li>
                          <button class="like-btn">
                            <i class="fas fa-heart"></i>
                          </button>{" "}
                        </li>
                        {/* <li><button class="like-btn"><i class="fas fa-info-circle"></i></button> </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ))} */}
            {/* <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div>

                       <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div>

                       <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div>

                       <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div>

                       <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div>

                       <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div>

                       <div class="col-md-2">
                            <div class="book book-inner">
                                    <img src="assets/images/books/book.jpg"/>
                                    <div class="button"><a href="/bookDetails"> Quick View </a></div>
     
                                    <p class="book-title">The Cauliflower Diet by Radha Thomas</p>
                                    <p class="price"><span><s>₹375.00</s></span> ₹300.00</p>
                                    <p class="discount-price">You Save ₹75 (20%)</p>
                                     </div>
                       </div> */}
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
                                    </main>
       
        <Footer></Footer>
      </div>
    );
  }
}

export default BookListing;
