import React from "react";
import Context from '../Context';
import Component from "@reactions/component";
import { Dialog, Pane } from 'evergreen-ui';
import Select from 'react-select';
import State from '../common/state.json';

const city = State;

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
            Cityinput: ''
        }
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
                                                    window.location.href=`http://localhost:3000/GallFilterShow?Cityinput=${this.state.Cityinput}`
                                                }}>
                                                    <div style={{minHeight: 150}}>
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
                                                </div>
                                            </Dialog>
                                            <div id='filterBTN' onClick={() => setState({ isShown: true })}>
                                                Advance Search
                                            </div>
                                        </Pane>
                                    )}
                                </Component>

                                <div>
                                    <span><img width={40} style={{ cursor: 'pointer' }} src={require('../../assets/img/en.png')} alt='en' onClick={() => {
                                        ctx.action.ChangeLanguage('en')
                                        window.location.reload()
                                    }} /></span>
                                    <span><img width={40} style={{ cursor: 'pointer' }} src={require('../../assets/img/iq.png')} alt='iq' onClick={() => {
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
                                                        window.location.href=`http://localhost:3000/GallFilterShow?Cityinput=${this.state.Cityinput}`
                                                    }}>
                                                    <div style={{ direction: 'rtl',minHeight:150 }}>

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
                                                    </div>
                                                </Dialog>
                                                <div id='filterBTN' onClick={() => setState({ isShown: true })}>
                                                    بحث متقدم
                                                </div>
                                            </Pane>
                                        )}
                                    </Component>

                                    <div>
                                        <span><img width={40} style={{ cursor: 'pointer' }} src={require('../../assets/img/en.png')} alt='en' onClick={() => {
                                            ctx.action.ChangeLanguage('en')
                                            window.location.reload()
                                        }} /></span>
                                        <span><img width={40} style={{ cursor: 'pointer' }} src={require('../../assets/img/iq.png')} alt='iq' onClick={() => {
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

