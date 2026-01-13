# Consonant Sound Match - Speech Synthesis Fix

**Date:** 2026-01-13

## Problem

The consonant-sound-match MicroSim was using literal letter strings for speech synthesis (e.g., 'fff', 'sss', 'mmm'). Chrome's TTS was reading these as spelled-out letter names ("eff eff eff" instead of the /f/ sound).

## Solution

Updated the speech synthesis approach in `docs/sims/consonant-sound-match/consonant-sound-match.js`:

### 1. Split sound data into two fields
- `soundText`: What TTS speaks (pronounceable syllables)
- `soundDisplay`: What's shown on screen (phoneme notation like `/f/`, `/s/`)

### 2. Fixed phoneme representations

| Letter | Before | After | Reason |
|--------|--------|-------|--------|
| F | 'fff' | 'fuh' | TTS-pronounceable syllable |
| K | 'kuh' | 'kah' | Clearer hard K sound |
| L | 'lll' | 'luh' | TTS-pronounceable syllable |
| M | 'mmm' | 'muh' | TTS-pronounceable syllable |
| N | 'nnn' | 'nuh' | TTS-pronounceable syllable |
| R | 'rrr' | 'ruh' | TTS-pronounceable syllable |
| S | 'sss' | 'sah' | Prevents spelling out as "ess ess ess" |
| V | 'vvv' | 'vuh' | TTS-pronounceable syllable |
| X | 'ks' | 'eks' | Matches ending sound in "fox" |
| Z | 'zzz' | 'zuh' | TTS-pronounceable syllable |

### 3. Improved voice selection
- Added preference for "Samantha" voice on Mac Chrome
- Falls back to local English voices

### 4. Adjusted speech parameters
- Slowed phoneme speech rate from 0.7 to 0.5 for clarity
- Added voice preloading in setup() (Chrome loads voices async)

## Files Modified

- `docs/sims/consonant-sound-match/consonant-sound-match.js`

## Testing

Tested on Chrome on Mac. The phoneme sounds are now pronounced as syllables rather than spelled-out letters.
