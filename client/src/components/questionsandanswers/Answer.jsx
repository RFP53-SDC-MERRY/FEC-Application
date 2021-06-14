/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { useState } from 'react';
import PropTypes from 'prop-types';
import Questions from './Questions';
import { AddAnswer } from './AddAnswer';
import Connect from '../Connect';

const Answer = ({ answerBody }) => {
  const dateFormat = (inputTime) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December',
    ];

    const today = new Date(inputTime);
    const date = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    return date;
  };

  console.log(answerBody);

  const [helpfulness, setHelpfulness] = useState(false);
  const [addHelpful, setAddHelpful] = useState(answerBody.helpfulness);

  const addOneHelp = () => {
    if (helpfulness === false) {
      Connect.putHelpfulnessAnswers(answerBody.id)
        .then((response) => {
          if (response.status === 200) {
            setAddHelpful(addHelpful + 1);
            setHelpfulness(true);
          }
        });
    }
  };

  return (
    <div id="answers">
      <p>
        A:
        {' '}
        {answerBody.body}
      </p>
      <div className="answer-user">
        {answerBody.answerer_name}
        {' '}
        {dateFormat(answerBody.date)}
      </div>
      <div className="helpful">
        Helpful?
        {' '}
        <div>
          {addHelpful}
          <button onClick={() => { addOneHelp(); }} className="answer-helpfulness-btn" type="button">Yes</button>
        </div>
      </div>
    </div>
  );
};

Answer.propTypes = {
  answerBody: PropTypes.object.isRequired,
};

export default Answer;
