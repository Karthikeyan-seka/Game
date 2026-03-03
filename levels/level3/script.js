const smallBox=document.querySelector(".small-box");
const zoomOverlay=document.querySelector(".zoomoverlay");
const box1=document.querySelector(".box1");
const closeBtn=document.querySelector(".close-btn");
const mainBg=document.querySelector(".bg-img");
const inventoryKey =document.getElementById("key");
const doorlock=document.getElementById("doorlock")

const finalPanel = document.getElementById("finalPanel");

const lastoptions=document.getElementById("lastoptions");
const homebtn=document.querySelector(".homebtn");
const retrybtn=document.querySelector(".retrybtn");
const closeBtn2=document.querySelector(".close-btn2");

// Show game when background loads
if (mainBg.complete) {
  document.getElementById('loader').style.display = 'none';
  document.getElementById('gameScreen').style.opacity = '1';
} else {
  mainBg.onload = () => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('gameScreen').style.opacity = '1';
  };
}

// Preload images
const img1 = new Image();
img1.src = "../../assets/room 3/gameplay 2 @3x@3x.png";
const img2 = new Image();
img2.src = "../../assets/room 3/gameplay 3 @3x@3x.png";
const img3 = new Image();
img3.src = "../../assets/room 3/game play bg final@3x@3x.jpg";

let isBoxOPen=false;
let hasKeyBeenTaken=false;
let isBoxActive =true;


smallBox.addEventListener('click',() =>{
    if(isBoxActive){
        zoomOverlay.style.display='block';
    }
    
});

box1.addEventListener('click', function(){
    if(!isBoxOPen){
        this.src='../../assets/room 3/gameplay 2 @3x@3x.png';
        isBoxOPen=true; 
        
    }
    else if(isBoxOPen && !hasKeyBeenTaken){
        this.src = "../../assets/room 3/gameplay 3 @3x@3x.png";
        inventoryKey.style.display = 'block'; // Show key in inventory
        hasKeyBeenTaken = true;
        
        isBoxActive = false;
        smallBox.style.pointeerEvents = 'none';
        smallBox.style.cursor = 'default';
    
        
    }
    
});

closeBtn.addEventListener('click',() =>{
    zoomOverlay.style.display='none';
    box1.src='../../assets/room 3/gameplay 1@3x.png';
});

// key event to unlock the door

inventoryKey.addEventListener('dragstart', (e) =>{
    e.dataTransfer.setData("text", e.target.id);
});

doorlock.addEventListener('dragover',(e)=>{
    e.preventDefault();
});
doorlock.addEventListener('drop', (e) =>{
    e.preventDefault();
    const data=e.dataTransfer.getData("text");

    if(data === "key"){
        mainBg.src="../../assets/room 3/game play bg final@3x@3x.jpg";

        inventoryKey.style.display='none';

        doorlock.style.display='none';
        setTimeout(() => {
            finalPanel.style.display = 'block';
            lastoptions.style.display='flex';
            mainBg.style.filter = "blur(5px)";
            closeBtn2.style.display='block';
            console.log("Success Panel Displayed");
        }, 1200);

        console.log("finally the door is open !!!");
    }
});

closeBtn2.addEventListener("click", () => {
  location.reload();
});

homebtn.addEventListener("click", () => {
    window.location.href = "../home page/home.html";
});

retrybtn.addEventListener("click", () => {
    let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;
    if (unlockedLevel < 4) {
        localStorage.setItem('unlockedLevel', 4);
    }
    window.location.href = "../level page/levels1-10.html";
});

