import { Box, Button, Container, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import AnswerList from './AnswerList';
import Question from './Question';
import QuestionListLink from './QuestionListLink';

InfoQuestion.propTypes = {
  exam: PropTypes.object,
};

function InfoQuestion({ exam = {} }) {
  const { code, name, time, topicName, questions } = exam;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerSelect, setAnswerSelect] = useState();

  const handleNextQuestion = () => {
    if (currentQuestion === questions.length - 1) return;

    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevQuestion = () => {
    if (currentQuestion === 0) return;

    setCurrentQuestion(currentQuestion - 1);
  };

  const handleLinkQuestion = (numberQuestion) => {
    setCurrentQuestion(numberQuestion);
  };

  const isSelected = () => {
    const cloneAnswerSelect = [...answerSelect];
    cloneAnswerSelect[currentQuestion] = true;
    setAnswerSelect(cloneAnswerSelect);
  };

  useEffect(() => {
    if (questions) {
      const newArr = Array.from({ length: questions.length }, (v, i) => false);
      setAnswerSelect(newArr);
    }
  }, [questions]);

  return (
    <Box>
      <Box display="flex">
        <Typography>Tên môn thi: {topicName}</Typography>
        <Typography>Có câu {questions?.length} hỏi</Typography>
        <Typography>Làm trong {time} phút</Typography>
      </Box>

      <Question currentQuestion={currentQuestion} data={questions?.[currentQuestion]} />

      <Box>
        <Container>
          <AnswerList isSelected={isSelected} data={questions?.[currentQuestion]} />
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
            answerSelect={answerSelect}
          />
        </Container>
      </Box>
    </Box>
  );
}

export default InfoQuestion;
