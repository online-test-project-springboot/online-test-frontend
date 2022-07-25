import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import doExamApi from 'api/doExamApi';
import StorageKeys from 'constants/storage-keys';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Clock from './Clock';

InfoExam.propTypes = {
  examId: PropTypes.string,
  exam: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  icon: {
    position: 'absolute',
    top: '34px',
  },
}));

function InfoExam({ examId, exam }) {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [resultExam, setResultExam] = useState({});
  const { fullName, email } = useSelector((state) => state.user.current);

  console.log(exam);

  const handleSubmit = async () => {
    try {
      const answerList = JSON.parse(localStorage.getItem(StorageKeys.DATAEXAM));

      const payload = {
        answers: answerList,
      };

      const { message, data } = await doExamApi.submitExam(examId, payload);

      if (message) {
        setResultExam(data);
        setOpenDialog(true);
        localStorage.setItem(StorageKeys.DATAEXAM, '[]');
      }
    } catch (error) {
      console.log('Failed to fetch submit exam:', error);
    }
  };
  return (
    <Box>
      <Box>
        <AccessAlarmIcon className={classes.icon} />
        <Clock
          handleSubmit={handleSubmit}
          resultExam={resultExam}
          openDialog={openDialog}
          timeExam={exam.time}
        />
      </Box>
      <Box>
        <Typography>Họ và tên: {fullName}</Typography>
        <Typography>Email: {email}</Typography>
      </Box>
      <Box>
        <Button disabled={openDialog} variant="outlined" color="primary" onClick={handleSubmit}>
          Nộp bài thi
        </Button>
      </Box>

      <Box>
        <Typography color="error">
          Chú ý: Bạn cần xem lại kỹ đáp án trước khi nộp bài thi nếu chưa hết thời gian, khi nộp
          bài, bạn không có quyền sửa bất kì thông tin nào
        </Typography>
      </Box>
    </Box>
  );
}

export default InfoExam;
