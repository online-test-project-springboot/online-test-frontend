import { Dialog, IconButton, Menu, MenuItem } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteIcon from '@material-ui/icons/Delete';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UpdateIcon from '@material-ui/icons/Update';
import DialogRemove from 'components/DialogRemove';
import { contentRemoveExam } from 'constants';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Transition, trucateText } from 'utils';

ExamQuestion.propTypes = {
  exam: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    height: 200,

    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },

  title: {
    wordWrap: 'break-word',
    fontWeight: 500,
  },

  icon: {
    position: 'relative',
    top: '5px',
  },

  btnMenu: {
    paddingRight: 0,
    float: 'right',
  },

  link: {
    textDecoration: 'none',
    color: 'black',
  },
}));

const ITEM_HEIGHT = 48;

function ExamQuestion({ exam = {} }) {
  const classes = useStyles();
  const match = useRouteMatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setOpen(true);
    handleCloseMenu();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="body1">
          {trucateText(exam.name, 20) || 'Update'}
        </Typography>

        <Typography variant="body2">
          <Icon className={classes.icon}>school</Icon> Chủ đề:{' '}
          {trucateText(exam.topicName, 10) || 'Update'}
        </Typography>

        <Typography variant="body2">
          {' '}
          <FormatListBulletedIcon className={classes.icon} /> Số câu hỏi:{' '}
          {exam.numOfQuestion || 'Update'}
        </Typography>

        <Typography variant="body2">
          <AccessTimeIcon className={classes.icon} /> Thời gian: {exam.time || 'Update'} phút
        </Typography>

        <IconButton
          className={classes.btnMenu}
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          keepMounted
          open={openMenu}
          onClose={handleCloseMenu}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '15ch',
            },
          }}
        >
          <Link className={classes.link} to={`${match.path}/edit/${exam.code}`}>
            <MenuItem key="update" onClick={handleCloseMenu}>
              <UpdateIcon />
              Update
            </MenuItem>
          </Link>

          <MenuItem key="delete" onClick={handleDelete}>
            <DeleteIcon />
            Delete
          </MenuItem>
        </Menu>
      </CardContent>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogRemove contentRemove={contentRemoveExam} closeDialog={handleClose} />
      </Dialog>
    </Card>
  );
}

export default ExamQuestion;
