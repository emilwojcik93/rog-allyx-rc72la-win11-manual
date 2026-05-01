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

- In this repo, the mounted USB drive letter is **`E:\`**. Adjust every command if your letter differs.
- **`install.wim`** is often **larger than 4 GiB**. A **single FAT32-only** volume cannot store it. Typical **Rufus** Windows 11 layouts use **NTFS** (or a supported split layout). If copy fails, check filesystem and free space.

## Target device (ROG Ally X RC72LA)

- **BIOS**: update from ASUS support when convenient (before or after OS install).
- **Recovery**: keep a second copy of working `install.wim` / USB; custom images are **your** responsibility.
