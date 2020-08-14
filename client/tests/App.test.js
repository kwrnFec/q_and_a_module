import React from 'react';
import App from '../components/App.jsx';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import "regenerator-runtime/runtime.js";

const testQuestionList = [{ "question_id": 34, "question_body": "Can I wash it?", "question_date": "2017-01-04T00:00:00.000Z", "asker_name": "luaulover", "question_helpfulness": 23, "reported": 0, "answers": { "43": { "id": 43, "body": "I wouldn't machine wash it", "date": "2017-11-04T00:00:00.000Z", "answerer_name": "skilover", "helpfulness": 6, "photos": [] }, "55": { "id": 55, "body": "Only if you want to ruin it!", "date": "2017-11-04T00:00:00.000Z", "answerer_name": "skilover", "helpfulness": 5, "photos": [] }, "isMoreAnswers": true } }, { "question_id": 38, "question_body": "How long does it last?", "question_date": "2019-06-28T00:00:00.000Z", "asker_name": "funnygirl", "question_helpfulness": 5, "reported": 0, "answers": { "70": { "id": 70, "body": "Some of the seams started splitting the first time I wore it!", "date": "2019-11-28T00:00:00.000Z", "answerer_name": "sillyguy", "helpfulness": 6, "photos": [] }, "124907": { "id": 124907, "body": "Super Long Time", "date": "2020-06-30T00:00:00.000Z", "answerer_name": "JJ", "helpfulness": 0, "photos": [] }, "isMoreAnswers": true } }, { "question_id": 35, "question_body": "Where is this product made?", "question_date": "2018-07-06T00:00:00.000Z", "asker_name": "bballfan", "question_helpfulness": 2, "reported": 0, "answers": { "27": { "id": 27, "body": "Canada", "date": "2018-08-06T00:00:00.000Z", "answerer_name": "footballfan", "helpfulness": 9, "photos": [] }, "isMoreAnswers": false } }, { "question_id": 35476, "question_body": "What is the fabric made out of?", "question_date": "2020-01-10T00:00:00.000Z", "asker_name": "axel92", "question_helpfulness": 1, "reported": 0, "answers": { "isMoreAnswers": false } }];

describe('App Component', () => {
  it('should call the getQuestions function', () => {

    const wrapper = shallow(<App />);

    const spyGetQuestions = jest.spyOn(wrapper.instance(), 'getQuestions');
    wrapper.instance().forceUpdate();
    wrapper.instance().componentDidMount();
    expect(spyGetQuestions).toHaveBeenCalled();
  })

  it('should display questions after getQuestions resolves', async () => {
    const wrapper = shallow(<App questions={[]} product_id={0} product_name={'Test Product Name'} />);

    let stateBefore = wrapper.state();

    let instance = wrapper.instance();

    await instance.getQuestions();

    let stateAfter = wrapper.state();

    let questions = wrapper.find('.qaDisplay').props().children[0];

    // checks if questions were added to state
    expect(stateAfter.questions).not.toEqual(stateBefore.questions);

    // checks if questions were added to the dom
    expect(questions.length).toBeGreaterThan(0);
  })

  it('should change to filtered questions and back if more than 3 chars is entered in the search bar', async () => {
    const wrapper = await mount(<App questions={[]} product_id={0} product_name={'Test Product Name'} />)

    let searchInput = wrapper.find('.searchBar input');
    await searchInput.simulate('change', { target: { value: 'ruin'} });

    // tests if the functions returned correctly and the correct values were displayed
    expect(wrapper.state('filterDisplay')).toBe(true);
    let result = wrapper.state('filteredQuestions')[0].answers[55].body;
    expect(result).toBe('Only if you want to ruin it!');
    let displayed = wrapper.find('.answerBody').at(0).props().children[1];
    expect(displayed).toBe(result);

    await searchInput.simulate('change', { target: { value: 'ru'} });

    // tests if the App displays the original data
    expect(wrapper.state('filterDisplay')).toBe(false);
    displayed = wrapper.find('.answerBody').at(0).props().children[1];
    expect(displayed).toBe('I wouldn\'t machine wash it');
  })

  it('should match test snapshot', () => {
    const appDisplay = renderer.create(<App questions={testQuestionList} product_id={0} />).toJSON();
    expect(appDisplay).toMatchSnapshot();
  })
});