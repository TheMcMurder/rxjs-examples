import React from "react";
import ReactDOM from "react-dom";

import PasswordReset from "./password-reset/password-reset";
import PasswordReset2 from "./password-reset/password-reset-2";
import PasswordReset3 from "./password-reset/password-reset-3";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <PasswordReset3 />
  </React.StrictMode>,
  rootElement
);
