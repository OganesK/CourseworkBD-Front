import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    color: '#252525',
    borderColor: 'fe5f1e',
  },
  cssLabel: {
    color: '#252525',
  },
  link: {
    color: '#252525',
  },
  submitButton: {
    color: 'white',
    background: '#252525',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#252525',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#252525',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: '#252525',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#252525',
  },
  controlLabel: {
    textColor: '#252525',
  },
  textField: {
    borderWidth: '1px',
    borderColor: 'yellow !important',
  },
}));

export default useStyles;
