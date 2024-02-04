import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { EMPTY } from '../config/constants';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { createTodo, getTodo, updateTodo } from '../services/todos/todos';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);
export default function CreateTodo() {
  const location = useLocation();
  const todoId = location.state;
  const [todoData, setTodoData] = useState(null);
  const [backDropOpen, setbackDropOpen] = useState(false);
  let currentDate = new Date();
  // Round up to the nearest multiple of 5 for the minutes
  const roundedMinutes = Math.ceil(currentDate.getMinutes() / 5) * 5;

  // Create a new date with the rounded minutes using dayjs
  const date = new Date(currentDate);
  date.setMinutes(roundedMinutes);

  // eslint-disable-next-line
  const [defaultDate, setDefaultDate] = useState(date);
  const navigate = useNavigate();
  const { authentication } = useSelector((store) => store);
  const token = authentication?.token;
  const userEmail = authentication?.email;
  let initialFormValues = {
    title: todoData?.title || EMPTY,
    description: todoData?.description || EMPTY,
    completed: todoData?.completed || false,
    notify: todoData?.notify || false,
    phoneNumber: todoData?.phone || null,
    email: todoData?.recipientEmail || EMPTY,
    message: todoData?.message || EMPTY,
    dateTime: todoData?.date || defaultDate,
    userEmail: todoData?.userEmail || userEmail
  };
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setformErrors] = useState(EMPTY);
  const [isSubmit, setIsSubmit] = useState(false);
  const [hasValidated, setHasValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    async function fetchTodo(id) {
      try {
        setbackDropOpen(true);
        const data = await getTodo(id, token);
        setbackDropOpen(false);

        setTodoData(data);
      } catch (e) {
        setbackDropOpen(false);

        console.log(e);
      }
    }
    todoId ? fetchTodo(todoId) : '';
  }, []);
  useEffect(() => {
    initialFormValues = {
      title: todoData?.title || EMPTY,
      description: todoData?.description || EMPTY,
      completed: todoData?.completed || false,
      notify: todoData?.notify || false,
      phoneNumber: todoData?.phone || null,
      email: todoData?.recipientEmail || EMPTY,
      message: todoData?.message || EMPTY,
      dateTime: todoData?.date || defaultDate,
      userEmail: todoData?.userEmail || userEmail
    };
    setFormValues(initialFormValues);
  }, [todoData]);
  function validate(values) {
    console.log('parse', dayjs(values.dateTime).get('minute') % 5);
    const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let errors = {};
    if (!values.title) errors.title = 'Title is required';
    if (!values.description) errors.description = 'Description is required';
    if (values.notify) {
      if (!values.email) errors.email = 'Email is required';
      if (values.email && !email.test(values.email)) errors.email = 'Enter a valid email address';
      if (!values.message) errors.message = 'Message is required';
      if (!values.dateTime) errors.dateTime = 'Date and time is required';
      else if (dayjs(values.dateTime).startOf('minute').isSameOrBefore(dayjs(Date()).startOf('minute'))) {
        errors.dateTime = 'Date or time selected should not be a past one';
      } else if (!dayjs(values.dateTime).isValid()) errors.dateTime = 'Enter a valid date and time';
      else if (dayjs(values.dateTime).get('minute') % 5 != 0)
        errors.dateTime = 'Enter a valid date and time from selector';
    }
    return errors;
  }
  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };
  const handleSave = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setHasValidated(true);
    setformErrors(validate(formValues));
  };
  useEffect(() => {
    if (hasValidated) {
      setformErrors(validate(formValues));
      setIsSubmit(false);
    }
    if (JSON.stringify(initialFormValues) == JSON.stringify(formValues)) setDisable(true);
    else if (formValues.title && formValues.description) {
      setDisable(false);
    }
  }, [formValues]);
  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      console.log('FormValues:', formValues);
      if (todoId) {
        setbackDropOpen(true);
        updateTodo({ ...formValues, todoId: todoId }, token)
          .then(() => {
            setOpen(true);
            setbackDropOpen(false);
          })
          .catch((e) => {
            console.log(e);
            setbackDropOpen(false);
          });
      } else {
        setbackDropOpen(true);
        createTodo(formValues, token).then(() => {
          setbackDropOpen(false);
          setOpen(true);
        });
      }
    }
  }, [isSubmit]);
  //   useEffect(() => {
  //     console.log('exe');
  //     if (!formValues.notify) {
  //       const updatedFormError = { ...formErrors }; // Create a copy of the state object
  //       delete updatedFormError.dateTime;
  //       delete updatedFormError.email;
  //       delete updatedFormError.message;

  //       setformErrors(updatedFormError);
  //     }
  //   }, [formValues.notify]);
  console.log('dateTime', formValues.dateTime);
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backDropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box id="box" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid
          container
          //   marginLeft={{ md: 3 }}
          xs={12}
          md={8}
          columnSpacing={2}>
          <Grid item xs={12}>
            <Typography color="custom.pageTitle" variant="h4">
              {todoId ? 'Edit Todo' : 'Create Todos'}
            </Typography>
          </Grid>
          <Grid item xs={6} marginTop={3}>
            <TextField
              error={formErrors.title}
              helperText={formErrors.title}
              required
              fullWidth
              label="Enter title"
              value={formValues.title}
              onChange={(e) => {
                let value = e.target.value;
                setFormValues({ ...formValues, title: value });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={6} marginTop={3}>
              <TextField
                error={formErrors.description}
                helperText={formErrors.description}
                required
                fullWidth
                label="Enter Description"
                multiline
                rows={3}
                value={formValues.description}
                onChange={(e) => {
                  let value = e.target.value;
                  setFormValues({ ...formValues, description: value });
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} marginTop={3} display={'flex'} justifyContent={'left'} alignItems={'center'}>
            <Checkbox
              disabled={!todoId}
              value={formValues.completed}
              checked={formValues.completed}
              onChange={(e, value) => {
                setFormValues({ ...formValues, completed: value });
              }}
            />
            <Typography variant="body2" color="custom.pageTitle">
              Completed
            </Typography>
          </Grid>
          <Grid item xs={12} marginTop={3} display={'flex'} justifyContent={'left'} alignItems={'center'}>
            <Checkbox
              value={formValues.notify}
              checked={formValues.notify}
              onChange={(e, value) => {
                setFormValues({ ...formValues, notify: value });
              }}
            />
            <Typography variant="body2" color="custom.pageTitle">
              Notify (This will automatically send a message to the designated recipient, and the task will be marked as
              completed upon its execution. )
            </Typography>
          </Grid>
          {formValues.notify ? (
            <>
              <Grid item xs={12} md={6} marginTop={3}>
                <TextField
                  fullWidth
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  label="Phone number"
                  value={formValues.phoneNumber}
                  onChange={(e) => {
                    let value = e.target.value;
                    setFormValues({ ...formValues, phoneNumber: value });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} marginTop={3}>
                <TextField
                  error={formErrors.email}
                  helperText={formErrors.email}
                  required
                  type="email"
                  label="Email Address"
                  fullWidth
                  value={formValues.email}
                  onChange={(e) => {
                    let value = e.target.value;
                    setFormValues({ ...formValues, email: value });
                  }}
                />
              </Grid>
              <Grid item xs={12} marginTop={3}>
                <TextField
                  helperText={formErrors.message}
                  error={formErrors.message}
                  required
                  type="text"
                  multiline
                  fullWidth
                  label="Message"
                  rows={4}
                  value={formValues.message}
                  onChange={(e) => {
                    let value = e.target.value;
                    setFormValues({ ...formValues, message: value });
                  }}
                />
              </Grid>
              <Grid item xs={6} marginTop={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    minutesStep={5}
                    id="datePicker"
                    disablePast
                    label="Date and Time"
                    helperText={formErrors.dateTime}
                    error={formErrors.dateTime}
                    value={dayjs(formValues.dateTime)}
                    onChange={(e) => {
                      console.log('Changed dare');
                      let value = e;
                      setFormValues({ ...formValues, dateTime: value });
                    }}
                  />
                </LocalizationProvider>
                <p style={{ color: '#d32f2f' }} className="css-1wc848c-MuiFormHelperText-root">
                  {formErrors.dateTime}
                </p>
              </Grid>
            </>
          ) : (
            ''
          )}
          <Grid container item xs={12} marginTop={3}>
            <Grid item marginRight={3}>
              <Button
                // startIcon={<SaveIcon />}
                variant="outlined"
                onClick={() => {
                  navigate('/');
                }}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleSave}
                disabled={Object.keys(formErrors).length > 0 || disable}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {todoId ? 'Task updated Sucessfully' : 'Task Saved sucessfully'}
        </DialogTitle>

        <DialogActions sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      ;
    </>
  );
}
