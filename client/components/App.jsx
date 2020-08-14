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
      accOpen: false,
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
    if (Array.isArray(this.state.questions) && this.state.questions.length > 0) {
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
    } else if (Array.isArray(this.state.questions) && this.state.questions.length === 0) {
      if (this.state.filterDisplay) {
        displayQuestions = (
          <div>
            I'm sorry, no questions or answers match your query. Please try a different one or
          </div>
        );
      }

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
            <Accordion.Toggle
              className='accHeader'
              as={Card.Header} eventKey="0"
              onClick={() => this.setState({ accOpen: !this.state.accOpen })}
            >
              Questions and Answers
              <Chevron direction={this.state.accOpen ? 'up' : 'down'} />
            </Accordion.Toggle>
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

// makes chevron symbol
const Chevron = (props) => {
  if (props.direction === 'down') {
    return (
      <svg width="20px" height="20px" viewBox="0 0 1792 1792" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1683 808l-742 741q-19 19-45 19t-45-19l-742-741q-19-19-19-45.5t19-45.5l166-165q19-19 45-19t45 19l531 531 531-531q19-19 45-19t45 19l166 165q19 19 19 45.5t-19 45.5z" /></svg>

      // // Solid triangle down
      // <svg width="20px" height="20px" viewBox="0 0 16 12" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      //   <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      // </svg>
    );
  } else if (props.direction === 'up') {
    return (
      <svg width="20px" height="20px" viewBox="0 0 1792 1792" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1683 1331l-166 165q-19 19-45 19t-45-19l-531-531-531 531q-19 19-45 19t-45-19l-166-165q-19-19-19-45.5t19-45.5l742-741q19-19 45-19t45 19l742 741q19 19 19 45.5t-19 45.5z" /></svg>

      // Solid triangle up
      // <svg width="20px" height="20px" viewBox="0 0 16 14" className="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      //   <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
      // </svg>
    );
  }
}
