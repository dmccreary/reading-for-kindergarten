// Word Counter MicroSim
// Count spoken words in a sentence by tapping once per word
// Designed for kindergarten students learning concept of word

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Sentence data - simple sentences for kindergarteners
const sentenceData = [
  // 2 word sentences
  {sentence: "Run fast.", words: 2},
  {sentence: "I play.", words: 2},
  {sentence: "Go home.", words: 2},
  {sentence: "Big dog.", words: 2},
  {sentence: "Red ball.", words: 2},

  // 3 word sentences
  {sentence: "I am happy.", words: 3},
  {sentence: "The cat runs.", words: 3},
  {sentence: "I like dogs.", words: 3},
  {sentence: "She is big.", words: 3},
  {sentence: "He can jump.", words: 3},
  {sentence: "I see you.", words: 3},
  {sentence: "We play ball.", words: 3},

  // 4 word sentences
  {sentence: "The dog is big.", words: 4},
  {sentence: "I like to run.", words: 4},
  {sentence: "She has a cat.", words: 4},
  {sentence: "We go to school.", words: 4},
  {sentence: "I can see you.", words: 4},
  {sentence: "The sun is hot.", words: 4},

  // 5 word sentences
  {sentence: "I like to play ball.", words: 5},
  {sentence: "The big dog can run.", words: 5},
  {sentence: "She has a red hat.", words: 5},
  {sentence: "We can go to school.", words: 5},
  {sentence: "I see a big cat.", words: 5}
];

// Game state
let currentSentence;
let tapCount = 0;
let blocks = [];
let showResult = false;
let resultCorrect = false;
let celebrationParticles = [];
let difficulty = 'all'; // '2', '3', '4', '5', 'all'

// Block colors (bright, friendly colors)
const blockColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
];

// UI Elements
let speakButton, checkButton, newSentenceButton, difficultySelect;

// Animation
let pulsePhase = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create Hear Sentence button
  speakButton = createButton('Hear Sentence');
  speakButton.position(margin, drawHeight + 15);
  speakButton.mousePressed(speakSentence);
  speakButton.style('font-size', '14px');
  speakButton.style('padding', '8px 10px');
  speakButton.style('background-color', '#4CAF50');
  speakButton.style('color', 'white');
  speakButton.style('border', 'none');
  speakButton.style('border-radius', '5px');
  speakButton.style('cursor', 'pointer');

  // Create Check Answer button
  checkButton = createButton('Check');
  checkButton.position(margin + 120, drawHeight + 15);
  checkButton.mousePressed(checkAnswer);
  checkButton.style('font-size', '14px');
  checkButton.style('padding', '8px 12px');
  checkButton.style('cursor', 'pointer');

  // Create New Sentence button
  newSentenceButton = createButton('New');
  newSentenceButton.position(margin + 190, drawHeight + 15);
  newSentenceButton.mousePressed(newSentence);
  newSentenceButton.style('font-size', '14px');
  newSentenceButton.style('padding', '8px 12px');
  newSentenceButton.style('cursor', 'pointer');

  // Create difficulty dropdown
  difficultySelect = createSelect();
  difficultySelect.position(canvasWidth - 95, drawHeight + 18);
  difficultySelect.option('All', 'all');
  difficultySelect.option('2 words', '2');
  difficultySelect.option('3 words', '3');
  difficultySelect.option('4 words', '4');
  difficultySelect.option('5 words', '5');
  difficultySelect.selected('all');
  difficultySelect.changed(changeDifficulty);
  difficultySelect.style('font-size', '14px');

  textFont('Arial');
  newSentence();

  describe('Word Counter game where children tap to count words in sentences', LABEL);
}

function draw() {
  updateCanvasSize();
  pulsePhase += 0.05;

  // Drawing area background
  fill('#FFF8E1');
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
  text('Word Counter', canvasWidth / 2, 10);

  // Draw instructions
  textSize(14);
  fill('#666');
  text('Tap the circle for each word you hear!', canvasWidth / 2, 38);

  // Draw sentence display area
  drawSentenceArea();

  // Draw tap area
  drawTapArea();

  // Draw word blocks
  drawBlocks();

  // Draw result
  if (showResult) {
    drawResult();
  }

  // Draw celebration particles
  updateAndDrawParticles();
}

function drawSentenceArea() {
  if (!currentSentence) return;

  // Sentence display box
  fill(255, 255, 255, 230);
  stroke('#FF9800');
  strokeWeight(3);
  rect(canvasWidth/2 - 150, 60, 300, 60, 10);

  // Sentence text
  textSize(20);
  fill('#E65100');
  textAlign(CENTER, CENTER);
  noStroke();
  text('"' + currentSentence.sentence + '"', canvasWidth/2, 90);
}

function drawTapArea() {
  // Large tap circle
  let centerX = canvasWidth / 2;
  let centerY = 200;
  let baseSize = 100;
  let pulse = sin(pulsePhase) * 5;

  // Outer glow
  noStroke();
  for (let i = 3; i >= 0; i--) {
    fill(255, 152, 0, 30 - i * 7);
    ellipse(centerX, centerY, baseSize + pulse + i * 12, baseSize + pulse + i * 12);
  }

  // Main circle
  fill('#FF9800');
  stroke('#E65100');
  strokeWeight(4);
  ellipse(centerX, centerY, baseSize + pulse, baseSize + pulse);

  // Inner highlight
  fill(255, 255, 255, 60);
  noStroke();
  ellipse(centerX - 12, centerY - 12, 30, 30);

  // Tap text
  fill('white');
  textSize(18);
  textAlign(CENTER, CENTER);
  noStroke();
  text('TAP!', centerX, centerY);

  // Tap count display
  fill('#333');
  textSize(16);
  textAlign(CENTER, TOP);
  text('Words counted: ' + tapCount, centerX, centerY + 60);
}

function drawBlocks() {
  if (blocks.length === 0) {
    // Hint text
    fill('#999');
    textSize(14);
    textAlign(CENTER, CENTER);
    noStroke();
    text('Blocks will appear as you tap!', canvasWidth/2, 320);
    return;
  }

  // Calculate block layout
  let blockWidth = min(60, (canvasWidth - 40) / max(blocks.length, 1) - 10);
  let totalWidth = blocks.length * (blockWidth + 10) - 10;
  let startX = (canvasWidth - totalWidth) / 2;
  let y = 310;

  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i];
    let x = startX + i * (blockWidth + 10);

    // Block animation
    let bounce = sin(pulsePhase + i * 0.5) * 3;
    let scale = block.scale || 1;

    push();
    translate(x + blockWidth/2, y + bounce);

    // Block shadow
    fill(0, 0, 0, 30);
    noStroke();
    rect(-blockWidth/2 + 3, 3, blockWidth * scale, 50 * scale, 8);

    // Block
    fill(block.color);
    stroke(255, 255, 255, 100);
    strokeWeight(2);
    rect(-blockWidth/2, -25 * scale, blockWidth * scale, 50 * scale, 8);

    // Block number
    fill('white');
    textSize(20 * scale);
    textAlign(CENTER, CENTER);
    noStroke();
    text(i + 1, 0, 0);

    pop();
  }
}

function drawResult() {
  // Background overlay
  fill(0, 0, 0, 100);
  noStroke();
  rect(canvasWidth/2 - 150, 135, 300, 130, 15);

  if (resultCorrect) {
    // Correct answer
    fill('#4CAF50');
    textSize(26);
    textAlign(CENTER, CENTER);
    text('Great Job!', canvasWidth/2, 165);

    fill('white');
    textSize(16);
    let sentenceText = currentSentence.sentence;
    text('The sentence has ' + currentSentence.words + ' words!', canvasWidth/2, 200);

    // Show words with highlighting
    textSize(14);
    let wordsArray = sentenceText.split(' ');
    text(wordsArray.join('  |  '), canvasWidth/2, 235);
  } else {
    // Incorrect answer
    fill('#FF5722');
    textSize(24);
    textAlign(CENTER, CENTER);
    text('Try Again!', canvasWidth/2, 165);

    fill('white');
    textSize(14);
    text('Listen carefully to each word.', canvasWidth/2, 195);
    text('You counted ' + tapCount + ' words,', canvasWidth/2, 220);
    text('but there are ' + currentSentence.words + ' words.', canvasWidth/2, 245);
  }
}

function updateAndDrawParticles() {
  for (let i = celebrationParticles.length - 1; i >= 0; i--) {
    let p = celebrationParticles[i];

    // Draw particle as block
    push();
    translate(p.x, p.y);
    rotate(p.rotation);
    fill(p.color);
    noStroke();
    rect(-p.size/2, -p.size/2, p.size, p.size, 3);
    pop();

    // Update physics
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.25; // gravity
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
  let centerY = 200;
  let d = dist(mouseX, mouseY, centerX, centerY);

  if (d < 60 && mouseY < drawHeight && mouseY > 60) {
    tapCount++;
    addBlock();
    playTapSound();
  }
}

function touchStarted() {
  if (showResult) return;

  let centerX = canvasWidth / 2;
  let centerY = 200;
  let d = dist(mouseX, mouseY, centerX, centerY);

  if (d < 60 && mouseY < drawHeight && mouseY > 60) {
    tapCount++;
    addBlock();
    playTapSound();
  }
  return false;
}

function addBlock() {
  blocks.push({
    color: blockColors[(tapCount - 1) % blockColors.length],
    scale: 0.1
  });

  // Animate block appearing
  let block = blocks[blocks.length - 1];
  animateBlockScale(block);
}

function animateBlockScale(block) {
  if (block.scale < 1) {
    block.scale = min(block.scale + 0.15, 1);
    setTimeout(() => animateBlockScale(block), 20);
  }
}

function speakSentence() {
  if (!currentSentence || !('speechSynthesis' in window)) return;

  // Cancel any ongoing speech
  speechSynthesis.cancel();

  let utterance = new SpeechSynthesisUtterance(currentSentence.sentence);
  utterance.rate = 0.8;
  utterance.pitch = 1.1;
  speechSynthesis.speak(utterance);
}

function speakWordsSlowly() {
  if (!currentSentence || !('speechSynthesis' in window)) return;

  let words = currentSentence.sentence.replace('.', '').replace('!', '').replace('?', '').split(' ');

  // Speak each word with a pause
  words.forEach((word, i) => {
    setTimeout(() => {
      let utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.7;
      utterance.pitch = 1.0;
      speechSynthesis.speak(utterance);
    }, i * 700);
  });
}

function checkAnswer() {
  if (!currentSentence) return;

  resultCorrect = (tapCount === currentSentence.words);
  showResult = true;

  if (resultCorrect) {
    playCelebrationSound();
    createCelebration();
    // Speak words slowly after a delay
    setTimeout(speakWordsSlowly, 500);
  } else {
    playIncorrectSound();
  }
}

function createCelebration() {
  for (let i = 0; i < 25; i++) {
    celebrationParticles.push({
      x: canvasWidth / 2 + random(-80, 80),
      y: 200,
      vx: random(-5, 5),
      vy: random(-8, -3),
      size: random(12, 22),
      color: blockColors[floor(random(blockColors.length))],
      alpha: 255,
      rotation: random(TWO_PI),
      rotSpeed: random(-0.1, 0.1)
    });
  }
}

function newSentence() {
  // Filter sentences by difficulty
  let filteredSentences = sentenceData;
  if (difficulty !== 'all') {
    let targetCount = parseInt(difficulty);
    filteredSentences = sentenceData.filter(s => s.words === targetCount);
  }

  // Select random sentence
  currentSentence = random(filteredSentences);
  tapCount = 0;
  blocks = [];
  showResult = false;
  celebrationParticles = [];

  // Speak the sentence
  setTimeout(speakSentence, 300);
}

function changeDifficulty() {
  difficulty = difficultySelect.value();
  newSentence();
}

function playTapSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Pitch increases with tap count
    oscillator.frequency.value = 350 + tapCount * 60;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.12);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.12);
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
  difficultySelect.position(canvasWidth - 95, drawHeight + 18);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
