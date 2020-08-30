import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class ContactInfo extends Component{
    constructor() {
        super();
        this.state = {
            isDisabled: true,
            firstNameError: true,
            lastNameError: true,
            emailError: true,
            phoneError: false,
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
                pattern = /[a-zA-Z0-9]+([a-zA-Z0-9 -_])?/g;
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
        
        // Special Handing for Phone. This field is optional.
        errorStatus = ('phone' === name && 0 === value.length) ? false : errorStatus;

        // Update the Error Satus also stored the value into state
        this.setState({
            [errorTarget]:errorStatus
        });
        this.props.updateValue(name, e.target);

        // Decide the Next Step Enability, based on all Errors 
        if(this.state.firstNameError===false && this.state.lastNameError===false && 
            this.state.emailError===false && this.state.phoneError===false){
              this.setState({
                isDisabled: false
              });
        }
    }

    /**
     * Function: step page rendering
     */
    render(){
        const { firstName, lastName, email, phone } = this.props;
        
        return(
            <>
                <Form>
                    <h2>Enter your personal information:</h2>
                    <Form.Row>
                        <Form.Label column sm={1}> Name* </Form.Label>
                        <Col>
                            <input
                                required
                                type="text"
                                className="form-control"
                                name="firstName"
                                value={firstName}
                                onChange={this.handleChange('firstName')}
                            />
                        </Col>
                        <Col>
                            <input
                                required
                                type="text"
                                className="col-auto form-control"
                                name="lastName"
                                value={lastName}
                                placeholder="Last Name"
                                onChange={this.handleChange('lastName')}
                            />
                        </Col>
                    </Form.Row>
                    {(this.state.firstNameError || this.state.lastNameError) &&
                        <>
                            <Col sm={{offset:1}}>
                                <Form.Text id="NameError" muted>
                                    First Name and Last Name are both required.
                                </Form.Text>
                            </Col>
                        </>
                    }
                    <Form.Row>
                        <Form.Label column sm={1}>Email*</Form.Label>
                        <Col>
                            <input
                                required
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={this.handleChange('email')}
                            />
                            {(this.state.emailError) &&
                                <>
                                    <Form.Text id="emailError" muted>
                                        Please input a valid email address.
                                    </Form.Text>
                                </>
                            }
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label column sm={1}>Phone</Form.Label>
                        <Col>
                            <input
                                type="tel"
                                className="form-control"
                                name="phone"
                                value={phone}
                                placeholder="Phone"
                                onChange={this.handleChange('phone')}
                            />
                            {(this.state.phoneError) &&
                            <>
                                <Form.Text id="phoneError" muted>
                                    Please input a valid phone number.
                                </Form.Text>
                            </>
                        }
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Button className="Next" onClick={this.continue} disabled={this.state.isDisabled}>
                            Next »
                        </Button>
                    </Form.Row>
                </Form>
            </>
        );
    }
}

export default ContactInfo;