import React from 'react'

export const ContactUs = () => {
  return (
    <div>
      <div className="page-content bg-white">
 
        {/* <div className="dez-bnr-inr overlay-black-middle" style={{backgroundImage:`url('assets/images/banner/bnr1.jpg')`}}>
          <div className="container">
            <div className="dez-bnr-inr-entry">
              <h1 className="text-white">Contact Us</h1>
           
              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li><a href="#">Home</a></li>
                  <li>Contact Us</li>
                </ul>
              </div>
          
            </div>
          </div>
        </div> */}

        <div className="section-full content-inner bg-white contact-style-1">
          <div className="container">
            <div className="row">

              <div className="col-lg-4 col-md-6 d-lg-flex d-md-flex">
                <div className="p-a30 border m-b30 contact-area border-1 align-self-stretch radius-sm">
                  <h4 className="m-b10">Quick Contact</h4>
                  <p>If you have any questions simply use the following contact details.</p>
                  <ul className="no-margin">
                    <li className="icon-bx-wraper left m-b30">
                      <div className="icon-bx-xs border-1"> <a href="#" className="icon-cell"><i className="ti-location-pin"></i></a> </div>
                      <div className="icon-content">
                        <h6 className="text-uppercase m-tb0 dez-tilte">Address:</h6>
                        <p>Colombo, Sri Lanka.</p>
                      </div>
                    </li>
                    <li className="icon-bx-wraper left  m-b30">
                      <div className="icon-bx-xs border-1"> <a href="#" className="icon-cell"><i className="ti-email"></i></a> </div>
                      <div className="icon-content">
                        <h6 className="text-uppercase m-tb0 dez-tilte">Email:</h6>
                        <p>flexjob@gmail.com</p>
                      </div>
                    </li>
                    <li className="icon-bx-wraper left">
                      <div className="icon-bx-xs border-1"> <a href="#" className="icon-cell"><i className="ti-mobile"></i></a> </div>
                      <div className="icon-content">
                        <h6 className="text-uppercase m-tb0 dez-tilte">PHONE</h6>
                        <p>+94 76 362 7342</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
       
              <div className="col-lg-4 col-md-6">
                <div className="p-a30 m-b30 radius-sm bg-gray clearfix">
                  <h4>Send Message Us</h4>
                  <div className="dzFormMsg"></div>
                  <form method="post" className="dzForm" action="http://job-board.w3itexperts.com/xhtml/script/contact.php">
                    <input type="hidden" value="Contact" name="dzToDo" />
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <div className="input-group">
                              <input name="dzName" type="text" required className="form-control" placeholder="Your Name"/>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <div className="input-group">
                              <input name="dzEmail" type="email" className="form-control" required placeholder="Your Email Id" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <div className="input-group">
                              <textarea name="dzMessage" rows="4" className="form-control" required placeholder="Your Message..."></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <div className="input-group">
                              <div className="g-recaptcha" data-sitekey="6LefsVUUAAAAADBPsLZzsNnETChealv6PYGzv3ZN" data-callback="verifyRecaptchaCallback" data-expired-callback="expiredRecaptchaCallback"></div>
                              <input className="form-control d-none" style={{display:'none'}} data-recaptcha="true" required data-error="Please complete the Captcha"/>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <button name="submit" type="submit" value="Submit" className="site-button "> <span>Submit</span> </button>
                        </div>
                      </div>
                  </form>
                </div>
              </div>
       
              <div className="col-lg-4 col-md-12 d-lg-flex m-b30">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.8151251542!2d79.8562055!3d6.92183865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1746121147236!5m2!1sen!2slk" className="align-self-stretch radius-sm" style={{border:'0', width:'100%', minHeight:'350px'}} allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
     
      </div>
    </div>
  )
}
