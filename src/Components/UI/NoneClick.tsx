import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

interface NoneClickProps {
  isOpenNoneClick?: boolean;
}

const NoneClick: (props: NoneClickProps) => JSX.Element = (props: NoneClickProps) => {
  return (
    <Grid
      style={{
        // width: '100%',
        // height: '100%',
        background: 'transparent',
        position: 'absolute',
        cursor: 'progress',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 99,
      }}
    />
  );
};

export default NoneClick;
