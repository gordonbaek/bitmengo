import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import { WidthProvider, Responsive } from "react-grid-layout";
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import '../styles/ReactGridLayout.css';

import IconArrowDropDown from '@material-ui/icons/ArrowDropDown';
import IconSettings from '@material-ui/icons/Settings';
import IconShowChart from '@material-ui/icons/ShowChart';
import IconBarChart from '@material-ui/icons/BarChart';
import IconCompare from '@material-ui/icons/Compare';
import IconReply from '@material-ui/icons/Reply';
import IconCameraAlt from '@material-ui/icons/CameraAlt';


const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = theme => ({
  buttonMenu: {
    padding: theme.spacing.unit*1,
    minWidth: 32,
    '& span': {
      position: 'absolute',
    }
  },
  flip: {
    transform: 'scaleX(-1)',
  }
});

class Test extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      layouts: {
        lg:[
          {x:  0, y:  0, w:  7, h:   8, minH: 0, i: 'item1'},
          {x:  0, y:  8, w:  7, h:   4, minH: 0, i: 'item2'},
          {x:  7, y:  0, w:  5, h:  12, minH: 0, i: 'item3'},
        ],
        md:[
          {x:  0, y:  0, w:  7, h:  6, minH: 0, i: 'item1'},
          {x:  0, y:  6, w:  7, h:  3, minH: 0, i: 'item2'},
          {x:  7, y:  0, w:  5, h:  9, minH: 0, i: 'item3'},
        ],
        sm:[
          {x:  0, y:  0, w:  7, h:  5, minH: 0, i: 'item1'},
          {x:  0, y:  5, w:  7, h:  3, minH: 0, i: 'item2'},
          {x:  7, y:  0, w:  5, h:  8, minH: 0, i: 'item3'},
        ],
        xs:[
          {x:  0, y:  0, w: 12, h:  5, minH: 0, i: 'item1'},
          {x:  0, y:  5, w: 12, h:  3, minH: 0, i: 'item2'},
          {x:  0, y:  8, w: 12, h:  6, minH: 0, i: 'item3'},
        ],
        xxs:[
          {x:  0, y:  0, w: 12, h:  5, minH: 0, i: 'item1'},
          {x:  0, y:  5, w: 12, h:  3, minH: 0, i: 'item2'},
          {x:  0, y:  8, w: 12, h:  5, minH: 0, i: 'item3'},
        ],
      },
      layoutsCurrent: {
      },
      layoutsStored: {
      },
      layoutStats:{
        'item1': {
          hidden: false,
          layout: [],
        },
        'item2': {
          hidden: false,
          layout: [],
        },
        'item3': {
          hidden: false,
          layout: [],
        },
      },
      layoutExpandedItem: null,
    };
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
    let layoutStats = this.state.layoutStats;
    layoutStats[id].hidden = !layoutStats[id].hidden;
    
    this.setState({ layoutStats: layoutStats});
  }
  
  onResize(layouts) {
    this.setState({layouts,});
  }
  
  getLayouts() {
    const { layoutExpandedItem } = this.state;
    
    if( layoutExpandedItem != null ) {
      let layouts = {
        lg:  [{x:  0, y:  0, w:  12, h:  12, minH: 0, isDraggable: false, isResizable: false, i: layoutExpandedItem}],
        md:  [{x:  0, y:  0, w:  12, h:  12, minH: 0, isDraggable: false, isResizable: false, i: layoutExpandedItem}],
        sm:  [{x:  0, y:  0, w:  12, h:  12, minH: 0, isDraggable: false, isResizable: false, i: layoutExpandedItem}],
        xs:  [{x:  0, y:  0, w:  12, h:  12, minH: 0, isDraggable: false, isResizable: false, i: layoutExpandedItem}],
        xxs: [{x:  0, y:  0, w:  12, h:  12, minH: 0, isDraggable: false, isResizable: false, i: layoutExpandedItem}],
      };
      
      return layouts;
    }

    return this.state.layouts;
  }
  
  getItem(id) {
    const { classes } = this.props;
    switch (id) {
        case 'item1':
          return {
            component:
              <div>
                <Toolbar variant='dense'>
                  <Button variant='outlined' className={classes.buttonMenu}>
                  1h
                  </Button>
                  <Button variant='outlined' className={classes.buttonMenu}>
                    <IconArrowDropDown/>
                  </Button>
                  
                  <span>&nbsp;</span>
                  
                  <Button variant='outlined' className={classes.buttonMenu}>
                    <IconSettings/>
                  </Button>
                  
                  <span>&nbsp;</span>
                  
                  <Button variant='outlined' className={classes.buttonMenu}>
                    <IconShowChart/>
                  </Button>
                  
                  <span>&nbsp;</span>
                  
                  <Button variant='outlined' className={classes.buttonMenu}>
                    <IconCompare/>
                  </Button>
                  
                  <span>&nbsp;</span>
                  
                  <Button variant='outlined' className={classes.buttonMenu}>
                    <IconReply/>
                  </Button>
                  <Button variant='outlined' className={classes.buttonMenu}>
                    <IconReply className={classes.flip}/>
                  </Button>
                  
                  <span>&nbsp;</span>
                  
                  <Button variant='outlined' className={classes.buttonMenu}>
                    <IconBarChart/>
                  </Button>
                  
                  <span>&nbsp;</span>
                  
                  <Button variant='outlined' className={classes.buttonMenu}>
                    <IconCameraAlt/>
                  </Button>
                  
                </Toolbar>
              </div>,
            title: 'Chart (XBTUSD)',
            id: 'item1'
          };
        case 'item2':
          return {
            component: <div>Content 2</div>,
            title: 'Depth Chart (XBTUSD)',
            id: 'item2'
          };
        case 'item3':
          return {
            component: <div>Content 3</div>,
            title: 'OrderBook',
            id: 'item3'
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
        let v = this.state.layoutStats[k];
        if(!v.hidden){
          widgets.push(this.getItem(k));
        }
      }
    }
    return widgets;
  }
  
  generateDOM() {
    const widgets = this.getWidgets();
    
    return widgets.map((widget, i) => {
      return (
        <Card key={widget.id}>
          <CardHeader
            title={widget.title}
            action={[
              <IconButton key="1" onClick={() => this.toggleWidget(widget.id)}>
                <ZoomInIcon />
              </IconButton>,
              <IconButton key="2" onClick={() => this.hideWidget(widget.id)}>
                <CloseIcon />
              </IconButton>
            ]}
          >
          </CardHeader>
          <CardContent>
            {widget.component}
          </CardContent>
        </Card>
      );
    });
  }
  
  render() {
    
    
    return (
      <div>
        <ResponsiveReactGridLayout
          className="layout"
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}}
          rowHeight={30}
          layouts={this.getLayouts()}
          onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
        >
        {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
};

Test.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Test);
