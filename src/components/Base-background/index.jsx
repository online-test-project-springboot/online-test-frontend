import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import bgHome from 'img/bgHome.jpg';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  bgHome: {},
}));

BaseBg.propTypes = {};

function BaseBg(props) {
  const classes = useStyles();
  return (
    <Box
      className={classes.bgHome}
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
