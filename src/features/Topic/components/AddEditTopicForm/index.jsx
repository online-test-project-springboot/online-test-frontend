import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/Form-controls/InputField';

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
}));

AddEditForm.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.object,
};

function AddEditForm({ onSubmit = null, data = {} }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    name: yup.string().required('Please enter name topic.'),

    description: yup.string().required('Please enter description.'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  useEffect(() => {
    const fields = ['name', 'description'];
    fields.forEach((field) => form.setValue(field, data[field]));
  }, [data]);

  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="name" label="Name" form={form} />
        <InputField name="description" label="Description" form={form} />

        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          color="primary"
          variant="contained"
          fullWidth
          size="large"
        >
          Tạo chủ đề
        </Button>
      </form>
    </div>
  );
}

export default AddEditForm;
