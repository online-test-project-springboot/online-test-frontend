import { makeStyles, Typography } from '@material-ui/core';
import topicApi from 'api/topicApi';
import { getAllTopic } from 'features/Topic/topicSlice';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AddDetailEQ from './AddDetailEQ';
import AddEditEQForm from './AddEditEQForm';
import AddInfoEQ from './AddInfoEQ';

AddEditEQ.propTypes = {};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
}));

function AddEditEQ(props) {
  const classes = useStyles();

  const history = useHistory();
  const { topicId } = useParams();
  const isAddMode = !topicId;
  const dispatch = useDispatch();

  const topicList = useSelector((state) => state.topic.topicList);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    console.log(values);
    // history.push({
    //   pathname: '/',
    // });
    // try {
    //   let response;
    //   if (isAddMode) {
    //     response = await topicApi.create(values);
    //   } else {
    //     response = await topicApi.update(topicId, values);
    //   }
    //   enqueueSnackbar(response.message, { variant: 'success', autoHideDuration: 1000 });
    //   setTimeout(() => {
    //     history.push({
    //       pathname: '/topic-list',
    //     });
    //   }, 1000);
    // } catch (error) {
    //   enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
    // }
  };

  useEffect(() => {
    (async () => {
      try {
        if (typeof topicList === 'object' && topicList.length === 0) {
          const action = getAllTopic();
          await dispatch(action);
        }
      } catch (error) {
        console.log('Failed to fetch topic list', error);
      }
    })();
  }, []);

  return (
    <div>
      <Typography className={classes.title} variant="h3">
        {isAddMode ? 'Tạo đề thi' : 'Chỉnh sửa đề thi'}
      </Typography>
      <AddInfoEQ data={topicList} onSubmit={handleSubmit} />
      {/* <AddDetailEQ onSubmit={handleSubmit} /> */}
      {/* <AddEditEQForm data={dataTopic} onSubmit={handleSubmit} /> */}
    </div>
  );
}

export default AddEditEQ;
