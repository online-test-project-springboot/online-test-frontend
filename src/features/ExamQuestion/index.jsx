import { Box, makeStyles } from '@material-ui/core';
import NotFound from 'components/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './page/AddEditPage';
import DetailPage from './page/DetailPage';
import ListPage from './page/ListPage';

ExamQuestion.propTypes = {};

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

function ExamQuestion(props) {
  const classes = useStyles();
  const match = useRouteMatch();
  return (
    <Box className={classes.root}>
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route path={`${match.path}/add`} exact component={AddEditPage} />
        <Route path={`${match.path}/edit/:examId`} component={AddEditPage} />
        <Route path={`${match.path}/detail/:topicId`} component={DetailPage} />
        <Route component={NotFound} />
      </Switch>
    </Box>
  );
}

export default ExamQuestion;
