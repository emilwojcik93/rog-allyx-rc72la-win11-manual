# ROG Ally X (RC72LA) — manual debloated Windows 11 install

**Repository:** [github.com/emilwojcik93/rog-allyx-rc72la-win11-manual](https://github.com/emilwojcik93/rog-allyx-rc72la-win11-manual)

This repository documents a **repeatable, command-by-command** workflow to:

1. Obtain a legitimate **Windows 11** x64 image from Microsoft.
2. Build a **MicroWin**-style image using the **[CodingWonders/MicroWin](https://github.com/CodingWonders/MicroWin)** project (continuation of MicroWin after removal from WinUtil).
3. Download **ASUS** driver packages for **ROG Ally X RC72LA**, inject them offline with **DISM**, and deploy **`install.wim`** to a USB stick (**`E:\`** in examples).
4. Finish setup on the handheld using **[G-Helper](https://github.com/seerge/g-helper)** for power, LEDs, fan/GPU modes, and driver update discovery — **not** Armoury Crate / MyASUS.

**Target hardware (verified in local audit):**

| Field | Value |
|--------|--------|
| Model | ASUS **ROG Ally X** `RC72LA_RC72LA` |
| SoC | AMD **Ryzen Z1 Extreme** |
| OS baseline | Windows 11 Pro **build 26200** (example from deployed unit) |

**Security**

- Do **not** commit product keys, `winget.json` with secrets, or SSH private keys.
- If a **GitHub PAT** was ever pasted into a chat or log, **revoke and rotate** it in GitHub immediately.

**Repository layout**

| Path | Purpose |
|------|---------|
| [docs/00-prerequisites.md](docs/00-prerequisites.md) | Disk space, admin PowerShell, paths |
| [docs/01-download-windows11.md](docs/01-download-windows11.md) | Official ISO acquisition |
| [docs/02-build-microwin.md](docs/02-build-microwin.md) | MicroWin .NET build from source/release |
| [docs/03-drivers-asus.md](docs/03-drivers-asus.md) | Driver list + ASUS download notes |
| [docs/04-dism-offline-drivers.md](docs/04-dism-offline-drivers.md) | Mount `install.wim`, `Add-WindowsDriver`, save |
| [docs/05-usb-deploy.md](docs/05-usb-deploy.md) | Replace `E:\sources\install.wim`, optional `boot.wim` |
| [docs/06-post-install.md](docs/06-post-install.md) | G-Helper, WinUtil automation, SSH host `ally-ewojcik` |
| [docs/07-remote-audit-summary.md](docs/07-remote-audit-summary.md) | Pointer to local audit artifacts |
| [docs/references.md](docs/references.md) | External guides and tools |
| [docs/troubleshooting-fingerprint.md](docs/troubleshooting-fingerprint.md) | Focal vs Egis fingerprint, “no scanner” fix |
| [docs/troubleshooting-driver-store-rapr.md](docs/troubleshooting-driver-store-rapr.md) | Driver Store Explorer (RAPR), `winget`, force remove (e.g. Dolby) |

**Out of scope (by design)**

- **Snappy Driver** / similar bulk driver installers — skipped; vendor mix caused issues; **G-Helper** + ASUS + Windows Update is enough.
- **Armoury Crate / MyASUS** as the primary control plane — replaced by **G-Helper** for day-to-day use.
