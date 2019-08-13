import React from "react";
import { Row, Col } from "react-bootstrap";
import Context from '../Context';
import Filter from '../common/filter';
import Category from '../common/category'
import Slider from '../common/slider';
import { Link, Redirect } from 'react-router-dom';
import Navb from '../common/navb';
import Footer from '../common/footer';
import { Tooltip, Icon } from 'evergreen-ui';
import axios from 'axios';
import host from '../Host';
import Lottie from 'lottie-react-web'
import animation from '../../assets/img/blue_car.json'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      car: [],
      car1: [],
      spin: true,
      redirectError: true,
      TypeCarSelect: '',
      ModleCarSelect: '',
      ImportingSelect: '',
      YearSelect: '',
      MillSelect: '',
      priceCar: '',
      colorFav: '#999999',

    }
  }
  componentDidMount() {
    axios.get(host + `v1/cars`, { headers: {} })
      .then(response => {
        this.setState({ car: response.data.data.reverse(), spin: false })
      })
      .catch((error) => {
        this.setState({ redirectError: false })
        console.log('error ' + error)
      })
  }

  render() {
    return (
      <Context.Consumer>
        {ctx => {
          if (!this.state.redirectError) {
            return <Redirect to='/NotFound' />
          }
          if (this.state.spin === false) {

            return (
              <div>
                <Navb />
                <Category />
                <Filter />
                <Slider />
                <div id='marginup'>
                  <Row style={{ margin: 0, padding: 0 }}>
                    {this.state.car.map((ca, i) =>
                      <Col key={i} sm={12} md={6} xl={4} >
                        <div id='firstCardContiner'>
                          <div id='MainCardContiner'>

                            <div id='priceCardContiner'>
                              <span>{ca.price}</span>
                              <img width={14} style={{ marginLeft: 10 }} src={require('../../assets/img/dolir.png')} alt='img' />
                            </div>

                            <div id='opacityPrice' />
                            <Link to={'/transaction/' + ca.id}>
                              <div id='carCardContiner'>
                                <img width={375} height={234} src={host + ca.image + '.png'} alt='img' />
                              </div>
                            </Link>
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
                              <Link to={'/transaction/' + ca.id}>
                                <div style={{ cursor: 'pointer', color: '#000' }}>
                                  <span>{ca.title}</span>
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
      </Context.Consumer>
    )
  }
}

export default Home;

