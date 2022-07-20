import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Container, Radio, Typography } from '@material-ui/core';
import DialogQuestion from 'components/DialogQuestion';
import Question from './Question';
import RadioField from 'components/Form-controls/RadioField';
import AnswerList from './AnswerList';
import QuestionListLink from './QuestionListLink';

InfoQuestion.propTypes = {};

function InfoQuestion(props) {
  const data = [
    {
      code: 'MQ==',
      content: '1 + 1 = ?',
      answers: [
        {
          code: 'MQ==',
          content: '2',
        },
        {
          code: 'Mg==',
          content: '3',
        },
        {
          code: 'Mw==',
          content: '4',
        },
        {
          code: 'NA==',
          content: '5',
        },
      ],
    },
    {
      code: 'Mg==',
      content: '3 + 1 = ?',
      answers: [
        {
          code: 'NQ==',
          content: '2',
        },
        {
          code: 'Ng==',
          content: '3',
        },
        {
          code: 'Nw==',
          content: '4',
        },
        {
          code: 'OA==',
          content: '5',
        },
      ],
    },
    {
      code: 'Mw==',
      content: '4 + 2 = ?',
      answers: [
        {
          code: 'OQ==',
          content: '5',
        },
        {
          code: 'MTA=',
          content: '6',
        },
        {
          code: 'MTE=',
          content: '7',
        },
        {
          code: 'MTI=',
          content: '8',
        },
      ],
    },
  ];
  return (
    <Box>
      <Typography>DEMO</Typography>
      <Box display="flex">
        <Typography>Tên môn thi: Toán</Typography>
        <Typography>Có 15 câu hỏi</Typography>
        <Typography>Làm trong 15 phút</Typography>
      </Box>

      <Question data={data[0]} />

      <Box>
        <Container>
          <AnswerList data={data[0]} />
          <Button variant="outlined">Câu trước</Button>
          <Button variant="outlined">Câu tiếp theo</Button>
          <Typography>
            Trả lời bằng cách: Chọn phương án trả lời và nhấn nút <b>Câu kế tiếp</b>
          </Typography>

          <QuestionListLink data={data} />
        </Container>
      </Box>

      {/* <RadioField data={data[0]} label="hahaha" /> */}
    </Box>
  );
}

export default InfoQuestion;
