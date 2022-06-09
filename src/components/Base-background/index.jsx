import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import bgHome from 'img/bgHome.png';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  backgroundHome: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: -1,
  },
}));

BaseBg.propTypes = {};

function BaseBg(props) {
  const classes = useStyles();
  return (
    <Box
      className={classes.backgroundHome}
      component="img"
      sx={{
        height: '100vh',
        width: '100%',
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      alt="Background home page"
      src={bgHome}
    />
  );
}

export default BaseBg;
