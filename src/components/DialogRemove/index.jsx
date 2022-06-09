import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';

DialogRemove.propTypes = {
  closeDialog: PropTypes.func,
  contentRemove: PropTypes.object,
};

function DialogRemove({ closeDialog = null, contentRemove = {} }) {
  const handleClose = () => {
    if (closeDialog) {
      closeDialog();
    }
  };

  const handleRemove = () => {
    //call Api
    if (closeDialog) {
      closeDialog();
    }
  };

  return (
    <div>
      <DialogTitle id="alert-dialog-title">{contentRemove.TITLE  ||''}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contentRemove.DESCRIPTION ||''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Hủy
        </Button>
        <Button onClick={handleRemove} variant="contained" color="secondary" autoFocus>
          Xóa
        </Button>
      </DialogActions>
    </div>
  );
}

export default DialogRemove;
