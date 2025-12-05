// Celebration Animation Tester MicroSim
// A testbed for various celebration animations for educational MicroSims
// These animations can be reused to reward student achievements

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;
// In this version, we are putting the labels above the dropdown lists in the control region
// leave enough room for the labels above the controls
let controlOffsetY = 30;

// Particle system for animations
let particles = [];

// Animation types
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
  'Reading Rocket Zoom'
];

// UI elements
let animationSelect;
let speedSelect;
let celebrateButton;

// Speed settings - multiplier affects velocity and fade rates
let speedMultiplier = 1.0;
let baseAnimationDuration = 120; // Target ~2 seconds at 60fps for medium speed

// Rainbow colors for various effects
let rainbowColors = [
  '#FF6B6B', // red
  '#FF8E53', // orange
  '#FFD93D', // yellow
  '#6BCB77', // green
  '#4D96FF', // blue
  '#9B59B6', // purple
  '#FF6B9D'  // pink
];

// Alphabet for fireworks
let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

  // Big Yellow Create Celebrate button
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

  describe('Celebration Animation Tester - select different celebration animations and click Celebrate to preview them', LABEL);
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
  text('Celebration Animation Tester', canvasWidth / 2, 15);

  // Draw current animation name
  textSize(18);
  fill('#666');
  text(animationSelect.value(), canvasWidth / 2, 50);

  // Draw instructions
  textSize(14);
  fill('#888');
  text('Click "Celebrate!" to see the animation', canvasWidth / 2, drawHeight - 30);

  // Update and draw particles
  updateAndDrawParticles();

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
  createCelebration(type);
  playSound(type);
}

function createCelebration(type) {
  particles = []; // Clear existing particles

  switch (type) {
    case 'Yellow Stars':
      createYellowStars();
      break;
    case 'Rainbow Sparkle Burst':
      createRainbowSparkleBurst();
      break;
    case 'Happy Star Sprinkle':
      createHappyStarSprinkle();
      break;
    case 'Alphabet Fireworks':
      createAlphabetFireworks();
      break;
    case 'Super Reader Confetti':
      createSuperReaderConfetti();
      break;
    case 'Magic Book Bloom':
      createMagicBookBloom();
      break;
    case 'Giggle Glitter Pop':
      createGiggleGlitterPop();
      break;
    case 'Storytime Spark Shower':
      createStorytimeSparkShower();
      break;
    case 'Bright Buddy Balloons':
      createBrightBuddyBalloons();
      break;
    case 'Reading Rocket Zoom':
      createReadingRocketZoom();
      break;
    case 'Book Burst':
      createBookBurst();
      break;
  }
}

// ==================== ANIMATION CREATORS ====================
// All animations are calibrated to run for approximately the same duration
// Speed multiplier: Fast=1.8, Medium=1.0, Slow=0.5

function createYellowStars() {
  for (let i = 0; i < 25; i++) {
    particles.push({
      type: 'star',
      x: random(50, canvasWidth - 50),
      y: random(drawHeight - 100, drawHeight - 50),
      vx: random(-1, 1) * speedMultiplier,
      vy: random(-2.5, -1.5) * speedMultiplier,
      size: random(20, 40),
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.1, 0.1) * speedMultiplier,
      alpha: 255,
      fadeRate: 2.1 * speedMultiplier,
      color: color(255, 215, 0) // Gold
    });
  }
}

function createRainbowSparkleBurst() {
  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2;
  for (let i = 0; i < 60; i++) {
    let angle = random(TWO_PI);
    let speed = random(3, 6) * speedMultiplier;
    particles.push({
      type: 'sparkle',
      x: centerX,
      y: centerY,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      size: random(8, 20),
      alpha: 255,
      fadeRate: 2.5 * speedMultiplier,
      color: color(rainbowColors[floor(random(rainbowColors.length))]),
      twinkle: random(0.1, 0.3) * speedMultiplier
    });
  }
}

function createHappyStarSprinkle() {
  for (let i = 0; i < 30; i++) {
    particles.push({
      type: 'happyStar',
      x: random(30, canvasWidth - 30),
      y: random(-50, 50),
      vx: random(-0.5, 0.5) * speedMultiplier,
      vy: random(2.5, 4) * speedMultiplier,
      size: random(25, 45),
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.05, 0.05) * speedMultiplier,
      alpha: 255,
      color: color(rainbowColors[floor(random(rainbowColors.length))]),
      wobble: random(0.02, 0.05) * speedMultiplier,
      wobbleOffset: random(TWO_PI)
    });
  }
}

function createAlphabetFireworks() {
  for (let i = 0; i < 15; i++) {
    let startX = random(50, canvasWidth - 50);
    particles.push({
      type: 'fireworkLetter',
      x: startX,
      y: drawHeight - 20,
      vx: 0,
      vy: random(-6, -4) * speedMultiplier,
      size: random(24, 36),
      alpha: 255,
      color: color(rainbowColors[floor(random(rainbowColors.length))]),
      letter: alphabet[floor(random(alphabet.length))],
      exploded: false,
      explosionTime: random(25, 40) / speedMultiplier
    });
  }
}

function createSuperReaderConfetti() {
  for (let i = 0; i < 80; i++) {
    particles.push({
      type: 'confetti',
      x: random(canvasWidth),
      y: random(-100, -10),
      vx: random(-1, 1) * speedMultiplier,
      vy: random(3, 5) * speedMultiplier,
      width: random(8, 15),
      height: random(15, 25),
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.2, 0.2) * speedMultiplier,
      alpha: 255,
      color: color(rainbowColors[floor(random(rainbowColors.length))]),
      wobble: random(0.03, 0.08) * speedMultiplier
    });
  }
}

function createMagicBookBloom() {
  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2;
  for (let i = 0; i < 50; i++) {
    let angle = (TWO_PI / 50) * i + random(-0.2, 0.2);
    let speed = random(1.5, 3.5) * speedMultiplier;
    particles.push({
      type: 'bloom',
      x: centerX,
      y: centerY,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      size: random(10, 25),
      alpha: 255,
      fadeRate: 2.1 * speedMultiplier,
      color: color(random(200, 255), random(150, 255), random(200, 255)),
      glow: random(5, 15),
      pulse: random(0.05, 0.1) * speedMultiplier
    });
  }
}

function createGiggleGlitterPop() {
  for (let i = 0; i < 20; i++) {
    particles.push({
      type: 'glitterPop',
      x: random(50, canvasWidth - 50),
      y: random(100, drawHeight - 100),
      vx: 0,
      vy: 0,
      size: random(15, 30),
      alpha: 255,
      color: color(rainbowColors[floor(random(rainbowColors.length))]),
      bouncePhase: random(TWO_PI),
      bounceSpeed: random(0.1, 0.2) * speedMultiplier,
      popTimer: random(40, 70) / speedMultiplier
    });
  }
}

function createStorytimeSparkShower() {
  for (let i = 0; i < 100; i++) {
    particles.push({
      type: 'sparkShower',
      x: random(canvasWidth),
      y: random(-200, -10),
      vx: random(-0.3, 0.3) * speedMultiplier,
      vy: random(3, 5) * speedMultiplier,
      size: random(6, 16), // 2x larger
      alpha: 255,
      color: color(rainbowColors[floor(random(rainbowColors.length))]), // Random bright colors
      trail: [],
      trailLength: floor(random(5, 15))
    });
  }
}

function createBrightBuddyBalloons() {
  for (let i = 0; i < 15; i++) {
    particles.push({
      type: 'balloon',
      x: random(50, canvasWidth - 50),
      y: drawHeight + random(20, 100),
      vx: random(-0.5, 0.5) * speedMultiplier,
      vy: random(-2.5, -1.5) * speedMultiplier,
      size: random(30, 50),
      alpha: 255,
      color: color(rainbowColors[floor(random(rainbowColors.length))]),
      wobble: random(0.02, 0.04) * speedMultiplier,
      wobbleOffset: random(TWO_PI),
      stringLength: random(20, 40)
    });
  }
}

function createReadingRocketZoom() {
  for (let i = 0; i < 8; i++) {
    let startSide = random() > 0.5;
    let baseSpeed = random(5, 8) * speedMultiplier;
    particles.push({
      type: 'rocket',
      x: startSide ? -30 : canvasWidth + 30,
      y: random(80, drawHeight - 80),
      vx: startSide ? baseSpeed : -baseSpeed,
      vy: random(-0.5, 0.5) * speedMultiplier,
      size: 25,
      alpha: 255,
      color: color(rainbowColors[floor(random(rainbowColors.length))]),
      trail: []
    });
  }
}

function createBookBurst() {
  let centerX = canvasWidth / 2;
  for (let i = 0; i < 20; i++) {
    let angle = random(-PI * 0.8, -PI * 0.2); // Spread upward in an arc
    let speed = random(8, 14) * speedMultiplier; // 2x faster for higher flight
    particles.push({
      type: 'book',
      x: centerX,
      y: drawHeight - 10,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      width: random(25, 40),
      height: random(30, 45),
      rotation: random(-0.3, 0.3),
      rotationSpeed: random(-0.08, 0.08) * speedMultiplier,
      alpha: 255,
      fadeRate: 1.2 * speedMultiplier, // Slower fade to match longer flight
      color: color(rainbowColors[floor(random(rainbowColors.length))]),
      gravity: 0.15 * speedMultiplier
    });
  }
}

// ==================== PARTICLE UPDATE & DRAW ====================

function updateAndDrawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    // Update based on type
    switch (p.type) {
      case 'star':
        updateStar(p);
        drawStar(p);
        break;
      case 'sparkle':
        updateSparkle(p);
        drawSparkle(p);
        break;
      case 'happyStar':
        updateHappyStar(p);
        drawHappyStar(p);
        break;
      case 'fireworkLetter':
        updateFireworkLetter(p, i);
        drawFireworkLetter(p);
        break;
      case 'confetti':
        updateConfetti(p);
        drawConfetti(p);
        break;
      case 'bloom':
        updateBloom(p);
        drawBloom(p);
        break;
      case 'glitterPop':
        updateGlitterPop(p, i);
        drawGlitterPop(p);
        break;
      case 'sparkShower':
        updateSparkShower(p);
        drawSparkShower(p);
        break;
      case 'balloon':
        updateBalloon(p);
        drawBalloon(p);
        break;
      case 'rocket':
        updateRocket(p);
        drawRocket(p);
        break;
      case 'explosionPiece':
        updateExplosionPiece(p);
        drawExplosionPiece(p);
        break;
      case 'book':
        updateBook(p);
        drawBook(p);
        break;
    }

    // Remove faded particles
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

// ==================== INDIVIDUAL PARTICLE UPDATES ====================
// Update functions use fadeRate from particle for consistent timing across speeds

function updateStar(p) {
  p.x += p.vx;
  p.y += p.vy;
  p.rotation += p.rotationSpeed;
  p.alpha -= p.fadeRate || 2.1;
  p.vy -= 0.02 * speedMultiplier; // Float upward
}

function updateSparkle(p) {
  p.x += p.vx;
  p.y += p.vy;
  p.vx *= 0.98;
  p.vy *= 0.98;
  p.alpha -= p.fadeRate || 2.5;
  p.size *= 0.98;
}

function updateHappyStar(p) {
  p.x += p.vx + sin(frameCount * p.wobble + p.wobbleOffset) * 0.5;
  p.y += p.vy;
  p.rotation += p.rotationSpeed;
  if (p.y > drawHeight + 50) {
    p.alpha = 0;
  }
}

function updateFireworkLetter(p, index) {
  if (!p.exploded) {
    p.y += p.vy;
    p.explosionTime--;
    if (p.explosionTime <= 0 || p.y < 100) {
      p.exploded = true;
      // Create explosion pieces with speed-adjusted velocities
      for (let j = 0; j < 12; j++) {
        let angle = (TWO_PI / 12) * j;
        let expSpeed = random(2, 4) * speedMultiplier;
        particles.push({
          type: 'explosionPiece',
          x: p.x,
          y: p.y,
          vx: cos(angle) * expSpeed,
          vy: sin(angle) * expSpeed,
          size: random(5, 10),
          alpha: 255,
          fadeRate: 4.5 * speedMultiplier,
          color: p.color
        });
      }
    }
  } else {
    p.alpha -= 15 * speedMultiplier;
  }
}

function updateConfetti(p) {
  p.x += p.vx + sin(frameCount * p.wobble) * 0.5;
  p.y += p.vy;
  p.rotation += p.rotationSpeed;
  if (p.y > drawHeight + 30) {
    p.alpha = 0;
  }
}

function updateBloom(p) {
  p.x += p.vx;
  p.y += p.vy;
  p.vx *= 0.97;
  p.vy *= 0.97;
  p.alpha -= p.fadeRate || 2.1;
  p.size += sin(frameCount * p.pulse) * 0.3;
}

function updateGlitterPop(p, index) {
  p.y += sin(frameCount * p.bounceSpeed + p.bouncePhase) * 2;
  p.popTimer--;
  if (p.popTimer <= 0) {
    // Create mini sparkles with speed-adjusted values
    for (let j = 0; j < 8; j++) {
      let angle = (TWO_PI / 8) * j;
      let popSpeed = random(1, 3) * speedMultiplier;
      particles.push({
        type: 'sparkle',
        x: p.x,
        y: p.y,
        vx: cos(angle) * popSpeed,
        vy: sin(angle) * popSpeed,
        size: random(5, 10),
        alpha: 255,
        fadeRate: 3 * speedMultiplier,
        color: p.color,
        twinkle: 0.2 * speedMultiplier
      });
    }
    p.alpha = 0;
  }
}

function updateSparkShower(p) {
  // Add current position to trail
  p.trail.push({ x: p.x, y: p.y });
  if (p.trail.length > p.trailLength) {
    p.trail.shift();
  }

  p.x += p.vx;
  p.y += p.vy;

  if (p.y > drawHeight + 20) {
    p.alpha = 0;
  }
}

function updateBalloon(p) {
  p.x += p.vx + sin(frameCount * p.wobble + p.wobbleOffset) * 0.3;
  p.y += p.vy;
  if (p.y < -60) {
    p.alpha = 0;
  }
}

function updateRocket(p) {
  // Add trail
  p.trail.push({ x: p.x, y: p.y, alpha: 255 });
  if (p.trail.length > 20) {
    p.trail.shift();
  }

  p.x += p.vx;
  p.y += p.vy;

  // Fade trail - adjusted for speed
  for (let t of p.trail) {
    t.alpha -= 12 * speedMultiplier;
  }

  if (p.x < -50 || p.x > canvasWidth + 50) {
    p.alpha = 0;
  }
}

function updateExplosionPiece(p) {
  p.x += p.vx;
  p.y += p.vy;
  p.vy += 0.1 * speedMultiplier; // Gravity
  p.alpha -= p.fadeRate || 4.5;
}

function updateBook(p) {
  p.x += p.vx;
  p.y += p.vy;
  p.vy += p.gravity; // Gravity pulls books down
  p.rotation += p.rotationSpeed;
  p.alpha -= p.fadeRate;

  // Remove when off screen
  if (p.y > drawHeight + 50) {
    p.alpha = 0;
  }
}

// ==================== INDIVIDUAL PARTICLE DRAWS ====================

function drawStar(p) {
  push();
  translate(p.x, p.y);
  rotate(p.rotation);
  fill(red(p.color), green(p.color), blue(p.color), p.alpha);
  noStroke();
  drawStarShape(0, 0, p.size / 2, p.size, 5);
  pop();
}

function drawSparkle(p) {
  push();
  translate(p.x, p.y);
  let twinkleSize = p.size * (0.8 + sin(frameCount * p.twinkle) * 0.2);
  fill(red(p.color), green(p.color), blue(p.color), p.alpha);
  noStroke();
  drawStarShape(0, 0, twinkleSize / 3, twinkleSize, 4);
  pop();
}

function drawHappyStar(p) {
  push();
  translate(p.x, p.y);
  rotate(p.rotation);

  // Draw star
  fill(red(p.color), green(p.color), blue(p.color), p.alpha);
  noStroke();
  drawStarShape(0, 0, p.size / 2, p.size, 5);

  // Draw happy face
  fill(0, 0, 0, p.alpha);
  ellipse(-p.size * 0.15, -p.size * 0.05, p.size * 0.12);
  ellipse(p.size * 0.15, -p.size * 0.05, p.size * 0.12);

  noFill();
  stroke(0, 0, 0, p.alpha);
  strokeWeight(2);
  arc(0, p.size * 0.05, p.size * 0.3, p.size * 0.2, 0, PI);

  pop();
}

function drawFireworkLetter(p) {
  if (!p.exploded) {
    push();
    translate(p.x, p.y);
    fill(red(p.color), green(p.color), blue(p.color), p.alpha);
    noStroke();
    textSize(p.size);
    textAlign(CENTER, CENTER);
    text(p.letter, 0, 0);
    pop();
  }
}

function drawConfetti(p) {
  push();
  translate(p.x, p.y);
  rotate(p.rotation);
  fill(red(p.color), green(p.color), blue(p.color), p.alpha);
  noStroke();
  rect(-p.width / 2, -p.height / 2, p.width, p.height, 2);
  pop();
}

function drawBloom(p) {
  push();
  translate(p.x, p.y);

  // Glow effect
  for (let g = p.glow; g > 0; g -= 3) {
    fill(red(p.color), green(p.color), blue(p.color), p.alpha * 0.1);
    noStroke();
    ellipse(0, 0, p.size + g * 2);
  }

  // Core
  fill(red(p.color), green(p.color), blue(p.color), p.alpha);
  ellipse(0, 0, p.size);

  pop();
}

function drawGlitterPop(p) {
  push();
  translate(p.x, p.y);
  fill(red(p.color), green(p.color), blue(p.color), p.alpha);
  noStroke();
  ellipse(0, 0, p.size);

  // Shimmer highlight
  fill(255, 255, 255, p.alpha * 0.6);
  ellipse(-p.size * 0.2, -p.size * 0.2, p.size * 0.3);
  pop();
}

function drawSparkShower(p) {
  // Draw trail with dark edges for visibility
  for (let i = 0; i < p.trail.length; i++) {
    let t = p.trail[i];
    let trailAlpha = (i / p.trail.length) * p.alpha * 0.5;
    let trailSize = p.size * (i / p.trail.length);

    // Dark edge for trail
    stroke(80, 80, 120, trailAlpha * 0.8);
    strokeWeight(1);
    fill(red(p.color), green(p.color), blue(p.color), trailAlpha);
    ellipse(t.x, t.y, trailSize);
  }

  // Draw spark with dark edge for visibility against light backgrounds
  stroke(80, 80, 120, p.alpha * 0.9);
  strokeWeight(1.5);
  fill(red(p.color), green(p.color), blue(p.color), p.alpha);
  ellipse(p.x, p.y, p.size);

  // Add bright center highlight
  noStroke();
  fill(255, 255, 255, p.alpha * 0.7);
  ellipse(p.x, p.y, p.size * 0.4);
}

function drawBalloon(p) {
  push();
  translate(p.x, p.y);

  // String
  stroke(150, p.alpha);
  strokeWeight(1);
  line(0, p.size / 2, 0, p.size / 2 + p.stringLength);

  // Balloon body
  fill(red(p.color), green(p.color), blue(p.color), p.alpha);
  noStroke();
  ellipse(0, 0, p.size, p.size * 1.2);

  // Balloon knot
  triangle(-3, p.size / 2 - 2, 3, p.size / 2 - 2, 0, p.size / 2 + 5);

  // Highlight
  fill(255, 255, 255, p.alpha * 0.4);
  ellipse(-p.size * 0.2, -p.size * 0.25, p.size * 0.25, p.size * 0.35);

  pop();
}

function drawRocket(p) {
  // Draw trail
  for (let i = 0; i < p.trail.length; i++) {
    let t = p.trail[i];
    if (t.alpha > 0) {
      fill(255, 200, 100, t.alpha);
      noStroke();
      ellipse(t.x, t.y, 8 * (i / p.trail.length));
    }
  }

  // Draw rocket
  push();
  translate(p.x, p.y);
  if (p.vx < 0) rotate(PI);

  // Rocket body
  fill(red(p.color), green(p.color), blue(p.color), p.alpha);
  noStroke();
  ellipse(0, 0, p.size, p.size * 0.6);

  // Rocket nose
  fill(255, 100, 100, p.alpha);
  triangle(p.size / 2, 0, p.size / 2 - 8, -6, p.size / 2 - 8, 6);

  // Rocket fins
  fill(red(p.color) * 0.7, green(p.color) * 0.7, blue(p.color) * 0.7, p.alpha);
  triangle(-p.size / 2, 0, -p.size / 2 - 5, -8, -p.size / 2 + 5, 0);
  triangle(-p.size / 2, 0, -p.size / 2 - 5, 8, -p.size / 2 + 5, 0);

  // Window
  fill(200, 230, 255, p.alpha);
  ellipse(p.size / 4, 0, 8);

  pop();
}

function drawExplosionPiece(p) {
  fill(red(p.color), green(p.color), blue(p.color), p.alpha);
  noStroke();
  ellipse(p.x, p.y, p.size);
}

function drawBook(p) {
  push();
  translate(p.x, p.y);
  rotate(p.rotation);

  let w = p.width;
  let h = p.height;
  let spineWidth = w * 0.15;
  let pageInset = 3;

  // Book spine (left edge) - colored
  fill(red(p.color) * 0.7, green(p.color) * 0.7, blue(p.color) * 0.7, p.alpha);
  stroke(50, 50, 50, p.alpha * 0.8);
  strokeWeight(1);
  rect(-w / 2, -h / 2, spineWidth, h, 2, 0, 0, 2);

  // Pages (white with slight gray edge) - the side of the book
  fill(250, 248, 245, p.alpha);
  stroke(180, 180, 180, p.alpha * 0.8);
  strokeWeight(1);
  rect(-w / 2 + spineWidth, -h / 2 + pageInset, w - spineWidth, h - pageInset * 2);

  // Book cover (front) - colored, slightly smaller to show pages
  fill(red(p.color), green(p.color), blue(p.color), p.alpha);
  stroke(50, 50, 50, p.alpha * 0.8);
  strokeWeight(1.5);
  rect(-w / 2 + spineWidth - 2, -h / 2, w - spineWidth + 2, h, 0, 3, 3, 0);

  // Cover decoration - simple line detail
  stroke(255, 255, 255, p.alpha * 0.4);
  strokeWeight(2);
  line(-w / 2 + spineWidth + 8, -h / 2 + 8, w / 2 - 8, -h / 2 + 8);
  line(-w / 2 + spineWidth + 8, -h / 2 + 14, w / 2 - 8, -h / 2 + 14);

  pop();
}

// ==================== UTILITY FUNCTIONS ====================

function drawStarShape(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function playSound(type) {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Different sounds for different animations
    let notes;
    switch (type) {
      case 'Yellow Stars':
        notes = [523, 659, 784, 1047]; // C major ascending
        break;
      case 'Rainbow Sparkle Burst':
        notes = [440, 554, 659, 880]; // A major
        break;
      case 'Alphabet Fireworks':
        notes = [392, 494, 587, 784]; // G major
        break;
      case 'Reading Rocket Zoom':
        notes = [262, 330, 392, 523, 659]; // Fast ascending
        break;
      default:
        notes = [523, 659, 784, 1047];
    }

    notes.forEach((freq, i) => {
      let oscillator = audioContext.createOscillator();
      let gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      let startTime = audioContext.currentTime + i * 0.12;
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.25);
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
