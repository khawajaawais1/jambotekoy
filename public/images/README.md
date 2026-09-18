# Images & videos

The site references these exact filenames — replace a file (keep the name) and everything updates, no code changes needed.

| Filename | What it shows | Used on |
|---|---|---|
| `hero-car.jpg` | White Mercedes-Benz, front-on in the bay, headlights on | Homepage hero (right card) |
| `exterior-wide.jpg` | Blue Porsche outside the Jambotek Oy building (wide) | About page hero |
| `owner.jpg` | Joseph at the desk wearing the Jambotek cap & tee | About page portrait |
| `bay-01.jpg` | Wide interior of the workshop with a car on the lift | Gallery — large tile |
| `bay-tyres.jpg` | Joseph mounting a wheel on the tyre machine | Gallery |
| `bay-align.jpg` | Joseph at the HPA alignment monitor | Gallery |
| `bay-exterior.jpg` | Building entrance with the JAMBOTEK OY signage | Gallery, Contact hero |
| `hero-side.jpg` | Car side profile | Gallery — Bay 04 tile |
| `svc-diagnostics.jpg` / `svc-diagnostics-dash.jpg` | Diagnostics / ECU work | Services showcase, Systems reveal |
| `svc-tyres.jpg` | Wheel/tyre being mounted | Services showcase, Systems reveal |
| `svc-service.jpg` | General servicing | Services showcase |
| `svc-inspection.jpg` / `svc-inspection-2.jpg` | Inspection photos | Systems reveal, Services showcase |
| `*-poster.webp` | First frame of each video (shown while it loads) | Video posters |

## Videos (`public/videos/`)

| File | Used on |
|---|---|
| `reveal-bmw.mp4` | Systems reveal — finale |
| `full-service-loop.mp4` | Systems reveal — "Full service" stage |
| `alignment-rig.mp4` | "Live at the shop" — wheel alignment card |
| `tyre-balance.mp4` | "Live at the shop" — tyre balancing card |

## Keep the site fast

Full-size camera photos and raw AI exports are what make pages slow. Before adding media:

- **Photos**: resize to ~2000px on the long edge, JPG quality ~78 (≈200–350 KB). Phone originals are 5–20 MB.
- **Videos**: 720p H.264, no audio, ≤ ~1.5 MB, `+faststart`. A 7-second clip should not exceed ~1 MB.
- **Posters**: WebP, ~50–80 KB.
- Keep raw/original files **outside** `public/` (this project uses the git-ignored `source-assets/` folder) — anything in `public/` is deployed to Vercel.
