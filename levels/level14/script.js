const clueArea = document.getElementById("clueArea");
const overlay = document.getElementById("overlay");
const sceneImage = document.getElementById("sceneImage");
const closeBtn = document.getElementById("closeBtn");
const letterArea = document.getElementById("letterArea");
const letterOpenArea = document.getElementById("letterOpenArea");
const clickArea = document.getElementById("clickArea");
const colorButtons = document.getElementById("colorButtons");
const redBtn = document.getElementById("redBtn");
const whiteBtn = document.getElementById("whiteBtn");
const yellowBtn = document.getElementById("yellowBtn");
const keyArea = document.getElementById("keyArea");
const slot = document.getElementById("slot");
const finalLockArea = document.getElementById("finalLockArea");
const lastoptions = document.getElementById("lastoptions");
const finalCloseBtn= document.getElementById("finalCloseBtn");
let isLetterOpen = false;
let isRipBoxOpen = false;
let redBtnState = 0;
let whiteBtnState = 0;
let yellowBtnState = 0;
let keyCollected = false;

// Show game when background loads
if (sceneImage.complete) {
  document.getElementById('loader').style.display = 'none';
  document.getElementById('gameScreen').style.opacity = '1';
} else {
  sceneImage.onload = () => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('gameScreen').style.opacity = '1';
  };
}

// Preload completion panel image
const finalPanelImg = new Image();
finalPanelImg.src = "../../assets/room14/final panel 14@2x.png";



clueArea.addEventListener("click", () => {
    if (isLetterOpen === false)
        {
            overlay.src="../../assets/room14/letter box 14@3x.png";
        }
    if (isLetterOpen === true)
        {
            overlay.src="../../assets/room14/letter open 14@3x@3x.png";
        }

    overlay.style.left= "10px";
    overlay.style.top= "20px";
    overlay.style.width = "95%";
    overlay.style.height = "95%";
    sceneImage.classList.add("blur");
    overlay.classList.remove("hidden");
    closeBtn.classList.remove("hidden");
    clueArea.classList.add("disabled");
    letterArea.classList.remove("disabled");
  });

closeBtn.addEventListener("click", closeOverlayOnce);

function closeOverlayOnce() {
    // clueArea.classList.add("disabled")
    sceneImage.classList.remove("blur");
    overlay.classList.add("hidden");
    closeBtn.classList.add("hidden");
    clueArea.classList.remove("disabled");
    letterArea.classList.add("disabled");
    colorButtons.style.display = 'none';
    // letterOpenArea.classList.remove("disabled");
    // overlay.src =""
    // keypadWrapper.style.display = 'none';
    // isBoxOPen = false;
    // resetKeypad();
    // console.log("closed");
    // keyArea.classList.add("disabled");

  }

  letterArea.addEventListener("click", () => {
    overlay.src="../../assets/room14/letter 14@3x.png";
    clueArea.classList.add("disabled");
    letterArea.classList.add("disabled");
    letterOpenArea.classList.remove("disabled");


  });

  letterOpenArea.addEventListener("click", () => {
    isLetterOpen = true
    overlay.src="../../assets/room14/letter open 14@3x@3x.png";
    letterOpenArea.classList.add("disabled");
    colorButtons.style.top= "40.5%";
  });

  clickArea.addEventListener("click", () => {
    if (isRipBoxOpen===false) 
    // if (!keyCollected) return;
    {
      sceneImage.classList.add("blur");
      overlay.classList.remove("hidden");
      letterOpenArea.classList.add("disabled");
      overlay.src="../../assets/room14/rip box 1@3x.png";
      closeBtn.classList.remove("hidden");
      overlay.classList.remove("hidden");
      closeBtn.classList.remove("hidden");//new img
      colorButtons.style.display = 'flex';
      colorButtons.style.top = '40.5%';
    }
    if (isRipBoxOpen===true) 
      // if (!keyCollected) return;
      {
        sceneImage.classList.add("blur");
        overlay.classList.remove("hidden");
        overlay.src="../../assets/room14/rip box 3@3x@3x@3x.png";
        closeBtn.classList.remove("hidden");
        colorButtons.style.display = 'none';
      }
  });

redBtn.addEventListener('click', () => {
    redBtnState++;

    // Reset back to 0 if it goes past the last color
    if (redBtnState > 2) {
        redBtnState = 0;
    }

    // Change the image based on the state
    if (redBtnState === 0) {
        redBtn.src = "../../assets/room14/red button.png";
        console.log("Red Button is now RED");
    } else if (redBtnState === 1) {
        redBtn.src = "../../assets/room14/yellow.png";
        console.log("Red Button is now YELLOW");
    } else if (redBtnState === 2) {
        redBtn.src = "../../assets/room14/white button.png";
        console.log("Red Button is now WHITE");
    }
    console.log("Red button clicked");
    checkColorPuzzle();
});

whiteBtn.addEventListener('click', () => {
  whiteBtnState++;

  // Reset back to 0 if it goes past the last color
  if (whiteBtnState > 2) {
      whiteBtnState = 0;
  }

  // Change the image based on the state
  if (whiteBtnState === 0) {
      whiteBtn.src = "../../assets/room14/white button.png";
      console.log("white Button is now white");
  } else if (whiteBtnState === 1) {
      whiteBtn.src = "../../assets/room14/red button.png";
      console.log("white Button is now red");
  } else if (whiteBtnState === 2) {
      whiteBtn.src = "../../assets/room14/yellow.png";
      console.log("white Button is now yellow");
  }
  console.log("white button clicked");
  checkColorPuzzle();
});

yellowBtn.addEventListener('click', () => {
  yellowBtnState++;

  // Reset back to 0 if it goes past the last color
  if (yellowBtnState > 2) {
      yellowBtnState = 0;
  }

  // Change the image based on the state
  if (yellowBtnState === 0) {
      yellowBtn.src = "../../assets/room14/yellow.png";
      console.log("yellow Button is now yellow");
  } else if (yellowBtnState === 1) {
      yellowBtn.src = "../../assets/room14/red button.png";
      console.log("yellow Button is now red");
  } else if (yellowBtnState === 2) {
      yellowBtn.src = "../../assets/room14/white button.png";
      console.log("yellow Button is now white");
  }
  console.log("yellow button clicked");
  checkColorPuzzle();
});

function checkColorPuzzle() {
  if (redBtnState === 2  && yellowBtnState === 0 && whiteBtnState === 1 ) { 
      console.log("Puzzle Solved!");
      overlay.src="../../assets/room14/rip box 2@3x@3x.png";
      colorButtons.style.display = 'none';
      keyArea.classList.remove("disabled")
  }
}

keyArea.addEventListener("click", () => {
  overlay.src="../../assets/room14/rip box 3@3x@3x@3x.png";
  isRipBoxOpen = true;
  const inventoryKey = document.createElement("img");
  inventoryKey.src = "../../assets/room14/key copy 3.png";
  // inventoryKey.src = "key to open the door for room 1.png";
  inventoryKey.style.width = "30px";
  inventoryKey.draggable = true;
  slot.appendChild(inventoryKey);
  keyCollected = true
  sceneImage.src = "../../assets/room14/2 bg@3x@3x.png";
  keyArea.classList.add("disabled")
  finalLockArea.classList.remove("disabled")
  slot.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", "finalKey");
    });
});

finalLockArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});

finalLockArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const item = e.dataTransfer.getData("text/plain");
  if (item === "finalKey") {
    sceneImage.src = "../../assets/room14/3 bg@3x@3x@3x.png";
    slot.style.display = "none";
    finalLockArea.classList.add("disabled");
    clickArea.classList.add("disabled");
    setTimeout(() => {
      sceneImage.classList.add("blur");
      overlay.src = "../../assets/room14/final panel 14@2x.png";
      overlay.classList.remove("hidden");
      lastoptions.style.display = 'block';
      finalCloseBtn.classList.remove("hidden")
    }, 1200)
  }            

});


finalCloseBtn.addEventListener("click", () => {
  window.location.href = "../level page/levels11-15.html";
});

document.querySelector(".homebtn").addEventListener("click", () => {
  window.location.href = "../home page/home.html";
});

document.querySelector(".nextbtn").addEventListener("click", () => {
  let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;
  if (unlockedLevel < 15) {
    localStorage.setItem('unlockedLevel', 15);
  }
  window.location.href = "../level page/levels11-15.html";
});
