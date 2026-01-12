---
title: CVC Word Builder
description: An interactive MicroSim where kindergarten students drag letters to build consonant-vowel-consonant words with audio blending support, developing core decoding skills.
image: /sims/cvc-word-builder/cvc-word-builder.png
og:image: /sims/cvc-word-builder/cvc-word-builder.png
twitter:image: /sims/cvc-word-builder/cvc-word-builder.png
quality_score: 85
social:
   cards: false
---

# CVC Word Builder

<iframe src="main.html" height="472px" width="100%" scrolling="no"></iframe>

[Run the CVC Word Builder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The CVC Word Builder teaches the core decoding skill of blending sounds into words. Children drag letter tiles into slots to build consonant-vowel-consonant words, then hear the sounds blended together. This tactile interaction reinforces the understanding that words are built from individual sounds.

### Features

- **40 CVC Words**: Common word families (-at, -an, -ig, -ug, -op, -ot, -ed, -en)
- **Drag and Drop**: Intuitive tile-based letter placement
- **Color Coding**: Red vowels, blue consonants
- **Slot Labels**: Beginning, Middle, End positions identified
- **Blend Button**: Hear sounds spoken separately then blended
- **Audio Support**: Automatic blending when words are completed
- **Emoji Pictures**: Visual clues for target words
- **Hint System**: Optional word display when needed

### How to Play

1. **Look**: See the picture and guess the word
2. **Drag**: Move letter tiles into the three slots
3. **Remember**: Vowels go in the middle slot
4. **Blend**: Click "Blend Sounds" to hear the sounds
5. **Celebrate**: Correct words trigger celebration!
6. **Continue**: Click for a new word

### Word Families Included

**-at words**: cat, hat, bat, rat, mat, sat
**-an words**: pan, can, man, fan, van
**-ig words**: pig, big, dig, wig
**-ug words**: cup, pup, bug, rug, hug, mug
**-un words**: sun, run, bun, fun
**-op words**: top, hop, mop, pop
**-ot words**: pot, hot, dot, cot
**-ed/-en words**: bed, red, hen, pen, ten, wet

## Iframe Example

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/cvc-word-builder/main.html"
        height="472px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Remember**: Recall that CVC words have consonant-vowel-consonant structure
2. **Understand**: Explain that blending sounds together makes words
3. **Apply**: Build simple CVC words by placing letters in correct positions
4. **Analyze**: Identify which letter position changes to make new words

### What is Blending?

Blending is the ability to put sounds together to make words:
- /c/ + /a/ + /t/ = "cat"
- This skill is essential for decoding (sounding out) words while reading

### Suggested Activities

1. **Word Family Focus**: Build several words from one family (-at: cat, hat, bat)
2. **Sound Stretching**: Model stretching words before digital practice
3. **Physical Tiles**: Use magnetic letters alongside the digital tool
4. **Change One Sound**: Build "cat," then change beginning to make "hat"

### Assessment Opportunities

- Observe if students understand vowel placement
- Note which word families are mastered first
- Track whether students can blend independently

### Differentiation

- **Support**: Use hint mode; focus on familiar words
- **Challenge**: Have students create nonsense CVC combinations

### Teaching Sequence

1. Start with continuous sounds (m, s, f) that are easier to stretch
2. Progress to stop sounds (p, t, d) that are harder to isolate
3. Focus on one word family at a time
4. Eventually mix word families

## Technical Notes

- Uses p5.js for interactive graphics
- Web Speech API for sound pronunciation
- Web Audio API for feedback sounds
- Touch and mouse drag-and-drop supported
- Responsive design adapts to container width

## References

- [Blending](https://www.readingrockets.org/strategies/blending) - Reading Rockets
- [CVC Words](https://www.readingrockets.org/article/phonics-basics) - Phonics fundamentals
- [p5.js Reference](https://p5js.org/reference/) - Graphics library documentation
