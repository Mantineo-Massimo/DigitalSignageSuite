# Building SBA - Browser Compatibility Documentation

This document outlines the changes made to ensure the Digital Signage Suite functions correctly on the legacy monitors installed in Building SBA.

## Target Devices

| Device | WebOS Version | Browser Engine |
| :--- | :--- | :--- |
| 22" Monitor (22SM3G-BJ) | 4.1 | Chromium 53 |
| 32" Monitor (32SM5DJ-BJ) | 4.1 | Chromium 53 |
| 50" Monitor (50UL3J-MP) | 6.0 | Chromium 79 |
| 55" Totem (55TNF5J-BP) | 6.0 | Chromium 79 |

## Implemented Changes

### 1. JavaScript ES5 Refactoring
All frontend scripts have been refactored from ES6+ to ES5 syntax to prevent crashes and syntax errors on Chromium 53.
- **`const` / `let`** replaced with **`var`**.
- **Arrow functions** (`() => {}`) replaced with **`function() {}`**.
- **Template literals** (backticks) replaced with standard **string concatenation**.
- **`Promise.prototype.finally()`** replaced with **`.then()` / `.catch()`** chains.

### 2. URL Parameter Parsing
The `URLSearchParams` API (partially unsupported or buggy on older Chromium) has been replaced with a custom, regex-based helper function:
```javascript
function getUrlParameter(name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
```

### 3. Loading & Initialization
- Removed or improved "Loading..." screens that were causing hangs due to race conditions in `DOMContentLoaded` listeners.
- Added fallback mechanisms to ensure the main UI is always visible even if a non-critical script fails.
- Fixed duplicated `DOMContentLoaded` listeners that were preventing initialization code from running.

### 4. Service-Specific Fixes
- **Totem Service:** Downgraded Swiper library to version 5.4.5 for compatibility.
- **Telegram Service:** Wrapped backend feed updates in an application context to prevent `RuntimeError`.
- **Schedule Service:** Increased Gunicorn workers for better concurrency and added building ID normalization for SBA.

## Maintenance Notes
- **Avoid ES6 features:** Do not use `async/await`, classes, destructuring, or spread operators in frontend code.
- **Test on target:** Always verify changes on a Building SBA monitor if possible, or use a Chromium 53 engine for local testing.
