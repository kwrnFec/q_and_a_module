import React from 'react';
import axios from 'axios';

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

  render() {
    console.log(this.props.answer);

    return (
      <div>
        <p>A: {this.props.answer.body}</p>
        <p>by {this.props.answer.answerer_name}</p>
        <button className='helpful' onClick={this.incrementHelpful} >Helpful? {this.state.helpfulness}</button>
      </div>
    );
  }

}

export default Answer;