import React from 'react';
import Answer from './Answer.jsx';

const Question = (props) => {
  let answersObj = props.question.answers;
  let answers = [];
  for (let id in answersObj) {
    answers.push(answersObj[id]);
  }
  // sort array of answers by helpfulness
  answers.sort((a, b) => (a.helpfulness > b.helpfulness) ? -1 : 1)

  return (
    <div>
      <h5>Q: {props.question.question_body}</h5>
      <button>Helpful? {props.question.question_helpfulness}</button>
      {answers.map((answer, index) => {
        return (
          <Answer answer={answer} key={index} />
        );
      })}
    </div>
  );
}

export default Question;