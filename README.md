# NVR Stream Spec Hub (Agentic Edition)

[![Deploy to GitHub Pages](https://github.com/kreier/nvr/actions/workflows/static.yml/badge.svg)](https://github.com/kreier/nvr/actions/workflows/static.yml)
[![Agentic Spec Sync](https://github.com/kreier/nvr/actions/workflows/agent-scraper.yml/badge.svg)](https://github.com/kreier/nvr/actions/workflows/agent-scraper.yml)

An **agentic**, autonomous surveillance specification directory and static web application built with **Vite**, **React**, and **Tailwind CSS**. 

The goal is to provide a complete, verified overview of available **NVR and hybrid XVR/DVR models** with their model numbers and exact maximum concurrent video stream capabilities for **1, 2, 3, and 4 channels** across the major surveillance brands:
- **Hikvision**
- **Dahua**
- **IMOU**
- **KBVISION**

---

## 🚀 Live Demo & Deployment

- **Live Static Web Application**: [https://kreier.github.io/nvr/](https://kreier.github.io/nvr/)
- Built with Vite and automatically deployed to GitHub Pages via GitHub Actions.

---

## 📹 Core Specification Focus: 1, 2, 3 & 4 Channel Streams

Surveillance recorders feature hardware SoC video decoders with finite pixel processing ceilings. The application highlights what maximum video resolution and frame rate can be achieved across concurrent channel layouts:

| Channel Layout | Capability Description | Typical Example (4K NVR) |
| :--- | :--- | :--- |
| **1-Channel Max Stream** | Single-camera full playback / live decoding limit | `1-ch @ 8 MP (4K) (30 fps)` |
| **2-Channel Max Stream** | Dual split-screen simultaneous decoding | `2-ch @ 4 MP (30 fps)` |
| **3-Channel Max Stream** | Tri-split concurrent decoding budget | `3-ch @ 3 MP / 4 MP (30 fps)` |
| **4-Channel Max Stream** | Standard quad (2x2) synchronous playback | `4-ch @ 1080p (30 fps)` |

---

## 🎯 Featured Example Models

All requested example models are verified and cataloged:

- **KBVISION**:
  - `KX-DAi8108H3-5M`: 8-ch Penta-brid AI DVR (up to 12 IP channels up to 6MP), Face Recognition, SMD Plus, 64 Mbps.
  - `KX-DAi8104H3-5M`: 4-ch Penta-brid AI DVR (up to 6 IP channels up to 6MP), 32 Mbps.
  - `KX-A8104N2`, `KX-A8108N2`, `KX-C4K8104N2`, `KX-C4K8108N2`
- **Hikvision**:
  - `DS-7104NI-Q1` / `DS-7104NI`: 4-ch Mini 1U NVR (`1-ch @ 6MP`, `2-ch @ 4MP`, `4-ch @ 1080p`).
  - `iDS-7208HQHI-M1/E`: 8-ch AcuSense DVR with 8-ch synchronous playback and Motion Detection 2.0.
  - `DS-7204HGHI-M1`: 4-ch 1080p Lite Turbo HD DVR with IP camera expansion.
  - `DS-7208HGHI-M1`: 8-ch 1080p Lite Turbo HD DVR with IP camera expansion.
  - `DS-7604NI-K1/4P`, `DS-7608NI-K2`, `DS-7616NI-I2`
- **Dahua**:
  - `NVR4104HS-4KS2/L`, `NVR4108HS-4KS2/L` (4K Lite series, 80 Mbps)
  - `NVR2104HS-4KS2`, `NVR2108HS-4KS2`
  - `NVR5216-4KS2` (Pro AI 16-channel, 320 Mbps)
- **IMOU**:
  - `N14P` (4-Port PoE 4K NVR)
  - `N18P` (8-Port PoE 4K NVR)
  - `NVR1104HS-W-S2` (4-Channel Wireless Wi-Fi NVR)
  - `NVR1108HS-W-S2` (8-Channel Wireless Wi-Fi NVR)

---

## 🤖 Agentic Architecture & Automation

This repository operates autonomously through agentic data pipelines:

```text
[Datasheets & Web Catalogs]
            │
            ▼
[scripts/agent-scraper.js] ──> Heuristic SoC Decoding Normalizer (1/2/3/4 Ch)
            │
            ├──> src/data/nvr-models.json & public/nvr-models.json
            └──> src/data/metadata.json
            │
            ▼
[scripts/verify-data.js]   ──> Automated Integrity & Schema Assertion
            │
            ▼
[Vite Build Engine]        ──> Dist Static Artifacts
            │
            ▼
[GitHub Pages CI/CD]       ──> Live Static Web Deployment
```

### CLI Commands

```bash
# Install dependencies
npm install

# Run the agentic scraper to scrape, infer, and update models
npm run scrape

# Verify data integrity (validates all 1, 2, 3, 4 channel specs)
npm run agent:verify

# Start local development server with Vite
npm run dev

# Build production static website for deployment
npm run build
```

---

## 🛠️ Interactive Web Features

1. **Brand & Channel Filters**: Instant filtering by brand (Hikvision, Dahua, IMOU, KBVISION), channel count (4, 8, 16), or device type (NVR vs XVR/DVR).
2. **Side-by-side Model Comparator**: Compare up to 4 models simultaneously across their full 1/2/3/4 channel stream matrices.
3. **Interactive Stream Load Simulator**: Select any recorder and configure target camera resolutions to see real-time decoding budget utilization and overload warnings.
4. **Data Export**: One-click export to **CSV** or **JSON** for engineering estimates and planning.
5. **Technical Detail Modal**: Inspect full specifications, SATA bays, PoE interfaces, AI capabilities, and raw JSON schema.
