import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    borderTop: '1px solid ' + theme.palette.grey[500],
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.85)',
    boxSizing: 'border-box',
  },
  viewBox: {
    width: '1024px',
    maxWidth: '1024px',
    margin: '0 auto',
  },
  meunListContainer: {
    listStyleType: 'none',
    paddingInlineStart: 0,
  },
  menuLink: {
    textDecoration: 'none',
    color: theme.palette.common.white,
    fontSize: '0.75rem',
    margin: '2px 0',
  }
});

class Footer extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid container item xs={12} sm={1} md={2}></Grid>
          <Grid container item xs={12} sm={10} md={8} spacing={0}>
            <Grid container item xs={12} sm={4}>
              <Grid item xs={12}>
                <h3>ADOS</h3>
                <hr/>
                <h4>We create and maintain blockchain platforms where:</h4>
                <p>
                Every individual has a voice in governance, 
                Bleeding-edge technologies are utilized to implement unprecedented ideas, 
                projects created are sustainable, scalable, and resilient.
                </p>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={8}>
              <Grid item xs={6} sm={6} md={3}>
                <h5>About</h5>
                <Typography className={classes.menuLink} component={Link} to='/app/aboutUs'>
                  About the Team
                </Typography>
                <Typography className={classes.menuLink} component={Link} to='/app/affiliates'>
                  Affiliate Program
                </Typography>
                <Typography className={classes.menuLink} component={Link} to='//www.adoscompany.com'>
                  Careers at Ados
                </Typography>
                <Typography className={classes.menuLink} component={Link} to='/app/privacyPolicy'>
                  Privacy Policy
                </Typography>
                <Typography className={classes.menuLink} component={Link} to='/app/security'>
                  Security
                </Typography>
                <Typography className={classes.menuLink} component={Link} to='/app/terms'>
                  Terms of Service
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <h5>Data</h5>
                <Typography className={classes.menuLink} component={Link} to='/app/fees'>
                  Fees
                </Typography>
                <Typography className={classes.menuLink} component={Link} to='/app/trade/XBTUSD'>
                  Bitcoin / USD
                </Typography>
                <Typography className={classes.menuLink} component={Link} to='/app/trade/ETHUSD'>
                  Ethereum Futures
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <h5>References</h5>
                <Typography className={classes.menuLink} component={Link} to='/app/apiOverview'>
                  API
                </Typography>
                <Typography className={classes.menuLink} component={Link} to='/app/faq'>
                  FAQ
                </Typography>
                <Typography className={classes.menuLink} component={Link} to='/app/futuresGuide'>
                  Future Guide
                </Typography>
                <Typography className={classes.menuLink} component={Link} to='/app/perpetualContractsGuide'>
                  Perpetuals Guide
                </Typography>
                <Typography className={classes.menuLink} component={Link} to='/app/tradingOverview'>
                  Trading on Ados
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <h5>Contact Us</h5>
                <Typography className={classes.menuLink} component={Link} to='/app/apiOverview'>
                  API
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={1} md={2}></Grid>
        </Grid>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);