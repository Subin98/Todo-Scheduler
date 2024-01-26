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
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EMPTY } from '../config/constants';
import { useSelector } from 'react-redux';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Signup() {
  const { authentication } = useSelector((store) => store);
  React.useEffect(() => {
    if (authentication?.email != EMPTY && authentication?.token != EMPTY) navigate('/');
  }, []);
  const navigate = useNavigate();
  const initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [formErrors, setformErrors] = React.useState('');
  const [hasValidated, setHasValidated] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  function validate(values) {
    const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let errors = {};
    if (!values.firstName) errors.firstName = 'first Name is required';
    if (!values.lastName) errors.lastName = 'Last Name is required';
    if (!values.email) errors.email = 'email is required';
    if (values.email && !email.test(values.email)) errors.email = 'Invalid email address';
    if (!values.password) errors.password = 'Password is required';
    if (values.password && values.password.length < 4) errors.password = 'Password length must be 4 or above ';
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
    if (Object.keys(formErrors).length == 0 && isSubmit && emailError === '') {
      console.log('Formvalues:', formValues);
      axios
        .post('http://localhost:9000/signup', formValues)
        .then(() => {
          setOpen(true);
          setDisableSubmit(true);
          navigate('/login');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [isSubmit]);
  async function checkEmail(email) {
    try {
      const result = await axios.get(`http://localhost:9000/checkEmail/${email}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // eslint-disable-next-line no-unused-expressions
      result?.data ? setEmailError('Worker with email address exist') : setEmailError('');
    } catch (e) {
      console.log(e);
    }
  }
  console.log('emailErr', emailError);
  function handleClose() {
    setOpen(false);
  }
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          User created successfully!
        </Alert>
      </Snackbar>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 20
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formValues.firstName}
                    helperText={formErrors.firstName}
                    error={formErrors.firstName}
                    onChange={(e) => {
                      let value = e.target.value;
                      setFormValues({ ...formValues, firstName: value });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formValues.lastName}
                    helperText={formErrors.lastName}
                    error={formErrors.lastName}
                    onChange={(e) => {
                      let value = e.target.value;
                      setFormValues({ ...formValues, lastName: value });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formValues.email}
                    helperText={emailError || formErrors.email}
                    error={emailError || formErrors.email}
                    onChange={(e) => {
                      let value = e.target.value;
                      setFormValues({ ...formValues, email: value });
                      checkEmail(value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formValues.password}
                    helperText={formErrors.password}
                    error={formErrors.password}
                    onChange={(e) => {
                      let value = e.target.value;
                      setFormValues({ ...formValues, password: value });
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                disabled={disableSubmit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}>
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    sx={{ cursor: 'pointer' }}
                    variant="body2"
                    onClick={() => {
                      navigate('/login');
                    }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
