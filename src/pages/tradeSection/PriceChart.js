import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconBarChart from '@material-ui/icons/BarChart';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  buttonMenu: {
    padding: 0,
    minWidth: 34,
    minHeight: 30,
    fontSize: 18,
  },
  buttonLabel: {
    fontSize: 10,
  },
  buttonIcon: {
    fontSize: 14,
  },
  buttonThin: {
    minWidth: 'unset',
  },
  buttonBorderCollapse: {
    borderLeftWidth: 0,
  }
});
function IconCandleStick(props){
  return (
    <SvgIcon {...props}>
      <path d="M16 3v3h-2v12h2v5h1v-5h2V6h-2V3h-1zM9 4v5H7v11h2v3h1v-3h2V9h-2V4H9zm-1 6h3v9H8v-9z"></path>
    </SvgIcon>
  );
}

class PriceChart extends React.Component {
  
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
                
          <div className={classes.grow}>
            <Button variant='outlined' classes={{root:classes.buttonMenu, label:classes.buttonLabel}}>
              1h
            </Button>
            <Button variant='outlined' className={classNames(classes.buttonMenu, classes.buttonThin, classes.buttonBorderCollapse)}>
              <Icon className={classNames('fas fa-caret-down', classes.buttonIcon)}/>
            </Button>
            
            <span>&nbsp;</span>

            <Button variant='outlined' className={classes.buttonMenu}>
              <IconCandleStick fontSize="inherit"/>
            </Button>
            <Button variant='outlined' className={classNames(classes.buttonMenu, classes.buttonThin, classes.buttonBorderCollapse)}>
              <Icon fontSize="inherit" className={classNames('fas fa-caret-down', classes.buttonIcon)}/>
            </Button>

            <span>&nbsp;</span>
            
            <Button variant='outlined' className={classes.buttonMenu}>
              <Icon style={{fontSize: 12}} className={classNames('fas fa-cog', classes.buttonIcon)}/>
            </Button>
            
            <span>&nbsp;</span>
            
            <Button variant='outlined' className={classes.buttonMenu}>
              <Icon fontSize="inherit" className={classNames('far fa-chart-bar', classes.buttonIcon)}/>
            </Button>
            
            <span>&nbsp;</span>
            
            <Button variant='outlined' className={classes.buttonMenu}>
              <Icon fontSize="inherit" style={{width: '100%'}} className={classNames('fas fa-balance-scale', classes.buttonIcon)}/>
            </Button>
            
            <span>&nbsp;</span>
            
            <Button variant='outlined' className={classes.buttonMenu}>
              <Icon fontSize="inherit" className={classNames('fas fa-reply', classes.buttonIcon)}/>
            </Button>
            <Button variant='outlined' className={classNames(classes.buttonMenu, classes.buttonBorderCollapse)}>
              <Icon fontSize="inherit" className={classNames('fas fa-share', classes.buttonIcon)}/>
            </Button>
            
            <span>&nbsp;</span>
            
            <Button fontSize="inherit" variant='outlined' className={classes.buttonMenu}>
              <IconBarChart fontSize="small"/>
            </Button>
          </div>  
          <div>
            <Button variant='outlined' className={classes.buttonMenu}>
              <Icon fontSize="inherit" className={classNames('fas fa-camera', classes.buttonIcon)}/>
            </Button>
          </div>
      </div>
    );
  }
}

PriceChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PriceChart);
