import React from 'react';
  import PropTypes from 'prop-types';
  import { Box, Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
  import Topic from './Topic';
  import AddIcon from '@material-ui/icons/Add';
  import { Link } from 'react-router-dom';

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
    return (
      <Box margin={3}>
        <Grid container>
          <Grid item>
            <Link to="/topic-list/create" className={classes.link}>
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
              <Topic topic={topic} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  export default TopicList;