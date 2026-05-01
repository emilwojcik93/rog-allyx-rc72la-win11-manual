# Step 1 — Download official Windows 11 (x64 ISO)

Use Microsoft’s **software download** page for your locale (Polish example):

- [Download Windows 11 (Microsoft, pl-PL)](https://www.microsoft.com/pl-pl/software-download/windows11)

Under **“Pobierz obraz dysku z Windows 11 (ISO) dla urządzeń x64”** (or the English equivalent), pick:

- **Edition** that matches your license intent (e.g. **Windows 11** multi-edition ISO).
- **Language** you will install (must match product/locale expectations).
- **64-bit (x64)** — Ally X is **x64**, not Arm64.

## Example: confirm the file

After download (path is an example):

```powershell
Get-Item "C:\Users\ewojcik\Downloads\Win11_25H2_Polish_x64.iso" | Format-List Name, Length, LastWriteTime
```

## Optional: mount ISO instead of extracting

```powershell
Mount-DiskImage -ImagePath "C:\Users\ewojcik\Downloads\Win11_25H2_Polish_x64.iso"
Get-Volume | Where-Object FileSystemLabel -match "CCCOMA" | Format-List DriveLetter, FileSystemLabel
```

Note the **drive letter** of the mounted ISO (e.g. `F:`). You will point MicroWin at:

`F:\sources\install.wim` (and the rest of `F:\` as the source layout).

Unmount when finished:

```powershell
Dismount-DiskImage -ImagePath "C:\Users\ewojcik\Downloads\Win11_25H2_Polish_x64.iso"
```
