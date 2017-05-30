import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const mountID = document.currentScript.dataset.instanceid;
const mountNode = mountID
  ? document.getElementById(mountID)
  : document.getElementById('root');

ReactDOM.render(<App />, mountNode);
registerServiceWorker();
