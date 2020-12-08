import React, { Component } from 'react';
import { setChapterTimerEnable} from '../Actions/Education/actionType';
import { connect } from 'react-redux';
class Timer extends Component {
    state = {
        minutes: 0,
        seconds: 0,
    }

    componentDidMount() {
        const minutes  = parseInt(this.props.moduleTime.split(':')[0]);
        const seconds  = parseInt(this.props.moduleTime.split(':')[1]);
        if (window.performance) {
            if (performance.navigation.type == 1) {
              if(sessionStorage.getItem("user_spend_chapter_time")){
                let time_data = JSON.parse(sessionStorage.getItem("user_spend_chapter_time"));
                this.setState({
                    minutes: time_data.minutes,
                    seconds: time_data.seconds,
                });
               
                this.setTimer();
              }else{
                this.props.dispatch(setChapterTimerEnable(true));
              }
            } else {
                if( this.props.ChapterTopicTimeCheck === false){
                    this.setState({
                        minutes: minutes,
                        seconds: seconds,
                    });
                    this.setTimer();
                }  
            }
          }
             
    }

    setTimer=()=>{
        debugger;
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
                sessionStorage.setItem("user_spend_chapter_time", JSON.stringify({ minutes: minutes, seconds: seconds-1 }));
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    this.props.dispatch(setChapterTimerEnable(true));
                    sessionStorage.removeItem("user_spend_chapter_time");
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                    sessionStorage.setItem("user_spend_chapter_time", JSON.stringify({ minutes: minutes-1, seconds: 59 }));
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        return (<>{minutes}:{seconds < 10 ? `0${seconds}` : seconds +' Min'} </>
            // <div>
            //     { minutes === 0 && seconds === 0
            //         ? <h1>Busted!</h1>
            //         : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            //     }
            // </div>
        )
    }
}


const mapStateToProps = state => ({
    chaptersList : state.CourseContentReducer.ChapterListFullDetails,
    ChapterTopicTimeCheck : state.CourseContentReducer.ChapterTopicTimeCheck
  });
  
  export default connect(mapStateToProps)(Timer);