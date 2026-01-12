// Sight Word Flashcards MicroSim
// Interactive flashcards for high-frequency sight words
// Designed for kindergarten students learning to read

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Dolch Pre-Primer and Primer sight words for kindergarten
const sightWords = [
  // Pre-Primer
  {word: 'a', sentence: 'I see a cat.'},
  {word: 'and', sentence: 'Mom and Dad.'},
  {word: 'away', sentence: 'Run away!'},
  {word: 'big', sentence: 'A big dog.'},
  {word: 'blue', sentence: 'The sky is blue.'},
  {word: 'can', sentence: 'I can run.'},
  {word: 'come', sentence: 'Come here.'},
  {word: 'down', sentence: 'Sit down.'},
  {word: 'find', sentence: 'Find the ball.'},
  {word: 'for', sentence: 'This is for you.'},
  {word: 'funny', sentence: 'That is funny!'},
  {word: 'go', sentence: 'Let\'s go!'},
  {word: 'help', sentence: 'Help me.'},
  {word: 'here', sentence: 'Come here.'},
  {word: 'I', sentence: 'I am happy.'},
  {word: 'in', sentence: 'Jump in!'},
  {word: 'is', sentence: 'This is fun.'},
  {word: 'it', sentence: 'I like it.'},
  {word: 'jump', sentence: 'Jump up!'},
  {word: 'little', sentence: 'A little cat.'},
  {word: 'look', sentence: 'Look at me!'},
  {word: 'make', sentence: 'Make a cake.'},
  {word: 'me', sentence: 'Help me.'},
  {word: 'my', sentence: 'My dog.'},
  {word: 'not', sentence: 'Not now.'},
  {word: 'one', sentence: 'One fish.'},
  {word: 'play', sentence: 'Let\'s play!'},
  {word: 'red', sentence: 'A red apple.'},
  {word: 'run', sentence: 'Run fast!'},
  {word: 'said', sentence: 'She said yes.'},
  {word: 'see', sentence: 'I see you.'},
  {word: 'the', sentence: 'The dog runs.'},
  {word: 'three', sentence: 'Three cats.'},
  {word: 'to', sentence: 'Go to bed.'},
  {word: 'two', sentence: 'Two birds.'},
  {word: 'up', sentence: 'Wake up!'},
  {word: 'we', sentence: 'We play.'},
  {word: 'where', sentence: 'Where is it?'},
  {word: 'yellow', sentence: 'Yellow sun.'},
  {word: 'you', sentence: 'I see you.'}
];

// Game state
let currentIndex = 0;
let showSentence = false;
let knownWords = new Set();
let learningWords = new Set();
let cardFlip = 0;
let isFlipping = false;

// UI Elements
let prevButton, nextButton, speakButton, knownButton, shuffleButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create Previous button
  prevButton = createButton('< Prev');
  prevButton.position(margin, drawHeight + 15);
  prevButton.mousePressed(previousCard);
  prevButton.style('font-size', '14px');
  prevButton.style('padding', '8px 12px');
  prevButton.style('cursor', 'pointer');

  // Create Next button
  nextButton = createButton('Next >');
  nextButton.position(margin + 75, drawHeight + 15);
  nextButton.mousePressed(nextCard);
  nextButton.style('font-size', '14px');
  nextButton.style('padding', '8px 12px');
  nextButton.style('cursor', 'pointer');

  // Create Speak button
  speakButton = createButton('Hear');
  speakButton.position(margin + 155, drawHeight + 15);
  speakButton.mousePressed(speakWord);
  speakButton.style('font-size', '14px');
  speakButton.style('padding', '8px 12px');
  speakButton.style('background-color', '#4CAF50');
  speakButton.style('color', 'white');
  speakButton.style('border', 'none');
  speakButton.style('border-radius', '5px');
  speakButton.style('cursor', 'pointer');

  // Create Known button
  knownButton = createButton('I Know It!');
  knownButton.position(margin + 215, drawHeight + 15);
  knownButton.mousePressed(markKnown);
  knownButton.style('font-size', '14px');
  knownButton.style('padding', '8px 12px');
  knownButton.style('cursor', 'pointer');

  // Create Shuffle button
  shuffleButton = createButton('Shuffle');
  shuffleButton.position(canvasWidth - 75, drawHeight + 15);
  shuffleButton.mousePressed(shuffleCards);
  shuffleButton.style('font-size', '14px');
  shuffleButton.style('padding', '8px 12px');
  shuffleButton.style('cursor', 'pointer');

  textFont('Arial');

  describe('Sight Word Flashcards for learning high-frequency words', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('#FFF8E1');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  fill('#E65100');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Sight Word Flashcards', canvasWidth / 2, 8);

  // Draw progress
  drawProgress();

  // Draw flashcard
  drawFlashcard();

  // Draw instructions
  drawInstructions();

  // Handle flip animation
  if (isFlipping) {
    cardFlip += 0.15;
    if (cardFlip >= PI) {
      cardFlip = 0;
      isFlipping = false;
      showSentence = !showSentence;
    }
  }
}

function drawProgress() {
  // Progress display
  fill(255, 255, 255, 230);
  stroke('#FF9800');
  strokeWeight(2);
  rect(canvasWidth - 130, 40, 120, 50, 8);

  fill('#333');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Card ' + (currentIndex + 1) + ' of ' + sightWords.length, canvasWidth - 70, 52);
  text('Known: ' + knownWords.size + ' / ' + sightWords.length, canvasWidth - 70, 72);
}

function drawFlashcard() {
  let currentWord = sightWords[currentIndex];
  let centerX = canvasWidth / 2;
  let centerY = 200;
  let cardWidth = 280;
  let cardHeight = 180;

  // Calculate flip effect
  let scaleX = abs(cos(cardFlip));
  if (scaleX < 0.05) scaleX = 0.05;

  push();
  translate(centerX, centerY);

  // Card shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(-cardWidth/2 * scaleX + 5, 5, cardWidth * scaleX, cardHeight, 15);

  // Card background
  let isKnown = knownWords.has(currentWord.word);
  if (isKnown) {
    fill('#E8F5E9');
    stroke('#4CAF50');
  } else {
    fill('white');
    stroke('#FF9800');
  }
  strokeWeight(4);
  rect(-cardWidth/2 * scaleX, -cardHeight/2, cardWidth * scaleX, cardHeight, 15);

  // Card content (only show when not mid-flip)
  if (scaleX > 0.3) {
    noStroke();

    if (showSentence) {
      // Show sentence side
      fill('#666');
      textSize(14);
      textAlign(CENTER, TOP);
      text('Example:', 0, -cardHeight/2 + 20);

      fill('#333');
      textSize(20);
      textAlign(CENTER, CENTER);

      // Highlight the word in the sentence
      let sentence = currentWord.sentence;
      text(sentence, 0, 0);

      // Word indicator
      fill('#E65100');
      textSize(14);
      textAlign(CENTER, BOTTOM);
      text('Click card to see word', 0, cardHeight/2 - 15);
    } else {
      // Show word side
      let wordColor = isKnown ? '#4CAF50' : '#E65100';
      fill(wordColor);
      textSize(64);
      textAlign(CENTER, CENTER);
      text(currentWord.word, 0, -10);

      // Tap hint
      fill('#999');
      textSize(14);
      textAlign(CENTER, BOTTOM);
      text('Click card to see sentence', 0, cardHeight/2 - 15);

      // Known indicator
      if (isKnown) {
        fill('#4CAF50');
        textSize(24);
        textAlign(RIGHT, TOP);
        text('', cardWidth/2 * scaleX - 15, -cardHeight/2 + 10);
      }
    }
  }

  pop();
}

function drawInstructions() {
  fill('#666');
  textSize(12);
  textAlign(CENTER, TOP);
  noStroke();
  text('Click the card to flip it. Click "Hear" to hear the word.', canvasWidth / 2, 305);
  text('Mark words you know with "I Know It!"', canvasWidth / 2, 322);
}

function mousePressed() {
  // Check if clicked on flashcard
  let centerX = canvasWidth / 2;
  let centerY = 200;
  let cardWidth = 280;
  let cardHeight = 180;

  if (mouseX > centerX - cardWidth/2 && mouseX < centerX + cardWidth/2 &&
      mouseY > centerY - cardHeight/2 && mouseY < centerY + cardHeight/2 &&
      !isFlipping) {
    flipCard();
  }
}

function flipCard() {
  isFlipping = true;
  cardFlip = 0;
  playFlipSound();
}

function previousCard() {
  currentIndex = (currentIndex - 1 + sightWords.length) % sightWords.length;
  showSentence = false;
  cardFlip = 0;
  isFlipping = false;
}

function nextCard() {
  currentIndex = (currentIndex + 1) % sightWords.length;
  showSentence = false;
  cardFlip = 0;
  isFlipping = false;
}

function speakWord() {
  if (!('speechSynthesis' in window)) return;

  speechSynthesis.cancel();

  let currentWord = sightWords[currentIndex];

  // Speak the word
  let wordUtterance = new SpeechSynthesisUtterance(currentWord.word);
  wordUtterance.rate = 0.7;
  wordUtterance.pitch = 1.1;
  speechSynthesis.speak(wordUtterance);

  // Then speak the sentence
  setTimeout(() => {
    let sentenceUtterance = new SpeechSynthesisUtterance(currentWord.sentence);
    sentenceUtterance.rate = 0.9;
    speechSynthesis.speak(sentenceUtterance);
  }, 800);
}

function markKnown() {
  let currentWord = sightWords[currentIndex];

  if (knownWords.has(currentWord.word)) {
    knownWords.delete(currentWord.word);
  } else {
    knownWords.add(currentWord.word);
    playSuccessSound();
  }

  // Move to next card
  setTimeout(nextCard, 300);
}

function shuffleCards() {
  // Fisher-Yates shuffle
  for (let i = sightWords.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [sightWords[i], sightWords[j]] = [sightWords[j], sightWords[i]];
  }
  currentIndex = 0;
  showSentence = false;
}

function playFlipSound() {
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 600;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
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
  shuffleButton.position(canvasWidth - 75, drawHeight + 15);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
