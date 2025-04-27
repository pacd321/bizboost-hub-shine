
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
  const sanitized = value.replace(/[^\d.-]/g, '');
  return Number(sanitized);
}
