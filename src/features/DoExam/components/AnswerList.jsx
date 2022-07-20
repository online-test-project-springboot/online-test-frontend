import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Container,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from 'components/Form-controls/InputField';
import RadioField from 'components/Form-controls/RadioField';

AnswerList.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    textAlign: 'center',
    margin: '0 auto',
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

  link: {
    textDecoration: 'none',
    color: 'white',
  },
}));

function AnswerList({ data = {} }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    answer: yup.string().required('Please enter link to do exam'),
  });

  const form = useForm({
    defaultValues: {
      answer: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (values) => {
    console.log(values);
    // if (handleLink) handleLink();
  };
  const { isSubmitting } = form.formState;

  return (
    <Box>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Paper className={classes.root}>
        <Container>
          <form onSubmit={form.handleSubmit(handleOnSubmit)}>
            <RadioField form={form} label="Answer" name="answer" answerList={data.answers} />

            <Button
              disabled={isSubmitting}
              type="submit"
              className={classes.submit}
              color="primary"
              variant="contained"
              size="medium"
            >
              Thi
            </Button>
          </form>
        </Container>
      </Paper>
    </Box>
  );
}

export default AnswerList;
