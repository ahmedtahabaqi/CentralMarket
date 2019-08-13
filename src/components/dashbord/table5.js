import React from 'react';
import Context from '../Context';
import Component from "@reactions/component";
import { Dialog, Pane, FilePicker, Table } from 'evergreen-ui';
import { Row, Col, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import axios from 'axios';
import host from '../Host';
import State from '../common/state.json';
import Cookies from "universal-cookie";

const cookies = new Cookies();
const city = State;
var header = { "Content-Type": "application/json", token: cookies.get("token") };
class Table5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainTitleinput: '', TypeMotoSelect: '', ModleMotoSelect: '', StatusSelect: '', YearSelect: '', MillSelect: '', priceMoto: '',
            Color: '', description: '', NameUser: '', PhoneInput: '', Cityinput: '', City1input: '',
            imgCar1: [], imgCar2: [], imgCar3: [], imgCar4: [], imgCar5: [], imgCar6: [], imgCar7: [], imgCar8: [], imgCar9: [], imgCar10: [], imgCar11: [], imgCar12: [],
            motors: [], gallery: [],
            imgCar1Length:'',imgCar2Length:'',imgCar3Length:'',imgCar4Length:'',imgCar5Length:'',imgCar6Length:'',imgCar7Length:'',imgCar8Length:'',imgCar9Length:'',
            imgCar10Length:'',imgCar11Length:'',imgCar12Length:'',idToAddIMG:'',test:true,
        }
    }
    componentDidMount() {

        axios.get(host + `v1/motors`, { headers: {header} })
            .then(response => {
                console.log(response.data.data);
                if (response.status === 200) {
                    this.setState({
                        motors: response.data.data.reverse(),
                    })
                }
            })
            .catch((error) => { console.log('error ' + error) })

    }
    AddMotor() {
        let formData = new FormData();
        formData.append("title", this.state.mainTitleinput);
        formData.append("name", this.state.TypeMotoSelect);
        formData.append("type", this.state.ModleMotoSelect);
        formData.append("status", this.state.StatusSelect);
        formData.append("year", this.state.YearSelect);
        formData.append("miles", this.state.MillSelect);
        formData.append("color", this.state.Color);
        formData.append("price", this.state.priceMoto);
        formData.append("description", this.state.description);
        formData.append("sell_name", this.state.NameUser);
        formData.append("phone", this.state.PhoneInput);
        formData.append("state", this.state.City1input);
        formData.append("location", this.state.Cityinput);

        formData.append("image", this.state.imgCar1[0]);

        axios({ url: host + "dash/v1/motor/add", method: "POST", data: formData, headers: header })
            .then(response => {
                if (response.status === 200) {
                    this.setState({test:false,idToAddIMG:response.data.data.id})
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
    deleteMotor(id) {
        let formData = new FormData();
        formData.append("id", id);

        axios.delete(host + "dash/v1/motor/delete", { data: formData, headers: header })
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
    getMotorById(id) {
        axios.get(host + `v1/motor/${id}`, { headers: {header} })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data.data);

                    this.setState({
                        mainTitleinput: response.data.data.title,
                        TypeMotoSelect: response.data.data.name,
                        ModleMotoSelect: response.data.data.type,
                        StatusSelect: response.data.data.status,
                        YearSelect: response.data.data.year,
                        MillSelect: response.data.data.miles,
                        Color: response.data.data.color,

                        priceMoto: response.data.data.price,
                        description: response.data.data.description,
                        NameUser: response.data.data.sell_name,
                        PhoneInput: response.data.data.phone,
                        City1input: response.data.data.state,
                        Cityinput: response.data.data.location,

                    })
                }
            })
            .catch((error) => { console.log('error ' + error) })
    }
    AddImageToMotor(id) {
        var { imgCar2, imgCar3, imgCar4, imgCar5, imgCar6, imgCar7, imgCar8, imgCar9, imgCar10, imgCar11, imgCar12 } = this.state
        var { imgCar2Length, imgCar3Length, imgCar4Length, imgCar5Length, imgCar6Length, imgCar7Length, imgCar8Length, imgCar9Length, imgCar10Length, imgCar11Length, imgCar12Length } = this.state
        let formData = new FormData();
        formData.append("id", id);
        if (imgCar2Length > 0) {  formData.append('image0',imgCar2[0]); }
        if (imgCar3Length > 0) { formData.append('image1',imgCar3[0]); }
        if (imgCar4Length > 0) { formData.append('image2',imgCar4[0]); }
        if (imgCar5Length > 0) { formData.append('image3',imgCar5[0]); }
        if (imgCar6Length > 0) { formData.append('image4',imgCar6[0]); }
        if (imgCar7Length > 0) { formData.append('image5',imgCar7[0]); }
        if (imgCar8Length > 0) { formData.append('image6',imgCar8[0]); }
        if (imgCar9Length > 0) { formData.append('image7',imgCar9[0]); }
        if (imgCar10Length> 0) { formData.append('image8',imgCar10[0]);}
        if (imgCar11Length> 0) { formData.append('image9',imgCar11[0]);}
        if (imgCar12Length> 0){ formData.append('image10',imgCar12[0]);}
      

        axios({ url: host + "dash/v1/motor/image", method: "POST", data: formData, headers: header })
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
    EditMotors(id) {
        let formData = new FormData();
        formData.append("id", id);
        formData.append("title", this.state.mainTitleinput);
        formData.append("name", this.state.TypeMotoSelect);
        formData.append("type", this.state.ModleMotoSelect);
        formData.append("status", this.state.StatusSelect);
        formData.append("year", this.state.YearSelect);
        formData.append("miles", this.state.MillSelect);
        formData.append("color", this.state.Color);
        formData.append("price", this.state.priceMoto);
        formData.append("description", this.state.description);
        formData.append("sell_name", this.state.NameUser);
        formData.append("phone", this.state.PhoneInput);
        formData.append("state", this.state.City1input);
        formData.append("location", this.state.Cityinput);

        formData.append("image", this.state.imgCar1[0]);


        axios({ url: host + "dash/v1/motor/edit", method: "PUT", data: formData, headers: header })
            .then(response => {
                console.log(response);

                if (response.status === 200) {
                    window.location.reload();
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
    render() {
        if(!this.state.test)
        {
            this.AddImageToMotor(this.state.idToAddIMG)
            this.setState({test:true})
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
                                                title="اضافة دراجة"
                                                onCloseComplete={() => setState({ isShown: false })}
                                                confirmLabel="اضافة"
                                                cancelLabel='الغاء'
                                                onConfirm={() => {
                                                    this.AddMotor()
                                                    setState({ isShown: false })
                                                }}
                                            >
                                                <div style={{ direction: 'rtl' }}>
                                                    <div id='labelUpInputCarDas'>العنوان الرئيسي</div>

                                                    <Row>
                                                        <Col md={12}>
                                                            <input autoComplete='off' autoFocus={true}  type='text' placeholder='العنوان' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ mainTitleinput: e.target.value })} />
                                                        </Col>
                                                    </Row>

                                                    <div id='labelUpInputCarDas'>المعلومات الاساسية</div>

                                                    <Row>
                                                        <Col md={12} lg={6}>
                                                            <input autoComplete='off' type='text' placeholder='اسم الدراجة' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ TypeMotoSelect: e.target.value })} />
                                                        </Col>
                                                        <Col md={12} lg={6}>
                                                            <input autoComplete='off' type='text' placeholder='نوع الدراجة' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ ModleMotoSelect: e.target.value })} />
                                                        </Col>

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
                                                                            this.setState({ StatusSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="Select">الحالة</option>

                                                                    <option value='جديد' >جديد</option>
                                                                    <option value='مستعمل' >مستعمل</option>

                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>

                                                        <Col md={12} lg={6}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ YearSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="Select">سنة الصنع</option>

                                                                    <option value='1990' >1990</option>
                                                                    <option value='1991' >1991</option>
                                                                    <option value='1992' >1992</option>
                                                                    <option value='1993' >1993</option>
                                                                    <option value='1994' >1994</option>
                                                                    <option value='1995' >1995</option>
                                                                    <option value='1996' >1996</option>
                                                                    <option value='1997' >1997</option>
                                                                    <option value='1998' >1998</option>
                                                                    <option value='1999' >1999</option>
                                                                    <option value='2000' >2000</option>
                                                                    <option value='2001' >2001</option>
                                                                    <option value='2002' >2002</option>
                                                                    <option value='2003' >2003</option>
                                                                    <option value='2004' >2004</option>
                                                                    <option value='2005' >2005</option>
                                                                    <option value='2006' >2006</option>
                                                                    <option value='2007' >2007</option>
                                                                    <option value='2008' >2008</option>
                                                                    <option value='2009' >2009</option>
                                                                    <option value='2010' >2010</option>
                                                                    <option value='2011' >2011</option>
                                                                    <option value='2012' >2012</option>
                                                                    <option value='2013' >2013</option>
                                                                    <option value='2014' >2014</option>
                                                                    <option value='2015' >2015</option>
                                                                    <option value='2016' >2016</option>
                                                                    <option value='2017' >2017</option>
                                                                    <option value='2018' >2018</option>
                                                                    <option value='2019' >2019</option>
                                                                    <option value='2020' >2020</option>
                                                                    <option value='2021' >2021</option>

                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>


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
                                                                onChange={(e) => this.setState({ priceMoto: e.target.value })} />
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
                                                            <input autoComplete='off' type='text' placeholder='الاسم' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ NameUser: e.target.value })} />
                                                        </Col>
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

                                                    </Row>

                                                    <div id='labelUpInputCarDas'>الصور</div>

                                                    <Row>
                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar1: img, imgCar1Length:img.length }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar2: img, imgCar2Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar3: img, imgCar3Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar4: img, imgCar4Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar5: img, imgCar5Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar6: img, imgCar6Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar7: img, imgCar7Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar8: img, imgCar8Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar9: img, imgCar9Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar10: img, imgCar10Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar11: img, imgCar11Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar12: img, imgCar12Length:img.length  }) }} />
                                                        </Col>

                                                    </Row>
                                               
                                                </div>
                                          
                                            </Dialog>
                                            <div id='BTNADDNEWCARDASH' onClick={() => setState({ isShown: true })}
                                            >اضافة دراجة</div>

                                        </Pane>
                                    )}
                                </Component>
                                <span> دراجات نارية </span>
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
                                        <span id='tabledashboardText1'>الموقع</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell >
                                        <span id='tabledashboardText1'>رقم الهاتف</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell >
                                        <span id='tabledashboardText1'>العنوان</span>
                                    </Table.TextHeaderCell>
                                </Table.Head>
                                <Table.Body minHeight={340}>
                                    {this.state.motors.map(motor =>
                                    <Table.Row key={motor.id} >

                                        <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                            <Component initialState={{ isShown: false }}>
                                                {({ state, setState }) => (
                                                    <Pane>
                                                        <Dialog
                                                            isShown={state.isShown}
                                                            title="حذف دراجة "
                                                            intent="danger"
                                                            onCloseComplete={() => setState({ isShown: false })}
                                                            confirmLabel="حذف"
                                                            cancelLabel="الغاء"
                                                            onConfirm={() => {
                                                                this.deleteMotor(motor.id)
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
                                                            title="تعديل دراجة"
                                                            onCloseComplete={() => setState({ isShown: false })}
                                                            confirmLabel="حفظ"
                                                            cancelLabel="الغاء"
                                                            onConfirm={() => {
                                                                this.EditMotors(motor.id)
                                                                this.AddImageToMotor(motor.id)
                                                                setState({ isShown: false })
                                                            }}
                                                        >
                                                                <div style={{ direction: 'rtl' }}>
                                                    <div id='labelUpInputCarDas'>العنوان الرئيسي</div>

                                                    <Row>
                                                        <Col md={12}>
                                                            <input autoComplete='off' autoFocus={true}  value={this.state.mainTitleinput} type='text' placeholder='العنوان' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ mainTitleinput: e.target.value })} />
                                                        </Col>
                                                    </Row>

                                                    <div id='labelUpInputCarDas'>المعلومات الاساسية</div>

                                                    <Row>
                                                        <Col md={12} lg={6}>
                                                            <input autoComplete='off' value={this.state.TypeMotoSelect} type='text' placeholder='اسم الدراجة' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ TypeMotoSelect: e.target.value })} />
                                                        </Col>
                                                        <Col md={12} lg={6}>
                                                            <input autoComplete='off' value={this.state.ModleMotoSelect} type='text' placeholder='نوع الدراجة' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ ModleMotoSelect: e.target.value })} />
                                                        </Col>

                                                        <Col md={12} lg={6}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ Color: even.target.value })
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
                                                                            this.setState({ StatusSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value={this.state.StatusSelect}>الحالة</option>

                                                                    <option value='جديد' >جديد</option>
                                                                    <option value='مستعمل' >مستعمل</option>

                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>

                                                        <Col md={12} lg={6}>
                                                            <Form.Group style={{ direction: 'rtl' }} >
                                                                <Form.Control as="select" id='InputTExtDash'
                                                                    onChange={(even) => {
                                                                        if (even.target.value !== 'Select') {
                                                                            this.setState({ YearSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value={this.state.YearSelect}>سنة الصنع</option>

                                                                    <option value='1990' >1990</option>
                                                                    <option value='1991' >1991</option>
                                                                    <option value='1992' >1992</option>
                                                                    <option value='1993' >1993</option>
                                                                    <option value='1994' >1994</option>
                                                                    <option value='1995' >1995</option>
                                                                    <option value='1996' >1996</option>
                                                                    <option value='1997' >1997</option>
                                                                    <option value='1998' >1998</option>
                                                                    <option value='1999' >1999</option>
                                                                    <option value='2000' >2000</option>
                                                                    <option value='2001' >2001</option>
                                                                    <option value='2002' >2002</option>
                                                                    <option value='2003' >2003</option>
                                                                    <option value='2004' >2004</option>
                                                                    <option value='2005' >2005</option>
                                                                    <option value='2006' >2006</option>
                                                                    <option value='2007' >2007</option>
                                                                    <option value='2008' >2008</option>
                                                                    <option value='2009' >2009</option>
                                                                    <option value='2010' >2010</option>
                                                                    <option value='2011' >2011</option>
                                                                    <option value='2012' >2012</option>
                                                                    <option value='2013' >2013</option>
                                                                    <option value='2014' >2014</option>
                                                                    <option value='2015' >2015</option>
                                                                    <option value='2016' >2016</option>
                                                                    <option value='2017' >2017</option>
                                                                    <option value='2018' >2018</option>
                                                                    <option value='2019' >2019</option>
                                                                    <option value='2020' >2020</option>
                                                                    <option value='2021' >2021</option>

                                                                </Form.Control>

                                                            </Form.Group>
                                                        </Col>


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
                                                            <input autoComplete='off' value={this.state.priceMoto} type='number' placeholder='السعر' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ priceMoto: e.target.value })} />
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
                                                            <input autoComplete='off' value={this.state.NameUser} type='text' placeholder='الاسم' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ NameUser: e.target.value })} />
                                                        </Col>
                                                        <Col md={12}>
                                                            <input autoComplete='off' value={this.state.PhoneInput} type='text' placeholder='رقم الهاتف' id='InputTExtDash1'
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

                                                    </Row>

                                                    <div id='labelUpInputCarDas'>الصور</div>

                                                    <Row>
                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar1: img, imgCar1Length:img.length }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar2: img, imgCar2Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar3: img, imgCar3Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar4: img, imgCar4Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar5: img, imgCar5Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar6: img, imgCar6Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar7: img, imgCar7Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar8: img, imgCar8Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar9: img, imgCar9Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar10: img, imgCar10Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar11: img, imgCar11Length:img.length  }) }} />
                                                        </Col>

                                                        <Col md={12}>
                                                            <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                onChange={(img) => { this.setState({ imgCar12: img, imgCar12Length:img.length  }) }} />
                                                        </Col>

                                                    </Row>
                                               
                                                </div>
                                          
                                                            </Dialog>
                                                        <Edit style={{ color: '#0A3D62', cursor: 'pointer' }} onClick={() => {
                                                            this.getMotorById(motor.id)
                                                            setState({ isShown: true })
                                                        }} />
                                                    </Pane>
                                                )}
                                            </Component>

                                        </Table.TextCell>
                                        <Table.TextCell ><span id='tabledashboardText'>{motor.location+' / '+motor.state}</span></Table.TextCell>
                                        <Table.TextCell ><span id='tabledashboardText'>{motor.phone}</span></Table.TextCell>
                                        <Table.TextCell ><span id='tabledashboardText'>{motor.title}</span></Table.TextCell>

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
export default Table5