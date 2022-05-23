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
import { RequestProductMutation } from '../../../../graphql/Mutation';
import NoneClick from '../../../UI/NoneClick';
import { ME_QUERY } from '../../../../graphql/Query';

import useStyles from './style';
import { UserType } from '../../../../types';

interface MoodalFrameProps {
  open: boolean;
  handleOpenClose: () => void;
  productName: string;
  productId: string;
}

const RequestProductModal: (props: MoodalFrameProps) => JSX.Element = (props: MoodalFrameProps) => {
  const { data: userData, loading: userLoading } = useQuery<{ me: UserType }>(ME_QUERY);
  const classes = useStyles();
  const [countValue, setCountValue] = useState('');
  const requestProductHandler = RequestProductMutation();

  const [openNoneClick, setOpenNoneClick] = useState(false);

  // eslint-disable-next-line @typescript-eslint/require-await
  const onClickHandler: () => Promise<void> = async () => {
    const newRequestData = {
      productId: props.productId,
      shopId: localStorage.getItem('shopId'),
      amount: Number(countValue),
    };
    await requestProductHandler(newRequestData);
    props.handleOpenClose();
  };

  useEffect(() => {
    if (!userLoading && userData && userData.me.manufactures) {
      const data = userData.me.manufactures.map(manufacturer => manufacturer.name);
      console.log(userData);
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
              Name: {props.productName}
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Count
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={countValue}
                value={countValue}
                placeholder="Count"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCountValue(e.target.value)}
                inputProps={{
                  maxLength: 128,
                }}
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
                <Button onClick={props.handleOpenClose} isCancel={true} text="Cansel" className={classes.modalButton} />
              </Grid>
              <Grid container xs>
                <Button onClick={onClickHandler} text="Request" className={classes.modalButton} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default RequestProductModal;
