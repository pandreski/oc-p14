import { Grid, MenuItem, TextField, Button, Box, Container } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import PropTypes from 'prop-types';
import Fieldset from '../components/form/Fieldset';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addEmployee } from '../features/employeesSlice';

/**
 * Employee creation form.
 * @component
 * @example
 * 
 * const usStates = [{"name": "Alabama", "abbreviation": "AL"}, ...];
 * const departments = [{"id": 1, "name": "Sales"}, ...];
 * 
 * return (
 *  <NewEmployeeForm usStates={usStates} departments={departments} />
 * )
 */
function NewEmployeeForm({ usStates, departments }) {
  const initialFormState = {
    firstname: '',
    lastname: '',
    dateBirth: null,
    dateStart: null,
    street: '',
    city: '',
    usState: '',
    zipCode: '',
    department: '',
  }
  const [formData, setFormData] = useState(initialFormState);
  const dispatch = useDispatch();

  /**
   * Get ISO date format.
   * 
   * @param {String} date   Date string with 'MM/DD/YYYY' format.
   * @returns {String}      ISO 8601 date string (e.g.: "2014-09-08T08:02:17-05:00")
   */
  const getISODateFormat = (date) => {
    return moment(date, 'MM-DD-YYYY').format();
  }

  // Reset all form states
  const handleResetForm = () => {
    setFormData(initialFormState);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const dataObj = {
      id: uuidv4(),
      firstName: formData.get('firstname'),
      lastName: formData.get('lastname'),
      birthDate: getISODateFormat(formData.get('birth-date')),
      startDate: getISODateFormat(formData.get('start-date')),
      street: formData.get('street'),
      city: formData.get('city'),
      state: formData.get('state'),
      zipCode: formData.get('zipcode'),
      department: formData.get('department'),
    }

    dispatch(addEmployee(dataObj));
    handleResetForm();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset legend='Personal data'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='firstname'
              name='firstname'
              label='First Name'
              required
              fullWidth
              autoFocus
              variant='outlined'
              value={formData.firstname}
              onChange={(e) => setFormData({...formData, firstname: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='lastname'
              name='lastname'
              label='Last Name'
              required
              fullWidth
              variant='outlined'
              value={formData.lastname}
              onChange={(e) => setFormData({...formData, lastname: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label='Date of birth'
              value={formData.dateBirth}
              onChange={(newValue) => setFormData({...formData, dateBirth: newValue})}
              renderInput={(params) => <TextField id='birth-date' name='birth-date' variant='outlined' required fullWidth {...params} />}
              maxDate={moment().subtract(10, 'years')}
              minDate={moment().subtract(100, 'years')}
              disableFuture
              openTo='year'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label='Start date'
              value={formData.dateStart}
              onChange={(newValue) => setFormData({...formData, dateStart: newValue})}
              renderInput={(params) => <TextField id='start-date' name='start-date' variant='outlined' required fullWidth {...params} />}
            />
          </Grid>
        </Grid>
      </Fieldset>
      <Fieldset legend='Address'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='street'
              name='street'
              label='Street'
              required
              fullWidth
              variant='outlined'
              value={formData.street}
              onChange={(e) => setFormData({...formData, street: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='city'
              name='city'
              label='City'
              required
              fullWidth
              variant='outlined'
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='state'
              name='state'
              select
              fullWidth
              label='State'
              defaultValue=''
              required
              variant='outlined'
              value={formData.usState}
              onChange={(e) => setFormData({...formData, usState: e.target.value})}
            >
              {usStates?.map((option) => <MenuItem key={option.abbreviation} value={option.abbreviation}>{option.name}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='zipcode'
              name='zipcode'
              label='Zip code'
              type='number'
              required
              fullWidth
              variant='outlined'
              value={formData.zipCode}
              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
            />
          </Grid>
        </Grid>
      </Fieldset>
      <Fieldset legend='Department'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id='department'
              name='department'
              select
              fullWidth
              label='Department'
              defaultValue=''
              variant='outlined'
              required
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
            >
              {departments?.map((option) => <MenuItem key={option.id} value={option.name}>{option.name}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>
      </Fieldset>
      <Box
        sx={{
          marginY: 4,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button variant='contained' type='submit' size='large' fullWidth>Save</Button>
      </Box>
    </form>
  )
}

NewEmployeeForm.propTypes = {
  usStates: PropTypes.arrayOf(PropTypes.object).isRequired,
  departments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * Dedicated page to create a new employee.
 * @component
 * @example
 * return (
 *  <CreateEmployee />
 * )
 */
export default function CreateEmployee() {
  // Get U.S. States from mocked data:
  const { data: statesData, loading: loadingStates } = useFetch('/__mocks__/states.json');
  // Get departments from mocked data:
  const { data: dptData, loading: loadingDpt } = useFetch('/__mocks__/departments.json');

  return (
    <div>
      <Container maxWidth='lg'>
        <h1>Add a new employee</h1>
      </Container>
      <Container maxWidth='md'>
        {
          loadingStates || loadingDpt ? (
            <Loader />
          ) : (
            <NewEmployeeForm usStates={statesData} departments={dptData} />
          )
        }
      </Container>
    </div>
  );
}
