import React from "react";
import Component from "@reactions/component";
import { Row, Col } from "react-bootstrap";
import Context from '../Context';
import Category from '../common/category'
import { Link, Redirect } from 'react-router-dom';
import { Tooltip, Icon, toaster, Pane, Dialog } from 'evergreen-ui';
import Navb from '../common/navb';
import Footer from '../common/footer';
import host from '../Host';
import Lottie from 'lottie-react-web'
import animation from '../../assets/img/blue_car.json'
import Delete from '@material-ui/icons/Delete';
import axios from 'axios';
// import host from '../Host';
import Cookies from "universal-cookie";

const cookies = new Cookies();
var header = { "Content-Type": "application/json", token: cookies.get("token") };

class MyAds extends React.Component {
    constructor() {
        super();
        this.state = {
            car: [],
            spin: true,
        }
    }
    deleteCar(id) {
        let formData = new FormData();

        formData.append("id", id);
        axios.delete(host + "v1/car/delete", { data: formData, headers: header })
            .then(response => {
                if (response.status === 200) {
                    toaster.success('تم الحذف بنجاح')

                    window.location.reload();
                }
            })
            .catch(function (error) {
                toaster.warning(error.response.data.errMsg)
                console.log(error.response.data.errMsg)
            });

    }
    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    if (!ctx.value.redirectError) {
                        return <Redirect to='/NotFound' />
                    }
                    if (ctx.value.spin === false) {
                        return (
                            <div>
                                <Navb />
                                <Category />
                                <div id='marginup'>
                                    <Row style={{ margin: 0, padding: 0 }}>
                                        {ctx.value.user.Cars.map((ca, i) =>
                                            <Col key={i} sm={12} md={6} xl={4} >
                                                <div id='firstCardContiner'>
                                                    <div id='MainCardContiner'>
                                                        <div id='priceCardContiner'>
                                                            <span>{ca.price}</span>
                                                            <img width={14} style={{ marginLeft: 10 }} src={require('../../assets/img/dolir.png')} alt='img' />
                                                        </div>
                                                        <div id='opacityPrice' />
                                                        {ca.active ? (
                                                            <Link to={'/transaction/' + ca.id}>
                                                                <div id='carCardContiner'>
                                                                    <img width={375} height={234} src={host + ca.image + '.png'} alt='img' />
                                                                </div>
                                                            </Link>
                                                        ) : (
                                                                <div id='carCardContiner'>
                                                                    <img width={375} height={234} src={host + ca.image + '.png'} alt='img' />
                                                                </div>
                                                            )}

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
                                                            {ca.active ? (
                                                                <Link to={'/transaction/' + ca.id}>

                                                                </Link>) : (
                                                                    <div style={{ cursor: 'pointer', color: '#000' }}>
                                                                        <span>{ca.title}</span>
                                                                    </div>
                                                                )}
                                                        </div>
                                                        {ctx.value.Lang==='en'?(
                                                             <div id='delAndAprovContiner'>
                                                             {ca.active ? (<div id='approvedContiner'>Approved</div>)
                                                                 : (<div id='pendingContiner'>Waiting</div>)}
 
                                                             <Component initialState={{ isShown: false }}>
                                                                 {({ state, setState }) => (
                                                                     <Pane>
                                                                         <Dialog
                                                                             isShown={state.isShown}
                                                                             title="delete car "
                                                                             intent="danger"
                                                                             onCloseComplete={() => setState({ isShown: false })}
                                                                             confirmLabel="delete"
                                                                             cancelLabel="cancel"
                                                                             onConfirm={() => {
                                                                                 this.deleteCar(ca.id)
                                                                                 setState({ isShown: false })
                                                                             }}
                                                                         >
                                                                             <span id='msgDelete'> Are you sure you want to delete it?</span>
                                                                         </Dialog>
                                                                         <Delete style={{ color: '#E4BE6D', cursor: 'pointer' }}
                                                                             onClick={() => setState({ isShown: true })} />
                                                                     </Pane>
                                                                 )}
                                                             </Component>
 
                                                         </div>
                                                        ):(
                                                            <div id='delAndAprovContiner'>
                                                            {ca.active ? (<div id='approvedContiner'>تمت الموافقة</div>)
                                                                : (<div id='pendingContiner'>انتظار</div>)}

                                                            <Component initialState={{ isShown: false }}>
                                                                {({ state, setState }) => (
                                                                    <Pane>
                                                                        <Dialog
                                                                            isShown={state.isShown}
                                                                            title="حذف السيارة "
                                                                            intent="danger"
                                                                            onCloseComplete={() => setState({ isShown: false })}
                                                                            confirmLabel="حذف"
                                                                            cancelLabel="الغاء"
                                                                            onConfirm={() => {
                                                                                this.deleteCar(ca.id)
                                                                                setState({ isShown: false })
                                                                            }}
                                                                        >
                                                                            <span id='msgDelete'> هل انت متأكد من عملية الحذف</span>
                                                                        </Dialog>
                                                                        <Delete style={{ color: '#E4BE6D', cursor: 'pointer' }}
                                                                            onClick={() => setState({ isShown: true })} />
                                                                    </Pane>
                                                                )}
                                                            </Component>

                                                        </div>
                                                        )}
                                                       
                                                    </div>
                                                </div>
                                            </Col>
                                        )}
                                    </Row>
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

export default MyAds;

