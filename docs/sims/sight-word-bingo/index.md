---
title: Sight Word Bingo
description: An interactive bingo game where kindergarteners listen to spoken sight words and mark them on their card, combining auditory and visual word recognition practice.
image: /sims/sight-word-bingo/sight-word-bingo.png
og:image: /sims/sight-word-bingo/sight-word-bingo.png
twitter:image: /sims/sight-word-bingo/sight-word-bingo.png
quality_score: 85
social:
   cards: false
---

# Sight Word Bingo

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Sight Word Bingo MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Sight Word Bingo MicroSim](https://editor.p5js.org/dmccreary/sketches/ul3R44azZ)
## About This MicroSim

Sight Word Bingo combines the excitement of a classic game with sight word practice. Children listen for called words, then find and mark them on their personalized bingo card. This multi-sensory approach strengthens the connection between hearing a word and recognizing it in print.

### Features

- **48 Sight Words**: Large pool of Dolch words for varied gameplay
- **Three Grid Sizes**: 3×3 (Easy), 4×4 (Medium), 5×5 (Hard)
- **Audio Calling**: Each word is spoken aloud clearly
- **Visual Word Display**: Current word shown on screen
- **Win Detection**: Automatic detection of rows, columns, and diagonals
- **Celebration**: BINGO announcement and confetti animation
- **Random Cards**: New unique card each game

### How to Play

1. **Select Difficulty**: Choose grid size (3×3, 4×4, or 5×5)
2. **Click "New Card"**: Generate your unique bingo card
3. **Click "Call Word"**: Hear a word spoken aloud
4. **Find the Word**: Look for that word on your card
5. **Click to Mark**: Click the matching word to mark it
6. **Get BINGO**: Complete a row, column, or diagonal to win!

### Game Modes

| Level | Grid | Words | To Win |
|-------|------|-------|--------|
| Easy | 3×3 | 9 | 3 in a row |
| Medium | 4×4 | 16 | 4 in a row |
| Hard | 5×5 | 25 | 5 in a row |

## Iframe Example

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/sight-word-bingo/main.html"
        height="542px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Remember**: Recognize spoken sight words and match them to print
2. **Understand**: Connect auditory word recognition to visual recognition
3. **Apply**: Quickly scan and locate specific words in a grid
4. **Analyze**: Use pattern recognition to work toward winning combinations

### Why Bingo Works for Sight Words

Bingo is effective for sight word instruction because:

- **Multi-sensory**: Combines listening and visual scanning
- **Motivation**: Game format maintains engagement through repetition
- **Urgency**: Need to find words quickly builds automaticity
- **Social**: Can be played with peers or family
- **Variable difficulty**: Easy to adjust for different skill levels

### Suggested Activities

1. **Class Bingo**: Project the game for whole-class play
2. **Partner Bingo**: Two students share a device, taking turns calling
3. **Speed Round**: How many words can you mark in one minute?
4. **Word Wall Match**: After winning, find bingo words on classroom word wall
5. **Sentence Building**: Create sentences using the winning row of words

### Assessment Opportunities

- Observe how quickly students locate called words
- Note which words students struggle to find
- Track if students recognize words before seeing them on screen
- Listen for students reading words aloud as they search

### Differentiation

- **Support**: Use 3×3 grid; point to word location as hint
- **Challenge**: 5×5 grid; require two bingos before celebrating

### Classroom Variations

1. **Blackout Bingo**: Mark every word on the card
2. **Four Corners**: Mark all four corner words
3. **X Pattern**: Mark both diagonals
4. **Teacher Caller**: Teacher calls words instead of computer
5. **Reverse Bingo**: Students call words for teacher to find

## Technical Notes

- Uses p5.js for interactive graphics and animations
- Web Speech API for word pronunciation
- Web Audio API for game sounds
- Touch and mouse support for cell selection
- Responsive design adapts to container width
- Smart calling ensures only words on your card are called

## References

- [Bingo for Learning](https://www.readingrockets.org/article/word-games) - Reading Rockets
- [Dolch Word List](https://www.dolchword.net/) - Original high-frequency word list
- [Auditory Learning and Reading](https://www.readingrockets.org/article/phonological-awareness-and-reading) - Sound-print connections
- [p5.js Reference](https://p5js.org/reference/) - Graphics library documentation
