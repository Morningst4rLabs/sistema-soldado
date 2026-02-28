// ======================================
// MORNINGSTAR - FASE NECROMANCER FINAL
// ======================================

const STORAGE_KEY = "morningstarProgress_v1";
const TERMO_KEY = "morningstarTermoAceito_v1";

const translations = { /* ... mesmo objeto de traduções que usamos antes ... */ };
// (coloque aqui o translations completo que eu te mandei nas mensagens anteriores)

let xp = 0;
let level = 1;
let xpNext = 100;
let rank = "Soldado";
let playerName = "";
let playerGender = "none";
let isArchitect = false;
let language = "pt";
let dailyXp = 0;
let lastDay = new Date().toDateString();
let lastTaskTime = 0;

function applyLanguage(lang) { /* ... mesma função anterior ... */ }
function loadProgress() { /* ... mesma função anterior ... */ }
function saveProgress() { /* ... mesma função anterior ... */ }
function resetProgress() { localStorage.removeItem(STORAGE_KEY); location.reload(); }

const screens = { /* ... mesmo objeto screens ... */ };

const popupMessage = document.createElement("div");
popupMessage.className = "internal-popup";
document.body.appendChild(popupMessage);

function showPopup(text) {
  popupMessage.innerText = text;
  popupMessage.style.display = "flex";
  setTimeout(() => popupMessage.style.display = "none", 2800);
}

function showScreen(screenName) {
  if (!screens[screenName]) return;
  Object.values(screens).forEach(s => s.style.display = "none");
  screens[screenName].style.display = "flex";
}

function showTermoModal() {
  const aceito = localStorage.getItem(TERMO_KEY) === "true";
  const modal = document.getElementById("termoModal");
  if (!modal) return;
  modal.style.display = "flex";

  const checkbox = document.getElementById("termoCheckbox");
  const aceitarBtn = document.getElementById("termoAceitarBtn");
  const recusarBtn = document.getElementById("termoRecusarBtn");
  const fecharBtn = document.getElementById("termoFecharBtn");

  if (aceito) {
    checkbox.parentElement.style.display = "none";
    aceitarBtn.style.display = "none";
    recusarBtn.style.display = "none";
    fecharBtn.style.display = "block";
    fecharBtn.onclick = () => modal.style.display = "none";
  } else {
    checkbox.parentElement.style.display = "flex";
    aceitarBtn.style.display = "block";
    recusarBtn.style.display = "block";
    fecharBtn.style.display = "none";
    aceitarBtn.disabled = true;

    checkbox.onchange = () => aceitarBtn.disabled = !checkbox.checked;

    aceitarBtn.onclick = () => {
      localStorage.setItem(TERMO_KEY, "true");
      modal.style.display = "none";
      showPopup("Termos aceitos. Bem-vindo à Legião.");
      if (!playerName) showScreen("welcome");
    };

    recusarBtn.onclick = () => {
      modal.style.display = "none";
      showPopup("Você recusou os termos.");
      localStorage.clear();
      showScreen("welcome");
    };
  }
}

function showDeniedModal() {
  const modal = document.getElementById("deniedModal");
  if (modal) modal.style.display = "flex";
  const btn = document.getElementById("deniedVoltarBtn");
  if (btn) btn.onclick = () => modal.style.display = "none";
}

function showSaudeModal() {
  const modal = document.getElementById("saudeModal");
  if (modal) modal.style.display = "flex";
  const btn = document.getElementById("saudeVoltarBtn");
  if (btn) btn.onclick = () => modal.style.display = "none";
}

function addXP(amount) {
  const now = Date.now();
  if (now - lastTaskTime < 10000) {
    showPopup("O Arquiteto está de olho sempre, não tente o enganar!");
    return;
  }
  lastTaskTime = now;

  const today = new Date().toDateString();
  if (today !== lastDay) {
    dailyXp = 0;
    lastDay = today;
  }

  if (dailyXp + amount > 400) {
    showSaudeModal();
    return;
  }

  xp += amount;
  dailyXp += amount;

  while (xp >= xpNext) {
    xp -= xpNext;
    level++;
    xpNext = Math.floor(xpNext * 1.5);
    updateRank();
    showPopup("⚡ LEVEL UP!");
  }

  updateUI();
  saveProgress();
}

function updateRank() { /* mesma função anterior */ }

function updateUI() {
  const xpEl = document.getElementById("xp");
  const xpNextEl = document.getElementById("xpNext");
  const levelEl = document.getElementById("level");
  const rankEl = document.getElementById("rank");
  const xpFillEl = document.getElementById("xpFill");

  if (xpEl) xpEl.innerText = xp;
  if (xpNextEl) xpNextEl.innerText = xpNext;
  if (levelEl) levelEl.innerText = level;
  if (rankEl) rankEl.innerText = rank;
  if (xpFillEl && xpNext > 0) xpFillEl.style.width = (xp / xpNext * 100) + "%";
}

function updateTitle() {
  let prefix = isArchitect ? "Sr." : (playerGender === "male" ? "Sr." : (playerGender === "female" ? "Sra." : ""));
  const titleEl = document.getElementById("playerTitle");
  if (titleEl) titleEl.innerText = `SISTEMA ${rank} - ${prefix} ${playerName || "Recruta"}`;
}

// Event listeners e inicialização (mesmo de antes, mas com delay maior)
document.getElementById("startLogoBtn").onclick = () => showScreen("name");
document.getElementById("startGameBtn").onclick = () => { /* ... */ };
document.getElementById("guestContinueBtn").onclick = () => {
  showScreen("game");
  updateTitle();
  updateUI();
  showPopup("Modo visitante ativado.");
  saveProgress();
};
// ... (os outros listeners iguais)

loadProgress();
applyLanguage(language);

setTimeout(() => {
  showTermoModal();
  if (!playerName) showScreen("welcome");
  else {
    showScreen("game");
    updateUI();
    updateTitle();
  }
}, 200);

document.getElementById("backGameBtn").onclick = () => {
  showScreen("game");
  updateUI();
  updateTitle();
};
