import { Box, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createTimer } from 'utils';
import DateTimeDisplay from './DateTimeDisplay';
import ExpiredNotice from './ExpiredNotice';

Clock.propTypes = {
  openDialog: PropTypes.bool,
  timeExam: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  showCouter: {
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    padding: '0.5rem',
    border: '1px solid #ebebeb',
    borderRadius: '0.25rem',
    color: '#000',
    marginLeft: '20px',
  },
}));

const ShowCounter = ({ hours, minutes, seconds }) => {
  const classes = useStyles();
  return (
    <Box className={classes.showCouter}>
      <DateTimeDisplay value={hours} type={'Giờ'} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={'Phút'} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={'Giây'} />
    </Box>
  );
};

const getReturnValues = (countDown) => {
  // calculate time left

  let currentSeconds = countDown;

  const hours = Math.floor(currentSeconds / 3600);
  if (hours > 0) currentSeconds = currentSeconds - 3600 * hours;

  const minutes = Math.floor(currentSeconds / 60);
  if (minutes > 0) currentSeconds = currentSeconds - 60 * minutes;

  const seconds = currentSeconds;

  return [hours, minutes, seconds];
};

let timer = null;

function Clock({ timeExam, openDialog, resultExam, handleSubmit }) {
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const handleOnChange = (currentSecond) => {
    const [hours, minutes, seconds] = getReturnValues(currentSecond);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  const handleOnFinish = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);

    if (handleSubmit) handleSubmit();
  };

  if (openDialog) {
    timer.clear();
  }

  useEffect(() => {
    timer = createTimer(timeExam, handleOnChange, handleOnFinish);
    timer.start();

    return () => {
      console.log('xoa ne');
      timer.clear();
    };
  }, [timeExam]);

  return (
    <Box display="inline-block">
      {hours + minutes + seconds <= 0 || openDialog ? (
        <ExpiredNotice open={openDialog} resultExam={resultExam} />
      ) : (
        <ShowCounter hours={hours} minutes={minutes} seconds={seconds} />
      )}
    </Box>
  );
}

export default Clock;
