import { makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Transition } from 'utils';

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

  link: {
    textDecoration: 'none',
  },
}));

function ExpiredNotice({ open, resultExam }) {
  const classes = useStyles();

  return (
    <div className={classes.expiredNotice}>
      <span>HẾT GIỜ !</span>

      <Dialog
        disableEscapeKeyDown
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Thông tin bài thi</DialogTitle>
        <DialogContent>
          <Typography>Bài thi: {resultExam.examName}</Typography>
          <Typography>Chủ để: {resultExam.topicName}</Typography>
          <Typography>Thí sinh: {resultExam.examPersonName}</Typography>
          <Typography>Thời gian làm bài: {resultExam.time} phút</Typography>
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
          <Link to="/" className={classes.link}>
            <Button variant="outlined" color="primary">
              Về trang chủ
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ExpiredNotice;
