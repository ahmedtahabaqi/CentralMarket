import React, { Component } from 'react';
import Navb from './navb';
import Footer from './footer';
class ContactUs extends Component {
    render() {
        return (
            <div >
                <Navb />

                <div style={{
                    paddingBottom: '5%', paddingTop: '1%', width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexDirection: 'column',
                }}  >
                    <div style={{
                        marginTop: '2%', height: '150px', width: '85%', color: '#F8F9FA', borderRadius: '10px',
                        paddingRight: '50px', fontSize: '30px', fontWeight: '600', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', backgroundColor: "#E4BE6D",
                    }}  >
                        تواصل معنا
                    </div>
                    <div style={{
                        minHeight: '300px', width: '85%', backgroundColor: '#F8F9FA', borderRadius: '10px',
                        paddingTop: '2%', paddingBottom: '5%', paddingLeft: '10px', paddingRight: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                        fontSize: 18
                    }} >
                        <p style={{ fontWeight: 600 }}>للاستفسار او للمساعدة الفنية اتصل على</p>
                        <br />
                        <p>0781 000 6405</p>
                        <p>Central.marketiq@gmail.com</p>

                    </div>

                </div>
                <Footer />
            </div>
        );
    }
}

export default ContactUs;