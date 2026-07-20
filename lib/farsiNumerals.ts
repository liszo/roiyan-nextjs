const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Converts any Latin digits (0-9) found in a string or number to Persian numerals.
 * Non-digit characters (%, +, /, x, spaces, separators) are preserved as-is.
 */
export function toFarsiDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (digit) => persianDigits[Number(digit)]);
}
