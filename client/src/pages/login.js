import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../state/authenticationSlice';
import { EMPTY } from '../config/constants';
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export default function SignIn() {
  const { authentication } = useSelector((store) => store);
  React.useEffect(() => {
    if (authentication?.email != EMPTY && authentication?.token != EMPTY) navigate('/');
  }, []);
  const dispatch = useDispatch();
  const initialFormValues = {
    email: '',
    password: ''
  };
  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [hasValidated, setHasValidated] = React.useState(false);
  const [formErrors, setformErrors] = React.useState('');
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  const [loginError, setLoginError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();
  function validate(values) {
    let errors = {};
    if (!values.email) errors.email = ' Email address is required';
    if (!values.password) errors.password = 'Password is required';
    return errors;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true);
    setHasValidated(true);
    setformErrors(validate(formValues));
    setDisableSubmit(true);
  };
  React.useEffect(() => {
    if (hasValidated) {
      setformErrors(validate(formValues));
      setIsSubmit(false);
    }
    setDisableSubmit(false);
  }, [formValues]);
  React.useEffect(() => {
    if (Object.keys(formErrors) == 0 && isSubmit) {
      setOpen(true);
      console.log('Formvalues:', formValues);
      axios
        .post('https://todo-scheduler-backend.vercel.app/login', formValues)
        .then((Data) => {
          setOpen(false);
          console.log(Data);
          const userData = Data.data;
          if (userData) {
            console.log(userData);
            dispatch(login(userData));
            navigate('/');
          } else {
            setOpen(false);

            console.log('User not found');
            setLoginError(true);
          }
        })
        .catch((e) => {
          console.log('ERROR', e);
          setOpen(false);
          setError(true);
        });
      setIsSubmit(false);
    }
  }, [isSubmit]);
  const handleClose = () => {
    setError(false);
  };
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                helperText={formErrors.email}
                error={formErrors.email}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formValues.email}
                onChange={(e) => {
                  let value = e.target.value;
                  setFormValues({ ...formValues, email: value });
                }}
              />
              <TextField
                helperText={formErrors.password}
                error={formErrors.password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formValues.password}
                onChange={(e) => {
                  let value = e.target.value;
                  setFormValues({ ...formValues, password: value });
                }}
              />
              {console.log(loginError)}
              {loginError ? (
                <Grid>
                  <Typography variant="subtitle" color={'red'}>
                    You have entered an invalid username or password
                  </Typography>
                </Grid>
              ) : (
                ''
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
                disabled={disableSubmit}>
                Login In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    sx={{ cursor: 'pointer' }}
                    variant="body2"
                    onClick={() => {
                      navigate('/signup');
                    }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Dialog
        open={error}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Ooops</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Something went wrong, Please try again later...!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
