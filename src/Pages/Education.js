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

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      EmailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

      EnteredOtp: "",
      ChapterData: [],
      ResendCount: 0,
      MobileOtp: "",
      Show_course_content_list : true,
      Show_Topics : false,
      Show_Questions_Module : false,
      Show_Correct_Question_Ans : false,
      Topic_Details : [],
      edit_chapter: '',
      current_topic_index : 0,
      current_index : 0,
      ChapterQuestionList:[]
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

  showTopicDetails=(topic, edit_chapter, current_topic_index, chapterIndex )=>{
    this.setState({ 
      Show_course_content_list : false, 
      Show_Topics : true, 
      Topic_Details : topic, 
      edit_chapter: edit_chapter, 
      current_topic_index : current_topic_index, 
      current_index : chapterIndex
    });
  }

  setQuestionsView=( chapter_id)=>{
    // chapterid
    Notiflix.Loading.Dots()
    GetApiCall.getRequest("ListQuestion?chapterid="+ chapter_id).then(resultdes =>
      resultdes.json().then(obj => {
      this.setState({
        ChapterQuestionList : obj.data, Show_Questions_Module : true, Show_Topics : false, Show_course_content_list : false, Show_Correct_Question_Ans : false
      })
      Notiflix.Loading.Remove();
    }))
  }

  updateUserAnsAndShowCorrectAns=( questionDataWithUserAns)=>{
    // post api to users answer of questions.
    this.setState({
      ChapterQuestionList : questionDataWithUserAns, Show_Questions_Module : false, Show_Topics : false, Show_course_content_list : false, Show_Correct_Question_Ans : true
    })
    console.log(questionDataWithUserAns);
  }

  goToNextChapterTopic=()=>{
    //unlock new chapter first topic.
    // showTopicDetails( topic, edit_chapter, current_topic_index, chapterIndex)
  }


  render() {
    const { Show_course_content_list, Topic_Details, Show_Topics, current_topic_index , current_index, Show_Questions_Module, ChapterQuestionList, Show_Correct_Question_Ans} = this.state;
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
                                          Topic_Details = {Topic_Details} 
                                          current_topic_index={current_topic_index} 
                                          current_index={current_index} 
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
                                        />
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
