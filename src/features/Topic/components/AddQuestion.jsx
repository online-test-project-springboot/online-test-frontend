import questionApi from 'api/questionApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddQuestionForm from './AddQuestionForm';

AddQuestion.propTypes = {
  closeDialog: PropTypes.func,
  handleAddQuestion: PropTypes.func,
};

function convertData(values) {
  if (typeof values !== 'object') return;

  const payload = {
    content: '',
    answers: [],
  };

  payload.content = values.content;

  delete values.content;

  for (const key in values) {
    const ansObj = {
      content: values[key],
    };

    if (key === values.trueAnswer) {
      ansObj.rightAnswer = true;
      delete values.trueAnswer;
    }

    payload.answers.push(ansObj);
  }

  return payload;
}

function AddQuestion({ closeDialog = null, handleAddQuestion = null }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { topicId } = useParams();

  const handleSubmit = async (values) => {
    console.log(values);
    const payload = convertData(values);
    console.log(payload);

    // try {
    //   const { message } = await questionApi.create(topicId, payload);

    //   if (message) {
    //     enqueueSnackbar(message, { variant: 'success', autoHideDuration: 1000 });
    //     closeDialog();
    //     if (handleAddQuestion) handleAddQuestion();
    //   }
    // } catch (error) {
    //   console.log('Failed to create question:', error);
    //   enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    // }
  };

  return (
    <div>
      <AddQuestionForm closeDialog={closeDialog} onSubmit={handleSubmit} />
    </div>
  );
}

export default AddQuestion;
