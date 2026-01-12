---
title: VC Word Blender
description: Blend vowel-consonant combinations like -at, -in, -op as a stepping stone to full CVC word reading, with animated letter merging and example words.
image: /sims/vc-word-blender/vc-word-blender.png
og:image: /sims/vc-word-blender/vc-word-blender.png
twitter:image: /sims/vc-word-blender/vc-word-blender.png
quality_score: 85
social:
   cards: false
---

# VC Word Blender

<iframe src="main.html" height="462px" width="100%" scrolling="no"></iframe>

[Run the VC Word Blender MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The VC Word Blender focuses on vowel-consonant combinations—the building blocks of word families. These two-letter endings (-at, -in, -op, etc.) are easier to blend than full CVC words and become the recognizable "chunks" that help children read efficiently. Once mastered, children can quickly recognize -at in cat, hat, bat, and mat.

### Features

- **21 VC Patterns**: Common word family endings
- **Animated Blending**: Watch letters slide together
- **Audio Support**: Hear each sound then the blend
- **Example Words**: See real words using each pattern
- **Color Coding**: Red vowels, blue consonants
- **Highlighted Endings**: Pattern highlighted in example words
- **Progress Tracking**: Count of patterns blended

### VC Patterns Included

| Short A | Short I | Short O | Short U | Short E |
|---------|---------|---------|---------|---------|
| -at | -in | -ot | -un | -et |
| -an | -it | -op | -ut | -en |
| -ap | -ig | -og | -ug | -ed |
| -ad | -ip | -ob | -up | |
| -ag | | | | |
| -am | | | | |

### How to Use

1. **View the Pattern**: See the vowel and consonant separated
2. **Click Blend**: Watch the letters slide together
3. **Listen**: Hear each sound, then the blended ending
4. **See Examples**: Notice how many words use this pattern
5. **Navigate**: Use arrows to explore all 21 patterns

## Iframe Example

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/vc-word-blender/main.html"
        height="462px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Remember**: Recall common VC word family endings
2. **Understand**: Explain how word families share the same ending
3. **Apply**: Blend vowel and consonant sounds together
4. **Analyze**: Recognize VC patterns within longer words

### Why Start with VC Blends?

VC combinations are developmentally appropriate because:

- **Simpler than CVC**: Only two sounds to blend
- **Build chunks**: These endings become recognizable units
- **Word families**: Same ending in many words (cat, hat, bat)
- **Success builds confidence**: Easier task before harder ones
- **Transfer to reading**: Chunk recognition speeds up decoding

### What Are Word Families?

Word families (also called rimes) are groups of words that share the same ending:

- **-at family**: cat, hat, bat, sat, mat, rat
- **-op family**: hop, mop, top, pop, stop
- **-in family**: pin, tin, win, fin, spin

Knowing word families helps children:
- Read new words by analogy
- Recognize patterns quickly
- Build vocabulary efficiently

### Suggested Activities

1. **Family Hunt**: Find all -at words in a book
2. **Rhyme Chain**: Say words that end with -op
3. **Word Building**: Add different beginning sounds to -an
4. **Sort by Ending**: Group picture cards by word family
5. **Blend Race**: How quickly can you blend each pattern?

### Assessment Opportunities

- Listen for smooth blending vs. choppy sounds
- Note which vowel sounds are difficult
- Track if children recognize patterns in new words
- Observe transfer to CVC word reading

### Differentiation

- **Support**: Focus on just 2-3 patterns; repeat often
- **Challenge**: Have children generate words for each pattern

### Teaching Sequence

1. Start with -at (most common, clear sounds)
2. Add -an, -ap (same vowel, different consonants)
3. Move to -it, -in (different vowel)
4. Gradually introduce all patterns
5. Mix and review regularly

## Technical Notes

- Uses p5.js for interactive graphics and animations
- Web Speech API for phoneme and blend pronunciation
- Web Audio API for feedback sounds
- Smooth lerp animation for letter blending
- Touch and mouse support
- Responsive design adapts to container width

## References

- [Word Families](https://www.readingrockets.org/strategies/word_families) - Reading Rockets
- [Phonics Patterns](https://www.readingrockets.org/article/phonics-instruction) - Systematic phonics instruction
- [Onset and Rime](https://www.readingrockets.org/article/onset-and-rime) - Understanding word structure
- [p5.js Reference](https://p5js.org/reference/) - Graphics library documentation
