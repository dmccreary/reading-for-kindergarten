---
title: Rhyme Time
description: An interactive matching game where kindergarten students match rhyming word pairs, developing phonemic awareness and rhyme recognition skills essential for early reading.
image: /sims/rhyme-time/rhyme-time.png
og:image: /sims/rhyme-time/rhyme-time.png
twitter:image: /sims/rhyme-time/rhyme-time.png
quality_score: 85
social:
   cards: false
---

# Rhyme Time

<iframe src="main.html" height="472px" width="100%" scrolling="no"></iframe>

[Run the Rhyme Time MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Rhyme Time is a matching game that helps kindergarten students develop rhyme recognition - a gateway phonemic awareness skill. Children who can identify rhymes typically progress well to more complex sound manipulation tasks essential for reading.

### Features

- **15 Rhyming Pairs**: Common rhyming words with friendly emoji pictures
- **Audio Support**: Each word is spoken when clicked
- **Visual Feedback**: Cards highlight when selected, animate when matched
- **Match Animation**: Cards fly together when a rhyme is found
- **Celebration Effects**: Star particles celebrate each match
- **Score Tracking**: Tracks matches found and attempts made
- **Replayability**: New game shuffles different pairs each time

### How to Play

1. **Click** a card to hear the word and select it
2. **Click** another card to try to find its rhyming partner
3. **Match** words that end with the same sound (cat/hat, dog/frog)
4. **Watch** the cards animate together when you find a rhyme
5. **Continue** until all pairs are matched!

### Rhyming Pairs Include

- cat / hat
- dog / frog
- cake / snake
- bee / tree
- star / car
- moon / spoon
- fish / dish
- house / mouse
- boat / goat
- rain / train
- bell / shell
- king / ring
- And more!

## Iframe Example

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/rhyme-time/main.html"
        height="472px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Remember**: Recall that rhyming words share ending sounds
2. **Understand**: Explain why two words rhyme or don't rhyme
3. **Apply**: Match rhyming words from a set of options
4. **Analyze**: Compare word endings to determine if words rhyme

### Suggested Activities

1. **Rhyme Sort**: Before playing, have students sort picture cards into rhyming groups
2. **Rhyme Chain**: After matching, create chains of additional rhyming words
3. **Body Rhymes**: Act out rhyming pairs (hop like a frog, pet a dog)
4. **Nonsense Rhymes**: Make up silly rhyming words after playing

### Assessment Opportunities

- Observe which pairs students match quickly vs. with difficulty
- Note if students use phonological awareness or random guessing
- Track improvement in attempts needed across multiple games

### Differentiation

- **Support**: Start with just 2 pairs; focus on word families (-at, -og)
- **Challenge**: Have students generate additional rhyming words for each pair

### Connection to Reading

Rhyme recognition helps children notice that words are made of smaller sound units. This awareness transfers to:
- Recognizing word families in reading
- Spelling by analogy (if I can spell "cat," I can spell "hat")
- Decoding new words by noticing patterns

## Technical Notes

- Uses p5.js for interactive graphics
- Web Speech API for word pronunciation
- Web Audio API for feedback sounds
- Touch and mouse input supported
- Responsive design adapts to container width

## References

- [Rhyme Recognition Research](https://www.readingrockets.org/article/phonological-and-phonemic-awareness) - Reading Rockets
- [Word Families](https://www.readingrockets.org/strategies/word_families) - Teaching with word patterns
- [p5.js Reference](https://p5js.org/reference/) - Graphics library documentation
