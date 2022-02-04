import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store'
import actionCable from 'actioncable'

const cableApp = {}

cableApp.cable = actionCable.createConsumer('ws://localhost::3000/cable')

export const ActionCableContext = createContext()

console.log(cableApp)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ActionCableContext.Provider value={cableApp.cable}>
          <App />
        </ActionCableContext.Provider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
