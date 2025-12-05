// Letter Hunt MicroSim
// Find and click target letters hidden among other letters
// Designed for kindergarten students learning letter recognition

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Game state
let targetLetter = 'A';
let letters = [];
let foundCount = 0;
let totalTargets = 0;
let sparkles = [];
let gameComplete = false;

// Difficulty settings
let difficulty = 'easy';
let difficultySelect;

// Letter settings
let letterSize = 48;
let letterPadding = 60;

// Colors for letters (bright, engaging colors for children)
let letterColors = [
  '#E74C3C', // red
  '#3498DB', // blue
  '#27AE60', // green
  '#9B59B6', // purple
  '#F39C12', // orange
  '#1ABC9C', // teal
  '#E91E63', // pink
  '#795548'  // brown
];

// Confusable letter pairs for harder difficulties
let confusablePairs = {
  'b': ['d', 'p', 'q'],
  'd': ['b', 'p', 'q'],
  'p': ['b', 'd', 'q'],
  'q': ['b', 'd', 'p'],
  'm': ['n', 'w'],
  'n': ['m', 'u'],
  'w': ['m', 'v'],
  'v': ['w', 'u'],
  'u': ['n', 'v'],
  'i': ['l', 'j'],
  'l': ['i', 't'],
  'j': ['i', 'g'],
  'c': ['o', 'e'],
  'o': ['c', 'a'],
  'e': ['c', 'a'],
  'a': ['o', 'e'],
  's': ['z', '5'],
  'z': ['s', '2']
};

// UI elements
let newGameButton;
let speakButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create difficulty dropdown
  difficultySelect = createSelect();
  difficultySelect.position(margin, drawHeight + 45);
  difficultySelect.option('Easy', 'easy');
  difficultySelect.option('Medium', 'medium');
  difficultySelect.option('Hard', 'hard');
  difficultySelect.selected('easy');
  difficultySelect.changed(changeDifficulty);
  difficultySelect.style('font-size', '16px');
  difficultySelect.style('padding', '5px');

  // Create New Game button
  newGameButton = createButton('New Game');
  newGameButton.position(margin + 100, drawHeight + 43);
  newGameButton.mousePressed(startNewGame);
  newGameButton.style('font-size', '16px');
  newGameButton.style('padding', '8px 16px');
  newGameButton.style('background-color', '#4CAF50');
  newGameButton.style('color', 'white');
  newGameButton.style('border', 'none');
  newGameButton.style('border-radius', '5px');
  newGameButton.style('cursor', 'pointer');

  // Create Speak button
  speakButton = createButton('🔊');
  speakButton.position(margin + 220, drawHeight + 43);
  speakButton.mousePressed(speakLetter);
  speakButton.style('font-size', '20px');
  speakButton.style('padding', '5px 12px');
  speakButton.style('cursor', 'pointer');

  textFont('Arial');

  startNewGame();

  describe('Letter Hunt game where children find and click target letters among other letters', LABEL);
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

  // Draw target letter area at top
  drawTargetArea();

  // Draw scattered letters
  drawLetters();

  // Draw sparkles
  drawSparkles();

  // Draw game complete message
  if (gameComplete) {
    drawCompleteMessage();
  }

  // Draw score
  drawScore();

  // Draw control labels
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text('Difficulty:', margin, drawHeight + 12);
}

function drawTargetArea() {
  // Target area background
  fill(255, 255, 200);
  stroke('#FFD700');
  strokeWeight(3);
  rect(canvasWidth/2 - 100, 10, 200, 70, 10);

  // "Find the letter:" text
  fill('black');
  noStroke();
  textSize(16);
  textAlign(CENTER, TOP);
  text('Find the letter:', canvasWidth/2, 18);

  // Target letter (large and prominent)
  fill('#E74C3C');
  textSize(40);
  textAlign(CENTER, CENTER);
  text(targetLetter, canvasWidth/2, 55);
}

function drawLetters() {
  textAlign(CENTER, CENTER);

  for (let letter of letters) {
    if (!letter.found) {
      // Draw letter background circle for better touch target
      fill(255, 255, 255, 200);
      stroke(letter.color);
      strokeWeight(2);
      ellipse(letter.x, letter.y, letterSize + 10, letterSize + 10);

      // Draw the letter
      fill(letter.color);
      noStroke();
      textSize(letterSize);
      text(letter.char, letter.x, letter.y);
    } else {
      // Draw found indicator (checkmark in green circle)
      fill(200, 255, 200);
      stroke('#27AE60');
      strokeWeight(2);
      ellipse(letter.x, letter.y, letterSize + 10, letterSize + 10);

      fill('#27AE60');
      noStroke();
      textSize(letterSize * 0.8);
      text('✓', letter.x, letter.y);
    }
  }
}

function drawSparkles() {
  for (let i = sparkles.length - 1; i >= 0; i--) {
    let s = sparkles[i];

    // Draw sparkle star
    push();
    translate(s.x, s.y);
    rotate(s.rotation);
    fill(255, 215, 0, s.alpha);
    noStroke();
    drawStar(0, 0, s.size/2, s.size, 5);
    pop();

    // Update sparkle
    s.y -= s.speed;
    s.x += s.drift;
    s.rotation += 0.1;
    s.alpha -= 5;
    s.size *= 0.98;

    // Remove faded sparkles
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

function drawCompleteMessage() {
  // Semi-transparent overlay
  fill(0, 0, 0, 100);
  noStroke();
  rect(0, 100, canvasWidth, 150);

  // Success message
  fill('#FFD700');
  stroke('black');
  strokeWeight(3);
  textSize(36);
  textAlign(CENTER, CENTER);
  text('Great Job! 🌟', canvasWidth/2, 150);

  fill('white');
  noStroke();
  textSize(20);
  text('You found all the letters!', canvasWidth/2, 195);
  text('Click "New Game" to play again', canvasWidth/2, 225);
}

function drawScore() {
  // Score display in top right
  fill(255, 255, 255, 230);
  stroke('#4CAF50');
  strokeWeight(2);
  rect(canvasWidth - 110, 10, 100, 40, 8);

  fill('black');
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Found: ' + foundCount + '/' + totalTargets, canvasWidth - 60, 30);
}

function mousePressed() {
  // Check if click is in the drawing area
  if (mouseY > 90 && mouseY < drawHeight - 10) {
    checkLetterClick(mouseX, mouseY);
  }
}

function touchStarted() {
  // Handle touch for mobile/tablet
  if (mouseY > 90 && mouseY < drawHeight - 10) {
    checkLetterClick(mouseX, mouseY);
  }
  return false; // Prevent default
}

function checkLetterClick(x, y) {
  if (gameComplete) return;

  for (let letter of letters) {
    if (!letter.found) {
      let d = dist(x, y, letter.x, letter.y);
      if (d < (letterSize + 10) / 2) {
        // Letter was clicked
        if (letter.char.toLowerCase() === targetLetter.toLowerCase()) {
          // Correct letter found!
          letter.found = true;
          foundCount++;
          createSparkles(letter.x, letter.y);
          playCorrectSound();

          // Check if game complete
          if (foundCount >= totalTargets) {
            gameComplete = true;
            playWinSound();
          }
        } else {
          // Wrong letter - gentle feedback
          playTryAgainSound();
          // Visual shake effect
          letter.shake = 10;
        }
        return;
      }
    }
  }
}

function createSparkles(x, y) {
  for (let i = 0; i < 12; i++) {
    sparkles.push({
      x: x + random(-20, 20),
      y: y + random(-20, 20),
      size: random(15, 30),
      alpha: 255,
      speed: random(1, 3),
      drift: random(-1, 1),
      rotation: random(TWO_PI)
    });
  }
}

function startNewGame() {
  letters = [];
  sparkles = [];
  foundCount = 0;
  gameComplete = false;

  // Choose a random target letter (uppercase for visibility)
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  targetLetter = alphabet[floor(random(alphabet.length))];

  // Get distractors based on difficulty
  let distractors = getDistractors(targetLetter);

  // Calculate grid for letter placement
  let gridCols = difficulty === 'easy' ? 4 : (difficulty === 'medium' ? 5 : 6);
  let gridRows = difficulty === 'easy' ? 4 : (difficulty === 'medium' ? 5 : 5);

  let cellWidth = (canvasWidth - 2 * margin) / gridCols;
  let cellHeight = (drawHeight - 100 - margin) / gridRows;
  let startY = 100;

  // Number of target letters
  totalTargets = difficulty === 'easy' ? 3 : (difficulty === 'medium' ? 4 : 5);

  // Create positions array
  let positions = [];
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      positions.push({
        x: margin + cellWidth/2 + col * cellWidth + random(-10, 10),
        y: startY + cellHeight/2 + row * cellHeight + random(-10, 10)
      });
    }
  }

  // Shuffle positions
  shuffleArray(positions);

  // Place target letters first
  for (let i = 0; i < totalTargets && i < positions.length; i++) {
    letters.push({
      char: targetLetter,
      x: positions[i].x,
      y: positions[i].y,
      color: letterColors[floor(random(letterColors.length))],
      found: false,
      shake: 0
    });
  }

  // Fill remaining positions with distractors
  for (let i = totalTargets; i < positions.length; i++) {
    let distractor = distractors[floor(random(distractors.length))];
    letters.push({
      char: distractor,
      x: positions[i].x,
      y: positions[i].y,
      color: letterColors[floor(random(letterColors.length))],
      found: false,
      shake: 0
    });
  }

  // Shuffle the letters array so targets aren't always first
  shuffleArray(letters);
}

function getDistractors(target) {
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let distractors = [];
  let targetLower = target.toLowerCase();

  if (difficulty === 'easy') {
    // Easy: Use very different looking letters
    let easyLetters = 'AEIOUWXYZ';
    for (let c of easyLetters) {
      if (c !== target) distractors.push(c);
    }
    // Add some random others
    for (let c of alphabet) {
      if (c !== target && !confusablePairs[targetLower]?.includes(c.toLowerCase())) {
        distractors.push(c);
      }
    }
  } else if (difficulty === 'medium') {
    // Medium: Mix of letters, some similar
    for (let c of alphabet) {
      if (c !== target) distractors.push(c);
    }
  } else {
    // Hard: Prioritize confusable letters
    if (confusablePairs[targetLower]) {
      for (let c of confusablePairs[targetLower]) {
        distractors.push(c.toUpperCase());
        distractors.push(c.toUpperCase()); // Add twice to increase frequency
      }
    }
    for (let c of alphabet) {
      if (c !== target) distractors.push(c);
    }
  }

  return distractors;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function changeDifficulty() {
  difficulty = difficultySelect.value();
  startNewGame();
}

function speakLetter() {
  if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(targetLetter);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    speechSynthesis.speak(utterance);
  }
}

function playCorrectSound() {
  // Use Web Audio API for a pleasant "ding" sound
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 880; // A5 note
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {
    // Audio not available
  }
}

function playTryAgainSound() {
  // Lower, gentler tone for "try again"
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 220; // A3 note
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (e) {
    // Audio not available
  }
}

function playWinSound() {
  // Celebratory ascending notes
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let notes = [523, 659, 784, 1047]; // C5, E5, G5, C6

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
  } catch (e) {
    // Audio not available
  }
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
