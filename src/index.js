import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@fontsource/roboto";
import App from './App';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MailThread from "./components/threads/MailThread";
import { Provider } from "react-redux";
import store from './store/store'
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/thread/:id" exact>
          <MailThread />
        </Route>
        <Route path="/thread" exact>
          <MailThread />
        </Route>
        <Route path="/" exact>
          <App />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
