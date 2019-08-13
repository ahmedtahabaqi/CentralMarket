import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Category from '../common/category';
import FilterGall from '../common/filterGall';
import { Link, Redirect } from 'react-router-dom';
import Navb from '../common/navb';
import Footer from '../common/footer';
import axios from 'axios';
import host from '../Host';
import Lottie from 'lottie-react-web'
import animation from '../../assets/img/blue_car.json'


class GallFilterShow extends Component {
    constructor() {
        super();
        this.state = {
            gallery: [],
            spin: true,
            redirectError: true,
        }

    }
    componentDidMount() {


        axios.get(host + `v1/stores`, { headers: {} })
            .then(response => {
                // console.log(response.data.data);
                if (response.status === 200) {

                    this.setState({
                        gallery: response.data.data.reverse(), spin: false
                    })
                }
            })
            .catch((error) => {
                this.setState({ redirectError: false })
                console.log('error ' + error)
            })
    }
    filter() {
        const urlParams = new URLSearchParams(window.location.search);
        const Cityinput = urlParams.get('Cityinput');
        var arr = [];
        var gall = this.state.gallery;
        console.log(Cityinput);

        for (let i = 0; i < gall.length; i++) {
            if (gall[i].location === Cityinput) {
                arr.push(
                    <Col key={gall[i].id} sm={12} md={6} xl={4} >
                        <div id='mainContinerGallery'>
                            <Link to={'/gallerycontent/' + gall[i].id}>
                                <div id='carGalleryCardContiner'>
                                    <img src={host + gall[i].image + '.png'} id="imgcar1" alt='img' />
                                    <div id='namegallearyCardopacity' />
                                    <div id='namegallearyCard'>
                                        <span >{gall[i].name}</span>
                                    </div>
                                    <div id="NumberCardGallaryContiner">
                                        <img width={35} src={require('../../assets/img/call.png')} alt='img' />
                                        <div className='locationCardTitle2'>{gall[i].phone}</div>
                                    </div>
                                    <div id="NumberCardGallaryContiner">
                                        <img width={25} style={{ marginLeft: 25 }} src={require('../../assets/img/location.png')} alt='img' />
                                        <div className='locationCardTitle2'>{gall[i].location + ' / ' + gall[i].state}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Col>
                )
            }

        }
        return arr;
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
                    <FilterGall />
                    <div id='marginup'>
                        
                        <Row style={{ margin: 0 }} >
                            {this.filter()}
                        </Row>
                    </div>
                    <Footer />
                </div>

            )
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
export default GallFilterShow;

