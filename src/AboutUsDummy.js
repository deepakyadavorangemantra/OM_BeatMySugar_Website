import React from "react";
import logo from "./logo.svg";

import Header from "./Header";
import Footer from "./Footer";
import News from "./News";

class AboutUs extends React.Component {
  render() {
    return (
      <div className="App">
      <div
          class="container"
          style={{  background: "white" }}
        >
          <div class="row">
          <div>
              <div class="container-boxabout">
                <h2 class="light-title section-title mt-3">About Us</h2>
                <div class="row">
                  <div class="col-lg-12">
                    <p class="lead1">
                      <b>BeatMySugar</b> is a unique healthcare initiative by
                      "Rx Health Management India Private Limited", exclusively
                      focused to enable Diabetic population to improve their
                      lifestyle by preventing and better manage the
                      complications related to Diabetes through effective
                      behavioral intervention and life style modification
                      techniques.
                    </p>
                    <p class="lead1">
                      It’s a one stop, tech-enabled solution with the following
                      offerings.
                    </p>
                    <div class="row">
                      <div class="col-md-6">
                        <img src="/assets/images/about.jpg" />
                      </div>
                      <div class="col-md-6 boxes">
                        <div class="box1about">
                          <p>
                            <b>Vision</b>
                          </p>
                          <p>Diabetic Controlled Universe</p>
                        </div>

                        <div class="box1about">
                          <p>
                            <b>Mission</b>
                          </p>
                          <p>
                            Enable diabetic population to lead a healthy
                            lifestyle by 'Simplifying Diabetes Management'
                            through a tech-enabled eco-system with all Products
                            and Services available at single place. Reach & help
                            out 1 million diabetic patients by 2025.
                          </p>
                        </div>

                        <div class="box1about">
                          <p>
                            <b>Tagline</b>
                          </p>
                          <p>Simplifying Diabetes Management</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End .col-lg-10 --> */}
                </div>
                {/* <!-- End .row --> */}

                <hr />

                <h2 class="light-title section-title mt-3">Advisory Board</h2>

                {/* <ul class="history-list">
                                            <li>
                                                <div class="thumb">
                                                    <img src="/assets/images/team/shaurya.png" alt="shaurya" />
                                                </div>
                                                <div class="featured-box">
                                                    <div class="box-content">
                                                        <p><b>Shaurya Aggarwal, Co-Founder & Promoter </b></p>
                                                        <p>Shaurya is an energetic millennial, has experienced diabetes living from very early age, he was diagnosed with Type I diabetes when he was just about 10 years old. For him it was highly challenging to control the severe cravings for food, especially the junk, at such a tender age. However, the experience of diabetes has molded him to respect his body and take care of himself in a manner he thought would not have possible otherwise.
                                                                He is a final year graduation student at University of Delhi.
                                                                </p>
                                                        <p>He sees himself as an individual who is committed to fitness and is never afraid of helping anyone. He is a Bollywood fan, car enthusiast,  loves travelling and exploring new places.</p>
                                                        <p> <a href="https://www.linkedin.com/in/shaurya-aggarwal-75227262/" target="_blank"><i class="fab fa-linkedin"></i></a></p>
                                                    </div>
                                                </div>
                                            </li>
                                           
                                            <li>
                                                    <div class="thumb">
                                                        <img src="/assets/images/team/arun.png" alt="shaurya" />
                                                    </div>
                                                    <div class="featured-box">
                                                        <div class="box-content">
                                                            <p><b>Arun K. Pathak, Co-Founder & CEO</b></p>
                                                            <p>Arun has an extensive Global, Corporate Leadership & Management experience in Information & Communications Technology across various Geographies with Fortune 500 organizations. He has successfully led multitude of business critical & complex initiatives. Has widely traveled & lived in North & South America, Europe, Asia. Has worked with Amdocs, Xansa and TCS.
                                                                    </p>
                                                            <p>He is an INSEAD and IIT alumnus with Executive Management & Masters in Computer Science.
                                                                    Got deep interests in learning & mentorship, is a visiting speaker to various start-up forums & educational institutions. Loves to play lawn tennis.
                                                                    </p>
                                                            <p> <a href="https://www.linkedin.com/in/arun-kumar-pathak-a881233/" target="_blank"><i class="fab fa-linkedin"></i></a></p>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                        <div class="thumb">
                                                            <img src="/assets/images/team/atul.png" alt="shaurya" />
                                                        </div>
                                                        <div class="featured-box">
                                                            <div class="box-content">
                                                                <p><b>Atul Gupta, Co-Founder & Director</b></p>
                                                                <p>Atul is a successful serial entrepreneur, he has incubated & has been an early investor, in several companies ranging from sectors as diverse as packaging machinery, laundry etc.  He is also founder of “Rx Infotech Pvt Ltd” (a well renowned Brand - LAPCARE), specializing in laptop peripherals & accessories.</p>
                                                                <p>He is an Electronics & Communications Engineer. He is a great chef at home and loves to host & impress people with his super engaging culinary skills.
                                                                        </p>
                                                                <p> <a href="https://www.linkedin.com/in/atul-guupta-bb0aa238/" target="_blank"><i class="fab fa-linkedin"></i></a></p>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li>
                                                            <div class="thumb">
                                                                <img src="/assets/images/team/shilpa.png" alt="shaurya" />
                                                            </div>
                                                            <div class="featured-box">
                                                                <div class="box-content">
                                                                    <p><b>Dr Shilpa Chugh Garcha,  Director Medical Affairs</b></p>
                                                                    <p>Dr. Shilpa is a dynamic & versatile healthcare professional who has worked as a medical advisor with leading pharmaceuticals like Novo Nordisk India, Baxter India and online healthcare platform 1mg.com. With her love for learning new things and taking on new challenges, she has been an integral part of various novel & innovative projects and initiatives. </p>
                                                                    <p>She has keen interest in medical writing and aspires to work on tech-enabled solutions for educating and empowering the patients for self-management of their health conditions.</p>
                                                                    <p>She is an MBBS graduate and to further enhance her skill set, she pursued an MD in Pharmacology.
                                                                            At home, a mother of two lovely daughters, she loves to spend time with her kids and cook their favorite dishes.
                                                                            </p>
                                                                    <p> <a href="https://www.linkedin.com/in/shilpa-chugh-garcha-812b1a39/" target="_blank"><i class="fab fa-linkedin"></i></a></p>
                                                                </div>
                                                            </div>
                                                        </li>
                                          
                                           
                                        </ul> */}

                <div class="team-area default-padding">
                  <div class="">
                    <div class="team-items">
                      <div class="col-md-12">
                        <div class="row">
                          <ul class="nav nav-tabs nav-pills" id="myTab">
                          <li class="nav-item">
                              <a
                                data-toggle="tab"
                                href="#tab4"
                                aria-expanded="false"
                              >
                                <img
                                  src="assets/images/mukulesh.png"
                                  alt="Thumb"
                                />
                                <h4>Dr. Mukulesh Gupta</h4>
                                <p>Director, Diabetologist and Physician <br/> <h5>Udyaan Health Care (P) Ltd, Lucknow</h5></p>
                                
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                data-toggle="tab"
                                href="#tab2"
                                aria-expanded="false"
                              >
                                <img
                                  src="assets/images/rajeev.jpg"
                                  alt="Thumb"
                                />
                                <h4>Dr. Rajeev Chawla</h4>
                                <p>
                                Director and Senior Diabetologist <br/>
                                <h5>North Delhi Diabetes Centre, New Delhi</h5>
                                </p>
                              </a>
                            </li>

                            <li class="nav-item">
                              <a
                                data-toggle="tab"
                                href="#tab3"
                                aria-expanded="false"
                              >
                                <img
                                  src="assets/images/shalini.png"
                                  alt="Thumb"
                                />
                                <h4>Dr. Shalini Jaggi</h4>
                                <p>
                                Consultant and Head <br/>
                                <h5>Dr Mohans’ Diabetes Specialties Centre, New Delhi</h5>
                                </p>
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                data-toggle="tab"
                                href="#tab1"
                                aria-expanded="true"
                              >
                                <img src="assets/images/brij.jpg" alt="Thumb" />
                                <h4>Dr. B M Makkar</h4>
                                <p>
                                Director, Senior Diabetes and Bariatric Physician <br/>
                                <h5>Dr Makkar’s Diabetes and Obesity Centre, New Delhi</h5>
                                </p>
                              </a>
                            </li>
                       
                         
                          </ul>

                          <div class="tab-content tab-content-info">
                            <div id="tab1" class="tab-pane fade">
                              <div class="row">
                                <div class="content-box">
                                  <div class="col-md-2 thumb">
                                    <img
                                      src="assets/images/brij.jpg"
                                      alt="Thumb"
                                    />
                                  </div>
                                  <div class="col-md-10 info">
                                    <h4>Dr. Brij Mohan Makkar</h4>
                                    <span>
                                    Director, Senior Diabetes and Bariatric Physician <br /> <h5>Dr Makkar’s Diabetes and Obesity Centre, New Delhi</h5>
                                    </span>
                                    <p>
                                      Dr. Brij Mohan is a Senior Diabetes &
                                      Bariatric Physician and Director of Dr
                                      Makkar’s Diabetes and Obesity Centre at
                                      New Delhi, India. He is currently Hony.
                                      Secretary of RSSDI (Research Society for
                                      the Study of Diabetes in India). He is
                                      also Past Chairman of RSSDI Delhi Chapter,
                                      Hony Treasurer of RSSDI national body and
                                      a member of the executive board of
                                      Diabetes India.
                                    </p>
                                    <p>
                                      He is a fellow of Indian College of
                                      Physicians, Royal College of Physicians
                                      (Glasgow, Edin), American College of
                                      Physicians, American College of
                                      Endocrinology (FACE), and Research Society
                                      for the Study of Diabetes in India
                                      (RSSDI).
                                    </p>
                                    <p>
                                      His areas of interest are Diabetes,
                                      Obesity & Metabolic syndrome. He is widely
                                      travelled and has a keen interest in
                                      education and is a certified trainer in
                                      Diabetes from IDC Minneapolis. Dr. Makkar
                                      is also Indian Course Director for
                                      Cleveland Clinic Certificate courses in
                                      Diabetes in India and has been organizing
                                      these courses in collaboration with
                                      Cleveland Clinic, Ohio, USA, for more than
                                      10 years. He had been regional faculty for
                                      PHFI’s CCEBDM and CCGDM courses in India.
                                    </p>
                                    <p>
                                      Dr Makkar has been decorated with many
                                      awards and orations including Prof KL Wig
                                      Oration (API-Delhi Chapter), KRSSDI
                                      Oration, UPDA Oration, Prof. M
                                      Vishwanathan Oration (Tamilnadu, RSSDI),
                                      Dr. Vinod Dhurandhar Oration (AIAARO),
                                      Prof. Th Biren Singh Memorial Oration
                                      (Nedscon) and has number of publications
                                      including chapters on diabetes and obesity
                                      in books.
                                    </p>
                                    <p>
                                      Dr. Makkar is a member by “special
                                      invitation” to American Diabetes
                                      Association, member of AACE, EASD, and
                                      Canadian obesity research network. He was
                                      also member of International Committee of
                                      AACE-2014, 2016-17 and AACE Business
                                      Opportunities Committee for 2016-2017,
                                      Member AACE Diabetes and Obesity DSN 2019,
                                      and member of ADA special interest groups.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div id="tab2" class="tab-pane fade">
                              <div class="row">
                                <div class="content-box">
                                  <div class="col-md-2 thumb">
                                    <img
                                      src="assets/images/rajeev.jpg"
                                      alt="Thumb"
                                    />
                                  </div>
                                  <div class="col-md-10 info">
                                    <h4>Dr. Rajeev Chawla</h4>
                                    <span>
                                    Director and Senior Diabetologist <br/> <h5> North Delhi Diabetes Centre, New Delhi</h5>
                                    </span>
                                    <p>
                                      Dr. Rajeev is trained at Diabetes and
                                      Endocrinology Centre of Western New York.
                                      He is a Senior Diabetologist and Director,
                                      ‘North Delhi Diabetes Centre’, New Delhi.
                                      He is an approved DNB Teacher & Guide for
                                      DNB (Medicine) for 18 years and Honorary
                                      Professor at Jaipur National University.
                                      He has more than 65 papers on Micro &
                                      Macro vascular complications to his credit
                                      which are included in ADA (American
                                      Diabetes Association) and IDF
                                      (International Diabetes Federation). He
                                      has also authored 7 Books on Diabetes. He
                                      is the Executive Editor of International
                                      Journal of Diabetes in Developing
                                      Countries. He has been honoured with 10
                                      Orations and was awarded Travel Grant in
                                      Young Investigator Oral Paper Category in
                                      AACE (American Association of Clinical
                                      Endocrinologists) 2017.
                                    </p>
                                    <p>
                                      He is currently President, Diabetes in
                                      Pregnancy Study Group India (DIPSI) 2019.
                                      He is Immediate Past President of Research
                                      Society for Study of Diabetes in India
                                      (RSSDI) 2018-19. He is also Past Secretary
                                      of RSSDI National Body, Chairman of RSSDI
                                      Delhi chapter, Scientific Chair at 46th
                                      Annual Conference of RSSDI 2018 and
                                      Scientific Chair at the 7th World Congress
                                      of Diabetes - Diabetes India 2017.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div id="tab3" class="tab-pane fade">
                              <div class="row">
                                <div class="content-box">
                                  <div class="col-md-2 thumb">
                                    <img
                                      src="assets/images/shalini.png"
                                      alt="Thumb"
                                    />
                                  </div>
                                  <div class="col-md-10 info">
                                    <h4>Dr. Shalini Jaggi</h4>
                                    <span>
                                    Consultant and Head <br/> <h5>Dr Mohans’ Diabetes Specialties Centre, New Delhi</h5>
                                    </span>
                                    <p>
                                      Dr. Shalini is a Fellow of Royal Colleges
                                      of Physicians (London, Edinburgh and
                                      Glasgow) and American College of
                                      Endocrinology (ACE), USA. She is the
                                      recipient of National Fellowship of RSSDI
                                      (Research Society for the Study of
                                      Diabetes in India)-2016 and Diabetes
                                      India- 2017. She was honored with the
                                      National Diabetes Awareness Initiative
                                      Award by Diabetes India-2017.
                                    </p>

                                    <p>
                                      She is the Member Executive Council, RSSDI
                                      National and Joint Secretary, RSSDI, Delhi
                                      Chapter. She is also the joint Course
                                      Director(India) for Master Course in
                                      Clinical Diabetes for Physicians certified
                                      by RCGP(UK) & Diabetes UK. She is also the
                                      Faculty & Tutor for Cardiff University, UK
                                      and University of South Wales, UK. She has
                                      done Observer ship at Joslin Diabetes
                                      Centre, Boston, USA and Diabetes and
                                      Endocrinology Centre of West New York,
                                      USA. She is a Certified trainer for
                                      Insulin Pumps & CGMS/FGM.
                                    </p>

                                    <p>
                                      She has contributed to numerous
                                      publications in reputed national and
                                      international scientific journals and has
                                      more than 30 chapters in textbooks to her
                                      credit.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div id="tab4" class="tab-pane fade">
                              <div class="row">
                                <div class="content-box">
                                  <div class="col-md-2 thumb">
                                    <img
                                      src="assets/images/mukulesh.png"
                                      alt="Thumb"
                                    />
                                  </div>
                                  <div class="col-md-10 info">
                                    <h4>Dr. Mukulesh Gupta</h4>
                                    <span>Director, Diabetologist and Physician <br/>  <h5>Udyaan Health Care (P) Ltd, Lucknow</h5></span>
                                   
                                    <p>
                                      Dr. Mukulesh Gupta MBBS, MD, Post Graduate
                                      Program in Diabetology from The Johns
                                      Hopkins University, Post Graduate Diploma
                                      in Diabetes from Cardiff (UK). Dr.
                                      Mukulesh Gupta is currently the Director -
                                      Diabetologist and Physician Udyaan Health
                                      Care (P) Ltd, a multi-speciality Hospital
                                      at Lucknow, UP. He is also rendering
                                      services in the Rural areas of Jagdishpur
                                      and Haidergarh for more than 29 years as
                                      social commitment.
                                    </p>

                                    <p>
                                      He has done an Advanced Course in Thyroid
                                      Disorder Management by Indian Thyroid
                                      Society 2011, Certificate course on
                                      Management Approach to HTN & associated Co
                                      morbidities by JACC (2014), Certified
                                      Programme in Clinical Diabetology Harvard
                                      Medical School (2014) and Cardio Pulmonary
                                      Resuscitation SGPGI Lucknow (2017). He is
                                      a Certified wound care Practitioner by
                                      Association of Surgeons of India (2015).
                                      He is Secretary Lucknow Diabetes Study
                                      Society (LDSS) and is a speaker at various
                                      forums. Poster Presentation at EASD 2018
                                      Berlin. He has participated in many
                                      Clinical Trials and Research Publications.
                                    </p>

                                    <p>
                                      He is a Life member of various
                                      professional organisations like
                                      Association of Physicians of India (API),
                                      Cardiological Society of India (CSI),
                                      Research Society for Study of Diabetes in
                                      India (RSSDI), Uttar Pradesh Diabetes
                                      Association (UPDA), American College of
                                      Cardiology (ACC), American College of
                                      Physicians (ACP)
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <h2 class="light-title section-title mt-3">Leadership Team</h2>

                <div class="team-area default-padding">
                  <div class="">
                    <div class="team-items">
                      <div class="col-md-12">
                        <div class="row">
                          <ul class="nav nav-tabs nav-pills" id="myTabs">
                            <li class="nav-item">
                              <a
                                data-toggle="tab"
                                href="#tab5"
                                aria-expanded="true"
                              >
                                <img
                                  src="assets/images/team/atul.png"
                                  alt="Thumb"
                                />
                                <h4>Atul Gupta</h4>
                                <p>Co-Founder & Director</p>
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                data-toggle="tab"
                                href="#tab6"
                                aria-expanded="false"
                              >
                                <img
                                  src="assets/images/team/shaurya.png"
                                  alt="Thumb"
                                />
                                <h4>Shaurya Aggarwal</h4>
                                <p>Co-Founder & Promoter </p>
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                data-toggle="tab"
                                href="#tab7"
                                aria-expanded="false"
                              >
                                <img
                                  src="assets/images/team/arun.png"
                                  alt="Thumb"
                                />
                                <h4>Arun K. Pathak</h4>
                                <p>Co-Founder & CEO</p>
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                data-toggle="tab"
                                href="#tab8"
                                aria-expanded="false"
                              >
                                <img
                                  src="assets/images/team/praveen.png"
                                  alt="Thumb"
                                />
                                <h4>Praveen Singhal</h4>
                                <p>Chief Operating Officer</p>
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                data-toggle="tab"
                                href="#tab9"
                                aria-expanded="false"
                              >
                                <img
                                  src="assets/images/team/shilpa.png"
                                  alt="Thumb"
                                />
                                <h4>Dr. Shilpa Chugh Garcha</h4>
                                <p>Director Medical Affairs</p>
                              </a>
                            </li>
                            {/* <li class="nav-item">
                              <a
                                data-toggle="tab"
                                href="#tab10"
                                aria-expanded="false"
                              >
                                <img
                                  src="assets/images/team/kholi.png"
                                  alt="Thumb"
                                />
                                <h4>Harsh Kohli</h4>
                                <p>Diabetes Educator</p>
                              </a>
                            </li>
                        */}
                          </ul>

                          <div class="tab-content tab-content-info">
                            <div id="tab5" class="tab-pane fade">
                              <div class="row">
                                <div class="content-box">
                                  <div class="col-md-2 thumb">
                                    <img
                                      src="assets/images/team/atul.png"
                                      alt="Thumb"
                                    />
                                  </div>
                                  <div class="col-md-10 info">
                                    <h4>Atul Gupta</h4>
                                    <span>Co-Founder & Director</span>
                                    <p>
                                      Atul is a successful serial entrepreneur,
                                      he has incubated & has been an early
                                      investor, in several companies ranging
                                      from sectors as diverse as packaging
                                      machinery, laundry etc. He is also founder
                                      of “Rx Infotech Pvt Ltd” (a well renowned
                                      Brand - LAPCARE), specializing in laptop
                                      peripherals & accessories. He is an
                                      Electronics & Communications Engineer.
                                    </p>
                                    <p>
                                      He is a great chef at home and loves to
                                      host & impress people with his super
                                      engaging culinary skills.
                                    </p>
                                    <p>
                                      {" "}
                                      <a
                                        href="https://www.linkedin.com/in/atul-guupta-bb0aa238/"
                                        target="_blank"
                                      >
                                        <i class="fab fa-linkedin"></i>
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div id="tab6" class="tab-pane fade">
                              <div class="row">
                                <div class="content-box">
                                  <div class="col-md-2 thumb">
                                    <img
                                      src="assets/images/team/shaurya.png"
                                      alt="Thumb"
                                    />
                                  </div>
                                  <div class="col-md-10 info">
                                    <h4>Shaurya Aggarwal</h4>
                                    <span>Co-Founder & Promoter</span>
                                    <p>
                                      Shaurya is an energetic millennial, has
                                      experienced diabetes living from very
                                      early age, he was diagnosed with Type I
                                      diabetes when he was just about 10 years
                                      old. For him it was highly challenging to
                                      control the severe cravings for food,
                                      especially the junk, at such a tender age.
                                      However, the experience of diabetes has
                                      molded him to respect his body and take
                                      care of himself in a manner he thought
                                      would not have possible otherwise. He is a
                                      final year graduation student at
                                      University of Delhi.
                                    </p>
                                    <p>
                                      He sees himself as an individual who is
                                      committed to fitness and is never afraid
                                      of helping anyone. He is a Bollywood fan,
                                      car enthusiast, loves travelling and
                                      exploring new places.
                                    </p>
                                    <p>
                                      {" "}
                                      <a
                                        href="https://www.linkedin.com/in/shaurya-aggarwal-75227262/"
                                        target="_blank"
                                      >
                                        <i class="fab fa-linkedin"></i>
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div id="tab7" class="tab-pane fade">
                              <div class="row">
                                <div class="content-box">
                                  <div class="col-md-2 thumb">
                                    <img
                                      src="assets/images/team/arun.png"
                                      alt="Thumb"
                                    />
                                  </div>
                                  <div class="col-md-10 info">
                                    <h4>Arun K. Pathak</h4>
                                    <span>Co-Founder & CEO</span>
                                    <p>
                                      Arun has an extensive Global, Corporate
                                      Leadership & Management experience in
                                      Information & Communications Technology
                                      across various Geographies with Fortune
                                      500 organizations. He has successfully led
                                      multitude of business critical & complex
                                      initiatives. Has widely traveled & lived
                                      in North & South America, Europe, Asia.
                                      Has worked with Amdocs, Xansa and TCS. He
                                      is an INSEAD and IIT alumnus with
                                      Executive Management & Masters in Computer
                                      Science.
                                    </p>

                                    <p>
                                      Got deep interests in learning &
                                      mentorship, is a visiting speaker to
                                      various start-up forums & educational
                                      institutions. Loves to play lawn tennis.
                                    </p>

                                    <a
                                      href="https://www.linkedin.com/in/arun-kumar-pathak-a881233/"
                                      target="_blank"
                                    >
                                      <i class="fab fa-linkedin"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div id="tab8" class="tab-pane fade">
                              <div class="row">
                                <div class="content-box">
                                  <div class="col-md-2 thumb">
                                    <img
                                      src="assets/images/team/praveen.png"
                                      alt="Thumb"
                                    />
                                  </div>
                                  <div class="col-md-10 info">
                                    <h4>Praveen Singhal</h4>
                                    <span>Chief Operating Officer</span>
                                    <p>
                                      Praveen is a seasoned professional with
                                      over 25 years of experience in management,
                                      sales, marketing, business operations &
                                      profitability. A commerce graduate with
                                      post graduation in management from KJ
                                      Somaiya Institute of Management Studies
                                      and Research, Mumbai. He has experience of
                                      creating 12 business units from scratch
                                      across different states in North India in
                                      financial services and automobile
                                      industry. A person with an eye for detail
                                      having experience of leading large teams
                                      in brands catering to masses and premium
                                      segment. He has unwavering attitude to
                                      attain top position in customer
                                      satisfaction, sales and process
                                      compliance. A go getter who works on
                                      principle of inclusive management.
                                    </p>

                                    <p>
                                      He is a family person who loves to read
                                      and socialise.
                                    </p>
                                    <p>
                                      <a
                                        href="https://www.linkedin.com/in/praveen-singhal-26970821/"
                                        target="_blank"
                                      >
                                        <i class="fab fa-linkedin"></i>
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div id="tab9" class="tab-pane fade">
                              <div class="row">
                                <div class="content-box">
                                  <div class="col-md-2 thumb">
                                    <img
                                      src="assets/images/team/shilpa.png"
                                      alt="Thumb"
                                    />
                                  </div>
                                  <div class="col-md-10 info">
                                    <h4>Dr. Shilpa Chugh Garcha</h4>
                                    <span>Director Medical Affairs</span>
                                    <p>
                                      Dr. Shilpa is a dynamic & versatile
                                      healthcare professional who has worked as
                                      a medical advisor with leading
                                      pharmaceuticals like Novo Nordisk India,
                                      Baxter India and online healthcare
                                      platform 1mg.com. With her love for
                                      learning new things and taking on new
                                      challenges, she has been an integral part
                                      of various novel & innovative projects and
                                      initiatives. She has keen interest in
                                      medical writing and aspires to work on
                                      tech-enabled solutions for educating and
                                      empowering the patients for
                                      self-management of their health
                                      conditions. She is an MBBS graduate and to
                                      further enhance her skill set, she pursued
                                      an MD in Pharmacology.
                                    </p>

                                    <p>
                                      At home, a mother of two lovely daughters,
                                      she loves to spend time with her kids and
                                      cook their favorite dishes.
                                    </p>
                                    <p>
                                      <a
                                        href="https://www.linkedin.com/in/shilpa-chugh-garcha-812b1a39/"
                                        target="_blank"
                                      >
                                        <i class="fab fa-linkedin"></i>
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div id="tab10" class="tab-pane fade">
                              <div class="row">
                                <div class="content-box">
                                  <div class="col-md-2 thumb">
                                    <img
                                      src="assets/images/team/kholi.png"
                                      alt="Thumb"
                                    />
                                  </div>
                                  {/* <div class="col-md-10 info">
                                    <h4>Harsh Kohli</h4>
                                    <span>Diabetes Educator</span>
                                    <p>
                                      Harsh is an enthusiastic Diabetic
                                      counselor and educator, he works closely
                                      with newly diagnosed kids and their
                                      parents as to how to manage their Diabetes
                                      better by teaching them the basics. He
                                      himself was diagnosed with Type 1 Diabetes
                                      in Sep 1992, which he was able to adjust
                                      to the change in his life very soon. But
                                      life came to a stand still for him and his
                                      family when his younger son Aarush was
                                      diagnosed with Type 1 Diabetes in Dec
                                      2016. He had never met a Type 1 Diabetic
                                      all his life till that time, gradually he
                                      started meeting Type 1 Diabetics and
                                      slowly yet steadily they were able to
                                      build a strong community of Type 1
                                      Diabetics and that is how DIYA was formed.
                                    </p>

                                    <p>
                                      His aim is to empower the Community, by
                                      advocating the cause and Spreading
                                      awareness about Type 1 Diabetes.
                                    </p>
                                  </div>
                                 */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />

                <h2 class="light-title section-title mt-3about">
                  Work Culture & Core Values
                </h2>
                <div class="row">
                  <div class="col-lg-12">
                    <p class="lead1">
                      As BeatMySugar family we strongly believe & practice in
                      the following Core values in all spheres of our business,
                      work culture & all actions. The truthfulness, adherence to
                      moral & ethical values, focus & work together as a team
                      towards our Vision & Mission with complete lucidity is
                      supreme.
                    </p>

                    <div class="row">
                      <div class="col-md-4">
                        <img src="/assets/images/about-2.png" />
                      </div>
                    </div>
                  </div>
                  {/* <!-- End .col-lg-10 --> */}
                </div>
                {/* <!-- End .row --> */}
              </div>
            </div>
          
          </div>
        </div>
      
      </div>
    );
  }
}

export default AboutUs;
