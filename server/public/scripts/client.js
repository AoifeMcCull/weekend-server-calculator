console.log("client.js is sourced!");

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
  for (let i = 0; i < calcHistory.length - 1; i++) {
    renderCalc(calcHistory[i]);
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
  recent.innerHTML = `${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}`;
}

onReady();
