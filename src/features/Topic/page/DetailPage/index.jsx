import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import questionApi from 'api/questionApi';
import AddQuestion from 'features/Topic/components/AddQuestion';
import QuestionList from 'features/Topic/components/QuestionList';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

DetailPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'left',
    display: 'inline',
  },

  nameTopic: {
    color: 'black',
    display: 'inline-block',
    borderStyle: 'solid',
    borderColor: 'white',
    borderRadius: '5px',
    background: '#47afaf',
    height: '30px',
    marginLeft: '10px',
    marginTop: '15px',
  },

  row: {
    display: 'flex',
  },

  btnCreate: {
    marginTop: '15px',
    color: 'aqua',
    borderStyle: '1px solid',
    borderColor: 'aqua',
    borderRadius: '30px',
    height: '35px',
    background: 'white',
    position: 'absolute',
    right: '50px',
  },

  close: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
    cursor: 'pointer',
  },
}));

function DetailPage(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const { topicId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await questionApi.getAll(topicId);

        // const data = {
        //   name: 'Toán cao cấp A1',
        //   listQuestion: [
        //     {
        //       id: 1,
        //       thread: 'Tìm các cận dưới đúng và cận trên đúng trong R nếu chúng tồn tại của tập',
        //       img: '',
        //       trueAnswer: 'A',
        //     },
        //     {
        //       id: 2,
        //       thread: 'Tìm các cận dưới đúng và cận trên đúng trong R nếu chúng tồn tại của tập',
        //       img: '',
        //       trueAnswer: 'A',
        //     },
        //     {
        //       id: 3,
        //       thread: 'Tìm các cận dưới đúng và cận trên đúng trong R nếu chúng tồn tại của tập',
        //       img: '',
        //       trueAnswer: 'A',
        //     },
        //     {
        //       id: 4,
        //       thread: 'Tìm các cận dưới đúng và cận trên đúng trong R nếu chúng tồn tại của tập',
        //       img: '',
        //       trueAnswer: 'A',
        //     },
        //     {
        //       id: 5,
        //       thread: 'Tìm các cận dưới đúng và cận trên đúng trong R nếu chúng tồn tại của tập',
        //       img: '',
        //       trueAnswer: 'A',
        //     },
        //     {
        //       id: 6,
        //       thread: 'Tìm các cận dưới đúng và cận trên đúng trong R nếu chúng tồn tại của tập',
        //       img: '',
        //       trueAnswer: 'A',
        //     },
        //   ],
        // };

        setQuestionList(data);
      } catch (error) {
        console.log('Failed to fetch question list', error);
      }
    })();
  }, []);

  const handleRemove = async (code) => {
    try {
      const response = await questionApi.delete(topicId, code);
      const { data } = await questionApi.getAll(topicId);

      setQuestionList(data);

      enqueueSnackbar(response.message, { variant: 'success', autoHideDuration: 1000 });
    } catch (error) {
      console.log('Failed to remove question: ', error);
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };

  const handleAddQuestion = async () => {
    try {
      const { message, data } = await questionApi.getAll(topicId);

      setQuestionList(data);

      enqueueSnackbar(message, { variant: 'success', autoHideDuration: 1000 });
    } catch (error) {
      console.log('Failed to  fetch question list: ', error);
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };

  return (
    <Box>
      <Container>
        <Box className={classes.row}>
          <Typography className={classes.title} variant="h3">
            Danh sách câu hỏi |
          </Typography>
          <Box className={classes.nameTopic}>
            <Typography variant="subtitle1">CHỦ ĐỀ: {'Toán'.toUpperCase()}</Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            onClick={handleClickOpen}
            className={classes.btnCreate}
          >
            <Typography variant="subtitle2">+ Thêm câu hỏi mới</Typography>
          </Button>
        </Box>
        <QuestionList handleRemove={handleRemove} data={questionList} />
      </Container>

      <Dialog
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.close} onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          <AddQuestion handleAddQuestion={handleAddQuestion} closeDialog={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default DetailPage;
