# Setting up Feelings Jars

This gets you from "code on my computer" to "live site both of us can use."
None of these steps can be done on your behalf — they all require your own
Google/GitHub accounts — but each one is short.

## 1. Create the Firebase project

1. Go to https://console.firebase.google.com and click **Add project**.
2. Name it anything (e.g. `feelings-jars`). Google Analytics is not needed — skip it.
3. Once created, click the **</> (web)** icon to register a web app. Name it
   `feelings-jars-web`. You do **not** need Firebase Hosting here — you're using
   GitHub Pages instead.
4. Firebase shows you a `firebaseConfig` object with six values
   (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId).
   Keep this tab open — you'll need these values in step 4.

## 2. Turn on Authentication (this is your real access gate)

1. In the Firebase console sidebar: **Build > Authentication > Get started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. Go to the **Users** tab and click **Add user** — create one account for
   yourself and one for Vrushab (any email works, even a fake-looking one like
   `shivali@feelingsjars.app` — it doesn't need to receive mail, it's just a
   login identifier). Pick real passwords, share them with each other directly
   (not over email/chat where it'd sit in plaintext).

This is what actually protects the site — Firestore checks that a request
comes from one of these two accounts before allowing any read or write, on
Google's servers, not in the browser.

## 3. Turn on Firestore

1. Sidebar: **Build > Firestore Database > Create database**.
2. Choose a location close to you (e.g. `eur3` for Europe), start in
   **production mode**.
3. Once created, go to the **Rules** tab and replace the contents with what's
   in `firestore.rules` in this project, then **Publish**.

## 4. Fill in your Firebase config

Copy `.env.example` to `.env.local` and paste in the six values from step 1:

```
cp .env.example .env.local
```

You won't commit `.env.local` (it's in `.gitignore`) — it's only for testing
on your own machine with `npm run dev`.

## 5. Push to GitHub

1. Create a new **public or private** repo on GitHub named `feelings-jars`
   (if you use a different name, update `base` in `vite.config.js` to match —
   it must be `/your-repo-name/`).
2. In your local project folder:
   ```
   git init
   git add .
   git commit -m "Feelings Jars"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/feelings-jars.git
   git push -u origin main
   ```

## 6. Add your Firebase config as GitHub secrets

The live site needs the same six values, but GitHub Actions injects them at
build time instead of reading a local `.env.local` file (which never leaves
your computer).

In your repo: **Settings > Secrets and variables > Actions > New repository
secret**. Add all six, matching these exact names:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

## 7. Turn on GitHub Pages

**Settings > Pages > Build and deployment > Source**: choose
**GitHub Actions** (not "Deploy from a branch").

## 8. Deploy

Push to `main` (or re-run the workflow from the **Actions** tab). The
included `.github/workflows/deploy.yml` builds the site with your secrets
and publishes it. Your site will be live at:

```
https://YOUR_USERNAME.github.io/feelings-jars/
```

Sign in with either of the two accounts from step 2 — you're in.

## Local development

```
npm install
npm run dev
```

Needs `.env.local` filled in from step 4 first.

## A note on the piggy bank currency

The ₹ display is a fixed illustrative rate (×100), not live exchange rates —
it's a display convenience, not accurate FX. All amounts are stored
EUR-equivalent internally regardless of which currency was showing when you
added them.
