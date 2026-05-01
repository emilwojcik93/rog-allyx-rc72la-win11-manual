# Step 2 - Build MicroWin image (CodingWonders)

MicroWin was removed from Chris Titus WinUtil; the maintained continuation is the **.NET** project **[CodingWonders/MicroWin](https://github.com/CodingWonders/MicroWin)**. Read the README, roadmap, and [Releases](https://github.com/CodingWonders/MicroWin/releases).

The upstream README states the app is **beta**, **not code-signed**, and must run **as Administrator** (you may need an antivirus exclusion).

## Option A - Install from latest release

1. Open **Releases** on GitHub.
2. Download the latest Windows x64 build archive.
3. Extract to a folder, for example `C:\Tools\MicroWin\`.
4. Run the application **as Administrator** and follow the UI to select your **official Windows 11 ISO** (or `sources\install.wim`, per tool guidance), edition, and debloat options.
5. If the tool can import a driver folder, point it at `C:\DRIVERS` **after** you removed problematic packages (see [03-drivers-asus.md](03-drivers-asus.md)).
6. Export a **MicroWin ISO**, for example `microwin-win11-pro.iso`.

## Option B - One-liner (from upstream README)

Review upstream security notes before running:

```powershell
powershell -ExecutionPolicy Bypass -Command "iwr -useb https://raw.githubusercontent.com/CodingWonders/MicroWin/refs/heads/main/Microwin.ps1 | iex"
```

## Create bootable USB (first time)

Use **[Rufus](https://rufus.ie/)**:

1. Select the **MicroWin ISO** and the USB device.
2. If Rufus offers **Windows User Experience** / extra image tweaks, **disable** them when the ISO is **already** customized by MicroWin (double-patching causes failures; background in [winutil#3936](https://github.com/ChrisTitusTech/winutil/issues/3936)).

You should see on the USB (example letter `E:\`):

- `E:\sources\install.wim`
- `E:\sources\boot.wim`
- `E:\boot`, `E:\EFI`, `E:\setup.exe`, …

## Folder layout instead of mounting

```text
<extracted>\sources\install.wim
<extracted>\sources\boot.wim
```

Example size check:

```powershell
Get-Item "C:\path\to\microwin-win11-pro\sources\install.wim" | Format-List FullName, Length
```
