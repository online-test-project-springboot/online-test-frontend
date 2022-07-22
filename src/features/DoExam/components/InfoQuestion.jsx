import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Container, Radio, Typography } from '@material-ui/core';
import DialogQuestion from 'components/DialogQuestion';
import Question from './Question';
import RadioField from 'components/Form-controls/RadioField';
import AnswerList from './AnswerList';
import QuestionListLink from './QuestionListLink';

InfoQuestion.propTypes = {
  exam: PropTypes.object,
};

function InfoQuestion({ exam = {} }) {
  const { code, name, time, topicName, questions } = exam;

  return (
    <Box>
      <Typography>DEMO</Typography>
      <Box display="flex">
        <Typography>Tên môn thi: {topicName}</Typography>
        <Typography>Có câu {questions?.length} hỏi</Typography>
        <Typography>Làm trong {time} phút</Typography>
      </Box>

      <Question data={questions?.[0]} />

      <Box>
        <Container>
          <AnswerList data={questions?.[0]} />
          <Button variant="outlined">Câu trước</Button>
          <Button variant="outlined">Câu tiếp theo</Button>
          <Typography>
            Trả lời bằng cách: Chọn phương án trả lời và nhấn nút <b>Câu kế tiếp</b>
          </Typography>

          <QuestionListLink data={questions} />
        </Container>
      </Box>
    </Box>
  );
}

export default InfoQuestion;
