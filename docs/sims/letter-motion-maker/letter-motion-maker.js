// Letter Motion Maker MicroSim
// Associate body motions with letter shapes for kinesthetic learning
// Designed for kindergarten students

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Letter motions - each letter has an associated body movement
const letterMotions = [
  { letter: 'A', motion: 'Arms up in a point like a tent', emoji: '⛺', pose: 'tent' },
  { letter: 'B', motion: 'Hands on belly, stick out tummy', emoji: '🤰', pose: 'belly' },
  { letter: 'C', motion: 'Curve arms like holding a ball', emoji: '🏀', pose: 'curve' },
  { letter: 'D', motion: 'One arm straight, one curved', emoji: '🚪', pose: 'door' },
  { letter: 'E', motion: 'Arms out at three levels', emoji: '📚', pose: 'shelves' },
  { letter: 'F', motion: 'Arms out at top two levels', emoji: '🚩', pose: 'flag' },
  { letter: 'G', motion: 'Curve arms, point one finger in', emoji: '🌀', pose: 'spiral' },
  { letter: 'H', motion: 'Arms down, hands at sides', emoji: '🧍', pose: 'standing' },
  { letter: 'I', motion: 'Stand straight, arms at sides', emoji: '🕯️', pose: 'candle' },
  { letter: 'J', motion: 'One arm up, curve at bottom', emoji: '🪝', pose: 'hook' },
  { letter: 'K', motion: 'One arm straight, other at angle', emoji: '⚔️', pose: 'kick' },
  { letter: 'L', motion: 'One arm down, one out straight', emoji: '📐', pose: 'corner' },
  { letter: 'M', motion: 'Arms up, hands touch at top', emoji: '⛰️', pose: 'mountain' },
  { letter: 'N', motion: 'Arms up in zigzag shape', emoji: '⚡', pose: 'zigzag' },
  { letter: 'O', motion: 'Arms in big circle in front', emoji: '⭕', pose: 'circle' },
  { letter: 'P', motion: 'One arm up with fist on top', emoji: '🎈', pose: 'balloon' },
  { letter: 'Q', motion: 'Arms circle, kick one leg out', emoji: '👸', pose: 'queen' },
  { letter: 'R', motion: 'One arm up, other kicks out', emoji: '🚀', pose: 'rocket' },
  { letter: 'S', motion: 'Sway body in S curve', emoji: '🐍', pose: 'snake' },
  { letter: 'T', motion: 'Arms straight out to sides', emoji: '✝️', pose: 'cross' },
  { letter: 'U', motion: 'Arms curve down like a cup', emoji: '🥤', pose: 'cup' },
  { letter: 'V', motion: 'Arms down in V shape', emoji: '✌️', pose: 'victory' },
  { letter: 'W', motion: 'Arms make double V down', emoji: '🌊', pose: 'wave' },
  { letter: 'X', motion: 'Cross arms in front', emoji: '❌', pose: 'cross-arms' },
  { letter: 'Y', motion: 'Arms up in Y shape', emoji: '🙌', pose: 'cheer' },
  { letter: 'Z', motion: 'Arms zigzag left to right', emoji: '⚡', pose: 'lightning' }
];

// Game state
let currentIndex = 0;
let showDemo = false;
let demoFrame = 0;
let stickFigure = { armAngle: 0, legAngle: 0, bodyTilt: 0 };
let practiceCount = 0;

// UI Elements
let prevButton, nextButton, demoButton, practiceButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create Previous button
  prevButton = createButton('< Prev');
  prevButton.position(margin, drawHeight + 15);
  prevButton.mousePressed(previousLetter);
  prevButton.style('font-size', '14px');
  prevButton.style('padding', '8px 12px');
  prevButton.style('cursor', 'pointer');

  // Create Show Motion button
  demoButton = createButton('Show Motion');
  demoButton.position(margin + 75, drawHeight + 15);
  demoButton.mousePressed(toggleDemo);
  demoButton.style('font-size', '14px');
  demoButton.style('padding', '8px 16px');
  demoButton.style('background-color', '#9C27B0');
  demoButton.style('color', 'white');
  demoButton.style('border', 'none');
  demoButton.style('border-radius', '5px');
  demoButton.style('cursor', 'pointer');

  // Create I Did It button
  practiceButton = createButton('I Did It!');
  practiceButton.position(margin + 195, drawHeight + 15);
  practiceButton.mousePressed(countPractice);
  practiceButton.style('font-size', '14px');
  practiceButton.style('padding', '8px 16px');
  practiceButton.style('background-color', '#4CAF50');
  practiceButton.style('color', 'white');
  practiceButton.style('border', 'none');
  practiceButton.style('border-radius', '5px');
  practiceButton.style('cursor', 'pointer');

  // Create Next button
  nextButton = createButton('Next >');
  nextButton.position(canvasWidth - 75, drawHeight + 15);
  nextButton.mousePressed(nextLetter);
  nextButton.style('font-size', '14px');
  nextButton.style('padding', '8px 12px');
  nextButton.style('cursor', 'pointer');

  textFont('Arial');

  describe('Letter Motion Maker for kinesthetic letter learning', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('#F3E5F5');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  fill('#7B1FA2');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Letter Motion Maker', canvasWidth / 2, 8);

  // Draw progress
  drawProgress();

  // Draw current letter
  drawLetterCard();

  // Draw stick figure
  drawStickFigure();

  // Draw motion instructions
  drawMotionInstructions();

  // Update demo animation
  if (showDemo) {
    updateDemoAnimation();
  }

  // Reposition button on resize
  nextButton.position(canvasWidth - 75, drawHeight + 15);
}

function drawProgress() {
  fill(255, 255, 255, 230);
  stroke('#9C27B0');
  strokeWeight(2);
  rect(canvasWidth - 130, 40, 120, 50, 8);

  fill('#333');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Letter ' + (currentIndex + 1) + ' of 26', canvasWidth - 70, 55);
  text('Practiced: ' + practiceCount, canvasWidth - 70, 72);
}

function drawLetterCard() {
  let currentMotion = letterMotions[currentIndex];

  // Letter card
  let cardX = 30;
  let cardY = 60;
  let cardWidth = 120;
  let cardHeight = 150;

  // Card shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(cardX + 4, cardY + 4, cardWidth, cardHeight, 15);

  // Card background
  fill('white');
  stroke('#9C27B0');
  strokeWeight(4);
  rect(cardX, cardY, cardWidth, cardHeight, 15);

  // Large letter
  fill('#7B1FA2');
  noStroke();
  textSize(72);
  textAlign(CENTER, CENTER);
  text(currentMotion.letter, cardX + cardWidth / 2, cardY + cardHeight / 2 - 10);

  // Emoji hint
  textSize(32);
  text(currentMotion.emoji, cardX + cardWidth / 2, cardY + cardHeight - 30);
}

function drawStickFigure() {
  let figureX = canvasWidth / 2 + 50;
  let figureY = 180;

  push();
  translate(figureX, figureY);

  // Apply body tilt
  rotate(stickFigure.bodyTilt);

  // Body colors
  let headColor = '#FFD54F';
  let bodyColor = '#7B1FA2';
  let limbColor = '#9C27B0';

  // Head
  fill(headColor);
  stroke(bodyColor);
  strokeWeight(3);
  ellipse(0, -60, 40, 40);

  // Smiley face
  fill('#333');
  noStroke();
  ellipse(-8, -62, 5, 5);
  ellipse(8, -62, 5, 5);
  noFill();
  stroke('#333');
  strokeWeight(2);
  arc(0, -55, 15, 10, 0, PI);

  // Body
  stroke(bodyColor);
  strokeWeight(6);
  line(0, -40, 0, 30);

  // Arms
  stroke(limbColor);
  strokeWeight(5);

  let currentMotion = letterMotions[currentIndex];
  let pose = currentMotion.pose;

  // Draw arms based on pose
  drawArms(pose);

  // Legs
  stroke(limbColor);
  strokeWeight(5);
  line(0, 30, -20, 80);
  line(0, 30, 20, 80);

  pop();
}

function drawArms(pose) {
  let armLen = 45;
  let anim = showDemo ? sin(demoFrame * 0.1) : 0;

  switch (pose) {
    case 'tent': // A - arms up in point
      line(0, -30, -30 + anim * 5, -70);
      line(0, -30, 30 - anim * 5, -70);
      break;

    case 'belly': // B - hands on belly
      line(0, -30, -25, -10);
      line(0, -30, 25, -10);
      break;

    case 'curve': // C - curved arms
      noFill();
      strokeWeight(5);
      arc(-30, -20, 40, 60, -HALF_PI, HALF_PI);
      break;

    case 'shelves': // E - three levels
      line(0, -30, -armLen, -30);
      line(0, -10, -armLen * 0.8, -10);
      line(0, 10, -armLen * 0.6, 10);
      break;

    case 'cross': // T - arms straight out
      line(0, -30, -armLen - anim * 5, -30);
      line(0, -30, armLen + anim * 5, -30);
      break;

    case 'cheer': // Y - arms up in Y
      line(0, -30, -35 - anim * 5, -70);
      line(0, -30, 35 + anim * 5, -70);
      break;

    case 'victory': // V - arms down in V
      line(0, -30, -35, 20);
      line(0, -30, 35, 20);
      break;

    case 'wave': // W - double V
      line(0, -30, -25, 10);
      line(0, -30, -10, -10);
      line(0, -30, 10, -10);
      line(0, -30, 25, 10);
      break;

    case 'circle': // O - big circle
      noFill();
      strokeWeight(5);
      ellipse(0, -10, 80 + anim * 10, 70);
      break;

    case 'mountain': // M - arms up touching
      line(0, -30, -30, -70);
      line(0, -30, 0, -55);
      line(0, -30, 30, -70);
      break;

    case 'corner': // L - corner shape
      line(0, -30, 0, 20);
      line(0, 20, 40, 20);
      break;

    case 'candle': // I - straight down
      line(0, -30, 0, 20);
      break;

    case 'hook': // J - hook shape
      line(0, -30, 0, 20);
      arc(-15, 20, 30, 20, 0, PI);
      break;

    case 'cross-arms': // X - crossed
      line(-30, -50, 30, 10);
      line(30, -50, -30, 10);
      break;

    case 'snake': // S - wavy
      push();
      rotate(anim * 0.3);
      noFill();
      beginShape();
      vertex(-20, -40);
      bezierVertex(-40, -30, -10, -10, -30, 0);
      bezierVertex(-50, 10, -10, 20, -30, 30);
      endShape();
      pop();
      break;

    default: // Default - arms down
      line(0, -30, -30, 10);
      line(0, -30, 30, 10);
  }
}

function drawMotionInstructions() {
  let currentMotion = letterMotions[currentIndex];

  // Instruction box
  let boxY = 280;

  fill(255, 255, 255, 240);
  stroke('#9C27B0');
  strokeWeight(2);
  rect(20, boxY, canvasWidth - 40, 80, 10);

  // Instruction text
  fill('#7B1FA2');
  noStroke();
  textSize(16);
  textAlign(CENTER, TOP);
  text('Make the letter ' + currentMotion.letter + '!', canvasWidth / 2, boxY + 10);

  fill('#333');
  textSize(14);
  textAlign(CENTER, CENTER);
  text(currentMotion.motion, canvasWidth / 2, boxY + 50);

  // Tip
  fill('#666');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Stand up and try it! Click "I Did It!" when you make the shape.', canvasWidth / 2, 375);
  text('Say the letter sound as you make the motion.', canvasWidth / 2, 392);
}

function updateDemoAnimation() {
  demoFrame++;

  if (demoFrame > 120) {
    showDemo = false;
    demoFrame = 0;
  }
}

function previousLetter() {
  currentIndex = (currentIndex - 1 + letterMotions.length) % letterMotions.length;
  showDemo = false;
  demoFrame = 0;
  speakLetter();
  playClickSound();
}

function nextLetter() {
  currentIndex = (currentIndex + 1) % letterMotions.length;
  showDemo = false;
  demoFrame = 0;
  speakLetter();
  playClickSound();
}

function toggleDemo() {
  showDemo = !showDemo;
  demoFrame = 0;
  if (showDemo) {
    speakLetter();
    speakMotion();
  }
}

function countPractice() {
  practiceCount++;
  playSuccessSound();
  speakLetter();

  // Auto-advance after practice
  setTimeout(nextLetter, 1000);
}

function speakLetter() {
  if (!('speechSynthesis' in window)) return;

  speechSynthesis.cancel();
  let currentMotion = letterMotions[currentIndex];
  let utterance = new SpeechSynthesisUtterance(currentMotion.letter);
  utterance.rate = 0.8;
  utterance.pitch = 1.1;
  speechSynthesis.speak(utterance);
}

function speakMotion() {
  if (!('speechSynthesis' in window)) return;

  let currentMotion = letterMotions[currentIndex];

  setTimeout(() => {
    let utterance = new SpeechSynthesisUtterance(currentMotion.motion);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }, 500);
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
