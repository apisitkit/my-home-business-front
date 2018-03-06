import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import VendorTable from './VendorManagement/VendorTable';
import EditVendorDetail from './VendorManagement/EditVendorDetail';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">My App</a>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
            <div>
                <Route exact path="/" component={VendorTable} />
                <Route path="/editVendorDetail/:vendorId" component={EditVendorDetail} />
            </div>
        </div>
    </BrowserRouter>, document.getElementById('root') );
registerServiceWorker();