import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Category from '../common/category';
import { Redirect } from 'react-router-dom';
import Navb from '../common/navb';
import Footer from '../common/footer';
import axios from 'axios';
import host from '../Host';
import Lottie from 'lottie-react-web'
import animation from '../../assets/img/blue_car.json'

class Carnumber extends Component {
    constructor() {
        super();
        this.state = {
            Numbers: [],
            spin: true,
            redirectError:true,
        }
    }
    componentDidMount() {
        axios.get(host + `v1/numbers`, { headers: {} })
            .then(response => {
                // console.log(response.data);
                if (response.status === 200) {
                    this.setState({
                        Numbers: response.data.data.reverse(),
                        spin: false
                    })
                }
            })
            .catch((error) => { 
                this.setState({ redirectError: false  })
                console.log('error ' + error)
             })

    }
    render() {
        if (!this.state.redirectError)
        {
          return <Redirect to='/NotFound' />
        }
        if (this.state.spin === false) {
            return (
                <div>
                    <Navb />
                    <Category />
                    <div id='marginup'>
                    <Row style={{ marginRight: 0 }}>
                        {this.state.Numbers.map((num,i) =>
                        <Col key={i} sm={12} md={6} lg={4} xl={3}>
                            <div id='MaincardNumberContiner'>
                                <div id='cardNumberContiner'>
                                    <div id='priceCarNumber'>
                                        <span>{num.price}</span>
                                        <img width={14} style={{ marginLeft: 10 }} src={require('../../assets/img/dolir.png')} alt='img' />
                                    </div>
                                    <div id='priceCarNumberOpacity' />
                                    <div id='CarNumberImgContiner'>
                                        <img src={host + num.image+'.png'} id='CarNumberImg' alt='img' />
                                    </div>
                                    <div id='contentCardNumbers'>
                                        <div id='contentCardNumbers1'>
                                            <img width={30} src={require('../../assets/img/location.png')} alt='img' />
                                            <div > {num.location}</div>
                                        </div>
                                        <div id='contentCardNumbers1'>
                                            <img width={25} src={require('../../assets/img/call2.png')} alt='img' />
                                            <div >{num.phone}</div>
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
export default Carnumber;

