import topicApi from 'api/topicApi';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CreateForm from '../CreateForm';

CreateTopic.propTypes = {};

function CreateTopic(props) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const customValues = { ...values, ownerId: 2 };
      const response = await topicApi.create(customValues);

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
  return (
    <div>
      <CreateForm onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateTopic;
