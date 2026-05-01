# Step 4 — Offline driver injection into `install.wim` (DISM / PowerShell)

All commands below assume:

- **Source WIM:** `C:\Users\ewojcik\Downloads\microwin-win11-pro\sources\install.wim` (adjust to your extracted MicroWin path or the path MicroWin wrote under `%TEMP%`).
- **Mount point:** `C:\WinWork\Mount`
- **Drivers:** `C:\DRIVERS` (cleaned per [03-drivers-asus.md](03-drivers-asus.md))

Run PowerShell **as Administrator**.

## 4.1 List editions / indexes in the WIM

```powershell
Get-WindowsImage -ImagePath "C:\Users\ewojcik\Downloads\microwin-win11-pro\sources\install.wim"
```

Example output (your case):

```text
ImageIndex       : 1
ImageName        : Windows 11 Pro
ImageDescription : Windows 11 Pro
ImageSize        : ... bytes
```

If multiple indexes exist, pick the index that matches **Pro** / **Home** / etc.

## 4.2 Mount the image

**Common mistake:** there must be a **space** between `-ImagePath` and the quoted path.

Wrong:

```powershell
Mount-WindowsImage -Path C:\WinWork\Mount\ -ImagePath"C:\...\install.wim" -Index 1
```

Correct:

```powershell
Mount-WindowsImage -Path "C:\WinWork\Mount" `
  -ImagePath "C:\Users\ewojcik\Downloads\microwin-win11-pro\sources\install.wim" `
  -Index 1
```

Successful mount looks like:

```text
Path          : C:\WinWork\Mount
Online        : False
RestartNeeded : False
```

## 4.3 Add drivers (recursive)

```powershell
Add-WindowsDriver -Path "C:\WinWork\Mount" -Driver "C:\DRIVERS" -Recurse -Verbose
```

- First run may **stop** on the first fatal package; use **`-Verbose`** to see which `.inf` failed.
- If **`amdpmf.inf`** (PMF) fails, remove that folder from `C:\DRIVERS` and run **`Add-WindowsDriver` again** — already-staged drivers typically remain; the second pass completes the rest.

## 4.4 Verify staged drivers (optional)

```powershell
Get-WindowsDriver -Path "C:\WinWork\Mount" | Format-Table -AutoSize ClassName, BootCritical, ProviderName, Version, OriginalFileName
```

You should see **MediaTek**, **AMD**, **Realtek**, **FOCAL**, etc., with paths under `...\DriverStore\FileRepository\...`.

## 4.5 Commit changes and unmount

```powershell
Dismount-WindowsImage -Path "C:\WinWork\Mount" -Save
```

On success, DISM merges changes **into the same `install.wim` file** you passed to `-ImagePath`.

### Logs

Windows appends to:

`C:\Windows\Logs\DISM\dism.log`

For per-package failures, also inspect under the mount (before dismount):

`C:\WinWork\Mount\Windows\INF\setupapi.dev.log`

## 4.6 (Optional) Same drivers into `boot.wim`

If you still hit **boot-critical** / WinPE issues during Setup, repeat **mount → Add-WindowsDriver → Dismount -Save** for **each index** of:

`...\sources\boot.wim`

Discover indices:

```powershell
Get-WindowsImage -ImagePath "C:\Users\ewojcik\Downloads\microwin-win11-pro\sources\boot.wim"
```

Then mount **index 1**, add drivers (smaller set is OK: chipset core + MediaTek + storage if needed), save; repeat for **index 2** (names vary by build — always trust `Get-WindowsImage`).
