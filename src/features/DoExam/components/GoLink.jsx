import React from 'react';
import PropTypes from 'prop-types';
import GoLinkForm from './GoLinkForm';
import { makeStyles, Typography } from '@material-ui/core';

GoLink.propTypes = {};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
}));

function GoLink(props) {
  const classes = useStyles();

  const handleLink = () => {
    console.log('hahahas');
  };
  return (
    <div>
      <GoLinkForm handleLink={handleLink} />
    </div>
  );
}

export default GoLink;
