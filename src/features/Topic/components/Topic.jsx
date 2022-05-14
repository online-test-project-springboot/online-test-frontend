import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

Topic.propTypes = {
  topic: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 180,
    height: 130,

    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },

  title: {
    wordWrap: 'break-word',
  },

  date: {
    fontSize: 14,
  },
}));

function trucateText(text, maxLength) {
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength - 1)}…`;
}

function Topic({ topic = {} }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.date} color="textSecondary" gutterBottom>
          {topic.createdDate || 'Update'}
        </Typography>
        <Typography className={classes.title} variant="h5" component="h2">
          {topic.name ? trucateText(topic.name, 18) : 'Update'}
        </Typography>

        <Typography variant="body2" component="p">
          {topic.description ? trucateText(topic.description, 20) : 'Update'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Topic;