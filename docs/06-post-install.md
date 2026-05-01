# Step 6 — After Windows is on the Ally X (RC72LA)

## 6.1 G-Helper (primary control plane)

Use **[G-Helper](https://github.com/seerge/g-helper)** for:

- Performance modes (**Silent / Balanced / Turbo**) aligned with BIOS.
- GPU modes (Eco / Standard / Ultimate / Optimized where supported).
- Fan curves, power limits, battery charge cap, display refresh, LEDs / matrix where applicable.
- **Driver and BIOS update links** resolved from the official ASUS site for your model.

G-Helper is **not** a kernel replacement; it drives the same **ASUS System Control Interface** class stack Armoury uses. Install **ASUS System Control Interface v3** from ASUS if G-Helper reports it missing.

## 6.2 WinUtil automation (your saved profile)

Chris Titus **WinUtil** supports applying a saved JSON:

Documentation: [WinUtil — Automation](https://winutil.christitus.com/userguide/automation/)

**Review / dry run (no apply):**

```powershell
& ([ScriptBlock]::Create((irm "https://christitus.com/win"))) -Config "C:\Path\To\Config.json"
```

**Apply:**

```powershell
& ([ScriptBlock]::Create((irm "https://christitus.com/win"))) -Config "C:\Path\To\Config.json" -Run
```

Keep `Config.json` **private** if it encodes aggressive removals (Edge, Defender tweaks, etc.). Do **not** commit secrets to this repo.

## 6.3 SSH access (`ally-ewojcik`)

You renamed the device and use SSH for administration.

- Prefer **key-based** auth; for **admin** accounts on Windows OpenSSH, remember **`administrators_authorized_keys`** under `C:\ProgramData\ssh\` may be required (see your local audit notes).
- Audit artifacts from a previous investigation live under:

`C:\DRIVERS\remote-audit\`

…including `AI-CONTEXT.md` and `remote-inventory-report.txt` (hostname **DESKTOP-VPB4O1D**, LAN **192.168.0.150** at time of audit — update if DHCP changes).

## 6.4 Debloat philosophy (optional reading)

- [Bald Sea Lion — Windows OS Debloat](https://baldsealion.com/ROG-ALLY-Ultimate-Windows-Guide/Windows-OS-Debloat) — conservative take on custom ISOs; useful context even if you use MicroWin.
- Community index: [mikeroyal/Asus-ROG-Ally-Guide](https://github.com/mikeroyal/Asus-ROG-Ally-Guide).

## 6.5 Next maintenance

1. BIOS / MCU / PD firmware from ASUS when release notes matter to you.
2. **G-Helper → Updates** for driver deltas.
3. **Windows Update** after install to pick up **.NET / security** payloads MicroWin may defer.
