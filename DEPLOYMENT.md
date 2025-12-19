# Deploying to Railway

**Docker is NOT required.**

Railway has native support for Node.js. Because your project has a `package.json` with a `start` script, Railway will automatically detect it as a Node.js app, install dependencies, and run your server.

## Prerequisites
1. A [Railway](https://railway.app/) account.
2. [Git](https://git-scm.com/) installed on your computer.
3. Your OpenAI API Key.

## Option 1: Deploy via GitHub (Recommended)

1. **Initialize Git (if not done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit of CDSS KDIGO app"
   ```

2. **Push to GitHub:**
   - Create a new repository on GitHub.
   - Follow the instructions to push your local code to that repository.

3. **Connect in Railway:**
   - Go to your Railway Dashboard.
   - Click **"New Project"** -> **"Deploy from GitHub repo"**.
   - Select your new repository.
   - Click **"Deploy Now"**.

4. **Set Environment Variables:**
   - Once the project is created, go to the **"Variables"** tab.
   - Click **"New Variable"**.
   - Key: `OPENAI_API_KEY`
   - Value: `sk-...` (your actual OpenAI key).
   - *Note: You do NOT need to set PORT. Railway handles that.*

5. **Success:**
   - Railway will provide a public URL (e.g., `https://cdss-kdigo-production.up.railway.app`).
   - Open that URL to use your tool over the internet.

## Option 2: Deploy via Railway CLI

1. **Install CLI:** `npm i -g @railway/cli`
2. **Login:** `railway login`
3. **Link:** `railway link` (creates a project)
4. **Push:** `railway up`
5. **Variables:** Run `railway variables set OPENAI_API_KEY=sk-...`

## Why No Dockerfile?
Railway's "Nixpacks" builder inspects your `package.json`:
- It sees `dependencies` -> installs specific versions.
- It sees `"scripts": { "start": "node server.js" }` -> knows how to run it.
- It sees `node` code -> sets up the standard Node.js environment.
