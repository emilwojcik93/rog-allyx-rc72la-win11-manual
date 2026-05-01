# Step 5 — Put the modified `install.wim` on the USB (`E:\`)

You **do not** need to rebuild a full ISO or re-run Rufus **only** to swap the OS image file, as long as the stick is already a valid Windows Setup layout.

**On ROG Ally X:** the Ally does not have a built-in **USB-A** port. Use a **USB-C installer**, **USB-C → USB-A adapter + pendrive**, or a **USB-C dock** that exposes a bootable USB mass-storage device (see [00-prerequisites.md — Physical connection](00-prerequisites.md#physical-connection-on-rog-ally-x-usb-c)).

## 5.1 Confirm USB layout

```powershell
Get-ChildItem "E:\" | Format-Wide -Column 4
Test-Path "E:\sources\install.wim"
Get-Item "E:\sources\install.wim" | Format-List FullName, Length, LastWriteTime
```

## 5.2 Backup the old WIM (recommended)

```powershell
Rename-Item -Path "E:\sources\install.wim" -NewName "install.wim.bak_$(Get-Date -Format yyyyMMdd_HHmm)"
```

## 5.3 Copy the serviced WIM from your PC

**Source** must be the **same file** you mounted in [04-dism-offline-drivers.md](04-dism-offline-drivers.md) and dismounted with **`-Save`**.

Example:

```powershell
Copy-Item -LiteralPath "C:\Users\ewojcik\Downloads\microwin-win11-pro\sources\install.wim" `
  -Destination "E:\sources\install.wim" -Force
```

Verify size and timestamp:

```powershell
Get-Item "E:\sources\install.wim" | Format-List FullName, Length, LastWriteTime
```

## 5.4 Filesystem constraints

- If **`install.wim` > 4 GiB**, **FAT32 cannot hold it**. Use media created by **Rufus** with a layout that supports large WIMs (typically **NTFS** on the data partition), or export/split with advanced tooling (not covered here).
- If the USB uses **`install.esd`** instead of **`install.wim`**, you must not blindly rename `.wim` to `.esd` — the media type must match what `setup.exe` expects.

## 5.5 Boot the Ally X from USB

- Power off, hold **Volume Down + Power** (or your device’s documented BIOS boot menu combo) to open **Boot menu**.
- Select the USB entry.
- Install Windows; **offline driver injection** reduces “missing driver” prompts during and after install.

## 5.6 If you *also* modified `boot.wim`

Copy it the same way:

```powershell
Copy-Item -LiteralPath "C:\Users\ewojcik\Downloads\microwin-win11-pro\sources\boot.wim" `
  -Destination "E:\sources\boot.wim" -Force
```
