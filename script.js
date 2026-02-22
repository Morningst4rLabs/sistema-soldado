const welcomeScreen = document.getElementById("welcomeScreen");
const startLogoBtn = document.getElementById("startLogoBtn");
const nameGenderScreen = document.getElementById("nameGenderScreen");
const startGameBtn = document.getElementById("startGameBtn");
const playerNameInput = document.getElementById("playerName");
const playerGenderSelect = document.getElementById("playerGender");

startLogoBtn.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    nameGenderScreen.style.display = "flex";
});

startGameBtn.addEventListener("click", () => {
    const name = playerNameInput.value.trim();
    const gender = playerGenderSelect.value;
    if(name === "") {
        alert("Por favor, digite seu nome.");
        return;
    }
    window.playerName = name;
    window.playerGender = gender;
    alert(`Bem-vindo, ${gender==="male"?"Sr.":gender==="female"?"Sra.":""} ${name}!`);
});
