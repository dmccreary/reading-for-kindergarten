// Nonsense Word Generator MicroSim
// Build and sound out made-up CVC words to practice pure decoding
// Designed for kindergarten students learning phonics

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Letter sets for generating nonsense words
const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'z'];
const vowels = ['a', 'e', 'i', 'o', 'u'];

// Real words to avoid (we want nonsense!)
const realWords = new Set([
  'bat', 'bed', 'big', 'bit', 'bop', 'bud', 'bug', 'bun', 'bus', 'but',
  'cab', 'can', 'cap', 'cat', 'cob', 'cod', 'cog', 'cop', 'cot', 'cub', 'cup', 'cut',
  'dad', 'dam', 'den', 'did', 'dig', 'dim', 'dip', 'dog', 'dot', 'dud', 'dug', 'dun',
  'fan', 'fat', 'fed', 'fen', 'fig', 'fin', 'fit', 'fix', 'fog', 'fop', 'fun', 'fur',
  'gab', 'gag', 'gap', 'gas', 'gel', 'get', 'gig', 'got', 'gum', 'gun', 'gut',
  'had', 'ham', 'has', 'hat', 'hem', 'hen', 'hid', 'him', 'hip', 'his', 'hit', 'hob', 'hog', 'hop', 'hot', 'hub', 'hug', 'hum', 'hut',
  'jab', 'jam', 'jar', 'jet', 'jig', 'job', 'jog', 'jot', 'jug', 'jut',
  'keg', 'ken', 'kid', 'kin', 'kit',
  'lab', 'lad', 'lag', 'lap', 'led', 'leg', 'let', 'lid', 'lip', 'lit', 'log', 'lop', 'lot', 'lug',
  'mad', 'man', 'map', 'mat', 'men', 'met', 'mid', 'mix', 'mob', 'mom', 'mop', 'mud', 'mug', 'mum',
  'nab', 'nag', 'nap', 'net', 'nib', 'nil', 'nip', 'nit', 'nod', 'nor', 'not', 'nub', 'nun', 'nut',
  'pad', 'pal', 'pan', 'pat', 'peg', 'pen', 'pep', 'pet', 'pig', 'pin', 'pit', 'pod', 'pop', 'pot', 'pub', 'pun', 'pup', 'pus', 'put',
  'rag', 'ram', 'ran', 'rap', 'rat', 'red', 'ref', 'rep', 'rib', 'rid', 'rig', 'rim', 'rip', 'rob', 'rod', 'rot', 'rub', 'rug', 'run', 'rut',
  'sad', 'sag', 'sap', 'sat', 'set', 'sin', 'sip', 'sis', 'sit', 'six', 'sob', 'sod', 'son', 'sop', 'sot', 'sub', 'sum', 'sun', 'sup',
  'tab', 'tad', 'tag', 'tan', 'tap', 'tar', 'ten', 'tin', 'tip', 'ton', 'top', 'tot', 'tub', 'tug',
  'van', 'vat', 'vet', 'vim',
  'wad', 'wag', 'was', 'wax', 'web', 'wed', 'wet', 'wig', 'win', 'wit', 'wok', 'won', 'wop',
  'zap', 'zen', 'zig', 'zip', 'zit'
]);

// Game state
let currentWord = { first: '', middle: '', last: '' };
let isBlending = false;
let blendStep = 0;
let blendTimer = 0;
let wordsDecoded = 0;

// UI Elements
let newWordButton, blendButton, randomizeButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create New Word button
  newWordButton = createButton('New Silly Word');
  newWordButton.position(margin, drawHeight + 15);
  newWordButton.mousePressed(generateNewWord);
  newWordButton.style('font-size', '14px');
  newWordButton.style('padding', '8px 16px');
  newWordButton.style('background-color', '#9C27B0');
  newWordButton.style('color', 'white');
  newWordButton.style('border', 'none');
  newWordButton.style('border-radius', '5px');
  newWordButton.style('cursor', 'pointer');

  // Create Blend button
  blendButton = createButton('Sound It Out');
  blendButton.position(margin + 130, drawHeight + 15);
  blendButton.mousePressed(startBlending);
  blendButton.style('font-size', '14px');
  blendButton.style('padding', '8px 16px');
  blendButton.style('background-color', '#4CAF50');
  blendButton.style('color', 'white');
  blendButton.style('border', 'none');
  blendButton.style('border-radius', '5px');
  blendButton.style('cursor', 'pointer');

  // Create Randomize Each button
  randomizeButton = createButton('Mix Letters');
  randomizeButton.position(canvasWidth - 100, drawHeight + 15);
  randomizeButton.mousePressed(randomizeLetter);
  randomizeButton.style('font-size', '14px');
  randomizeButton.style('padding', '8px 12px');
  randomizeButton.style('cursor', 'pointer');

  textFont('Arial');
  generateNewWord();

  describe('Nonsense Word Generator for practicing pure decoding skills', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background - playful gradient feel
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
  text('Silly Word Factory', canvasWidth / 2, 8);

  // Draw subtitle
  fill('#666');
  textSize(12);
  text('Make-believe words for decoding practice!', canvasWidth / 2, 35);

  // Draw progress
  drawProgress();

  // Draw letter tiles
  drawLetterTiles();

  // Draw instructions
  drawInstructions();

  // Handle blending animation
  if (isBlending) {
    blendTimer--;
    if (blendTimer <= 0) {
      advanceBlending();
    }
  }

  // Reposition button on resize
  randomizeButton.position(canvasWidth - 100, drawHeight + 15);
}

function drawProgress() {
  fill(255, 255, 255, 230);
  stroke('#9C27B0');
  strokeWeight(2);
  rect(canvasWidth - 120, 55, 110, 35, 8);

  fill('#333');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Words decoded: ' + wordsDecoded, canvasWidth - 65, 72);
}

function drawLetterTiles() {
  let tileWidth = 80;
  let tileHeight = 100;
  let gap = 15;
  let totalWidth = tileWidth * 3 + gap * 2;
  let startX = (canvasWidth - totalWidth) / 2;
  let startY = 120;

  let letters = [currentWord.first, currentWord.middle, currentWord.last];
  let labels = ['Beginning', 'Middle', 'End'];
  let colors = ['#2196F3', '#F44336', '#2196F3']; // consonants blue, vowel red

  for (let i = 0; i < 3; i++) {
    let x = startX + i * (tileWidth + gap);
    let y = startY;

    // Highlight current letter during blending
    let isActive = isBlending && blendStep === i;

    // Tile shadow
    fill(0, 0, 0, 30);
    noStroke();
    rect(x + 4, y + 4, tileWidth, tileHeight, 12);

    // Tile background
    if (isActive) {
      fill('#FFEB3B');
      stroke('#FFC107');
    } else {
      fill('white');
      stroke(colors[i]);
    }
    strokeWeight(4);
    rect(x, y, tileWidth, tileHeight, 12);

    // Position label
    fill('#666');
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text(labels[i], x + tileWidth / 2, y + 8);

    // Letter
    fill(colors[i]);
    textSize(isActive ? 56 : 48);
    textAlign(CENTER, CENTER);
    text(letters[i], x + tileWidth / 2, y + tileHeight / 2 + 8);
  }

  // Draw blended word below
  let wordY = startY + tileHeight + 40;

  fill(255, 255, 255, 230);
  stroke('#9C27B0');
  strokeWeight(3);
  rect(canvasWidth / 2 - 100, wordY, 200, 60, 10);

  fill('#7B1FA2');
  noStroke();
  textSize(36);
  textAlign(CENTER, CENTER);
  let fullWord = currentWord.first + currentWord.middle + currentWord.last;
  text(fullWord, canvasWidth / 2, wordY + 30);

  // Show "Not a real word!" label
  fill('#E91E63');
  textSize(14);
  textAlign(CENTER, TOP);
  text('(A silly made-up word!)', canvasWidth / 2, wordY + 65);
}

function drawInstructions() {
  fill('#666');
  textSize(11);
  textAlign(CENTER, TOP);
  noStroke();
  text('Click "Sound It Out" to hear each sound, then blend them together.', canvasWidth / 2, 355);
  text('These are made-up words to practice your decoding!', canvasWidth / 2, 372);
}

function generateNewWord() {
  let attempts = 0;
  let word;

  // Generate words until we get a nonsense word
  do {
    let first = consonants[floor(random(consonants.length))];
    let middle = vowels[floor(random(vowels.length))];
    let last = consonants[floor(random(consonants.length))];
    word = first + middle + last;
    attempts++;
  } while (realWords.has(word) && attempts < 100);

  currentWord = {
    first: word[0],
    middle: word[1],
    last: word[2]
  };

  isBlending = false;
  blendStep = 0;
  playNewWordSound();
}

function randomizeLetter() {
  // Randomly change one of the three positions
  let position = floor(random(3));
  let attempts = 0;

  do {
    if (position === 0) {
      currentWord.first = consonants[floor(random(consonants.length))];
    } else if (position === 1) {
      currentWord.middle = vowels[floor(random(vowels.length))];
    } else {
      currentWord.last = consonants[floor(random(consonants.length))];
    }

    let word = currentWord.first + currentWord.middle + currentWord.last;
    attempts++;

    if (!realWords.has(word) || attempts > 20) break;
  } while (true);

  isBlending = false;
  blendStep = 0;
  playClickSound();
}

function startBlending() {
  if (isBlending) return;

  isBlending = true;
  blendStep = 0;
  blendTimer = 60;
  speakSound(currentWord.first);
}

function advanceBlending() {
  blendStep++;

  if (blendStep === 1) {
    blendTimer = 60;
    speakSound(currentWord.middle);
  } else if (blendStep === 2) {
    blendTimer = 60;
    speakSound(currentWord.last);
  } else if (blendStep === 3) {
    blendTimer = 45;
    // Brief pause before blending
  } else if (blendStep === 4) {
    // Speak the blended word
    let fullWord = currentWord.first + currentWord.middle + currentWord.last;
    speakWord(fullWord);
    wordsDecoded++;
    playSuccessSound();
    blendStep = 0;
    isBlending = false;
  }
}

function speakSound(letter) {
  if (!('speechSynthesis' in window)) return;

  speechSynthesis.cancel();

  // Map letters to their sounds
  let sound = letter;

  // Special handling for some consonants
  const soundMap = {
    'c': 'kuh',
    'g': 'guh',
    'h': 'huh',
    'j': 'juh',
    'k': 'kuh',
    'q': 'kwuh',
    'w': 'wuh',
    'x': 'ks',
    'y': 'yuh'
  };

  // For vowels, use short sounds
  const vowelSounds = {
    'a': 'ah',
    'e': 'eh',
    'i': 'ih',
    'o': 'oh',
    'u': 'uh'
  };

  if (soundMap[letter]) {
    sound = soundMap[letter];
  } else if (vowelSounds[letter]) {
    sound = vowelSounds[letter];
  } else {
    // Most consonants - add short 'uh' sound
    sound = letter + 'uh';
  }

  let utterance = new SpeechSynthesisUtterance(sound);
  utterance.rate = 0.7;
  utterance.pitch = 1.1;
  speechSynthesis.speak(utterance);
}

function speakWord(word) {
  if (!('speechSynthesis' in window)) return;

  // Wait a moment then speak
  setTimeout(() => {
    let utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.6;
    utterance.pitch = 1.0;
    speechSynthesis.speak(utterance);
  }, 200);
}

function playNewWordSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let notes = [392, 523]; // G4, C5

    notes.forEach((freq, i) => {
      let oscillator = audioContext.createOscillator();
      let gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      let startTime = audioContext.currentTime + i * 0.1;
      gainNode.gain.setValueAtTime(0.12, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.15);
    });
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

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
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

      let startTime = audioContext.currentTime + i * 0.12;
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
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
