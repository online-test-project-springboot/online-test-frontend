import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import examApi from 'api/examApi';
import ExamQuestionList from 'features/ExamQuestion/components/ExamQuestionList';

import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

ListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },

  btnCreate: {
    marginTop: '15px',
    color: 'white',
    borderStyle: '1px solid',
    borderRadius: '30px',
    height: '35px',
    width: '150px',
    background: '#f27624',
    right: '35px',
    float: 'right',
  },

  link: {
    textDecoration: 'none',
    color: 'black',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const match = useRouteMatch();

  const [examQuestionList, setExamQuestionList] = useState();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await examApi.getAll();
        // const data = [
        //   {
        //     id: 1,
        //     title: 'Đánh giá năng lực',
        //     topic: 'Toán Học',
        //     questionNumber: '30 câu',
        //     time: '45 phút',
        //   },
        //   {
        //     id: 2,
        //     title: 'Đánh giá năng lực',
        //     topic: 'Toán Học',
        //     questionNumber: '30 câu',
        //     time: '45 phút',
        //   },
        //   {
        //     id: 3,
        //     title: 'Đánh giá năng lực',
        //     topic: 'Toán Học',
        //     questionNumber: '30 câu',
        //     time: '45 phút',
        //   },
        //   {
        //     id: 4,
        //     title: 'Đánh giá năng lực',
        //     topic: 'Toán Học',
        //     questionNumber: '30 câu',
        //     time: '45 phút',
        //   },
        //   {
        //     id: 5,
        //     title: 'Đánh giá năng lực',
        //     topic: 'Toán Học',
        //     questionNumber: '30 câu',
        //     time: '45 phút',
        //   },
        //   {
        //     id: 6,
        //     title: 'Đánh giá năng lực',
        //     topic: 'Toán Học',
        //     questionNumber: '30 câu',
        //     time: '45 phút',
        //   },
        // ];

        setExamQuestionList(data);
      } catch (error) {
        console.log('Failed to fetch exam question list', error);
      }
    })();
  }, []);
  return (
    <Box>
      <Container>
        <Typography className={classes.title} variant="h3">
          Danh sách đề thi
        </Typography>
        <Link to={`${match.path}/add`} className={classes.link}>
          <Button size="small" variant="outlined" className={classes.btnCreate}>
            <Typography variant="subtitle2">Tạo đề thi +</Typography>
          </Button>
        </Link>

        <ExamQuestionList data={examQuestionList} />
      </Container>
    </Box>
  );
}

export default ListPage;
