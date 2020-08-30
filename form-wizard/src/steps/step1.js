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
            phoneError: true,
        };
      }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    handleChange = input => e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const errorTarget = name + 'Error';
        let pattern;
    
        switch(target.type) {
            case 'text':
                pattern = /[a-zA-Z0-9]+([a-zA-Z0-9 -_])?/g;
                // code block
              break;
            case 'email':
                pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
                break;
            case 'tel':
                pattern = /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
                break;
            default:
                pattern = /[a-zA-Z0-9]/g;
              // default setting
          } 

          if (true === pattern.test(value)){
            this.setState({
                [errorTarget]: false
              })
          } else {
            this.setState({
                [errorTarget]:true
              })
          }
          this.props.updateValue(name, e.target);

        if(this.state.firstNameError===false && this.state.lastNameError===false && 
            this.state.emailError===false && this.state.phoneError===false){
              this.setState({
                isDisabled: false
              })
        }else{
            console.log('firstName:', this.state.firstNameError, ',lsstName:', this.state.lastNameError, ', email:', this.state.emailError, ',phone:', this.state.phoneError)
        }
    }


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
                            {(this.state.emailError && email) &&
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
                            {(this.state.phoneError && phone) &&
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