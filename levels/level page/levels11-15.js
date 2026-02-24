const levels = document.querySelectorAll(".level");
let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;

const prevBtnLevel = document.getElementById("prevBtnLevel");

// Lock all levels 11-15 initially, only unlock if level 10 is completed
for (let i = 11; i <= 15; i++) {
    const levelWrapper = document.querySelector(`.level${i}`);
    if (levelWrapper) {
        if (unlockedLevel < 11 || i > unlockedLevel) {
            levelWrapper.classList.add("locked");
        } else {
            levelWrapper.classList.remove("locked");
        }
    }
}

prevBtnLevel.addEventListener("click", () => {
    window.location.replace("levels1-10.html");
});

levels.forEach((level) => {
    level.addEventListener("click", (e) => {
        e.stopPropagation();
        const levelNum = Number(level.dataset.level);
        
        if (unlockedLevel < 11) {
            alert('Complete Level 10 first!');
            return;
        }
        
        if (levelNum > unlockedLevel) {
            alert(`Complete Level ${levelNum - 1} first!`);
            return;
        }
        
        localStorage.setItem('lastPlayedLevel', levelNum);
        if (levelNum === 11) {
            window.location.href = "../level11/room11.html";
        } else if (levelNum === 12) {
            window.location.href = "../level12/room12.html";
        } else if (levelNum === 13) {
            window.location.href = "../level13/room13.html";
        } else if (levelNum === 14) {
            window.location.href = "../level14/room14.html";
        } else if (levelNum === 15) {
            alert(`Level ${levelNum} game coming soon!`);
        } else {
            alert(`Level ${levelNum} clicked! Navigate to room ${levelNum}`);
        }
    });
});
