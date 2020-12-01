import React from 'react';

const HeaderCourseProgress = (props) => {

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
                            <p>Learning Progress<strong> 30%</strong></p>
                            <div class="progress">
                                <div class="progress-bar progress-bar-info courseprogress" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ width: "30%" }}>
                                </div>
                            </div>
                            </div>
                            <div class="time-section">
                                <div class="time-coures-box">
                                    <span class="time-icon"><i class="icon-clock-1"></i></span>
                                    <span class="time-course-take">25 Min</span>
                                </div>
                            </div>
                        </div> : '' }
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}
export default HeaderCourseProgress