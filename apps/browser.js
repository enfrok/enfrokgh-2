document.getElementById("browser-app").innerHTML = `
  <input id="browser-url" type="text" placeholder="Enter URL...">
  <button onclick="openSite()">Go</button>
  <iframe id="browser-frame" style="width:100%; height:200px;"></iframe>
`;

function openSite() {
  const url = document.getElementById("browser-url").value;
  document.getElementById("browser-frame").src =
    url.startsWith("http") ? url : "https://" + url;
}
