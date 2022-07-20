import { Box, makeStyles } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './page/DetailPage';
import LinkPage from './page/LinkPage';

DoExam.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '20%',
    color: 'white',
    padding: '20px',
    left: 0,
    right: 0,
  },
}));

function DoExam(props) {
  const classes = useStyles();
  const match = useRouteMatch();

  return (
    <Box className={classes.root}>
      <Switch>
        <Route path={match.path} component={LinkPage} exact />
        <Route path={`${match.path}/:examId`} component={DetailPage} exact />
      </Switch>
    </Box>
  );
}

export default DoExam;
