import { render } from 'react-dom';
import React from 'react';
import App from './components/app';

// original pathname splitter
// const id = Number(window.location.pathname.match(/\/(\d+)\//)[1]);
const path = window.location.pathname;
const id = Number(path.split('/')[1]);

render(<App id={id} />, document.getElementById('checkout'));
