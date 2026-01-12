// Letter Tracing MicroSim
// Trace letters with finger or mouse to learn proper letter formation
// Designed for kindergarten students learning to write letters

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Letter display settings
let letterSize = 280;
let letterX, letterY;

// Current letter state
let currentLetter = 'a';
let isUppercase = false;
let currentStrokeIndex = 0;
let currentPointIndex = 0;
let traceProgress = [];
let isTracing = false;
let traceComplete = false;

// Trail settings
let trailPoints = [];
let trailColors = [
  '#FF6B6B', '#FF8E53', '#FFD93D', '#6BCB77',
  '#4D96FF', '#9B59B6', '#FF6B9D'
];
let currentTrailColor;

// Tolerance for tracing (generous for young learners)
let traceTolerance = 35;

// Celebration particles
let particles = [];

// UI Elements
let prevButton, nextButton, uppercaseCheckbox, speakButton;

// Letter stroke data - simplified paths for common letters
// Each letter has strokes, each stroke has points
const letterStrokes = {
  // Lowercase letters
  'a': [
    // Circle part
    [{x: 0.7, y: 0.35}, {x: 0.6, y: 0.2}, {x: 0.4, y: 0.2}, {x: 0.25, y: 0.35},
     {x: 0.25, y: 0.55}, {x: 0.4, y: 0.7}, {x: 0.6, y: 0.7}, {x: 0.7, y: 0.55}],
    // Stem
    [{x: 0.7, y: 0.2}, {x: 0.7, y: 0.7}]
  ],
  'b': [
    // Stem (tall)
    [{x: 0.3, y: 0.0}, {x: 0.3, y: 0.7}],
    // Bump
    [{x: 0.3, y: 0.35}, {x: 0.45, y: 0.2}, {x: 0.65, y: 0.25}, {x: 0.7, y: 0.45},
     {x: 0.65, y: 0.65}, {x: 0.45, y: 0.7}, {x: 0.3, y: 0.55}]
  ],
  'c': [
    [{x: 0.7, y: 0.3}, {x: 0.55, y: 0.2}, {x: 0.4, y: 0.2}, {x: 0.25, y: 0.35},
     {x: 0.25, y: 0.55}, {x: 0.4, y: 0.7}, {x: 0.55, y: 0.7}, {x: 0.7, y: 0.6}]
  ],
  'd': [
    // Circle part
    [{x: 0.65, y: 0.55}, {x: 0.5, y: 0.7}, {x: 0.35, y: 0.7}, {x: 0.25, y: 0.55},
     {x: 0.25, y: 0.35}, {x: 0.35, y: 0.2}, {x: 0.5, y: 0.2}, {x: 0.65, y: 0.35}],
    // Stem (tall)
    [{x: 0.65, y: 0.0}, {x: 0.65, y: 0.7}]
  ],
  'e': [
    [{x: 0.25, y: 0.45}, {x: 0.7, y: 0.45}, {x: 0.7, y: 0.3}, {x: 0.55, y: 0.2},
     {x: 0.4, y: 0.2}, {x: 0.25, y: 0.35}, {x: 0.25, y: 0.55}, {x: 0.4, y: 0.7},
     {x: 0.55, y: 0.7}, {x: 0.7, y: 0.6}]
  ],
  'f': [
    // Curve top
    [{x: 0.65, y: 0.1}, {x: 0.5, y: 0.0}, {x: 0.35, y: 0.1}, {x: 0.35, y: 0.7}],
    // Cross bar
    [{x: 0.2, y: 0.35}, {x: 0.55, y: 0.35}]
  ],
  'g': [
    // Circle
    [{x: 0.65, y: 0.35}, {x: 0.5, y: 0.2}, {x: 0.35, y: 0.2}, {x: 0.25, y: 0.35},
     {x: 0.25, y: 0.5}, {x: 0.35, y: 0.65}, {x: 0.5, y: 0.65}, {x: 0.65, y: 0.5}],
    // Descender
    [{x: 0.65, y: 0.2}, {x: 0.65, y: 0.9}, {x: 0.5, y: 1.0}, {x: 0.3, y: 0.95}]
  ],
  'h': [
    // Stem
    [{x: 0.3, y: 0.0}, {x: 0.3, y: 0.7}],
    // Hump
    [{x: 0.3, y: 0.35}, {x: 0.45, y: 0.2}, {x: 0.6, y: 0.25}, {x: 0.65, y: 0.4}, {x: 0.65, y: 0.7}]
  ],
  'i': [
    // Stem
    [{x: 0.5, y: 0.25}, {x: 0.5, y: 0.7}],
    // Dot (represented as small stroke)
    [{x: 0.5, y: 0.1}, {x: 0.5, y: 0.12}]
  ],
  'j': [
    // Stem with hook
    [{x: 0.55, y: 0.25}, {x: 0.55, y: 0.85}, {x: 0.45, y: 0.95}, {x: 0.3, y: 0.9}],
    // Dot
    [{x: 0.55, y: 0.1}, {x: 0.55, y: 0.12}]
  ],
  'k': [
    // Stem
    [{x: 0.3, y: 0.0}, {x: 0.3, y: 0.7}],
    // Upper diagonal
    [{x: 0.65, y: 0.2}, {x: 0.3, y: 0.45}],
    // Lower diagonal
    [{x: 0.35, y: 0.4}, {x: 0.65, y: 0.7}]
  ],
  'l': [
    [{x: 0.5, y: 0.0}, {x: 0.5, y: 0.7}]
  ],
  'm': [
    // First stroke down
    [{x: 0.15, y: 0.2}, {x: 0.15, y: 0.7}],
    // First hump
    [{x: 0.15, y: 0.35}, {x: 0.25, y: 0.2}, {x: 0.4, y: 0.25}, {x: 0.45, y: 0.4}, {x: 0.45, y: 0.7}],
    // Second hump
    [{x: 0.45, y: 0.35}, {x: 0.55, y: 0.2}, {x: 0.7, y: 0.25}, {x: 0.8, y: 0.4}, {x: 0.8, y: 0.7}]
  ],
  'n': [
    // Stem
    [{x: 0.3, y: 0.2}, {x: 0.3, y: 0.7}],
    // Hump
    [{x: 0.3, y: 0.35}, {x: 0.45, y: 0.2}, {x: 0.6, y: 0.25}, {x: 0.65, y: 0.4}, {x: 0.65, y: 0.7}]
  ],
  'o': [
    [{x: 0.5, y: 0.2}, {x: 0.3, y: 0.25}, {x: 0.2, y: 0.45}, {x: 0.3, y: 0.65},
     {x: 0.5, y: 0.7}, {x: 0.7, y: 0.65}, {x: 0.8, y: 0.45}, {x: 0.7, y: 0.25}, {x: 0.5, y: 0.2}]
  ],
  'p': [
    // Stem (descender)
    [{x: 0.3, y: 0.2}, {x: 0.3, y: 1.0}],
    // Bump
    [{x: 0.3, y: 0.35}, {x: 0.45, y: 0.2}, {x: 0.65, y: 0.25}, {x: 0.7, y: 0.45},
     {x: 0.65, y: 0.6}, {x: 0.45, y: 0.65}, {x: 0.3, y: 0.5}]
  ],
  'q': [
    // Circle
    [{x: 0.65, y: 0.55}, {x: 0.5, y: 0.7}, {x: 0.35, y: 0.7}, {x: 0.25, y: 0.55},
     {x: 0.25, y: 0.35}, {x: 0.35, y: 0.2}, {x: 0.5, y: 0.2}, {x: 0.65, y: 0.35}],
    // Stem (descender)
    [{x: 0.65, y: 0.2}, {x: 0.65, y: 1.0}]
  ],
  'r': [
    // Stem
    [{x: 0.35, y: 0.2}, {x: 0.35, y: 0.7}],
    // Shoulder
    [{x: 0.35, y: 0.4}, {x: 0.45, y: 0.25}, {x: 0.6, y: 0.2}, {x: 0.7, y: 0.25}]
  ],
  's': [
    [{x: 0.65, y: 0.28}, {x: 0.55, y: 0.2}, {x: 0.4, y: 0.2}, {x: 0.3, y: 0.3},
     {x: 0.35, y: 0.42}, {x: 0.5, y: 0.48}, {x: 0.65, y: 0.55}, {x: 0.7, y: 0.62},
     {x: 0.6, y: 0.7}, {x: 0.45, y: 0.7}, {x: 0.3, y: 0.62}]
  ],
  't': [
    // Stem
    [{x: 0.45, y: 0.1}, {x: 0.45, y: 0.65}, {x: 0.55, y: 0.7}, {x: 0.65, y: 0.68}],
    // Cross bar
    [{x: 0.25, y: 0.3}, {x: 0.65, y: 0.3}]
  ],
  'u': [
    [{x: 0.3, y: 0.2}, {x: 0.3, y: 0.55}, {x: 0.4, y: 0.7}, {x: 0.55, y: 0.7}, {x: 0.65, y: 0.55}],
    [{x: 0.65, y: 0.2}, {x: 0.65, y: 0.7}]
  ],
  'v': [
    [{x: 0.2, y: 0.2}, {x: 0.5, y: 0.7}],
    [{x: 0.5, y: 0.7}, {x: 0.8, y: 0.2}]
  ],
  'w': [
    [{x: 0.1, y: 0.2}, {x: 0.3, y: 0.7}],
    [{x: 0.3, y: 0.7}, {x: 0.5, y: 0.35}],
    [{x: 0.5, y: 0.35}, {x: 0.7, y: 0.7}],
    [{x: 0.7, y: 0.7}, {x: 0.9, y: 0.2}]
  ],
  'x': [
    [{x: 0.25, y: 0.2}, {x: 0.75, y: 0.7}],
    [{x: 0.75, y: 0.2}, {x: 0.25, y: 0.7}]
  ],
  'y': [
    [{x: 0.25, y: 0.2}, {x: 0.5, y: 0.55}],
    [{x: 0.75, y: 0.2}, {x: 0.4, y: 0.9}, {x: 0.25, y: 0.95}]
  ],
  'z': [
    [{x: 0.25, y: 0.2}, {x: 0.75, y: 0.2}],
    [{x: 0.75, y: 0.2}, {x: 0.25, y: 0.7}],
    [{x: 0.25, y: 0.7}, {x: 0.75, y: 0.7}]
  ],
  // Uppercase letters
  'A': [
    [{x: 0.5, y: 0.1}, {x: 0.2, y: 0.75}],
    [{x: 0.5, y: 0.1}, {x: 0.8, y: 0.75}],
    [{x: 0.3, y: 0.5}, {x: 0.7, y: 0.5}]
  ],
  'B': [
    [{x: 0.25, y: 0.1}, {x: 0.25, y: 0.75}],
    [{x: 0.25, y: 0.1}, {x: 0.55, y: 0.1}, {x: 0.7, y: 0.2}, {x: 0.7, y: 0.35}, {x: 0.55, y: 0.43}, {x: 0.25, y: 0.43}],
    [{x: 0.25, y: 0.43}, {x: 0.6, y: 0.43}, {x: 0.75, y: 0.55}, {x: 0.75, y: 0.65}, {x: 0.6, y: 0.75}, {x: 0.25, y: 0.75}]
  ],
  'C': [
    [{x: 0.75, y: 0.2}, {x: 0.55, y: 0.1}, {x: 0.35, y: 0.1}, {x: 0.2, y: 0.25},
     {x: 0.2, y: 0.6}, {x: 0.35, y: 0.75}, {x: 0.55, y: 0.75}, {x: 0.75, y: 0.65}]
  ],
  'D': [
    [{x: 0.25, y: 0.1}, {x: 0.25, y: 0.75}],
    [{x: 0.25, y: 0.1}, {x: 0.5, y: 0.1}, {x: 0.7, y: 0.25}, {x: 0.75, y: 0.43},
     {x: 0.7, y: 0.6}, {x: 0.5, y: 0.75}, {x: 0.25, y: 0.75}]
  ],
  'E': [
    [{x: 0.7, y: 0.1}, {x: 0.25, y: 0.1}, {x: 0.25, y: 0.75}, {x: 0.7, y: 0.75}],
    [{x: 0.25, y: 0.43}, {x: 0.6, y: 0.43}]
  ],
  'F': [
    [{x: 0.7, y: 0.1}, {x: 0.25, y: 0.1}, {x: 0.25, y: 0.75}],
    [{x: 0.25, y: 0.43}, {x: 0.6, y: 0.43}]
  ],
  'G': [
    [{x: 0.75, y: 0.2}, {x: 0.55, y: 0.1}, {x: 0.35, y: 0.1}, {x: 0.2, y: 0.25},
     {x: 0.2, y: 0.6}, {x: 0.35, y: 0.75}, {x: 0.55, y: 0.75}, {x: 0.75, y: 0.6}, {x: 0.75, y: 0.43}],
    [{x: 0.5, y: 0.43}, {x: 0.75, y: 0.43}]
  ],
  'H': [
    [{x: 0.25, y: 0.1}, {x: 0.25, y: 0.75}],
    [{x: 0.75, y: 0.1}, {x: 0.75, y: 0.75}],
    [{x: 0.25, y: 0.43}, {x: 0.75, y: 0.43}]
  ],
  'I': [
    [{x: 0.35, y: 0.1}, {x: 0.65, y: 0.1}],
    [{x: 0.5, y: 0.1}, {x: 0.5, y: 0.75}],
    [{x: 0.35, y: 0.75}, {x: 0.65, y: 0.75}]
  ],
  'J': [
    [{x: 0.35, y: 0.1}, {x: 0.65, y: 0.1}],
    [{x: 0.55, y: 0.1}, {x: 0.55, y: 0.6}, {x: 0.45, y: 0.75}, {x: 0.3, y: 0.7}]
  ],
  'K': [
    [{x: 0.25, y: 0.1}, {x: 0.25, y: 0.75}],
    [{x: 0.75, y: 0.1}, {x: 0.25, y: 0.45}],
    [{x: 0.4, y: 0.35}, {x: 0.75, y: 0.75}]
  ],
  'L': [
    [{x: 0.3, y: 0.1}, {x: 0.3, y: 0.75}, {x: 0.75, y: 0.75}]
  ],
  'M': [
    [{x: 0.15, y: 0.75}, {x: 0.15, y: 0.1}],
    [{x: 0.15, y: 0.1}, {x: 0.5, y: 0.55}],
    [{x: 0.5, y: 0.55}, {x: 0.85, y: 0.1}],
    [{x: 0.85, y: 0.1}, {x: 0.85, y: 0.75}]
  ],
  'N': [
    [{x: 0.25, y: 0.75}, {x: 0.25, y: 0.1}],
    [{x: 0.25, y: 0.1}, {x: 0.75, y: 0.75}],
    [{x: 0.75, y: 0.75}, {x: 0.75, y: 0.1}]
  ],
  'O': [
    [{x: 0.5, y: 0.1}, {x: 0.25, y: 0.2}, {x: 0.2, y: 0.43}, {x: 0.25, y: 0.65},
     {x: 0.5, y: 0.75}, {x: 0.75, y: 0.65}, {x: 0.8, y: 0.43}, {x: 0.75, y: 0.2}, {x: 0.5, y: 0.1}]
  ],
  'P': [
    [{x: 0.25, y: 0.75}, {x: 0.25, y: 0.1}],
    [{x: 0.25, y: 0.1}, {x: 0.55, y: 0.1}, {x: 0.7, y: 0.2}, {x: 0.7, y: 0.35}, {x: 0.55, y: 0.45}, {x: 0.25, y: 0.45}]
  ],
  'Q': [
    [{x: 0.5, y: 0.1}, {x: 0.25, y: 0.2}, {x: 0.2, y: 0.43}, {x: 0.25, y: 0.65},
     {x: 0.5, y: 0.75}, {x: 0.75, y: 0.65}, {x: 0.8, y: 0.43}, {x: 0.75, y: 0.2}, {x: 0.5, y: 0.1}],
    [{x: 0.55, y: 0.55}, {x: 0.8, y: 0.8}]
  ],
  'R': [
    [{x: 0.25, y: 0.75}, {x: 0.25, y: 0.1}],
    [{x: 0.25, y: 0.1}, {x: 0.55, y: 0.1}, {x: 0.7, y: 0.2}, {x: 0.7, y: 0.35}, {x: 0.55, y: 0.45}, {x: 0.25, y: 0.45}],
    [{x: 0.45, y: 0.45}, {x: 0.75, y: 0.75}]
  ],
  'S': [
    [{x: 0.7, y: 0.2}, {x: 0.55, y: 0.1}, {x: 0.4, y: 0.1}, {x: 0.25, y: 0.2},
     {x: 0.3, y: 0.35}, {x: 0.5, y: 0.43}, {x: 0.7, y: 0.52}, {x: 0.75, y: 0.65},
     {x: 0.6, y: 0.75}, {x: 0.45, y: 0.75}, {x: 0.25, y: 0.65}]
  ],
  'T': [
    [{x: 0.2, y: 0.1}, {x: 0.8, y: 0.1}],
    [{x: 0.5, y: 0.1}, {x: 0.5, y: 0.75}]
  ],
  'U': [
    [{x: 0.25, y: 0.1}, {x: 0.25, y: 0.55}, {x: 0.35, y: 0.7}, {x: 0.5, y: 0.75},
     {x: 0.65, y: 0.7}, {x: 0.75, y: 0.55}, {x: 0.75, y: 0.1}]
  ],
  'V': [
    [{x: 0.2, y: 0.1}, {x: 0.5, y: 0.75}],
    [{x: 0.5, y: 0.75}, {x: 0.8, y: 0.1}]
  ],
  'W': [
    [{x: 0.1, y: 0.1}, {x: 0.3, y: 0.75}],
    [{x: 0.3, y: 0.75}, {x: 0.5, y: 0.35}],
    [{x: 0.5, y: 0.35}, {x: 0.7, y: 0.75}],
    [{x: 0.7, y: 0.75}, {x: 0.9, y: 0.1}]
  ],
  'X': [
    [{x: 0.2, y: 0.1}, {x: 0.8, y: 0.75}],
    [{x: 0.8, y: 0.1}, {x: 0.2, y: 0.75}]
  ],
  'Y': [
    [{x: 0.2, y: 0.1}, {x: 0.5, y: 0.43}],
    [{x: 0.8, y: 0.1}, {x: 0.5, y: 0.43}],
    [{x: 0.5, y: 0.43}, {x: 0.5, y: 0.75}]
  ],
  'Z': [
    [{x: 0.2, y: 0.1}, {x: 0.8, y: 0.1}],
    [{x: 0.8, y: 0.1}, {x: 0.2, y: 0.75}],
    [{x: 0.2, y: 0.75}, {x: 0.8, y: 0.75}]
  ]
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Calculate letter position
  letterX = canvasWidth / 2;
  letterY = drawHeight / 2 + 20;

  // Create Previous button
  prevButton = createButton('< Prev');
  prevButton.position(margin, drawHeight + 12);
  prevButton.mousePressed(previousLetter);
  prevButton.style('font-size', '16px');
  prevButton.style('padding', '8px 12px');
  prevButton.style('cursor', 'pointer');

  // Create Next button
  nextButton = createButton('Next >');
  nextButton.position(margin + 80, drawHeight + 12);
  nextButton.mousePressed(nextLetter);
  nextButton.style('font-size', '16px');
  nextButton.style('padding', '8px 12px');
  nextButton.style('cursor', 'pointer');

  // Create Uppercase checkbox
  uppercaseCheckbox = createCheckbox('Uppercase', false);
  uppercaseCheckbox.position(margin + 170, drawHeight + 15);
  uppercaseCheckbox.changed(toggleCase);
  uppercaseCheckbox.style('font-size', '16px');

  // Create Speak button
  speakButton = createButton('Hear Letter');
  speakButton.position(canvasWidth - 110, drawHeight + 12);
  speakButton.mousePressed(speakCurrentLetter);
  speakButton.style('font-size', '16px');
  speakButton.style('padding', '8px 12px');
  speakButton.style('cursor', 'pointer');
  speakButton.style('background-color', '#4CAF50');
  speakButton.style('color', 'white');
  speakButton.style('border', 'none');
  speakButton.style('border-radius', '5px');

  textFont('Arial');
  currentTrailColor = random(trailColors);

  resetTracing();

  describe('Letter Tracing MicroSim for learning letter formation by tracing with mouse or finger', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area - lined paper background
  drawLinedPaper();

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw the ghost letter (the letter to trace)
  drawGhostLetter();

  // Draw stroke guides with arrows and numbers
  drawStrokeGuides();

  // Draw the user's trail
  drawTrail();

  // Draw current target point
  if (!traceComplete) {
    drawTargetPoint();
  }

  // Draw particles for celebration
  updateAndDrawParticles();

  // Draw completion message
  if (traceComplete) {
    drawCompletionMessage();
  }

  // Draw progress indicator
  drawProgress();

  // Handle tracing if mouse is pressed
  if (mouseIsPressed && mouseY < drawHeight && mouseY > 50) {
    handleTracing();
  }
}

function drawLinedPaper() {
  // Paper background
  fill('#FFFEF5');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Draw horizontal lines (like kindergarten writing paper)
  stroke('#ADD8E6'); // Light blue
  strokeWeight(1);

  let topLine = letterY - letterSize * 0.35;
  let middleLine = letterY + letterSize * 0.1;
  let bottomLine = letterY + letterSize * 0.35;
  let baseLine = letterY + letterSize * 0.5;

  // Dashed top line (for tall letters)
  drawDashedLine(30, topLine, canvasWidth - 30, topLine);

  // Dotted middle line
  stroke('#FFB6C1'); // Light pink
  drawDashedLine(30, middleLine, canvasWidth - 30, middleLine);

  // Solid bottom line (baseline)
  stroke('#ADD8E6');
  strokeWeight(2);
  line(30, bottomLine, canvasWidth - 30, bottomLine);

  // Descender line (for letters like g, j, p, q, y)
  strokeWeight(1);
  stroke('#DDA0DD'); // Plum
  drawDashedLine(30, baseLine, canvasWidth - 30, baseLine);

  // Title
  fill('#333');
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text('Trace the Letter', canvasWidth / 2, 10);
}

function drawDashedLine(x1, y1, x2, y2) {
  let dashLength = 10;
  let gapLength = 5;
  let d = dist(x1, y1, x2, y2);
  let dashCount = d / (dashLength + gapLength);

  for (let i = 0; i < dashCount; i++) {
    let startX = lerp(x1, x2, i / dashCount);
    let startY = lerp(y1, y2, i / dashCount);
    let endX = lerp(x1, x2, (i + 0.6) / dashCount);
    let endY = lerp(y1, y2, (i + 0.6) / dashCount);
    line(startX, startY, endX, endY);
  }
}

function drawGhostLetter() {
  let letter = isUppercase ? currentLetter.toUpperCase() : currentLetter;
  let strokes = letterStrokes[letter];
  if (!strokes) return;

  // Draw each stroke as a thick, semi-transparent path
  stroke(200, 200, 200, 150);
  strokeWeight(30);
  noFill();

  for (let strokePoints of strokes) {
    beginShape();
    for (let pt of strokePoints) {
      let x = letterX + (pt.x - 0.5) * letterSize;
      let y = letterY + (pt.y - 0.5) * letterSize;
      vertex(x, y);
    }
    endShape();
  }
}

function drawStrokeGuides() {
  let letter = isUppercase ? currentLetter.toUpperCase() : currentLetter;
  let strokes = letterStrokes[letter];
  if (!strokes) return;

  textAlign(CENTER, CENTER);
  textSize(16);

  for (let s = 0; s < strokes.length; s++) {
    let strokePoints = strokes[s];
    let startPt = strokePoints[0];
    let x = letterX + (startPt.x - 0.5) * letterSize;
    let y = letterY + (startPt.y - 0.5) * letterSize;

    // Draw numbered starting point
    let isCurrentStroke = (s === currentStrokeIndex && !traceComplete);

    if (isCurrentStroke || traceProgress[s] === undefined) {
      // Draw start circle
      fill(isCurrentStroke ? '#4CAF50' : '#FFA500');
      stroke('white');
      strokeWeight(2);
      ellipse(x, y, 28, 28);

      // Draw number
      fill('white');
      noStroke();
      textSize(14);
      text(s + 1, x, y);

      // Draw arrow showing direction
      if (strokePoints.length > 1) {
        let nextPt = strokePoints[1];
        let nx = letterX + (nextPt.x - 0.5) * letterSize;
        let ny = letterY + (nextPt.y - 0.5) * letterSize;
        drawArrow(x, y, nx, ny, isCurrentStroke ? '#4CAF50' : '#FFA500');
      }
    }
  }
}

function drawArrow(x1, y1, x2, y2, col) {
  let angle = atan2(y2 - y1, x2 - x1);
  let len = min(dist(x1, y1, x2, y2) * 0.5, 30);

  // Offset starting point past the circle
  let startX = x1 + cos(angle) * 18;
  let startY = y1 + sin(angle) * 18;
  let endX = startX + cos(angle) * len;
  let endY = startY + sin(angle) * len;

  stroke(col);
  strokeWeight(3);
  line(startX, startY, endX, endY);

  // Arrow head
  let arrowSize = 8;
  let ax1 = endX - cos(angle - PI/6) * arrowSize;
  let ay1 = endY - sin(angle - PI/6) * arrowSize;
  let ax2 = endX - cos(angle + PI/6) * arrowSize;
  let ay2 = endY - sin(angle + PI/6) * arrowSize;

  fill(col);
  noStroke();
  triangle(endX, endY, ax1, ay1, ax2, ay2);
}

function drawTrail() {
  if (trailPoints.length < 2) return;

  noFill();
  strokeWeight(12);
  stroke(currentTrailColor);

  beginShape();
  for (let pt of trailPoints) {
    vertex(pt.x, pt.y);
  }
  endShape();

  // Add sparkle effect at trail end
  if (trailPoints.length > 0) {
    let lastPt = trailPoints[trailPoints.length - 1];
    fill(255, 255, 255, 200);
    noStroke();
    ellipse(lastPt.x, lastPt.y, 16, 16);
  }
}

function drawTargetPoint() {
  let letter = isUppercase ? currentLetter.toUpperCase() : currentLetter;
  let strokes = letterStrokes[letter];
  if (!strokes || currentStrokeIndex >= strokes.length) return;

  let strokePoints = strokes[currentStrokeIndex];
  if (currentPointIndex >= strokePoints.length) return;

  let pt = strokePoints[currentPointIndex];
  let x = letterX + (pt.x - 0.5) * letterSize;
  let y = letterY + (pt.y - 0.5) * letterSize;

  // Pulsing target indicator
  let pulse = sin(frameCount * 0.1) * 5 + 20;

  noFill();
  stroke('#4CAF50');
  strokeWeight(3);
  ellipse(x, y, pulse, pulse);

  fill('#4CAF50');
  noStroke();
  ellipse(x, y, 10, 10);
}

function handleTracing() {
  if (traceComplete) return;

  let letter = isUppercase ? currentLetter.toUpperCase() : currentLetter;
  let strokes = letterStrokes[letter];
  if (!strokes || currentStrokeIndex >= strokes.length) return;

  let strokePoints = strokes[currentStrokeIndex];
  if (currentPointIndex >= strokePoints.length) {
    // Move to next stroke
    traceProgress[currentStrokeIndex] = true;
    currentStrokeIndex++;
    currentPointIndex = 0;
    currentTrailColor = random(trailColors);
    trailPoints = [];

    if (currentStrokeIndex >= strokes.length) {
      // Letter complete!
      traceComplete = true;
      celebrateCompletion();
    }
    return;
  }

  let targetPt = strokePoints[currentPointIndex];
  let targetX = letterX + (targetPt.x - 0.5) * letterSize;
  let targetY = letterY + (targetPt.y - 0.5) * letterSize;

  // Check if mouse is near target
  let d = dist(mouseX, mouseY, targetX, targetY);

  if (d < traceTolerance) {
    // Add to trail
    trailPoints.push({x: mouseX, y: mouseY});

    // Move to next point
    currentPointIndex++;

    // Play subtle sound
    if (currentPointIndex % 3 === 0) {
      playProgressSound();
    }
  } else if (trailPoints.length > 0) {
    // Still add point if continuing from trail
    let lastPt = trailPoints[trailPoints.length - 1];
    if (dist(mouseX, mouseY, lastPt.x, lastPt.y) < traceTolerance * 1.5) {
      trailPoints.push({x: mouseX, y: mouseY});
    }
  }
}

function drawProgress() {
  let letter = isUppercase ? currentLetter.toUpperCase() : currentLetter;
  let strokes = letterStrokes[letter];
  if (!strokes) return;

  // Progress bar background
  fill(220);
  noStroke();
  rect(canvasWidth - 120, 45, 100, 15, 7);

  // Calculate progress
  let totalPoints = 0;
  let completedPoints = 0;

  for (let s = 0; s < strokes.length; s++) {
    totalPoints += strokes[s].length;
    if (s < currentStrokeIndex) {
      completedPoints += strokes[s].length;
    } else if (s === currentStrokeIndex) {
      completedPoints += currentPointIndex;
    }
  }

  let progress = totalPoints > 0 ? completedPoints / totalPoints : 0;

  // Progress bar fill
  fill('#4CAF50');
  rect(canvasWidth - 120, 45, 100 * progress, 15, 7);

  // Progress text
  fill('#333');
  textSize(12);
  textAlign(RIGHT, TOP);
  text('Progress', canvasWidth - 25, 62);
}

function drawCompletionMessage() {
  // Semi-transparent overlay
  fill(0, 0, 0, 80);
  noStroke();
  rect(canvasWidth/2 - 120, 70, 240, 50, 10);

  // Success message
  fill('#FFD700');
  textSize(28);
  textAlign(CENTER, CENTER);
  text('Great Job!', canvasWidth/2, 95);
}

function celebrateCompletion() {
  // Create celebration particles
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: canvasWidth / 2,
      y: drawHeight / 2,
      vx: random(-8, 8),
      vy: random(-10, -3),
      size: random(8, 20),
      color: random(trailColors),
      alpha: 255,
      gravity: 0.3
    });
  }

  // Play celebration sound
  playCelebrationSound();

  // Speak the letter
  setTimeout(speakCurrentLetter, 500);
}

function updateAndDrawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    // Draw particle as star
    push();
    translate(p.x, p.y);
    rotate(frameCount * 0.05 + i);
    fill(p.color + hex(floor(p.alpha), 2).slice(-2));
    noStroke();
    drawStar(0, 0, p.size/3, p.size/1.5, 5);
    pop();

    // Update physics
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.alpha -= 4;

    // Remove faded particles
    if (p.alpha <= 0) {
      particles.splice(i, 1);
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

function resetTracing() {
  currentStrokeIndex = 0;
  currentPointIndex = 0;
  traceProgress = [];
  trailPoints = [];
  traceComplete = false;
  particles = [];
  currentTrailColor = random(trailColors);
}

function previousLetter() {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let idx = alphabet.indexOf(currentLetter.toLowerCase());
  idx = (idx - 1 + 26) % 26;
  currentLetter = alphabet[idx];
  resetTracing();
}

function nextLetter() {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let idx = alphabet.indexOf(currentLetter.toLowerCase());
  idx = (idx + 1) % 26;
  currentLetter = alphabet[idx];
  resetTracing();
}

function toggleCase() {
  isUppercase = uppercaseCheckbox.checked();
  resetTracing();
}

function speakCurrentLetter() {
  if ('speechSynthesis' in window) {
    let letter = isUppercase ? currentLetter.toUpperCase() : currentLetter;
    let text = isUppercase ? 'Uppercase ' + letter : letter;
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  }
}

function playProgressSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 600 + currentPointIndex * 30;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    // Audio not available
  }
}

function playCelebrationSound() {
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

      let startTime = audioContext.currentTime + i * 0.12;
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  } catch (e) {
    // Audio not available
  }
}

function mouseReleased() {
  // Reset trail when mouse released (allows restarting stroke)
  if (!traceComplete && trailPoints.length > 0 && currentPointIndex < getStrokeLength()) {
    // If didn't complete stroke, allow retry
    // Keep trail for visual feedback
  }
}

function getStrokeLength() {
  let letter = isUppercase ? currentLetter.toUpperCase() : currentLetter;
  let strokes = letterStrokes[letter];
  if (!strokes || currentStrokeIndex >= strokes.length) return 0;
  return strokes[currentStrokeIndex].length;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  letterX = canvasWidth / 2;

  // Reposition UI elements
  speakButton.position(canvasWidth - 110, drawHeight + 12);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
