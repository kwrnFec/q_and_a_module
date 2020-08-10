import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Answer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      helpfulness: this.props.answer.helpfulness,
      helpfulClicked: false
    }

    this.incrementHelpful = this.incrementHelpful.bind(this);
  }

  incrementHelpful() {
    if (this.state.helpfulClicked === false) {
      axios.put('/answer/helpful', { answer_id: this.props.answer.id });
      this.setState({ helpfulness: this.state.helpfulness + 1, helpfulClicked: true });
    } else {
      alert('You can only mark an answer as helpful once.');
    }
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

    return (
      <Container>
        <Row>
          <Col>A: {this.props.answer.body}</Col>
        </Row>
        <Row>
          <Col>by {this.props.answer.answerer_name === 'Seller' ? <b>{this.props.answer.answerer_name}</b> : this.props.answer.answerer_name}, {this.convertDate(this.props.answer.date)}
          </Col>
        </Row>
        <Row>
          <Col>Helpful? <Button variant="primary" className="btn-primary" onClick={this.incrementHelpful} >Yes ({this.state.helpfulness})</Button></Col>
        </Row>
      </Container>
    );
  }

}

export default Answer;