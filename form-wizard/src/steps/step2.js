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
            streetTypeError: false,
            suburbError: true,
            postCodeError: true,
        };
      }

    /**
     * Function: process to next step
     */
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    /**
     * Function: process to previous step
     */
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    /**
     * Function: handle the field value change, also with validations
     */
    handleChange = input => e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const errorTarget = name + 'Error';
        let pattern, errorStatus;
    
        switch(target.type) {
            case 'number':
                pattern = /[0-9]/g;
                break;
            case 'text':
                if (name === 'postCode') {
                    pattern = /(^08[0-9]{2}$)|(^[1-7][0-9]{3}$)/;
                } else {
                    pattern = /[a-zA-Z0-9]+([a-zA-Z0-9 -_])?/g;
                }
                break;
            case 'email':
                pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
                break;
            case 'tel':
                pattern = /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
                break;
            default:
                pattern = /[a-zA-Z0-9]/g;
                break;
        } 
        
        if (true === pattern.test(value)){
            errorStatus = false;
        } else {
            errorStatus = true;
        }

        // Update the Error Satus also stored the value into state
        this.setState({
            [errorTarget]:errorStatus
        });
        this.props.updateValue(name, e.target);

        // Decide the Next Step Enability, based on all Errors 
        if(this.state.streetNumberError===false && this.state.streetNameError===false && 
            this.state.streetTypeError===false && this.state.suburbError===false && this.state.postCodeError===false){
              this.setState({
                isDisabled: false
              });
        }else{
            console.log('streetNumber: ', this.state.streetNumberError, ",streetName: ", this.state.streetNameError, ",suburbError: ", this.state.suburbError)

        }
    }

    /**
     * Function: step page rendering
     */
    render(){
        const { streetNumber, streetName, streetType, suburb, postCode } = this.props;
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
                                onChange={this.handleChange('streetNumber')}
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
                                onChange={this.handleChange('streetName')}
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
                                onChange={this.handleChange('streetType')}
                            >
                                <option>Cl</option>
                                <option>Ct</option>
                                <option>St</option>
                                <option>Pl</option>
                                <option>Ave</option>
                            </select>
                        </Col>       
                    </Form.Row>
                    {(this.state.streetNumberError) &&
                        <>
                            <Col sm={{offset:1}}>
                                <Form.Text id="streetNumberError" muted>
                                    Please input a valid Street Number.
                                </Form.Text>
                            </Col>
                        </>
                    }
                    {(this.state.streetNameError) &&
                        <>
                            <Col sm={{offset:1}}>
                                <Form.Text id="streetNameError" muted>
                                    Street Name is needed.
                                </Form.Text>
                            </Col>
                        </>
                    }
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
                                onChange={this.handleChange('suburb')}
                            />
                            {(this.state.suburbError) &&
                                <>
                                    <Form.Text id="suburbError" muted>
                                        Please input the Suburb.
                                    </Form.Text>
                                </>
                            }
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
                                onChange={this.handleChange('postCode')}
                                aria-describedby="postcodeHelpBlock"
                            />
                            <Form.Text id="pastcodeHelpBlock" muted>
                                Your postcode must be in the inclusive range of 0800 - 7999 
                            </Form.Text>
                            {(this.state.postCodeError) &&
                                <>
                                    <Form.Text id="postCodeError" muted>
                                        Please input a valid post code.
                                    </Form.Text>
                                </>
                            }
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Button className="Back" onClick={this.back}>
                            « Back
                        </Button>
                        <Button className="Next" onClick={this.continue} disabled={this.state.isDisabled}>
                            Next »
                        </Button>
                    </Form.Row>
                </Form>
            </>
        );
    }
}

export default AddressInfo;