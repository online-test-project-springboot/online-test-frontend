import { Box } from '@material-ui/core';
import AddEditTopic from 'features/Topic/components/AddEditTopic';
import React from 'react';

AddEditPage.propTypes = {};

function AddEditPage(props) {
  return (
    <Box>
      <AddEditTopic />
    </Box>
  );
}

export default AddEditPage;
