import React, { useEffect, useState } from 'react';

const CourseContentDetails =( props)=>{
    const [ contents, setContents ] = useState([]);
    const [ content, setContent ] = useState('');
    const [ contentIndex, setContentIndex ] = useState(0);

    useEffect(()=>{
        setContent( props.Topic_Details.contents[0] )
        setContents(props.Topic_Details.contents);
    }, [props.Topic_Details.contents]);

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
                    <h2> Chapter Number { props.current_index+1 } : Diabtes Learning program 1 </h2>
                    <h3> { ordinal_suffix_of( props.current_topic_index + 1 ) } Topic  </h3>
                    <h2 style={{ color : 'red'}}> A cooperative Latin American implementation study  </h2>
                </div>
            </div>
            <div style={{ border: '2px' , borderStyle: 'groove'}}  class="row">
                { props.Topic_Details.contents && props.Topic_Details.contents.length > 0 ?
                <>
                    <div class="col-md-12">
                        <div  dangerouslySetInnerHTML= {{__html: props.Topic_Details.contents[contentIndex].fld_content }}></div> 
                    </div><br/>
                    <div class="col-md-12">
                        <button disabled={ contentIndex ===0 ?true : false } onClick={ ()=>{setContentIndex(contentIndex-1)}}>Previous Topic</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        { props.Topic_Details.contents.length-1 === contentIndex ? 
                            <button onClick={ ()=>{ props.setQuestionsView(props.Topic_Details.fld_chapterid) }}>Go to Questions</button> 
                            :
                            <button onClick={ ()=>{setContentIndex(contentIndex+1) }}>Next Topic</button>
                        }
                        
                    </div><br/> 
                </>: 'Not have content !' }
            </div>
            
        </React.Fragment>
    );
}
export default CourseContentDetails