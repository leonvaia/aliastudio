# ALia Studio

Static website for [aliastudio.it](https://aliastudio.it), written in vanilla HTML with SCSS and a small JavaScript file for the mobile menu.

All editable website files are in `public/`. Each route has its own ordinary `index.html`; there is no template engine or site generator.

## Local development

```sh
pnpm install
pnpm run build
python3 -m http.server 8080 --directory public
```

During SCSS work, `pnpm run dev` watches the stylesheet and recompiles it after every change. Run the local HTTP server in a second terminal.

## Production build

```sh
pnpm run build
pnpm run check
```

The deployable site is the `public/` directory. The build command only compiles SCSS into `public/assets/css/styles.css`; it does not generate or modify the HTML.

## Cloudflare

- Framework preset: `None`
- Build command: leave blank (or use `exit 0`)
- Build output directory: `public`

The compiled CSS is committed with the HTML, so Cloudflare does not need Node, pnpm or a build step. Run `pnpm run build` locally after changing the SCSS, then commit the updated CSS.

The contact page has no form or embedded map. It uses ordinary phone, email and external map links.
