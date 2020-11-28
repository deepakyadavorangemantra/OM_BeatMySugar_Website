/* eslint-disable no-loop-func */
import React from "react";
import Menu from "./Header";
import Footer from "./Footer";
import PostApiCall from "./Api";
import Notiflix from "notiflix-react";
import GetApiCall from "./GetApi";
import moment from "moment";

class PaymentProcess extends React.Component {
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
      CustomerHash : '',

      ProdData : [],
      OrderData : []
   
   
    };
  }

  componentDidMount() {
    debugger;
    Notiflix.Loading.Init({
        svgColor: "#507dc0",
        //  #507dc0'
      });


      Notiflix.Loading.Dots('')

    //   window.location.href= `/orderprocess/${this.props.match.params.txnid}`;

    var arr = []
        var subt = 0
        var cn = 0

    PostApiCall.postRequest(
        {
          txnid: this.props.match.params.txnid,
          paystatus : 'Success',
          orderstatus : 'Placed'
        },
        "UpdateOrderConfirmationStatus"
      ).then((results1) =>
        // const objs = JSON.parse(result._bodyText)
        results1.json().then((obj) => {
          if (results1.status == 200 || results1.status == 201) {

            this.setState({
                OrderData : obj.data[0]
            })

            var infData = []
                var c = 0
                var c1 = 0

                console.log(obj.data[0])
          
       

                for(var j=0;j<obj.data[0].OrderDet.split('#').length;j++){

                    console.log(obj.data[0].OrderDet.split('#')[j].split('^')[2])

                    if(obj.data[0].OrderDet.split('#')[j].split('^')[2] == 'Food'){



                        PostApiCall.postRequest({

                            orderid : obj.data[0].fld_orderid,
                            productid : obj.data[0].OrderDet.split('#')[j].split('^')[3]
                     
                     },"GetFoodOrderDetail").then((results2) => 
                     
                       // const objs = JSON.parse(result._bodyText)
                       results2.json().then(obj2 => {
                    
                     
                       if(results2.status == 200 || results2.status==201){

                        // console.log(obj2.data)
                       
                        infData.push(obj2.data[0])
                        this.setState({
                            ProdData : infData
                        })
                        c1 = c1 +1

                        if(c1== obj.data[0].OrderDet.split('#').length){
                            // Notiflix.Loading.Remove()
                            // console.log('nidhi')
                            this.SendMailers()
                        }

                       }

                    }))


                    }else if(obj.data[0].OrderDet.split('#')[j].split('^')[2] == 'Footwear'){

                        PostApiCall.postRequest({

                            orderid : obj.data[0].fld_orderid,
                            productid : obj.data[0].OrderDet.split('#')[j].split('^')[3]
                     
                     },"GetFootwearOrderDetail").then((results2) => 
                     
                       // const objs = JSON.parse(result._bodyText)
                       results2.json().then(obj2 => {
                    
                     
                       if(results2.status == 200 || results2.status==201){

                        // console.log(obj2.data)
                       
                        infData.push(obj2.data[0])
                        this.setState({
                            ProdData : infData
                        })
                        c1 = c1 +1

                        if(c1== obj.data[0].OrderDet.split('#').length){
                            // Notiflix.Loading.Remove()
                            // console.log('nidhi')
                            this.SendMailers()
                        }
                       }

                    }))



                    }else if(obj.data[0].OrderDet.split('#')[j].split('^')[2] == 'Socks'){

                        PostApiCall.postRequest({

                            orderid : obj.data[0].fld_orderid,
                            productid : obj.data[0].OrderDet.split('#')[j].split('^')[3]
                     
                     },"GetSocksOrderDetail").then((results2) => 
                     
                       // const objs = JSON.parse(result._bodyText)
                       results2.json().then(obj2 => {
                    
                     
                       if(results2.status == 200 || results2.status==201){

                        // console.log(obj2.data)
                       
                        infData.push(obj2.data[0])
                        this.setState({
                            ProdData : infData
                        })
                        c1 = c1 +1

                        if(c1== obj.data[0].OrderDet.split('#').length){
                            // Notiflix.Loading.Remove()
                            // console.log('nidhi')
                            this.SendMailers()
                        }
                       }

                    }))

                    }else{
                      console.log('missing condition code');
                    }

                  

                }   
            


          }

        }))


  }


  SendMailers(){
    //   console.log(this.state.OrderData)
    //   console.log(this.state.ProdData)

    fetch(
        "https://www.instaalerts.zone/SendSMS/sendmsg.php?uname=globaltrendz&pass=abc321&send=BMSIND&dest=" +
        this.state.OrderData.fld_mobile +
          "&msg=Hi " +
          this.state.OrderData.fld_name +
          ", Your Order - " +
          this.state.OrderData.fld_ordernumber +
          " has been successfully placed. Team BeatMySugar"
      ).then((response) => response.json());

      PostApiCall.postRequest(
            {
              ordernumber: this.state.OrderData.fld_ordernumber,
              offeramount: this.state.OrderData.fld_offeramount,
              offerpercent: this.state.OrderData.fld_offerpercent,
              shippingcharges: this.state.OrderData.fld_shippingcharges,
              coddeliverycharges: this.state.OrderData.fld_coddeliverycharges,
              orderdate: moment().format("ll"),
              ordervalue: this.state.OrderData.fld_ordervalue,
              netcost: this.state.OrderData.fld_netcost,
              paymentmode:this.state.OrderData.fld_paymentmode,
              numofitems: this.state.OrderData.fld_numofitems,
              customeremail: this.state.OrderData.fld_email,
              customername: this.state.OrderData.fld_name,
              customermobile: this.state.OrderData.fld_mobile,
              billingaddress: this.state.OrderData.fld_billingaddress,
              deliveryaddress: this.state.OrderData.fld_deliveryaddress,
              shippingname: this.state.OrderData.fld_shippingname,
              shippingstreet:this.state.OrderData.fld_shippingstreet,
              shippinglandmark: this.state.OrderData.fld_shippinglandmark,
              shippingcountry: this.state.OrderData.fld_shippingcountry,
              shippingstate: this.state.OrderData.fld_shippingstate,
              shippingcity: this.state.OrderData.fld_shippingcity,
              shippingpincode: this.state.OrderData.fld_shippingpincode,
              shippingmobile: this.state.OrderData.fld_shippingmobile,
              billingname: this.state.OrderData.fld_billingname,
              billingstreet: this.state.OrderData.fld_billingstreet,
              billinglandmark: this.state.OrderData.fld_billinglandmark,
              billingcountry: this.state.OrderData.fld_billingcountry,
              billingstate: this.state.OrderData.fld_billingstate,
              billingcity: this.state.OrderData.fld_billingcity,
              billingpincode: this.state.OrderData.fld_billingpincode,
              billingmobile: this.state.OrderData.fld_billingmobile,
              offercode : this.state.OrderData.fld_offercode,
              orderdata: this.state.ProdData,
              yousave : this.state.OrderData.fld_yousave
            },
            "CustomerOrderMailer"
          ).then((results2) => 
                     
          // const objs = JSON.parse(result._bodyText)
          results2.json().then(obj2 => {
       
        
          if(results2.status == 200 || results2.status==201){


            var data = 
            {fld_userid: this.state.OrderData.fld_customerid,
            fld_email: this.state.OrderData.fld_email,
            fld_mobile: this.state.OrderData.fld_mobile,
            fld_name: this.state.OrderData.fld_name,
            fld_salt: this.state.OrderData.fld_salt,
   }

   localStorage.setItem(
    "CustomerLoginDetails",
    JSON.stringify(data)
  );
  if(this.state.OrderData.fld_paymentmode == 'COD'){
    window.location.href =  `/ordersuccess/${this.state.OrderData.fld_txnid}`;
  }else
  {
    window.location.href =  `/paymentsuccess/${this.state.OrderData.fld_txnid}`;
  }
          
          }
        }))


         


       

  }

  render() {
    return (
      <div>
  

      </div>
    );
  }
}

export default PaymentProcess;
