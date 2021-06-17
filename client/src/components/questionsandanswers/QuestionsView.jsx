/* eslint-disable import/no-cycle */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import Search from './Search';
import Question from './Question';
import QuestionsAndAnswers from './QuestionsAndAnswers';
import AddQuestion from './AddQuestion';
// import AddQuestionForm from './AddQuestionForm';
// import Questions from './questionsandanswers/Questions.jsx';
const QuestionsView = ({ questionInfo, Name }) => {
  // const info = questionInfo.questions;
  const [info, setInfo] = useState(questionInfo.questions);
  const [questionView, setQuestionView] = useState(true);
  const [search, setSearch] = useState('');

  const questionList = () => {
    if (!info) {
      return [];
    }
    if (search.length >= 3) {
      const searchedList = info.results.filter((question) => question.question_body.toLowerCase().includes(search.toLowerCase()));
      return searchedList;
    }

    if (questionView) {
      return info.results.slice(0, 4);
    }

    return info.results;
  };

  const questionInfoObj = questionList();

  const handleMoreQuestions = () => {
    setQuestionView(!questionView);
  };
  const searchQuestions = (input) => {
    setSearch(input);
  };

  const moreQuestions = questionView ? 'More Questions' : 'Collapse Questions';

  return (
    <div id="QA-view">
      <div id="inner-QAview">
        <h1 id="QA-header">Questions & Answers</h1>
        <div>
          <Search searchQuestions={searchQuestions} />
        </div>
        <div className="question-cards">
          {questionInfoObj.map((question) => <Question key={question.question_id} question={question} />)}
        </div>
        <button className="add-more-questions mx-auto" onClick={handleMoreQuestions}>

            {moreQuestions}
        </button>
        <form className="QA-form">
          <h5>Ask a Question</h5>
          <div>
            <AddQuestion questionInfo={questionInfo.questions} Name={Name} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionsView;
