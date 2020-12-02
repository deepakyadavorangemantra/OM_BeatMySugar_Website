import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./App";
import AllopathyDetails from "./AllopathyDetails";
import AllopathyListing from "./AllopathyListing";
import AyurvedaListing from "./AyurvedaListing";
import AyurvedaDetails from "./AyurvedaDetails";
import BookDetails from "./BookDetails";
import BookListing from "./BookListing";
import Checkout from "./Checkout";
import Cart from "./Cart";
import DeviceDetails from "./DeviceDetails";
import DoctorDetails from "./DoctorDetails";
import DoctorListing from "./DoctorListing";
import FootcareListing from "./FootcareListing";
import FootcareDetails from "./FootcareDetails";
import HealthcareDeviceListing from "./HealthcareDeviceListing";
import LabDetails from "./LabDetais";
import Orderplace from "./Orderplace";
import Orders from "./Orders";
import Nutritionist from "./NutritionistListing";
import Yoga from "./Yoga";
import LabListing from "./LabListing";
import NutritionistDetails from "./NutritionistDetails";
import Login from "./Login";
import Register from "./RegistrationPage";
import Profile from "./Profile";
import Logout from "./Logout";

import Newaddress from "./Newaddress";
import Prescription from "./Prescription";
import PrescriptionForm from "./PrescriptionForm";
import PrescriptionAddress from "./PrescriptionAddress";
import FoodListing from "./FoodListing";
import FoodDetails from "./FoodDetails";
import Contact from "./Contact";
import Blog from "./Blog";
import BlogInner from "./BlogInner";
import ResetPassword from "./ResetPassword";
import ResetPasswordPage from "./ResetPasswordPage";
import Results from "./Results";
import BlogCategory from "./BlogCategory";
import EmailVerification from "./EmailVerification";
import AboutUs from "./AboutUs";
import PrivacyPolicy from "./PrivacyPolicy";
import Disclaimer from "./Disclaimer";
import TermsCondition from "./TermsCondition";
import Careers from "./Careers";
import AboutUsDummy from "./AboutUsDummy";
import CareersDummy from "./CareersDummy";
import TermsDummy from "./TermsDummy";
import DisclaimerDummy from "./DisclaimerDummy";
import PrivacyPolicyDummy from "./PrivacyPolicyDummy";
import ContactUsDummy from "./ContactUsDummy";
import MobileVerification from "./MobileVerification";
import Contributors from "./Contributors";
import ContributorDetails from "./ContributorDetails";
import SocksListing from "./SocksListing";
import SocksDetails from "./SocksDetails";
import Sellwithus from "./SellWithUs";
import Insurance from './Insurance';
import CareersListing from './CareersListing'
import CartUpdated from './CartUpdated'
import Account from './Account'
import Editprofile from "./Editprofile";
import Addressbook from "./Addressbook";
import Editaddress from "./Editaddress";
import Orderhistory from "./Orderhistory";
import Wishlist from "./Wishlist";
import Trackorder from "./Trackorder";
import Returnorder from "./Returnorder";
import Returnorderpayment from "./Returnorderpayment";
import Diabeticprofile from "./Diabeticprofile";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFail from "./PaymentFail";

import IPR from './IPR';
import Returnpolicy from './Returnpolicy';
import Shippingpolicy from './Shippingpolicy';
import AlterCustomerAddress from "./AlterCustomerAddress";
import Tabs from './Tabs';
import PaymentProcess from "./PaymentProcess";
import OrderProcess from "./OrderProcess";
import VerifyEmailSuccess from "./VerifyEmailSuccess";
import Termsmarketplace from './Termsmarketplace';
import OrderSuccess from "./OrderSuccess";
import NotFound from "./NotFound";
import DiwalioffersListing from "./DiwalioffersListing";
import Education from "./Pages/Education";
import CourseContentMain from './Pages/CourseContent';
import TopicContentMain from './Pages/TopicNew';
import CourseTopicContentMain from './Pages/CourseTopicContent';

class Routing extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path={"/"} component={App} />

          <Route
            exact
            path={"/allopathy/:allopathyid"}
            component={AllopathyDetails}
          />

          <Route exact path={"/allopathy"} component={AllopathyListing} />

          <Route exact path={"/ayurveda"} component={AyurvedaListing} />

          <Route
            exact
            path={"/ayurveda/:ayurvedaid"}
            component={AyurvedaDetails}
          />

          <Route exact path={"/book/:bookid"} component={BookDetails} />

          <Route exact path={"/book"} component={BookListing} />

          {/* <Route exact path={"/cart"} component={Cart} /> */}

          <Route exact path={"/selectaddress"} component={Checkout} />

          <Route exact path={"/device/:deviceid"} component={DeviceDetails} />

          <Route exact path={"/doctor/:doctorid"} component={DoctorDetails} />

          <Route exact path={"/doctor"} component={DoctorListing} />

          <Route exact path={"/footwear"} component={FootcareListing} />

          <Route exact path={"/socks"} component={SocksListing} />

          <Route exact path={"/footwear/:footid/:varid/:footname"} component={FootcareDetails} />

          <Route exact path={"/socks/:socksid/:varid/:socksname"} component={SocksDetails} />

          <Route exact path={"/device"} component={HealthcareDeviceListing} />

          <Route exact path={"/lab/:labid"} component={LabDetails} />

          <Route exact path={"/placeorder"} component={Orderplace} />

          <Route exact path={"/Orders"} component={Orders} />

          <Route exact path={"/dietitian"} component={Nutritionist} />

          <Route exact path={"/yoga"} component={Yoga} />

          <Route exact path={"/lab"} component={LabListing} />

          <Route
            exact
            path={"/dietitian/:nutritionistid"}
            component={NutritionistDetails}
          />

          <Route exact path={"/Login"} component={Login} />

          <Route exact path={"/Register"} component={Register} />

          <Route exact path={"/profile"} component={Profile} />

          <Route exact path={"/Logout"} component={Logout} />

          <Route exact path={"/newaddress"} component={Newaddress} />

          <Route exact path={"/personalinformation"} component={Prescription} />

          <Route
            exact
            path={"/uploadprescription"}
            component={PrescriptionForm}
          />

          <Route
            exact
            path={"/PrescriptionAddress"}
            component={PrescriptionAddress}
          />

          <Route exact path={"/food/:id/:category"} component={FoodListing} />

          <Route exact path={"/food/:category/:foodid/:varid/:foodname"} component={FoodDetails} />

          <Route exact path={"/healthknowledge"} component={Blog} />

          {/* <Route exact path={'/healthknowledge/:category/:blogid'} component={BlogInner}/> */}

          <Route
            exact
            path={"/healthknowledge/:category/:sub/:blogid"}
            component={BlogInner}
          />

          {/* <Route exact path={'/recoverpassword'} component={ResetPassword}/> */}

          <Route
            exact
            path={"/recoverpassword"}
            component={ResetPasswordPage}
          />

          <Route exact path={"/results/:title"} component={Results} />

          {/* <Route exact path={'/contact'} component={Contact}/> */}

          <Route
            exact
            path={"/healthknowledge/:category"}
            component={BlogCategory}
          />

          <Route
            exact
            path={"/healthknowledge/:category/:sub"}
            component={BlogCategory}
          />

          <Route exact path={"/verifyemail"} component={EmailVerification} />

          <Route exact path={"/verifymobile"} component={MobileVerification} />

          <Route exact path={"/contactus"} component={Contact} />

          <Route exact path={"/aboutus"} component={AboutUs} />

          <Route exact path={"/privacypolicy"} component={PrivacyPolicy} />

          <Route exact path={"/disclaimer"} component={Disclaimer} />

          <Route exact path={"/termsandcondition"} component={TermsCondition} />
          <Route exact path={"/careers"} component={CareersListing} />

          <Route exact path={"/careers/:id/:title"} component={Careers} />

          <Route exact path={"/aboutusdummy"} component={AboutUsDummy} />

          <Route exact path={"/careersdummy"} component={CareersDummy} />
          <Route exact path={"/termsdummy"} component={TermsDummy} />
          <Route exact path={"/disclaimerdummy"} component={DisclaimerDummy} />
          <Route
            exact
            path={"/privacypolicydummy"}
            component={PrivacyPolicyDummy}
          />
          <Route exact path={"/contactusdummy"} component={ContactUsDummy} />
          <Route
            exact
            path={"/contributors/:contributorid"}
            component={ContributorDetails}
          />

          <Route
            exact
            path={"/sellwithus"}
            component={Sellwithus}
          />
          <Route
            exact
            path={"/insurance"}
            component={Insurance}
          />
            <Route
            exact
            path={"/careerslisting"}
            component={CareersListing}
          />

<Route
            exact
            path={"/cart"}
            component={CartUpdated}
          />

<Route
            exact
            path={"/account"}
            component={Account}
          />

<Route
            exact
            path={"/editprofile"}
            component={Editprofile}
          />

<Route
            exact
            path={"/addressbook"}
            component={Addressbook}
          />

<Route
            exact
            path={"/addnewaddress"}
            component={Editaddress}
          />

<Route
            exact
            path={"/editaddress"}
            component={AlterCustomerAddress}
          />

<Route
            exact
            path={"/orderhistory"}
            component={Orderhistory}
          />

<Route
            exact
            path={"/wishlist"}
            component={Wishlist}
          />

<Route
            exact
            path={"/trackorder"}
            component={Trackorder}
          />

<Route
            exact
            path={"/returnitem"}
            component={Returnorder}
          />
          
<Route
            exact
            path={"/returnorderpayment"}
            component={Returnorderpayment}
          />

<Route
            exact
            path={"/diabeticprofile"}
            component={Diabeticprofile}
          />

<Route
            exact
            path={"/intellectual"}
            component={IPR}
          />

<Route
            exact
            path={"/Returnpolicy"}
            component={Returnpolicy}
          />

<Route
            exact
            path={"/Shippingpolicy"}
            component={Shippingpolicy}
          />

<Route exact path={"/paymentsuccess/:txnid"} component={PaymentSuccess}/>

<Route exact path={"/ordersuccess/:txnid"} component={OrderSuccess}/>

<Route exact path={"/paymentprocess/:txnid"} component={PaymentProcess}/>

<Route exact path={"/orderprocess/:txnid"} component={OrderProcess}/>
          
<Route exact path={"/paymentfail/:txnid"} component={PaymentFail} />

<Route exact path={"/search/:key"} component={Tabs} />

<Route exact path={"/verifyemail/:email"} component={VerifyEmailSuccess} />

<Route
            exact
            path={"/Termsmarketplace"}
            component={Termsmarketplace}
          />



<Route
            exact
            path={"/pagenotfound"}
            component={NotFound}
          />

          {/* <Route
            exact
            path={"/ContributorDetails"}
            component={ContributorDetails}
          /> */}
        </div>
        <Route
            exact
            path={"/festive-offers"}
            component={DiwalioffersListing}
          />
        <Route exact path={"/educationDesign"} component={Education} />
        <Route exact path={"/education"} component={CourseContentMain} />
        <Route exact path={"/topicDesign"} component={TopicContentMain} />
        <Route exact path={"/education-topic"} component={CourseTopicContentMain} />
        
        
        
      </BrowserRouter>
    );
  }
}

export default Routing;
