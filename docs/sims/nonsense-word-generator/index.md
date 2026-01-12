---
title: Nonsense Word Generator
description: Generate and decode made-up CVC words to practice pure phonics decoding skills without relying on word memorization or picture clues.
image: /sims/nonsense-word-generator/nonsense-word-generator.png
og:image: /sims/nonsense-word-generator/nonsense-word-generator.png
twitter:image: /sims/nonsense-word-generator/nonsense-word-generator.png
quality_score: 85
social:
   cards: false
---

# Nonsense Word Generator

<iframe src="main.html" height="462px" width="100%" scrolling="no"></iframe>

[Run the Nonsense Word Generator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The Nonsense Word Generator (also called "Silly Word Factory") creates made-up CVC words that children must decode using pure phonics skills. Unlike real words, nonsense words can't be recognized from memory or guessed from pictures—children must actually blend the sounds. This reveals true decoding ability.

### Features

- **Pure Decoding Practice**: No picture clues or memorization shortcuts
- **CVC Pattern**: Consonant-vowel-consonant structure
- **Real Word Filter**: Automatically avoids generating real words
- **Sound-by-Sound Blending**: Hear each sound, then the blended word
- **Visual Highlighting**: Current sound highlighted during blending
- **Color Coding**: Blue consonants, red vowels
- **Mix Letters**: Randomize individual positions to create new words
- **Progress Tracking**: Count of words successfully decoded

### How to Use

1. **View the Word**: Three letter tiles display the CVC pattern
2. **Try to Decode**: Attempt to sound out the silly word
3. **Sound It Out**: Click to hear each sound separately
4. **Blend Together**: After individual sounds, hear them blended
5. **New Silly Word**: Generate a completely new nonsense word
6. **Mix Letters**: Change one letter at a time to explore patterns

### Why Nonsense Words?

Nonsense words (pseudowords) are used in reading assessments like DIBELS because they:

- **Ensure decoding**: Can't be recognized from memory
- **Remove context**: No picture or sentence clues
- **Test phonics knowledge**: Pure sound-symbol relationships
- **Reveal gaps**: Show which letter-sound mappings need work
- **Build fluency**: Force attention to all letters in sequence

## Iframe Example

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/nonsense-word-generator/main.html"
        height="462px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Remember**: Recall individual letter sounds for consonants and vowels
2. **Understand**: Explain that sounds can be blended even for made-up words
3. **Apply**: Decode unfamiliar CVC combinations using phonics
4. **Analyze**: Identify which sounds they found difficult

### What Are Nonsense Words?

Nonsense words are pronounceable combinations of letters that don't form real words:

- **Examples**: "vog," "bim," "tup," "nef"
- **Not nonsense**: "xyz" (not pronounceable in English)
- **Purpose**: Test pure decoding without context clues
- **Framing**: Call them "silly words" or "alien language" for fun!

### Suggested Activities

1. **Silly Word Challenge**: Decode 10 nonsense words in a row
2. **Word Sort**: Group nonsense words by vowel sound
3. **Partner Decode**: One student generates, another decodes
4. **Speed Round**: How many can you decode in one minute?
5. **Make It Real**: Change one letter to turn nonsense into real word

### Assessment Opportunities

- Listen for correct sound production on each phoneme
- Observe blending fluency (smooth vs. choppy)
- Note which vowel sounds cause difficulty
- Track decoding speed over time

### Differentiation

- **Support**: Focus on just two vowels at first; model blending extensively
- **Challenge**: Add timer; introduce consonant blends (CCVC patterns)

### Connection to Assessment

This activity mirrors standardized assessments:

- **DIBELS Nonsense Word Fluency**: Tests decoding with pseudowords
- **PALS**: Uses nonsense words to assess phonics
- **Running Records**: Nonsense words reveal decoding strategies

### Important Teaching Points

1. **It's okay if words are silly!** The goal is decoding, not meaning
2. **Every letter matters** - unlike sight words, each sound must be processed
3. **Slow is fine** - accuracy before speed
4. **Mistakes show learning** - errors reveal which sounds need practice

## Technical Notes

- Uses p5.js for interactive graphics and animations
- Web Speech API for phoneme and word pronunciation
- Web Audio API for feedback sounds
- Contains extensive list of real words to filter out
- Touch and mouse support
- Responsive design adapts to container width

## References

- [DIBELS Assessment](https://dibels.uoregon.edu/) - Nonsense Word Fluency measure
- [Pseudoword Reading](https://www.readingrockets.org/article/phonics-instruction) - Why nonsense words matter
- [Decoding vs. Word Recognition](https://www.readingrockets.org/article/decoding) - Reading Rockets
- [p5.js Reference](https://p5js.org/reference/) - Graphics library documentation
