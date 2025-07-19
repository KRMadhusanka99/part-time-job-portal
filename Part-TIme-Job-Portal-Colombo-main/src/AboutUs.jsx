import React from 'react'

export const AboutUs = () => {

  return (
    <div>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full content-inner overlay-white-middle">
            <div className="container">
              <div className="row align-items-center m-b50">
                <div className="col-md-12 col-lg-6 m-b20">
                  <h2 className="m-b5">About Us</h2>
                  <h3 className="fw4">We create unique experiences</h3>
                  <p className="m-b15">FlexJob is a Part-Time job platform created to bridge the gap between skilled professionals and flexible work opportunities. The company focuses on offering an intuitive and accessible interface for both job seekers and employers. It is built with a vision to streamline hiring for part-time, freelance, and remote roles across diverse industries.</p>
                  <p className="m-b15">It is a long established fact that job seekers benefit from platforms that prioritize flexibility and efficiency. The point of using FlexJob is to simplify the job search process while providing companies with qualified candidates ready to work on their own terms.</p>

                </div>
                <div className="col-md-12 col-lg-6">
                  <img src="/assets/images/our-work/pic1.jpg" alt="" />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 m-b30">
                  <div className="icon-bx-wraper p-a30 center bg-gray radius-sm">
                    <div className="icon-md text-primary m-b20">
                      <a href="#" className="icon-cell text-primary"><i className="ti-briefcase"></i></a>
                    </div>
                    <div className="icon-content">
                      <h5 className="dlab-tilte text-uppercase">Flexible Job Listings</h5>
                      <p>Browse a wide range of part-time, freelance, and remote jobs tailored to your skills and schedule preferences.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 m-b30">
                  <div className="icon-bx-wraper p-a30 center bg-gray radius-sm">
                    <div className="icon-md text-primary m-b20">
                      <a href="#" className="icon-cell text-primary"><i className="ti-user"></i></a>
                    </div>
                    <div className="icon-content">
                      <h5 className="dlab-tilte text-uppercase">Verified Employers</h5>
                      <p>Connect with trusted companies and startups actively seeking reliable talent for short-term or ongoing roles.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 m-b30">
                  <div className="icon-bx-wraper p-a30 center bg-gray radius-sm">
                    <div className="icon-md text-primary m-b20">
                      <a href="#" className="icon-cell text-primary"><i className="ti-search"></i></a>
                    </div>
                    <div className="icon-content">
                      <h5 className="dlab-tilte text-uppercase">Smart Job Matching</h5>
                      <p>Let our intelligent matching system suggest jobs that best align with your experience, availability, and interests.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="section-full content-inner-2 call-to-action overlay-black-dark text-white text-center bg-img-fix" style={{ backgroundImage: `url(/assets/images/background/bg4.jpg)` }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h2 className="m-b10 font-80">Join With Us Earn More !</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
