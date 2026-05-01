# Step 4 - Offline driver injection into `install.wim` (DISM / PowerShell)

Without injection (or Cloud Recovery), a **generic** Windows 11 USB often fails at the **beginning** with **boot-critical drivers** on Ally X class hardware. Servicing **`install.wim`** fixes the installed OS copy; servicing **`boot.wim`** (section 4.6) fixes **early Setup / WinPE** when the error appears before disk selection.

Replace paths with yours:

- **Source WIM:** `C:\path\to\microwin-win11-pro\sources\install.wim`
- **Mount point:** `C:\WinWork\Mount`
- **Drivers:** `C:\DRIVERS` (cleaned per [03-drivers-asus.md](03-drivers-asus.md))

Run PowerShell **as Administrator**.

## 4.1 List editions / indexes

```powershell
Get-WindowsImage -ImagePath "C:\path\to\microwin-win11-pro\sources\install.wim"
```

Pick the **Index** that matches your edition (Pro, Home, …).

## 4.2 Mount the image

There must be a **space** between `-ImagePath` and the quoted path.

Wrong:

```powershell
Mount-WindowsImage -Path C:\WinWork\Mount\ -ImagePath"C:\...\install.wim" -Index 1
```

Correct:

```powershell
Mount-WindowsImage -Path "C:\WinWork\Mount" `
  -ImagePath "C:\path\to\microwin-win11-pro\sources\install.wim" `
  -Index 1
```

## 4.3 Add drivers (recursive)

```powershell
Add-WindowsDriver -Path "C:\WinWork\Mount" -Driver "C:\DRIVERS" -Recurse -Verbose
```

- First run may **stop** on the first fatal package; **`-Verbose`** shows which `.inf` failed.
- If **`amdpmf.inf`** (PMF) fails, remove that folder from `C:\DRIVERS` and run **`Add-WindowsDriver` again**. Already-staged drivers usually remain.

## 4.4 Verify (optional)

```powershell
Get-WindowsDriver -Path "C:\WinWork\Mount" | Format-Table -AutoSize ClassName, BootCritical, ProviderName, Version, OriginalFileName
```

## 4.5 Commit and unmount

```powershell
Dismount-WindowsImage -Path "C:\WinWork\Mount" -Save
```

Logs: `C:\Windows\Logs\DISM\dism.log` and, before dismount, `C:\WinWork\Mount\Windows\INF\setupapi.dev.log`.

## 4.6 (Optional) Same drivers into `boot.wim`

If Setup still fails in WinPE, repeat **mount → Add-WindowsDriver → Dismount -Save** for **each index** of `...\sources\boot.wim`:

```powershell
Get-WindowsImage -ImagePath "C:\path\to\microwin-win11-pro\sources\boot.wim"
```

Mount **index 1**, add a **smaller** driver set (chipset + MediaTek + storage if needed), save; repeat for **index 2** (names vary - trust `Get-WindowsImage`).
