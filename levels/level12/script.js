// ==========================================
// 1. GAME CONFIGURATION & STATE
// ==========================================
let isKnobRevealed = false;
let mazeGameActive = false;
let moveKeys = { Up: false, Down: false, Left: false, Right: false };

let player = {
    x: 0, y: 0,
    hitbox: 6,   // Small for collision
    visual: 30,  // Large for display
    speed: 2
};

// ==========================================
// 2. DOM ELEMENTS
// ==========================================
// Scene Elements
const bgImage = document.getElementById("bgImage");
const doorKnobImg = document.getElementById("doorKnobImg");
const doorKnobHitbox = document.getElementById("doorKnobHitbox");
const doorDropZone = document.getElementById("doorArea");
const slot1 = document.getElementById("slot1");

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

// UI Elements
const closeBtn = document.getElementById("closeButton");
const levelPanel = document.getElementById("levelCompletePanel");

// Maze Elements
const mazeOverlay = document.getElementById('mazeOverlay');
const mazeCanvas = document.getElementById('mazeCanvas');
const ctx = mazeCanvas.getContext('2d', { willReadFrequently: true });

// ==========================================
// 3. IMAGE ASSETS
// ==========================================
const mazeImg = new Image();
mazeImg.src = "../../assets/room12/puzzle.png";

const keyImg = new Image();
keyImg.src = "../../assets/room12/puzzle/key.png";

// Debugging
mazeImg.onerror = () => console.error("Error: puzzle.png not found");
keyImg.onerror = () => console.error("Error: key image not found");

// ==========================================
// 4. INTERACTION LOGIC (REVEAL & START)
// ==========================================

function handleKnobInteraction() {
    // STEP 1: If knob is hidden -> Reveal it
    if (!isKnobRevealed) {
        console.log("Step 1: Revealing Knob");

        // Show visuals
        doorKnobImg.classList.remove("hidden");
        closeBtn.classList.remove("hidden");

        // Animate Movement (Image + Hitbox)
        setTimeout(() => {
            doorKnobImg.classList.add("moved");
            doorKnobHitbox.classList.add("moved"); // Hitbox moves with image
            bgImage.classList.add("blur-bg");
        }, 50);

        isKnobRevealed = true;
    }
    // STEP 2: If knob is already revealed -> Start Maze
    else {
        console.log("Step 2: Starting Maze");

        // Hide close button so it doesn't block maze
        closeBtn.classList.add("hidden");

        startMazeGame();
    }
}

// Attach to both Hitbox (primary) and Image (backup)
doorKnobHitbox.addEventListener("click", handleKnobInteraction);
doorKnobImg.addEventListener("click", handleKnobInteraction);

// Close Button Logic
closeBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Don't trigger game start

    // Reset Views
    doorKnobImg.classList.add("hidden");
    closeBtn.classList.add("hidden");
    bgImage.classList.remove("blur-bg");

    // Reset Positions
    doorKnobImg.classList.remove("moved");
    doorKnobHitbox.classList.remove("moved");

    // Reset State
    isKnobRevealed = false;
});

// ==========================================
// 5. MAZE ENGINE
// ==========================================

function startMazeGame() {
    mazeOverlay.classList.remove("hidden");
    mazeGameActive = true;

    mazeCanvas.width = 300;
    mazeCanvas.height = 300;

    // Start Position (Adjusted for puzzle.png)
    player.x = 150;
    player.y = 125;

    requestAnimationFrame(updateMaze);
}

function updateMaze() {
    if (!mazeGameActive) return;

    // Clear & Draw Maze
    ctx.clearRect(0, 0, mazeCanvas.width, mazeCanvas.height);
    ctx.drawImage(mazeImg, 0, 0, mazeCanvas.width, mazeCanvas.height);

    // Calculate Movement
    let nextX = player.x;
    let nextY = player.y;

    if (moveKeys.Up) nextY -= player.speed;
    if (moveKeys.Down) nextY += player.speed;
    if (moveKeys.Left) nextX -= player.speed;
    if (moveKeys.Right) nextX += player.speed;

    // Collision Check
    if (!checkCollision(nextX, nextY)) {
        player.x = nextX;
        player.y = nextY;
    }

    // Draw Player (Key) - Centered on hitbox
    let drawX = player.x - (player.visual / 2) + (player.hitbox / 2);
    let drawY = player.y - (player.visual / 2) + (player.hitbox / 2);
    ctx.drawImage(keyImg, drawX, drawY, player.visual, player.visual);

    // Check Win
    checkWin();

    requestAnimationFrame(updateMaze);
}

function checkCollision(x, y) {
    // Check 4 corners of tiny hitbox
    const points = [
        {x: x, y: y},
        {x: x + player.hitbox, y: y},
        {x: x, y: y + player.hitbox},
        {x: x + player.hitbox, y: y + player.hitbox}
    ];

    for (let point of points) {
        if (point.x < 0 || point.x >= mazeCanvas.width || point.y < 0 || point.y >= mazeCanvas.height) continue;

        const pixel = ctx.getImageData(point.x, point.y, 1, 1).data;
        // Detect Yellow Wall (High Red, High Green, Low Blue)
        if (pixel[2] < 100 && pixel[0] > 100 && pixel[1] > 100) {
            return true;
        }
    }
    return false;
}

function checkWin() {
    // If player touches edge of circle
    if (player.x <= 5 || player.x >= mazeCanvas.width - 5 ||
        player.y <= 5 || player.y >= mazeCanvas.height - 5) {
        endMazeGame();
    }
}

function endMazeGame() {
    mazeGameActive = false;
    mazeOverlay.classList.add("hidden");
    bgImage.classList.remove("blur-bg");

    // Hide Knob visuals completely
    doorKnobImg.classList.add("hidden");
    doorKnobHitbox.style.display = "none"; // Disable hitbox

    addKeyToInventory();
}

// ==========================================
// 6. INVENTORY & DROP LOGIC
// ==========================================

function addKeyToInventory() {
    const invKey = document.createElement("img");
    invKey.src = keyImg.src;
    invKey.draggable = true;
    invKey.id = "inventoryKey";
    invKey.style.width = "40px"; invKey.style.height = "40px";

    slot1.appendChild(invKey);

    invKey.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setDragImage(e.target, 20, 20);
    });

    doorDropZone.classList.remove("disabled");
}

doorDropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
});

doorDropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const item = document.getElementById(id);

    if (item && item.id === "inventoryKey") {
        item.remove(); // Remove key

        // Clean up UI
        doorKnobImg.classList.add("hidden");
        doorKnobHitbox.style.display = "none";

        // Change Background to Open Door
        bgImage.src = "../../assets/room12/2 bg.png";

        // Show Win Panel after delay
        setTimeout(() => {
            levelPanel.classList.remove("hidden");
            bgImage.classList.add("blur-bg");
        }, 1200);
    }
});

// ==========================================
// 7. INPUT CONTROLS
// ==========================================

// Keyboard
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") moveKeys.Up = true;
    if (e.key === "ArrowDown") moveKeys.Down = true;
    if (e.key === "ArrowLeft") moveKeys.Left = true;
    if (e.key === "ArrowRight") moveKeys.Right = true;
});
window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") moveKeys.Up = false;
    if (e.key === "ArrowDown") moveKeys.Down = false;
    if (e.key === "ArrowLeft") moveKeys.Left = false;
    if (e.key === "ArrowRight") moveKeys.Right = false;
});

// Touch / On-screen Buttons
const setupBtn = (id, dir) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    const start = (e) => { e.preventDefault(); moveKeys[dir] = true; };
    const end = (e) => { e.preventDefault(); moveKeys[dir] = false; };

    btn.addEventListener("mousedown", start);
    btn.addEventListener("mouseup", end);
    btn.addEventListener("touchstart", start);
    btn.addEventListener("touchend", end);
};

setupBtn("btnUp", "Up");
setupBtn("btnDown", "Down");
setupBtn("btnLeft", "Left");
setupBtn("btnRight", "Right");

// Logic to close the Level Complete Panel
const panelCloseBtn = document.getElementById("panelCloseBtn");

if (panelCloseBtn) {
    panelCloseBtn.addEventListener("click", () => {
        location.reload();
    });
}

// Panel Buttons
document.getElementById("homeBtn").addEventListener("click", () => {
    window.location.href = "../home_page/home.html";
});
document.getElementById("nextBtn").addEventListener("click", () => {
    let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;
    if (unlockedLevel < 13) {
        localStorage.setItem('unlockedLevel', 13);
    }
    window.location.href = "../level_page/levels11-15.html";
});