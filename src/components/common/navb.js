import React from "react";
import Context from '../Context';
import Component from "@reactions/component";
import { NavLink } from 'react-router-dom';
import { Pane, Dialog, toaster,IconButton } from 'evergreen-ui';
import { InputGroup, Navbar, Nav } from 'react-bootstrap';
import Avatir from './avatar';
import axios from 'axios';
import Cookies from "universal-cookie";
import host from '../Host';
import Autosuggest from 'react-autosuggest';
// import Search from '@material-ui/icons/Search';

var languages = [];
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.title.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.title;
const renderSuggestion = suggestion => (
  <div>
    {suggestion.title}
  </div>
);

const cookies = new Cookies();
class Navb extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      phone: '',
      phone2: '',
      name: '',
      value: '',
      suggestions: []
    }
    
  }
  componentDidMount() {
    axios.get(host + `v1/cars`, { headers: {} })
      .then(response => {
        languages = response.data.data
      })
      .catch((error) => { console.log('error ' + error) })
  }
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: getSuggestions(value) });
  };
  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };
  keyPress(e){
   
    // console.log(e.keyCode);
    if(Number(e.keyCode) === 13){
      e.preventDefault()
       document.getElementById("SSSAA").click();
    }
 }
  signUp(e) {
    e.preventDefault()
    axios.post(host + `v1/signup`, {
      email: this.state.email ? this.state.email : "none",
      password: this.state.password,
      phone: this.state.phone,
      name: this.state.name,
      phoneSecond: this.state.phone2 ? this.state.phone2 : "none"
    })
      .then(function (response) {
        // console.log(response.data.token);

        cookies.set("token", response.data.token, {
          // path: "/",
          expires: new Date(Date.now() + 604800000)
        });
        localStorage.setItem('login', 'in');
        window.location.href = "/";
      })
      .catch(function (error) {
        // console.log(error.response.data.errMsg)
        if (error.response) {
          toaster.danger(error.response.data.errMsg);
        }
      })
  }
  signIN(e) {
    e.preventDefault()
    axios.post(host + `v1/signin`, {
      // email: this.state.YourEmail,
      password: this.state.Yourpassword,
      phone: this.state.phone,
    })
      .then(function (response) {
        console.log(response);

        cookies.set("token", response.data.token, {
          // path: "/",
          expires: new Date(Date.now() + 604800000)
        });
        localStorage.setItem('login', 'in');
        window.location.href = "/";
      })
      .catch(function (error) {
        if (error.response) {
          toaster.danger("Please check your email and password then try again");
        }
      });
  }
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange,
      id: 'searchHome1',
      placeholder: 'Search',
    };
    const inputPropsAr = {
      value,
      onChange: this.onChange,
      id: 'searchHome1',
      placeholder: 'بحث',

    };
    return (<Context.Consumer>
      {ctx => {
        return (
          <div>{ctx.value.Lang === 'en' ? (
            <div id="navcolors">
              <Navbar expand="lg" variant="dark" style={{ width: '100%' }}>
                <Nav style={{ width: 120 }}>
                  <NavLink  to="/"> <img src={require('../../assets/img/logo.png')} id="logocars" alt='logo' /></NavLink>
                </Nav>
                <Navbar.Toggle bg="light" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <div >
                      <InputGroup id="SearchInputGroup" onKeyDown={(e)=>this.keyPress(e)} onChange={(e)=>console.log(e)}
                       >
                         <IconButton icon="search" intent="warning" height={30}
                          id='SSSAA' onClick={() => { window.location.href = `/SearchCar?name=${this.state.value}`}}/>
                        
                        <div id='searcenter'>

                          <div id='searchHome' style={{ backgroundColor: '#fff', position: 'absolute', zIndex: 18 }}>
                            <Autosuggest
                              suggestions={suggestions}
                              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                              getSuggestionValue={getSuggestionValue}
                              renderSuggestion={renderSuggestion}
                              inputProps={inputProps}
                            />
                          </div>

                        </div>
                      </InputGroup>
                    </div>

                  </Nav>
                  <Nav >
                    {ctx.value.login === 'out' ? (
                      <div id='loginNavContiner'>
                        <Component initialState={{ isShown: false }}>
                          {({ state, setState }) => (
                            <Pane >
                              <Dialog
                                isShown={state.isShown}
                                onCloseComplete={() => setState({ isShown: false })}
                                hasFooter={false}
                                hasHeader={false}

                              >
                                <div id='SignInContiner'>
                                  <div id='SignInTitle'>Sign In</div>
                                  <form id='formSignIn'>
                                    <div id='ContinerInputSignin'>
                                      <input className='inputSignIn' type='text' placeholder='phone number' onChange={(e) => this.setState({ phone: e.target.value })} />
                                    </div>
                                    <div id='ContinerInputSignin'>
                                      <input className='inputSignIn' type='password' placeholder='password' onChange={(e) => this.setState({ Yourpassword: e.target.value })} />
                                    </div>
                                    <div id='ContinerInputSignin'>
                                      <div id='BTNlogin' onClick={(e) => {
                                        this.signIN(e)
                                        setState({ isShown: false })
                                      }}>Sign In</div>
                                    </div>
                                  </form>
                                </div>
                              </Dialog>

                              <div id='BTNLOgIN_Nav' onClick={() => setState({ isShown: true })}>Sign In</div>
                            </Pane>
                          )}
                        </Component>
                        <div id='LinebetweenSign' />
                        <Component initialState={{ isShown: false }}>
                          {({ state, setState }) => (
                            <Pane >
                              <Dialog
                                isShown={state.isShown}
                                onCloseComplete={() => setState({ isShown: false })}
                                hasFooter={false}
                                hasHeader={false}
                              >
                                <div id='SignInContiner'>
                                  <form id='formSignIn'>
                                    <div id='ContinerInputSignin'>
                                      <input className='inputSignIn' type='text' placeholder='full name'
                                        onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                    </div>
                                    <div id='ContinerInputSignin'>
                                      <input className='inputSignIn' type='text' placeholder='email (optional)'
                                        onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                    </div>
                                    <div id='ContinerInputSignin'>
                                      <input className='inputSignIn' type='text' placeholder='phone'
                                        onChange={(e) => { this.setState({ phone: e.target.value }) }} />
                                    </div>
                                    <div id='ContinerInputSignin'>
                                      <input className='inputSignIn' type='text' placeholder=' second Phone (optional)'
                                        onChange={(e) => { this.setState({ phone2: e.target.value }) }} />
                                    </div>
                                    <div id='ContinerInputSignin'>
                                      <input className='inputSignIn' type='password' placeholder='password'
                                        onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                    </div>
                                    <div id='ContinerInputSignin'>
                                      <div id='BTNlogin' onClick={(e) => {
                                        this.signUp(e)
                                        setState({ isShown: false })
                                      }}>Sign Up</div>
                                    </div>
                                  </form>
                                </div>

                              </Dialog>

                              <div id='BTNSignUp_Nav' onClick={() => setState({ isShown: true })}>Sign Up</div>
                            </Pane>
                          )}
                        </Component>
                      </div>
                    ) : (
                        <div id='upAvatarContiner'>
                          <div id='AvatarContiner'>
                            <Avatir />
                          </div>
                        </div>
                      )}
                  </Nav>


                </Navbar.Collapse>




              </Navbar>

            </div>
          ) : (
              <div id="navcolorsAR">
                <Navbar expand="lg" variant="dark" style={{ width: '100%' }}>
                  <Nav style={{ width: 120 }}>
                    <NavLink to="/"> <img src={require('../../assets/img/logo.png')} id="logocars" alt='logo' /></NavLink>
                  </Nav>
                  <Navbar.Toggle bg="light" aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                      <div >
                      <InputGroup id="SearchInputGroup" onKeyDown={(e)=>this.keyPress(e)} onChange={(e)=>console.log(e)}
                       >
                         <IconButton icon="search" intent="warning" height={30}
                          id='SSSAA' onClick={() => { window.location.href = `/SearchCar?name=${this.state.value}`}}/>
                        
                          <div id='searcenter'>

                            <div id='searchHome' style={{ backgroundColor: '#fff', position: 'absolute', zIndex: 18, textAlign: 'right', cursor: 'pointer' }}>
                              <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputPropsAr}
                              />
                            </div>

                          </div>
                        </InputGroup>
                      </div>

                    </Nav>
                    <Nav className="mr-auto" >
                      {ctx.value.login === 'out' ? (
                        <div id='loginNavContiner'>
                          <Component initialState={{ isShown: false }}>
                            {({ state, setState }) => (
                              <Pane >
                                <Dialog
                                  isShown={state.isShown}
                                  onCloseComplete={() => setState({ isShown: false })}
                                  hasFooter={false}
                                  hasHeader={false}

                                >
                                  <div id='SignInContiner'>
                                    <div id='SignInTitle'>تسجيل الدخول</div>
                                    <form id='formSignIn'>
                                      <div id='ContinerInputSignin'>
                                        <input className='inputSignIn' type='text' placeholder='رقم الهاتف' onChange={(e) => this.setState({ phone: e.target.value })} />
                                      </div>
                                      <div id='ContinerInputSignin'>
                                        <input className='inputSignIn' type='password' placeholder='كلمة المرور' onChange={(e) => this.setState({ Yourpassword: e.target.value })} />
                                      </div>
                                      <div id='ContinerInputSignin'>
                                        <div id='BTNlogin' onClick={(e) => {
                                          this.signIN(e)
                                          setState({ isShown: false })
                                        }}>تسجيل الدخول</div>
                                      </div>
                                    </form>
                                  </div>
                                </Dialog>

                                <div id='BTNLOgIN_Nav' onClick={() => setState({ isShown: true })}>تسجيل الدخول</div>
                              </Pane>
                            )}
                          </Component>
                          <div id='LinebetweenSign' />
                          <Component initialState={{ isShown: false }}>
                            {({ state, setState }) => (
                              <Pane >
                                <Dialog
                                  isShown={state.isShown}
                                  onCloseComplete={() => setState({ isShown: false })}
                                  hasFooter={false}
                                  hasHeader={false}
                                >
                                  <div id='SignInContiner'>
                                    <form id='formSignIn'>
                                      <div id='ContinerInputSignin'>
                                        <input className='inputSignIn' type='text' placeholder='الاسم'
                                          onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                      </div>
                                      <div id='ContinerInputSignin'>
                                        <input className='inputSignIn' type='text' placeholder=' (البريد الالكتروني (اختياري ' onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                      </div>
                                      <div id='ContinerInputSignin'>
                                        <input className='inputSignIn' type='text' placeholder='رقم الهاتف'
                                          onChange={(e) => { this.setState({ phone: e.target.value }) }} />
                                      </div>
                                      <div id='ContinerInputSignin'>
                                        <input className='inputSignIn' type='text' placeholder=' (رقم الهاتف الثانوي (اختياري '
                                          onChange={(e) => { this.setState({ phone2: e.target.value }) }} />
                                      </div>
                                      <div id='ContinerInputSignin'>
                                        <input className='inputSignIn' type='password' placeholder='كلمة المرور'
                                          onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                      </div>
                                      <div id='ContinerInputSignin'>
                                        <div id='BTNlogin' onClick={(e) => {
                                          this.signUp(e)
                                          setState({ isShown: false })
                                        }}>انشاء حساب</div>
                                      </div>
                                    </form>
                                  </div>

                                </Dialog>

                                <div id='BTNSignUp_Nav' onClick={() => setState({ isShown: true })}>انشاء حساب</div>
                              </Pane>
                            )}
                          </Component>
                        </div>
                      ) : (
                          <div id='upAvatarContiner'>
                            <div id='AvatarContiner'>
                              <Avatir />
                            </div>
                          </div>
                        )}
                    </Nav>


                  </Navbar.Collapse>




                </Navbar>

              </div>

            )}

          </div>
        )
      }
      }
    </Context.Consumer>
    )
  }
}
export default Navb;

