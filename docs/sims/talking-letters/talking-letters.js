// Talking Letters MicroSim
// Click on letters to hear them spoken aloud
// Educational MicroSim for Kindergarten Reading
// Uses Web Speech API for audio

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Letter grid settings
let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let letterBoxes = [];
let boxSize = 50;
let boxSpacing = 8;
let cols = 7;

// State
let selectedLetter = null;
let speakingLetter = null;
let showUppercase = false;

// UI elements
let caseToggle;

// Colors
let boxColor;
let hoverColor;
let speakingColor;
let textColor;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize colors
    boxColor = color(255, 255, 240); // Ivory
    hoverColor = color(255, 240, 200); // Light yellow
    speakingColor = color(144, 238, 144); // Light green
    textColor = color(100, 149, 237); // Cornflower blue

    // Create case toggle checkbox
    caseToggle = createCheckbox(' Uppercase', false);
    caseToggle.position(margin, drawHeight + 15);
    caseToggle.style('font-size', '16px');
    caseToggle.changed(() => {
        showUppercase = caseToggle.checked();
    });

    // Create letter boxes
    createLetterBoxes();

    describe('Interactive alphabet where clicking letters speaks them aloud using text-to-speech', LABEL);
}

function createLetterBoxes() {
    letterBoxes = [];

    let numLetters = letters.length;
    let rows = ceil(numLetters / cols);

    // Available space for the grid
    let topMargin = 60;  // Space for title
    let sideMargin = margin;
    let availableWidth = canvasWidth - (2 * sideMargin);
    let availableHeight = drawHeight - topMargin - margin;

    // Calculate box size to fill available space
    let maxBoxWidth = (availableWidth - (cols - 1) * boxSpacing) / cols;
    let maxBoxHeight = (availableHeight - (rows - 1) * boxSpacing) / rows;

    // Use the smaller dimension to keep boxes square
    boxSize = floor(min(maxBoxWidth, maxBoxHeight));

    // Calculate actual grid dimensions
    let gridWidth = cols * boxSize + (cols - 1) * boxSpacing;
    let gridHeight = rows * boxSize + (rows - 1) * boxSpacing;

    // Center the grid
    let startX = (canvasWidth - gridWidth) / 2;
    let startY = topMargin + (availableHeight - gridHeight) / 2;

    for (let i = 0; i < numLetters; i++) {
        let row = floor(i / cols);
        let col = i % cols;

        letterBoxes.push({
            letter: letters[i],
            x: startX + col * (boxSize + boxSpacing),
            y: startY + row * (boxSize + boxSpacing),
            width: boxSize,
            height: boxSize
        });
    }
}

function draw() {
    updateCanvasSize();

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill(50);
    noStroke();
    textSize(24);
    textAlign(CENTER, TOP);
    text('Talking Letters', canvasWidth / 2, 10);

    // Instructions
    textSize(16);
    fill(80);
    text('Click a letter to hear it spoken', canvasWidth / 2, 40);

    // Draw letter boxes
    for (let box of letterBoxes) {
        drawLetterBox(box);
    }

    // Draw large speaking letter display
    if (speakingLetter) {
        drawSpeakingDisplay();
    }
}

function drawLetterBox(box) {
    let isHovered = isMouseOverBox(box);
    let isSpeaking = speakingLetter === box.letter;

    // Box shadow
    noStroke();
    fill(180);
    rect(box.x + 2, box.y + 2, box.width, box.height, 8);

    // Box background
    if (isSpeaking) {
        fill(speakingColor);
    } else if (isHovered) {
        fill(hoverColor);
    } else {
        fill(boxColor);
    }

    stroke(textColor);
    strokeWeight(2);
    rect(box.x, box.y, box.width, box.height, 8);

    // Letter - scale text size with box size
    noStroke();
    fill(textColor);
    textSize(boxSize * 0.55);
    textAlign(CENTER, CENTER);

    let displayLetter = showUppercase ? box.letter : box.letter.toLowerCase();
    text(displayLetter, box.x + box.width / 2, box.y + box.height / 2);
}

function drawSpeakingDisplay() {
    // Large letter display in center-right area
    let displayX = canvasWidth - 80;
    let displayY = drawHeight - 80;
    let displaySize = 100;

    // Background circle
    fill(speakingColor);
    stroke(100, 200, 100);
    strokeWeight(3);
    ellipse(displayX, displayY, displaySize, displaySize);

    // Large letter
    noStroke();
    fill(50);
    textSize(48);
    textAlign(CENTER, CENTER);

    let displayLetter = showUppercase ? speakingLetter : speakingLetter.toLowerCase();
    text(displayLetter, displayX, displayY);

    // Sound waves animation
    drawSoundWaves(displayX, displayY, displaySize);
}

function drawSoundWaves(x, y, baseSize) {
    noFill();
    stroke(100, 200, 100, 150);
    strokeWeight(2);

    let time = millis() / 200;
    for (let i = 1; i <= 3; i++) {
        let waveSize = baseSize + i * 15 + sin(time + i) * 5;
        let alpha = map(i, 1, 3, 150, 50);
        stroke(100, 200, 100, alpha);
        arc(x + baseSize/2 - 10, y, waveSize * 0.4, waveSize * 0.6, -PI/3, PI/3);
    }
}

function speakLetter(letter) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    // Create utterance
    let textToSpeak = showUppercase ? letter : letter.toLowerCase();
    let utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Configure voice settings for clarity
    utterance.rate = 0.8;  // Slightly slower for young learners
    utterance.pitch = 1.1; // Slightly higher pitch
    utterance.volume = 1.0;

    // Set speaking state
    speakingLetter = letter;

    // Clear speaking state when done
    utterance.onend = () => {
        speakingLetter = null;
    };

    utterance.onerror = () => {
        speakingLetter = null;
    };

    // Speak the letter
    speechSynthesis.speak(utterance);
}

function mousePressed() {
    // Check if clicked on a letter box
    for (let box of letterBoxes) {
        if (isMouseOverBox(box)) {
            speakLetter(box.letter);
            return;
        }
    }
}

function isMouseOverBox(box) {
    return mouseX >= box.x && mouseX <= box.x + box.width &&
           mouseY >= box.y && mouseY <= box.y + box.height;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    createLetterBoxes();
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;

        // Adjust columns based on width for optimal layout
        if (canvasWidth < 350) {
            cols = 5;
        } else if (canvasWidth < 450) {
            cols = 6;
        } else if (canvasWidth < 550) {
            cols = 7;
        } else {
            cols = 9;
        }

        // Recreate letter boxes if they exist (box size calculated in createLetterBoxes)
        if (letterBoxes.length > 0) {
            createLetterBoxes();
        }
    }
}
