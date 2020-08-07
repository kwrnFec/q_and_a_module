import React from 'react';
import axios from 'axios';
import 'regenerator-runtime/runtime';

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

  async componentDidMount() {
    this.getQuestions();
  }

  // async things have to do with testing I think
  async getQuestions(qLimit = 4, aLimit = 2) {
    axios.get('/questions', {
      params: {
        qLimit: qLimit,
        aLimit: aLimit,
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