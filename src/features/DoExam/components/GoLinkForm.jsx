import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Container,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import InputField from 'components/Form-controls/InputField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

GoLinkForm.propTypes = {
  handleLink: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    textAlign: 'center',
    margin: '0 auto',
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },

  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },

  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },

  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },

  labelField: {
    display: 'inline',
  },

  valueField: {
    display: 'inline',
  },

  formInline: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
  },

  formInlineLabel: {
    margin: '5px 10px 5px 0',
  },

  inline: {
    display: 'flex',
  },

  formInlineInput: {
    verticalAlign: 'middle',
    margin: '5px 10px 5px 0',
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd,',
  },

  link: {
    textDecoration: 'none',
    color: 'white',
  },
}));

function GoLinkForm({ handleLink = null }) {
  const classes = useStyles();
  const location = window.location;

  const schema = yup.object().shape({
    link: yup
      .string()
      .required('Vui lòng nhập đường dẫn để làm bài kiểm tra')
      .test('Validate url', 'Đường dẫn không hợp lệ', (value) => {
        return value.includes(location.href);
      }),
  });

  const form = useForm({
    defaultValues: {
      link: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (values) => {
    if (handleLink) handleLink(values);
  };
  const { isSubmitting } = form.formState;

  return (
    <Box>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Typography variant="h3" className={classes.title}>
        Nhập đường dẫn để vào phòng thi
      </Typography>
      <Paper className={classes.root}>
        <Container>
          <form onSubmit={form.handleSubmit(handleOnSubmit)}>
            <InputField name="link" label="Đường dẫn" form={form} />
            <Button
              disabled={isSubmitting}
              type="submit"
              className={classes.submit}
              color="primary"
              variant="contained"
              size="medium"
            >
              Thi
            </Button>
          </form>
        </Container>
      </Paper>
    </Box>
  );
}

export default GoLinkForm;
