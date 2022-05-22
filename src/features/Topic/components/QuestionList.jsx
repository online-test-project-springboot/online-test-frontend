import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

QuestionList.propTypes = {
  data: PropTypes.array,
};

const columns = [
  { id: 'thread', label: 'Đề bài', minWidth: 100 },
  {
    id: 'img',
    label: 'Hình ảnh',
    minWidth: 100,
  },
  {
    id: 'trueAnswer',
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
});

function QuestionList({ data = [] }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
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
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={question.id}>
                    <TableCell key={index}>{page * rowsPerPage + index + 1}</TableCell>
                    {columns.map((column) => {
                      const value = question[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell key="action" align="center">
                      <Button>Xem</Button>
                      <Button>Sửa</Button>
                      <Button>Xóa</Button>
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
    </Paper>
  );
}
export default QuestionList;
