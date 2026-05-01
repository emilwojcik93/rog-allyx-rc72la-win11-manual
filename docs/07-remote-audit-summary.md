# Remote audit (local reference)

A **non-destructive** inventory and SSH hardening session was captured for the deployed unit:

| Artifact | Location |
|----------|----------|
| Full narrative | `C:\DRIVERS\remote-audit\AI-CONTEXT.md` |
| Host dump | `C:\DRIVERS\remote-audit\remote-inventory-report.txt` |
| WinUtil-style IDs | `C:\DRIVERS\remote-audit\winget.json` |

**Snapshot facts (2026-05-01 audit):**

- **Model:** ROG Ally X `RC72LA_RC72LA`
- **CPU:** AMD Ryzen Z1 Extreme (8C / 16T)
- **OS:** Windows 11 Pro **26200**
- **Primary disk:** ~1 TB class NVMe, **NTFS**
- **LAN example IP:** `192.168.0.150` (DHCP — may change)
- **OpenSSH:** `sshd` / `ssh-agent` running; config tuned with explicit crypto suites and connection limits (see `AI-CONTEXT.md`)

**Do not** copy those files into this git repo if they contain **history**, **email**, or **keys** you do not want public. Keep them local or redact a public variant.
