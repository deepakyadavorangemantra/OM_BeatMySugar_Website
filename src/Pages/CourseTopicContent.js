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
import { connect } from 'react-redux';
import courseImage from '../images/course.jpg'
class CourseTopicContentMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      EmailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

      EnteredOtp: "",
      ChapterData: [],
      contentIndex: 0,
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
      Show_Congratulation_Page : false,
      current_chapter_total_Topics:0
    };
  }

  componentDidMount() {
    debugger;
    const data = this.props.location.state;
    console.log( data.current_chapter);
    console.log( data.currect_topic);
    console.log( data.chaptersList);
    let current_chapter_index = (data.chaptersList.findIndex(x => x.fld_chapterid ==data.current_chapter.fld_chapterid));
    let current_topic_index = (data.current_chapter.topics.findIndex(x => x.fld_id ==data.currect_topic.fld_id));
    this.setState({ current_chapter_total_Topics : data.current_chapter.topics.length ,current_chapter_data : data.current_chapter, current_chapter_index : current_chapter_index, current_topic_index : current_topic_index, Topic_Details : data.currect_topic})
    
  }



   ordinal_suffix_of =(i)=> {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

  render() {
    const {  Topic_Details,  current_topic_index , current_chapter_index,  contentIndex, current_chapter_data, current_chapter_total_Topics} = this.state;

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
                      <div class="head-text">
                        <h1 class="main-head">Diabetes Learning Program</h1>
                        <p class="sub-head">A brief about the course and what is expected to be delivered and many more</p>
                        <div class="rating-box">
                          <span class="ratingtext">4.8 Rating</span>
                          <span class="ratingsse">
                          <span class="star-rating" title="70%">
                              <span class="back-stars">
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  <i class="fa fa-star-o" aria-hidden="true"></i>
                                  
                                  <span class="front-stars" style={{width: "70%"}}>
                                      <i class="fa fa-star" aria-hidden="true"></i>
                                      <i class="fa fa-star" aria-hidden="true"></i>
                                      <i class="fa fa-star" aria-hidden="true"></i>
                                      <i class="fa fa-star" aria-hidden="true"></i>
                                      <i class="fa fa-star" aria-hidden="true"></i>
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
                                <HeaderCourseProgress />
                                  <div class="course-details">
                                    <div class="homelink">
                                      <a href="#"><i class="fa fa-home" aria-hidden="true"></i></a>
                                    </div>
                                      <h3 class="panel-title">Chapter Number {current_chapter_index+1} :{ current_chapter_data.fld_title }</h3>
                                      <p><span class="topic">{ this.ordinal_suffix_of( current_topic_index + 1 ) }  Topics</span> . <span class="length"></span></p>
                                      <p class="coloredsec">{Topic_Details.fld_title}</p>
                                    <div class="course-details-disc">
                                   <h4>OBJECTIVE</h4> 
                                   { Topic_Details.contents && Topic_Details.contents.length > 0 ?
                                    <>
                                        <div class="col-md-12">
                                            <div  dangerouslySetInnerHTML= {{__html: Topic_Details.contents[contentIndex].fld_content ? Topic_Details.contents[contentIndex].fld_content : '' }}></div> 
                                        </div><br/>
                                        <div class="col-md-12">

                                            {current_topic_index > 0 && contentIndex ===0 ?
                                                <button disabled={ current_topic_index ===0 ?true : false } onClick={ ()=>{  this.props.gotoNextTopic(current_topic_index-1)  }}>Previous Topic</button>
                                                : <button disabled={ contentIndex ===0 ?true : false } onClick={ ()=>{this.setState({ contentIndex : contentIndex-1 })}}>Previous</button>
                                            }
                                                &nbsp;&nbsp;&nbsp;&nbsp;

                                            { Topic_Details.contents.length-1 === contentIndex  && current_chapter_total_Topics-1 ===  current_topic_index ? 
                                                    <button onClick={ ()=>{ this.props.setQuestionsView(Topic_Details.fld_chapterid) }}>Go to Questions</button> :
                                                Topic_Details.contents.length-1 === contentIndex ? 
                                                    <button onClick={ ()=>{ this.props.gotoNextTopic(current_topic_index+1); this.setState({ contentIndex :0}); }}> Next Topic </button> 
                                                :
                                                    <button onClick={ ()=>{ this.setState({ contentIndex : contentIndex+1});  }}> Next </button>
                                            }
                                        </div><br/> 
                                    </>: 'Not have content !' }
                                    </div>
                                  </div>
                                  <div class="navlinks">
                                      <div class="navlinkbutton next"><a class="disable" href="#"><span><img src="/assets/images/previous.png"/></span> Previous Topic</a></div>
                                      <div class="navlinkbutton previous">
                                        <a class="activelink" href="#">Next Topic <span><img src="/assets/images/next.png"/></span> </a>
                                        <p>Topic 2 - Lorem Ipsum dummy text lorem</p>
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
  chaptersList : state.CourseContentReducer.ChapterListFullDetails
});

export default connect(mapStateToProps)(CourseTopicContentMain);