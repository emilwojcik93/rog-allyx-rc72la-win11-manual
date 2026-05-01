# WinUtil package list (`winget.json`)

The repository root file **`winget.json`** (next to `README.md` when you clone or download this repo) is an **exported WinUtil automation profile**: an array of **`WPFInstall…`** / **`WPFTweaks…`** / **`WPFFeatures…`** toggle IDs.

## How to use it

Follow [WinUtil automation](https://winutil.christitus.com/userguide/automation/): pass that JSON as **`-Config`** (dry run without **`-Run`**, apply with **`-Run`** after you review).

Example (adjust the path to where you cloned or copied the file):

```powershell
& ([ScriptBlock]::Create((irm "https://christitus.com/win"))) -Config "C:\path\to\rog-allyx-rc72la-win11-manual\winget.json" -Run
```

## IDs drift after updates

WinUtil renames or drops toggles between releases. **After a WinUtil or winget ecosystem update**, open WinUtil, re-export your profile, and diff against this file. Treat the committed list as a **starting template**, not a guaranteed-stable contract.
