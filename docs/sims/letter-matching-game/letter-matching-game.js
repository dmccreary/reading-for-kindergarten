// Letter Matching Game MicroSim
// Match uppercase letters to their lowercase partners
// Educational MicroSim for Kindergarten Reading

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
// the sum of the button width and the label/value 
let sliderLeftMargin = 210;

let topRowX = 100;
let bottomRowX = 280;

// Game state
let uppercaseCards = [];
let lowercaseCards = [];
let selectedCard = null;
let matchedPairs = [];
let score = 0;
let attempts = 0;
let gameComplete = false;
let showCelebration = false;
let celebrationTimer = 0;
let showSadFace = false;
let sadFaceTimer = 0;
let showHappyFace = false;
let happyFaceTimer = 0;

// Card dimensions
let cardWidth = 60;
let cardHeight = 70;
let cardSpacing = 10;

// Letters to use (subset for manageable game)
let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let currentLetterSet = [];

// UI elements
let newGameButton;
let difficultySlider;

// Colors
let cardColor;
let selectedColor;
let matchedColor;
let uppercaseColor;
let lowercaseColor;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize colors
    cardColor = color(255, 255, 240); // Ivory
    selectedColor = color(255, 220, 100); // Gold highlight
    matchedColor = color(144, 238, 144); // Light green
    uppercaseColor = color(100, 149, 237); // Cornflower blue
    lowercaseColor = color(255, 127, 80); // Coral

    // Create UI elements
    newGameButton = createButton('New Game');
    newGameButton.position(margin, drawHeight + 10);
    newGameButton.mousePressed(startNewGame);
    newGameButton.style('font-size', '16px');
    newGameButton.style('padding', '5px 15px');

    difficultySlider = createSlider(4, 8, 6, 1);
    difficultySlider.position(sliderLeftMargin, drawHeight + 15);
    difficultySlider.size(canvasWidth - 100 - sliderLeftMargin - margin*2);
    difficultySlider.input(startNewGame);

    // Start the game
    startNewGame();

    describe('Letter matching game where students match uppercase letters to lowercase letters', LABEL);
}

function startNewGame() {
    let numPairs = difficultySlider.value();
    currentLetterSet = shuffle(letters.slice()).slice(0, numPairs);

    uppercaseCards = [];
    lowercaseCards = [];
    selectedCard = null;
    matchedPairs = [];
    score = 0;
    attempts = 0;
    gameComplete = false;
    showCelebration = false;
    showSadFace = false;
    sadFaceTimer = 0;
    showHappyFace = false;
    happyFaceTimer = 0;

    // Create and shuffle cards
    let allUppercase = [];
    let allLowercase = [];

    for (let letter of currentLetterSet) {
        allUppercase.push({
            letter: letter,
            isUppercase: true,
            matched: false
        });
        allLowercase.push({
            letter: letter.toLowerCase(),
            isUppercase: false,
            matched: false
        });
    }

    // Shuffle both arrays
    allUppercase = shuffle(allUppercase);
    allLowercase = shuffle(allLowercase);

    // Position uppercase cards (top section)
    let numCards = currentLetterSet.length;
    let totalWidth = numCards * cardWidth + (numCards - 1) * cardSpacing;
    let startX = (canvasWidth - totalWidth) / 2;

    // Position uppercase cards (top section)
    for (let i = 0; i < allUppercase.length; i++) {
        allUppercase[i].x = startX + i * (cardWidth + cardSpacing);
        allUppercase[i].y = topRowX;
        uppercaseCards.push(allUppercase[i]);
    }

    // Position lowercase cards (bottom section)
    for (let i = 0; i < allLowercase.length; i++) {
        allLowercase[i].x = startX + i * (cardWidth + cardSpacing);
        allLowercase[i].y = bottomRowX;
        lowercaseCards.push(allLowercase[i]);
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
    text('Letter Matching Game', canvasWidth / 2, 10);

    // Instructions
    textSize(16);
    fill(80);
    text('Match uppercase letters to lowercase letters', canvasWidth / 2, 40);

    // Section labels
    textSize(18);
    fill(uppercaseColor);
    textAlign(LEFT, CENTER);
    text('UPPERCASE', margin, 40 + cardHeight / 2);

    fill(lowercaseColor);
    text('lowercase', margin, 220 + cardHeight / 2);

    // Draw uppercase cards
    for (let card of uppercaseCards) {
        drawCard(card);
    }

    // Draw lowercase cards
    for (let card of lowercaseCards) {
        drawCard(card);
    }

    // Draw connection line if card is selected and not matched
    if (selectedCard && !selectedCard.matched) {
        stroke(100, 100, 255, 150);
        strokeWeight(3);
        let cardCenterX = selectedCard.x + cardWidth / 2;
        let cardCenterY = selectedCard.y + cardHeight / 2;
        line(cardCenterX, cardCenterY, mouseX, mouseY);
    }

    // Draw matched lines
    strokeWeight(3);
    for (let pair of matchedPairs) {
        stroke(50, 200, 50, 200);
        let x1 = pair.upper.x + cardWidth / 2;
        let y1 = pair.upper.y + cardHeight / 2;
        let x2 = pair.lower.x + cardWidth / 2;
        let y2 = pair.lower.y + cardHeight / 2;
        line(x1, y1, x2, y2);
    }

    // Score display
    textSize(18);
    textAlign(RIGHT, TOP);
    fill(50);
    noStroke();
    text('Score: ' + score + '/' + currentLetterSet.length, canvasWidth - margin, 10);
    text('Attempts: ' + attempts, canvasWidth - margin, 35);

    // Celebration animation
    if (showCelebration) {
        drawCelebration();
    }

    // Sad face for wrong matches
    if (showSadFace) {
        drawSadFace();
    }

    // Happy face for correct matches
    if (showHappyFace) {
        drawHappyFace();
    }

    // Control labels
    textSize(16);
    textAlign(LEFT, CENTER);
    fill(50);
    noStroke();
    text('Pairs: ' + difficultySlider.value(), 150, drawHeight + 25);
}

function drawCard(card) {
    let x = card.x;
    let y = card.y;

    // Card shadow
    noStroke();
    fill(180);
    rect(x + 3, y + 3, cardWidth, cardHeight, 8);

    // Card background
    if (card.matched) {
        fill(matchedColor);
    } else if (card === selectedCard) {
        fill(selectedColor);
    } else {
        fill(cardColor);
    }

    stroke(card.isUppercase ? uppercaseColor : lowercaseColor);
    strokeWeight(3);
    rect(x, y, cardWidth, cardHeight, 8);

    // Letter
    noStroke();
    fill(card.isUppercase ? uppercaseColor : lowercaseColor);
    textSize(36);
    textAlign(CENTER, CENTER);
    text(card.letter, x + cardWidth / 2, y + cardHeight / 2);
}

function drawCelebration() {
    celebrationTimer++;

    // Draw stars
    for (let i = 0; i < 20; i++) {
        let x = random(canvasWidth);
        let y = random(drawHeight);
        let size = random(10, 30);
        fill(random(200, 255), random(200, 255), 0);
        noStroke();
        drawStar(x, y, size / 2, size, 5);
    }

    // Victory message
    fill(50, 150, 50);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Great Job!', canvasWidth / 2, drawHeight / 2 - 20);
    textSize(20);
    text('You matched all the letters!', canvasWidth / 2, drawHeight / 2 + 20);

    if (celebrationTimer > 180) {
        showCelebration = false;
        celebrationTimer = 0;
    }
}

function drawSadFace() {
    sadFaceTimer++;

    let faceX = canvasWidth - 50;
    let faceY = drawHeight / 2;
    let faceSize = 50;

    // Face circle (yellow)
    fill(255, 220, 100);
    stroke(200, 170, 50);
    strokeWeight(2);
    ellipse(faceX, faceY, faceSize, faceSize);

    // Eyes
    fill(50);
    noStroke();
    ellipse(faceX - 10, faceY - 8, 6, 6);
    ellipse(faceX + 10, faceY - 8, 6, 6);

    // Sad mouth (arc curving down)
    noFill();
    stroke(50);
    strokeWeight(3);
    arc(faceX, faceY + 12, 20, 12, PI, TWO_PI);

    // Hide after 1 second (60 frames at 60fps)
    if (sadFaceTimer > 60) {
        showSadFace = false;
        sadFaceTimer = 0;
    }
}

function drawHappyFace() {
    happyFaceTimer++;

    let faceX = canvasWidth - 50;
    let faceY = drawHeight / 2;
    let faceSize = 50;

    // Face circle (yellow)
    fill(255, 220, 100);
    stroke(200, 170, 50);
    strokeWeight(2);
    ellipse(faceX, faceY, faceSize, faceSize);

    // Eyes
    fill(50);
    noStroke();
    ellipse(faceX - 10, faceY - 8, 6, 6);
    ellipse(faceX + 10, faceY - 8, 6, 6);

    // Happy mouth (arc curving up)
    noFill();
    stroke(50);
    strokeWeight(3);
    arc(faceX, faceY + 5, 20, 12, 0, PI);

    // Hide after 1 second (60 frames at 60fps)
    if (happyFaceTimer > 60) {
        showHappyFace = false;
        happyFaceTimer = 0;
    }
}

function drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

// Start dragging from any card (uppercase or lowercase)
function mousePressed() {
    if (gameComplete) return;

    // Check uppercase cards
    for (let card of uppercaseCards) {
        if (!card.matched && isMouseOverCard(card)) {
            selectedCard = card;
            return;
        }
    }

    // Check lowercase cards
    for (let card of lowercaseCards) {
        if (!card.matched && isMouseOverCard(card)) {
            selectedCard = card;
            return;
        }
    }
}

// Release to complete the match
function mouseReleased() {
    if (!selectedCard || gameComplete) {
        selectedCard = null;
        return;
    }

    // Find target card under mouse
    let targetCard = null;

    // Check uppercase cards
    for (let card of uppercaseCards) {
        if (!card.matched && isMouseOverCard(card) && card !== selectedCard) {
            targetCard = card;
            break;
        }
    }

    // Check lowercase cards
    if (!targetCard) {
        for (let card of lowercaseCards) {
            if (!card.matched && isMouseOverCard(card) && card !== selectedCard) {
                targetCard = card;
                break;
            }
        }
    }

    // Check for valid match attempt (must be different rows)
    if (targetCard && targetCard.isUppercase !== selectedCard.isUppercase) {
        attempts++;

        // Determine which is uppercase and which is lowercase
        let upperCard = selectedCard.isUppercase ? selectedCard : targetCard;
        let lowerCard = selectedCard.isUppercase ? targetCard : selectedCard;

        // Check if letters match
        if (upperCard.letter.toLowerCase() === lowerCard.letter) {
            // Match found!
            upperCard.matched = true;
            lowerCard.matched = true;
            matchedPairs.push({
                upper: upperCard,
                lower: lowerCard
            });
            score++;

            // Show happy face for correct match
            showHappyFace = true;
            happyFaceTimer = 0;

            // Check for game completion
            if (score === currentLetterSet.length) {
                gameComplete = true;
                showCelebration = true;
                celebrationTimer = 0;
            }
        } else {
            // Wrong match - show sad face
            showSadFace = true;
            sadFaceTimer = 0;
        }
    }

    // Always deselect after release
    selectedCard = null;
}

function isMouseOverCard(card) {
    return mouseX >= card.x && mouseX <= card.x + cardWidth &&
           mouseY >= card.y && mouseY <= card.y + cardHeight;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Reposition cards
    let numCards = currentLetterSet.length;
    let totalWidth = numCards * cardWidth + (numCards - 1) * cardSpacing;
    let startX = (canvasWidth - totalWidth) / 2;

    for (let i = 0; i < uppercaseCards.length; i++) {
        uppercaseCards[i].x = startX + i * (cardWidth + cardSpacing);
    }

    for (let i = 0; i < lowercaseCards.length; i++) {
        lowercaseCards[i].x = startX + i * (cardWidth + cardSpacing);
    }
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;

        // Adjust card size based on width
        let numCards = currentLetterSet ? currentLetterSet.length : 6;
        let availableWidth = canvasWidth - 2 * margin;
        let maxCardWidth = (availableWidth - (numCards - 1) * cardSpacing) / numCards;
        cardWidth = min(60, maxCardWidth);
        cardHeight = cardWidth * 1.17;

        // Update slider size
        if (typeof difficultySlider !== 'undefined') {
            difficultySlider.size(canvasWidth - 200 - margin);
        }
    }
}
