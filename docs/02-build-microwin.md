# Step 2 — Build MicroWin image (CodingWonders)

MicroWin was **removed from Chris Titus WinUtil**; the maintained continuation is the **.NET / C#** project:

- **[CodingWonders/MicroWin](https://github.com/CodingWonders/MicroWin)** — read the README, roadmap, and **releases** (e.g. [Releases](https://github.com/CodingWonders/MicroWin/releases)).

The upstream README states the app is **beta**, **not code-signed**, and requires running **as Administrator** (you may need an antivirus exclusion).

## Option A — Install from latest release

1. Open **Releases** on GitHub.
2. Download the **latest** published build archive for Windows x64.
3. Extract to a folder, e.g. `C:\Tools\MicroWin\`.
4. Run the application **as Administrator** and follow its UI to:
   - Select your **official Windows 11 ISO** (or extracted `sources\install.wim` source, per tool guidance).
   - Choose edition (e.g. **Pro**) and debloat options you want.
   - **Driver injection**: if the tool offers importing a folder of extracted drivers, point it at `C:\DRIVERS` **after** you have cleaned problematic packages (see [03-drivers-asus.md](03-drivers-asus.md)).
5. Export/output a **MicroWin ISO** (example name): `microwin-win11-pro.iso`.

## Option B — One-liner installer (from upstream README)

Upstream documents (review before running):

```powershell
powershell -ExecutionPolicy Bypass -Command "iwr -useb https://raw.githubusercontent.com/CodingWonders/MicroWin/refs/heads/main/Microwin.ps1 | iex"
```

Only use this if you accept the security model of **`irm` / `iex`** from GitHub raw content.

## Create bootable USB (first time)

Use **Rufus**:

1. Select the **MicroWin ISO**.
2. Select the USB device.
3. **Important:** if Rufus offers extra **Windows User Experience** / image modification toggles, **disable** them for MicroWin ISOs that are **already** customized — double-patching causes failures (see historical [winutil#3936](https://github.com/ChrisTitusTech/winutil/issues/3936) discussion).

Example output you should see in Explorer on the USB (`E:\`):

- `E:\sources\install.wim`
- `E:\sources\boot.wim`
- `E:\boot`, `E:\EFI`, `E:\setup.exe`, …

## Where `install.wim` lives on extracted ISO

If you use a **folder** layout instead of mounting:

```text
<extracted>\sources\install.wim
<extracted>\sources\boot.wim
```

Example from a real tree:

```powershell
Get-Item "C:\Users\ewojcik\Downloads\microwin-win11-pro\sources\install.wim" | Format-List FullName, Length
```
