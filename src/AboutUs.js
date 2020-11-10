import React from "react";
import logo from "./logo.svg";

import Header from "./Header";
import Footer from "./Footer";
import News from "./News";

class AboutUs extends React.Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <nav aria-label="breadcrumb" class="breadcrumb-nav">
          <div class="container">
            <ol class="breadcrumb">
              {/* <li class="breadcrumb-item">
                <a href="/">
                  <i class="icon-home"></i>
                </a>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                About Beat My Sugar
              </li> */}
              {/* <li class="breadcrumb-item" aria-current="page">Diabetes</li>
                                <li class="breadcrumb-item" aria-current="page">Type 1 Diabetes</li>
                                <li class="breadcrumb-item active" aria-current="page">Type 1 diabetes causes and risk factors */}
              {/* </li> */}
            </ol>
          </div>
          {/* <!-- End .container --> */}
        </nav>

        <div class="container" >
          <div class="row marginbtm-240">
            <div class="col-md-12">
              <div class="container-boxabout">
              
                <div class="row ">
                  <div class="col-lg-12">
                    <div class="row about-us-spacing" style={{verticalAlign:"middle",alignItems:"center",marginTop:"30px"}}>
                    <div class="col-md-1"></div>
                      <div class="col-md-5 col-sm-12 col-xs-12">
                      <h2 class="light-title section-title">About BeatMySugar</h2>
                      <h4>Diabetic Care at its finest</h4>
                    <p class="lead1">
                      <b>BeatMySugar</b> is a unique tech-powered, comprehensive platform that focuses on making best-in-class diabetes care affordable, effortless, and easily accessible.
                    </p>
                    <p class="lead1">
                    In a bid to switch diabetes management from a "disconnected" and "scattered" framework to an all-inclusive, 360-degree unified model, BeatMySugar was conceived in March 2019. A year later, the revolutionary and promising start-up is already making great strides in the diabetes ecosystem. Dedicated to improving the quality of life of the pre-diabetic and diabetic population, it is a one-stop solution to everything related to diabetes. 
                    </p>


                   
                      </div>

                      <div class="col-md-5 col-sm-12 col-xs-12">
                        <img src="assets/images/about-us-updated.png" alt="About BeatMySugar"></img>
                      </div>
                    </div>

                    <div class="row about-us-spacing">
                    <div class="col-md-1"></div>
                      <div class="col-md-5 col-sm-12 col-xs-12">
                      <img src="assets/images/about-us-2.png" alt="Dispelling The Notion"></img>
                      </div>
                      <div class="col-md-5 col-sm-12 col-xs-12">
                      <h4>Dispelling The Notion</h4>
                    <p class="lead1">
                    At BeatMySugar, we believe there is a better way to approach diabetic management. We believe in delivering value, and the real value comes only when we start putting the spotlight on what matters. 
                    </p>
                    <p class="lead1">
                    What has been long approached as merely a state of improper glucose metabolism goes far beyond that. Diabetes management currently calls for a huge paradigm shift as to how diabetes is perceived and managed. 
                    </p>
                    <p class="lead1">
                    The much prevalent and dominant model of treatment needs to be replaced, and this is where we come into the picture. 
                    </p>
                    <ul class="lead1">
                      <li>
                      To inform you that diabetes is a tricky and complex condition, the management goes much beyond glycaemic control.
                      </li>
                      <li>
                      	To make you aware of the fact that this multifaceted condition needs a multidimensional approach to management, which amalgamates the three aspects i.e., awareness, lifestyle adaptations, and medicinal care.
                      </li>
                      <li>
                      And finally, to offer you one integrated and connected platform named BeatMySugar that blends medical, lifestyle, behavioural, and emotional help in an attempt to facilitate your navigation through the various life stages of your pre-diabetic and diabetic health.
                      </li>
                    </ul>
                      </div>
                      </div>
                   
                  <div class="row about-us-spacing" >
                  <div class="col-md-1"></div>
                    <div class="col-md-5 col-sm-12 col-xs-12">
                    <h4>You are not alone</h4>
                    <p class="lead1">
                      Diabetes is a demanding lifestyle disorder affecting
                      pretty much every facet of your life which makes, needs of
                      a diabetic patient multidimensional in character. Here at
                      BeatMySugar, we strive to take good care of each and every
                      aspect of the entire spectrum of your diabetic needs.
                    </p>
                    <p class="lead1">
                      Ranging from the most familiar needs like lifestyle and
                      medical to the much unexpressed ones aka psychological and
                      emotional, we have got you covered!
                    </p>
                    <p class="lead1">
                      By embracing technology, partnerships and personalised
                      approach, we aim to improve the accessibility of diabetic
                      care and streamline it on a global level.
                    </p>
                    </div>
                    <div class="col-md-5 col-sm-12 col-xs-12">
                                <img src="assets/images/about-us-3.png" alt="You are not alone"></img>
                    </div>
                  </div>
                   
                   
                   
                  </div>
                   {/* <!-- End .col-lg-10 --> */}
                </div>

                  {/* <div class="col-md-12">
                    <h2 class="light-title section-title mt-3">
                      Improved Diabetes care with our Products & Services
                    </h2>
                    <div class="row">
                      <div class="col-md-4"></div>
                      <div class="col-md-4">
                        <img
                          src="assets/images/about.jpg"
                          style={{ width: "100%" }}
                        ></img>
                      </div>
                      <div class="col-md-4"></div>
                      <div class="col-md-12" style={{ marginTop: "20px" }}>
                        <p class="lead1">
                          With a more accessible, affordable and result-oriented
                          line-up of products and services, all under one roof,
                          BeatMySugar is all geared up to improve diabetes
                          health outcomes.
                        </p>
                        <p class="lead1">
                          In an attempt to bridge the gap between patients and
                          all diabetes-related tools and resources”, BeatMySugar
                          has partnered with an array of healthcare experts,
                          physicians, exercise physiologists, dieticians,
                          pharmacies, diagnostic chains and insurance providers
                          to offer a wide portfolio of products and services,
                          all under its canopy.
                        </p>
                        <p class="lead1">
                          Whether it is about any simple unanswered diabetes
                          related questions or the in-depth information about
                          meals, exercise, lifestyle and behavioural
                          modifications concerning the blood glucose management,
                          BeatMySugar has all that is needed to strengthen your
                          day-to-day diabetes coping skills.
                        </p>
                        <h4>Some of the Products and Services</h4>
                        <p class="lead1">
                          <b>Products</b>
                        </p>
                        <ul class="lead1">
                          <li>
                            Authentic and affordable diabetes related medicine
                            (Allopathic, Ayurvedic and homeopathic).
                          </li>
                          <li>Packaged diabetic friendly foods.</li>
                          <li>
                            Dietary and nutritional supplements to help control
                            diabetes.
                          </li>
                          <li>
                            Diabetic foot care which includes foot creams,
                            socks, foot care kit and diabetic inserts.
                          </li>
                          <li>
                            Access to expert’s vast knowledge base, books and
                            learning resources to help you with the detailed and
                            actionable insights about diabetes.
                          </li>
                          <li>
                            Diabetes devices e.g. glucometers, blood pressure
                            monitors, insulin pumps and more.
                          </li>
                        </ul>
                        <p class="lead1">
                          <b>Services</b>
                        </p>
                        <ul class="lead1">
                          <li>
                            Doctors and dietician consultation - To successfully
                            help you self-manage diabetes and its related
                            complications, we have a team of the most
                            experienced in-house and partnered health care
                            experts who offer their expert and personalised
                            advice on diabetes and nutrition.
                          </li>
                          <li>
                            Health and fitness consultation - Whether it is
                            managing diabetes or dealing with pre diabetes, our
                            fitness trainers and exercise physiologists play a
                            crucial role in helping you with the exercises and
                            yoga that keeps blood sugar in control thus enabling
                            you to stay on track.
                          </li>
                          <li>
                            Diagnostics - Through our partnership with
                            diagnostic chains, routine diagnostic tests and
                            solutions to help optimize diabetes related
                            decisions are no more a hassle.
                          </li>
                          <li>
                            Insurance plans - At BeatMySugar, we offer you
                            instant access to myriad user friendly insurance
                            products.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <p></p>
                  </div> */}
                  {/* <!-- End .col-lg-10 --> */}
                </div>
                {/* <!-- End .row --> */}

              

             
               
                {/* <!-- End .row --> */}
              </div>
<div class="">
  <div class="col-md-12">
              <div class="container-boxabout">
                <div class="">
              <div class="col-md-12">
                  <h2 class="light-title section-title mt-3about">Our Essence</h2>
                  </div>
                  <div class="col-md-12" style={{marginTop:"20px",marginBottom:"30px"}}>
                      <div class="parallax" style={{background: "url('assets/images/paralllax.jpg')"}} alt="Our Essence">
                              <div class="row">
                                <div class="col-md-6 no-padding-right">
                                  <div class="overlay-1">
                                    <div class="parallax-box">
                                <h4>Vision</h4>
                                <p>Diabetic controlled world is what we envisage and strive to achieve.</p>
                                </div>
                                </div>
                                </div>

                                <div class="col-md-6 no-padding-left">
                                <div class="overlay-2 ">
                                  <div class="parallax-box">
                                  <h4>Mission</h4>
                                  <p>Enable the diabetic population to lead a healthy lifestyle by 'Simplifying Diabetes Management' through a tech-enabled ecosystem with all products and services available at single place. Reach & help out 1 million people living with diabetes by 2025.</p>
                                  </div>
                                  </div>
                                  </div>
                              </div>
                      </div>
                  </div>

                
                  <div class="col-lg-12">
                  

                   
                   
                   
                    <h4 style={{textAlign:"center",fontWeight:"600",fontSize:"26px"}}>
                    Four ground rules that defines the Culture of BeatMySugar 
                    </h4>
                    <div class="row">
                    <div class="col-md-3 rules-box" >
                      <img src="assets/images/collabration.png" alt="Collaboration"></img>
                   <h4>Collaboration</h4>
                    <p class="lead1">
                    As they say, “One note does not make a symphony; one artist does not make an orchestra”. This exactly is the soul and spirit of BeatMySugar. Growing alongside each other is what we fiercely believe in. “Together we rise” is our mantra.
                    </p>
                    </div>
                    <div class="col-md-3 rules-box">
                    <img src="assets/images/transparency.png" alt="Transparency"></img>
                    <h4>Transparency</h4>
                    <p class="lead1">
                    At BeatMySugar, we believe in cultivating “a culture of transparency”. In all our business practices, we implement absolute transparency and candour. The way we see it, transparency generates trust, which is the cornerstone of good teamwork.
                    </p>
                      </div>
                      <div class="col-md-3 rules-box">
                      <img src="assets/images/prog.png" alt="Progressive"></img>
                      <h4>Progressive</h4>
                    <p class="lead1">
                      We, at BeatMySugar, have always been open to newer and innovative ideas. Ours is a progressive culture that is quite reflective of our revolutionary approach towards Diabetes management. Innovation and authenticity are what constitute the DNA of BeatMySugar.
                    </p>
                      </div>
                      <div class="col-md-3 rules-box">
                      <img src="assets/images/inte.png" alt="Integrity"></img>
                      <h4>Integrity</h4>
                    
                    <p class="lead1">
                    We believe in conforming to the highest ethical standards in all our business activities and actions. Honesty and integrity are non-negotiable for us.
                    </p>
                      </div>
                      </div>
                   
                   
                
                    
                   
                  </div>
                  
                  </div>
                  </div>
                  </div>
                  </div>


                  <div class="col-md-12">
                <div class="container-boxabout">
                <h2 class="light-title section-title">Advisory Board</h2>

             

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
                  alt="Dr. Mukulesh Gupta"
                />
                <h4>Dr. Mukulesh Gupta</h4>
                <p>
                  Director, Diabetologist and Physician <br />{" "}
                  <h5>Udyaan Health Care (P) Ltd, Lucknow</h5>
                </p>
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
                  alt="Dr. Rajeev Chawla"
                />
                <h4>Dr. Rajeev Chawla</h4>
                <p>
                  Director and Senior Diabetologist <br />
                  <h5>
                    North Delhi Diabetes Centre, New Delhi
                  </h5>
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
                  alt="Dr. Shalini Jaggi"
                />
                <h4>Dr. Shalini Jaggi</h4>
                <p>
                  Consultant and Head <br />
                  <h5>
                  Lifecare Diabetes Centre, New
                    Delhi
                  </h5>
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a
                data-toggle="tab"
                href="#tab1"
                aria-expanded="true"
              >
                <img src="assets/images/brij.jpg" alt="Dr. B M Makkar" />
                <h4>Dr. B M Makkar</h4>
                <p>
                  Director, Senior Diabetes and Bariatric
                  Physician <br />
                  <h5>
                    Dr Makkar’s Diabetes and Obesity Centre, New
                    Delhi
                  </h5>
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
                      alt="Dr. Brij Mohan Makkar"
                    />
                  </div>
                  <div class="col-md-10 info">
                    <h4>Dr. Brij Mohan Makkar</h4>
                    <span>
                      Director, Senior Diabetes and Bariatric
                      Physician <br />{" "}
                      <h5>
                        Dr Makkar’s Diabetes and Obesity Centre,
                        New Delhi
                      </h5>
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
                      alt="Dr. Rajeev Chawla"
                    />
                  </div>
                  <div class="col-md-10 info">
                    <h4>Dr. Rajeev Chawla</h4>
                    <span>
                      Director and Senior Diabetologist <br />{" "}
                      <h5>
                        {" "}
                        North Delhi Diabetes Centre, New Delhi
                      </h5>
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
                      alt="Dr. Shalini Jaggi"
                    />
                  </div>
                  <div class="col-md-10 info">
                    <h4>Dr. Shalini Jaggi</h4>
                    <span>
                      Consultant and Head <br />{" "}
                      <h5>
                      Lifecare Diabetes Centre,
                        New Delhi
                      </h5>
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
                      alt="Dr. Mukulesh Gupta"
                    />
                  </div>
                  <div class="col-md-10 info">
                    <h4>Dr. Mukulesh Gupta</h4>
                    <span>
                      Director, Diabetologist and Physician{" "}
                      <br />{" "}
                      <h5>
                        Udyaan Health Care (P) Ltd, Lucknow
                      </h5>
                    </span>

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

                </div>
                </div>


                <div class="col-md-12">
            <div class="container-boxabout ">
            <h2 class="light-title section-title">Leadership Team</h2>

<div class="team-area default-padding">
  <div class="">
    <div class="team-items">
      <div class="col-md-12">
        <div class="row">
          <ul class="nav nav-tabs nav-pills" id="myTabs">
          <li class="nav-item">
              <a
                data-toggle="tab"
                href="#tab7"
                aria-expanded="false"
              >
                <img
                  src="assets/images/team/arun.png"
                  alt="Arun K. Pathak"
                />
                <h4>Arun K. Pathak</h4>
                <p>Co-Founder & Director</p>
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
                  alt="Praveen Singhal"
                />
                <h4>Praveen Singhal</h4>
                <p>Co-Founder & Director</p>
              </a>
            </li>
            <li class="nav-item">
              <a
                data-toggle="tab"
                href="#tab5"
                aria-expanded="true"
              >
                <img
                  src="assets/images/team/atul.png"
                  alt="Atul Gupta"
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
                  alt="Shaurya Aggarwal"
                />
                <h4>Shaurya Aggarwal</h4>
                <p>Co-Founder & Promoter </p>
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
                  alt="Dr. Shilpa Chugh Garcha"
                />
                <h4>Dr. Shilpa Chugh Garcha</h4>
                <p>Director, Medical Affairs</p>
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
                      alt="Atul Gupta"
                    />
                  </div>
                  <div class="col-md-10 info">
                    <h4>Atul Gupta</h4>
                    <span>Co-Founder & Director</span>
                    <p>
                    As someone who is an Electronics & Communications Engineer and also a successful serial entrepreneur, Atul has incubated and has been an early investor in several companies ranging from sectors as diverse as packaging, machinery, laundry, etc. He has been battling Type 2 Diabetes for years now.
                    </p>
                    <p>
                    He is the founder of “Rx Infotech Pvt Ltd” (a well-renowned Brand - LAPCARE) specializing in laptop peripherals & accessories.


                    </p>
                    <p>He is a great chef at home and loves to host & impress people with his super engaging culinary skills.</p>
                    <p>
                      Follow me on <a
                        href="https://www.linkedin.com/in/atul-gupta-bb0aa238/"
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
                      alt="Shaurya Aggarwal"
                    />
                  </div>
                  <div class="col-md-10 info">
                    <h4>Shaurya Aggarwal</h4>
                    <span>Co-Founder & Promoter</span>
                    <p>
                    Shaurya is an energetic millennial who has been battling diabetes for years now. He was diagnosed with Type 1 Diabetes when he was just 10 years old. For him, it was highly challenging to control the severe cravings for food, especially the junk, at such a tender age. However, the experience of diabetes has moulded him to respect his body and take care of himself in a manner he thought would not have possible otherwise. He is a final year graduate student at the University of Delhi.
                    </p>
                    <p>
                    He sees himself as an individual who is committed to fitness and is never afraid of helping anyone. He is an avid Bollywood fan, car enthusiast, travel junkie, and a geography geek.
                    </p>
                    <p>
                      {" "}
                      Follow me on <a
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
                      alt="Arun K. Pathak"
                    />
                  </div>
                  <div class="col-md-10 info">
                    <h4>Arun K. Pathak</h4>
                    <span>Co-Founder & Director</span>
                    <p>
                    Arun has an extensive global, corporate leadership & management experience in Information & Communications Technology across various geographies with multiple Fortune 500 organizations. 
                    </p>

                    <p>
                    As an INSEAD and IIT alumnus with Executive Management & Masters in Computer Science, he has successfully led a multitude of businesses critical & complex initiatives. As someone who has widely travelled and lived in North & South America, Europe, and Asia, he has worked with Amdocs, Xansa, and TCS.
                    </p>

                    <p>
                    With deep interest in learning & mentorship, he is a visiting speaker to various start-up forums & educational institutions. He loves to play lawn tennis.


                    </p>

                    <p>Follow me on <a
                      href="https://www.linkedin.com/in/arun-kumar-pathak-a881233/"
                      target="_blank"
                    >
                      <i class="fab fa-linkedin"></i>
                    </a>
                    </p>
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
                      alt="Praveen Singhal"
                    />
                  </div>
                  <div class="col-md-10 info">
                    <h4>Praveen Singhal</h4>
                    <span>Co-Founder & Director</span>
                    <p>
                    Praveen is a seasoned professional with over 25 years of experience in management, sales, marketing, business operations & profitability. 
                    </p>

                    <p>
                    He is a commerce graduate with post-graduation in management from KJ Somaiya Institute of Management Studies and Research, Mumbai. He has experience of creating 12 business units from scratch across different states in North India in financial services and automobile industry. He is a person with an eye for detail and possesses the experience of leading large teams in brands that cater to masses and premium segments. 
                    </p>
                    <p>
                    He has an unwavering attitude to attain the top position in customer satisfaction, sales, and process compliance .a go-getter who works on the principle of comprehensive management. He is a family person who loves to read and socialise.
                    </p>
                   
                    <p>
                    Follow me on <a
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
                      alt="Dr. Shilpa Chugh Garcha"
                    />
                  </div>
                  <div class="col-md-10 info">
                    <h4>Dr. Shilpa Chugh Garcha</h4>
                    <span>Director, Medical Affairs</span>
                    <p>
                    Dr. Shilpa is a dynamic & versatile healthcare professional who has worked as a medical advisor with leading pharmaceuticals like Novo Nordisk India, Baxter India, and online healthcare platform 1mg.com. With her love for learning new things and taking on new challenges, she has been an integral part of various novel & innovative projects and initiatives. She has a keen interest in medical writing and aspires to work on tech-enabled solutions for educating and empowering the patients for self-management of their health conditions. 
                    </p>

                    <p>
                    She is an MBBS graduate, and she pursued an MD in Pharmacology to further enhance her skill set. At home, a mother of two lovely daughters, she loves to spend time with her kids and cook their favourite dishes.
                    </p>
                    <p>
                    Follow me on <a
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
                      alt="Harsh Kohli"
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



            </div>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
    );
  }
}

export default AboutUs;
