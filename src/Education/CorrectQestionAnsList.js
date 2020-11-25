import React, { useEffect, useState } from 'react';

const CourseQuestionsAnsList =( props)=>{
    const [ count_correct_ans, set_count_correct_ans] = useState(0);

    useEffect(()=>{
        setCorrectAnsCount();
        
    },[props.ChapterQuestionList])

    function setCorrectAnsCount(){
        let count =0;
        for(let i=0; i<props.ChapterQuestionList.length;i++){
            let questionData = props.ChapterQuestionList[i];
            let options = props.ChapterQuestionList[i].options.filter(item => item.fld_iscorrect==1);
           
            if(options.length>0 && options[0].fld_id === questionData.user_ans){
                count++;
                
            }
        }
        set_count_correct_ans(count);
    }
    
    return(
        <React.Fragment>
            <div style={{ border: '2px' , borderStyle: 'groove'}} class="row">
                <div class="col-md-12"><h3> Total correct answer : {count_correct_ans} / {props.ChapterQuestionList.length}</h3></div>
                { props.ChapterQuestionList && props.ChapterQuestionList.length>0 && props.ChapterQuestionList.map( (questionData, index)=>{

                    return <div class="col-md-12">
                    <h3>{index+1}. {questionData.fld_questiontext}</h3>
                    {
                        questionData.options && questionData.options.length>0 && questionData.options.map((option,index)=>(
                            option.fld_iscorrect === 1 ? 
                         <tr >
                            <td style={{padding:'5px', width:'200px'}}><label style={{ color: option.fld_id != questionData.user_ans ? 'red' : 'green'}} >{option.fld_optiontext} </label></td>
                        </tr>:'')
                    )}
                    </div>

                } ) 

                }
                
                <div class="col-md-12">
                    <button onClick={()=>{ props.goToNextChapterTopic()}}>Go To Next Chapter -{'>'}</button> 
                </div>
                
            </div>
        </React.Fragment>
    );
}
export default CourseQuestionsAnsList