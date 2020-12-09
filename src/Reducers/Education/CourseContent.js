const intialiseState = {
    ChapterListFullDetails : [],
    ChapterTopicTimeCheck : false,
      };
      
      export default (state = intialiseState, action) => {
        switch (action.type) {
          case "SET_CHAPTER_LIST_FULL_Details":
            return {
              ...state,
              ChapterListFullDetails: action.payload
            };

            
            case "SET_CHAPTER_TOPIC_TIME_CHECK":
            return {
              ...state,
              ChapterTopicTimeCheck: action.payload
            };
            
          default:
            return state;
        }
      };