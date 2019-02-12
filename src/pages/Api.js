import React from 'react';
import { Route, Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

import Icon from '@material-ui/core/Icon';

import { UserService } from '../services/UserService';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { stylesSidebarContent, displayMenu, ListMenu, ListMenuTitle, ListMenuDivider, ListItemMenu, ListItemTextMenu, ListItemIconMenu } from '../widgets/SideMenu';
import { ApiOverview, ApiChangelog, RestAPI, RestAPIMessages, WsAPI, ApiKeysUsage, AutomatedTradingEngines, Charting } from './apiSection';

const menu1 = [
  {key:'0', label:'Overview', icon:'fas fa-bars', to:'/app/apiOverview', target:''},
  {key:'1', label:'Changelog', icon:'fab fa-btc', to:'/app/apiChangelog', target:''},
  {key:'2', label:'API RSS Feed', icon:'fas fa-bullhorn', to:'//www.adoscompany.com', target:'_blank'},
];

const menu2 = [
  {key:'0', label:'REST API', icon:'fas fa-download', to:'/app/restAPI', target:''},
  {key:'1', label:'REST API MESSAGE Format', icon:'fas fa-list-ul', to:'/app/restAPIMessages', target:''},
  {key:'2', label:'Interactive REST API Explorer', icon:'fas fa-desktop', to:'/api/explorer', target:'_blank'},
  {key:'3', label:'WebSocket API', icon:'fas fa-bolt', to:'/app/wsAPI', target:''},
];

const menu3 = [
  {key:'0', label:'Automated Trading', icon:'fas fa-calculator', to:'/app/automatedTradingEngines', target:''},
  {key:'1', label:'Charting', icon:'fas fa-chart-line', to:'/app/charting', target:''},
];

const menu4 = [
  {key:'0', label:'Careers at Ados', icon:'fas fa-pen', to:'//www.adoscompany.com', target:'_blank'},
  {key:'1', label:'Ados Testnet', icon:'fas fa-sign-out-alt', to:'//www.adoscompany.com', target:'_blank'},
];

class SideMenu extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    const { pathname } = this.props;
    return(
      <div>
        <ListMenuTitle variant="subtitle2" gutterBottom>Documentation</ListMenuTitle>
        <ListMenuDivider />
        <ListMenu component="nav" dense={true}>
          {displayMenu(menu1, pathname)}
        </ListMenu>

        <ListMenuTitle variant="subtitle2" gutterBottom>Using the Ados API</ListMenuTitle>
        <ListMenuDivider />
        <ListMenu component="nav" dense={true}>
          {displayMenu(menu2, pathname)}
        </ListMenu>

        <ListMenuTitle variant="subtitle2" gutterBottom>API Keys</ListMenuTitle>
        <ListMenuDivider />
        <ListMenu component="nav" dense={true}>
          {UserService.isLogin() ?
          <ListItemMenu button component={Link} to="/app/apiKeys">
            <ListItemTextMenu primary="API Key Management" />
            <ListItemIconMenu><Icon fontSize="inherit" className={classNames('fas fa-lock')}/></ListItemIconMenu>
          </ListItemMenu>
          :
          null
          }
          <ListItemMenu component={Link} to="/app/apiKeysUsage">
            <ListItemTextMenu primary="Using API Keys" />
            <ListItemIconMenu><Icon fontSize="inherit" className={classNames('fas fa-question')}/></ListItemIconMenu>
          </ListItemMenu>
        </ListMenu>

        <ListMenuTitle variant="subtitle2" gutterBottom>Companies Using Ados</ListMenuTitle>
        <ListMenuDivider />
        <ListMenu component="nav" dense={true}>
          {displayMenu(menu3, pathname)}
        </ListMenu>

        <ListMenuTitle variant="subtitle2" gutterBottom>Links</ListMenuTitle>
        <ListMenuDivider />
        <ListMenu component="nav" dense={true}>
          {displayMenu(menu4, pathname)}
        </ListMenu>

      </div>
    );
  }
}

class Api extends React.Component {
  render() {
    const { classes, location } = this.props;
    return (
      <div className={classes.root}>
        <NavBar availGuest={true} currentMenu="API"/>
        <div className={classes.container}>
          <div className={classes.sideBar}>
            <SideMenu pathname={location.pathname}/>
          </div>
          <div className={classes.content}>
            <Route path="/app/:section" component={CompoentWithMatch}/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
};

function CompoentWithMatch({match}){
  if(match.params.section === 'apiOverview' ){
    return (<ApiOverview/>);
  } else if(match.params.section === 'apiChangelog' ){
    return (<ApiChangelog/>);
  } else if(match.params.section === 'restAPI' ){
    return (<RestAPI/>);
  } else if(match.params.section === 'restAPIMessages' ){
    return (<RestAPIMessages/>);
  } else if(match.params.section === 'wsAPI' ){
    return (<WsAPI/>);
  } else if(match.params.section === 'apiKeysUsage' ){
    return (<ApiKeysUsage/>);
  } else if(match.params.section === 'automatedTradingEngines' ){
    return (<AutomatedTradingEngines/>);
  } else if(match.params.section === 'charting' ){
    return (<Charting/>);
  } else {
    return null;
  }
}

Api.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(stylesSidebarContent)(withRouter(Api));
