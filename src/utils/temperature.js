export function toDisplayTemperature(value, unit = 'celsius') {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return '--'
  }

  return unit === 'fahrenheit' ? Math.round((numericValue * 9) / 5 + 32) : Math.round(numericValue)
}
