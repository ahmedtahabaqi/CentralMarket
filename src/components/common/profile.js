import React, { Component } from "react";
import Context from '../Context';
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Navb from './navb';
import Footer from './footer';
class Profile extends Component {

    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    return (
                        <div>
                            <Navb />
                            <div id='ImgUpProfileContiner'>
                                <img width={50} src={require('../../assets/img/prof.png')} alt='img' />
                            </div>
                            {ctx.value.Lang === 'en' ? (
                                <div id='profileContiner'>
                                    <Row style={{ margin: 0, paddingTop: 60 }}>
                                        <Col sm={12} md={6} >


                                            <div id='continerIMGAndContentProf'>
                                                <div id='ImgUpProfileContiner1'>
                                                    <img width={25} src={require('../../assets/img/user2.png')} alt='img' />
                                                </div>
                                                <div>{ctx.value.user.name}</div>
                                            </div>
                                            <div id='continerIMGAndContentProf'>
                                                <div id='ImgUpProfileContiner1'>
                                                    <img width={25} src={require('../../assets/img/call2.png')} alt='img' />
                                                </div>
                                                <div>{ctx.value.user.phone}</div>
                                            </div>
                                            <div id='continerIMGAndContentProf'>
                                                <div id='ImgUpProfileContiner1'>
                                                    <img width={25} src={require('../../assets/img/mail2.png')} alt='img' />
                                                </div>
                                                <div>{ctx.value.user.email}</div>
                                            </div>
                                        </Col>
                                        <Col sm={12} md={6}>

                                            <div id='btnProfContiner'>
                                                <Link to='/Favorite'>
                                                    <div id='btnProf'>Favorite</div>
                                                </Link>
                                                <Link to='/myads'>
                                                    <div id='btnProf'>My Ads</div>
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ) : (
                                    <div id='profileContinerAR'>
                                        <Row style={{ margin: 0, paddingTop: 60 }}>
                                            <Col sm={12} md={6} >


                                                <div id='continerIMGAndContentProf'>
                                                    <div id='ImgUpProfileContiner1'>
                                                        <img width={25} src={require('../../assets/img/user2.png')} alt='img' />
                                                    </div>
                                                    <div>{ctx.value.user.name}</div>
                                                </div>
                                                <div id='continerIMGAndContentProf'>
                                                    <div id='ImgUpProfileContiner1'>
                                                        <img width={25} src={require('../../assets/img/call2.png')} alt='img' />
                                                    </div>
                                                    <div>{ctx.value.user.phone}</div>
                                                </div>
                                                <div id='continerIMGAndContentProf'>
                                                    <div id='ImgUpProfileContiner1'>
                                                        <img width={25} src={require('../../assets/img/mail2.png')} alt='img' />
                                                    </div>
                                                    <div>{ctx.value.user.email}</div>
                                                </div>
                                            </Col>
                                            <Col sm={12} md={6}>
                                                <div id='btnProfContiner'>
                                                    <Link to='/Favorite'>
                                                        <div id='btnProf'>المفضلة</div>
                                                    </Link>
                                                    <Link to='/myads'>
                                                        <div id='btnProf'>اعلاناتي</div>
                                                    </Link>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                            <Footer />
                        </div>
                    )
                }
                }
            </Context.Consumer>
        );
    }
}
export default Profile;

