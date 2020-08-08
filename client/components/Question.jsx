import React from 'react';
import axios from 'axios';

import Answer from './Answer.jsx';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: this.props.question.question_helpfulness,
      helpfulClicked: false
    }

    this.incrementHelpfulQuestion = this.incrementHelpfulQuestion.bind(this);
  }

  incrementHelpfulQuestion() {
    if (this.state.helpfulClicked === false) {
      axios.put('/question/helpful', { question_id: this.props.question.question_id });
      this.setState({ helpfulness: this.state.helpfulness + 1, helpfulClicked: true });
    } else {
      alert('You can only mark an question as helpful once.');
    }
  }

  render() {
    let isMoreAnswers;
    let answersObj = this.props.question.answers;
    let answers = [];
    for (let id in answersObj) {
      if (id === 'isMoreAnswers') {
        isMoreAnswers = answersObj[id];
      } else {
        answers.push(answersObj[id]);
      }
    }
    // sort array of answers by helpfulness
    answers.sort((a, b) => (a.helpfulness > b.helpfulness) ? -1 : 1);

    // moves seller answers to top of the list
    for (let i = answers.length - 1; i >= 0; i--) {
      if (answers[i].answerer_name === 'Seller') {
        let sellerAns = answers.splice(i, 1);
        answers.unshift(sellerAns[0]);
      }
    }

    let moreAnswers = <span></span>;
    if (isMoreAnswers) {
      moreAnswers = <Col xs={6}><Button>More Answers</Button></Col>;
    }
    console.log(moreAnswers);

    return (
      <div>
        <Container style={{ border: '2px solid black', margin: '5px' }}>
          <Row>
            <Col md='auto'><h5>Q: {this.props.question.question_body}</h5></Col>
            <Col></Col>
            <Col xs={6}>Helpful? <Button variant="primary" className="btn-primary"
              onClick={this.incrementHelpfulQuestion} >
              Yes ({this.state.helpfulness})</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {answers.map((answer, index) => {
                return (
                  <Answer answer={answer} key={index} />
                );
              })}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            {moreAnswers}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Question;