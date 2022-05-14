import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import topicApi from 'api/topicApi';
import TopicList from 'features/Topic/components/TopicList';
import React, { useEffect, useState } from 'react';

ListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
}));

function ListPage(props) {
  const classes = useStyles();

  const [topicList, setTopicList] = useState();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await topicApi.getAll();

        setTopicList(data);
      } catch (error) {
        console.log('Failed to fetch topic list', error);
      }
    })();
  }, []);
  return (
    <Box>
      <Container>
        <Typography className={classes.title} variant="h3">
          Danh sách chủ đề
        </Typography>
        <TopicList data={topicList} />
      </Container>
    </Box>
  );
}

export default ListPage;