import { Box, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import ExamQuestion from './ExamQuestion';

ExamQuestionList.propTypes = {
  data: PropTypes.array,
  handleRemove: PropTypes.func,
};

function ExamQuestionList({ data = [], handleRemove = null }) {
  return (
    <Box margin={3}>
      <Grid container>
        {data.map((exam, index) => (
          <Grid item key={exam.code}>
            <ExamQuestion handleRemove={handleRemove} exam={exam} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ExamQuestionList;
