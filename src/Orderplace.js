/* eslint-disable no-loop-func */
import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import GetApiCall from "./GetApi";
import moment from "moment";

// const payu = require('payu-sdk')({
//   key: this.state.MerKey,
//   salt: this.state.MerSalt, // should be on server side only
// })

class Orderplace extends React.Component {
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

      TxnId: "",
      MerKey: "4dl2G3",
      MerSalt: "Y8YsVhof",
      CustomerLoginData: [],
      CustomerHash: "",
    };
  }

  componentDidMount() {
    Notiflix.Loading.Dots("");

    var cartdt = JSON.parse(localStorage.getItem("CartData"));
    var OfferData = JSON.parse(localStorage.getItem("OfferData"));
    var SummaryData = JSON.parse(localStorage.getItem("SummaryData"));
    var ShippingAddress = JSON.parse(
      localStorage.getItem("CustomerShippingAddress")
    );
    var BillingAddress = JSON.parse(
      localStorage.getItem("CustomerBillingAddress")
    );

    this.setState({
      ShippingAddress: ShippingAddress,
      BillingAddress: BillingAddress,
      SummaryData: SummaryData,
      OfferData: OfferData,
    });

    var crdt = [];
    for (var i = 0; i < Object.keys(cartdt).length; i++) {
      for (var j = 0; j < Object.keys(cartdt[i]).length; j++) {
        // subt = subt + this.state.Cart[i][j].fld_discountprice*this.state.Cart[i][j].fld_quantity
        crdt.push(cartdt[i][j]);
        // console.log(crdt)
        this.setState({
          CartData: crdt,
        });
      }
    }

    var log = localStorage.getItem("CustomerLoginDetails");
    var login = JSON.parse(log);

    this.setState({
      CustomerLoginData: login,
    });
    // console.log(login)

    PostApiCall.postRequest(
      {
        customerid: login.fld_userid,
        status: "Pending",
        createdon: moment().format("lll"),
        createdby: login.fld_userid,
      },
      "AddTransactionLog"
    ).then((results) =>
      // const objs = JSON.parse(result._bodyText)
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {
          this.setState({
            TxnId: JSON.parse(JSON.stringify(obj.data[0])).Txnid,
          });

          const payu = require("payu-sdk")({
            key: this.state.MerKey,
            salt: this.state.MerSalt, // should be on server side only
          });
          //  var payu;

          const hash = payu.hasher.generateHash({
            txnid: JSON.parse(JSON.stringify(obj.data[0])).Txnid,
            amount: parseFloat(SummaryData.TotalAmt).toFixed(2),
            productinfo: "Diabetic Products",
            firstname: login.fld_name,
            email: login.fld_email,
          });
          this.setState(
            {
              CustomerHash: hash,
            },
            () => {
              // Notiflix.Loading.Remove();
              this.PlaceOrder();
            }
          );
        }
      })
    );
  }

  PlaceOrder() {
    var log = localStorage.getItem("CustomerLoginDetails");
    var login = JSON.parse(log);

    var cn = 0;

    PostApiCall.postRequest(
      {
        offerid: this.state.OfferData.fld_offerid,
        offeramount: this.state.SummaryData.OfferAmt,
        offerpercent: this.state.SummaryData.OfferPercent,
        shippingcharges: this.state.SummaryData.ShippngAmt,
        coddeliverycharges: this.state.SummaryData.CodAmt,
        orderdate: moment().format("lll"),
        ordervalue: parseFloat(this.state.SummaryData.SubTotalAmt).toFixed(2),
        netcost: parseFloat(this.state.SummaryData.TotalAmt).toFixed(2),
        paymentmode: this.state.SummaryData.PayMode,
        numofitems: this.state.CartData.length,
        customerid: login.fld_userid,
        billingaddress: this.state.BillingAddress.fld_address,
        deliveryaddress: this.state.ShippingAddress.fld_address,
        ordersource: "Website",
        status: "Created",
        updated_on: moment().format("ll"),
        updated_by: login.fld_userid,
        shippingname: this.state.ShippingAddress.fld_name,
        shippingstreet: this.state.ShippingAddress.fld_street,
        shippinglandmark: this.state.ShippingAddress.fld_landmark,
        shippingcountry: this.state.ShippingAddress.fld_country,
        shippingstate: this.state.ShippingAddress.fld_state,
        shippingcity: this.state.ShippingAddress.fld_city,
        shippingpincode: this.state.ShippingAddress.fld_pincode,
        shippingmobile: this.state.ShippingAddress.fld_mobile,
        billingname: this.state.BillingAddress.fld_name,
        billingstreet: this.state.BillingAddress.fld_street,
        billinglandmark: this.state.BillingAddress.fld_landmark,
        billingcountry: this.state.BillingAddress.fld_country,
        billingstate: this.state.BillingAddress.fld_state,
        billingcity: this.state.BillingAddress.fld_city,
        billingpincode: this.state.BillingAddress.fld_pincode,
        billingmobile: this.state.BillingAddress.fld_mobile,
        txnid: this.state.TxnId,
        offercode: this.state.SummaryData.OfferCode,
        yousave: this.state.SummaryData.YouSaved,
      },
      "AddOrder"
    ).then((results) =>
      // const objs = JSON.parse(result._bodyText)
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {
          // PostApiCall.postRequest(
          //   {
          //     ordernumber: JSON.parse(JSON.stringify(obj.data[0])).OrderNumber,
          //     offeramount: this.state.SummaryData.OfferAmt,
          //     offerpercent: this.state.SummaryData.OfferPercent,
          //     shippingcharges: this.state.SummaryData.ShippngAmt,
          //     coddeliverycharges: this.state.SummaryData.CodAmt,
          //     orderdate: moment().format("ll"),
          //     ordervalue: parseFloat(
          //       this.state.SummaryData.SubTotalAmt
          //     ).toFixed(2),
          //     netcost: parseFloat(this.state.SummaryData.TotalAmt).toFixed(2),
          //     paymentmode:
          //       this.state.SummaryData.CodAmt == 0 ? "Online" : "COD",
          //     numofitems: this.state.CartData.length,
          //     customeremail: login.fld_email,
          //     customername: login.fld_name,
          //     customermobile: login.fld_mobile,
          //     billingaddress: this.state.BillingAddress.fld_address,
          //     deliveryaddress: this.state.ShippingAddress.fld_address,
          //     shippingname: this.state.ShippingAddress.fld_name,
          //     shippingstreet: this.state.ShippingAddress.fld_street,
          //     shippinglandmark: this.state.ShippingAddress.fld_landmark,
          //     shippingcountry: this.state.ShippingAddress.fld_country,
          //     shippingstate: this.state.ShippingAddress.fld_state,
          //     shippingcity: this.state.ShippingAddress.fld_city,
          //     shippingpincode: this.state.ShippingAddress.fld_pincode,
          //     shippingmobile: this.state.ShippingAddress.fld_mobile,
          //     billingname: this.state.BillingAddress.fld_name,
          //     billingstreet: this.state.BillingAddress.fld_street,
          //     billinglandmark: this.state.BillingAddress.fld_landmark,
          //     billingcountry: this.state.BillingAddress.fld_country,
          //     billingstate: this.state.BillingAddress.fld_state,
          //     billingcity: this.state.BillingAddress.fld_city,
          //     billingpincode: this.state.BillingAddress.fld_pincode,
          //     billingmobile: this.state.BillingAddress.fld_mobile,
          //     orderdata: this.state.CartData,
          //   },
          //   "CustomerOrderMailer"
          // );

          // fetch(
          //   "https://www.instaalerts.zone/SendSMS/sendmsg.php?uname=globaltrendz&pass=abc321&send=BMSIND&dest=" +
          //     login.fld_mobile +
          //     "&msg=Hi " +
          //     login.fld_name +
          //     ", Your Order - " +
          //     JSON.parse(JSON.stringify(obj.data[0])).OrderNumber +
          //     " has been successfully placed. A Team BeatMySugar"
          // ).then((response) => response.json());

          for (var i = 0; i < this.state.CartData.length; i++) {
            PostApiCall.postRequest(
              {
                orderid: JSON.parse(JSON.stringify(obj.data[0])).OrderId,
                category: this.state.CartData[i].fld_productcategory,
                productid: this.state.CartData[i].fld_id,
                price: this.state.CartData[i].fld_discountprice,
                tax: this.state.CartData[i].fld_gstpercent,
                quantity: this.state.CartData[i].fld_quantity,
                updated_on: moment().format("lll"),
                updated_by: login.fld_userid,
                status: "Placed",
                mrp: this.state.CartData[i].fld_price,
                vendorsellingprice:
                  this.state.CartData[i].fld_vendorsellingprice == null
                    ? 0
                    : this.state.CartData[i].fld_vendorsellingprice,
              },
              "AddOrderDetail"
            ).then((results1) =>
              // const objs = JSON.parse(result._bodyText)
              results1.json().then((obj1) => {
                if (results1.status == 200 || results1.status == 201) {
                  cn = cn + 1;

                  if (cn == this.state.CartData.length) {
                    Notiflix.Loading.Remove();

                    // Notiflix.Notify.Info("Your Order has been Placed!");
                    // window.location.href = "/";
                  }
                } else {
                  cn = cn + 1;
                }
              })
            );
          }
        } else {
          // Notiflix.Notify.Failure("Something went wrong, try again later.");
        }
      })
    );
  }

  render() {
    return (
      <div>
        <Menu></Menu>
        <div class="container checkout-section">
          <div class="container-box">
            <ul class="checkout-progress-bar mt-2">
              <li class="completed">
                <span>Shipping</span>
              </li>
              <li class="active">
                <span>Review &amp; Payments</span>
              </li>
            </ul>
            <div></div>

            <div class="table-responsive">
              <table
                style={{
                  width: "1000px",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  bottom: "0px",
                  borderRightColor: "#000",
                  borderCollapse: "collapse",
                  fontFamily: "Lato, sans-serif",
                }}
                border="1"
                cellspacing="0"
                cellpadding="0"
              >
                <tbody>
                  <tr>
                    <td
                      rowspan="1"
                      style={{ width: "20%", verticalAlign: "middle" }}
                    >
                      <img
                        src="https://www.beatmysugar.com/assets/images/bms-logo.png"
                        style={{
                          width: "50%",
                          marginRight: "auto",
                          marginLeft: "auto",
                        }}
                      />
                    </td>
                    <td colspan="8" style={{ width: "80%" }}>
                      <h2
                        style={{
                          textAlign: "center",
                          fontSize: "25px",
                          fontWeight: "bold",
                          marginBottom: "0px",
                        }}
                      >
                        BeatMySugar
                      </h2>
                      <p
                        style={{
                          textAlign: "center",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        Rx Health Management India Pvt Ltd
                        <br /> 12th Floor, Puri 81 Business Hub,
                        <br />
                        Sec-81, Faridabad, Haryana - 121 001. INDIA.
                      </p>
                      <tr
                        class="success"
                        style={{
                          background: "#f7f7f7",
                          display: "grid",
                          borderCollapse: "collapse",
                          border: "none",
                        }}
                      >
                        <td
                          colspan="8"
                          style={{
                            textAlign: "right",
                            paddingRight: "1%",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          Customer Order Form
                        </td>
                      </tr>
                    </td>
                  </tr>

                  <tr>
                    <td
                      colspan="1"
                      style={{
                        textAlign: "left",
                        paddingLeft: "1%",
                        paddingTop: "1%",
                        paddingBottom: "1%",
                      }}
                    >
                      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                        Order Date
                      </span>
                    </td>
                    <td
                      colspan="4"
                      style={{
                        textAlign: "left",
                        paddingLeft: "1%",
                        paddingTop: "1%",
                        paddingBottom: "1%",
                      }}
                    >
                      {moment().format("ll")}
                    </td>
                    {/* <td colspan="3"
     style={{textAlign: 'left',
       paddingLeft: '1%',
       paddingTop: '1%',
       paddingBottom: '1%'}}>
     <span style={{fontWeight: 'bold', fontSize: '16px'}}></span>
   </td> */}
                    <td
                      colspan="4"
                      style={{
                        textAlign: "left",
                        paddingLeft: "1%",
                        paddingTop: "1%",
                        paddingBottom: "1%",
                      }}
                    ></td>
                  </tr>

                  <tr class="success" style={{ backgroundColor: "#f7f7f7" }}>
                    <td
                      colspan="5"
                      style={{
                        paddingTop: "1%",
                        paddingBottom: "1%",
                        fontWeight: "bold",
                        fontSize: "15px",
                        width: "50%",
                        textAlign: "center",
                      }}
                    >
                      Billing Address
                    </td>
                    <td
                      colspan="5"
                      style={{
                        paddingTop: "1%",
                        paddingBottom: "1%",
                        fontWeight: "bold",
                        fontSize: "15px",
                        width: "50%",
                        textAlign: "center",
                      }}
                    >
                      Shipping Address
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        paddingLeft: "1%",
                        paddingTop: "1%",
                        paddingBottom: "1%",
                      }}
                    >
                      <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {this.state.BillingAddress.fld_name}
                      </span>
                      <p>
                        {this.state.BillingAddress.fld_address}
                        <br />
                        {this.state.BillingAddress.fld_street}
                        <br />
                        {this.state.BillingAddress.fld_city}{" "}
                        {this.state.BillingAddress.fld_pincode},{" "}
                        {this.state.BillingAddress.fld_state},{" "}
                        {this.state.BillingAddress.fld_country}.<br />
                        Landmark: {this.state.BillingAddress.fld_landmark}
                        <br />
                        Mobile Number: ( +91{" "}
                        {this.state.BillingAddress.fld_mobile})
                      </p>
                    </td>

                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        paddingLeft: "1%",
                        paddingTop: "1%",
                        paddingBottom: "1%",
                      }}
                    >
                      <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {this.state.ShippingAddress.fld_name}
                      </span>
                      <p>
                        {this.state.ShippingAddress.fld_address}
                        <br />
                        {this.state.ShippingAddress.fld_street}
                        <br />
                        {this.state.ShippingAddress.fld_city}{" "}
                        {this.state.ShippingAddress.fld_pincode},{" "}
                        {this.state.ShippingAddress.fld_state},{" "}
                        {this.state.ShippingAddress.fld_country}.<br />
                        Landmark: {this.state.ShippingAddress.fld_landmark}
                        <br />
                        Mobile Number: ( +91{" "}
                        {this.state.ShippingAddress.fld_mobile})
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                style={{
                  width: "1000px",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRightColor: "#000",
                  borderTop: "hidden",
                  fontFamily: "Lato, sans-serif",
                  borderCollapse: "collapse",
                }}
                border="1"
                cellspacing="0"
                cellpadding="0"
              >
                <tbody>
                  <tr class="success" style={{ backgroundColor: "#f7f7f7" }}>
                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1%",
                        width: "5%",
                        paddingBottom: "1%",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>S.No</span>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1%",
                        width: "7%",
                        paddingBottom: "1%",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}> HSN Code</span>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1%",
                        width: "30%",
                        paddingBottom: "1%",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}> Product</span>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1%",
                        width: "6%",
                        paddingBottom: "1%",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}> Quantity</span>
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1%",
                        width: "8%",
                        paddingBottom: "1%",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>Base Value</span>
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1%",
                        width: "10%",
                        paddingBottom: "1%",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        Offer Discount *
                      </span>
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1%",
                        width: "10%",
                        paddingBottom: "1%",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>Net Value</span>
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1%",
                        width: "5%",
                        paddingBottom: "1%",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>GST Rate</span>
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1%",
                        width: "8%",
                        paddingBottom: "1%",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>GST Amount</span>
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1%",
                        width: "10%",
                        paddingBottom: "1%",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        Total Amount(INR)
                      </span>
                    </td>
                  </tr>

                  {this.state.CartData.map((info, index) => (
                    <tr>
                      <td
                        style={{
                          paddingTop: "1%",
                          paddingBottom: "1%",
                          textAlign: "center",
                        }}
                      >
                        {index + 1}.
                      </td>
                      <td
                        style={{
                          paddingTop: "1%",
                          paddingBottom: "1%",
                          textAlign: "center",
                        }}
                      >
                        {info.fld_hsncode}
                      </td>
                      <td
                        style={{
                          paddingTop: "1%",
                          paddingBottom: "1%",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        {info.fld_name}
                        <br /> <b>{info.fld_brand}</b>
                      </td>
                      <td
                        style={{
                          paddingTop: "1%",
                          paddingBottom: "1%",
                          textAlign: "center",
                        }}
                      >
                        {info.fld_quantity}
                      </td>
                      <td
                        style={{
                          paddingTop: "1%",
                          paddingBottom: "1%",
                          textAlign: "center",
                        }}
                      >
                        {parseFloat(
                          (info.fld_discountprice * info.fld_quantity) /
                            (1 + info.fld_gstpercent / 100)
                        ).toFixed(2)}
                      </td>
                      <td
                        style={{
                          paddingTop: "1%",
                          paddingBottom: "1%",
                          textAlign: "center",
                        }}
                      >
                        {this.state.SummaryData.OfferPercent == "" ||
                        this.state.SummaryData.OfferPercent == null
                          ? '-'
                          : '₹'+parseFloat(
                              (((info.fld_discountprice * info.fld_quantity) /
                                (1 + info.fld_gstpercent / 100)) *
                                this.state.SummaryData.OfferPercent) /
                                100
                            ).toFixed(2)}
                      </td>
                      <td
                        style={{
                          paddingTop: "1%",
                          paddingBottom: "1%",
                          textAlign: "center",
                        }}
                      >
                        ₹
                        {parseFloat(
                          (info.fld_discountprice * info.fld_quantity) /
                            (1 + info.fld_gstpercent / 100) -
                            (this.state.SummaryData.OfferPercent == "" ||
                            this.state.SummaryData.OfferPercent == null
                              ? 0
                              : (((info.fld_discountprice * info.fld_quantity) /
                                  (1 + info.fld_gstpercent / 100)) *
                                  this.state.SummaryData.OfferPercent) /
                                100)
                        ).toFixed(2)}{" "}
                      </td>
                      <td
                        style={{
                          paddingTop: "1%",
                          paddingBottom: "1%",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        {info.fld_gstpercent}%
                      </td>
                      <td
                        style={{
                          paddingTop: "1%",
                          paddingBottom: "1%",
                          textAlign: "center",
                        }}
                      >
                        ₹{" "}
                        {parseFloat(
                          ((info.fld_discountprice * info.fld_quantity) /
                            (1 + info.fld_gstpercent / 100) -
                            (this.state.SummaryData.OfferPercent == "" ||
                            this.state.SummaryData.OfferPercent == null
                              ? 0
                              : (((info.fld_discountprice * info.fld_quantity) /
                                  (1 + info.fld_gstpercent / 100)) *
                                  this.state.SummaryData.OfferPercent) /
                                100)) *
                            (info.fld_gstpercent / 100)
                        ).toFixed(2)}
                      </td>

                      <td
                        style={{
                          paddingTop: "1%",
                          paddingBottom: "1%",
                          textAlign: "center",
                        }}
                      >
                        ₹{" "}
                        {parseFloat(
                          (info.fld_discountprice * info.fld_quantity) /
                            (1 + info.fld_gstpercent / 100) -
                            (this.state.SummaryData.OfferPercent == "" ||
                            this.state.SummaryData.OfferPercent == null
                              ? 0
                              : (((info.fld_discountprice * info.fld_quantity) /
                                  (1 + info.fld_gstpercent / 100)) *
                                  this.state.SummaryData.OfferPercent) /
                                100) +
                            ((info.fld_discountprice * info.fld_quantity) /
                              (1 + info.fld_gstpercent / 100) -
                              (this.state.SummaryData.OfferPercent == "" ||
                              this.state.SummaryData.OfferPercent == null
                                ? 0
                                : (((info.fld_discountprice *
                                    info.fld_quantity) /
                                    (1 + info.fld_gstpercent / 100)) *
                                    this.state.SummaryData.OfferPercent) /
                                  100)) *
                              (info.fld_gstpercent / 100)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table
                style={{
                  width: "1000px",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRightColor: "#000",
                  borderTop: "hidden",
                  fontFamily: "Lato, sans-serif",
                  borderCollapse: "collapse",
                }}
                border="1"
                cellspacing="0"
                cellpadding="0"
              >
                <tbody>
                  {/* <tr class="success" ><td colspan="4"><p style={{fontWeight : '700' }}>You have saved a total of ₹500.</p></td></tr> */}

                  <tr>
                    <td
                      rowspan="7"
                      colspan="4"
                      style={{
                        textAlign: "left",
                        paddingLeft: "1%",
                        width: "55%",
                        verticalAlign: "middle",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}> Disclaimer:</span>
                      <ul style={{ textAlign: "left", lineHeight: "30px" }}>
                        <li>
                          BMS is only providing a platform between seller and
                          you
                        </li>
                        <li>
                          Warranties, If any, on Products are provided by seller
                        </li>
                        <li>
                          Disputes are subjected to exclusive jurisdiction of
                          the courts in Delhi only
                        </li>
                        <li>
                          Please revisit{" "}
                          <a href="https://beatmysugar.com/">
                            www.beatmysugar.com
                          </a>{" "}
                          for detailed terms and conditions{" "}
                        </li>
                        <li>*Promo Code Based Discount</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="4"
                      style={{
                        textAlign: "right",
                        padding: "1%",
                        width: "35%",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}> Sub total</span>
                    </td>
                    <td style={{ textAlign: "right", padding: "1%" }}>
                      &#8377;{" "}
                      {this.state.CartData.length > 0
                        ? parseFloat(
                            this.state.CartData.map(
                              (info) =>
                                (info.fld_discountprice * info.fld_quantity) /
                                  (1 + info.fld_gstpercent / 100) -
                                (this.state.SummaryData.OfferPercent == "" ||
                                this.state.SummaryData.OfferPercent == null
                                  ? 0
                                  : (((info.fld_discountprice *
                                      info.fld_quantity) /
                                      (1 + info.fld_gstpercent / 100)) *
                                      this.state.SummaryData.OfferPercent) /
                                    100) +
                                ((info.fld_discountprice * info.fld_quantity) /
                                  (1 + info.fld_gstpercent / 100) -
                                  (this.state.SummaryData.OfferPercent == "" ||
                                  this.state.SummaryData.OfferPercent == null
                                    ? 0
                                    : (((info.fld_discountprice *
                                        info.fld_quantity) /
                                        (1 + info.fld_gstpercent / 100)) *
                                        this.state.SummaryData.OfferPercent) /
                                      100)) *
                                  (info.fld_gstpercent / 100)
                            ).reduce(
                              (prev, next) =>
                                parseFloat(prev) + parseFloat(next)
                            )
                          ).toFixed(2)
                        : 0}
                    </td>
                  </tr>

                  <tr>
                    <td
                      colspan="4"
                      style={{ textAlign: "right", padding: "1%" }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        Shipping Charge
                      </span>
                    </td>
                    <td style={{ textAlign: "right", padding: "1%" }}>
                      &#8377;{" "}
                      {parseFloat(this.state.SummaryData.ShippngAmt).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="4"
                      style={{ textAlign: "right", padding: "1%" }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        COD Service Charge
                      </span>
                    </td>
                    <td style={{ textAlign: "right", padding: "1%" }}>
                      &#8377;{" "}
                      {parseFloat(this.state.SummaryData.CodAmt).toFixed(2)}
                    </td>
                  </tr>

                  <tr>
                    <td
                      colspan="4"
                      style={{ textAlign: "right", padding: "1%" }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        Total (Inclusive of all Taxes)
                      </span>
                    </td>
                    <td style={{ textAlign: "right", padding: "1%" }}>
                      &#8377;{" "}
                      {parseFloat(this.state.SummaryData.TotalAmt).toFixed(2)}
                    </td>
                  </tr>

                  <tr>
                    <td
                      colspan="4"
                      style={{ textAlign: "right", padding: "1%" }}
                    >
                      <span style={{ fontWeight: "bold" }}>Payment Mode</span>
                    </td>
                    <td style={{ textAlign: "right", padding: "1%" }}>
                      {this.state.SummaryData.PayMode}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="5"
                      style={{ textAlign: "right", padding: "1%" }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        Total Discount on Order <br />
                        {this.state.CartData.length > 0
                          ? " ₹" +
                            parseFloat(this.state.SummaryData.YouSaved).toFixed(
                              2
                            )
                          : 0}{" "}
                      </span>
                    </td>
                    {/* <td style={{ textAlign: "right", padding: "1%" }}>
                      &#8377;{" "}
                      {this.state.CartData.length > 0 ? parseFloat(this.state.CartData.map(info => (this.state.SummaryData.OfferPercent == '' || this.state.SummaryData.OfferPercent == null ? 0 : parseFloat(((info.fld_discountprice*info.fld_quantity)/(1+(info.fld_gstpercent/100)))*this.state.SummaryData.OfferPercent/100).toFixed(2))).reduce((prev, next) => parseFloat(prev) + parseFloat(next))).toFixed(2) : 0}

                    </td> */}
                  </tr>
                  {/* </td> */}
                  {/* </tr> */}
                </tbody>
              </table>
              <table
                style={{
                  width: "1000px",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRightColor: "#000",
                  borderTop: "hidden",
                  fontFamily: "Lato, sans-serif",
                  borderCollapse: "collapse",
                }}
                border="1"
                cellspacing="1"
                cellpadding="0"
              >
                <tbody>
                  <tr>
                    <td
                      colspan="10"
                      style={{
                        paddingTop: "1%",
                        paddingBottom: "1%",
                        textAlign: "center",
                      }}
                    >
                      Have a Question?
                      <br /> Call us on 91 90244 22444 or Email us at
                      wecare@beatmysugar.com
                    </td>
                  </tr>

                  <tr class="success" style={{ backgroundColor: "#f7f7f7" }}>
                    <td
                      colspan="10"
                      style={{
                        paddingTop: "1%",
                        paddingBottom: "1%",
                        textAlign: "center",
                        background: "#f7f7f7",
                      }}
                    >
                      Visit us at{" "}
                      <a href="https://beatmysugar.com/">www.beatmysugar.com</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <form
              action="https://secure.payu.in/_payment"
              id="payment_form"
              method="Post"
            >
              <div style={{ display: "none" }}>
                <input type="hidden" id="udf5" name="udf5" value="" />

                <input
                  type="hidden"
                  id="surl"
                  name="surl"
                  value="https://api.beatmysugar.com/BackofficeApi/Response"
                />
                <input
                  type="hidden"
                  id="furl"
                  name="furl"
                  value="https://api.beatmysugar.com/BackofficeApi/Response"
                />
                <input
                  type="hidden"
                  id="curl"
                  name="curl"
                  value="https://api.beatmysugar.com/BackofficeApi/Response"
                />
                <input
                  type="hidden"
                  id="key"
                  name="key"
                  value={this.state.MerKey}
                />
                <div class="dv">
                  <span class="text">
                    <label>Transaction/Order ID:</label>
                  </span>
                  <span>
                    <input
                      type="text"
                      id="txnid"
                      name="txnid"
                      placeholder="Transaction ID"
                      value={this.state.TxnId}
                    />
                  </span>
                </div>

                <div class="dv">
                  <span class="text">
                    <label>Amount:</label>
                  </span>
                  <span>
                    <input
                      type="text"
                      id="amount"
                      name="amount"
                      placeholder="Amount"
                      value={parseFloat(
                        '1'
                      ).toFixed(2)}
                    />
                  </span>
                </div>

                <div class="dv">
                  <span class="text">
                    <label>Product Info:</label>
                  </span>
                  <span>
                    <input
                      type="text"
                      id="productinfo"
                      name="productinfo"
                      placeholder="Product Info"
                      value={"Diabetic Products"}
                    />
                  </span>
                </div>

                <div class="dv">
                  <span class="text">
                    <label>First Name:</label>
                  </span>
                  <span>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      placeholder="First Name"
                      value={this.state.CustomerLoginData.fld_name}
                    />
                  </span>
                </div>

                <div class="dv">
                  <span class="text">
                    <label>Last Name:</label>
                  </span>
                  <span>
                    <input
                      type="text"
                      id="Lastname"
                      name="Lastname"
                      placeholder="Last Name"
                      value=""
                    />
                  </span>
                </div>

                <div class="dv">
                  <span class="text">
                    <label>Email ID:</label>
                  </span>
                  <span>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email ID"
                      value={this.state.CustomerLoginData.fld_email}
                    />
                  </span>
                </div>

                <div class="dv">
                  <span class="text">
                    <label>Mobile/Cell Number:</label>
                  </span>
                  <span>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Mobile/Cell Number"
                      value={this.state.CustomerLoginData.fld_mobile}
                    />
                  </span>
                </div>

                {/* <div class="dv">
      <span class="text"><label>PG:</label></span>
      <span>

    <input type="text" id="Pg" name="Pg" placeholder="PG" value="CC" /></span>
      </div> */}

                <div class="dv">
                  <span class="text">
                    <label>Hash:</label>
                  </span>
                  <span>
                    <input
                      type="text"
                      id="hash"
                      name="hash"
                      placeholder="Hash"
                      value={this.state.CustomerHash}
                    />
                  </span>
                </div>
              </div>

              <button
                style={{
                  width: "70%",
                  margin: "auto",
                  marginTop: "50px",
                  display:
                    this.state.SummaryData.PayMode == "Online" ? "" : "none",
                }}
                class="btn btn-block btn-sm btn-primary"
                // onClick={this.PlaceOrder.bind(this)}
              >
                Pay & Place Order
              </button>
            </form>

            <button
              style={{
                width: "70%",
                margin: "auto",
                marginTop: "50px",
                display: this.state.SummaryData.PayMode == "COD" ? "" : "none",
              }}
              class="btn btn-block btn-sm btn-primary"
              // onClick={this.PlaceOrder.bind(this)}
              onClick={() => {
                window.location.href = `/paymentprocess/${this.state.TxnId}`;
              }}
            >
              Place Order
            </button>

            <div class="mb-4"></div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Orderplace;
