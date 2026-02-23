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
let language = "pt";
let dailyXp = 0;
let lastDay = new Date().toDateString();
let lastTaskTime = 0; // timestamp da última tarefa

// --------- TRADUÇÕES ----------
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

function applyLanguage(lang) {
  language = lang;
  saveProgress();

  // Atualiza todos os textos com IDs correspondentes
  const els = document.querySelectorAll('[id]');
  els.forEach(el => {
    const key = el.id;
    if (translations[lang][key]) el.innerText = translations[lang][key];
  });

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

      // Se tem progresso, vai pro game, mas checa termo primeiro
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

// --------- RESET ----------
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

function showPopup(text) {
  popupMessage.innerText = text;
  popupMessage.style.display = "flex";
  setTimeout(() => popupMessage.style.display = "none", 3000);
}

function showScreen(screenName) {
  if (!screens[screenName]) {
    showPopup("Erro: Tela não encontrada.");
    return;
  }
  Object.values(screens).forEach(s => s.style.display = "none");
  screens[screenName].style.display = "flex";
}

// --------- TERMO ----------
function showTermoModal() {
  const modal = document.getElementById("termoModal");
  if (modal) modal.style.display = "flex";
  const fecharBtn = document.getElementById("termoFecharBtn");
  if (fecharBtn) fecharBtn.onclick = () => modal.style.display = "none";
}

// --------- DENIED ----------
function showDeniedModal() {
  const modal = document.getElementById("deniedModal");
  if (modal) modal.style.display = "flex";
  const voltarBtn = document.getElementById("deniedVoltarBtn");
  if (voltarBtn) voltarBtn.onclick = () => {
    modal.style.display = "none";
    showPopup("Tentativa de entrar em área restrita registrada.");
  };
}

// --------- SAÚDE ----------
function showSaudeModal() {
  const modal = document.getElementById("saudeModal");
  if (modal) modal.style.display = "flex";
  const voltarBtn = document.getElementById("saudeVoltarBtn");
  if (voltarBtn) voltarBtn.onclick = () => {
    modal.style.display = "none";
    showPopup("Descanso ordenado. Volte amanhã.");
  };
}

// --------- XP COM LIMITE E CONTADOR ----------
function addXP(amount) {
  const now = Date.now();
  if (now - lastTaskTime < 10000) { // 10 segundos entre tarefas
    showPopup("O Arquiteto está de olho sempre, não tente o enganar!");
    return;
  }

  lastTaskTime = now;

  const today = new Date().toDateString();
  if (today !== lastDay) {
    dailyXp = 0;
    lastDay = today;
  }

  if (dailyXp + amount > 400) { // Limite dobrado: 400 XP/dia
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

// ... (updateRank, updateUI, updateTitle, menu, theme, showSettings, etc. – mantenha como antes) ...

// --------- INICIALIZAÇÃO ----------
loadProgress();
updateUI();
applyLanguage(language);

showTermoModal(); // força checagem inicial

if (!playerName) {
  showScreen("welcome"); // sempre mostra welcome se não tem nome
} else {
  showScreen("game");
}

// Bind pros botões de ver termo
document.querySelectorAll('.term-link, #viewTermBtn').forEach(el => el.onclick = showTermoModal);
