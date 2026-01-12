// Vowel Sound Explorer MicroSim
// Interactive vowel chart showing short and long sounds
// Designed for kindergarten students learning vowel sounds

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Vowel data with short and long sounds
const vowelData = {
  'A': {
    short: {sound: 'ah', word: 'apple', emoji: '🍎', description: 'short A'},
    long: {sound: 'ay', word: 'cake', emoji: '🎂', description: 'long A (says its name)'},
    color: '#E74C3C'
  },
  'E': {
    short: {sound: 'eh', word: 'egg', emoji: '🥚', description: 'short E'},
    long: {sound: 'ee', word: 'tree', emoji: '🌳', description: 'long E (says its name)'},
    color: '#27AE60'
  },
  'I': {
    short: {sound: 'ih', word: 'igloo', emoji: '🏠', description: 'short I'},
    long: {sound: 'eye', word: 'ice', emoji: '🧊', description: 'long I (says its name)'},
    color: '#3498DB'
  },
  'O': {
    short: {sound: 'oh', word: 'octopus', emoji: '🐙', description: 'short O'},
    long: {sound: 'oh', word: 'boat', emoji: '⛵', description: 'long O (says its name)'},
    color: '#F39C12'
  },
  'U': {
    short: {sound: 'uh', word: 'umbrella', emoji: '☂️', description: 'short U'},
    long: {sound: 'you', word: 'unicorn', emoji: '🦄', description: 'long U (says its name)'},
    color: '#9B59B6'
  }
};

const vowels = ['A', 'E', 'I', 'O', 'U'];

// Game state
let selectedVowel = null;
let soundMode = 'short'; // 'short' or 'long'
let vowelButtons = [];
let animatingVowel = null;
let animationPhase = 0;
let particles = [];

// UI Elements
let shortButton, longButton, playButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create Short Sounds button
  shortButton = createButton('Short Sounds');
  shortButton.position(margin, drawHeight + 12);
  shortButton.mousePressed(() => setMode('short'));
  shortButton.style('font-size', '14px');
  shortButton.style('padding', '8px 12px');
  shortButton.style('cursor', 'pointer');

  // Create Long Sounds button
  longButton = createButton('Long Sounds');
  longButton.position(margin + 120, drawHeight + 12);
  longButton.mousePressed(() => setMode('long'));
  longButton.style('font-size', '14px');
  longButton.style('padding', '8px 12px');
  longButton.style('cursor', 'pointer');

  // Create Play Again button
  playButton = createButton('Hear Again');
  playButton.position(canvasWidth - 105, drawHeight + 12);
  playButton.mousePressed(playAgain);
  playButton.style('font-size', '14px');
  playButton.style('padding', '8px 12px');
  playButton.style('cursor', 'pointer');

  updateButtonStyles();
  textFont('Arial');
  calculateVowelPositions();

  describe('Vowel Sound Explorer showing short and long vowel sounds', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background - gradient effect
  let bgColor = soundMode === 'short' ? '#FFF8E1' : '#E3F2FD';
  fill(bgColor);
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  fill('#333');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Vowel Sound Explorer', canvasWidth / 2, 8);

  // Draw mode indicator
  textSize(16);
  fill(soundMode === 'short' ? '#E65100' : '#1565C0');
  text(soundMode === 'short' ? 'Short Vowel Sounds' : 'Long Vowel Sounds', canvasWidth / 2, 35);

  // Draw instructions
  textSize(13);
  fill('#666');
  text('Click a vowel to hear its ' + soundMode + ' sound!', canvasWidth / 2, 58);

  // Draw vowel buttons
  drawVowelButtons();

  // Draw selected vowel display
  if (selectedVowel) {
    drawSelectedVowelDisplay();
  }

  // Draw particles
  updateAndDrawParticles();

  // Update animation
  if (animatingVowel) {
    animationPhase += 0.1;
    if (animationPhase > TWO_PI * 2) {
      animatingVowel = null;
      animationPhase = 0;
    }
  }
}

function calculateVowelPositions() {
  vowelButtons = [];

  let buttonSize = 65;
  let spacing = 15;
  let totalWidth = vowels.length * buttonSize + (vowels.length - 1) * spacing;
  let startX = (canvasWidth - totalWidth) / 2;
  let y = 85;

  for (let i = 0; i < vowels.length; i++) {
    let x = startX + i * (buttonSize + spacing);
    vowelButtons.push({
      vowel: vowels[i],
      x: x,
      y: y,
      size: buttonSize,
      data: vowelData[vowels[i]]
    });
  }
}

function drawVowelButtons() {
  for (let btn of vowelButtons) {
    let isSelected = (selectedVowel === btn.vowel);
    let isAnimating = (animatingVowel === btn.vowel);

    let scale = 1;
    let bounce = 0;

    if (isAnimating) {
      scale = 1 + sin(animationPhase * 3) * 0.15;
      bounce = sin(animationPhase * 4) * 5;
    }

    push();
    translate(btn.x + btn.size/2, btn.y + btn.size/2 - bounce);

    // Button shadow
    fill(0, 0, 0, 30);
    noStroke();
    ellipse(4, 4, btn.size * scale, btn.size * scale);

    // Button background
    if (isSelected) {
      fill(btn.data.color);
      stroke('white');
      strokeWeight(4);
    } else {
      fill('white');
      stroke(btn.data.color);
      strokeWeight(3);
    }
    ellipse(0, 0, btn.size * scale, btn.size * scale);

    // Vowel letter
    fill(isSelected ? 'white' : btn.data.color);
    noStroke();
    textSize(36 * scale);
    textAlign(CENTER, CENTER);
    text(btn.vowel, 0, -2);

    // Sound mode indicator (breve for short, macron for long)
    textSize(16 * scale);
    if (soundMode === 'short') {
      // Breve symbol (˘) above vowel
      fill(isSelected ? 'white' : btn.data.color);
      text('˘', 0, -20 * scale);
    } else {
      // Macron symbol (¯) above vowel
      fill(isSelected ? 'white' : btn.data.color);
      text('¯', 0, -20 * scale);
    }

    pop();
  }
}

function drawSelectedVowelDisplay() {
  let data = vowelData[selectedVowel];
  let soundData = soundMode === 'short' ? data.short : data.long;

  // Display box
  fill(255, 255, 255, 245);
  stroke(data.color);
  strokeWeight(4);
  rect(canvasWidth/2 - 150, 170, 300, 230, 15);

  // Large vowel with diacritic
  fill(data.color);
  noStroke();
  textSize(80);
  textAlign(CENTER, CENTER);
  text(selectedVowel, canvasWidth/2, 225);

  // Diacritic above
  textSize(30);
  text(soundMode === 'short' ? '˘' : '¯', canvasWidth/2, 175);

  // Lowercase
  textSize(50);
  fill(data.color);
  text(selectedVowel.toLowerCase(), canvasWidth/2 - 80, 315);

  // Emoji
  textSize(55);
  text(soundData.emoji, canvasWidth/2 + 70, 310);

  // Word
  fill('#333');
  textSize(22);
  textAlign(CENTER, CENTER);
  text(soundData.word, canvasWidth/2, 365);

  // Description
  fill('#666');
  textSize(14);
  text(soundData.description, canvasWidth/2, 392);
}

function updateAndDrawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    push();
    translate(p.x, p.y);
    rotate(p.rotation);
    fill(p.color + hex(floor(p.alpha), 2).slice(-2));
    noStroke();
    ellipse(0, 0, p.size, p.size);
    pop();

    // Update
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15;
    p.rotation += 0.05;
    p.alpha -= 4;
    p.size *= 0.97;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

function mousePressed() {
  // Check if clicked on a vowel button
  for (let btn of vowelButtons) {
    let d = dist(mouseX, mouseY, btn.x + btn.size/2, btn.y + btn.size/2);
    if (d < btn.size/2) {
      selectVowel(btn.vowel);
      return;
    }
  }
}

function selectVowel(vowel) {
  selectedVowel = vowel;
  animatingVowel = vowel;
  animationPhase = 0;

  // Create particles
  let btn = vowelButtons.find(b => b.vowel === vowel);
  if (btn) {
    createParticles(btn.x + btn.size/2, btn.y + btn.size/2, btn.data.color);
  }

  // Play sound
  playVowelSound(vowel);
}

function createParticles(x, y, color) {
  for (let i = 0; i < 12; i++) {
    particles.push({
      x: x,
      y: y,
      vx: random(-4, 4),
      vy: random(-5, -1),
      size: random(8, 18),
      alpha: 255,
      rotation: random(TWO_PI),
      color: color
    });
  }
}

function playVowelSound(vowel) {
  if (!('speechSynthesis' in window)) return;

  let data = vowelData[vowel];
  let soundData = soundMode === 'short' ? data.short : data.long;

  // Cancel any ongoing speech
  speechSynthesis.cancel();

  // Speak the sound
  setTimeout(() => {
    let soundUtterance = new SpeechSynthesisUtterance(soundData.sound);
    soundUtterance.rate = 0.6;
    soundUtterance.pitch = 1.0;
    speechSynthesis.speak(soundUtterance);
  }, 100);

  // Then speak the word
  setTimeout(() => {
    let wordUtterance = new SpeechSynthesisUtterance('like in ' + soundData.word);
    wordUtterance.rate = 0.9;
    wordUtterance.pitch = 1.1;
    speechSynthesis.speak(wordUtterance);
  }, 900);

  // Play a tone
  playTone(vowel);
}

function playAgain() {
  if (selectedVowel) {
    animatingVowel = selectedVowel;
    animationPhase = 0;
    playVowelSound(selectedVowel);
  }
}

function setMode(mode) {
  soundMode = mode;
  updateButtonStyles();

  // Replay current vowel if one is selected
  if (selectedVowel) {
    animatingVowel = selectedVowel;
    animationPhase = 0;
    playVowelSound(selectedVowel);
  }
}

function updateButtonStyles() {
  // Short button
  if (soundMode === 'short') {
    shortButton.style('background-color', '#FF9800');
    shortButton.style('color', 'white');
    shortButton.style('border', 'none');
    shortButton.style('border-radius', '5px');
  } else {
    shortButton.style('background-color', 'white');
    shortButton.style('color', '#333');
    shortButton.style('border', '2px solid #ccc');
    shortButton.style('border-radius', '5px');
  }

  // Long button
  if (soundMode === 'long') {
    longButton.style('background-color', '#2196F3');
    longButton.style('color', 'white');
    longButton.style('border', 'none');
    longButton.style('border-radius', '5px');
  } else {
    longButton.style('background-color', 'white');
    longButton.style('color', '#333');
    longButton.style('border', '2px solid #ccc');
    longButton.style('border-radius', '5px');
  }
}

function playTone(vowel) {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different pitch for each vowel
    let vowelIndex = vowels.indexOf(vowel);
    let baseFreq = soundMode === 'short' ? 350 : 450;
    let freq = baseFreq + vowelIndex * 40;

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
  calculateVowelPositions();
  playButton.position(canvasWidth - 105, drawHeight + 12);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    if (vowelButtons.length > 0) {
      calculateVowelPositions();
    }
  }
}
