// --- Desktop & App Open/Close ---
const icons = document.querySelectorAll('.desktop-icon');
const apps = document.querySelectorAll('.app-window');

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        const appId = icon.dataset.app;
        document.getElementById(appId).classList.add('active');
    });
});

document.querySelectorAll('.closeBtn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.app-window').classList.remove('active');
    });
});

// Lock Button
document.getElementById('lockBtn').addEventListener('click', () => {
    alert("Screen Locked! (Add actual lock logic here)");
});

// --- Calculator ---
let calcScreen = document.getElementById('calcScreen');
let currentInput = '';
document.querySelectorAll('.calc-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
        let val = btn.dataset.val;
        if (val === '=') {
            try { 
                currentInput = eval(currentInput.replace('×','*').replace('÷','/').replace('−','-')) 
            } catch(e) { currentInput='Error' }
        } else { currentInput += val }
        calcScreen.innerText = currentInput;
    });
});

// --- Browser ---
const browserGo = document.getElementById('browser-go');
const browserInput = document.getElementById('browser-input');
const browserFrame = document.getElementById('browser-frame');

browserGo.addEventListener('click', () => {
    let url = browserInput.value;
    if(!url.startsWith('https://')) url='https://'+url;
    const allowed = ['https://www.google.com','https://www.wikipedia.org','https://www.enfrok.com'];
    if(allowed.includes(url)) browserFrame.src = url;
    else alert("This website is blocked for safety.");
});

// --- AI Assistant ---
const aiSend = document.getElementById('ai-send');
const aiInput = document.getElementById('ai-input');
const aiChat = document.getElementById('ai-chat');

aiSend.addEventListener('click', () => {
    const msg = aiInput.value.trim();
    if(!msg) return;
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-msg';
    userMsg.innerText = msg;
    aiChat.appendChild(userMsg);
    aiInput.value='';
    setTimeout(()=>{
        const aiMsg = document.createElement('div');
        aiMsg.className='message ai-msg';
        aiMsg.innerText = "AI: " + msg.split('').reverse().join(''); // demo response
        aiChat.appendChild(aiMsg);
        aiChat.scrollTop = aiChat.scrollHeight;
    },500);
});
