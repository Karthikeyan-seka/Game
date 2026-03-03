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




let keyCollected2 = false;

let boxOpened = false

key.addEventListener("click", () => {
  keyCollected = true;
  key.classList.add("hidden");

  inventoryKey.classList.remove("hidden");
  clickArea.classList.remove("disabled");
  finalKey2.classList.remove("disabled");
});

inventoryKey.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "key");
  });

inventoryKey2.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "key2");
  });

finalKey2.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

finalKey.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

// finalKey2.addEventListener("drop", (e) => {
//     e.preventDefault();
//     const item = e.dataTransfer.getData("text/plain");
  
//     if (item === "key") {
//       overlay.src = "letter box 2.png"; 

//       inventoryKey.classList.add("hidden"); 
//       key2.classList.remove("disabled");
//       finalKey2.classList.add("disabled");
//     }
//   });                                                                        //new

finalKey2.addEventListener("drop", (e) => {
  e.preventDefault();
  const item = e.dataTransfer.getData("text/plain");

  if (item === "key") {
    overlay.src = "../../assets/room5/letter box 2.png";
    overlay.classList.remove("hidden");
    closeBtn.classList.remove("hidden");
  
    blur.classList.add("active");
    sceneImage.classList.add("blur");

    inventoryKey.classList.add("hidden");
    key2.classList.remove("disabled");
    finalKey2.classList.add("disabled");                
  }
});
closeBtn.addEventListener("click", closeOverlayOnce);

// closeBtn.addEventListener("click",(e) => {
//   e.preventDefault();
//   closeOverlayOnce; 
// });



finalKey.addEventListener("drop", (e) => {
    e.preventDefault();
  
    const item = e.dataTransfer.getData("text/plain");
  
    if (item === "key2") {
      overlay.src = "../../assets/room5/final bg after door open.png";
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

let keyCollected = false;

key.addEventListener("click", () => {
    keyCollected = true;
  
   
    key.style.opacity = "0.4";
  
    
    clickArea.classList.remove("disabled");
  });

// leftPot.addEventListener("click", () => {  
//     // ENABLE RIGHT BOX
//     keyArea.classList.remove("disabled");
//   });



/*  CLICK RIGHT BOX */
clickArea.addEventListener("click", () => {
    if (!keyCollected) return;
  
    sceneImage.classList.add("blur");
    overlay.classList.remove("hidden");
    overlay.src="../../assets/room5/letter box.png";
    

    closeBtn.classList.remove("hidden");
    blur.classList.add("active");
    overlay.style.display = "block"
    clickArea.classList.add("disabled");
    closeBtn.classList.remove("hidden");//new img
  });
function nextImage() {
    document.getElementById("sceneImage").src = "../../assets/room5/2nd bg while click on pot.png";
    const leftPot = document.getElementById("leftPot");
    leftPot.style.display = "none";
    key.classList.remove("disabled");
    
  }

// function showOverlay() {
//     const blur = document.getElementById("blur");
//     const overlay = document.getElementById("overlay");

  
//     // Blur background
//     blur.classList.add("active");
  
//     // Show overlay image
//     overlay.style.display = "block";
// }


function collectKey() {
    const key = document.getElementById("key");
    const inventoryKey = document.getElementById("inventoryKey");
    const sceneImage = document.getElementById("sceneImage");
  
    // hide key from scene
    key.style.display = "none";

    sceneImage.src = "../../assets/room5/3rd after collected key.png";
  
    // show key in inventory
    inventoryKey.classList.remove("hidden");
  }
  function useKey() {
    document.getElementById("inventoryKey").classList.add("hidden");
  }

  function collectKey2(event) {
    boxOpened = true
    event.stopPropagation();
    const key2 = document.getElementById("key2");
    const inventoryKey2 = document.getElementById("inventoryKey2");
  
    // hide key from scene
    key2.style.display = "none";
  

  
    // show key in inventory
    inventoryKey2.classList.remove("hidden");
    
    overlay.src = "../../assets/room5/letter box 3.png";

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

    overlay.src="../../assets/room5/3rd after collected key.png"
    // finalKey.classList.remove("disabled")  
    document.getElementById("closeBtn").classList.add("hidden")
    clickArea.classList.remove("disabled");
    // overlay.src = "letter box.png";
       



    return;}

    // Prevent closing if user clicks inventory
    if (e.target.closest(".inventory")) return;         
  
    document.getElementById("overlay").classList.add("hidden");
    overlay.src = "../../assets/room5/3rd after collected key.png"
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
  //   overlay.src = "letter box 2.png";
  
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
  window.location.href = "../home page/home.html";
});

document.querySelector(".nextbtn").addEventListener("click", () => {
  let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;
  if (unlockedLevel < 6) {
    localStorage.setItem('unlockedLevel', 6);
  }
  window.location.href = "../level page/levels1-10.html";
});
