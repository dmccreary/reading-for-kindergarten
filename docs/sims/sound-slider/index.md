---
title: Sound Slider
description: Drag a slider to blend sounds into words, giving children kinesthetic control over the blending process and making abstract phonics concepts concrete.
image: /sims/sound-slider/sound-slider.png
og:image: /sims/sound-slider/sound-slider.png
twitter:image: /sims/sound-slider/sound-slider.png
quality_score: 85
social:
   cards: false
---

# Sound Slider

<iframe src="main.html" height="462px" width="100%" scrolling="no"></iframe>

[Run the Sound Slider MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The Sound Slider makes blending tangible by letting children control the pace of sound blending with a draggable slider. As the slider moves across each sound bubble, that phoneme is pronounced. Moving slowly stretches the sounds apart; moving quickly blends them naturally. This kinesthetic approach helps children internalize the concept of blending.

### Features

- **20 CVC Words**: Common words with picture hints
- **Draggable Slider**: Control blending pace manually
- **Auto Blend**: Watch and hear automatic blending
- **Sound Bubbles**: Visual phoneme representation
- **Progressive Highlighting**: Sounds light up as slider passes
- **Color Coding**: Red vowels, blue consonants
- **Emoji Hints**: Picture clues for each word
- **Audio Feedback**: Each sound plays as slider crosses

### How to Use

1. **See the Emoji**: Guess what word you'll make
2. **Drag the Slider**: Move slowly left to right
3. **Listen**: Each sound plays as the slider passes
4. **Blend**: Moving faster blends sounds together
5. **See the Word**: Full word appears when complete
6. **Auto Blend**: Use button to watch automatic blending

### Why a Slider Works

The slider metaphor is powerful because:

- **Kinesthetic control**: Physical movement aids learning
- **Pace control**: Children set their own speed
- **Visual connection**: See which sound you're on
- **Smooth blending**: Moving fast = natural blending
- **Concrete abstraction**: Abstract concept made physical

## Iframe Example

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/sound-slider/main.html"
        height="462px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Remember**: Recall individual phonemes in CVC words
2. **Understand**: Explain that blending is combining sounds smoothly
3. **Apply**: Control blending pace to decode words
4. **Analyze**: Compare slow segmented sounds to smooth blending

### What is Blending?

Blending is the skill of combining individual sounds to form words:

- Segmented: /c/ ... /a/ ... /t/
- Stretched: "caaaat"
- Blended: "cat"

The slider physically represents this progression from separated to connected sounds.

### Suggested Activities

1. **Slow Motion**: Drag slider very slowly, stretching each sound
2. **Speed Up**: Gradually increase speed to natural blending
3. **Pause and Predict**: Stop after two sounds, guess the word
4. **Slider Race**: Who can blend smoothly without stopping?
5. **Teacher Models**: Show how slow = stretched, fast = blended

### Assessment Opportunities

- Observe slider movement patterns (jerky vs. smooth)
- Listen for correct phoneme pronunciation
- Note if children anticipate the word before completing
- Track which words are decoded fluently

### Differentiation

- **Support**: Use Auto Blend first to model; slow practice
- **Challenge**: Cover emoji hint; add longer words

### Teaching Connection

Use the slider to demonstrate blending concepts:

- **Physical metaphor**: "Let's slide through the sounds"
- **Speed awareness**: "Slow for learning, fast for reading"
- **Sound connection**: "Listen how the sounds connect"

## Technical Notes

- Uses p5.js for interactive graphics and animations
- Web Speech API for phoneme and word pronunciation
- Web Audio API for ping sounds at each phoneme
- Touch-friendly slider for mobile/tablet use
- Responsive design adapts to container width

## References

- [Blending Instruction](https://www.readingrockets.org/strategies/blending) - Reading Rockets
- [Phonemic Awareness](https://www.readingrockets.org/article/phonological-awareness-instructional-sequence) - Teaching sequence
- [Kinesthetic Learning](https://www.readingrockets.org/article/multisensory-structured-language-education) - Multi-sensory approaches
- [p5.js Reference](https://p5js.org/reference/) - Graphics library documentation
