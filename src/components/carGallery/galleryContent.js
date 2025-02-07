import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import { Tooltip, Icon } from 'evergreen-ui';
import Navb from '../common/navb';
import Footer from '../common/footer';
import axios from 'axios';
import host from '../Host';
import Lottie from 'lottie-react-web'
import animation from '../../assets/img/blue_car.json'

class GalleryContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            car: [],
            info: [],
            spin: true,
            redirectError: true,
        }
    }
    componentDidMount() {
        axios.get(host + `v1/store/` + this.props.match.params.id, { headers: {} })
            .then(response => {
                // console.log(response.data.data);
                this.setState({
                    car: response.data.data.Cars,
                    info: response.data.data,
                    spin: false
                })
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
                    <div id='galleryContentHeader'>
                        <img src={host + this.state.info.image + '.png'} id='galleryContentHeaderImg' alt='img' />
                    </div>
                    <div id='titleContinerGallaopacity' />
                    <div id='titleContinerGalla'>
                        <div>{this.state.info.phone}</div>
                        <div>{this.state.info.name}</div>
                        <div>{this.state.info.location + ' / ' + this.state.info.state}</div>
                    </div>
                    <Row style={{ margin: 0, padding: 0 }}>
                        {this.state.car.map(car =>
                            <Col key={car.id} sm={12} md={6} xl={4} >
                                <div id='firstCardContiner'>
                                    <div id='MainCardContiner'>
                                        <div id='priceCardContiner'>
                                            <span>{car.price}</span>
                                            <img width={14} style={{ marginLeft: 10 }} src={require('../../assets/img/dolir.png')} alt='img' />
                                        </div>
                                        <div id='opacityPrice' />
                                        <Link to={'/transaction/' + car.id}>
                                            <div id='carCardContiner'>
                                                <img width={375} height={234} src={host + car.image + '.png'} alt='img' />
                                            </div>
                                        </Link>
                                        <div id='carCardContiner1' />
                                        <div id='carCardContiner2'>
                                            <div>
                                                <img width={30} src={require('../../assets/img/carBlackCard.png')} alt='img' />
                                                <span style={{ marginLeft: 10 }}>{car.mileage}</span>
                                            </div>
                                            <div>
                                                <img width={20} src={require('../../assets/img/history.png')} alt='img' />
                                                <span style={{ marginLeft: 10 }}>{car.year}</span>
                                            </div>
                                        </div>
                                        <div id='carCardContiner3'>
                                            <div>
                                                <Tooltip content={car.phone}>
                                                    <Icon icon="phone" color="success" size={20} marginLeft={10} />
                                                </Tooltip>
                                            </div>
                                            <Link to={'/transaction/' + car.id}>
                                                <div style={{ cursor: 'pointer', color: '#000' }}>
                                                    <span>{car.title}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                        )}

                    </Row>

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
export default GalleryContent;

