export const setChapterListFullDetails = chapterList => {
    return {
      type: "SET_CHAPTER_LIST_FULL_Details",
      payload: chapterList
    };
  };

export const setChapterTimerEnable =flag=>{
    return {
      type: "SET_CHAPTER_TOPIC_TIME_CHECK",
      payload: flag
    };
  };