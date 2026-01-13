# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MkDocs Material intelligent textbook for teaching reading skills to kindergarten students. The site uses a learning graph with 195 concepts across 11 taxonomy categories to structure the curriculum progression.

## Common Commands

```bash
# Serve locally with live reload (default port 8000)
mkdocs serve

# Build the static site
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

Local development URL: `http://127.0.0.1:8000/reading-for-kindergarten/`

## Learning Graph Tools

Convert CSV learning graph to vis-network JSON format:
```bash
python docs/learning-graph/csv-to-json.py learning-graph.csv learning-graph.json [color-config.json] [metadata.json]
```

Analyze graph metrics:
```bash
python docs/learning-graph/analyze-graph.py
```

## Architecture

### Content Structure
- `docs/chapters/` - 11 chapters (01 through 11), each with an `index.md`
- `docs/sims/` - MicroSims (interactive simulations) with `main.html` files
- `docs/learning-graph/` - Learning graph data (CSV, JSON) and analysis tools

### MicroSims Pattern
Each MicroSim lives in `docs/sims/<name>/` with:
- `index.md` - Documentation page with iframe embedding
- `main.html` - Standalone HTML file with the simulation
- `metadata.json` - Dublin Core metadata

### Learning Graph
- Source data: `docs/learning-graph/learning-graph.csv` (ConceptID, ConceptLabel, Dependencies, TaxonomyID)
- Visualization format: `docs/learning-graph/learning-graph.json` (vis-network.js format)
- Color configuration: `docs/learning-graph/color-config.json`

### Custom Plugin
- `plugins/social_override.py` - Custom social media card images per page

## Key Configuration Files

- `mkdocs.yml` - Site configuration, navigation, theme settings
- `docs/css/extra.css` - Custom brand styling

## MicroSim Styling

- Primary background color: `aliceblue`
- Alternative background color: `cornsilk`

## Speech Synthesis for Phonemes

When using the Web Speech API (`speechSynthesis`) for letter sounds in MicroSims:

- TTS reads literal letters like 'fff' or 'sss' as spelled-out letter names ("eff eff eff")
- Use pronounceable syllables instead: `soundText` for TTS, `soundDisplay` for screen (e.g., `/s/`)
- Recommended phoneme mappings for Chrome on Mac:
  - Stop consonants: 'buh', 'duh', 'guh', 'kah', 'puh', 'tuh'
  - Fricatives: 'fuh', 'sah', 'vuh', 'zuh', 'huh'
  - Nasals/liquids: 'muh', 'nuh', 'luh', 'ruh'
  - Other: 'juh', 'wuh', 'yuh', 'kwuh' (Q), 'eks' (X)
- Prefer the "Samantha" voice on Mac for clearer phonics
- Use slower speech rate (0.5) for phoneme sounds
- Preload voices in setup() since Chrome loads them asynchronously
