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
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [dateBirth, setDateBirth] = useState(null);
  const [dateStart, setDateStart] = useState(null);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [usState, setUsState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [department, setDepartment] = useState('');
  const dispatch = useDispatch();

  const handleResetForm = () => {
    setFirstName('');
    setLastName('');
    setDateBirth(null);
    setDateStart(null);
    setStreet('');
    setCity('');
    setUsState('');
    setZipCode('');
    setDepartment('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const dataObj = {
      id: uuidv4(),
      firstName: formData.get('firstname'),
      lastName: formData.get('lastname'),
      birthDate: formData.get('birth-date'),
      startDate: formData.get('start-date'),
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
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label='Date of birth'
              value={dateBirth}
              onChange={(newValue) => setDateBirth(newValue)}
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
              value={dateStart}
              onChange={(newValue) => setDateStart(newValue)}
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
              value={street}
              onChange={(e) => setStreet(e.target.value)}
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
              value={usState}
              onChange={(e) => setUsState(e.target.value)}
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
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
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
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
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
