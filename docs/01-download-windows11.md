# Step 1 - Download official Windows 11 (x64 ISO)

Use Microsoft’s software download page:

- [Download Windows 11 (Microsoft, en-US)](https://www.microsoft.com/en-us/software-download/windows11)

Create the ISO through the site’s flow (disk image section for x64 devices).

## Confirm the file (example paths)

```powershell
Get-Item "C:\Users\YourName\Downloads\Win11_x64.iso" | Format-List Name, Length, LastWriteTime
```

## Optional: mount the ISO

```powershell
Mount-DiskImage -ImagePath "C:\Users\YourName\Downloads\Win11_x64.iso"
Get-Volume | Where-Object FileSystemLabel -match "CCCOMA" | Format-List DriveLetter, FileSystemLabel
```

Note the drive letter (for example `F:`). MicroWin will need `F:\sources\install.wim` (and the rest of that layout).

Unmount when finished:

```powershell
Dismount-DiskImage -ImagePath "C:\Users\YourName\Downloads\Win11_x64.iso"
```
