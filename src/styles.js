import { css } from 'lit';

export const cardStyles = css`
  /* === Scale: Normal (defaults) === */
  :host {
    --ws-padding: 24px;
    --ws-radius: 16px;
    --ws-temp-size: 48px;
    --ws-unit-size: 20px;
    --ws-feels-size: 14px;
    --ws-metric-gap: 12px;
    --ws-metric-padding: 14px;
    --ws-metric-radius: 12px;
    --ws-metric-icon-size: 22px;
    --ws-metric-value-size: 18px;
    --ws-metric-label-size: 12px;
    --ws-name-size: 14px;
    --ws-desc-size: 13px;
    --ws-badge-padding: 6px 14px;
    --ws-badge-size: 12px;
    --ws-icon-size: 28px;
    --ws-blob-size: 200px;
    --ws-blob-blur: 60px;
    display: block;
  }

  /* === Scale: Compact === */
  :host(.compact) {
    --ws-padding: 16px;
    --ws-radius: 12px;
    --ws-temp-size: 36px;
    --ws-unit-size: 16px;
    --ws-feels-size: 12px;
    --ws-metric-gap: 8px;
    --ws-metric-padding: 10px;
    --ws-metric-radius: 8px;
    --ws-metric-icon-size: 18px;
    --ws-metric-value-size: 15px;
    --ws-metric-label-size: 11px;
    --ws-name-size: 12px;
    --ws-desc-size: 11px;
    --ws-badge-padding: 4px 10px;
    --ws-badge-size: 11px;
    --ws-icon-size: 22px;
    --ws-blob-size: 140px;
    --ws-blob-blur: 40px;
  }

  /* === Scale: Ultra-Compact === */
  :host(.ultra-compact) {
    --ws-padding: 12px;
    --ws-radius: 8px;
    --ws-temp-size: 28px;
    --ws-unit-size: 13px;
    --ws-feels-size: 11px;
    --ws-metric-gap: 6px;
    --ws-metric-padding: 8px;
    --ws-metric-radius: 6px;
    --ws-metric-icon-size: 16px;
    --ws-metric-value-size: 13px;
    --ws-metric-label-size: 10px;
    --ws-name-size: 11px;
    --ws-desc-size: 10px;
    --ws-badge-padding: 3px 8px;
    --ws-badge-size: 10px;
    --ws-icon-size: 18px;
    --ws-blob-size: 100px;
    --ws-blob-blur: 30px;
  }

  /* === Card Container === */
  ha-card {
    position: relative;
    overflow: hidden;
    border-radius: var(--ws-radius);
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--ws-color-bg, #10b981) 14%, var(--card-background-color, #fff)),
      color-mix(in srgb, var(--ws-color-bg, #10b981) 8%, var(--card-background-color, #fff))
    );
    border: 1px solid color-mix(in srgb, var(--ws-color-light, #86efac) 15%, transparent);
    animation: cardEntrance 0.5s ease-out;
    transition: all 0.3s ease;
  }

  /* === Decorative Blob === */
  .decorative-blob {
    position: absolute;
    top: -30%;
    right: -20%;
    width: var(--ws-blob-size);
    height: var(--ws-blob-size);
    border-radius: 50%;
    background: radial-gradient(
      circle,
      color-mix(in srgb, var(--ws-color-light, #86efac) 12%, transparent),
      transparent 70%
    );
    filter: blur(var(--ws-blob-blur));
    animation: blobFloat 20s infinite ease-in-out;
    pointer-events: none;
    z-index: 0;
  }

  /* === Content === */
  .content-container {
    position: relative;
    z-index: 1;
    padding: var(--ws-padding);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* === Header === */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .card-name {
    font-size: var(--ws-name-size);
    font-weight: 500;
    color: var(--secondary-text-color, #666);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .comfort-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: var(--ws-badge-padding);
    border-radius: 20px;
    font-size: var(--ws-badge-size);
    font-weight: 600;
    letter-spacing: 0.3px;
    white-space: nowrap;
    transition: all 0.3s ease;
  }

  .comfort-badge.comfy {
    background: color-mix(in srgb, var(--ws-color-bg, #10b981) 15%, transparent);
    color: var(--ws-color-text, #059669);
    border: 1px solid color-mix(in srgb, var(--ws-color-light, #86efac) 25%, transparent);
  }

  .comfort-badge.not-comfy {
    background: color-mix(in srgb, var(--ws-color-bg, #ef4444) 15%, transparent);
    color: var(--ws-color-text, #dc2626);
    border: 1px solid color-mix(in srgb, var(--ws-color-light, #f87171) 25%, transparent);
  }

  /* === Temperature Display === */
  .temp-section {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .temp-icon {
    --mdc-icon-size: var(--ws-icon-size);
    color: var(--ws-color-text, #059669);
    transition: color 0.3s ease;
  }

  .temp-main {
    display: flex;
    flex-direction: column;
  }

  .temp-value-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .temp-value {
    font-size: var(--ws-temp-size);
    font-weight: 700;
    line-height: 1;
    color: var(--primary-text-color, #333);
    transition: all 0.3s ease;
  }

  .temp-unit {
    font-size: var(--ws-unit-size);
    font-weight: 400;
    color: var(--secondary-text-color, #666);
  }

  .feels-like {
    font-size: var(--ws-feels-size);
    color: var(--secondary-text-color, #666);
    margin-top: 2px;
  }

  .feels-like-value {
    font-weight: 600;
    color: var(--ws-color-text, #059669);
    transition: color 0.3s ease;
  }

  /* === Method Line === */
  .method-line {
    font-size: var(--ws-desc-size);
    color: var(--secondary-text-color, #666);
    opacity: 0.7;
    font-style: italic;
  }

  /* === Metrics Grid === */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    gap: var(--ws-metric-gap);
  }

  .metric-card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: var(--ws-metric-padding);
    border-radius: var(--ws-metric-radius);
    background: color-mix(in srgb, var(--ws-color-light, #86efac) 6%, transparent);
    border: 1px solid color-mix(in srgb, var(--ws-color-light, #86efac) 10%, transparent);
    transition: all 0.3s ease;
    cursor: default;
  }

  .metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px color-mix(in srgb, var(--ws-color-bg, #10b981) 15%, transparent);
  }

  .metric-icon {
    --mdc-icon-size: var(--ws-metric-icon-size);
    color: var(--ws-color-text, #059669);
    flex-shrink: 0;
    transition: color 0.3s ease;
  }

  .metric-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .metric-value {
    font-size: var(--ws-metric-value-size);
    font-weight: 600;
    color: var(--primary-text-color, #333);
    line-height: 1.2;
  }

  .metric-label {
    font-size: var(--ws-metric-label-size);
    color: var(--secondary-text-color, #666);
    line-height: 1.2;
  }

  /* === Description === */
  .description-block {
    font-size: var(--ws-desc-size);
    color: var(--secondary-text-color, #666);
    line-height: 1.5;
    padding-top: 4px;
    border-top: 1px solid color-mix(in srgb, var(--ws-color-light, #86efac) 10%, transparent);
  }

  /* === Unavailable State === */
  .unavailable {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--ws-padding);
    gap: 8px;
    color: var(--secondary-text-color, #666);
    min-height: 80px;
  }

  .unavailable ha-icon {
    --mdc-icon-size: 32px;
    opacity: 0.5;
  }

  .unavailable span {
    font-size: var(--ws-desc-size);
  }

  /* === Animations === */
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

  @keyframes blobFloat {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(-10px, 15px) scale(1.05);
    }
    66% {
      transform: translate(5px, -10px) scale(0.95);
    }
  }

  /* === Responsive === */
  @media (max-width: 480px) {
    .metrics-grid {
      grid-template-columns: 1fr;
    }
  }
`;
