# thvu.dev

Personal site for Thang Vu: a single page with an animated ASCII water background, links (email, GitHub, LinkedIn, X), and a custom 404. Production is [thvu.dev](https://thvu.dev).

## Run

Requires Node.js 20.9 or newer and pnpm 10.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm lint
pnpm build
pnpm start
```

## Deploy

The site is hosted on [Vercel](https://vercel.com). Connect this repository (default branch `master`) in the Vercel dashboard, or deploy from the CLI with `vercel`. Vercel Analytics is included via `@vercel/analytics`.
