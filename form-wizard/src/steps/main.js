import React, { Component } from 'react';

import ContactInfo from './step1';
import AddressInfo from './step2';
import Submission from './submission';

import ProgressBar from 'react-bootstrap/ProgressBar';

export class StepForm extends Component {
    /**
     * Overall Fields stored
     */
    state = {
        step: 1, // initial step

        // fields of step 1
        firstName: '',
        lastName: '',
        email: '',
        phone: '',

        // fields of step 2
        streetNumber: '',
        streetName: '',
        streetType: '',
        suburb: '',
        postCode: ''
    }

     /**
     * Function: process to next step
     */
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

     /**
     * Function: process to next step
     */
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }


     /**
     * Function: process to next step
     */
    updateValue = (input, target) => {
        this.setState({[input]: target.value});
    }


     /**
     * Function: call the related step component
     */
    showStep = () => {
        const { step, firstName, lastName, email, phone, streetNumber, streetName, streetType, suburb, postCode } = this.state;

        if(step === 1)
            return (<ContactInfo 
                nextStep = {this.nextStep} 
                updateValue = {this.updateValue}
                firstName = {firstName} 
                lastName = {lastName}
                email = {email} 
                phone = {phone}
            />);
        if(step === 2)
            return (<AddressInfo 
                nextStep = {this.nextStep} 
                prevStep = {this.prevStep}
                updateValue = {this.updateValue} 
                streetNumber = {streetNumber}
                streetName = {streetName}
                streetType = {streetType}
                suburb = {suburb}
                postCode = {postCode}
            />);
        if(step === 3)
            return (<Submission 
                firstName = {firstName} 
                lastName = {lastName}
                email = {email} 
                phone = {phone}
                streetNumber = {streetNumber}
                streetName = {streetName}
                streetType = {streetType}
                suburb = {suburb}
                postCode = {postCode}
                prevStep = {this.prevStep}
            />);
    }

    /**
     * Function: step page rendering
     */
    render(){
        const { step } = this.state;
        
        return(
            <>
                <ProgressBar animated now={(step - 1) * (100/2)} label={`${(step - 1) * (100/2)}%`} />
                {this.showStep()}
            </>
        );
    }
}

export default StepForm;