# Feelings Jars

A little jar for the little moments — a private, shared space for Shivali
and Vrushab to log happy and hurtful moments as colored balls in jars, plus
an apology-fund piggy bank.

Built with React + Vite, Firebase (Auth + Firestore) for shared real-time
storage, deployed to GitHub Pages.

**See `SETUP.md` for the full step-by-step to get this live.**

## Stack

- React 18 + Vite
- Firebase Authentication (email/password — two accounts, one each)
- Firestore (shared, real-time synced between both of you)
- GitHub Actions → GitHub Pages

## Project structure

```
src/
  App.jsx              — top-level state, tabs, Firestore wiring
  firebase.js           — Firebase init (reads config from env vars)
  tokens.js              — design tokens: colors, palettes, tags, sizes
  utils.js                — deterministic ball color/rotation, formatting
  components/
    Login.jsx
    Jar.jsx
    EntryModal.jsx
    ViewEntriesModal.jsx
    PiggyBank.jsx
    PiggyFormModal.jsx
    PiggyHistoryModal.jsx
firestore.rules         — only the two authenticated accounts can read/write
.github/workflows/deploy.yml — build + deploy on push to main
```
