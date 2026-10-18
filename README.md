# Vinura Pathum Sandeepa — Portfolio

A responsive personal portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Motion for React, and Lucide React.

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

The Android download uses the existing `public/downloads/GemoraAI.apk`. Its roughly 74.5 MiB size increases repository and deployment transfers. If a Git host or deployment service has size constraints, hosting the APK in GitHub Releases and configuring a verified download URL is an option.
