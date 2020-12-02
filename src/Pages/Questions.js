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


  render() {
    const { questionData, ChapterQuestionList, contentIndex } = this.state;

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
                           <img src="/assets/images/course.jpg" alt="course image"/>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
                <div class="container" style={{background:"none"}}>
                    <div class="row mt-2">
                        <div class="col-lg-12 order-lg-first ">
                            <div class="dashboard-content">
                                <div class="question-progress-bar">
                                        <div class="progress-section attend"></div>  
                                        <div class="progress-section"></div>
                                        <div class="progress-section"></div>
                                        <div class="progress-section"></div>
                                        <div class="progress-section"></div>
                                        <div class="progress-section"></div>
                                        <div class="progress-section"></div>
                                        <div class="progress-section"></div>
                                </div>
                                <div class="prevquestion">
                                <button class="prev" disabled={ contentIndex ===0 ?true : false } onClick={ ()=>{ this.setState({questionData : ChapterQuestionList[contentIndex-1] }); this.setState({contentIndex :contentIndex-1}) }}><span><img src="/assets/images/arrow.png"/></span> <span>Previous</span></button>
                                 </div>
                                  {/* <a class="prev" href="#"><span><img src="/assets/images/arrow.png"/></span> <span>Previous</span></a></div> */}
                                  <div class="question-course-details">
                                    <div class="homelink">
                                      <a href="#"><i class="fa fa-home" aria-hidden="true"></i></a>
                                    </div>
                                   <div class="questions">
                                       <div class="questions-count">
                                                <p>Question  {contentIndex+1} / {ChapterQuestionList.length}</p>
                                       </div>
                                       <form class="quiz-form text-light">
                                            <div class="my-5 qusestp">
                                              <p class="lead question">1. {questionData.fld_questiontext}</p>
                                              {
                                                  questionData.options && questionData.options.length>0 && questionData.options.map((option,index)=>(
                                                  <div class="form-check my-4 text-white-50">
                                                    <input  
                                                      type="radio" 
                                                      onChange={ ()=>{ this.handleCheckChange(option.fld_id) }}
                                                      checked={ questionData.user_ans === option.fld_id? true : false}  
                                                      id={option.fld_id}
                                                      value={option.fld_id}
                                                    />
                                                    <label for={option.fld_id} class="form-check-label" >{option.fld_optiontext}</label>
                                                  </div>
                                                  )
                                              )} 
                                              { ChapterQuestionList && ChapterQuestionList.length>0 ?
                                              <div class="submitbtn">
                                               
                                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                                { ChapterQuestionList.length-1 === contentIndex ? 
                                                  <button class="activelinksubmit" disabled={ questionData.user_ans != undefined?  false : true} onClick={()=>{ this.props.updateUserAnsAndShowCorrectAns(ChapterQuestionList) }}>Submit & Check Correct Answer -{'>'}</button> 
                                                  :
                                                  <button class="activelinksubmit" disabled={ questionData.user_ans != undefined?  false : true} onClick={ ()=>{ this.setState({questionData : ChapterQuestionList[contentIndex+1] }); this.setState({contentIndex :contentIndex+1}) }}>Next Question</button>
                                                }
                                              </div>:''}
                                            </div>
                                        </form>
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

export default Questions;
