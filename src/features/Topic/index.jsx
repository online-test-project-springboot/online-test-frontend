import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CreatePage from './page/CreatePage';
import ListPage from './page/ListPage';

TopicFeature.propTypes = {};

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

function TopicFeature(props) {
  const classes = useStyles();
  const match = useRouteMatch();
  return (
    <Box className={classes.root}>
  
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route path={`${match.path}/create`} component={CreatePage} exact />
        {/* <Route path={${match.path}/} component={DetailPage} exact />  */}
      </Switch>
    </Box>
  );
}

export default TopicFeature;