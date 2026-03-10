# WeatherSense Card for Home Assistant

A beautiful custom Lovelace card for the [WeatherSense integration](https://github.com/smkrv/ha-weathersense) featuring hybrid glass+material design and dynamic comfort level visualization.

<img src="https://raw.githubusercontent.com/smkrv/ha-weathersense-card/main/screenshots/screenshot.webp" alt="WeatherSense Card" width="800">

## Features

- **Hybrid Glass+Material Design** — Subtle comfort-level color glow with clean material surfaces
- **Scalable Display** — Three size modes: normal, compact, ultra-compact
- **Extended Metrics** — Temperature, humidity, wind speed, atmospheric pressure
- **Per-Metric Units** — Configure temperature (°C/°F), wind (m/s/km/h/mph/knots), pressure (hPa/mmHg/inHg/kPa) independently
- **Dynamic Color Themes** — 11 color schemes based on comfort levels
- **Theme Support** — Automatic adaptation to light and dark themes
- **Multi-language** — 7 languages (EN, RU, DE, ES, HI, ZH-CN, CS)
- **Smooth Animations** — Elegant transitions and hover effects
- **Responsive Design** — Optimized for all screen sizes
- **Configurable Display** — Toggle visibility of each metric, description, and calculation method
- **HACS Compatible** — Easy installation via Home Assistant Community Store

## Requirements

- Home Assistant 2023.1 or newer
- [WeatherSense integration](https://github.com/smkrv/ha-weathersense) installed and configured

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to **"Frontend"** section
3. Click the **3 dots menu** in the top right
4. Select **"Custom repositories"**
5. Add this URL: `https://github.com/smkrv/ha-weathersense-card`
6. Select **"Dashboard"** as category
7. Click "Add"
8. Find "WeatherSense Card" in the list and click "Download"
9. Restart Home Assistant
10. **Clear browser cache** (Ctrl+F5 or Cmd+Shift+R)

### Manual Installation

1. Download `weathersense-card.js` from the [latest release](https://github.com/smkrv/ha-weathersense-card/releases)
2. Copy the file to `/config/www/community/weathersense-card/` (create directories if needed)
3. Add the resource to Lovelace:

   **Via UI:**
   - Navigate to Settings → Dashboards → Resources
   - Click "Add Resource"
   - URL: `/local/community/weathersense-card/weathersense-card.js`
   - Resource type: JavaScript Module

   **Via YAML:**
   ```yaml
   lovelace:
     resources:
       - url: /local/community/weathersense-card/weathersense-card.js
         type: module
   ```

4. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

## Configuration

### Basic Configuration

```yaml
type: custom:weathersense-card
entity: sensor.weathersense_feels_like_temperature
```

### Full Configuration

```yaml
type: custom:weathersense-card
entity: sensor.weathersense_feels_like_temperature
name: "Living Room"
scale: normal              # normal | compact | ultra-compact
temperature_unit: °C       # °C | °F (default: from entity)
show_humidity: true
show_wind: true
wind_unit: km/h            # m/s | km/h | mph | knots
show_pressure: true
pressure_unit: hPa         # hPa | mmHg | inHg | kPa
show_description: true
show_method: false
```

### Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `entity` | string | **Yes** | — | Entity ID of your WeatherSense sensor |
| `name` | string | No | Entity name | Custom name for the card |
| `scale` | string | No | `normal` | Display scale: `normal`, `compact`, or `ultra-compact` |
| `temperature_unit` | string | No | Auto | Temperature unit: `°C` or `°F` (default: from entity) |
| `show_humidity` | boolean | No | `true` | Show humidity metric |
| `show_wind` | boolean | No | `true` | Show wind speed metric |
| `wind_unit` | string | No | `km/h` | Wind unit: `m/s`, `km/h`, `mph`, or `knots` |
| `show_pressure` | boolean | No | `true` | Show pressure metric |
| `pressure_unit` | string | No | `hPa` | Pressure unit: `hPa`, `mmHg`, `inHg`, or `kPa` |
| `show_description` | boolean | No | `true` | Show comfort description from integration |
| `show_method` | boolean | No | `false` | Show calculation method (Heat Index, Wind Chill, etc.) |

All options are also available through the visual card editor in the Home Assistant UI.

## Dynamic Color Themes

The card automatically changes colors based on 11 comfort levels:

| Comfort Level | Color Theme |
|--------------|-------------|
| Extreme Cold | Deep Blue |
| Very Cold | Dark Blue |
| Cold | Blue |
| Cool | Cyan |
| Slightly Cool | Teal |
| **Comfortable** | **Green** |
| Slightly Warm | Amber |
| Warm | Orange |
| Hot | Red |
| Very Hot | Dark Red |
| Extreme Hot | Deep Red |

## Multi-language Support

The card interface is available in:
- English
- Russian (Русский)
- German (Deutsch)
- Spanish (Español)
- Hindi (हिन्दी)
- Chinese Simplified (简体中文)
- Czech (Čeština)

Language is automatically detected from Home Assistant settings.

## Troubleshooting

### Card not showing up

1. Verify the resource is loaded (Settings → Dashboards → Resources)
2. Clear browser cache completely (try incognito mode)
3. Check the entity exists (Developer Tools → States)

### Console errors

Open browser console (F12) and check for errors:
- `Custom element not found` — Resource not loaded
- `Entity not available` — Check entity ID

<details>
<summary><strong>Development</strong></summary>

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/smkrv/ha-weathersense-card.git
cd ha-weathersense-card
npm install
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Watch mode — rebuild on changes |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Build + open test page at `localhost:8765` |
| `npm run lint` | Lint source files |
| `npm run lint:fix` | Lint and auto-fix |

### Architecture

```
src/
  weathersense-card.js          # Main card component (LitElement)
  weathersense-card-editor.js   # Config editor (LitElement)
  styles.js                     # CSS via Lit css``
  constants.js                  # COMFORT_COLORS, COMFORT_ICONS, DEFAULT_CONFIG
  translations.js               # 7 languages, all strings
  utils.js                      # Unit conversion, helpers
rollup.config.js                # Rollup bundler config
eslint.config.js                # ESLint flat config
```

Rollup bundles everything into a single `dist/weathersense-card.js` for HACS distribution.

</details>

## Changelog

### Version 2.0.0

**Complete rewrite — Lit + Rollup architecture**

- **NEW:** Rewritten from vanilla JS to LitElement with Rollup build system
- **NEW:** Hybrid Glass+Material visual design with subtle comfort-level color glow
- **NEW:** Atmospheric pressure display with configurable units (hPa/mmHg/inHg/kPa)
- **NEW:** Per-metric unit selectors — temperature (°C/°F), wind (m/s/km/h/mph/knots), pressure
- **NEW:** Comfort description display from integration
- **NEW:** Calculation method display (Heat Index, Wind Chill, Steadman, Indoor)
- **NEW:** Czech language support (7 languages total)
- **NEW:** Full visual card editor with all configuration options
- **NEW:** CI/CD workflows — HACS validation, automated releases, lint checks
- **IMPROVED:** CSS custom properties scale system (no JS object scaling)
- **IMPROVED:** Modular source code — constants, translations, utils, styles separated
- **IMPROVED:** All translations fully covered (UI, editor, units, methods, scales)

### Version 1.1.x

- Configuration dialog fixes
- Entity picker improvements
- Scalable display modes
- Performance optimizations

### Version 1.0.0

- Initial release with glassmorphism design
- 11 comfort level color themes
- Basic metrics (temperature, humidity, wind)
- Multi-language support (6 languages)

## Legal Disclaimer and Limitation of Liability

### Software Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## License

Author: SMKRV
[PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0) — see [LICENSE](LICENSE) for details.

---

## Support the Project

The best support is:
- Sharing feedback
- Contributing ideas
- Recommending to friends
- Reporting issues
- Star the repository

If you want to say thanks financially, you can send a small token of appreciation in USDT:

**USDT Wallet (TRC10/TRC20):**
`TXC9zYHYPfWUGi4Sv4R1ctTBGScXXQk5HZ`

*Open-source is built by community passion!*

---

<div align="center">

Made with care for the Home Assistant Community

[Report Bug](https://github.com/smkrv/ha-weathersense-card/issues) · [Request Feature](https://github.com/smkrv/ha-weathersense-card/issues)

</div>
