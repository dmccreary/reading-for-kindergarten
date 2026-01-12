// CVC Word Builder MicroSim
// Drag letters to build consonant-vowel-consonant words
// Designed for kindergarten students learning to blend sounds

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// CVC word data with pictures
const cvcWords = [
  {word: 'cat', emoji: '🐱'},
  {word: 'dog', emoji: '🐕'},
  {word: 'hat', emoji: '🎩'},
  {word: 'bat', emoji: '🦇'},
  {word: 'rat', emoji: '🐀'},
  {word: 'mat', emoji: '🟫'},
  {word: 'sat', emoji: '🪑'},
  {word: 'pan', emoji: '🍳'},
  {word: 'can', emoji: '🥫'},
  {word: 'man', emoji: '👨'},
  {word: 'fan', emoji: '🌀'},
  {word: 'van', emoji: '🚐'},
  {word: 'pig', emoji: '🐷'},
  {word: 'big', emoji: '🐘'},
  {word: 'dig', emoji: '⛏️'},
  {word: 'wig', emoji: '💇'},
  {word: 'cup', emoji: '🥤'},
  {word: 'pup', emoji: '🐶'},
  {word: 'sun', emoji: '☀️'},
  {word: 'run', emoji: '🏃'},
  {word: 'bun', emoji: '🍔'},
  {word: 'fun', emoji: '🎉'},
  {word: 'bug', emoji: '🐛'},
  {word: 'rug', emoji: '🟫'},
  {word: 'hug', emoji: '🤗'},
  {word: 'mug', emoji: '☕'},
  {word: 'top', emoji: '🔝'},
  {word: 'hop', emoji: '🐸'},
  {word: 'mop', emoji: '🧹'},
  {word: 'pop', emoji: '🎈'},
  {word: 'pot', emoji: '🍲'},
  {word: 'hot', emoji: '🔥'},
  {word: 'dot', emoji: '⚫'},
  {word: 'cot', emoji: '🛏️'},
  {word: 'bed', emoji: '🛏️'},
  {word: 'red', emoji: '🔴'},
  {word: 'hen', emoji: '🐔'},
  {word: 'pen', emoji: '🖊️'},
  {word: 'ten', emoji: '🔟'},
  {word: 'wet', emoji: '💧'}
];

// Letter tiles
let consonants = 'bcdfghjklmnprstvwz'.toUpperCase().split('');
let vowels = 'AEIOU'.split('');

// Game state
let targetWord = null;
let slots = [{letter: null}, {letter: null}, {letter: null}];
let letterTiles = [];
let draggingTile = null;
let dragOffset = {x: 0, y: 0};
let wordComplete = false;
let showSuccess = false;
let particles = [];

// UI Elements
let blendButton, newWordButton, hintButton;
let showHint = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create Blend button
  blendButton = createButton('Blend Sounds');
  blendButton.position(margin, drawHeight + 12);
  blendButton.mousePressed(blendSounds);
  blendButton.style('font-size', '14px');
  blendButton.style('padding', '8px 12px');
  blendButton.style('background-color', '#4CAF50');
  blendButton.style('color', 'white');
  blendButton.style('border', 'none');
  blendButton.style('border-radius', '5px');
  blendButton.style('cursor', 'pointer');

  // Create Hint button
  hintButton = createButton('Hint');
  hintButton.position(margin + 120, drawHeight + 12);
  hintButton.mousePressed(toggleHint);
  hintButton.style('font-size', '14px');
  hintButton.style('padding', '8px 12px');
  hintButton.style('cursor', 'pointer');

  // Create New Word button
  newWordButton = createButton('New Word');
  newWordButton.position(canvasWidth - 100, drawHeight + 12);
  newWordButton.mousePressed(newWord);
  newWordButton.style('font-size', '14px');
  newWordButton.style('padding', '8px 12px');
  newWordButton.style('cursor', 'pointer');

  textFont('Arial');
  newWord();

  describe('CVC Word Builder for building consonant-vowel-consonant words', LABEL);
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
  text('CVC Word Builder', canvasWidth / 2, 8);

  // Draw target word display
  drawTargetArea();

  // Draw letter slots
  drawSlots();

  // Draw available letter tiles
  drawLetterTiles();

  // Draw dragging tile on top
  if (draggingTile) {
    drawTile(draggingTile, draggingTile.dragX, draggingTile.dragY, true);
  }

  // Draw success message
  if (showSuccess) {
    drawSuccessMessage();
  }

  // Draw particles
  updateAndDrawParticles();
}

function drawTargetArea() {
  // Target word box
  fill(255, 255, 255, 240);
  stroke('#FF9800');
  strokeWeight(3);
  rect(canvasWidth/2 - 100, 40, 200, 70, 10);

  // Emoji
  textSize(40);
  textAlign(CENTER, CENTER);
  noStroke();
  if (targetWord) {
    text(targetWord.emoji, canvasWidth/2 - 55, 75);
  }

  // Instruction or hint
  fill('#666');
  textSize(14);
  if (showHint && targetWord) {
    fill('#FF9800');
    text('Build: ' + targetWord.word.toUpperCase(), canvasWidth/2 + 20, 75);
  } else {
    text('Build the word!', canvasWidth/2 + 20, 75);
  }
}

function drawSlots() {
  let slotSize = 60;
  let spacing = 15;
  let totalWidth = 3 * slotSize + 2 * spacing;
  let startX = (canvasWidth - totalWidth) / 2;
  let y = 130;

  // Labels
  fill('#666');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  let labels = ['Beginning', 'Middle', 'End'];

  for (let i = 0; i < 3; i++) {
    let x = startX + i * (slotSize + spacing);

    // Label
    text(labels[i], x + slotSize/2, y - 5);

    // Slot background
    fill(slots[i].letter ? '#E3F2FD' : '#f0f0f0');
    stroke(slots[i].letter ? '#2196F3' : '#ccc');
    strokeWeight(3);
    rect(x, y, slotSize, slotSize, 10);

    // Letter in slot
    if (slots[i].letter) {
      fill(i === 1 ? '#E74C3C' : '#2196F3'); // Vowel vs consonant
      noStroke();
      textSize(36);
      textAlign(CENTER, CENTER);
      text(slots[i].letter, x + slotSize/2, y + slotSize/2);
    }

    // Store slot position for hit detection
    slots[i].x = x;
    slots[i].y = y;
    slots[i].size = slotSize;
  }
}

function drawLetterTiles() {
  for (let tile of letterTiles) {
    if (tile !== draggingTile && !tile.inSlot) {
      drawTile(tile, tile.x, tile.y, false);
    }
  }
}

function drawTile(tile, x, y, isDragging) {
  let size = tile.size || 45;

  push();
  if (isDragging) {
    // Slight scale up when dragging
    translate(x + size/2, y + size/2);
    scale(1.1);
    translate(-size/2, -size/2);
  } else {
    translate(x, y);
  }

  // Shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(3, 3, size, size, 8);

  // Tile background
  fill(tile.isVowel ? '#FFCDD2' : '#BBDEFB');
  stroke(tile.isVowel ? '#E74C3C' : '#2196F3');
  strokeWeight(2);
  rect(0, 0, size, size, 8);

  // Letter
  fill(tile.isVowel ? '#C62828' : '#1565C0');
  noStroke();
  textSize(28);
  textAlign(CENTER, CENTER);
  text(tile.letter, size/2, size/2);

  pop();
}

function drawSuccessMessage() {
  // Overlay
  fill(0, 0, 0, 100);
  noStroke();
  rect(canvasWidth/2 - 120, 200, 240, 100, 15);

  // Message
  fill('#4CAF50');
  textSize(28);
  textAlign(CENTER, CENTER);
  text('Great Job!', canvasWidth/2, 230);

  fill('white');
  textSize(20);
  text(targetWord.word.toUpperCase() + ' ' + targetWord.emoji, canvasWidth/2, 270);
}

function updateAndDrawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    fill(p.color);
    noStroke();
    ellipse(p.x, p.y, p.size, p.size);

    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.2;
    p.alpha -= 4;
    p.size *= 0.97;

    if (p.alpha <= 0 || p.y > drawHeight) {
      particles.splice(i, 1);
    }
  }
}

function createLetterTiles() {
  letterTiles = [];

  if (!targetWord) return;

  let word = targetWord.word.toUpperCase();

  // Get the three letters needed
  let neededLetters = [word[0], word[1], word[2]];

  // Add some distractors
  let distractorConsonants = consonants.filter(c => !neededLetters.includes(c));
  let distractorVowels = vowels.filter(v => !neededLetters.includes(v));

  shuffleArray(distractorConsonants);
  shuffleArray(distractorVowels);

  // Create tiles for needed letters plus distractors
  let allLetters = [
    ...neededLetters,
    distractorConsonants[0],
    distractorConsonants[1],
    distractorVowels[0]
  ];

  shuffleArray(allLetters);

  // Calculate positions
  let tileSize = 45;
  let spacing = 10;
  let cols = 6;
  let totalWidth = cols * tileSize + (cols - 1) * spacing;
  let startX = (canvasWidth - totalWidth) / 2;
  let startY = 230;

  for (let i = 0; i < allLetters.length; i++) {
    let letter = allLetters[i];
    let col = i % cols;
    let row = floor(i / cols);

    letterTiles.push({
      letter: letter,
      x: startX + col * (tileSize + spacing),
      y: startY + row * (tileSize + spacing + 20),
      size: tileSize,
      isVowel: vowels.includes(letter),
      inSlot: false
    });
  }
}

function mousePressed() {
  if (showSuccess) {
    // Click to continue
    newWord();
    return;
  }

  // Check if clicking on a letter tile
  for (let tile of letterTiles) {
    if (!tile.inSlot &&
        mouseX > tile.x && mouseX < tile.x + tile.size &&
        mouseY > tile.y && mouseY < tile.y + tile.size) {
      draggingTile = tile;
      tile.dragX = tile.x;
      tile.dragY = tile.y;
      dragOffset.x = mouseX - tile.x;
      dragOffset.y = mouseY - tile.y;
      return;
    }
  }

  // Check if clicking on a slot to remove letter
  for (let i = 0; i < slots.length; i++) {
    let slot = slots[i];
    if (slot.letter &&
        mouseX > slot.x && mouseX < slot.x + slot.size &&
        mouseY > slot.y && mouseY < slot.y + slot.size) {
      // Find the tile and return it
      let tile = letterTiles.find(t => t.letter === slot.letter && t.inSlot);
      if (tile) {
        tile.inSlot = false;
      }
      slot.letter = null;
      wordComplete = false;
      return;
    }
  }
}

function mouseDragged() {
  if (draggingTile) {
    draggingTile.dragX = mouseX - dragOffset.x;
    draggingTile.dragY = mouseY - dragOffset.y;
  }
}

function mouseReleased() {
  if (!draggingTile) return;

  // Check if dropped on a slot
  let droppedInSlot = false;
  for (let i = 0; i < slots.length; i++) {
    let slot = slots[i];
    if (draggingTile.dragX + draggingTile.size/2 > slot.x &&
        draggingTile.dragX + draggingTile.size/2 < slot.x + slot.size &&
        draggingTile.dragY + draggingTile.size/2 > slot.y &&
        draggingTile.dragY + draggingTile.size/2 < slot.y + slot.size) {

      // Check if valid placement (vowel in middle, consonant on ends)
      let isValid = true;
      if (i === 1 && !draggingTile.isVowel) isValid = false;
      if (i !== 1 && draggingTile.isVowel) isValid = false;

      if (isValid && !slot.letter) {
        // If there was another tile, return it
        if (slot.letter) {
          let oldTile = letterTiles.find(t => t.letter === slot.letter && t.inSlot);
          if (oldTile) oldTile.inSlot = false;
        }

        slot.letter = draggingTile.letter;
        draggingTile.inSlot = true;
        droppedInSlot = true;
        playDropSound();
        checkWordComplete();
      } else {
        // Invalid placement feedback
        playInvalidSound();
      }
      break;
    }
  }

  draggingTile = null;
}

function checkWordComplete() {
  if (slots[0].letter && slots[1].letter && slots[2].letter) {
    let builtWord = (slots[0].letter + slots[1].letter + slots[2].letter).toLowerCase();

    if (builtWord === targetWord.word) {
      wordComplete = true;
      showSuccess = true;
      createCelebration();
      blendAndSayWord();
    }
  }
}

function blendSounds() {
  if (!targetWord) return;

  // Blend the sounds currently in slots
  let sounds = [];
  for (let slot of slots) {
    if (slot.letter) {
      sounds.push(getLetterSound(slot.letter));
    }
  }

  if (sounds.length === 0) return;

  // Speak each sound
  speechSynthesis.cancel();

  sounds.forEach((sound, i) => {
    setTimeout(() => {
      let utterance = new SpeechSynthesisUtterance(sound);
      utterance.rate = 0.5;
      speechSynthesis.speak(utterance);
    }, i * 600);
  });

  // If all three, blend into word
  if (sounds.length === 3) {
    setTimeout(() => {
      let word = (slots[0].letter + slots[1].letter + slots[2].letter).toLowerCase();
      let utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }, 2200);
  }
}

function blendAndSayWord() {
  if (!targetWord) return;

  speechSynthesis.cancel();

  // Speak each sound
  let word = targetWord.word;
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      let sound = getLetterSound(word[i].toUpperCase());
      let utterance = new SpeechSynthesisUtterance(sound);
      utterance.rate = 0.5;
      speechSynthesis.speak(utterance);
    }, i * 500);
  }

  // Say whole word
  setTimeout(() => {
    let utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }, 2000);
}

function getLetterSound(letter) {
  const sounds = {
    'A': 'ah', 'B': 'buh', 'C': 'kuh', 'D': 'duh', 'E': 'eh',
    'F': 'fff', 'G': 'guh', 'H': 'huh', 'I': 'ih', 'J': 'juh',
    'K': 'kuh', 'L': 'lll', 'M': 'mmm', 'N': 'nnn', 'O': 'oh',
    'P': 'puh', 'Q': 'kwuh', 'R': 'rrr', 'S': 'sss', 'T': 'tuh',
    'U': 'uh', 'V': 'vvv', 'W': 'wuh', 'X': 'ks', 'Y': 'yuh', 'Z': 'zzz'
  };
  return sounds[letter] || letter;
}

function createCelebration() {
  let colors = ['#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0'];
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: canvasWidth/2 + random(-50, 50),
      y: 180,
      vx: random(-5, 5),
      vy: random(-8, -3),
      size: random(10, 20),
      color: random(colors),
      alpha: 255
    });
  }
  playCelebrationSound();
}

function newWord() {
  targetWord = random(cvcWords);
  slots = [{letter: null}, {letter: null}, {letter: null}];
  wordComplete = false;
  showSuccess = false;
  showHint = false;
  particles = [];
  createLetterTiles();
}

function toggleHint() {
  showHint = !showHint;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function playDropSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 500;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {}
}

function playInvalidSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 200;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
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

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  newGameButton.position(canvasWidth - 100, drawHeight + 12);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
