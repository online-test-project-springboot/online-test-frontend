import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputField from 'components/Form-controls/InputField';
import SelectField from 'components/Form-controls/SelectField';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4),
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
}));

AddQuestionForm.propTypes = {
  onSubmit: PropTypes.func,
  closeDialog: PropTypes.func,
  detailQuestion: PropTypes.object,
};

function AddQuestionForm({ onSubmit = null, closeDialog = null, detailQuestion = {} }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    content: yup.string().required('Please enter your question.'),

    trueAnswer: yup
      .string()
      .test('select-option-have-value', 'Please select answer have value', function (selectAnswer) {
        return !!this.parent[selectAnswer].trim();
      }),
  });

  const form = useForm({
    defaultValues: {
      content: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      trueAnswer: 'answer1',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleClose = () => {
    if (closeDialog) {
      closeDialog();
    }
  };

  const answerList = [
    { name: 'answer1', label: 'Đáp án 1' },
    { name: 'answer2', label: 'Đáp án 2' },
    { name: 'answer3', label: 'Đáp án 3' },
    { name: 'answer4', label: 'Đáp án 4' },
  ];

  const selectList = [
    { value: 'answer1', text: 'Đáp án 1' },
    { value: 'answer2', text: 'Đáp án 2' },
    { value: 'answer3', text: 'Đáp án 3' },
    { value: 'answer4', text: 'Đáp án 4' },
  ];

  useEffect(() => {
    if (typeof detailQuestion !== 'object' || Object.keys(detailQuestion).length === 0) return;

    const { content, answers } = detailQuestion;
    form.setValue('content', content);

    const fieldList = ['answer1', 'answer2', 'answer3', 'answer4'];
    answers.forEach((answer, index) => {
      if (answer.rightAnswer) {
        form.setValue('trueAnswer', fieldList[index]);
      }

      form.setValue(fieldList[index], answer.content);
    });
  }, [detailQuestion]);

  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Typography className={classes.title} component={'h3'} variant={'h5'}>
        {Object.keys(detailQuestion).length === 0 ? 'Thêm câu hỏi' : 'Chỉnh sửa câu hỏi'}
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Typography>Câu hỏi</Typography>
        <InputField name="content" label="Câu hỏi" form={form} />
        <Grid container>
          {answerList.map((answer, index) => (
            <Grid item key={index} xs={6}>
              <div className={classes.inline}>
                <Typography>{answer.label}:</Typography>
                <InputField name={answer.name} label={answer.label} form={form} />
              </div>
            </Grid>
          ))}
        </Grid>

        <SelectField
          selectList={selectList}
          id="trueAnswer"
          name="trueAnswer"
          label="Đáp án đúng"
          form={form}
        ></SelectField>

        <Button
          disabled={isSubmitting}
          className={classes.submit}
          onClick={handleClose}
          color="primary"
          variant="contained"
          size="medium"
        >
          Hủy
        </Button>
        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          color="primary"
          variant="contained"
          size="medium"
        >
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default AddQuestionForm;
