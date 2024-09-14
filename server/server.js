const express = require("express");
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static("server/public"));

// Global variable that will contain all of the
// calculation objects:
let calculations = [];
/*
dummy calculation:
{
  numOne: 3,
  numTwo: 5,
  operator: '+',
  result: 8
}
*/

// Here's a wonderful place to make some routes:

// GET /calculations

// POST /calculations
app.post("/calculations", (req, res) => {
  res.sendStatus(200);
  let calculation = req.body;
  console.log(calculation);
  let n1 = calculation.numOne;
  let n2 = calculation.numTwo;
  let finishedCalc = {
    numOne: n1,
    numTwo: n2,
    operator: calculation.operator,
    result: calculate(n1, n2, calculation.operator),
  };
  console.log(finishedCalc);
  calculations.push(finishedCalc);
});

function calculate(n1, n2, op) {
  switch (op) {
    case "+":
      return n1 + n2;
    case "-":
      return n1 - n2;
    case "*":
      return n1 * n2;
    case "/":
      return n1 / n2;
    default:
      console.log("error with operator!");
  }
}

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === "test") {
  PORT = 5002;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log("server running on: ", PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
};

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
};

module.exports = app;
