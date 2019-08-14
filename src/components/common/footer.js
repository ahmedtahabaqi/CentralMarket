import React, { Component } from "react";
import Context from '../Context';
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
class footer extends Component {

  render() {
    return (
      <Context.Consumer>
        {ctx => {
          return (
            <div>{ctx.value.Lang === 'en' ? (
              <div id="footer" >

                <Row style={{ marginRight: 0 }} >
                  <Col md={12} lg={3}>
                    <div id='footerContiner1'>
                      <img width={150} src={require('../../assets/img/logo.png')} alt='img' />
                      <div style={{ marginTop: 20 }}>© Central Market For Cars 2019</div>
                    </div>

                  </Col >
                  <Col md={12} lg={3}>
                    <div id='SochilAndContactContiner'>
                      <div id='footerContiner23'>
                        <Link to='/aboutus'>
                          <div>About Us</div>
                        </Link>
                        <Link to='/contactUs'>
                          <div>Contact Us</div>
                        </Link>
                      </div>

                    </div>
                  </Col>
                  <Col md={12} lg={3}>
                    <div id='footerContiner2'>
                      <div id='footerContiner2_1'>Download Central Market app</div>
                      <div id='footerContiner2_2'>
                        <img id='storyImage' src={require('../../assets/img/playstore.png')} alt='img'
                          onClick={() => window.open('https://play.google.com/store/apps/details?id=com.mustafayusef.sharay')} />
                        <img id='storyImage' src={require('../../assets/img/itunes.svg')} alt='img'
                          onClick={() => window.open('https://apps.apple.com/us/app/%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2%D9%8A/id1476141012')} />
                      </div>
                    </div>
                  </Col>
                  <Col md={12} lg={3}>
                    <div id='footerContiner3'>
                      <div id='sochilContiner'>
                        <div>
                          <img id='storyImagesocil' src={require('../../assets/img/facebook.png')} alt='img'
                            onClick={() => window.open('https://www.facebook.com/central.cars.iq')} />
                          <img id='storyImagesocil' src={require('../../assets/img/instagram.png')} alt='img'
                            onClick={() => window.open('https://www.instagram.com/central.iq/')} />
                          <img id='storyImagesocil' src={require('../../assets/img/twitter.png')} alt='img'
                            onClick={() => window.open('https://twitter.com/IqCentral')} />
                        </div>

                      </div>
                    </div>
                  </Col>
                </Row>

              </div>
            ) : (
                <div id="footerAR" >

                  <Row style={{ marginRight: 0 }} >
                    <Col md={12} lg={3}>
                      <div id='footerContiner1'>
                        <img width={150} src={require('../../assets/img/logo.png')} alt='img' />
                        <div style={{ marginTop: 20 }}> ©السوق المركزي للسيارات  2019</div>
                      </div>

                    </Col >
                    <Col md={12} lg={3}>
                      <div id='SochilAndContactContiner'>
                        <div id='footerContiner23'>
                          <Link to='/aboutus'>
                            <div>عن الشركة</div>
                          </Link>
                          <Link to='/contactUs'>
                            <div>تواصل معنا</div>
                          </Link>
                        </div>

                      </div>
                    </Col>
                    <Col md={12} lg={3}>
                      <div id='footerContiner2'>
                        <div id='footerContiner2_1'>حمل تطبيق السوق المركزي</div>
                        <div id='footerContiner2_2'>
                          <img id='storyImage' src={require('../../assets/img/playstore.png')} alt='img'
                            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.mustafayusef.sharay')} />
                          <img id='storyImage' src={require('../../assets/img/itunes.svg')} alt='img'
                            onClick={() => window.open('https://apps.apple.com/us/app/%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2%D9%8A/id1476141012')} />
                        </div>
                      </div>
                    </Col>
                    <Col md={12} lg={3}>
                      <div id='footerContiner3'>
                        <div id='sochilContiner'>
                          <div>
                            <img id='storyImagesocil' src={require('../../assets/img/facebook.png')} alt='img'
                              onClick={() => window.open('https://www.facebook.com/central.cars.iq')} />
                            <img id='storyImagesocil' src={require('../../assets/img/instagram.png')} alt='img'
                              onClick={() => window.open('https://www.instagram.com/central.iq/')} />
                            <img id='storyImagesocil' src={require('../../assets/img/twitter.png')} alt='img'
                              onClick={() => window.open('https://twitter.com/IqCentral')} />
                          </div>

                        </div>
                      </div>
                    </Col>
                  </Row>

                </div>
              )}
            </div>
          )
        }
        }
      </Context.Consumer>
    );
  }
}
export default footer;

