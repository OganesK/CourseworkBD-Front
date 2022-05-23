import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { ApproveShipmentMutation, ApproveRequestMutation } from '../../../graphql/Mutation';
import { useQuery } from '@apollo/client';

import { GET_SHIPMENTS_QUERY, GET_NOT_APPROVED_REQUESTS } from '../../../graphql/Query';
import { ShipmentTypes, RequestTypes } from './types';

interface Column {
  id: 'id' | 'name' | 'amount' | 'manufacturer' | 'expirationDate';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'id', minWidth: 100 },
  { id: 'name', label: 'Product', minWidth: 170 },
  { id: 'amount', label: 'Admount', minWidth: 100 },
  { id: 'manufacturer', label: 'Manufacturer', minWidth: 100 },
  { id: 'expirationDate', label: 'Expiration Date', minWidth: 100 },
];

interface Data {
  id: string;
  name: string;
  amount: number;
  manufacturer: string;
  expirationDate: string;
}

function createData(
  id: string,
  name: string,
  amount: number,
  manufacturer: { name: string },
  expirationDate: string,
): Data {
  return { id, name: name, amount, manufacturer: manufacturer.name, expirationDate };
}

const NotApprovedRequestsTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [formattedData, setFormattedData] = useState<Data[]>([]);
  const ApproveShipmentHandler = ApproveRequestMutation();

  const { data, loading, error, refetch } =
    useQuery<{ getNotApprovedRequests: RequestTypes[] }>(GET_NOT_APPROVED_REQUESTS);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (!loading && data) {
      console.log(data);
      const newData = data.getNotApprovedRequests.map(shipment =>
        createData(
          shipment.id,
          shipment.product.name,
          shipment.amount,
          shipment.product.manufacturer,
          shipment.product.expirationDate,
        ),
      );
      setFormattedData(newData);
    }
  }, [loading]);

  const approveButtonHandler = async (productId: string) => {
    console.log(productId);
    await ApproveShipmentHandler({ requestId: productId });
    await refetch();
  };

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
            {formattedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
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
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => approveButtonHandler(row.id)} aria-label="approve">
                    <AddTaskIcon />
                  </IconButton>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={formattedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default NotApprovedRequestsTable;
