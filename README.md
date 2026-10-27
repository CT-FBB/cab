# 🗄️ TPC05-SP-OLT9U Telecom Outdoor Cabinet 3D Model & Interactive Engineering Documentation

An interactive WebGL 3D model viewer and technical documentation web application for True Corporation's **TPC05-SP-OLT9U** Outdoor Telecom Cabinet (9U Subrack + 2U DC-PDB + 1U Huawei ETP4830-A1 Rectifier + ZTE ZXA10 C610 OLT + FWDM + MOSSMAN EDFA + 2x Lithium Battery Packs + ODF Side Compartment).

---

## 🌟 Highlights & Key Features

### 1. 🖥️ Interactive 3D WebGL Viewer (`pages/cabinet-3d.html`)
- **Three.js OrbitControls with Full 360° & Vertical Underside Orbit**: Drag to rotate, scroll to zoom, right-click to pan. Allows full top-to-bottom vertical inspection (`⬇️ Bottom` & `⬆️ Top`).
- **Interactive Door Controls**:
  - **Front Door**: Full-height steel door covering from roof to floor (subrack and lithium batteries), with EU4 pleated air filters, 3-point latch handle, and louvred vents.
  - **Side Door (ODF Compartment)**: Left-to-right swinging steel door with inner document pockets (Fiber Distribution Diagram & Operation Manual) and ground bonding stud.
- **Component Visibility Toggles**: Toggle individual layers on/off (Roof Cooling Fans, DC-PDB, Huawei Rectifier, Subrack Equipment, Lithium Batteries, Ground Busbar).
- **Camera View Presets**:
  - `🏠 Default`: Overview isometric angle
  - `👁️ Front`: Direct front bayface view
  - `🚪 ODF Side`: Auto-swings open side door and frames the 48-core ODF & AC distribution panel
  - `⏚ Ground Bar`: Close-up inspection of master copper ground busbars, ring terminal lugs, red torque seal paint marks, and wire identification tags
  - `⚡ DC-PDB`: 2U DC Power Distribution Board
  - `🔌 Rectifier`: Huawei ETP4830-A1 1U Telecom DC Power System
  - `🔍 OLT / EDFA`: ZTE C610 OLT (1U), FWDM (1U), and MOSSMAN EDFA (1U)
  - `🔋 Battery`: Dual stacked lithium battery modules with BMS wiring
  - `⬇️ Bottom`: Underside view of cabinet plinth, M12 anchor bolts, and PG cable glands
  - `⬆️ Top`: Roof fan tray and weather shield view

### 2. ⚡ Accurate Equipment Models & Photo-Real Textures
- **Huawei ETP4830-A1 (1U)**: AC input terminal with transparent safety flip-cover, SMU controller, R4815N rectifiers, fuses, and DC output sockets.
- **DC-PDB (2U)**: 2P AC breaker, dual SPD modules, DC load breakers, and copper busbars.
- **ZTE ZXA10 C610 OLT (1U)**: 16-port GPON/Combo PON OLT chassis, uplink ports, and left ear ground stud.
- **FWDM (1U)**: Filter Wavelength Division Multiplexing unit with COM, CATV, and GPON SC/APC adapters.
- **MOSSMAN ML-OAH Series EDFA (1U)**: 1550nm optical amplifier with front LCD display, optical ports, and dual DC feeds.
- **Lithium Battery Stack**: 2x 48V Lithium-ion battery packs with front heatsink fins, DC power lugs, and BMS grounding.
- **Grounding Busbar System**:
  - Solid copper busbar with red standoff insulators (1kV rated).
  - Tinned copper ring terminal lugs (หางปลาแบบกลม) at **both ends** (equipment mounting ears & busbar studs).
  - Red QC torque seal paint marks (เส้นสีแดงแต้มกันคลาย) across screw heads.
  - Yellow ground warning stickers `(⏚)`.
  - True Standard identification tags (`FM: ... / TO: MASTER GND`).
- **ODF Side Compartment Layout**:
  - Dual white cylindrical fiber slack storage spools.
  - 48-Core SC/APC vertical adapter array (groups 1-6 to 43-48).
  - White fiber splice cassette with black velcro strap.
  - AC 220V Distribution & SPD panel box with MCB breakers, surge protector, 3-pin utility socket, and caution label.

### 3. 📐 Technical Documentation & Engineering CAD Drawings
- Embedded CAD drawing modal with high-res technical schematics, site installation reference photos, and decoded part numbers.
- **Pages**:
  - `index.html`: Portal dashboard and cabinet portfolio
  - `pages/cabinet-detail.html`: Specification breakdown, thermal capacity, and dimensions
  - `pages/equipment.html`: Equipment catalog and technical datasheets
  - `pages/cabinet-3d.html`: 3D WebGL interactive model viewer

---

## 📁 Repository Structure

```text
git-cab/
├── index.html                   # Project landing page & cabinet navigation
├── README.md                    # Project documentation & reference
├── .gitignore                   # Git ignore file for OS & editor artifacts
├── pages/
│   ├── cabinet-3d.html          # Interactive Three.js 3D Cabinet Viewer
│   ├── cabinet-detail.html      # TPC05-SP-OLT9U technical specifications
│   └── equipment.html           # Subrack & rectifier equipment catalog
└── assets/
    ├── css/
    │   └── style.css            # Responsive dark-theme styling
    ├── js/
    │   ├── app.js               # Dashboard & catalog logic
    │   └── equipment_textures.js # Embedded procedural & photo textures
    ├── img/                     # High-res CAD diagrams, site photos & textures
    └── equipment_ref/           # Manual & datasheet reference crops
```

---

## 🚀 How to Run Locally

You can open the web app directly in any modern browser supporting WebGL (Chrome, Edge, Safari, Firefox):

### Option A: Local Python Server (Recommended)
```bash
# Navigate to the git-cab directory
cd git-cab

# Start a local HTTP server
python3 -m http.server 8080

# Open in your browser
# http://localhost:8080/index.html
# http://localhost:8080/pages/cabinet-3d.html
```

### Option B: Direct File Opening
Double click `index.html` or `pages/cabinet-3d.html` to open directly in your web browser.

---

## 🛠️ Built With
- **Three.js** (r128) — 3D scene rendering, lighting, materials, and camera math
- **OrbitControls** — Smooth damping orbit navigation
- **HTML5 Canvas** — Dynamic procedural textures for panels, tags, and diagrams
- **Pure CSS3 & Vanilla JavaScript** — Zero framework overhead, ultra-fast load time

