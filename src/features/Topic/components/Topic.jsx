import { Dialog, IconButton, Menu, MenuItem } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DialogRemove from 'components/DialogRemove';
import { contentRemoveTopic } from 'constants';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Transition, trucateText } from 'utils';

Topic.propTypes = {
  topic: PropTypes.object,
  handleRemove: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 180,
    height: 130,

    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },

  title: {
    wordWrap: 'break-word',
  },

  date: {
    fontSize: 14,
    display: 'inline',
  },

  btnMenu: {
    padding: 0,
    float: 'right',
  },

  link: {
    textDecoration: 'none',
    color: 'black',
  },
}));

const ITEM_HEIGHT = 48;

function Topic({ topic = {}, handleRemove = null }) {
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

  const handleRemoveTopic = () => {
    if (handleRemove) handleRemove(topic.code);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.date} color="textSecondary" gutterBottom>
          {topic.createdDate || 'Update'}
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
              width: '20ch',
            },
          }}
        >
          <Link className={classes.link} to={`${match.path}/edit/${topic.code}`}>
            <MenuItem key="update" onClick={handleCloseMenu}>
              Update
            </MenuItem>
          </Link>

          <MenuItem key="delete" onClick={handleDelete}>
            Delete
          </MenuItem>
        </Menu>

        <Link className={classes.link} to={`${match.path}/${topic.code}/questions`}>
          <Typography className={classes.title} variant="h5" component="h2">
            {topic.name ? trucateText(topic.name, 18) : 'Update'}
          </Typography>
        </Link>

        <Typography variant="body2" component="p">
          {topic.description ? trucateText(topic.description, 20) : 'Update'}
        </Typography>
      </CardContent>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogRemove
          onClickRemove={handleRemoveTopic}
          contentRemove={contentRemoveTopic}
          closeDialog={handleClose}
        />
      </Dialog>
    </Card>
  );
}

export default Topic;
