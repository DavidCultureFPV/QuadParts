# Alternate Deployment Methods for QuadParts v3.2

This guide provides alternate ways to deploy your QuadParts (Vite + React) application beyond traditional server hosting. Choose the method that best fits your needs.

---

## 1. Deploy to Vercel

[Vercel](https://vercel.com/) offers seamless deployment for Vite/React projects.

### Steps:
1. **Push your code to GitHub, GitLab, or Bitbucket.**
2. **Sign up or log in to [Vercel](https://vercel.com/).**
3. **Import your repository:**
   - Click "New Project" and select your repo.
   - Vercel auto-detects Vite. Use default settings or set `Build Command` to `vite build` and `Output Directory` to `dist`.
4. **Deploy!**
   - Vercel will build and host your site. You get a live URL instantly.

---

## 2. Deploy to Netlify

[Netlify](https://netlify.com/) is another popular static site host.

### Steps:
1. **Push your code to GitHub, GitLab, or Bitbucket.**
2. **Sign up or log in to [Netlify](https://netlify.com/).**
3. **New site from Git:**
   - Connect your repo.
   - Set `Build Command` to `vite build` and `Publish directory` to `dist`.
4. **Deploy site.**
   - Netlify will build and host your app with a public URL.

---

## 3. Deploy to GitHub Pages

You can deploy the static build to GitHub Pages using the [vite-plugin-gh-pages](https://www.npmjs.com/package/vite-plugin-gh-pages) or manually.

### Steps (Manual):
1. **Build your app:**
   ```bash
   npm run build
   ```
2. **Copy the contents of the `dist` folder to a `gh-pages` branch.**
3. **Push the `gh-pages` branch to GitHub.**
4. **In your repo settings, set GitHub Pages to use the `gh-pages` branch.**

Or use a plugin for automation.

---

## 4. Deploy to Any Static Host (e.g., S3, Firebase Hosting, Surge)

### Steps:
1. **Build your app:**
   ```bash
   npm run build
   ```
2. **Upload the contents of the `dist` folder to your static host.**
   - For AWS S3: Use the AWS Console or CLI.
   - For Firebase Hosting: Use `firebase deploy` after initializing.
   - For Surge: Run `npx surge dist/`.

---

## Notes
- Make sure to set the correct base path if deploying to a subdirectory (see Vite docs: [Base Public Path](https://vitejs.dev/guide/build.html#public-base-path)).
- For SPA routing, enable redirect rules (e.g., `_redirects` file for Netlify, or custom rules for S3).

---

For more details, see the official Vite and React deployment docs. 