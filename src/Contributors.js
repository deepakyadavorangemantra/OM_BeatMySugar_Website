import React from "react";
import Header from "./Header";
import Footer from "./Footer";

class Contributors extends React.Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <main class="main">
          <div class="container doctors-section">
            <div class="row">
              <div class="col-md-12">
                <h3 class="section-title">Contributors</h3>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="doctors-box hvr-underline-reveal">
                  <div class="row">
                    <div class="col-md-3">
                      <img src="assets/images/doctor.jpg" />
                    </div>
                    <div class="col-md-9 doctors-details">
                      <h3>Dr. Pranay</h3>
                      <p>BDS, MDS-Oral Pathology and Oral</p>
                      <p class="short-desc">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <div class="clearfix"></div>
                      <div class="doctors-details doctor-contact-details contributor-sec">
                        <p>
                          <a href="#">
                            <i class="fas fa-envelope"></i>{" "}
                            pranay@beatmysugar.com
                          </a>
                        </p>
                        <p>
                          <a href="#">
                            <i class="fas fa-phone-volume"></i> +91 95000 27017
                          </a>
                        </p>
                      </div>
                      <a
                        href="/contributordetails"
                        class="btn view-profile-btn"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default Contributors;
