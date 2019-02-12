import React from 'react';
import { Route, Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Collapse from '@material-ui/core/Collapse';

import Icon from '@material-ui/core/Icon';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { stylesSidebarContent, displayMenu, ListMenu, ListMenuTitle, ListMenuDivider, ListItemMenu, ListItemTextMenu, ListItemIconMenu } from '../widgets/SideMenu';
import { FundingHistory, InsuranceFund, SettlementHistory, Leaderboard, FuturesGuide, PerpetualContractsGuide, UpsGuide, DownsGuide, SeriesGuide, Contract, Idx } from './contractsSection';

const menu1 = [
  {key:'0', label:'Funding History', icon:'fas fa-university', to:'/app/fundingHistory', target:''},
  {key:'1', label:'Insurance Fund', icon:'fab fa-btc', to:'/app/insuranceFund', target:''},
  {key:'2', label:'Settlement History', icon:'far fa-file-alt', to:'/app/settlementHistory', target:''},
  {key:'3', label:'Leaderboard', icon:'fas fa-bullhorn', to:'/app/leaderboard', target:''},
];

const menu2 = [
  {key:'0', label:'Future Guide', icon:'fas fa-chart-area', to:'/app/futuresGuide', target:''},
  {key:'1', label:'Perpetual Contracts Guide', icon:'fas fa-chart-line', to:'/app/perpetualContractsGuide', target:''},
  {key:'2', label:'Upside Profit Contracts Guide', icon:'fas fa-arrow-up', to:'/app/upsGuide', target:''},
  {key:'3', label:'Downside Profit Contracts Guide', icon:'fas fa-arrow-down', to:'/app/downsGuide', target:''},
];

class SideMenu extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      contractsXBT: false,
      indicesXBT: false,
    }
  }

  handleNestMenuClick = (evt, section, coin) => {
    this.setState({[section + coin]: !this.state[section + coin]});
  }

  render(){
    const { pathname } = this.props;
    return(
      <div>
        <ListMenuTitle variant="subtitle2" gutterBottom>Historical Data</ListMenuTitle>
        <ListMenuDivider />
        <ListMenu component="nav" dense={true}>
          {displayMenu(menu1, pathname)}
        </ListMenu>

        <ListMenuTitle variant="subtitle2" gutterBottom>Contract Guides</ListMenuTitle>
        <ListMenuDivider />
        <ListMenu component="nav" dense={true}>
          {displayMenu(menu2, pathname)}
        </ListMenu>

        <ListMenuTitle variant="subtitle2" gutterBottom>Contracts</ListMenuTitle>
        <ListMenuDivider />
        <ListMenu component="nav" dense={true}>
          <ListItemMenu onClick={(evt) => this.handleNestMenuClick(evt, 'contracts', 'XBT')}>
            <ListItemIconMenu>
              {this.state.contractsXBT ? <Icon fontSize="small" className="fas fa-caret-down"/> : <Icon fontSize="small" className="fas fa-caret-right"/>}
            </ListItemIconMenu>
            <ListItemTextMenu primary="XBT(XBT)" />
          </ListItemMenu>
          <Collapse in={this.state.contractsXBT} timeout="auto" unmountOnExit>
            <ListMenu component="div" dense={true}>
              <ListItemMenu component={Link} to="/app/seriesGuide/XBT">
                <ListItemTextMenu primary="XBT Series(XBT) Guide" />
              </ListItemMenu>
              <ListItemMenu component={Link} to="/app/contract/XBTUSD">
                <ListItemTextMenu primary="XBTUSD" />
              </ListItemMenu>
            </ListMenu>
          </Collapse>
        </ListMenu>

        <ListMenuTitle variant="subtitle2" gutterBottom>Indices</ListMenuTitle>
        <ListMenuDivider />
        <ListMenu component="nav" dense={true}>
          <ListItemMenu onClick={(evt) => this.handleNestMenuClick(evt, 'indices', 'XBT')}>
            <ListItemIconMenu>
              {this.state.indicesXBT ? <Icon fontSize="small" className="fas fa-caret-down"/> : <Icon fontSize="small" className="fas fa-caret-right"/>}
            </ListItemIconMenu>
            <ListItemTextMenu primary="XBT(XBT)" />
          </ListItemMenu>
          <Collapse in={this.state.indicesXBT} timeout="auto" unmountOnExit>
            <ListMenu component="div" dense={true}>
              <ListItemMenu component={Link} to="/app/index/.BXBT">
                <ListItemTextMenu primary=".BXBT" />
              </ListItemMenu>
            </ListMenu>
          </Collapse>
        </ListMenu>
      </div>
    );
  }
}


class Contracts extends React.Component {
  render() {
    const { classes, location } = this.props;
    return (
      <div className={classes.root}>
        <NavBar availGuest={true} currentMenu="Contracts"/>



          <div className={classes.container}>
          
            <div className={classes.sideBar}>
              <SideMenu pathname={location.pathname}/>
            </div>
            <div className={classes.content}>
              <Route path="/app/:section" component={CompoentWithMatch}/>
              <Route path="/app/:section/:coin" component={CompoentWithMatchCoin}/>
            </div>
          </div>  


        <Footer/>
      </div>
    );
  }
};

function CompoentWithMatch({match}){
  if(match.params.section === 'fundingHistory' ){
    return (<FundingHistory/>);
  } else if(match.params.section === 'insuranceFund' ){
    return (<InsuranceFund/>);
  } else if(match.params.section === 'settlementHistory' ){
    return (<SettlementHistory/>);
  } else if(match.params.section === 'leaderboard' ){
    return (<Leaderboard/>);
  } else if(match.params.section === 'futuresGuide' ){
    return (<FuturesGuide/>);
  } else if(match.params.section === 'perpetualContractsGuide' ){
    return (<PerpetualContractsGuide/>);
  } else if(match.params.section === 'upsGuide' ){
    return (<UpsGuide/>);
  } else if(match.params.section === 'downsGuide' ){
    return (<DownsGuide/>);
  } else {
    return null;
  }
}

function CompoentWithMatchCoin({match}){
  let coin = match.params.coin;
  if(coin === null || coin === undefined || coin ===''){
    coin = 'XBT';
  }
  if(match.params.section === 'seriesGuide' ){
    return (<SeriesGuide coin={coin}/>);
  } else if(match.params.section === 'contract' ){
    return (<Contract coin={coin}/>);
  } else if(match.params.section === 'index' ){
    return (<Idx coin={coin}/>);
  } else {
    return null;
  }
}

Contracts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(stylesSidebarContent)(withRouter(Contracts));