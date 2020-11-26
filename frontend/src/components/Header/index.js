import React from 'react';
import { HeaderContainer, Logo } from './styles';

import Icone from '../../assets/www.png'

function Header(props) {
  return (
    <>
      <HeaderContainer>
        <Logo src={Icone} alt='BkoPitu' />
        <h1>BKO URL Shortener</h1>
        <p>{props.children}</p>
      </HeaderContainer>
    </>
  )
}

export default Header;