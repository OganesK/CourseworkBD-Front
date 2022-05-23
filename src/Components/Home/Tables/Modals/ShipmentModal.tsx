/* eslint-disable @typescript-eslint/ban-ts-comment*/

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useQuery } from '@apollo/client';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import Button from '../../../UI/Button';
import { CreateShipmentMutation } from '../../../../graphql/Mutation';
import NoneClick from '../../../UI/NoneClick';
import { ME_QUERY, GET_SHOPS_QUERY } from '../../../../graphql/Query';

import useStyles from './style';
import { UserType } from '../../../../types';
import { ShopsTypes } from '../types';

interface MoodalFrameProps {
  open: boolean;
  handleOpenClose: () => void;
  productId: string;
}

const CreateShipmentModal: (props: MoodalFrameProps) => JSX.Element = (props: MoodalFrameProps) => {
  const { data: shopData, loading: shopLoading } = useQuery<{ shops: ShopsTypes[] }>(GET_SHOPS_QUERY);
  const classes = useStyles();
  const [countValue, setCountValue] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [manufacturerValue, setManufacturerValue] = useState<string | null>('');
  const [inputManufacturerValue, setInputManufacturerValue] = useState<string | undefined>('');

  const createShipmentHandler = CreateShipmentMutation();

  const [openNoneClick, setOpenNoneClick] = useState(false);

  const onClickHandler: () => Promise<void> = async () => {
    const newProductData = {
      count: Number(countValue),
      product: {
        connect: {
          id: props.productId,
        },
      },
      shop: {
        connect: {
          id: shopData!.shops.filter(shop => shop.name === inputManufacturerValue)[0].id,
        },
      },
    };

    await createShipmentHandler(newProductData);
    props.handleOpenClose();
  };

  useEffect(() => {
    if (!shopLoading && shopData) {
      const data = shopData.shops.map(shop => shop.name);
      setOptions(data);
    }
  }, [shopLoading]);

  if (shopLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Modal open={props.open} onClose={props.handleOpenClose}>
        <Grid container direction="column" style={{ gap: 20, position: 'relative' }}>
          {openNoneClick ? <NoneClick /> : null}
          <Grid item className={classes.modalHeader}>
            Отправка продукта
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
                placeholder="Колличество"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCountValue(e.target.value)}
                inputProps={{
                  maxLength: 128,
                }}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Магазин
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
                <Button onClick={onClickHandler} text="Отправить" className={classes.modalButton} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default CreateShipmentModal;
