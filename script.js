// ================= ELEMENTOS =================
const welcomeScreen = document.getElementById("welcomeScreen");
const startLogoBtn = document.getElementById("startLogoBtn");
const nameGenderScreen = document.getElementById("nameGenderScreen");
const startGameBtn = document.getElementById("startGameBtn");
const playerNameInput = document.getElementById("playerName");
const playerGenderSelect = document.getElementById("playerGender");

const linkAccountScreen = document.getElementById("linkAccountScreen");
const emailInput = document.getElementById("emailInput");
const emailSubmitBtn = document.getElementById("emailSubmitBtn");
const adminAuthDiv = document.getElementById("adminAuthDiv");
const adminPassword = document.getElementById("adminPassword");
const adminKey = document.getElementById("adminKey");
const adminSubmitBtn = document.getElementById("adminSubmitBtn");

// ================= TELA INICIAL =================
startLogoBtn.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    nameGenderScreen.style.display = "flex";
});

// ================= NOME/GÊNERO =================
startGameBtn.addEventListener("click", () => {
    const name = playerNameInput.value.trim();
    const gender = playerGenderSelect.value;
    if(name === "") { alert("Por favor, digite seu nome."); return; }
    window.playerName = name;
    window.playerGender = gender;

    // Mensagem inicial
    alert(`Bem-vindo, ${gender==="male"?"Sr.":gender==="female"?"Sra.":""} ${name}!`);

    // Passa para vincular conta
    nameGenderScreen.style.display = "none";
    linkAccountScreen.style.display = "flex";
});

// ================= VINCULAR CONTA =================
emailSubmitBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    if(email === "alves.pietro.silva02@gmail.com") {
        adminAuthDiv.style.display = "flex";
        alert("Modo Administrador detectado. Digite a palavra-chave e a senha.");
    } else {
        alert("Conta vinculada com sucesso!");
        linkAccountScreen.style.display = "none";
    }
});

adminSubmitBtn.addEventListener("click", () => {
    const pwd = adminPassword.value.trim();
    const key = adminKey.value.trim();
    if(pwd==="Biel_2810" && key==="MorningstarLabs2810") {
        alert("✅ Modo Administrador ativado!");
        linkAccountScreen.style.display = "none";
    } else {
        alert("❌ Palavra-chave ou senha incorreta.");
    }
});
