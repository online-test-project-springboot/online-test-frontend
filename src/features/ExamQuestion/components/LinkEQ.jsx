import { Container, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Link } from 'react-router-dom';

LinkEQ.propTypes = {};
const useStyles = makeStyles((theme) => ({
  info: {
    marginLeft: '34%',
  },
  link: {
    color: '#00a3b5',
  },
}));

function createLink(examCode) {
  return `${window.location.origin}/doExam/${examCode}`;
}

function LinkEQ({ data = {} }) {
  const classes = useStyles();

  return (
    <Paper>
      <Container>
        <Typography variant="h4" align="center">
          <CheckCircleIcon fontSize="medium" style={{ color: green[600] }} /> Bạn đã tạo đề thi
          thành công
        </Typography>
        <Typography variant="subtitle1" className={classes.info}>
          Đề thi: {data.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.info}>
          Link: <Link className={classes.link}> {createLink(data.code)}</Link>
          <IconButton size="small" color="primary" aria-label="copy link" component="span">
            <FileCopyIcon /> Copy
          </IconButton>
        </Typography>
      </Container>
    </Paper>
  );
}

export default LinkEQ;
