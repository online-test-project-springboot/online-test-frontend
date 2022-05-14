import { Box, makeStyles, Typography } from '@material-ui/core';
import CreateTopic from 'features/Topic/components/CreateTopic';
import React from 'react';

CreatePage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
}));

function CreatePage(props) {
  const classes = useStyles();
  return (
    <Box>
      <Typography className={classes.title} variant="h3">
        Tạo chủ đề thi
      </Typography>
      <CreateTopic />
    </Box>
  );
}

export default CreatePage;