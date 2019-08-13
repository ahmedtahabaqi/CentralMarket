import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import Context from './components/Context';
import './App.css';
import './assets/css/index'
// import Test from './components/common/pagenation';
import ScrollToTop from './components/common/scrolToTop';
import NotFound from './components/common/NotFound';
import GallFilterShow from './components/carGallery/gallFilterShow'
import CarFilter from './components/home/carFilter';
import TemporaryDrawer from './components/dashbord/slidebar';
import Home from './components/home/home';
import Carnumber from './components/carNumber/carnumber';
import CarGallery from './components/carGallery/CarGallery';
import GalleryContent from './components/carGallery/galleryContent';
import Transaction from './components/common/transaction';
import Motorcycles from './components/motor/motorcycles';
import Transactionm from './components/common/transactionm';
import SpareParts from './components/SpareParts/SpareParts';
import CarForReant from './components/carforReant/CarForReant';
import ImportedCars from './components/importedCars/ImportedCars';
import Profile from './components/common/profile';
import MyAds from './components/common/myAds';
import AboutUs from './components/common/aboutus';
import ContactUs from './components/common/ContactUs';
import Favorite from './components/common/Favorite';
import Add from './components/Add/Add';
import axios from 'axios';
import Cookies from "universal-cookie";
import host from './components/Host';
import SearchCar from './components/home/SearchCar';

const cookies = new Cookies();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Lang: 'iq',
      user: [],
      spin: true,
      admin: false,
      login: '',
      redirectError: true,
    }
  }
  componentDidMount() {
    var Lang = localStorage.getItem('Lang');
    var login = localStorage.getItem('login');

    this.setState({ Lang, login })
    if (cookies.get("token")) {
      var header = { "Content-Type": "application/json", token: cookies.get("token") };
      axios.get(host + `v1/user`, { headers: header })
        .then(response => {
          if (response.status === 200) {
            // console.log(response.data);

            this.setState({
              user: response.data,
              admin: response.data.admin,
              spin: false
            })
          }
        })

        .catch((error) => {
          this.setState({ redirectError: false })
          console.log('error ' + error)

        })
    } else {
      this.setState({ login: 'out' })
      localStorage.setItem('login', 'out');
    }

  }
  render() {
    return (<Context.Provider value={{
      value: this.state, action: {
        ChangeLanguage: (lang) => {
          localStorage.setItem('Lang', lang);
        },

      }
    }}>
      <div>

        <BrowserRouter>
          <ScrollToTop>
          <LastLocationProvider>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/carforsale' component={Home} />
              <Route path='/carfilter' component={CarFilter} />
              <Route path='/SearchCar' component={SearchCar} />
              <Route path='/cargalleries' component={CarGallery} />
              <Route path='/GallFilterShow' component={GallFilterShow} />
              <Route path='/gallerycontent/:id' component={GalleryContent} />
              <Route path='/transaction/:id' component={Transaction} />
              <Route path='/motorcycles' component={Motorcycles} />
              <Route path='/transactionm/:id' component={Transactionm} />
              <Route path='/carnumber' component={Carnumber} />
              <Route path='/SpareParts' component={SpareParts} />
              <Route path='/carforrent' component={CarForReant} />
              <Route path='/importedcars' component={ImportedCars} />
              <Route path='/add' component={Add} />
              <Route path='/profile' component={Profile} />
              <Route path='/myads' component={MyAds} />
              <Route path='/Favorite' component={Favorite} />
              <Route path='/AboutUs' component={AboutUs} />
              <Route path='/ContactUs' component={ContactUs} />
              <Route path='/admin' component={TemporaryDrawer} />
              <Route path='/table1' component={TemporaryDrawer} />
              <Route path='/table2' component={TemporaryDrawer} />
              <Route path='/table3' component={TemporaryDrawer} />
              <Route path='/table4' component={TemporaryDrawer} />
              <Route path='/table5' component={TemporaryDrawer} />
              <Route path='/table6' component={TemporaryDrawer} />
              <Route path='/table7' component={TemporaryDrawer} />
              <Route path='/table8' component={TemporaryDrawer} />
              <Route path='/NotFound' component={NotFound} />
              <Route exact={true} path='*' component={NotFound} />
            </Switch>
            </LastLocationProvider>
          </ScrollToTop>
        </BrowserRouter>


      </div>
    </Context.Provider>
    );
  }
}

export default App;


