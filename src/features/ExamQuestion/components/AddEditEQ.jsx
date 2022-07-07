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
import { trimData } from 'utils';
import questionApi from 'api/questionApi';
import { MESSAGES } from 'constants';
import examApi from 'api/examApi';

AddEditEQ.propTypes = {};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
}));

const MODE = {
  INFO: 'info',
  DETAIL: 'detail',
  LINK: 'link',
};

function AddEditEQ(props) {
  const classes = useStyles();
  const topicList = useSelector((state) => state.topic.topicList);

  const { topicId } = useParams();
  const isAddMode = !topicId;

  const [mode, setMode] = useState(MODE.INFO);
  const [infoValue, setInfoValue] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const handleInfoSubmit = async (values) => {
    try {
      const convertValues = trimData(values);
      const response = await questionApi.getAll(convertValues.topicCode);
      if (response.message === MESSAGES.SUCCESSFULLY) {
        const dataQuestion = response.data;
        setInfoValue({ ...convertValues, dataQuestion });
        setMode(MODE.DETAIL);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };

  const handleDetailSubmit = async (values) => {
    try {
      const payload = { ...values, name: infoValue.name };
      delete payload.numberQuestion;
      const response = await examApi.create(payload);

      if (response.message === MESSAGES.SUCCESSFULLY) {
        enqueueSnackbar(response.message, { variant: 'success', autoHideDuration: 1000 });
        // setMode(MODE.LINK);
      }
    } catch (error) {
      console.log('Failed to create exam question', error);
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  return (
    <div>
      <Typography className={classes.title} variant="h3">
        {isAddMode ? 'Tạo đề thi' : 'Chỉnh sửa đề thi'}
      </Typography>
      {mode === MODE.INFO && <AddInfoEQ data={topicList} onSubmit={handleInfoSubmit} />}
      {mode === MODE.DETAIL && <AddDetailEQ data={infoValue} onSubmit={handleDetailSubmit} />}

      {/* <AddEditEQForm data={dataTopic} onSubmit={handleSubmit} /> */}
    </div>
  );
}

export default AddEditEQ;
