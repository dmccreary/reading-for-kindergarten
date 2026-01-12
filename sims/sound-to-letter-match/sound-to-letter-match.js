// Sound-to-Letter Match MicroSim
// Hear a sound and click the letter that makes it
// Designed for kindergarten students learning sound-to-letter correspondence

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Letter-sound data (focusing on unambiguous mappings)
const letterSounds = {
  'B': {sound: 'buh', hint: 'ball'},
  'D': {sound: 'duh', hint: 'dog'},
  'F': {sound: 'fff', hint: 'fish'},
  'G': {sound: 'guh', hint: 'goat'},
  'H': {sound: 'huh', hint: 'hat'},
  'J': {sound: 'juh', hint: 'jump'},
  'L': {sound: 'lll', hint: 'lion'},
  'M': {sound: 'mmm', hint: 'mom'},
  'N': {sound: 'nnn', hint: 'nose'},
  'P': {sound: 'puh', hint: 'pig'},
  'R': {sound: 'rrr', hint: 'run'},
  'S': {sound: 'sss', hint: 'sun'},
  'T': {sound: 'tuh', hint: 'top'},
  'V': {sound: 'vvv', hint: 'van'},
  'W': {sound: 'wuh', hint: 'water'},
  'Z': {sound: 'zzz', hint: 'zebra'}
};

const letters = Object.keys(letterSounds);

// Game state
let targetLetter = null;
let score = 0;
let attempts = 0;
let round = 0;
let maxRounds = 5;
let showResult = false;
let resultCorrect = false;
let selectedLetter = null;
let letterButtons = [];
let particles = [];
let showHint = false;

// UI Elements
let playSoundButton, hintButton, newGameButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create Play Sound button
  playSoundButton = createButton('Play Sound');
  playSoundButton.position(margin, drawHeight + 12);
  playSoundButton.mousePressed(playTargetSound);
  playSoundButton.style('font-size', '14px');
  playSoundButton.style('padding', '8px 14px');
  playSoundButton.style('background-color', '#4CAF50');
  playSoundButton.style('color', 'white');
  playSoundButton.style('border', 'none');
  playSoundButton.style('border-radius', '5px');
  playSoundButton.style('cursor', 'pointer');

  // Create Hint button
  hintButton = createButton('Hint');
  hintButton.position(margin + 110, drawHeight + 12);
  hintButton.mousePressed(toggleHint);
  hintButton.style('font-size', '14px');
  hintButton.style('padding', '8px 14px');
  hintButton.style('cursor', 'pointer');

  // Create New Game button
  newGameButton = createButton('New Game');
  newGameButton.position(canvasWidth - 100, drawHeight + 12);
  newGameButton.mousePressed(startNewGame);
  newGameButton.style('font-size', '14px');
  newGameButton.style('padding', '8px 14px');
  newGameButton.style('cursor', 'pointer');

  textFont('Arial');
  startNewGame();

  describe('Sound-to-Letter Match game where children hear sounds and find letters', LABEL);
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
  text('Sound-to-Letter Match', canvasWidth / 2, 8);

  // Draw score
  drawScoreArea();

  // Draw target sound area
  drawTargetArea();

  // Draw letter grid
  drawLetterGrid();

  // Draw result overlay
  if (showResult) {
    drawResult();
  }

  // Draw particles
  updateAndDrawParticles();
}

function drawScoreArea() {
  // Score box
  fill(255, 255, 255, 230);
  stroke('#4CAF50');
  strokeWeight(2);
  rect(canvasWidth - 120, 45, 110, 55, 8);

  fill('#333');
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Round: ' + round + '/' + maxRounds, canvasWidth - 65, 60);
  text('Score: ' + score + '/' + attempts, canvasWidth - 65, 80);
}

function drawTargetArea() {
  // Sound prompt box
  fill(255, 255, 255, 240);
  stroke('#2196F3');
  strokeWeight(3);
  rect(20, 45, canvasWidth - 150, 60, 10);

  // Prompt text
  fill('#1565C0');
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text('Listen to the sound, then find the letter!', canvasWidth/2 - 45, 65);

  // Hint display
  if (showHint && targetLetter) {
    fill('#FF9800');
    textSize(14);
    text('Hint: Think of "' + letterSounds[targetLetter].hint + '"', canvasWidth/2 - 45, 90);
  }
}

function drawLetterGrid() {
  if (letterButtons.length === 0) calculateLetterPositions();

  for (let btn of letterButtons) {
    let isSelected = (selectedLetter === btn.letter);
    let isCorrect = showResult && resultCorrect && btn.letter === targetLetter;
    let isWrong = showResult && !resultCorrect && btn.letter === selectedLetter;

    push();
    translate(btn.x + btn.size/2, btn.y + btn.size/2);

    // Button shadow
    fill(0, 0, 0, 25);
    noStroke();
    rect(-btn.size/2 + 3, 3, btn.size, btn.size, 10);

    // Button background
    if (isCorrect) {
      fill('#4CAF50');
      stroke('#2E7D32');
    } else if (isWrong) {
      fill('#FF5722');
      stroke('#D84315');
    } else if (isSelected) {
      fill('#FFC107');
      stroke('#FF9800');
    } else {
      fill('white');
      stroke('#90CAF9');
    }
    strokeWeight(2);
    rect(-btn.size/2, -btn.size/2, btn.size, btn.size, 10);

    // Letter
    if (isCorrect || isWrong) {
      fill('white');
    } else {
      fill('#1565C0');
    }
    noStroke();
    textSize(28);
    textAlign(CENTER, CENTER);
    text(btn.letter, 0, 0);

    pop();
  }
}

function calculateLetterPositions() {
  letterButtons = [];

  let cols = 4;
  let rows = 4;
  let buttonSize = 55;
  let spacing = 10;
  let totalWidth = cols * buttonSize + (cols - 1) * spacing;
  let totalHeight = rows * buttonSize + (rows - 1) * spacing;
  let startX = (canvasWidth - totalWidth) / 2;
  let startY = 130;

  for (let i = 0; i < letters.length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let x = startX + col * (buttonSize + spacing);
    let y = startY + row * (buttonSize + spacing);

    letterButtons.push({
      letter: letters[i],
      x: x,
      y: y,
      size: buttonSize
    });
  }
}

function drawResult() {
  // Overlay background
  fill(0, 0, 0, 100);
  noStroke();
  rect(canvasWidth/2 - 130, 200, 260, 100, 15);

  if (resultCorrect) {
    fill('#4CAF50');
    textSize(28);
    textAlign(CENTER, CENTER);
    text('Correct! ⭐', canvasWidth/2, 235);

    fill('white');
    textSize(16);
    text('/' + letterSounds[targetLetter].sound + '/ is the ' + targetLetter + ' sound!', canvasWidth/2, 270);
  } else {
    fill('#FF5722');
    textSize(24);
    textAlign(CENTER, CENTER);
    text('Try Again!', canvasWidth/2, 230);

    fill('white');
    textSize(14);
    text('That was ' + selectedLetter + '. Listen again!', canvasWidth/2, 260);
    text('The sound was /' + letterSounds[targetLetter].sound + '/', canvasWidth/2, 280);
  }
}

function updateAndDrawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    push();
    translate(p.x, p.y);
    rotate(p.rotation);
    fill(p.color);
    noStroke();
    drawStar(0, 0, p.size/3, p.size, 5);
    pop();

    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.2;
    p.rotation += 0.1;
    p.alpha -= 4;

    if (p.alpha <= 0 || p.y > drawHeight) {
      particles.splice(i, 1);
    }
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI/2; a < TWO_PI - PI/2; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function mousePressed() {
  if (showResult) {
    // Click to continue after result
    if (resultCorrect) {
      nextRound();
    } else {
      showResult = false;
      selectedLetter = null;
    }
    return;
  }

  // Check letter button clicks
  for (let btn of letterButtons) {
    if (mouseX > btn.x && mouseX < btn.x + btn.size &&
        mouseY > btn.y && mouseY < btn.y + btn.size) {
      checkAnswer(btn.letter);
      return;
    }
  }
}

function checkAnswer(letter) {
  selectedLetter = letter;
  attempts++;

  if (letter === targetLetter) {
    resultCorrect = true;
    score++;
    createCelebration();
    playCorrectSound();
  } else {
    resultCorrect = false;
    playIncorrectSound();
  }

  showResult = true;
}

function createCelebration() {
  let btn = letterButtons.find(b => b.letter === targetLetter);
  if (!btn) return;

  let colors = ['#FFD700', '#4CAF50', '#2196F3', '#FF9800', '#E91E63'];

  for (let i = 0; i < 20; i++) {
    particles.push({
      x: btn.x + btn.size/2,
      y: btn.y + btn.size/2,
      vx: random(-5, 5),
      vy: random(-7, -2),
      size: random(10, 20),
      color: random(colors),
      alpha: 255,
      rotation: random(TWO_PI)
    });
  }
}

function startNewGame() {
  score = 0;
  attempts = 0;
  round = 0;
  showResult = false;
  selectedLetter = null;
  showHint = false;
  particles = [];
  nextRound();
}

function nextRound() {
  round++;
  showResult = false;
  selectedLetter = null;
  showHint = false;

  if (round > maxRounds) {
    // Game complete - show final score
    showGameComplete();
    return;
  }

  // Select random target letter
  targetLetter = random(letters);

  // Auto-play sound
  setTimeout(playTargetSound, 500);
}

function showGameComplete() {
  // Reset for display
  round = maxRounds;
  showResult = true;
  resultCorrect = true;

  // Big celebration
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: random(canvasWidth),
      y: random(150, 300),
      vx: random(-4, 4),
      vy: random(-6, -2),
      size: random(12, 24),
      color: random(['#FFD700', '#4CAF50', '#2196F3', '#FF9800', '#E91E63']),
      alpha: 255,
      rotation: random(TWO_PI)
    });
  }

  playCelebrationSound();
}

function playTargetSound() {
  if (!targetLetter || !('speechSynthesis' in window)) return;

  speechSynthesis.cancel();

  let sound = letterSounds[targetLetter].sound;
  let utterance = new SpeechSynthesisUtterance(sound);
  utterance.rate = 0.6;
  utterance.pitch = 1.0;
  speechSynthesis.speak(utterance);
}

function toggleHint() {
  showHint = !showHint;
}

function playCorrectSound() {
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
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  } catch (e) {}
}

function playIncorrectSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 200;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {}
}

function playCelebrationSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let notes = [523, 659, 784, 1047];

    notes.forEach((freq, i) => {
      let oscillator = audioContext.createOscillator();
      let gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      let startTime = audioContext.currentTime + i * 0.15;
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  } catch (e) {}
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculateLetterPositions();
  newGameButton.position(canvasWidth - 100, drawHeight + 12);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
