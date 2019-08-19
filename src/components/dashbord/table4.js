import React from 'react';
import Context from '../Context';
import Component from "@reactions/component";
import { Dialog, Pane, Table, FilePicker } from 'evergreen-ui';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { Row, Col, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import host from '../Host';
import Select from 'react-select';
import Car from '../common/cars.json';
import State from '../common/state.json';
import Cookies from "universal-cookie";

const cookies = new Cookies();
var header = { "Content-Type": "application/json", token: cookies.get("token") };
const brand = Car;
const city = State;
class Table4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainTitleinput: '', TypeCarSelect: '', ModleCarSelect: '', StateSelect: '', YearSelect: '', ImportingSelect: '', MillSelect: '', priceCar: '',
            gearSelect: '', cylenderSelect: '', oilSelect: '', WheelDriveSelect: '', RoofSelect: '', TypeSetsSelect: '', numSets: '',
            windoSelect: '', AirBag: '', Color: '', description: '', NameUser: '', PhoneInput: '', Cityinput: '', City1input: '', gallerySelect: '',
            imgCar1: [], imgCar2: [], imgCar3: [], imgCar4: [], imgCar5: [], imgCar6: [], imgCar7: [], imgCar8: [], imgCar9: [], imgCar10: [], imgCar11: [], imgCar12: [],
            imgCar2Length: '', imgCar3Length: '', imgCar4Length: '', imgCar5Length: '', imgCar6Length: '', imgCar7Length: '', imgCar8Length: '', imgCar9Length: '', imgCar10Length: '', imgCar11Length: '', imgCar12Length: '',
            cars: [], gallery: [], test: true, idCarToIMG: '',
        }
    }
    componentDidMount() {
        axios.get(host + `v1/cars/rent?`, { headers: header })
            .then(response => {
                // console.log(response.data);
                if (response.status === 200) {
                    this.setState({
                        cars: response.data.data.reverse(),
                    })
                }
            })
            .catch((error) => { console.log('error ' + error) })

        axios.get(host + `v1/stores`, { headers: header })
            .then(response => {
                // console.log(response.data);
                if (response.status === 200) {
                    this.setState({
                        gallery: response.data.data.reverse(),
                    })
                }
            })
            .catch((error) => { console.log('error ' + error) })

    }
    AddCar(userId) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        let formData = new FormData();

        formData.append("title", this.state.mainTitleinput);
        formData.append("brand", this.state.TypeCarSelect);
        formData.append("class", this.state.ModleCarSelect);
        formData.append("status", this.state.StateSelect);
        formData.append("year", this.state.YearSelect);
        formData.append("warid", this.state.ImportingSelect);
        formData.append("mileage", this.state.MillSelect);
        formData.append("price", this.state.priceCar);
        formData.append("gear", this.state.gearSelect);
        formData.append("cylinders", this.state.cylenderSelect);
        formData.append("fuel", this.state.oilSelect);
        formData.append("driveSystem", this.state.WheelDriveSelect);
        formData.append("roof", this.state.RoofSelect);
        formData.append("seats", "numSets");
        formData.append("type", this.state.TypeSetsSelect);
        formData.append("window", "windoSelect");
        formData.append("airBags", "AirBag");
        formData.append("color", this.state.color);
        formData.append("description", this.state.description);
        formData.append("name", "NameUser");
        formData.append("phone", this.state.PhoneInput);
        formData.append("location", this.state.Cityinput);
        formData.append("state", this.state.City1input);
        formData.append("date", `${today}`);
        formData.append("userId", userId);
        formData.append("storeId", this.state.gallerySelect);
        formData.append("active", 'true');
        formData.append("isRent", 'true');
        formData.append("isImported", 'false');
        formData.append("image", this.state.imgCar1[0]);

        axios({ url: host + "dash/v1/car/add", method: "POST", data: formData, headers: header })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data.data.id);
                    this.setState({ idCarToIMG: response.data.data.id, test: false })

                    toast('تمت الاضافة بنجاح', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    this.componentDidMount();
                }
            })
            .catch(function (error) {
                toast(error.response.data.errMsg, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                console.log(error.response.data.errMsg)

            });
    }
    AddImageToCar(id) {
        var { imgCar2, imgCar3, imgCar4, imgCar5, imgCar6, imgCar7, imgCar8, imgCar9, imgCar10, imgCar11, imgCar12 } = this.state
        var { imgCar2Length, imgCar3Length, imgCar4Length, imgCar5Length, imgCar6Length, imgCar7Length, imgCar8Length, imgCar9Length, imgCar10Length, imgCar11Length, imgCar12Length } = this.state
        let formData = new FormData();
        formData.append("id", id);
        if (imgCar2Length > 0) { formData.append('image0', imgCar2[0]); }
        if (imgCar3Length > 0) { formData.append('image1', imgCar3[0]); }
        if (imgCar4Length > 0) { formData.append('image2', imgCar4[0]); }
        if (imgCar5Length > 0) { formData.append('image3', imgCar5[0]); }
        if (imgCar6Length > 0) { formData.append('image4', imgCar6[0]); }
        if (imgCar7Length > 0) { formData.append('image5', imgCar7[0]); }
        if (imgCar8Length > 0) { formData.append('image6', imgCar8[0]); }
        if (imgCar9Length > 0) { formData.append('image7', imgCar9[0]); }
        if (imgCar10Length > 0) { formData.append('image8', imgCar10[0]); }
        if (imgCar11Length > 0) { formData.append('image9', imgCar11[0]); }
        if (imgCar12Length > 0) { formData.append('image10', imgCar12[0]); }


        axios({ url: host + "dash/v1/car/image", method: "POST", data: formData, headers: header })
            .then(response => {
                if (response.status === 200) {
                    console.log('ok');

                    toast('تمت الاضافة بنجاح', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    this.componentDidMount();
                }
            })
            .catch(function (error) {
                toast(error.response.data.errMsg, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                console.log(error.response.data.errMsg)

            });
    }

    getCarById(id) {
        axios.get(host + `v1/car/${id}`, { headers: header })
            .then(response => {
                // console.log(response.data);
                if (response.status === 200) {
                    // console.log(response.data.data);

                    this.setState({
                        mainTitleinput: response.data.data[0].title,
                        TypeCarSelect: response.data.data[0].brand,
                        ModleCarSelect: response.data.data[0].class,
                        StateSelect: response.data.data[0].status,
                        YearSelect: response.data.data[0].year,
                        ImportingSelect: response.data.data[0].warid,
                        MillSelect: response.data.data[0].mileage,
                        priceCar: response.data.data[0].price,
                        gearSelect: response.data.data[0].gear,
                        cylenderSelect: response.data.data[0].cylinders,
                        oilSelect: response.data.data[0].fuel,
                        WheelDriveSelect: response.data.data[0].driveSystem,
                        RoofSelect: response.data.data[0].roof,
                        numSets: response.data.data[0].seats,
                        TypeSetsSelect: response.data.data[0].type,
                        windoSelect: response.data.data[0].window,
                        AirBag: response.data.data[0].airBags,
                        color: response.data.data[0].color,

                        description: response.data.data[0].description,
                        NameUser: response.data.data[0].name,
                        PhoneInput: response.data.data[0].phone,
                        Cityinput: response.data.data[0].location,
                        City1input: response.data.data[0].state,
                        gallerySelect: response.data.data[0].storeId,

                    })
                }
            })
            .catch((error) => { console.log('error ' + error) })
    }
    deleteCar(id) {
        let formData = new FormData();

        formData.append("id", id);

        axios.delete(host + "dash/v1/car/delete", { data: formData, headers: header })
            .then(response => {

                if (response.status === 200) {
                    toast('تم الحذف بنجاح', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    this.componentDidMount();
                }
            })
            .catch(function (error) {
                toast(error.response.data.errMsg, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                console.log(error.response.data.errMsg)

            });

    }
    EditCar(id, userId) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        let formData = new FormData();
        formData.append("id", id);
        formData.append("title", this.state.mainTitleinput);
        formData.append("brand", this.state.TypeCarSelect);
        formData.append("class", this.state.ModleCarSelect);
        formData.append("status", this.state.StateSelect);
        formData.append("year", this.state.YearSelect);
        formData.append("warid", this.state.ImportingSelect);
        formData.append("mileage", this.state.MillSelect);
        formData.append("price", this.state.priceCar);
        formData.append("gear", this.state.gearSelect);
        formData.append("cylinders", this.state.cylenderSelect);
        formData.append("fuel", this.state.oilSelect);
        formData.append("driveSystem", this.state.WheelDriveSelect);
        formData.append("roof", this.state.RoofSelect);
        formData.append("seats", "numSets");
        formData.append("type", this.state.TypeSetsSelect);
        formData.append("window", "windoSelect");
        formData.append("airBags", "AirBag");
        formData.append("color", this.state.color);
        formData.append("description", this.state.description);
        formData.append("name", "NameUser");
        formData.append("phone", this.state.PhoneInput);
        formData.append("location", this.state.Cityinput);
        formData.append("state", this.state.City1input);
        formData.append("date", `${today}`);
        formData.append("userId", userId);
        formData.append("storeId", this.state.gallerySelect);
        formData.append("active", 'true');

        if (this.state.imgCar1.length > 0) {
            formData.append("image", this.state.imgCar1[0]);
        }
        axios({ url: host + "dash/v1/car/edit", method: "PUT", data: formData, headers: header })
            .then(response => {
                if (response.status === 200) {
                    console.log(response);

                    toast('تم التعديل بنجاح', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    this.componentDidMount();
                }
            })
            .catch(function (error) {
                toast(error.response.data.errMsg, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                console.log(error.response.data.errMsg)

            });
    }
    brandFun() {
        var arr = [{ value: 'نوع السيارة', label: 'نوع السيارة' }];
        for (let i = 0; i < brand.length; i++) {
            arr.push(
                { value: brand[i].name, label: brand[i].name }
            )
        }
        return arr
    }
    classFun() {
        var TypeCarSelect = this.state.TypeCarSelect
        var arr = [{ value: 'موديل السيارة', label: 'موديل السيارة' }];
        for (let i = 0; i < brand.length; i++) {
            if (brand[i].name === TypeCarSelect) {
                for (let j = 0; j < brand[i].data.length; j++) {
                    arr.push(
                        { value: brand[i].data[j], label: brand[i].data[j] }
                    )

                }
            }

        }
        return arr
    }
    CityFun() {
        var arr = [{ value: 'المحافظة', label: 'المحافظة' }];
        for (let i = 0; i < city.length; i++) {
            arr.push(
                { value: city[i].name, label: city[i].name }
            )
        }
        return arr
    }
    City1Fun() {
        var Cityinput = this.state.Cityinput
        var arr = [{ value: 'المنطقة', label: 'المنطقة' }];
        for (let i = 0; i < city.length; i++) {
            if (city[i].name === Cityinput) {
                for (let j = 0; j < city[i].data.length; j++) {
                    arr.push(
                        { value: city[i].data[j], label: city[i].data[j] }
                    )

                }
            }

        }
        return arr
    }
    YEAR() {
        var year = new Date().getFullYear();
        var arr = [{ value: "سنة الصنع ", label: "سنة الصنع " }];
        for (let i = year + 1; i > 1939; i--) {
            arr.push(
                { value: i, label: i }
            )
        }
        return arr;
    }
    render() {
        if (!this.state.test) {
            this.AddImageToCar(this.state.idCarToIMG)
            this.setState({ test: true })
        }
        return (
            <Context.Consumer>
                {ctx => {
                    return (
                        <div>
                            <div id='titleTable'>
                                <Component initialState={{ isShown: false }}>
                                    {({ state, setState }) => (
                                        <Pane>
                                            <Dialog
                                                isShown={state.isShown}
                                                title=" اضافة سيارة للايجار"
                                                onCloseComplete={() => setState({ isShown: false })}
                                                confirmLabel="اضافة"
                                                cancelLabel='الغاء'
                                                onConfirm={() => {
                                                    this.AddCar(ctx.value.user.id)
                                                    setState({ isShown: false })
                                                }}
                                            >
                                                <div style={{ direction: 'rtl' }}>
                                                    <div id='labelUpInputCarDas'>العنوان الرئيسي</div>

                                                    <Row>
                                                        <Col md={12}>
                                                            <input autoComplete='off' autoFocus={true} type='text' placeholder='العنوان' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ mainTitleinput: e.target.value })} />
                                                        </Col>
                                                    </Row>

                                                    <div id='labelUpInputCarDas'>المعلومات الاساسية</div>

                                                    <Row>
                                                        <Col md={12} lg={6}>
                                                            <div id='InputTExtDash'>
                                                                <Select
                                                                    onChange={(e) => {
                                                                        if (e.value !== 'نوع السيارة') {
                                                                            this.setState({ TypeCarSelect: e.value })
                                                                            console.log(e.value);
                                                                        }
                                                                    }}
                                                                    defaultValue={this.brandFun()[0]}
                                                                    options={this.brandFun()}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col md={12} lg={6}>
                                                            <div id='InputTExtDash'>
                                                                <Select
                                                                    onChange={(e) => {
                                                                        if (e.value !== 'موديل السيارة') {
                                                                            this.setState({ ModleCarSelect: e.value })
                                                                        }
                                                                    }}
                                                                    defaultValue={this.classFun()[0]}
                                                                    options={this.classFun()}
                                                                />
                                                            </div>

                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md={12} lg={6}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ Color: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="Select"> اللون الخارجي</option>

                                                                    <option value='ابيض' >ابيض</option>
                                                                    <option value='حليبي' >حليبي</option>
                                                                    <option value='سلفر' >سلفر</option>
                                                                    <option value='نيلي' >نيلي</option>
                                                                    <option value='سمائي' >سمائي</option>
                                                                    <option value='ازرق' >ازرق</option>
                                                                    <option value='احمر' >احمر</option>
                                                                    <option value='ماروني' >ماروني</option>
                                                                    <option value='برتقالي' >برتقالي</option>
                                                                    <option value='اصفر' >اصفر</option>
                                                                    <option value='اخضر' >اخضر</option>
                                                                    <option value='جوزي' >جوزي</option>
                                                                    <option value='فيلي' >فيلي</option>
                                                                    <option value='اسود' >اسود</option>
                                                                    <option value='بنفسجي' >بنفسجي</option>
                                                                    <option value='وردي' >وردي</option>


                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12} lg={6}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ StateSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="Select">الحالة</option>

                                                                    <option value='جديد' >جديد</option>
                                                                    <option value='جديد قطعة صبغ' >جديد قطعة صبغ</option>
                                                                    <option value='جديد قطعتان صبغ' >جديد قطعتان صبغ</option>
                                                                    <option value='جديد 3 قطع صبغ' >جديد 3 قطع صبغ</option>
                                                                    <option value='جديد 4 قطع صبغ' >جديد 4 قطع صبغ</option>
                                                                    <option value='مستعمل' >مستعمل</option>
                                                                    <option value='مستعمل قطعة صبغ' >مستعمل قطعة صبغ</option>
                                                                    <option value='مستعمل قطعتان صبغ' >مستعمل قطعتان صبغ</option>
                                                                    <option value='مستعمل 3 قطع صبغ' >مستعمل 3 قطع صبغ</option>
                                                                    <option value='مستعمل 4 قطع صبغ' >مستعمل 4 قطع صبغ</option>
                                                                    <option value='مستعمل 5 قطع صبغ' >مستعمل 5 قطع صبغ</option>
                                                                    <option value='مستعمل صبغ عام' >مستعمل صبغ عام</option>
                                                                    <option value='غرقان' >غرقان</option>
                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md={12} lg={6}>
                                                        <div id='InputTExtDash'>
                                                                <Select
                                                                    onChange={(e) => {
                                                                        if (e.value !== "سنة الصنع ") {
                                                                            this.setState({ YearSelect: e.value })
                                                                        }
                                                                    }}
                                                                    defaultValue={this.YEAR()[0]}
                                                                    options={this.YEAR()}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col md={12} lg={6}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ ImportingSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="Select">مصدر السيارة</option>

                                                                    <option value='امريكي' >امريكي</option>
                                                                    <option value='خليجي' >خليجي</option>
                                                                    <option value='كندي' >كندي</option>
                                                                    <option value='كوري' >كوري</option>
                                                                    <option value='اوربي' >اوربي</option>
                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md={12} lg={6}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ MillSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="Select">المسافة المقطوعة</option>

                                                                    <option value='0' > 0 ميل</option>
                                                                    <option value='10000' >  اقل من 10000 ميل</option>
                                                                    <option value='20000' >  اقل من 20000 ميل</option>
                                                                    <option value='30000' >  اقل من 30000 ميل</option>
                                                                    <option value='40000' >  اقل من 40000 ميل</option>
                                                                    <option value='50000' >  اقل من 50000 ميل</option>
                                                                    <option value='60000' >  اقل من 60000 ميل</option>
                                                                    <option value='70000' >  اقل من 70000 ميل</option>
                                                                    <option value='80000' >  اقل من 80000 ميل</option>
                                                                    <option value='90000' >  اقل من 90000 ميل</option>
                                                                    <option value='100000' >  اقل من 100000 ميل</option>
                                                                    <option value='150000' >  اقل من 150000 ميل</option>
                                                                    <option value='200000' >  اقل من 200000 ميل</option>
                                                                    <option value='300000' >  اقل من 300000 ميل</option>
                                                                    <option value='400000' >  اقل من 400000 ميل</option>
                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12} lg={6}>
                                                            <input autoComplete='off' type='number' placeholder='السعر' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ priceCar: e.target.value })} />
                                                        </Col>
                                                    </Row>

                                                    <div id='labelUpInputCarDas'>المحرك</div>

                                                    <Row>
                                                        <Col md={12} lg={6}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ gearSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="Select">نوع ناقل السرعة</option>

                                                                    <option value='اوتماتيك' >اوتماتيك</option>
                                                                    <option value='أوتو تيبترونك' >أوتو تيبترونك</option>
                                                                    <option value='اوتوماتيك سبورت' >اوتوماتيك سبورت</option>
                                                                    <option value='اوتوماتيك 8 سرعات' >اوتوماتيك 8 سرعات</option>
                                                                    <option value='F1 اوتوماتيك' >اوتوماتيك F1</option>
                                                                    <option value='يدوي' >يدوي</option>
                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12} lg={6}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ cylenderSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="Select">عدد السلندرات</option>

                                                                    <option value='1 ' >1 </option>
                                                                    <option value='2 ' >2 </option>
                                                                    <option value='3 ' >3 </option>
                                                                    <option value='4 ' >4 </option>
                                                                    <option value='5 ' >5 </option>
                                                                    <option value='6 ' >6 </option>
                                                                    <option value='8 ' >8 </option>
                                                                    <option value='10 ' >10 </option>
                                                                    <option value='12 ' >12 </option>

                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>

                                                    </Row>

                                                    <Row>


                                                        <Col md={12} lg={6}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ oilSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="Select">نوع الوقود	</option>

                                                                    <option value='بانزين' >بانزين</option>
                                                                    <option value='كاز' >كاز</option>
                                                                    <option value='غاز' >غاز</option>
                                                                    <option value='كهرباء' >كهرباء</option>
                                                                    <option value='بانزين + غاز' >بانزين + غاز</option>

                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>

                                                        <Col md={12} lg={6}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ WheelDriveSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="Select">نظام الدفع</option>

                                                                    <option value='امامي' >امامي</option>
                                                                    <option value='خلفي' >خلفي</option>
                                                                    <option value='رباعية الدفع' >رباعية الدفع</option>

                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <div id='labelUpInputCarDas'>الداخل</div>

                                                    <Row>
                                                        <Col md={12} lg={6}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ RoofSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="Select">السقف</option>

                                                                    <option value='لايوجد فتحة' >لايوجد فتحة</option>
                                                                    <option value='يوجد فتحة' >يوجد فتحة</option>


                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12} lg={6}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ TypeSetsSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="Select">نوع الفرش</option>

                                                                    <option value='جلد' >جلد</option>
                                                                    <option value='قماش' >قماش</option>

                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>

                                                    </Row>

                                                    <div id='labelUpInputCarDas'>التفاصيل</div>

                                                    <Row>

                                                        <Col md={12} >
                                                            <textarea placeholder='التفاصيل' id='InputTExtDashArea'
                                                                onChange={(e) => this.setState({ description: e.target.value })} />

                                                        </Col>
                                                    </Row>

                                                    <div id='labelUpInputCarDas'>معلومات</div>

                                                    <Row>

                                                        <Col md={12}>
                                                            <input autoComplete='off' type='text' placeholder='رقم الهاتف' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ PhoneInput: e.target.value })} />
                                                        </Col>
                                                        <Col md={12}>
                                                            <div id='InputTExtDash'>
                                                                <Select
                                                                    onChange={(e) => {
                                                                        if (e.value !== 'المحافظة') {
                                                                            this.setState({ Cityinput: e.value })
                                                                            console.log(e.value);
                                                                        }
                                                                    }}
                                                                    defaultValue={this.CityFun()[0]}
                                                                    options={this.CityFun()}
                                                                />
                                                            </div>

                                                        </Col>
                                                        <Col md={12}>
                                                            <div id='InputTExtDash'>
                                                                <Select
                                                                    onChange={(e) => {
                                                                        if (e.value !== 'المنطقة') {
                                                                            this.setState({ City1input: e.value })
                                                                            console.log(e.value);
                                                                        }
                                                                    }}
                                                                    defaultValue={this.City1Fun()[0]}
                                                                    options={this.City1Fun()}
                                                                />
                                                            </div>

                                                        </Col>
                                                        <Col md={12}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ gallerySelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="Select">اضافة الى معرض</option>
                                                                    <option value='0' >لايوجد</option>

                                                                    {this.state.gallery.map(gall =>
                                                                        <option key={gall.id} value={gall.id}>{gall.name}</option>
                                                                    )}

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <div id='labelUpInputCarDas'>الصور</div>

                                                    <Row>
                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar1: img }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar2: img, imgCar2Length: img.length }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar3: img, imgCar3Length: img.length }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar4: img, imgCar4Length: img.length }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar5: img, imgCar5Length: img.length }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar6: img, imgCar6Length: img.length }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar7: img, imgCar7Length: img.length }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar8: img, imgCar8Length: img.length }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar9: img, imgCar9Length: img.length }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar10: img, imgCar10Length: img.length }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar11: img, imgCar11Length: img.length }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar12: img, imgCar12Length: img.length }) }} />
                                                        </Col>

                                                    </Row>

                                                </div>

                                            </Dialog>
                                            <div id='BTNADDNEWCARDASH' onClick={() => setState({ isShown: true })}
                                            >اضافة سيارة</div>

                                        </Pane>
                                    )}
                                </Component>
                                <span> سيارات للايجار </span>
                            </div>
                            <Table style={{ textAlign: "right", fontSize: 25 }}>
                                <Table.Head>
                                    <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                        <span id='tabledashboardText1'>حذف</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                        <span id='tabledashboardText1'>تعديل</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell >
                                        <span id='tabledashboardText1'>تاريخ الاعلان</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell flexBasis={150} flexShrink={0} flexGrow={0}>
                                        <span id='tabledashboardText1'>رقم الهاتف</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell flexBasis={100} flexShrink={0} flexGrow={0}>
                                        <span id='tabledashboardText1'>السعر</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell flexBasis={100} flexShrink={0} flexGrow={0}>
                                        <span id='tabledashboardText1'>سنة الصنع</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell flexBasis={120} flexShrink={0} flexGrow={0}>
                                        <span id='tabledashboardText1'>موديل السيارة</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell flexBasis={120} flexShrink={0} flexGrow={0}>
                                        <span id='tabledashboardText1'>نوع السيارة</span>
                                    </Table.TextHeaderCell>
                                </Table.Head>
                                <Table.Body minHeight={340}>
                                    {this.state.cars.map(car =>
                                        <Table.Row key={car.id} >
                                            <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                                <Component initialState={{ isShown: false }}>
                                                    {({ state, setState }) => (
                                                        <Pane>
                                                            <Dialog
                                                                isShown={state.isShown}
                                                                title="حذف سيارة "
                                                                intent="danger"
                                                                onCloseComplete={() => setState({ isShown: false })}
                                                                confirmLabel="حذف"
                                                                cancelLabel="الغاء"
                                                                onConfirm={() => {
                                                                    this.deleteCar(car.id)
                                                                    setState({ isShown: false })
                                                                }}
                                                            >
                                                                <span id='msgDelete'> هل انت متأكد من عملية الحذف</span>
                                                            </Dialog>
                                                            <Delete style={{ color: '#E4BE6D', cursor: 'pointer' }} onClick={() => setState({ isShown: true })} />
                                                        </Pane>
                                                    )}
                                                </Component>
                                            </Table.TextCell>
                                            <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                                <Component initialState={{ isShown: false }}>
                                                    {({ state, setState }) => (
                                                        <Pane>
                                                            <Dialog
                                                                isShown={state.isShown}
                                                                title="تعديل سيارة"
                                                                onCloseComplete={() => setState({ isShown: false })}
                                                                confirmLabel="حفظ"
                                                                cancelLabel="الغاء"
                                                                onConfirm={() => {
                                                                    setState({ isShown: false })
                                                                    this.AddImageToCar(car.id)
                                                                    this.EditCar(car.id, ctx.value.user.id)

                                                                }}
                                                            >
                                                                <div style={{ direction: 'rtl' }}>
                                                                    <div id='labelUpInputCarDas'>العنوان الرئيسي</div>
                                                                    <Row>
                                                                        <Col md={12}>
                                                                            <input autoComplete='off' autoFocus={true} value={this.state.mainTitleinput} type='text' placeholder='العنوان' id='InputTExtDash1'
                                                                                onChange={(e) => this.setState({ mainTitleinput: e.target.value })} />
                                                                        </Col>
                                                                    </Row>

                                                                    <div id='labelUpInputCarDas'>المعلومات الاساسية</div>

                                                                    <Row>
                                                                        <Col md={12} lg={6}>
                                                                            <div id='InputTExtDash'>
                                                                                <Select
                                                                                    onChange={(e) => {
                                                                                        if (e.value !== 'Brand') {
                                                                                            this.setState({ TypeCarSelect: e.value })
                                                                                            console.log(e.value);


                                                                                        }
                                                                                    }}
                                                                                    defaultValue={this.state.TypeCarSelect}
                                                                                    options={this.brandFun()}
                                                                                />
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={12} lg={6}>
                                                                            <div id='InputTExtDash'>
                                                                                <Select

                                                                                    onChange={(e) => {
                                                                                        if (e.value !== 'Class') {
                                                                                            this.setState({ ModleCarSelect: e.value })
                                                                                        }
                                                                                    }}
                                                                                    defaultValue={this.state.ModleCarSelect}
                                                                                    options={this.classFun()}
                                                                                />
                                                                            </div>

                                                                        </Col>
                                                                    </Row>

                                                                    <Row>
                                                                        <Col md={12} lg={6}>
                                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                                <Form.Control as="select" id='InputTExtDash'
                                                                                    onChange={(even) => {
                                                                                        if (even.target.value !== 'Select') {
                                                                                            this.setState({ color: even.target.value })
                                                                                        }
                                                                                    }}>
                                                                                    <option value={this.state.Color}> اللون الخارجي</option>

                                                                                    <option value='ابيض' >ابيض</option>
                                                                                    <option value='حليبي' >حليبي</option>
                                                                                    <option value='سلفر' >سلفر</option>
                                                                                    <option value='نيلي' >نيلي</option>
                                                                                    <option value='سمائي' >سمائي</option>
                                                                                    <option value='ازرق' >ازرق</option>
                                                                                    <option value='احمر' >احمر</option>
                                                                                    <option value='ماروني' >ماروني</option>
                                                                                    <option value='برتقالي' >برتقالي</option>
                                                                                    <option value='اصفر' >اصفر</option>
                                                                                    <option value='اخضر' >اخضر</option>
                                                                                    <option value='جوزي' >جوزي</option>
                                                                                    <option value='فيلي' >فيلي</option>
                                                                                    <option value='اسود' >اسود</option>
                                                                                    <option value='بنفسجي' >بنفسجي</option>
                                                                                    <option value='وردي' >وردي</option>


                                                                                </Form.Control>

                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col md={12} lg={6}>
                                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                                <Form.Control as="select" id='InputTExtDash'
                                                                                    onChange={(even) => {
                                                                                        if (even.target.value !== 'Select') {
                                                                                            this.setState({ StateSelect: even.target.value })
                                                                                        }
                                                                                    }}>
                                                                                    <option value={this.state.StateSelect}>الحالة</option>

                                                                                    <option value='جديد' >جديد</option>
                                                                                    <option value='جديد قطعة صبغ' >جديد قطعة صبغ</option>
                                                                                    <option value='جديد قطعتان صبغ' >جديد قطعتان صبغ</option>
                                                                                    <option value='جديد 3 قطع صبغ' >جديد 3 قطع صبغ</option>
                                                                                    <option value='جديد 4 قطع صبغ' >جديد 4 قطع صبغ</option>
                                                                                    <option value='مستعمل' >مستعمل</option>
                                                                                    <option value='مستعمل قطعة صبغ' >مستعمل قطعة صبغ</option>
                                                                                    <option value='مستعمل قطعتان صبغ' >مستعمل قطعتان صبغ</option>
                                                                                    <option value='مستعمل 3 قطع صبغ' >مستعمل 3 قطع صبغ</option>
                                                                                    <option value='مستعمل 4 قطع صبغ' >مستعمل 4 قطع صبغ</option>
                                                                                    <option value='مستعمل 5 قطع صبغ' >مستعمل 5 قطع صبغ</option>
                                                                                    <option value='مستعمل صبغ عام' >مستعمل صبغ عام</option>
                                                                                    <option value='غرقان' >غرقان</option>
                                                                                </Form.Control>

                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>

                                                                    <Row>
                                                                        <Col md={12} lg={6}>
                                                                        <div id='InputTExtDash'>
                                                                                <Select
                                                                                    onChange={(e) => {
                                                                                        if (e.value !== "سنة الصنع ") {
                                                                                            this.setState({ YearSelect: e.value })
                                                                                        }
                                                                                    }}
                                                                                    defaultValue={this.state.YearSelect}
                                                                                    options={this.YEAR()}
                                                                                />
                                                                            </div>
                                                                       
                                                                        </Col>
                                                                        <Col md={12} lg={6}>
                                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                                <Form.Control as="select" id='InputTExtDash'
                                                                                    onChange={(even) => {
                                                                                        if (even.target.value !== 'Select') {
                                                                                            this.setState({ ImportingSelect: even.target.value })
                                                                                        }
                                                                                    }}>
                                                                                    <option value={this.state.ImportingSelect}>مصدر السيارة</option>

                                                                                    <option value='امريكي' >امريكي</option>
                                                                                    <option value='خليجي' >خليجي</option>
                                                                                    <option value='كندي' >كندي</option>
                                                                                    <option value='كوري' >كوري</option>
                                                                                    <option value='اوربي' >اوربي</option>
                                                                                </Form.Control>

                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>

                                                                    <Row>
                                                                        <Col md={12} lg={6}>
                                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                                <Form.Control as="select" id='InputTExtDash'
                                                                                    onChange={(even) => {
                                                                                        if (even.target.value !== 'Select') {
                                                                                            this.setState({ MillSelect: even.target.value })
                                                                                        }
                                                                                    }}>
                                                                                    <option value={this.state.MillSelect}>المسافة المقطوعة</option>

                                                                                    <option value='0' > 0 ميل</option>
                                                                                    <option value='10000' >  اقل من 10000 ميل</option>
                                                                                    <option value='20000' >  اقل من 20000 ميل</option>
                                                                                    <option value='30000' >  اقل من 30000 ميل</option>
                                                                                    <option value='40000' >  اقل من 40000 ميل</option>
                                                                                    <option value='50000' >  اقل من 50000 ميل</option>
                                                                                    <option value='60000' >  اقل من 60000 ميل</option>
                                                                                    <option value='70000' >  اقل من 70000 ميل</option>
                                                                                    <option value='80000' >  اقل من 80000 ميل</option>
                                                                                    <option value='90000' >  اقل من 90000 ميل</option>
                                                                                    <option value='100000' >  اقل من 100000 ميل</option>
                                                                                    <option value='150000' >  اقل من 150000 ميل</option>
                                                                                    <option value='200000' >  اقل من 200000 ميل</option>
                                                                                    <option value='300000' >  اقل من 300000 ميل</option>
                                                                                    <option value='400000' >  اقل من 400000 ميل</option>
                                                                                </Form.Control>

                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col md={12} lg={6}>
                                                                            <input autoComplete='off' value={this.state.priceCar} type='number' placeholder='السعر' id='InputTExtDash1'
                                                                                onChange={(e) => this.setState({ priceCar: e.target.value })} />
                                                                        </Col>
                                                                    </Row>

                                                                    <div id='labelUpInputCarDas'>المحرك</div>

                                                                    <Row>
                                                                        <Col md={12} lg={6}>
                                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                                <Form.Control as="select" id='InputTExtDash'
                                                                                    onChange={(even) => {
                                                                                        if (even.target.value !== 'Select') {
                                                                                            this.setState({ gearSelect: even.target.value })
                                                                                        }
                                                                                    }}>
                                                                                    <option value={this.state.gearSelect}>نوع ناقل السرعة</option>

                                                                                    <option value='اوتماتيك' >اوتماتيك</option>
                                                                                    <option value='أوتو تيبترونك' >أوتو تيبترونك</option>
                                                                                    <option value='اوتوماتيك سبورت' >اوتوماتيك سبورت</option>
                                                                                    <option value='اوتوماتيك 8 سرعات' >اوتوماتيك 8 سرعات</option>
                                                                                    <option value='F1 اوتوماتيك' >اوتوماتيك F1</option>
                                                                                    <option value='يدوي' >يدوي</option>
                                                                                </Form.Control>

                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col md={12} lg={6}>
                                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                                <Form.Control as="select" id='InputTExtDash'
                                                                                    onChange={(even) => {
                                                                                        if (even.target.value !== 'Select') {
                                                                                            this.setState({ cylenderSelect: even.target.value })
                                                                                        }
                                                                                    }}>
                                                                                    <option value={this.state.cylenderSelect}>عدد السلندرات</option>

                                                                                    <option value='1 ' >1 </option>
                                                                                    <option value='2 ' >2 </option>
                                                                                    <option value='3 ' >3 </option>
                                                                                    <option value='4 ' >4 </option>
                                                                                    <option value='5 ' >5 </option>
                                                                                    <option value='6 ' >6 </option>
                                                                                    <option value='8 ' >8 </option>
                                                                                    <option value='10 ' >10 </option>
                                                                                    <option value='12 ' >12 </option>

                                                                                </Form.Control>

                                                                            </Form.Group>
                                                                        </Col>

                                                                    </Row>

                                                                    <Row>


                                                                        <Col md={12} lg={6}>
                                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                                <Form.Control as="select" id='InputTExtDash'
                                                                                    onChange={(even) => {
                                                                                        if (even.target.value !== 'Select') {
                                                                                            this.setState({ oilSelect: even.target.value })
                                                                                        }
                                                                                    }}>
                                                                                    <option value={this.state.oilSelect}>نوع الوقود	</option>

                                                                                    <option value='بانزين' >بانزين</option>
                                                                                    <option value='كاز' >كاز</option>
                                                                                    <option value='غاز' >غاز</option>
                                                                                    <option value='كهرباء' >كهرباء</option>
                                                                                    <option value='بانزين + غاز' >بانزين + غاز</option>

                                                                                </Form.Control>

                                                                            </Form.Group>
                                                                        </Col>

                                                                        <Col md={12} lg={6}>
                                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                                <Form.Control as="select" id='InputTExtDash'
                                                                                    onChange={(even) => {
                                                                                        if (even.target.value !== 'Select') {
                                                                                            this.setState({ WheelDriveSelect: even.target.value })
                                                                                        }
                                                                                    }}>
                                                                                    <option value={this.state.WheelDriveSelect}>نظام الدفع</option>

                                                                                    <option value='امامي' >امامي</option>
                                                                                    <option value='خلفي' >خلفي</option>
                                                                                    <option value='رباعية الدفع' >رباعية الدفع</option>

                                                                                </Form.Control>

                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>

                                                                    <div id='labelUpInputCarDas'>الداخل</div>

                                                                    <Row>
                                                                        <Col md={12} lg={6}>
                                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                                <Form.Control as="select" id='InputTExtDash'
                                                                                    onChange={(even) => {
                                                                                        if (even.target.value !== 'Select') {
                                                                                            this.setState({ RoofSelect: even.target.value })
                                                                                        }
                                                                                    }}>
                                                                                    <option value={this.state.RoofSelect} >السقف</option>

                                                                                    <option value='لايوجد فتحة' >لايوجد فتحة</option>
                                                                                    <option value='يوجد فتحة' >يوجد فتحة</option>


                                                                                </Form.Control>

                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col md={12} lg={6}>
                                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                                <Form.Control as="select" id='InputTExtDash'
                                                                                    onChange={(even) => {
                                                                                        if (even.target.value !== 'Select') {
                                                                                            this.setState({ TypeSetsSelect: even.target.value })
                                                                                        }
                                                                                    }}>
                                                                                    <option value={this.state.TypeSetsSelect} >نوع الفرش</option>

                                                                                    <option value='جلد' >جلد</option>
                                                                                    <option value='قماش' >قماش</option>

                                                                                </Form.Control>

                                                                            </Form.Group>
                                                                        </Col>

                                                                    </Row>

                                                                    <div id='labelUpInputCarDas'>التفاصيل</div>

                                                                    <Row>

                                                                        <Col md={12} >
                                                                            <textarea value={this.state.description} placeholder='التفاصيل' id='InputTExtDashArea'
                                                                                onChange={(e) => this.setState({ description: e.target.value })} />

                                                                        </Col>
                                                                    </Row>

                                                                    <div id='labelUpInputCarDas'>معلومات</div>

                                                                    <Row>
                                                                        <Col md={12}>
                                                                            <input autoComplete='off' type='text' value={this.state.PhoneInput} placeholder='رقم الهاتف' id='InputTExtDash1'
                                                                                onChange={(e) => this.setState({ PhoneInput: e.target.value })} />
                                                                        </Col>
                                                                        <Col md={12}>
                                                                            <div id='InputTExtDash'>
                                                                                <Select
                                                                                    onChange={(e) => {
                                                                                        if (e.value !== 'المحافظة') {
                                                                                            this.setState({ Cityinput: e.value })
                                                                                            console.log(e.value);
                                                                                        }
                                                                                    }}
                                                                                    defaultValue={this.state.Cityinput}
                                                                                    options={this.CityFun()}
                                                                                />
                                                                            </div>

                                                                        </Col>
                                                                        <Col md={12}>
                                                                            <div id='InputTExtDash'>
                                                                                <Select
                                                                                    onChange={(e) => {
                                                                                        if (e.value !== 'المنطقة') {
                                                                                            this.setState({ City1input: e.value })
                                                                                            console.log(e.value);
                                                                                        }
                                                                                    }}
                                                                                    defaultValue={this.state.City1input}
                                                                                    options={this.City1Fun()}
                                                                                />
                                                                            </div>

                                                                        </Col>
                                                                        <Col md={12}>
                                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                                <Form.Control as="select" id='InputTExtDash'
                                                                                    onChange={(even) => {
                                                                                        if (even.target.value !== 'Select') {
                                                                                            this.setState({ gallerySelect: even.target.value })
                                                                                        }
                                                                                    }}>
                                                                                    <option value={this.state.gallerySelect}>اضافة الى معرض</option>
                                                                                    <option value='0' >لايوجد</option>

                                                                                    {this.state.gallery.map(gall =>
                                                                                        <option key={gall.id} value={gall.id}>{gall.name}</option>
                                                                                    )}

                                                                                </Form.Control>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>

                                                                    <div id='labelUpInputCarDas'>الصور</div>
                                                                    <Row>
                                                                        <Col md={12}>
                                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                                onChange={(img) => { this.setState({ imgCar1: img }) }} />
                                                                        </Col>

                                                                        <Col md={12}>
                                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                                onChange={(img) => { this.setState({ imgCar2: img, imgCar2Length: img.length }) }} />
                                                                        </Col>

                                                                        <Col md={12}>
                                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                                onChange={(img) => { this.setState({ imgCar3: img, imgCar3Length: img.length }) }} />
                                                                        </Col>

                                                                        <Col md={12}>
                                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                                onChange={(img) => { this.setState({ imgCar4: img, imgCar4Length: img.length }) }} />
                                                                        </Col>

                                                                        <Col md={12}>
                                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                                onChange={(img) => { this.setState({ imgCar5: img, imgCar5Length: img.length }) }} />
                                                                        </Col>

                                                                        <Col md={12}>
                                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                                onChange={(img) => { this.setState({ imgCar6: img, imgCar6Length: img.length }) }} />
                                                                        </Col>

                                                                        <Col md={12}>
                                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                                onChange={(img) => { this.setState({ imgCar7: img, imgCar7Length: img.length }) }} />
                                                                        </Col>

                                                                        <Col md={12}>
                                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                                onChange={(img) => { this.setState({ imgCar8: img, imgCar8Length: img.length }) }} />
                                                                        </Col>

                                                                        <Col md={12}>
                                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                                onChange={(img) => { this.setState({ imgCar9: img, imgCar9Length: img.length }) }} />
                                                                        </Col>

                                                                        <Col md={12}>
                                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                                onChange={(img) => { this.setState({ imgCar10: img, imgCar10Length: img.length }) }} />
                                                                        </Col>

                                                                        <Col md={12}>
                                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                                onChange={(img) => { this.setState({ imgCar11: img, imgCar11Length: img.length }) }} />
                                                                        </Col>

                                                                        <Col md={12}>
                                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                                onChange={(img) => { this.setState({ imgCar12: img, imgCar12Length: img.length }) }} />
                                                                        </Col>

                                                                    </Row>

                                                                </div>

                                                            </Dialog>
                                                            <Edit style={{ color: '#0A3D62', cursor: 'pointer' }} onClick={() => {
                                                                this.getCarById(car.id)
                                                                setState({ isShown: true })
                                                            }} />
                                                        </Pane>
                                                    )}
                                                </Component>

                                            </Table.TextCell>
                                            <Table.TextCell ><span id='tabledashboardText'>{car.date}</span></Table.TextCell>
                                            <Table.TextCell flexBasis={150} flexShrink={0} flexGrow={0}><span id='tabledashboardText'>{car.phone}</span></Table.TextCell>
                                            <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}><span id='tabledashboardText'>{car.price} $</span></Table.TextCell>
                                            <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}><span id='tabledashboardText'>{car.year}</span></Table.TextCell>
                                            <Table.TextCell flexBasis={120} flexShrink={0} flexGrow={0}><span id='tabledashboardText'>{car.class}</span></Table.TextCell>
                                            <Table.TextCell flexBasis={120} flexShrink={0} flexGrow={0}><span id='tabledashboardText'>{car.brand}</span></Table.TextCell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>

                            <ToastContainer
                                position="bottom-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnVisibilityChange
                                draggable
                                pauseOnHover
                            />
                        </div>
                    )
                }
                }
            </Context.Consumer>
        )
    }
}
export default Table4