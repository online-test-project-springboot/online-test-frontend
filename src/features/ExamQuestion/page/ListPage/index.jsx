import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import examApi from 'api/examApi';
import ExamQuestionList from 'features/ExamQuestion/components/ExamQuestionList';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();

  const [examQuestionList, setExamQuestionList] = useState();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await examApi.getAll();

        setExamQuestionList(data);
      } catch (error) {
        console.log('Failed to fetch exam question list', error);
      }
    })();
  }, []);

  const handleRemove = async (code) => {
    try {
      const response = await examApi.delete(code);
      const { data } = await examApi.getAll();
      setExamQuestionList(data);

      enqueueSnackbar(response.message, { variant: 'success', autoHideDuration: 1000 });
    } catch (error) {
      console.log('Failed to remove topic: ', error);
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };
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

        <ExamQuestionList handleRemove={handleRemove} data={examQuestionList} />
      </Container>
    </Box>
  );
}

export default ListPage;
