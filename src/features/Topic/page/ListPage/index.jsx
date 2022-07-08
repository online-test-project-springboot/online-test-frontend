import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import topicApi from 'api/topicApi';
import TopicList from 'features/Topic/components/TopicList';
import { getAllTopic } from 'features/Topic/topicSlice';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

ListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const topicList = useSelector((state) => state.topic.topicList);

  useEffect(() => {
    (async () => {
      try {
        if (Array.isArray(topicList) && topicList.length === 0) {
          const action = getAllTopic();
          await dispatch(action);
        }
      } catch (error) {
        console.log('Failed to fetch topic list', error);
      }
    })();
  }, []);

  const handleRemove = async (code) => {
    try {
      const response = await topicApi.delete(code);
      const action = getAllTopic();
      await dispatch(action);

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
