import React from "react";
import { Row, Col } from "react-bootstrap";
import Context from '../Context';
import Category from '../common/category'
// import Slider from '../common/slider';
import Filter from '../common/filter';
import { Link, Redirect } from 'react-router-dom';
import { Tooltip, Icon } from 'evergreen-ui';
import Navb from '../common/navb';
import Footer from '../common/footer';
import axios from 'axios';
import host from '../Host';
import Lottie from 'lottie-react-web'
import animation from '../../assets/img/blue_car.json'

class CarFilter extends React.Component {
    constructor() {
        super();
        this.state = {
            car1: [],
            spin: true,
            redirectError: true,
        }
    }
    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const TypeCarSelect = urlParams.get('TypeCarSelect');
        const ModleCarSelect = urlParams.get('ModleCarSelect');
        const ImportingSelect = urlParams.get('ImportingSelect');
        const YearSelect = urlParams.get('YearSelect');
        const MillSelect = urlParams.get('MillSelect');
        const Cityinput = urlParams.get('Cityinput');
        const MinpriceCar = urlParams.get('MinpriceCar');
        const MaxpriceCar = urlParams.get('MaxpriceCar');

        let formData = new FormData();
        var headers = { "Content-Type": "application/json" };
        if (TypeCarSelect) { formData.append("brand", TypeCarSelect); }
        if (ModleCarSelect) { formData.append("class", ModleCarSelect); }
        if (YearSelect) { formData.append("year", YearSelect); }
        if (ImportingSelect) { formData.append("warid", ImportingSelect); }
        if (MillSelect) { formData.append("mileage", MillSelect); }
        if (Cityinput) { formData.append("location", Cityinput); }
        if (MinpriceCar && MaxpriceCar) {
            formData.append("priceMin", MinpriceCar);
            formData.append("priceMax", MaxpriceCar);
        }
        axios({ url: host + "v1/cars/filter?", method: "POST", data: formData, headers: headers })
            .then(response => {
                this.setState({ car1: response.data.data.reverse(), spin: false })
                // console.log(response.data.data);

            })
            .catch(function (error) {
                this.setState({ redirectError: false })
                console.log(error.response)
            })
    }
    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    if (!this.state.redirectError) {
                        return <Redirect to='/NotFound' />
                    }
                    if (this.state.spin === false) {

                        return (
                            <div>

                                <Navb />
                                <Category />
                                <Filter />
                                <div id='marginup'>
                                    {this.state.car1.length === 0 ? (
                                        ctx.value.Lang === 'en' ? (<div id='NoResultFound'>No Result Found</div>) : (
                                            <div id='NoResultFound'>لاتوجد نتائج بحث مطابقة</div>
                                        )
                                    ) : (
                                            <Row style={{ margin: 0, padding: 0 }}>
                                                {this.state.car1.map((ca, i) =>
                                                    <Col key={i} sm={12} md={6} xl={4} >
                                                        <div id='firstCardContiner'>
                                                            <div id='MainCardContiner'>
                                                                <div id='priceCardContiner'>
                                                                    <span>{ca.price}</span>
                                                                    <img width={14} style={{ marginLeft: 10 }} src={require('../../assets/img/dolir.png')} alt='img' />
                                                                </div>
                                                                <div id='opacityPrice' />
                                                                <Link to={'/transaction/' + ca.id}>
                                                                    <div id='carCardContiner'>
                                                                        <img width={375} height={234} src={host + ca.image + '.png'} alt='img' />
                                                                    </div>
                                                                </Link>
                                                                <div id='carCardContiner1' />
                                                                <div id='carCardContiner2'>
                                                                    <div>
                                                                        <img width={30} src={require('../../assets/img/carBlackCard.png')} alt='img' />
                                                                        <span style={{ marginLeft: 10 }}>{ca.mileage} Mi</span>
                                                                    </div>
                                                                    <div>
                                                                        <img width={20} src={require('../../assets/img/history.png')} alt='img' />
                                                                        <span style={{ marginLeft: 10 }}>{ca.year}</span>
                                                                    </div>
                                                                </div>
                                                                <div id='carCardContiner3'>
                                                                    <div>
                                                                        <Tooltip content={ca.phone}>
                                                                            <Icon icon="phone" color="success" size={20} marginLeft={10} />
                                                                        </Tooltip>

                                                                    </div>
                                                                    <Link to={'/transaction/' + ca.id}>
                                                                        <div style={{ cursor: 'pointer', color: '#000' }}>
                                                                            <span>{ca.title}</span>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                )}
                                            </Row>
                                        )}
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
            </Context.Consumer>
        )
    }
}

export default CarFilter;

