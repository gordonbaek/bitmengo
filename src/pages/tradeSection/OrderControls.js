import React from 'react';
import PubSub from 'pubsub-js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Icon from '@material-ui/core/Icon';
import IconExpandMore from '@material-ui/icons/ExpandMore';

import {Coin, EVT_COIN_SET} from '../../data/trade.js';

import { AdosExpansionPanel, AdosExpansionPanelSummary, AdosPanelHeaderActions, AdosExpansionPanelDetails } from '../../widgets/AdosExpansionPanel';
import PlaceOrder from './_PlaceOrder';
import YourPosition from './_YourPosition';
import ContractDetails from './_ContractDetails';
import LoginRequired from '../../components/LoginRequired';

const styles = theme => ({
  root: {
    flex: 1,
    color: theme.palette.type === 'light' ? theme.palette.common.black:theme.palette.common.white,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.type === 'light' ? theme.palette.common.black:theme.palette.common.white,
  },
  expandIcon: {
    color: theme.palette.type === 'light' ? theme.palette.common.black:theme.palette.common.white,
  },
  darkBox: {
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  loginTab: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    backgroundColor: 'rgba(50,50,50,.75)',
  }
});
  
class OrderControls extends React.Component {
  constructor(props){
    super(props);
    /*
    this.state = {
      coin: Coin,
    };
    this.handleSubscribe = this.handleSubscribe.bind(this);
    */
  }

  /*
  componentDidMount(){
    this.token = PubSub.subscribe(EVT_COIN_SET, this.handleSubscribe);
  }
  componentWillUnmount(){
    PubSub.unsubscribe(this.token);
  }
  handleSubscribe(msg, data){
    this.setState({coin : data});
  }
  */
  render() {
    const { classes, coin, isLogin } = this.props;
    return (
      <div className={classes.root}>
        {!isLogin ?
          <div className={classes.loginTab}><LoginRequired/></div>
          :
          null
        }
        <AdosExpansionPanel defaultExpanded={true}>
          <AdosExpansionPanelSummary expandIcon={<IconExpandMore className={classes.expandIcon}/>}>
            <Typography className={classes.heading}>Place Order</Typography>
          </AdosExpansionPanelSummary>
          <AdosExpansionPanelDetails>
            <PlaceOrder/>
          </AdosExpansionPanelDetails>
          <AdosPanelHeaderActions>
            <Icon className='fas fa-calculator' fontSize="inherit" style={{margin:'0 8px'}} onClick={(event) => this.handleTradingOptionClick()}/>
            <Icon className='fas fa-cog' fontSize="inherit" onClick={(event) => this.handleSidebarOptionClick()}/>
          </AdosPanelHeaderActions>
        </AdosExpansionPanel>

        {isLogin ?
        <AdosExpansionPanel defaultExpanded={true} className={classes.darkBox}>
          <AdosExpansionPanelSummary expandIcon={<IconExpandMore className={classes.expandIcon}/>}>
            <Typography className={classes.heading}>Your Position: {coin.type}{coin.currency}</Typography>
          </AdosExpansionPanelSummary>
          <AdosExpansionPanelDetails>
            <YourPosition coin={coin}/>
          </AdosExpansionPanelDetails>
        </AdosExpansionPanel>
        :
        null
        }
        {isLogin ?
        <AdosExpansionPanel defaultExpanded={true}>
          <AdosExpansionPanelSummary expandIcon={<IconExpandMore className={classes.expandIcon}/>}>
            <Typography className={classes.heading}>Contract Details: {coin.type}{coin.currency} </Typography>
          </AdosExpansionPanelSummary>
          <AdosExpansionPanelDetails>
            <ContractDetails coin={coin}/>
          </AdosExpansionPanelDetails>
        </AdosExpansionPanel>
        :
        null
        }
      </div>
    );
  }
}

OrderControls.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderControls);
