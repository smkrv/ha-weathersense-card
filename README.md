# WeatherSense Card for Home Assistant

A beautiful custom Lovelace card for the [WeatherSense integration](https://github.com/smkrv/ha-weathersense) featuring glassmorphism design and dynamic comfort level visualization.

![WeatherSense Card](https://raw.githubusercontent.com/smkrv/ha-weathersense-card/main/screenshots/card-preview.png)

## Features

- 🎨 **Glassmorphism Design** - Modern translucent effects with backdrop blur
- 🌡️ **Dynamic Color Themes** - 11 different color schemes based on comfort levels
- 📊 **Comprehensive Metrics** - Display temperature, humidity, and wind speed
- 🌓 **Theme Support** - Automatic adaptation to light and dark themes
- 🌍 **Multi-language** - Built-in support for 6 languages (EN, RU, DE, ES, HI, ZH-CN)
- ✨ **Smooth Animations** - Elegant transitions and hover effects
- 📱 **Responsive Design** - Optimized for all screen sizes
- 🔌 **100% Offline** - Completely self-contained, no external dependencies or internet required

## Requirements

- Home Assistant 2023.1 or newer
- [WeatherSense integration](https://github.com/smkrv/ha-weathersense) installed and configured

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to "Frontend" section
3. Click the 3 dots menu in the top right
4. Select "Custom repositories"
5. Add `https://github.com/smkrv/ha-weathersense-card` as repository
6. Select "Lovelace" as category
7. Click "Install"
8. Restart Home Assistant

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
```

### Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `entity` | string | **Yes** | - | Entity ID of your WeatherSense sensor |
| `name` | string | No | Entity name | Custom name for the card |

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

### Version 1.0.0 (2025-01-08)
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
