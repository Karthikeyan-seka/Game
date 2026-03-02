const levels = document.querySelectorAll(".level");
const homeBtnLevel = document.getElementById("homeBtnLevel");
const nextBtnLevel = document.getElementById("nextBtnLevel");

let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;

// Lock/unlock levels on page load
for (let i = 1; i <= 10; i++) {
    const levelWrapper = document.querySelector(`.level${i}`);
    if (levelWrapper) {
        if (i > unlockedLevel) {
            levelWrapper.classList.add("locked");
        } else {
            levelWrapper.classList.remove("locked");
        }
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
        
        if (levelNum > unlockedLevel) {
            alert(`Complete Level ${levelNum - 1} first!`);
            return;
        }
        
        localStorage.setItem('lastPlayedLevel', levelNum);
        
        
        if (levelNum === 1) {
            window.location.href = "../level1/index.html";
        } else if (levelNum === 2) {
            window.location.href = "../level2/room2.html";
        } else if (levelNum === 3) {
            window.location.href = "../level3/index.html";
        } else if (levelNum === 4) {
            window.location.href = "../level4/demo.html";
        } else if (levelNum === 5) {
            window.location.href = "../level5/room5.html";
        } else if (levelNum === 6) {
            window.location.href = "../level6/room6demo.html";
        } else if (levelNum === 7) {
            window.location.href = "../level7/room7.html";
        } else if (levelNum === 8) {
            window.location.href = "../level8/index.html";
        } else if (levelNum === 9) {
            window.location.href = "../level9/room9.html";
        } else if (levelNum === 10) {
            window.location.href = "../level10/demo.html";
        } else {
            alert(`Level ${levelNum} clicked! Navigate to room ${levelNum}`);
        }
    });
});
