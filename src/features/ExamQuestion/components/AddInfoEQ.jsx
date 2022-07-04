import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Container,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputField from 'components/Form-controls/InputField';
import SelectField from 'components/Form-controls/SelectField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useHistory } from 'react-router-dom';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4),
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },

  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
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

  labelField: {
    display: 'inline',
  },

  valueField: {
    display: 'inline',
  },

  formInline: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
  },

  formInlineLabel: {
    margin: '5px 10px 5px 0',
  },

  inline: {
    display: 'flex',
  },

  formInlineInput: {
    verticalAlign: 'middle',
    margin: '5px 10px 5px 0',
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd,',
  },

  link: {
    textDecoration: 'none',
    color: 'white',
  },
}));

AddInfoEQ.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.array,
};

function AddInfoEQ({ onSubmit = null, data = [] }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    name: yup.string().required('Please enter your title.'),
    topicCode: yup.string().required('Please select topic.'),
    numberQuestion: yup.string().required('Please enter number question.'),
    time: yup.string().required('Please enter exam time.'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      topicCode: '',
      numberQuestion: '',
      time: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleClose = () => {};

  const topicList = data.map((topic) => {
    return { value: topic.code, text: topic.name };
  });
  topicList.unshift({ value: '', text: 'Chọn', disabled: true });

  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Typography className={classes.title} component={'h3'} variant={'h5'}>
        Thêm câu hỏi
      </Typography>

      <Paper>
        <Container>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Typography>Tiêu đề bài thi</Typography>
            <InputField name="name" label="Tiêu đề" form={form} />

            <Typography>Chọn chủ đề</Typography>
            <SelectField
              selectList={topicList}
              id="topicCode"
              name="topicCode"
              form={form}
            ></SelectField>

            <Typography>Số câu hỏi</Typography>
            <InputField name="numberQuestion" label="Số câu hỏi" isTypeNumber={true} form={form} />

            <Typography>Thời gian</Typography>
            <InputField name="time" label="Thời gian" isTypeNumber={true} form={form} />

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

export default AddInfoEQ;
