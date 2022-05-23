import { useLayoutEffect, useState } from 'react';

export function useWindowSize(): number[] {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize(): void {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return (): void => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

//____________________адаптивные шрифты

export const FS14 = 'clamp(0.625rem, 0.4375rem + 0.8333vw, 0.875rem)';
export const FS16 = 'clamp(0.75rem, 0.4688rem + 1.2500vw, 1rem)';
export const FS18 = 'clamp(0.75rem, 0.4688rem + 1.2500vw, 1.125rem)';
export const FS18forCards = 'clamp(0.75rem, 0.6033rem + 0.6522vw, 1.125rem)';
export const sideBarFS18 = ' clamp(0.75rem, 0.1731rem + 1.1538vw, 1.125rem)';
export const FS24 = 'clamp(0.875rem, 0.4063rem + 2.0833vw, 1.5rem)';
export const FS24forCards = 'clamp(0.875rem, 0.6304rem + 1.0870vw, 1.5rem)';
export const uploadTextFS24 = 'clamp(1.125rem, 0.7500rem + 0.7500vw, 1.5rem)';
export const FS48 = 'clamp(1rem, -0.5000rem + 6.6667vw, 3rem)';
export const FS72 = 'clamp(1.125rem, -0.1957rem + 5.8696vw, 4.5rem)';
export const FS86 = 'clamp(1.125rem, -0.5380rem + 7.3913vw, 5.375rem)';

import { Grid } from '@material-ui/core';
import { styled as styledMUI } from '@mui/material/styles';

export const ModalImageContainer = styledMUI(Grid)(({ isDefault }: { isDefault: boolean }) => ({
  border: '1px solid #AAADB3',
  minWidth: 150,
  maxWidth: 230,
  minHeight: 90,
  height: 120,
  cursor: 'pointer',
}));

export const ModalImage = styledMUI('img')(({ isDefault }: { isDefault: boolean }) => ({
  height: isDefault ? 56 : '',
  width: isDefault ? 56 : '',
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
}));
