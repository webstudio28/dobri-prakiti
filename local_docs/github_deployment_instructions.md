## GitHub Pages Deployment Workflow

- **Stack Overview**  
  - Eleventy builds the site into `_site/`.  
  - Tailwind CSS is prebuilt via `npm run css:build`.  
  - GitHub Actions publishes `_site/` to GitHub Pages.

- **One-Time Repo Setup**  
  - Ensure `package-lock.json` is committed (remove it from `.gitignore` if needed).  
  - Add `.eleventy.js` with `pathPrefix` support driven by `PATH_PREFIX` or repo name.  
  - Confirm assets are referenced with `{{ '/path' | url }}` so Eleventy respects the prefix.

- **Workflow Configuration (`.github/workflows/deploy.yml`)**  
  - Use `actions/setup-node@v4` with `cache: 'npm'`.  
  - Run `npm ci`, `npm run css:build`, then `npm run build`.  
  - Upload `_site/` via `actions/upload-pages-artifact@v3`.  
  - Deploy with `actions/deploy-pages@v4`.

- **PATH_PREFIX Rules**  
  - Project Pages (GitHub-hosted at `/REPO_NAME/`): set `PATH_PREFIX` to `"/<repo-name>"`.  
  - Custom domain (rooted at `/`): set `PATH_PREFIX="/"` or unset it.  
  - Add the env var under the `build` job in the workflow (e.g. `env: PATH_PREFIX: "/biovel"`).

- **Local Dev vs Production**  
  - Local dev (`npm run dev`) works with `PATH_PREFIX` defaulting to `/`.  
  - Production build respects `PATH_PREFIX`, so check generated HTML for prefixed asset links.

- **Content Checklist Before Deploy**  
  - Verify `npm run css:build` completes without errors.  
  - Run `npm run build` locally when possible to catch template issues.  
  - Confirm `_site/assets/...` contains compiled CSS/JS/images.

- **Troubleshooting**  
  - 404s on Pages usually mean `PATH_PREFIX` is missing or links still use hard-coded `/`.  
  - If the workflow logs “Dependencies lock file is not found”, commit `package-lock.json`.  
  - Ensure Eleventy export in `.eleventy.js` is single and returns `pathPrefix`.

