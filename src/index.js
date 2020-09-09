import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import PasswordReset from "./password-reset/password-reset";
import PasswordReset2 from "./password-reset/password-reset-2";
import PasswordReset3 from "./password-reset/password-reset-3";

import RxjsPasswordReset from './password-reset-rxjs/password-reset-rxjs'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <nav style={{display: 'flex', justifyContent: 'space-between', padding: '0 24px', height: '24px', alignItems: 'center', background: 'gray'}}>
        <Link to='/react-1'>React 1</Link>
        <Link to='/react-2'>React 2</Link>
        <Link to='/react-3'>React 3</Link>
        <Link to='/rxjs'>RXJS</Link>
      </nav>
      <Switch>
        <Route path='/react-1'>
          <div style={{margin: '0px 8px'}}>
            <PasswordReset />
          </div>
        </Route>
        <Route path='/react-2'>
          <div style={{margin: '0px 8px'}}>
            <PasswordReset2 />
          </div>
        </Route>
        <Route path='/react-3'>
          <div style={{margin: '0px 8px'}}>
            <PasswordReset3 />
          </div>
        </Route>
        <Route path='/rxjs'>
          <div style={{margin: '0px 8px'}}>
            <RxjsPasswordReset />
          </div>
        </Route>
      </Switch>

    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
