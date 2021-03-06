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
  const mainPassFieldRef = useRef()
  useEffect(() => {
    const mainPasswordValue$ = {}
    // Each input event       ------I----I-----------I----I-----------
    // pull off target.value  ------j----u-----------s----t-----------
    // debounce for 250 ms .  -----------------ju------------just----
    // ensure length > 2 .    -------------------------------just----
    // make request and cancel pending ----------------------API(just)
    const mainPasswordValue$ = fromEvent(mainPassFieldRef.current, 'input').pipe(
      pluck('target', 'value'),
      tap(value => updatePassword(value)),
      debounceTime(250),
      filter((value) => (value.length > 2)),
      tap(_ => {
        setLoading(true)
        setStrengthValue(0)
      }),
      switchMap(value => (ValidateStrength({ password: value }))),
      tap(_ => setLoading(false))
    )

    const sub = mainPasswordValue$.subscribe(
      ({ strength, value }) => {
        setStrengthValue(value)
        setStrength(strength)
      }
    )
    return () => sub.unsubscribe()
  }, []);
  return (
    <div>
      <h1>RXJS</h1>
      <h2>Password strength: {loading ? "LOADING" : strength}</h2>
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
        disabled={strengthValue < 2 || loading}
        onClick={() => alert("API request to change password")}
      >
        Update Password
      </button>
    </div>
  );
}