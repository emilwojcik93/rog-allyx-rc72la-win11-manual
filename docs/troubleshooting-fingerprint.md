# Fingerprint: “We couldn’t find a fingerprint scanner” (ROG Ally X RC72LA)

## Root cause (hardware variants)

**ROG Ally X RC72LA** units ship with **one of two** fingerprint USB stacks:

| Vendor | Typical USB ID | ASUS driver package |
|--------|----------------|---------------------|
| **FocalTech** | `USB\VID_2808&PID_A753` | **FOCAL** Fingerprint (FtWbio UMDF) |
| **EgisTec** | `USB\VID_1C7A&PID_0588` | **EGIS** Fingerprint |

The **FOCAL** INF (`FtWbioDriverUmdf.inf`) only declares hardware for **`USB\VID_2808&PID_A753`**. If your device is **Egis** (`1C7A:0588`), installing only FOCAL will **stage a driver in the driver store** but **nothing binds** → **PnP has zero `Biometric` class devices** → Windows Hello shows **no scanner**.

This is **not** explained by “too debloated” or Biometrics GPO when **`HKLM\SOFTWARE\Policies\Microsoft\Biometrics`** is absent.

## Verify on the handheld (PowerShell)

```powershell
# Expect ZERO matches if you only have the wrong vendor driver installed:
Get-PnpDevice | Where-Object { $_.InstanceId -match 'VID_2808&PID_A753' }

# Egis-style bridge (example from a real RC72LA; serial suffix varies):
Get-PnpDevice | Where-Object { $_.InstanceId -match 'VID_1C7A&PID_0588' } |
  Format-List Status, Class, FriendlyName, InstanceId
```

If you see **`USB\VID_1C7A&PID_0588`** as **`USBDevice`** (e.g. **ETU905A86-E**), install the **EGIS** package from ASUS for **RC72LA**, not Focal.

Confirm no biometric node:

```text
pnputil /enum-devices /class Biometric
# "No devices were found" = no bound WBF biometric driver yet
```

## Fix (manual)

1. Open **ASUS support → ROG Ally X (2024) RC72LA → Driver & Tools → Windows 11 64-bit**.
2. Download **EGIS Fingerprint Driver** (device list often mentions **ET170+ET528** or similar).
3. Extract and run the vendor **installer** (or use **Device Manager → Update driver** and point at the extracted INF folder).
4. Reboot.
5. Set **Windows Biometric Service** to start automatically (optional but recommended):

```powershell
Set-Service WbioSrvc -StartupType Automatic
Start-Service WbioSrvc
```

6. Retry **Settings → Accounts → Sign-in options → Fingerprint recognition**.

## If you already installed the wrong package

- After installing **EGIS**, run **Windows Update** optional drivers once.
- Avoid running **Snappy**-class bulk installers (project policy: use ASUS + G-Helper + Update).

## References

- Community note on **two sensor options** on Ally-class hardware: [bazzite issue #3752](https://github.com/ublue-os/bazzite/issues/3752) (Linux context; still documents the **Focal vs Egis** split).
- **G-Helper** ([seerge/g-helper](https://github.com/seerge/g-helper)) links to official ASUS driver pages per model — use it to confirm the latest **EGIS** vs **FOCAL** drop for RC72LA.
