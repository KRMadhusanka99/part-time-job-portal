import React from 'react'

export const Footer = () => {
  return (
    <>
      <footer className="site-footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12">
                <div className="widget">
                  <a href="/"> <img src="assets/images/logo-white-01.png" width="180" className="m-b15" alt="Part Time Job Portal Logo" /></a>

                  <p className="text-capitalize m-b20">
                    Discover endless opportunities with FlexJob, your trusted part-time job portal. A gateway to flexible, rewarding, and career-boosting work options tailored to your lifestyle.
                  </p>
                  <ul className="list-inline m-a0">
                    <li><a href="#" className="site-button white facebook circle "><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#" className="site-button white instagram circle "><i className="fa fa-envelope-o"></i></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-8 col-sm-8 col-12">
                <div className="widget border-0">
                  <h5 className="m-b30 text-white">Frequently Asked Questions</h5>
                  <ul className="list-2 list-line">
                    <li><a href="#">Privacy & Security</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">For Employers</a></li>
                    <li><a href="#">Contact Us</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-12">
                <div className="widget border-0">
                  <h5 className="m-b30 text-white">Find Jobs</h5>
                  <ul className="list-2 w10 list-line">
                    <li><a href="#">Colombo Jobs</a></li>
                    <li><a href="#">Event Organizing</a></li>
                    <li><a href="#">Wedding Staffing</a></li>
                    <li><a href="#">Customer Service</a></li>
                    <li><a href="#">Delivery Services</a></li>
                    <li><a href="#">Event Staffing</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center"><span><a target="_blank" href="#">Part Time Job Portal</a></span></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
