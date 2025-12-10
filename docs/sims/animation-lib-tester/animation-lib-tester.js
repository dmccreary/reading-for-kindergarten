// Animation Library Tester
// Demonstrates using the shared animation modules from /docs/sims/shared/animations/
// This file is much smaller than the monolithic celebration-animation-tester.js
// because all animation code lives in separate, reusable modules.

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;
let controlOffsetY = 30;

// Animation types - matches the shared modules
let animationTypes = [
  'Book Burst',
  'Yellow Stars',
  'Rainbow Sparkle Burst',
  'Happy Star Sprinkle',
  'Alphabet Fireworks',
  'Super Reader Confetti',
  'Magic Book Bloom',
  'Giggle Glitter Pop',
  'Storytime Spark Shower',
  'Bright Buddy Balloons',
  'Reading Rocket Zoom',
  'Baseball Explosion',
  'Flying Frisbees'
];

// UI elements
let animationSelect;
let speedSelect;
let celebrateButton;

// Speed multiplier
let speedMultiplier = 1.0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create animation type dropdown
  animationSelect = createSelect();
  animationSelect.position(margin, drawHeight + controlOffsetY);
  for (let type of animationTypes) {
    animationSelect.option(type);
  }
  animationSelect.style('font-size', '14px');
  animationSelect.style('padding', '5px');

  // Create speed dropdown
  speedSelect = createSelect();
  speedSelect.position(240, drawHeight + controlOffsetY);
  speedSelect.option('Fast', 'fast');
  speedSelect.option('Medium', 'medium');
  speedSelect.option('Slow', 'slow');
  speedSelect.selected('medium');
  speedSelect.changed(updateSpeed);
  speedSelect.style('font-size', '14px');
  speedSelect.style('padding', '5px');

  // Celebrate button
  celebrateButton = createButton('Celebrate!');
  celebrateButton.position(350, drawHeight + controlOffsetY - 10);
  celebrateButton.mousePressed(triggerCelebration);
  celebrateButton.style('font-size', '16px');
  celebrateButton.style('padding', '8px 20px');
  celebrateButton.style('background-color', '#FFD700');
  celebrateButton.style('color', 'black');
  celebrateButton.style('border', '2px solid #FFA500');
  celebrateButton.style('border-radius', '10px');
  celebrateButton.style('cursor', 'pointer');
  celebrateButton.style('font-weight', 'bold');

  textFont('Arial');
  describe('Animation Library Tester - demonstrates shared animation modules', LABEL);
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
  fill('black');
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text('Animation Library Tester', canvasWidth / 2, 15);

  // Draw current animation name
  textSize(18);
  fill('#666');
  text(animationSelect.value(), canvasWidth / 2, 50);

  // Draw instructions
  textSize(14);
  fill('#888');
  text('Using shared modules from /shared/animations/', canvasWidth / 2, drawHeight - 30);

  // Update and draw all active animations
  // Each module handles its own particle array
  updateAndDrawBookBurst();
  updateAndDrawYellowStars();
  updateAndDrawRainbowSparkleBurst();
  updateAndDrawHappyStarSprinkle();
  updateAndDrawAlphabetFireworks();
  updateAndDrawSuperReaderConfetti();
  updateAndDrawMagicBookBloom();
  updateAndDrawGiggleGlitterPop();
  updateAndDrawStorytimeSparkShower();
  updateAndDrawBrightBuddyBalloons();
  updateAndDrawReadingRocketZoom();
  updateAndDrawBaseballExplosion();
  updateAndDrawFlyingFrisbees();

  // Draw control labels
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Animation:', margin, drawHeight + 12);
  text('Speed:', 240, drawHeight + 12);
}

function updateSpeed() {
  let speed = speedSelect.value();
  switch (speed) {
    case 'fast':
      speedMultiplier = 1.8;
      break;
    case 'medium':
      speedMultiplier = 1.0;
      break;
    case 'slow':
      speedMultiplier = 0.5;
      break;
  }
}

function triggerCelebration() {
  let type = animationSelect.value();

  // Clear any active animations first
  clearBookBurst();
  clearYellowStars();
  clearRainbowSparkleBurst();
  clearHappyStarSprinkle();
  clearAlphabetFireworks();
  clearSuperReaderConfetti();
  clearMagicBookBloom();
  clearGiggleGlitterPop();
  clearStorytimeSparkShower();
  clearBrightBuddyBalloons();
  clearReadingRocketZoom();
  clearBaseballExplosion();
  clearFlyingFrisbees();

  // Trigger selected animation using shared module functions
  switch (type) {
    case 'Book Burst':
      createBookBurst(canvasWidth / 2, drawHeight, speedMultiplier);
      break;
    case 'Yellow Stars':
      createYellowStars(canvasWidth / 2, drawHeight - 50, 200, speedMultiplier);
      break;
    case 'Rainbow Sparkle Burst':
      createRainbowSparkleBurst(canvasWidth / 2, drawHeight / 2, speedMultiplier);
      break;
    case 'Happy Star Sprinkle':
      createHappyStarSprinkle(canvasWidth, drawHeight, speedMultiplier);
      break;
    case 'Alphabet Fireworks':
      createAlphabetFireworks(canvasWidth, drawHeight, speedMultiplier);
      break;
    case 'Super Reader Confetti':
      createSuperReaderConfetti(canvasWidth, drawHeight, speedMultiplier);
      break;
    case 'Magic Book Bloom':
      createMagicBookBloom(canvasWidth / 2, drawHeight / 2, speedMultiplier);
      break;
    case 'Giggle Glitter Pop':
      createGiggleGlitterPop(canvasWidth, drawHeight, speedMultiplier);
      break;
    case 'Storytime Spark Shower':
      createStorytimeSparkShower(canvasWidth, drawHeight, speedMultiplier);
      break;
    case 'Bright Buddy Balloons':
      createBrightBuddyBalloons(canvasWidth, drawHeight, speedMultiplier);
      break;
    case 'Reading Rocket Zoom':
      createReadingRocketZoom(canvasWidth, drawHeight, speedMultiplier);
      break;
    case 'Baseball Explosion':
      createBaseballExplosion(canvasWidth / 2, drawHeight, speedMultiplier);
      break;
    case 'Flying Frisbees':
      createFlyingFrisbees(canvasWidth, drawHeight, speedMultiplier);
      break;
  }

  // Play celebration sound
  playCelebrationSound('chime');
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
