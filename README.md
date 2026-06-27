This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Project Conventions

## File System Structure

- `globals.css` (located in `app/`) defines the site-wide base styling (e.g., font resets, global text format, body background, and any global color variables).
- `layout.tsx` imports `globals.css` to be automatically applied down to every page and component without needing to be re-imported anywhere else. 
-  `*.module.css` dedicated to each component folder defines component-specific styling that is only applied to the specific component (e.g. `nav-bar.module.css`, `hero.module.css`).

## Referencing Styles: CSS Modules vs. Global Classes

There are two different ways classes get applied in this project, and they're not interchangeable:

- **CSS Modules** (`*.module.css`): used for component-specific styles. Import the file as an object (`import styles from "./hero.module.css"`) and reference classes via `className={styles.hero_heading}`.
- **Global CSS** (`globals.css`): used for site-wide styles. Since these classes aren't scoped or imported as objects, they're referenced directly as plain strings: `className="page_wrapper"`.

Rule of thumb: if a style is specific to one component, use a CSS Module (`styles.x`). If it's meant to apply broadly across the whole site, define it in `globals.css` and reference it as a plain string.

## Using MaxWidth for Layout Boundaries

`MaxWidth` is a wrapper component used to keep page content from stretching edge-to-edge on large screens, while still letting backgrounds span the full width when needed. The pattern is: a full-width `<section>` provides the background/color, `MaxWidth` sits inside it to constrain and center the actual content to a maximum width, and the real content goes inside that:


<section>          → full-width background
  <MaxWidth>        → centers + constrains width
    {contents}      → actual page content
  </MaxWidth>
</section>

This keeps every section visually consistent (same max-width, same horizontal padding) without repeating those values in every component.