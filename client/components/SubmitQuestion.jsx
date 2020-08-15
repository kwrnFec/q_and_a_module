import React, { useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

const SubmitQuestion = (props) => {
  const [questionInput, setQuestionInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [validEntry, setValidEntry] = useState(true);

  const submitQuestion = () => {
    // isValidEmail is regex for anyString@anyString.anyString
    const isValidEmail = /\S+@\S+\.\S+/;
    let isValidBool = isValidEmail.test(emailInput);

    if (!isValidBool || questionInput === '' || nicknameInput === '') {
      setValidEntry(false);
    } else {
      let questionSubmission = {
        product_id: props.product_id,
        body: questionInput,
        name: nicknameInput,
        email: emailInput
      }

      axios.post('/question/add', questionSubmission);

      setValidEntry(true);
      props.handleCloseSubmit();
    }
  }

  return (
    <div className='submitQuestion'>
      <div className='submitQButton'>
        <Button variant="outline-dark" onClick={props.handleOpenSubmit}>
          Submit Question
        </Button>
      </div>

      <Modal show={props.show} onHide={props.handleCloseSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3>Ask Your Question</h3>
            <h5>About the {props.product_name}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {validEntry ? null : <Alert variant='danger' className='inValidAlert'>You must enter the following:</Alert>}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text className="inputLabel">*Your Question: </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className='qBodyInput' as="textarea" maxLength={1000}
              onChange={(event) => setQuestionInput(event.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text className="inputLabel">*What is your nickname: </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className='qNameInput' type='text' maxLength={60}
              placeholder='Example: jackson11!'
              onChange={(event) => setNicknameInput(event.target.value)}
            />
            <div className='inputMessage'>
              <p>For privacy reasons, do not use your full name or email address.</p>
            </div>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text className="inputLabel">*What is your email: </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className='qEmailInput' type='text' maxLength={60}
              placeholder='Example: mwatney@mars.com'
              onChange={(event) => setEmailInput(event.target.value)}
            />
            <div className='inputMessage'>
              <p>For authentication reasons, you will not be emailed.</p>
            </div>
          </InputGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" className='saveButton' onClick={submitQuestion}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SubmitQuestion;