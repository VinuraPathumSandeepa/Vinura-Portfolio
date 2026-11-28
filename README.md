# Vinura Pathum Sandeepa — Portfolio

A responsive personal portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Motion for React, and Lucide React.

Live website: [vinura-portfolio-lyart.vercel.app](https://vinura-portfolio-lyart.vercel.app/)

## Run locally

```bash
npm install
npm run dev
```

Checks:

```bash
npm run build
npm run lint
```

## Content and links

- **Portrait:** The hero uses `public/images/profile.jpg`. If it cannot load, `src/components/HeroPortrait.tsx` displays the original illustration.
- **Project destinations:** Set each `repositoryUrl` or `demoUrl` in `src/data/portfolio.ts` to a verified URL. GemoraAI's deployed website, APK path, and case-study link are configured there. Unset project links are hidden.
- **Social profiles:** Set the `url` for GitHub, LinkedIn, and Portfolio in `src/data/portfolio.ts`. Unset links are hidden.
- **Résumé:** The download points to `public/resume.pdf` through `resumeUrl` in `src/data/portfolio.ts`.
- **Content:** Project descriptions, skills, and social links are centralized in `src/data/portfolio.ts`; the main page copy is in `src/App.tsx`.

## GemoraAI case study

The case study is available at `/?case-study=gemora-ai`. Its query-based URL works on a static Vite deployment after refresh without a server rewrite. The Back to Projects link returns to `/#projects`.

The 11 genuine screenshots are stored in `public/images/projects/gemora/` and configured in `src/data/portfolio.ts`. The gallery groups them into Buyer Web Experience (`homepage.png`, `web-buyer-dashboard.png`, `web-buyer-featured-gems.png`, `web-buyer-marketplace.png`), Seller Web Experience (`seller-dashboard.png`, `seller-my-listings.png`), Gemologist Verification & AI Analysis (`gemologist-verification.png`, `ai-analysis.png`), and Flutter Mobile Application (`mobile-marketplace.png`, `mobile-guest-home.png`, `mobile-splash.png`). Missing files are omitted without showing broken images. Other projects retain their illustrative concept visuals.

The Android download uses the verified GitHub Release asset URL configured in `src/data/portfolio.ts`. The original local APK remains ignored by Git.

## Search visibility

`public/robots.txt` allows crawling and points to `public/sitemap.xml`. The sitemap lists the homepage and both directly accessible case studies. Vite serves the same initial HTML for all three URLs; React renders route-specific content and sets each page's canonical URL after loading. The homepage includes Person, ProfilePage, and WebSite structured data. Search indexing depends on Google's crawl and render decisions and must be checked in Search Console.

To verify ownership, create a **URL-prefix** property for `https://vinura-portfolio-lyart.vercel.app/` in Google Search Console. When Google supplies an HTML verification file, place that exact file in `public/`, deploy it, confirm it loads at the site root, then click Verify. Alternatively, add Google's exact verification meta tag to `index.html`, deploy, and verify. Keep the file or tag in place. Do not add a placeholder verification token.

After verification, submit `https://vinura-portfolio-lyart.vercel.app/sitemap.xml` in Search Console's Sitemaps section. Use URL Inspection to test the homepage and both case-study URLs, inspect their rendered HTML and selected canonicals, and request indexing if appropriate.
