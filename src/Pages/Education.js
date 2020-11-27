import React from "react";
import Menu from "../Header";
import Footer from "../Footer";
import GetApiCall from "../GetApi";
import PostApiCall from "../Api";
import Notiflix from "notiflix-react";
import HeaderCourseProgress from '../Education/HeaderCourseProgress';
import CourseContentList from '../Education/CourseContentList';
import CourseContentDetails from '../Education/CourseContentDetails';
import CourseQuestionsAns from '../Education/CourseQuestionAns';
import CourseQuestionsAnsList from '../Education/CorrectQestionAnsList';
import UserFeedBackView from '../Education/UserFeedback';
import CongratulationView from '../Education/Congratulation';

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      EmailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

      EnteredOtp: "",
      ChapterData: [],
      ResendCount: 0,
      MobileOtp: "",
      Show_course_content_list : true, //
      Show_Topics : false,
      Show_Questions_Module : false,
      Show_Correct_Question_Ans : false,
      Topic_Details : [],
      current_chapter_data: '',
      current_topic_index : 0,
      current_chapter_index : 0,
      ChapterQuestionList:[],
      is_finel_chapter : false,
      Show_User_Feedback : false,
      Show_Congratulation_Page : false
    };
  }

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    }); 
    
    Notiflix.Loading.Dots()
    GetApiCall.getRequest("GetChaperListData").then((results) => {
    
        results.json().then(data => ({
          data: data,
          status: results.status
        })
    ).then(res => {
        this.setState({ ChapterData : res.data.data });
        Notiflix.Loading.Remove();
        }) 
    })
  }

  showTopicDetails=(topic, current_chapter_data, current_topic_index, chapterIndex )=>{
    if(chapterIndex === this.state.ChapterData.length-1 ){
      this.setState({ is_finel_chapter : true});
    }

    this.setState({ 
      Show_course_content_list : false, 
      Show_Topics : true, 
      Show_Questions_Module: false,
      Show_Correct_Question_Ans : false,
      Topic_Details : topic, 
      current_chapter_data: current_chapter_data, 
      current_topic_index : current_topic_index, 
      current_chapter_index : chapterIndex
    });
  }

  setQuestionsView=( chapter_id)=>{
    // chapterid
    Notiflix.Loading.Dots()
    GetApiCall.getRequest("ListQuestion?chapterid="+ chapter_id).then(resultdes =>
      resultdes.json().then(obj => {
      this.setState({
        ChapterQuestionList : obj.data, Show_Questions_Module : true, Show_Topics : false, Show_course_content_list : false, Show_Correct_Question_Ans : false, Show_User_Feedback : false
      })
      Notiflix.Loading.Remove();
    }))
  }

  updateUserAnsAndShowCorrectAns=( questionDataWithUserAns)=>{
    // post api to users answer of questions.
    this.setState({
      ChapterQuestionList : questionDataWithUserAns, Show_Questions_Module : false, Show_Topics : false, Show_course_content_list : false, Show_Correct_Question_Ans : true, Show_User_Feedback : false
    })
    console.log(questionDataWithUserAns);
  }

  gotoNextTopic=(current_topic_index)=>{
    debugger;
    this.setState({ Topic_Details : this.state.current_chapter_data.topics[current_topic_index], current_topic_index: current_topic_index });
  }

  goToNextChapterTopic=()=>{
    let ChapterData = this.state.ChapterData;
    debugger;
    if(this.state.current_chapter_index< ChapterData.length-1){
      let current_chapter_data = ChapterData[this.state.current_chapter_index+1];
      let topic =  current_chapter_data.topics.length > 0 ? current_chapter_data.topics[0] : '';
      let current_topic_index = 0;
      let current_chapter_index = this.state.current_chapter_index+1;
      //unlock new chapter first topic.
     this.showTopicDetails( topic, current_chapter_data, current_topic_index, current_chapter_index)
    }else{
      this.setState({  Show_course_content_list : false, 
        Show_Topics : false, 
        Show_Questions_Module: false,
        Show_Correct_Question_Ans : false,
        Show_User_Feedback : true,
      });
    }
    
  }

  onSubmitFeedback =(feedback)=>{
    // user feedback api...
    // go to congratulation .....
    this.setState({  Show_course_content_list : false, 
      Show_Topics : false, 
      Show_Questions_Module: false,
      Show_Correct_Question_Ans : false,
      Show_User_Feedback : false,
      Show_Congratulation_Page : true
    });
  }


  render() {
    const { Show_course_content_list, Topic_Details, Show_Topics, current_topic_index , current_chapter_index, Show_Questions_Module, ChapterQuestionList,
      current_chapter_data, Show_Correct_Question_Ans, is_finel_chapter, Show_User_Feedback, Show_Congratulation_Page} = this.state;
    return (
      <div>
        <Menu></Menu>
        <div class="account-section"> 
            <div class="co">
                <div class="container" style={{background:"none"}}>
                    <div class="row mt-2">
                        <div class="col-lg-9 order-lg-last ">
                            <div class="dashboard-content">
                                <HeaderCourseProgress />
                                <div class="row">
                                    <div class="col-md-12">
                                      { Show_course_content_list === true ? 
                                        <CourseContentList 
                                          ChapterData={this.state.ChapterData}
                                          showTopicDetails={this.showTopicDetails}
                                        /> 
                                      : Show_Topics === true ? 
                                        <CourseContentDetails  
                                          current_chapter_data = {current_chapter_data}
                                          Topic_Details = {Topic_Details} 
                                          current_topic_index={current_topic_index} 
                                          current_chapter_index={current_chapter_index} 
                                          gotoNextTopic={this.gotoNextTopic}
                                          setQuestionsView={this.setQuestionsView}
                                        />
                                      : Show_Questions_Module === true ?
                                        <CourseQuestionsAns
                                          ChapterQuestionList = {ChapterQuestionList}
                                          updateUserAnsAndShowCorrectAns = {this.updateUserAnsAndShowCorrectAns}
                                        />
                                      : Show_Correct_Question_Ans === true?
                                        <CourseQuestionsAnsList 
                                          ChapterQuestionList = {ChapterQuestionList}
                                          goToNextChapterTopic={this.goToNextChapterTopic}
                                          is_finel_chapter={is_finel_chapter}
                                        />
                                      : Show_User_Feedback === true?
                                        <UserFeedBackView onSubmitFeedback={this.onSubmitFeedback} />
                                      : Show_Congratulation_Page=== true ?
                                        <CongratulationView />
                                      :
                                      ''
                                      }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Education;
