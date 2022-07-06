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
import SelectField from 'components/Form-controls/SelectField';
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

  const schema = yup.object().shape({
    title: yup.string().required('Please enter your title.'),
    topic: yup.string().required('Please select topic.'),
    numberQuestion: yup.string().required('Please select number question.'),
    time: yup.string().required('Please select exam time.'),
    questionCodes: yup
      .array()
      .length(
        Number.parseInt(data.numberQuestion),
        `Please select number of question equal ${data.numberQuestion}`
      ),
  });

  const form = useForm({
    defaultValues: {
      title: ' ',
      topic: ' ',
      numberQuestion: data.numberQuestion,
      time: data.time,
      questionCodes: [],
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    // if (onSubmit) {
    //   await onSubmit(values);
    // }
  };

  const handleClose = () => {};

  const topicList = [
    { value: '', text: 'Chọn', disabled: true },
    { value: 'Toán', text: 'Toán' },
    { value: 'Văn', text: 'Văn' },
    { value: 'Sinh', text: 'Sinh' },
    { value: 'Hóa', text: 'Hóa' },
  ];

  const dataa = {
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Paper>
        <Container>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Typography>Chọn chủ đề</Typography>
            <SelectField
              disabled={true}
              selectList={topicList}
              id="topic"
              name="topic"
              form={form}
            ></SelectField>

            <Typography>Số câu hỏi</Typography>
            <InputField disabled={true} name="numberQuestion" isTypeNumber={true} form={form} />

            <Typography>Thời gian</Typography>
            <InputField disabled={true} name="time" isTypeNumber={true} form={form} />

            <Typography>Danh sách câu hỏi chủ để: {}</Typography>
            <TableContainer className={classes.container}>
              <TableQuestion
                page={page}
                rowsPerPage={rowsPerPage}
                data={dataa}
                numberQuestion={data.numberQuestion}
                id="questionCodes"
                name="questionCodes"
                form={form}
              />
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={dataa.listQuestion.length}
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
