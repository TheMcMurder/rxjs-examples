import React, { useEffect, useState, useRef } from "react";
import { ValidateStrength } from "../myFakeAPILibrary.js";
import { fromEvent } from 'rxjs'
import { pluck, tap, debounceTime, filter, switchMap } from 'rxjs/operators'

export default function PasswordResetRXJS() {
  const [password, updatePassword] = useState("");
  const [confirmPassword, updateConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState("TOO WEAK")
  const [strengthValue, setStrengthValue] = useState(0)
  const [reqs, setReqs] = useState([])
  const [resps, setResps] = useState([])
  const mainPassFieldRef = useRef()
  useEffect(() => {
    const mainPasswordValue$ = fromEvent(mainPassFieldRef.current, 'input').pipe(
      pluck('target', 'value'),
      tap(value => updatePassword(value)),
      debounceTime(250),
      filter((value) => (value.length > 2)),
      tap(value => {
        setLoading(true)
        setReqs((requests) => [...requests, value])
        setStrengthValue(0)
      }),
      switchMap(value => (ValidateStrength({ password: value }))),
      tap(value => {
        setResps((responses) => [...responses, value.password])
        setLoading(false)
      })
    )

    const sub = mainPasswordValue$.subscribe(
      ({ strength, value }) => {
        console.log('strength value', value)
        setStrengthValue(value)
        setStrength(strength)
      }
    )
    return () => sub.unsubscribe()
  }, []);
  const disabled = strengthValue < 3 || loading || password !== confirmPassword
  return (
    <div>
      <h1>RXJS</h1>
      <h2>Password strength: {loading ? "LOADING" : strength}</h2>
      <div>
        <div>
          Requests: {JSON.stringify(reqs)}
        </div>
        <div>
          Responses: {JSON.stringify(resps)}
        </div>
      </div>
      <input
        ref={mainPassFieldRef}
        value={password}
        onChange={(e) => updatePassword(e.target.value)}
      />
      <input
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
