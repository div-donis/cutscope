import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store'
import { ActionCableProvider } from 'react-actioncable-provider'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ActionCableProvider url={'ws:://localhoast:3000/cable'}>  
          <App />
        </ActionCableProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
