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

  const dispatch = useDispatch();
  const topicList = useSelector((state) => state.topic.topicList);

  const { topicId } = useParams();
  const isAddMode = !topicId;

  const [mode, setMode] = useState(MODE.DETAIL);
  const [infoValue, setInfoValue] = useState({
    name: 'Đánh giá năng lực',
    topicCode: 'Mw==',
    time: '120',
    numberQuestion: '3',
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleInfoSubmit = async (values) => {
    const convertValues = trimData(values);
    setInfoValue(convertValues);
    setMode(MODE.DETAIL);
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

  const handleDetailSubmit = async (values) => {
    setMode(MODE.LINK);
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       if (typeof topicList === 'object' && topicList.length === 0) {
  //         const action = getAllTopic();
  //         await dispatch(action);
  //       }
  //     } catch (error) {
  //       console.log('Failed to fetch topic list', error);
  //     }
  //   })();
  // }, []);

  return (
    <div>
      <Typography className={classes.title} variant="h3">
        {isAddMode ? 'Tạo đề thi' : 'Chỉnh sửa đề thi'}
      </Typography>
      {/* {mode === MODE.INFO && <AddInfoEQ data={topicList} onSubmit={handleInfoSubmit} />} */}
      {mode === MODE.DETAIL && <AddDetailEQ data={infoValue} onSubmit={handleDetailSubmit} />}

      {/* <AddEditEQForm data={dataTopic} onSubmit={handleSubmit} /> */}
    </div>
  );
}

export default AddEditEQ;
