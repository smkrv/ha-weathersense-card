import { LitElement, html, css, nothing } from 'lit';
import { DEFAULT_CONFIG } from './constants.js';
import { t } from './translations.js';

class WeatherSenseCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object, state: true },
    };
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0;
      }
      .switch-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 4px 0;
      }
      .switch-label {
        flex: 1;
        font-size: 14px;
        color: var(--primary-text-color);
      }
      ha-entity-picker,
      ha-textfield,
      ha-select {
        width: 100%;
      }
      .unit-select {
        margin-left: 36px;
      }
    `;
  }

  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  _fireConfigChanged() {
    clearTimeout(this._debounce);
    this._debounce = setTimeout(() => {
      this.dispatchEvent(new CustomEvent('config-changed', {
        detail: { config: { ...this._config } },
        bubbles: true,
        composed: true,
      }));
    }, 200);
  }

  _entityChanged(ev) {
    this._config = { ...this._config, entity: ev.detail.value };
    this._fireConfigChanged();
  }

  _nameChanged(ev) {
    this._config = { ...this._config, name: ev.target.value };
    this._fireConfigChanged();
  }

  _selectChanged(key, ev) {
    this._config = { ...this._config, [key]: ev.detail.value };
    this._fireConfigChanged();
  }

  _switchChanged(key, ev) {
    this._config = { ...this._config, [key]: ev.target.checked };
    this._fireConfigChanged();
  }

  _handleSelectClosed(ev) {
    ev.stopPropagation();
  }

  render() {
    if (!this.hass || !this._config) return nothing;

    return html`
      <div class="card-config">

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.entity || ''}
          .label=${t('editor_entity', this.hass)}
          .includeDomains=${['sensor']}
          allow-custom-entity
          @value-changed=${this._entityChanged}
        ></ha-entity-picker>

        <ha-textfield
          .value=${this._config.name || ''}
          .label=${t('editor_name', this.hass)}
          @input=${this._nameChanged}
        ></ha-textfield>

        <ha-select
          .value=${this._config.scale || 'normal'}
          .label=${t('editor_scale', this.hass)}
          @selected=${(ev) => this._selectChanged('scale', ev)}
          @closed=${this._handleSelectClosed}
          fixedMenuPosition
          naturalMenuWidth
        >
          <mwc-list-item value="normal">${t('scale_normal', this.hass)}</mwc-list-item>
          <mwc-list-item value="compact">${t('scale_compact', this.hass)}</mwc-list-item>
          <mwc-list-item value="ultra-compact">${t('scale_ultra_compact', this.hass)}</mwc-list-item>
        </ha-select>

        <ha-select
          .value=${this._config.temperature_unit || ''}
          .label=${t('editor_temperature_unit', this.hass)}
          @selected=${(ev) => this._selectChanged('temperature_unit', ev)}
          @closed=${this._handleSelectClosed}
          fixedMenuPosition
          naturalMenuWidth
        >
          <mwc-list-item value="">Auto</mwc-list-item>
          <mwc-list-item value="°C">${t('unit_celsius', this.hass)}</mwc-list-item>
          <mwc-list-item value="°F">${t('unit_fahrenheit', this.hass)}</mwc-list-item>
        </ha-select>

        <div class="switch-row">
          <ha-switch
            .checked=${this._config.show_humidity}
            @change=${(ev) => this._switchChanged('show_humidity', ev)}
          ></ha-switch>
          <span class="switch-label">${t('editor_show_humidity', this.hass)}</span>
        </div>

        <div class="switch-row">
          <ha-switch
            .checked=${this._config.show_wind}
            @change=${(ev) => this._switchChanged('show_wind', ev)}
          ></ha-switch>
          <span class="switch-label">${t('editor_show_wind', this.hass)}</span>
        </div>

        ${this._config.show_wind ? html`
          <ha-select
            class="unit-select"
            .value=${this._config.wind_unit || 'km/h'}
            .label=${t('editor_wind_unit', this.hass)}
            @selected=${(ev) => this._selectChanged('wind_unit', ev)}
            @closed=${this._handleSelectClosed}
            fixedMenuPosition
            naturalMenuWidth
          >
            <mwc-list-item value="m/s">${t('unit_ms', this.hass)}</mwc-list-item>
            <mwc-list-item value="km/h">${t('unit_kmh', this.hass)}</mwc-list-item>
            <mwc-list-item value="mph">${t('unit_mph', this.hass)}</mwc-list-item>
            <mwc-list-item value="knots">${t('unit_knots', this.hass)}</mwc-list-item>
          </ha-select>
        ` : nothing}

        <div class="switch-row">
          <ha-switch
            .checked=${this._config.show_pressure}
            @change=${(ev) => this._switchChanged('show_pressure', ev)}
          ></ha-switch>
          <span class="switch-label">${t('editor_show_pressure', this.hass)}</span>
        </div>

        ${this._config.show_pressure ? html`
          <ha-select
            class="unit-select"
            .value=${this._config.pressure_unit || 'hPa'}
            .label=${t('editor_pressure_unit', this.hass)}
            @selected=${(ev) => this._selectChanged('pressure_unit', ev)}
            @closed=${this._handleSelectClosed}
            fixedMenuPosition
            naturalMenuWidth
          >
            <mwc-list-item value="hPa">${t('unit_hpa', this.hass)}</mwc-list-item>
            <mwc-list-item value="mmHg">${t('unit_mmhg', this.hass)}</mwc-list-item>
            <mwc-list-item value="inHg">${t('unit_inhg', this.hass)}</mwc-list-item>
            <mwc-list-item value="kPa">${t('unit_kpa', this.hass)}</mwc-list-item>
          </ha-select>
        ` : nothing}

        <div class="switch-row">
          <ha-switch
            .checked=${this._config.show_description}
            @change=${(ev) => this._switchChanged('show_description', ev)}
          ></ha-switch>
          <span class="switch-label">${t('editor_show_description', this.hass)}</span>
        </div>

        <div class="switch-row">
          <ha-switch
            .checked=${this._config.show_method}
            @change=${(ev) => this._switchChanged('show_method', ev)}
          ></ha-switch>
          <span class="switch-label">${t('editor_show_method', this.hass)}</span>
        </div>

      </div>
    `;
  }
}

customElements.define('weathersense-card-editor', WeatherSenseCardEditor);
