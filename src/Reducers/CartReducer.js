const intialiseState = {
    ItemCount :  0,
    TotalAmount : 0
      };
      
      export default (state = intialiseState, action) => {
        switch (action.type) {
          case "SET_ITEM_COUNT":
            return {
              ...state,
              ItemCount:   action.payload,
            };
            case "SET_AMOUNT":
                return {
                  ...state,
                  TotalAmount:  action.payload,
                };
            // case "SET_BLOG_DETAILS":
            //   return {
            //     ...state,
            //     BlogDetails: action.payload
            //   };
          default:
            return state;
        }
      };