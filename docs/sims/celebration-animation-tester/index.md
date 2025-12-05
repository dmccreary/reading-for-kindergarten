---
title: Celebration Animation Tester
description: A testbed for various celebration animations that can be reused across educational MicroSims to reward student achievements.
image: /sims/celebration-animation-tester/celebration-animation-tester.png
og:image: /sims/celebration-animation-tester/celebration-animation-tester.png
twitter:image: /sims/celebration-animation-tester/celebration-animation-tester.png
social:
   cards: false
---

# Celebration Animation Tester

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

[Run the Celebration Animation Tester Fullscreen](./main.html){ .md-button .md-button--primary }

## Sample iframe

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/celebration-animation-tester/main.html" height="520px" scrolling="no"></iframe>
```

## Description

The Celebration Animation Tester is a development tool and showcase for various celebration animations designed to reward student achievements in educational MicroSims. Each animation provides positive reinforcement when students complete tasks correctly.

### Available Animations

1. **Yellow Stars** - Classic golden stars floating upward with rotation
2. **Rainbow Sparkle Burst** - Colorful sparkles exploding from center in rainbow colors
3. **Happy Star Sprinkle** - Smiling stars gently falling like sprinkles
4. **Alphabet Fireworks** - Letters shooting up and exploding like fireworks
5. **Super Reader Confetti** - Rectangular confetti in bright colors tumbling down
6. **Magic Book Bloom** - Glowing particles blooming outward like opening a magic book
7. **Giggle Glitter Pop** - Bouncy glitter circles that pop and multiply
8. **Storytime Spark Shower** - Colorful sparks falling like rain with trails
9. **Bright Buddy Balloons** - Colorful balloons floating upward
10. **Reading Rocket Zoom** - Rocket trails zooming across the screen
11. **Book Burst** - Colorful closed books shooting upward from the bottom center

### How to Use

1. Select an animation type from the dropdown menu
2. Click the "Celebrate!" button to trigger the animation
3. Watch the animation play in the drawing area
4. Try different animations to find your favorites

## Reusing These Animations

The animation code in this MicroSim is designed to be easily copied into other educational simulations. Each animation function is self-contained and can be triggered when students:

- Complete a level or task correctly
- Find all target items in a game
- Match pairs successfully
- Achieve a high score

### Code Pattern

```javascript
// To add celebrations to your MicroSim:
// 1. Copy the particle array and animation functions
// 2. Call createCelebration(type) when student succeeds
// 3. Call updateAndDrawParticles() in your draw() loop
```

## Educational Purpose

Positive reinforcement through visual celebration helps:

- **Motivation** - Rewards encourage continued engagement
- **Achievement Recognition** - Students feel proud of accomplishments
- **Emotional Connection** - Fun animations create positive associations with learning
- **Memory Enhancement** - Memorable celebrations help encode learning experiences
