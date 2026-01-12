// Sound Slider MicroSim
// Slide through sounds to blend them into words
// Designed for kindergarten students learning phonics

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// CVC words for blending
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
  { word: 'top', sounds: ['t', 'o', 'p'], emoji: '🔝' },
  { word: 'van', sounds: ['v', 'a', 'n'], emoji: '🚐' },
  { word: 'web', sounds: ['w', 'e', 'b'], emoji: '🕸️' },
  { word: 'jam', sounds: ['j', 'a', 'm'], emoji: '🍯' },
  { word: 'kit', sounds: ['k', 'i', 't'], emoji: '🧰' },
  { word: 'log', sounds: ['l', 'o', 'g'], emoji: '🪵' }
];

// Game state
let currentWordIndex = 0;
let sliderValue = 0;
let isDragging = false;
let lastSoundPlayed = -1;
let wordsBlended = 0;
let isComplete = false;

// Slider dimensions
let sliderX, sliderY, sliderWidth, sliderHeight;
let handleRadius = 18;

// Sound bubble positions
let bubbleY;
let bubbleRadius = 40;

// UI Elements
let newWordButton, autoBlendButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create New Word button
  newWordButton = createButton('New Word');
  newWordButton.position(margin, drawHeight + 15);
  newWordButton.mousePressed(loadNewWord);
  newWordButton.style('font-size', '14px');
  newWordButton.style('padding', '8px 16px');
  newWordButton.style('background-color', '#4CAF50');
  newWordButton.style('color', 'white');
  newWordButton.style('border', 'none');
  newWordButton.style('border-radius', '5px');
  newWordButton.style('cursor', 'pointer');

  // Create Auto Blend button
  autoBlendButton = createButton('Auto Blend');
  autoBlendButton.position(margin + 100, drawHeight + 15);
  autoBlendButton.mousePressed(autoBlend);
  autoBlendButton.style('font-size', '14px');
  autoBlendButton.style('padding', '8px 16px');
  autoBlendButton.style('background-color', '#2196F3');
  autoBlendButton.style('color', 'white');
  autoBlendButton.style('border', 'none');
  autoBlendButton.style('border-radius', '5px');
  autoBlendButton.style('cursor', 'pointer');

  textFont('Arial');
  calculateDimensions();

  describe('Sound Slider for blending sounds into words with slider control', LABEL);
}

function draw() {
  updateCanvasSize();
  calculateDimensions();

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
  text('Sound Slider', canvasWidth / 2, 8);

  // Draw subtitle
  fill('#666');
  textSize(12);
  text('Slide to blend the sounds together!', canvasWidth / 2, 35);

  // Draw progress
  drawProgress();

  // Draw emoji hint
  drawEmojiHint();

  // Draw sound bubbles
  drawSoundBubbles();

  // Draw slider
  drawSlider();

  // Draw blended word result
  drawBlendedWord();

  // Draw instructions
  drawInstructions();
}

function calculateDimensions() {
  sliderWidth = canvasWidth - 80;
  sliderX = 40;
  sliderY = 280;
  sliderHeight = 12;
  bubbleY = 160;
}

function drawProgress() {
  fill(255, 255, 255, 230);
  stroke('#2196F3');
  strokeWeight(2);
  rect(canvasWidth - 120, 50, 110, 35, 8);

  fill('#333');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Words blended: ' + wordsBlended, canvasWidth - 65, 67);
}

function drawEmojiHint() {
  let currentWord = words[currentWordIndex];

  fill(255, 255, 255, 200);
  stroke('#FFA000');
  strokeWeight(2);
  rect(canvasWidth / 2 - 35, 55, 70, 55, 10);

  textSize(36);
  textAlign(CENTER, CENTER);
  noStroke();
  text(currentWord.emoji, canvasWidth / 2, 82);
}

function drawSoundBubbles() {
  let currentWord = words[currentWordIndex];
  let sounds = currentWord.sounds;
  let numSounds = sounds.length;

  let totalWidth = sliderWidth;
  let soundSpacing = totalWidth / (numSounds - 1);

  for (let i = 0; i < numSounds; i++) {
    let x = sliderX + i * soundSpacing;

    // Calculate if this sound should be highlighted
    let soundPosition = i / (numSounds - 1);
    let isActive = sliderValue >= soundPosition - 0.1 && sliderValue <= soundPosition + 0.1;
    let isPassed = sliderValue > soundPosition + 0.1;

    // Bubble shadow
    fill(0, 0, 0, 30);
    noStroke();
    ellipse(x + 3, bubbleY + 3, bubbleRadius * 2);

    // Bubble
    if (isActive) {
      fill('#FFEB3B');
      stroke('#FFC107');
    } else if (isPassed) {
      fill('#81C784');
      stroke('#4CAF50');
    } else {
      fill('white');
      stroke(i === 1 ? '#F44336' : '#2196F3'); // vowel vs consonant
    }
    strokeWeight(4);
    ellipse(x, bubbleY, bubbleRadius * 2);

    // Letter
    fill(isActive ? '#E65100' : (i === 1 ? '#F44336' : '#2196F3'));
    noStroke();
    textSize(32);
    textAlign(CENTER, CENTER);
    text(sounds[i], x, bubbleY);

    // Sound label
    fill('#666');
    textSize(10);
    text(i === 1 ? 'vowel' : 'consonant', x, bubbleY + bubbleRadius + 15);
  }
}

function drawSlider() {
  // Slider track
  fill('#E0E0E0');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(sliderX, sliderY - sliderHeight / 2, sliderWidth, sliderHeight, sliderHeight / 2);

  // Filled portion
  let fillWidth = sliderValue * sliderWidth;
  fill('#4CAF50');
  noStroke();
  rect(sliderX, sliderY - sliderHeight / 2, fillWidth, sliderHeight, sliderHeight / 2, 0, 0, sliderHeight / 2);

  // Handle
  let handleX = sliderX + sliderValue * sliderWidth;

  // Handle shadow
  fill(0, 0, 0, 50);
  noStroke();
  ellipse(handleX + 2, sliderY + 2, handleRadius * 2);

  // Handle circle
  fill('#2196F3');
  stroke('white');
  strokeWeight(3);
  ellipse(handleX, sliderY, handleRadius * 2);

  // Handle icon (arrows)
  fill('white');
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text('◀▶', handleX, sliderY);
}

function drawBlendedWord() {
  let currentWord = words[currentWordIndex];
  let resultY = 340;

  // Show word emerging as slider moves
  let opacity = map(sliderValue, 0.7, 1, 0, 255);
  opacity = constrain(opacity, 0, 255);

  if (sliderValue > 0.7) {
    fill(255, 255, 255, opacity * 0.9);
    stroke(76, 175, 80, opacity);
    strokeWeight(3);
    rect(canvasWidth / 2 - 80, resultY - 25, 160, 50, 10);

    fill(46, 125, 50, opacity);
    noStroke();
    textSize(32);
    textAlign(CENTER, CENTER);
    text(currentWord.word, canvasWidth / 2, resultY);
  }

  if (isComplete) {
    fill('#4CAF50');
    textSize(14);
    textAlign(CENTER, TOP);
    text('Great job!', canvasWidth / 2, resultY + 30);
  }
}

function drawInstructions() {
  fill('#666');
  textSize(11);
  textAlign(CENTER, TOP);
  noStroke();
  text('Drag the slider slowly to hear each sound blend together.', canvasWidth / 2, 380);
}

function mousePressed() {
  // Check if clicking on slider handle or track
  let handleX = sliderX + sliderValue * sliderWidth;

  if (mouseY > sliderY - handleRadius - 10 && mouseY < sliderY + handleRadius + 10) {
    if (mouseX >= sliderX - 10 && mouseX <= sliderX + sliderWidth + 10) {
      isDragging = true;
      updateSliderFromMouse();
    }
  }
}

function mouseDragged() {
  if (isDragging) {
    updateSliderFromMouse();
  }
}

function mouseReleased() {
  isDragging = false;
}

function touchStarted() {
  mousePressed();
  return false;
}

function touchMoved() {
  if (isDragging) {
    updateSliderFromMouse();
  }
  return false;
}

function touchEnded() {
  mouseReleased();
  return false;
}

function updateSliderFromMouse() {
  let newValue = (mouseX - sliderX) / sliderWidth;
  newValue = constrain(newValue, 0, 1);

  // Check if we crossed a sound threshold
  let currentWord = words[currentWordIndex];
  let numSounds = currentWord.sounds.length;

  for (let i = 0; i < numSounds; i++) {
    let soundPosition = i / (numSounds - 1);

    // If we just crossed this position
    if (sliderValue < soundPosition && newValue >= soundPosition && i !== lastSoundPlayed) {
      speakSound(currentWord.sounds[i]);
      lastSoundPlayed = i;
      playPingSound(400 + i * 100);
    }
  }

  sliderValue = newValue;

  // Check for completion
  if (sliderValue >= 0.98 && !isComplete) {
    isComplete = true;
    wordsBlended++;

    // Speak the full word
    setTimeout(() => {
      speakWord(currentWord.word);
      playSuccessSound();
    }, 300);
  }
}

function loadNewWord() {
  currentWordIndex = (currentWordIndex + 1) % words.length;
  sliderValue = 0;
  lastSoundPlayed = -1;
  isComplete = false;
  playClickSound();
}

function autoBlend() {
  // Animate the slider automatically
  sliderValue = 0;
  lastSoundPlayed = -1;
  isComplete = false;

  let currentWord = words[currentWordIndex];
  let numSounds = currentWord.sounds.length;

  // Play each sound with timing
  for (let i = 0; i < numSounds; i++) {
    setTimeout(() => {
      sliderValue = i / (numSounds - 1);
      speakSound(currentWord.sounds[i]);
      playPingSound(400 + i * 100);
      lastSoundPlayed = i;
    }, i * 600);
  }

  // Complete the blend
  setTimeout(() => {
    sliderValue = 1;
    isComplete = true;
    wordsBlended++;
    speakWord(currentWord.word);
    playSuccessSound();
  }, numSounds * 600 + 300);
}

function speakSound(letter) {
  if (!('speechSynthesis' in window)) return;

  speechSynthesis.cancel();

  // Map letters to sounds
  const vowelSounds = { 'a': 'ah', 'e': 'eh', 'i': 'ih', 'o': 'oh', 'u': 'uh' };
  const consonantSounds = {
    'c': 'kuh', 'g': 'guh', 'h': 'huh', 'j': 'juh', 'k': 'kuh',
    'w': 'wuh', 'x': 'ks', 'y': 'yuh'
  };

  let sound = letter;
  if (vowelSounds[letter]) {
    sound = vowelSounds[letter];
  } else if (consonantSounds[letter]) {
    sound = consonantSounds[letter];
  }

  let utterance = new SpeechSynthesisUtterance(sound);
  utterance.rate = 0.7;
  utterance.pitch = 1.1;
  speechSynthesis.speak(utterance);
}

function speakWord(word) {
  if (!('speechSynthesis' in window)) return;

  let utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = 0.6;
  speechSynthesis.speak(utterance);
}

function playPingSound(freq) {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = freq;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
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
