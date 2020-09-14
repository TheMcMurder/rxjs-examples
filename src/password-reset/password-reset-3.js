import React, { useEffect, useState } from "react";
import { ValidateStrength } from "../myFakeAPILibrary.js";

export default function PasswordReset() {
  const [password, updatePassword] = useState("");
  const [confirmPassword, updateConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState({ strength: "TOO WEAK" });
  const [requests, setRequests] = useState([])
  const [responses, setResponses] = useState([])
  useEffect(() => {
    // new
    let promise;
    if (password === confirmPassword && password.length > 1) {
      setLoading(true);
      // NEW
      setRequests((r) => [...r, password])
      promise = ValidateStrength({ password }).then((result) => {
        setResponses((r) => [...r, password])
        const { value } = result;
        if (value < 2) {
          setLoading(false);
          setDisabled(true);
          setStrength(result);
        } else {
          setLoading(false);
          setDisabled(false);
          setStrength(result);
        }
      });
    } else {
      setDisabled(true);
    }
    // NEW
    return () => {
      // cancel PROMISE somehow
      // hmmm maybe not
      // ignore result?
      // add bluebird or something
      // start looking into abort controllers...
      // https://developer.mozilla.org/en-US/docs/Web/API/AbortController
    };
  }, [password, confirmPassword]);
  return (
    <div>
      <h1>No RXJS</h1>
      <h2>Password strength: {loading ? "LOADING" : strength.strength}</h2>
      <div>
        <div>
          requests: {JSON.stringify(requests)}
        </div>
        <div>
          responses: {JSON.stringify(responses)}
        </div>
      </div>
      <input
        value={password}
        onChange={(e) => updatePassword(e.target.value)}
      />
      <input
        value={confirmPassword}
        onChange={(e) => updateConfirmPassword(e.target.value)}
      />
      <button
        disabled={disabled || loading}
        onClick={() => alert("API request to change password")}
      >
        Update Password
      </button>
    </div>
  );
}
