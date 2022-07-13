import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  elementHome: {
    position: 'absolute',
    top: '50%',
    color: 'white',
    marginLeft: '50px',
  },

  link: {
    textDecoration: 'none',
    color: 'white',
  },

  loginBtn: {
    backgroundImage: ' linear-gradient( 0.25turn,#12c2e9,#ffdde1)',
    marginTop: '10px',
    marginLeft: '12px',
    borderRadius: '20px',
    border: '0.5px solid white',
    color: '#000000de',
    font: 'sans-serif',
  },
}));

HomeFeature.propTypes = {};

function HomeFeature(props) {
  const classes = useStyles();

  const handleDirect = () => {
    const data = JSON.parse(localStorage.getItem('data'));
  };
  return (
    <div className={classes.root}>
      <Box className={classes.elementHome}>
        <Typography variant="h6">THI TRẮC NGHIỆM ONLINE</Typography>
        <Typography variant="subtitle1">Trang web thi trắc nghiệm online</Typography>
        <NavLink to={'/doExam'} className={classes.link}>
          <Button className={classes.loginBtn} color="inherit">
            Tham gia thi
          </Button>
        </NavLink>

        <NavLink to="/examQuestion-list" className={classes.link}>
          <Button className={classes.loginBtn} color="inherit">
            Tạo đề thi
          </Button>
        </NavLink>

        <NavLink to="/topic-list" className={classes.link}>
          <Button onClick={handleDirect} className={classes.loginBtn} color="inherit">
            Tạo chủ đề
          </Button>
        </NavLink>

        <Button className={classes.loginBtn} color="inherit">
          Xem kết quả thi
        </Button>
      </Box>
    </div>
  );
}

export default HomeFeature;
