import { render } from 'react-dom';
import React from 'react';
import App from './components/app';

const id = Number(window.location.pathname.match(/\/(\d+)\//)[1]);

render(<App id={id} />, document.getElementById('checkout'));
