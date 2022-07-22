import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';

QuestionListLink.propTypes = {
  data: PropTypes.array,
  handleLinkQuestion: PropTypes.func,
  currentQuestion: PropTypes.number,
};

const useStyles = makeStyles(() => ({
  active: {
    fontWeight: '300px',
    color: 'red',
  },

  link: {
    fontWeight: '300px',
  },
}));

function QuestionListLink({ data = [], handleLinkQuestion = null, currentQuestion = 0 }) {
  const classes = useStyles();
  const handleClick = (index) => {
    if (handleLinkQuestion) handleLinkQuestion(index);
  };
  return (
    <Box>
      {data.map((question, index) => (
        <Typography
          key={question.code}
          className={index === currentQuestion ? classes.active : classes.link}
          onClick={() => handleClick(index)}
        >
          Câu hỏi {index + 1}
        </Typography>
      ))}
    </Box>
  );
}

export default QuestionListLink;
