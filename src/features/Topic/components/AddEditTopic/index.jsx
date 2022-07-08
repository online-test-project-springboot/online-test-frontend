import { makeStyles, Typography } from '@material-ui/core';
import topicApi from 'api/topicApi';
import { getAllTopic } from 'features/Topic/topicSlice';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { trimData } from 'utils';
import AddEditForm from '../AddEditTopicForm';

AddEditTopic.propTypes = {};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
}));

function AddEditTopic(props) {
  const classes = useStyles();
  const history = useHistory();
  const { topicId } = useParams();
  const isAddMode = !topicId;
  const dispatch = useDispatch();

  const [dataTopic, setDataTopic] = useState({
    name: '',
    description: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    const convertValues = trimData(values);
    try {
      let response;
      if (isAddMode) {
        response = await topicApi.create(convertValues);
      } else {
        response = await topicApi.update(topicId, convertValues);
      }
      const action = getAllTopic();
      await dispatch(action);
      enqueueSnackbar(response.message, { variant: 'success', autoHideDuration: 1000 });

      setTimeout(() => {
        history.push({
          pathname: '/topic-list',
        });
      }, 1000);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (!isAddMode) {
          const { data } = await topicApi.getById(topicId);

          setDataTopic(data);
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
      }
    })();
  }, []);

  return (
    <div>
      <Typography className={classes.title} variant="h3">
        {isAddMode ? 'Tạo chủ đề thi' : 'Chỉnh sửa chủ đề thi'}
      </Typography>
      <AddEditForm data={dataTopic} onSubmit={handleSubmit} />
    </div>
  );
}

export default AddEditTopic;
