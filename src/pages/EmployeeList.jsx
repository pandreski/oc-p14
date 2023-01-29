import { Box, Container } from '@mui/material';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { getHumanReadableDate } from '../utils/date';
import { employeesSelect } from '../utils/selectors';

function ListingTable() {
  const employeesList = useSelector(employeesSelect);
  const rows = employeesList.map((employee) => ({
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    birthDate: employee.birthDate,
    startDate: employee.startDate,
    street: employee.street,
    city: employee.city,
    state: employee.state,
    zipCode: employee.zipCode,
    department: employee.department,
  }));

  const columns = [
    { field: 'firstName', headerName: 'First name' },
    { field: 'lastName', headerName: 'Last name' },
    { field: 'birthDate', headerName: 'Date of birth', type: 'date', renderCell: (params) => getHumanReadableDate(params.row?.birthDate) },
    { field: 'startDate', headerName: 'Start date', type: 'date', renderCell: (params) => getHumanReadableDate(params.row?.startDate) },
    { field: 'street', headerName: 'Street', minWidth: 250 },
    { field: 'city', headerName: 'City', minWidth: 150 },
    { field: 'state', headerName: 'State', maxWidth: 70 },
    { field: 'zipCode', headerName: 'Zip Code' },
    { field: 'department', headerName: 'Department', minWidth: 150 },
  ];

  return (
    <Box sx={{ display: 'flex', height: 600 }}>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbarQuickFilter }}
        />
      </Box>
    </Box>
  );
}

export default function EmployeeList() {
  return (
    <Container maxWidth='lg'>
      <h1>Current employees</h1>
      <ListingTable />
    </Container>
  );
}
