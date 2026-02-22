// ===============================
// Modo Arquiteto - Fase Necromancer
// ===============================

// Variáveis principais
let xp = 0;
let level = 1;
let xpNext = 100;
let rank = "Soldado";
let playerName = "";
let playerGender = "none";
let isArquiteto = false;

// ===============================
// ELEMENTOS HTML
// ===============================
const welcomeScreen = document.getElementById("welcomeScreen");
const startLogoBtn = document.getElementById("startLogoBtn");
const nameGenderScreen = document.getElementById("nameGenderScreen");
const playerNameInput = document.getElementById("playerName");
const playerGenderSelect = document.getElementById("playerGender");
const startGameBtn = document.getElementById("startGameBtn");

const accountPopup = document.getElementById("accountPopup");
const linkAccountBtn = document.getElementById("linkAccountBtn");
const guestBtn = document.getElementById("guestBtn");
const guestWarningPopup = document.getElementById("guestWarningPopup");
const guestContinueBtn = document.getElementById("guestContinueBtn");

const linkAccountScreen = document.getElementById("linkAccountScreen");
const emailInput = document.getElementById("emailInput");
const emailSubmitBtn = document.getElementById("emailSubmitBtn");
const adminAuthDiv = document.getElementById("adminAuthDiv");
const adminPasswordInput = document.getElementById("adminPassword");
const adminSubmitBtn = document.getElementById("adminSubmitBtn");

// ===============================
// TELA INICIAL
// ===============================
startLogoBtn.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    nameGenderScreen.style.display = "flex";
});

// ===============================
// TELA NOME/GÊNERO
// ===============================
startGameBtn.addEventListener("click", () => {
    const name = playerNameInput.value.trim();
    if(name === ""){
        alert("Por favor, insira um nome válido.");
        return;
    }
    playerName = name;
    playerGender = playerGenderSelect.value;
    nameGenderScreen.style.display = "none";
    accountPopup.style.display = "flex";
});

// ===============================
// POP-UP VINCULAR CONTA
// ===============================
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
    alert("Você está jogando como visitante. O progresso **não será salvo**.");
    startGame();
});

// ===============================
// VINCULAR CONTA / MODO ARQUITETO
// ===============================
emailSubmitBtn.addEventListener("click", () => {
    const input = emailInput.value.trim();

    // Se digitou a palavra-chave secreta
    if(input === "MorningstarLabs2810"){
        adminAuthDiv.style.display = "flex"; // solicitar senha
    } else if(input === ""){
        alert("Digite algo válido.");
        return;
    } else {
        alert("Conta vinculada como usuário normal.");
        linkAccountScreen.style.display = "none";
        startGame();
    }
});

adminSubmitBtn.addEventListener("click", () => {
    const password = adminPasswordInput.value.trim();

    if(password === "Biel_2810"){
        alert("✨ Bem-vindo de volta Arquiteto Morningstar!");
        isArquiteto = true;
        playerName = "Morningstar";  // força o nome
        playerGender = "male";       // força Sr.
        linkAccountScreen.style.display = "none";
        startGame();
    } else {
        alert("Senha incorreta.");
    }
});

// ===============================
// INICIAR JOGO
// ===============================
function startGame(){
    console.log("Jogo iniciado para: " + playerName + " | Gênero: " + playerGender);
    if(isArquiteto){
        console.log("Modo Arquiteto ativo! Chamando de Sr. Morningstar");
    }
}

// ===============================
// FUNÇÕES AUXILIARES
// ===============================
function getPlayerPrefix(){
    if(isArquiteto) return "Sr. ";  // sempre Sr. para o Arquiteto
    if(playerGender === "male") return "Sr. ";
    else if(playerGender === "female") return "Sra. ";
    else return "";
}
