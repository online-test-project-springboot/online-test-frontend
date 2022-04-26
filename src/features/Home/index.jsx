import React from 'react';
import PropTypes from 'prop-types';
import bgHome from 'img/bgHome.jpg';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'static',
  },

  bgHome: {},

  elementHome: {
    position: 'absolute',
    top: '50%',
    color: 'white',
    marginLeft: '50px',

    '& > button': {
      backgroundImage: 'linear-gradient(to right, blue , green)',
      marginTop: '10px',
      marginLeft: '12px',
    },
  },

  loginBtn: {
    borderRadius: '20px',
    border: '1px solid black',
  },
}));

HomeFeature.propTypes = {};

function HomeFeature(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
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

      <Box className={classes.elementHome}>
        <Typography variant="h6">THI TRẮC NGHIỆM ONLINE</Typography>
        <Typography variant="subtitle1">Trang web thi trắc nghiệm online</Typography>
        <Button className={classes.loginBtn} color="inherit">
          Tham gia thi
        </Button>
        <Button className={classes.loginBtn} color="inherit">
          Tạo đề thi
        </Button>
        <Button className={classes.loginBtn} color="inherit">
          Tạo chủ đề
        </Button>
        <Button className={classes.loginBtn} color="inherit">
          Xem kết quả thi
        </Button>
      </Box>
    </div>
  );
}

export default HomeFeature;
