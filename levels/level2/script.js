// ==========================================
// 1. DOM ELEMENTS
// ==========================================

const bgImage = document.getElementById("bgImage");
const leaf = document.getElementById("leaf");
const floorButton = document.getElementById("floorButton");
const closeBtn = document.getElementById("closeButton");

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

// Hitboxes
const leafArea = document.getElementById("leafArea");
const buttonArea = document.getElementById("buttonArea");
const doorArea = document.getElementById("doorArea");
const slot1 = document.getElementById("slot1");
const levelPanel = document.getElementById("levelCompletePanel");

// State
let leafMoved = false;
let buttonCollected = false;


// ==========================================
// 2. OPEN LEAF LOGIC
// ==========================================

leafArea.addEventListener("click", () => {

    if (!leafMoved && !buttonCollected) {

        leaf.src = "../../assets/level2/gameplay3@3x.png";

        leaf.classList.add("moved");
        bgImage.classList.add("blur-bg");

        closeBtn.classList.remove("hidden");

        setTimeout(() => {
            if (!buttonCollected) {
                floorButton.classList.remove("hidden");
            }
        }, 200);

        leafMoved = true;

        leafArea.style.display = "none";
    }
});


// ==========================================
// 3. CLOSE LEAF LOGIC
// ==========================================

function resetLeafState() {

    leaf.src = "../../assets/room2/gameplay4@3x.png";

    leaf.classList.remove("moved");
    bgImage.classList.remove("blur-bg");

    closeBtn.classList.add("hidden");
    floorButton.classList.add("hidden");

    leafMoved = false;

    if (buttonCollected) {

        leafArea.style.pointerEvents = "none";
        leaf.style.pointerEvents = "none";

        leafArea.style.setProperty("cursor", "default", "important");
        leaf.style.setProperty("cursor", "default", "important");

        leafArea.style.display = "none";

    } else {

        leafArea.style.display = "block";
        leafArea.style.pointerEvents = "auto";
        leafArea.style.cursor = "pointer";
    }
}

// Close button
closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    resetLeafState();
});


// ==========================================
// 4. COLLECT BUTTON LOGIC
// ==========================================

buttonArea.addEventListener("click", () => {

    if (leafMoved && !buttonCollected) {

        console.log("Button Collected!");
        buttonCollected = true;

        const invItem = document.createElement("img");
        invItem.src = "../../assets/room2/button_3x-removebg-preview.png";
        invItem.id = "inventoryButton";
        invItem.draggable = true;

        invItem.style.width = "40px";
        invItem.style.height = "40px";

        invItem.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.id);
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setDragImage(e.target, 20, 20);
        });

        slot1.appendChild(invItem);

        doorArea.classList.remove("disabled");

        buttonArea.style.display = "none";
        buttonArea.style.pointerEvents = "none";

        resetLeafState();
    }
});


// ==========================================
// 5. DROP LOGIC (WIN LEVEL)
// ==========================================

doorArea.addEventListener("dragover", (e) => {

    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

});

doorArea.addEventListener("drop", (e) => {

    e.preventDefault();

    const id = e.dataTransfer.getData("text/plain");
    const item = document.getElementById(id);

    if (item && item.id === "inventoryButton") {

        item.remove();

        leaf.classList.add("hidden");
        closeBtn.classList.add("hidden");
        floorButton.classList.add("hidden");

        bgImage.src = "../../assets/room2/gameoverbg@3x.jpg";
        bgImage.classList.remove("blur-bg");

        setTimeout(() => {

            if (levelPanel) {

                levelPanel.classList.remove("hidden");
                bgImage.classList.add("blur-bg");

            }

        }, 1200);
    }
});


// ==========================================
// 6. PANEL BUTTON LOGIC
// ==========================================

const panelCloseBtn = document.getElementById("panelCloseBtn");
const homeBtn = document.getElementById("homeBtn");
const nextBtn = document.getElementById("nextBtn");


// Reload level
if (panelCloseBtn) {

    panelCloseBtn.addEventListener("click", () => {

        location.reload();

    });

}


// Home button
if (homeBtn) {

    homeBtn.addEventListener("click", () => {

        homeBtn.style.opacity = '0.6';
        window.location.replace("../home_page/home.html");

    });

}


// Next level
if (nextBtn) {

    nextBtn.addEventListener("click", () => {

        nextBtn.style.opacity = '0.6';

        let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;

        if (unlockedLevel < 3) {

            localStorage.setItem('unlockedLevel', 3);

        }

        window.location.replace("../level_page/levels1-10.html");

    });

}