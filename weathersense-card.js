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

  _updateValues() {
    // Quick update of values without full re-render
    const entity = this._entity;
    if (!entity || !this.shadowRoot) return;
    
    const attributes = entity.attributes;
    const feelsLike = parseFloat(entity.state);
    const temperature = attributes.temperature;
    const humidity = attributes.humidity;
    const windSpeed = attributes.wind_speed;
    const comfortDescription = attributes.comfort_description;
    const comfortLevel = attributes.comfort_level || 'comfortable';
    const colors = COMFORT_COLORS[comfortLevel] || COMFORT_COLORS.comfortable;
    const icon = COMFORT_ICONS[comfortLevel] || COMFORT_ICONS.comfortable;
    const isComfortable = attributes.is_comfortable;
    const unit = entity.attributes.unit_of_measurement || '°C';
    
    // Update temperature
    const tempNumber = this.shadowRoot.querySelector('.temp-number');
    if (tempNumber) {
      tempNumber.textContent = Math.round(temperature);
    }
    
    // Update feels like
    const feelsLikeSpan = this.shadowRoot.querySelector('.feels-like span:last-child');
    if (feelsLikeSpan) {
      feelsLikeSpan.textContent = `${this._getTranslation('feels_like')} ${Math.round(feelsLike)}${unit}`;
    }
    
    // Update comfort description
    const locationDesc = this.shadowRoot.querySelector('.location-info p');
    if (locationDesc) {
      locationDesc.textContent = comfortDescription;
    }
    
    // Update comfort badge
    const comfortBadge = this.shadowRoot.querySelector('.comfort-badge');
    if (comfortBadge) {
      comfortBadge.textContent = isComfortable ? this._getTranslation('comfy') : this._getTranslation('not_comfy');
      comfortBadge.style.background = `${colors.light}33`;
      comfortBadge.style.color = colors.text;
      comfortBadge.style.borderColor = `${colors.light}66`;
    }
    
    // Update comfort icon
    const comfortIcon = this.shadowRoot.querySelector('.temp-icon-container ha-icon');
    if (comfortIcon) {
      comfortIcon.setAttribute('icon', icon);
      comfortIcon.style.color = colors.light;
    }
    
    // Update humidity if exists
    if (humidity !== undefined) {
      const humidityValue = this.shadowRoot.querySelector('.metric-card:first-child .metric-value');
      if (humidityValue) {
        humidityValue.innerHTML = `${Math.round(humidity)}<span class="metric-unit">%</span>`;
        humidityValue.style.color = colors.text;
      }
    }
    
    // Update wind speed if exists
    if (windSpeed !== undefined) {
      const windValue = this.shadowRoot.querySelector('.metric-card:last-child .metric-value');
      if (windValue) {
        const isImperial = unit.includes('F');
        const convertedWind = isImperial ? windSpeed * 2.237 : windSpeed * 3.6;
        const windUnit = isImperial ? 'mph' : 'km/h';
        windValue.innerHTML = `${Math.round(convertedWind)}<span class="metric-unit">${windUnit}</span>`;
        windValue.style.color = colors.text;
      }
    }
    
    // Update colors
    const metricIcons = this.shadowRoot.querySelectorAll('.metric-icon');
    metricIcons.forEach(iconEl => {
      iconEl.style.background = `${colors.light}33`;
      const icon = iconEl.querySelector('ha-icon');
      if (icon) {
        icon.style.color = colors.text;
      }
    });
    
    // Update blobs
    const blob1 = this.shadowRoot.querySelector('.blob-1');
    const blob2 = this.shadowRoot.querySelector('.blob-2');
    if (blob1) blob1.style.background = colors.light;
    if (blob2) blob2.style.background = colors.bg;
    
    // Update glass background
    const glassBackground = this.shadowRoot.querySelector('.glass-background');
    if (glassBackground) {
      glassBackground.style.background = `linear-gradient(135deg, ${colors.bg}14 0%, ${colors.bg}08 100%)`;
    }
  }

  set hass(hass) {
    this._hass = hass;
    
    // Only update if entity state or attributes have changed
    const entity = this._entity;
    if (entity) {
      const currentState = JSON.stringify({
        state: entity.state,
        attributes: entity.attributes
      });
      
      if (this._previousState !== currentState) {
        this._previousState = currentState;
        // Check if we need full re-render or just value update
        if (this.shadowRoot && this.shadowRoot.querySelector('.weather-card-container')) {
          this._updateValues();
        } else {
          this.render();
        }
      }
    } else {
      this.render();
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    // Set default scale if not specified
    this._config = {
      ...config,
      scale: config.scale || 'normal'
    };
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
    
    // Scale configurations
    const scaleConfigs = {
      normal: {
        containerPadding: '32px',
        borderRadius: '32px',
        headerMargin: '32px',
        tempDisplay: '32px',
        mainTempSize: '72px',
        unitSize: '32px',
        feelsLikeSize: '16px',
        feelsLikeIconSize: '18px',
        metricGap: '24px',
        metricPadding: '20px',
        metricRadius: '24px',
        metricIconSize: '40px',
        metricIconMdi: '20px',
        metricLabelSize: '13px',
        metricValueSize: '28px',
        metricUnitSize: '16px',
        locationNameSize: '18px',
        locationDescSize: '14px',
        badgePadding: '8px 16px',
        badgeSize: '13px',
        comfortIconSize: '48px',
        blobBlur: '80px',
        blob1Size: '160px',
        blob2Size: '128px'
      },
      compact: {
        containerPadding: '16px',
        borderRadius: '20px',
        headerMargin: '16px',
        tempDisplay: '16px',
        mainTempSize: '36px',
        unitSize: '16px',
        feelsLikeSize: '12px',
        feelsLikeIconSize: '14px',
        metricGap: '12px',
        metricPadding: '12px',
        metricRadius: '16px',
        metricIconSize: '24px',
        metricIconMdi: '14px',
        metricLabelSize: '11px',
        metricValueSize: '18px',
        metricUnitSize: '12px',
        locationNameSize: '14px',
        locationDescSize: '11px',
        badgePadding: '4px 8px',
        badgeSize: '11px',
        comfortIconSize: '28px',
        blobBlur: '40px',
        blob1Size: '80px',
        blob2Size: '64px'
      },
      'ultra-compact': {
        containerPadding: '11px',
        borderRadius: '14px',
        headerMargin: '11px',
        tempDisplay: '11px',
        mainTempSize: '24px',
        unitSize: '11px',
        feelsLikeSize: '10px',
        feelsLikeIconSize: '12px',
        metricGap: '8px',
        metricPadding: '8px',
        metricRadius: '12px',
        metricIconSize: '18px',
        metricIconMdi: '11px',
        metricLabelSize: '9px',
        metricValueSize: '14px',
        metricUnitSize: '10px',
        locationNameSize: '11px',
        locationDescSize: '9px',
        badgePadding: '3px 6px',
        badgeSize: '9px',
        comfortIconSize: '20px',
        blobBlur: '30px',
        blob1Size: '60px',
        blob2Size: '48px'
      }
    };
    
    const scale = scaleConfigs[this._config.scale] || scaleConfigs.normal;
    
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
          border-radius: ${scale.borderRadius};
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
          padding: ${scale.containerPadding};
          z-index: 1;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: ${scale.headerMargin};
        }

        .location-info h2 {
          margin: 0 0 4px 0;
          font-size: ${scale.locationNameSize};
          font-weight: 500;
          color: var(--primary-text-color);
          opacity: 0.8;
        }

        .location-info p {
          margin: 0;
          font-size: ${scale.locationDescSize};
          color: var(--secondary-text-color);
          opacity: 0.6;
        }

        .comfort-badge {
          padding: ${scale.badgePadding};
          border-radius: 12px;
          font-size: ${scale.badgeSize};
          font-weight: 600;
          letter-spacing: 0.3px;
          border: 2px solid;
        }

        .temperature-display {
          margin-bottom: ${scale.tempDisplay};
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
          font-size: ${scale.mainTempSize};
          font-weight: 300;
          line-height: 1;
          letter-spacing: -0.02em;
          transition: all 0.3s ease;
        }

        .temp-unit {
          font-size: ${scale.unitSize};
          font-weight: 300;
          margin-left: 4px;
          margin-top: ${this._config.scale === 'ultra-compact' ? '4px' : this._config.scale === 'compact' ? '8px' : '12px'};
          opacity: 0.9;
        }

        .feels-like {
          display: flex;
          align-items: center;
          gap: ${this._config.scale === 'ultra-compact' ? '4px' : '8px'};
          margin-top: ${this._config.scale === 'ultra-compact' ? '4px' : '8px'};
          font-size: ${scale.feelsLikeSize};
          opacity: 0.8;
        }

        .feels-like ha-icon {
          --mdc-icon-size: ${scale.feelsLikeIconSize};
          opacity: 0.6;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: ${scale.metricGap};
        }

        .metric-card {
          padding: ${scale.metricPadding};
          border-radius: ${scale.metricRadius};
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
          width: ${scale.metricIconSize};
          height: ${scale.metricIconSize};
          border-radius: ${this._config.scale === 'ultra-compact' ? '8px' : '12px'};
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .metric-icon ha-icon {
          --mdc-icon-size: ${scale.metricIconMdi};
        }

        .metric-label {
          font-size: ${scale.metricLabelSize};
          opacity: 0.7;
          font-weight: 500;
        }

        .metric-value {
          font-size: ${scale.metricValueSize};
          font-weight: 500;
          margin-top: 4px;
        }

        .metric-unit {
          font-size: ${scale.metricUnitSize};
          opacity: 0.7;
          margin-left: 4px;
        }

        .decorative-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(${scale.blobBlur});
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
          width: ${scale.blob1Size};
          height: ${scale.blob1Size};
          top: 0;
          right: 0;
          transform: translate(30%, -30%);
          animation-delay: 0s;
        }

        .blob-2 {
          width: ${scale.blob2Size};
          height: ${scale.blob2Size};
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
                         style="color: ${colors.light}; --mdc-icon-size: ${scale.comfortIconSize};">
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
      name: "WeatherSense",
      scale: "normal"
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
      // Update entity picker with new hass object and refresh filter
      this._updateEntityPickerFilter();
    }
  }

  setConfig(config) {
    this._config = {
      ...config,
      scale: config.scale || 'normal'
    };
    
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
        ha-textfield,
        ha-select {
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
          label="Entity (WeatherSense)"
          .value="${this._config.entity || ''}"
          allow-custom-entity
        ></ha-entity-picker>
        
        <ha-select
          id="scale-select"
          label="Display Scale"
          .value="${this._config.scale || 'normal'}"
        >
          <mwc-list-item value="normal">Normal</mwc-list-item>
          <mwc-list-item value="compact">Compact (2x smaller)</mwc-list-item>
          <mwc-list-item value="ultra-compact">Ultra Compact (3x smaller)</mwc-list-item>
        </ha-select>
      </div>
    `;

    this._initialized = true;
    this._attachEventListeners();
    
    // Set initial values after rendering
    requestAnimationFrame(() => {
      this._updateFields();
      this._updateEntityPickerFilter();
    });
  }
  
  _updateEntityPickerFilter() {
    if (!this._hass) return;
    
    const entityPicker = this.querySelector('#entity-picker');
    if (entityPicker) {
      entityPicker.hass = this._hass;
      // Show all sensor entities (including WeatherSense)
      entityPicker.includeDomains = ['sensor'];
    }
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
    
    // Update scale selector
    const scaleSelect = this.querySelector('#scale-select');
    if (scaleSelect && scaleSelect.value !== (this._config.scale || 'normal')) {
      scaleSelect.value = this._config.scale || 'normal';
    }
  }

  _attachEventListeners() {
    const nameInput = this.querySelector('#name-input');
    const entityPicker = this.querySelector('#entity-picker');
    const scaleSelect = this.querySelector('#scale-select');

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
    
    if (scaleSelect) {
      // Only handle direct selection event to prevent double-firing and dialog closing
      scaleSelect.addEventListener('selected', (ev) => {
        ev.stopPropagation(); // Prevent event bubbling
        
        const newValue = ev.detail?.index !== undefined 
          ? scaleSelect.items[ev.detail.index].value 
          : ev.target.value;
        
        if (this._config.scale === newValue) return;
        
        this._config = { ...this._config, scale: newValue };
        this._debouncedConfigChanged();
      });
    }
  }

  _debouncedConfigChanged() {
    // Clear existing timeout
    if (this._debounceTimeout) {
      clearTimeout(this._debounceTimeout);
    }
    
    // Set new timeout to fire config change (increased for better stability)
    this._debounceTimeout = setTimeout(() => {
      this._fireConfigChanged();
    }, 200);
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
