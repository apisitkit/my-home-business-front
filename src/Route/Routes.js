import React from 'react';
import { Route } from 'react-router-dom';
import VendorTable from '../VendorManagement/VendorTable';
import EditVendorDetail from '../VendorManagement/EditVendorDetail';

const Routes = () => (
    <div>
        <Route path="/" component={VendorTable} />
        <Route path="/editVendorDetail" component={EditVendorDetail} />
    </div>
)
export default Routes;