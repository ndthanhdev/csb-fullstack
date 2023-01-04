import React, { useState, useEffect } from 'react';
import './app.css';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import useForm from 'react-hook-form';
import Cabinet from './Cabinet';

const useStyles = makeStyles({
  input: {
    width: '100%',
    padding: '6px 16px',
    borderRadius: '4px',
    border: '1px solid #000',
    outline: 'none',
    margin: '2px 0'
  },
});


function LoginForm() {
    const classes = useStyles();
    const { register, handleSubmit, watch, errors, setError, clearError } = useForm();
    const [userRegister, setUserRegister] = useState({ registred: false, name: null, errorMessage: null });

    const submit = async (user) => {
      const response = await fetch('/api/check-auth', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user }),
      });

      if( response.ok ) {
        const { user } = await response.json();
        setUserRegister({ registred: true, name: user });
      }

      if(response.status === 403) {
        setUserRegister({ errorMessage: '403' });
      }
    }

    const inputName = (e) => {
      const { value } = e.target;
      if(value.length >= 2) return clearError('login');
      setError('login', 'notMatch', 'notMatch login');
    }

    const inputPassword = (e) => {
      const { value } = e.target;
      if(value.length >= 5) return clearError('password');
      setError('password', 'notMatch', 'notMatch password');
    }

    const formRender = () => {
      return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className="form" onSubmit={handleSubmit(submit)} >
              <div><input className={classes.input} type="text" placeholder="id" name="login" required ref={register({ required: true })} onChange={inputName} /></div>
              <div>{errors.login && errors.login.message}</div>
              <div>
                <input className={classes.input} type="password" placeholder="password" name="password" ref={register({ required: true })} required onChange={inputPassword} />
                <div>{errors.password && errors.password.message}</div>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className=""
              >
                Sign In
              </Button>
              { userRegister.errorMessage }
            </form>
        </React.Fragment>
      );
    }

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="container">
            { userRegister.registred ? <Cabinet user={userRegister} /> : formRender() }
          </div>
        </Container>
      </div>
    );
}


export default LoginForm;