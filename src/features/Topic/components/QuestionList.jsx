import { Button, Dialog } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import questionApi from 'api/questionApi';
import DialogQuestion from 'components/DialogQuestion';
import DialogRemove from 'components/DialogRemove';
import { contentRemoveQuestion } from 'constants/content';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Transition } from 'utils';
import AddQuestion from './AddQuestion';
import { trucateText } from 'utils';

QuestionList.propTypes = {
  data: PropTypes.array,
  handleRemove: PropTypes.func,
  handleUpdateQuestion: PropTypes.func,
};

const columns = [
  { code: 'code', id: 'content', label: 'Đề bài', minWidth: 100 },
  {
    code: 'code',
    id: 'rightAnswer',
    label: 'Đáp án đúng',
    minWidth: 20,
    align: 'center',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '50px',
  },
  container: {
    maxHeight: 440,
  },

  btn: {
    border: '1px solid',
    borderRadius: '25px',
    marginLeft: '20px',
    color: 'white',
  },

  btnCell: {
    '&>:nth-child(1)': {
      background: '#52d2f1',
    },
    '&>:nth-child(2)': {
      background: '#f29423',
    },
    '&>:nth-child(3)': {
      background: '#d62930',
    },
  },
});
const MODE = {
  REMOVE: 'remove',
  EDIT: 'edit',
  DETAIL: 'detail',
};

function findRightAnswer(answers) {
  return answers.rightAnswer === true;
}

function QuestionList({ data = [], handleRemove = null, handleAddUpdateQuestion = null }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.DETAIL);
  let [deleteCode, setDeleteCode] = useState('');
  const { topicId } = useParams();
  const [detailQuestion, setDetailQuestion] = useState({});

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpenRemove = (code) => {
    setDeleteCode(code);
    setOpen(true);
    setMode(MODE.REMOVE);
  };

  const handleClickOpenDetail = async (code) => {
    try {
      const response = await questionApi.getById(topicId, code);
      if (response.message) {
        setDetailQuestion(response.data);
        setOpen(true);
        setMode(MODE.DETAIL);
      }
    } catch (error) {
      console.log('Failed to fetch detail question:', error.message);
    }
  };

  const handleClickOpenEdit = async (code) => {
    try {
      const response = await questionApi.getById(topicId, code);
      if (response.message) {
        setDetailQuestion(response.data);
        setOpen(true);
        setMode(MODE.EDIT);
      }
    } catch (error) {
      console.log('Failed to fetch detail question:', error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveQuestion = () => {
    if (handleRemove) handleRemove(deleteCode);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key="stt" style={{ minWidth: 50 }}>
                STT
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}

              <TableCell key="action" align="center">
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((question, index) => {
                const rightAnswer = question.answers.find(findRightAnswer)
                  ? question.answers.find(findRightAnswer).content
                  : '';
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={question.code}>
                    <TableCell key={index}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell key="content">{trucateText(question.content, 35)}</TableCell>
                    <TableCell key="rightAnswer" align="center">
                      {trucateText(rightAnswer, 15)}
                    </TableCell>

                    <TableCell className={classes.btnCell} key="action" align="center">
                      <Button
                        className={classes.btn}
                        onClick={() => handleClickOpenDetail(question.code)}
                      >
                        Xem
                      </Button>
                      <Button
                        className={classes.btn}
                        onClick={() => handleClickOpenEdit(question.code)}
                      >
                        Sửa
                      </Button>
                      <Button
                        className={classes.btn}
                        onClick={() => handleClickOpenRemove(question.code)}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {mode === MODE.REMOVE && (
          <>
            <DialogRemove
              onClickRemove={handleRemoveQuestion}
              contentRemove={contentRemoveQuestion}
              closeDialog={handleClose}
            />
          </>
        )}

        {mode === MODE.DETAIL && (
          <>
            <DialogQuestion data={detailQuestion} closeDialog={handleClose} />
          </>
        )}

        {mode === MODE.EDIT && (
          <>
            <AddQuestion
              data={detailQuestion}
              handleAddUpdateQuestion={handleAddUpdateQuestion}
              closeDialog={handleClose}
            />
          </>
        )}
      </Dialog>
    </Paper>
  );
}
export default QuestionList;
