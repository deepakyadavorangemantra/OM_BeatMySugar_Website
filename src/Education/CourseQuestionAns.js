import React, { useEffect, useState } from 'react';

const CourseQuestionsAns =( props)=>{
    const [ questionListData, setQuestionListData ] = useState([]);
    const [ questionData, setQuestionData ] = useState('');
    const [ contentIndex, setContentIndex ] = useState(0);
    const [ nextButtonDisabled, setNextButtonDisabled ] = useState(true);

    useEffect( ()=>{
        if(props.ChapterQuestionList.length>0){
            setQuestionListData( props.ChapterQuestionList)
            setQuestionData( props.ChapterQuestionList[0] )
        }
        
    }, props.ChapterQuestionList )

    function handleCheckChange( option_data){
        let question = questionData;
        question.user_ans = option_data;
        setQuestionData(question);
        setNextButtonDisabled(!nextButtonDisabled)
        //    let option_index = optionList.findIndex( item=> item.fld_optiontext === option_data.fld_optiontext );
        //    for(let i=0; i<optionList.length; i++){
        //        if( optionList[i].fld_optiontext ===  option_data.fld_optiontext){
        //         optionList[i].fld_iscorrect = true;
        //        }else{s
        //         optionList[i].fld_iscorrect = false;}
        //    }

        //    optionList[option_index].fld_iscorrect = true;
            // SetOption({ fld_optiontext:'', fld_iscorrect:false });
            // SetOptionList(optionList);
        }

    return(
        <React.Fragment>
            <div style={{ border: '2px' , borderStyle: 'groove'}} class="row">
                {questionData != ''?
                <div class="col-md-12">
                    <h2>{questionData.fld_questiontext}</h2>
                    <h3>QUESTION {contentIndex+1} / {questionListData.length}</h3>
                    {
                        questionData.options && questionData.options.length>0 && questionData.options.map((option,index)=>(
                        <tr >
                            <td style={{padding:'5px'}}><input type="checkbox" onChange={ ()=>{ handleCheckChange(option.fld_id)}}  checked ={ questionData.user_ans === option.fld_id? true : false} /></td>
                            <td style={{padding:'5px', width:'200px'}}><label >{option.fld_optiontext} </label></td>
                        </tr>)
                    )}
                    <div class="col-md-12">
                        <button disabled={ contentIndex ===0 ?true : false } onClick={ ()=>{ setQuestionData( questionListData[contentIndex-1] ); setContentIndex(contentIndex-1)}}>Previous Question</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        { questionListData.length-1 === contentIndex ? 
                        <button disabled={ questionData.user_ans != undefined?  false : true} onClick={()=>{ props.updateUserAnsAndShowCorrectAns(questionListData) }}>Submit & Check Correct Answer -{'>'}</button> 
                        :
                        <button disabled={ questionData.user_ans != undefined?  false : true} onClick={ ()=>{ setQuestionData(  questionListData[contentIndex+1] ); setContentIndex(contentIndex+1) }}>Next Question</button>
                        }
                    </div>
                </div>:<div class="col-md-12"> <h2> No Question available this chapter!</h2> </div>}
            </div>
        </React.Fragment>
    );
}
export default CourseQuestionsAns