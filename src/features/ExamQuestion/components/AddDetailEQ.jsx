import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Container,
  LinearProgress,
  Paper,
  TableContainer,
  TablePagination,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputField from 'components/Form-controls/InputField';
import TableQuestion from 'features/ExamQuestion/components/TableQuestion';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4),
  },

  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },

  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

AddDetailEQ.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.object,
};

function AddDetailEQ({ onSubmit = null, data = {} }) {
  const classes = useStyles();
  const { topicCode, time, numberQuestion, dataQuestion } = data;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const schema = yup.object().shape({
    questionCodes: yup
      .array()
      .length(
        Number.parseInt(numberQuestion),
        `Please select number of question equal ${numberQuestion}`
      ),
  });

  const form = useForm({
    defaultValues: {
      topicCode: topicCode,
      numberQuestion: data.numberQuestion,
      time: time,
      questionCodes: [],
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleClose = () => {};

  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Paper>
        <Container>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Typography>Chọn chủ đề</Typography>
            <InputField disabled={true} id="topicCode" name="topicCode" form={form} />

            <Typography>Số câu hỏi</Typography>
            <InputField disabled={true} name="numberQuestion" isTypeNumber={true} form={form} />

            <Typography>Thời gian</Typography>
            <InputField disabled={true} name="time" isTypeNumber={true} form={form} />

            <Typography>Danh sách câu hỏi chủ để: {dataQuestion.name}</Typography>
            <TableContainer className={classes.container}>
              <TableQuestion
                page={page}
                rowsPerPage={rowsPerPage}
                data={dataQuestion.questions}
                numberQuestion={data.numberQuestion}
                id="questionCodes"
                name="questionCodes"
                form={form}
              />
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={dataQuestion.questions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <NavLink to="/examQuestion-list" className={classes.link}>
              <Button
                disabled={isSubmitting}
                className={classes.submit}
                onClick={handleClose}
                color="primary"
                variant="contained"
                size="medium"
              >
                Hủy
              </Button>
            </NavLink>

            <Button
              disabled={isSubmitting}
              type="submit"
              className={classes.submit}
              color="primary"
              variant="contained"
              size="medium"
            >
              Lưu
            </Button>
          </form>
        </Container>
      </Paper>
    </div>
  );
}

export default AddDetailEQ;
