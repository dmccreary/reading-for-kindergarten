// First Sound Finder MicroSim
// Listen to a word and identify the first sound from picture choices
// Designed for kindergarten students developing phonemic awareness

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// Game state
let currentWord = null;
let pictureChoices = [];
let selectedChoice = null;
let isCorrect = null;
let showFeedback = false;
let feedbackTimer = 0;
let score = 0;
let questionsAnswered = 0;

// Word bank with pictures - organized by first sound
// Each entry: { word: string, emoji: string, firstSound: string }
const wordBank = [
  // B words
  { word: 'ball', emoji: '⚽', firstSound: 'b' },
  { word: 'bear', emoji: '🐻', firstSound: 'b' },
  { word: 'bird', emoji: '🐦', firstSound: 'b' },
  { word: 'book', emoji: '📚', firstSound: 'b' },
  { word: 'banana', emoji: '🍌', firstSound: 'b' },
  { word: 'bus', emoji: '🚌', firstSound: 'b' },
  { word: 'butterfly', emoji: '🦋', firstSound: 'b' },

  // C/K words
  { word: 'cat', emoji: '🐱', firstSound: 'k' },
  { word: 'car', emoji: '🚗', firstSound: 'k' },
  { word: 'cup', emoji: '☕', firstSound: 'k' },
  { word: 'cake', emoji: '🎂', firstSound: 'k' },
  { word: 'cow', emoji: '🐄', firstSound: 'k' },

  // D words
  { word: 'dog', emoji: '🐕', firstSound: 'd' },
  { word: 'duck', emoji: '🦆', firstSound: 'd' },
  { word: 'door', emoji: '🚪', firstSound: 'd' },
  { word: 'dinosaur', emoji: '🦕', firstSound: 'd' },

  // F words
  { word: 'fish', emoji: '🐟', firstSound: 'f' },
  { word: 'frog', emoji: '🐸', firstSound: 'f' },
  { word: 'flower', emoji: '🌸', firstSound: 'f' },
  { word: 'fire', emoji: '🔥', firstSound: 'f' },

  // G words
  { word: 'goat', emoji: '🐐', firstSound: 'g' },
  { word: 'grapes', emoji: '🍇', firstSound: 'g' },
  { word: 'gift', emoji: '🎁', firstSound: 'g' },

  // H words
  { word: 'hat', emoji: '🎩', firstSound: 'h' },
  { word: 'house', emoji: '🏠', firstSound: 'h' },
  { word: 'heart', emoji: '❤️', firstSound: 'h' },
  { word: 'horse', emoji: '🐴', firstSound: 'h' },

  // L words
  { word: 'lion', emoji: '🦁', firstSound: 'l' },
  { word: 'leaf', emoji: '🍃', firstSound: 'l' },
  { word: 'lemon', emoji: '🍋', firstSound: 'l' },

  // M words
  { word: 'moon', emoji: '🌙', firstSound: 'm' },
  { word: 'mouse', emoji: '🐭', firstSound: 'm' },
  { word: 'monkey', emoji: '🐵', firstSound: 'm' },
  { word: 'milk', emoji: '🥛', firstSound: 'm' },

  // N words
  { word: 'nose', emoji: '👃', firstSound: 'n' },
  { word: 'nest', emoji: '🪺', firstSound: 'n' },

  // P words
  { word: 'pig', emoji: '🐷', firstSound: 'p' },
  { word: 'pizza', emoji: '🍕', firstSound: 'p' },
  { word: 'pencil', emoji: '✏️', firstSound: 'p' },
  { word: 'pear', emoji: '🍐', firstSound: 'p' },

  // R words
  { word: 'rain', emoji: '🌧️', firstSound: 'r' },
  { word: 'rabbit', emoji: '🐰', firstSound: 'r' },
  { word: 'rainbow', emoji: '🌈', firstSound: 'r' },
  { word: 'rocket', emoji: '🚀', firstSound: 'r' },

  // S words
  { word: 'sun', emoji: '☀️', firstSound: 's' },
  { word: 'star', emoji: '⭐', firstSound: 's' },
  { word: 'snake', emoji: '🐍', firstSound: 's' },
  { word: 'strawberry', emoji: '🍓', firstSound: 's' },

  // T words
  { word: 'tree', emoji: '🌳', firstSound: 't' },
  { word: 'turtle', emoji: '🐢', firstSound: 't' },
  { word: 'train', emoji: '🚂', firstSound: 't' },
  { word: 'tiger', emoji: '🐯', firstSound: 't' },

  // W words
  { word: 'water', emoji: '💧', firstSound: 'w' },
  { word: 'whale', emoji: '🐋', firstSound: 'w' },
  { word: 'watermelon', emoji: '🍉', firstSound: 'w' },

  // Z words
  { word: 'zebra', emoji: '🦓', firstSound: 'z' },
  { word: 'zipper', emoji: '🤐', firstSound: 'z' }
];

// UI elements
let speakButton;
let nextButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create Speak button
  speakButton = createButton('🔊 Hear Word');
  speakButton.position(margin, drawHeight + 15);
  speakButton.mousePressed(speakCurrentWord);
  speakButton.style('font-size', '18px');
  speakButton.style('padding', '10px 20px');
  speakButton.style('background-color', '#4CAF50');
  speakButton.style('color', 'white');
  speakButton.style('border', 'none');
  speakButton.style('border-radius', '8px');
  speakButton.style('cursor', 'pointer');

  // Create Next button
  nextButton = createButton('Next Word →');
  nextButton.position(canvasWidth - 180, drawHeight + 15);
  nextButton.mousePressed(nextQuestion);
  nextButton.style('font-size', '18px');
  nextButton.style('padding', '10px 20px');
  nextButton.style('background-color', '#2196F3');
  nextButton.style('color', 'white');
  nextButton.style('border', 'none');
  nextButton.style('border-radius', '8px');
  nextButton.style('cursor', 'pointer');

  textFont('Arial');

  // Start with first question
  generateQuestion();

  describe('First Sound Finder - listen to a word and click the picture that starts with the same sound', LABEL);
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
  fill('#333');
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text('First Sound Finder', canvasWidth / 2, 10);

  // Draw instructions
  textSize(16);
  fill('#666');
  text('Listen to the word, then click the picture', canvasWidth / 2, 40);
  text('that starts with the SAME sound!', canvasWidth / 2, 60);

  // Draw current word display
  drawWordDisplay();

  // Draw picture choices
  drawPictureChoices();

  // Draw score
  drawScore();

  // Draw feedback if showing
  if (showFeedback) {
    drawFeedback();
    feedbackTimer--;
    if (feedbackTimer <= 0) {
      showFeedback = false;
      if (isCorrect) {
        // Auto-advance after correct answer
        setTimeout(() => {
          if (showFeedback === false) {
            generateQuestion();
          }
        }, 500);
      }
    }
  }

  // Update and draw celebration animation
  updateAndDrawBookBurst();

  // Update button positions on resize
  nextButton.position(canvasWidth - 170, drawHeight + 15);
}

function drawWordDisplay() {
  if (!currentWord) return;

  // Word display box
  let boxWidth = 200;
  let boxHeight = 60;
  let boxX = canvasWidth / 2 - boxWidth / 2;
  let boxY = 90;

  fill(255, 255, 220);
  stroke('#FFD700');
  strokeWeight(3);
  rect(boxX, boxY, boxWidth, boxHeight, 10);

  // Word text
  fill('#E74C3C');
  noStroke();
  textSize(32);
  textAlign(CENTER, CENTER);
  text('"' + currentWord.word + '"', canvasWidth / 2, boxY + boxHeight / 2);

  // First sound hint (shown subtly)
  fill('#999');
  textSize(14);
  text('First sound: /' + currentWord.firstSound + '/', canvasWidth / 2, boxY + boxHeight + 15);
}

function drawPictureChoices() {
  if (pictureChoices.length === 0) return;

  let numChoices = pictureChoices.length;
  let choiceSize = 100;
  let spacing = 20;
  let totalWidth = numChoices * choiceSize + (numChoices - 1) * spacing;
  let startX = canvasWidth / 2 - totalWidth / 2;
  let choiceY = 200;

  for (let i = 0; i < numChoices; i++) {
    let choice = pictureChoices[i];
    let x = startX + i * (choiceSize + spacing);

    // Determine box color based on state
    let boxColor = color(255, 255, 255);
    let borderColor = color(200, 200, 200);
    let borderWeight = 2;

    if (showFeedback && selectedChoice === i) {
      if (isCorrect) {
        boxColor = color(200, 255, 200);
        borderColor = color(76, 175, 80);
        borderWeight = 4;
      } else {
        boxColor = color(255, 200, 200);
        borderColor = color(244, 67, 54);
        borderWeight = 4;
      }
    } else if (isMouseOverChoice(x, choiceY, choiceSize) && !showFeedback) {
      boxColor = color(230, 240, 255);
      borderColor = color(100, 150, 255);
      borderWeight = 3;
    }

    // Draw choice box
    fill(boxColor);
    stroke(borderColor);
    strokeWeight(borderWeight);
    rect(x, choiceY, choiceSize, choiceSize + 30, 10);

    // Draw emoji (picture)
    textSize(50);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(0);
    text(choice.emoji, x + choiceSize / 2, choiceY + choiceSize / 2);

    // Draw word label below
    textSize(14);
    fill('#333');
    text(choice.word, x + choiceSize / 2, choiceY + choiceSize + 15);

    // Show correct/incorrect indicator during feedback
    if (showFeedback) {
      if (choice.firstSound === currentWord.firstSound) {
        // This is a correct answer
        fill(76, 175, 80);
        textSize(24);
        text('✓', x + choiceSize - 15, choiceY + 20);
      } else if (selectedChoice === i) {
        // This was the wrong selection
        fill(244, 67, 54);
        textSize(24);
        text('✗', x + choiceSize - 15, choiceY + 20);
      }
    }
  }
}

function drawScore() {
  // Score display
  fill(255, 255, 255, 230);
  stroke('#4CAF50');
  strokeWeight(2);
  rect(canvasWidth - 100, 10, 90, 35, 8);

  fill('#333');
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Score: ' + score + '/' + questionsAnswered, canvasWidth - 55, 27);
}

function drawFeedback() {
  let feedbackY = 360;

  textSize(24);
  textAlign(CENTER, CENTER);
  noStroke();

  if (isCorrect) {
    fill('#4CAF50');
    text('Great job! 🌟', canvasWidth / 2, feedbackY);
    textSize(16);
    text('Both start with the /' + currentWord.firstSound + '/ sound!', canvasWidth / 2, feedbackY + 30);
  } else {
    fill('#F44336');
    text('Try again! 💪', canvasWidth / 2, feedbackY);
    textSize(16);
    fill('#666');
    text('Listen for the /' + currentWord.firstSound + '/ sound', canvasWidth / 2, feedbackY + 30);
  }
}

function isMouseOverChoice(x, y, size) {
  return mouseX >= x && mouseX <= x + size &&
         mouseY >= y && mouseY <= y + size + 30;
}

function mousePressed() {
  if (showFeedback) return;

  let numChoices = pictureChoices.length;
  let choiceSize = 100;
  let spacing = 20;
  let totalWidth = numChoices * choiceSize + (numChoices - 1) * spacing;
  let startX = canvasWidth / 2 - totalWidth / 2;
  let choiceY = 200;

  for (let i = 0; i < numChoices; i++) {
    let x = startX + i * (choiceSize + spacing);

    if (isMouseOverChoice(x, choiceY, choiceSize)) {
      selectedChoice = i;
      checkAnswer(i);
      return;
    }
  }
}

function touchStarted() {
  mousePressed();
  return false;
}

function checkAnswer(choiceIndex) {
  let chosen = pictureChoices[choiceIndex];
  isCorrect = chosen.firstSound === currentWord.firstSound;
  showFeedback = true;
  feedbackTimer = 90; // About 1.5 seconds at 60fps
  questionsAnswered++;

  if (isCorrect) {
    score++;
    // Trigger celebration animation
    clearBookBurst();
    createBookBurst(canvasWidth / 2, drawHeight, 1.0);
    playCelebrationSound('chime');
  } else {
    playTryAgainSound();
  }
}

function generateQuestion() {
  showFeedback = false;
  selectedChoice = null;
  isCorrect = null;

  // Pick a random word as the target
  currentWord = wordBank[floor(random(wordBank.length))];

  // Generate choices: 1 correct + 3 distractors with different first sounds
  pictureChoices = [];

  // Find one correct answer (same first sound, could be the same or different word)
  let correctChoices = wordBank.filter(w =>
    w.firstSound === currentWord.firstSound && w.word !== currentWord.word
  );

  // If no other words with same sound, use the target word itself
  if (correctChoices.length === 0) {
    pictureChoices.push(currentWord);
  } else {
    pictureChoices.push(correctChoices[floor(random(correctChoices.length))]);
  }

  // Find distractors with different first sounds
  let usedSounds = [currentWord.firstSound];
  let distractors = wordBank.filter(w => !usedSounds.includes(w.firstSound));

  // Shuffle and pick 3 distractors with distinct sounds
  shuffleArray(distractors);

  for (let d of distractors) {
    if (!usedSounds.includes(d.firstSound) && pictureChoices.length < 4) {
      pictureChoices.push(d);
      usedSounds.push(d.firstSound);
    }
  }

  // Shuffle the choices
  shuffleArray(pictureChoices);

  // Auto-speak the word
  setTimeout(speakCurrentWord, 500);
}

function nextQuestion() {
  generateQuestion();
}

function speakCurrentWord() {
  if (!currentWord) return;

  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    let utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.rate = 0.7; // Slower for children
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  }
}

function playTryAgainSound() {
  // Gentle low tone for try again
  try {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 220;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (e) {
    // Audio not available
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
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
