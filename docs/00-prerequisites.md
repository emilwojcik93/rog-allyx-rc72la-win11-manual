# Prerequisites

## Machine that builds the image (PC)

- **Windows 10/11 x64** with enough free disk space (tens of GB for ISO + extracted tree + mount scratch).
- **Administrator** PowerShell or elevated session for `Mount-WindowsImage` / `DISM`.
- Tools:
  - File archiver (for example NanaZip / 7-Zip) to extract ISO contents **or** mount ISO in Explorer.
  - **[Rufus](https://rufus.ie/)** (recommended) for the first bootable USB from the MicroWin ISO. Avoid stacking Rufus **Windows User Experience** tweaks on top of an **already** customized MicroWin ISO.
- Folders (create if missing):

```powershell
New-Item -ItemType Directory -Force -Path "C:\WinWork\Mount"
New-Item -ItemType Directory -Force -Path "C:\DRIVERS"
```

## USB flash drive (install media)

- This manual uses **`E:\`** for the USB on the **PC that prepares** the stick. On the Ally, the boot menu label is firmware-defined (not necessarily `E:`).
- **`install.wim`** is often **larger than 4 GiB**. A **single FAT32-only** volume cannot store it. Typical Rufus Windows 11 layouts use **NTFS** (or a supported split layout).

### Physical connection on ROG Ally X (USB-C)

The handheld **top port is USB-C**. A normal **USB-A** installer stick will **not** plug in directly. Use one of:

| Approach | Notes |
|----------|--------|
| **USB-C to USB-A adapter** plus standard USB pendrive | Use a **data** adapter (not charge-only). |
| **USB-C flash drive** | Simplest cable-wise. |
| **Dock / hub with downstream USB-A** | **UEFI must list the stick as a boot device** - behavior varies by dock firmware. |

**Example:** validation used a **Dell Universal Dock UD22** (USB-C from the Ally to the dock, USB-A installer in the dock). Other USB-C docks may work; if the BIOS **does not** show the USB installer, try a **direct C-to-A adapter** or **native C** flash drive first.

## Target device (ROG Ally X RC72LA)

### Windows edition (Home vs Pro)

ROG Ally X is often sold with **Windows 11 Home**. You may install **Pro** (or Home) according to **your license**. Edition does **not** remove the need for the same **chipset + WLAN** packages on custom media.

### BIOS and boot menu (volume down)

1. **Power off** fully (not sleep).
2. Press **Power** to turn on.
3. **Immediately** press **Volume down** repeatedly until **BIOS** or **Boot menu** appears.  
   - ASUS FAQ: [ROG Ally series FAQ (UK)](https://rog.asus.com/uk/support/faq/1050046/).  
   - Community: [Reddit - access BIOS](https://www.reddit.com/r/ROGAlly/comments/145bvzg/how_to_access_bios_in_case_anyone_needs_to_know/).  
   - Broader context: [Asus-ROG-Ally-Guide - Getting Started](https://github.com/mikeroyal/Asus-ROG-Ally-Guide/blob/main/Getting%20Started.md).

From Windows: **Settings → System → Recovery → Advanced startup → UEFI Firmware Settings**.

### Maintenance

- Update **BIOS** from ASUS when convenient.
- Keep a **second copy** of a working `install.wim` / USB; custom images are **your** responsibility.
