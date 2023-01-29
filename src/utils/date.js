import moment from 'moment';

/**
 * Get ISO date format.
 * 
 * @param {String} date   Date string with 'MM/DD/YYYY' format.
 * @returns {String}      ISO 8601 date string (e.g.: "2022-04-25T00:00:00Z")
 */
export const getISODateFormat = (date) => {
  return moment.utc(date, 'MM-DD-YYYY').format();
}

/**
 * Get human readable date format (mm/dd/yyyy).
 * 
 * @param {String} date   ISO 8601 date string (e.g.: "2022-04-25T00:00:00Z")
 * @returns {String}      Date string with 'MM/DD/YYYY' format.
 */
export const getHumanReadableDate = (date) => {
  return moment.utc(date).format('MM/DD/YYYY');
}
