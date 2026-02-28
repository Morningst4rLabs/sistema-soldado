// ======================================
// MORNINGSTAR - FASE NECROMANCER FINAL
// ======================================

const STORAGE_KEY = "morningstarProgress_v1";
const TERMO_KEY = "morningstarTermoAceito_v1";

const translations = {
  pt: {
    welcomeText: "Você foi escolhido pelo Arquiteto Morningstar a mudar sua própria vida.",
    termoTitle: "TERMO DE RESPONSABILIDADE E USO",
    deniedTitle: "ACESSO NEGADO",
    saudeTitle: "ORDENS DO ARQUITETO",
    settingsTitle: "Configurações",
    themeLabel: "Tema",
    languageLabel: "Idioma",
    otherOptionsLabel: "Outras Opções",
    resetBtn: "Resetar Progresso",
    viewTermBtn: "Ver Termo de Responsabilidade",
    aboutBtn: "Sobre o Arquiteto",
    backGameBtn: "Voltar ao Jogo",
    rankLabel: "Patente",
    levelLabel: "Nível",
    xpLabel: "XP",
    nameGenderTitle: "Identificação do Jogador",
    accountTitle: "Vincular Conta",
    accountText: "Deseja salvar seu progresso?",
    guestWarningTitle: "Atenção",
    guestWarningText: "Sem vincular conta, seu progresso não será salvo.",
    authTitle: "Autenticação",
    authText: "Digite seu email ou a passagem secreta:",
    adminPasswordLabel: "Digite a senha do Arquiteto:"
  },
  en: {
    welcomeText: "You were chosen by the Architect Morningstar to change your own life.",
    termoTitle: "TERMS OF RESPONSIBILITY AND USE",
    deniedTitle: "ACCESS DENIED",
    saudeTitle: "ARCHITECT'S ORDERS",
    settingsTitle: "Settings",
    themeLabel: "Theme",
    languageLabel: "Language",
    otherOptionsLabel: "Other Options",
    resetBtn: "Reset Progress",
    viewTermBtn: "View Terms of Responsibility",
    aboutBtn: "About the Architect",
    backGameBtn: "Back to Game",
    rankLabel: "Rank",
    levelLabel: "Level",
    xpLabel: "XP",
    nameGenderTitle: "Player Identification",
    accountTitle: "Link Account",
    accountText: "Do you want to save your progress?",
    guestWarningTitle: "Attention",
    guestWarningText: "Without linking an account, your progress will not be saved.",
    authTitle: "Authentication",
    authText: "Enter your email or secret passage:",
    adminPasswordLabel: "Enter the Architect's password:"
  }
};

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

function applyLanguage(lang) {
  language = lang;
  saveProgress();

  const els = document.querySelectorAll('[id]');
  els.forEach(el => {
    const key = el.id;
    if (translations[lang][key]) el.innerText = translations[lang][key];
  });

  updateTitle();
}

function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const data = JSON.parse(saved);
      xp = data.xp || 0;
      level = data.level || 1;
      xpNext = data.xpNext || 100;
      rank = data.rank || "Soldado";
      playerName = data.playerName || "";
      playerGender = data.playerGender || "none";
      isArchitect = data.isArchitect || false;
      language = data.language || "pt";
      dailyXp = data.dailyXp || 0;
      lastDay = data.lastDay || new Date().toDateString();

      applyLanguage(language);
    } catch (e) {
      console.error("Erro ao carregar progresso:", e);
      showPopup("Progresso corrompido. Reiniciando...");
      resetProgress();
    }
  } else {
    applyLanguage("pt");
  }
}

function saveProgress() {
  const data = {
    xp,
    level,
    xpNext,
    rank,
    playerName,
    playerGender,
    isArchitect,
    language,
    dailyXp,
    lastDay
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

const screens = {
  welcome: document.getElementById("welcomeScreen"),
  name: document.getElementById("nameGenderScreen"),
  account: document.getElementById("accountPopup"),
  guestWarning: document.getElementById("guestWarningPopup"),
  link: document.getElementById("linkAccountScreen"),
  game: document.getElementById("gameScreen"),
  settings: document.getElementById("settingsScreen")
};

const popupMessage = document.createElement("div");
popupMessage.className = "internal-popup";
document.body.appendChild(popupMessage);

function showPopup(text) {
  popupMessage.innerText = text;
  popupMessage.style.display = "flex";
  setTimeout(() => popupMessage.style.display = "none", 3000);
}

function showScreen(screenName) {
  if (!screens[screenName]) return;
  Object.values(screens).forEach(s => s.style.display = "none");
  screens[screenName].style.display = "flex";
}

function showTermoModal() {
  const modal = document.getElementById("termoModal");
  if (modal) modal.style.display = "flex";
  const fecharBtn = document.getElementById("termoFecharBtn");
  if (fecharBtn) fecharBtn.onclick = () => modal.style.display = "none";
}

function showDeniedModal() {
  const modal = document.getElementById("deniedModal");
  if (modal) modal.style.display = "flex";
  const voltarBtn = document.getElementById("deniedVoltarBtn");
  if (voltarBtn) voltarBtn.onclick = () => modal.style.display = "none";
}

function showSaudeModal() {
  const modal = document.getElementById("saudeModal");
  if (modal) modal.style.display = "flex";
  const voltarBtn = document.getElementById("saudeVoltarBtn");
  if (voltarBtn) voltarBtn.onclick = () => modal.style.display = "none";
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

function updateRank() {
  if (level >= 20) rank = "Rei";
  else if (level >= 15) rank = "General";
  else if (level >= 10) rank = "Capitão";
  else if (level >= 5) rank = "Sargento";
  else rank = "Soldado";
}

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

  console.log("updateUI executado - Patente:", rank, "Nível:", level, "XP:", xp, "XPNext:", xpNext);
}

function updateTitle() {
  let prefix = isArchitect ? "Sr." : (playerGender === "male" ? "Sr." : (playerGender === "female" ? "Sra." : ""));
  const titleEl = document.getElementById("playerTitle");
  if (titleEl) titleEl.innerText = `SISTEMA ${rank} - ${prefix} ${playerName}`;
}

const menu = document.getElementById("menu");
document.getElementById("menuBtn").onclick = () => {
  menu.style.display = menu.style.display === "block" ? "none" : "block";
};

document.getElementById("lightModeBtn").onclick = () => document.body.classList.add("light-mode"), document.body.classList.remove("dark-mode");
document.getElementById("darkModeBtn").onclick = () => document.body.classList.add("dark-mode"), document.body.classList.remove("light-mode");
document.getElementById("settingsLightModeBtn").onclick = () => document.body.classList.add("light-mode"), document.body.classList.remove("dark-mode");
document.getElementById("settingsDarkModeBtn").onclick = () => document.body.classList.add("dark-mode"), document.body.classList.remove("light-mode");

function showSettings() {
  showScreen("settings");
  document.getElementById("languageSelect").value = language;
  document.getElementById("languageSelect").onchange = () => {
    applyLanguage(document.getElementById("languageSelect").value);
  };
}

document.getElementById("startLogoBtn").onclick = () => showScreen("name");

document.getElementById("startGameBtn").onclick = () => {
  playerName = document.getElementById("playerName").value.trim() || "Jogador";
  playerGender = document.getElementById("playerGender").value;
  saveProgress();
  showScreen("account");
};

document.getElementById("guestBtn").onclick = () => showScreen("guestWarning");

document.getElementById("guestContinueBtn").onclick = () => {
  showScreen("game");
  updateTitle();
  updateUI();
  showPopup("Modo visitante ativado. Progresso não será salvo.");
  saveProgress();
};

document.getElementById("linkAccountBtn").onclick = () => showScreen("link");

document.getElementById("emailSubmitBtn").onclick = () => {
  const value = document.getElementById("emailInput").value.trim();

  if (value === "MorningstarLabs2810") {
    document.getElementById("adminAuthDiv").style.display = "flex";
    showPopup("Passagem secreta reconhecida.");
  } else {
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(value)) {
      showPopup("Conta comum vinculada.");
      showScreen("game");
      updateTitle();
      updateUI();
      saveProgress();
    } else {
      showDeniedModal();
    }
  }
};

document.getElementById("adminSubmitBtn").onclick = () => {
  const password = document.getElementById("adminPassword").value.trim();

  if (password === "Biel_2810") {
    isArchitect = true;
    playerName = "Morningstar";
    showScreen("game");
    updateTitle();
    updateUI();
    showPopup("Bem-vindo de volta Arquiteto Morningstar");
    saveProgress();
  } else {
    showPopup("Senha incorreta.");
  }
};

// Inicialização com garantia de update após renderização
loadProgress();
applyLanguage(language);

setTimeout(() => {
  showTermoModal();

  if (!playerName) {
    showScreen("welcome");
  } else {
    showScreen("game");

    // Força update após 500ms + requestAnimationFrame
    setTimeout(() => {
      requestAnimationFrame(() => {
        updateUI();
        updateTitle();
      });
    }, 500);
  }
}, 200);

document.querySelectorAll('.term-link, #viewTermBtn').forEach(el => el.onclick = showTermoModal);

document.getElementById("backGameBtn").onclick = () => {
  showScreen("game");
  setTimeout(() => {
    updateUI();
    updateTitle();
  }, 300);
};
