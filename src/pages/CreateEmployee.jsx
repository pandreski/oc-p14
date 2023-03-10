import { Grid, MenuItem, TextField, Button, Box, Container } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import PropTypes from 'prop-types';
import Fieldset from '../components/form/Fieldset';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addEmployee } from '../features/employeesSlice';
import { Modal } from '@pski/react-modal-component';
import checked from '../assets/checked.png';
import styled from '@emotion/styled';
import { getISODateFormat } from '../utils/date';

const ModalContent = styled.div`
  text-align: center;

  img {
    width: 100px;
  }

  p {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 0;
  }
`

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
export function NewEmployeeForm({ usStates, departments }) {
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
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setModalOpen(true);
  }

  const handleCloseModal = (e) => {
    e.preventDefault();
    setModalOpen(false);
  }

  // Reset all form states
  const handleResetForm = () => {
    setFormData(initialFormState);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get data from form's submission
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

    // Add form's data to redux store, and create a new employee.
    dispatch(addEmployee(dataObj));
    // Clean form fields
    handleResetForm();
    // Open modal's confirmation
    handleOpenModal();
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
        <form onSubmit={handleSubmit} data-testid='create-form'>
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
                  onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label='Date of birth'
                  value={formData.dateBirth}
                  onChange={(newValue) => setFormData({ ...formData, dateBirth: newValue })}
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
                  onChange={(newValue) => setFormData({ ...formData, dateStart: newValue })}
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
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, usState: e.target.value })}
                  data-testid='state-selector'
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
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
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
      </LocalizationProvider>

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
      >
        <ModalContent>
          <img src={checked} alt="" />
          <p>New employee added!</p>
        </ModalContent>
      </Modal>
    </>
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
        <h1 data-testid='page-title'>Add a new employee</h1>
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
