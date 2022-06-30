import questionApi from 'api/questionApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddQuestionForm from './AddQuestionForm';

AddQuestion.propTypes = {
  closeDialog: PropTypes.func,
  handleAddUpdateQuestion: PropTypes.func,
  data: PropTypes.object,
};

function convertData(values) {
  if (typeof values !== 'object') return;

  const payload = {
    content: '',
    answers: [],
  };

  payload.content = values.content.trim();

  delete values.content;

  for (const key in values) {
    if (values[key]) {
      const ansObj = {
        content: values[key].trim(),
      };

      if (key === values.trueAnswer) {
        ansObj.rightAnswer = true;
        delete values.trueAnswer;
      }

      payload.answers.push(ansObj);
    }
  }

  return payload;
}

function AddQuestion({ closeDialog = null, handleAddUpdateQuestion = null, data = {} }) {
  const { enqueueSnackbar } = useSnackbar();
  const { topicId } = useParams();
  const isAddMode = Object.keys(data).length === 0;

  const handleSubmit = async (values) => {
    const payload = convertData(values);

    try {
      let response;
      if (isAddMode) {
        response = await questionApi.create(topicId, payload);
      } else {
        response = await questionApi.update(topicId, data.code, payload);
      }

      if (response.message) {
        enqueueSnackbar(response.message, { variant: 'success', autoHideDuration: 1000 });
        closeDialog();
        if (handleAddUpdateQuestion) {
          handleAddUpdateQuestion();
        }
      }
    } catch (error) {
      console.log('Failed to create or update question:', error);
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };

  return (
    <div>
      <AddQuestionForm detailQuestion={data} closeDialog={closeDialog} onSubmit={handleSubmit} />
    </div>
  );
}

export default AddQuestion;
