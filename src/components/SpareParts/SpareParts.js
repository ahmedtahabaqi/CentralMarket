import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Category from '../common/category';
import { Redirect } from 'react-router-dom';
import Navb from '../common/navb';
import Footer from '../common/footer';
import axios from 'axios';
// import Cookies from "universal-cookie";
import host from '../Host';
import Lottie from 'lottie-react-web'
import animation from '../../assets/img/blue_car.json'

// const cookies = new Cookies();

class SpareParts extends Component {
    constructor() {
        super();
        this.state = {
            parts: [],
            spin: true,
            redirectError: true,
        }
    }
    componentDidMount() {
        axios.get(host + `v1/parts`, { headers: {} })
            .then(response => {
                // console.log(response.data.data);
                this.setState({ parts: response.data.data.reverse(), spin: false })
            })
            .catch((error) => {
                this.setState({ redirectError: false })
                console.log('error ' + error)

            })

    }

    render() {
        if (!this.state.redirectError) {
            return <Redirect to='/NotFound' />
        }
        if (!this.state.spin) {
            return (
                <div>

                    <Navb />
                    <Category />
                    <div id='marginup'>
                        <Row style={{ marginRight: 0 }}>
                            {this.state.parts.map((part) =>
                                <Col key={part.id} sm={12} md={6} lg={4} >
                                    <div id='MaincardspairContiner'>
                                        <div className="flip-card">
                                            <div className="flip-card-inner">
                                                <div className="flip-card-front">

                                                    <div id='cardspairContiner'>
                                                        <div id='CarspairImgContiner'>
                                                            <img src={host + part.image + '.png'} id='CarspairImg' alt='img' />
                                                        </div>
                                                        <div id='opacitySpareParttitle' />
                                                        <div id='SpareParttitle'> {part.name} </div>
                                                        <div id='contentCardspairs'>
                                                            <div id='contentCardspairs1'>
                                                                <img width={30} src={require('../../assets/img/location.png')} alt='img' />
                                                                <div id='locationCardTitle1spair'>{part.location + ' / ' + part.state}</div>
                                                            </div>
                                                            <div id='contentCardspairs1'>
                                                                <img width={25} src={require('../../assets/img/call2.png')} alt='img' />
                                                                <div id='locationCardTitle2spair'>{part.phone}</div>
                                                            </div>
                                                            <div id='contentCardspairs1'>
                                                                <img width={25} src={require('../../assets/img/parts.png')} alt='img' />
                                                                <div id='locationCardTitle2spair'>{part.detailes}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flip-card-back">

                                                    <p>{part.description}</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                            )}
                        </Row>
                    </div>
                    <Footer />
                </div>

            );
        }
        else {
            return (
                <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Lottie
                        options={{
                            animationData: animation
                        }}
                    />
                </div>
            )
        }
    }
}
export default SpareParts;

