import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import CreateEmployee from '../pages/CreateEmployee';
import Layout from './Layout';
import EmployeeList from '../pages/EmployeeList';

/**
 * Material UI theme settings.
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#93AD18',
      dark: '#616f1d'
    }
  }
});

/**
 * The main component of the app, including the routing.
 * @component
 * @example
 * return (
 *  <App />
 * )
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<CreateEmployee />} />
          <Route path='/employee-list' element={<EmployeeList />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
