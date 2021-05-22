import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-final-form';
import {
  makeStyles,
  Grid,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { FieldTextInput } from '../../components';

const WRONG_CREDENTIALS = 'auth/wrong-password';
const NOT_FOUND = 'auth/user-not-found';
const LOGIN_BLOCKED = 'auth/too-many-requests';

const printErrorMessage = error => {
  switch (error.code) {
    case WRONG_CREDENTIALS: return 'Неверный пароль';
    case NOT_FOUND: return 'Пользователь не найден';
    case LOGIN_BLOCKED: return 'Пользователь заблокирован, восстановите пароль или попробуйте позже';
    default: return 'Что-то пошло не так. Попробуйте позже';
  }
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  error: {
    marginBottom: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: 'white',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));

const LoginForm = props => {

  const classes = useStyles();

  return (
    <Form
      {...props}
      render={formProps => {

        const {
          handleSubmit,
          inProgress,
          onError,
        } = formProps;

        const errorMessage = onError ? printErrorMessage(onError) : null;

        return (
          <form className={classes.form} onSubmit={handleSubmit}>
            {errorMessage ? <Typography color="error" className={classes.error}>{errorMessage}</Typography> : null}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FieldTextInput
                  variant="outlined"
                  required
                  type="email"
                  id="email"
                  label="Введите Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <FieldTextInput
                  variant="outlined"
                  required
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              startIcon={inProgress ? <CircularProgress size={20} className={classes.buttonProgress} /> : null}
            >
              Войти
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signup" className={classes.link}>
                  У вас нет аккаунта? Зарегистрируйтесь
                </Link>
              </Grid>
            </Grid>
          </form>
        );
      }}
    />
  );
}

export default LoginForm;