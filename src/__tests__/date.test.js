import { describe, expect, it } from 'vitest';
import { getHumanReadableDate, getISODateFormat } from '../utils/date';

describe('The date format', () => {
  it('Should be saved in ISO format (UTC)', () => {
    const humanDate = '04/25/2022';
    const isoDate = getISODateFormat(humanDate);

    expect(isoDate).toEqual('2022-04-25T00:00:00Z');
  })

  it('Should display a human readable date in the UI', () => {
    const isoDate = '2022-04-25T00:00:00Z';
    const humanDate = getHumanReadableDate(isoDate);

    expect(humanDate).toEqual('04/25/2022');
  })
})
