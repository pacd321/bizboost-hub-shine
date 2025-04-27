
/**
 * Format a number as Indian Rupees (INR)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a number as Indian Rupees (INR) without the currency symbol
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Parse a string with Indian number format to a number
 */
export function parseIndianNumber(value: string): number {
  // Remove all non-numeric characters except decimal point
  const sanitized = value.replace(/[^\d.-]/g, '');
  return Number(sanitized);
}

/**
 * Format a percentage value
 */
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
}

/**
 * Calculate profit margin as a percentage
 */
export function calculateProfitMargin(price: number, cost: number): number {
  if (price === 0) return 0;
  return ((price - cost) / price) * 100;
}

/**
 * Format profit margin with + or - sign
 */
export function formatProfitMargin(margin: number): string {
  const sign = margin >= 0 ? '+' : '';
  return `${sign}${margin.toFixed(1)}%`;
}
