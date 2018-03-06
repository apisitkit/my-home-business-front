import React, { Component } from 'react';
import backendRESTUrl from '../global-variable.js';
import { Table } from 'react-bootstrap';
import ConvertResponseToJson from '../Adapter/ResponseAdapter.js'
const getVendorsUrl = backendRESTUrl + "/vendors";
class VendorTable extends Component {

  constructor(probs) {
    super(probs);
    this.state = {
      isLoading : true,
      vendors : [],
    }
  }

  componentWillMount() {
    this._getVendors();
  }

  _getVendors() {
    const main = this;
    fetch(getVendorsUrl).then(function(response) {
      main.setState({
        isLoading:false
      });
      return ConvertResponseToJson(response);
    }).then(function(data) {
      main.setState({
        vendors: data
      });
    });
  }

  _getVendor(id) {
      window.location.href = 'editVendorDetail/' + id;
  }

  render() {
    if(this.state.isLoading){
      return (
        <div>Vendors are being loaded..</div>
      );
    }
    console.log(this.state.vendors);
    let data = null;
    if(this.state.vendors){
      data = this.state.vendors.map((vendor)=> {
      return (
        <tr onClick={() => this._getVendor(vendor.id) }>
          <td>{vendor.id}</td>
          <td>{vendor.name}</td>
          <td>{vendor.addr}</td>
          <td>{vendor.addrInBill}</td>
          <td>{vendor.tel}</td>
          <td>{vendor.telInBill}</td>
          <td>{vendor.isActive}</td>
        </tr>
      )      
      });
    }
    return (
      <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Vendor Id</th>
          <th>Vendor Name</th>
          <th>Vendor Address</th>
          <th>Vendor Tel.</th>
          <th>Vendor Address (for billing)</th>
          <th>Vendor Tel. (for billing)</th>
          <th>Active</th>
        </tr>
      </thead>
      <tbody>
          {data}
      </tbody>
      </Table>
    );
  } 
}

export default VendorTable;
