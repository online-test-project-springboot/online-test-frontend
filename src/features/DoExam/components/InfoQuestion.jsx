import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Container, Radio, Typography } from '@material-ui/core';
import DialogQuestion from 'components/DialogQuestion';
import Question from './Question';
import RadioField from 'components/Form-controls/RadioField';
import AnswerList from './AnswerList';
import QuestionListLink from './QuestionListLink';
import { useState } from 'react';

InfoQuestion.propTypes = {
  exam: PropTypes.object,
};

function InfoQuestion({ exam = {} }) {
  const { code, name, time, topicName, questions } = exam;
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestion === questions.length - 1) return;

    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevQuestion = () => {
    if (currentQuestion === 0) return;

    setCurrentQuestion(currentQuestion - 1);
  };

  const handleLinkQuestion = (numberQuestion) => {
    console.log(numberQuestion);
    setCurrentQuestion(numberQuestion);
  };

  return (
    <Box>
      <Typography>DEMO</Typography>
      <Box display="flex">
        <Typography>Tên môn thi: {topicName}</Typography>
        <Typography>Có câu {questions?.length} hỏi</Typography>
        <Typography>Làm trong {time} phút</Typography>
      </Box>

      <Question currentQuestion={currentQuestion} data={questions?.[currentQuestion]} />

      <Box>
        <Container>
          <AnswerList data={questions?.[currentQuestion]} />
          <Button disabled={currentQuestion === 0} variant="outlined" onClick={handlePrevQuestion}>
            Câu trước
          </Button>
          <Button
            disabled={currentQuestion === questions?.length - 1}
            variant="outlined"
            onClick={handleNextQuestion}
          >
            Câu tiếp theo
          </Button>
          <Typography>
            Trả lời bằng cách: Chọn phương án trả lời và nhấn nút <b>Câu kế tiếp</b>
          </Typography>

          <QuestionListLink
            currentQuestion={currentQuestion}
            handleLinkQuestion={handleLinkQuestion}
            data={questions}
          />
        </Container>
      </Box>
    </Box>
  );
}

export default InfoQuestion;
