import whLogo from '../assets/logo.jpg';
import styled from '@emotion/styled';
import MenuLink from './MenuLink';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`

const Logo = styled.img`
  height: 40px;
`

const Nav = styled.nav`
  margin-right: 2em;
  
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  li {
    color: inherit;

    + li {
      margin-left: 2em;
    }
  }
`

/**
 * Component displaying the header.
 * @component
 * @example
 * return (
 *  <Header />
 * )
 */
export default function Header() {
  return (
    <HeaderWrapper>
      <Logo src={whLogo} alt="Wealth Health logo" />
      <Nav>
        <ul>
          <li>
            <MenuLink to='/'>Create employee</MenuLink>
          </li>
          <li>
            <MenuLink to='/employee-list'>All employees</MenuLink>
          </li>
        </ul>
      </Nav>
    </HeaderWrapper>
  );
}
