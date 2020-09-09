import React from "react";
import ReactDOM from "react-dom";
import './tailwind.output.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import PasswordReset from "./password-reset/password-reset";
import PasswordReset2 from "./password-reset/password-reset-2";
import PasswordReset3 from "./password-reset/password-reset-3";

import RxjsPasswordReset from './password-reset-rxjs/password-reset-rxjs'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <nav className='w-full bg-gray-500 flex justify-between px-8 h-8 items-center'> 
        <Link to='/react-1'>React 1</Link>
        <Link to='/react-2'>React 2</Link>
        <Link to='/react-3'>React 3</Link>
        <Link to='/rxjs'>RXJS</Link>
      </nav>
      <Switch>
        <Route path='/react-1'>
          <PasswordReset />
        </Route>
        <Route path='/react-2'>
          <PasswordReset2 />
        </Route>
        <Route path='/react-3'>
          <PasswordReset3 />
        </Route>
        <Route path='/rxjs'>
          <RxjsPasswordReset />
        </Route>
      </Switch>

    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
