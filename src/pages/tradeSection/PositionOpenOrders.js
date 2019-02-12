import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import LoginRequired from '../../components/LoginRequired';

const styles = theme => ({
  root: {
    flex: 1,
  },
  grow: {
    flexGrow: 1,
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

class PositionOpenOrders extends React.Component {

  render(){
    const { classes, tab, isLogin } = this.props;
    return(
      <div className={classes.root}>
        {!isLogin ? 
          <div className={classes.loginTab}><LoginRequired/></div>
          :null
        }
        <div>
          {tab === 1 &&
            <div>
              1
            </div>
          }
          {tab === 2 &&
            <div>
              2
            </div>
          }
          {tab === 3 &&
            <div>
              3
            </div>
          }
          {tab === 4 &&
            <div>
              4
            </div>
          }
          {tab === 5 &&
            <div>
              5
            </div>
          }
          {tab === 6 &&
            <div>
              6
            </div>
          }
        </div>
      </div>
    );
  }
}

PositionOpenOrders.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PositionOpenOrders);
