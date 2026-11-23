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

The three `phora-simulation-*.mp4` clips show only the model panel from the
previous side-by-side videos. The project owner confirmed that this panel uses
self-generated initial conditions and synthetic data, and that the previous
experimental-frame initialization description was incorrect. The experimental
panel and embedded comparison headings have been excluded. On-page captions
identify these as illustrative simulations, not experimental validation or
product performance evaluations. Playback is visitor-controlled.

Simulation identifiers follow the material-pair labels embedded in the original
source clips: 01 = PDMS–PDMS, 02 = UV glue–UV glue, 03 = PDMS–UV glue.
The website describes these material pairings only; numerical inlet/outlet,
wall-interaction parameters, and boundary orientation have not been supplied.

The original comparison videos and extracted comparison posters remain excluded
from public assets. Before publishing any experimental footage, verify the
source publication/DOI, material identifiers, reuse rights, and required credit.
Previously published academic work must not be presented as research conducted
by this initiative. No specific publication or licence has been verified here.

The particle artwork and microfluidic chip schematic are implemented in site
components. They are illustrations, not experimental evidence. The animation
respects reduced-motion preferences and pauses when off screen.

Published theme and font notices are included in `public/licenses/third-party-notices.txt`
and linked from the footer. See [the asset register](docs/asset-register.md) for
available provenance and the limits of the review.
