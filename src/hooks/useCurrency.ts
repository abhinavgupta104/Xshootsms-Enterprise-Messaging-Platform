import { useState, useEffect } from 'react';
import { Currency } from '@/data/currencyRates';

const CURRENCY_STORAGE_KEY = 'xshootsms_preferred_currency';

export const useCurrency = () => {
    const [currency, setCurrency] = useState<Currency>(() => {
        // Try to get from localStorage
        const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
        if (stored && ['INR', 'USD', 'EUR'].includes(stored)) {
            return stored as Currency;
        }

        // Default to INR
        return 'INR';
    });

    useEffect(() => {
        // Save to localStorage whenever currency changes
        localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    }, [currency]);

    const changeCurrency = (newCurrency: Currency) => {
        setCurrency(newCurrency);
    };

    return {
        currency,
        changeCurrency
    };
};
