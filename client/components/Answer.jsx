import React from 'react';

const Answer = (props) => {

  return (
    <div>
      <p>A: {props.answer.body}</p>
    </div>
  );
}

export default Answer;