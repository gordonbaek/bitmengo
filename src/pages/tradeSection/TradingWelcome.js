import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: '4px',
    padding: '4px',
  },
  heading: {
    display: 'block',
  },
  link: {
    textDecoration: 'none',
    display: 'inline',
    color: theme.palette.primary.dark,
  },
  button: {
    color: theme.palette.common.white,
    marginBottom: '4px',
  }
});

class TradingWelcome extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          Welcome to ADOS!
        </Typography>
        <Divider/>
        <div className={classes.heading}>
        <Typography component="p">
        This is a preview of our  trading dashboard. The markett data to the side is live.<br/>
        </Typography>
        <Typography component="p">
        Want to get started?
        <Typography component={Link} to='/register' className={classes.link}> 
        Create an account in just a few seconds.
        </Typography>
        </Typography>
       
        </div>
        
        
        <Button fullWidth variant="contained" color="primary" component={Link} to="/login" className={classes.button}>Log In</Button>
        
        <Button fullWidth variant="contained" color="secondary" component={Link} to="/register" className={classes.button}>Register</Button>
      </div>
    );
  }
}

TradingWelcome.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(TradingWelcome);