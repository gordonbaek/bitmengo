import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import FormControl from '@material-ui/core/FormControl';

import InputAdornment from '@material-ui/core/InputAdornment';

import OrderBox from '../../widgets/OrderBox';
import AdosOutlinedInput from '../../widgets/AdosOutlinedInput';
import AdosSelect from '../../widgets/AdosSelect';
import AdosTextField from '../../widgets/AdosTextField';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  darkBox: {
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  adornment: {
    paddingLeft: 4,
  }
});

const MenuToolbar = withStyles(
  {
    root: {
      width: '100%',
      height: '32px',
      minHeight: '32px',
      padding: 0,
      display: 'flex',
      flexGrow: 1,
    },
  }
  )(Toolbar);
  
  const MenuTabs = withStyles( theme => (
  {
    root: {
      flexGrow: 1,
      minHeight: '100%',
      borderWidth: '1px 0 0 1px',
      borderStyle: 'solid',
      borderColor: theme.palette.type === 'light' ? theme.palette.grey[500]:theme.palette.common.black,
    },
  }
  ))(Tabs);
  
  const MenuTab = withStyles( theme => (
  {
    root: {
      minWidth: 'inherit',
      minHeight: '100%',
      borderWidth: '0 1px 0 0',
      borderStyle: 'solid',
      borderColor: theme.palette.type === 'light' ? theme.palette.grey[500]:theme.palette.common.black,
    },
    labelContainer: {
      paddingLeft: '2px',
      paddingRight: '2px',
    }
  }
  ))(Tab);
  
  const PlaceOrderMenus = [
    {value: 1, text: 'Limit', upLabel:'Buy / Long', downLabel:'Sell / Short'},
    {value: 2, text: 'Market', upLabel:'Buy Market', downLabel:'Sell Market'},
    {value: 3, text: 'Take Profit Market', upLabel:'Take Profit Buy', downLabel:'Take Profit Sell'},
    {value: 4, text: 'Stop Market', upLabel:'Set Buy Stop', downLabel:'Set Sell Stop'},
    {value: 5, text: 'Stop Limit', upLabel:'Set Buy Stop', downLabel:'Set Sell Stop'},
    {value: 6, text: 'Trailing Stop', upLabel:'Set Buy Stop', downLabel:'Set Sell Stop'},
    {value: 7, text: 'Take Profit Limit', upLabel:'Take Profit Buy', downLabel:'Take Profit Sell'},
  ];

class PlaceOrder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      menuNo: 1,
      scheme: 0,
      upLabel: PlaceOrderMenus[0].upLabel,
      downLabel: PlaceOrderMenus[0].downLabel,
    }
  }
  
  handleMenuChange = event => {
    const v = parseInt(event.target.value);
    this.setState({ menuNo: v });
    this.setState({upLabel: PlaceOrderMenus[v-1].upLabel});
    this.setState({downLabel: PlaceOrderMenus[v-1].downLabel});
  }
  
  handleSchemeChange = (event, scheme) => {
    this.setState({ scheme });
  }
  
  generateMenuDOM() {
    return PlaceOrderMenus.map((menu, i) => {
      return (
        <option key={menu.value} value={menu.value} style={{color: 'black'}}>
          {menu.text}
        </option>
      );
    });
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MenuToolbar>
          <MenuTabs
            value={this.state.scheme}
            onChange={this.handleSchemeChange}
            variant="fullWidth"
          >
            <MenuTab label="Basic" />
            <MenuTab label="Advanced" />
          </MenuTabs>
        </MenuToolbar>
        
        <FormControl fullWidth style={{backgroundColor: 'white'}}>
          <AdosSelect
            native
            value={this.state.menuNo}
            onChange={this.handleMenuChange}
            input={
              <AdosOutlinedInput
                name="menuNo"
                labelWidth={0}
                id="menuNo"
              />
            }
          >
            {this.generateMenuDOM()}
          </AdosSelect>
        </FormControl>

        <Grid container>
          <Grid container item xs={4}>
            <Typography variant="body2" color="inherit">
            Quantity
            </Typography>
          </Grid>
          <Grid container item xs={8}>
            <FormControl fullWidth>
              <AdosTextField
                type="number"
                style={{height: '28px'}}
                InputProps={{
                  startAdornment: <InputAdornment className={classes.adornment} position="start">USD</InputAdornment>,
                  disableUnderline: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container>
          <Grid container item xs={4}>
            <Typography variant="body2" color="inherit">
            Limit Price
            </Typography>
          </Grid>
          <Grid container item xs={8}>
            <FormControl fullWidth>
              <AdosTextField
                type="number"
                style={{height: '28px'}}
                InputProps={{
                  startAdornment: <InputAdornment className={classes.adornment} position="start">USD</InputAdornment>,
                  disableUnderline: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={8}>
          <Grid container item xs={6}>
            <OrderBox trade="buy" labelTitle={this.state.upLabel} labelQuantity="12345" labelPrice="1234.5"/>
          </Grid>
          <Grid container item xs={6}>
            <OrderBox trade="sell" labelTitle={this.state.downLabel} labelQuantity="12345" labelPrice="1234.5"/>
          </Grid>
        </Grid>

        <br/>

        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography variant="caption" color="inherit" >
              Order Value
            </Typography>
            <Typography variant="caption" color="inherit" >
              Available Balance
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" align="right" color="inherit" noWrap>
              77.7777 XBT
            </Typography>
            <Typography variant="caption" align="right" color="inherit" >
              0.0000 XBT
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

PlaceOrder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaceOrder);
