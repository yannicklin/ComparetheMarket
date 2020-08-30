import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

class Submission extends Component {

    /**
     * Function: process to previous step
     */
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    /**
     * Function: step page rendering
     */
    render(){
        const { firstName, lastName, email, phone, streetNumber, streetName, streetType, suburb, postCode } = this.props;
        return(
            <>
                <h2>Before submittin, please reconfirm these inouts:</h2>
                First Name: <b>{firstName}</b><br />
                Last Name: <b>{lastName}</b><br />
                Email: <b>{email}</b><br />
                {phone.length > 0 &&
                    <>
                        Phone: <b>{phone}</b><br />
                    </>
                }
                Street: <b>{streetNumber} {streetName} {streetType} </b><br />
                Suburb: <b>{suburb} {postCode}</b><br />
                <Button className="Back" onClick={this.back}>
                    « Back
                </Button>
            </>
        );
    }
}

export default Submission;