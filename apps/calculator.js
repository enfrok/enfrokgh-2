document.getElementById("calculator-app").innerHTML = `
  <input id="calc-input" type="text" placeholder="Enter expression">
  <button onclick="calcSolve()">Solve</button>
  <div id="calc-result"></div>
`;

function calcSolve() {
  try {
    const input = document.getElementById("calc-input").value;
    const result = eval(input);
    document.getElementById("calc-result").innerText = "= " + result;
  } catch {
    document.getElementById("calc-result").innerText = "Error!";
  }
}
