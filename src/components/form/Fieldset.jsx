import { styled, css } from '@mui/material/styles';
import PropTypes from 'prop-types';

const FieldsWrapper = styled('fieldset')(
  ({theme}) => css`
    border-left: none;
    border-right: none;
    border-bottom: none;
    border-color: ${theme.palette.primary.main};
    border-width: 1px;
    margin: 2.5em 0 0;
    padding: 1.3em 0 0;
  `
);

const Legend = styled('legend')`
  text-align: center;
  padding: 0 15px;
  text-transform: uppercase;
  font-weight: bold;
`

/**
 * Group related elements in a form with a context label.
 * @component
 * @example
 * return (
 *  <Fieldset legend="Your label">
 *    // Your form's fields inside.
 *  </Fieldset>
 * )
 */
export default function Fieldset({ children, legend }) {
  return (
    <FieldsWrapper>
      <Legend>{legend}</Legend>
      {children}
    </FieldsWrapper>
  );
}

Fieldset.propTypes = {
  children: PropTypes.node.isRequired,
  legend: PropTypes.string.isRequired
};
