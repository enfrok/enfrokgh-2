/* ========== GLOBAL APP CONTROL ========== */
function openApp(appId) {
  const app = document.getElementById(appId);
  if (app) {
    app.style.display = "flex";
    bringToFront(app);
  }
}

function closeApp(appId) {
  const app = document.getElementById(appId);
  if (app) app.style.display = "none";
}

function bringToFront(app) {
  // Reset z-index of all windows
  document.querySelectorAll(".app-window").forEach(win => win.style.zIndex = 1);
  app.style.zIndex = 999;
  app.classList.add("active");
}

/* ========== DRAGGABLE WINDOWS ========== */
document.querySelectorAll(".app-window").forEach(app => {
  const header = app.querySelector(".app-header");
  let isDragging = false, offsetX, offsetY;

  header.addEventListener("mousedown", e => {
    isDragging = true;
    offsetX = e.clientX - app.offsetLeft;
    offsetY = e.clientY - app.offsetTop;
    bringToFront(app);
  });

  document.addEventListener("mousemove", e => {
    if (isDragging) {
      app.style.left = `${e.clientX - offsetX}px`;
      app.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => isDragging = false);

  // Header buttons
  header.querySelector(".minimize")?.addEventListener("click", () => {
    app.style.display = "none";
  });
  header.querySelector(".close")?.addEventListener("click", () => {
    app.style.display = "none";
  });
  header.querySelector(".force")?.addEventListener("click", () => {
    app.style.display = "none";
  });
});

/* ========== CALCULATOR ========== */
const calcDisplay = document.getElementById("calc-display");
function insertCalc(val) {
  calcDisplay.value += val;
}
function clearCalc() {
  calcDisplay.value = "";
}
function calculate() {
  try {
    calcDisplay.value = eval(calcDisplay.value);
  } catch {
    calcDisplay.value = "Error";
  }
}

/* ========== NOTES APP ========== */
const notesArea = document.getElementById("notes-area");
if (notesArea) {
  notesArea.value = localStorage.getItem("notes") || "";
  notesArea.addEventListener("input", () => {
    localStorage.setItem("notes", notesArea.value);
  });
}

/* ========== BROWSER APP ========== */
function openWebsite() {
  const urlInput = document.getElementById("browser-url");
  const iframe = document.getElementById("browser-frame");
  let url = urlInput.value.trim();
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }
  iframe.src = url;
}

/* ========== ENFROK INTELLIGENCE (AI) ========== */
const aiInput = document.getElementById("ai-input");
const aiSend = document.getElementById("ai-send");
const chatBox = document.getElementById("chat-box");

function addMessage(text, sender = "ai") {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function processAI(message) {
  let response = "";

  // Math solver
  if (/[\d\+\-\*\/\(\)]/.test(message)) {
    try {
      response = "Answer: " + eval(message);
    } catch {
      response = "I can't solve this, sorry...";
    }
  }
  // Greetings
  else if (/hello|hi/i.test(message)) {
    response = "Hey there! This is Enfrok Intelligence. Type math to solve or ask how the OS works.";
  }
  // OS help
  else if (/how.*os/i.test(message)) {
    response = "This OS works like Windows but with our unique touch — click icons on the desktop to launch apps, drag windows, and explore!";
  }
  // Fallback
  else {
    response = "I can't understand this, I'm limited...";
  }

  addMessage(response, "ai");
}

if (aiSend) {
  aiSend.addEventListener("click", () => {
    const text = aiInput.value.trim();
    if (text) {
      addMessage(text, "user");
      processAI(text);
      aiInput.value = "";
    }
  });
}
