// Consonant Sound Match MicroSim
// Click a consonant letter to hear its sound with an example word
// Designed for kindergarten students learning letter-sound correspondence

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Consonant data with sounds, example words, and emojis
// soundText: what TTS will say; soundDisplay: what's shown on screen
const consonantData = {
  'B': {soundText: 'buh', soundDisplay: '/b/', word: 'ball', emoji: '⚽', color: '#E74C3C'},
  'C': {soundText: 'kuh', soundDisplay: '/k/', word: 'cat', emoji: '🐱', color: '#3498DB'},
  'D': {soundText: 'duh', soundDisplay: '/d/', word: 'dog', emoji: '🐕', color: '#2ECC71'},
  'F': {soundText: 'fuh', soundDisplay: '/f/', word: 'fish', emoji: '🐟', color: '#9B59B6'},
  'G': {soundText: 'guh', soundDisplay: '/g/', word: 'goat', emoji: '🐐', color: '#F39C12'},
  'H': {soundText: 'huh', soundDisplay: '/h/', word: 'hat', emoji: '🎩', color: '#1ABC9C'},
  'J': {soundText: 'juh', soundDisplay: '/j/', word: 'jam', emoji: '🍯', color: '#E91E63'},
  'K': {soundText: 'kah', soundDisplay: '/k/', word: 'kite', emoji: '🪁', color: '#00BCD4'},
  'L': {soundText: 'luh', soundDisplay: '/l/', word: 'lion', emoji: '🦁', color: '#FF9800'},
  'M': {soundText: 'muh', soundDisplay: '/m/', word: 'moon', emoji: '🌙', color: '#673AB7'},
  'N': {soundText: 'nuh', soundDisplay: '/n/', word: 'nest', emoji: '🪹', color: '#795548'},
  'P': {soundText: 'puh', soundDisplay: '/p/', word: 'pig', emoji: '🐷', color: '#FF5722'},
  'Q': {soundText: 'kwuh', soundDisplay: '/kw/', word: 'queen', emoji: '👸', color: '#607D8B'},
  'R': {soundText: 'ruh', soundDisplay: '/r/', word: 'rain', emoji: '🌧️', color: '#4CAF50'},
  'S': {soundText: 'sah', soundDisplay: '/s/', word: 'sun', emoji: '☀️', color: '#FFEB3B'},
  'T': {soundText: 'tuh', soundDisplay: '/t/', word: 'turtle', emoji: '🐢', color: '#009688'},
  'V': {soundText: 'vuh', soundDisplay: '/v/', word: 'van', emoji: '🚐', color: '#8BC34A'},
  'W': {soundText: 'wuh', soundDisplay: '/w/', word: 'water', emoji: '💧', color: '#03A9F4'},
  'X': {soundText: 'eks', soundDisplay: '/ks/', word: 'fox', emoji: '🦊', color: '#FF4081'},
  'Y': {soundText: 'yuh', soundDisplay: '/y/', word: 'yellow', emoji: '💛', color: '#FFC107'},
  'Z': {soundText: 'zuh', soundDisplay: '/z/', word: 'zebra', emoji: '🦓', color: '#9E9E9E'}
};

const consonants = Object.keys(consonantData);

// Game state
let selectedLetter = null;
let letterButtons = [];
let animatingLetter = null;
let animationPhase = 0;
let sparkles = [];

// UI Elements
let playAgainButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Preload voices for speech synthesis (Chrome loads them async)
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }

  // Create Play Sound button
  playAgainButton = createButton('Hear Again');
  playAgainButton.position(margin, drawHeight + 8);
  playAgainButton.mousePressed(playSoundAgain);
  playAgainButton.style('font-size', '16px');
  playAgainButton.style('padding', '8px 16px');
  playAgainButton.style('background-color', '#4CAF50');
  playAgainButton.style('color', 'white');
  playAgainButton.style('border', 'none');
  playAgainButton.style('border-radius', '5px');
  playAgainButton.style('cursor', 'pointer');

  textFont('Arial');
  calculateLetterPositions();

  describe('Consonant Sound Match game where clicking letters plays their sounds', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  fill('#E65100');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Consonant Sound Match', canvasWidth / 2, 8);

  // Draw instructions
  textSize(13);
  fill('#666');
  text('Click a letter to hear its sound!', canvasWidth / 2, 34);

  // Draw letter grid
  drawLetterGrid();

  // Draw selected letter display
  if (selectedLetter) {
    drawSelectedLetterDisplay();
  }

  // Draw sparkles
  updateAndDrawSparkles();

  // Update animation
  if (animatingLetter) {
    animationPhase += 0.1;
    if (animationPhase > TWO_PI * 2) {
      animatingLetter = null;
      animationPhase = 0;
    }
  }
}

function calculateLetterPositions() {
  letterButtons = [];

  let cols = 7;
  let rows = 3;
  let buttonSize = 42;
  let spacing = 8;
  let totalWidth = cols * buttonSize + (cols - 1) * spacing;
  let startX = (canvasWidth - totalWidth) / 2;
  let startY = 55;

  for (let i = 0; i < consonants.length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let x = startX + col * (buttonSize + spacing);
    let y = startY + row * (buttonSize + spacing);

    letterButtons.push({
      letter: consonants[i],
      x: x,
      y: y,
      size: buttonSize,
      data: consonantData[consonants[i]]
    });
  }
}

function drawLetterGrid() {
  for (let btn of letterButtons) {
    let isSelected = (selectedLetter === btn.letter);
    let isAnimating = (animatingLetter === btn.letter);

    let scale = 1;
    let bounce = 0;

    if (isAnimating) {
      scale = 1 + sin(animationPhase * 3) * 0.1;
      bounce = sin(animationPhase * 4) * 3;
    }

    push();
    translate(btn.x + btn.size/2, btn.y + btn.size/2 - bounce);

    // Button shadow
    fill(0, 0, 0, 30);
    noStroke();
    rect(-btn.size/2 * scale + 5, -btn.size/2 * scale + 5, btn.size * scale, btn.size * scale, 10);

    // Button background
    if (isSelected) {
      fill(btn.data.color);
      stroke('white');
      strokeWeight(3);
    } else {
      fill('white');
      stroke(btn.data.color);
      strokeWeight(2);
    }
    rect(-btn.size/2 * scale, -btn.size/2 * scale, btn.size * scale, btn.size * scale, 10);

    // Letter
    fill(isSelected ? 'white' : btn.data.color);
    noStroke();
    textSize(26 * scale);
    textAlign(CENTER, CENTER);
    text(btn.letter, 0, 0);

    pop();
  }
}

function drawSelectedLetterDisplay() {
  let data = consonantData[selectedLetter];

  // Display box
  fill(255, 255, 255, 240);
  stroke(data.color);
  strokeWeight(4);
  rect(canvasWidth/2 - 140, 210, 280, 170, 15);

  // Large letter
  fill(data.color);
  noStroke();
  textSize(70);
  textAlign(CENTER, CENTER);
  text(selectedLetter, canvasWidth/2 - 70, 275);

  // Lowercase
  textSize(50);
  fill(data.color);
  text(selectedLetter.toLowerCase(), canvasWidth/2 - 70, 340);

  // Emoji
  textSize(60);
  text(data.emoji, canvasWidth/2 + 60, 280);

  // Word
  fill('#333');
  textSize(24);
  text(data.word, canvasWidth/2 + 60, 345);

  // Sound description
  fill('#666');
  textSize(16);
  textAlign(CENTER, TOP);
  text('"' + selectedLetter + '" says ' + data.soundDisplay, canvasWidth/2, 385);
  text('like in "' + data.word + '"', canvasWidth/2, 405);
}

function updateAndDrawSparkles() {
  for (let i = sparkles.length - 1; i >= 0; i--) {
    let s = sparkles[i];

    push();
    translate(s.x, s.y);
    rotate(s.rotation);
    fill(s.color + hex(floor(s.alpha), 2).slice(-2));
    noStroke();
    drawStar(0, 0, s.size/3, s.size, 5);
    pop();

    // Update
    s.y -= s.speed;
    s.x += s.drift;
    s.rotation += 0.1;
    s.alpha -= 5;
    s.size *= 0.98;

    if (s.alpha <= 0) {
      sparkles.splice(i, 1);
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
  // Check if clicked on a letter button
  for (let btn of letterButtons) {
    if (mouseX > btn.x && mouseX < btn.x + btn.size &&
        mouseY > btn.y && mouseY < btn.y + btn.size) {
      selectLetter(btn.letter);
      return;
    }
  }
}

function selectLetter(letter) {
  selectedLetter = letter;
  animatingLetter = letter;
  animationPhase = 0;

  // Create sparkles
  let btn = letterButtons.find(b => b.letter === letter);
  if (btn) {
    createSparkles(btn.x + btn.size/2, btn.y + btn.size/2, btn.data.color);
  }

  // Play sound
  playLetterSound(letter);
}

function createSparkles(x, y, color) {
  for (let i = 0; i < 8; i++) {
    sparkles.push({
      x: x + random(-15, 15),
      y: y + random(-15, 15),
      size: random(10, 20),
      alpha: 255,
      speed: random(1, 3),
      drift: random(-1, 1),
      rotation: random(TWO_PI),
      color: color
    });
  }
}

function playLetterSound(letter) {
  if (!('speechSynthesis' in window)) return;

  let data = consonantData[letter];

  // Cancel any ongoing speech
  speechSynthesis.cancel();

  // Get a good voice for phonics (prefer Samantha on Mac Chrome)
  let voices = speechSynthesis.getVoices();
  let preferredVoice = voices.find(v => v.name === 'Samantha') ||
                       voices.find(v => v.name.includes('Samantha')) ||
                       voices.find(v => v.lang.startsWith('en') && v.localService) ||
                       voices[0];

  // Speak the sound with emphasis
  setTimeout(() => {
    let soundUtterance = new SpeechSynthesisUtterance(data.soundText);
    soundUtterance.rate = 0.5;  // Slower for clearer phoneme
    soundUtterance.pitch = 1.1;
    soundUtterance.volume = 1.0;
    if (preferredVoice) soundUtterance.voice = preferredVoice;
    speechSynthesis.speak(soundUtterance);
  }, 100);

  // Then speak "like in [word]"
  setTimeout(() => {
    let wordUtterance = new SpeechSynthesisUtterance('like in ' + data.word);
    wordUtterance.rate = 0.85;
    wordUtterance.pitch = 1.0;
    if (preferredVoice) wordUtterance.voice = preferredVoice;
    speechSynthesis.speak(wordUtterance);
  }, 900);

  // Play a nice tone
  playSelectTone(letter);
}

function playSoundAgain() {
  if (selectedLetter) {
    playLetterSound(selectedLetter);
    animatingLetter = selectedLetter;
    animationPhase = 0;
  }
}

function playSelectTone(letter) {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different pitch for each letter
    let letterIndex = consonants.indexOf(letter);
    let freq = 400 + letterIndex * 20;

    oscillator.frequency.value = freq;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (e) {}
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculateLetterPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    // Recalculate button positions on resize
    if (letterButtons.length > 0) {
      calculateLetterPositions();
    }
  }
}
