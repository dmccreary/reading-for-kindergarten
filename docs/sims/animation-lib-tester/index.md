---
title: Animation Library Tester
description: A testbed demonstrating the shared animation library modules for educational MicroSims.
image: /sims/animation-lib-tester/animation-lib-tester.png
og:image: /sims/animation-lib-tester/animation-lib-tester.png
twitter:image: /sims/animation-lib-tester/animation-lib-tester.png
social:
   cards: false
---

# Animation Library Tester

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

[Run the Animation Library Tester Fullscreen](./main.html){ .md-button .md-button--primary }

## Sample iframe

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/animation-lib-tester/main.html" height="520px" scrolling="no"></iframe>
```

## Description

The Animation Library Tester demonstrates how to use the **shared animation modules** located in `/docs/sims/shared/animations/`. Unlike the original celebration-animation-tester which has all animations inline, this version imports each animation as a separate JavaScript module.

### Key Difference from celebration-animation-tester

- **celebration-animation-tester**: ~950 lines, all animations inline (monolithic)
- **animation-lib-tester**: ~150 lines, uses shared modules (modular)

### Shared Animation Modules Used

This tester imports all 11 animation modules plus the sound effects:

```html
<script src="../shared/animations/book-burst.js"></script>
<script src="../shared/animations/yellow-stars.js"></script>
<script src="../shared/animations/rainbow-sparkle-burst.js"></script>
<!-- ... and more -->
```

### Available Animations

1. **Book Burst** - Colorful closed books shooting upward from the bottom center
2. **Yellow Stars** - Classic golden stars floating upward with rotation
3. **Rainbow Sparkle Burst** - Colorful sparkles exploding from center in rainbow colors
4. **Happy Star Sprinkle** - Smiling stars gently falling like sprinkles
5. **Alphabet Fireworks** - Letters shooting up and exploding like fireworks
6. **Super Reader Confetti** - Rectangular confetti in bright colors tumbling down
7. **Magic Book Bloom** - Glowing particles blooming outward like opening a magic book
8. **Giggle Glitter Pop** - Bouncy glitter circles that pop and multiply
9. **Storytime Spark Shower** - Colorful sparks falling like rain with trails
10. **Bright Buddy Balloons** - Colorful balloons floating upward
11. **Reading Rocket Zoom** - Rocket trails zooming across the screen

### How to Use

1. Select an animation type from the dropdown menu
2. Select animation speed (Fast/Medium/Slow)
3. Click the "Celebrate!" button to trigger the animation
4. Watch the animation play in the drawing area

## Using the Shared Animation Library in Your MicroSim

To add celebrations to your own MicroSim, copy only the animations you need:

### Step 1: Copy Animation Files

```bash
cp docs/sims/shared/animations/book-burst.js docs/sims/my-game/
cp docs/sims/shared/animations/yellow-stars.js docs/sims/my-game/
```

### Step 2: Include in main.html

```html
<script src="https://cdn.jsdelivr.net/npm/p5@1.11.10/lib/p5.js"></script>
<script src="book-burst.js"></script>
<script src="yellow-stars.js"></script>
<script src="my-game.js"></script>
```

### Step 3: Trigger in Your Game

```javascript
function onPlayerWins() {
  createBookBurst(canvasWidth / 2, drawHeight);
}

function draw() {
  // ... your game code ...
  updateAndDrawBookBurst();
  updateAndDrawYellowStars();
}
```

## Educational Purpose

Positive reinforcement through visual celebration helps:

- **Motivation** - Rewards encourage continued engagement
- **Achievement Recognition** - Students feel proud of accomplishments
- **Emotional Connection** - Fun animations create positive associations with learning
- **Memory Enhancement** - Memorable celebrations help encode learning experiences

## See Also

- [Shared Animation Library Documentation](../shared/animations/index.md)
- [Original Celebration Animation Tester](../celebration-animation-tester/index.md)
