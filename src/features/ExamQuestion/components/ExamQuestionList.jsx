import { Box, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import ExamQuestion from './ExamQuestion';

ExamQuestionList.propTypes = {
  data: PropTypes.array,
};

function ExamQuestionList({ data = [] }) {
  return (
    <Box margin={3}>
      <Grid container>
        {data.map((exam, index) => (
          <Grid item key={exam.code}>
            <ExamQuestion exam={exam} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ExamQuestionList;
