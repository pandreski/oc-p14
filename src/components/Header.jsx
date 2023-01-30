import whLogoDesktop from '../assets/logo.jpg';
import whLogoDesktop2x from '../assets/logo2x.jpg';
import whLogoMobile from '../assets/logo-tiny.jpg';
import whLogoMobile2x from '../assets/logo-tiny2x.jpg';
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

const Logo = styled.picture`
  height: 40px;
`

const Nav = styled.nav`
  @media screen and (min-width: 900px) {
    margin-right: 2em;
  }
  
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-end;
  }

  li {
    color: inherit;
    flex: 1 1 auto;
    text-align: center;

    + li {
      margin-left: 1em;

      @media screen and (min-width: 600px) {
        margin-left: 2em;
      }
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
      <Logo>
        <source
          media='(max-width: 599px)'
          srcSet={`${whLogoMobile} 1x, ${whLogoMobile2x} 2x`}
        />
        <img
          src={whLogoDesktop}
          srcSet={`${whLogoDesktop} 1x, ${whLogoDesktop2x} 2x`}
          alt="Wealth Health logo"
        />
      </Logo>
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
