# WeatherSense Card for Home Assistant

A beautiful custom Lovelace card for the [WeatherSense integration](https://github.com/smkrv/ha-weathersense) featuring glassmorphism design and dynamic comfort level visualization.

![WeatherSense Card](https://raw.githubusercontent.com/smkrv/ha-weathersense-card/main/screenshots/card-preview.png)

## Features

- 🎨 **Glassmorphism Design** - Modern translucent effects with backdrop blur
- 📏 **Scalable Display** - Three size modes: normal, compact (2x smaller), ultra-compact (3x smaller)
- 🎯 **Smart Entity Filter** - Editor shows only WeatherSense sensors automatically
- 🌡️ **Dynamic Color Themes** - 11 different color schemes based on comfort levels
- 📊 **Comprehensive Metrics** - Display temperature, humidity, and wind speed
- 🌓 **Theme Support** - Automatic adaptation to light and dark themes
- 🌍 **Multi-language** - Built-in support for 6 languages (EN, RU, DE, ES, HI, ZH-CN)
- ✨ **Smooth Animations** - Elegant transitions and hover effects
- 📱 **Responsive Design** - Optimized for all screen sizes
- ⚡ **Optimized Updates** - Values update without full card re-render
- 🔌 **100% Offline** - Completely self-contained, no external dependencies or internet required

## Requirements

- Home Assistant 2023.1 or newer
- [WeatherSense integration](https://github.com/smkrv/ha-weathersense) installed and configured

## Installation

### HACS (Recommended)

**Important:** You must create a [release on GitHub](https://github.com/smkrv/ha-weathersense-card/releases) first for HACS to detect the repository!

1. Open HACS in your Home Assistant instance
2. Go to **"Frontend"** section (not Integrations!)
3. Click the **3 dots menu** (⋮) in the top right
4. Select **"Custom repositories"**
5. Add this URL: `https://github.com/smkrv/ha-weathersense-card`
6. Select **"Lovelace"** as category
7. Click "Add"
8. Find "WeatherSense Card" in the list and click "Download"
9. Restart Home Assistant
10. **Clear browser cache** (Ctrl+F5 or Cmd+Shift+R)

**Note:** If you don't see the card after adding the repository, make sure:
- A release (v1.0.0) exists on GitHub
- You selected "Lovelace" category (not "Integration" or "Plugin")
- You're looking in the Frontend section of HACS

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

### Advanced Configuration

```yaml
type: custom:weathersense-card
entity: sensor.weathersense_feels_like_temperature
name: "Living Room Climate"
scale: compact  # normal | compact | ultra-compact
```

### Display Scale Options

The card supports three display scales for different layout needs:

**Normal Scale** (default)
```yaml
type: custom:weathersense-card
entity: sensor.weathersense_feels_like_temperature
scale: normal
```
Perfect for main dashboard views with full-size display.

**Compact Scale** (2x smaller)
```yaml
type: custom:weathersense-card
entity: sensor.weathersense_feels_like_temperature
scale: compact
```
Ideal for sidebars or multi-card layouts where space is limited.

**Ultra-compact Scale** (3x smaller)
```yaml
type: custom:weathersense-card
entity: sensor.weathersense_feels_like_temperature
scale: ultra-compact
```
Great for minimal space dashboards or overview pages with many cards.

### Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `entity` | string | **Yes** | - | Entity ID of your WeatherSense sensor |
| `name` | string | No | Entity name | Custom name for the card |
| `scale` | string | No | `normal` | Display scale: `normal`, `compact` (2x smaller), or `ultra-compact` (3x smaller) |

## Usage Examples

See [examples.yaml](examples.yaml) for more configuration examples including:
- Basic card
- Multiple cards in grid
- Vertical stack with weather
- Horizontal stack for multiple rooms
- Conditional card
- And more...

## Features in Detail

### Dynamic Color Themes

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

### Multi-language Support

The card interface is available in:
- 🇬🇧 English
- 🇷🇺 Russian
- 🇩🇪 German
- 🇪🇸 Spanish
- 🇮🇳 Hindi
- 🇨🇳 Chinese (Simplified)

Language is automatically detected from Home Assistant settings.

### Smart Unit Conversion

The card automatically displays the correct units:
- **Temperature**: °C or °F (based on sensor configuration)
- **Wind Speed**: km/h (metric) or mph (imperial)
- **Humidity**: Always in %

## Troubleshooting

### Card not showing up

1. Verify the resource is loaded:
   - Go to Settings → Dashboards → Resources
   - Check if weathersense-card.js is listed
   
2. Clear browser cache completely
   - Try incognito/private mode
   
3. Check the entity exists:
   - Go to Developer Tools → States
   - Search for your WeatherSense entity

### Styling issues

- The card uses CSS backdrop-filter which requires a modern browser
- Some older browsers may not display the glassmorphism effect properly
- Ensure your browser is up to date

### Console errors

1. Open browser console (F12)
2. Look for errors related to weathersense-card
3. Common issues:
   - `Custom element not found` - Resource not loaded, check installation
   - `Entity not available` - Check entity ID is correct

## Support

- **Issues**: [GitHub Issues](https://github.com/smkrv/ha-weathersense-card/issues)
- **Integration Issues**: [WeatherSense Issues](https://github.com/smkrv/ha-weathersense/issues)
- **Discussions**: [Home Assistant Community](https://community.home-assistant.io/)

## License

This project is licensed under the CC BY-NC-SA 4.0 International License - see [LICENSE](LICENSE) for details.

## Credits

- Created by [SMKRV](https://github.com/smkrv)
- Companion card for [WeatherSense Integration](https://github.com/smkrv/ha-weathersense)
- Design inspired by modern glassmorphism trends
- Icons from Material Design Icons

## Changelog

### Version 1.1.2 (2025-01-10)
- 🐛 **FIXED:** Configuration dialog closing when selecting display scale
- 🔧 **IMPROVED:** Removed duplicate event listener that caused double-firing
- ⚡ **IMPROVED:** Increased debounce timeout from 100ms to 200ms for better stability
- 📝 **TECHNICAL:** Added event.stopPropagation() to prevent event bubbling in scale selector

### Version 1.1.1 (2025-01-10)
- 🐛 **FIXED:** Entity picker filter bug - now correctly displays all sensor entities
- 🔧 **IMPROVED:** Simplified entity filtering logic for better reliability
- 📝 **TECHNICAL:** Removed complex includeEntities filtering that was preventing entity selection

### Version 1.1.0 (2025-01-10)
- ✨ **NEW:** Scalable display modes - normal, compact (2x smaller), ultra-compact (3x smaller)
- 🎯 **NEW:** Smart entity filtering - editor automatically shows only WeatherSense sensors
- ⚡ **IMPROVED:** Optimized value updates without full card re-render
- 🔄 **IMPROVED:** Dynamic entity list refresh when sensors are added/removed
- 🎨 **IMPROVED:** Proportionally scaled elements maintain design quality at all sizes
- 📱 **IMPROVED:** Enhanced responsive design for compact layouts
- 🐛 **FIXED:** Performance optimization for frequent updates

### Version 1.0.2
- Bug fixes and minor improvements

### Version 1.0.1
- Documentation updates

### Version 1.0.0
- Initial release
- Glassmorphism design with 11 comfort level color themes
- Full metric display (temperature, humidity, wind speed)
- Multi-language support (EN, RU, DE, ES, HI, ZH-CN)
- Smart unit conversion (°C/°F, km/h/mph)
- Light/dark theme compatibility
- Responsive design
- Smooth animations and transitions
- 100% offline operation

---

Made with ❤️ for the Home Assistant community
