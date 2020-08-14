import React from 'react';
import Search from '../components/Search.jsx';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import "regenerator-runtime/runtime.js";

const testQuestionList = [{ "question_id": 34, "question_body": "Can I wash it?", "question_date": "2017-01-04T00:00:00.000Z", "asker_name": "luaulover", "question_helpfulness": 23, "reported": 0, "answers": { "43": { "id": 43, "body": "I wouldn't machine wash it", "date": "2017-11-04T00:00:00.000Z", "answerer_name": "skilover", "helpfulness": 6, "photos": [] }, "55": { "id": 55, "body": "Only if you want to ruin it!", "date": "2017-11-04T00:00:00.000Z", "answerer_name": "skilover", "helpfulness": 5, "photos": [] }, "isMoreAnswers": true } }, { "question_id": 38, "question_body": "How long does it last?", "question_date": "2019-06-28T00:00:00.000Z", "asker_name": "funnygirl", "question_helpfulness": 5, "reported": 0, "answers": { "70": { "id": 70, "body": "Some of the seams started splitting the first time I wore it!", "date": "2019-11-28T00:00:00.000Z", "answerer_name": "sillyguy", "helpfulness": 6, "photos": [] }, "124907": { "id": 124907, "body": "Super Long Time", "date": "2020-06-30T00:00:00.000Z", "answerer_name": "JJ", "helpfulness": 0, "photos": [] }, "isMoreAnswers": true } }, { "question_id": 35, "question_body": "Where is this product made?", "question_date": "2018-07-06T00:00:00.000Z", "asker_name": "bballfan", "question_helpfulness": 2, "reported": 0, "answers": { "27": { "id": 27, "body": "Canada", "date": "2018-08-06T00:00:00.000Z", "answerer_name": "footballfan", "helpfulness": 9, "photos": [] }, "isMoreAnswers": false } }, { "question_id": 35476, "question_body": "What is the fabric made out of?", "question_date": "2020-01-10T00:00:00.000Z", "asker_name": "axel92", "question_helpfulness": 1, "reported": 0, "answers": { "isMoreAnswers": false } }];

describe('App Component', () => {
  it('should call setFilterState and setFilteredQuestions on change when more than 3 chars are input', async () => {
    const mockSetFilterState = jest.fn();
    const mockSetFilteredQuestions = jest.fn();

    const wrapper = shallow(
      <Search
        questions={testQuestionList}
        setFilterState={mockSetFilterState}
        setFilteredQuestions={mockSetFilteredQuestions}
      />
    );

    let inputEvent = { target: { value: 'ruin' } };

    let searchInput = wrapper.find('.searchInput');

    await searchInput.simulate('change', inputEvent);

    expect(mockSetFilterState.mock.calls[0][0]).toBe(true);

    expect(mockSetFilteredQuestions.mock.calls[0][0]).toHaveLength(1);
  })

  it('should match test snapshot', () => {
    const appDisplay = renderer.create(<Search questions={testQuestionList} />).toJSON();
    expect(appDisplay).toMatchSnapshot();
  })
});