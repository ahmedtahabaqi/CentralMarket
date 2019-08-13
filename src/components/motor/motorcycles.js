import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Category from '../common/category';
import { Tooltip, Icon } from 'evergreen-ui';
import Navb from '../common/navb';
import Footer from '../common/footer';
import Lottie from 'lottie-react-web'
import animation from '../../assets/img/blue_car.json'
import axios from 'axios';
import host from '../Host';

class Motorcycles extends Component {
  constructor() {
    super();
    this.state = {
      motors: [],
      spin: true,
    }
  }

  componentDidMount() {
    axios.get(host + `v1/motors`, { headers: {} })
      .then(response => {
        // console.log(response.data.data);
        this.setState({ motors: response.data.data.reverse(), spin: false })
      })
      .catch((error) => {
        this.setState({ redirectError: false })
        console.log('error ' + error)
      })
  }
  render() {

    if (!this.state.spin) {
      return (
        <div>
          <Navb />

          <Category />
          <div id='marginup'>
            <Row style={{ margin: 0, padding: 0 }}>
              {this.state.motors.map(motor =>
                <Col key={motor.id} sm={12} md={6} xl={4} >
                  <div id='firstCardContiner'>
                    <div id='MainCardContiner'>
                      <div id='priceCardContiner'>
                        <span>{motor.price}</span>
                        <img width={14} style={{ marginLeft: 10 }} src={require('../../assets/img/dolir.png')} alt='img' />
                      </div>
                      <div id='opacityPrice' />
                      <Link to={'/transactionm/' + motor.id}>
                        <div id='carCardContiner'>
                          <img width={375} height={234} src={host + motor.image + '.png'} alt='img' />
                        </div>
                      </Link>
                      <div id='carCardContiner1' />
                      <div id='carCardContiner2'>
                        <div>
                          <img width={30} src={require('../../assets/img/carBlackCard.png')} alt='img' />
                          <span style={{ marginLeft: 10 }}>{motor.miles}</span>
                        </div>
                        <div>
                          <img width={20} src={require('../../assets/img/history.png')} alt='img' />
                          <span style={{ marginLeft: 10 }}>{motor.year}</span>
                        </div>
                      </div>
                      <div id='carCardContiner3'>
                        <div>
                          <Tooltip content={motor.phone}>
                            <Icon icon="phone" color="success" size={20} marginLeft={10} />
                          </Tooltip>
                        </div>
                        <Link to={'/transactionm/' + motor.id}>
                          <div style={{ cursor: 'pointer', color: '#000' }}>
                            <span>{motor.title}</span>
                          </div>
                        </Link>
                      </div>
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
export default Motorcycles;

