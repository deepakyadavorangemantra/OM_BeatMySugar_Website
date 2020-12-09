import React from "react";
import Menu from "../Header";
import Footer from "../Footer";
import GetApiCall from "../GetApi";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PostApiCall from "../Api";
import Notiflix from "notiflix-react";
import HeaderCourseProgress from '../Education/HeaderCourseProgress';
import {setChapterListFullDetails} from '../Actions/Education/actionType';
import moment from 'moment';
import CourseContentList from '../Education/CourseContentList';
import CourseContentDetails from '../Education/CourseContentDetails';
import CourseQuestionsAns from '../Education/CourseQuestionAns';
import CourseQuestionsAnsList from '../Education/CorrectQestionAnsList';
import UserFeedBackView from '../Education/UserFeedback';
import CongratulationView from '../Education/Congratulation';

import courseImage from '../images/course.jpg';
class CourseContentMain extends React.Component {
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
      Show_Congratulation_Page : false,
      resume_learning : {isCompleted: false, fld_currentchapter : 0, fld_currenttopic : 0, start : true},
      rating:0,
      rating_per:0
    };
  }

  componentDidMount() {
    Notiflix.Loading.Init({
      svgColor: "#507dc0",
      //  #507dc0'
    }); 
    Notiflix.Loading.Dots()

    var log = localStorage.getItem("CustomerLoginDetails");
    var login = JSON.parse(log);
    if(login != null && login != ""){
      this.getChapterContentByUser(login.fld_userid);
      this.checkFeedbackByUser(login.fld_userid);
      this.addUserEducationModule(login.fld_userid);
    }else{
      this.getChapterContent();
    }
    this.getEducationModuleRating();
  }
  getEducationModuleRating=()=>{
    GetApiCall.getRequest("EducationDashboard").then((results) => {
      results.json().then(data => ({
        data: data,
      })
    ).then(res => {
          if(res.data.data)
          this.setState({ rating : res.data.data.overall_rating, rating_per : parseInt((res.data.data.overall_rating/5)*100)})
      });
    });
  }

  addUserEducationModule=(customerid)=>{
    PostApiCall.postRequest({ 
      
        customerid:customerid,
        currentchapter:0,
        currenttopic:0,
        iscompleted:0,
        alertmailsent:0,
        giftdeliverystatus:0,
        createdon:'',
        status:1
    
    },"AddCustomersEducation").then((results) => {
      results.json().then(data => ({
        data: data,
        status: results.status
      })
    ).then(res => {
      setTimeout(  () =>  this.LIstCustomerEducationDetailsAll(customerid) , 2000);
    });
  })
  }

  LIstCustomerEducationDetailsAll=(customerid)=>{
    GetApiCall.getRequest("LIstCustomerEducationDetailsAll?customerid="+customerid).then((results) => {
      results.json().then(data => ({
        data: data,
        

      })
    ).then(res => {
        let data= {};
        data.isCompleted = res.data.data.fld_iscompleted === 1? true : false;
        data.fld_currentchapter = res.data.data.fld_currentchapter;
        data.fld_currenttopic = res.data.data.fld_currenttopic;
        data.start= (res.data.data.fld_currentchapter ===0 && res.data.data.fld_currenttopic === 0) ? true : false;
        this.setState({resume_learning : data});
      })
    });
  }

  gotoResumeLearning=()=>{
    let resumeLearningData = this.state.resume_learning;
    let current_chapter = this.state.ChapterData.filter(x => x.fld_chapterid == resumeLearningData.fld_currentchapter);
    
    let current_topic = current_chapter[0].topics.filter(x=> x.fld_id === resumeLearningData.fld_currenttopic)[0]
    current_topic.fld_isunlocked = 1;
    this.goToTopic(current_chapter[0], current_topic);
  }



  checkFeedbackByUser=( user_id )=>{
    GetApiCall.getRequest("ListCustomerEducationFeedbackById/?customerid="+user_id).then((results) => {
      results.json().then(data => ({
        data: data,
        status: results.status
      })
    ).then(res => {
        let feedback = res.data ? res.data.is_feedback : false 
        localStorage.setItem( 'education_feedback', feedback)
        Notiflix.Loading.Remove();
        });
    });
  }

  getChapterContentByUser=(current_user_id)=>{
    PostApiCall.postRequest({ customerid : current_user_id},"ListCustomerEducationDetails").then((results) => {
      results.json().then(data => ({
        data: data,
        status: results.status
      })
    ).then(res => {
        var chapterData = res.data.data.map(function(el , index) {
            var o = Object.assign({}, el);
            o.activeClass = (index==0 ? true:false);
            return o;
          });
          chapterData = chapterData.map(function(el , index) {
            var o = Object.assign({}, el);
            o.chapter_unLock = (index==0 ? true: chapterData[index-1].fld_isQuestionTestCompleted === 1? true : false);
            return o;
          });
          if(chapterData[0].topics[0].fld_isunlocked === 0){
            this.unlockTopic( current_user_id, chapterData[0].topics[0]);
          }
          this.props.dispatch(setChapterListFullDetails(chapterData));
          this.setEducationProgressBar( chapterData );
          this.setState({ ChapterData : chapterData });
        Notiflix.Loading.Remove();
        });
    });
  }

  setEducationProgressBar=(chapterData)=>{
    let countUnlock = 0;
    let totalCount = 0;
    for(let i= 0 ; i < chapterData.length ; i++){
      if( chapterData[i].fld_isQuestionTestCompleted === 1)
          countUnlock++;
          totalCount++;
    }
      // let topics= chapterData[i].topics;
      // // for( let j=0; j<topics.length; j++){
      // //   if(topics[j].fld_isunlocked===1)
      // //     countUnlock++;
      // //     totalCount++;
      // // }
    
    sessionStorage.setItem('educationProgress', JSON.stringify({countUnlock : countUnlock, totalCount : totalCount}));
  }

  unlockTopic=(current_user_id, topic_data)=>{
    
    Notiflix.Loading.Dots();
    PostApiCall.postRequest(
      {
        customerid : current_user_id,
        topicid : topic_data.fld_id,
        isunlocked : 1,
        chapterid : topic_data.fld_chapterid,
        createdon :  moment().format('lll'),
        status : 1
      },
      "AddCustomerUnlockTopic"
    ).then((results1) =>
      // const objs = JSON.parse(result._bodyText)
      results1.json().then((obj1) => {
        if (results1.status == 200 || results1.status == 201) {
          let chapterData = this.state.ChapterData;
          chapterData[0].topics[0].fld_isunlocked = 1;
          this.setState({ChapterData : chapterData  });
          Notiflix.Loading.Remove()
        }else{
          Notiflix.Loading.Remove()
          Notiflix.Notify.Failure(obj1.data);
        }
      }));
  }

  getChapterContent=()=>{
    GetApiCall.getRequest("GetChaperListData").then((results) => {
      results.json().then(data => ({
        data: data,
        status: results.status
      })
  ).then(res => {
      var chapterData = res.data.data.map(function(el , index) {
          var o = Object.assign({}, el);
          o.activeClass = (index==0 ? true:false);
          return o;
        });
      this.setState({ ChapterData : chapterData });
      Notiflix.Loading.Remove();
      });
  });
  }

  handleActiveClass=( fld_chapterid)=>{
      var chapterData = this.state.ChapterData.map(function(el ) {
        var o = Object.assign({}, el);
        o.activeClass = (el.fld_chapterid == fld_chapterid ? true:false);
        return o;
      });
      this.setState({ ChapterData : chapterData });
  }

  goToTopic =( current_chapter, currect_topic )=>{
    var log = localStorage.getItem("CustomerLoginDetails");
    var login = JSON.parse(log);
    
    if(login != null && login != "" && currect_topic.fld_isunlocked===1){
      this.props.history.push({
        pathname : '/education-topic',
        state : {
          current_chapter : current_chapter,
          currect_topic : currect_topic,
          chaptersList : this.state.ChapterData
        }
      });
    }
    
  }


  render() {
    const { resume_learning, rating, rating_per, Topic_Details, Show_Topics, current_topic_index , current_chapter_index, Show_Questions_Module, ChapterQuestionList,
      current_chapter_data, Show_Correct_Question_Ans, is_finel_chapter, Show_User_Feedback, Show_Congratulation_Page} = this.state;

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
                        <div className="rating-box">
                        <span className="ratingtext">{rating} Rating</span>
                        <span className="ratingsse">
                          <span className="star-rating" title={rating_per}>
                            <span className="back-stars">
                              <i className="icon-star-empty" aria-hidden="true"></i>
                              <i className="icon-star-empty" aria-hidden="true"></i>
                              <i className="icon-star-empty" aria-hidden="true"></i>
                              <i className="icon-star-empty" aria-hidden="true"></i>
                              <i className="icon-star-empty" aria-hidden="true"></i>

                              <span className="front-stars" style={{ width: rating_per+'%' }}>
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
                        <div class="col-lg-8 order-lg-first ">
                            <div class="dashboard-content">
                                <HeaderCourseProgress login={login} ShowTimer={false}/>
                                <div class="panel-group" id="accordion">
                                {this.state.ChapterData.map(( Item, chapterIndex)=>{
                                 return <div class={"panel panel-default " + (Item.activeClass == true ? 'active' : 'deactive')}>
                                        <div class={"panel-heading "+( Item.chapter_unLock == true ? 'unlockedlockedtitle' : 'lockedtitle')} onClick={()=> this.handleActiveClass( Item.fld_chapterid ) } >
                                            <h4 class="panel-title">                            
                                                Chapter Number {chapterIndex+1} : {Item.fld_title}
                                            </h4>
                                            <p><span class="topic">{Item.topics ? Item.topics.length :0 } Topics</span> . <span class="length">{ Item.fld_duration.includes(':') ? (Item.fld_duration.split(':')[0]+'m '+Item.fld_duration.split(':')[1]+'s') : Item.fld_duration } total length</span></p>
                                        </div>
                                        <div id="collapseOne" class={"panel-collapse " + (Item.activeClass == true ? 'active' : 'deactive')}>
                                            <div class="panel-body">
                                                <ul class="topiclist">
                                                    {Item.topics && Item.topics.length > 0 ? Item.topics.map(( TopicItem, index)=>{
                                                        return <li class={TopicItem.fld_isunlocked === 1 ?"unlocked":"locked"} onClick={()=>{ this.goToTopic( Item, TopicItem ) }} ><a class="card-edit">Topic { index+1 } - {TopicItem.fld_title}</a></li>
                                                    }) : ''}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    })}
                              </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="course-side-bar">
                                { login != null && login != "" ? 
                                    <div class="login-box">
                                      {resume_learning.start == true ? 
                                      <>
                                       <h3>Want to start your free course?</h3>
                                        <a onClick={()=>{ this.gotoResumeLearning() }} className="loginbutton">Start Learning</a>
                                      </> : resume_learning.isCompleted == true ?
                                      <>
                                        <h3> course completed</h3>
                                        {/* <a href="#" className="loginbutton">Resume Learning</a> */}
                                      </>:
                                      <>
                                        <h3>Want to start your free course?</h3>
                                        <a onClick={()=>{ this.gotoResumeLearning() }} className="loginbutton">Resume Learning</a>
                                      </>
                                      
                                    }
                                    </div>
                                    :
                                        <div class="login-box">
                                            <h3>Want to start your free course?</h3>
                                            <a href="/Login" className="loginbutton">Login Now</a>
                                        </div>
                                }
                              <div class="benefits">
                                 <h4>Course Benefits</h4>
                                 <ul>
                                   <li><strong>Flexible</strong> You pick the schedule</li>
                                   <li><strong>Pause</strong> Take break anytime</li>
                                   <li><strong>Reliable</strong> Prepared by experts</li>
                                   <li><strong>Goodies</strong> Free gifts on completion</li>
                                 </ul>
                              </div>
                              <div class="gift-hemper">
                                <h5>Gift Hamper</h5>
                                <img src="/assets/images/gifts.jpg" />
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
  
});

export default connect(mapStateToProps)(CourseContentMain);