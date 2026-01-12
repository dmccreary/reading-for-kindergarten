---
title: Sound-to-Letter Match
description: An interactive MicroSim where kindergarten students hear a sound and find the letter that makes it, strengthening bidirectional letter-sound connections essential for spelling and reading.
image: /sims/sound-to-letter-match/sound-to-letter-match.png
og:image: /sims/sound-to-letter-match/sound-to-letter-match.png
twitter:image: /sims/sound-to-letter-match/sound-to-letter-match.png
quality_score: 85
social:
   cards: false
---

# Sound-to-Letter Match

<iframe src="main.html" height="472px" width="100%" scrolling="no"></iframe>

[Run the Sound-to-Letter Match MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The Sound-to-Letter Match MicroSim practices the inverse of typical "see letter, say sound" activities. Children hear a sound and must find the letter that makes it. This strengthens bidirectional letter-sound connections essential for both reading (decoding) and spelling (encoding).

### Features

- **16 Consonant Sounds**: Focuses on unambiguous consonant mappings
- **Audio First**: Sound plays automatically each round
- **Visual Letter Grid**: Large, clickable letter buttons
- **Hint System**: Optional word hints when needed
- **5-Round Games**: Short sessions maintain attention
- **Score Tracking**: Monitors progress across rounds
- **Celebration Effects**: Star particles reward correct answers

### How to Play

1. **Listen**: A sound plays automatically (click "Play Sound" to hear again)
2. **Think**: Which letter makes that sound?
3. **Click**: Tap the letter you think matches
4. **Check**: See if you're correct
5. **Continue**: Click to move to the next round
6. **Use Hints**: Click "Hint" if you need help

### Letters Included

The game focuses on 16 consonant letters with clear, unambiguous sounds:

B, D, F, G, H, J, L, M, N, P, R, S, T, V, W, Z

## Iframe Example

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/sound-to-letter-match/main.html"
        height="472px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Remember**: Recall which letters make specific sounds
2. **Understand**: Explain the sound-to-letter relationship
3. **Apply**: Match heard sounds to their written letters
4. **Analyze**: Distinguish between similar sounds (/m/ vs /n/)

### Why Sound-to-Letter?

Most phonics instruction goes from letter to sound (see B, say /b/). But spelling requires the reverse - hearing /b/ and knowing to write B. This "reversal" practice strengthens both pathways:

- **Reading**: Letter → Sound (decoding)
- **Spelling**: Sound → Letter (encoding)

### Suggested Activities

1. **Sound Dictation**: Teacher says sounds, students write letters
2. **Sound Sorting**: Sort objects by their beginning sound/letter
3. **Mystery Sound**: Play "I'm thinking of a letter that says..."
4. **Partner Quiz**: Students take turns making sounds for each other

### Assessment Opportunities

- Track which sound-letter pairs cause difficulty
- Note if students confuse similar sounds (/b/ vs /p/, /m/ vs /n/)
- Observe strategy use (sounding out, using hints)

### Differentiation

- **Support**: Start with just 4-6 highly distinct sounds; provide picture cues
- **Challenge**: Add timing pressure or reduce hint availability

### Common Confusions

- /m/ and /n/ (both continuous nasal sounds)
- /b/ and /p/ (both lip sounds, differ in voicing)
- /d/ and /t/ (both tongue-tip sounds, differ in voicing)

## Technical Notes

- Uses p5.js for interactive graphics
- Web Speech API for sound pronunciation
- Web Audio API for feedback sounds
- Touch and mouse input supported
- Responsive design adapts to container width

## References

- [Encoding vs Decoding](https://www.readingrockets.org/article/spelling-and-word-study) - Reading Rockets
- [Bidirectional Letter-Sound](https://www.readingrockets.org/article/alphabetic-principle) - The alphabetic principle
- [p5.js Reference](https://p5js.org/reference/) - Graphics library documentation
