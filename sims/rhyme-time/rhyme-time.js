// Rhyme Time MicroSim
// Match words that rhyme together in a fun pairing game
// Designed for kindergarten students learning phonemic awareness

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Rhyming word pairs with emojis
const rhymePairs = [
  {word1: "cat", word2: "hat", emoji1: "🐱", emoji2: "🎩"},
  {word1: "dog", word2: "frog", emoji1: "🐕", emoji2: "🐸"},
  {word1: "cake", word2: "snake", emoji1: "🎂", emoji2: "🐍"},
  {word1: "bee", word2: "tree", emoji1: "🐝", emoji2: "🌳"},
  {word1: "star", word2: "car", emoji1: "⭐", emoji2: "🚗"},
  {word1: "moon", word2: "spoon", emoji1: "🌙", emoji2: "🥄"},
  {word1: "fish", word2: "dish", emoji1: "🐟", emoji2: "🍽️"},
  {word1: "house", word2: "mouse", emoji1: "🏠", emoji2: "🐭"},
  {word1: "boat", word2: "goat", emoji1: "⛵", emoji2: "🐐"},
  {word1: "rain", word2: "train", emoji1: "🌧️", emoji2: "🚂"},
  {word1: "bell", word2: "shell", emoji1: "🔔", emoji2: "🐚"},
  {word1: "king", word2: "ring", emoji1: "🤴", emoji2: "💍"},
  {word1: "bug", word2: "rug", emoji1: "🐛", emoji2: "🟫"},
  {word1: "hen", word2: "pen", emoji1: "🐔", emoji2: "🖊️"},
  {word1: "nail", word2: "snail", emoji1: "💅", emoji2: "🐌"}
];

// Game state
let cards = [];
let selectedCard = null;
let matchedPairs = 0;
let totalPairs = 4;
let attempts = 0;
let gameComplete = false;
let celebrationParticles = [];
let animatingMatch = null;

// Card settings
let cardWidth = 85;
let cardHeight = 100;
let cardSpacing = 10;

// UI Elements
let newGameButton, speakButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create New Game button
  newGameButton = createButton('New Game');
  newGameButton.position(margin, drawHeight + 12);
  newGameButton.mousePressed(startNewGame);
  newGameButton.style('font-size', '16px');
  newGameButton.style('padding', '8px 16px');
  newGameButton.style('background-color', '#4CAF50');
  newGameButton.style('color', 'white');
  newGameButton.style('border', 'none');
  newGameButton.style('border-radius', '5px');
  newGameButton.style('cursor', 'pointer');

  textFont('Arial');
  startNewGame();

  describe('Rhyme Time matching game where children match rhyming word pairs', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('#E3F2FD');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  fill('#1565C0');
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text('Rhyme Time', canvasWidth / 2, 10);

  // Draw instructions
  textSize(14);
  fill('#666');
  text('Click two words that rhyme!', canvasWidth / 2, 38);

  // Draw score
  drawScore();

  // Draw cards
  drawCards();

  // Draw match animation
  if (animatingMatch) {
    drawMatchAnimation();
  }

  // Draw game complete message
  if (gameComplete) {
    drawCompleteMessage();
  }

  // Draw celebration particles
  updateAndDrawParticles();
}

function drawScore() {
  // Score box
  fill(255, 255, 255, 230);
  stroke('#1565C0');
  strokeWeight(2);
  rect(canvasWidth - 130, 60, 120, 50, 8);

  fill('#333');
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Matched: ' + matchedPairs + '/' + totalPairs, canvasWidth - 70, 75);
  text('Tries: ' + attempts, canvasWidth - 70, 95);
}

function drawCards() {
  // Calculate card layout
  let cols = 4;
  let rows = 2;
  let totalWidth = cols * cardWidth + (cols - 1) * cardSpacing;
  let startX = (canvasWidth - totalWidth) / 2;
  let startY = 130;

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (card.matched && !animatingMatch) continue;
    if (animatingMatch && (card === animatingMatch.card1 || card === animatingMatch.card2)) continue;

    let col = i % cols;
    let row = floor(i / cols);
    let x = startX + col * (cardWidth + cardSpacing);
    let y = startY + row * (cardHeight + cardSpacing + 30);

    drawCard(card, x, y);
  }
}

function drawCard(card, x, y) {
  let isSelected = (card === selectedCard);
  let scale = card.scale || 1;
  let bounce = card.bounce || 0;

  push();
  translate(x + cardWidth/2, y + cardHeight/2 - bounce);

  // Card shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(-cardWidth/2 * scale + 4, 4, cardWidth * scale, cardHeight * scale, 12);

  // Card background
  if (isSelected) {
    fill('#FFE082');
    stroke('#FFA000');
  } else {
    fill('white');
    stroke('#90CAF9');
  }
  strokeWeight(3);
  rect(-cardWidth/2 * scale, -cardHeight/2 * scale, cardWidth * scale, cardHeight * scale, 12);

  // Emoji
  noStroke();
  textSize(40 * scale);
  textAlign(CENTER, CENTER);
  text(card.emoji, 0, -10 * scale);

  // Word
  fill('#1565C0');
  textSize(16 * scale);
  text(card.word, 0, 35 * scale);

  pop();

  // Store card bounds for click detection
  card.x = x;
  card.y = y;
  card.width = cardWidth;
  card.height = cardHeight;
}

function drawMatchAnimation() {
  let anim = animatingMatch;
  let progress = anim.progress;

  // Cards fly toward each other
  let card1 = anim.card1;
  let card2 = anim.card2;

  let midX = canvasWidth / 2;
  let midY = 250;

  let x1 = lerp(card1.x, midX - cardWidth/2 - 20, progress);
  let y1 = lerp(card1.y, midY - cardHeight/2, progress);
  let x2 = lerp(card2.x, midX + 20, progress);
  let y2 = lerp(card2.y, midY - cardHeight/2, progress);

  // Scale up as they meet
  card1.scale = 1 + progress * 0.2;
  card2.scale = 1 + progress * 0.2;

  drawCard(card1, x1, y1);
  drawCard(card2, x2, y2);

  // Draw "RHYME!" text
  if (progress > 0.5) {
    let textAlpha = map(progress, 0.5, 1, 0, 255);
    fill(76, 175, 80, textAlpha);
    textSize(32);
    textAlign(CENTER, CENTER);
    noStroke();
    text('RHYME!', midX, midY - 70);
  }

  // Update animation
  anim.progress += 0.03;

  if (anim.progress >= 1) {
    // Animation complete
    card1.matched = true;
    card2.matched = true;
    card1.scale = 1;
    card2.scale = 1;
    animatingMatch = null;

    // Create celebration
    createMatchCelebration(midX, midY);

    // Check for game complete
    if (matchedPairs >= totalPairs) {
      gameComplete = true;
      createBigCelebration();
      playCelebrationSound();
    }
  }
}

function drawCompleteMessage() {
  // Semi-transparent overlay
  fill(0, 0, 0, 120);
  noStroke();
  rect(0, 100, canvasWidth, 200);

  // Success message
  fill('#FFD700');
  stroke('#FFA000');
  strokeWeight(3);
  textSize(36);
  textAlign(CENTER, CENTER);
  text('Great Job!', canvasWidth/2, 160);

  fill('white');
  noStroke();
  textSize(20);
  text('You found all the rhymes!', canvasWidth/2, 210);

  textSize(16);
  text('You matched ' + totalPairs + ' pairs in ' + attempts + ' tries!', canvasWidth/2, 245);
}

function updateAndDrawParticles() {
  for (let i = celebrationParticles.length - 1; i >= 0; i--) {
    let p = celebrationParticles[i];

    // Draw particle
    push();
    translate(p.x, p.y);
    rotate(p.rotation);
    fill(p.color);
    noStroke();
    if (p.type === 'star') {
      drawStar(0, 0, p.size/3, p.size, 5);
    } else {
      ellipse(0, 0, p.size, p.size);
    }
    pop();

    // Update physics
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.2;
    p.rotation += p.rotSpeed;
    p.alpha -= 3;
    p.size *= 0.98;

    // Remove faded particles
    if (p.alpha <= 0 || p.y > drawHeight) {
      celebrationParticles.splice(i, 1);
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

function mousePressed() {
  if (gameComplete || animatingMatch) return;

  // Check if clicked on a card
  for (let card of cards) {
    if (card.matched) continue;

    if (mouseX > card.x && mouseX < card.x + card.width &&
        mouseY > card.y && mouseY < card.y + card.height) {
      handleCardClick(card);
      return;
    }
  }
}

function handleCardClick(card) {
  // Speak the word
  speakWord(card.word);

  if (selectedCard === null) {
    // First card selected
    selectedCard = card;
    card.bounce = 5;
    setTimeout(() => { card.bounce = 0; }, 100);
    playSelectSound();
  } else if (selectedCard === card) {
    // Same card clicked, deselect
    selectedCard = null;
  } else {
    // Second card selected - check for match
    attempts++;

    if (selectedCard.pairId === card.pairId) {
      // Match found!
      matchedPairs++;
      playMatchSound();

      // Start match animation
      animatingMatch = {
        card1: selectedCard,
        card2: card,
        progress: 0
      };

      selectedCard = null;
    } else {
      // No match
      playNoMatchSound();
      shakeCard(card);
      shakeCard(selectedCard);
      selectedCard = null;
    }
  }
}

function shakeCard(card) {
  let originalX = card.x;
  let shakeCount = 0;

  function doShake() {
    if (shakeCount < 6) {
      card.x = originalX + (shakeCount % 2 === 0 ? 5 : -5);
      shakeCount++;
      setTimeout(doShake, 50);
    } else {
      card.x = originalX;
    }
  }
  doShake();
}

function createMatchCelebration(x, y) {
  let colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#96CEB4', '#FFEAA7'];

  for (let i = 0; i < 15; i++) {
    celebrationParticles.push({
      x: x + random(-30, 30),
      y: y + random(-30, 30),
      vx: random(-4, 4),
      vy: random(-6, -2),
      size: random(8, 16),
      color: random(colors),
      alpha: 255,
      rotation: random(TWO_PI),
      rotSpeed: random(-0.1, 0.1),
      type: 'star'
    });
  }
}

function createBigCelebration() {
  let colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#96CEB4', '#FFEAA7', '#DDA0DD'];

  for (let i = 0; i < 50; i++) {
    celebrationParticles.push({
      x: random(canvasWidth),
      y: random(100, 300),
      vx: random(-5, 5),
      vy: random(-8, -3),
      size: random(10, 25),
      color: random(colors),
      alpha: 255,
      rotation: random(TWO_PI),
      rotSpeed: random(-0.15, 0.15),
      type: random() > 0.5 ? 'star' : 'circle'
    });
  }
}

function startNewGame() {
  // Reset game state
  cards = [];
  selectedCard = null;
  matchedPairs = 0;
  attempts = 0;
  gameComplete = false;
  animatingMatch = null;
  celebrationParticles = [];

  // Select random pairs
  let shuffledPairs = [...rhymePairs];
  shuffleArray(shuffledPairs);
  let selectedPairs = shuffledPairs.slice(0, totalPairs);

  // Create cards
  let cardData = [];
  selectedPairs.forEach((pair, index) => {
    cardData.push({
      word: pair.word1,
      emoji: pair.emoji1,
      pairId: index,
      matched: false
    });
    cardData.push({
      word: pair.word2,
      emoji: pair.emoji2,
      pairId: index,
      matched: false
    });
  });

  // Shuffle cards
  shuffleArray(cardData);
  cards = cardData;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function speakWord(word) {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    let utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  }
}

function playSelectSound() {
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

function playMatchSound() {
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
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  } catch (e) {}
}

function playNoMatchSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 200;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.25);
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

      let startTime = audioContext.currentTime + i * 0.15;
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
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
