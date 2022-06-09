import { makeStyles, Typography } from '@material-ui/core';
import topicApi from 'api/topicApi';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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

  const [dataTopic, setDataTopic] = useState({
    name: '',
    description: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      let response;
      if (isAddMode) {
        response = await topicApi.create(values);
      } else {
        response = await topicApi.update(topicId, values);
      }

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
          // const { data } = await topicApi.getById(topicId);
          const data = { name: 'Pham minh Nguyen', description: 'Hahahahah' };
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
        {topicId === 'create' ? 'Tạo chủ đề thi' : 'Chỉnh sửa chủ đề thi'}
      </Typography>
      <AddEditForm data={dataTopic} onSubmit={handleSubmit} />
    </div>
  );
}

export default AddEditTopic;
