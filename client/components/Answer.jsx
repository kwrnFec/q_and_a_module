import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

class Answer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      helpfulness: this.props.answer.helpfulness,
      helpfulClicked: false,
      reported: false
    }

    this.incrementHelpful = this.incrementHelpful.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  incrementHelpful() {
    if (this.state.helpfulClicked === false) {
      // handles user made answers
      let answer_id = this.props.answer.id;
      if (this.props.answer.answer_id) {
        answer_id = this.props.answer.answer_id;
      }
      axios.put('/answer/helpful', { answer_id })
        .catch((err) => {
          // commented for tests
          // un-comment to check errors
          // console.log(err);
        })
      this.setState({ helpfulness: this.state.helpfulness + 1, helpfulClicked: true });
    } else {
      // may replace with something nicer looking later
      alert('You can only mark an answer as helpful once.');
    }
  }

  reportAnswer() {
    let answer_id = this.props.answer.id;
    if (this.props.answer.answer_id) {
      answer_id = this.props.answer.answer_id;
    }
    axios.put('/answer/report', { answer_id })
      .catch((err) => {
        // commented for tests
        // un-comment to check errors
        // console.log(err);
      })
    this.setState({ reported: true });
  }

  convertDate(dateString) {
    const year = dateString.slice(0, 4);
    let month = Number(dateString.slice(5, 7)) - 1;
    const day = dateString.slice(8, 10);

    const months = ["January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October", "November", "December"];

    month = months[month];

    return (`${month} ${day}, ${year}`);
  }

  render() {
    if (!this.state.reported) {
      return (
        <Container className='answer'>
          <Row>
            <Col>A: {this.props.answer.body}</Col>
          </Row>
          <Row>
            <Col>by {this.props.answer.answerer_name === 'Seller' ? <b>{this.props.answer.answerer_name}</b> : this.props.answer.answerer_name}, {this.convertDate(this.props.answer.date)}
            </Col>
          </Row>
          <Row>
            <Col><span>Helpful? </span>
              <Button variant="primary" className="btn-primary aHelpfulBtn" onClick={this.incrementHelpful} >Yes ({this.state.helpfulness})</Button>
              <Button variant="danger" className="btn-primary aReportBtn" onClick={this.reportAnswer} >Report</Button>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (<Alert variant='dark' className='reportedAnswer'>You have reported this Answer.</Alert>);
    }

  }

}

export default Answer;