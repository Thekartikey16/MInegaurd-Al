# MineGuard AI — Dataset Documentation

## Overview

This folder contains the **complete structured dataset** powering the MineGuard AI application. All data is modeled after **real Indian coal mining operations** with realistic values, proper cross-references, and adherence to Indian regulatory standards.

> **Note:** This is simulated data for demonstration purposes. It is based on real mine locations, real Indian mining regulations, and realistic operational values — but does not represent actual government records.

---

## Dataset Files

| File | Records | Description |
|------|---------|-------------|
| `mines.csv` | 10 | Coal mine registry with production, risk, compliance, and GPS coordinates |
| `violations.csv` | 12 | Regulatory violations with severity, category, AI detection flags |
| `inspections.csv` | 12 | Government inspection records with compliance scores |
| `safety_incidents.csv` | 7 | Workplace safety incidents (fire, roof fall, gas exposure, etc.) |
| `compliance.csv` | 15 | Regulatory compliance requirements per mine |
| `corrective_actions.csv` | 8 | Violation remediation tracking with deadlines |
| `environmental_readings.csv` | 360 | Monthly sensor readings (AQI, dust, pH, noise, CO, SO₂) for all 10 mines |
| `alerts.csv` | 11 | System-generated alerts (critical, high, medium, low) |
| `ai_insights.csv` | 8 | AI-generated risk assessments, predictions, and pattern detections |
| `users.csv` | 6 | User accounts with RBAC roles (admin, inspector, operator, auditor) |
| `documents.csv` | 10 | Document registry (licenses, clearances, certificates) |
| `audit_logs.csv` | 15 | Activity audit trail with user actions and timestamps |

**Total: ~464 records across 12 CSV files**

---

## Data Sources & Standards

### Mine Locations
All 10 mines are based on **real Indian coal mining regions**:
- Gevra (Korba, Chhattisgarh) — world's largest coal mine
- Jharia (Dhanbad, Jharkhand) — historically fire-prone coalfield
- Talcher (Angul, Odisha) — major MCL underground operations
- Kusmunda (Surguja, Chhattisgarh) — SECL super opencast mine
- Rajmahal, Sonepur Bazari, Singrauli, Singareni, Wani, Basundhara

### Regulatory Framework Referenced
| Regulation | Category |
|-----------|----------|
| Mines Act, 1952 | Safety, Labor |
| Coal Mines Regulations, 2017 | Safety, Operations, Emergency |
| Environment Protection Act, 1986 | Environment |
| Water (Prevention and Control of Pollution) Act, 1974 | Water Quality |
| Air (Prevention and Control of Pollution) Act, 1981 | Air Quality |
| DGMS Circulars | Ventilation, Safety |
| Metalliferous Mines Regulations, 1961 | Equipment |

### Environmental Thresholds
| Parameter | Unit | Threshold | Source |
|-----------|------|-----------|--------|
| Air Quality Index | AQI | 200 | CPCB (Central Pollution Control Board) |
| Dust Level (PM10) | µg/m³ | 150 | CPCB National Ambient Air Quality Standards |
| Water pH | pH | 6.5–8.5 | IS 10500 / EPA Safe Range |
| Noise Level | dB | 85 | OSHA Permissible Exposure Limit |
| CO Emission | ppm | 50 | DGMS (Directorate General of Mines Safety) |
| SO₂ Level | µg/m³ | 80 | NAAQS (National Ambient Air Quality Standards) |

---

## Entity Relationships

```
mines.csv (10 mines)
  ├── violations.csv (12 violations → linked by mineId, inspectionId)
  │     └── corrective_actions.csv (8 actions → linked by violationId)
  ├── inspections.csv (12 inspections → linked by mineId, inspectorId)
  ├── safety_incidents.csv (7 incidents → linked by mineId)
  ├── compliance.csv (15 requirements → linked by mineId)
  ├── environmental_readings.csv (360 readings → linked by mineId)
  ├── alerts.csv (11 alerts → linked by mineId, assignedTo)
  ├── ai_insights.csv (8 insights → linked by mineId)
  └── documents.csv (10 documents → linked by mineId)

users.csv (6 users)
  └── Referenced as inspectors, operators, reporters across all files

audit_logs.csv (15 logs)
  └── References users, violations, inspections, alerts, compliance, corrective actions
```

---

## How This Data Is Used in the Application

The `src/data/mock*.js` files import and serve this data to the React frontend components. The `src/ai/riskEngine.js` uses a weighted scoring model across safety, environmental, historical, compliance, inspection, and corrective action dimensions to compute mine-level risk scores.
