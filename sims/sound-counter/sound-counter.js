// Sound Counter MicroSim
// Count phonemes in spoken words by tapping for each sound heard
// Designed for kindergarten students learning phonemic awareness

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Word data with phoneme breakdowns
// Format: {word: "cat", phonemes: ["k", "a", "t"], image: "emoji"}
const wordData = [
  // 2 phoneme words (easier)
  {word: "at", phonemes: ["a", "t"], image: "pointing"},
  {word: "up", phonemes: "u-p", image: "arrow_up"},
  {word: "go", phonemes: ["g", "o"], image: "running"},
  {word: "me", phonemes: ["m", "e"], image: "person"},
  {word: "no", phonemes: ["n", "o"], image: "stop"},

  // 3 phoneme words (medium)
  {word: "cat", phonemes: ["k", "a", "t"], image: "cat"},
  {word: "dog", phonemes: ["d", "o", "g"], image: "dog"},
  {word: "sun", phonemes: ["s", "u", "n"], image: "sun"},
  {word: "hat", phonemes: ["h", "a", "t"], image: "hat"},
  {word: "pig", phonemes: ["p", "i", "g"], image: "pig"},
  {word: "bed", phonemes: ["b", "e", "d"], image: "bed"},
  {word: "cup", phonemes: ["k", "u", "p"], image: "cup"},
  {word: "map", phonemes: ["m", "a", "p"], image: "map"},
  {word: "bus", phonemes: ["b", "u", "s"], image: "bus"},
  {word: "top", phonemes: ["t", "o", "p"], image: "top"},

  // 4 phoneme words (harder)
  {word: "frog", phonemes: ["f", "r", "o", "g"], image: "frog"},
  {word: "stop", phonemes: ["s", "t", "o", "p"], image: "stop_sign"},
  {word: "clap", phonemes: ["k", "l", "a", "p"], image: "clap"},
  {word: "swim", phonemes: ["s", "w", "i", "m"], image: "swim"},
  {word: "jump", phonemes: ["j", "u", "m", "p"], image: "jump"}
];

// Emoji mapping for visual representation
const emojiMap = {
  "cat": "🐱",
  "dog": "🐕",
  "sun": "☀️",
  "hat": "🎩",
  "pig": "🐷",
  "bed": "🛏️",
  "cup": "🥤",
  "map": "🗺️",
  "bus": "🚌",
  "top": "🔝",
  "frog": "🐸",
  "stop_sign": "🛑",
  "clap": "👏",
  "swim": "🏊",
  "jump": "🦘",
  "pointing": "👆",
  "arrow_up": "⬆️",
  "running": "🏃",
  "person": "🙋",
  "stop": "✋"
};

// Game state
let currentWord;
let tapCount = 0;
let stars = [];
let showResult = false;
let resultCorrect = false;
let celebrationParticles = [];
let difficulty = 'all'; // '2', '3', '4', 'all'

// UI Elements
let speakButton, checkButton, newWordButton, difficultySelect;

// Animation
let pulsePhase = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create Speak Word button
  speakButton = createButton('Hear Word');
  speakButton.position(margin, drawHeight + 15);
  speakButton.mousePressed(speakWord);
  speakButton.style('font-size', '16px');
  speakButton.style('padding', '8px 12px');
  speakButton.style('background-color', '#4CAF50');
  speakButton.style('color', 'white');
  speakButton.style('border', 'none');
  speakButton.style('border-radius', '5px');
  speakButton.style('cursor', 'pointer');

  // Create Check Answer button
  checkButton = createButton('Check');
  checkButton.position(margin + 110, drawHeight + 15);
  checkButton.mousePressed(checkAnswer);
  checkButton.style('font-size', '16px');
  checkButton.style('padding', '8px 12px');
  checkButton.style('cursor', 'pointer');

  // Create New Word button
  newWordButton = createButton('New Word');
  newWordButton.position(margin + 185, drawHeight + 15);
  newWordButton.mousePressed(newWord);
  newWordButton.style('font-size', '16px');
  newWordButton.style('padding', '8px 12px');
  newWordButton.style('cursor', 'pointer');

  // Create difficulty dropdown
  difficultySelect = createSelect();
  difficultySelect.position(canvasWidth - 90, drawHeight + 18);
  difficultySelect.option('All', 'all');
  difficultySelect.option('2 sounds', '2');
  difficultySelect.option('3 sounds', '3');
  difficultySelect.option('4 sounds', '4');
  difficultySelect.selected('all');
  difficultySelect.changed(changeDifficulty);
  difficultySelect.style('font-size', '14px');

  textFont('Arial');
  newWord();

  describe('Sound Counter game where children tap to count phonemes in words', LABEL);
}

function draw() {
  updateCanvasSize();
  pulsePhase += 0.05;

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
  fill('#333');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Sound Counter', canvasWidth / 2, 10);

  // Draw instructions
  textSize(14);
  fill('#666');
  text('Tap the big circle for each sound you hear!', canvasWidth / 2, 38);

  // Draw word display area
  drawWordArea();

  // Draw tap area
  drawTapArea();

  // Draw star counters
  drawStars();

  // Draw result
  if (showResult) {
    drawResult();
  }

  // Draw celebration particles
  updateAndDrawParticles();
}

function drawWordArea() {
  if (!currentWord) return;

  // Word display box
  fill(255, 255, 255, 230);
  stroke('#2196F3');
  strokeWeight(3);
  rect(canvasWidth/2 - 120, 60, 240, 90, 15);

  // Emoji
  textSize(50);
  textAlign(CENTER, CENTER);
  noStroke();
  fill('black');
  let emoji = emojiMap[currentWord.image] || "❓";
  text(emoji, canvasWidth/2, 95);

  // Word text
  textSize(28);
  fill('#1976D2');
  text(currentWord.word, canvasWidth/2, 135);
}

function drawTapArea() {
  // Large tap circle
  let centerX = canvasWidth / 2;
  let centerY = 240;
  let baseSize = 120;
  let pulse = sin(pulsePhase) * 5;

  // Outer glow
  noStroke();
  for (let i = 3; i >= 0; i--) {
    fill(76, 175, 80, 30 - i * 7);
    ellipse(centerX, centerY, baseSize + pulse + i * 15, baseSize + pulse + i * 15);
  }

  // Main circle
  fill('#4CAF50');
  stroke('#388E3C');
  strokeWeight(4);
  ellipse(centerX, centerY, baseSize + pulse, baseSize + pulse);

  // Inner highlight
  fill(255, 255, 255, 50);
  noStroke();
  ellipse(centerX - 15, centerY - 15, 40, 40);

  // Tap text
  fill('white');
  textSize(20);
  textAlign(CENTER, CENTER);
  noStroke();
  text('TAP!', centerX, centerY);

  // Tap count display
  fill('#333');
  textSize(18);
  textAlign(CENTER, TOP);
  text('Taps: ' + tapCount, centerX, centerY + 70);
}

function drawStars() {
  let startX = canvasWidth/2 - (tapCount * 25)/2;
  let y = 320;

  // Draw stars for each tap
  for (let i = 0; i < tapCount; i++) {
    let x = startX + i * 30 + 15;

    // Star animation
    let bounce = sin(pulsePhase + i * 0.5) * 3;

    fill('#FFD700');
    stroke('#FFA000');
    strokeWeight(2);
    drawStar(x, y + bounce, 8, 16, 5);
  }

  // Draw hint text
  if (tapCount === 0) {
    fill('#999');
    textSize(14);
    textAlign(CENTER, CENTER);
    noStroke();
    text('Stars will appear as you tap!', canvasWidth/2, y+50);
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

function drawResult() {
  // Background overlay
  fill(0, 0, 0, 100);
  noStroke();
  rect(canvasWidth/2 - 140, 165, 280, 130, 15);

  if (resultCorrect) {
    // Correct answer
    fill('#4CAF50');
    textSize(28);
    textAlign(CENTER, CENTER);
    text('Great Job! ⭐', canvasWidth/2, 195);

    fill('white');
    textSize(18);
    text(currentWord.word + ' has ' + getPhonemeCount() + ' sounds!', canvasWidth/2, 230);

    // Show phoneme breakdown
    textSize(22);
    let phonemes = Array.isArray(currentWord.phonemes) ?
                   currentWord.phonemes.join(' - ') :
                   currentWord.phonemes;
    text('/' + phonemes + '/', canvasWidth/2, 265);
  } else {
    // Incorrect answer
    fill('#FF5722');
    textSize(24);
    textAlign(CENTER, CENTER);
    text('Try Again! 🔄', canvasWidth/2, 195);

    fill('white');
    textSize(16);
    text('Listen carefully and count each sound.', canvasWidth/2, 225);
    text('You said ' + tapCount + ', but ' + currentWord.word, canvasWidth/2, 250);
    text('has ' + getPhonemeCount() + ' sounds.', canvasWidth/2, 270);
  }
}

function updateAndDrawParticles() {
  for (let i = celebrationParticles.length - 1; i >= 0; i--) {
    let p = celebrationParticles[i];

    // Draw particle as star
    push();
    translate(p.x, p.y);
    rotate(p.rotation);
    fill(p.color);
    noStroke();
    drawStar(0, 0, p.size/3, p.size/1.5, 5);
    pop();

    // Update physics
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.2; // gravity
    p.rotation += p.rotSpeed;
    p.alpha -= 3;

    // Remove faded particles
    if (p.alpha <= 0 || p.y > drawHeight) {
      celebrationParticles.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (showResult) return;

  // Check if tap is in the tap area
  let centerX = canvasWidth / 2;
  let centerY = 240;
  let d = dist(mouseX, mouseY, centerX, centerY);

  if (d < 70 && mouseY < drawHeight) {
    tapCount++;
    playTapSound();

    // Add visual feedback
    createTapFeedback(mouseX, mouseY);
  }
}

function touchStarted() {
  if (showResult) return;

  let centerX = canvasWidth / 2;
  let centerY = 240;
  let d = dist(mouseX, mouseY, centerX, centerY);

  if (d < 70 && mouseY < drawHeight) {
    tapCount++;
    playTapSound();
    createTapFeedback(mouseX, mouseY);
  }
  return false;
}

function createTapFeedback(x, y) {
  // Add a small burst of particles
  for (let i = 0; i < 5; i++) {
    celebrationParticles.push({
      x: x,
      y: y,
      vx: random(-3, 3),
      vy: random(-5, -2),
      size: random(8, 15),
      color: color(random(['#FFD700', '#FFA500', '#FF6B6B', '#4CAF50'])),
      alpha: 255,
      rotation: random(TWO_PI),
      rotSpeed: random(-0.1, 0.1)
    });
  }
}

function getPhonemeCount() {
  if (!currentWord) return 0;
  return Array.isArray(currentWord.phonemes) ?
         currentWord.phonemes.length :
         currentWord.phonemes.split('-').length;
}

function speakWord() {
  if (!currentWord || !('speechSynthesis' in window)) return;

  let utterance = new SpeechSynthesisUtterance(currentWord.word);
  utterance.rate = 0.7;
  utterance.pitch = 1.1;
  speechSynthesis.speak(utterance);
}

function speakPhonemes() {
  if (!currentWord || !('speechSynthesis' in window)) return;

  let phonemes = Array.isArray(currentWord.phonemes) ?
                 currentWord.phonemes :
                 currentWord.phonemes.split('-');

  // Speak each phoneme with a pause
  phonemes.forEach((phoneme, i) => {
    setTimeout(() => {
      let utterance = new SpeechSynthesisUtterance(phoneme);
      utterance.rate = 0.6;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }, i * 600);
  });
}

function checkAnswer() {
  if (!currentWord) return;

  let correctCount = getPhonemeCount();
  resultCorrect = (tapCount === correctCount);
  showResult = true;

  if (resultCorrect) {
    playCelebrationSound();
    createCelebration();
    // Speak phonemes after a delay
    setTimeout(speakPhonemes, 500);
  } else {
    playIncorrectSound();
  }
}

function createCelebration() {
  for (let i = 0; i < 30; i++) {
    celebrationParticles.push({
      x: canvasWidth / 2 + random(-50, 50),
      y: 200,
      vx: random(-6, 6),
      vy: random(-10, -4),
      size: random(10, 20),
      color: color(random(['#FFD700', '#FFA500', '#FF6B6B', '#4CAF50', '#2196F3', '#9C27B0'])),
      alpha: 255,
      rotation: random(TWO_PI),
      rotSpeed: random(-0.15, 0.15)
    });
  }
}

function newWord() {
  // Filter words by difficulty
  let filteredWords = wordData;
  if (difficulty !== 'all') {
    let targetCount = parseInt(difficulty);
    filteredWords = wordData.filter(w => {
      let count = Array.isArray(w.phonemes) ? w.phonemes.length : w.phonemes.split('-').length;
      return count === targetCount;
    });
  }

  // Select random word
  currentWord = random(filteredWords);
  tapCount = 0;
  showResult = false;
  celebrationParticles = [];

  // Speak the word
  setTimeout(speakWord, 300);
}

function changeDifficulty() {
  difficulty = difficultySelect.value();
  newWord();
}

function playTapSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Pitch increases with tap count
    oscillator.frequency.value = 400 + tapCount * 80;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
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

      let startTime = audioContext.currentTime + i * 0.12;
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.25);
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

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  difficultySelect.position(canvasWidth - 90, drawHeight + 18);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
