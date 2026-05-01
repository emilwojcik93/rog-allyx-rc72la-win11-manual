# Driver Store Explorer (RAPR) - clean old / wrong / Dolby packages

Use **[Driver Store Explorer](https://github.com/lostindark/DriverStoreExplorer)** (**RAPR**) when **`pnputil`** or **Settings → Apps** does not remove a driver package cleanly - for example **unused FOCAL** after switching to **EGIS**, or **Dolby Atmos** packages that resist normal uninstall.

Read the upstream README once: the tool **modifies the Windows driver store**; wrong deletions can break boot. Prefer deleting packages you recognize and **create a restore point** first: [lostindark/DriverStoreExplorer](https://github.com/lostindark/DriverStoreExplorer).

## Install (winget)

```powershell
winget install lostindark.DriverStoreExplorer --accept-source-agreements --accept-package-agreements
```

Launch:

```powershell
rapr
```

Or start **Driver Store Explorer** from the Start menu. Run **as Administrator**.

## Basic workflow

1. **Create a restore point** (recommended): **Settings → System → About → System protection** → **Create** for `C:`.
2. Open **Driver Store Explorer** elevated; wait for the list to load.
3. Search examples:
   - `Focal` / `FtWbio` / `ftwbio` - wrong fingerprint vendor on an **Egis** unit.
   - `Dolby` / `DAX3` / `dax3` - Dolby / APO extension packages.
4. Select rows; verify **Provider**, **Driver Class**, **Version**, **Device name**.
5. **Delete Driver(s)**.

If deletion fails, use **force** (next section).

## Force delete (Dolby and similar)

1. Search **`Dolby`**, **`DAX3`**, or the **`.inf`** name from **Device Manager → Driver → Driver Details**.
2. Select the row.
3. **Delete Driver(s)**; enable **Force Deletion** / **Force remove** if the UI offers it (wording varies by RAPR version).
4. If several Dolby rows exist, remove **obsolete** versions first; keep what your current Realtek stack still needs if you use Dolby.

**After force removal:** reboot. Reinstall from **ASUS** or **Microsoft Store** only if you still need Atmos.

## Tips

- **Old drivers:** RAPR can **select old driver(s)** when multiple versions exist - review before delete.
- **Gray device names:** disconnected hardware; safe to remove if you will reinstall when reconnecting.
- **Export** in RAPR backs up selected packages before aggressive cleanup.

## Command-line alternative

```powershell
pnputil /enum-drivers | findstr /i dolby dax3 focal ftwbio
# pnputil /delete-driver oemNNN.inf /uninstall /force
```

## Related docs

- [troubleshooting-fingerprint.md](troubleshooting-fingerprint.md) - Focal vs Egis; wrong stack removal.
- [03-drivers-asus.md](03-drivers-asus.md) - what to inject vs install live.
