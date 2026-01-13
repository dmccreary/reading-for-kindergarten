// Reading Progress Path MicroSim
// Visual journey through reading skills with links to MicroSims
// Designed for kindergarten students and teachers

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Base URL for MicroSims
const SIMS_BASE_URL = '../';

// Reading skill stations
const stations = [
  {
    id: 'letters',
    name: 'Letters',
    description: 'Learn uppercase & lowercase letters',
    skills: [
      { name: 'Talking Letters', url: 'talking-letters/' },
      { name: 'Letter Matching', url: 'letter-matching-game/' },
      { name: 'Letter Hunt', url: 'letter-hunt/' },
      { name: 'Letter Tracing', url: 'letter-tracing/' }
    ],
    emoji: '🔤',
    color: '#2196F3',
    x: 0.2,
    y: 0.12
  },
  {
    id: 'sounds',
    name: 'Sounds',
    description: 'Hear and identify sounds in words',
    skills: [
      { name: 'First Sound Finder', url: 'first-sound-finder/' },
      { name: 'Sound Counter', url: 'sound-counter/' },
      { name: 'Word Counter', url: 'word-counter/' },
      { name: 'Rhyme Time', url: 'rhyme-time/' }
    ],
    emoji: '👂',
    color: '#9C27B0',
    x: 0.75,
    y: 0.22
  },
  {
    id: 'lettersounds',
    name: 'Letter-Sound',
    description: 'Connect letters to their sounds',
    skills: [
      { name: 'Consonant Sound Match', url: 'consonant-sound-match/' },
      { name: 'Vowel Explorer', url: 'vowel-sound-explorer/' },
      { name: 'Sound-to-Letter', url: 'sound-to-letter-match/' },
      { name: 'Letter Keyboard', url: 'letter-sound-keyboard/' }
    ],
    emoji: '🔊',
    color: '#FF9800',
    x: 0.25,
    y: 0.38
  },
  {
    id: 'blending',
    name: 'Blending',
    description: 'Blend sounds into words',
    skills: [
      { name: 'CVC Word Builder', url: 'cvc-word-builder/' },
      { name: 'VC Blender', url: 'vc-word-blender/' },
      { name: 'Sound Slider', url: 'sound-slider/' },
      { name: 'Word Machine', url: 'word-machine/' }
    ],
    emoji: '🧩',
    color: '#4CAF50',
    x: 0.7,
    y: 0.50
  },
  {
    id: 'sightwords',
    name: 'Sight Words',
    description: 'Learn high-frequency words',
    skills: [
      { name: 'Flashcards', url: 'sight-word-flashcards/' },
      { name: 'Memory Game', url: 'sight-word-memory/' },
      { name: 'Bingo', url: 'sight-word-bingo/' }
    ],
    emoji: '👀',
    color: '#E91E63',
    x: 0.3,
    y: 0.65
  },
  {
    id: 'reading',
    name: 'Reading!',
    description: 'Put it all together!',
    skills: [
      { name: 'Nonsense Words', url: 'nonsense-word-generator/' },
      { name: 'Letter Motion Maker', url: 'letter-motion-maker/' }
    ],
    emoji: '📖',
    color: '#FF5722',
    x: 0.65,
    y: 0.78
  }
];

// Game state
let selectedStation = null;
let hoveredStation = null;
let completedSkills = {}; // { stationId: ['skill-url-1', 'skill-url-2'] }
let scrollOffset = 0;

// LocalStorage key
const STORAGE_KEY = 'readingProgressPath';

// Save progress to localStorage
function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSkills));
  } catch (e) {
    console.warn('Could not save progress:', e);
  }
}

// Load progress from localStorage
function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not load progress:', e);
  }
  return null;
}

// Check if a skill is completed
function isSkillCompleted(stationId, skillUrl) {
  return completedSkills[stationId] && completedSkills[stationId].includes(skillUrl);
}

// Get count of completed skills for a station
function getStarsForStation(stationId) {
  return completedSkills[stationId] ? completedSkills[stationId].length : 0;
}

// Mark a skill as completed and open the MicroSim
function completeSkill(stationId, skill) {
  if (!completedSkills[stationId]) {
    completedSkills[stationId] = [];
  }
  if (!completedSkills[stationId].includes(skill.url)) {
    completedSkills[stationId].push(skill.url);
    saveProgress();
  }
  // Open the MicroSim in a new tab
  window.open(SIMS_BASE_URL + skill.url, '_blank');
}

// UI Elements
let resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Load saved progress or initialize to empty
  const savedProgress = loadProgress();
  if (savedProgress) {
    completedSkills = savedProgress;
  } else {
    stations.forEach(station => {
      completedSkills[station.id] = [];
    });
  }

  // Create reset button
  resetButton = createButton('Reset Progress');
  resetButton.position(canvasWidth - 130, drawHeight + 12);
  resetButton.mousePressed(resetProgress);
  resetButton.style('font-size', '12px');
  resetButton.style('padding', '6px 12px');
  resetButton.style('cursor', 'pointer');

  textFont('Arial');

  describe('Reading Progress Path showing learning journey through reading skills', LABEL);
}

function draw() {
  updateCanvasSize();

  // Background - road/path feel
  drawBackground();

  // Draw connecting path
  drawPath();

  // Draw stations
  drawStations();

  // Draw station detail panel if selected
  if (selectedStation) {
    drawDetailPanel();
  }

  // Draw legend
  drawLegend();

  // Reposition button
  resetButton.position(canvasWidth - 130, drawHeight + 12);
}

function drawBackground() {
  // Sky gradient
  for (let y = 0; y < drawHeight; y++) {
    let inter = map(y, 0, drawHeight, 0, 1);
    let c = lerpColor(color('#87CEEB'), color('#E8F5E9'), inter);
    stroke(c);
    line(0, y, canvasWidth, y);
  }

  // Ground
  fill('#8BC34A');
  noStroke();
  rect(0, drawHeight * 0.85, canvasWidth, drawHeight * 0.15);

  // Control area
  fill('#FAFAFA');
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#333');
  noStroke();
  textSize(18);
  textAlign(LEFT, CENTER);
  text('My Reading Journey', 15, drawHeight + controlHeight / 2);
}

function drawPath() {
  // Draw winding path connecting stations
  stroke('#795548');
  strokeWeight(12);
  noFill();

  beginShape();
  for (let i = 0; i < stations.length; i++) {
    let station = stations[i];
    let x = station.x * canvasWidth;
    let y = station.y * drawHeight;
    curveVertex(x, y);
    if (i === 0 || i === stations.length - 1) {
      curveVertex(x, y); // Duplicate endpoints for smooth curve
    }
  }
  endShape();

  // Path border
  stroke('#5D4037');
  strokeWeight(2);
  noFill();

  beginShape();
  for (let i = 0; i < stations.length; i++) {
    let station = stations[i];
    let x = station.x * canvasWidth;
    let y = station.y * drawHeight;
    curveVertex(x, y);
    if (i === 0 || i === stations.length - 1) {
      curveVertex(x, y);
    }
  }
  endShape();
}

function drawStations() {
  for (let i = 0; i < stations.length; i++) {
    let station = stations[i];
    let x = station.x * canvasWidth;
    let y = station.y * drawHeight;
    let isHovered = hoveredStation === station;
    let isSelected = selectedStation === station;

    let radius = isHovered || isSelected ? 45 : 40;

    // Station shadow
    fill(0, 0, 0, 30);
    noStroke();
    ellipse(x + 3, y + 3, radius * 2);

    // Station circle
    fill(station.color);
    stroke('white');
    strokeWeight(4);
    ellipse(x, y, radius * 2);

    // Emoji
    textSize(isHovered || isSelected ? 28 : 24);
    textAlign(CENTER, CENTER);
    noStroke();
    text(station.emoji, x, y - 5);

    // Station name
    fill('white');
    textSize(10);
    text(station.name, x, y + 18);

    // Stars earned
    let stars = getStarsForStation(station.id);
    let maxStars = station.skills.length;

    // Draw star meter below station
    let meterWidth = 40;
    let meterHeight = 8;
    let meterX = x - meterWidth / 2;
    let meterY = y + radius + 8;

    // Meter background
    fill(255, 255, 255, 150);
    noStroke();
    rect(meterX, meterY, meterWidth, meterHeight, 4);

    // Meter fill
    let fillWidth = (stars / maxStars) * meterWidth;
    fill('#FFD700');
    rect(meterX, meterY, fillWidth, meterHeight, 4);

    // Star count
    fill('#333');
    textSize(9);
    text('⭐' + stars + '/' + maxStars, x, meterY + meterHeight + 10);
  }
}

function drawDetailPanel() {
  let panelWidth = min(280, canvasWidth - 40);
  let panelHeight = 160;
  let panelX = (canvasWidth - panelWidth) / 2;
  let panelY = drawHeight / 2 - panelHeight / 2;

  // Panel shadow
  fill(0, 0, 0, 50);
  noStroke();
  rect(panelX + 5, panelY + 5, panelWidth, panelHeight, 15);

  // Panel background
  fill(255, 255, 255, 245);
  stroke(selectedStation.color);
  strokeWeight(4);
  rect(panelX, panelY, panelWidth, panelHeight, 15);

  // Close button
  fill('#999');
  noStroke();
  textSize(20);
  textAlign(RIGHT, TOP);
  text('×', panelX + panelWidth - 10, panelY + 5);

  // Title
  fill(selectedStation.color);
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  text(selectedStation.emoji + ' ' + selectedStation.name, panelX + panelWidth / 2, panelY + 15);

  // Description
  fill('#666');
  textSize(12);
  text(selectedStation.description, panelX + panelWidth / 2, panelY + 40);

  // Skills list
  textSize(11);
  textAlign(LEFT, TOP);
  let skillY = panelY + 65;

  fill('#333');
  text('Activities (click to play):', panelX + 15, skillY);
  skillY += 20;

  for (let i = 0; i < selectedStation.skills.length; i++) {
    let skill = selectedStation.skills[i];
    let completed = isSkillCompleted(selectedStation.id, skill.url);
    let starIcon = completed ? '⭐' : '☆';

    // Highlight if mouse is over this skill
    let skillTextY = skillY;
    let isHoveredSkill = mouseY >= skillTextY && mouseY < skillTextY + 16 &&
                         mouseX >= panelX + 20 && mouseX < panelX + panelWidth - 20;

    if (isHoveredSkill) {
      fill(selectedStation.color);
      cursor('pointer');
    } else {
      fill(completed ? '#333' : '#666');
    }

    text(starIcon + ' ' + skill.name, panelX + 20, skillY);
    skillY += 18;
  }

  // Tip
  fill('#999');
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text('Click an activity to earn a star!', panelX + panelWidth / 2, panelY + panelHeight - 10);
}

function drawLegend() {
  let legendY = 15;
  let legendX = 15;

  fill(255, 255, 255, 200);
  stroke('#DDD');
  strokeWeight(1);
  rect(legendX - 5, legendY - 5, 70, 30, 5);

  fill('#333');
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  text('Total Stars:', legendX, legendY + 5);

  let totalStars = 0;
  let maxStars = 0;
  stations.forEach(station => {
    totalStars += getStarsForStation(station.id);
    maxStars += station.skills.length;
  });

  fill('#FFD700');
  textSize(12);
  text('⭐ ' + totalStars + '/' + maxStars, legendX, legendY + 18);
}

function mousePressed() {
  // Check if clicking on detail panel
  if (selectedStation) {
    let panelWidth = min(280, canvasWidth - 40);
    let panelHeight = 160;
    let panelX = (canvasWidth - panelWidth) / 2;
    let panelY = drawHeight / 2 - panelHeight / 2;

    // Check close button
    if (mouseX > panelX + panelWidth - 30 && mouseX < panelX + panelWidth &&
        mouseY > panelY && mouseY < panelY + 30) {
      selectedStation = null;
      return;
    }

    // Check if clicking on a skill (activities list)
    let skillY = panelY + 65 + 20; // Starting Y position of first skill
    for (let i = 0; i < selectedStation.skills.length; i++) {
      let skill = selectedStation.skills[i];
      if (mouseY >= skillY && mouseY < skillY + 18 &&
          mouseX >= panelX + 20 && mouseX < panelX + panelWidth - 20) {
        completeSkill(selectedStation.id, skill);
        playClickSound();
        return;
      }
      skillY += 18;
    }

    // Click outside panel closes it
    if (mouseX < panelX || mouseX > panelX + panelWidth ||
        mouseY < panelY || mouseY > panelY + panelHeight) {
      selectedStation = null;
      return;
    }
  }

  // Check if clicking on a station
  for (let station of stations) {
    let x = station.x * canvasWidth;
    let y = station.y * drawHeight;
    let d = dist(mouseX, mouseY, x, y);

    if (d < 45) {
      selectedStation = station;
      playClickSound();
      return;
    }
  }
}

function mouseMoved() {
  hoveredStation = null;

  for (let station of stations) {
    let x = station.x * canvasWidth;
    let y = station.y * drawHeight;
    let d = dist(mouseX, mouseY, x, y);

    if (d < 45) {
      hoveredStation = station;
      cursor('pointer');
      return;
    }
  }

  cursor('default');
}

function resetProgress() {
  stations.forEach(station => {
    completedSkills[station.id] = [];
  });
  selectedStation = null;
  saveProgress();
}

function playClickSound() {
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
