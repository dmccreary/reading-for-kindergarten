// Sight Word Bingo MicroSim
// Listen and find sight words on a bingo card
// Designed for kindergarten students learning high-frequency words

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Sight words for bingo
const allSightWords = [
  'a', 'and', 'big', 'blue', 'can', 'come', 'down', 'find',
  'for', 'go', 'help', 'here', 'I', 'in', 'is', 'it',
  'jump', 'look', 'me', 'my', 'not', 'one', 'play', 'red',
  'run', 'see', 'the', 'to', 'two', 'up', 'we', 'you',
  'all', 'am', 'are', 'at', 'be', 'do', 'eat', 'get',
  'good', 'have', 'like', 'new', 'no', 'now', 'on', 'out'
];

// Game state
let gridSize = 3; // 3x3 default
let bingoCard = [];
let markedCells = [];
let calledWords = [];
let currentWord = '';
let gameWon = false;
let winningCells = [];

// UI state
let cellSize;
let gridStartX, gridStartY;

// Animation state
let celebrationParticles = [];
let showingCurrentWord = false;
let wordDisplayTimer = 0;

// UI Elements
let callButton, repeatButton, newGameButton, sizeSelect, showWordCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  let buttonY = drawHeight + 10;

  // Create Call Word button
  callButton = createButton('Call Word');
  callButton.position(margin, buttonY);
  callButton.mousePressed(callNewWord);
  callButton.style('font-size', '14px');
  callButton.style('padding', '8px 12px');
  callButton.style('background-color', '#2196F3');
  callButton.style('color', 'white');
  callButton.style('border', 'none');
  callButton.style('border-radius', '5px');
  callButton.style('cursor', 'pointer');

  // Create Repeat Word button
  repeatButton = createButton('Repeat');
  repeatButton.position(margin + 90, buttonY);
  repeatButton.mousePressed(repeatWord);
  repeatButton.style('font-size', '14px');
  repeatButton.style('padding', '8px 12px');
  repeatButton.style('background-color', '#FF9800');
  repeatButton.style('color', 'white');
  repeatButton.style('border', 'none');
  repeatButton.style('border-radius', '5px');
  repeatButton.style('cursor', 'pointer');

  // Create New Game button
  newGameButton = createButton('New Card');
  newGameButton.position(margin + 165, buttonY);
  newGameButton.mousePressed(startNewGame);
  newGameButton.style('font-size', '14px');
  newGameButton.style('padding', '8px 12px');
  newGameButton.style('background-color', '#4CAF50');
  newGameButton.style('color', 'white');
  newGameButton.style('border', 'none');
  newGameButton.style('border-radius', '5px');
  newGameButton.style('cursor', 'pointer');

  // Create grid size selector
  sizeSelect = createSelect();
  sizeSelect.position(margin + 255, buttonY);
  sizeSelect.option('3×3', '3');
  sizeSelect.option('4×4', '4');
  sizeSelect.option('5×5', '5');
  sizeSelect.selected('3×3');
  sizeSelect.changed(startNewGame);
  sizeSelect.style('font-size', '14px');
  sizeSelect.style('padding', '8px 8px');

  // Create Show Word checkbox (off by default)
  showWordCheckbox = createCheckbox('Show Word', false);
  showWordCheckbox.position(margin + 320, buttonY + 5);
  showWordCheckbox.style('font-size', '14px');

  textFont('Arial');
  startNewGame();

  describe('Sight Word Bingo for matching spoken words to cards', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('#E3F2FD');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  fill('#1565C0');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Sight Word Bingo', canvasWidth / 2, 8);

  // Draw current word display
  drawCurrentWord();

  // Draw bingo card
  drawBingoCard();

  // Draw instructions
  drawInstructions();

  // Draw celebration if game won
  if (gameWon) {
    drawCelebration();
    updateCelebration();
  }

  // Update word display timer
  if (showingCurrentWord) {
    wordDisplayTimer--;
    if (wordDisplayTimer <= 0) {
      showingCurrentWord = false;
    }
  }
}

function drawCurrentWord() {
  // Current word display box
  let boxY = 38;
  let boxHeight = 55;

  fill(255, 255, 255, 240);
  stroke('#2196F3');
  strokeWeight(3);
  rect(canvasWidth / 2 - 100, boxY, 200, boxHeight, 10);

  if (currentWord) {
    fill('#1565C0');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('Listen for:', canvasWidth / 2, boxY + 8);

    if (showWordCheckbox.checked()) {
      textSize(32);
      textAlign(CENTER, CENTER);
      text(currentWord, canvasWidth / 2, boxY + boxHeight / 2 + 8);
    } else {
      // Show hint that word is audio-only
      fill('#999');
      textSize(16);
      textAlign(CENTER, CENTER);
      text('(listen carefully)', canvasWidth / 2, boxY + boxHeight / 2 + 8);
    }
  } else {
    fill('#666');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Click "Call Word" to start!', canvasWidth / 2, boxY + boxHeight / 2);
  }
}

function drawBingoCard() {
  let gridWidth = min(canvasWidth - 40, 350);
  cellSize = gridWidth / gridSize;

  let totalGridWidth = cellSize * gridSize;
  let totalGridHeight = cellSize * gridSize;

  gridStartX = (canvasWidth - totalGridWidth) / 2;
  gridStartY = 110;

  // Draw cells
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let index = row * gridSize + col;
      let x = gridStartX + col * cellSize;
      let y = gridStartY + row * cellSize;
      let word = bingoCard[index];
      let isMarked = markedCells[index];
      let isWinning = winningCells.includes(index);

      // Cell background
      if (isWinning && gameWon) {
        fill('#FFD54F');
      } else if (isMarked) {
        fill('#81C784');
      } else {
        fill('white');
      }

      stroke('#1565C0');
      strokeWeight(2);
      rect(x, y, cellSize, cellSize);

      // Word text
      if (isMarked) {
        fill('#1B5E20');
      } else {
        fill('#1565C0');
      }
      noStroke();

      // Adjust font size based on grid size
      let fontSize = gridSize === 3 ? 24 : (gridSize === 4 ? 20 : 16);
      textSize(fontSize);
      textAlign(CENTER, CENTER);
      text(word, x + cellSize / 2, y + cellSize / 2);

      // Draw marker if marked
      if (isMarked) {
        fill(0, 100, 0, 60);
        noStroke();
        ellipse(x + cellSize / 2, y + cellSize / 2, cellSize * 0.7);
      }
    }
  }
}

function drawInstructions() {
  let instrY = gridStartY + cellSize * gridSize + 10;

  fill('#666');
  textSize(12);
  textAlign(CENTER, TOP);
  noStroke();
  text('Click "Call Word" to hear a word, then click that word on your card.', canvasWidth / 2, instrY);
  text('Get ' + gridSize + ' in a row (horizontal, vertical, or diagonal) to win!', canvasWidth / 2, instrY + 18);

  // Show called words count
  fill('#1565C0');
  textAlign(RIGHT, TOP);
  textSize(14);
  text('Words called: ' + calledWords.length, canvasWidth - margin, instrY + 50);
}

function mousePressed() {
  if (gameWon) return;

  // Check if clicked on a cell
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let index = row * gridSize + col;
      let x = gridStartX + col * cellSize;
      let y = gridStartY + row * cellSize;

      if (mouseX > x && mouseX < x + cellSize &&
          mouseY > y && mouseY < y + cellSize) {
        handleCellClick(index);
        return;
      }
    }
  }
}

function handleCellClick(index) {
  let word = bingoCard[index];

  // Check if word has been called
  if (calledWords.includes(word)) {
    if (!markedCells[index]) {
      markedCells[index] = true;
      playMarkSound();

      // Check for win
      checkForWin();
    }
  } else {
    // Word not called yet - play error sound
    playErrorSound();
  }
}

function callNewWord() {
  if (gameWon) return;

  // Get uncalled words from the card
  let uncalledOnCard = bingoCard.filter(word => !calledWords.includes(word));

  if (uncalledOnCard.length === 0) {
    // All words on card have been called
    return;
  }

  // Pick a random uncalled word from the card
  let randomIndex = floor(random(uncalledOnCard.length));
  currentWord = uncalledOnCard[randomIndex];
  calledWords.push(currentWord);

  // Speak the word
  speakWord(currentWord);
  playCallSound();

  showingCurrentWord = true;
  wordDisplayTimer = 120;
}

function checkForWin() {
  // Check rows
  for (let row = 0; row < gridSize; row++) {
    let rowWin = true;
    let cells = [];
    for (let col = 0; col < gridSize; col++) {
      let index = row * gridSize + col;
      cells.push(index);
      if (!markedCells[index]) rowWin = false;
    }
    if (rowWin) {
      triggerWin(cells);
      return;
    }
  }

  // Check columns
  for (let col = 0; col < gridSize; col++) {
    let colWin = true;
    let cells = [];
    for (let row = 0; row < gridSize; row++) {
      let index = row * gridSize + col;
      cells.push(index);
      if (!markedCells[index]) colWin = false;
    }
    if (colWin) {
      triggerWin(cells);
      return;
    }
  }

  // Check diagonal (top-left to bottom-right)
  let diag1Win = true;
  let diag1Cells = [];
  for (let i = 0; i < gridSize; i++) {
    let index = i * gridSize + i;
    diag1Cells.push(index);
    if (!markedCells[index]) diag1Win = false;
  }
  if (diag1Win) {
    triggerWin(diag1Cells);
    return;
  }

  // Check diagonal (top-right to bottom-left)
  let diag2Win = true;
  let diag2Cells = [];
  for (let i = 0; i < gridSize; i++) {
    let index = i * gridSize + (gridSize - 1 - i);
    diag2Cells.push(index);
    if (!markedCells[index]) diag2Win = false;
  }
  if (diag2Win) {
    triggerWin(diag2Cells);
    return;
  }
}

function triggerWin(cells) {
  gameWon = true;
  winningCells = cells;
  createCelebration();
  playWinSound();

  // Announce BINGO
  setTimeout(() => {
    if ('speechSynthesis' in window) {
      let utterance = new SpeechSynthesisUtterance('Bingo! You win!');
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  }, 500);
}

function startNewGame() {
  gridSize = parseInt(sizeSelect.value());
  let numCells = gridSize * gridSize;

  // Select random words for the card
  let shuffledWords = shuffleArray([...allSightWords]);
  bingoCard = shuffledWords.slice(0, numCells);

  // Reset game state
  markedCells = new Array(numCells).fill(false);
  calledWords = [];
  currentWord = '';
  gameWon = false;
  winningCells = [];
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
  utterance.rate = 0.7;
  utterance.pitch = 1.1;
  speechSynthesis.speak(utterance);
}

function repeatWord() {
  if (currentWord) {
    speakWord(currentWord);
    playCallSound();
  }
}

function playCallSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  } catch (e) {}
}

function playMarkSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 600;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {}
}

function playErrorSound() {
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
    let melody = [523, 659, 784, 1047, 784, 659, 784, 1047];

    melody.forEach((freq, i) => {
      let oscillator = audioContext.createOscillator();
      let gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      let startTime = audioContext.currentTime + i * 0.12;
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  } catch (e) {}
}

function createCelebration() {
  celebrationParticles = [];
  for (let i = 0; i < 80; i++) {
    celebrationParticles.push({
      x: canvasWidth / 2,
      y: drawHeight / 2,
      vx: random(-8, 8),
      vy: random(-12, -3),
      size: random(10, 20),
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
    p.vy += 0.25;
    p.y += p.vy;
    p.rotation += p.rotationSpeed;
    p.life -= 2;
  }

  celebrationParticles = celebrationParticles.filter(p => p.life > 0 && p.y < canvasHeight);
}

function drawCelebration() {
  // Win message
  fill(255, 255, 255, 240);
  stroke('#FFD700');
  strokeWeight(4);
  rect(canvasWidth / 2 - 100, drawHeight / 2 - 40, 200, 80, 15);

  fill('#1565C0');
  noStroke();
  textSize(36);
  textAlign(CENTER, CENTER);
  text('BINGO!', canvasWidth / 2, drawHeight / 2 - 5);

  textSize(14);
  fill('#666');
  text('Click "New Card" to play again', canvasWidth / 2, drawHeight / 2 + 25);

  // Draw particles
  for (let p of celebrationParticles) {
    push();
    translate(p.x, p.y);
    rotate(p.rotation);
    fill(red(p.color), green(p.color), blue(p.color), p.life);
    noStroke();
    // Draw star shape
    beginShape();
    for (let i = 0; i < 5; i++) {
      let angle = TWO_PI * i / 5 - HALF_PI;
      let outerX = cos(angle) * p.size / 2;
      let outerY = sin(angle) * p.size / 2;
      vertex(outerX, outerY);
      angle += TWO_PI / 10;
      let innerX = cos(angle) * p.size / 4;
      let innerY = sin(angle) * p.size / 4;
      vertex(innerX, innerY);
    }
    endShape(CLOSE);
    pop();
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
