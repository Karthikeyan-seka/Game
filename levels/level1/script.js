const bgImage = document.getElementById("bgImage");
const carpet = document.getElementById("carpet");
const key = document.getElementById("key");
const carpetArea = document.getElementById("carpetArea");
const slot1 = document.getElementById("slot1");
const keyArea = document.getElementById("keyArea");
const doorArea = document.getElementById("doorArea");
const overlay = document.getElementById("overlay");
const finalCloseBtn= document.getElementById("finalCloseBtn");
const lastoptions = document.getElementById("lastoptions");

const homeBtn = document.querySelector(".homebtn");
const nextBtn = document.querySelector(".nextbtn");

// Show game when background loads
if (bgImage.complete) {
  document.getElementById('loader').style.display = 'none';
  document.getElementById('gameScreen').style.opacity = '1';
} else {
  bgImage.onload = () => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('gameScreen').style.opacity = '1';
  };
}

// Preload other images
const preloadImages = [
  "../../assets/room1/room1img.png",
  "../../assets/room1/room back ground after game end@3x.jpg"
];
preloadImages.forEach(src => {
  const img = new Image();
  img.src = src;
});



let carpetMoved = false;
let keyCollected = false;

carpetArea.addEventListener("click", () => {
    if (!carpetMoved) {
        carpet.classList.add("moved");
        carpetMoved = true;
        // Show key after carpet moves
        setTimeout(() => {
            key.classList.remove("hidden");
        });

        keyArea.classList.remove("disabled")
    }
  });

// Step 2: Collect key
keyArea.addEventListener("click", () => {
    if (keyCollected) return;
  
    keyCollected = true;
    key.classList.add("hidden");
  
    const inventoryKey = document.createElement("img");
    inventoryKey.src = "../../assets/room1/key to open the door for room 1.png";
    inventoryKey.style.width = "40px";
    inventoryKey.draggable = true;
    inventoryKey.id = "inventoryKey";
  
    slot1.appendChild(inventoryKey);
    bgImage.src = "../../assets/room1/room1img.png"
    carpet.classList.add("hidden")
    carpetArea.classList.add("disabled")
    doorArea.classList.remove("disabled")
  });

/* START DRAG */
document.addEventListener("dragstart", (e) => {
    if (e.target.id === "inventoryKey") {
      e.dataTransfer.setData("text/plain", "inventoryKey");
    }
  });

/* ALLOW DROP */
doorArea.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

/* DROP KEY ON DOOR */
doorArea.addEventListener("drop", (e) => {
    e.preventDefault();
  
    // Open door
    bgImage.src = "../../assets/room1/room back ground after game end@3x.jpg";
  
    //Remove key from inventory
    const inventoryKey = document.getElementById("inventoryKey");
    if (inventoryKey) {
      inventoryKey.classList.add("hidden");
    }

    setTimeout(() => {
      bgImage.classList.add("blur");
      overlay.classList.remove("hidden")
      lastoptions.style.display = 'block';

      finalCloseBtn.classList.remove("hidden")

    }, 1200)
  });

finalCloseBtn.addEventListener("click", () => {
  window.location.href = "../level page/levels1-10.html";
});

homeBtn.addEventListener("click", () => {
  window.location.href = "../home page/home.html";
});

nextBtn.addEventListener("click", () => {
  let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;
  if (unlockedLevel < 2) {
    localStorage.setItem('unlockedLevel', 2);
  }
  window.location.href = "../level page/levels1-10.html";
});

