import React, { useEffect } from 'react'


export const Header = () => {

  useEffect(() => {
    // Remove any scroll-based class manipulation
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        header.classList.remove('is-fixed'); // Ensure no shrinking behavior
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="site-header mo-left header fullwidth">

        <div className="sticky-header main-bar-wraper navbar-expand-lg">
          <div className="main-bar clearfix">
            <div className="container clearfix">
              <div className="logo-header mostion">
                <a href="/"><img src="/assets//images/logo-blue-01.png" className="logo" alt="" /></a>
              </div>
              <button className="navbar-toggler collapsed navicon justify-content-end" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
              </button>

              <div className="extra-nav">
                <div className="extra-cell">
                  <a href="/SignUp" className="site-button"><i className="fa fa-user"></i> Sign Up</a>
                  <a href="/Login" className="site-button"><i className="fa fa-lock"></i> Login</a>
                </div>
              </div>

              <div className="header-nav navbar-collapse collapse justify-content-start" id="navbarNavDropdown">
                <ul className="nav navbar-nav">
                  <li className="active">
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="#">For Candidates <i className="fa fa-chevron-down"></i></a>
                    <ul className="sub-menu">
                      <li><a href="/BrowseJobs" className=".job-portal-page">Browse Job</a></li>
                      <li><a href="/CandidateForm" className=".job-portal-page">Post My Details</a></li>
                    </ul>
                  </li>

                  <li>
                    <a href="#">For Employers <i className="fa fa-chevron-down"></i></a>
                    <ul className="sub-menu">
                      <li><a href="/BrowseCandidates" className=".job-portal-page">Browse Candidates</a></li>
                      <li><a href="/JobAdForm" className=".job-portal-page">Post A Job</a></li>
                    </ul>
                  </li>

                  <li>
                    <a href="/AboutUs">About Us</a>
                  </li>
                  <li>
                    <a href="/ContactUs">Contact Us</a>
                  </li>

                </ul>

              </div>
            </div>
          </div>
        </div>

      </header>
    </>
  )
}
