import React from 'react';
import Context from '../Context';
import Component from "@reactions/component";
import { Dialog, Pane, Table, toaster, FilePicker } from 'evergreen-ui';
import {Form} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import axios from 'axios';
import host from '../Host';
import Cookies from "universal-cookie";

const cookies = new Cookies();
var header = { "Content-Type": "application/json", token: cookies.get("token") };

class Table8 extends React.Component {
    constructor() {
        super();
        this.state = {
            banner: [],
            title: '',
            phone: '',
            location: '',
            imgBanner: [],
            gallery:[],
            gallerySelect:'',
        }
    }
    componentDidMount() {
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

            axios.get(host + `v1/stores`, { headers: header })
            .then(response => {
                // console.log(response.data.data);
                if (response.status === 200) {
                    this.setState({

                        gallery: response.data.data.reverse(),
                    })
                }
            })
            .catch((error) => { console.log('error ' + error) })

    }
    deletebanner(id) {
        let formData = new FormData();

        formData.append("id", id);

        axios.delete(host + "dash/v1/banner/delete", { data: formData, headers: header })
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
    AddBanner() {
        let formData = new FormData();
        formData.append("phone", 'none');
        formData.append("location", 'none');
        formData.append("state", this.state.title);
        formData.append("title", 'none');
        formData.append("storeId", this.state.gallerySelect);
        formData.append("image", this.state.imgBanner[0]);

        axios({ url: host + "dash/v1/banner/add", method: "POST", data: formData, headers: header })
            .then(response => {
                if (response.status === 200) {
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

    EditBanner(id) {
        let formData = new FormData();

        formData.append("phone", 'none');
        formData.append("location", 'none');
        formData.append("state", this.state.title);
        formData.append("title", 'none');
        formData.append("storeId", this.state.gallerySelect);
        formData.append("image", this.state.imgBanner[0]);
        formData.append("id", id);
        axios({ url: host + "dash/v1/banner/edit", method: "PUT", data: formData, headers: header })
            .then(response => {
                if (response.status === 200) {
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
                toaster.danger(error.message)

            });
    }
    getBannerById(id) {
        axios.get(host + `v1/banner/${id}`, { headers: header })
            .then(response => {
                // console.log(response.data);
                if (response.status === 200) {
                    console.log(response.data.data);

                    this.setState({
                        phone: response.data.data[0].phone,
                        location: response.data.data[0].location,
                        title: response.data.data[0].state,


                    })
                }
            })
            .catch((error) => { console.log('error ' + error) })
    }

    render() {
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
                                                title="اضافة اعلان"
                                                onCloseComplete={() => setState({ isShown: false })}
                                                confirmLabel="اضافة"
                                                cancelLabel='الغاء'
                                                onConfirm={() => {
                                                    setState({ isShown: false })
                                                    this.AddBanner()
                                                }}>
                                                           <input autoComplete='off' autoFocus={true}  type='text' placeholder='العنوان' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ title: e.target.value })} />
                                                <Form.Group style={{ direction: 'rtl' }} >
                                                    <Form.Control as="select" id='InputTExtDash'
                                                        onChange={(even) => {
                                                            if (even.target.value !== 'Selectgallery') {
                                                                this.setState({ gallerySelect: even.target.value })
                                                            }
                                                        }}>

                                                        <option value="Selectgallery">اختيار معرض</option>
                                                        {this.state.gallery.map(gall =>
                                                            <option key={gall.id} value={gall.id}>{gall.name}</option>
                                                        )}
                                                    </Form.Control>

                                                </Form.Group>
                                                <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                    onChange={(img) => { this.setState({ imgBanner: img }) }} />

                                            </Dialog>
                                            <div id='BTNADDNEWCARDASH' onClick={() => setState({ isShown: true })}
                                            >اضافة اعلان</div>

                                        </Pane>
                                    )}
                                </Component>
                                <span> اعلانات </span>
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
                                        <span id='tabledashboardText1'>العنوان</span>
                                    </Table.TextHeaderCell>
                                </Table.Head>
                                <Table.Body minHeight={340}>
                                    {this.state.banner.map(num =>
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
                                                                    this.deletebanner(num.id)
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
                                                                title="تعديل الاعلان"
                                                                onCloseComplete={() => setState({ isShown: false })}
                                                                confirmLabel="حفظ"
                                                                cancelLabel="الغاء"
                                                                onConfirm={() => {
                                                                    this.EditBanner(num.id)
                                                                    setState({ isShown: false })
                                                                }}
                                                            >
                                                                <input autoComplete='off' value={this.state.title} autoFocus={true}  type='text' placeholder='العنوان' id='InputTExtDash1'
                                                                onChange={(e) => this.setState({ title: e.target.value })} />
                                                                <Form.Group style={{ direction: 'rtl' }} >
                                                                    <Form.Control as="select" id='InputTExtDash'
                                                                        onChange={(even) => {
                                                                            if (even.target.value !== 'Selectgallery') {
                                                                                this.setState({ gallerySelect: even.target.value })
                                                                            }
                                                                        }}>
                                                                        <option value="Selectgallery">اختيار معرض</option>
                                                                        {this.state.gallery.map(gall =>
                                                                            <option key={gall.id} value={gall.id}>{gall.name}</option>
                                                                        )}
                                                                    </Form.Control>

                                                                </Form.Group>
                                                                <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                    onChange={(img) => { this.setState({ imgBanner: img }) }} />
                                                            </Dialog>
                                                            <Edit style={{ color: '#0A3D62', cursor: 'pointer' }} onClick={() => {
                                                                this.getBannerById(num.id)
                                                                setState({ isShown: true })
                                                            }} />
                                                        </Pane>
                                                    )}
                                                </Component>

                                            </Table.TextCell>
                                            <Table.TextCell ><span id='tabledashboardText'>{num.state}</span></Table.TextCell>

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
export default Table8