import React from 'react';
import axios from 'axios';
import "regenerator-runtime/runtime.js";


import Question from './Question.jsx';
import SubmitQuestion from './SubmitQuestion.jsx';
import Search from './Search.jsx';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // props.questions is for testing purposes
      questions: this.props.questions,
      product_name: this.props.product_name,
      product_id: this.props.product_id,
      showSubmitQuestion: false,
      filterDisplay: false,
      filteredQuestions: []
    }

    this.getQuestions = this.getQuestions.bind(this);
    this.handleOpenSubmit = this.handleOpenSubmit.bind(this);
    this.handleCloseSubmit = this.handleCloseSubmit.bind(this);
    this.changeAnswers = this.changeAnswers.bind(this);
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

  changeAnswers(question_id, newAnswers) {
    // makes deep copy of questions
    let questions = JSON.parse(JSON.stringify(this.state.questions));

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].question_id === question_id) {
        questions[i].answers = newAnswers;
      }
    }

    this.setState({ questions });
  }

  handleOpenSubmit() {
    this.setState({ showSubmitQuestion: true });
  }

  handleCloseSubmit() {
    this.setState({ showSubmitQuestion: false });
  }

  render() {

    // handles undefined props.questions
    let displayQuestions = <span></span>;
    if (this.state.questions) {
      let questions = this.state.questions;
      if (this.state.filterDisplay) {
        questions = this.state.filteredQuestions;
      }

      displayQuestions = questions.map((question, index) => {
        return (
          <Question product_name={this.props.product_name}
            changeAnswers={this.changeAnswers}
            question={question} key={index}
          />
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
                <Search
                  questions={this.state.questions}
                  setFilterState={(bool) => this.setState({ filterDisplay: bool })}
                  setFilteredQuestions={(fQs) => this.setState({ filteredQuestions: fQs })}
                />

                <div className='qaDisplay'>
                  {displayQuestions}
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