export type Currency = 'INR' | 'USD' | 'EUR';

export const currencySymbols: Record<Currency, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€'
};

// Exchange rates (base: INR)
// Update these periodically or fetch from API
export const exchangeRates: Record<Currency, number> = {
    INR: 1,
    USD: 0.012,  // 1 INR = 0.012 USD (approx)
    EUR: 0.011   // 1 INR = 0.011 EUR (approx)
};

export const convertPrice = (priceInINR: number, toCurrency: Currency): number => {
    const rate = exchangeRates[toCurrency];
    const converted = priceInINR * rate;

    // Round to 2 decimal places
    return Math.round(converted * 100) / 100;
};

export const formatPrice = (price: number, currency: Currency): string => {
    const symbol = currencySymbols[currency];

    if (currency === 'INR') {
        // Indian number format with commas
        return `${symbol}${price.toLocaleString('en-IN')}`;
    } else {
        // Western format
        return `${symbol}${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
};
