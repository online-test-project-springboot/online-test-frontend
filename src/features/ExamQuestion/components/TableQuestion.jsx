import {
  Button,
  Checkbox,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

TableQuestion.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  answerList: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},

  error: {
    color: '#d22a21',
    fontWeight: '500',
  },
}));

function TableQuestion(props) {
  const { form, name, numberQuestion, data, page, rowsPerPage } = props;
  const { errors } = form;
  const hasError = !!errors[name];
  const classes = useStyles();

  const handleChange = (e, value, onChange) => {
    if (!Array.isArray(value)) return;

    let questionCodes = [...value];

    if (e.target.checked) {
      questionCodes.push(e.target.value);
    } else {
      questionCodes = questionCodes.filter((x) => x !== e.target.value);
    }

    onChange(questionCodes);
  };

  const handleClickOpenDetail = () => {};
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ onChange, value }) => {
        return (
          <Table stickyHeader aria-label="sticky table">
            <caption>
              Số câu hỏi bạn đã chọn: ({value.length}/{numberQuestion}).
              {hasError && <span className={classes.error}> {errors[name]?.message}</span>}
            </caption>

            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((question, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={question.code}>
                      <TableCell key={index}>
                        <Checkbox
                          disabled={
                            value.length === Number.parseInt(numberQuestion) &&
                            !value.includes(`${question.code}`)
                          }
                          value={question.code}
                          color="default"
                          className={classes.root}
                          checked={value.includes(`${question.code}`)}
                          onChange={(e) => handleChange(e, value, onChange)}
                        />
                      </TableCell>
                      <TableCell key={question.code}>
                        {page * rowsPerPage + index + 1}. {question.content}
                      </TableCell>

                      <TableCell key="action" align="center">
                        <Button onClick={handleClickOpenDetail(question.code)}>Xem</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        );
      }}
    />
  );
}
export default TableQuestion;
