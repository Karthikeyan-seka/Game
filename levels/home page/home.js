// Homepage navigation
const playBtn = document.getElementById("playBtn");
const levelsBtn = document.getElementById("levelsBtn");
const gamesBtn = document.getElementById("gamesBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsPopup = document.getElementById("settings");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const soundToggle = document.getElementById("soundToggle");
const musicToggle = document.getElementById("musicToggle");

playBtn.addEventListener("click", () => {
    alert("Play button clicked! Navigate to levels page.");
});

levelsBtn.addEventListener("click", () => {
    window.location.href = "../level page/levels1-10.html";
});

gamesBtn.addEventListener("click", () => {
    alert("More games coming soon!");
});

settingsBtn.addEventListener("click", () => {
    settingsPopup.style.display = "flex";
});

closeSettingsBtn.addEventListener("click", () => {
    settingsPopup.style.display = "none";
});

soundToggle.addEventListener("click", function() {
    const isActive = this.dataset.active === "true";
    this.src = isActive ? "../../assets/home page/PAUSE SMALL SIZE BUTTON.png" : "../../assets/home page/PAUSE BUTTON.png";
    this.dataset.active = !isActive;
});

musicToggle.addEventListener("click", function() {
    const isActive = this.dataset.active === "true";
    this.src = isActive ? "../../assets/home page/PAUSE SMALL SIZE BUTTON.png" : "../../assets/home page/PAUSE BUTTON.png";
    this.dataset.active = !isActive;
});
