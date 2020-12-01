import React from 'react';

const CourseContentList =( props)=>{

    return(
        <React.Fragment>
            <div class="card">
                {props.ChapterData && props.ChapterData.length>0 ? 
                    props.ChapterData.map(( Item, chapterIndex)=>{

                
                        return <div class="card-header">
                        <span>{Item.fld_title}</span><br/>
                        <ul>
                            {Item.topics && Item.topics.length > 0 ? Item.topics.map(( TopicItem, index)=>{
                                return <li><a  class="card-edit" style={{float:'left', color : 'blue'}} onClick={( )=> props.showTopicDetails( TopicItem, Item, index, chapterIndex ) } >{TopicItem.fld_title}</a></li>
                            }) : ''}
                        
                        </ul>
                    </div>
                    }) :'' 
                }
                
            </div>
        </React.Fragment>
    );
}
export default CourseContentList