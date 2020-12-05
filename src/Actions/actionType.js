export const setBlogData = blog => {
    return {
      type: "SET_BLOG_DATA",
      payload: blog
    };
  };


  export const setBlogDetails = blog => {
    return {
      type: "SET_BLOG_DETAILS",
      payload: blog
    };
  };


  // ------------------REGISTRATION----------------------------



  export const setCustomerName = name => {
    return {
      type: "SET_NAME",
      payload: name
    };
  };

  export const setCustomerMobile = mobile => {
    return {
      type: "SET_MOBILE",
      payload: mobile
    };
  };


  export const setCustomerEmail = email => {
    return {
      type: "SET_EMAIL",
      payload: email
    };
  };

  export const setCustomerPassword = password => {
    return {
      type: "SET_PASSWORD",
      payload: password
    };
  };


  export const setCustomerConfirmPassword = password => {
    return {
      type: "SET_CONFIRM_PASSWORD",
      payload: password
    };
  };

  export const setCustomerDobDay= dob => {
    return {
      type: "SET_DOB_DAY",
      payload: dob
    };
  };
  export const setCustomerDobMonth= dob => {
    return {
      type: "SET_DOB_MONTH",
      payload: dob
    };
  };
  export const setCustomerDobYear= dob => {
    return {
      type: "SET_DOB_YEAR",
      payload: dob
    };
  };

  export const setCustomerGender = gender => {
    return {
      type: "SET_GENDER",
      payload: gender
    };
  };


  export const setCustomerDayData = day => {
    return {
      type: "SET_DAY_DATA",
      payload: day
    };
  };

  export const setCustomerMonthData= month => {
    return {
      type: "SET_MONTH_DATA",
      payload: month
    };
  };

  export const setCustomerYearData = year => {
    return {
      type: "SET_YEAR_DATA",
      payload: year
    };
  };

  export const setCustomerClearData = () => {
    return {
      type: "SET_CLEAR_DATA",
    };
  };

  // ------------------------SellWithUS Reducers-------------------------

  export const setCompanyName = companyname => {
    return {
      type: "SET_COMPANY_NAME",
      payload: companyname
    };
  };
  export const setAddress = Address => {
    return {
      type: "SET_ADDRESS",
      payload: Address
    };
  };
  export const setCountry = country => {
    return {
      type: "SET_COUNTRY",
      payload: country
    };
  }; 
  export const setState = state => {
    return {
      type: "SET_STATE",
      payload: state
    };
  }; 
  export const setCity = city => {
    return {
      type: "SET_CITY",
      payload: city
    };
  }; 
  export const setPincode = pincode => {
    return {
      type: "SET_PINCODE",
      payload: pincode
    };
  };
  export const settitle = title => {
    return {
      type: "SET_TITLE",
      payload: title
    };
  };

  export const setname = name => {
    return {
      type: "SET_NAME",
      payload: name
    };
  };  
  export const setdesignation = designation => {
    return {
      type: "SET_DESIGNATION",
      payload: designation
    };
  };
  export const setemail = email => {
    return {
      type: "SET_EMAIL",
      payload: email
    };
  };
  
  export const setmobile = mobile=> {
    return {
      type: "SET_MOBILE",
      payload: mobile
    };
  };
  export const setworking = working => {
    return {
      type: "SET_WORKING",
      payload:  working
    };
  };
  export const setabout = about => {
    return {
      type: "SET_ABOUT",
      payload: about
    };
  };  

  export const setclearsell = () => {
    return {
      type: "SET_CLEAR_SELL",
    };
  };

  // ------------------------Insurance Reducers-------------------------
  export const setinsuredname = name => {
    return {
      type: "SET__NAME",
      payload: name
    };
  }; 

  export const setdob = dob => {
    return {
      type: "SET__DOB",
      payload: dob
    };
  }; 
  export const setinsuredaddress = address => {
    return {
      type: "SET__ADDRESS",
      payload: address
    };
  }; 
  export const setinsuredemail = email => {
    return {
      type: "SET__EMAIL",
      payload: email
    };
  }; 
  export const setinsuredmobile = mobile => {
    return {
      type: "SET__MOBILE",
      payload: mobile
    };
  }; 
  export const setinsuredtype = type => {
    return {
      type: "SET__INSURANCE_TYPE",
      payload: type
    };
  }; 
  export const setinsuredsum = sum => {
    return {
      type: "SET__SUM",
      payload: sum
    };
  }; 
  export const setinsureddisease = disease => {
    return {
      type: "SET__CURRENT_DISEASE",
      payload: disease
    };
  }; 
  export const setinsuredpolicy = policy => {
    return {
      type: "SET__POLICY",
      payload: policy
    };
  }; 
  export const setinsureddisclosure = disclosure => {
    return {
      type: "SET__DISCLOSURE",
      payload: disclosure
    };
  };

  export const setinsuredheight = height => {
    return {
      type: "SET__HEIGHT",
      payload: height
    };
  };
  export const setinsuredweight = weight => {
    return {
      type: "SET__WEIGHT",
      payload: weight
    };
  };
  
  export const setclearinsurance = () => {
    return {
      type: "SET_CLEAR_INSURANCE",
    };
  };


  // -------------------------Profile Reducers-------------------------
  export const setprofiletitle = title => {
    return {
      type: "SET__TITLE",
      payload: title
    };
  };
  export const setprofilename = name => {
    return {
      type: "SET__NAME",
      payload: name
    };
  };
  export const setprofileemail = email => {
    return {
      type: "SET__EMAIL",
      payload: email
    };
  };
  export const setprofilemobile = mobile => {
    return {
      type: "SET_MOBILE",
      payload: mobile
    };
  };
  export const setprofiledob = dob => {
    return {
      type: "SET__DOB",
      payload: dob
    };
  };
  export const setprofilegender = gender => {
    return {
      type: "SET__GENDER",
      payload: gender
    };
  };
  export const setprofilemarital = marital => {
    return {
      type: "SET__MARITAL",
      payload: marital
    };
  };
  export const setprofileoccupation = occupation => {
    return {
      type: "SET__OCCUPATION",
      payload: occupation
    };
  };
  export const setchangeoldpassword=changeoldpassword =>{
    return{
        type:"SET_CHANGEOLDPASSWORD",
        payload:changeoldpassword
    }
}
export const setchangenewpassword=changenewpassword =>{
    return{
        type:"SET_CHANGENEWPASSWORD",
        payload:changenewpassword
    }
}
export const setchangeconfirmpassword=changeconfirmpassword =>{
    return{
        type:"SET_CHANGECONFIRMPASSWORD",
        payload:changeconfirmpassword
    }
}
  
  export const setclearprofile = () => {
    return {
      type: "SET_CLEAR_PROFILE",
    };
  };


  export const setcartitemcount = (count) => {
    return {
      type: "SET_ITEM_COUNT",
      payload : count
    };
  };

  export const setcartamount = (count) => {
    return {
      type: "SET_AMOUNT",
      payload : count
    };
  };