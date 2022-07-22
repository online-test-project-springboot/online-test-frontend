import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ques from 'img/ques.PNG';
import PropTypes from 'prop-types';
import React from 'react';

Question.propTypes = {
  closeDialog: PropTypes.func,
  data: PropTypes.object,
  currentQuestion: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  answer: {
    textAlign: 'center',
  },

  containerItem: {
    width: '75%',
  },

  item: {
    marginBottom: theme.spacing(4),
  },
}));

const ANSWER_LIST = ['A', 'B', 'C', 'D'];

function Question({ closeDialog = null, data = {}, currentQuestion = 0 }) {
  const classes = useStyles();
  // console.log(data.answers);

  const handleClose = () => {
    if (closeDialog) {
      closeDialog();
    }
  };

  const handleRemove = () => {
    //call Api
    if (closeDialog) {
      closeDialog();
    }
  };

  return (
    <Box padding={1} className={classes.root}>
      <Box>
        <Typography>Câu hỏi {currentQuestion + 1}</Typography>
        <Typography>{data.content}</Typography>
      </Box>

      {data.answers && (
        <Box className={classes.containerItem}>
          <Grid container className={classes.answer}>
            {data.answers.map((answer, index) => (
              <Grid className={classes.item} item key={index} xs={6}>
                <Typography variant="subtitle2">
                  {' '}
                  {ANSWER_LIST[index]}. {answer.content}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default Question;
