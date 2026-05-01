# Step 3 - ASUS drivers for ROG Ally X (RC72LA)

## Why inject anything

**ASUS Cloud Recovery** ships an image that already matches the handheld. A **retail or MicroWin** USB can fail early with **Windows Setup could not install one or more boot-critical drivers** if **WinPE / Setup** does not load the right stack before the OS is applied. Offline injection into **`install.wim`** (and **`sources\boot.wim`** when needed) fixes that. Details: [04-dism-offline-drivers.md](04-dism-offline-drivers.md).

## Where `C:\DRIVERS` comes from

Download **ZIP** packages from **ASUS support** for **ROG Ally X RC72LA** (pick your region; product selector must match **Ally X**, not the older Ally SKU):

- [ROG Ally - Helpdesk (download hub, US)](https://rog.asus.com/us/gaming-handhelds/rog-ally/rog-ally-2023/helpdesk_download/)

Extract each ZIP, then run the vendor **`Setup.exe`** (or equivalent). In the wizard choose **Extract**, not **Install**. The tool will create a subfolder under `C:\DRIVERS` automatically, for example:

`C:\DRIVERS\DolbyAtmosdriverforROG_TUF_ASUS_Z_V3.30704.742`

Point **DISM** at the parent `C:\DRIVERS` (or a cleaned copy) so all extracted `.inf` trees are visible.

## Minimal set for the image (DISM)

Keep the offline folder **small and safe**:

| Priority | Package (typical name on ASUS site) | Notes |
|----------|----------------------------------------|--------|
| Required | **AMD Chipset** (DriverOnly tree) | Strip **PMF** and MSI noise first (below). |
| Required | **MediaTek WLAN** (often includes BT) | Wi-Fi for Setup and first boot. |

Everything else (AMD graphics, audio, Realtek USB LAN, motion, card reader, controller INFs, BIOS-facing tools) can usually wait for **[G-Helper](https://github.com/seerge/g-helper)** and **Windows Update** after install, unless you already know you need them in PE.

## Fingerprint (do not blind-inject)

**RC72LA** can ship **FocalTech** or **EgisTec** sensors. The wrong INF tree stages but **does not bind** (no **Biometric** class device). **Do not** guess both vendors into the WIM unless you accept bloat and cleanup later.

- Prefer: install the correct **FOCAL** or **EGIS** package **after** Windows is up, from the same ASUS page, then remove orphans with **RAPR** if needed. See [troubleshooting-fingerprint.md](troubleshooting-fingerprint.md).

## Skip or delete before `Add-WindowsDriver`

| Item | Reason |
|------|--------|
| **`PMF_7040Series`** / `amdpmf.inf` | Known **Add-WindowsDriver** failure on some MicroWin images; handheld can run without PMF in the WIM. |
| **`ROGScreenManager`**, **`Package`**, **`Install.bat`** | Apps / launchers, not bare class drivers. |
| **Dolby Atmos** driver bundle (optional) | Often fine, but if it causes store clutter or bad pairs, install later or remove with [RAPR](troubleshooting-driver-store-rapr.md). |

Example removal (adjust folder names to match your extract):

```powershell
Remove-Item -LiteralPath "C:\DRIVERS\<ChipsetFolder>\PMF_7040Series Driver" -Recurse -Force -ErrorAction SilentlyContinue
```

## Driver store cleanup

**[Driver Store Explorer (RAPR)](https://github.com/lostindark/DriverStoreExplorer)** removes stuck packages (wrong fingerprint vendor, Dolby, duplicates). Install and launch:

```powershell
winget install lostindark.DriverStoreExplorer --accept-source-agreements --accept-package-agreements
rapr
```

Full workflow: [troubleshooting-driver-store-rapr.md](troubleshooting-driver-store-rapr.md).
