import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './widgets/colorWidget/App';
import App from './widgets/tictactoeWidget/App';
//import App from './App'
import NexweaveSandbox from './components/NexweaveSanbox';
import SimpleWidget from './widgets/simpleWidget'
import * as serviceWorker from './serviceWorker';
import {  } from "module";
ReactDOM.render(
  <React.StrictMode>
    {/* <App/> */}
    {/* <NexweaveSandbox widget={<SimpleWidget />} /> */}
    <NexweaveSandbox widget={<App />} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
