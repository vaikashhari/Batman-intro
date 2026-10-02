# Batman — Batcomputer Experience

An unofficial, non-commercial Batman fan project: a cinematic React/Vite microsite styled as an interactive Wayne Tactical OS. This is a fan-made portfolio experiment and is **not affiliated with, endorsed by, or an official product of DC or Warner Bros.** Batman and related characters/marks belong to their respective rights holders.

## Experience

- Cinematic hero with cursor/touch-driven identity reveal
- Scroll-reactive motion and layered Gotham atmosphere
- Batcomputer command terminal (Ctrl/Cmd + K)
- Selectable Gotham surveillance nodes and intel dossiers
- Batcave equipment diagnostics and rogue case files
- Knightfall identity protocol and Bat-Signal finale
- Responsive layout, keyboard-operable controls, visible focus states, and reduced-motion styling

## Terminal commands

```text
HELP
SCAN GOTHAM
OPEN ARKHAM
OPEN WAYNE TOWER
LOCATE JOKER
LOCATE RIDDLER
BATCAVE
ACTIVATE SIGNAL
BATMAN
```

## Run locally

Requires a current Node.js LTS release.

```bash
npm install
npm run dev
```

## Production build

```bash
npm run lint
npm run build
npm run preview
```

Vite outputs the production site to `dist/`, suitable for static hosting such as Cloudflare Pages.

## Implementation notes

- **React** manages the interactive interface and state.
- **Framer Motion** drives scroll-linked and reveal animations.
- **Canvas 2D** composites the hero imagery and pointer-reveal mask.
- Gotham incident, drone, grid, equipment power, and related telemetry values are **simulated for atmosphere**; they are not connected to real sensors, police systems, or live Gotham data.
- The sound control plays a brief synthesized interface tone when enabled; it is not a continuous soundtrack.

## Accessibility and performance checklist

Before release, test the experience with keyboard-only navigation, screen-reader landmarks, reduced-motion enabled, touch input, and narrow mobile viewports. Verify that every modal receives focus, traps focus while open, closes with Escape, and restores focus to its trigger. Profile the hero canvas on a mid-range mobile device and confirm that animation work pauses when the hero is off-screen or idle.

## Demo and screenshots

Live demo: https://batman-intro.pages.dev/

Add current screenshots here when available, for example:

- `docs/screenshots/hero.png`
- `docs/screenshots/gotham-grid.png`
- `docs/screenshots/batcomputer-terminal.png`

## Credits

A fan-made learning and portfolio project. Use only assets you have permission to publish, and replace/remove any unlicensed imagery before commercial use.
