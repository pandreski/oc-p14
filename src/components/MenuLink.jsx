import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

const NavElement = styled(NavLink)`
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
  padding: 4px 0;
  position: relative;
  transition: color .2s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
  }

  &.active {
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: ${(props) => props.theme.palette.primary.main};
    }
  }
`

/**
 * Component displaying a menu link.
 * @component
 * @example
 * return (
 *  <MenuLink to='/path/to/page'>Menu label</MenuLink>
 * )
 */
export default function MenuLink({ children, to }) {
  const theme = useTheme();
  return (
    <NavElement to={to} theme={theme}>{children}</NavElement>
  );
}

MenuLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired
}
