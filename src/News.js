import React from 'react';
import logo from './logo.svg';

import moment from 'moment'



class News extends React.Component {


    // componentDidMount(){
    //     $('.grid').imagesLoaded( function() {

    //         // filter items on button click
    //         $('.portfolio-menu').on( 'click', 'button', function() {
    //           var filterValue = $(this).attr('data-filter');
    //           $grid.isotope({ filter: filterValue });
    //         });	
            
    //         // init Isotope
    //         var $grid = $('.grid').isotope({
    //           itemSelector: '.grid-item',
    //           percentPosition: true,
    //           masonry: {
    //             // use outer width of grid-sizer for columnWidth
    //             columnWidth: '.grid-item',
    //           }
    //         });
            
            
            
    //         });

    // }


  render(){
  return (

    <div className="App">
       
       
                                    <div class="MainMenu">

                                           
                                    <h2 class="sidebar-title">News in Diabetes</h2>
                                           <div class="news-box">
                                                <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-first-oral-glp-1-treatment-type-2-diabetes" target="_blank"> 
                                          <div class="row">
                                              
                                              <div class="col-md-12">
                                                  <p><b>First oral GLP-1 agonist Rybelsus (Semaglutide) approved by the US FDA for type 2
                                                        diabetes mellitus</b></p>
                                                       
                                                 
                                              </div>
                                              <div class="col-md-4">
                                                  {/* <img src="assets/images/news/news1.jpg"/> */}
                                              </div>
                                           <div class="col-md-12">
                                                <p>Rybelsus would be available in tablet form for management of type 2 diabetes mellitus along
                                                        with diet and exercise.</p>
                                                <p>It has shown positive results in lowering blood sugar levels and body weight. It is not approved
                                                        for treatment of type 1 diabetes mellitus and diabetic ketoacidosis.</p>
                                                        <p>Common side effects reported are nausea, vomiting, indigestion, low appetite and constipation.</p>
                                                        <p>It would come with a boxed warning about its potential risk of thyroid c-cell tumors.
                                                                Other warnings included hypoglycemia (increased risk when used with insulin or sulfonylureas),
                                                                diabetic retinopathy (damage to retina of the eye), acute kidney injury and constipation.</p>
                                                                <p>The approval has been granted to Novo Nordisk.</p>
                                                                <p class="date-color"><i class="fas fa-calendar-alt"></i> {moment().format('ll')}</p>
                                           </div>
                                          </div>
                                        </a>
                                        </div>
                                           
                                                                                   </div>
                              </div>
   

  );
  }
}

export default News;
