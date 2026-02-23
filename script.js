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

// --------- FLUXO INICIAL ----------
document.getElementById("startLogoBtn").onclick = () => {
  showScreen("name");
};

document.getElementById("startGameBtn").onclick = () => {
  playerName = document.getElementById("playerName").value.trim() || "Jogador";
  playerGender = document.getElementById("playerGender").value;
  showScreen("account");
};

// --------- VISITANTE ----------
document.getElementById("guestBtn").onclick = () => {
  showScreen("guestWarning");
};

document.getElementById("guestContinueBtn").onclick = () => {
  showScreen("game");
  updateTitle();
  showPopup("Modo visitante ativado. Progresso não será salvo.");
};

// --------- VINCULAR CONTA ----------
document.getElementById("linkAccountBtn").onclick = () => {
  showScreen("link");
};

document.getElementById("emailSubmitBtn").onclick = () => {
  const value = document.getElementById("emailInput").value.trim();

  // Palavra-chave secreta do Arquiteto
  if (value === "MorningstarLabs2810") {
    document.getElementById("adminAuthDiv").style.display = "flex";
    showPopup("Passagem secreta reconhecida.");
  } else {
    showPopup("Conta comum vinculada.");
    showScreen("game");
    updateTitle();
  }
};

// --------- ENTRAR COMO ARQUITETO ----------
document.getElementById("adminSubmitBtn").onclick = () => {
  const password = document.getElementById("adminPassword").value.trim();

  if (password === "Biel_2810") {
    isArchitect = true;
    playerName = "Morningstar";
    showScreen("game");
    updateTitle();
    showPopup("Bem-vindo de volta Arquiteto Morningstar");
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

// --------- TÍTULO PERSONALIZADO ----------
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

// --------- MODO CLARO / ESCURO REAL ----------
document.getElementById("lightModeBtn").onclick = () => {
  document.body.classList.remove("dark-mode");
  document.body.classList.add("light-mode");
};

document.getElementById("darkModeBtn").onclick = () => {
  document.body.classList.remove("light-mode");
  document.body.classList.add("dark-mode");
};

// --------- INICIALIZAÇÃO ----------
showScreen("welcome");
updateUI();
