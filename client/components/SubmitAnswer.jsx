import React, { useState } from 'react';
import axios from 'axios';
import "regenerator-runtime/runtime.js";

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SubmitAnswer = (props) => {
  const [maxImagesUploaded, setMaxImagesUploaded] = useState(false);
  const [answerInput, setAnswerInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [imgUrls, setImgUrls] = useState([]);
  const [validEntry, setValidEntry] = useState(true);
  const [invalidUrl, setInvalidUrl] = useState(false);

  const submitAnswer = () => {
    // isValidEmail is regex for anyString@anyString.anyString
    const isValidEmail = /\S+@\S+\.\S+/;
    let isValidBool = isValidEmail.test(emailInput);

    if (!isValidBool || answerInput === '' || nicknameInput === '') {
      setValidEntry(false);
    } else {
      let answerSubmission = {
        question_id: props.question_id,
        body: answerInput,
        name: nicknameInput,
        email: emailInput,
        photos: imgUrls
      }

      axios.post('/answer/add', answerSubmission);

      setValidEntry(true);
      props.handleCloseSubmit();
    }
  }

  // // converts file to dataUrl
  // // for posible future feature, upload image files
  // const readUploadedFileAsDataUrl = (inputFile) => {
  //   const reader = new FileReader();

  //   return new Promise((resolve, reject) => {
  //     reader.onerror = () => {
  //       reader.abort();
  //       reject(new DOMException("Problem parsing input file."));
  //     };

  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.readAsDataURL(inputFile);
  //   });
  // };

  return (
    <div className='submitAnswer'>
      <div className='submitAButton'>
        <Button variant="outline-dark" onClick={props.handleOpenSubmit}>
          Submit Answer
        </Button>
      </div>

      <Modal show={props.show} onHide={props.handleCloseSubmit} className='submitAnswerModal'>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3>Submit your Answer</h3>
            <h5>{props.product_name}: {props.question_body}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {validEntry ? null : <Alert variant='danger' className='inValidAlert'>You must enter the following:</Alert>}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text className="inputLabel">*Your Answer: </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className='aBodyInput' as="textarea" maxLength={1000}
              onChange={(event) => setAnswerInput(event.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text className="inputLabel">*What is your nickname: </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className='aNameInput' type='text' maxLength={60}
              placeholder='Example: jack543!'
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
            <FormControl className='aEmailInput' type='text' maxLength={60}
              placeholder='Example: jack@email.com'
              onChange={(event) => setEmailInput(event.target.value)}
            />
            <div className='inputMessage'>
              <p>For authentication reasons, you will not be emailed.</p>
            </div>
          </InputGroup>

          <InputGroup className="mb-3" style={maxImagesUploaded ? { display: 'none' } : null}>
            <InputGroup.Prepend>
              <InputGroup.Text className="inputLabel">Enter an Image URL: </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className='aUrlInput' type='text' maxLength={500}
              placeholder='Example: examplesite/example.jpg'
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  let url = event.target.value;
                  event.target.value = '';
                  setImgUrls(imgUrls.concat(url));
                  setInvalidUrl(false);

                  if (imgUrls.length >= 4) {
                    setMaxImagesUploaded(true);
                  }
                }
              }}
            />
            <div className='inputMessage'>
              <p>Press enter/return key to add entered url.</p>
            </div>

            <Alert variant='danger'style={invalidUrl ? null : { display: 'none' }}>
              I'm sorry, that is not a functional image url. Please try a different one.
            </Alert>
          </InputGroup>


          {/* Below is for possible future feature, uploaded image files */}
          {/* <InputGroup className='mb-3 filePickerContainer'>
            <label className='filePickerButton' style={maxImagesUploaded ? { display: 'none' } : null }>
              <input type='file' multiple
                accept='image/*'
                onChange={async (event) => {
                  let imageFileList = Array.from(event.target.files);
                  let imageUrlList = [];

                  for (let i = 0; i < imageFileList.length; i++) {
                    const dataUrl = await readUploadedFileAsDataUrl(imageFileList[i]);
                    imageUrlList.push(dataUrl);
                  }


                  if (imgUrls.length < 4) {
                    let remainingSlots = 5 - imgUrls.length;

                    if (remainingSlots <= imageUrlList.length) {
                      setMaxImagesUploaded(true);
                    }

                    imageUrlList = imageUrlList.slice(0, remainingSlots);
                    setImgUrls(imgUrls.concat(imageUrlList));
                  } else {
                    setMaxImagesUploaded(true);
                  }
                }}
              />
              <i /> Upload your Photos
            </label>

          </InputGroup>*/}

          <div className='thumbnailDiv'>
            {imgUrls.map((url, index) => {
              return (
                <div className='thumbnailContainer' key={index}>
                  <img className='thumbnail' src={url}
                    onError={(event) => {
                      let newImgUrls = imgUrls.filter(url => !event.target.src.includes(url));
                      setImgUrls(newImgUrls);
                      setInvalidUrl(true);
                    }}
                  />
                </div>
              );
            })}
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={submitAnswer} className='saveButton'>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SubmitAnswer;