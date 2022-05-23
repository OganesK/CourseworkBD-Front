import { styled as styledMUI } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { FS16, FS18, FS24, FS48 } from './index';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  partners: {
    // marginTop: 150,
  },

  modalHeader: {
    color: '#252525',
    fontSize: 24,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
    paddingBottom: 40,
  },

  fullModalHeader: {
    color: '#252525',
    fontSize: FS48,
    lineHeight: '116%',
    fontWeight: 500,
    textTransform: 'uppercase',
    // paddingBottom: 40,
    wordBreak: 'break-word',
  },

  fullModalDate: {
    color: '#AAADB2',
    fontSize: 16,
    lineHeight: '125%',
    fontWeight: 300,
    marginBottom: 40,
  },

  fullModalArticle: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '130%',
    marginBottom: 20,
    wordBreak: 'break-word',
  },

  fullModalInfo: {
    fontSize: 20,
    lineHeight: '130%',
    marginBottom: 4,
    fontWeight: 500,
  },

  articleImage: {
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  imgConditionText: {
    color: '#AAADB2',
    fontSize: 18,
    lineHeight: '130%',
    fontWeight: 300,
  },

  additionalPartnerStyle: {
    color: 'black',
    backgroundColor: '#fff',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalButton: {
    padding: '15px 0',
    width: '100%',
    border: '1px solid',
  },

  colorLink: {
    color: '#252525',
  },

  organizerText: {
    color: '#ff5631',
    fontSize: FS24,
    lineHeight: '100%',
    fontWeight: 500,
  },

  modalArticleHeader: {
    textTransform: 'uppercase',
    fontSize: FS18,
    color: '#252525',
    fontWeight: 500,
  },

  eventInfoTitle: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 400,
    gap: 30,
  },

  eventInfoText: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
    // maxWidth: 300,
  },
}));

export default useStyles;
