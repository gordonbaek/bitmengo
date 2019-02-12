import React, { Component } from 'react';

import {AgGridReact} from 'ag-grid-react';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-fresh.css';

import '../../styles/Orderbook.css';

class Orderbook extends Component {
    constructor(props) {
		  super(props);

      this.state = {
        columnDefs: [
          {
            headerName: '가격',
            field: 'price',
            width:100, 
            valueFormatter: this.priceFormatter,
            cellStyle: {
              color : this.priceColor(),
              textAlign: 'right'
            },
            lockPosition: true
          },
          {
            headerName: '규모',
            field: 'size',
            width:100,
            enableCellChangeFlash: false,
            cellRenderer:'agAnimateShowChangeCellRenderer', 
            cellClass: 'number',
            valueFormatter: this.currencyFormatter,
            cellStyle: {
              textAlign: 'right'
            },
            lockPosition: true
          },
          {
            headerName: '총액', 
            field: 'total', 
            width:100, 
            cellClass: 'number',
            valueFormatter: this.currencyFormatter,
            cellStyle: {
              textAlign: 'right'
            },
            lockPosition: true
          },
        ],
        rowData: []
      };

      this.onGridReady = this.onGridReady.bind(this);
    }

    priceColor() {
      if(this.props.isBids) {
        return '#FF6179';
      }
      return '#388d53';
    }

    priceFormatter(params) {
      return params.value.toFixed(1);
    }

    currencyFormatter(params) {
      return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    componentDidMount() {
        this.props.onRef(this);

        // this.interval = setInterval(() => this.onRefresh(), 300);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;      
    }
    
    genRowDataBids(data) {
      let rowData = [];
      let total = 0;
      const size = data.length-1;
      for(var i=size; i >= 0; i--) {
        const arr = data[i];
        let order = {
          price: arr[0],
          size: arr[1],
          total: arr[1],
        };
        total += arr[1];
        if(i < size) {
          order.total = total;
        }    
        rowData.push(order);
      }
      
      return rowData.reverse();
    }

    genRowDataAsks(data) {
      let rowData = [];
      let total = 0;
      const size = data.length-1;
      for(var i=size; i >= 0; i--) {
        const arr = data[i];
        let order = {
          price: arr[0],
          size: arr[1],         
        };
        total += arr[1];
        order.total = total;
        rowData.push(order);
      }
      
      return rowData;
    }

    genRowData(data) {
      if(this.props.isBids) {
        return this.genRowDataBids(data);
      } else {
        return this.genRowDataAsks(data);
      }
    }

    randomBetween(min, max) {
      return Math.floor(Math.random()*(max - min + 1)) + min;
    }

    onRefresh() {    
      let data = [];
      for(var i=0; i<10; i++) {
        let item = [
          this.randomBetween(2000, 3000),
          this.randomBetween(10, 30),
          this.randomBetween(1000, 10000),
        ];
        data.push(item);
      }
      this.onUpdate(data);
    }

    updateBids(data) {
      const size = data.length - 1;
      let total = 0;
      
      for(var i=size; i >= 0; i--) {
        const arr = data[i];
        let item = this.state.rowData[i];
        item.price = arr[0];
        item.size = arr[1];
        total += arr[1];
        item.total = total;        
        this.gridApi.updateRowData({update: [item]}); 
      }
    }

    updateAsks(data) {
      const size = data.length - 1;
      let total = 0;
      
      for(var i=size, j=0; i >= 0; i--, j++) {
        const arr = data[i];
        let item = this.state.rowData[j];
        item.price = arr[0];
        item.size = arr[1];
        total += arr[1];
        item.total = total;
        this.gridApi.updateRowData({update: [item]});         
      }
    }

    onUpdate(data) {
      if(this.state.rowData.length === 0) {
        this.setState({
          rowData: this.genRowData(data),
        });
      } 
      else {
        if(this.props.isBids) {
          this.updateBids(data);
        } else {
          this.updateAsks(data);
        }
      }
    }

  copyObject(object) {

      // start with new object
      var newObject = {};
  
      // copy in the old values
      Object.keys(object).forEach( function(key) {
          newObject[key] = object[key];
      });
  
      return newObject;
  }

  render() {
    let className = "ag-theme-fresh bids";
    if(this.props.isBids === false) {
      className = "ag-theme-fresh asks";
    }

		return (
			<div
				className={className}
				style={{
					width: '300px',          
				}}
			>
				<AgGridReact
					columnDefs={this.state.columnDefs}          
					rowData={this.state.rowData}
          onGridReady={this.onGridReady}
          gridAutoHeight={true}
          >
				</AgGridReact>
			</div>
		);
	}
}

export default Orderbook;