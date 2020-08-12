import React from 'react';
import axios from 'axios';
import "regenerator-runtime/runtime.js";

import Question from './Question.jsx';
import SubmitQuestion from './SubmitQuestion.jsx';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // props.questions is for testing purposes
      questions: this.props.questions,
      product_name: this.props.product_name,
      product_id: this.props.product_id,
      showSubmitQuestion: false
    }

    this.getQuestions = this.getQuestions.bind(this);
    this.handleOpenSubmit = this.handleOpenSubmit.bind(this);
    this.handleCloseSubmit = this.handleCloseSubmit.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions(qLimit = 2, aLimit = 2) {
    let response = await axios.get('/questions', {
      params: {
        qLimit: qLimit,
        aLimit: aLimit,
        product_id: this.state.product_id
      }
    })

    let isMoreQuestions = response.data.isMoreQuestions;
    let questions = response.data.questions.sort((a, b) => (a.question_helpfulness > b.question_helpfulness) ? -1 : 1);
    this.setState({ questions, isMoreQuestions });
  }

  handleOpenSubmit() {
    this.setState({ showSubmitQuestion: true });
  }

  handleCloseSubmit() {
    this.setState({ showSubmitQuestion: false });
  }

  render() {
    // handles undefined props.questions
    let questions = <span></span>;
    if (this.state.questions) {
      questions = this.state.questions.map((question, index) => {
        return (
          <Question product_name={this.props.product_name} question={question} key={index} />
        );
      })
    }

    let seeMoreQuestions = <span></span>;
    if (this.state.isMoreQuestions) {
      seeMoreQuestions = <Button variant='outline-dark' className='moreQsButton'
        onClick={() => this.getQuestions(this.state.questions.length + 2)} >More Answered Questions</Button>
    }

    return (
      <div className='qaApp'>
        <Accordion className='qaAppInner'>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Questions and Answers
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div className='searchBar'>
                  <InputGroup className="mb-3">
                    <FormControl type="text" className="searchInput"
                      placeholder="Have a question? Search for answers…"
                    />
                    <InputGroup.Append>
                      <Button variant="outline-dark">Search</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>

                <div className='qaDisplay'>
                  {questions}
                  <div className='seeMoreQs'>
                    {seeMoreQuestions}
                  </div>
                </div>

                <SubmitQuestion
                  handleOpenSubmit={this.handleOpenSubmit}
                  handleCloseSubmit={this.handleCloseSubmit}
                  product_name={this.state.product_name}
                  product_id={this.state.product_id}
                  show={this.state.showSubmitQuestion}
                />

              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }

}

export default App;