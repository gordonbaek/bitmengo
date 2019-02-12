import React from 'react';
import PubSub from 'pubsub-js';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import AdosOutlinedInput from '../widgets/AdosOutlinedInput';
import Divider from '@material-ui/core/Divider';

import { stylePopover } from '../widgets/AdosPopover';

import {EVT_THEME_SET} from '../data/trade.js';
import { UserService } from '../services/UserService';

import AdosSelect from '../widgets/AdosSelect';

const styles = theme => ({
  root: {
    width: '280px',
    textAlign: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gutterBottom: {
    marginBottom: '4px',
  },
  button: {
    color: theme.palette.common.white,
  },
  themeBox: {
    display: 'inline-block',
    margin: theme.spacing.unit,
    borderWidth: 1,
    borderColor: theme.palette.common.black,
    borderStyle: 'solid',
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  boxDark: {
    backgroundColor: theme.palette.grey[500],
  },
  boxLight: {
    backgroundColor: theme.palette.common.white,
  },
  inlineText: {
    display: 'inline',
  }
});

const CurrencyDisplayMenus = [
  {value: 1, text: 'XBT(Bitcoin)'},
  {value: 2, text: 'mXBT(milli-Bitcoin)'},
  {value: 3, text: 'uXBT(micro-Bitcoin)'},
  {value: 4, text: 'XBT(Satoshi)'},
];

class SettingPreferences extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currencyDisplayNo: 1,
      dashboardLayout: 'basic',
      themeType: 'light',
      animations: true,
    }
  }

  componentDidMount(){
    this.setState({currencyDisplayNo : UserService.getCurrency()});
    this.setState({dashboardLayout : UserService.getLayout()});
    this.setState({themeType : UserService.getTheme()});
    this.setState({animations : UserService.getAnimations()});
  }

  handleCurrencyDisplayChange = event => {
    const v = parseInt(event.target.value);
    this.setState({ currencyDisplayNo: v });
  }
  
  generateCurrencyDisplayDOM() {
    return CurrencyDisplayMenus.map((menu, i) => {
      return (
        <option key={menu.value} value={menu.value} style={{color: 'black'}}>
          {menu.text}
        </option>
      );
    });
  }

  handleDashboardLayoutChange = event => {
    this.setState({ dashboardLayout: event.target.value });
  }

  handleAnimationsChange = event => {
    this.setState({ animations: event.target.checked });
  }

  handleThemeTypeChange = themeType => {
    PubSub.publish(EVT_THEME_SET, themeType);
    this.setState({themeType});
    UserService.setTheme(themeType);
  }

  render() {
    const { classes, theme, isLogin, onClose, onLogout } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="subtitle1">
            Main Options
          </Typography>
        </div>
        
        <div className={classes.content}>
          <Typography variant="subtitle2" gutterBottom>
            Currency Display
          </Typography>
          <FormControl style={{backgroundColor: 'white'}}>
          <AdosSelect
            native
            value={this.state.currencyDisplayNo}
            onChange={this.handleCurrencyDisplayChange}
            input={
              <AdosOutlinedInput
                name="currencyDisplay"
                labelWidth={0}
                id="currencyDisplay"
              />
            }
          >
            {this.generateCurrencyDisplayDOM()}
          </AdosSelect>
          </FormControl>

          <Typography variant="subtitle2" gutterBottom>
            Color Theme
          </Typography>

          <div>
            <div className={classNames(classes.themeBox, classes.boxDark)} onClick={() => this.handleThemeTypeChange('dark')}></div>
            <div className={classNames(classes.themeBox, classes.boxLight)} onClick={() => this.handleThemeTypeChange('light')}></div>
          </div>

          <Typography variant="subtitle2" gutterBottom>
            Dashboard Layout
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              name="dashboardLayout"
              value={this.state.dashboardLayout}
              onChange={this.handleDashboardLayoutChange}
              className={classes.group}
            >
              <FormControlLabel value="basic" control={<Radio />} label="Basic" />
              <FormControlLabel value="advanced" control={<Radio />} label="Advanced" />
            </RadioGroup>
          </FormControl>

          <br/>

          <Button variant="contained">Reset</Button>

          <br/>

          <Checkbox
            checked={this.state.animations}
            onChange={this.handleAnimationsChange}
            value="true"
          />
          
          <Typography variant="subtitle2" className={classes.inlineText} component="span">
            Animations
          </Typography>
          

          <Divider className={classes.gutterBottom} />

          {isLogin ?
            <React.Fragment>
              <Button fullWidth className={classNames(classes.button, classes.gutterBottom)} variant="contained" color="primary" component={Link} to="/app/account" onClick={onClose}>Account & Security</Button>
              <Button fullWidth className={classNames(classes.button, classes.gutterBottom)} variant="contained" color="primary" component={Link} to="/app/preferences" onClick={onClose}>Site Preferences</Button>
              <Button fullWidth className={classes.button} variant="contained" color="secondary" onClick={onLogout}>Logout</Button>
            </React.Fragment>
            :
            <React.Fragment>
              <Button fullWidth className={classNames(classes.button, classes.gutterBottom)} variant="contained" color="primary" component={Link} to="/login">Log In</Button>
              <Button fullWidth className={classes.button} variant="contained" color="secondary" component={Link} to="/register">Register</Button>
            </React.Fragment>
          }
        </div>
      </div>
    );
  }
}

SettingPreferences.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles((theme) => ({...styles(theme), ...stylePopover(theme)}), {withTheme: true})(SettingPreferences);