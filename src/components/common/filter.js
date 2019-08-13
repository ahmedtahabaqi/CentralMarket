import React from "react";
import Context from '../Context';
import Component from "@reactions/component";
import { Dialog, Pane } from 'evergreen-ui';
import { Row, Col, Form } from 'react-bootstrap';
// import Select from './selectSearch';
import Select from 'react-select';
import Car from './cars.json';
import State from '../common/state.json';

const city = State;
const brand = Car;
class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      TypeCarSelect: '',
      ModleCarSelect: '',
      ImportingSelect: '',
      YearSelect: '',
      MillSelect: '',
      MinpriceCar: '',
      MaxpriceCar: '',
      Cityinput: '',
      redirectFilter:true,
    }
  }
  brandFun() {
    var arr = [{ value: 'Brand', label: 'Brand' }];
    for (let i = 0; i < brand.length; i++) {
      arr.push(
        { value: brand[i].name, label: brand[i].name }
      )
    }
    return arr
  }
  classFun() {
    var TypeCarSelect = this.state.TypeCarSelect
    var arr = [{ value: 'Class', label: 'Class' }];
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
    var arr = [{ value: 'State', label: 'State' }];
    for (let i = 0; i < city.length; i++) {
      arr.push(
        { value: city[i].name, label: city[i].name }
      )
    }
    return arr
  }
  brandFunAr() {
    var arr = [{ value: 'صنف السيارة', label: 'صنف السيارة' }];
    for (let i = 0; i < brand.length; i++) {
      arr.push(
        { value: brand[i].name, label: brand[i].name }
      )
    }
    return arr
  }
  classFunAr() {
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
  CityFunAr() {
    var arr = [{ value: 'المحافظة', label: 'المحافظة' }];
    for (let i = 0; i < city.length; i++) {
      arr.push(
        { value: city[i].name, label: city[i].name }
      )
    }
    return arr
  }
  render() {
    const { TypeCarSelect, ModleCarSelect, ImportingSelect, YearSelect, MillSelect, Cityinput, MinpriceCar, MaxpriceCar } = this.state;
    return (<Context.Consumer>
      {ctx => {
        return (
          <div>
            {ctx.value.Lang === 'en' ? (

              <div id="filterContiner" >

                <Component initialState={{ isShown: false }}>
                  {({ state, setState }) => (
                    <Pane>
                      <Dialog
                        isShown={state.isShown}
                        title="Advance Search"
                        onCloseComplete={() => setState({ isShown: false })}
                        confirmLabel="Search"
                        cancelLabel='cancel'
                        onConfirm={() => {
                          setState({ isShown: false })
                          window.location.href=`/carfilter?TypeCarSelect=${TypeCarSelect}&ModleCarSelect=${ModleCarSelect}&ImportingSelect=${ImportingSelect}&YearSelect=${YearSelect}&MillSelect=${MillSelect}&Cityinput=${Cityinput}&MinpriceCar=${MinpriceCar}&MaxpriceCar=${MaxpriceCar}`
                       
                       }}>
                        <div>
                          <Row>
                            <Col md={12} lg={6}>
                              <div id='InputTExtDash'>
                                <Select
                                  onChange={(e) => {
                                    if (e.value !== 'Brand') {
                                      this.setState({ TypeCarSelect: e.value })
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
                                    if (e.value !== 'Class') {
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
                                      this.setState({ YearSelect: even.target.value })
                                    }
                                  }}>
                                  <option value="Select">Year</option>

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
                                      this.setState({ ImportingSelect: even.target.value })
                                    }
                                  }}>
                                  <option value="Select">imported</option>

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
                                  <option value="Select">Mileage</option>

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
                              <div id='InputTExtDash'>
                                <Select
                                  onChange={(e) => {
                                    if (e.value !== 'State') {
                                      this.setState({ Cityinput: e.value })
                                      console.log(e.value);
                                    }
                                  }}
                                  defaultValue={this.CityFun()[0]}
                                  options={this.CityFun()}
                                />
                              </div>
                            </Col>
                            <Col md={12} lg={6}>
                              <input autoComplete='off' type='number' placeholder='Minimum Price' id='InputTExtDash1'
                                onChange={(e) => this.setState({ MinpriceCar: e.target.value })} />
                            </Col>
                            <Col md={12} lg={6}>
                              <input autoComplete='off' type='number' placeholder='Maximum Price' id='InputTExtDash1'
                                onChange={(e) => this.setState({ MaxpriceCar: e.target.value })} />
                            </Col>
                          </Row>
                        </div>
                      </Dialog>
                      <div id='filterBTN' onClick={() => setState({ isShown: true })}>
                        Advance Search
                  </div>
                    </Pane>
                  )}
                </Component>

                <div>
                  <span><img width={40}  style={{cursor:'pointer'}}  src={require('../../assets/img/en.png')} alt='en' onClick={() => {
                    ctx.action.ChangeLanguage('en')
                    window.location.reload()
                  }} /></span>
                  <span><img width={40}  style={{cursor:'pointer'}}  src={require('../../assets/img/iq.png')} alt='iq' onClick={() => {
                    ctx.action.ChangeLanguage('iq')
                    window.location.reload()
                  }} /></span>
                </div>

              </div >
            ) : (
              <div id="filterContinerAr" >

              <Component initialState={{ isShown: false }}>
                {({ state, setState }) => (
                  <Pane>
                    <Dialog
                      isShown={state.isShown}
                      title="بحث متقدم"
                      onCloseComplete={() => setState({ isShown: false })}
                      confirmLabel="بحث"
                      cancelLabel='الغاء'
                      onConfirm={() => {
                        setState({ isShown: false })
                        window.location.href=`/carfilter?TypeCarSelect=${TypeCarSelect}&ModleCarSelect=${ModleCarSelect}&ImportingSelect=${ImportingSelect}&YearSelect=${YearSelect}&MillSelect=${MillSelect}&Cityinput=${Cityinput}&MinpriceCar=${MinpriceCar}&MaxpriceCar=${MaxpriceCar}`
                       
                    }}>
                      <div style={{direction:'rtl'}}>
                        <Row>
                          <Col md={12} lg={6}>
                            <div id='InputTExtDash'>
                              <Select
                                onChange={(e) => {
                                  if (e.value !== 'صنف السيارة') {
                                    this.setState({ TypeCarSelect: e.value })
                                  }
                                }}
                                defaultValue={this.brandFunAr()[0]}
                                options={this.brandFunAr()}
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
                                defaultValue={this.classFunAr()[0]}
                                options={this.classFunAr()}
                              />
                            </div>

                          </Col>
                        </Row>
                        <Row>
                          <Col md={12} lg={6}>
                            <Form.Group style={{ direction: 'rtl' }} >
                              <Form.Control as="select" id='InputTExtDash'
                                onChange={(even) => {
                                  if (even.target.value !== 'سنه الصنع') {
                                    this.setState({ YearSelect: even.target.value })
                                  }
                                }}>
                                <option value="سنه الصنع">سنه الصنع</option>

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
                                  if (even.target.value !== 'مصدر السيارة') {
                                    this.setState({ ImportingSelect: even.target.value })
                                  }
                                }}>
                                <option value="مصدر السيارة">مصدر السيارة"</option>

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
                                  if (even.target.value !== 'المسافة المقطوعة') {
                                    this.setState({ MillSelect: even.target.value })
                                  }
                                }}>
                                <option value="المسافة المقطوعة">المسافة المقطوعة</option>

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
                            <div id='InputTExtDash'>
                              <Select
                                onChange={(e) => {
                                  if (e.value !== 'المحافظة') {
                                    this.setState({ Cityinput: e.value })
                                    console.log(e.value);
                                  }
                                }}
                                defaultValue={this.CityFunAr()[0]}
                                options={this.CityFunAr()}
                              />
                            </div>
                          </Col>
                          <Col md={12} lg={6}>
                            <input autoComplete='off' type='number' placeholder='اقل سعر ' id='InputTExtDash1'
                              onChange={(e) => this.setState({ MinpriceCar: e.target.value })} />
                          </Col>
                          <Col md={12} lg={6}>
                            <input autoComplete='off' type='number' placeholder='اعلى سعر' id='InputTExtDash1'
                              onChange={(e) => this.setState({ MaxpriceCar: e.target.value })} />
                          </Col>
                        </Row>
                      </div>
                    </Dialog>
                    <div id='filterBTN' onClick={() => setState({ isShown: true })}>
                      بحث متقدم
                </div>
                  </Pane>
                )}
              </Component>

              <div>
                <span><img width={40} style={{cursor:'pointer'}} src={require('../../assets/img/en.png')} alt='en' onClick={() => {
                  ctx.action.ChangeLanguage('en')
                  window.location.reload()
                }} /></span>
                <span><img width={40}  style={{cursor:'pointer'}}  src={require('../../assets/img/iq.png')} alt='iq' onClick={() => {
                  ctx.action.ChangeLanguage('iq')
                  window.location.reload()
                }} /></span>
              </div>

            </div >
            )}
          </div>
        )
      }
      }
    </Context.Consumer>

    );
  }
}
export default Filter;

