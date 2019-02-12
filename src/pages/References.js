import React from 'react';
import { Route, Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Collapse from '@material-ui/core/Collapse';

import Icon from '@material-ui/core/Icon';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { stylesSidebarContent, displayMenu, ListMenu, ListMenuTitle, ListMenuDivider, ListItemMenu, ListItemTextMenu, ListItemIconMenu } from '../widgets/SideMenu';
import { TradingOverview, Faq, Fees, AutoDeleveraging, ExchangeGuide, FairPriceMarking, IsolatedMargin, Liquidation, MarginTermReference, OrderTypeFAQ, PnlGuide, RiskLimits, AboutUs, Affiliate, AffiliateToS, PrivacyPolicy, Security, Terms, TechnicalContact, WhatsDifferent, Support } from './referencesSection';

const menu1 = [
  {key:'0', label:'Overview (Start Here)', icon:'fas fa-check', to:'/app/tradingOverview', target:''},
  {key:'1', label:'FAQ', icon:'fas fa-quote-left', to:'/app/faq', target:''},
  {key:'2', label:'Fees', icon:'fab fa-btc', to:'/app/fees', target:''},
];

const menu2 = [
  {key:'0', label:'Auto-Deleveraging', icon:'fas fa-chart-area', to:'/app/autoDeleveraging', target:''},
  {key:'1', label:'Exchange Guide', icon:'fas fa-university', to:'/app/exchangeGuide', target:''},
  {key:'2', label:'Fair Price Marking', icon:'fa fa-edit', to:'/app/fairPriceMarking', target:''},
  {key:'3', label:'Isolated and Cross Margin', icon:'fas fa-chart-pie', to:'/app/isolatedMargin', target:''},
  {key:'4', label:'Liquidation', icon:'fas fa-exclamation-triangle', to:'/app/liquidation', target:''},
  {key:'5', label:'Margin Term Reference', icon:'far fa-file-alt', to:'/app/marginTermReference', target:''},
  {key:'6', label:'Order Type FAQ', icon:'fas fa-calculator', to:'/app/orderTypeFAQ', target:''},
  {key:'7', label:'Profit/Loss Guide', icon:'fab fa-btc', to:'/app/pnlGuide', target:''},
  {key:'8', label:'Risk Limits', icon:'fas fa-thumbtack', to:'/app/riskLimits', target:''},
];

const menuAdos = [
  {key:'0', label:'About The Team', icon:'', to:'/app/aboutUs', target:''},
  {key:'1', label:'Affilate Program', icon:'', to:'/app/affiliate', target:''},
  {key:'2', label:'Affilate Terms of Service', icon:'', to:'/app/affiliateToS', target:''},
  {key:'3', label:'Privacy Policy', icon:'', to:'/app/privacyPolicy', target:''},
  {key:'4', label:'Security', icon:'', to:'/app/security', target:''},
  {key:'5', label:'Terms of Service', icon:'', to:'/app/terms', target:''},
  {key:'6', label:'Technical Contact', icon:'', to:'/app/technicalContact', target:''},
];

const menu3 = [
  {key:'0', label:'Ados vs Competitors', icon:'fas fa-bullhorn', to:'/app/whatsDifferent', target:''},
  {key:'1', label:'Ados Blog', icon:'fas fa-pen', to:'//www.adoscompany.com', target:'_blank'},
  {key:'2', label:'Support', icon:'far fa-envelope', to:'/app/support', target:''},
];

class SideMenu extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      about: false,
    }
  }

  handleNestMenuClick = (evt, section) => {
    this.setState({[section]: !this.state[section]});
  }

  render(){
    const { pathname } = this.props;
    return(
      <div>
        <ListMenuTitle variant="subtitle2" gutterBottom>Basic</ListMenuTitle>
        <ListMenuDivider />
        <ListMenu component="nav" dense={true}>
          {displayMenu(menu1, pathname)}
        </ListMenu>

        <ListMenuTitle variant="subtitle2" gutterBottom>Margin Trading</ListMenuTitle>
        <ListMenuDivider />
        <ListMenu component="nav" dense={true}>
          {displayMenu(menu2, pathname)}
        </ListMenu>

        <ListMenuTitle variant="subtitle2" gutterBottom>About Ados</ListMenuTitle>
        <ListMenuDivider />
        <ListMenu component="nav" dense={true}>
          <ListItemMenu onClick={(evt) => this.handleNestMenuClick(evt, 'about')}>
            <ListItemIconMenu>
              {this.state.about ? <Icon fontSize="inherit" className="fas fa-caret-down"/> : <Icon fontSize="inherit" className="fas fa-caret-right"/>}
            </ListItemIconMenu>
            <ListItemTextMenu primary="About Ados" />
          </ListItemMenu>
          <Collapse in={this.state.about} timeout="auto" unmountOnExit>
            <ListMenu component="div" dense={true}>
              {displayMenu(menuAdos, pathname)}
            </ListMenu>
          </Collapse>
          {displayMenu(menu3, pathname)}
        </ListMenu>
      </div>
    );
  }
}

class References extends React.Component {
  render(){
    const { classes, location } = this.props;
    return (
      <div className={classes.root}>
        <NavBar availGuest={true} currentMenu="References"/>
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
  if(match.params.section === 'tradingOverview' ){
    return (<TradingOverview/>);
  } else if(match.params.section === 'faq' ){
    return (<Faq/>);
  } else if(match.params.section === 'fees' ){
    return (<Fees/>);
  } else if(match.params.section === 'autoDeleveraging' ){
    return (<AutoDeleveraging/>);
  } else if(match.params.section === 'exchangeGuide' ){
    return (<ExchangeGuide/>);
  } else if(match.params.section === 'fairPriceMarking' ){
    return (<FairPriceMarking/>);
  } else if(match.params.section === 'isolatedMargin' ){
    return (<IsolatedMargin/>);
  } else if(match.params.section === 'liquidation' ){
    return (<Liquidation/>);
  } else if(match.params.section === 'marginTermReference' ){
    return (<MarginTermReference/>);
  } else if(match.params.section === 'orderTypeFAQ' ){
    return (<OrderTypeFAQ/>);
  } else if(match.params.section === 'pnlGuide' ){
    return (<PnlGuide/>);
  } else if(match.params.section === 'riskLimits' ){
    return (<RiskLimits/>);
  } else if(match.params.section === 'aboutUs' ){
    return (<AboutUs/>);
  } else if(match.params.section === 'affiliate' ){
    return (<Affiliate/>);
  } else if(match.params.section === 'affiliateToS' ){
    return (<AffiliateToS/>);
  } else if(match.params.section === 'privacyPolicy' ){
    return (<PrivacyPolicy/>);
  } else if(match.params.section === 'security' ){
    return (<Security/>);
  } else if(match.params.section === 'terms' ){
    return (<Terms/>);
  } else if(match.params.section === 'technicalContact' ){
    return (<TechnicalContact/>);
  } else if(match.params.section === 'whatsDifferent' ){
    return (<WhatsDifferent/>);
  } else if(match.params.section === 'support' ){
    return (<Support/>);
  } else {
    return null;
  }
}

References.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(stylesSidebarContent)(withRouter(References));