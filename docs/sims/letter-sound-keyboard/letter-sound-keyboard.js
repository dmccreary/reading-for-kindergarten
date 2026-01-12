// Letter Sound Keyboard MicroSim
// Virtual keyboard that plays sounds when letters are pressed
// Designed for kindergarten students exploring letter sounds

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Letter sound data
const letterSounds = {
  'A': 'ah', 'B': 'buh', 'C': 'kuh', 'D': 'duh', 'E': 'eh',
  'F': 'fff', 'G': 'guh', 'H': 'huh', 'I': 'ih', 'J': 'juh',
  'K': 'kuh', 'L': 'lll', 'M': 'mmm', 'N': 'nnn', 'O': 'oh',
  'P': 'puh', 'Q': 'kwuh', 'R': 'rrr', 'S': 'sss', 'T': 'tuh',
  'U': 'uh', 'V': 'vvv', 'W': 'wuh', 'X': 'ks', 'Y': 'yuh', 'Z': 'zzz'
};

// Keyboard layout (QWERTY style)
const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

// Alphabetical layout
const alphabetRows = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
  ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
  ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
];

// Game state
let keys = [];
let pressedKey = null;
let pressTime = 0;
let layoutMode = 'abc'; // 'abc' or 'qwerty'
let lastPlayedLetter = null;
let ripples = [];
let showPicture = false;

// Letter pictures
const letterPictures = {
  'A': '🍎', 'B': '⚽', 'C': '🐱', 'D': '🐕', 'E': '🥚',
  'F': '🐟', 'G': '🐐', 'H': '🎩', 'I': '🧊', 'J': '🍯',
  'K': '🪁', 'L': '🦁', 'M': '🌙', 'N': '🪹', 'O': '🐙',
  'P': '🐷', 'Q': '👸', 'R': '🌧️', 'S': '☀️', 'T': '🐢',
  'U': '☂️', 'V': '🚐', 'W': '💧', 'X': '🦊', 'Y': '💛', 'Z': '🦓'
};

// Colors for keys
const vowelColor = '#FF6B6B';
const consonantColor = '#4ECDC4';
const vowels = ['A', 'E', 'I', 'O', 'U'];

// UI Elements
let layoutButton, pictureCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create Layout toggle button
  layoutButton = createButton('ABC Layout');
  layoutButton.position(margin, drawHeight + 12);
  layoutButton.mousePressed(toggleLayout);
  layoutButton.style('font-size', '14px');
  layoutButton.style('padding', '8px 14px');
  layoutButton.style('cursor', 'pointer');

  // Create Show Pictures checkbox
  pictureCheckbox = createCheckbox('Show Pictures', false);
  pictureCheckbox.position(margin + 120, drawHeight + 15);
  pictureCheckbox.changed(() => showPicture = pictureCheckbox.checked());
  pictureCheckbox.style('font-size', '14px');

  textFont('Arial');
  calculateKeyPositions();

  describe('Letter Sound Keyboard for exploring letter sounds', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('#E8EAF6');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  fill('#3F51B5');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Letter Sound Keyboard', canvasWidth / 2, 8);

  // Draw instructions
  textSize(13);
  fill('#666');
  text('Press any letter to hear its sound!', canvasWidth / 2, 35);

  // Draw last played display
  if (lastPlayedLetter) {
    drawLastPlayedDisplay();
  }

  // Draw keyboard
  drawKeyboard();

  // Draw ripple effects
  updateAndDrawRipples();

  // Update pressed key animation
  if (pressedKey) {
    pressTime -= 0.1;
    if (pressTime <= 0) {
      pressedKey = null;
    }
  }
}

function drawLastPlayedDisplay() {
  // Display box
  fill(255, 255, 255, 240);
  stroke('#3F51B5');
  strokeWeight(2);
  rect(canvasWidth/2 - 80, 55, 160, 55, 10);

  // Letter
  let isVowel = vowels.includes(lastPlayedLetter);
  fill(isVowel ? vowelColor : consonantColor);
  noStroke();
  textSize(36);
  textAlign(CENTER, CENTER);
  text(lastPlayedLetter, canvasWidth/2 - 35, 80);

  // Picture or sound
  if (showPicture) {
    textSize(30);
    text(letterPictures[lastPlayedLetter], canvasWidth/2 + 30, 80);
  } else {
    fill('#666');
    textSize(16);
    text('/' + letterSounds[lastPlayedLetter] + '/', canvasWidth/2 + 30, 80);
  }
}

function calculateKeyPositions() {
  keys = [];

  let rows = layoutMode === 'abc' ? alphabetRows : keyboardRows;
  let keySize = 36;
  let spacing = 4;
  let startY = 125;

  for (let r = 0; r < rows.length; r++) {
    let row = rows[r];
    let rowWidth = row.length * keySize + (row.length - 1) * spacing;
    let startX = (canvasWidth - rowWidth) / 2;

    for (let c = 0; c < row.length; c++) {
      let letter = row[c];
      let x = startX + c * (keySize + spacing);
      let y = startY + r * (keySize + spacing + 10);

      keys.push({
        letter: letter,
        x: x,
        y: y,
        size: keySize,
        isVowel: vowels.includes(letter)
      });
    }
  }
}

function drawKeyboard() {
  for (let key of keys) {
    let isPressed = (pressedKey === key.letter);
    let scale = isPressed ? 0.9 : 1;
    let offset = isPressed ? 2 : 0;

    push();
    translate(key.x + key.size/2, key.y + key.size/2 + offset);

    // Key shadow
    if (!isPressed) {
      fill(0, 0, 0, 40);
      noStroke();
      rect(-key.size/2 * scale + 3, 3, key.size * scale, key.size * scale, 8);
    }

    // Key background
    let baseColor = key.isVowel ? vowelColor : consonantColor;
    fill(baseColor);
    stroke('white');
    strokeWeight(2);
    rect(-key.size/2 * scale, -key.size/2 * scale, key.size * scale, key.size * scale, 8);

    // Letter
    fill('white');
    noStroke();
    textSize(22 * scale);
    textAlign(CENTER, CENTER);
    text(key.letter, 0, -1);

    pop();
  }

  // Legend
  fill('#666');
  textSize(12);
  textAlign(LEFT, CENTER);
  noStroke();

  // Vowel indicator
  fill(vowelColor);
  rect(20, drawHeight - 30, 15, 15, 3);
  fill('#666');
  text('Vowels', 40, drawHeight - 22);

  // Consonant indicator
  fill(consonantColor);
  rect(100, drawHeight - 30, 15, 15, 3);
  fill('#666');
  text('Consonants', 120, drawHeight - 22);
}

function updateAndDrawRipples() {
  for (let i = ripples.length - 1; i >= 0; i--) {
    let r = ripples[i];

    noFill();
    stroke(r.color);
    strokeWeight(2);

    let alpha = map(r.size, r.startSize, r.maxSize, 255, 0);
    stroke(red(color(r.color)), green(color(r.color)), blue(color(r.color)), alpha);

    ellipse(r.x, r.y, r.size, r.size);

    r.size += 5;

    if (r.size > r.maxSize) {
      ripples.splice(i, 1);
    }
  }
}

function mousePressed() {
  // Check key presses
  for (let key of keys) {
    if (mouseX > key.x && mouseX < key.x + key.size &&
        mouseY > key.y && mouseY < key.y + key.size) {
      pressKey(key);
      return;
    }
  }
}

function keyPressed() {
  // Handle physical keyboard input
  let letter = key.toUpperCase();
  if (letterSounds[letter]) {
    let keyObj = keys.find(k => k.letter === letter);
    if (keyObj) {
      pressKey(keyObj);
    }
  }
}

function pressKey(key) {
  pressedKey = key.letter;
  pressTime = 1;
  lastPlayedLetter = key.letter;

  // Create ripple effect
  let baseColor = key.isVowel ? vowelColor : consonantColor;
  ripples.push({
    x: key.x + key.size/2,
    y: key.y + key.size/2,
    size: 10,
    startSize: 10,
    maxSize: 80,
    color: baseColor
  });

  // Play sound
  playLetterSound(key.letter);
  playTone(key.letter);
}

function playLetterSound(letter) {
  if (!('speechSynthesis' in window)) return;

  speechSynthesis.cancel();

  let sound = letterSounds[letter];
  let utterance = new SpeechSynthesisUtterance(sound);
  utterance.rate = 0.6;
  utterance.pitch = 1.0;
  speechSynthesis.speak(utterance);
}

function playTone(letter) {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Map letter to frequency (A=220 to Z)
    let letterIndex = letter.charCodeAt(0) - 65;
    let freq = 220 + letterIndex * 15;

    oscillator.frequency.value = freq;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  } catch (e) {}
}

function toggleLayout() {
  layoutMode = layoutMode === 'abc' ? 'qwerty' : 'abc';
  layoutButton.html(layoutMode === 'abc' ? 'ABC Layout' : 'QWERTY Layout');
  calculateKeyPositions();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculateKeyPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
