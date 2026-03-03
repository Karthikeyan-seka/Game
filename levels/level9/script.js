// Preload the final panel image
const finalPanelImg = new Image();
finalPanelImg.src = "../../assets/room9/final panel 9@2x@2x.png";

const clueArea = document.getElementById("clueArea");
const overlay = document.getElementById("overlay");
const sceneImage = document.getElementById("sceneImage");
const closeBtn = document.getElementById("closeBtn");
const boxArea = document.getElementById("boxArea");
const lockArea = document.getElementById("lockArea");
const keyArea = document.getElementById("keyArea");
const finalLockArea = document.getElementById("finalLockArea")
const keypadWrapper = document.getElementById("keypadWrapper");
const buttons = document.querySelectorAll('.num-btn');
const lastoptions = document.getElementById("lastoptions");
const finalCloseBtn= document.getElementById("finalCloseBtn");

const correctCode = "042"
let isBoxOPen = false
let enteredCode = "";
let keyCollected = false;


clueArea.addEventListener("click", () => {
    nextImage();
  });

closeBtn.addEventListener("click", closeOverlayOnce);

function closeOverlayOnce() {
    // clueArea.classList.add("disabled")
    sceneImage.classList.remove("blur");
    overlay.classList.add("hidden");
    closeBtn.classList.add("hidden");
    clueArea.classList.remove("disabled");
    lockArea.classList.add("disabled");
    boxArea.classList.remove("disabled");
    overlay.src ='lock.png'
    keypadWrapper.style.display = 'none';
    isBoxOPen = false;
    resetKeypad();
    console.log("closed");
    keyArea.classList.add("disabled")

  }

function nextImage() {
    overlay.src="../../assets/room9/clue.png";
    overlay.style.left= "10px";
    overlay.style.top= "20px";
    overlay.style.width = "95%";
    overlay.style.height = "95%";
    sceneImage.classList.add("blur");
    overlay.classList.remove("hidden");
    closeBtn.classList.remove("hidden");
    clueArea.classList.add("disabled")
}

boxArea.addEventListener("click", () => {
    overlay.src="../../assets/room9/box.png";
    overlay.style.left= "10px";
    overlay.style.top= "20px";
    overlay.style.width = "95%";
    overlay.style.height = "95%";
    sceneImage.classList.add("blur");
    overlay.classList.remove("hidden");
    closeBtn.classList.remove("hidden");
    clueArea.classList.add("disabled");
    lockArea.classList.remove("disabled");
    boxArea.classList.add("disabled");
  });



lockArea.addEventListener('click', () => {
    if (!isBoxOPen && !keyCollected) {
        
        overlay.src = '../../assets/room9/lock.png';
        overlay.style.left= "40px";
        overlay.style.top= "100px";
        overlay.style.width = "75%";
        overlay.style.height = "70%";
        setTimeout( ()=>{
            keypadWrapper.style.display ='block';
        },500);
        
        isBoxOPen = true;
        console.log("Keypad Active");
    }
    else if(isBoxOPen && correctCode){
        this.src = '../../assets/room9/box 2.png';
        lockArea.classList.add("disabled");
        keyArea.classList.remove("disabled"); 
    }
});

buttons.forEach(btn => {
    const val = btn.getAttribute('data-val');
    
    // Paths for image swapping
    const normalPath = `../../assets/room9/digital lock croped/${val}@3x.png`;
    const clickedPath = `../../assets/room9/when we clcik/${val}@3x.png`;

    btn.addEventListener('pointerdown', (e) => {
        if (!isBoxOPen) return;
        e.preventDefault();
        
        btn.src = clickedPath;
        
        if (val !== 'w' && val !== 'e') {
            enteredCode += val;
            console.log("Current Code: " + enteredCode);
            checkCode();
        } else if (val === 'w' || val === 'e') {
            resetKeypad(); 
        }
    });
});


function checkCode() {
    if (enteredCode === correctCode) {
        setTimeout(() => {
        
            overlay.src = '../../assets/room9/box 2.png';
            lockArea.classList.add("disabled") 
            keypadWrapper.style.display = 'none';
            keyArea.classList.remove("disabled");
        }, 50); // 300ms delay so user sees the last digit click
    } else if (enteredCode.length >= 3) {
        setTimeout(() => {
            resetKeypad();
        }, 300);
    }
}

function resetKeypad() {
    enteredCode = "";
    buttons.forEach(btn => {
        const val = btn.getAttribute('data-val');
        btn.src = `../../assets/room9/digital lock croped/${val}@3x.png`;
    });
}

keyArea.addEventListener("click", () => {
    overlay.src="../../assets/room9/box 3.png";
    const inventoryKey = document.createElement("img");
    inventoryKey.src = "../../assets/room9/key.png";
    inventoryKey.style.width = "50px";
    inventoryKey.draggable = true;
    slot.appendChild(inventoryKey);
    keyCollected = true
    sceneImage.src = "../../assets/room9/2 bg.jpg";
    boxArea.classList.add("hidden")
    keyArea.classList.add("hidden")
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
      sceneImage.src = "../../assets/room9/3 bg.jpg";
      slot.style.display = "none";
      finalLockArea.classList.add("disabled")
      setTimeout(() => {
        sceneImage.classList.add("blur");
        overlay.src = "../../assets/room9/final panel 9@2x@2x.png";
        overlay.classList.remove("hidden");
        overlay.style.height = '100%';
        overlay.style.width = '100%';
        overlay.style.top = '0px';
        overlay.style.left = '0px';
        finalCloseBtn.classList.remove("hidden")
        lastoptions.style.display = 'block';

      }, 1200)
    }            
  
  });


finalCloseBtn.addEventListener("click", () => {
  location.reload();
});

document.querySelector(".homebtn").addEventListener("click", () => {
  window.location.href = "../home page/home.html";
});

document.querySelector(".nextbtn").addEventListener("click", () => {
  let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;
  if (unlockedLevel < 10) {
    localStorage.setItem('unlockedLevel', 10);
  }
  window.location.href = "../level page/levels1-10.html";
});
