import React from "react";
import Menu from "../Header";
import Footer from "../Footer";
import GetApiCall from "../GetApi";
import PostApiCall from "../Api";
import Notiflix from "notiflix-react";
import HeaderCourseProgress from '../Education/HeaderCourseProgress';
import { setChapterTimerEnable} from '../Actions/Education/actionType';
import { connect } from 'react-redux';
import courseImage from '../images/course.jpg';
import moment from 'moment';

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
      Show_User_Feedback : false,
      is_finel_chapter : false,
      Show_Congratulation_Page : false,
      current_chapter_total_Topics:0,
      is_completed_time : false,
      next_topic_title : '',
    };
  }

  componentDidMount() {
    if(this.props.location.state){
      const data = this.props.location.state;
      let current_chapter_index = (data.chaptersList.findIndex(x => x.fld_chapterid ==data.current_chapter.fld_chapterid));
      let current_topic_index = (data.current_chapter.topics.findIndex(x => x.fld_id ==data.currect_topic.fld_id));
      // sessionStorage.setItem('chapter_module_time', data.current_chapter.fld_duration );
        this.props.dispatch(setChapterTimerEnable(data.current_chapter.fld_isQuestionTestCompleted === 1 ? true : false));
      if(current_chapter_index === data.chaptersList.length-1 ){
        this.setState({ is_finel_chapter : true});
      }
      if(current_topic_index < data.current_chapter.topics.length-1){
        this.setState({ next_topic_title : data.current_chapter.topics[current_topic_index+1].fld_title})
      }
      this.setState({ is_completed_time : data.current_chapter.fld_isQuestionTestCompleted === 1 ? true : false, current_chapter_total_Topics : data.current_chapter.topics.length, current_chapter_data : data.current_chapter, current_chapter_index : current_chapter_index, current_topic_index : current_topic_index, Topic_Details : data.currect_topic})
    }else{
      this.props.history.push('/education')
    }
    
  }

  componentWillReceiveProps(nextProps){
    this.setState({ is_completed_time : nextProps.ChapterTopicTimeCheck});
  }

  gotoNextTopic=(current_topic_index, checknext)=>{
    let next_topic_title= '';
    if(current_topic_index < this.state.current_chapter_data.topics.length){
      if(current_topic_index < this.state.current_chapter_data.topics.length-1){
        next_topic_title = this.state.current_chapter_data.topics[current_topic_index+1].fld_title;
      }
      
      if(this.state.current_chapter_data.topics[current_topic_index].fld_isunlocked ==0 && checknext=== true){
        var log = localStorage.getItem("CustomerLoginDetails");
        var login = JSON.parse(log);
        if(login != null && login != ""){
          Notiflix.Loading.Dots();
          PostApiCall.postRequest(
            {
              customerid : login.fld_userid,
              topicid : this.state.current_chapter_data.topics[current_topic_index].fld_id,
              chapterid : this.state.current_chapter_data.fld_chapterid,
              isunlocked : 1,
              createdon :  moment().format('lll'),
              status : 1
            },
            "AddCustomerUnlockTopic"
          ).then((results1) =>
            // const objs = JSON.parse(result._bodyText)
            results1.json().then((obj1) => {
              if (results1.status == 200 || results1.status == 201) {
                let current_chapter_data_obj = this.state.current_chapter_data;
                current_chapter_data_obj.topics[current_topic_index].fld_isunlocked = 1;

                this.setState({ current_chapter_data : current_chapter_data_obj });

                this.props.history.replace({ pathname : '/education-topic',
                  state : {
                      current_chapter : current_chapter_data_obj,
                      currect_topic : this.props.location.state.currect_topic,
                      chaptersList : this.props.location.state.chaptersList
                    }})

                this.setState({ contentIndex :0, next_topic_title : next_topic_title, Topic_Details : this.state.current_chapter_data.topics[current_topic_index], current_topic_index: current_topic_index });
                Notiflix.Loading.Remove();
              }else{
                Notiflix.Loading.Remove();
                Notiflix.Notify.Failure(obj1.data);
              }
            }));
          }
      }else{
        
        this.setState({ contentIndex :0, next_topic_title : next_topic_title, Topic_Details : this.state.current_chapter_data.topics[current_topic_index], current_topic_index: current_topic_index });
      }
    }
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

goToNextChapterTopic=()=>{
  let ChapterData = this.props.location.state.chaptersList;
  if(this.state.current_chapter_index< ChapterData.length-1){
  let current_chapter_data = ChapterData[this.state.current_chapter_index+1];
  let topic =  current_chapter_data.topics.length > 0 ? current_chapter_data.topics[0] : '';
  let current_topic_index = 0;
  let current_chapter_index = this.state.current_chapter_index+1;
      
      this.props.history.push({
          pathname : '/education-topic',
          state : {
          current_chapter : current_chapter_data,
          currect_topic : topic,
          chaptersList : ChapterData
          }
      });
      window.location.reload();
  }else if(localStorage.getItem('education_feedback') !== true){
      this.props.history.push('/feedback');
  }
}

  render() {
    const { is_completed_time, next_topic_title, Topic_Details,  current_topic_index , current_chapter_index,  contentIndex, current_chapter_data, current_chapter_total_Topics, is_finel_chapter} = this.state;

      var log = localStorage.getItem(
        "CustomerLoginDetails"
      );
      var login = JSON.parse(log);

      
    return (
      <div>
        <Menu></Menu>
        <div class="account-section"> 
            <div class="co">
              {/* <div class="banner-sec">
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

              </div> */}
                <div class="container" style={{background:"none"}}>
                    <div class="row mt-2">
                        <div class="col-lg-12 order-lg-first ">
                            <div class="dashboard-content">
                                <HeaderCourseProgress login={login} ShowTimer={current_chapter_data.fld_isQuestionTestCompleted === 0? true : false} moduleTime={current_chapter_data.fld_duration}/>
                                  <div class="course-details">
                                    <div class="homelink">
                                      <a href="/education"><i class="fa fa-home" aria-hidden="true"></i></a>
                                    </div>
                                      <h3 class="panel-title">Chapter Number {current_chapter_index+1} :{ current_chapter_data.fld_title }</h3>
                                      <p><span class="topic">{ this.ordinal_suffix_of( current_topic_index + 1 ) }  Topics</span> . <span class="length"></span></p>
                                      <p class="coloredsec">{Topic_Details.fld_title}</p>
                                    <div class="course-details-disc">
                                   
                                   { Topic_Details.contents && Topic_Details.contents.length > 0 ?
                                    <>
                                        <div class="col-md-12">
                                          <h4>Content {this.ordinal_suffix_of(contentIndex+1)}</h4> 
                                            <div  dangerouslySetInnerHTML= {{__html: Topic_Details.contents[contentIndex].fld_content ? Topic_Details.contents[contentIndex].fld_content : '' }}></div> 
                                        </div><br/>
                                        <div><h4 style={{color:'blue'}} >{`Page: `+(contentIndex+1)+`/`+Topic_Details.contents.length}</h4></div>
                                    </>: 'Not have content !' }
                                    </div>
                                  </div>
                                  { Topic_Details.contents && Topic_Details.contents.length > 0 ?
                                  <div class="navlinks">
                                      
                                      {current_topic_index > 0 && contentIndex ===0 ?
                                        <div class="navlinkbutton next"><button className={current_topic_index ===0 ?"disable":'activelink'} onClick={ ()=>{  this.gotoNextTopic(current_topic_index-1, false)  }}><span><img src="/assets/images/previous.png"/></span> Previous Topic</button></div> 
                                        : 
                                        <div class="navlinkbutton next"><button disabled={contentIndex ===0 ? true:false} className={contentIndex ===0 ?"disable":'activelink'} onClick={ ()=>{this.setState({ contentIndex : contentIndex-1 })}}><span><img src="/assets/images/previous.png"/></span> Previous</button></div>        
                                      }

                                      <div class="navlinkbutton previous">
                                        
                                       
                                      { Topic_Details.contents.length-1 === contentIndex  && current_chapter_total_Topics-1 ===  current_topic_index ? 
                                        current_chapter_data.fld_isQuestionTestCompleted === 1? 
                                        ( is_finel_chapter === true && localStorage.getItem('education_feedback') == 'true')?
                                            ''
                                          : <button onClick={()=>{this.goToNextChapterTopic()}} class="activelink"><span>{ is_finel_chapter === true ? 
                                            'Submit & Go To Feedback '
                                            :
                                            'Go To Next Chapter '
                                        } </span><span><img src="/assets/images/next.png" /></span></button> 
                                        :
                                        <button className={ is_completed_time === true?'activelink':"disable"} disabled={ is_completed_time === true? false : true} onClick={ ()=>{ this.props.history.push({
                                          pathname : '/questions',
                                          state :{
                                            chapter_id : Topic_Details.fld_chapterid,
                                            chaptersList : this.props.location.state.chaptersList,
                                            current_chapter_index : this.state.current_chapter_index
                                          }
                                        }) }} > Go to Questions <span><img src="/assets/images/next.png"/></span> </button>
                                        :
                                        Topic_Details.contents.length-1 === contentIndex ? 
                                        <button class="activelink" style={{ float:'right'}} onClick={ ()=>{ this.gotoNextTopic(current_topic_index+1, true);  }}>Next Topic <span><img src="/assets/images/next.png"/></span> </button>
                                        :
                                        <button class="activelink" style={{ float:'right'}} onClick={ ()=>{ this.setState({ contentIndex : contentIndex+1});  }} >Next <span><img src="/assets/images/next.png"/></span> </button>
                                      }
                                        {next_topic_title!='' ?<p>Topic {current_topic_index+2} - {next_topic_title}</p>:''}
                                      </div>
                                  </div>
                                  :''}
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
  chaptersList : state.CourseContentReducer.ChapterListFullDetails,
  ChapterTopicTimeCheck : state.CourseContentReducer.ChapterTopicTimeCheck
});

export default connect(mapStateToProps)(CourseTopicContentMain);