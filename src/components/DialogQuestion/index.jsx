import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ques from 'img/ques.PNG';
import PropTypes from 'prop-types';
import React from 'react';

DialogQuestion.propTypes = {
  closeDialog: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  imgQuestion: {
    marginLeft: '25%',
  },

  answer: {
    textAlign: 'center',
  },

  item: {
    marginBottom: theme.spacing(4),
  },

  trueAnswer: {
    width: 'fit-content',
    padding: '5px 15px',
    margin: '0 auto',
    borderStyle: 'solid',
    borderColor: 'aqua',
    borderRadius: '30px',
  },
}));

const ANSWER_LIST = ['A', 'B', 'C', 'D'];

function DialogQuestion({ closeDialog = null }) {
  const classes = useStyles();
  const data = {
    thread: 'Tìm các cận dưới đúng và cận trên đúng trong R nếu chúng tồn tại của tập',
    imgQuest: ques,
    answerList: ['Đáp án 1', 'Đáp án 2', 'Đáp án 3', 'Đáp án 4'],
    trueAns: 'Đáp án đúng 1',
  };

  console.log(ques);

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
        <DialogTitle id="alert-dialog-title">Câu hỏi: {data.thread}</DialogTitle>
        <img className={classes.imgQuestion} src={data.imgQuest} />
      </Box>

      <DialogContent>
        <Grid container className={classes.answer}>
          {data.answerList.map((answer, index) => (
            <Grid className={classes.item} item key={index} xs={6}>
              <Typography variant="subtitle2">
                {' '}
                {ANSWER_LIST[index]}. {answer}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Typography className={classes.trueAnswer} variant="subtitle2">
          {data.trueAns}
        </Typography>
      </DialogContent>
    </Box>
  );
}

export default DialogQuestion;