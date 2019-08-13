import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Context from '../Context';
import Category from './category'
import { Link } from 'react-router-dom';
import { Tooltip, Icon } from 'evergreen-ui';
import Navb from './navb';
import Footer from './footer';
import axios from 'axios';
import Cookies from "universal-cookie";
import host from '../Host';

const cookies = new Cookies();
class Favorite extends Component {
    constructor() {
        super();
        this.state = {
            car: [],
            spin: true,
        }
    }
    componentDidMount() {
        var header = { "Content-Type": "application/json", token: cookies.get("token") };
        axios.get(host + `v1/favorite/get?`, { headers: header })
            .then(response => {
                // console.log(response.data);
                this.setState({ car: response.data.reverse(), spin: false })
            })
            .catch((error) => { console.log('error ' + error) })
    }
    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    if (ctx.value.spin === false) {
                        return (
                            <div>
                                <Navb />
                                <Category />
                                <div id='marginup'>
                                    <Row style={{ margin: 0, padding: 0 }}>
                                        {this.state.car.map((ca, i) =>
                                            <Col key={i} sm={12} md={6} xl={4} >
                                                <div id='firstCardContiner'>
                                                    <div id='MainCardContiner'>
                                                        <div id='priceCardContiner'>
                                                            <span>{ca.Car.price}</span>
                                                            <img width={14} style={{ marginLeft: 10 }} src={require('../../assets/img/dolir.png')} alt='img' />
                                                        </div>
                                                        <div id='opacityPrice' />
                                                        <Link to={'/transaction/' + ca.Car.id}>
                                                            <div id='carCardContiner'>
                                                                <img width={375} height={234} src={host + ca.Car.image + '.png'} alt='img' />
                                                            </div>
                                                        </Link>
                                                        <div id='carCardContiner1' />
                                                        <div id='carCardContiner2'>
                                                            <div>
                                                                <img width={30} src={require('../../assets/img/carBlackCard.png')} alt='img' />
                                                                <span style={{ marginLeft: 10 }}>{ca.Car.mileage} Mi</span>
                                                            </div>
                                                            <div>
                                                                <img width={20} src={require('../../assets/img/history.png')} alt='img' />
                                                                <span style={{ marginLeft: 10 }}>{ca.Car.year}</span>
                                                            </div>
                                                        </div>
                                                        <div id='carCardContiner3'>
                                                            <div>
                                                                <Tooltip content={ca.Car.phone}>
                                                                    <Icon icon="phone" color="success" size={20} marginLeft={10} />
                                                                </Tooltip>
                                                            </div>
                                                            <Link to={'/transaction/' + ca.Car.id}>
                                                                <div style={{ cursor: 'pointer', color: '#000' }}>
                                                                    <span>{ca.Car.title}</span>
                                                                </div>
                                                            </Link>
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
                                <img src={require('../../assets/img/spin.gif')} alt='gif' />
                            </div>
                        )
                    }
                }
                }
            </Context.Consumer>
        )
    }
}

export default Favorite;

