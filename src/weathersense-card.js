import { LitElement, html, nothing } from 'lit';
import { cardStyles } from './styles.js';
import { COMFORT_COLORS, COMFORT_ICONS, DEFAULT_CONFIG } from './constants.js';
import { convertTemperature, convertWindSpeed, convertPressure, formatValue, translateUnit } from './utils.js';
import { t } from './translations.js';

class WeatherSenseCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object, state: true },
    };
  }

  static get styles() {
    return cardStyles;
  }

  static getConfigElement() {
    return document.createElement('weathersense-card-editor');
  }

  static getStubConfig() {
    return { entity: '', name: 'WeatherSense', scale: 'normal' };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('Please define an entity');
    }
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  getCardSize() {
    if (this._config?.scale === 'ultra-compact') return 1;
    if (this._config?.scale === 'compact') return 2;
    return 4;
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (!this.hass || !this._config) return;

    const entity = this.hass.states[this._config.entity];
    if (!entity) return;

    const level = this._getComfortLevel(entity.attributes);
    const colors = COMFORT_COLORS[level] || COMFORT_COLORS.comfortable;

    this.style.setProperty('--ws-color-bg', colors.bg);
    this.style.setProperty('--ws-color-light', colors.light);
    this.style.setProperty('--ws-color-text', colors.text);

    // Apply scale class
    this.classList.remove('compact', 'ultra-compact');
    if (this._config.scale === 'compact') {
      this.classList.add('compact');
    } else if (this._config.scale === 'ultra-compact') {
      this.classList.add('ultra-compact');
    }
  }

  // comfort_level is a stable slug ('slightly_cool') since integration
  // 1.3.0; integration 1.2.x sent localized text instead. Normalizing
  // lowercase-with-underscores also recovers the English 1.2.x values.
  _getComfortLevel(attrs) {
    const raw = attrs.comfort_level || 'comfortable';
    if (COMFORT_COLORS[raw]) return raw;
    return String(raw).toLowerCase().replace(/ /g, '_');
  }

  // Integration contract: entity.state = calculated feels-like (in the
  // entity's unit_of_measurement); attributes.temperature = raw measured
  // temperature, always in attributes.temperature_unit (Celsius).
  _getDisplayUnit(entity) {
    return this._config.temperature_unit || entity.attributes.unit_of_measurement || '°C';
  }

  _getTemperature(entity) {
    const raw = parseFloat(entity.attributes.temperature);
    const fromUnit = entity.attributes.temperature_unit || '°C';
    const toUnit = this._getDisplayUnit(entity);
    return {
      value: formatValue(convertTemperature(raw, fromUnit, toUnit), 1),
      unit: toUnit,
    };
  }

  _getFeelsLike(entity) {
    const raw = parseFloat(entity.state);
    const fromUnit = entity.attributes.unit_of_measurement || '°C';
    const toUnit = this._getDisplayUnit(entity);
    return formatValue(convertTemperature(raw, fromUnit, toUnit), 1);
  }

  _getWind(entity) {
    const raw = parseFloat(entity.attributes.wind_speed);
    const unit = this._config.wind_unit || 'km/h';
    return {
      value: formatValue(convertWindSpeed(raw, unit), 1),
      unit,
    };
  }

  _getPressure(entity) {
    const raw = parseFloat(entity.attributes.pressure);
    const unit = this._config.pressure_unit || 'hPa';
    return {
      value: formatValue(convertPressure(raw, unit), 1),
      unit,
    };
  }

  _getMethodLabel(entity) {
    // calculation_method_key (integration >= 1.3.0) is a stable slug that
    // maps onto the card's method_* translations; calculation_method is
    // already-localized display text used as the fallback.
    const key = entity.attributes.calculation_method_key;
    if (key) {
      const label = t(`method_${key}`, this.hass);
      if (label !== `method_${key}`) return label;
    }
    return entity.attributes.calculation_method || null;
  }

  render() {
    if (!this.hass || !this._config) {
      return html`<ha-card><div class="unavailable"><ha-icon icon="mdi:alert-circle-outline"></ha-icon><span>Not configured</span></div></ha-card>`;
    }

    const entity = this.hass.states[this._config.entity];
    // An 'unavailable'/'unknown' state renders the same panel as a missing
    // entity: the attributes are stale at that point, and showing them with
    // a green "comfortable" theme misrepresents the actual state.
    if (!entity || entity.state === 'unavailable' || entity.state === 'unknown') {
      return html`<ha-card><div class="unavailable"><ha-icon icon="mdi:alert-circle-outline"></ha-icon><span>${t('entity_unavailable', this.hass)}</span></div></ha-card>`;
    }

    const attrs = entity.attributes;
    const level = this._getComfortLevel(attrs);
    const icon = COMFORT_ICONS[level] || COMFORT_ICONS.comfortable;
    const isComfy = attrs.is_comfortable;
    const temp = this._getTemperature(entity);
    const feelsLike = this._getFeelsLike(entity);
    const cardName = this._config.name || attrs.friendly_name || 'WeatherSense';

    const showHumidity = this._config.show_humidity && attrs.humidity !== undefined;
    const showWind = this._config.show_wind && attrs.wind_speed !== undefined;
    const showPressure = this._config.show_pressure && attrs.pressure !== undefined;
    const showDescription = this._config.show_description && attrs.comfort_description;
    const showMethod = this._config.show_method && attrs.calculation_method;

    const wind = showWind ? this._getWind(entity) : null;
    const pressure = showPressure ? this._getPressure(entity) : null;
    const hasMetrics = showHumidity || showWind || showPressure;

    return html`
      <ha-card>
        <div class="decorative-blob"></div>
        <div class="content-container">

          <div class="header">
            <span class="card-name">${cardName}</span>
            <span class="comfort-badge ${isComfy ? 'comfy' : 'not-comfy'}">
              ${isComfy ? t('comfy', this.hass) : t('not_comfy', this.hass)}
            </span>
          </div>

          <div class="temp-section">
            <ha-icon class="temp-icon" .icon=${icon}></ha-icon>
            <div class="temp-main">
              <div class="temp-value-row">
                <span class="temp-value">${temp.value}</span>
                <span class="temp-unit">${translateUnit(temp.unit, t, this.hass)}</span>
              </div>
              <span class="feels-like">
                ${t('feels_like', this.hass)}
                <span class="feels-like-value">${feelsLike}${translateUnit(temp.unit, t, this.hass)}</span>
              </span>
            </div>
          </div>

          ${showMethod ? html`
            <div class="method-line">${this._getMethodLabel(entity)}</div>
          ` : nothing}

          ${hasMetrics ? html`
            <div class="metrics-grid">
              ${showHumidity ? html`
                <div class="metric-card">
                  <ha-icon class="metric-icon" icon="mdi:water-percent"></ha-icon>
                  <div class="metric-info">
                    <span class="metric-value">${formatValue(attrs.humidity, 0)}%</span>
                    <span class="metric-label">${t('humidity', this.hass)}</span>
                  </div>
                </div>
              ` : nothing}

              ${showWind ? html`
                <div class="metric-card">
                  <ha-icon class="metric-icon" icon="mdi:weather-windy"></ha-icon>
                  <div class="metric-info">
                    <span class="metric-value">${wind.value} ${translateUnit(wind.unit, t, this.hass)}</span>
                    <span class="metric-label">${t('wind', this.hass)}</span>
                  </div>
                </div>
              ` : nothing}

              ${showPressure ? html`
                <div class="metric-card">
                  <ha-icon class="metric-icon" icon="mdi:gauge"></ha-icon>
                  <div class="metric-info">
                    <span class="metric-value">${pressure.value} ${translateUnit(pressure.unit, t, this.hass)}</span>
                    <span class="metric-label">${t('pressure', this.hass)}</span>
                  </div>
                </div>
              ` : nothing}
            </div>
          ` : nothing}

          ${showDescription ? html`
            <div class="description-block">${attrs.comfort_description}</div>
          ` : nothing}

        </div>
      </ha-card>
    `;
  }
}

customElements.define('weathersense-card', WeatherSenseCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'weathersense-card',
  name: 'WeatherSense Card',
  description: 'Comfort monitoring card for WeatherSense integration',
  preview: true,
  documentationURL: 'https://github.com/smkrv/ha-weathersense-card',
});

import './weathersense-card-editor.js';
