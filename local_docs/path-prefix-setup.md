# Path Prefix Setup for Deployment

## Overview
This project is configured to work seamlessly in three scenarios:
1. **Local development** - paths work with `/`
2. **GitHub Pages (without custom domain)** - paths work with `/dobri-praktiki/`
3. **Custom domain** - paths work with `/`

## How It Works

### Eleventy Configuration (`.eleventy.js`)
The pathPrefix is automatically determined:
```javascript
const explicitPrefix = process.env.PATH_PREFIX || process.env.ELEVENTY_PATH_PREFIX;
const repoPrefix = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
  : "/";
const pathPrefix = explicitPrefix || repoPrefix || "/";
```

**Priority:**
1. `PATH_PREFIX` or `ELEVENTY_PATH_PREFIX` environment variable (if set)
2. GitHub repository name (auto-detected in GitHub Actions)
3. Default to `/`

### Template Usage
All asset and internal links use the `| url` filter:

**Assets:**
```njk
<link rel="stylesheet" href="{{ '/assets/css/styles.css' | url }}">
<img src="{{ '/assets/images/logo.png' | url }}" alt="Logo">
<script src="{{ '/assets/js/app.js' | url }}"></script>
```

**Internal Links:**
```njk
<a href="{{ '/' | url }}">Home</a>
<a href="{{ '/uslugi.html' | url }}">Services</a>
<a href="{{ '/kontakt.html' | url }}">Contact</a>
```

**Dynamic Paths (from data):**
```njk
<img src="{{ ('/' ~ service.image) | url }}" alt="Service">
```

## Files Updated
All files have been updated to use the `| url` filter:
- ✅ `src/_layouts/base.njk` - All CSS, JS, images, and navigation links
- ✅ `src/_layouts/service.njk` - Breadcrumb links and service images
- ✅ `src/index.njk` - Hero and about images
- ✅ `src/kontakt.njk` - Viber icon
- ✅ `src/thanks.njk` - Back to home link

## Deployment Scenarios

### Local Development
```bash
npm start
```
- pathPrefix = `/`
- Site works at `http://localhost:8080/`

### GitHub Pages (Project Site)
When deployed to GitHub Pages without a custom domain:
- pathPrefix = `/dobri-praktiki/` (auto-detected from repo name)
- Site works at `https://username.github.io/dobri-praktiki/`

### Custom Domain
When you add a custom domain (via CNAME file):
- Set `PATH_PREFIX="/"` in GitHub Actions environment
- Site works at `https://yourdomain.com/`

## GitHub Actions Setup
In your `.github/workflows/deploy.yml`, you can optionally set:
```yaml
env:
  PATH_PREFIX: "/"  # For custom domain
  # OR
  PATH_PREFIX: "/dobri-praktiki/"  # For GitHub Pages
  # OR omit it to auto-detect from repo name
```

## Verification
After deployment, check:
1. ✅ Favicon loads correctly
2. ✅ All CSS and JS files load without 404s
3. ✅ All images display properly
4. ✅ Navigation links work correctly
5. ✅ Service pages load with correct images

## Notes
- External links (viber://, mailto:, https://) don't need the `| url` filter
- The `| url` filter automatically prepends the pathPrefix when needed
- This setup matches the vegatest-darker project configuration

