import { makeStyles, Typography } from '@material-ui/core';
import examApi from 'api/examApi';
import questionApi from 'api/questionApi';
import { MESSAGES } from 'constants';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { trimData } from 'utils';
import AddDetailEQ from './AddDetailEQ';
import AddInfoEQ from './AddInfoEQ';
import LinkEQ from './LinkEQ';

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
  const [detailValue, setDetailValue] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const handleInfoSubmit = async (values) => {
    try {
      const convertValues = trimData(values);
      console.log("AddEditEQ: " + convertValues);
      const { message, data } = await questionApi.getAll(convertValues.topicCode);
      if (message === MESSAGES.SUCCESSFULLY) {
        const dataQuestion = data;
        console.log(dataQuestion);
        setInfoValue({ ...convertValues, dataQuestion });
        setMode(MODE.DETAIL);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };

  const handleDetailSubmit = async (values) => {
    try {
      const { message, data } = await examApi.create(values);

      if (message === MESSAGES.SUCCESSFULLY) {
        enqueueSnackbar(message, { variant: 'success', autoHideDuration: 1000 });
        const infoExam = { name: data.name, code: data.code };
        setDetailValue(infoExam);
        setMode(MODE.LINK);
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
      {mode === MODE.LINK && <LinkEQ data={detailValue} />}

      {/* <AddEditEQForm data={dataTopic} onSubmit={handleSubmit} /> */}
    </div>
  );
}

export default AddEditEQ;
