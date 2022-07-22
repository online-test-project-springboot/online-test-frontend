import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { createTimer } from 'utils';
import { useCountdown } from 'hooks/useCountdown';
import DateTimeDisplay from './DateTimeDisplay';
import ExpiredNotice from './ExpiredNotice';

Clock.propTypes = {};

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

  // showCouter > countdown-link :{

  // },

  // showCouter countdown: {
  //   line-height: 1.25rem,
  //   padding: 0 0.75rem 0 0.75rem,
  //   align-items: center,
  //   display: flex,
  //   flex-direction: column,
  // },

  // showCouter countdown > p : {
  //   margin: 0,
  // },

  // showCouter countdown > span: {
  //   text-transform: uppercase,
  //   font-size: 0.75rem,
  //   line-height: 1rem,
  // },
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

function Clock({ timeExam }) {
  const [hours, minutes, seconds] = useCountdown(timeExam);

  return (
    <Box display="inline-block">
      {hours + minutes + seconds <= 0 ? (
        <ExpiredNotice />
      ) : (
        <ShowCounter hours={hours} minutes={minutes} seconds={seconds} />
      )}
    </Box>
  );
}

export default Clock;
