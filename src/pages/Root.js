import React from 'react';
import PubSub from 'pubsub-js';
import { IntlProvider, addLocaleData } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import deepOrange from '@material-ui/core/colors/deepOrange';

import App from '../App';
import {EVT_LOCALE_SET} from '../data/trade.js';
import { UserService } from '../services/UserService';

import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import ru from 'react-intl/locale-data/ru';
import ko from 'react-intl/locale-data/ko';

import enTrans from '../lang/en.json';
import zhTrans from '../lang/zh.json';
import ruTrans from '../lang/ru.json';
import koTrans from '../lang/ko.json';

addLocaleData([...en, ...zh, ...ru, ...ko]);

const styleDefault = {
  typography: {
    useNextVariants: true,
    button: {
      textTransform: '',
    }
  },
  palette: {
    primary: cyan,
    secondary: deepOrange,
    ados: {
      light: '#4080bf',
      main: '#264d73',
      dark: '#19334d',
    },
    tradeUp: {
      light: '#88b34d',
      main: '#526c2e',
      dark: '#293617',
    },
    tradeDown: {
      light: '#c43b42',
      main: '#8b2a2f',
      dark: '#4f171a',
    }
  },
  shadows: Array(25).fill('none'),
  shape: {
    borderRadius: 0,
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    }
  },
  overrides: {
    MuiToolbar: {
      root: {
        height: 48,
      }
    },
    MuiTabs: {
      indicator: {
        bottom: 'inherit',
        top: 0,
      },
    },
  },
}

const themeLight = createMuiTheme(
  Object.assign(styleDefault, {palette: {...(styleDefault.palette), type: 'dark'}})
);

const themeDark = createMuiTheme(
  Object.assign(styleDefault, {palette: {...(styleDefault.palette), type: 'dark'}})
);

class Root extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      locale: 'en',
      themeType: 'dark',
    };

    this.messages = {
      en: enTrans,
      zh: zhTrans,
      ru: ruTrans,
      ko: koTrans,
    };
    this.handleLocale = this.handleLocale.bind(this);
  }

  componentDidMount(){
    this.token = PubSub.subscribe(EVT_LOCALE_SET, this.handleLocale);
    this.setState({locale : UserService.getLocale()});
  }
  componentWillUnmount(){
    PubSub.unsubscribe(this.token);
  }

  handleLocale(msg, data){
    this.setState({locale : data});
  }

  render() {
    const {locale, themeType} = this.state;
    return (
      <MuiThemeProvider theme={themeType==='light'? themeLight:themeDark}>
        <IntlProvider locale={locale} messages={this.messages[locale]}>
          <BrowserRouter>
              <App/>
          </BrowserRouter>
        </IntlProvider>
      </MuiThemeProvider>
    );
  }
}

export default Root;