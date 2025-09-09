document.getElementById("ai-app").innerHTML = `
  <div id="ai-output"></div>
  <input id="ai-input" type="text" placeholder="Ask Enfrok AI...">
  <button onclick="askAI()">Send</button>
`;

function askAI() {
  const input = document.getElementById("ai-input").value.trim();
  const output = document.getElementById("ai-output");

  if (!input) return;

  if (/^[0-9+\-*/(). ]+$/.test(input)) {
    try {
      const result = eval(input);
      output.innerHTML += `<div><b>You:</b> ${input}</div>`;
      output.innerHTML += `<div><b>AI:</b> ${result}</div>`;
    } catch {
      output.innerHTML += `<div><b>AI:</b> Error in math.</div>`;
    }
  } else if (input.toLowerCase().includes("how this os works")) {
    output.innerHTML += `<div><b>You:</b> ${input}</div>`;
    output.innerHTML += `<div><b>AI:</b> This OS runs in your browser. Click desktop icons to open apps. Settings let you delete apps or set time.</div>`;
  } else {
    output.innerHTML += `<div><b>You:</b> ${input}</div>`;
    output.innerHTML += `<div><b>AI:</b> I can't understand this, I'm limited...</div>`;
  }

  document.getElementById("ai-input").value = "";
  output.scrollTop = output.scrollHeight;
}
