const key = document.getElementById("key");
const key2 = document.getElementById("key2");
const clickArea = document.getElementById("clickArea");
const sceneImage = document.getElementById("sceneImage");
const overlay = document.getElementById("overlay");
const blur = document.getElementById("blur");
const inventoryKey = document.getElementById("inventoryKey");
const leftPot = document.getElementById("leftPot");
const finalKey = document.getElementById("finalKey");
const finalKey2 = document.getElementById("finalKey2");
const finalOverlay = document.getElementById("finalOverlay");
const closeBtn = document.getElementById("closeBtn");
const finalCloseBtn= document.getElementById("finalCloseBtn");
const lastoptions = document.getElementById("lastoptions");
const slot1 = document.getElementById("slot1");

let keyCollected1 = false;
let keyCollected2 = false;
let boxOpened = false

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

finalKey2.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

finalKey.addEventListener("dragover", (e) => {
    e.preventDefault();
  });                            
finalKey2.addEventListener("drop", (e) => {
  e.preventDefault();
  const item = e.dataTransfer.getData("text/plain");

  if (item === "key") {
    overlay.src = "../../assets/room5/letter_box_2.png";
    overlay.classList.remove("hidden");
    closeBtn.classList.remove("hidden");
  
    blur.classList.add("active");
    sceneImage.classList.add("blur");

    slot1.style.display = "none";
    key2.classList.remove("disabled");
    finalKey2.classList.add("disabled");                
  }
});
closeBtn.addEventListener("click", closeOverlayOnce);


finalKey.addEventListener("drop", (e) => {
    e.preventDefault();
  
    const item = e.dataTransfer.getData("text/plain");
  
    if (item === "key2") {
      overlay.src = "../../assets/room5/final_bg_after_door_open.png";
      inventoryKey2.classList.add("hidden"); 


      key2.classList.remove("disabled");
      keyCollected2=true
      // finalKey.classList.remove("disabled");
      setTimeout(() => {
        overlay.classList.add("blur");
        finalOverlay.classList.remove("hidden");
        lastoptions.style.display = 'block';

        finalCloseBtn.classList.remove("hidden")

      }, 1200)
    }            
    
    

  });



/*  CLICK RIGHT BOX */
clickArea.addEventListener("click", () => {
    if (!keyCollected1) return;
  
    sceneImage.classList.add("blur");
    overlay.classList.remove("hidden");
    overlay.src="../../assets/room5/letter_box.png";
    

    closeBtn.classList.remove("hidden");
    blur.classList.add("active");
    overlay.style.display = "block"
    clickArea.classList.add("disabled");
    closeBtn.classList.remove("hidden");//new img
    finalKey2.classList.remove("disabled"); 
  });
function nextImage() {
    document.getElementById("sceneImage").src = "../../assets/room5/bg_2_while_click_on_pot.png";
    const leftPot = document.getElementById("leftPot");
    leftPot.style.display = "none";
    key.classList.remove("disabled");
    
  }


function collectKey() {
    keyCollected1 = true
    const key = document.getElementById("key");
    // const inventoryKey = document.getElementById("inventoryKey");
    const sceneImage = document.getElementById("sceneImage");

    const inventoryKey = document.createElement("img");
    inventoryKey.src = "../../assets/room5/key_2.png";
    inventoryKey.style.width = "50px";
    inventoryKey.draggable = true;
    inventoryKey.id = "inventoryKey";
    slot1.appendChild(inventoryKey);
    clickArea.classList.remove("disabled");
    inventoryKey.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", "key");
        });

    sceneImage.src = "../../assets/room5/after_3_collected_key.png";
  }
  function useKey() {
    document.getElementById("inventoryKey").classList.add("hidden");
  }

  function collectKey2(event) {
    boxOpened = true;
    slot1.innerHTML = "";
    slot1.style.display = "block";
    event.stopPropagation();
    // const inventoryKey2 = document.getElementById("inventoryKey2");

    const inventoryKey2 = document.createElement("img");
    inventoryKey2.src = "../../assets/room5/key.png";
    inventoryKey2.style.width = "50px";
    inventoryKey2.draggable = true;
    inventoryKey2.id = "inventoryKey2";
    slot1.appendChild(inventoryKey2);
  
    // clickArea.classList.remove("disabled");
    inventoryKey2.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", "key2");
        });
    
    overlay.src = "../../assets/room5/letter_box_3.png";

    if (!boxOpened) return;
    // Enable click anywhere to close overlay
    closeBtn.addEventListener("click", closeOverlayOnce);
    

  }
  function useKey() {
    document.getElementById("inventoryKey2").classList.add("hidden");
  }

  function closeOverlayOnce(e) {
    if (keyCollected2===false){
    document.getElementById("overlay").classList.add("hidden");
    // document.getElementById("blur").classList.add("hidden");
    blur.classList.remove("active");

    overlay.src="../../assets/room5/after_3_collected_key.png"
    // finalKey.classList.remove("disabled")  
    document.getElementById("closeBtn").classList.add("hidden")
    clickArea.classList.remove("disabled");
    // overlay.src = "letter_box.png";
    return;}

    // Prevent closing if user clicks inventory
    if (e.target.closest(".inventory")) return;         
  
    document.getElementById("overlay").classList.add("hidden");
    overlay.src = "../../assets/room5/after_3_collected_key.png"
    document.getElementById("blur").classList.add("hidden");
    finalKey.classList.remove("disabled")                     
    document.getElementById("closeBtn").classList.add("hidden")
    
    // Remove listener so it happens only once
    document.removeEventListener("click", closeOverlayOnce);
  }                                                              

  // closeBtn.addEventListener("click", (e) => {
  //   e.stopPropagation(); // prevent document click
  
  //   overlay.classList.add("hidden");
  //   closeBtn.classList.add("hidden");  // 👈 HIDE CLOSE
  //   blur.classList.remove("active");
  
  //   sceneImage.classList.remove("blur");
  // });
  


  // function showOverlay() {
  //   overlay.classList.remove("hidden");
  //   closeBtn.classList.remove("hidden");
  //   blur.classList.add("active");
  //   sceneImage.classList.add("blur");
  // }
  
  // function closeOverlay() {
  //   document.getElementById("overlay").classList.add("hidden");
  //   document.getElementById("closeBtn").classList.add("hidden");
  //   document.getElementById("blur").classList.remove("active");
  //   document.getElementById("sceneImage").classList.remove("blur");
    // overlay.classList.add("hidden");
    // closeBtn.classList.add("hidden");
    // blur.classList.remove("active");
    // sceneImage.classList.remove("blur");
  // }
  
  /* =======================
     CLOSE BUTTON
  ======================= */
  // closeBtn.addEventListener("click", e => {
  //   e.stopPropagation();
  //   closeOverlay();
  // });


  


  // finalKey2.addEventListener("click", () => {
  //   overlay.src = "letter_box_2.png";
  
  //   overlay.classList.remove("hidden");
  //   closeBtn.classList.remove("hidden");
  
  //   blur.classList.add("active");
  //   sceneImage.classList.add("blur");

    
  // });
  
  
    
  

  
  
//   let letterBoxUnlocked = false;

// finalKey2.addEventListener("drop", (e) => {
//   const item = e.dataTransfer.getData("text/plain");
//   if (item === "key") {
//     letterBoxUnlocked = true;
//   }
// });

// finalKey2.addEventListener("click", () => {
//   if (!letterBoxUnlocked) return;
//   // open overlay
// });


finalCloseBtn.addEventListener("click", () => {
  location.reload();
});

document.querySelector(".homebtn").addEventListener("click", () => {
  window.location.href = "../home_page/home.html";
});

document.querySelector(".nextbtn").addEventListener("click", () => {
  let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;
  if (unlockedLevel < 6) {
    localStorage.setItem('unlockedLevel', 6);
  }
  window.location.href = "../level_page/levels1-10.html";
});
