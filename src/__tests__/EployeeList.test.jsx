import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it } from 'vitest';
import EmployeeList from '../pages/EmployeeList';
import { store } from '../utils/store';

describe('Employees listing page', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    )
  })

  it('Should display table in the page', async () => {
    await waitFor(() => screen.getByText('Current employees'));
    expect(screen.getByRole('grid')).toBeDefined();
  })
})
