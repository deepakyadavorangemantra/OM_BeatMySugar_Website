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
class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chaptersList :[],
            questionData : [],
            correct_ans_count : 0
        };
    }

    componentDidMount() {

        if(this.props.location.state){
            let count =0;
            let questionlistData = this.props.location.state.questionData;
            for(let i=0; i<questionlistData.length;i++){
                let questionData = questionlistData[i];
                let options = questionlistData[i].options.filter(item => item.fld_iscorrect==1);
                if(options.length>0 && options[0].fld_id === questionData.user_ans){
                    count++;
                }
            }
            this.setState({ correct_ans_count : count, chaptersList : this.props.location.state.chaptersList, questionData : this.props.location.state.questionData });
        }else{
            this.props.history.push('/education')
        }
    }



 


 


    render() {
        const {  } = this.state;

                const { questionData, chaptersList, correct_ans_count } = this.state;

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
                                                                     <p class="answers wrong">Whenever my best friends are, that's where I want to be. <span class="wrongcomment">Wrong Answer</span></p>
                                                                    {/* <p class="answers correct">{option.fld_optiontext} <span class={  option.fld_id != questionData.user_ans ? "wrongcomment" : "correctcomment"}>Correct Answer</span></p> */}
                                                                </div>
                                                                :''
                                                            )
                                                        )}
                                                        </div>
                                                    })
                                                    }
                                                        <div class="submitbtn">
                                                            <button type="submit" class="activelinksubmit"><span>Submit &amp; Share Feedback </span><span><img src="/assets/images/next.png" /></span></button>
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

export default Answers;
