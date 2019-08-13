import React, { Component } from "react";
import Context from '../Context';
import { Row, Col, Table } from "react-bootstrap";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import Navb from './navb';
import { Redirect } from 'react-router-dom';
import Footer from './footer';
import axios from 'axios';
import Stars from '@material-ui/icons/Stars';
import host from '../Host';
import Lottie from 'lottie-react-web'
import animation from '../../assets/img/blue_car.json'
import Cookies from "universal-cookie";

const cookies = new Cookies();
class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            car: '',
            spin: true,
            redirectError: true,
            mainImage: '',
            favorite: [],
            colorFav: '#999999',
            FavCheck: null,
            carId: this.props.match.params.id,
            iddel: '',
        }
    }
    componentDidMount() {
        axios.get(host + `v1/car/` + this.props.match.params.id, { headers: {} })
            .then(response => {
                // console.log(response.data.data[0]);
                this.setState({
                    car: response.data.data[0],

                    spin: false
                })
            })
            .catch((error) => {
                this.setState({ redirectError: false })
                console.log('error ' + error)
            })
        var header = { "Content-Type": "application/json", token: cookies.get("token") };
        axios.get(host + `v1/favorite/get?`, { headers: header })
            .then(response => {
                // console.log(response.data);
                for (let i = 0; i < response.data.length; i++) {
                    if (Number(this.props.match.params.id) === response.data[i].carId) {
                        this.setState({ FavCheck: true, colorFav: '#E4BE6D', iddel: response.data[i].id })
                    }
                    else {
                        this.setState({ FavCheck: false, colorFav: '#999999' })
                    }
                }
                this.setState({
                    favorite: response.data
                })
            })
            .catch((error) => {
                this.setState({ redirectError: false })
                console.log('error ' + error)
            })
    }
    AddFavor() {
        var header = { "Content-Type": "application/json", token: cookies.get("token") };
        let formData = new FormData();
        if (!this.state.FavCheck) {


            formData.append("id", this.state.carId);
            formData.append("type", 1);

            axios({ url: host + "v1/favorite?", method: "POST", data: formData, headers: header })
                .then(response => {
                    if (response.status === 200) {
                        console.log('ok');
                        this.setState({ FavCheck: true, colorFav: '#E4BE6D' })
                        this.componentDidMount();
                    }
                })
                .catch(function (error) {
                    console.log(error.response)

                });
        } else {
            formData.append("id", this.state.iddel);
            console.log(this.state.iddel);
            axios.delete(host + `v1/favorite/delete`, { data: formData, headers: header })
                .then(response => {
                    if (response.status === 200) {

                        this.setState({ FavCheck: false, colorFav: '#999999' })
                        this.componentDidMount();
                        console.log('delete');
                    }
                })
                .catch(function (error) {

                    console.log(error.response.data.errMsg)
                })
        }

    }

    Getimages() {
        const car = this.state.car.CarImages
        var images = [{
            original: host + this.state.car.image + '.png',
            thumbnail: host + this.state.car.image + '.png',
        },];

        for (let i = 0; i < car.length; i++) {
            images.push(
                {
                    original: host + car[i].image + '.png',
                    thumbnail: host + car[i].image + '.png',
                },
            )

        }
        return images;
    }
    render() {

        const car = this.state.car

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
                                                <div id='FavCardContiner'>
                                                    <div>{car.price} $</div>
                                                    <div >
                                                        <Stars id="star"
                                                            style={{ color: this.state.colorFav, cursor: 'pointer', width: 40, height: 40 }}
                                                            onClick={() => {
                                                                this.AddFavor()
                                                            }} />
                                                    </div>
                                                </div>
                                                <div>{car.title}</div>
                                                <div>{car.mileage} Mi</div>
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
                                                                <td>Brand</td>
                                                                <td>{car.brand}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Class</td>
                                                                <td>{car.class}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>color</td>
                                                                <td>{car.color}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Status</td>
                                                                <td>{car.status}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Importing</td>
                                                                <td>{car.warid}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Mileage</td>
                                                                <td>{car.mileage}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: 50 }}>
                                                <Col md={12}>
                                                    <div id='theadTable1Continer' >PERFORMANCE</div>
                                                    <Table id='RowTable' striped bordered hover size="xs" variant="">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: '50%' }}></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr >
                                                                <td>Gear</td>
                                                                <td>{car.gear}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Cylinders</td>
                                                                <td>{car.cylinders}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Fuel type</td>
                                                                <td>{car.fuel}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Wheel Drive System</td>
                                                                <td>{car.driveSystem}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: 50 }}>
                                                <Col md={12}>
                                                    <div id='theadTable1Continer' >INTERIOR</div>
                                                    <Table id='RowTable' striped bordered hover size="xs" variant="">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: '50%' }}></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr >
                                                                <td>Roof</td>
                                                                <td>{car.roof}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Seats Type</td>
                                                                <td>{car.type}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: 50 }}>

                                                <Col md={12}>
                                                    <div id='theadTable1Continer1'>description</div>
                                                    <div id='descriptionCarContiner'>
                                                        {car.description}
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
                                                                <td>Phone</td>
                                                                <td>{car.phone}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>State</td>
                                                                <td>{car.location + ' / ' + car.state}</td>
                                                            </tr>
                                                            <tr >
                                                                <td>Ad Date</td>
                                                                <td>{car.date}</td>
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
                                                    <div>{car.price} $</div>
                                                    <div>{car.title}</div>
                                                    <div>{car.mileage} Mi</div>
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
                                                                    <td>نوع السيارة</td>
                                                                    <td>{car.brand}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>موديل السيارة</td>
                                                                    <td>{car.class}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>اللون الخارجي</td>
                                                                    <td>{car.color}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>سنة الصنع</td>
                                                                    <td>{car.year}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>الحالة</td>
                                                                    <td>{car.status}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>مصدر السيارة</td>
                                                                    <td>{car.warid}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>عدد الكيلوميترات</td>
                                                                    <td>{car.mileage}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Col>
                                                </Row>
                                                <Row style={{ margin: 50, direction: 'rtl' }}>
                                                    <Col md={12} >
                                                        <div id='theadTable1Continer' >المحرك</div>
                                                        <Table id='RowTable' striped bordered hover size="xs" variant="">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: '50%' }}></th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id='RowTableAR'>
                                                                <tr >
                                                                    <td>نوع ناقل السرعة</td>
                                                                    <td>{car.gear}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>عدد السلندرات</td>
                                                                    <td>{car.cylinders}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>نوع الوقود</td>
                                                                    <td>{car.fuel}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>نظام الدفع</td>
                                                                    <td>{car.driveSystem}</td>
                                                                </tr>

                                                            </tbody>
                                                        </Table>
                                                    </Col>
                                                </Row>
                                                <Row style={{ margin: 50, direction: 'rtl' }}>
                                                    <Col md={12} >
                                                        <div id='theadTable1Continer' >الداخل</div>
                                                        <Table id='RowTable' striped bordered hover size="xs" variant="">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: '50%' }}></th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id='RowTableAR'>
                                                                <tr >
                                                                    <td>السقف</td>
                                                                    <td>{car.roof}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>نوع الفرش</td>
                                                                    <td>{car.type}</td>
                                                                </tr>

                                                            </tbody>
                                                        </Table>
                                                    </Col>
                                                </Row>
                                                <Row style={{ margin: 50, direction: 'rtl' }}>

                                                    <Col md={12}>
                                                        <div id='theadTable1Continer1'>التفاصيل</div>
                                                        <div id='descriptionCarContinerAR'>
                                                            {car.description}
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
                                                                    <td>رقم الهاتف</td>
                                                                    <td>{car.phone}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>المحافظة</td>
                                                                    <td>{car.location + ' / ' + car.state}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td>تاريخ الاعلان</td>
                                                                    <td>{car.date}</td>
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

export default Transaction;

