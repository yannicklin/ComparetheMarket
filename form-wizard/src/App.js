import React from 'react';
import logo from './logo.svg';

import StepForm from './steps/main';

import Container from 'react-bootstrap/Container';
import './App.css';

function App() {
  return (
    <Container className="p-3">
      <StepForm />
    </Container>
  );
}

export default App;
