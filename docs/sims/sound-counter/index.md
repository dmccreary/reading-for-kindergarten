---
title: Sound Counter
description: An interactive MicroSim where kindergarten students count phonemes in spoken words by tapping for each sound heard, developing phoneme segmentation skills essential for reading.
image: /sims/sound-counter/sound-counter.png
og:image: /sims/sound-counter/sound-counter.png
twitter:image: /sims/sound-counter/sound-counter.png
quality_score: 85
social:
   cards: false
---

# Sound Counter

<iframe src="main.html" height="462px" width="100%" scrolling="no"></iframe>

[Run the Sound Counter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The Sound Counter MicroSim helps kindergarten students develop phoneme segmentation skills - the ability to break words into their individual sounds. This foundational skill is essential for both reading (decoding) and spelling (encoding).

### Features

- **Word Library**: 20 carefully selected words ranging from 2-4 phonemes
- **Visual Representation**: Emoji pictures help students connect words to meaning
- **Interactive Counting**: Large tap target designed for young fingers
- **Star Feedback**: Visual stars appear for each tap
- **Audio Support**: Hear the word spoken, then hear individual phonemes after correct answers
- **Difficulty Levels**: Filter by 2, 3, or 4 phoneme words
- **Celebration Animation**: Particle effects reward correct answers

### How to Use

1. **Listen**: Click "Hear Word" to hear the word spoken
2. **Count**: Tap the green circle once for each sound you hear
3. **Check**: Click "Check" to see if you counted correctly
4. **Learn**: After a correct answer, hear each phoneme spoken separately
5. **Continue**: Click "New Word" for another word to count

### Word List by Difficulty

**2 Phonemes**: at, up, go, me, no
**3 Phonemes**: cat, dog, sun, hat, pig, bed, cup, map, bus, top
**4 Phonemes**: frog, stop, clap, swim, jump

## Iframe Example

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/sound-counter/main.html"
        height="462px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Remember**: Recall that words are made up of individual sounds (phonemes)
2. **Understand**: Explain that the number of sounds may differ from the number of letters
3. **Apply**: Segment simple CVC words into individual phonemes
4. **Analyze**: Distinguish between individual sounds in blended words

### Suggested Activities

1. **Stretchy Words**: Model stretching words slowly (/c/...../a/...../t/) before using the tool
2. **Body Counting**: Have students clap, stomp, or jump for each sound
3. **Sound Boxes**: Use Elkonin boxes alongside the digital tool
4. **Partner Practice**: One student says a word, the other counts sounds

### Assessment Opportunities

- Track which word lengths students master first
- Note if students confuse letters and sounds
- Observe if blended sounds (like "st" in "stop") cause difficulty

### Differentiation

- **Support**: Start with 2-phoneme words; use continuous sounds (m, s, f) that are easier to isolate
- **Challenge**: Have students identify the specific sounds, not just count them

## Technical Notes

- Uses p5.js for interactive graphics
- Web Speech API for word pronunciation
- Web Audio API for tap feedback sounds
- Touch and mouse input supported
- Responsive design adapts to container width

## References

- [Phoneme Segmentation Research](https://www.readingrockets.org/article/phonemic-awareness-young-children) - Reading Rockets
- [Elkonin Boxes](https://www.readingrockets.org/strategies/elkonin_boxes) - Sound boxes teaching strategy
- [p5.js Reference](https://p5js.org/reference/) - Graphics library documentation
