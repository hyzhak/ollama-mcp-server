# 🚀 Fresh Upstream Repository & Automated npm Publishing – Migration Guide

*Last updated: **6 July 2025***

---

## Prerequisites

* All new code lives on the local branch **`migration`**.
* You can create repositories under **[https://github.com/hyzhak](https://github.com/hyzhak)** (or an organisation of your choice).
* You have an npm account with **2‑factor authentication** enabled and permission to generate an **automation token**.

---

## 1 Validate the *migration* branch locally

```bash
git checkout migration
npm ci          # installs exactly the locked versions
npm test        # run your test suite
```

---

## 2 Create a **clean** GitHub repository

1. GitHub → **New → Repository**
   *Suggested name*: **`ollama-mcp-server`**
2. Leave **“Initialize repository with…”** unchecked.
3. Copy the SSH/HTTPS URL (e.g. `git@github.com:hyzhak/ollama-mcp-server.git`).

---

## 3 Push the branch as canonical history

```bash
# keep NightTrek’s original as a read‑only remote (optional)
git remote rename origin upstream

# add the new origin
git remote add origin git@github.com:hyzhak/ollama-mcp-server.git

# publish the branch and set the default
git push -u origin migration:main
```

---

## 4 Refresh project metadata

### 4.1 LICENSE

Keep the original text **and** append your own copyright line.

### 4.2 `package.json`

```json
{
  "name": "ollama-mcp-server",
  "version": "1.0.0",
  "description": "Modern MCP server for Ollama – rebooted and actively maintained.",
  "license": "MIT",
  "repository": "github:hyzhak/ollama-mcp-server",
  "keywords": ["ollama", "mcp", "ai", "chatbot"]
}
```

### 4.3 `README.md`

Explain the rewrite and link back to **NightTrek/Ollama‑mcp** for attribution.

---

## 5 Reserve the package name on npm

```bash
npm search ollama-mcp-server   # verify it is free
npm publish --access public    # first manual publish secures the name
```

*(If you prefer a scope, run `npm init --scope=@hyzhak` first.)*

---

## 6 Generate an **automation token** and store it in GitHub

1. `npm token create --read-only=false --cidr=0.0.0.0/0`
   Choose the **automation** role.
2. GitHub → **Settings → Secrets → Actions** → **New secret**
   Name: **`NPM_TOKEN`**
   Value: *paste the token*.

---

## 7 Add a minimal `.npmrc` to the repo root

```
registry=https://registry.npmjs.org/
```

> Authentication is injected at runtime via the environment variable **`NODE_AUTH_TOKEN`** provided by the workflow.

---

## 8 Set up GitHub Actions for CI + publish

Create **`.github/workflows/publish.yml`**

```yaml
name: CI & Publish to npm

on:
  push:
    tags:
      - 'v*.*.*'   # e.g. v1.0.0
  workflow_dispatch:

permissions:
  contents: read
  id-token: write   # provenance for npm

jobs:
  build-test-publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - run: npm ci
      - run: npm test

      - name: Publish
        run: npm publish --provenance --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**How it works**

* Pushing a tag such as `v1.0.0` triggers the workflow.
* The job installs dependencies, runs tests, and publishes on success.

---

## 9 Typical release flow

```bash
npm version minor -m "release %s"  # bumps version & creates git tag
git push origin main --follow-tags
```

---

## 10 Archive the old fork (optional)

GitHub → **Settings → Danger Zone → Archive** and add to the README of the old repo:

> ⚠️ **This fork is archived – active development moved to
> `https://github.com/hyzhak/ollama-mcp-server`.** ⚠️

---

## 11 Recommended follow‑ups

* Adopt **Conventional Commits** and **semantic‑release** for automatic versioning.
* Enable **CodeQL** or **Snyk** for vulnerability scanning.
* Activate **GitHub Discussions** for community Q\&A.

---

### 🏁 TL;DR

1. Create a clean repo.
2. Push `migration` as `main`.
3. Update metadata.
4. Secure npm name.
5. Add `NPM_TOKEN` secret.
6. Commit the workflow and tag releases.

Happy shipping! 🚢
