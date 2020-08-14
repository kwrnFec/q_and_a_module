import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import ReactDom from 'react-dom';

const Search = (props) => {

  const onChangeSearch = (event) => {
    let input = event.target.value.toLowerCase();
    // make no reference copy
    let questions = JSON.parse(JSON.stringify(props.questions));

    if (input.length >= 3) {
      let filteredQuestions = [];

      for (let i = 0; i < questions.length; i++) {
        let matchingAnswers = answersHasTarget(questions[i].answers, input);
        if (questions[i].question_body.toLowerCase().includes(input)) {
          filteredQuestions.push(questions[i]);
        } else if (matchingAnswers) {
          questions[i].answers = matchingAnswers;
          filteredQuestions.push(questions[i]);
        }
      }

      props.setFilteredQuestions(filteredQuestions);
      props.setFilterState(true);
    } else {
      props.setFilterState(false);
    }
  }

  const answersHasTarget = (answers, target) => {
    // returns object of matching answers if yes, false if no
    let matches = [];
    for (let answer in answers) {
      if (answer !== 'isMoreAnswers') {
        if (answers[answer].body.toLowerCase().includes(target)) {
          matches.push(answers[answer]);
        }
      }
    }

    let matchesObj = matches.reduce((obj, answer) => {
      if (answer.id) {
        obj[answer.id] = answer;
      } else {
        obj[answer.answer_id] = answer;
      }
      return obj;
    }, {});

    matchesObj.isMoreAnswers = (Object.keys(answers).length - 1) > matches.length;

    // console.log(matches);
    // console.log(matchesObj)

    if (matches.length === 0) {
      return false;
    } else {
      return matchesObj;
    }

  }

  return (
    <div className='searchBar'>
      <InputGroup className="mb-3">
        <FormControl
          onChange={onChangeSearch}
          type="text" className="searchInput"
          placeholder="Have a question? Search for answers…"
        />
      </InputGroup>
    </div>
  );
}

export default Search;