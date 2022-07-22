import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  countdown: {
    lineHeight: '1.25rem',
    padding: '0 0.75rem 0 0.75rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',

    '& > p': {
      margin: 0,
    },

    '&> span': {
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
  },
}));

function DateTimeDisplay({ value, type }) {
  const classes = useStyles();
  return (
    <div className={classes.countdown}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
}

export default DateTimeDisplay;
