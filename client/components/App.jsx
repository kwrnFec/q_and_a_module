import React from 'react';
import axios from 'axios';
import Question from './Question.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],

      // will get id from proxy, I think
      product_id: 5
    }

    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    // doesn't limit length yet
    this.getQuestions();
  }

  getQuestions(limit = 2) {
    axios.get('/questions', {
      params: {
        limit: limit,
        product_id: this.state.product_id
      }
    })
      .then((response) => {
        this.setState({ questions: response.data });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        {this.state.questions.map((question, index) => {
          return (
            <Question question={question} key={index}/>
          );
        })}
      </div>
    );
  }

}

export default App;