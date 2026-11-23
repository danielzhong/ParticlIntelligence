# Particle Intelligence

The public website for the Particle Intelligence research and entrepreneurial
initiative, built with Astro and deployed to
[partintell.com](https://partintell.com/). The site presents the team, research
directions, Phora, and microfluidic design work in English and Chinese.

## Requirements

- Node.js 24 (Node.js 22.12 or newer is supported)
- npm

## Local development

```bash
git clone https://github.com/danielzhong/ParticlIntelligence.git
cd ParticlIntelligence
npm ci
npm run dev
```

Astro prints the local URL in the terminal, usually `http://localhost:4321`.

## Project commands

| Command           | Purpose                                       |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the local development server            |
| `npm run check`   | Check Astro and TypeScript files              |
| `npm run build`   | Generate the static website in `dist/`        |
| `npm run preview` | Preview the production build locally          |
| `npm run format`  | Format source files and project configuration |

## Project layout

- `src/pages/` contains the website pages.
- `src/layouts/` contains shared layouts and navigation.
- `src/config/` contains site details, navigation, and theme settings.
- `src/styles/` contains the site styles.
- `public/media/` contains published image assets.

## Deployment

Pushing to `main` starts the GitHub Pages workflow in
`.github/workflows/deploy.yml`. The workflow checks and builds the site with
`https://partintell.com` as its canonical domain. Pull requests can be built
locally with `npm run check && npm run build`.

Contact links open a draft in the visitor’s email application. The website does
not accept or store contact form submissions.

## Acknowledgements

Some layout components are adapted from the Automark Astro theme by Themefisher.
The original theme license and attribution are included in
[`LICENSE-THEMEFISHER`](LICENSE-THEMEFISHER).

## Visual assets

The application scenes in `src/assets/applications/` are AI-generated editorial
illustrations, not photographs of company equipment or experimental results.
Astro generates responsive WebP versions at build time. On-page captions and the
applications note explain this distinction.

The experimental comparison videos and extracted posters have been removed
from the public assets pending verification of their sources and reuse rights.
Do not restore them without recording the source publication/DOI, relevant
material identifiers, rights holder or applicable licence, and required credit.
Previously published academic work must not be presented as research conducted
by this initiative. No specific publication or licence has been verified here.

The particle artwork and microfluidic chip schematic are implemented in site
components. They are illustrations, not experimental evidence. The animation
respects reduced-motion preferences and pauses when off screen.
