// ===============================
// Fase Necromancer - Morningstar
// ===============================

// ================= VARIÁVEIS =================
let xp = 0;
let level = 1;
let xpNext = 100;
let rank = "Soldado";
let playerName = "";
let playerGender = "none";
let isAdmin = false;

// ================= ELEMENTOS HTML =================
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xp");
const xpNextText = document.getElementById("xpNext");
const levelText = document.getElementById("level");
const rankText = document.getElementById("rank");
const message = document.getElementById("message");
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const lightModeBtn = document.getElementById("lightModeBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

// Telas
const welcomeScreen = document.getElementById("welcomeScreen");
const startLogoBtn = document.getElementById("startLogoBtn");
const nameGenderScreen = document.getElementById("nameGenderScreen");
const startGameBtn = document.getElementById("startGameBtn");
const playerNameInput = document.getElementById("playerName");
const playerGenderSelect = document.getElementById("playerGender");
const gameScreen = document.getElementById("gameScreen");

// Popups de conta/visitante
const accountPopup = document.getElementById("accountPopup");
const linkAccountScreen = document.getElementById("linkAccountScreen");
const emailInput = document.getElementById("emailInput");
const emailSubmitBtn = document.getElementById("emailSubmitBtn");
const adminAuthDiv = document.getElementById("adminAuthDiv");
const adminPasswordInput = document.getElementById("adminPassword");
const adminSubmitBtn = document.getElementById("adminSubmitBtn");
const guestWarningPopup = document.getElementById("guestWarningPopup");
const linkAccountBtn = document.getElementById("linkAccountBtn");
const guestBtn = document.getElementById("guestBtn");
const guestContinueBtn = document.getElementById("guestContinueBtn");

// =============================
// TELA INICIAL → NOME/GÊNERO
// =============================
startLogoBtn.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    nameGenderScreen.style.display = "flex";
});

startGameBtn.addEventListener("click", () => {
    playerName = playerNameInput.value.trim() || "Jogador";
    playerGender = playerGenderSelect.value;
    nameGenderScreen.style.display = "none";
    accountPopup.style.display = "flex";
});

// ================= POPUPS CONTA / VISITANTE =================
linkAccountBtn.addEventListener("click", () => {
    accountPopup.style.display = "none";
    linkAccountScreen.style.display = "flex";
});

guestBtn.addEventListener("click", () => {
    accountPopup.style.display = "none";
    guestWarningPopup.style.display = "flex";
});

guestContinueBtn.addEventListener("click", () => {
    guestWarningPopup.style.display = "none";
    gameScreen.style.display = "flex";
    updatePlayerTitle();
});

// ================= VINCULAR CONTA / MODO ARQUITETO =================
emailSubmitBtn.addEventListener("click", () => {
    const val = emailInput.value.trim();
    // Palavra-chave secreta para Arquiteto
    if(val === "MorningstarLabs2810"){
        adminAuthDiv.style.display = "flex";
        alert("Palavra-chave reconhecida. Digite a senha do Arquiteto.");
    } else {
        alert("Conta padrão vinculada (fictícia para teste).");
        linkAccountScreen.style.display = "none";
        gameScreen.style.display = "flex";
        updatePlayerTitle();
    }
});

adminSubmitBtn.addEventListener("click", () => {
    const password = adminPasswordInput.value.trim();
    if(password === "Biel_2810"){
        isAdmin = true;
        linkAccountScreen.style.display = "none";
        gameScreen.style.display = "flex";
        alert("Bem-vindo de volta Arquiteto Morningstar");
        playerName = "Morningstar";
        updatePlayerTitle();
    } else {
        alert("Senha incorreta. Tente novamente.");
    }
});

// =============================
// FUNÇÕES JOGO (XP / LEVEL / RANK)
// =============================
function addXP(amount){
    xp += amount;
    checkLevelUp();
    updateUI();
}

function checkLevelUp(){
    while(xp >= xpNext){
        xp -= xpNext;
        level++;
        xpNext = Math.floor(xpNext*1.5);
        updateRank();
        showMessage("⚡ LEVEL UP!");
    }
}

function updateRank(){
    if(level >= 20) rank = "Rei";
    else if(level >= 15) rank = "General";
    else if(level >= 10) rank = "Capitão";
    else if(level >= 5) rank = "Sargento";
    else rank = "Soldado";
}

function updateUI(){
    xpText.innerText = xp;
    xpNextText.innerText = xpNext;
    levelText.innerText = level;
    rankText.innerText = rank;
    xpFill.style.width = `${(xp/xpNext)*100}%`;
}

function showMessage(text){
    message.innerText = text;
    setTimeout(()=>{message.innerText = "";}, 3000);
}

// =============================
// MENU LATERAL
// =============================
menuBtn.addEventListener("click", ()=>{
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// =============================
// FUNÇÕES MENU
// =============================
function vincularConta(){
    alert("🔗 Vincular conta ainda não implementado no menu");
}

function verProgresso(){
    alert(`📊 Progresso: XP ${xp} | Nível ${level} | Patente ${rank}`);
}

function configuracoes(){
    alert("⚙️ Configurações ainda não implementadas");
}

function idioma(){
    alert("🌐 Idioma ainda não implementado");
}

// =============================
// PLAYER TITLE PERSONALIZADO
// =============================
function updatePlayerTitle(){
    let prefix = "";
    if(isAdmin){
        prefix = "Sr.";
        playerName = "Morningstar";
    } else {
        if(playerGender === "male") prefix = "Sr.";
        else if(playerGender === "female") prefix = "Sra.";
    }
    document.getElementById("playerTitle").innerText = `SISTEMA SOLDADO - ${prefix} ${playerName}`;
}

// =============================
// MODO CLARO / ESCURO
// =============================
lightModeBtn.addEventListener("click", ()=>{
    document.body.style.background = "#fefefe";
    document.body.style.color = "#b8860b";
    document.querySelectorAll(".game-container, .screen").forEach(e=>{
        e.style.background = "#fff";
        e.style.color = "#b8860b";
    });
});

darkModeBtn.addEventListener("click", ()=>{
    document.body.style.background = "#0a0a0f";
    document.body.style.color = "#d4af37";
    document.querySelectorAll(".game-container, .screen").forEach(e=>{
        e.style.background = "#111118";
        e.style.color = "#d4af37";
    });
});

// =============================
// INICIALIZA INTERFACE
// =============================
updateUI();
