import React, { useEffect, useState } from "react";
import Input from '../Input.js'

export default function PasswordReset() {
  const [password, updatePassword] = useState("");
  const [confirmPassword, updateConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  console.log("confirmPassword", confirmPassword);
  console.log("password", password);
  useEffect(() => {
    if (password === confirmPassword && password.length > 1) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);
  return (
    <div>
      <h1>No RXJS</h1>
      <Input
        value={password}
        onChange={(e) => updatePassword(e.target.value)}
      />
      <Input
        value={confirmPassword}
        onChange={(e) => updateConfirmPassword(e.target.value)}
      />
      <button
        disabled={disabled}
        onClick={() => alert("API request to change password")}
      >
        Update Password
      </button>
    </div>
  );
}
