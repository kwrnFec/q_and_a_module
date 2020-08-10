import React from 'react';
import Question from '../components/Question.jsx';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

// Test Data for Question
const testQuestion = {"question_id":34,"question_body":"Can I wash it?","question_date":"2017-01-04T00:00:00.000Z","asker_name":"luaulover","question_helpfulness":23,"reported":0,"answers":{"10":{"id":10,"body":"I've thrown it in the wash and it seems fine","date":"2017-01-04T00:00:00.000Z","answerer_name":"skilover","helpfulness":9,"photos":["https://images.unsplash.com/photo-1510551310160-589462daf284?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80","https://images.unsplash.com/photo-1469504512102-900f29606341?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"]},"11":{"id":11,"body":"It says not to","date":"2017-01-04T00:00:00.000Z","answerer_name":"skilover","helpfulness":5,"photos":[]},"isMoreAnswers":true}};

describe('Question Component', () => {
  it('should change state.helpfulClicked to true and increment helpfulness on click of "Helpful? Yes" button', () => {
    const wrapper = shallow(<Question question={testQuestion} key={0}/>);
    let preClickHelpfulness = wrapper.state('helpfulness');

    let helpfulButton = wrapper.find('.qHelpfulButton');

    helpfulButton.simulate('click');

    let helpfulState = wrapper.state('helpfulClicked');
    let postClickHelpfulness = wrapper.state('helpfulness');

    expect(helpfulState).toEqual(true);
    expect(postClickHelpfulness).toEqual(preClickHelpfulness + 1);
  })

  it('should match test snapshot', () => {
    const questionDisplay = renderer.create(<Question question={testQuestion} key={0}/>).toJSON();
    expect(questionDisplay).toMatchSnapshot();
  })
});