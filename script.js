// ======================================
// MORNINGSTAR - FASE NECROMANCER FINAL
// ======================================

// --------- ESTADO DO SISTEMA ----------
let xp = 0;
let level = 1;
let xpNext = 100;
let rank = "Soldado";
let playerName = "";
let playerGender = "none";
let isArchitect = false;
let language = "pt"; // pt ou en
let dailyXp = 0;
let lastDay = new Date().toDateString();

// --------- TRADUÇÕES SIMPLES (MVP) ----------
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
    // ... adicione mais chaves conforme necessário
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
    // ... 
  }
};

// --------- FUNÇÃO PARA APLICAR IDIOMA ----------
function applyLanguage(lang) {
  language = lang;
  saveProgress();

  document.getElementById("welcomeText").innerText = translations[lang].welcomeText;
  document.getElementById("termoTitle").innerText = translations[lang].termoTitle;
  document.getElementById("deniedTitle").innerText = translations[lang].deniedTitle;
  document.getElementById("saudeTitle").innerText = translations[lang].saudeTitle;
  document.getElementById("settingsTitle").innerText = translations[lang].settingsTitle;
  document.getElementById("themeLabel").innerText = translations[lang].themeLabel;
  document.getElementById("languageLabel").innerText = translations[lang].languageLabel;
  document.getElementById("otherOptionsLabel").innerText = translations[lang].otherOptionsLabel;
  document.getElementById("resetBtn").innerText = translations[lang].resetBtn;
  document.getElementById("viewTermBtn").innerText = translations[lang].viewTermBtn;
  document.getElementById("aboutBtn").innerText = translations[lang].aboutBtn;
  document.getElementById("backGameBtn").innerText = translations[lang].backGameBtn;

  // Atualiza título se já estiver no game
  updateTitle();
}

// --------- CARREGAR PROGRESSO ----------
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

      if (playerName && playerGender) {
        updateTitle();
        updateUI();
        showScreen("game");
      }
    } catch (e) {
      console.error("Erro ao carregar progresso:", e);
      showPopup("Progresso corrompido. Reiniciando...");
      resetProgress();
    }
  } else {
    applyLanguage("pt");
  }
}

// --------- SALVAR PROGRESSO ----------
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

// --------- RESET PROGRESSO ----------
function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// --------- ELEMENTOS ----------
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

// --------- POPUP INTERNO ----------
function showPopup(text) {
  popupMessage.innerText = text;
  popupMessage.style.display = "flex";
  setTimeout(() => {
    popupMessage.style.display = "none";
  }, 3000);
}

// --------- CONTROLE DE TELAS ----------
function showScreen(screenName) {
  Object.values(screens).forEach(s => s.style.display = "none");
  screens[screenName].style.display = "flex";
}

// --------- TERMO DE RESPONSABILIDADE ----------
function showTermoModal() {
  const modal = document.getElementById("termoModal");
  if (modal) {
    modal.style.display = "flex";
  }

  const fecharBtn = document.getElementById("termoFecharBtn");
  if (fecharBtn) {
    fecharBtn.onclick = () => {
      modal.style.display = "none";
    };
  }
}

// --------- MODAL ACESSO NEGADO ----------
function showDeniedModal() {
  const modal = document.getElementById("deniedModal");
  if (modal) {
    modal.style.display = "flex";
  }

  const voltarBtn = document.getElementById("deniedVoltarBtn");
  if (voltarBtn) {
    voltarBtn.onclick = () => {
      modal.style.display = "none";
      showPopup("Tentativa de entrar em área restrita registrada.");
    };
  }
}

// --------- MODAL SAÚDE ----------
function showSaudeModal() {
  const modal = document.getElementById("saudeModal");
  if (modal) {
    modal.style.display = "flex";
  }

  const voltarBtn = document.getElementById("saudeVoltarBtn");
  if (voltarBtn) {
    voltarBtn.onclick = () => {
      modal.style.display = "none";
      showPopup("Descanso ordenado. Volte amanhã.");
    };
  }
}

// --------- FLUXO INICIAL ----------
document.getElementById("startLogoBtn").onclick = () => {
  showScreen("name");
};

document.getElementById("startGameBtn").onclick = () => {
  playerName = document.getElementById("playerName").value.trim() || "Jogador";
  playerGender = document.getElementById("playerGender").value;
  saveProgress();
  showScreen("account");
};

document.getElementById("guestBtn").onclick = () => {
  showScreen("guestWarning");
};

document.getElementById("guestContinueBtn").onclick = () => {
  showScreen("game");
  updateTitle();
  showPopup("Modo visitante ativado. Progresso não será salvo.");
  saveProgress();
};

document.getElementById("linkAccountBtn").onclick = () => {
  showScreen("link");
};

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
    showPopup("Bem-vindo de volta Arquiteto Morningstar");
    saveProgress();
  } else {
    showPopup("Senha incorreta.");
  }
};

// --------- SISTEMA DE XP ----------
function addXP(amount) {
  const today = new Date().toDateString();
  if (today !== lastDay) {
    dailyXp = 0;
    lastDay = today;
  }

  if (dailyXp + amount > 200) {
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

// ... (funções updateRank, updateUI, updateTitle, menu, theme toggle, showSettings, showTermoModal, etc. – mantenha como antes) ...

// --------- INICIALIZAÇÃO ----------
loadProgress();
updateUI();

const termoMostrado = showTermoModal();

if (!termoMostrado) {
  showScreen("welcome");
}
