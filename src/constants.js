export const COMFORT_COLORS = {
  extreme_cold: { bg: '#1e3a8a', light: '#3b82f6', text: '#1e40af' },
  very_cold:    { bg: '#1e40af', light: '#60a5fa', text: '#1e40af' },
  cold:         { bg: '#2563eb', light: '#93c5fd', text: '#1d4ed8' },
  cool:         { bg: '#0891b2', light: '#67e8f9', text: '#0e7490' },
  slightly_cool:{ bg: '#0d9488', light: '#5eead4', text: '#0f766e' },
  comfortable:  { bg: '#10b981', light: '#86efac', text: '#059669' },
  slightly_warm:{ bg: '#f59e0b', light: '#fcd34d', text: '#d97706' },
  warm:         { bg: '#f97316', light: '#fb923c', text: '#ea580c' },
  hot:          { bg: '#ef4444', light: '#f87171', text: '#dc2626' },
  very_hot:     { bg: '#dc2626', light: '#f87171', text: '#b91c1c' },
  extreme_hot:  { bg: '#991b1b', light: '#ef4444', text: '#7f1d1d' },
};

export const COMFORT_ICONS = {
  extreme_cold:  'mdi:snowflake-alert',
  very_cold:     'mdi:snowflake-thermometer',
  cold:          'mdi:thermometer-low',
  cool:          'mdi:thermometer-minus',
  slightly_cool: 'mdi:thermometer-minus',
  comfortable:   'mdi:hand-okay',
  slightly_warm: 'mdi:thermometer-plus',
  warm:          'mdi:thermometer-high',
  hot:           'mdi:thermometer-alert',
  very_hot:      'mdi:heat-wave',
  extreme_hot:   'mdi:fire-alert',
};

export const DEFAULT_CONFIG = {
  scale: 'normal',
  show_humidity: true,
  show_wind: true,
  wind_unit: 'km/h',
  show_pressure: true,
  pressure_unit: 'hPa',
  temperature_unit: '',
  show_description: true,
  show_method: false,
};
