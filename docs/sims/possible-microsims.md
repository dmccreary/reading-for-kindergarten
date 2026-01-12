# List of Possible MicroSims

## Letter Recognition

### Talking Letters

Interactive display of all 26 letters; click to hear the letter name and see uppercase/lowercase forms.
I wanted to do this first to test the quality of the sound synthesis.
The default of letters is is lowercase.  A checkbox allows the user to try the uppercase letters.  The voices adds the word "Uppercase" to the uppercase letters.
Uses the built-in browser-based speech synthesis libraries with a drop-down list for all the voices supported
by your browser.  There is no extra internet traffic for downloads and the JavaScript runs without modification
on the p5.js editor which is ideal for testing and debugging.
The dropdown list of all the voices is admittedly long and can be removed.  Our goal is to
show the options for each browser.  Tested under both Google Chrome and Firefox on the Mac.

**Status:** [Go to Talking Letters](./talking-letters/index.md)

### Letter Matching Game

Match uppercase letters to their lowercase partners with a drag-and-drop match.
A row of letters of one case is presented in a top row.
A row of letters of the opposite case is presented in the bottom row.
In the current version the user must drag a connection from one tile to the matching tile.
A list of existing matches is kept by showing the line that connects them.
A score of the progress and attempts is show to the right.
A sad face or happy face appears to the right based on the correctness of the connection. 
We also can create an alternative that has a single click on the first row and a single click on the second row since
holding a mouse down might not be as easy as two clicks.
Another possible variation is to only display a single letter at the top and have
the user click one of the letters in the bottom row.

**Status:** [Go to Letter Matching Game](./letter-matching-game/index.md)

### Letter Hunt

Find and click specific letters hidden among other letters in a playful "search and find" format.
The screen displays a scattered arrangement of colorful letters, and a target letter is shown prominently at the top with audio pronunciation. Children tap or click each instance of the target letter they find. Visual feedback (sparkles, growing animation) rewards correct finds, while incorrect taps trigger a gentle "try again" sound.

Difficulty can scale by adjusting letter density, introducing visually similar letters as distractors (b/d, p/q), or hiding letters within simple illustrations. A timer mode for older kindergarteners adds excitement, while untimed exploration suits younger learners.

**Benefits:** Builds visual discrimination and letter recognition speed. The game-like nature maintains engagement.

**Challenges:** Touch targets must be large enough for developing fine motor skills. Visually similar letters may frustrate some learners—consider progressive difficulty.

**Reusable Patterns:** This MicroSim includes celebration animations (sparkle effects, star particles) and audio feedback (correct ding, try-again tone, win fanfare) using Web Audio API that can be reused in other MicroSims.

**Status:** [Go to Letter Hunt](./letter-hunt/index.md)

### Letter Tracing

Trace letters with finger or mouse to learn proper letter formation and stroke order.
A large letter appears on screen with numbered starting points and directional arrows showing the correct stroke sequence. As children trace along the path, the line follows their movement with a colorful trail. Successful completion triggers celebratory audio and animation.

The simulation can offer both uppercase and lowercase versions, with speech synthesis pronouncing the letter upon completion. A "ghost" letter underneath provides guidance, fading as mastery develops. Consider including lined paper backgrounds to teach proper letter positioning.

**Benefits:** Develops fine motor control and muscle memory for handwriting. Reinforces letter recognition through kinesthetic learning.

**Challenges:** Mouse tracing differs significantly from pencil grip—touchscreen devices provide more natural interaction. Accuracy tolerance must be generous for this age group.

**Status:** [Go to Letter Tracing](./letter-tracing/index.md)

---

## Phonemic Awareness

### First Sound Finder

Listen to a word and identify the first sound from multiple picture choices.
A word is spoken aloud (e.g., "ball"), and three or four pictures appear on screen (ball, cat, dog, sun). Children click the picture that starts with the same sound as the target word. Correct answers receive enthusiastic audio praise and visual celebration.

Words should use clear, familiar vocabulary from a kindergartener's world: animals, foods, toys, family members. Initial implementation focuses on distinct beginning sounds before introducing similar sounds that require finer discrimination.

**Benefits:** Develops critical phonemic awareness—the ability to hear and identify individual sounds in words. This skill is a strong predictor of reading success.

**Challenges:** Audio quality and clear pronunciation are essential. Children with speech delays or hearing differences may need accommodations.

**Status:** [Go to First Sound Finder](./first-sound-finder/index.md)

### Sound Counter

Count phonemes in spoken words by tapping or clicking for each sound heard.
A picture and word are presented (e.g., "cat"), and children tap a button or the screen once for each sound they hear: /c/ /a/ /t/ = 3 taps. Visual counters (stars, blocks, or dots) appear with each tap. The simulation then plays back the sounds to verify.

Start with 2-3 phoneme words and progress to 4-5 phoneme words. Continuous sounds (/m/, /s/) may be easier to isolate than stop sounds (/p/, /t/), so consider sequencing accordingly.

**Benefits:** Develops phoneme segmentation, a foundational skill for spelling and decoding.

**Challenges:** Abstract concept for young learners—connecting sounds to physical taps requires explicit instruction. Some phonemes blend together naturally, making counting difficult.

**Status:** [Go to Sound Counter](./sound-counter/index.md)

### Word Counter

Count spoken words in a sentence by tapping once per word, teaching one-to-one correspondence.
A simple sentence is spoken aloud (e.g., "The cat is big"), and children tap or click for each word they hear. Visual blocks or tokens appear representing each word. Playback shows the correspondence between taps and words.

Sentences should start with 2-3 words and progress to 5-6 words maximum. Use simple, concrete sentences with clear word boundaries. Avoid contractions initially, as "don't" sounds like one word but represents two.

**Benefits:** Builds concept of word—understanding that spoken language consists of individual words. Essential for tracking print during read-alouds.

**Challenges:** Young children often think in phrases rather than words ("ice cream" feels like one unit). Connected speech makes word boundaries less obvious.

**Status:** [Go to Word Counter](./word-counter/index.md)

### Rhyme Time

Match words that rhyme together in a fun pairing game.
Pictures of rhyming pairs are scattered on screen (cat/hat, dog/frog, cake/snake). Children drag matching rhymes together or click pairs in sequence. Correct matches stick together with a satisfying sound effect; incorrect attempts gently bounce apart.

Audio support speaks each word when tapped, helping children who may not recognize all pictures. Consider both matching formats and "odd one out" challenges where children identify the word that doesn't rhyme.

**Benefits:** Rhyme recognition is a gateway phonemic awareness skill. Children who can identify rhymes typically progress well to more complex sound manipulation.

**Challenges:** Requires vocabulary knowledge—children must know what pictures represent to compare sounds. Regional accents may affect rhyme perception.

**Status:** [Go to Rhyme Time](./rhyme-time/index.md)

---

## Letter-Sound Correspondence

### Consonant Sound Match

Click a consonant letter to hear its most common sound with an example word and picture.
All consonant letters appear in a grid. Clicking any letter plays its primary sound (e.g., clicking "B" plays /b/ followed by "like in 'ball'") while displaying a corresponding picture. Letters light up or animate when activated.

Focus on the most common sound for each consonant—avoid confusing variations initially (hard vs. soft C/G). The simulation can track which letters children explore most and least, informing instruction.

**Benefits:** Builds systematic letter-sound knowledge through self-directed exploration. Audio-visual pairing strengthens memory.

**Challenges:** Some consonants have multiple sounds (C, G, S)—must decide which to feature. Letters like X are rarely heard in initial position.

**Status:** [Go to Consonant Sound Match](./consonant-sound-match/index.md)

### Vowel Sound Explorer

Interactive vowel chart showing short and long sounds with visual and audio examples.
The five vowels are displayed prominently with two modes: short sounds and long sounds. Tapping a vowel plays its sound with example words and pictures. Visual indicators (perhaps breve and macron symbols introduced playfully) distinguish the two sound types.

Mouth position diagrams or simple animations showing lip/tongue position can reinforce proper pronunciation. Color coding (short vowels in one color family, long in another) provides additional memory support.

**Benefits:** Vowels are challenging because each letter represents multiple sounds. Explicit exploration builds awareness of this complexity.

**Challenges:** Long vowel sounds are the letter names, which can confuse the concept. Abstract concept requires concrete examples and repetition.

**Status:** [Go to Vowel Sound Explorer](./vowel-sound-explorer/index.md)

### Sound-to-Letter Match

Hear a sound and click the letter that makes it—the inverse of letter-to-sound practice.
A sound is played (e.g., /m/), and children scan the alphabet to find the matching letter. Multiple attempts are allowed with encouraging feedback. Correct matches celebrate; near-misses might receive hints like "close—listen again."

This reversal of the typical "see letter, say sound" practice strengthens bidirectional letter-sound connections. Progress from distinctive sounds to easily confused sounds (/m/ and /n/, /b/ and /d/).

**Benefits:** Strengthens sound-to-letter mapping essential for spelling and writing. Complements letter-to-sound instruction.

**Challenges:** Some sounds map to multiple letters (e.g., /k/ could be C or K). Initially focus on unambiguous mappings.

**Status:** [Go to Sound-to-Letter Match](./sound-to-letter-match/index.md)

### Letter Sound Keyboard

Virtual keyboard that plays sounds when letters are pressed—making sound exploration playful.
A colorful, oversized keyboard fills the screen. Pressing any letter plays its sound (not name). Children can freely explore or follow prompted sequences. Optional "record and playback" feature lets children hear their sound sequences repeated back.

Consider adding picture hints that appear briefly when letters are pressed. Volume and speed controls accommodate different learners. The keyboard layout can toggle between alphabetical order (easier to find letters) and QWERTY (matches real keyboards).

**Benefits:** Encourages playful exploration of letter-sound relationships. Low-pressure format reduces anxiety about "right answers."

**Challenges:** Random exploration may not build systematic knowledge—consider guided modes. Simultaneous key presses need handling.

**Status:** [Go to Letter Sound Keyboard](./letter-sound-keyboard/index.md)

---

## Blending

### CVC Word Builder

Drag letters to build consonant-vowel-consonant words with audio blending support.
Three letter slots represent the CVC pattern. Letter tiles are available for dragging. As each letter is placed, its sound is spoken. Once complete, the simulation blends the sounds together slowly, then speaks the whole word. A picture confirms the word.

Start with word families (-at, -an, -ig) where children change only the initial consonant. Progress to changing any position. Include both real words and the option to create nonsense words for pure decoding practice.

**Benefits:** Core decoding skill—understanding that words are built from blended sounds. Tactile interaction reinforces learning.

**Challenges:** Blending is cognitively demanding for young learners. May require scaffolding: hearing sounds separately, then stretched, then blended.

**Status:** [Go to CVC Word Builder](./cvc-word-builder/index.md)

### VC Word Blender

Blend vowel-consonant combinations (at, in, up) as a stepping stone to full CVC words.
Two-letter combinations are simpler entry points for blending. A vowel and consonant appear side by side; tapping "blend" slowly merges the sounds audibly while the letters visually slide together. Children practice recognizing these common word endings.

These VC patterns become the "chunks" children later recognize instantly within longer words. Mastering -at, -in, -op, etc., provides building blocks for word families.

**Benefits:** Reduces cognitive load compared to three-sound blending. Builds recognition of common word endings.

**Challenges:** VC combinations aren't always meaningful words, which may confuse children expecting everything to "mean something."

**Status:** Proposed

### Sound Slider

Slide through sounds to blend them into words using a visual slider control.
Individual sounds appear as separate bubbles or blocks. A slider below moves from left to right; as it passes each sound, that sound is pronounced. Slow slider movement stretches the sounds; fast movement blends them naturally. Children control the pace.

The kinesthetic slider action makes the abstract concept of blending more concrete. Children can move slowly when learning, then speed up as fluency develops.

**Benefits:** Gives children control over blending pace. Visual-kinesthetic approach supports different learning styles.

**Challenges:** Slider precision may be difficult for young children. Consider large, forgiving touch targets.

**Status:** Proposed

### Word Machine

Input sounds and watch them combine into a word in a fun factory-themed animation.
Children select or hear individual sounds, then press a "combine" button. An animated machine (gears turning, steam puffing) processes the sounds and outputs the blended word with a picture. Playful mechanical sound effects make the process engaging.

The machine metaphor helps children understand that sounds go "in" separately and come "out" as a word—making the abstract process of blending concrete and memorable.

**Benefits:** Highly engaging visual metaphor for blending. Gamification motivates repeated practice.

**Challenges:** Animation timing must match actual sound blending to reinforce the connection. Complex animations may distract from the learning goal.

**Status:** Proposed

---

## Sight Words

### Sight Word Flashcards

Interactive flashcards for high-frequency sight words with audio pronunciation.
Cards display one sight word at a time with options to hear the word spoken and see it used in a simple sentence with accompanying illustration. Progress tracking shows which words are mastered versus need more practice. Shuffle and review modes available.

The Dolch or Fry high-frequency word lists provide research-based word selection. Consider including the 18 words specified in kindergarten standards. Spaced repetition can optimize review scheduling.

**Benefits:** Direct instruction on words that cannot be easily decoded. Flashcard format is familiar and focused.

**Challenges:** Rote memorization can become tedious. Interactivity and encouragement help maintain engagement.

**Status:** [Go to Sight Word Flashcards](./sight-word-flashcards/index.md)

### Sight Word Memory

Match pairs of sight word cards in a classic memory game format.
Cards are placed face-down in a grid. Flipping a card reveals a sight word (spoken aloud). Children find matching pairs. Matched pairs disappear with celebration; mismatches flip back face-down. Fewer cards make easier games for beginners.

Consider variations: match word-to-word, word-to-picture, or word-to-sentence. Adjustable grid sizes accommodate different skill levels and attention spans.

**Benefits:** Familiar game format feels playful rather than instructional. Repeated exposure builds automatic recognition.

**Challenges:** Memory games can frustrate children with attention or working memory challenges. Consider accessible modes with fewer cards.

**Status:** [Go to Sight Word Memory](./sight-word-memory/index.md)

### Sight Word Bingo

Listen and find sight words on a bingo card—combining listening and visual recognition.
A bingo card displays sight words in a grid. The caller (automated voice) reads a word; children find and mark it on their card. Getting a row, column, or diagonal wins with celebration. New cards generate randomly for replay value.

Multiple difficulty levels control card size (3x3 up to 5x5) and word complexity. Consider multiplayer potential for classroom use, or parent-child play at home.

**Benefits:** Game format provides motivated repetition. Listening and visual matching strengthen recognition from multiple angles.

**Challenges:** Bingo requires sustained attention through multiple rounds. Auto-pacing must match young children's processing speed.

**Status:** Proposed

---

## Multi-Skill Games

### Letter Motion Maker

Associate arm gestures and body motions with letter shapes, supporting kinesthetic learning.
Each letter is paired with a movement (making an "A" shape with arms, hopping for "H"). The simulation demonstrates the motion via animation or video, then prompts children to mimic. Optional camera integration could track movements, though this adds complexity.

Physical movement supports memory encoding and keeps wiggly kindergarteners engaged. Motions that relate to letter shape or sound provide additional memory hooks.

**Benefits:** Addresses kinesthetic learners and supports the "Create" learning objective through physical expression. Movement breaks maintain attention.

**Challenges:** Requires physical space and movement capability. Camera-based tracking is technically complex and raises privacy considerations. Simpler implementation shows motions without verification.

**Status:** Proposed

### Nonsense Word Generator

Build and sound out made-up CVC words to practice pure decoding without context clues.
Children construct random CVC combinations that may or may not be real words. The simulation helps sound out each nonsense word. This removes picture cues and context, ensuring children are actually decoding rather than guessing.

Nonsense words (pseudowords) are used in reading assessments because they require pure decoding. Frame the activity playfully: "silly words," "alien language," or "secret code."

**Benefits:** Ensures decoding rather than word guessing or memorization. Useful assessment of true phonics application.

**Challenges:** Can feel abstract or unmotivating without playful framing. Some children find nonsense words confusing or frustrating.

**Status:** Proposed

### Reading Progress Path

Visual journey through all skills with mini-challenges, providing overview and motivation.
A map or path shows the learning journey with stations for each skill area. Children progress by completing mini-challenges at each station. Visual progress (filling in the path, collecting stars) motivates continued practice. Stations link to other MicroSims in the collection.

This serves as a hub connecting all other simulations, providing structure and visible progress. Consider both linear paths (for guided progression) and open maps (for self-directed exploration).

**Benefits:** Creates visible progress and achievement. Provides structure across the MicroSim collection. Motivates completion.

**Challenges:** Requires most other MicroSims to be complete first. Progress tracking and state management add technical complexity.

**Status:** Proposed

---

## General Implementation Considerations

### Benefits Across All MicroSims

1. **Self-paced learning** - Children can repeat activities as needed without embarrassment
2. **Immediate feedback** - Instant audio-visual responses reinforce correct answers
3. **Engagement** - Interactive format appeals to digital-native learners
4. **Accessibility** - Audio support helps pre-readers access content
5. **Assessment data** - Progress tracking informs instruction (if implemented)

### Challenges Across All MicroSims

1. **Motor skills** - Touch targets must accommodate developing fine motor control; consider 44px minimum tap targets
2. **Attention span** - Activities should offer natural completion points within 2-5 minutes
3. **Audio dependency** - Speech synthesis quality varies across browsers; clear audio is essential
4. **Reading level** - Instructions must be audio-supported since users are pre-readers
5. **Frustration tolerance** - Generous error handling and encouragement prevent discouragement
6. **Device diversity** - Testing across tablets, phones, and computers is essential; touch vs. mouse differences matter

