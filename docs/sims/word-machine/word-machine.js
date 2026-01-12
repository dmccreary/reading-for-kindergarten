// Word Machine MicroSim
// Factory-themed animation for blending sounds into words
// Designed for kindergarten students learning phonics

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// CVC words
const words = [
  { word: 'cat', sounds: ['c', 'a', 't'], emoji: '🐱' },
  { word: 'dog', sounds: ['d', 'o', 'g'], emoji: '🐕' },
  { word: 'pig', sounds: ['p', 'i', 'g'], emoji: '🐷' },
  { word: 'sun', sounds: ['s', 'u', 'n'], emoji: '☀️' },
  { word: 'hat', sounds: ['h', 'a', 't'], emoji: '🎩' },
  { word: 'cup', sounds: ['c', 'u', 'p'], emoji: '🥤' },
  { word: 'bed', sounds: ['b', 'e', 'd'], emoji: '🛏️' },
  { word: 'fox', sounds: ['f', 'o', 'x'], emoji: '🦊' },
  { word: 'bus', sounds: ['b', 'u', 's'], emoji: '🚌' },
  { word: 'hen', sounds: ['h', 'e', 'n'], emoji: '🐔' },
  { word: 'map', sounds: ['m', 'a', 'p'], emoji: '🗺️' },
  { word: 'net', sounds: ['n', 'e', 't'], emoji: '🥅' },
  { word: 'pot', sounds: ['p', 'o', 't'], emoji: '🍲' },
  { word: 'rug', sounds: ['r', 'u', 'g'], emoji: '🧶' },
  { word: 'van', sounds: ['v', 'a', 'n'], emoji: '🚐' }
];

// Game state
let currentWordIndex = 0;
let machineState = 'idle'; // idle, loading, processing, complete
let animationFrame = 0;
let loadedSounds = [];
let wordsBuilt = 0;

// Machine parts
let gearAngle = 0;
let pistonOffset = 0;
let steamParticles = [];
let outputY = 0;

// UI Elements
let loadButton, processButton, newWordButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create Load Sound buttons will be created dynamically
  // Create Process button
  processButton = createButton('BUILD WORD!');
  processButton.position(canvasWidth / 2 - 55, drawHeight + 15);
  processButton.mousePressed(startProcessing);
  processButton.style('font-size', '14px');
  processButton.style('padding', '8px 20px');
  processButton.style('background-color', '#FF5722');
  processButton.style('color', 'white');
  processButton.style('border', 'none');
  processButton.style('border-radius', '5px');
  processButton.style('cursor', 'pointer');

  // Create New Word button
  newWordButton = createButton('New Word');
  newWordButton.position(canvasWidth - 90, drawHeight + 15);
  newWordButton.mousePressed(loadNewWord);
  newWordButton.style('font-size', '14px');
  newWordButton.style('padding', '8px 12px');
  newWordButton.style('cursor', 'pointer');

  textFont('Arial');

  describe('Word Machine for blending sounds in a fun factory theme', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background - factory floor
  fill('#455A64');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('#37474F');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  fill('#FFEB3B');
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text('Word Machine', canvasWidth / 2, 8);

  // Draw progress counter
  drawProgress();

  // Draw sound input hoppers
  drawInputHoppers();

  // Draw machine body
  drawMachine();

  // Draw output
  drawOutput();

  // Update animations
  updateAnimations();

  // Reposition button on resize
  processButton.position(canvasWidth / 2 - 55, drawHeight + 15);
  newWordButton.position(canvasWidth - 90, drawHeight + 15);
}

function drawProgress() {
  fill('#FFEB3B');
  noStroke();
  textSize(12);
  textAlign(RIGHT, TOP);
  text('Words built: ' + wordsBuilt, canvasWidth - 15, 15);
}

function drawInputHoppers() {
  let currentWord = words[currentWordIndex];
  let sounds = currentWord.sounds;

  let hopperWidth = 70;
  let hopperHeight = 80;
  let startX = (canvasWidth - (hopperWidth * 3 + 30)) / 2;
  let startY = 50;

  for (let i = 0; i < 3; i++) {
    let x = startX + i * (hopperWidth + 15);
    let isLoaded = loadedSounds.includes(i);

    // Hopper funnel shape
    fill(isLoaded ? '#4CAF50' : '#78909C');
    stroke('#263238');
    strokeWeight(2);
    beginShape();
    vertex(x, startY);
    vertex(x + hopperWidth, startY);
    vertex(x + hopperWidth - 15, startY + hopperHeight);
    vertex(x + 15, startY + hopperHeight);
    endShape(CLOSE);

    // Letter inside
    if (!isLoaded) {
      fill(i === 1 ? '#F44336' : '#2196F3');
      noStroke();
      textSize(32);
      textAlign(CENTER, CENTER);
      text(sounds[i], x + hopperWidth / 2, startY + hopperHeight / 2 - 5);

      // Click hint
      fill('#CFD8DC');
      textSize(10);
      text('click', x + hopperWidth / 2, startY + hopperHeight - 15);
    } else {
      // Show checkmark
      fill('white');
      noStroke();
      textSize(28);
      textAlign(CENTER, CENTER);
      text('✓', x + hopperWidth / 2, startY + hopperHeight / 2);
    }

    // Label
    fill('#CFD8DC');
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text(i === 0 ? 'First' : (i === 1 ? 'Middle' : 'Last'), x + hopperWidth / 2, startY - 15);
  }
}

function drawMachine() {
  let machineX = canvasWidth / 2 - 100;
  let machineY = 160;
  let machineWidth = 200;
  let machineHeight = 120;

  // Machine body
  fill('#37474F');
  stroke('#263238');
  strokeWeight(3);
  rect(machineX, machineY, machineWidth, machineHeight, 10);

  // Conveyor belt entrance
  fill('#546E7A');
  noStroke();
  rect(machineX - 30, machineY + machineHeight - 30, 30, 30);
  rect(machineX + machineWidth, machineY + machineHeight - 30, 30, 30);

  // Gears
  drawGear(machineX + 50, machineY + 40, 30, gearAngle);
  drawGear(machineX + 100, machineY + 60, 25, -gearAngle * 1.2);
  drawGear(machineX + 150, machineY + 40, 30, gearAngle);

  // Pistons
  fill('#78909C');
  stroke('#546E7A');
  strokeWeight(2);
  rect(machineX + 30, machineY + 80 + pistonOffset, 20, 35, 3);
  rect(machineX + 90, machineY + 75 - pistonOffset, 20, 40, 3);
  rect(machineX + 150, machineY + 80 + pistonOffset, 20, 35, 3);

  // Machine label
  fill('#FFEB3B');
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text('⚙️ WORD FACTORY ⚙️', canvasWidth / 2, machineY + machineHeight / 2);

  // Status light
  let lightColor = machineState === 'processing' ? color('#4CAF50') :
                   machineState === 'complete' ? color('#2196F3') :
                   loadedSounds.length === 3 ? color('#FFEB3B') : color('#F44336');

  fill(lightColor);
  stroke('#263238');
  strokeWeight(2);
  ellipse(machineX + machineWidth - 20, machineY + 20, 20, 20);

  // Draw steam particles
  for (let p of steamParticles) {
    fill(255, 255, 255, p.life);
    noStroke();
    ellipse(p.x, p.y, p.size);
  }
}

function drawGear(x, y, radius, angle) {
  push();
  translate(x, y);
  rotate(angle);

  fill('#90A4AE');
  stroke('#607D8B');
  strokeWeight(2);

  // Gear teeth
  let teeth = 8;
  beginShape();
  for (let i = 0; i < teeth * 2; i++) {
    let a = TWO_PI * i / (teeth * 2);
    let r = i % 2 === 0 ? radius : radius * 0.7;
    vertex(cos(a) * r, sin(a) * r);
  }
  endShape(CLOSE);

  // Center hole
  fill('#455A64');
  ellipse(0, 0, radius * 0.4);

  pop();
}

function drawOutput() {
  let outputX = canvasWidth / 2;
  let baseY = 310;

  // Output conveyor
  fill('#546E7A');
  stroke('#37474F');
  strokeWeight(2);
  rect(outputX - 80, baseY, 160, 25, 5);

  // Conveyor rollers
  fill('#455A64');
  noStroke();
  for (let i = 0; i < 5; i++) {
    ellipse(outputX - 60 + i * 30, baseY + 12, 10, 20);
  }

  if (machineState === 'complete') {
    let currentWord = words[currentWordIndex];

    // Output card sliding up
    let cardY = baseY - 20 - outputY;

    fill('#FFF8E1');
    stroke('#FFA000');
    strokeWeight(3);
    rect(outputX - 70, cardY, 140, 70, 10);

    // Word
    fill('#E65100');
    noStroke();
    textSize(32);
    textAlign(CENTER, CENTER);
    text(currentWord.word, outputX, cardY + 25);

    // Emoji
    textSize(24);
    text(currentWord.emoji, outputX, cardY + 55);
  }

  // Instructions
  fill('#CFD8DC');
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);

  if (machineState === 'idle' && loadedSounds.length < 3) {
    text('Click the sounds to load them into the machine!', canvasWidth / 2, 390);
  } else if (loadedSounds.length === 3 && machineState === 'idle') {
    text('All sounds loaded! Click BUILD WORD!', canvasWidth / 2, 390);
  } else if (machineState === 'processing') {
    text('Processing sounds...', canvasWidth / 2, 390);
  } else if (machineState === 'complete') {
    text('Word complete! Click New Word to continue.', canvasWidth / 2, 390);
  }
}

function updateAnimations() {
  // Update gear rotation
  if (machineState === 'processing') {
    gearAngle += 0.1;
    pistonOffset = sin(frameCount * 0.2) * 10;

    // Add steam particles
    if (frameCount % 5 === 0) {
      steamParticles.push({
        x: canvasWidth / 2 + random(-50, 50),
        y: 160,
        vx: random(-1, 1),
        vy: random(-2, -1),
        size: random(10, 20),
        life: 200
      });
    }

    animationFrame++;

    // Complete after animation
    if (animationFrame > 120) {
      completeWord();
    }
  } else if (machineState === 'complete') {
    // Slide output up
    if (outputY < 40) {
      outputY += 2;
    }
  } else {
    gearAngle += 0.01; // Slow idle rotation
  }

  // Update steam particles
  for (let p of steamParticles) {
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 3;
    p.size *= 1.02;
  }
  steamParticles = steamParticles.filter(p => p.life > 0);
}

function mousePressed() {
  if (machineState !== 'idle') return;

  let currentWord = words[currentWordIndex];
  let hopperWidth = 70;
  let hopperHeight = 80;
  let startX = (canvasWidth - (hopperWidth * 3 + 30)) / 2;
  let startY = 50;

  // Check clicks on hoppers
  for (let i = 0; i < 3; i++) {
    let x = startX + i * (hopperWidth + 15);

    if (mouseX > x && mouseX < x + hopperWidth &&
        mouseY > startY && mouseY < startY + hopperHeight) {
      if (!loadedSounds.includes(i)) {
        loadSound(i);
      }
      break;
    }
  }
}

function loadSound(index) {
  let currentWord = words[currentWordIndex];
  loadedSounds.push(index);

  // Play the sound
  speakSound(currentWord.sounds[index]);
  playLoadSound();
}

function startProcessing() {
  if (loadedSounds.length !== 3 || machineState !== 'idle') return;

  machineState = 'processing';
  animationFrame = 0;
  playMachineSound();

  // Play sounds during processing
  let currentWord = words[currentWordIndex];
  setTimeout(() => speakSound(currentWord.sounds[0]), 300);
  setTimeout(() => speakSound(currentWord.sounds[1]), 800);
  setTimeout(() => speakSound(currentWord.sounds[2]), 1300);
}

function completeWord() {
  machineState = 'complete';
  outputY = 0;
  wordsBuilt++;

  let currentWord = words[currentWordIndex];
  speakWord(currentWord.word);
  playSuccessSound();
}

function loadNewWord() {
  currentWordIndex = (currentWordIndex + 1) % words.length;
  loadedSounds = [];
  machineState = 'idle';
  animationFrame = 0;
  outputY = 0;
  steamParticles = [];
  playClickSound();
}

function speakSound(letter) {
  if (!('speechSynthesis' in window)) return;

  const vowelSounds = { 'a': 'ah', 'e': 'eh', 'i': 'ih', 'o': 'oh', 'u': 'uh' };
  let sound = vowelSounds[letter] || letter;

  let utterance = new SpeechSynthesisUtterance(sound);
  utterance.rate = 0.7;
  utterance.pitch = 1.1;
  speechSynthesis.speak(utterance);
}

function speakWord(word) {
  if (!('speechSynthesis' in window)) return;

  setTimeout(() => {
    let utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.6;
    speechSynthesis.speak(utterance);
  }, 200);
}

function playLoadSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 400 + loadedSounds.length * 100;
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {}
}

function playMachineSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Low rumble
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 100;
    oscillator.type = 'sawtooth';

    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);
  } catch (e) {}
}

function playClickSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 500;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.08);
  } catch (e) {}
}

function playSuccessSound() {
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

      let startTime = audioContext.currentTime + i * 0.12;
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  } catch (e) {}
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
