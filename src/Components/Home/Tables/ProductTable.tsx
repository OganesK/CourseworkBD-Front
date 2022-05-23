import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import { useQuery } from '@apollo/client';
import Input from '@mui/material/Input';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Box from '@mui/material/Box';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import RequestProductModal from './Modals/RequestProductModal';

import CreateProductModal from './Modals/CreateProductModal';
import CreateShipmentModal from './Modals/ShipmentModal';

import { GET_NOT_APPROVED_PRODUCTS_QUERY, GET_APPROVED_PRODUCTS_QUERY } from '../../../graphql/Query';
import { ApproveShipmentMutation } from '../../../graphql/Mutation';
import { ProductTypes } from './types';

interface Column {
  id: 'id' | 'manufacturer' | 'name' | 'count' | 'unit' | 'recieptDate' | 'expirationDate';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'id', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'count', label: 'Count', minWidth: 100 },
  {
    id: 'unit',
    label: 'Measurement system',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: 'manufacturer', label: 'Manufacturer', minWidth: 100 },
  {
    id: 'recieptDate',
    label: 'Date of recieving',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'expirationDate',
    label: 'Expiration date',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  id: string;
  manufacturer: string;
  name: string;
  count: number;
  unit: string;
  recieptDate: string;
  expirationDate: string;
}

function createData(
  id: string,
  name: string,
  recieptDate: string,
  unit: string,
  expirationDate: string,
  count: number,
  manufacturer: { name: string },
): Data {
  return { id, name: name, count, unit, manufacturer: manufacturer.name, expirationDate: expirationDate, recieptDate };
}

const ProductTable = () => {
  const approveShipmentHandler = ApproveShipmentMutation();
  const [page, setPage] = React.useState(0);
  const [requestProductName, setRequestProductName] = useState<string>('');
  const [productId, setProductId] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openRequest, setOpenRequest] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openShipmentModal, setOpenShipmentModal] = useState<boolean>(false);
  const [formattedData, setFormattedData] = useState<Data[]>([]);
  const [productData, setProductData] = useState<ProductTypes[]>([]);
  const { data, loading, error } = useQuery<{ getNotApprovedProduct: ProductTypes[] }>(GET_NOT_APPROVED_PRODUCTS_QUERY);
  const {
    data: approvedData,
    loading: approvedLoading,
    error: approvedError,
  } = useQuery<{ getApprovedProduct: ProductTypes[] }>(GET_APPROVED_PRODUCTS_QUERY);
  const [age, setAge] = React.useState('Approved');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const approveShipment = async (productId: string) => {
    await approveShipmentHandler(productId);
  };

  const handleRequestProductButton = (productId: string, productName: string) => {
    setRequestProductName(productName);
    setProductId(productId);
    setOpenRequest(!openRequest);
  };

  useEffect(() => {
    if (!approvedLoading && approvedData) {
      console.log('Setting approved');
      const newData = approvedData.getApprovedProduct.map(product =>
        createData(
          product.id,
          product.name,
          product.stockDate,
          product.unit,
          product.expirationDate,
          product.amount,
          product.manufacturer,
        ),
      );
      console.log('New data', newData);
      setFormattedData(newData);
    }
  }, [approvedLoading]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'scroll' }}>
      <RequestProductModal
        open={openRequest}
        handleOpenClose={() => setOpenRequest(!openRequest)}
        productId={productId}
        productName={requestProductName}
      />
      <CreateProductModal open={open} handleOpenClose={() => setOpen(!open)} />
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
                <>
                  <CreateShipmentModal
                    productId={row.id}
                    open={openShipmentModal}
                    handleOpenClose={() => setOpenShipmentModal(!openShipmentModal)}
                  />
                  {age === 'Not approved' ? (
                    <IconButton onClick={() => approveShipment(row.id)} aria-label="delete">
                      <LocalShippingIcon />
                    </IconButton>
                  ) : (
                    <></>
                  )}
                  {localStorage.getItem('role') === 'SHOP_OWNER' ? (
                    <>
                      <Button onClick={() => handleRequestProductButton(row.id, row.name)}>Request product</Button>
                    </>
                  ) : (
                    <></>
                  )}
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
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={productData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductTable;
