import React, { useEffect, useState } from 'react';
import Timer from './HeaderStopWatch';

const HeaderCourseProgress = (props) => {

    function getPer(){
        let countUnlock = sessionStorage.getItem('educationProgress') ?  JSON.parse(sessionStorage.getItem('educationProgress')).countUnlock : 0;
        let totalCount = sessionStorage.getItem('educationProgress') ? JSON.parse(sessionStorage.getItem('educationProgress')).totalCount : 0;
        return  parseInt(( countUnlock/totalCount ) * 100)
    }

    // useEffect(()=>{
    //     alert(props.moduleTime);
    // })
    return (
        <React.Fragment>
            <div class="progress-course">
                <div class="row">
                    <div class="col-md-3">
                        <h2>Course Content</h2>
                    </div>
                    <div class="col-md-9">
                    { props.login != null && props.login != "" ? 
                        <div class="course-progress">
                            <div class="course-progess-sec">
                                <p>Learning Progress<strong> {getPer()+'%'}</strong></p>
                            <div class="progress">
                                <div class="progress-bar progress-bar-info courseprogress" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ width: getPer()+"%" }}>
                                </div>
                            </div>
                            </div>
                            <div class="time-section">
                                { props.ShowTimer === true ? 
                                <div class="time-coures-box">
                                    <span class="time-icon"><i class="icon-clock-1"></i></span>
                                    { props.moduleTime ? 
                                    <span class="time-course-take"><Timer moduleTime = {props.moduleTime}/></span> 
                                    : <span class="time-course-take">00 : 00 Min---</span>
                                    }
                                </div>:''
                                }
                            </div>
                        </div> : '' }
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}
export default HeaderCourseProgress