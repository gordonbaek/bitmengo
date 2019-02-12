import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class YourPositon extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="caption" align="right" color="inherit" >
              YourPositon
        </Typography>
      </div>
    );
  }
}

YourPositon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(YourPositon);
