# Ally X Lean Win11

**Live docs:** https://emilwojcik93.github.io/rog-allyx-rc72la-win11-manual/

Sources live in [`docs/`](docs/). This README uses **PowerShell** snippets with **`$RepoRoot`** so paths are generic. **Set it once** to wherever you actually put this repo (see below), or edit the **`Join-Path`** second argument to match your layout.

## Get this repository

1. **Download ZIP:** on GitHub use **Code → Download ZIP**, or clone with **`git`**.
2. **Suggested folder:** extract or clone into **`$env:UserProfile\Downloads\rog-allyx-rc72la-win11-manual`** (create the `rog-allyx-rc72la-win11-manual` folder under **Downloads**, or rename into it after extract).

**GitHub ZIP quirk:** the archive often unpacks to **`rog-allyx-rc72la-win11-manual-main`**. Either rename that folder to **`rog-allyx-rc72la-win11-manual`**, or keep the long name and **change `$RepoRoot`** in the snippets below so it points at your real directory.

**Clone example** (matches the suggested folder name):

```powershell
git clone https://github.com/emilwojcik93/rog-allyx-rc72la-win11-manual.git (Join-Path $env:UserProfile "Downloads\rog-allyx-rc72la-win11-manual")
```

**Define the root** used by the rest of the commands (copy as-is if you followed the suggestion above):

```powershell
$RepoRoot = Join-Path $env:UserProfile "Downloads\rog-allyx-rc72la-win11-manual"
```

If your copy lives somewhere else, set **`$RepoRoot`** manually, for example:

```powershell
$RepoRoot = "D:\src\rog-allyx-rc72la-win11-manual"
```

## Local docs preview (MkDocs)

From **PowerShell**, after **`$RepoRoot`** is set:

```powershell
Set-Location $RepoRoot
python -m pip install -r (Join-Path $RepoRoot "requirements-docs.txt")
python -m mkdocs serve -f (Join-Path $RepoRoot "mkdocs.yml")
```

If **`python`** is not on **`PATH`**, call your **`python.exe`** explicitly once (installer path varies), or add Python to **`PATH`**, then rerun the lines above.

Open **http://127.0.0.1:8000/rog-allyx-rc72la-win11-manual/** (subpath matches GitHub Pages). To preview at site root, temporarily comment out **`site_url`** in **`mkdocs.yml`**.

## WinUtil with this repo’s `winget.json`

Same **`$RepoRoot`** as above. **`-Run`** applies the profile; omit it for a dry run per [WinUtil automation](https://winutil.christitus.com/userguide/automation/).

```powershell
$RepoRoot = Join-Path $env:UserProfile "Downloads\rog-allyx-rc72la-win11-manual"
& ([ScriptBlock]::Create((irm "https://christitus.com/win"))) -Config (Join-Path $RepoRoot "winget.json") -Run
```

If **`winget.json`** moved, change the **`Join-Path`** argument or pass a string literal you trust.

More detail: [docs/winget-profile.md](docs/winget-profile.md).

## Publish on GitHub Pages (first time)

1. **Settings** → **Actions** → **General** → **Workflow permissions**: set **Read and write permissions**, then **Save**. If this stays on **Read** only, `actions/deploy-pages` cannot create a deployment (you may see **`Failed to create deployment (status: 404)`**). See [GitHub token permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#modifying-the-permissions-for-the-github_token).
2. Push the latest `main` (includes `.github/workflows/docs.yml`).
3. **Settings** → **Pages** → **Build and deployment** → **Source** → **GitHub Actions** (not “Deploy from a branch”).
4. Open **Actions** → **Publish docs** → confirm the run is **green**. If GitHub asks to approve the **`github-pages`** environment, approve it once.
5. After deploy, the site is at **https://emilwojcik93.github.io/rog-allyx-rc72la-win11-manual/** (can take a minute to refresh).

Every push to `main` rebuilds and redeploys. You can also run the workflow manually: **Actions** → **Publish docs** → **Run workflow**.

### Deploy error: `404` / `Failed to create deployment`

Almost always **Workflow permissions** (step 1 above). Fix that, then **Actions** → failed run → **Re-run all jobs**. OIDC subject-claim settings do not need changing for this workflow.

This is a **minimal** path: custom USB install (not Cloud Recovery), **[G-Helper](https://github.com/seerge/g-helper)** as the ASUS control surface. **Armoury Crate**, **MyASUS**, and **Snappy-style** bulk driver installers are intentionally out of scope here.

## What you will do

1. Obtain a legitimate **Windows 11 x64** image from Microsoft: [Download Windows 11](https://www.microsoft.com/en-us/software-download/windows11).
2. Build a **MicroWin** image with **[CodingWonders/MicroWin](https://github.com/CodingWonders/MicroWin)**. This repo only documents the **upstream one-liner**; all other install paths and features are in **that** README / Releases:

   ```powershell
   powershell -ExecutionPolicy Bypass -Command "iwr -useb https://raw.githubusercontent.com/CodingWonders/MicroWin/refs/heads/main/Microwin.ps1 | iex"
   ```

   See [docs/02-build-microwin.md](docs/02-build-microwin.md) for the short Ally-specific note.

3. Prepare **ASUS** driver folders under `C:\DRIVERS`, inject with **DISM** into `install.wim` (and `boot.wim` if needed), copy the serviced WIM to USB. See the numbered docs below.

**Why inject drivers?** Factory **ASUS Cloud Recovery** already matches this hardware. A retail or MicroWin image can stop at the start of Setup with **boot-critical drivers** unless **WinPE / Setup** sees the right packages in **`install.wim`** and often **`sources\boot.wim`**.

## Doc map

| Doc | Topic |
|-----|--------|
| [docs/00-prerequisites.md](docs/00-prerequisites.md) | Disk space, admin PowerShell, USB-C media, BIOS chord |
| [docs/01-download-windows11.md](docs/01-download-windows11.md) | Official ISO |
| [docs/02-build-microwin.md](docs/02-build-microwin.md) | MicroWin build and USB creation |
| [docs/03-drivers-asus.md](docs/03-drivers-asus.md) | Minimal driver set, extract layout, skips |
| [docs/04-dism-offline-drivers.md](docs/04-dism-offline-drivers.md) | Mount `install.wim`, `Add-WindowsDriver`, save |
| [docs/05-usb-deploy.md](docs/05-usb-deploy.md) | Replace `E:\sources\install.wim` |
| [docs/06-post-install.md](docs/06-post-install.md) | G-Helper, WinUtil, optional OpenSSH |
| [winget.json](winget.json) | WinUtil automation IDs ([docs/winget-profile.md](docs/winget-profile.md)) |
| [docs/references.md](docs/references.md) | External links |
| [docs/troubleshooting-fingerprint.md](docs/troubleshooting-fingerprint.md) | Focal vs Egis |
| [docs/troubleshooting-driver-store-rapr.md](docs/troubleshooting-driver-store-rapr.md) | RAPR, Dolby cleanup |
