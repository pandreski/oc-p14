import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Global } from '@emotion/react';
import { Container } from '@mui/material';

/**
 * Page's layout including routing capability.
 * @component
 * @example
 * return (
 *  <Layout />
 * )
 */
export default function Layout() {
  return (
    <div>
      <Global
        styles={{
          body: {
            margin: 0,
            padding: '60px 0 0 0', // padding equal to header's height (fixed)
            color: '#333',
            fontFamily: '"Roboto", sans-serif',
            fontSize: '16px'
          }
        }}
      />
      <Header />
      <main>
        <Container maxWidth='md'>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}
