import { Route, Routes } from 'react-router-dom'
import CreateEmployee from '../pages/CreateEmployee';
import Layout from './Layout';
import EmployeeList from '../pages/EmployeeList';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

/**
 * The main component of the app, including the routing.
 * @component
 * @example
 * return (
 *  <App />
 * )
 */
export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<CreateEmployee />} />
          <Route path='/employee-list' element={<EmployeeList />} />
        </Route>
      </Routes>
    </LocalizationProvider>
  )
}
