import { random } from "lodash";

export function ValidateStrength(data) {
  const randomExtraLongCall = Math.random() >= 0.5;
  const { password, timeout } = data
  let myTimeout
  if (timeout) {
    myTimeout = timeout
  } else if (randomExtraLongCall) {
    myTimeout = 8000
  } else {
    myTimeout = random(500, 1300)
  }
  //const randomExtraLongCall = false;
  return new Promise((res) => {
    setTimeout(
      () => {
        res(computeStrength(password));
      },
      myTimeout
    );
  });
}

function computeStrength(password) {
  console.log("password", password, password.length);
  if (password.length < 5)
    return { strength: "WEAK", crackTimeInMS: random(100, 500), value: 2, password };
  else if (password.length < 8)
    return {
      strength: "OKAY",
      crackTimeInMS: random(50000, 100000),
      value: 3,
      password
    };
  else if (password.length < 10)
    return {
      strength: "GOOD",
      crackTimeInMS: random(5000000, 10000000),
      value: 4,
      password
    };
  else if (password.length < 15)
    return {
      strength: "STRONG",
      crackTimeInMS: random(500000000, 1000000000),
      value: 5,
      password
    };
  else if (password.length >= 15)
    return {
      strength: "EXCELLENT",
      crackTimeInMS: random(500000000000, 1000000000000),
      value: 6,
      password
    };
  else return { strength: "TOO WEAK", crackTimeInMS: random(0, 100), value: 1, password };
}
