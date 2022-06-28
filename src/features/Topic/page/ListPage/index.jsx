import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import topicApi from 'api/topicApi';
import TopicList from 'features/Topic/components/TopicList';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';

ListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [topicList, setTopicList] = useState();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await topicApi.getAll();
        // const data = [
        //   {
        //     createdDate: '6/9/2022',
        //     name: 'Toán',
        //     description: 'ahahahhahahah',
        //   },
        //   {
        //     createdDate: '6/9/2022',
        //     name: 'Toán',
        //     description: 'ahahahhahahah',
        //   },
        //   {
        //     createdDate: '6/9/2022',
        //     name: 'Toán',
        //     description: 'ahahahhahahah',
        //   },
        //   {
        //     createdDate: '6/9/2022',
        //     name: 'Toán',
        //     description: 'ahahahhahahah',
        //   },
        // ];

        setTopicList(data);
      } catch (error) {
        console.log('Failed to fetch topic list', error);
      }
    })();
  }, []);

  const handleRemove = async (code) => {
    try {
      const response = await topicApi.delete(code);
      const { data } = await topicApi.getAll();

      setTopicList(data);

      enqueueSnackbar(response.message, { variant: 'success', autoHideDuration: 1000 });
    } catch (error) {
      console.log('Failed to remove topic: ', error);
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };
  return (
    <Box>
      <Container>
        <Typography className={classes.title} variant="h3">
          Danh sách chủ đề
        </Typography>
        <TopicList handleRemove={handleRemove} data={topicList} />
      </Container>
    </Box>
  );
}

export default ListPage;
