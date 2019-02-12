import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import TradingWelcome from './tradeSection/TradingWelcome';
import TradingOrder from './tradeSection/TradingOrder';
import TradingGrid from './tradeSection/TradingGrid';

import { UserService } from '../services/UserService';
import { stylesSidebarContent } from '../widgets/SideMenu';

class Trade extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar availGuest={true} currentMenu="Trade"/>

        <div className={classes.container}>
          <div className={classes.sideBarWide}>
            {!UserService.isLogin()?
              <TradingWelcome/>
              :
              null
            }
            
            <TradingOrder isLogin={UserService.isLogin()}/>
          </div>
          <div className={classes.contentWide}>
              <TradingGrid onRef={ref => (this.tradingGridRef = ref)} isLogin={UserService.isLogin()}/>
          </div>
        </div>

        <Footer/>
      </div>
    );
  }
};

Trade.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(stylesSidebarContent)(Trade);

