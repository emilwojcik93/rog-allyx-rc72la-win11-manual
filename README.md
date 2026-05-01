# Ally X Lean Win11

Readable site (after you enable GitHub Pages from Actions on `main`): **https://emilwojcik93.github.io/rog-allyx-rc72la-win11-manual/**

Sources live in [`docs/`](docs/). Edit there, or preview locally:

```powershell
pip install -r requirements-docs.txt
mkdocs serve
```

This is a **minimal** path: custom USB install (not Cloud Recovery), **[G-Helper](https://github.com/seerge/g-helper)** as the ASUS control surface. **Armoury Crate**, **MyASUS**, and **Snappy-style** bulk driver installers are intentionally out of scope here.

## What you will do

1. Obtain a legitimate **Windows 11 x64** image from Microsoft: [Download Windows 11](https://www.microsoft.com/en-us/software-download/windows11).
2. Build a **MicroWin**-style image with **[CodingWonders/MicroWin](https://github.com/CodingWonders/MicroWin)** (continuation after MicroWin left WinUtil):

   ```powershell
   powershell -ExecutionPolicy Bypass -Command "iwr -useb https://raw.githubusercontent.com/CodingWonders/MicroWin/refs/heads/main/Microwin.ps1 | iex"
   ```

   Prefer the **release build** from the project page if you do not want `irm` / `iex` from raw GitHub.

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
