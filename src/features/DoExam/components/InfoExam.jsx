import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import Clock from './Clock';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

InfoExam.propTypes = {};
const useStyles = makeStyles((theme) => ({
  icon: {
    position: 'absolute',
    top: '34px',
  },
}));

function InfoExam(props) {
  const classes = useStyles();
  return (
    <Box>
      <Box>
        <AccessAlarmIcon className={classes.icon} />
        <Clock timeExam={0.1} />
      </Box>
      <Box>
        <Typography>Họ và tên:</Typography>
        <Typography>Ngày sinh</Typography>
      </Box>
      <Box>
        <Button variant="outlined">Nộp bài thi</Button>
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
