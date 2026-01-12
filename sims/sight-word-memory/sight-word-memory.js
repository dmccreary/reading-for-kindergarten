// Sight Word Memory MicroSim
// Match pairs of sight word cards in a classic memory game format
// Designed for kindergarten students learning high-frequency words

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Sight words for the game (subset of Dolch list)
const allSightWords = [
  'a', 'and', 'big', 'blue', 'can', 'come', 'down', 'find',
  'for', 'go', 'help', 'here', 'I', 'in', 'is', 'it',
  'jump', 'look', 'me', 'my', 'not', 'one', 'play', 'red',
  'run', 'see', 'the', 'to', 'two', 'up', 'we', 'you'
];

// Game state
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
let gridSize = 4; // 4x4 = 16 cards = 8 pairs
let gameWon = false;
let isProcessing = false;
let cardWidth, cardHeight;
let gridStartX, gridStartY;

// Animation state
let celebrationParticles = [];
let showingMatch = false;
let matchTimer = 0;

// UI Elements
let newGameButton, sizeSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create New Game button
  newGameButton = createButton('New Game');
  newGameButton.position(margin, drawHeight + 15);
  newGameButton.mousePressed(startNewGame);
  newGameButton.style('font-size', '14px');
  newGameButton.style('padding', '8px 16px');
  newGameButton.style('background-color', '#4CAF50');
  newGameButton.style('color', 'white');
  newGameButton.style('border', 'none');
  newGameButton.style('border-radius', '5px');
  newGameButton.style('cursor', 'pointer');

  // Create grid size selector
  sizeSelect = createSelect();
  sizeSelect.position(margin + 110, drawHeight + 15);
  sizeSelect.option('Easy (2x3)', '2x3');
  sizeSelect.option('Medium (4x3)', '4x3');
  sizeSelect.option('Hard (4x4)', '4x4');
  sizeSelect.selected('Medium (4x3)');
  sizeSelect.changed(startNewGame);
  sizeSelect.style('font-size', '14px');
  sizeSelect.style('padding', '8px 12px');

  textFont('Arial');
  startNewGame();

  describe('Sight Word Memory Game for matching pairs of high-frequency words', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('#E8F5E9');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  fill('#2E7D32');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Sight Word Memory', canvasWidth / 2, 8);

  // Draw stats
  drawStats();

  // Draw cards
  drawCards();

  // Draw celebration if game won
  if (gameWon) {
    drawCelebration();
    updateCelebration();
  }

  // Process match timer
  if (showingMatch) {
    matchTimer--;
    if (matchTimer <= 0) {
      processMatchResult();
    }
  }
}

function drawStats() {
  fill(255, 255, 255, 230);
  stroke('#4CAF50');
  strokeWeight(2);
  rect(canvasWidth - 140, 40, 130, 55, 8);

  fill('#333');
  noStroke();
  textSize(13);
  textAlign(CENTER, CENTER);

  let totalPairs = cards.length / 2;
  text('Pairs: ' + matchedPairs + ' / ' + totalPairs, canvasWidth - 75, 55);
  text('Attempts: ' + attempts, canvasWidth - 75, 75);
}

function drawCards() {
  for (let card of cards) {
    drawCard(card);
  }
}

function drawCard(card) {
  let x = card.x;
  let y = card.y;

  // Skip drawing matched cards (they disappear)
  if (card.matched) {
    // Draw empty space with slight glow
    fill(200, 230, 200, 100);
    noStroke();
    rect(x, y, cardWidth, cardHeight, 8);
    return;
  }

  // Card shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(x + 3, y + 3, cardWidth, cardHeight, 8);

  if (card.faceUp) {
    // Face up - show word
    fill('#FFFDE7');
    stroke('#FFA000');
    strokeWeight(3);
    rect(x, y, cardWidth, cardHeight, 8);

    // Word
    fill('#E65100');
    noStroke();
    textSize(min(28, cardWidth * 0.35));
    textAlign(CENTER, CENTER);
    text(card.word, x + cardWidth / 2, y + cardHeight / 2);
  } else {
    // Face down - show back
    fill('#4CAF50');
    stroke('#2E7D32');
    strokeWeight(3);
    rect(x, y, cardWidth, cardHeight, 8);

    // Star pattern on back
    fill('#81C784');
    noStroke();
    textSize(min(30, cardWidth * 0.4));
    textAlign(CENTER, CENTER);
    text('★', x + cardWidth / 2, y + cardHeight / 2);
  }
}

function mousePressed() {
  if (gameWon || isProcessing || showingMatch) return;

  // Check if clicked on a card
  for (let card of cards) {
    if (card.matched || card.faceUp) continue;

    if (mouseX > card.x && mouseX < card.x + cardWidth &&
        mouseY > card.y && mouseY < card.y + cardHeight) {
      flipCard(card);
      break;
    }
  }
}

function flipCard(card) {
  card.faceUp = true;
  flippedCards.push(card);
  speakWord(card.word);
  playFlipSound();

  if (flippedCards.length === 2) {
    attempts++;
    showingMatch = true;
    matchTimer = 60; // About 1 second delay
  }
}

function processMatchResult() {
  showingMatch = false;

  let card1 = flippedCards[0];
  let card2 = flippedCards[1];

  if (card1.word === card2.word) {
    // Match found!
    card1.matched = true;
    card2.matched = true;
    matchedPairs++;
    playSuccessSound();

    // Check for win
    if (matchedPairs === cards.length / 2) {
      gameWon = true;
      createCelebration();
      playWinSound();
    }
  } else {
    // No match - flip back
    card1.faceUp = false;
    card2.faceUp = false;
    playMismatchSound();
  }

  flippedCards = [];
}

function startNewGame() {
  // Parse grid size
  let sizeStr = sizeSelect.value();
  let cols, rows;

  if (sizeStr === '2x3') {
    cols = 3; rows = 2; // 6 cards = 3 pairs
  } else if (sizeStr === '4x3') {
    cols = 4; rows = 3; // 12 cards = 6 pairs
  } else {
    cols = 4; rows = 4; // 16 cards = 8 pairs
  }

  let numPairs = (cols * rows) / 2;

  // Select random words
  let shuffledWords = shuffleArray([...allSightWords]);
  let selectedWords = shuffledWords.slice(0, numPairs);

  // Create card pairs
  cards = [];
  for (let word of selectedWords) {
    cards.push({ word: word, faceUp: false, matched: false });
    cards.push({ word: word, faceUp: false, matched: false });
  }

  // Shuffle cards
  cards = shuffleArray(cards);

  // Calculate card positions
  let gridWidth = canvasWidth - 40;
  let gridHeight = drawHeight - 100;
  cardWidth = (gridWidth - (cols - 1) * 10) / cols;
  cardHeight = (gridHeight - (rows - 1) * 10) / rows;

  // Limit card size
  cardWidth = min(cardWidth, 100);
  cardHeight = min(cardHeight, 90);

  // Center the grid
  let totalGridWidth = cols * cardWidth + (cols - 1) * 10;
  let totalGridHeight = rows * cardHeight + (rows - 1) * 10;
  gridStartX = (canvasWidth - totalGridWidth) / 2;
  gridStartY = 70 + (drawHeight - 100 - totalGridHeight) / 2;

  // Assign positions
  for (let i = 0; i < cards.length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    cards[i].x = gridStartX + col * (cardWidth + 10);
    cards[i].y = gridStartY + row * (cardHeight + 10);
  }

  // Reset game state
  flippedCards = [];
  matchedPairs = 0;
  attempts = 0;
  gameWon = false;
  isProcessing = false;
  showingMatch = false;
  celebrationParticles = [];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function speakWord(word) {
  if (!('speechSynthesis' in window)) return;

  speechSynthesis.cancel();
  let utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = 0.8;
  utterance.pitch = 1.1;
  speechSynthesis.speak(utterance);
}

function playFlipSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 500;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {}
}

function playSuccessSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let notes = [523, 659, 784];

    notes.forEach((freq, i) => {
      let oscillator = audioContext.createOscillator();
      let gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      let startTime = audioContext.currentTime + i * 0.1;
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.15);
    });
  } catch (e) {}
}

function playMismatchSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 200;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (e) {}
}

function playWinSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let melody = [523, 587, 659, 698, 784, 880, 988, 1047];

    melody.forEach((freq, i) => {
      let oscillator = audioContext.createOscillator();
      let gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      let startTime = audioContext.currentTime + i * 0.1;
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  } catch (e) {}
}

function createCelebration() {
  celebrationParticles = [];
  for (let i = 0; i < 100; i++) {
    celebrationParticles.push({
      x: canvasWidth / 2,
      y: drawHeight / 2,
      vx: random(-8, 8),
      vy: random(-10, -2),
      size: random(8, 16),
      color: color(random(255), random(255), random(255)),
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.2, 0.2),
      life: 255
    });
  }
}

function updateCelebration() {
  for (let p of celebrationParticles) {
    p.x += p.vx;
    p.vy += 0.2; // gravity
    p.y += p.vy;
    p.rotation += p.rotationSpeed;
    p.life -= 2;
  }

  celebrationParticles = celebrationParticles.filter(p => p.life > 0 && p.y < canvasHeight);
}

function drawCelebration() {
  // Win message
  fill(255, 255, 255, 230);
  stroke('#4CAF50');
  strokeWeight(4);
  rect(canvasWidth / 2 - 120, drawHeight / 2 - 50, 240, 100, 15);

  fill('#2E7D32');
  noStroke();
  textSize(32);
  textAlign(CENTER, CENTER);
  text('You Win!', canvasWidth / 2, drawHeight / 2 - 15);

  textSize(16);
  fill('#666');
  text('Found all pairs in ' + attempts + ' tries!', canvasWidth / 2, drawHeight / 2 + 20);

  // Draw particles
  for (let p of celebrationParticles) {
    push();
    translate(p.x, p.y);
    rotate(p.rotation);
    fill(red(p.color), green(p.color), blue(p.color), p.life);
    noStroke();
    rectMode(CENTER);
    rect(0, 0, p.size, p.size, 2);
    pop();
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  // Recalculate card positions
  if (cards.length > 0) {
    let sizeStr = sizeSelect.value();
    let cols;
    if (sizeStr === '2x3') cols = 3;
    else if (sizeStr === '4x3') cols = 4;
    else cols = 4;

    let rows = cards.length / cols;

    let gridWidth = canvasWidth - 40;
    let gridHeight = drawHeight - 100;
    cardWidth = (gridWidth - (cols - 1) * 10) / cols;
    cardHeight = (gridHeight - (rows - 1) * 10) / rows;
    cardWidth = min(cardWidth, 100);
    cardHeight = min(cardHeight, 90);

    let totalGridWidth = cols * cardWidth + (cols - 1) * 10;
    let totalGridHeight = rows * cardHeight + (rows - 1) * 10;
    gridStartX = (canvasWidth - totalGridWidth) / 2;
    gridStartY = 70 + (drawHeight - 100 - totalGridHeight) / 2;

    for (let i = 0; i < cards.length; i++) {
      let col = i % cols;
      let row = floor(i / cols);
      cards[i].x = gridStartX + col * (cardWidth + 10);
      cards[i].y = gridStartY + row * (cardHeight + 10);
    }
  }
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
