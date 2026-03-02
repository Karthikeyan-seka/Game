const key = document.getElementById("key");
const crowBar = document.getElementById("crowBar");
const sceneImage = document.getElementById("sceneImage");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const finalCrowBarArea = document.getElementById("finalCrowBarArea");
const lockedBoxArea = document.getElementById("lockedBoxArea");
const lockedBoxKeyArea = document.getElementById("lockedBoxKeyArea");
const slot = document.getElementById("slot");
const slot1 = document.getElementById("slot1");
const inventoryKey = document.getElementById("inventoryKey");
const finalCloseBtn= document.getElementById("finalCloseBtn");

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




let key1Collected = false
let crowbarCollected = false
let key1CollectedFirst = false
let crowbarCollectedFirst = false
let finalKeyCollected = false


key.addEventListener("click", () => {
    key1Collected = true;
    collectKey();
  });

crowBar.addEventListener("click", () => {
    crowbarCollected = true;
    collectKey();
  });

closeBtn.addEventListener("click", closeOverlayOnce);

function closeOverlayOnce() {
  finalCrowBarArea.classList.add("disabled")
  sceneImage.classList.remove("blur");
  overlay.classList.add("hidden");
  closeBtn.classList.add("hidden");
}

function nextImage() {
    finalCrowBarArea.classList.remove("disabled")
    sceneImage.classList.add("blur");
    overlay.classList.remove("hidden");
    closeBtn.classList.remove("hidden");
  }

function collectKey() {
  if (key1Collected===true && crowbarCollected===false){
    const inventoryKey = document.createElement("img");
    inventoryKey.src = "../../assets/room7/key.png";
    inventoryKey.style.width = "30px";
    inventoryKey.draggable = true;
    slot.appendChild(inventoryKey);
    sceneImage.src = "../../assets/room7/3 bg.jpg";
    key.style.display = "none";
    key1CollectedFirst = true
    slot.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", "key");
    });
  }

  if (key1Collected===false && crowbarCollected===true){
    const inventoryKey = document.createElement("img");
    inventoryKey.src = "../../assets/room7/crowbar.png";
    inventoryKey.style.width = "30px";
    inventoryKey.draggable = true;
    slot.appendChild(inventoryKey);
    sceneImage.src = "../../assets/room7/2 bg.jpg";
    // hide crowbar from scene
    crowBar.style.display = "none";
    crowbarCollectedFirst = true
    slot.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", "crowbar");
    });
  }

  if (key1Collected===true && crowbarCollected===true){
    if(crowbarCollectedFirst===true){
      const inventoryKey1 = document.createElement("img");
      inventoryKey1.src = "../../assets/room7/key.png";
      inventoryKey1.style.width = "30px";
      inventoryKey1.draggable = true;
      slot1.appendChild(inventoryKey1);
      sceneImage.src = "../../assets/room7/4 bg.jpg";
      key.style.display = "none";
      finalCrowBarArea.classList.remove("disabled")
      slot1.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", "key");
      });
    }
    if(key1CollectedFirst===true){
      const inventoryKey1 = document.createElement("img");
      inventoryKey1.src = "../../assets/room7/crowbar.png";
      inventoryKey1.style.width = "30px";
      inventoryKey1.draggable = true;
      slot1.appendChild(inventoryKey1);
      sceneImage.src = "../../assets/room7/4 bg.jpg";
      crowBar.style.display = "none";
      // finalCrowBarArea.classList.remove("disabled")
      slot1.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", "crowbar");
      });
    }
  }
  }

finalCrowBarArea.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

finalCrowBarArea.addEventListener("drop", (e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("text/plain");
    if (item === "crowbar") {
      overlay.src = "../../assets/room7/wooden box open.png";
      if(crowbarCollectedFirst===true){
        slot.style.display = "none";
      }
      if(key1CollectedFirst===true){
        slot1.style.display = "none";
      }
      finalCrowBarArea.classList.add("disabled")
      lockedBoxArea.classList.remove("disabled")
      sceneImage.src = "../../assets/room7/5 bg.png";
    }            

  });

lockedBoxArea.addEventListener("click",() => {
    overlay.src = "../../assets/room7/locked box.png";   
    lockedBoxArea.classList.add("disabled"); 
    lockedBoxKeyArea.classList.remove("disabled");     
  });

lockedBoxKeyArea.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

lockedBoxKeyArea.addEventListener("drop", (e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("text/plain");
    if (item === "key") {
      overlay.src = "../../assets/room7/locked box 2.png";
      if(crowbarCollectedFirst===true){
        slot1.style.display = "none";
      }
      if(key1CollectedFirst===true){
        slot.style.display = "none";
      }
      lockedBoxKeyArea.classList.add("disabled")
      finalKeyArea.classList.remove("disabled")
    }            

  });

finalKeyArea.addEventListener("click", () => {
  finalKeyCollected = true;
  collectFinalKey();
  });

function collectFinalKey() {
  overlay.src = "../../assets/room7/locked box 3.png";
  slot.style.display = "block";
  slot.innerHTML = "";
  // const inventoryKey = document.getElementById("inventoryKey");
  // slot.removeChild(inventoryKey);
  const inventoryKey = document.createElement("img");
  inventoryKey.src = "../../assets/room7/key to open the door for room 1.png";
  inventoryKey.style.width = "45px";
  inventoryKey.style.position = "absolute";
  // inventoryKey.style.bottom = "220px";  
  inventoryKey.draggable = true;
  slot.appendChild(inventoryKey);
  finalDoorArea.classList.remove("disabled")
  slot.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "finalKey");
  });
}

finalDoorArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});

finalDoorArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const item = e.dataTransfer.getData("text/plain");
  if (item === "finalKey") {
    sceneImage.src = "../../assets/room7/6 bg.jpg";
    slot.style.display = "none";
    finalDoorArea.classList.add("disabled")
    setTimeout(() => {
      sceneImage.classList.add("blur");
      finalOverlay.classList.remove("hidden");
      finalCloseBtn.classList.remove("hidden");
      finalCloseBtn.classList.remove("hidden");
      lastoptions.style.display = 'block';
    }, 1200)
  }            

});


finalCloseBtn.addEventListener("click", () => {
  finalOverlay.classList.add("hidden");
  lastoptions.style.display = 'none';
  finalCloseBtn.classList.add("hidden");
  sceneImage.classList.remove("blur");
});

document.querySelector(".homebtn").addEventListener("click", () => {
  window.location.href = "../home page/home.html";
});

document.querySelector(".nextbtn").addEventListener("click", () => {
  let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;
  if (unlockedLevel < 8) {
    localStorage.setItem('unlockedLevel', 8);
  }
  window.location.href = "../level page/levels1-10.html";
});
