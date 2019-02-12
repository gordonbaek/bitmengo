import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class ContractDetails extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h5" align="center" gutterBottom>
          1234.5
        </Typography>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Typography variant="caption" color="inherit" noWrap>
            <Icon className='fab fa-bitcoin' fontSize='small'/>
          </Typography>
          <Typography variant="subtitle2" color="inherit" noWrap>
            1234.5
          </Typography>
          <Typography variant="subtitle2" color="inherit" noWrap>
            /
          </Typography>
          <Typography variant="subtitle2" color="inherit" noWrap>
            1234.5
          </Typography>
          <Typography variant="subtitle1" color="inherit" noWrap>
            |
          </Typography>
        </div>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography variant="caption" color="inherit" >
              Pricing Source
            </Typography>
            <Typography variant="caption" color="inherit" >
              BitMEX Index Price
            </Typography>
            <Typography variant="caption" color="inherit" >
              Turnover24h
            </Typography>
            <Typography variant="caption" color="inherit" >
              Open Interest
            </Typography>
            <Typography variant="caption" color="inherit" >
              Funding Rate
            </Typography>
            <Typography variant="caption" color="inherit" >
              ContractValue
            </Typography>
            <Typography variant="caption" color="inherit" >
              More Details...
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" align="right" color="inherit" noWrap>
              BitMEX Index
            </Typography>
            <Typography variant="caption" align="right" color="inherit" >
              1234.5
            </Typography>
            <Typography variant="caption" align="right" color="inherit" noWrap>
              1,234,567,890 USD
            </Typography>
            <Typography variant="caption" align="right" color="inherit" noWrap>
              4,567,890 USD
            </Typography>
            <Typography variant="caption" align="right" color="inherit">
              -0.0096% In 4 hours
            </Typography>
            <Typography variant="caption" align="right" color="inherit">
              1.00 USD
            </Typography>
            <Typography variant="caption" align="right" color="inherit">
            </Typography>
          </Grid>
        </Grid>
        
      </div>
    );
  }
}

ContractDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContractDetails);
