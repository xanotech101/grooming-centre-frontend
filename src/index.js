import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './index.css';
import { setupDevelopmentServer } from './mocks/server/dev-env/server';
import reportWebVitals from './reportWebVitals';

setupDevelopmentServer();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
