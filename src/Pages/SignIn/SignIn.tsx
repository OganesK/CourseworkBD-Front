/* eslint-disable @typescript-eslint/no-unsafe-member-access*/

import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import HeaderImage from './headerImage.jpg';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';

import { SignInMutation } from '../graphql/mutation';
import useStyles from './style';

interface LogInInput {
  login: string;
  password: string;
}

function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Права защищены © '}
      <Link color="inherit" href="#">
        Warehouse
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignIn: () => JSX.Element = () => {
  const classes = useStyles();
  const [emailFormValue, setEmailFormValue] = useState('');
  const [passwordFormValue, setPaswordFormValue] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const signInHandler = SignInMutation();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{
            backgroundImage: `url(${HeaderImage})`,
          }}
          className={classes.image}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Авторизация
            </Typography>
            <form
              className={classes.form}
              onSubmit={async (e: React.FormEvent): Promise<void> => {
                e.preventDefault();
                const userInput: LogInInput = {
                  login: emailFormValue,
                  password: passwordFormValue,
                };
                await signInHandler(userInput);
                window.location.reload();
                navigate('/home');
              }}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                value={emailFormValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmailFormValue(e.target.value)}
                label="Адрес почты"
                name="email"
                autoComplete="email"
                autoFocus
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                  },
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPaswordFormValue(e.target.value)}
                value={passwordFormValue}
              />
              <FormControlLabel
                control={<Checkbox value="remember" />}
                label="Запомнить меня"
                className={classes.controlLabel}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submitButton}
                onClick={async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
                  e.preventDefault();
                  const userInput: LogInInput = {
                    login: emailFormValue,
                    password: passwordFormValue,
                  };
                  const res = await signInHandler(userInput);
                  if (res.data.signIn) {
                    window.localStorage.setItem('token', res.data.signIn.token);
                  }
                  if (res.data?.signIn === null) {
                    setOpen(true);
                  }
                  window.location.reload();
                  navigate('/home');
                }}
              >
                Войти
              </Button>
              <Snackbar open={open} autoHideDuration={6000} onClose={() => handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  Неправильный логин или пароль
                </Alert>
              </Snackbar>
              <Grid container>
                <Grid item xs>
                  <Link className={classes.link} href="#" variant="body2">
                    Забыли пароль?
                  </Link>
                </Grid>
                <Grid item>
                  <Link className={classes.link} href="/signup" variant="body2">
                    {'У вас еще нет аккаунта? Зарегистрироваться'}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignIn;
