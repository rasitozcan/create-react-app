import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const mountNode = document.createElement('DIV');
document.body.appendChild(mountNode);

ReactDOM.render(<App />, mountNode);
registerServiceWorker();
