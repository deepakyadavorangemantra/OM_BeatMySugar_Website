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
import {connect} from 'react-redux';

import courseImage from '../images/course.jpg'
class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chaptersList :[],
            questionData : [],
            correct_ans_count : 0,
            is_finel_chapter : false,
            current_chapter_index : 0,
        };
    }

    componentDidMount() {

        if(this.props.location.state){
            let count =0;
            let questionlistData = this.props.location.state.questionData;
            let chaptersList = this.props.location.state.chaptersList;
            let current_chapter_index = this.props.location.state.current_chapter_index;
            for(let i=0; i<questionlistData.length;i++){
                let questionData = questionlistData[i];
                let options = questionlistData[i].options.filter(item => item.fld_iscorrect==1);
                if(options.length>0 && options[0].fld_id === questionData.user_ans){
                    count++;
                }
            }
            if(current_chapter_index === chaptersList.length-1 ){
                this.setState({ is_finel_chapter : true});
              }
            this.setState({ correct_ans_count : count, chaptersList : chaptersList, questionData : this.props.location.state.questionData, current_chapter_index:current_chapter_index });
        }else{
            this.props.history.push('/education')
        }
    }


    goToNextChapterTopic=()=>{
        let ChapterData = this.state.chaptersList;
        if(this.state.current_chapter_index< ChapterData.length-1){
        let current_chapter_data = ChapterData[this.state.current_chapter_index+1];
        let topic =  current_chapter_data.topics.length > 0 ? current_chapter_data.topics[0] : '';
        topic.fld_isunlocked = 0;
        let current_topic_index = 0;
        let current_chapter_index = this.state.current_chapter_index+1;
            
            this.props.history.push({
                pathname : '/education-topic',
                state : {
                current_chapter : current_chapter_data,
                currect_topic : topic,
                chaptersList : this.state.chaptersList
                }
            });
            
        }else{
            this.props.history.push('/feedback');
        }
    }
 


 


    render() {
        const {  } = this.state;

                const { questionData, chaptersList, correct_ans_count, is_finel_chapter } = this.state;

        return (
            <div>
                <Menu></Menu>
                <div class="account-section">
                    <div class="co">
                        {/* <div class="banner-sec">
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

                        </div> */}
                        <div class="container" style={{ background: "none" }}>
                            <div class="row mt-2">
                                <div class="col-lg-12 order-lg-first ">
                                    <div class="dashboard-content">
                                        <div class="progessandtime">
                                            <div class="question-progress-bar">
                                            { questionData && questionData.length>0 && questionData.map(( item, index)=>{
                                                return  item.user_ans ? <div class="progress-section attend"></div> : <div class="progress-section"></div> 
                                              })
                                            }
                                            </div>
                                            {/* <div class="time-section">
                                                <div class="time-coures-box">
                                                    <span class="time-icon"><i class="icon-clock-1"></i></span>
                                                    <span class="time-course-take">25 Min</span>
                                                </div>
                                            </div> */}
                                        </div>
                                        {/* <div class="prevquestion"><a class="prev" href="#"><span><img src="/assets/images/arrow.png" /></span> <span>Previous</span></a></div> */}
                                        <div class="question-course-details">
                                            <div class="homelink">
                                                <a href="/education"><i class="fa fa-home" aria-hidden="true"></i></a>
                                            </div>
                                            <div class="questions">
                                                <div class="questions-count">
                                                    <p>Question {correct_ans_count} / {questionData.length}</p>
                                                </div>
                                                <div class="quiz-form text-light">
                                                    <div class="my-5 qusestp">
                                                    { questionData && questionData.length>0 && questionData.map( (questionData, index)=>{

                                                        return<div class="answers">
                                                        <p class="lead question">{index+1}. {questionData.fld_questiontext}</p>
                                                        {
                                                            questionData.options && questionData.options.length>0 && questionData.options.map((option,index)=>(
                                                                option.fld_iscorrect === 1 ? 
                                                                <div class="form-check my-4 text-white-50">
                                                                    <p class={ "answers "+ (option.fld_id != questionData.user_ans ? "wrong" : "correct")}>{option.fld_optiontext} <span class={  option.fld_id != questionData.user_ans ? "wrongcomment" : "correctcomment"}>Answer</span></p>
                                                                </div>
                                                                :''
                                                            )
                                                        )}
                                                        </div>
                                                    })
                                                    }
                                                        <div class="submitbtn">
                                                            <button onClick={()=>{this.goToNextChapterTopic()}} class="activelinksubmit"><span>{ is_finel_chapter === true ? 
                                                                'Submit & Go To Feedback '
                                                                :
                                                                'Go To Next Chapter '
                                                            } </span><span><img src="/assets/images/next.png" /></span></button>
                                                        </div>
                                                    </div>
                                                </div>
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

const mapStateToProps = state => ({
    // chaptersList : state.CourseContentReducer.ChapterListFullDetails
  });
  
  export default connect(mapStateToProps)(Answers);