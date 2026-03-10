export function convertTemperature(value, fromUnit, toUnit) {
  if (fromUnit === toUnit || !toUnit) return value;
  if (fromUnit === '°C' && toUnit === '°F') return value * 9 / 5 + 32;
  if (fromUnit === '°F' && toUnit === '°C') return (value - 32) * 5 / 9;
  return value;
}

export function convertWindSpeed(ms, toUnit) {
  switch (toUnit) {
    case 'm/s':   return ms;
    case 'km/h':  return ms * 3.6;
    case 'mph':   return ms * 2.23694;
    case 'knots': return ms * 1.94384;
    default:      return ms * 3.6;
  }
}

export function convertPressure(kpa, toUnit) {
  switch (toUnit) {
    case 'kPa':  return kpa;
    case 'hPa':  return kpa * 10;
    case 'mmHg': return kpa * 7.50062;
    case 'inHg': return kpa * 0.29530;
    default:     return kpa * 10;
  }
}

export function formatValue(value, decimals = 0) {
  if (value === null || value === undefined || isNaN(value)) return '—';
  return Number(value).toFixed(decimals);
}

const UNIT_TRANSLATION_KEYS = {
  '°C': 'unit_celsius', '°F': 'unit_fahrenheit',
  'hPa': 'unit_hpa', 'mmHg': 'unit_mmhg', 'inHg': 'unit_inhg', 'kPa': 'unit_kpa',
  'm/s': 'unit_ms', 'km/h': 'unit_kmh', 'mph': 'unit_mph', 'knots': 'unit_knots',
};

export function translateUnit(unit, tFunc, hass) {
  const key = UNIT_TRANSLATION_KEYS[unit];
  return key ? tFunc(key, hass) : unit;
}

export function normalizeLanguage(lang) {
  if (!lang) return 'en';
  const normalized = lang.toLowerCase().replace('_', '-');
  if (normalized.startsWith('zh')) return 'zh-CN';
  if (normalized.startsWith('cs')) return 'cs';
  return normalized.split('-')[0];
}
