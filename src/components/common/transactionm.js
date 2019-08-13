import React, { Component } from "react";
import Context from '../Context';
import { Row, Col, Table } from "react-bootstrap";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import Navb from './navb';
import Footer from './footer';
import axios from 'axios';
// import Cookies from "universal-cookie";
import { Redirect } from 'react-router-dom';
import host from '../Host';
import Lottie from 'lottie-react-web'
import animation from '../../assets/img/blue_car.json'

// const cookies = new Cookies();
class Transactionm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moto: '',
            spin: true,
            redirectError: true,
        }
    }
    componentDidMount() {
        axios.get(host + `v1/motor/` + this.props.match.params.id, { headers: {} })
            .then(response => {
                console.log(response.data.data);
                this.setState({ moto: response.data.data, spin: false })
            })
            .catch((error) => {
                this.setState({ redirectError: false })
                console.log('error ' + error)
            })
    }
    Getimages() {
        var images = [ {
            original: host + this.state.moto.image + '.png',
            thumbnail: host + this.state.moto.image + '.png',
        },];
        const moto = this.state.moto.MotorImages
        for (let i = 0; i < moto.length; i++) {
            images.push(
                {
                    original: host + moto[i].image + '.png',
                    thumbnail: host + moto[i].image + '.png',
                },
            )

        }
        return images;
    }
    render() {
        const moto = this.state.moto

        return (
            <Context.Consumer>
                {ctx => {
                    if (!this.state.redirectError) {
                        return <Redirect to='/NotFound' />
                    }
                    if (this.state.spin === false) {

                        return (<Context.Consumer>
                            {ctx => {
                                return (
                                    <div>{ctx.value.Lang === 'en' ? (

                                        <div>
                                            <Navb />

                                            <Row style={{ margin: 50 }} className="justify-content-md-center">
                                                <Col md={8} >
                                                    <div id='continerimagegallarySlider'>
                                                        <ImageGallery showBullets={true} items={this.Getimages()} />

                                                    </div>

                                                </Col>
                                            </Row>
                                            <div id='titleCarPage'>
                                                <div>{moto.price} $</div>
                                                <div>{moto.title}</div>
                                                <div>{moto.miles} Mi</div>
                                            </div>
                                            <Row style={{ margin: 50 }}>
                                                <Col md={12} >
                                                    <div id='theadTable1Continer' >History & Condition</div>
                                                    <Table id='RowTable' striped bordered hover size="xs" variant="">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: '50%' }}></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr >
                                                                <td>Motorcycle name</td>
                                                                <td>{moto.name}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Motorcycle type</td>
                                                                <td>{moto.type}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Year</td>
                                                                <td>{moto.year}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Status</td>
                                                                <td>{moto.status}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Color</td>
                                                                <td>{moto.color}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Mileage</td>
                                                                <td>{moto.miles}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Price</td>
                                                                <td>{moto.price}</td>
                                                            </tr>
                                                        </tbody>

                                                    </Table>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: 50 }}>
                                                <Col md={12}>
                                                    <div id='theadTable1Continer1'>description</div>
                                                    <div id='descriptionCarContiner'>
                                                        {moto.description}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: 50 }}>
                                                <Col md={12}>
                                                    <div id='theadTable1Continer' >information</div>
                                                    <Table id='RowTable' striped bordered hover size="xs" variant="">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: '50%' }}></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr >
                                                                <td>Name</td>
                                                                <td>{moto.sell_name}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Phone</td>
                                                                <td>{moto.phone}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>State</td>
                                                                <td>{moto.location + ' / ' + moto.state}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Col>

                                            </Row>
                                            <Footer />

                                        </div>
                                    ) : (
                                            <div>
                                                <Navb />

                                                <Row style={{ margin: 50, direction: 'rtl' }} className="justify-content-md-center">
                                                    <Col md={8}>
                                                        <div id='continerimagegallarySliderAR'>
                                                            <ImageGallery showBullets={true} items={this.Getimages()} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div id='titleCarPage'>
                                                    <div>{moto.price} $</div>
                                                    <div>{moto.title}</div>
                                                    <div>{moto.miles} Mi</div>
                                                </div>
                                                <Row style={{ margin: 50, direction: 'rtl' }}>
                                                    <Col md={12}>
                                                        <div id='theadTable1Continer' >المعلومات الأساسية والحالة</div>
                                                        <Table id='RowTable' striped bordered hover size="xs" variant="">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: '50%' }}></th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id='RowTableAR'>
                                                                <tr >
                                                                    <td>اسم الدراجة</td>
                                                                    <td>{moto.name}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>نوع الدراجة</td>
                                                                    <td>{moto.type}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>سنة الصنع</td>
                                                                    <td>{moto.year}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>الحالة</td>
                                                                    <td>{moto.status}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>اللون</td>
                                                                    <td>{moto.color}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>المسافة المقطوعة</td>
                                                                    <td>{moto.miles}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>السعر</td>
                                                                    <td>{moto.price}</td>
                                                                </tr>

                                                            </tbody>

                                                        </Table>
                                                    </Col>
                                                </Row>

                                                <Row style={{ margin: 50, direction: 'rtl' }}>

                                                    <Col md={12}>
                                                        <div id='theadTable1Continer1'>التفاصيل</div>
                                                        <div id='descriptionCarContinerAR'>
                                                            {moto.description}
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row style={{ margin: 50, direction: 'rtl' }}>
                                                    <Col md={12}>
                                                        <div id='theadTable1Continer' >معلومات</div>
                                                        <Table id='RowTable' striped bordered hover size="xs" variant="">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: '50%' }}></th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id='RowTableAR'>
                                                                <tr >
                                                                    <td>الاسم</td>
                                                                    <td>{moto.sell_name}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>رقم الهاتف</td>
                                                                    <td>{moto.phone}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>الموقع</td>
                                                                    <td>{moto.location + ' / ' + moto.state}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Col>
                                                </Row>

                                                <Footer />
                                            </div>

                                        )}
                                    </div>
                                )
                            }
                            }
                        </Context.Consumer>
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
                }</Context.Consumer>
        )
    }
}

export default Transactionm;


