// Homepage navigation
const playBtn = document.getElementById("playBtn");
const levelsBtn = document.getElementById("levelsBtn");
const gamesBtn = document.getElementById("gamesBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsPopup = document.getElementById("settings");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const soundToggle = document.getElementById("soundToggle");
const musicToggle = document.getElementById("musicToggle");

playBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const lastLevel = parseInt(localStorage.getItem('lastPlayedLevel')) || 1;
    console.log('Last played level:', lastLevel);
    const levelPaths = {
        1: "../level1/index.html",
        2: "../level2/index.html",
        3: "../level3/index.html",
        4: "../level4/demo.html",
        5: "../level5/room5.html",
        6: "../level6/room6demo.html",
        7: "../level7/room7.html",
        8: "../level8/index.html",
        9: "../level9/room9.html",
        10: "../level10/demo.html",
        11: "../level11/room11.html",
        12: "../level11/room11.html",
        13: "../level13/room13.html",
        14: "../level14/room14.html",
        15: "../level14/room14.html"
    };
    console.log('Navigating to:', levelPaths[lastLevel]);
    window.location.href = levelPaths[lastLevel] || "../level1/index.html";
});

levelsBtn.addEventListener("click", () => {
    const unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;
    if (unlockedLevel >= 11) {
        window.location.href = "../level page/levels11-15.html";
    } else {
        window.location.href = "../level page/levels1-10.html";
    }
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
