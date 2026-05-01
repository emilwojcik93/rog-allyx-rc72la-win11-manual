# Driver Store Explorer (RAPR) — clean old / wrong / Dolby packages

Use **[Driver Store Explorer](https://github.com/lostindark/DriverStoreExplorer)** (also known as **RAPR**) when **`pnputil`** or **Settings → Apps** does not remove a driver package cleanly — for example **unused FOCAL** fingerprint packages after switching to **EGIS**, or **Dolby Atmos** extension packages that resist normal uninstall.

Upstream warning (read once): the tool **modifies the Windows driver store**; wrong deletions can break boot or devices. Prefer **deleting only packages you recognize** and **create a restore point** first. See the project README: [lostindark/DriverStoreExplorer](https://github.com/lostindark/DriverStoreExplorer).

## Install (winget)

From an elevated PowerShell or terminal:

```powershell
winget install lostindark.DriverStoreExplorer --accept-source-agreements --accept-package-agreements
```

Launch after install (name may vary by version):

```powershell
rapr
```

Or start **Driver Store Explorer** from the Start menu. Always run **as Administrator** (right-click → **Run as administrator**).

## Basic workflow

1. **Create a restore point** (optional but recommended):  
   **Settings → System → About → System protection** → **Create** for drive `C:`.
2. Open **Driver Store Explorer** elevated.
3. Wait for the driver list to finish loading (status bar).
4. Use the **search box** to filter (examples):
   - `Focal` / `FtWbio` / `ftwbio` — wrong fingerprint vendor packages on an **Egis** unit.
   - `Dolby` / `DAX3` / `dax3` — Dolby Atmos / APO extension packages.
5. **Select** the row(s) you intend to remove. Check **Provider**, **Driver Class**, **Version**, and **Device name** (if shown) so you do not delete a package still in use for real hardware.
6. Click **Delete Driver(s)**.

If Windows reports the package is **in use** or deletion fails, use **force** (next section).

## Force delete (Dolby Atmos and similar)

Dolby-related packages (`dax3_*.inf`, Realtek extension pairs, etc.) sometimes stay registered even after “uninstall” from an app, or block removal because a **software component** or **audio processing** stack still references them.

In **Driver Store Explorer**:

1. Find the package (search **`Dolby`** or **`DAX3`** or the exact **`.inf`** name you saw in Device Manager → Driver → **Driver Details**).
2. Select the row.
3. Use **Delete Driver(s)** and, if the UI offers it, enable **Force Deletion** / **Force remove** (wording varies by RAPR version — it maps to removing packages that are harder to drop).
4. If multiple Dolby rows exist (extension + SWC + HSA), remove **obsolete** versions first; keep the one actually bound to your current Realtek stack if you still need Dolby.

**After force removal:**

- Reboot.
- Reinstall **only** the Dolby / Realtek bundle you want from **ASUS** or **Microsoft Store** if you still need Atmos; otherwise rely on stock Realtek + Windows spatial sound.

## Tips from upstream behavior

- **Old drivers:** RAPR can **select old driver(s)** when several versions of the same oem inf exist — review the list before confirming delete.
- **Gray device names:** packages tied to **disconnected** devices; deleting them is fine if you will not reconnect that hardware without reinstalling drivers.
- **Export:** use **Export** in RAPR to back up selected packages to a folder before aggressive cleanup.

## Command-line alternative (no GUI)

If you prefer not to use a GUI, the same store is managed with **`pnputil`** (less visibility into “old” vs “in use”):

```powershell
pnputil /enum-drivers | findstr /i dolby dax3 focal ftwbio
# Note published name e.g. oem123.inf then:
pnputil /delete-driver oem123.inf /uninstall /force
```

`/force` is the rough equivalent of force delete; it can still fail if Windows refuses. RAPR often surfaces **why** a package is sticky.

## Related docs

- [troubleshooting-fingerprint.md](troubleshooting-fingerprint.md) — Egis vs Focal; removing the wrong fingerprint stack.
- [03-drivers-asus.md](03-drivers-asus.md) — what to inject vs install live.
