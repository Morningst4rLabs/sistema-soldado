// ... todo o código anterior (variáveis, loadProgress, saveProgress, etc.) ...

// --------- TERMO DE RESPONSABILIDADE ----------
const TERMO_KEY = "morningstarTermoAceito_v1";

function showTermoModal() {
  // Sempre checa, mas força show se não aceito
  const aceito = localStorage.getItem(TERMO_KEY) === "true";
  if (aceito) {
    showPopup("Termos já aceitos. Bem-vindo de volta, Soldado.");
    return false; // não mostra modal
  }

  // Mostra o modal
  const modal = document.getElementById("termoModal");
  if (modal) {
    modal.style.display = "flex";
  } else {
    console.error("Elemento termoModal não encontrado no DOM!");
    showPopup("Erro interno: Termo não carregado. Contate o Arquiteto.");
  }

  const checkbox = document.getElementById("termoCheckbox");
  const aceitarBtn = document.getElementById("termoAceitarBtn");
  const recusarBtn = document.getElementById("termoRecusarBtn");

  if (checkbox && aceitarBtn && recusarBtn) {
    aceitarBtn.disabled = true; // garante inicial cinza

    checkbox.onchange = () => {
      aceitarBtn.disabled = !checkbox.checked;
    };

    aceitarBtn.onclick = () => {
      localStorage.setItem(TERMO_KEY, "true");
      modal.style.display = "none";
      showPopup("Termos aceitos. Agora você é parte da Legião.");
      // Continua fluxo (já mostra welcome se não tinha)
      if (!playerName) showScreen("welcome"); // força se necessário
    };

    recusarBtn.onclick = () => {
      modal.style.display = "none";
      showPopup("Você recusou os termos. Acesso negado até aceitar.");
      // Pode bloquear ou resetar
      localStorage.clear(); // opcional: limpa tudo se recusar
      showScreen("welcome");
    };
  } else {
    console.error("Elementos do termo não encontrados!");
  }

  return true; // modal foi mostrado
}

// --------- INICIALIZAÇÃO ----------
loadProgress();
updateUI();

// Primeiro checa e mostra termo se necessário
const termoMostrado = showTermoModal();

// Só mostra welcome se termo já aceito OU não mostrou modal
if (!termoMostrado) {
  showScreen("welcome");
}
