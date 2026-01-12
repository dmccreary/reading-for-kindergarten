// VC Word Blender MicroSim
// Blend vowel-consonant combinations as a stepping stone to CVC words
// Designed for kindergarten students learning to blend sounds

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// VC patterns with example words that use them
const vcPatterns = [
  { vc: 'at', examples: ['cat', 'hat', 'bat', 'sat', 'mat', 'rat'] },
  { vc: 'an', examples: ['can', 'man', 'pan', 'fan', 'van', 'ran'] },
  { vc: 'ap', examples: ['cap', 'map', 'tap', 'nap', 'lap', 'gap'] },
  { vc: 'ad', examples: ['dad', 'sad', 'bad', 'mad', 'had', 'lad'] },
  { vc: 'ag', examples: ['bag', 'tag', 'rag', 'wag', 'flag'] },
  { vc: 'am', examples: ['ham', 'jam', 'yam', 'ram', 'dam'] },
  { vc: 'in', examples: ['pin', 'tin', 'win', 'fin', 'bin', 'spin'] },
  { vc: 'it', examples: ['sit', 'hit', 'bit', 'fit', 'kit', 'pit'] },
  { vc: 'ig', examples: ['pig', 'big', 'dig', 'wig', 'fig', 'jig'] },
  { vc: 'ip', examples: ['dip', 'hip', 'lip', 'rip', 'sip', 'tip', 'zip'] },
  { vc: 'ot', examples: ['hot', 'pot', 'dot', 'got', 'lot', 'not'] },
  { vc: 'op', examples: ['hop', 'mop', 'top', 'pop', 'stop', 'drop'] },
  { vc: 'og', examples: ['dog', 'log', 'hog', 'fog', 'jog', 'frog'] },
  { vc: 'ob', examples: ['job', 'rob', 'sob', 'mob', 'bob'] },
  { vc: 'un', examples: ['sun', 'run', 'fun', 'bun', 'gun'] },
  { vc: 'ut', examples: ['but', 'cut', 'nut', 'hut', 'gut', 'shut'] },
  { vc: 'ug', examples: ['bug', 'hug', 'mug', 'rug', 'tug', 'dug'] },
  { vc: 'up', examples: ['cup', 'pup', 'sup'] },
  { vc: 'et', examples: ['pet', 'wet', 'set', 'get', 'let', 'met', 'bet'] },
  { vc: 'en', examples: ['pen', 'hen', 'ten', 'men', 'den'] },
  { vc: 'ed', examples: ['bed', 'red', 'fed', 'led'] }
];

// Game state
let currentPattern = null;
let currentIndex = 0;
let isBlending = false;
let blendProgress = 0;
let letterSpacing = 120;
let blendedCount = 0;

// Animation
let vowelX, consonantX;
let targetSpacing;

// UI Elements
let blendButton, nextButton, prevButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create Previous button
  prevButton = createButton('< Prev');
  prevButton.position(margin, drawHeight + 15);
  prevButton.mousePressed(previousPattern);
  prevButton.style('font-size', '14px');
  prevButton.style('padding', '8px 12px');
  prevButton.style('cursor', 'pointer');

  // Create Blend button
  blendButton = createButton('Blend!');
  blendButton.position(margin + 80, drawHeight + 15);
  blendButton.mousePressed(startBlending);
  blendButton.style('font-size', '14px');
  blendButton.style('padding', '8px 20px');
  blendButton.style('background-color', '#4CAF50');
  blendButton.style('color', 'white');
  blendButton.style('border', 'none');
  blendButton.style('border-radius', '5px');
  blendButton.style('cursor', 'pointer');

  // Create Next button
  nextButton = createButton('Next >');
  nextButton.position(margin + 175, drawHeight + 15);
  nextButton.mousePressed(nextPattern);
  nextButton.style('font-size', '14px');
  nextButton.style('padding', '8px 12px');
  nextButton.style('cursor', 'pointer');

  textFont('Arial');
  loadPattern(0);

  describe('VC Word Blender for learning to blend vowel-consonant combinations', LABEL);
}

function draw() {
  updateCanvasSize();

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
  fill('#2E7D32');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('VC Word Blender', canvasWidth / 2, 8);

  // Draw subtitle
  fill('#666');
  textSize(12);
  text('Learn word endings that help you read!', canvasWidth / 2, 35);

  // Draw progress
  drawProgress();

  // Draw letter tiles
  drawLetterTiles();

  // Draw example words
  drawExampleWords();

  // Draw instructions
  drawInstructions();

  // Handle blending animation
  if (isBlending) {
    blendProgress += 0.03;
    letterSpacing = lerp(120, 30, min(blendProgress, 1));

    if (blendProgress >= 1 && blendProgress < 1.5) {
      // Hold at blended position
    } else if (blendProgress >= 1.5) {
      // Animation complete
      isBlending = false;
      blendProgress = 0;
      letterSpacing = 120;
    }
  }
}

function drawProgress() {
  fill(255, 255, 255, 230);
  stroke('#4CAF50');
  strokeWeight(2);
  rect(canvasWidth - 130, 50, 120, 50, 8);

  fill('#333');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Pattern ' + (currentIndex + 1) + ' of ' + vcPatterns.length, canvasWidth - 70, 65);
  text('Blended: ' + blendedCount, canvasWidth - 70, 82);
}

function drawLetterTiles() {
  if (!currentPattern) return;

  let vowel = currentPattern.vc[0];
  let consonant = currentPattern.vc[1];

  let centerX = canvasWidth / 2;
  let centerY = 150;
  let tileSize = 80;

  // Calculate positions based on spacing
  vowelX = centerX - letterSpacing / 2 - tileSize / 2;
  consonantX = centerX + letterSpacing / 2 - tileSize / 2;

  // Draw vowel tile
  drawTile(vowelX, centerY - tileSize / 2, tileSize, vowel, '#F44336', 'Vowel');

  // Draw consonant tile
  drawTile(consonantX, centerY - tileSize / 2, tileSize, consonant, '#2196F3', 'Consonant');

  // Draw blended result below when blending
  if (isBlending && blendProgress >= 0.8) {
    let alpha = map(blendProgress, 0.8, 1, 0, 255);

    fill(255, 255, 255, alpha * 0.9);
    stroke(76, 175, 80, alpha);
    strokeWeight(3);
    rect(centerX - 70, centerY + 70, 140, 60, 10);

    fill(46, 125, 50, alpha);
    noStroke();
    textSize(36);
    textAlign(CENTER, CENTER);
    text(currentPattern.vc, centerX, centerY + 100);
  }
}

function drawTile(x, y, size, letter, col, label) {
  // Shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(x + 4, y + 4, size, size, 12);

  // Tile
  fill('white');
  stroke(col);
  strokeWeight(4);
  rect(x, y, size, size, 12);

  // Label
  fill('#666');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text(label, x + size / 2, y + 6);

  // Letter
  fill(col);
  textSize(48);
  textAlign(CENTER, CENTER);
  text(letter, x + size / 2, y + size / 2 + 8);
}

function drawExampleWords() {
  if (!currentPattern) return;

  let startY = 260;

  fill('#666');
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('Words that end with "-' + currentPattern.vc + '":', canvasWidth / 2, startY);

  // Draw example word cards
  let examples = currentPattern.examples.slice(0, 6);
  let cardWidth = 55;
  let cardHeight = 35;
  let gap = 8;
  let totalWidth = examples.length * cardWidth + (examples.length - 1) * gap;
  let startX = (canvasWidth - totalWidth) / 2;

  for (let i = 0; i < examples.length; i++) {
    let x = startX + i * (cardWidth + gap);
    let y = startY + 25;

    // Card background
    fill('#FFF8E1');
    stroke('#FFA000');
    strokeWeight(2);
    rect(x, y, cardWidth, cardHeight, 5);

    // Word with highlighted ending
    let word = examples[i];
    let prefix = word.slice(0, -2);
    let ending = word.slice(-2);

    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);

    // Draw prefix in gray
    fill('#666');
    let prefixWidth = textWidth(prefix);
    let endingWidth = textWidth(ending);
    let totalWordWidth = prefixWidth + endingWidth;
    let wordStartX = x + cardWidth / 2 - totalWordWidth / 2;

    textAlign(LEFT, CENTER);
    text(prefix, wordStartX, y + cardHeight / 2);

    // Draw ending in green (highlighted)
    fill('#2E7D32');
    text(ending, wordStartX + prefixWidth, y + cardHeight / 2);
  }
}

function drawInstructions() {
  fill('#666');
  textSize(11);
  textAlign(CENTER, TOP);
  noStroke();
  text('Watch the letters slide together to make a word ending!', canvasWidth / 2, 340);
  text('These endings help you read many words.', canvasWidth / 2, 356);
}

function loadPattern(index) {
  currentIndex = index;
  currentPattern = vcPatterns[index];
  letterSpacing = 120;
  isBlending = false;
  blendProgress = 0;
}

function startBlending() {
  if (isBlending) return;

  isBlending = true;
  blendProgress = 0;
  blendedCount++;

  // Speak the sounds
  speakVC();
  playBlendSound();
}

function speakVC() {
  if (!('speechSynthesis' in window)) return;

  speechSynthesis.cancel();

  let vowel = currentPattern.vc[0];
  let consonant = currentPattern.vc[1];

  // Vowel sound mapping (short vowels)
  const vowelSounds = {
    'a': 'ah',
    'e': 'eh',
    'i': 'ih',
    'o': 'oh',
    'u': 'uh'
  };

  // Speak vowel sound
  let vowelUtterance = new SpeechSynthesisUtterance(vowelSounds[vowel] || vowel);
  vowelUtterance.rate = 0.7;
  vowelUtterance.pitch = 1.1;
  speechSynthesis.speak(vowelUtterance);

  // Speak consonant sound after delay
  setTimeout(() => {
    let consonantUtterance = new SpeechSynthesisUtterance(consonant);
    consonantUtterance.rate = 0.7;
    speechSynthesis.speak(consonantUtterance);
  }, 600);

  // Speak blended VC after more delay
  setTimeout(() => {
    let blendedUtterance = new SpeechSynthesisUtterance(currentPattern.vc);
    blendedUtterance.rate = 0.6;
    speechSynthesis.speak(blendedUtterance);
  }, 1400);
}

function previousPattern() {
  let newIndex = (currentIndex - 1 + vcPatterns.length) % vcPatterns.length;
  loadPattern(newIndex);
  playClickSound();
}

function nextPattern() {
  let newIndex = (currentIndex + 1) % vcPatterns.length;
  loadPattern(newIndex);
  playClickSound();
}

function playBlendSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(600, audioContext.currentTime + 0.3);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
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
