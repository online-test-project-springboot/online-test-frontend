import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';

QuestionListLink.propTypes = {
  data: PropTypes.array,
};

function QuestionListLink({ data = [] }) {
  return (
    <Box>
      {data.map((question, index) => (
        <NavLink key={question.code} to={''}>
          Câu hỏi {index + 1}
        </NavLink>
      ))}
    </Box>
  );
}

export default QuestionListLink;
