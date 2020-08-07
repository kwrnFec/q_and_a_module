import React from 'react';
import Answer from './Answer.jsx';

const Question = (props) => {

  let answerObj = props.question.answers;
  let answers = [];
  for (let id in answerObj) {
    answers.push(<Answer answer={answerObj[id]} key={id} />);
  }

  return (
    <div>
      <h5>Q: {props.question.question_body}</h5>
      {answers}
    </div>
  );
}

export default Question;