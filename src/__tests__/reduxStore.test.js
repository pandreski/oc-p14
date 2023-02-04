import { describe, expect, it } from 'vitest';
import employeeReducer, { addEmployee } from '../features/employeesSlice';

const testEmployee = {
  id: '0b06c5b7-7847-48e0-84a0-9be1baac3f14',
  firstname: 'John',
  lastname: 'Doe',
  dateBirth: '2000-05-24T00:00:00Z',
  dateStart: '2010-08-01T00:00:00Z',
  street: '123 Test Bvd',
  city: 'Denver',
  usState: 'CO',
  zipCode: '80014',
  department: 'Sales',
}

describe('Add Employee action', () => {
  it('Should create an addEmployee action object with the submitted data', () => {
    expect(addEmployee(testEmployee)).toEqual({
      type: 'employees/addEmployee',
      payload: testEmployee
    })
  })
})

describe('Employee reducer', () => {
  it('Should return the initial state when state is undefined', () => {
    expect(employeeReducer(undefined, { type: '@INIT' })).toEqual({
      employees: []
    });
  })

  it('Should add the new employee to the state', () => {
    expect(employeeReducer({employees: []}, addEmployee(testEmployee))).toEqual({
      employees: [
        testEmployee
      ]
    })
  })
  
  it('Should return the state on invalid action', () => {
    expect(employeeReducer({employees: [ testEmployee ]}, {type: 'INVALID'})).toEqual({
      employees: [
        testEmployee
      ]
    })
  })
})
