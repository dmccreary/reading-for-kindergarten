---
title: Talking Letters
description: An interactive alphabet where kindergarten students click on letters to hear them spoken aloud using the Web Speech API.
image: /sims/talking-letters/talking-letters.png
og:image: /sims/talking-letters/talking-letters.png
twitter:image: /sims/talking-letters/talking-letters.png
social:
   cards: false
---

# Talking Letters

<iframe src="main.html" height="395px" width="100%" scrolling="no"></iframe>

[Run the Talking Letters MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Talking Letters MicroSim using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/cKV0beWYf)

## About This MicroSim

This interactive alphabet display helps kindergarten students learn letter names by clicking on any letter to hear it spoken aloud. The MicroSim uses the Web Speech API built into modern browsers, requiring no external audio files.

## How to Use

1. **Click any letter** to hear it spoken aloud
2. **Watch the display** - the letter appears large in the corner with animated sound waves
3. **Toggle case** - use the "Uppercase" checkbox to switch between lowercase and uppercase letters
4. **Change voice** - use the dropdown menu to select different voices (male/female, accents)

## Features

- **All 26 letters** displayed in a responsive grid that fills the available space
- **Text-to-speech** using the browser's built-in Web Speech API
- **Voice selection** - choose from available English voices (male, female, different accents)
- **Visual feedback** - letters highlight when hovered and turn green when speaking
- **Large letter display** shows the current letter being spoken
- **Animated sound waves** indicate audio is playing
- **Case toggle** - defaults to lowercase with option to show uppercase

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/talking-letters/main.html" height="452px" scrolling="no"></iframe>
```

## Learning Objectives

This MicroSim supports the following learning objectives from the course:

### Remember (Knowledge)
- Recognize all 26 letters of the alphabet (uppercase and lowercase)
- Recall the name of each letter

### Understand (Comprehension)
- Associate the visual shape of each letter with its spoken name
- Understand the difference between uppercase and lowercase letter forms

## Lesson Plan

### Introduction (2 minutes)
- Explain that each letter has a name
- Demonstrate clicking on a few letters (A, B, C) and listening to the names

### Guided Practice (5 minutes)
- Click through the alphabet together as a class
- Ask students to predict the next letter name before clicking
- Toggle to lowercase and repeat with a few letters

### Independent Practice (10 minutes)
- Let students explore freely, clicking letters of interest
- Challenge: "Can you find the letter that starts your name?"
- Challenge: "Click all the vowels: A, E, I, O, U"

### Assessment
- Point to random letters and ask students to name them before clicking
- Observe which letters students click repeatedly (may indicate uncertainty)

### Extensions
- **Letter Hunt**: Call out a letter name, students race to click it
- **Alphabetical Order**: Click letters in order A-Z
- **Name Spelling**: Click letters to spell students' names
- **Vowel vs Consonant**: Identify and click only vowels or only consonants

## Technical Notes

### Browser Compatibility
The Web Speech API is supported in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Voice Selection
Users can select from available English voices using the dropdown menu. Available voices vary by platform:

| Platform | Example Voices |
|----------|---------------|
| macOS | Samantha, Alex, Victoria, Daniel |
| Windows | Microsoft David, Microsoft Zira |
| Chrome | Google US English, Google UK English |
| iOS/iPad | Various Siri voices |

The dropdown filters for English-language voices only and displays them by name.

### Audio Settings
The speech is configured for young learners:
- **Rate**: 0.8 (slightly slower than normal)
- **Pitch**: 1.1 (slightly higher for clarity)
- **Volume**: 1.0 (full volume)

## Tips for Teachers

1. **Volume Check**: Ensure classroom speakers or headphones are working before the lesson
2. **First Click**: Some browsers require a user interaction before audio plays - have students click any letter to start
3. **Voice Selection**: Try different voices to find one that students respond to best - some prefer female voices, others male
4. **Repetition**: Encourage students to click letters multiple times to reinforce learning
5. **Lowercase First**: The MicroSim defaults to lowercase since these are more common in reading; use the Uppercase toggle when ready
6. **Pair Work**: Have students take turns - one clicks, one predicts the letter name
