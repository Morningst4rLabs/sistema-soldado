// ===============================
// FASE NECROMANCER - SCRIPT.JS
// ===============================

// ===============================
// Variáveis principais
// ===============================
let xp = 0;
let level = 1;
let xpNext = 100;
let rank = "Soldado";
let playerName = "";
let playerGender = "none";
let prevXP = 0;

// Elementos HTML
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xp");
const xpNextText = document.getElementById("xpNext");
const levelText = document.getElementById("level");
const rankText = document.getElementById("rank");
const message = document.getElementById("message");

// Screens
const welcomeScreen = document.getElementById("welcomeScreen");
const mainGame = document.getElementById("mainGame");
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const progressScreen = document.getElementById("progressScreen");
const configScreen = document.getElementById("configScreen");
const linkAccountScreen = document.getElementById("linkAccountScreen");

// Display progress elements
const displayName = document.getElementById("displayName");
const displayXP = document.getElementById("displayXP");
const displayXPNext = document.getElementById("displayXPNext");
const displayLevel = document.getElementById("displayLevel");
const displayRank = document.getElementById("displayRank");

// Config elements
const themeSwitch = document.getElementById("themeSwitch");
const themeSwitch2 = document.getElementById("themeSwitch2");
const languageSelect = document.getElementById("languageSelect");

// Admin
const emailInput = document.getElementById("emailInput");
const adminPassword = document.getElementById("adminPassword");

// ===============================
// Funções de XP
// ===============================
function addXP(amount) {
  prevXP = xp; // Salva XP anterior para retrocesso
  xp += amount;
  checkLevelUp();
  updateUI();
}

function undoXP() {
  xp = prevXP;
  updateUI();
}

function checkLevelUp() {
  while (xp >= xpNext) {
    xp -= xpNext;
    level++;
    xpNext = Math.floor(xpNext * 1.5);
    updateRank();
    showMessage("⚡ LEVEL UP!");
  }
}

function updateRank() {
  if (level >= 20) rank = "Rei";
  else if (level >= 15) rank = "General";
  else if (level >= 10) rank = "Capitão";
  else if (level >= 5) rank = "Sargento";
  else rank = "Soldado";
}

function updateUI() {
  xpText.innerText = xp;
  xpNextText.innerText = xpNext;
  levelText.innerText = level;
  rankText.innerText = rank;
  xpFill.style.width = `${(xp / xpNext) * 100}%`;
}

// ===============================
// Mensagens
// ===============================
function showMessage(text) {
  message.innerText = text;
  setTimeout(() => {
    message.innerText = "";
  }, 3000);
}

// ===============================
// Menu de Controle
// ===============================
menuBtn.addEventListener("click", () => {
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});

function showScreen(screen) {
  [mainGame, progressScreen, configScreen, linkAccountScreen].forEach(s => s.style.display = "none");
  if(screen === 'progressScreen') progressScreen.style.display = 'flex';
  else if(screen === 'configScreen') configScreen.style.display = 'flex';
  else if(screen === 'linkAccountScreen') linkAccountScreen.style.display = 'flex';
  else mainGame.style.display = 'flex';
  menu.style.display = 'none';
  updateProgressScreen();
}

// Home button
function returnHome() {
  showScreen('mainGame');
}

// ===============================
// Progresso
// ===============================
function updateProgressScreen() {
  displayName.innerText = playerName;
  displayXP.innerText = xp;
  displayXPNext.innerText = xpNext;
  displayLevel.innerText = level;
  displayRank.innerText = rank;
}

// ===============================
// Configurações de tema
// ===============================
function setTheme(isDark) {
  document.body.style.background = isDark ? "#0a0a0f" : "#ffffff";
  document.body.style.color = isDark ? "#d4af37" : "#000000";
  document.querySelectorAll('.game-container, .overlay-screen').forEach(el => {
    el.style.background = isDark ? "#111118" : "#f2f2f2";
    el.style.color = isDark ? "#d4af37" : "#222222";
  });
  themeSwitch.checked = !isDark;
  themeSwitch2.checked = !isDark;
}

// ===============================
// Idiomas
// ===============================
function loadLanguages() {
  const languages = navigator.languages || [navigator.language || 'pt-BR'];
  languages.forEach(lang => {
    const opt = document.createElement('option');
    opt.value = lang;
    opt.innerText = lang;
    languageSelect.appendChild(opt);
  });
}

// ===============================
// Tela de boas-vindas
// ===============================
document.getElementById("startGameBtn").addEventListener("click", () => {
  const nameInput = document.getElementById("playerName").value.trim();
  const genderInput = document.getElementById("playerGender").value;

  if(nameInput === "" || /[^a-zA-ZÀ-ÿ0-9 ]/.test(nameInput)) {
    alert("Digite um nome válido!");
    return;
  }

  playerName = nameInput;
  playerGender = genderInput;
  welcomeScreen.style.display = "none";
  mainGame.style.display = "flex";
  updateUI();
  loadLanguages();
});

// ===============================
// Vincular Conta / Modo Administrador
// ===============================
function checkAdmin() {
  const email = emailInput.value.trim();
  const pwd = adminPassword.value.trim();

  if(email === "alves.pietro.silva02@gmail.com") {
    const proceed = confirm("Deseja prosseguir como Administrador?");
    if(proceed) {
      if(pwd === "Biel_2810") {
        alert("✅ Modo Administrador ativado!");
      } else {
        alert("❌ Senha incorreta.");
      }
    }
  } else {
    alert("Conta normal vinculada!");
  }
}

// ===============================
// Inicializações
// ===============================
updateUI();
setTheme(true); // Começa em modo escuro
