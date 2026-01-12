---
title: Word Counter
description: An interactive MicroSim where kindergarten students count words in sentences by tapping once per word, developing the concept of word and one-to-one correspondence.
image: /sims/word-counter/word-counter.png
og:image: /sims/word-counter/word-counter.png
twitter:image: /sims/word-counter/word-counter.png
quality_score: 85
social:
   cards: false
---

# Word Counter

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Word Counter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The Word Counter MicroSim helps kindergarten students develop the "concept of word" - the understanding that spoken language consists of individual words separated by spaces in print. This foundational skill is essential for tracking print during read-alouds and for early writing.

### Features

- **Sentence Library**: 22 simple sentences ranging from 2-5 words
- **Visual Blocks**: Colorful blocks appear for each word counted
- **Audio Support**: Hear the sentence spoken, then hear words spoken individually after correct answers
- **Difficulty Levels**: Filter by 2, 3, 4, or 5 word sentences
- **Celebration Animation**: Falling block particles reward correct answers
- **Large Tap Target**: Easy tapping for young fingers

### How to Use

1. **Listen**: Click "Hear Sentence" to hear the sentence spoken
2. **Count**: Tap the orange circle once for each word you hear
3. **Watch**: Colorful blocks appear showing your count
4. **Check**: Click "Check" to see if you counted correctly
5. **Learn**: After a correct answer, hear each word spoken separately
6. **Continue**: Click "New" for another sentence to count

### Sentence Difficulty

**2 Words**: "Run fast." | "I play." | "Go home."
**3 Words**: "I am happy." | "The cat runs." | "I like dogs."
**4 Words**: "The dog is big." | "I like to run."
**5 Words**: "I like to play ball." | "The big dog can run."

## Iframe Example

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/word-counter/main.html"
        height="482px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Remember**: Recall that sentences are made up of individual words
2. **Understand**: Explain that words in speech correspond to words in print
3. **Apply**: Count the number of words in simple spoken sentences
4. **Analyze**: Identify where one word ends and another begins

### Suggested Activities

1. **Movement Counting**: Have students take a step for each word in a sentence
2. **Block Building**: Use physical blocks to represent words before the digital tool
3. **Finger Tracking**: Point to each word in print while listening to audio
4. **Sentence Building**: Create sentences with a target number of words

### Assessment Opportunities

- Track which sentence lengths students master first
- Note if students count syllables instead of words
- Observe if compound concepts (like "ice cream") cause confusion

### Differentiation

- **Support**: Start with 2-word sentences; use sentences with clear word boundaries
- **Challenge**: Include sentences with contractions to discuss "hidden words"

### Common Misconceptions

- Counting syllables instead of words
- Thinking phrases like "a lot" are one word
- Not counting small words like "a," "the," "is"

## Technical Notes

- Uses p5.js for interactive graphics
- Web Speech API for sentence pronunciation
- Web Audio API for tap feedback sounds
- Touch and mouse input supported
- Responsive design adapts to container width

## References

- [Concept of Word Research](https://www.readingrockets.org/article/concept-word) - Reading Rockets
- [Print Concepts](https://www.literacyworldwide.org/get-resources/standards/standards-for-the-english-language-arts) - ILA Standards
- [p5.js Reference](https://p5js.org/reference/) - Graphics library documentation
