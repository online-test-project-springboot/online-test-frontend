import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ques from 'img/ques.PNG';
import PropTypes from 'prop-types';
import React from 'react';

DialogQuestion.propTypes = {
  closeDialog: PropTypes.func,
  data: PropTypes.object,
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

function DialogQuestion({ closeDialog = null, data = {} }) {
  const classes = useStyles();

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

  console.log(data);

  return (
    <Box padding={1} className={classes.root}>
      <Box>
        <DialogTitle id="alert-dialog-title">Câu hỏi: {data.content}</DialogTitle>
      </Box>

      <DialogContent>
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

        <Typography className={classes.trueAnswer} variant="subtitle2">
          Đáp án đúng: {data.answers.find((elm) => elm.rightAnswer).content}
        </Typography>
      </DialogContent>
    </Box>
  );
}

export default DialogQuestion;
