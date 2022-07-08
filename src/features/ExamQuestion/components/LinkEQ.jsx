import { Button, Container, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

LinkEQ.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    width: '50%',
  },
  container: {
    padding: '30px 0',
  },

  info: {
    marginLeft: '23%',
    marginTop: '20px',
  },
  link: {
    color: '#00a3b5',
    textDecoration: 'none',
  },

  btn: {
    marginTop: '20px',
    marginLeft: '43%',
  },
}));

function createLink(examCode) {
  return `${window.location.origin}/doExam/${examCode}`;
}

function LinkEQ({ data = {} }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleCopy = (examCode) => {
    const link = createLink(examCode);
    navigator.clipboard.writeText(link);
    enqueueSnackbar('Sao chép đường dẫn thành công', {
      variant: 'success',
      autoHideDuration: 1000,
    });
  };

  return (
    <Paper elevation={2} className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h4" align="center">
          <CheckCircleIcon fontSize="medium" style={{ color: green[600] }} /> Bạn đã tạo đề thi
          thành công
        </Typography>
        <Typography variant="subtitle1" className={classes.info}>
          Đề thi: {data.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.info}>
          Link:{' '}
          <Link to="" className={classes.link}>
            {' '}
            {createLink(data.code)}
          </Link>
          <IconButton
            onClick={() => handleCopy(data.code)}
            size="small"
            color="primary"
            aria-label="copy link"
            component="span"
          >
            <FileCopyIcon /> Copy
          </IconButton>
        </Typography>

        <Button className={classes.btn} variant="outlined" color="primary">
          <Link to="/examQuestion-list" className={classes.link}>
            {' '}
            Danh sách đề thi
          </Link>
        </Button>
      </Container>
    </Paper>
  );
}

export default LinkEQ;
