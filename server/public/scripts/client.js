console.log("client.js is sourced!");
let currentOp = "+";
function onReady() {
  console.log("ready!");
  getCalculationHistory();
  console.log("got calculation history");
}

function getCalculationHistory() {
  axios({
    url: "/calculations",
    method: "GET",
  })
    .then(function (response) {
      console.log(response.data);
      renderToDom(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
}

function renderToDom(calcHistory) {
  let resultHist = document.getElementById("resultHistory");
  resultHist.innerHTML = "<ul>";
  for (let calc of calcHistory) {
    renderCalc(calc);
  }
  resultHist.innerHTML += "</ul>";
  if (calcHistory.length >= 1) {
    renderRecent(calcHistory[calcHistory.length - 1]);
  }
}

function renderCalc(calculation) {
  let resultHistory = document.getElementById("resultHistory");
  resultHistory.innerHTML += `<li> ${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}</li>`;
}

function renderRecent(calculation) {
  let recent = document.getElementById("recentResult");
  recent.innerHTML = `${calculation.result}`;
}

function switchOp(symbol) {
  switch (symbol) {
    case "+":
      currentOp = "+";
      break;
    case "-":
      currentOp = "-";
      break;
    case "*":
      currentOp = "*";
      break;
    case "/":
      currentOp = "/";
      break;
  }
}

function clearInputs() {
  let numOneField = document.getElementById("numOne");
  let numTwoField = document.getElementById("numTwo");
  numOneField.value = "";
  numTwoField.value = "";
}

function runCalc() {
  let numOne = document.getElementById("numOne").value;
  let numTwo = document.getElementById("numTwo").value;
  let calculation = {
    numOne: Number(numOne),
    numTwo: Number(numTwo),
    operator: currentOp,
  };
  postCalc(calculation);
}

function postCalc(calculation) {
  axios({
    method: "POST",
    url: "/calculations",
    data: calculation,
  }).then((response) => {
    console.log("new calculation added");
    getCalculationHistory();
  });
}

onReady();
