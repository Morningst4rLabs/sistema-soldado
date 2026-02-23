// ... todo o código anterior (variáveis, loadProgress, saveProgress, etc.) ...

// --------- TERMO DE RESPONSABILIDADE ----------
const TERMO_KEY = "morningstarTermoAceito_v1";

function showTermoModal() {
  const aceito = localStorage.getItem(TERMO_KEY) === "true";
  if (aceito) {
    // Já aceitou → continua fluxo normal
    return;
  }

  document.getElementById("termoModal").style.display = "flex";

  const checkbox = document.getElementById("termoCheckbox");
  const aceitarBtn = document.getElementById("termoAceitarBtn");
  const recusarBtn = document.getElementById("termoRecusarBtn");

  checkbox.onchange = () => {
    aceitarBtn.disabled = !checkbox.checked;
  };

  aceitarBtn.onclick = () => {
    localStorage.setItem(TERMO_KEY, "true");
    document.getElementById("termoModal").style.display = "none";
    showPopup("Termos aceitos. Bem-vindo à Legião, Soldado.");
    // Continua pro fluxo (welcome já tá visível ou chama showScreen se precisar)
  };

  recusarBtn.onclick = () => {
    showPopup("Você precisa aceitar os termos para prosseguir.");
    // Pode esconder tudo ou voltar pro welcome
    showScreen("welcome");
    document.getElementById("termoModal").style.display = "none";
  };
}

// --------- INICIALIZAÇÃO (atualizada) ----------
loadProgress();
updateUI();
showTermoModal();  // <--- Chama primeiro pra checar termo
if (localStorage.getItem(TERMO_KEY) !== "true") {
  // Se não aceitou, modal já tá mostrando – não mostra welcome ainda
} else {
  showScreen("welcome");
}
