/* eslint-disable @typescript-eslint/ban-ts-comment*/

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Autocomplete from '@mui/material/Autocomplete';
import { useQuery } from '@apollo/client';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import Button from '../../../UI/Button';
import { CreateProductMutation } from '../../../../graphql/Mutation';
import NoneClick from '../../../UI/NoneClick';
import { ME_QUERY } from '../../../../graphql/Query';

import useStyles from './style';
import { UserType } from '../../../../types';

interface MoodalFrameProps {
  open: boolean;
  handleOpenClose: () => void;
}

const CreateProductModal: (props: MoodalFrameProps) => JSX.Element = (props: MoodalFrameProps) => {
  const { data: userData, loading: userLoading } = useQuery<{ me: UserType }>(ME_QUERY);
  const classes = useStyles();
  const [nameValue, setNameValue] = useState('');
  const [countValue, setCountValue] = useState('');
  const [unitValue, setUnitValue] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [expirationDateValue, setExpirationDateValue] = useState<Date | null>();
  const [manufacturerValue, setManufacturerValue] = useState<string | null>('');
  const [inputManufacturerValue, setInputManufacturerValue] = useState<string | undefined>('');

  const createProductHandler = CreateProductMutation();

  const handleChange = (newValue: Date | null) => {
    setExpirationDateValue(newValue);
  };

  const [openNoneClick, setOpenNoneClick] = useState(false);

  const onClickHandler: () => Promise<void> = async () => {
    const newProductData = {
      productName: nameValue,
      productAmount: Number(countValue),
      productUnit: unitValue,
      expirationDate: expirationDateValue,
      manufacturerId: userData?.me.manufactures.filter(manufacturer => manufacturer.name === inputManufacturerValue)[0]
        .id,
    };
    await createProductHandler(newProductData);
    props.handleOpenClose();
  };

  useEffect(() => {
    if (!userLoading && userData && userData.me.manufactures) {
      const data = userData.me.manufactures.map(manufacturer => manufacturer.name);
      console.log(userData);
      setOptions(data);
    }
  }, [userLoading]);

  if (userLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Modal open={props.open} onClose={props.handleOpenClose}>
        <Grid container direction="column" style={{ gap: 20, position: 'relative' }}>
          {openNoneClick ? <NoneClick /> : null}
          <Grid item className={classes.modalHeader}>
            Создание продукта
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Название
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={nameValue}
                value={nameValue}
                placeholder="Название"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setNameValue(e.target.value)}
                inputProps={{
                  maxLength: 128,
                }}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Колличество
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={countValue}
                value={countValue}
                placeholder="Название"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCountValue(e.target.value)}
                inputProps={{
                  maxLength: 128,
                }}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Система измерения
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={unitValue}
                value={unitValue}
                placeholder="Название"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setUnitValue(e.target.value)}
                inputProps={{
                  maxLength: 128,
                }}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Срок годности
            </Grid>
            <Grid container xs>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  value={expirationDateValue}
                  onChange={handleChange}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Изготовитель
            </Grid>
            <Grid container xs>
              <Autocomplete
                value={manufacturerValue}
                onChange={(event: any, newValue: string | null) => {
                  setManufacturerValue(newValue);
                }}
                inputValue={inputManufacturerValue}
                onInputChange={(event, newInputValue) => {
                  setInputManufacturerValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={params => <TextField {...params} label="Manufacturer" />}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              xs={9}
              style={{ border: '0px solid #000', marginTop: 40, paddingLeft: 60, gap: 20 }}
            >
              <Grid container xs>
                <Button
                  onClick={props.handleOpenClose}
                  isCancel={true}
                  text="Отменить"
                  className={classes.modalButton}
                />
              </Grid>
              <Grid container xs>
                <Button onClick={onClickHandler} text="Создать" className={classes.modalButton} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default CreateProductModal;
