---
title: Reading Progress Path
description: A visual journey map showing the path from learning letters to reading, with stations for each skill area that link to related MicroSims and track progress.
image: /sims/reading-progress-path/reading-progress-path.png
og:image: /sims/reading-progress-path/reading-progress-path.png
twitter:image: /sims/reading-progress-path/reading-progress-path.png
quality_score: 85
social:
   cards: false
---

# Reading Progress Path

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Reading Progress Path MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The Reading Progress Path provides a visual overview of the reading journey, showing how skills build on each other from letter recognition to fluent reading. Each station on the path represents a skill area with clickable links to related MicroSims. Progress is tracked using browser localStorage and visualized through stars, motivating continued practice.

### Features

- **6 Skill Stations**: Letters, Sounds, Letter-Sound, Blending, Sight Words, Reading
- **Visual Path**: Winding road connecting skill areas
- **Clickable Activities**: Click any activity to open its MicroSim and earn a star
- **Persistent Progress**: Stars are saved to browser localStorage and persist across sessions (note: progress is specific to this browser on this device)
- **Detail Panels**: Click stations to see available activities
- **Color Coding**: Each skill area has unique color
- **Emoji Icons**: Visual representation of each skill
- **Total Progress**: Overall star count displayed
- **Reset Option**: Clear all progress to start fresh

### Skill Stations

| Station | Skills | Activities |
|---------|--------|------------|
| 🔤 Letters | Letter recognition | Talking Letters, Letter Matching, Letter Hunt, Letter Tracing |
| 👂 Sounds | Phonemic awareness | First Sound Finder, Sound Counter, Word Counter, Rhyme Time |
| 🔊 Letter-Sound | Letter-sound correspondence | Consonant Sound Match, Vowel Explorer, Sound-to-Letter, Letter Keyboard |
| 🧩 Blending | Sound blending | CVC Word Builder, VC Blender, Sound Slider, Word Machine |
| 👀 Sight Words | High-frequency words | Flashcards, Memory Game, Bingo |
| 📖 Reading! | Putting it together | Nonsense Words, Letter Motion Maker |

### How to Use

1. **View the Path**: See the journey from Letters to Reading
2. **Click Stations**: Tap any station to open its detail panel
3. **Launch Activities**: Click an activity name to open the MicroSim in a new tab
4. **Earn Stars**: A star is automatically awarded when you click an activity
5. **Track Progress**: Filled stars show completed activities; progress persists across visits
6. **Close Panel**: Click outside the panel or the X button to close it
7. **Reset**: Click "Reset Progress" to clear all stars and start fresh

!!! warning "Progress is Browser-Specific"
    Your progress is stored in this browser's localStorage on this device only. If you switch to a different computer or use a different browser (e.g., switching from Chrome to Safari), your stars will not appear. For consistent tracking, always use the same browser on the same device.

## Iframe Example

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/reading-for-kindergarten/sims/reading-progress-path/main.html"
        height="552px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

After using this MicroSim, students and teachers will be able to:

1. **Remember**: Identify the main skill areas in learning to read
2. **Understand**: Explain how reading skills build on each other
3. **Apply**: Navigate to appropriate activities for their skill level
4. **Evaluate**: Track their own progress through the reading journey

### The Reading Development Sequence

The path reflects research-based reading development:

1. **Letter Recognition**: Foundation of all reading
2. **Phonemic Awareness**: Hearing sounds in words
3. **Letter-Sound Correspondence**: Connecting letters to sounds
4. **Blending**: Combining sounds into words
5. **Sight Words**: Automatic word recognition
6. **Reading**: Putting all skills together

### Suggested Activities

1. **Journey Introduction**: Use path to explain the reading learning journey
2. **Goal Setting**: "Let's work on the Blending station today"
3. **Progress Celebration**: Review stars earned at week's end
4. **Skill Assessment**: Identify which stations need more practice
5. **Parent Communication**: Share progress path with families

### Assessment Opportunities

- Use star counts to identify mastery areas
- Note which stations students gravitate toward
- Track overall progress across skill areas
- Identify skill gaps for targeted instruction

### Differentiation

- **Support**: Focus on one station at a time; celebrate small wins
- **Challenge**: Set goals for star completion; time trials

### Classroom Integration

The Progress Path serves as:

- **Visual curriculum map**: Shows the scope of reading instruction
- **Student motivation tool**: Makes progress visible
- **Navigation hub**: Links to all MicroSims
- **Assessment dashboard**: Quick view of skill development
- **Parent communication**: Easy-to-understand progress report

## Technical Notes

- Uses p5.js for interactive graphics and animations
- Curved path drawn with bezier curves
- Progress stored in browser localStorage (key: `readingProgressPath`)
- Tracks individual skill completions per station
- Click detection for stations and activity links
- Hover effects highlight clickable activities
- Touch and mouse support
- Responsive design adapts to container width

## Design Tradeoffs

This progress tracking approach has specific tradeoffs worth understanding:

### Advantages

| Benefit | Description |
|---------|-------------|
| **No MicroSim Changes** | Individual MicroSims require no modification; all tracking logic is self-contained |
| **Simple Architecture** | Uses browser-native localStorage with no backend, database, or authentication |
| **Immediate Feedback** | Stars awarded instantly when clicking, providing positive reinforcement |
| **Works Offline** | localStorage functions without internet after initial page load |
| **Privacy-Friendly** | All data stays on the user's device; nothing sent to servers |

### Limitations

| Limitation | Description |
|------------|-------------|
| **Entry Point Dependent** | Stars are only awarded when accessing MicroSims through this progress path; using the site navigation bar bypasses tracking |
| **Browser & Device-Specific** | Progress is stored in this specific browser on this specific device. Using a different computer, or even a different browser on the same computer (e.g., Chrome vs. Safari), will show zero progress |
| **No Completion Verification** | Stars are awarded on click, not upon actual mastery or completion of the activity |
| **Data Fragility** | Clearing browser data, incognito mode, or switching browsers loses all progress |
| **Single User** | No user accounts; multiple children sharing a device share the same progress |
| **No Teacher Dashboard** | Teachers cannot view student progress since data is local-only |

### Alternative Approaches

For deployments requiring cross-device sync or teacher visibility, consider:

- **MicroSim-initiated tracking**: Each MicroSim writes to localStorage on completion (requires modifying all MicroSims)
- **Backend storage**: Server-side database with user accounts (adds hosting complexity)
- **LMS integration**: Connect to learning management systems via LTI or xAPI standards

## References

- [Reading Development Stages](https://www.readingrockets.org/article/stages-reading-development) - Reading Rockets
- [Scope and Sequence](https://www.readingrockets.org/article/phonics-scope-and-sequence) - Phonics instruction order
- [Progress Monitoring](https://www.readingrockets.org/article/progress-monitoring) - Tracking student growth
- [p5.js Reference](https://p5js.org/reference/) - Graphics library documentation
