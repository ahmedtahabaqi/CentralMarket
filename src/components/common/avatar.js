import React from 'react';
import { Popover, Menu, Position, Avatar } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import Cookies from "universal-cookie";
import Context from '../Context';
// import axios from 'axios';
// import host from '../Host';
const cookies = new Cookies();


class Avatir extends React.Component {

    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    return (
                        <div id='avatar'>
                            {ctx.value.Lang === 'en' ? (
                                <Popover
                                    position={Position.BOTTOM_LEFT}
                                    content={
                                        <Menu>
                                            <Menu.Group>
                                                <Menu.Item>
                                                    <p style={{ textAlign: 'center' }}>{ctx.value.user.email}</p>

                                                </Menu.Item>
                                            </Menu.Group>

                                            {ctx.value.admin ? (
                                                <Menu.Group>
                                                    <Menu.Item>
                                                        <div id='avatrBtnContiner'>
                                                            <Link to='/admin'>
                                                                <div id='ButtomDashboard'>Dashboard</div>
                                                            </Link>
                                                        </div>
                                                    </Menu.Item>
                                                </Menu.Group>
                                            ) : (
                                                    <React.Fragment></React.Fragment>
                                                )}

                                            <Menu.Group>
                                                <Menu.Item>
                                                    <div id='avatrBtnContiner'>
                                                        <Link to='/profile'>
                                                            <div id='ButtomDashboard'>Profile</div>
                                                        </Link>
                                                    </div>
                                                </Menu.Item>
                                            </Menu.Group>
                                            <Menu.Group >
                                                <Menu.Item >
                                                    <div id='avatrBtnContiner'>
                                                        < div id='ButtomDashboardOUT'
                                                            onClick={() => {
                                                                cookies.remove("token");
                                                                localStorage.setItem('login', 'out');
                                                                window.location.href = "/"
                                                            }}
                                                        >Logout
                                                        </div>

                                                    </div>
                                                </Menu.Item>
                                            </Menu.Group>
                                        </Menu>
                                    } >
                                    <Avatar id='editAvatar'
                                        src={require('../../assets/img/prof.png')}
                                        name={ctx.value.user.name}
                                        size={40}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Popover>
                            ) : (
                                    <Popover
                                        position={Position.BOTTOM_LEFT}
                                        content={
                                            <Menu>
                                                <Menu.Group>
                                                    <Menu.Item>
                                                        <p style={{ textAlign: 'center' }}>{ctx.value.user.email}</p>

                                                    </Menu.Item>
                                                </Menu.Group>
                                                {ctx.value.admin ? (
                                                <Menu.Group>
                                                    <Menu.Item>
                                                        <div id='avatrBtnContiner'>
                                                            <Link to='/admin'>
                                                                <div id='ButtomDashboard'>لوحة التحكم</div>
                                                            </Link>
                                                        </div>
                                                    </Menu.Item>
                                                </Menu.Group>
                                            ) : (
                                                    <React.Fragment></React.Fragment>
                                                )}
                                                <Menu.Group>
                                                    <Menu.Item>
                                                        <div id='avatrBtnContiner'>
                                                            <Link to='/profile'>
                                                                <div id='ButtomDashboard'>الملف الشخصي</div>
                                                            </Link>
                                                        </div>
                                                    </Menu.Item>
                                                </Menu.Group>
                                                <Menu.Group >
                                                    <Menu.Item >
                                                        <div id='avatrBtnContiner'>
                                                            < div id='ButtomDashboardOUT'
                                                                onClick={() => {
                                                                    cookies.remove("token");
                                                                    window.location.href = "/"
                                                                }}
                                                            >تسجيل الخروج
                                                        </div>

                                                        </div>
                                                    </Menu.Item>
                                                </Menu.Group>
                                            </Menu>
                                        } >
                                        <Avatar id='editAvatar'
                                            src={require('../../assets/img/prof.png')}
                                            name={ctx.value.user.name}
                                            size={40}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Popover>
                                )}
                        </div>)
                }
                }
            </Context.Consumer>
        )
    }
}
export default Avatir;

