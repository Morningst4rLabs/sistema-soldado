let xp = 0;
let level = 1;
let xpNext = 100;
let rank = "Soldado";

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
}

function updateUI() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("xpNext").innerText = xpNext;
  document.getElementById("level").innerText = level;
  document.getElementById("rank").innerText = rank;

  let percentage = (xp / xpNext) * 100;
  document.getElementById("xpFill").style.width = percentage + "%";
}

function showMessage(text) {
  const message = document.getElementById("message");
  message.innerText = text;
  setTimeout(() => {
    message.innerText = "";
  }, 3000);
}

updateUI();
