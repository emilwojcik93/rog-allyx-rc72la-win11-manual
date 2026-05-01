# WinUtil package list (`winget.json`)

The repo root file **`winget.json`** is an **exported WinUtil automation profile** ( **`WPFInstall…`**, **`WPFTweaks…`**, **`WPFFeatures…`** IDs). **How WinUtil loads JSON, dry-run, apply, and what each toggle does** belongs in **[WinUtil automation](https://winutil.christitus.com/userguide/automation/)** and the **[winutil repo](https://github.com/ChrisTitusTech/winutil)** - not re-documented here.

Point WinUtil at your copy of the file (path after clone or download):

```powershell
& ([ScriptBlock]::Create((irm "https://christitus.com/win"))) -Config "C:\path\to\rog-allyx-rc72la-win11-manual\winget.json" -Run
```

Omit **`-Run`** for a dry run if the upstream docs still describe that flow.

## IDs drift after updates

WinUtil renames or drops toggles between releases. Re-export from WinUtil and diff against **`winget.json`** here; this file is a **template**, not a stable contract.
