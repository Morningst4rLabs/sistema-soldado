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

// --------- CHAVE LOCALSTORAGE ----------
const STORAGE_KEY = "morningstarProgress_v1";
const TERMO_KEY = "morningstarTermoAceito_v1";

// --------- CARREGAR PROGRESSO AO INICIAR ----------
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
    isArchitect
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
  game: document.getElementById("gameScreen")
};

const popupMessage = document.createElement("div");
popupMessage.className = "internal-popup";
document.body.appendChild(popupMessage);

// --------- FUNÇÃO POPUP INTERNO ----------
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
  const aceito = localStorage.getItem(TERMO_KEY) === "true";
  if (aceito) {
    showPopup("Termos já aceitos. Bem-vindo de volta, Soldado.");
    return false;
  }

  const modal = document.getElementById("termoModal");
  if (modal) {
    modal.style.display = "flex";
  } else {
    console.error("Elemento termoModal não encontrado!");
    showPopup("Erro: Termo não carregado.");
  }

  const checkbox = document.getElementById("termoCheckbox");
  const aceitarBtn = document.getElementById("termoAceitarBtn");
  const recusarBtn = document.getElementById("termoRecusarBtn");

  if (checkbox && aceitarBtn && recusarBtn) {
    aceitarBtn.disabled = true;

    checkbox.onchange = () => {
      aceitarBtn.disabled = !checkbox.checked;
    };

    aceitarBtn.onclick = () => {
      localStorage.setItem(TERMO_KEY, "true");
      modal.style.display = "none";
      showPopup("Termos aceitos. Agora você é parte da Legião.");
      if (!playerName) showScreen("welcome");
    };

    recusarBtn.onclick = () => {
      modal.style.display = "none";
      showPopup("Você recusou os termos. Acesso negado até aceitar.");
      localStorage.clear();
      showScreen("welcome");
    };
  } else {
    console.error("Elementos do termo não encontrados!");
  }

  return true;
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
    showPopup("Conta comum vinculada.");
    showScreen("game");
    updateTitle();
    saveProgress();
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
  xp += amount;

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
  document.getElementById("xp").innerText = xp;
  document.getElementById("xpNext").innerText = xpNext;
  document.getElementById("level").innerText = level;
  document.getElementById("rank").innerText = rank;
  document.getElementById("xpFill").style.width = (xp / xpNext) * 100 + "%";
}

function updateTitle() {
  let prefix = "";

  if (isArchitect) {
    prefix = "Sr.";
  } else {
    if (playerGender === "male") prefix = "Sr.";
    if (playerGender === "female") prefix = "Sra.";
  }

  document.getElementById("playerTitle").innerText =
    `SISTEMA ${rank} - ${prefix} ${playerName}`;
}

// --------- MENU LATERAL ----------
const menu = document.getElementById("menu");
document.getElementById("menuBtn").onclick = () => {
  menu.style.display = menu.style.display === "block" ? "none" : "block";
};

// --------- MODO CLARO / ESCURO ----------
document.getElementById("lightModeBtn").onclick = () => {
  document.body.classList.remove("dark-mode");
  document.body.classList.add("light-mode");
};

document.getElementById("darkModeBtn").onclick = () => {
  document.body.classList.remove("light-mode");
  document.body.classList.add("dark-mode");
};

// --------- INICIALIZAÇÃO ----------
loadProgress();
updateUI();

const termoMostrado = showTermoModal();

if (!termoMostrado) {
  showScreen("welcome");
}
