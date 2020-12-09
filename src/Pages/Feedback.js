import React from "react";
import Menu from "../Header";
import Footer from "../Footer";
import GetApiCall from "../GetApi";
import PostApiCall from "../Api";
import Notiflix from "notiflix-react";
import moment from 'moment';

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating:'',
            comments:'',
            show_congratulation : false,
            congratulaion: ''
        };
    }

    componentDidMount() {
       this.getCongratulation();
    //    this.getCheckFeedback();
    }

    SubmitFeedback =()=>{
        if( this.state.rating != '' && this.state.comments !=''){
            var log = localStorage.getItem("CustomerLoginDetails");
            var login = JSON.parse(log);
            if(login != null && login != ""){
                let data={};
                data.customerid= login.fld_userid;
                data.feedbacktext = this.state.comments;
                data.createdon = moment().format('lll');
                data.rating = this.state.rating;
                data.status = 1;
                Notiflix.Loading.Dots();

                PostApiCall.postRequest(
                {
                    data
                },
                "AddCustomerEducationFeedback"
                ).then((results1) =>
                // const objs = JSON.parse(result._bodyText)
                
                results1.json().then((obj1) => {
                    if (results1.status == 200 || results1.status == 201) {
                    // Notiflix.Loading.Remove();
                    this.getCongratulation();
                        this.setState({ show_congratulation : true})
                        //get congratulaion
                    }else{
                        Notiflix.Loading.Remove()
                        Notiflix.Notify.Failure( obj1.data );
                
                    }
                }));
            }
        }
    }

    getCongratulation=()=>{
        GetApiCall.getRequest("ListCongratulation").then((results) => {
            results.json().then(data => ({
              data: data,
            })
        ).then(res => {
            console.log(res.data);
            this.setState({ congratulaion : res.data.data && res.data.data.length>0 ? res.data.data[0].fld_content:'' });
            Notiflix.Loading.Remove();
            });
        });
    }

    render() {
        const {  } = this.state;

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
                                        <div className="head-text">
                                            <h1 className="main-head">Diabetes Learning Program</h1>
                                            <p className="sub-head">A brief about the course and what is expected to be delivered and many more</p>
                                            <div className="rating-box">
                                                <span className="ratingtext">4.8 Rating</span>
                                                <span className="ratingsse">
                                                    <span className="star-rating" title="70%">
                                                        <span className="back-stars">
                                                            <i className="icon-star-empty" aria-hidden="true"></i>
                                                            <i className="icon-star-empty" aria-hidden="true"></i>
                                                            <i className="icon-star-empty" aria-hidden="true"></i>
                                                            <i className="icon-star-empty" aria-hidden="true"></i>
                                                            <i className="icon-star-empty" aria-hidden="true"></i>

                                                            <span className="front-stars" style={{ width: "70%" }}>
                                                                <i className="icon-star" aria-hidden="true"></i>
                                                                <i className="icon-star" aria-hidden="true"></i>
                                                                <i className="icon-star" aria-hidden="true"></i>
                                                                <i className="icon-star" aria-hidden="true"></i>
                                                                <i className="icon-star" aria-hidden="true"></i>
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
                                            <img src="/assets/images/course.jpg" alt="course image" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div> */}
                        <div class="container" style={{ background: "none" }}>
                            <div class="row mt-2">
                                <div class="col-lg-12 order-lg-first ">
                                    <div class="dashboard-content">
                                        <div class="question-course-details">
                                            <div class="homelink">
                                                <a href="/education"><i class="fa fa-home" aria-hidden="true"></i></a>
                                            </div>
                                            {this.state.show_congratulation === true? 
                                            <div class="feedback-section">
                                               
                                                <h3>Congratulaion !! </h3>
                                                <div class="col-md-12">
                                                    <div dangerouslySetInnerHTML= {{__html: this.state.congratulaion}}></div>
                                                </div>
                                                </div>:
                                                <div class="feedback-section">
                                                    <h3>Give Us Feedback</h3>
                                                    <p>Overall, how satisfied were you with our products?</p>
                                                    <div class="feedback-rating" style={{width: "50rem"}}>
                                                        <input onClick={(e)=>{ this.setState( {rating : e.target.value })} } id="rating-5" type="radio" name="rating" value="5" /><label for="rating-5"><i class="fas fa-3x fa-star"></i></label>
                                                        <input onClick={(e)=>{ this.setState( {rating : e.target.value })} } id="rating-4" type="radio" name="rating" value="4"/><label for="rating-4"><i class="fas fa-3x fa-star"></i></label>
                                                        <input onClick={(e)=>{ this.setState( {rating : e.target.value })} } id="rating-3" type="radio" name="rating" value="3" /><label for="rating-3"><i class="fas fa-3x fa-star"></i></label>
                                                        <input onClick={(e)=>{ this.setState( {rating : e.target.value })} } id="rating-2" type="radio" name="rating" value="2"/><label for="rating-2"><i class="fas fa-3x fa-star"></i></label>
                                                        <input onClick={(e)=>{ this.setState( {rating : e.target.value })} } id="rating-1" type="radio" name="rating" value="1"/><label for="rating-1"><i class="fas fa-3x fa-star"></i></label>
                                                    </div>
                                                    <p>Any additional comments or suggestion?</p>
                                                    <div class="textbox">
                                                    <textarea maxlength="300" onChange={(e)=>{ this.setState({ comments : e.target.value })}} id="w3review" name="w3review" rows="4" cols="50" > </textarea>
                                                    </div>
                                                    <div class="submitbtn">
                                                        <button class="activelinksubmit" onClick={this.SubmitFeedback.bind(this)} ><span>Submit Feedback </span><span><img src="/assets/images/next.png" /></span></button>
                                                    </div>
                                            </div>}
                                        </div>
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

export default Feedback;
