import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import InfoExam from 'features/DoExam/components/InfoExam';
import InfoQuestion from 'features/DoExam/components/InfoQuestion';

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

  return (
    <Box>
      <Paper>
        <Container>
          <Grid container spacing={1}>
            <Grid item className={classes.left}>
              <InfoQuestion />
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
