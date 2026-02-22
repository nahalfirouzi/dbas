# DBAS Website

A static website built with [Next.js](https://nextjs.org) and hosted on [GitHub Pages](https://pages.github.com).

## What's in this repo

```
dbas/
├── app/
│   ├── page.tsx       # The main page — this is where you'll do most of your work
│   ├── layout.tsx     # Wraps every page (fonts, metadata, etc.)
│   └── globals.css    # Global styles
├── public/            # Static files (images, icons, etc.)
├── .github/
│   └── workflows/
│       └── nextjs.yml # Automatically builds & deploys the site when you push to main
├── next.config.ts     # Next.js settings (output mode, base path for GitHub Pages)
└── package.json       # Project dependencies and scripts
```

## How it works

This is a **static site** — meaning Next.js compiles everything into plain HTML/CSS/JS files (in an `out/` folder) and those files get served directly by GitHub Pages. There's no server running.

Every time you push to the `main` branch, a GitHub Actions workflow automatically:

1. Installs dependencies
2. Builds the site (`next build` outputs to `./out`)
3. Deploys the `out/` folder to GitHub Pages

You don't need to do anything manually to deploy — just push your code.

## Prerequisites

- [Node.js](https://nodejs.org) v20 or later
- npm (comes with Node.js)

## Local development setup

Clone the repo and install dependencies:

```bash
git clone https://github.com/<your-org>/dbas.git
cd dbas
npm install
```

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000/dbas](http://localhost:3000/dbas) in your browser. The page reloads automatically as you save changes.

## Making changes

The main page lives in `app/page.tsx`. Edit that file and you'll see changes instantly in the browser.

Images and other static assets go in the `public/` folder. When referencing them in code, prefix the path with `/dbas/` (e.g. `src="/dbas/my-image.png"`). This is required because the site is served from a subdirectory on GitHub Pages.

## Building for production

To test the production build locally:

```bash
npm run build
```

This creates an `out/` folder with the static files. You can inspect it, but you don't need to commit it — the deployment workflow handles building on GitHub's servers.

## Deploying

Push to `main`. That's it. GitHub Actions handles the rest.

You can watch the deployment progress in the **Actions** tab of the GitHub repository.

## Migrating to a custom domain

Right now the site lives at `https://nahalfirouzi.github.io/dbas/` — the `/dbas` part is a subdirectory, which is why every image path and the `basePath` setting exist. When you move to a real domain (e.g. `www.example.com`), the site will live at the root `/` and all of that goes away.

Here's everything you need to change:

### 1. `next.config.ts` — remove `basePath`

Before:

```ts
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/dbas",
  images: { unoptimized: true },
};
```

After:

```ts
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};
```

### 2. Asset paths in your code — remove the `/dbas/` prefix

Search the codebase for `/dbas/` in any `src=`, `href=`, or `url()` references and strip the prefix.

```bash
# Find all occurrences to fix
grep -r '"/dbas/' app/
```

For example, in `app/page.tsx`:

Before: `src="/dbas/next.svg"`
After: `src="/next.svg"`

### 3. Local dev URL

After removing `basePath`, the local dev server will be at `http://localhost:3000` (no `/dbas` suffix).

### 4. GitHub Pages — point it to your domain

In your GitHub repo go to **Settings → Pages** and enter your custom domain in the "Custom domain" field. GitHub will create a `CNAME` file automatically. Then update your domain registrar's DNS to point to GitHub Pages (GitHub's docs walk through this).

### 5. Update the README

Once live on the custom domain, update the local dev URL in the [Local development setup](#local-development-setup) section above and remove the note about the `/dbas/` path prefix in [Making changes](#making-changes).

---

## Useful commands

| Command         | What it does                            |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start local dev server with live reload |
| `npm run build` | Build static files into `out/`          |
| `npm run lint`  | Check code for style issues             |
