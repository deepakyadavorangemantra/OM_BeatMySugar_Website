const intialiseState = {
    ChapterListFullDetails : [],
      };
      
      export default (state = intialiseState, action) => {
        switch (action.type) {
          case "SET_CHAPTER_LIST_FULL_Details":
            return {
              ...state,
              ChapterListFullDetails: action.payload
            };
            
          default:
            return state;
        }
      };