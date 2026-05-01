# Step 6 - After Windows is on the Ally X (RC72LA)

## 6.1 G-Helper

Use **[G-Helper](https://github.com/seerge/g-helper)** for power modes, GPU modes, fans, charge cap, display, LEDs where supported, and **driver / BIOS links** for your model. Install **ASUS System Control Interface v3** from ASUS if G-Helper reports it missing. **Behavior, updates, and troubleshooting** are covered in the **official G-Helper repository** (README and issues), not duplicated here.

## 6.2 Apps and tweaks (winget or WinUtil only)

- **Single packages:** use **`winget install …`** as documented by Microsoft / package publishers.
- **Bulk profile:** use **[WinUtil](https://github.com/ChrisTitusTech/winutil)**. **Automation flags**, **`-Config` / `-Run`**, and **examples** are in [WinUtil automation](https://winutil.christitus.com/userguide/automation/). This repo only keeps a sample ID list in [winget-profile.md](winget-profile.md) and **`winget.json`** at the repo root; **do not treat this site as a second WinUtil manual.**

## 6.3 Optional: OpenSSH Server

Not part of this minimal path. If you want it, use **WinUtil** optional features / toggles described in **WinUtil’s own docs** (names change between releases).

## 6.4 Name and address on the LAN

Rename the PC under **Settings → System → About** if you like. On the device, **Windows Terminal** → **`ipconfig`** shows the current **IPv4** (DHCP can change it).

## 6.5 Maintenance

1. Firmware from **ASUS** when you care about the release notes.
2. **G-Helper → Updates** for driver deltas (upstream project explains the flow).
3. **Windows Update** for payloads deferred by a slim image.
