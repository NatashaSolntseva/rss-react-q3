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

| Parameter               |                   Before Optimization |                          After Optimization |
| ----------------------- | ------------------------------------: | ------------------------------------------: |
| **Interaction**         |               Sort by name/population |                     Sort by name/population |
| **CD**                  |                                  1.1s |                                        1.9s |
| **RD (CountriesTable)** |                                 279ms |                                        10ms |
| **Interactions (why)**  |                 Every row re-rendered | Fewer redundant renders due to `React.memo` |
| **Flamegraph**          | ![Before](docs/before-sort-flame.JPG) |         ![After](docs/after-sort-flame.JPG) |
| **Commit info**         |  ![Before](docs/before-sort-info.JPG) |          ![After](docs/after-sort-info.JPG) |

### 2) Searching Countries

| Parameter               |                     Before Optimization |                     After Optimization |
| ----------------------- | --------------------------------------: | -------------------------------------: |
| **Interaction**         |                  Typing in search input |                 Typing in search input |
| **CD**                  |                                    1.7s |                              \_\_\_ ms |
| **RD (CountriesTable)** |                                   256ms |                              \_\_\_ ms |
| **Interactions (why)**  |         `setQuery` → filter → re-render |           Debounced & memoized results |
| **Flamegraph**          | ![Before](docs/before-search-flame.JPG) |  ![After](docs/after-search-flame.JPG) |
| **Commit info**         |  ![Before](docs/before-search-info.JPG) | ![After](docs/after-search-ranked.JPG) |

### 3) Year Selection

| Parameter               |                   Before Optimization |                    After Optimization |
| ----------------------- | ------------------------------------: | ------------------------------------: |
| **Interaction**         |          Selecting year from dropdown |                        Selecting year |
| **CD**                  |                                  1.9s |                             \_\_\_ ms |
| **RD (CountriesTable)** |                                 294ms |                             \_\_\_ ms |
| **Interactions (why)**  |        All rows updated with new year | Faster metric lookup with memoization |
| **Flamegraph**          | ![Before](docs/before-year-flame.JPG) |   ![After](docs/after-year-flame.png) |
| **Commit info**         |  ![Before](docs/before-year-info.JPG) |  ![After](docs/after-year-ranked.png) |

### 4) Adding / Removing Columns

| Parameter               |                      Before Optimization |                      After Optimization |
| ----------------------- | ---------------------------------------: | --------------------------------------: |
| **Interaction**         |                     Toggle extra columns |                    Toggle extra columns |
| **CD**                  |                                     0.9s |                               \_\_\_ ms |
| **RD (CountriesTable)** |                                    290ms |                               \_\_\_ ms |
| **Interactions (why)**  |          Table header + rows re-rendered |    Memoized header and selected columns |
| **Flamegraph**          | ![Before](docs/before-columns-flame.JPG) |  ![After](docs/after-columns-flame.png) |
| **Commit info**         |  ![Before](docs/before-columns-info.JPG) | ![After](docs/after-columns-ranked.png) |

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

| Scenario    | CD Before → After | RD Before → After | Notes                     |
| ----------- | ----------------: | ----------------: | ------------------------- |
| Sorting     |  1.1s → \_\_\_ ms | 279ms → \_\_\_ ms | Rows memoized             |
| Search      |  1.7s → \_\_\_ ms | 256ms → \_\_\_ ms | Debounce + memoized rows  |
| Year Select |  1.9s → \_\_\_ ms | 294ms → \_\_\_ ms | Optimized metric lookup   |
| Columns     |  0.9s → \_\_\_ ms | 290ms → \_\_\_ ms | Memoized header & columns |
