import React from 'react';
import styled from 'styled-components';

const FixedDiv = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 0px ;
  background-color: rgb(255, 255, 255) ;
  position: fixed ;
  left: 0px ;
  right: 0px ;
  top: 0px ;
  height: 80px;
  z-index: 3 ;
  animation-name: keyframe_1b8bzh6 ;
  animation-duration: 100ms ;
`;

const NavBar = () => (
  <FixedDiv />
);

export default NavBar;
