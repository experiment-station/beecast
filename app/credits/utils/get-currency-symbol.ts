export function getCurrencySymbol(currency: string): string {
  const normalizedCurrency = currency.toUpperCase();

  switch (normalizedCurrency) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    default:
      return normalizedCurrency;
  }
}
