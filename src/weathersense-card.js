import { LitElement, html, css } from 'lit';

class WeatherSenseCard extends LitElement {
  render() {
    return html`<ha-card>WeatherSense loading...</ha-card>`;
  }
}
customElements.define('weathersense-card', WeatherSenseCard);
