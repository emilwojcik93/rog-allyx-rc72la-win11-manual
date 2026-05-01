# Step 2 - MicroWin (CodingWonders)

This guide does **not** duplicate the upstream manual. Use **[CodingWonders/MicroWin](https://github.com/CodingWonders/MicroWin)** for **releases**, **UI options**, **debloat choices**, **signing / antivirus notes**, **Rufus vs double-patching**, and everything else the authors document there.

## Run MicroWin (one-liner from upstream)

Review the **security model** of `Invoke-WebRequest` + `Invoke-Expression` in the official README before you run this:

```powershell
powershell -ExecutionPolicy Bypass -Command "iwr -useb https://raw.githubusercontent.com/CodingWonders/MicroWin/refs/heads/main/Microwin.ps1 | iex"
```

## Ally-specific hint only

After MicroWin produces an ISO and you put it on USB, this repo assumes a normal Windows layout under `sources\` (**`install.wim`**, **`boot.wim`**, **`setup.exe`**) as described in upstream docs. For **driver folders** before any optional in-tool import, prepare **`C:\DRIVERS`** per [03-drivers-asus.md](03-drivers-asus.md), then continue with [04-dism-offline-drivers.md](04-dism-offline-drivers.md) if you inject offline instead.
