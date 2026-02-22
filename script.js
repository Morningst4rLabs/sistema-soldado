let xp = 0;
let level = 1;
let xpNext = 100;
let rank = "Soldado";

// Pegando elementos do HTML
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xp");
const xpNextText = document.getElementById("xpNext");
const levelText = document.getElementById("level");
const rankText = document.getElementById("rank");
const message = document.getElementById("message");

function addXP(amount) {
    xp += amount;
    checkLevelUp();
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

function showMessage(text) {
    message.innerText = text;
    setTimeout(() => {
        message.innerText = "";
    }, 3000);
}

// Inicializa a interface
updateUI();
