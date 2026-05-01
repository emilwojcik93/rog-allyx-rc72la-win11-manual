# Fingerprint: "We couldn't find a fingerprint scanner" (ROG Ally X RC72LA)

## Root cause (hardware variants)

**ROG Ally X RC72LA** units ship with **one of two** fingerprint USB stacks:

| Vendor | Typical USB ID | ASUS driver package |
|--------|----------------|---------------------|
| **FocalTech** | `USB\VID_2808&PID_A753` | **FOCAL** Fingerprint (FtWbio UMDF) |
| **EgisTec** | `USB\VID_1C7A&PID_0588` | **EGIS** Fingerprint |

The **FOCAL** INF (`FtWbioDriverUmdf.inf`) only matches **`USB\VID_2808&PID_A753`**. On **Egis** (`1C7A:0588`), FOCAL may **stage** but **nothing binds** - **PnP has no `Biometric` class device** - Windows Hello shows **no scanner**.

This is **not** fixed by generic "debloat" alone when **`HKLM\SOFTWARE\Policies\Microsoft\Biometrics`** is absent.

## Verify on the handheld (PowerShell)

```powershell
Get-PnpDevice | Where-Object { $_.InstanceId -match 'VID_2808&PID_A753' }

Get-PnpDevice | Where-Object { $_.InstanceId -match 'VID_1C7A&PID_0588' } |
  Format-List Status, Class, FriendlyName, InstanceId
```

If you see **`USB\VID_1C7A&PID_0588`** as a **USB** device before EGIS install, use the **EGIS** package from ASUS for **RC72LA**, not Focal.

```text
pnputil /enum-devices /class Biometric
# "No devices were found" = no bound WBF biometric driver yet
```

## Fix (manual)

1. ASUS support - **ROG Ally X (2024) RC72LA** - **Driver & Tools** - **Windows 11 64-bit**.
2. Download **EGIS Fingerprint Driver** (or **FOCAL** if your hardware ID matches Focal).
3. Run the vendor installer or **Device Manager → Update driver** pointed at the extracted INF folder.
4. Reboot.
5. Optional: set **Windows Biometric Service** to automatic:

```powershell
Set-Service WbioSrvc -StartupType Automatic
Start-Service WbioSrvc
```

6. **Settings → Accounts → Sign-in options → Fingerprint recognition**.

## If you already installed the wrong package

- Install the correct vendor package, then run **Windows Update** optional drivers once.
- Remove unused packages from the driver store with **RAPR** - [troubleshooting-driver-store-rapr.md](troubleshooting-driver-store-rapr.md) (`winget install lostindark.DriverStoreExplorer`, search `Focal` / `FtWbio`, delete or **force delete** if needed).

## References

- Focal vs Egis split (Linux-oriented thread, still useful IDs): [bazzite issue #3752](https://github.com/ublue-os/bazzite/issues/3752).
- **G-Helper** links to official ASUS driver pages per model: [seerge/g-helper](https://github.com/seerge/g-helper).
