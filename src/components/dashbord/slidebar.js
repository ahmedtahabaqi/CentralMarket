
import React from 'react';
import PropTypes from 'prop-types';
import Admin from './admin';
import Table1 from './table1';
import Table2 from './table2';
import Table3 from './table3';
import Table4 from './table4';
import Table5 from './table5';
import Table6 from './table6';
import Table7 from './table7';
import Table8 from './table8';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Context from '../Context';
// import Login from '../login/login';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import NotFound from '../common/NotFound';
import Lottie from 'lottie-react-web'
import animation from '../../assets/img/blue_car.json'
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  render() {
    const { classes, theme } = this.props;

    return (
      <Context.Consumer>
        {ctx => {
          if (ctx.value.admin) {
            return (
              <div className={classes.root} >

                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar} >
                  <Toolbar style={{ backgroundColor: '#0A3D62' }}>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={this.handleDrawerToggle}
                      className={classes.menuButton}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap id='logoHeader' >
                      <Link to='/'>
                        <img id='logoHeaderimg' src={require('../../assets/img/logo.png')} alt='img' />
                      </Link>
                    </Typography>
                  </Toolbar>
                </AppBar>

                <nav className={classes.drawer}>
                  {/* The implementation can be swapped with js to avoid SEO duplication of NavLinks. */}
                  <Hidden smUp implementation="css">
                    <Drawer
                      container={this.props.container}
                      variant="temporary"
                      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                      open={this.state.mobileOpen}
                      onClose={this.handleDrawerToggle}
                      classes={{
                        paper: classes.drawerPaper,
                      }}

                    >
                      <div id='sideBarBGC'>
                        <div id='sideBarBGC1'></div>
                        <div className={classes.toolbar} />
                        <Link to='/admin'>
                          <List>
                            <ListItem button >
                              <ListItemText><span id='spanINdashBord' >الاعدادات</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table1'>
                          <List>
                            <ListItem button>
                              <ListItemText ><span id='spanINdashBord' >سيارات للبيع</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table2'>
                          <List>
                            <ListItem button>
                              <ListItemText ><span id='spanINdashBord' >معارض السيارات</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table3'>
                          <List>
                            <ListItem button>
                              <ListItemText ><span id='spanINdashBord' >سيارات مستورده</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table4'>
                          <List>
                            <ListItem button>
                              <ListItemText><span id='spanINdashBord' >سيارات للايجار</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table5'>
                          <List>
                            <ListItem button>
                              <ListItemText><span id='spanINdashBord' >دراجات نارية</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table6'>
                          <List>
                            <ListItem button>
                              <ListItemText><span id='spanINdashBord' >قطع غيار</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table7'>
                          <List>
                            <ListItem button>
                              <ListItemText><span id='spanINdashBord' >ارقام السيارات</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table8'>
                          <List>
                            <ListItem button>
                              <ListItemText><span id='spanINdashBord' >اعلانات</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                      </div>
                    </Drawer>
                  </Hidden>
                  <Hidden xsDown implementation="css">
                    <Drawer
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                      variant="permanent"
                      open
                    >
                      <div id='sideBarBGC'>
                        <div id='sideBarBGC1'></div>
                        <div className={classes.toolbar} />

                        <Link to='/admin'>
                          <List>
                            <ListItem button >
                              <ListItemText><span id='spanINdashBord' >الاعدادات</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table1'>
                          <List>
                            <ListItem button>
                              <ListItemText ><span id='spanINdashBord' >سيارات للبيع</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table2'>
                          <List>
                            <ListItem button>
                              <ListItemText ><span id='spanINdashBord' >معارض السيارات</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table3'>
                          <List>
                            <ListItem button>
                              <ListItemText ><span id='spanINdashBord' >سيارات مستورده</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table4'>
                          <List>
                            <ListItem button>
                              <ListItemText><span id='spanINdashBord' >سيارات للايجار</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table5'>
                          <List>
                            <ListItem button>
                              <ListItemText><span id='spanINdashBord' >دراجات نارية</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table6'>
                          <List>
                            <ListItem button>
                              <ListItemText><span id='spanINdashBord' >قطع غيار</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table7'>
                          <List>
                            <ListItem button>
                              <ListItemText><span id='spanINdashBord' >ارقام السيارات</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table8'>
                          <List>
                            <ListItem button>
                              <ListItemText><span id='spanINdashBord' >اعلانات</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                      </div>
                    </Drawer>
                  </Hidden>

                </nav>

                <main className={classes.content}>

                  <div className={classes.toolbar} />
                  {renderPage(this.props)}
                </main>
              </div>
            )
          }
          else if(ctx.value.admin===null||ctx.value.redirectError===false){
            return( <NotFound />)
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

        }}
      </Context.Consumer>
    )
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};
const renderPage = (props) => {
  if (props.match.path === '/admin') {
    return (<Admin />)
  }
  else if (props.match.path === '/table1') {
    return (<Table1 />)
  }
  else if (props.match.path === '/table2') {
    return (<Table2 />)
  }
  else if (props.match.path === '/table3') {
    return (<Table3 />)
  }
  else if (props.match.path === '/table4') {
    return (<Table4 />)
  }
  else if (props.match.path === '/table5') {
    return (<Table5 />)
  }
  else if (props.match.path === '/table6') {
    return (<Table6 />)
  }
  else if (props.match.path === '/table7') {
    return (<Table7 />)
  }
  else if (props.match.path === '/table8') {
    return (<Table8 />)
  }
}
export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);



