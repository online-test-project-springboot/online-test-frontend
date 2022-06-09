import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import AddQuestionForm from './AddQuestionForm';

AddQuestion.propTypes = {
  closeDialog: PropTypes.func,
};

function AddQuestion({ closeDialog = null }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    console.log('Value Form:', values);
  };

  return (
    <div>
      <AddQuestionForm closeDialog={closeDialog} onSubmit={handleSubmit} />
    </div>
  );
}

export default AddQuestion;