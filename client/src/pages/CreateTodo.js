import { Box, Button, Checkbox, Grid, TextField, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { EMPTY } from '../config/constants';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { createTodo } from '../services/todos/todos';
import { useSelector } from 'react-redux';

var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);
export default function CreateTodo() {
  let currentDate = new Date();
  let defaultDate = dayjs(currentDate.setMinutes(currentDate.getMinutes() + 30));
  const { authentication } = useSelector((store) => store);
  const token = authentication?.token;
  const userEmail = authentication?.email;
  const initialFormValues = {
    title: EMPTY,
    description: EMPTY,
    completed: false,
    notify: false,
    phoneNumber: EMPTY,
    email: EMPTY,
    message: EMPTY,
    dateTime: defaultDate,
    userEmail: userEmail
  };
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setformErrors] = useState(EMPTY);
  const [isSubmit, setIsSubmit] = useState(false);
  const [hasValidated, setHasValidated] = useState(false);
  function validate(values) {
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
    }
    return errors;
  }
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
  }, [formValues]);
  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      console.log('FormValues:', formValues);
      createTodo(formValues, token).then((result) => {
        alert(result.data);
      });
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
  console.log(formErrors);
  return (
    <Box id="box" sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid
        container
        //   marginLeft={{ md: 3 }}
        xs={12}
        md={8}
        columnSpacing={2}>
        <Grid item xs={12}>
          <Typography color="custom.pageTitle" variant="h4">
            Create Todos
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
        <Grid item xs={12} marginTop={3} display={'flex'} justifyContent={'left'} alignItems={'center'}>
          <Checkbox
            value={formValues.completed}
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
                  id="datePicker"
                  disablePast
                  label="Date and Time"
                  helperText={formErrors.dateTime}
                  error={formErrors.dateTime}
                  value={formValues.dateTime}
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
        <Grid item xs={12} marginTop={3}>
          <Button
            type="submit"
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={handleSave}
            disabled={Object.keys(formErrors).length > 0}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
