const intialiseState = {
  Title:"Dr.",
    Name:"",
    Email:"",
    Mobile:"",
    DOB:"",
    Gender:"Male",
    Marital:"",
    Occupation:"",
    ChangeoldPassword:'',
    ChangenewPassword:'',
    ChangeconfirmPassword:''


};

export default (state = intialiseState, action) => {
    switch (action.type) {
      case "SET__TITLE":
        return {
          ...state,
         Title: action.payload
        };
      case "SET__NAME":
        return {
          ...state,
         Name: action.payload
        };
        
        case "SET__EMAIL":
        return {
          ...state,
         Email: action.payload
        };
        case "SET_MOBILE":
        return {
          ...state,
         Mobile: action.payload
        };
       case "SET__DOB":
            return {
              ...state,
              DOB: action.payload
            };
            case "SET__GENDER":
                return {
                  ...state,
                  Gender: action.payload
                };
            case "SET__MARITAL":
                    return {
                      ...state,
                      Marital: action.payload
                    };
                    
                    case "SET__OCCUPATION":
                        return {
                          ...state,
                          Occupation: action.payload
                        };
                        case 'SET_CHANGEOLDPASSWORD':
                          return{
                              ...state,
                              ChangeoldPassword: action.payload
                          }
              
                          case 'SET_CHANGENEWPASSWORD':
                              return{
                                  ...state,
                                  ChangenewPassword:action.payload
                              }
              
                          case 'SET_CHANGECONFIRMPASSWORD':
                              return{
                                  ...state,
                                  ChangeconfirmPassword:action.payload
                              }
                             
                              case "SET_CLEAR_PROFILE":
                                    return {
                                      ...state,
                                      Title:"Dr.",
                                      Name:"",
                                      Email:"",
                                      Mobile:"",
                                      DOB:"",
                                      Gender:"Male",
                                      Marital:"",
                                      Occupation:"",
                                      ChangeoldPassword:'',
                                      ChangenewPassword:'',
                                      ChangeconfirmPassword:''
                                      
                                    };
                                  default:
                                    return state;
                                }
                            }