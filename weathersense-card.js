/**
 * WeatherSense Card for Home Assistant
 * @license CC BY-NC-SA 4.0 International
 * @author SMKRV
 * @github https://github.com/smkrv/ha-weathersense-card
 * 
 * This card is completely self-contained and works offline without any external dependencies.
 */

// Comfort level color mapping
const COMFORT_COLORS = {
  extreme_cold: { bg: '#1e3a8a', light: '#3b82f6', text: '#1e40af' },
  very_cold: { bg: '#1e40af', light: '#60a5fa', text: '#1e40af' },
  cold: { bg: '#2563eb', light: '#93c5fd', text: '#1d4ed8' },
  cool: { bg: '#0891b2', light: '#67e8f9', text: '#0e7490' },
  slightly_cool: { bg: '#0d9488', light: '#5eead4', text: '#0f766e' },
  comfortable: { bg: '#10b981', light: '#86efac', text: '#059669' },
  slightly_warm: { bg: '#f59e0b', light: '#fcd34d', text: '#d97706' },
  warm: { bg: '#f97316', light: '#fb923c', text: '#ea580c' },
  hot: { bg: '#ef4444', light: '#f87171', text: '#dc2626' },
  very_hot: { bg: '#dc2626', light: '#f87171', text: '#b91c1c' },
  extreme_hot: { bg: '#991b1b', light: '#ef4444', text: '#7f1d1d' },
};

// Comfort level icons
const COMFORT_ICONS = {
  extreme_cold: "mdi:snowflake-alert",
  very_cold: "mdi:snowflake-thermometer",
  cold: "mdi:thermometer-low",
  cool: "mdi:thermometer-minus",
  slightly_cool: "mdi:thermometer-minus",
  comfortable: "mdi:hand-okay",
  slightly_warm: "mdi:thermometer-plus",
  warm: "mdi:thermometer-high",
  hot: "mdi:thermometer-alert",
  very_hot: "mdi:heat-wave",
  extreme_hot: "mdi:fire-alert",
};

// Translations
const TRANSLATIONS = {
  en: {
    humidity: "Humidity",
    wind: "Wind",
    feels_like: "Feels like",
    comfy: "Comfy",
    not_comfy: "Not Comfy"
  },
  ru: {
    humidity: "Влажность",
    wind: "Ветер",
    feels_like: "Ощущается как",
    comfy: "Комфортно",
    not_comfy: "Некомфортно"
  },
  de: {
    humidity: "Feuchtigkeit",
    wind: "Wind",
    feels_like: "Gefühlt",
    comfy: "Komfortabel",
    not_comfy: "Unkomfortabel"
  },
  es: {
    humidity: "Humedad",
    wind: "Viento",
    feels_like: "Sensación térmica",
    comfy: "Confortable",
    not_comfy: "Inconfortable"
  },
  hi: {
    humidity: "आर्द्रता",
    wind: "हवा",
    feels_like: "महसूस होता है",
    comfy: "आरामदायक",
    not_comfy: "असुविधाजनक"
  },
  "zh-CN": {
    humidity: "湿度",
    wind: "风速",
    feels_like: "体感",
    comfy: "舒适",
    not_comfy: "不舒适"
  }
};

class WeatherSenseCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._hass = null;
    this._config = {};
    this._previousState = null;
  }

  set hass(hass) {
    this._hass = hass;
    
    // Only render if entity state or attributes have changed
    const entity = this._entity;
    if (entity) {
      const currentState = JSON.stringify({
        state: entity.state,
        attributes: entity.attributes
      });
      
      if (this._previousState !== currentState) {
        this._previousState = currentState;
        this.render();
      }
    } else {
      this.render();
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this._config = config;
    this._previousState = null; // Reset previous state on config change
    this.render();
  }

  get _entity() {
    if (!this._hass) return null;
    return this._hass.states[this._config.entity];
  }

  _getTranslation(key) {
    const lang = this._hass?.language || 'en';
    const translations = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return translations[key] || TRANSLATIONS.en[key] || key;
  }

  render() {
    if (!this.shadowRoot) return;
    
    const styles = `
      <style>
        :host {
          display: block;
        }

        ha-card {
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
          overflow: visible;
        }

        .weather-card-container {
          position: relative;
          border-radius: 32px;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: cardEntrance 0.5s ease-out;
        }

        @keyframes cardEntrance {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .glass-background {
          position: absolute;
          inset: 0;
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .glass-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .content-container {
          position: relative;
          padding: 32px;
          z-index: 1;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .location-info h2 {
          margin: 0 0 4px 0;
          font-size: 18px;
          font-weight: 500;
          color: var(--primary-text-color);
          opacity: 0.8;
        }

        .location-info p {
          margin: 0;
          font-size: 14px;
          color: var(--secondary-text-color);
          opacity: 0.6;
        }

        .comfort-badge {
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.3px;
          border: 2px solid;
        }

        .temperature-display {
          margin-bottom: 32px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .temp-icon-container {
          margin-top: 8px;
          transition: transform 0.3s ease;
        }

        .temp-icon-container:hover {
          transform: rotate(-10deg) scale(1.05);
        }

        .temp-values {
          flex: 1;
        }

        .main-temp {
          display: flex;
          align-items: flex-start;
          animation: tempFadeIn 0.6s ease-out;
        }

        @keyframes tempFadeIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .temp-number {
          font-size: 72px;
          font-weight: 300;
          line-height: 1;
          letter-spacing: -0.02em;
          transition: all 0.3s ease;
        }

        .temp-unit {
          font-size: 32px;
          font-weight: 300;
          margin-left: 4px;
          margin-top: 12px;
          opacity: 0.9;
        }

        .feels-like {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          font-size: 16px;
          opacity: 0.8;
        }

        .feels-like ha-icon {
          --mdc-icon-size: 18px;
          opacity: 0.6;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .metric-card {
          padding: 20px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
          animation: metricSlideIn 0.5s ease-out;
        }

        @keyframes metricSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .metric-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .metric-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .metric-icon ha-icon {
          --mdc-icon-size: 20px;
        }

        .metric-label {
          font-size: 13px;
          opacity: 0.7;
          font-weight: 500;
        }

        .metric-value {
          font-size: 28px;
          font-weight: 500;
          margin-top: 4px;
        }

        .metric-unit {
          font-size: 16px;
          opacity: 0.7;
          margin-left: 4px;
        }

        .decorative-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.2;
          pointer-events: none;
          animation: blobFloat 20s infinite ease-in-out;
        }

        @keyframes blobFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .blob-1 {
          width: 160px;
          height: 160px;
          top: 0;
          right: 0;
          transform: translate(30%, -30%);
          animation-delay: 0s;
        }

        .blob-2 {
          width: 128px;
          height: 128px;
          bottom: 0;
          left: 0;
          transform: translate(-30%, 30%);
          animation-delay: 10s;
        }

        /* Responsive design */
        @media (max-width: 480px) {
          .content-container {
            padding: 24px;
          }

          .temp-number {
            font-size: 56px;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }

        .unavailable {
          text-align: center;
          padding: 32px;
          opacity: 0.5;
        }

        .unavailable ha-icon {
          --mdc-icon-size: 48px;
          margin-bottom: 16px;
        }
      </style>
    `;

    if (!this._hass || !this._entity) {
      this.shadowRoot.innerHTML = `
        ${styles}
        <ha-card>
          <div class="unavailable">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            <div>Entity not available</div>
          </div>
        </ha-card>
      `;
      return;
    }

    const state = this._entity;
    const attributes = state.attributes;
    
    // Get comfort level and colors
    const comfortLevel = attributes.comfort_level || 'comfortable';
    const colors = COMFORT_COLORS[comfortLevel] || COMFORT_COLORS.comfortable;
    const icon = COMFORT_ICONS[comfortLevel] || COMFORT_ICONS.comfortable;
    const isComfortable = attributes.is_comfortable;
    
    // Get values
    const feelsLike = parseFloat(state.state);
    const temperature = attributes.temperature;
    const humidity = attributes.humidity;
    const windSpeed = attributes.wind_speed;
    const comfortDescription = attributes.comfort_description;
    
    // Get unit of measurement
    const unit = state.attributes.unit_of_measurement || '°C';
    
    // Build metrics HTML
    let metricsHTML = '';
    
    if (humidity !== undefined) {
      metricsHTML += `
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon" style="background: ${colors.light}33;">
              <ha-icon icon="mdi:water-percent" style="color: ${colors.text};"></ha-icon>
            </div>
            <span class="metric-label" style="color: var(--secondary-text-color);">${this._getTranslation('humidity')}</span>
          </div>
          <div class="metric-value" style="color: ${colors.text};">
            ${Math.round(humidity)}<span class="metric-unit">%</span>
          </div>
        </div>
      `;
    }
    
    if (windSpeed !== undefined) {
      // Convert wind speed based on temperature unit
      const isImperial = unit.includes('F');
      const convertedWind = isImperial ? windSpeed * 2.237 : windSpeed * 3.6;
      const windUnit = isImperial ? 'mph' : 'km/h';
      
      metricsHTML += `
        <div class="metric-card">
          <div class="metric-header">
            <div class="metric-icon" style="background: ${colors.light}33;">
              <ha-icon icon="mdi:weather-windy" style="color: ${colors.text};"></ha-icon>
            </div>
            <span class="metric-label" style="color: var(--secondary-text-color);">${this._getTranslation('wind')}</span>
          </div>
          <div class="metric-value" style="color: ${colors.text};">
            ${Math.round(convertedWind)}<span class="metric-unit">${windUnit}</span>
          </div>
        </div>
      `;
    }

    // Determine condition text
    const conditionText = comfortDescription;

    this.shadowRoot.innerHTML = `
      ${styles}
      <ha-card>
        <div class="weather-card-container">
          <!-- Glass morphism background -->
          <div class="glass-background"
               style="background: linear-gradient(135deg, ${colors.bg}14 0%, ${colors.bg}08 100%);">
          </div>
          
          <div class="glass-overlay"></div>
          
          <!-- Decorative blobs -->
          <div class="decorative-blob blob-1" 
               style="background: ${colors.light};"></div>
          <div class="decorative-blob blob-2" 
               style="background: ${colors.bg};"></div>
          
          <!-- Main content -->
          <div class="content-container">
            <!-- Header -->
            <div class="header">
              <div class="location-info">
                <h2>${this._config.name || state.attributes.friendly_name}</h2>
                <p>${conditionText}</p>
              </div>
              <div class="comfort-badge"
                   style="background: ${colors.light}33; 
                          color: ${colors.text}; 
                          border-color: ${colors.light}66;">
                ${isComfortable ? this._getTranslation('comfy') : this._getTranslation('not_comfy')}
              </div>
            </div>
            
            <!-- Temperature display -->
            <div class="temperature-display">
              <div class="temp-icon-container">
                <ha-icon icon="${icon}" 
                         style="color: ${colors.light}; --mdc-icon-size: 48px;">
                </ha-icon>
              </div>
              
              <div class="temp-values">
                <div class="main-temp">
                  <span class="temp-number" style="color: ${colors.text};">
                    ${Math.round(temperature)}
                  </span>
                  <span class="temp-unit" style="color: ${colors.text};">
                    ${unit}
                  </span>
                </div>
                
                <div class="feels-like" style="color: var(--secondary-text-color);">
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                  <span>${this._getTranslation('feels_like')} ${Math.round(feelsLike)}${unit}</span>
                </div>
              </div>
            </div>
            
            <!-- Metrics grid -->
            <div class="metrics-grid">
              ${metricsHTML}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 4;
  }

  static getConfigElement() {
    return document.createElement("weathersense-card-editor");
  }

  static getStubConfig() {
    return {
      entity: "",
      name: "WeatherSense"
    };
  }
}

// Card Editor
class WeatherSenseCardEditor extends HTMLElement {
  constructor() {
    super();
    this._config = {};
    this._hass = null;
    this._initialized = false;
    this._debounceTimeout = null;
  }

  set hass(hass) {
    this._hass = hass;
    
    // Initialize on first hass set or update entity picker
    if (!this._initialized) {
      this._initialize();
    } else {
      // Update entity picker with new hass object
      const entityPicker = this.querySelector('#entity-picker');
      if (entityPicker) {
        entityPicker.hass = hass;
      }
    }
  }

  setConfig(config) {
    this._config = config;
    
    // Only initialize if hass is available
    if (this._hass && !this._initialized) {
      this._initialize();
    } else if (this._initialized) {
      // Update existing fields without re-rendering
      this._updateFields();
    }
  }

  _initialize() {
    if (!this._hass) return;

    this.innerHTML = `
      <style>
        .card-config {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        ha-entity-picker,
        ha-textfield {
          width: 100%;
        }
      </style>
      <div class="card-config">
        <ha-textfield
          id="name-input"
          label="Name (Optional)"
          .value="${this._config.name || ''}"
        ></ha-textfield>
        
        <ha-entity-picker
          id="entity-picker"
          label="Entity"
          .value="${this._config.entity || ''}"
          allow-custom-entity
        ></ha-entity-picker>
      </div>
    `;

    this._initialized = true;
    this._attachEventListeners();
    
    // Set initial values after rendering
    requestAnimationFrame(() => {
      this._updateFields();
      
      // Set hass and domains for entity picker
      const entityPicker = this.querySelector('#entity-picker');
      if (entityPicker) {
        entityPicker.hass = this._hass;
        entityPicker.includeDomains = ['sensor'];
      }
    });
  }

  _updateFields() {
    // Update name field
    const nameInput = this.querySelector('#name-input');
    if (nameInput && nameInput.value !== (this._config.name || '')) {
      nameInput.value = this._config.name || '';
    }
    
    // Update entity picker
    const entityPicker = this.querySelector('#entity-picker');
    if (entityPicker && entityPicker.value !== (this._config.entity || '')) {
      entityPicker.value = this._config.entity || '';
    }
  }

  _attachEventListeners() {
    const nameInput = this.querySelector('#name-input');
    const entityPicker = this.querySelector('#entity-picker');

    if (nameInput) {
      // Use value-changed event for ha-textfield
      nameInput.addEventListener('value-changed', (ev) => {
        // Prevent update if value hasn't actually changed
        if (this._config.name === ev.detail.value) return;
        
        this._config = { ...this._config, name: ev.detail.value };
        this._debouncedConfigChanged();
      });
      
      // Also handle direct input for better responsiveness
      nameInput.addEventListener('input', (ev) => {
        // Prevent update if value hasn't actually changed
        if (this._config.name === ev.target.value) return;
        
        this._config = { ...this._config, name: ev.target.value };
        this._debouncedConfigChanged();
      });
    }

    if (entityPicker) {
      entityPicker.addEventListener('value-changed', (ev) => {
        // Prevent update if value hasn't actually changed
        if (this._config.entity === ev.detail.value) return;
        
        if (ev.detail.value !== undefined) {
          this._config = { ...this._config, entity: ev.detail.value };
          this._debouncedConfigChanged();
        }
      });
    }
  }

  _debouncedConfigChanged() {
    // Clear existing timeout
    if (this._debounceTimeout) {
      clearTimeout(this._debounceTimeout);
    }
    
    // Set new timeout to fire config change
    this._debounceTimeout = setTimeout(() => {
      this._fireConfigChanged();
    }, 100);
  }

  _fireConfigChanged() {
    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

// Register the cards
customElements.define("weathersense-card", WeatherSenseCard);
customElements.define("weathersense-card-editor", WeatherSenseCardEditor);

// Add to HA card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: "weathersense-card",
  name: "WeatherSense Card",
  description: "Beautiful card for WeatherSense integration with glassmorphism design",
  preview: true,
  documentationURL: "https://github.com/smkrv/ha-weathersense-card",
});
