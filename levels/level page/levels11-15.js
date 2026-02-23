const levels = document.querySelectorAll(".level");
let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;

const prevBtnLevel = document.getElementById("prevBtnLevel");

// Unlock levels on page load
for (let i = 11; i <= unlockedLevel; i++) {
    if (i <= 15) {
        document.querySelector(`.level${i}`)?.classList.remove("locked");
    }
}

prevBtnLevel.addEventListener("click", () => {
    window.location.replace("levels1-10.html");
});

levels.forEach((level) => {
    level.addEventListener("click", (e) => {
        e.stopPropagation();
        const levelNum = Number(level.dataset.level);
        if (levelNum === 11) {
            window.location.href = "../level11/room11.html";
        } else if (levelNum === 15) {
            alert(`Level ${levelNum} game coming soon!`);
        } else {
            alert(`Level ${levelNum} clicked! Navigate to room ${levelNum}`);
        }
    });
});
