---
title: Word Machine
description: A fun factory-themed MicroSim where children load sounds into a machine and watch gears spin as the sounds blend into a word, making phonics concrete and engaging.
image: /sims/word-machine/word-machine.png
og:image: /sims/word-machine/word-machine.png
twitter:image: /sims/word-machine/word-machine.png
quality_score: 85
social:
   cards: false
---

# Word Machine

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Word Machine MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The Word Machine uses a factory metaphor to make blending tangible and memorable. Children "load" individual sounds into hoppers, then watch spinning gears and pumping pistons as the machine processes the sounds. The blended word emerges on a conveyor belt with its picture. This playful approach transforms abstract phonics into a concrete, visual experience.

### Features

- **15 CVC Words**: Common words with picture confirmation
- **Factory Animation**: Spinning gears, moving pistons, steam particles
- **Sound Loading**: Click hoppers to load each phoneme
- **Audio Feedback**: Hear sounds as they're loaded and processed
- **Status Light**: Visual indicator of machine state
- **Conveyor Output**: Word emerges on conveyor belt
- **Emoji Pictures**: Visual confirmation of completed word

### How to Use

1. **Load Sounds**: Click each hopper to load the sound
2. **Listen**: Hear each sound as it's loaded
3. **Check Light**: Green when ready to process
4. **Build Word**: Click "BUILD WORD!" button
5. **Watch**: See gears spin and pistons pump
6. **See Result**: Word appears on conveyor belt

### Machine States

| Light Color | State | Action |
|-------------|-------|--------|
| Red | Missing sounds | Click hoppers to load |
| Yellow | Ready | Click BUILD WORD! |
| Green | Processing | Watch animation |
| Blue | Complete | Click New Word |

## Iframe Example

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/word-machine/main.html"
        height="482px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Remember**: Identify the three sounds in CVC words
2. **Understand**: Explain that sounds combine to make words
3. **Apply**: Load sounds in correct order to build words
4. **Create**: Build multiple words using the machine metaphor

### Why the Factory Metaphor Works

The machine metaphor is effective because:

- **Input → Output**: Sounds go in, word comes out
- **Processing visible**: Animation shows something happening
- **Concrete abstraction**: Abstract blending becomes visible
- **Engaging**: Children love machines and buttons
- **Memorable**: Unique experience aids retention

### Suggested Activities

1. **Assembly Line**: Build 5 words in a row
2. **Sound Detective**: Guess the word before it's built
3. **Order Matters**: What happens with wrong sound order?
4. **Speed Factory**: How many words can you build in 5 minutes?
5. **Word Inventor**: Pretend to build nonsense words

### Assessment Opportunities

- Observe sound loading order (left to right)
- Listen for correct phoneme identification
- Note anticipation of complete words
- Track number of words built successfully

### Differentiation

- **Support**: Teacher loads first sound; build together
- **Challenge**: Cover emoji hint; predict word from sounds

### Teaching Connections

Use the machine to reinforce concepts:

- **"Loading" sounds**: "Let's put the /c/ sound in first"
- **"Processing"**: "The machine is blending the sounds together"
- **"Output"**: "Look! The sounds made the word 'cat'!"

## Technical Notes

- Uses p5.js for interactive graphics and animations
- Web Speech API for phoneme and word pronunciation
- Web Audio API for mechanical and success sounds
- Animated gears using rotation and custom shapes
- Particle system for steam effects
- Touch and mouse support
- Responsive design adapts to container width

## References

- [Making Phonics Fun](https://www.readingrockets.org/article/phonics-instruction) - Engaging approaches
- [Blending Instruction](https://www.readingrockets.org/strategies/blending) - Reading Rockets
- [Gamification in Education](https://www.edutopia.org/topic/game-based-learning) - Edutopia
- [p5.js Reference](https://p5js.org/reference/) - Graphics library documentation
