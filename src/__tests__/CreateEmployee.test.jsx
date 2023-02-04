import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it } from 'vitest';
import { NewEmployeeForm } from '../pages/CreateEmployee';
import { store } from '../utils/store';

const usStates = [
  {
    "name": "Alabama",
    "abbreviation": "AL"
  },
  {
    "name": "Alaska",
    "abbreviation": "AK"
  },
  {
    "name": "American Samoa",
    "abbreviation": "AS"
  },
  {
    "name": "Arizona",
    "abbreviation": "AZ"
  }
];

const departments = [
  {
    "id": 1,
    "name": "Sales"
  },
  {
    "id": 2,
    "name": "Marketing"
  },
  {
    "id": 3,
    "name": "Engineering"
  },
  {
    "id": 4,
    "name": "Human Resources"
  },
  {
    "id": 5,
    "name": "Legal"
  }
];

describe('Create employee page', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <NewEmployeeForm usStates={usStates} departments={departments} />
      </Provider>
    );
  })

  it('Should display form', async () => {
    await waitFor(() => screen.getByTestId('create-form'))

    expect(
      screen.getByTestId('create-form')
    ).toBeDefined()
  })
})
