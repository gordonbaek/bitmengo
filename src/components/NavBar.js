import React from 'react';
import PubSub from 'pubsub-js';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';

import Icon from '@material-ui/core/Icon';
import IconNotificationsActive from '@material-ui/icons/NotificationsActive';
import IconLanguage from '@material-ui/icons/Language';
import IconHelp from '@material-ui/icons/Help';
import IconArrowDropDown from '@material-ui/icons/ArrowDropDown';

import '../../node_modules/flag-icon-css/css/flag-icon.min.css';
import {EVT_LOCALE_SET} from '../data/trade.js';
import { UserService } from '../services/UserService';
import AdosPopover from '../widgets/AdosPopover';
import LocalePreferences from './LocalePreferences';
import SettingPreferences from './SettingPreferences';
import { FormattedRelative } from 'react-intl';

const styles = theme => ({
  root: {
  },
  navbar: {
      backgroundColor: theme.palette.ados.dark,
      color: theme.palette.common.white,
  },
  grow: {
    flexGrow: 1,
  },
  toolbarThick: {
    height: '64px',
    padding: 0,
    minHeight: '64px',
    '& $logo':{
      height: '48px',
    }
  },
  toolbarThin: {
    height: '42px',
    padding: 0,
    minHeight: '42px',
    '& $logo':{
      height: '28px',
    }
  },
  logo: {
    width: 'auto',
    margin: '0 8px',
  },
  menuButton: {
    [theme.breakpoints.only('xs')]:{
      fontSize: '0.6rem',
    },
    [theme.breakpoints.only('sm')]:{
      fontSize: '0.875rem',
    },
    [theme.breakpoints.between('md', 'xl')]:{
      fontSize: '1.0rem',
    }
  },
});

const menuStyle = theme => ({
  menuButton: {
    
  },
});

const MenuButton = withStyles( theme =>({
  root: {
    minWidth: 'inherit',
    color: theme.palette.common.white,
    [theme.breakpoints.only('xs')]:{
      fontSize: '0.7rem',
      minHeight: '24px',
      padding: '4px 8px',
    },
    [theme.breakpoints.only('sm')]:{
      fontSize: '0.875rem',
      minHeight: '24px',
      padding: '4px 8px',
    },
    [theme.breakpoints.between('md', 'xl')]:{
      fontSize: '1.0rem',
    }
  }
}))(withTheme()(Button));

class _TradeMenu extends React.Component{
  checkActive = menu => {
    const { currentMenu } = this.props;

    if(menu === currentMenu){
      return true;
    }
    return false;
  }
  content(){
    const { classes } = this.props;
    if(this.props.isLogin || this.props.availGuest){
      return(
        <div style={{flexGrow: 1}}>
          <MenuButton component={Link} to="/app/trade/XBTUSD" style={{fontWeight: this.checkActive('Trade') ? 'bold':'normal' }}>Trade</MenuButton>
          { this.props.isLogin ?
          <MenuButton component={Link} to="/app/wallet" style={{fontWeight: this.checkActive('Account') ? 'bold':'normal' }}>Account</MenuButton>
          :
          null
          }
          <MenuButton component={Link} to="/app/seriesGuide/XBT" style={{fontWeight: this.checkActive('Contracts') ? 'bold':'normal' }}>Contracts</MenuButton>
          <MenuButton component={Link} to="/app/tradingOverview" style={{fontWeight: this.checkActive('References') ? 'bold':'normal' }}>References</MenuButton>
          <MenuButton component={Link} to="/app/apiOverview" style={{fontWeight: this.checkActive('API') ? 'bold':'normal' }}>API</MenuButton>
          { !this.props.isLogin ?
          <MenuButton component={Link} to="/register">Register</MenuButton>
          :
          null
          }
          { !this.props.isLogin ?
          <MenuButton component={Link} to="/login">Login</MenuButton>
          :
          null
          }
        </div>
      );
    }

    return(
      <div style={{marginLeft: 'auto'}}>
      </div>
    );
  }

  render() {
    return this.content();
  }
}

class _UserMenu extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      popupSettingEl: null,
      popupLocaleEl: null,
    }
  }

  handelPopupSettingClick = event => {
    this.setState({popupSettingEl: event.currentTarget,});
  }

  handlePopupSettingClose = () => {
    this.setState({popupSettingEl: null,});
  }

  handelPopupLocaleClick = event => {
    this.setState({popupLocaleEl: event.currentTarget,});
  }

  handlePopupLocaleClose = () => {
    this.setState({popupLocaleEl: null,});
  }

  handleClickAwaySetting = () => {
    this.setState({popupSettingEl: null,});
  }

  handleLocaleClick = locale => {
    PubSub.publish(EVT_LOCALE_SET, locale);
    this.setState({popupLocaleEl: null,});
    UserService.setLocale(locale);
  }

  content(){
    const { popupSettingEl, popupLocaleEl } = this.state;
    const openSetting = Boolean(popupSettingEl);
    const openLocale = Boolean(popupLocaleEl);
    
    return(
      <div style={{display:'flex', marginLeft: 'auto'}}>
        { this.props.isLogin?
        <div >
          <span>TOTAL:0.0000 XBT</span><br/>
          <span>AVAIL:0.0000 XBT</span>
        </div>
        :
        null
        }

        { this.props.isLogin || this.props.availGuest ?
        <React.Fragment>
          <Button color="inherit" style={{minWidth: 0, padding: 8}}>
            <IconNotificationsActive/>
          </Button>
          <Button
            aria-owns={openLocale ? 'popoverLocale' : undefined}
            aria-haspopup="true"
            onClick={this.handelPopupLocaleClick}
            color="inherit" style={{minWidth: 0, padding: 8}}>
            <IconLanguage/>
          </Button>
          <Button color="inherit" style={{minWidth: 0, padding: 8}} component={Link} to="/app/support">
            <IconHelp/>
          </Button>
        </React.Fragment>
        :
        null
        }

        { this.props.isLogin || this.props.availGuest ?
        <Button
          aria-owns={openSetting ? 'popoverSetting' : undefined}
          aria-haspopup="true"
          onClick={this.handelPopupSettingClick}
          color="inherit" style={{minWidth: 0, padding: 8}}
        >
          { this.props.isLogin? UserService.getUser().userName : 'Guest' }
          <IconArrowDropDown/>
        </Button>
        :
        null
        }

        { !this.props.isLogin && !this.props.availGuest ?
        <React.Fragment>
          <Button onClick={() => this.handleLocaleClick('en')}><Icon className='flag-icon flag-icon-gb'/></Button>
          <Button onClick={() => this.handleLocaleClick('zh')}><Icon className='flag-icon flag-icon-cn'/></Button>
          <Button onClick={() => this.handleLocaleClick('ru')}><Icon className='flag-icon flag-icon-ru'/></Button>
          <Button onClick={() => this.handleLocaleClick('ko')}><Icon className='flag-icon flag-icon-kr'/></Button>
          <Button color="inherit" component={Link} to="/app/tradingOverview">About</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
        </React.Fragment>
        :
        null
        }
        
        <AdosPopover
          id="popoverSetting"
          open={openSetting}
          anchorEl={popupSettingEl}
          onClose={this.handlePopupSettingClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <SettingPreferences isLogin={this.props.isLogin} onClose={this.handlePopupSettingClose} onLogout={this.props.onLogout}/>
        </AdosPopover>

        <AdosPopover
          id="popoverLocale"
          open={openLocale}
          anchorEl={popupLocaleEl}
          onClose={this.handlePopupLocaleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <LocalePreferences isLogin={this.props.isLogin} onLocaleClick={this.handleLocaleClick}/>
        </AdosPopover>
          
      </div>
    );

  }

  render() {
    return this.content();
  }
}

_TradeMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};
const TradeMenu = withStyles(menuStyle)(_TradeMenu);

_UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};
const UserMenu = withStyles(menuStyle)(_UserMenu);

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  handleLogout() {
    UserService.logout();
    this.props.history.push('/');
  }

  render(){
    const { classes, currentMenu, availGuest } = this.props;
    return(
      <div className={classes.root}>
        <AppBar position="static" classes={{root:classes.navbar}}>
          <Toolbar classes={{root : (this.props.isLogin || this.props.availGuest)? classes.toolbarThin : classes.toolbarThick}}>
            <Link to="/"><img className={classes.logo} src={ require("../img/logo_small.png")}/></Link>
            <Typography variant="h6" color="inherit">
            </Typography>
            <TradeMenu isLogin={UserService.isLogin()} availGuest={this.props.availGuest} currentMenu={currentMenu}/>
            <UserMenu isLogin={UserService.isLogin()} onLogout={this.handleLogout} availGuest={this.props.availGuest}/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withTheme()(withRouter(NavBar)));