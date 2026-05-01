# Step 5 - Put the modified `install.wim` on the USB (`E:\`)

You **do not** need to rebuild a full ISO or re-run Rufus **only** to swap the OS image file, as long as the stick is already a valid Windows Setup layout.

**On ROG Ally X:** there is no built-in **USB-A** port. Use a **USB-C** installer, **USB-C to USB-A adapter** plus a stick, or a **USB-C dock** that exposes a bootable mass-storage device (see [00-prerequisites.md - Physical connection](00-prerequisites.md#physical-connection-on-rog-ally-x-usb-c)).

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

## 5.3 Copy the serviced WIM

**Source** must be the same file you mounted in [04-dism-offline-drivers.md](04-dism-offline-drivers.md) and dismounted with **`-Save`**.

```powershell
Copy-Item -LiteralPath "C:\path\to\microwin-win11-pro\sources\install.wim" `
  -Destination "E:\sources\install.wim" -Force
```

```powershell
Get-Item "E:\sources\install.wim" | Format-List FullName, Length, LastWriteTime
```

## 5.4 Filesystem constraints

- If **`install.wim` > 4 GiB**, **FAT32** cannot hold it. Use a Rufus layout that supports large WIMs (often **NTFS** on the data partition).
- If the USB uses **`install.esd`**, do not rename `.wim` to `.esd` - the media type must match what `setup.exe` expects.

## 5.5 Boot the Ally X from USB

Power off, use **Volume Down + Power** (or your firmware’s documented combo) to open the **Boot menu**, then select the USB entry.

## 5.6 If you also modified `boot.wim`

```powershell
Copy-Item -LiteralPath "C:\path\to\microwin-win11-pro\sources\boot.wim" `
  -Destination "E:\sources\boot.wim" -Force
```
