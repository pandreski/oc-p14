import { Grid, MenuItem, TextField, Button, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import PropTypes from 'prop-types';
import Fieldset from '../components/form/Fieldset';
import Loader from '../components/Loader';

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
  const [dateBirth, setDateBirth] = useState(null);
  const [dateStart, setDateStart] = useState(null);

  return (
    <form>
      <Fieldset legend='Personal data'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField id='firstname' name='firstname' label='First Name' fullWidth autoFocus variant='outlined' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id='lastname' name='lastname' label='Last Name' fullWidth variant='outlined' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label='Date of birth'
              value={dateBirth}
              onChange={(newValue) => setDateBirth(newValue)}
              renderInput={(params) => <TextField id='birth-date' name='birth-date' fullWidth {...params} />}
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
              renderInput={(params) => <TextField id='start-date' name='start-date' fullWidth {...params} />}
            />
          </Grid>
        </Grid>
      </Fieldset>
      <Fieldset legend='Address'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField id='street' name='street' label='Street' fullWidth variant='outlined' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id='city' name='city' label='City' fullWidth variant='outlined' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='state'
              name='state'
              select
              fullWidth
              label='State'
              defaultValue=''
            >
              {usStates?.map((option) => <MenuItem key={option.abbreviation} value={option.abbreviation}>{option.name}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id='zipcode' name='zipcode' label='Zip code' type='number' fullWidth variant='outlined' />
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
      <h1>Add a new employee</h1>
      {
        loadingStates || loadingDpt ? (
          <Loader />
        ) : (
          <NewEmployeeForm usStates={statesData} departments={dptData} />
        )
      }
    </div>
  );
}
