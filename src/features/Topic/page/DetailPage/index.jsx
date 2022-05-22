import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  makeStyles,
  Typography
} from '@material-ui/core';
import AddQuestionForm from 'features/Topic/components/AddQuestionForm';
import QuestionList from 'features/Topic/components/QuestionList';
import React, { useState } from 'react';
  
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
  }));
  
  function DetailPage(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
  
    const handleClose = (event, reason) => {
      if (reason !== 'backdropClick') {
        setOpen(false);
      }
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const data = {
      name: 'Toán cao cấp A1',
      listQuestion: [
        {
          id: 1,
          thread: 'Tìm các cận dưới đúng và cận trên đúng trong R nếu chúng tồn tại của tập',
          img: '',
          trueAnswer: 'A',
        },
        {
          id: 2,
          thread: 'Tìm các cận dưới đúng và cận trên đúng trong R nếu chúng tồn tại của tập',
          img: '',
          trueAnswer: 'A',
        },
        {
          id: 3,
          thread: 'Tìm các cận dưới đúng và cận trên đúng trong R nếu chúng tồn tại của tập',
          img: '',
          trueAnswer: 'A',
        },
        {
          id: 4,
          thread: 'Tìm các cận dưới đúng và cận trên đúng trong R nếu chúng tồn tại của tập',
          img: '',
          trueAnswer: 'A',
        },
        {
          id: 5,
          thread: 'Tìm các cận dưới đúng và cận trên đúng trong R nếu chúng tồn tại của tập',
          img: '',
          trueAnswer: 'A',
        },
        {
          id: 6,
          thread: 'Tìm các cận dưới đúng và cận trên đúng trong R nếu chúng tồn tại của tập',
          img: '',
          trueAnswer: 'A',
        },
      ],
    };
    return (
      <Box>
        <Container>
          <Box className={classes.row}>
            <Typography className={classes.title} variant="h3">
              Danh sách chủ đề |
            </Typography>
            <Box className={classes.nameTopic}>
              <Typography variant="subtitle1">CHỦ ĐỀ: {data.name.toUpperCase()}</Typography>
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
          <QuestionList data={data.listQuestion} />
        </Container>
  
        <Dialog
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <AddQuestionForm />
            
          </DialogContent>
        </Dialog>
      </Box>
    );
  }
  
  export default DetailPage;