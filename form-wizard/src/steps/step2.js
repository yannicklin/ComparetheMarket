import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class AddressInfo extends Component {
    constructor() {
        super();
        this.state = {
            isDisabled: true,
            streetNumberError: true,
            streetNameError: true,
            streetTypeError: true,
            suburbError: true,
            postCodeError: true,
        };
      }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const { streetNumber, streetName, streetType, suburb, postCode, updateValue } = this.props;
        return(
            <>
                <Form>
                    <h2>Enter your address information:</h2>
                    <Form.Row>
                        <Form.Label column sm={1}> Street* </Form.Label>
                        <Col>
                            <input
                                required
                                type="number"
                                className="form-control"
                                name="streetNumber"
                                value={streetNumber}
                                placeholder="Street Number"
                                onChange={updateValue('streetNumber')}
                            />
                        </Col>
                        <Col>
                            <input
                                required
                                type="text"
                                className="form-control"
                                name="streetName"
                                value={streetName}
                                placeholder="Street Name"
                                onChange={updateValue('streetName')}
                            />
                        </Col>
                        <Col>
                            <select
                                required
                                className="form-control"
                                name="streetType"
                                multiple={false}
                                value={streetType}
                                defaultValue={"Cl"}
                                placeholder="Street Type"
                                onChange={updateValue('streetType')}
                            >
                                <option>Cl</option>
                                <option>Ct</option>
                                <option>St</option>
                                <option>Pl</option>
                                <option>Ave</option>
                            </select>
                        </Col>       
                    </Form.Row>
                    <Form.Row>
                        <Form.Label column sm={1}> Suburb* </Form.Label>
                        <Col>
                            <input
                                required
                                type="text"
                                className="form-control"
                                name="suburb"
                                value={suburb}
                                placeholder="Suburb"
                                onChange={updateValue('suburb')}
                            />
                        </Col>
                       
                    </Form.Row>
                    <Form.Row>
                        <Form.Label column sm={1}> Post Code* </Form.Label>
                        <Col>
                            <input
                                required
                                type="text"
                                className="form-control"
                                name="postCode"
                                value={postCode}
                                placeholder="Post Code"
                                onChange={updateValue('postCode')}
                                aria-describedby="postcodeHelpBlock"
                            />
                            <Form.Text id="pastocdeHelpBlock" muted>
                                Your postcode must be in the inclusive range of 0800 - 7999 
                            </Form.Text>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Button className="Back" onClick={this.back}>
                            « Back
                        </Button>
                        <Button className="Next" onClick={this.continue} disabled={!this.state.isDisabled}>
                            Next »
                        </Button>
                    </Form.Row>
                </Form>
            </>
        );
    }
}

export default AddressInfo;