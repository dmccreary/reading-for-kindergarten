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
  { letter: 'A', motion: 'Arms down in a V, hands meet at bottom, bar across middle', emoji: '🔺', pose: 'tent' },
  { letter: 'B', motion: 'One arm straight down, other makes two bumps', emoji: '🅱️', pose: 'belly' },
  { letter: 'C', motion: 'Curve both arms to one side like a big C', emoji: '🌙', pose: 'curve' },
  { letter: 'D', motion: 'One arm straight down, other curves out like a belly', emoji: '🚪', pose: 'door' },
  { letter: 'E', motion: 'One arm down, three arms out like shelves', emoji: '📚', pose: 'shelves' },
  { letter: 'F', motion: 'One arm down, two arms out at top like a flag', emoji: '🚩', pose: 'flag' },
  { letter: 'G', motion: 'Curve arms like C, point one finger inward', emoji: '🌀', pose: 'spiral' },
  { letter: 'H', motion: 'Two arms straight down, connect with bar across', emoji: '🪜', pose: 'standing' },
  { letter: 'I', motion: 'Stand straight like a candle with arms out at top and bottom', emoji: '🕯️', pose: 'candle' },
  { letter: 'J', motion: 'Arm straight down with a hook at the bottom', emoji: '🪝', pose: 'hook' },
  { letter: 'K', motion: 'One arm straight down, two arms kick out from middle', emoji: '⚔️', pose: 'kick' },
  { letter: 'L', motion: 'One arm down, then kick out to the side at bottom', emoji: '📐', pose: 'corner' },
  { letter: 'M', motion: 'Arms make two mountain peaks going up and down', emoji: '⛰️', pose: 'mountain' },
  { letter: 'N', motion: 'Two arms straight down with a diagonal between', emoji: '📐', pose: 'zigzag' },
  { letter: 'O', motion: 'Arms make a big round circle', emoji: '⭕', pose: 'circle' },
  { letter: 'P', motion: 'One arm straight down, loop at top like a balloon', emoji: '🎈', pose: 'balloon' },
  { letter: 'Q', motion: 'Make a circle and add a little tail', emoji: '👸', pose: 'queen' },
  { letter: 'R', motion: 'One arm down, loop at top, leg kicks out', emoji: '🚀', pose: 'rocket' },
  { letter: 'S', motion: 'Sway your body in a curvy S snake shape', emoji: '🐍', pose: 'snake' },
  { letter: 'T', motion: 'Arms straight out on top, body straight down', emoji: '✝️', pose: 'cross' },
  { letter: 'U', motion: 'Two arms down with a curved bottom like a cup', emoji: '🥤', pose: 'cup' },
  { letter: 'V', motion: 'Arms down and out wide in V shape', emoji: '✌️', pose: 'victory' },
  { letter: 'W', motion: 'Arms zigzag up and down like waves', emoji: '🌊', pose: 'wave' },
  { letter: 'X', motion: 'Cross both arms diagonally making an X', emoji: '❌', pose: 'cross-arms' },
  { letter: 'Y', motion: 'Arms up in Y shape, body straight down', emoji: '🙌', pose: 'cheer' },
  { letter: 'Z', motion: 'Arms zigzag: across top, diagonal down, across bottom', emoji: '⚡', pose: 'lightning' }
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
  let armLen = 50;
  let anim = showDemo ? sin(demoFrame * 0.1) : 0;

  switch (pose) {
    case 'tent': // A - arms down in inverted V with crossbar
      // Two arms pointing down meeting at bottom (the A shape)
      line(0, -30, -35 - anim * 3, 30);  // Left arm down
      line(0, -30, 35 + anim * 3, 30);   // Right arm down
      // Crossbar in middle
      line(-18, 0, 18, 0);
      break;

    case 'belly': // B - vertical back with two curved bumps
      // Left arm straight down (the back of B)
      line(0, -30, -30, -30);
      line(-30, -30, -30, 25);
      // Right arm makes two curved bumps
      noFill();
      arc(-30, -15, 35, 30, -HALF_PI, HALF_PI);  // Top bump
      arc(-30, 10, 35, 30, -HALF_PI, HALF_PI);   // Bottom bump
      break;

    case 'curve': // C - arms curve to left making C shape
      noFill();
      strokeWeight(5);
      // Both arms curve left to form C
      arc(10, -5, 70 + anim * 5, 80, HALF_PI + 0.5, PI + HALF_PI - 0.5);
      break;

    case 'door': // D - straight back with curved front
      // Left side straight (back of D)
      line(-25, -40, -25, 25);
      // Right side curved (front of D)
      noFill();
      arc(-25, -7, 60, 66, -HALF_PI, HALF_PI);
      break;

    case 'shelves': // E - vertical with three horizontal prongs
      // Vertical line
      line(-30, -35, -30, 25);
      // Three horizontal prongs
      line(-30, -35, 15 + anim * 3, -35);  // Top
      line(-30, -5, 10, -5);               // Middle
      line(-30, 25, 15 + anim * 3, 25);    // Bottom
      break;

    case 'flag': // F - vertical with two horizontal prongs at top
      // Vertical line
      line(-30, -35, -30, 25);
      // Two horizontal prongs at top
      line(-30, -35, 15 + anim * 3, -35);  // Top
      line(-30, -10, 10, -10);             // Middle
      break;

    case 'spiral': // G - C shape with inward horizontal bar
      noFill();
      strokeWeight(5);
      // C curve
      arc(5, -5, 65, 75, HALF_PI + 0.3, PI + HALF_PI - 0.3);
      // Inward pointing bar
      strokeWeight(5);
      line(5, -5, -15, -5);
      break;

    case 'standing': // H - two verticals with crossbar
      // Two vertical arms
      line(-25, -35, -25, 25);
      line(25, -35, 25, 25);
      // Horizontal crossbar
      line(-25, -5 + anim * 3, 25, -5 + anim * 3);
      break;

    case 'candle': // I - simple vertical with serifs
      line(0, -35, 0, 25);
      // Top and bottom serifs
      line(-15, -35, 15, -35);
      line(-15, 25, 15, 25);
      break;

    case 'hook': // J - vertical with curved hook at bottom
      line(0, -35, 0, 15);
      // Top serif
      line(-15, -35, 15, -35);
      // Hook at bottom
      noFill();
      arc(-15, 15, 30, 25, 0, PI);
      break;

    case 'kick': // K - vertical with two diagonal arms meeting at middle
      // Vertical
      line(-25, -35, -25, 25);
      // Upper diagonal (going up-right)
      line(-25, -5, 20 + anim * 3, -40);
      // Lower diagonal (going down-right)
      line(-25, -5, 20 + anim * 3, 25);
      break;

    case 'corner': // L - vertical then horizontal
      // Vertical down
      line(-20, -35, -20, 25);
      // Horizontal right
      line(-20, 25, 30 + anim * 3, 25);
      break;

    case 'mountain': // M - two peaks
      // Left vertical
      line(-35, 25, -35, -35);
      // Up to first peak
      line(-35, -35, -10, -5);
      // Down to valley and up to second peak
      line(-10, -5, 10, -35);
      // Right vertical
      line(10, -35, 35, -5);
      line(35, -5, 35, 25);
      break;

    case 'zigzag': // N - two verticals with diagonal
      // Left vertical
      line(-25, -35, -25, 25);
      // Diagonal from top-left to bottom-right
      line(-25, -35, 25, 25);
      // Right vertical
      line(25, -35, 25, 25);
      break;

    case 'circle': // O - arms make full circle
      noFill();
      strokeWeight(5);
      ellipse(0, -5, 70 + anim * 8, 75);
      break;

    case 'balloon': // P - vertical with loop at top
      // Vertical line
      line(-25, -35, -25, 25);
      // Loop at top
      noFill();
      arc(-25, -20, 40, 35, -HALF_PI, HALF_PI);
      break;

    case 'queen': // Q - circle with diagonal tail
      noFill();
      strokeWeight(5);
      ellipse(0, -10, 60, 60);
      // Diagonal tail
      strokeWeight(5);
      line(15, 10, 35 + anim * 5, 35);
      break;

    case 'rocket': // R - like P but with diagonal leg
      // Vertical line
      line(-25, -35, -25, 25);
      // Loop at top
      noFill();
      arc(-25, -20, 40, 35, -HALF_PI, HALF_PI);
      // Diagonal leg kicking out
      line(-5, -3, 25 + anim * 3, 25);
      break;

    case 'snake': // S - curvy S shape
      noFill();
      strokeWeight(5);
      push();
      rotate(anim * 0.2);
      // S curve using bezier
      beginShape();
      vertex(20, -40);
      bezierVertex(-20, -40, 30, -10, -5, -5);
      bezierVertex(-40, 0, 30, 30, -10, 30);
      endShape();
      pop();
      break;

    case 'cross': // T - horizontal on top of vertical
      // Horizontal top
      line(-armLen - anim * 3, -35, armLen + anim * 3, -35);
      // Vertical down from center
      line(0, -35, 0, 25);
      break;

    case 'cup': // U - two verticals connected by curve at bottom
      // Left vertical
      line(-25, -35, -25, 5);
      // Curved bottom
      noFill();
      arc(0, 5, 50, 40, 0, PI);
      // Right vertical
      line(25, -35, 25, 5);
      break;

    case 'victory': // V - arms down in V shape
      line(0, 25, -35 - anim * 3, -35);
      line(0, 25, 35 + anim * 3, -35);
      break;

    case 'wave': // W - double V pointing down
      // Four points making W shape
      line(-35, -35, -18, 25);
      line(-18, 25, 0, -10);
      line(0, -10, 18, 25);
      line(18, 25, 35, -35);
      break;

    case 'cross-arms': // X - two diagonals crossing
      line(-30, -40, 30 + anim * 3, 25);
      line(30, -40, -30 - anim * 3, 25);
      break;

    case 'cheer': // Y - arms up in Y, then vertical down
      // Two arms up
      line(0, -10, -35 - anim * 3, -45);
      line(0, -10, 35 + anim * 3, -45);
      // Vertical down from junction
      line(0, -10, 0, 25);
      break;

    case 'lightning': // Z - horizontal zigzag
      // Top horizontal
      line(-25, -35, 25 + anim * 3, -35);
      // Diagonal down-left
      line(25, -35, -25, 25);
      // Bottom horizontal
      line(-25, 25, 25 + anim * 3, 25);
      break;

    default: // Default - arms down at sides
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
