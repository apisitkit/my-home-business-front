import React, { Component } from 'react';
import backendRESTUrl from '../global-variable.js';
import ConvertResponseToJson from '../Adapter/ResponseAdapter.js';
import { Panel, FormGroup, ControlLabel, FormControl, Grid, Row, Col, Button} from 'react-bootstrap';
const getVedor = backendRESTUrl + '/vendor/'
class EditVendorDetail extends Component {
    constructor(probs){
        console.log(probs);
        super(probs);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            isLoading : false,
            vendorNotFound : false,
            id : probs.match.params.vendorId,
            name: { value: "", isValid: null},
            addr: { value: "", isValid: null},
            tel: { value: "", isValid: null},
            addrInBill: { value: "", isValid: null},
            telInBill: { value: "", isValid: null},
        }
    }

    componentWillMount() {
        fetch(getVedor + this.state.id).then((response)=> {
            this.setState({
                isLoading : true,
            })
            return ConvertResponseToJson(response);
        }).then((data)=> {
            if(data.length > 0){
                var vendor = data[0];
                this.setState({
                    isLoading : false,
                    name: { value :vendor.name, isValid: 'success'},
                    addr: { value :vendor.addr, isValid: 'success'},
                    tel: { value :vendor.tel, isValid: 'success'},
                    addrInBill: { value :vendor.addrInBill, isValid: 'success'},
                    telInBill: { value :vendor.telInBill, isValid: 'success'}
                });
            }else{
                this.setState({
                    isLoading : false,
                    vendorNotFound : true,
                });
            }
            
        });
    }

    validateValue(value) {
        if(value.length > 0) {
            return 'success';
        }
        return 'error';
    }
    
    handleChange(e) {
        var state = this.state;
        state[e.target.name]["value"] =  e.target.value;
        state[e.target.name]["isValid"] = this.validateValue(e.target.value);
        this.setState(state);
      }
    

    render(){
        var { isLoading, vendorNotFound, name, addr, tel, addrInBill, telInBill } = this.state;
        console.log('render', isLoading);
        if(isLoading) {
            return (<div>Loading vendor's detail.</div>);
        }
        if(vendorNotFound){
            return (<div>No vendor found.</div>);
        }
        else {
            return (
                <Grid>
                    <Row >
                        <Col xs={12} md={8}>
                            <Panel>
                                <form>
                                    <Panel.Body>
                                        <FormGroup
                                        controlId="formBasicText"
                                        validationState={name.isValid}
                                        >
                                            <ControlLabel> Vendor Name:</ControlLabel>
                                            <FormControl
                                                type="text"
                                                name="name"
                                                value={name.value}
                                                placeholder="Enter text"
                                                onChange={this.handleChange}
                                            />
                                            <FormControl.Feedback />
                                        </FormGroup>
                                        <FormGroup
                                        controlId="formBasicText"
                                        validationState={addr.isValid}
                                        >
                                            <ControlLabel> Vendor Addr:</ControlLabel>
                                            <FormControl
                                                componentClass="textarea"
                                                type="text"
                                                name="addr"
                                                value={addr.value}
                                                placeholder="Enter text"
                                                onChange={this.handleChange}
                                            />
                                            <FormControl.Feedback />
                                        </FormGroup>
                                        <FormGroup
                                        controlId="formBasicText"
                                        validationState={tel.isValid}
                                        >
                                            <ControlLabel> Vendor Tel:</ControlLabel>
                                            <FormControl
                                                type="text"
                                                name="tel"
                                                value={tel.value}
                                                placeholder="Enter text"
                                                onChange={this.handleChange}
                                            />
                                            <FormControl.Feedback />
                                        </FormGroup>
                                        <FormGroup
                                        controlId="formBasicText"
                                        validationState={addrInBill.isValid}
                                        >
                                            <ControlLabel>Vendor Address in Bill:</ControlLabel>
                                            <FormControl
                                                componentClass="textarea"
                                                type="text"
                                                name="addrInBill"
                                                value={addrInBill.value}
                                                placeholder="Enter text"
                                                onChange={this.handleChange}
                                            />
                                            <FormControl.Feedback />
                                        </FormGroup>
                                        <FormGroup
                                        controlId="formBasicText"
                                        validationState={telInBill.isValid}
                                        >
                                            <ControlLabel>Vendor Tel in Bill:</ControlLabel>
                                            <FormControl
                                                type="text"
                                                name="telInBill"
                                                value={telInBill.value}
                                                placeholder="Enter text"
                                                onChange={this.handleChange}
                                            />
                                            <FormControl.Feedback />
                                        </FormGroup>
                                        <Button type="submit">Save</Button>
                                            <Button >Cancel</Button>
                                    </Panel.Body>
                                </form>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            );
        }
    }
}
export default EditVendorDetail;