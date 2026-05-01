# Step 6 - After Windows is on the Ally X (RC72LA)

## 6.1 G-Helper

Use **[G-Helper](https://github.com/seerge/g-helper)** for performance modes, GPU modes, fan curves, charge cap, display refresh, LEDs where supported, and **driver / BIOS links** for your model. Install **ASUS System Control Interface v3** from ASUS if G-Helper reports it missing.

## 6.2 Apps and tweaks (winget or WinUtil only)

- **Individual packages:** prefer **`winget install …`** for well-known IDs.
- **Bulk tweaker / installer profile:** use **WinUtil** with a JSON config. See [winget-profile.md](winget-profile.md) for this repo’s exported list and drift warning.

Automation docs: [WinUtil - Automation](https://winutil.christitus.com/userguide/automation/).

Dry run (no apply):

```powershell
& ([ScriptBlock]::Create((irm "https://christitus.com/win"))) -Config "C:\path\to\your-config.json"
```

Apply:

```powershell
& ([ScriptBlock]::Create((irm "https://christitus.com/win"))) -Config "C:\path\to\your-config.json" -Run
```

Keep personal configs **private** if they encode aggressive removals.

## 6.3 Optional: OpenSSH Server

Not required for this guide. If you want remote PowerShell over SSH, enable **OpenSSH Server** (and firewall rules) through **WinUtil** optional features / tweaks rather than ad-hoc downloads. See WinUtil’s UI and documentation for the current toggle names.

## 6.4 Name and address on the LAN

Windows may show a **default computer name** until you change it under **Settings → System → About**.

To see this device’s **IPv4** on the network (for example from another PC on the same Wi-Fi), on the handheld open **Windows Terminal** and run:

```powershell
ipconfig
```

Use the **Wireless LAN adapter Wi-Fi** IPv4 address. DHCP can change it after a lease renew.

## 6.5 Maintenance

1. BIOS / MCU / PD firmware from ASUS when release notes matter.
2. **G-Helper → Updates** for driver deltas.
3. **Windows Update** for security and runtime payloads deferred by MicroWin.
