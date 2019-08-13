import React from 'react';
import Context from '../Context';
import Component from "@reactions/component";
import { Dialog, Pane, Table} from 'evergreen-ui';
import { Row, Col } from "react-bootstrap";
import LocationCity from '@material-ui/icons/LocationCity';
import Assignment from '@material-ui/icons/Assignment';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { ToastContainer, toast } from 'react-toastify';
import Delete from '@material-ui/icons/Delete';
import host from '../Host';
import axios from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();
var header = { "Content-Type": "application/json", token: cookies.get("token") };

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            watingCar: [],
            cars:[],
            gallery:[],
            banner:[],
        }
    }
    componentDidMount() {
        axios.get(host + `dash/v1/cars/waiting?`, { headers: header })
            .then(response => {
                // console.log(response.data);
                if (response.status === 200) {
                    console.log(response.data.data);
                    this.setState({
                        
                        
                        watingCar: response.data.data.reverse(),
                    })
                }
                axios.get(host + `v1/cars`, { headers: header })
                .then(response => {
                    // console.log(response.data);
                    if (response.status === 200) {
                        this.setState({
                            cars: response.data.data.reverse(),
                        })
                    }
                })

            })
            .catch((error) => { console.log('error ' + error) })

            axios.get(host + `v1/stores`, { headers: header })
            .then(response => {
                if (response.status === 200) {
                    this.setState({

                        gallery: response.data.data.reverse(),
                    })
                }
            })
            .catch((error) => { console.log('error ' + error) })

            axios.get(host + `v1/banners`, { headers: header })
            .then(response => {
                // console.log(response.data);
                if (response.status === 200) {
                    this.setState({
                        banner: response.data.data.reverse(),
                    })
                }
            })
            .catch((error) => { console.log('error ' + error) })

    }
    approveCar(id) {
        let formData = new FormData();

        formData.append("id", id);
       
        axios({ url: host + "dash/v1/cars/approve?", method: "POST", data: formData, headers: header })
            .then(response => {
                if (response.status === 200) {
                    toast('تمت الموافقة بنجاح', {
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

            });
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
               

            });

    }
    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    return (
                        <div>
                             <Row style={{ margin: '30px 0px', padding: 0 }} >
                                <Col id='rowDash' xs={12} md={6} xl={3}>
                                    <div className='maincardDashContiner'>
                                        <div className='cardDashContiner'>
                                            <div className='cardDashContiner2'>
                                                <Assignment  fontSize="large" />
                                            </div>
                                            <div className='cardDashContiner1'>
                                                <div className='cardDashContinertext'>
                                                    <p id='titleCardAdmin'>عدد الاعلانات</p>
                                                    <p id='ContentCardAdmin'>{this.state.banner.length}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col id='rowDash' xs={12} md={6} xl={3}>
                                    <div className='maincardDashContiner'>
                                        <div className='cardDashContiner'>
                                            <div className='cardDashContiner2'>
                                                <LocationCity  fontSize="large" />
                                            </div>
                                            <div className='cardDashContiner1'>
                                                <div className='cardDashContinertext'>
                                                    <p id='titleCardAdmin'>عدد المعارض</p>
                                                    <p id='ContentCardAdmin'>{this.state.gallery.length}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col id='rowDash' xs={12} md={6} xl={3}>
                                    <div className='maincardDashContiner'>
                                        <div className='cardDashContiner'>
                                            <div className='cardDashContiner2'>
                                            <AssignmentTurnedIn  fontSize="large" />
                                            </div>
                                            <div className='cardDashContiner1'>
                                                <div className='cardDashContinertext'>
                                                    <p id='titleCardAdmin'>طلبات الموافقة</p>
                                                    <p id='ContentCardAdmin'>{this.state.watingCar.length}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col id='rowDash' xs={12} md={6} xl={3}>
                                    <div className='maincardDashContiner'>
                                        <div className='cardDashContiner'>
                                            <div className='cardDashContiner2'>
                                                <DirectionsCar  fontSize="large" />
                                            </div>
                                            <div className='cardDashContiner1'>
                                                <div className='cardDashContinertext'>
                                                    <p id='titleCardAdmin'>عدد السيارات</p>
                                                    <p id='ContentCardAdmin'>{this.state.cars.length}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                           
                            <Table style={{ textAlign: "right", fontSize: 25 }}>
                                <Table.Head>

                                    <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                        <span id='tabledashboardText1'>حذف</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                        <span id='tabledashboardText1'>موافقة</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell >
                                        <span id='tabledashboardText1'>تاريخ الاعلان</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell >
                                        <span id='tabledashboardText1'>رقم الهاتف</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell >
                                        <span id='tabledashboardText1'>السعر</span>
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell >
                                        <span id='tabledashboardText1'>العنوان</span>
                                    </Table.TextHeaderCell>
                                </Table.Head>
                                <Table.Body minHeight={340}>
                                    {this.state.watingCar.map(num =>
                                        <Table.Row key={num.id} >

                                            <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                                <Component initialState={{ isShown: false }}>
                                                    {({ state, setState }) => (
                                                        <Pane>
                                                            <Dialog
                                                                isShown={state.isShown}
                                                                title="حذف الاعلان "
                                                                intent="danger"
                                                                onCloseComplete={() => setState({ isShown: false })}
                                                                confirmLabel="حذف"
                                                                cancelLabel="الغاء"
                                                                onConfirm={() => {
                                                                    this.deleteCar(num.id)
                                                                    this.componentDidMount();
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
                                                <div><CheckCircle style={{ color: 'mediumseagreen', cursor: 'pointer' }}
                                                onClick={()=>{this.approveCar(num.id)}}/></div>
                                                
                                            </Table.TextCell>
                                            <Table.TextCell ><span id='tabledashboardText'>{num.date}</span></Table.TextCell>
                                            <Table.TextCell ><span id='tabledashboardText'>{num.phone}</span></Table.TextCell>
                                            <Table.TextCell ><span id='tabledashboardText'>{num.price} $</span></Table.TextCell>
                                            <Table.TextCell ><span id='tabledashboardText'>{num.title}</span></Table.TextCell>

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
export default Admin