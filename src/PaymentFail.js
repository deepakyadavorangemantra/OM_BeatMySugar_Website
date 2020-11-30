/* eslint-disable no-loop-func */
import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import GetApiCall from "./GetApi";
import moment from "moment";

class PaymentFail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShippingAddress: [],
      BillingAddress: [],
      CartData: [],
      SummaryData: [],
      OfferData: [],

      NumRegex: /^0|[0-9]\d*$/,
      MobileRegex: /^[0-9]*$/,
      AlphaNumericRegex: /^[a-zA-Z0-9]*$/,
      SpecialRegex: /[-!$%^&*()_+|~=`"{}\[\]:\/;<>?,.@#]/,
      EmailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      UrlRegex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,


      TxnId : '',
      MerKey : 'a6JOJL',
      MerSalt : 'cri53U9i',
      CustomerLoginData : [],
      CustomerHash : ''
   
   
    };
  }

  componentDidMount() {


    PostApiCall.postRequest(
      {
        txnid: this.props.match.params.txnid,
        paystatus : 'Failed',
        orderstatus : 'Created'
      },
      "UpdateOrderConfirmationStatus"
    ).then((results1) =>
      // const objs = JSON.parse(result._bodyText)
      results1.json().then((obj) => {
        if (results1.status == 200 || results1.status == 201) {


          var data = 
          {fld_userid: obj.data[0].fld_customerid,
          fld_email: obj.data[0].fld_email,
          fld_mobile: obj.data[0].fld_mobile,
          fld_name: obj.data[0].fld_name,
          fld_salt: obj.data[0].fld_salt,
 }

            localStorage.setItem(
              "CustomerLoginDetails",
              JSON.stringify(data)
            );

        }
      }))
    // var cartdt = JSON.parse(localStorage.getItem("CartData"));
    // var OfferData = JSON.parse(localStorage.getItem("OfferData"));
    // var SummaryData = JSON.parse(localStorage.getItem("SummaryData"));
    // var ShippingAddress = JSON.parse(
    //   localStorage.getItem("CustomerShippingAddress")
    // );
    // var BillingAddress = JSON.parse(
    //   localStorage.getItem("CustomerBillingAddress")
    // );

    // this.setState({
    //   ShippingAddress: ShippingAddress,
    //   BillingAddress: BillingAddress,
    //   SummaryData: SummaryData,
    //   OfferData: OfferData,
    // });

    // var crdt = [];
    // for (var i = 0; i < Object.keys(cartdt).length; i++) {
    //   for (var j = 0; j < Object.keys(cartdt[i]).length; j++) {
    //     // subt = subt + this.state.Cart[i][j].fld_discountprice*this.state.Cart[i][j].fld_quantity
    //     crdt.push(cartdt[i][j]);
    //     this.setState({
    //       CartData: crdt,
    //     });
    //   }
    // }

    // var log = localStorage.getItem("CustomerLoginDetails");
    // var login = JSON.parse(log);

    // this.setState({
    //   CustomerLoginData : login
    // })
    // // console.log(login)

   


  }

//   PlaceOrder() {
//     var log = localStorage.getItem("CustomerLoginDetails");
//     var login = JSON.parse(log);

//     var cn = 0;

//     Notiflix.Loading.Dots("");

//     PostApiCall.postRequest(
//       {
//         offerid: this.state.OfferData.fld_offerid,
//         offeramount: this.state.SummaryData.OfferAmt,
//         offerpercent: this.state.SummaryData.OfferPercent,
//         shippingcharges: this.state.SummaryData.ShippngAmt,
//         coddeliverycharges: this.state.SummaryData.CodAmt,
//         orderdate: moment().format("ll"),
//         ordervalue: this.state.SummaryData.SubTotalAmt,
//         netcost: this.state.SummaryData.TotalAmt,
//         paymentmode: this.state.SummaryData.CodAmt == 0 ? "Online" : "COD",
//         numofitems: this.state.CartData.length,
//         customerid: login.fld_userid,
//         billingaddress: this.state.BillingAddress.fld_address,
//         deliveryaddress: this.state.ShippingAddress.fld_address,
//         ordersource: "Website",
//         status: "Placed",
//         updated_on: moment().format("lll"),
//         updated_by: login.fld_userid,
//         shippingname: this.state.ShippingAddress.fld_name,
//         shippingstreet: this.state.ShippingAddress.fld_street,
//         shippinglandmark: this.state.ShippingAddress.fld_landmark,
//         shippingcountry: this.state.ShippingAddress.fld_country,
//         shippingstate: this.state.ShippingAddress.fld_state,
//         shippingcity: this.state.ShippingAddress.fld_city,
//         shippingpincode: this.state.ShippingAddress.fld_pincode,
//         shippingmobile: this.state.ShippingAddress.fld_mobile,
//         billingname: this.state.BillingAddress.fld_name,
//         billingstreet: this.state.BillingAddress.fld_street,
//         billinglandmark: this.state.BillingAddress.fld_landmark,
//         billingcountry: this.state.BillingAddress.fld_country,
//         billingstate: this.state.BillingAddress.fld_state,
//         billingcity: this.state.BillingAddress.fld_city,
//         billingpincode: this.state.BillingAddress.fld_pincode,
//         billingmobile: this.state.BillingAddress.fld_mobile,
//       },
//       "AddOrder"
//     ).then((results) =>
//       // const objs = JSON.parse(result._bodyText)
//       results.json().then((obj) => {
//         if (results.status == 200 || results.status == 201) {
//           PostApiCall.postRequest(
//             {
//               ordernumber: JSON.parse(JSON.stringify(obj.data[0])).OrderNumber,
//               offeramount: this.state.SummaryData.OfferAmt,
//               offerpercent: this.state.SummaryData.OfferPercent,
//               shippingcharges: this.state.SummaryData.ShippngAmt,
//               coddeliverycharges: this.state.SummaryData.CodAmt,
//               orderdate: moment().format("ll"),
//               ordervalue: this.state.SummaryData.SubTotalAmt,
//               netcost: this.state.SummaryData.TotalAmt,
//               paymentmode:
//                 this.state.SummaryData.CodAmt == 0 ? "Online" : "COD",
//               numofitems: this.state.CartData.length,
//               customeremail: login.fld_email,
//               customername: login.fld_name,
//               customermobile: login.fld_mobile,
//               billingaddress: this.state.BillingAddress.fld_address,
//               deliveryaddress: this.state.ShippingAddress.fld_address,
//               shippingname: this.state.ShippingAddress.fld_name,
//               shippingstreet: this.state.ShippingAddress.fld_street,
//               shippinglandmark: this.state.ShippingAddress.fld_landmark,
//               shippingcountry: this.state.ShippingAddress.fld_country,
//               shippingstate: this.state.ShippingAddress.fld_state,
//               shippingcity: this.state.ShippingAddress.fld_city,
//               shippingpincode: this.state.ShippingAddress.fld_pincode,
//               shippingmobile: this.state.ShippingAddress.fld_mobile,
//               billingname: this.state.BillingAddress.fld_name,
//               billingstreet: this.state.BillingAddress.fld_street,
//               billinglandmark: this.state.BillingAddress.fld_landmark,
//               billingcountry: this.state.BillingAddress.fld_country,
//               billingstate: this.state.BillingAddress.fld_state,
//               billingcity: this.state.BillingAddress.fld_city,
//               billingpincode: this.state.BillingAddress.fld_pincode,
//               billingmobile: this.state.BillingAddress.fld_mobile,
//               orderdata: this.state.CartData,
//             },
//             "CustomerOrderMailer"
//           );

//           fetch(
//             "https://www.instaalerts.zone/SendSMS/sendmsg.php?uname=globaltrendz&pass=abc321&send=BMSIND&dest=" +
//               login.fld_mobile +
//               "&msg=Hi " +
//               login.fld_name +
//               ", Your Order - " +
//               JSON.parse(JSON.stringify(obj.data[0])).OrderNumber +
//               " has been successfully placed. We" +
//               "'" +
//               "ll let you know once your order has been verified. A Team BeatMySugar"
//           ).then((response) => response.json());

//           for (var i = 0; i < this.state.CartData.length; i++) {
//             PostApiCall.postRequest(
//               {
//                 orderid: JSON.parse(JSON.stringify(obj.data[0])).OrderId,
//                 category: this.state.CartData[i].fld_productcategory,
//                 productid: this.state.CartData[i].fld_id,
//                 price: this.state.CartData[i].fld_discountprice,
//                 tax: this.state.CartData[i].fld_gstpercent,
//                 quantity: this.state.CartData[i].fld_quantity,
//                 updated_on: moment().format("lll"),
//                 updated_by: login.fld_userid,
//                 status: "Placed",
//               },
//               "AddOrderDetail"
//             ).then((results1) =>
//               // const objs = JSON.parse(result._bodyText)
//               results1.json().then((obj1) => {
//                 if (results1.status == 200 || results1.status == 201) {
//                   cn = cn + 1;

//                   if (cn == this.state.CartData.length) {
//                     Notiflix.Loading.Remove();

//                     Notiflix.Notify.Info("Your Order has been Placed!");
//                     window.location.href = "/";
//                   }
//                 } else {
//                   cn = cn + 1;
//                 }
//               })
//             );
//           }
//         } else {
//           Notiflix.Notify.Failure("Something went wrong, try again later.");
//         }
//       })
//     );
//   }

  render() {
    return (
      <div>
        <Menu></Menu>
        <div class="container">
                        
                        <div class="row marginbtm-240">
    
                       
    
                                  <div class="col-md-12">
                                    
                                  <div class="privacy-box" style={{background:' #fff',
                                  padding: '15px',fontWeight: '700',
                                 
                                  color:'#6b6b6b',
                                 
                                  letterSpacing:'.01rem',
                                  font: '500 16px/1.35 Rajdhani,Helvetica Neue,Verdana,Arial,sans-serif',
                                  textAlign:'justify',
                                  marginTop:'30px'
                              }}>
                                <div class="payment-box">
                                                        {/* <h2 class="pull-left section-title text-center" style={{color:"#000",fontSize:"30px"}}>Payment Failed !</h2> */}
                                                       <img src="/assets/images/Payment_unsuccessfull.png" class="payment-failed"></img>
                                                   <div class="center-block">
                                                   <a href="/placeorder" class="btn payment-fail-btn">Try Paying Again</a>
                                                   <a href="/" class="btn payment-fail-btn">Go to Home Page</a>
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

export default PaymentFail;
