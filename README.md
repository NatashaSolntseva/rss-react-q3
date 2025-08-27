# 🌍 CO₂ Dashboard — Performance Profiling & Optimization

This project visualizes CO₂ emissions data by countries and regions.
A special focus is placed on React performance optimization: search, sorting, year selection, and adding/removing columns.

# ⚙️ Tech Stack & Key Features

- React + Vite + TypeScript + Tailwind
- React Suspense for loading a large JSON (~100 MB)
- Web Worker for safe JSON parsing off the main thread
- Country table with search, sorting, year selector, and customizable columns
- Responsive design (horizontal scroll for tables)

# 📊 Scenarios & Metrics

Below is a template table to record your results before and after optimizations.
Parameters:

- Commit Duration (CD) — total time React needed to commit updates.
- Render Duration (RD) — render time of individual components.
- Interactions — what triggered renders.
- Flamegraph / Ranked — screenshots for visualization.

### 1) Sorting by Country Name / Population

| Parameter               |                       Before Optimization |                      After Optimization |
| ----------------------- | ----------------------------------------: | --------------------------------------: |
| **Interaction**         |                      Toggle extra columns |                    Toggle extra columns |
| **CD**                  |                                 \_\_\_ ms |                               \_\_\_ ms |
| **RD (CountriesTable)** |                                 \_\_\_ ms |                               \_\_\_ ms |
| **Interactions (why)**  |           Table header + rows re-rendered |    Memoized header and selected columns |
| **Flamegraph**          |  ![Before](docs/before-columns-flame.png) |  ![After](docs/after-columns-flame.png) |
| **Ranked**              | ![Before](docs/before-columns-ranked.png) | ![After](docs/after-columns-ranked.png) |

### 2) Searching Countries

| Parameter               |                       Before Optimization |                      After Optimization |
| ----------------------- | ----------------------------------------: | --------------------------------------: |
| **Interaction**         |                      Toggle extra columns |                    Toggle extra columns |
| **CD**                  |                                 \_\_\_ ms |                               \_\_\_ ms |
| **RD (CountriesTable)** |                                 \_\_\_ ms |                               \_\_\_ ms |
| **Interactions (why)**  |           Table header + rows re-rendered |    Memoized header and selected columns |
| **Flamegraph**          |  ![Before](docs/before-columns-flame.png) |  ![After](docs/after-columns-flame.png) |
| **Ranked**              | ![Before](docs/before-columns-ranked.png) | ![After](docs/after-columns-ranked.png) |

### 3) Year Selection

| Parameter               |                       Before Optimization |                      After Optimization |
| ----------------------- | ----------------------------------------: | --------------------------------------: |
| **Interaction**         |                      Toggle extra columns |                    Toggle extra columns |
| **CD**                  |                                 \_\_\_ ms |                               \_\_\_ ms |
| **RD (CountriesTable)** |                                 \_\_\_ ms |                               \_\_\_ ms |
| **Interactions (why)**  |           Table header + rows re-rendered |    Memoized header and selected columns |
| **Flamegraph**          |  ![Before](docs/before-columns-flame.png) |  ![After](docs/after-columns-flame.png) |
| **Ranked**              | ![Before](docs/before-columns-ranked.png) | ![After](docs/after-columns-ranked.png) |

### 4) Adding / Removing Columns

| Parameter               |                       Before Optimization |                      After Optimization |
| ----------------------- | ----------------------------------------: | --------------------------------------: |
| **Interaction**         |                      Toggle extra columns |                    Toggle extra columns |
| **CD**                  |                                 \_\_\_ ms |                               \_\_\_ ms |
| **RD (CountriesTable)** |                                 \_\_\_ ms |                               \_\_\_ ms |
| **Interactions (why)**  |           Table header + rows re-rendered |    Memoized header and selected columns |
| **Flamegraph**          |  ![Before](docs/before-columns-flame.png) |  ![After](docs/after-columns-flame.png) |
| **Ranked**              | ![Before](docs/before-columns-ranked.png) | ![After](docs/after-columns-ranked.png) |

# ✅ Applied Optimizations

- useMemo
  - Memoized rows (filtered, searched, sorted list)
  - Memoized years and availableFields
  - Memoized selectedColumns
- React.memo
  - ControlsBar, TableHeader, CountryRow wrapped with React.memo
  - Custom comparison to avoid unnecessary renders
- useCallback
  - Stabilized event handlers: year change, query change, sort change, open/close column modal

# 📈 Results Summary

| Scenario    |  CD Before → After |  RD Before → After | Notes                     |
| ----------- | -----------------: | -----------------: | ------------------------- |
| Sorting     | \_\_\_ → \_\_\_ ms | \_\_\_ → \_\_\_ ms | Rows memoized             |
| Search      | \_\_\_ → \_\_\_ ms | \_\_\_ → \_\_\_ ms | Debounce + memoized rows  |
| Year Select | \_\_\_ → \_\_\_ ms | \_\_\_ → \_\_\_ ms | Optimized metric lookup   |
| Columns     | \_\_\_ → \_\_\_ ms | \_\_\_ → \_\_\_ ms | Memoized header & columns |
