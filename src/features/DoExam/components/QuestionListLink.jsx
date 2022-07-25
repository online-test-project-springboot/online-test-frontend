import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

QuestionListLink.propTypes = {
  data: PropTypes.array,
  handleLinkQuestion: PropTypes.func,
  currentQuestion: PropTypes.number,
};

const useStyles = makeStyles(() => ({
  active: {
    fontWeight: '300px',
    textDecoration: 'underline',
    textDecorationColor: 'red',
  },

  link: {
    fontWeight: '300px',
  },

  select: {
    color: 'green',
  },
}));

function QuestionListLink({
  data = [],
  handleLinkQuestion = null,
  currentQuestion = 0,
  answerSelect = [],
}) {
  const classes = useStyles();
  const handleClick = (index) => {
    if (handleLinkQuestion) handleLinkQuestion(index);
  };

  const handleClassNameOfQuestion = (index, currentQuestion, answerSelect) => {
    if (index === currentQuestion && answerSelect[index])
      return `${classes.active} ${classes.select}`;

    if (answerSelect[index]) return classes.select;

    if (index === currentQuestion) return classes.active;

    return classes.link;
  };

  return (
    <Box>
      <Grid container>
        {data.map((question, index) => (
          <Grid item key={question.code} xs={2}>
            <Typography
              key={question.code}
              className={handleClassNameOfQuestion(index, currentQuestion, answerSelect)}
              onClick={() => handleClick(index)}
            >
              Câu hỏi {index + 1}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default QuestionListLink;
