import React from 'react';
import Context from '../Context';
import Component from "@reactions/component";
import { Dialog, Pane, Table, FilePicker } from 'evergreen-ui';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import axios from 'axios';
import host from '../Host';
import State from '../common/state.json';
import Cookies from "universal-cookie";

const cookies = new Cookies();
var header = { "Content-Type": "application/json", token: cookies.get("token") };
const city = State;


class Table7 extends React.Component {
    constructor() {
        super();
        this.state = {
            imgNumber: [],
            price: '',
            phone: '',
            Cityinput: '',
            City1input: '',
            Numbers: [],
        }
    }
    componentDidMount() {
        axios.get(host + `v1/numbers`, { headers: header })
            .then(response => {
                // console.log(response.data);
                if (response.status === 200) {
                    this.setState({
                        Numbers: response.data.data.reverse(),
                    })
                }
            })
            .catch((error) => { console.log('error ' + error) })

    }
    deleteNumber(id) {
        let formData = new FormData();

        formData.append("id", id);

        axios.delete(host + "dash/v1/number/delete", { data: formData, headers: header })
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
    AddNumber() {
        let formData = new FormData();

        formData.append("phone", this.state.phone);
        formData.append("location", this.state.Cityinput);
        formData.append("state", this.state.City1input);
        formData.append("price", this.state.price);
        formData.append("image", this.state.imgNumber[0]);
        formData.append("name", 'admin');
        axios({ url: host + "dash/v1/number/add", method: "POST", data: formData, headers: header })
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
    getNumById(id) {
        axios.get(host + `v1/number/${id}`, { headers: header })
            .then(response => {
                // console.log(response.data);
                if (response.status === 200) {
                    console.log(response.data.data);

                    this.setState({
                        phone: response.data.data.phone,
                        Cityinput: response.data.data.location,
                        City1input: response.data.data.state,
                        price: response.data.data.price,
                        imgNumber: response.data.data.imgNumber,

                    })
                }
            })
            .catch((error) => { console.log('error ' + error) })
    }
    EditNumber(id) {
        let formData = new FormData();
        formData.append("id", id);
        formData.append("phone", this.state.phone);
        formData.append("location", this.state.Cityinput);
        formData.append("state", this.state.City1input);
        formData.append("price", this.state.price);
        formData.append("name", 'admin');
        // formData.append("image", this.state.imgNumber[0]);

        axios({ url: host + "dash/v1/number/edit", method: "PUT", data: formData, headers: header })
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
                                                title="اضافة رقم"
                                                onCloseComplete={() => setState({ isShown: false })}
                                                confirmLabel="اضافة"
                                                cancelLabel='الغاء'
                                                onConfirm={() => {
                                                    setState({ isShown: false })
                                                    this.AddNumber()
                                                }}>
                                                <input type='text' autoFocus={true} id='InputTExtDash' placeholder='السعر'
                                                    onChange={(e) => this.setState({ price: e.target.value })} />
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

                                                <input type='number' id='InputTExtDash' placeholder='رقم الهاتف'
                                                    onChange={(e) => this.setState({ phone: e.target.value })} />

                                                <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                    onChange={(img) => { this.setState({ imgNumber: img }) }} />

                                            </Dialog>
                                            <div id='BTNADDNEWCARDASH' onClick={() => setState({ isShown: true })}
                                            >اضافة رقم</div>

                                        </Pane>
                                    )}
                                </Component>
                                <span> ارقام السيارات </span>
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
                                    {this.state.Numbers.map(num =>
                                        <Table.Row key={num.id} >

                                            <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                                <Component initialState={{ isShown: false }}>
                                                    {({ state, setState }) => (
                                                        <Pane>
                                                            <Dialog
                                                                isShown={state.isShown}
                                                                title="حذف رقم "
                                                                intent="danger"
                                                                onCloseComplete={() => setState({ isShown: false })}
                                                                confirmLabel="حذف"
                                                                cancelLabel="الغاء"
                                                                onConfirm={() => {
                                                                    this.deleteNumber(num.id)
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
                                                                title="تعديل رقم"
                                                                onCloseComplete={() => setState({ isShown: false })}
                                                                confirmLabel="حفظ"
                                                                cancelLabel="الغاء"
                                                                onConfirm={() => {
                                                                    this.EditNumber(num.id)
                                                                    setState({ isShown: false })
                                                                }}
                                                            >
                                                                <input type='text' autoFocus={true} value={this.state.price} id='InputTExtDash1' placeholder='السعر'
                                                                    onChange={(e) => this.setState({ price: e.target.value })} />
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




                                                                <input type='number' value={this.state.phone} id='InputTExtDash1' placeholder='رقم الهاتف'
                                                                    onChange={(e) => this.setState({ phone: e.target.value })} />

                                                                <FilePicker multiple width={'90%'} height={40} marginLeft={'5%'} marginRight={'5%'} marginTop={10}
                                                                    onChange={(img) => { this.setState({ imgNumber: img }) }} />
                                                            </Dialog>
                                                            <Edit style={{ color: '#0A3D62', cursor: 'pointer' }} onClick={() => {
                                                                this.getNumById(num.id)
                                                                setState({ isShown: true })
                                                            }} />
                                                        </Pane>
                                                    )}
                                                </Component>

                                            </Table.TextCell>
                                            <Table.TextCell ><span id='tabledashboardText'>{num.phone}</span></Table.TextCell>
                                            <Table.TextCell ><span id='tabledashboardText'>{num.price} $</span></Table.TextCell>
                                            <Table.TextCell ><span id='tabledashboardText'>{num.location + ' / ' + num.state}</span></Table.TextCell>

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
export default Table7