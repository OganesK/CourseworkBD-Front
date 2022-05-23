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
import CreateProductModal from './Modals/CreateProductModal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useQuery } from '@apollo/client';

import { GET_SHIPMENTS_QUERY } from '../../../graphql/Query';
import { ShipmentTypes } from './types';

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

const FirmOwnerTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [formattedData, setFormattedData] = useState<Data[]>([]);
  const [openProductCreationModal, setOpenProductCraetionModal] = useState<boolean>(false);

  const { data, loading, error } = useQuery<{ getNotApprovedProduct: ShipmentTypes[] }>(GET_SHIPMENTS_QUERY);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (!loading && data) {
      const newData = data.getNotApprovedProduct.map(shipment =>
        createData(shipment.id, shipment.name, shipment.amount, shipment.manufacturer, shipment.expirationDate),
      );
      setFormattedData(newData);
    }
  }, [loading]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <CreateProductModal
        open={openProductCreationModal}
        handleOpenClose={() => setOpenProductCraetionModal(!openProductCreationModal)}
      />
      <IconButton aria-label="delete" onClick={() => setOpenProductCraetionModal(!openProductCreationModal)}>
        <AddBoxIcon />
        Add product
      </IconButton>
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

export default FirmOwnerTable;
