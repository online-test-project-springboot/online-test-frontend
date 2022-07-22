import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import doExamApi from 'api/doExamApi';
import InfoExam from 'features/DoExam/components/InfoExam';
import InfoQuestion from 'features/DoExam/components/InfoQuestion';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '70%',
  },

  right: {
    flex: '1 1 0',
  },
}));

function DetailPage(props) {
  const classes = useStyles();
  const { examId } = useParams();
  const [exam, setExam] = useState({});

  useEffect(() => {
    (async () => {
      const { message, data } = await doExamApi.takeExam(examId);

      if (message) {
        setExam(data);
      }
    })();
  }, []);

  return (
    <Box>
      <Paper>
        <Container>
          <Grid container spacing={1}>
            <Grid item className={classes.left}>
              <InfoQuestion exam={exam} />
            </Grid>
            <Grid item className={classes.right}>
              <InfoExam />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Box>
  );
}

export default DetailPage;
