const levels = document.querySelectorAll(".level");
let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;

const homeBtnLevel = document.getElementById("homeBtnLevel");
const nextBtnLevel = document.getElementById("nextBtnLevel");

// Unlock levels on page load
for (let i = 2; i <= unlockedLevel; i++) {
    if (i <= 10) {
        document.querySelector(`.level${i}`).classList.remove("locked");
    }
}

homeBtnLevel.addEventListener("click", () => {
    window.location.replace("../home page/home.html");
});

nextBtnLevel.addEventListener("click", () => {
    window.location.replace("levels11-15.html");
});

levels.forEach((level) => {
    level.addEventListener("click", (e) => {
        e.stopPropagation();
        const levelNum = Number(level.dataset.level);
        alert(`Level ${levelNum} clicked! Navigate to room ${levelNum}`);
    });
});
