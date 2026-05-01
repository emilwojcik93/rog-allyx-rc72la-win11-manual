# Step 3 — ASUS drivers for ROG Ally X (RC72LA)

## Why this step exists (cloud recovery vs your USB / Pro image)

**ASUS Cloud Recovery** applies an image that already matches ROG handheld hardware. If you install from **any other source** (Microsoft ISO, **MicroWin**, modified `install.wim`, another PC’s image), Windows Setup / WinPE may stop early with:

> **Windows Setup could not install one or more boot-critical drivers.**

That message is common when **WinPE** does not load the right **chipset / USB / storage / HID** stack for this device **before** the full OS is laid down. **Injecting ASUS + AMD + MediaTek (etc.) drivers** into **`install.wim`** and (when needed) **`sources\boot.wim`** avoids relying on Cloud Recovery. See [04-dism-offline-drivers.md](04-dism-offline-drivers.md) §4.6.

**Edition note:** Ally X ships with **Windows 11 Home**; using **Pro** does not remove this requirement — you still need the same hardware drivers in the image or in PE.

## Pick the correct support page

Your handheld inventory reports:

- **Manufacturer / model:** ASUSTeK **ROG Ally X** `RC72LA_RC72LA`

Always download from the **ROG Ally X (RC72LA)** helpdesk, **not** from ROG Ally (2023) **RC71L** unless you intentionally target that older device.

Open ASUS support → **Driver & Tools** → **Windows 11 64-bit** → download **ZIP** packages and extract each into `C:\DRIVERS\` (one folder per package is fine).

Polish site tree example (select **your** exact model in the selector):

- [ROG handhelds — ASUS Poland](https://rog.asus.com/pl/gaming-handhelds/rog-ally/rog-ally-2023/helpdesk_download/) — **example only**; switch the product to **Ally X / RC72LA** in the UI.

## Required / strongly recommended driver packages (for offline DISM)

These map to typical Ally X components and match what you already validated on **build 26200**:

| Category | Typical ASUS package | Notes |
|----------|----------------------|--------|
| Chipset | **AMD Chipset** (DriverOnly) | Core GPIO / I2C / PSP / MicroPEP / SFH — **exclude** failing PMF folder if present (see DISM doc). |
| Graphics | **AMD Graphics** | Large; can be installed post-setup instead if you prefer smaller WIM. |
| Wireless | **MediaTek WLAN** (+ BT in same drop often) | Wi‑Fi / BT. |
| USB LAN | **Realtek LAN** | USB Ethernet dongle class drivers (`RTL8153B` family on many Ally docs). |
| Fingerprint | **FOCAL** *or* **EGIS** | **RC72LA ships two SKUs** — see [troubleshooting-fingerprint.md](troubleshooting-fingerprint.md). Wrong package = no `Biometric` device in PnP. |
| Motion | **Bosch G-sensor** | Accelerometer. |
| Audio | **Realtek Audio** + **Cirrus SmartAMP** | Speaker / jack stack; add if missing from your `C:\DRIVERS`. |
| Card reader | **XG Mobile** Genesys + optional **internal SD** Genesys package | Different chips; add the one your device needs. |
| Controller | **ROG Raikiri / GD300** INF | If listed for your SKU. |
| Optional | **Dolby Atmos** (INF subtree) | Only if you want Dolby in the image; your verbose run showed `dax3_*.inf` adding successfully. |

## Do **not** feed these through `Add-WindowsDriver` as folders

- **Armoury Crate** / **MyASUS** / **GlideX** installers — applications; install later or skip in favor of **G-Helper**.
- **MCU / PD firmware “tools”** — run from a working OS or BIOS workflow, not as DISM driver folders.
- **PMF (Platform Management Framework)** — `amdpmf.inf` from **PMF_7040Series** repeatedly **failed** offline on your image; **delete that subfolder** before `Add-WindowsDriver`, or skip PMF entirely (handheld works without it in the WIM for most setups).

## Clean `C:\DRIVERS` before DISM

Remove from the **AMD Chipset** tree if present:

- `PMF_7040Series Driver\` (contains `amdpmf.inf` — known **failure** on your MicroWin `install.wim`).
- `ROGScreenManager\` (MSI app).
- `Package\` (MSI).
- `Install.bat` (launcher only).

Example (paths vary by extracted folder name):

```powershell
Remove-Item -LiteralPath "C:\DRIVERS\<ChipsetFolder>\PMF_7040Series Driver" -Recurse -Force -ErrorAction SilentlyContinue
```

## Snappy Driver (explicitly out of scope)

**Do not** use Snappy-style bulk installers for this project — they pull unrelated packages and conflict with ASUS-class devices. Use **DISM + ASUS zips + G-Helper** updates instead.
