import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import StorageKeys from 'constants/storage-keys';
import React from 'react';
import { useEffect } from 'react';

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

function convertAnswer(questionCode, answerCodes) {
  return {
    questionCode,
    answerCodes: [answerCodes],
  };
}

function findAnswer(dataExam, questionCode) {
  if (!Array.isArray(dataExam)) return;

  let indexOfAnswer = -1;

  const isSelected = dataExam.some((answer, index) => {
    if (answer.questionCode === questionCode) {
      indexOfAnswer = index;
      return true;
    }

    return false;
  });

  return {
    isSelected,
    indexOfAnswer,
  };
}

function changeAnswerExam(dataExam, answerCodes, questionCode) {
  const result = [...dataExam];

  const { isSelected, indexOfAnswer } = findAnswer(result, questionCode);

  if (isSelected) {
    result[indexOfAnswer].answerCodes[0] = answerCodes;

    return result;
  }

  result.push(convertAnswer(questionCode, answerCodes));

  return result;
}

function defaultValueRadio(questionCode) {
  const answers = JSON.parse(localStorage.getItem(StorageKeys.DATAEXAM));

  const { isSelected, indexOfAnswer } = findAnswer(answers, questionCode);

  if (isSelected) {
    return answers[indexOfAnswer].answerCodes[0];
  }

  return '';
}

function AnswerList({ data = {} }) {
  const classes = useStyles();

  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    const dataExam = localStorage.getItem(StorageKeys.DATAEXAM)
      ? JSON.parse(localStorage.getItem(StorageKeys.DATAEXAM))
      : [];

    localStorage.setItem(
      StorageKeys.DATAEXAM,
      JSON.stringify(changeAnswerExam(dataExam, event.target.value, data.code))
    );

    setValue(event.target.value);
  };

  const labelAnswer = ['Chọn đáp án A', 'Chọn đáp án B', 'Chọn đáp án C', 'Chọn đáp án D'];

  useEffect(() => {
    setValue(defaultValueRadio(data.code));
  }, [data]);

  return (
    <Box>
      <Paper className={classes.root}>
        <Container>
          <FormControl component="fieldset">
            <RadioGroup aria-label="answer" name="answer" value={value} onChange={handleChange}>
              {data.answers &&
                data.answers.map((answer, index) => (
                  <FormControlLabel
                    key={answer.code}
                    value={answer.code}
                    control={<Radio />}
                    label={labelAnswer[index]}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        </Container>
      </Paper>
    </Box>
  );
}

export default AnswerList;
