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

import courseImage from '../images/course.jpg'
class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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
      ChapterQuestionList: [],
      is_finel_chapter : false,
      Show_User_Feedback : false,
      Show_Congratulation_Page : false,
      questionData : '',
      contentIndex : 0,
    };
  }

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    }); 
    
    Notiflix.Loading.Dots()
    if(this.props.location.state){
      this.setQuestionsView(this.props.location.state.chapter_id)
    }else{
      this.props.history.push('/education')
    }
  }


  setQuestionsView=( chapter_id)=>{
    GetApiCall.getRequest("ListQuestion?chapterid="+ chapter_id).then(resultdes =>
      resultdes.json().then(obj => {
      this.setState({
        ChapterQuestionList : obj.data,
        questionData : obj.data[0]
      })
      Notiflix.Loading.Remove();
    }))
  }

  updateUserAnsAndShowCorrectAns=( questionDataWithUserAns)=>{
    // post api to users answer of questions.
    this.setState({
      ChapterQuestionList : questionDataWithUserAns, Show_Questions_Module : false, Show_Topics : false, Show_course_content_list : false, Show_Correct_Question_Ans : true, Show_User_Feedback : false
    })
  }

  handleCheckChange( option_data){
    let question = this.state.questionData;
    question.user_ans = option_data;
    this.setState({ questionData : question });
  }

  updateUserAnsAndShowCorrectAns=(questionData)=>{
    debugger;
    var log = localStorage.getItem("CustomerLoginDetails");
    var login = JSON.parse(log);
    if(login != null && login != ""){
      console.log(login.fld_userid);
      console.log(questionData);
      
    }
   
  }


    }

  render() {
    const { questionData, ChapterQuestionList, contentIndex } = this.state;


    render() {
        const { Show_course_content_list, Topic_Details, Show_Topics, current_topic_index, current_chapter_index, Show_Questions_Module, ChapterQuestionList,
            current_chapter_data, Show_Correct_Question_Ans, is_finel_chapter, Show_User_Feedback, Show_Congratulation_Page } = this.state;

        var log = localStorage.getItem(
            "CustomerLoginDetails"
        );
        var login = JSON.parse(log);


        return (
            <div>
                <Menu></Menu>
                <div class="account-section">
                    <div class="co">
                        <div class="banner-sec">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-8">
                                        <div className="head-text">
                                            <h1 className="main-head">Diabetes Learning Program</h1>
                                            <p className="sub-head">A brief about the course and what is expected to be delivered and many more</p>
                                            <div className="rating-box">
                                                <span className="ratingtext">4.8 Rating</span>
                                                <span className="ratingsse">
                                                    <span className="star-rating" title="70%">
                                                        <span className="back-stars">
                                                            <i className="icon-star-empty" aria-hidden="true"></i>
                                                            <i className="icon-star-empty" aria-hidden="true"></i>
                                                            <i className="icon-star-empty" aria-hidden="true"></i>
                                                            <i className="icon-star-empty" aria-hidden="true"></i>
                                                            <i className="icon-star-empty" aria-hidden="true"></i>

                                                            <span className="front-stars" style={{ width: "70%" }}>
                                                                <i className="icon-star" aria-hidden="true"></i>
                                                                <i className="icon-star" aria-hidden="true"></i>
                                                                <i className="icon-star" aria-hidden="true"></i>
                                                                <i className="icon-star" aria-hidden="true"></i>
                                                                <i className="icon-star" aria-hidden="true"></i>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="tag-section">
                                            <div class="tag-box"><img src="/assets/images/free.png" /><span class="tagtext">On Demand</span></div>

                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="courseimage">
                                            <img src="/assets/images/course.jpg" alt="course image" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="container" style={{ background: "none" }}>
                            <div class="row mt-2">
                                <div class="col-lg-12 order-lg-first ">
                                    <div class="dashboard-content">
                                        <div class="progessandtime">
                                            <div class="question-progress-bar">
                                                <div class="progress-section attend"></div>
                                                <div class="progress-section"></div>
                                                <div class="progress-section"></div>
                                                <div class="progress-section"></div>
                                                <div class="progress-section"></div>
                                            </div>
                                            <div class="time-section">
                                                <div class="time-coures-box">
                                                    <span class="time-icon"><i class="icon-clock-1"></i></span>
                                                    <span class="time-course-take">25 Min</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="prevquestion"><a class="prev" href="#"><span><img src="/assets/images/arrow.png" /></span> <span>Previous</span></a></div>
                                        <div class="question-course-details">
                                            <div class="homelink">
                                                <a href="#"><i class="fa fa-home" aria-hidden="true"></i></a>
                                            </div>
                                            <div class="questions">
                                                <div class="questions-count">
                                                    <p>Question 1 / 5</p>
                                                </div>
                                                <form class="quiz-form text-light">
                                                    <div class="my-5 qusestp">
                                                        <p class="lead question">1. Are you working towards any health goals?</p>
                                                        <div class="form-check my-4 text-white-50">
                                                            <input id="1" type="radio" name="q1" value="A" />
                                                            <label for="1" class="form-check-label">A place where don't question my authority.</label>
                                                        </div>
                                                        <div class="form-check my-4 text-white-50">
                                                            <input id="2" type="radio" name="q1" value="B" />
                                                            <label for="2" class="form-check-label">Whenever my best friends are, that's where I want to be.</label>
                                                        </div>
                                                        <div class="form-check my-4 text-white-50">
                                                            <input id="3" type="radio" name="q1" value="c" />
                                                            <label for="3" class="form-check-label">A place where everyone knows I'm the Boss.</label>
                                                        </div>
                                                        <div class="form-check my-4 text-white-50">
                                                            <input id="4" type="radio" name="q1" value="d" />
                                                            <label for="4" class="form-check-label">A place where I'm the boss.</label>
                                                        </div>
                                                        <div class="submitbtn">
                                                            <button type="submit" class="activelinksubmit"><span>Next Question </span><span><img src="/assets/images/next.png" /></span></button>

                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        {/* <div class="row">
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
                                </div> */}
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

export default Questions;
