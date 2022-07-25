import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Transition } from 'utils';
import { makeStyles, Typography } from '@material-ui/core';
import moment from 'moment';

ExpiredNotice.propTypes = {};

const useStyles = makeStyles((theme) => ({
  expiredNotice: {
    textAlign: 'center',
    padding: '0.5rem',
    marginTop: '2px',
    marginLeft: '1.5rem',

    '&> span': {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'red',
    },
  },
}));

function ExpiredNotice({ open, resultExam }) {
  const classes = useStyles();
  // const resultExam = {
  //   examPersonName: 'user',
  //   topicName: 'phep cong lop 1',
  //   examName: 'kiem tra 15 phut - lop 1 - hoc ki 1 - 2022',
  //   time: 15,
  //   startTime: '2022-07-24T10:38:07.043694',
  //   endTime: '2022-07-24T11:52:53.494943',
  //   numOfQuestions: 3,
  //   numOfRightAnswer: 1,
  // };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = (event, reason) => {
  //   if (reason !== 'backdropClick') {
  //     setOpen(false);
  //   }
  // };
  return (
    <div className={classes.expiredNotice}>
      <span>HẾT GIỜ !</span>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        disableEscapeKeyDown
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Thông tin bài thi</DialogTitle>
        <DialogContent>
          <Typography>Bài thi: {resultExam.examName}</Typography>
          <Typography>Chủ để: {resultExam.topicName}</Typography>
          <Typography>Thí sinh: {resultExam.examPersonName}</Typography>
          <Typography>Thời gian làm bài: {resultExam.time}</Typography>
          <Typography>
            Thời gian bắt đầu làm bài: {moment(resultExam.startTime).format('LTS')}
          </Typography>
          <Typography>
            Thời gian kết thúc làm bài: {moment(resultExam.endTime).format('LTS')}
          </Typography>
          <Typography>Tổng số câu hỏi: {resultExam.numOfQuestions}</Typography>
          <Typography>
            Số câu đúng: {resultExam.numOfRightAnswer}/{resultExam.numOfQuestions}
          </Typography>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ExpiredNotice;
