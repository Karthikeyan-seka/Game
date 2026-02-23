// ==========================================
// 1. DOM ELEMENTS
// ==========================================
const bgImage = document.getElementById("bgImage");
const leaf = document.getElementById("leaf");
const floorButton = document.getElementById("floorButton");
const closeBtn = document.getElementById("closeButton");

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
    if (!leafMoved) {
        // 1. Swap Image to "Bunched Up" / Open Leaf
        leaf.src = "assets/level2/game play 3@3x.png";

        // 2. Animate Slide & Blur
        leaf.classList.add("moved");
        bgImage.classList.add("blur-bg");

        // 3. Show Close Button
        closeBtn.classList.remove("hidden");

        // 4. Reveal Floor Button (Short delay for animation)
        setTimeout(() => {
            if (!buttonCollected) {
                floorButton.classList.remove("hidden");
            }
        }, 200);

        leafMoved = true;

        // Hide the leaf hitbox so it doesn't block the button underneath
        leafArea.style.display = "none";
    }
});

// ==========================================
// 3. CLOSE LEAF LOGIC (RESET FUNCTION)
// ==========================================
// We make this a reusable function so we can call it when collecting the key too
function resetLeafState() {
    // 1. Reset Image to "Closed" Leaf
    leaf.src = "assets/level2/game play 1@3x.png";

    // 2. Reset Animation
    leaf.classList.remove("moved");
    bgImage.classList.remove("blur-bg");

    // 3. Hide UI Elements
    closeBtn.classList.add("hidden");
    floorButton.classList.add("hidden");

    // 4. Reset State
    leafMoved = false;

    // 5. Bring back the leaf hitbox so we can click it again
    leafArea.style.display = "block";
}

// Event Listener for the X Button
closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    resetLeafState();
});

// ==========================================
// 4. COLLECT BUTTON LOGIC (UPDATED)
// ==========================================
buttonArea.addEventListener("click", () => {
    // Can only collect if leaf is open AND not already collected
    if (leafMoved && !buttonCollected) {

        console.log("Button Collected!");
        buttonCollected = true;

        // 1. Add to Inventory
        const invItem = document.createElement("img");
        invItem.src = "../../assets/room2/button_3x-removebg-preview.png";
        invItem.id = "inventoryButton";
        invItem.draggable = true;
        invItem.style.width = "40px";
        invItem.style.height = "40px";
        slot1.appendChild(invItem);

        // Add Drag Logic
        invItem.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.id);
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setDragImage(e.target, 20, 20);
        });

        // 2. Enable Door
        doorArea.classList.remove("disabled");

        // --- THE FIX: AUTOMATICALLY CLOSE EVERYTHING ---
        // This hides the close button AND puts the leaf back to normal
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
        item.remove(); // Remove from inventory

        // 1. Clean up Scene
        leaf.classList.add("hidden");
        closeBtn.classList.add("hidden");
        floorButton.classList.add("hidden");

        // 2. Change Background to Win Screen
        bgImage.src = "../../assets/room2/game over bg@3x.jpg";
        bgImage.classList.remove("blur-bg");

        // 3. Show Level Complete Panel (After 1.5 seconds)
        setTimeout(() => {
            if (levelPanel) {
                levelPanel.classList.remove("hidden");
                bgImage.classList.add("blur-bg");
            }
        }, 1500);
    }
});

// ==========================================
// 6. PANEL BUTTONS
// ==========================================
// ==========================================
// 7. PANEL CLOSE LOGIC
// ==========================================
const panelCloseBtn = document.getElementById("panelCloseBtn");

if (panelCloseBtn) {
    panelCloseBtn.addEventListener("click", () => {
        // Hide the Level Complete Panel
        const panel = document.getElementById("levelCompletePanel");
        if (panel) {
            panel.classList.add("hidden");
        }

        // Optional: If you want to un-blur the background when closing the panel
        // document.getElementById("bgImage").classList.remove("blur-bg");
    });
}
document.getElementById("homeBtn").addEventListener("click", () => location.reload());
document.getElementById("nextBtn").addEventListener("click", () => location.reload());