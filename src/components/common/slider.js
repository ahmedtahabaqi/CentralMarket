import React, { Component } from "react";
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import host from '../Host';
class Slider extends Component {
  constructor() {
    super();
    this.state = {
      banner: [],
    }
  }
  componentDidMount() {
    axios.get(host + `v1/banners`, { headers: {} })
      .then(response => {
        // console.log(response.data);
       
        // if (response.data.user.name=="Guest") {
        //   localStorage.setItem('login', 'out');
          
        // }
        if (response.status === 200) {
          this.setState({
            banner: response.data.data.reverse(),
          })
        }
      })
      .catch((error) => { console.log('error ' + error) })

  }
  render() {

    return (
      <div style={{ width: '100%', height: 'auto' }}>
        <Carousel>

          <Carousel.Item>
            <img src={require('../../assets/img/ms.jpg')} style={{ width: '100%', height: '35vw' }} alt='img' />
            <Carousel.Caption>

            </Carousel.Caption>
          </Carousel.Item>
          {this.state.banner.map(bann =>
            <Carousel.Item key={bann.id}>
              <Link to={'/gallerycontent/' + bann.storeId}>
                <img src={host + bann.image + '.png'} style={{ width: '100%', height: '35vw' }} alt='img' />
              </Link>
              <Carousel.Caption>
                <h3>{bann.state}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          )}


        </Carousel>

      </div>
    );
  }
}
export default Slider;