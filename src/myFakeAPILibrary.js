import { random } from "lodash";

export function ValidateStrength(data) {
  const randomExtraLongCall = Math.random() >= 0.5;
  //const randomExtraLongCall = false;
  return new Promise((res) => {
    setTimeout(
      () => {
        res(computeStrength(data.password));
      },
      randomExtraLongCall ? 8000 : random(500, 1000)
    );
  });
}

function computeStrength(password) {
  console.log("password", password, password.length);
  if (password.length < 5)
    return { strength: "WEAK", crackTimeInMS: random(100, 500), value: 2 };
  else if (password.length < 8)
    return {
      strength: "OKAY",
      crackTimeInMS: random(50000, 100000),
      value: 3
    };
  else if (password.length < 10)
    return {
      strength: "GOOD",
      crackTimeInMS: random(5000000, 10000000),
      value: 4
    };
  else if (password.length < 15)
    return {
      strength: "STRONG",
      crackTimeInMS: random(500000000, 1000000000),
      value: 5
    };
  else if (password.length >= 15)
    return {
      strength: "EXCELLENT",
      crackTimeInMS: random(500000000000, 1000000000000),
      value: 6
    };
  else return { strength: "TOO WEAK", crackTimeInMS: random(0, 100), value: 1 };
}
