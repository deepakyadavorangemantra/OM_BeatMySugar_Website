const intialiseState = {
    BlogData : [],
    BlogDetails : []
      };
      
      export default (state = intialiseState, action) => {
        switch (action.type) {
          case "SET_BLOG_DATA":
            return {
              ...state,
              BlogData: action.payload
            };
            case "SET_BLOG_DETAILS":
              return {
                ...state,
                BlogDetails: action.payload
              };
          default:
            return state;
        }
      };