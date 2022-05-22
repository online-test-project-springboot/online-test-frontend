import { Box, Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Topic from './Topic';

  TopicList.propTypes = {
    data: PropTypes.array,
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 180,
      minHeight: 130,
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(2),
      backgroundColor: 'moccasin',
      textAlign: 'center',
    },

    icon: {
      fontSize: 50,
      paddingTop: 15,
    },

    link: {
      textDecoration: 'none',
      color: 'black',
    },
  }));

  function TopicList({ data = [] }) {
    const classes = useStyles();
    const match = useRouteMatch();
    
    return (
      <Box margin={3}>
        <Grid container>
          <Grid item>
          <Link to={`${match.path}/create`} className={classes.link}>
              <Card className={classes.root}>
                <CardContent>
                  <AddIcon className={classes.icon} />

                  <Typography variant="body2" component="p">
                    Thêm
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          {data.map((topic, index) => (
            <Grid item key={topic.code}>
            <Link to={`${match.path}/${topic.code}`}><Topic topic={topic} /></Link>
              
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  export default TopicList;