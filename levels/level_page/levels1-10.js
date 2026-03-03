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
    window.location.href = "../home_page/home.html";
});

nextBtnLevel.addEventListener("click", () => {
    window.location.href = "levels11-15.html";
});

levels.forEach((level) => {
    level.addEventListener("click", (e) => {
        e.stopPropagation();
        const levelNum = Number(level.dataset.level);
        
        if (levelNum > unlockedLevel) {
            alert(`Complete Level ${levelNum - 1} first!`);
            return;
        }
        
        level.style.opacity = '0.6';
        localStorage.setItem('lastPlayedLevel', levelNum);
        
        const levelPaths = {
            1: "../level1/index.html",
            2: "../level2/room2.html",
            3: "../level3/index.html",
            4: "../level4/demo.html",
            5: "../level5/room5.html",
            6: "../level6/room6demo.html",
            7: "../level7/room7.html",
            8: "../level8/index.html",
            9: "../level9/room9.html",
            10: "../level10/demo.html"
        };
        
        window.location.href = levelPaths[levelNum] || "../level1/index.html";
    });
});
