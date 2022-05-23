import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useQuery } from '@apollo/client';

import { GET_MANUFACTURERS_QUERY } from '../../../graphql/Query';
import { ManufacturersTypes } from './types';

interface Column {
  id: 'id' | 'name' | 'owner';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'id', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'owner', label: 'Owner', minWidth: 170 },
];

interface Data {
  id: string;
  name: string;
  owner: string;
}

function createData(id: string, name: string, firstName: string, lastName: string): Data {
  return { id: id, name: name, owner: `${firstName} ${lastName}` };
}

const ManufacturerTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [formatteData, setFormattedData] = useState<Data[]>([]);

  const { data, loading, error } = useQuery<{ manufacturers: ManufacturersTypes[] }>(GET_MANUFACTURERS_QUERY);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (!loading && data) {
      const newData = data.manufacturers.map(manufacturer =>
        createData(manufacturer.id, manufacturer.name, manufacturer.owner.firstname, manufacturer.owner.lastname),
      );
      setFormattedData(newData);
    }
  }, [loading]);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {formatteData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={formatteData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ManufacturerTable;
