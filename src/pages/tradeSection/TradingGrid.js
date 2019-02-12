import React from 'react';
import PubSub from 'pubsub-js';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { WidthProvider, Responsive } from "react-grid-layout";
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import '../../styles/ReactGridLayout.css';

import Icon from '@material-ui/core/Icon';
import IconArrowDropDown from '@material-ui/icons/ArrowDropDown';
import FormControl from '@material-ui/core/FormControl';

import {Coin, EVT_COIN_SET} from '../../data/trade.js';
import AdosPopover from '../../widgets/AdosPopover';
import AdosCheckbox from '../../widgets/AdosCheckbox';
import { TradeButton, GuideButton } from '../../widgets/AdosButtons';
import { AdosPanel, AdosPanelHeader, AdosPanelContent } from '../../widgets/AdosPanel';
import { MenuToolbar, MenuTabs, MenuTab } from '../../widgets/AdosTabs';
import { AdosMenuItem, AdosMenuText } from '../../widgets/AdosMenu';
import AdosSelect from '../../widgets/AdosSelect';
import AdosOutlinedInput from '../../widgets/AdosOutlinedInput';

import OrderControls from './OrderControls';
import PriceChart from './PriceChart';
import Orderbook from './Orderbook';
import PositionOpenOrders from './PositionOpenOrders';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = theme => ({
  root:{
    width: '100%',
  },
  buttonCustomize: {
    padding: 0,
    minHeight: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  vicon: {
    verticalAlign: 'middle',
  },
  labelCoinLarge: {
    fontWeight: 'bold',
    marginBottom: -8,
  },
  labelSub: {
    fontSize: '0.75rem',
    display: 'inline',
    padding: '0 2px',
  },
  labelCoinSmall: {
    fontStyle: 'italic'
  },
  labelUp:{
    fontWeight: 'bold',
    color: theme.palette.tradeUp.light,
    '&::after':{
      fontFamily:'"Material Icons"',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      color: theme.palette.tradeUp.light,
      content: "'arrow_upward'",
      display: 'inline-block',
      verticalAlign:'middle',
      position: 'relative',
      top: -2,
    }
  },
  labelDown:{
    fontWeight: 'bold',
    color: theme.palette.tradeDown.light,
    '&::after':{
      fontFamily:'"Material Icons"',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      color: theme.palette.tradeDown.light,
      content: "'arrow_downward'",
      display: 'inline-block',
      verticalAlign:'middle',
      position: 'relative',
      top: -2,
    }
  },
  inlineWidgetWrapper: {
    flexGrow: 1,
    margin: 10,
    [theme.breakpoints.between('md', 'xl')]:{
      display: 'none',
    }
  }
});

let Coins = [
  {
    type: 'XBT',
    name: 'Bitcoin',
    mainCurrency:'USD',
    currency:[
      {
        key: 1,
        label: 'Perpetual(100x)',
        param: '',
        type: 'USD',
        default: true,
        isPerp: true,
        comment: 'US Dollar Inverse Perpetual',
      },
      {
        key: 2,
        label: 'DOWN',
        param: 'Jan 11, 3500.00 USD',
        type: '7D_D95',
        default: false,
        isPerp: false,
        comment: 'US Dollar 3/29/2019 Inverse Future',
      },
    ],
  },
  {
    type: 'ADA',
    name: 'Cardano',
    mainCurrency:'H19',
    currency:[
      {
        key: 1,
        label: 'Mar',
        param: '29 (20x)',
        type: 'H19',
        default: true,
        isPerp: false,
        comment: 'Bitcoin 3/29/2019 Linear Futures Contract',
      },
    ],
  }
];

class TradingGrid extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      websocket: null,
      coin: Coin,
      anchorEl: null,
      positionOpenOrderTab: 1,
      layouts: {
        lg:[
          {x:  0, y:  0, w:  7, h:   8, minH: 0, minW: 0, i: 'PANE_PRICE_CHART'},
          {x:  7, y:  0, w:  5, h:  8, minH: 0, minW: 0, i: 'PANE_ORDER_BOOK'},
          {x:  0, y:  8, w:  7, h:   4, minH: 0, minW: 0, i: 'PANE_DEPTH_CHART'},
          {x:  7, y:  8, w:  5, h:  4, minH: 0, minW: 0, i: 'PANE_RECENT_TRADES'},
          {x:  0, y: 12, w: 12, h:  4, minH: 0, minW: 0, i: 'PANE_POSITION_OPENORDERS'},
        ],
        md:[
          {x:  0, y:  0, w:  7, h:  6, minH: 0, minW: 0, i: 'PANE_PRICE_CHART'},
          {x:  7, y:  0, w:  5, h:  6, minH: 0, minW: 0, i: 'PANE_ORDER_BOOK'},
          {x:  0, y:  6, w:  7, h:  4, minH: 0, minW: 0, i: 'PANE_DEPTH_CHART'},
          {x:  7, y:  6, w:  5, h:  4, minH: 0, minW: 0, i: 'PANE_RECENT_TRADES'},
          {x:  0, y: 10, w: 12, h:  4, minH: 0, minW: 0, i: 'PANE_POSITION_OPENORDERS'},
        ],
        sm:[
          {x:  0, y:  0, w:  6, h:  6, minH: 0, minW: 0, i: 'PANE_ORDER_BOOK'},
          {x:  6, y:  0, w:  6, h:  6, minH: 0, minW: 0, i: 'PANE_RECENT_TRADES'},
          {x:  0, y:  6, w: 12, h:  4, minH: 0, minW: 0, i: 'PANE_POSITION_OPENORDERS'},
          {x:  0, y: 10, w: 12, h:  6, minH: 0, minW: 0, i: 'PANE_PRICE_CHART'},
          {x:  0, y: 16, w: 12, h:  4, minH: 0, minW: 0, i: 'PANE_DEPTH_CHART'},
        ],
        xs:[
          {x:  0, y:  0, w: 12, h:  6, minH: 0, minW: 0, i: 'PANE_ORDER_BOOK', static: true},
          {x:  0, y:  6, w: 12, h:  4, minH: 0, minW: 0, i: 'PANE_DEPTH_CHART', static: true},
          {x:  0, y: 10, w: 12, h:  6, minH: 0, minW: 0, i: 'PANE_PRICE_CHART', static: true},
          {x:  0, y: 16, w: 12, h:  4, minH: 0, minW: 0, i: 'PANE_RECENT_TRADES', static: true},
          {x:  0, y: 20, w: 12, h:  4, minH: 0, minW: 0, i: 'PANE_POSITION_OPENORDERS', static: true},
        ],
        xxs:[
          {x:  0, y:  0, w: 12, h:  6, minH: 0, minW: 0, i: 'PANE_ORDER_BOOK', static: true},
          {x:  0, y:  6, w: 12, h:  4, minH: 0, minW: 0, i: 'PANE_DEPTH_CHART', static: true},
          {x:  0, y: 10, w: 12, h:  6, minH: 0, minW: 0, i: 'PANE_PRICE_CHART', static: true},
          {x:  0, y: 16, w: 12, h:  4, minH: 0, minW: 0, i: 'PANE_RECENT_TRADES', static: true},
          {x:  0, y: 20, w: 12, h:  4, minH: 0, minW: 0, i: 'PANE_POSITION_OPENORDERS', static: true},
        ],
      },
      layoutsCurrent: {
      },
      layoutsStored: {
      },
      layoutStats:{
        'PANE_PRICE_CHART': {
          hidden: false,
          folded: false,
          label: 'Price Chart',
          storedSize: {},
        },
        'PANE_ORDER_BOOK': {
          hidden: false,
          folded: false,
          label: 'Orderbook',
          storedSize: {},
        },
        'PANE_DEPTH_CHART': {
          hidden: false,
          folded: false,
          label: 'Depth Chart',
          storedSize: {},
        },
        'PANE_RECENT_TRADES': {
          hidden: false,
          folded: false,
          label: 'Recent Trades',
          storedSize: {},
        },
        'PANE_POSITION_OPENORDERS': {
          hidden: false,
          folded: false,
          label: 'Positions & Open Orders',
          storedSize: {},
        },
      },
      layoutExpandedItem: null,
    };
    
    Object.keys(this.state.layoutStats).map((k,i) => {
      return ['lg', 'md', 'sm', 'xs', 'xxs'].map((b,j) => {
        return this.state.layoutStats[k].storedSize[b] = {w: 0, h: 0};
      });
    });

    this.onOpen = this.onOpen.bind(this);
		this.onMessage = this.onMessage.bind(this);
    this.onClose = this.onClose.bind(this);

  }
  
  handleCustomizeClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }
  
  handleCustomizeClose = () => {
    this.setState({ anchorEl: null });
  }
  
  handleCoinTabChange = (type, currency) => {
    console.log('HERE');
    let {coin} = this.state;
    coin.type = type;
    coin.currency = currency;
    this.setState({ coin: coin });

    PubSub.publish(EVT_COIN_SET, coin);
  }

  handleCoinSelectChange = event => {
    let {coin} = this.state;
    const tc = event.target.value.split('___');
    coin.type = tc[0];
    coin.currency = tc[1];
    this.setState({ coin: coin });

    PubSub.publish(EVT_COIN_SET, coin);
  }

  componentDidMount() {
    this.props.onRef(this);
    this.serverConnect();
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  
  getWidgetInfos() {
    const {layoutStats} = this.state;
    return Object.keys(layoutStats).map((k,i) => {
      let v = layoutStats[k];
      return {id:k, hidden: v.hidden, label: v.label};
    });
  }
  
  onLayoutChange = (layout, layouts) => {
    this.setState({ layouts: layouts });
  }
  
  toggleWidget(id) {
    const { layouts, layoutsStored } = this.state;
    let layoutExpandedItem = this.state.layoutExpandedItem;
    
    if( layoutExpandedItem !== null ) {
      layoutExpandedItem = null;
      //layouts = {...layoutsStored};
      this.setState({ layouts: layoutsStored, layoutExpandedItem: layoutExpandedItem });
    }else{
      layoutExpandedItem = id;
      //layoutsStored = {...layouts};
      this.setState({ layoutsStored: layouts, layoutExpandedItem: layoutExpandedItem });
    }
  }
  
  hideWidget(id) {
    const { layoutStats, layouts } = this.state;
    let hide = !layoutStats[id].hidden;
    layoutStats[id].hidden = hide;
    
    Object.keys(layouts).map(function(k,i){
      let layout = layouts[k];
      return layout.map( o => {
        if (o.i !== id) return null;
        if (hide) {
          layoutStats[id].storedSize[k].w = o.w;
          layoutStats[id].storedSize[k].h = o.h;
          o.w = 0;
          o.h = 0;
        }else{
          o.w = layoutStats[id].storedSize[k].w;
          o.h = layoutStats[id].storedSize[k].h;
        }
        return null;
      });
    });
    
    this.setState({ layoutStats });
  }
  
  onResize(layouts) {
    this.setState({layouts,});
  }
  
  getLayouts() {
    const { layoutExpandedItem } = this.state;
    
    if( layoutExpandedItem != null ) {
      let layouts = 
        ['lg', 'md', 'sm', 'xs', 'xxs'].reduce(function(m, v){
          m[v] = [{x:  0, y:  0, w:  12, h:  12, minH: 0, isDraggable: false, isResizable: false, i: layoutExpandedItem}];
          return m;
        }, {});
      return layouts;
    }

    return this.state.layouts;
  }

  handlePositionOpenOrderTabChange = (event, positionOpenOrderTab) => {
    this.setState({ positionOpenOrderTab });
  }

  handleChildDrag = event => {
    console.log('STOP!!!');
    event.stopPropagation();
  }
  
  getItem(id) {
    const { classes, isLogin } = this.props;
    const { positionOpenOrderTab } = this.state;
    switch (id) {
        case 'PANE_PRICE_CHART':
          return {
            component:
              <PriceChart/>
            ,
            title: 'Chart',
            subheader: null,
            id: 'PANE_PRICE_CHART'
          };
        case 'PANE_ORDER_BOOK':
          return {
            component:
              <div>
                <Orderbook onRef={ref => (this.orderBookBids = ref)} 
                    isBids={true}
                    />
                  <div>
                    <br/>
                    <br/>
                  </div>
                <Orderbook onRef={ref => (this.orderBookAsks = ref)} 
                  isBids={false}
                  />                        
              </div>
            ,
            title: 'Orderbook',
            subheader: null,
            id: 'PANE_ORDER_BOOK'
          };
        case 'PANE_DEPTH_CHART':
          return {
            component: <div>Depth Cahrt</div>,
            title: 'Depth Chart',
            subheader: null,
            id: 'PANE_DEPTH_CHART'
          };
        case 'PANE_RECENT_TRADES':
          return {
            component: <div>Recent Trade</div>,
            title: 'Recent Trade',
            subheader: null,
            id: 'PANE_RECENT_TRADES'
          };
        case 'PANE_POSITION_OPENORDERS':
          return {
            component:
            <PositionOpenOrders tab={positionOpenOrderTab} isLogin={isLogin}/>
              ,
            title: 'Position & Open Orders',
            subheader:
            <MenuTabs value={positionOpenOrderTab} onChange={this.handlePositionOpenOrderTabChange} onMouseDown={ e => this.handleChildDrag(e)}>
              <MenuTab value={1} label="Positions[0]"/>
              <MenuTab value={2} label="Closed Positions"/>
              <MenuTab value={3} label="Active Orders [0]"/>
              <MenuTab value={4} label="Stop [0]"/>
              <MenuTab value={5} label="Fills"/>
              <MenuTab value={6} label="Order History"/>
            </MenuTabs>
            ,
            id: 'PANE_POSITION_OPENORDERS'
          };
        default:
          return {};
      }
  }
  
  getWidgets() {
    const widgets = [];
    if( this.state.layoutExpandedItem != null ) {
      widgets.push(this.getItem(this.state.layoutExpandedItem));
    }else{
      for( const k in this.state.layoutStats ){
        //let v = this.state.layoutStats[k];
        //if(!v.hidden){
          widgets.push(this.getItem(k));
        //}
      }
    }
    return widgets;
  }
  
  generateWidgetDOM() {
    const widgets = this.getWidgets();
    return widgets.map((widget, i) => {
      return this.generatePanel(widget);
    });
  }

  generatePanel(widget) {
    const { coin } = this.state;
    return(
    <AdosPanel key={widget.id}>
      <AdosPanelHeader
        title={widget.title + ' (' + coin.type + coin.currency + ')'}
        subheader={widget.subheader}
        action={[
          <Button key="1" onClick={() => this.toggleWidget(widget.id)}>
            <Icon className={this.state.layoutExpandedItem === null ? 'fas fa-expand-arrows-alt' : 'fas fa-compress-arrows-alt'}/>
          </Button>,
          <Button key="2" onClick={() => this.hideWidget(widget.id)} style={{display : this.state.layoutExpandedItem === null ? '':'none'}}>
            <Icon className='fas fa-times' />
          </Button>
        ]}
      >
      </AdosPanelHeader>
      <AdosPanelContent>
        {widget.component}
      </AdosPanelContent>
    </AdosPanel>
    );
  }

  generateOrderControlsPanel() {
    const {isLogin} = this.props;
    const { coin } = this.state;
    const widget = {
      component:
        <OrderControls coin={coin} isLogin={isLogin}/>
      ,
      title: 'Order Control',
      subheader: null,
      id: 'PANE_ORDER_CONTROL'
    }

    return this.generatePanel(widget);
  }
  
  generateWidgetMenu() {
    const { layoutStats } = this.state;
    const widgets = Object.keys(layoutStats).map(function(k,i){
      let stat = layoutStats[k];
      return {id: k, hidden: stat.hidden, label: stat.label};
    });
    
    return widgets.map(widget => {
      return(
      <AdosMenuItem key={widget.id} value={widget.id} onClick={ () => this.hideWidget(widget.id)}>
        <AdosMenuText primary={widget.label} />
        <AdosCheckbox checked={!widget.hidden} />
      </AdosMenuItem>
      );
    });
  }

  generateTabLabel(coinType, coinName, valUpDown){
    const { classes } = this.props;
    let valClasses;
    if(valUpDown >=0 ){
      valClasses = classNames(classes.labelSub, classes.labelUp);
    }else{
      valClasses = classNames(classes.labelSub, classes.labelDown);
    }
    return(
      <div>
        <Typography variant="subtitle1" className={classes.labelCoinLarge}>{coinName}</Typography>
        <Typography component="span" className={classNames(classes.labelSub, classes.labelCoinSmall)}>{coinType}</Typography>
        <Typography component="span" className={valClasses}>
          {valUpDown > 0? '+':''}{valUpDown}
        </Typography>
      </div>
    );
  }
  
  render() {
    const { classes, isLogin } = this.props;
    const { coin, anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.inlineWidgetWrapper}>
        <FormControl fullWidth>
          <AdosSelect
            native
            value={`${coin.type}___${coin.currency}`}
            onChange={this.handleCoinSelectChange}
            input={
              <AdosOutlinedInput
                name="coinSelector"
                labelWidth={0}
                id="coinSelector"
              />
            }
          >
            {
              Coins.map( co => {
                return co.currency.map( cur => {
                  return (
                  <option key={`${co.type}_${cur.key}`} value={`${co.type}___${cur.type}`} style={{color: 'black'}}>
                    {co.type}{cur.type} [000.0]: {co.name}/{cur.comment}
                  </option>
                  )
                })
              })
            }
          </AdosSelect>
        </FormControl>
        </div>
        <div className={classes.inlineWidgetWrapper}>
        {this.generateOrderControlsPanel()}
        </div>
        <Grid item xs={12} style={{padding: '0 10px'}}>
          <MenuTabs value={coin.type}>
            {
              Coins.map( co => {
                return <MenuTab key={co.type} value={co.type} label={this.generateTabLabel(co.type, co.name, +14.7)} onClick={() => this.handleCoinTabChange(co.type, co.mainCurrency)}/>
              })
            }
            <MenuTab value="" label="" disabled={true}/>
          </MenuTabs>
          <MenuToolbar variant='dense'>
            <div className={classes.grow}>
              {
                Coins.map( co => {
                  return coin.type === co.type ?
                    <div key={co.type}>
                    {
                       co.currency.map( cur => {
                        return (
                          <TradeButton
                            key={`${co.type}_${cur.type}`}
                            label={`${cur.label} ${cur.param}`}
                            coinType={co.type}
                            coinCurrency={cur.type}
                            valUpDown="1400.0"
                            selected={cur.type === coin.currency}
                            rounded={!cur.siPerp}
                            onClick={() => this.handleCoinTabChange(co.type, cur.type)}
                          >
                          </TradeButton>)
                      })
                    }
                      <GuideButton label={`${co.type} (${co.type}) Guide`}/>
                    </div>
                  :
                  null
                })
              }
            </div>
            <div>
              <Button
                aria-owns={Boolean(anchorEl) ? 'customizeItem' : undefined}
                aria-haspopup="true"
                onClick={this.handleCustomizeClick}
                classes={{root:classes.buttonCustomize}}
              >Customize <IconArrowDropDown/></Button>
              <AdosPopover
                id='customizeItem'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleCustomizeClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
              {this.generateWidgetMenu()}
              </AdosPopover>
              
            </div>
          </MenuToolbar>
        </Grid>
        <Grid item xs={12}>
          <ResponsiveReactGridLayout
            className="layout"
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}}
            rowHeight={30}
            layouts={this.getLayouts()}
            onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
          >
          {this.generateWidgetDOM()}
          </ResponsiveReactGridLayout>
        </Grid>
      </div>
    );
  }

  serverConnect() {
    var websocket = new WebSocket('ws://49.247.206.70:3000/realtime');
	
		// Open the socket
		websocket.onopen = this.onOpen;
		websocket.onmessage = this.onMessage;
		websocket.onClose = this.onClose;
		
		this.setState({websocket: websocket});
  }

  onOpen(event) {
		console.log('websocket opened');
		// Send an initial message
		// socket.send('I am the client and I\'m listening!');
		
		// To close the socket....
		//socket.close()
	}

	onClose(event) {
		console.log('Client notified socket has closed',event);
  }
  
  onMessage(event) {	
		const data = event["data"];
    //console.log(data);
		const dataObj = JSON.parse(data);
		const table = dataObj['table'];
		const tableData = dataObj['data'];
		// console.log('Client received a message',tableData);
	
		switch(table) {
			case 'orderBook10':
				this.orderBookBids.onUpdate(tableData[0].bids);
				this.orderBookAsks.onUpdate(tableData[0].asks);
				break;
			case 'trade':
				// console.log(tableData);
				// this.recentTrades.onAdd(tableData);
				// this.tvChart.onAdd(tableData);
				break;
			default:
				break;
		}
	}
};

TradingGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme: true})(TradingGrid);
