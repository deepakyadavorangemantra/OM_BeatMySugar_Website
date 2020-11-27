import React, { useState } from 'react';
import { Button } from "react-bootstrap";

const UserFeedbackView =( props)=>{

    const [ feedbackMessage, setFeedbackMessage ] = useState();

    function onSubmitFeedback(){
        // alert('onSubmitFeedback');
        alert(feedbackMessage);
        props.onSubmitFeedback(feedbackMessage);
    }
    return(
        <React.Fragment>
            <h3>User Feedback :</h3>
                <form action="#">
                    <div class="row">
                        <div class="col-md-8 col-sm-9 col-xs-9">
                            <textarea
                                cols="30"
                                rows="5"
                                class="form-control"
                                value={feedbackMessage}
                                onChange={ (e)=>{ setFeedbackMessage(e.target.value); }}
                            ></textarea>
                        </div>
                    </div>
                    <div class="form-footer">
                          <Button
                            class="btn btn-primary"
                            onClick={ ()=>{ onSubmitFeedback() }  }
                          >
                            Submit Feedback
                          </Button>
                        </div>
                </form>
        </React.Fragment>
    );
}
export default UserFeedbackView