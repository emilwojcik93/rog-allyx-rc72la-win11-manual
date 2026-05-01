# Prerequisites

## Machine that builds the image (PC)

- **Windows 10/11 x64** with enough free disk space (tens of GB for ISO + extracted tree + mount scratch).
- **Administrator** PowerShell or elevated session for `Mount-WindowsImage` / `DISM`.
- Tools you will use:
  - **File archiver** (e.g. NanaZip / 7-Zip) to extract ISO contents **or** mount ISO in Explorer.
  - **[Rufus](https://rufus.ie/)** (recommended) to create the first bootable USB from the MicroWin ISO — avoid stacking Rufus “Windows User Experience” tweaks on top of an already-modified MicroWin ISO.
- Folders used in this manual (create if missing):

```powershell
New-Item -ItemType Directory -Force -Path "C:\WinWork\Mount"
New-Item -ItemType Directory -Force -Path "C:\DRIVERS"
```

## USB flash drive (install media)

- In this repo, the mounted USB drive letter is **`E:\`** on the **PC that prepares** the stick. On the Ally X itself, the BIOS/boot menu will show whatever label the firmware assigns (often still a removable “USB” entry, not necessarily `E:`).
- **`install.wim`** is often **larger than 4 GiB**. A **single FAT32-only** volume cannot store it. Typical **Rufus** Windows 11 layouts use **NTFS** (or a supported split layout). If copy fails, check filesystem and free space.

### Physical connection on ROG Ally X (USB-C)

The handheld’s **top port is USB-C**. A normal **USB-A** Windows installer stick will **not** plug in directly. Use one of:

| Approach | Notes |
|----------|--------|
| **USB-C → USB-A adapter** (“OTG” style) + standard USB pendrive | Common and cheap; ensure the adapter supports **USB 3.x** and **data** (not charge-only). |
| **USB-C flash drive** (native Type-C stick) | Simplest cable-wise; buy a known-good brand for sustained read during Setup. |
| **Dock / hub with downstream USB-A** | Lets you attach a **USB-A installer** while docked. **UEFI must still list the stick as a boot device** — behavior varies by dock firmware. |

**Real-world example:** this manual was validated using a **Dell Universal Dock UD22** (`USB-C` from the Ally into the dock, **USB-A** installer key in the dock’s USB port) so the handheld could boot external Windows media without a separate C-to-A dongle. Any **similar USB-C dock** may work, but if the BIOS **does not** show your USB installer, try a **direct C-to-A adapter** or **C-native** flash drive first to rule out dock boot quirks.

## Target device (ROG Ally X RC72LA)

### Windows edition (Home vs Pro)

ROG Ally X is typically shipped with **Windows 11 Home**. This repo assumes you install **Windows 11 Pro** (MicroWin / retail Pro) using **your own valid license**. Home and Pro share the same driver stack; edition does **not** remove the need for **ASUS + chipset + WLAN** packages on custom media.

### BIOS and boot menu (volume down)

Handhelds use a **chord** to enter firmware / boot picker — timing matters.

1. **Power off** the device (fully off, not sleep).
2. Press the **Power** button to turn on.
3. **Immediately** press **Volume down (−)** **repeatedly** (tap / multi-press) until the **BIOS** or **Boot menu** appears.  
   - If you miss the window, power off and retry.  
   - ASUS documents: press **Power**, then keep pressing **Volume down** until BIOS shows — see [ROG Ally series FAQ (UK)](https://rog.asus.com/uk/support/faq/1050046/) (*“How do I enter the ROG Ally’s BIOS configuration?”*).  
   - Community tips: [Reddit — access BIOS](https://www.reddit.com/r/ROGAlly/comments/145bvzg/how_to_access_bios_in_case_anyone_needs_to_know/).  
   - Broader setup context: [Asus-ROG-Ally-Guide — Getting Started](https://github.com/mikeroyal/Asus-ROG-Ally-Guide/blob/main/Getting%20Started.md).

From Windows you can also use **Settings → System → Recovery → Advanced startup** → **UEFI Firmware Settings** for BIOS.

### Maintenance

- **BIOS**: update from ASUS support when convenient (before or after OS install).
- **Recovery**: keep a second copy of working `install.wim` / USB; custom images are **your** responsibility.
