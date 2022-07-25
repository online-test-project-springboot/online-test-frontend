import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import Clock from './Clock';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { useState } from 'react';
import StorageKeys from 'constants/storage-keys';
import doExamApi from 'api/doExamApi';

InfoExam.propTypes = {};
const useStyles = makeStyles((theme) => ({
  icon: {
    position: 'absolute',
    top: '34px',
  },
}));

function InfoExam({ examId }) {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [resultExam, setResultExam] = useState({});

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
          timeExam={0.1}
        />
      </Box>
      <Box>
        <Typography>Họ và tên:</Typography>
        <Typography>Ngày sinh</Typography>
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
