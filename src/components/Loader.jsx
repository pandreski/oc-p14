import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const rotation = keyframes`
  0% { transform: rotate(0deg); }
  100% {  transform: rotate(360deg); }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 10px 0;
`

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid;
  border-color: ${(props) => props.theme.palette.primary.main} transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`

/**
 * Component displaying a loading spinner.
 * @component
 * @example
 * return (
 *  <Loader />
 * )
 */
export default function Loader() {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
}