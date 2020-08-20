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
      helpfulClicked: false,
      reported: false
    }

    this.incrementHelpful = this.incrementHelpful.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  incrementHelpful() {
    // handles user made answers
    let answer_id = this.props.answer.id;
    if (this.props.answer.answer_id) {
      answer_id = this.props.answer.answer_id;
    }
    axios.put('/qa/answer/helpful', { answer_id })
      .catch((err) => {
        console.log(err);
      })
    this.setState({ helpfulness: this.state.helpfulness + 1, helpfulClicked: true });
  }

  reportAnswer() {
    let answer_id = this.props.answer.id;
    if (this.props.answer.answer_id) {
      answer_id = this.props.answer.answer_id;
    }
    axios.put('/qa/answer/report', { answer_id })
      .catch((err) => {
        console.log(err);
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
    let reportButton = <Button variant="outline-dark" size="sm" className="aReportBtn" onClick={this.reportAnswer} >Report</Button>;
    if (this.state.reported) {
      reportButton = <Button variant="secondary" size="sm" className="aReportBtn btn-secondary" >Reported</Button>;
    }

    let helpfulButton = <Button variant="outline-dark" size="sm" className="aHelpfulBtn" onClick={this.incrementHelpful} >Yes ({this.state.helpfulness})</Button>;
    if (this.state.helpfulClicked) {
      helpfulButton = <Button variant="secondary" size="sm" className="aHelpfulBtn" >Yes ({this.state.helpfulness})</Button>;
    }

    return (
      <Container className='answer'>
        <Row>
          <Col className='answerBody'>A: {this.props.answer.body}</Col>
        </Row>
        <Row>
          <Col>by {this.props.answer.answerer_name === 'Seller' ? <b>{this.props.answer.answerer_name}</b> : this.props.answer.answerer_name}, {this.convertDate(this.props.answer.date)}
          </Col>
        </Row>
        <Row className='answerThumbnailDiv'>
          {this.props.answer.photos.map((photo, index) => {
            if (photo.url) {
              photo = photo.url;
            }
            return (
              <div className='answerThumbnailContainer' key={index} >
                <img className='answerThumbnail' src={photo} />
              </div>
            );
          })}
        </Row>
        <Row>
          <Col className='aButtonCol'><span>Helpful? </span>
            {helpfulButton}
            {reportButton}
          </Col>
        </Row>
      </Container >
    );
  }
}

export default Answer;