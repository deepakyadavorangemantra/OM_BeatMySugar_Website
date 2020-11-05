const intialiseState = {
  Name: "",
  Mobile: "",
  Email: "",
  Password: "",
  ConfirmPassword: "",
  DobDay: "",
  DobMonth : '',
  DobYear : '',
  Gender: "Male",

  DayData: [],
  MonthData: [],
  YearData: []
};

export default (state = intialiseState, action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        Name: action.payload
      };
    case "SET_MOBILE":
      return {
        ...state,
        Mobile: action.payload
      };
    case "SET_EMAIL":
      return {
        ...state,
        Email: action.payload
      };
    case "SET_PASSWORD":
      return {
        ...state,
        Password: action.payload
      };
    case "SET_CONFIRM_PASSWORD":
      return {
        ...state,
        ConfirmPassword: action.payload
      };
    case "SET_DOB_DAY":
      return {
        ...state,
        DobDay: action.payload
      };
      case "SET_DOB_MONTH":
        return {
          ...state,
          DobMonth: action.payload
        };

        case "SET_DOB_YEAR":
            return {
              ...state,
              DobYear: action.payload
            };
    case "SET_GENDER":
      return {
        ...state,
        Gender: action.payload
      };
    case "SET_YEAR_DATA":
      return {
        ...state,
        YearData: action.payload
      };
    case "SET_MONTH_DATA":
      return {
        ...state,
        MonthData: action.payload
      };
    case "SET_DAY_DATA":
      return {
        ...state,
        DayData: action.payload
      };
      case "SET_CLEAR_DATA":
      return {
        ...state,
        Name: "",
        Mobile: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        DobDay: "",
        DobMonth : '',
        DobYear : '',
        Gender: "Male",

      };
    default:
      return state;
  }
};
