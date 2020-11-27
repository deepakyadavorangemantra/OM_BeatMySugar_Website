import React, { useEffect, useState } from 'react';

const CourseContentDetails =( props)=>{
    const [ contents, setContents ] = useState([]);
    const [ content, setContent ] = useState('');
    const [ contentIndex, setContentIndex ] = useState(0);
    const [ current_topic_index, setCurrentTopicIndex ] = useState( props.current_topic_index );
    const [ current_chapter_total_Topics ] = useState(props.current_chapter_data.topics.length);

    useEffect(()=>{
        setContentIndex(0);
        setContent( props.Topic_Details.contents[0] )
        setContents(props.Topic_Details.contents);
    }, [props.Topic_Details.contents]);

    useEffect(()=>{
        setCurrentTopicIndex(props.current_topic_index)
    }, [props.current_topic_index]);


    function ordinal_suffix_of(i) {
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

    return(
        <React.Fragment>
            <div style={{ border: '2px' , borderStyle: 'groove'}} class="row">
                <div class="col-md-12">
                    <h2> Chapter Number { props.current_chapter_index+1 } : {props.current_chapter_data.fld_title} </h2>
                    <h3> { ordinal_suffix_of( props.current_topic_index + 1 ) } Topic  </h3>
                    <h2 style={{ color : 'red'}}> {props.Topic_Details.fld_title}  </h2>
                </div>
            </div>
            <div style={{ border: '2px' , borderStyle: 'groove'}}  class="row">
                { props.Topic_Details.contents && props.Topic_Details.contents.length > 0 ?
                <>
                    <div class="col-md-12">
                        <div  dangerouslySetInnerHTML= {{__html: props.Topic_Details.contents[contentIndex].fld_content ? props.Topic_Details.contents[contentIndex].fld_content : '' }}></div> 
                    </div><br/>
                    <div class="col-md-12">

                        {current_topic_index > 0 && contentIndex ===0 ?
                            <button disabled={ current_topic_index ===0 ?true : false } onClick={ ()=>{  props.gotoNextTopic(current_topic_index-1)  }}>Previous Topic</button>
                            : <button disabled={ contentIndex ===0 ?true : false } onClick={ ()=>{setContentIndex(contentIndex-1)}}>Previous</button>
                        }
                            &nbsp;&nbsp;&nbsp;&nbsp;

                        { props.Topic_Details.contents.length-1 === contentIndex  && current_chapter_total_Topics-1 ===  current_topic_index ? 
                                <button onClick={ ()=>{ props.setQuestionsView(props.Topic_Details.fld_chapterid) }}>Go to Questions</button> :
                            props.Topic_Details.contents.length-1 === contentIndex ? 
                                <button onClick={ ()=>{ props.gotoNextTopic(current_topic_index+1); setContentIndex(0); }}> Next Topic </button> 
                            :
                                <button onClick={ ()=>{  setContentIndex(contentIndex+1);  }}> Next </button>
                        }
                    </div><br/> 
                </>: 'Not have content !' }
            </div>
            
        </React.Fragment>
    );
}
export default CourseContentDetails