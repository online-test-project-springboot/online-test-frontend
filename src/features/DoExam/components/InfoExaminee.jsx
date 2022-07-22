import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

InfoExaminee.propTypes = {};

function InfoExaminee(props) {
  return (
    <Box>
      <Typography>Họ và tên:</Typography>
      <Typography>Ngày sinh</Typography>
    </Box>
  );
}

export default InfoExaminee;
