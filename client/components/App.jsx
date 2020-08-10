import React from 'react';
import axios from 'axios';

import Question from './Question.jsx';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // props.questions is for testing purposes
      questions: this.props.questions,
      product_id: this.props.product_id
    }

    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions(qLimit = 2, aLimit = 2) {
    axios.get('/questions', {
      params: {
        qLimit: qLimit,
        aLimit: aLimit,
        product_id: this.state.product_id
      }
    })
      .then((response) => {
        let isMoreQuestions = response.data.isMoreQuestions;
        let questions = response.data.questions.sort((a, b) => (a.question_helpfulness > b.question_helpfulness) ? -1 : 1);
        this.setState({ questions, isMoreQuestions });
      })
      .catch((err) => {
        // console.log(err);
      })
  }

  render() {

    // handles undefined props.questions
    let questions = <span></span>;
    if (this.state.questions) {
      questions = this.state.questions.map((question, index) => {
        return (
          <Question question={question} key={index} />
        );
      })
    }

    let seeMoreQuestions = <span></span>;
    if (this.state.isMoreQuestions) {
      seeMoreQuestions = <Button variant='primary' className='moreQsbutton'
        onClick={() => { this.getQuestions(this.state.questions.length + 2) }} >See More Questions</Button>
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
              <Card.Body className='qaDisplay'>
                {questions}
                {seeMoreQuestions}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }

}

export default App;