import React, { createContext, useState, useEffect } from 'react';
import { fetchCurrencies } from '../services/api';

export const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children }) => {
    const [currencies, setCurrencies] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(null);

    useEffect(() => {
        const loadCurrencies = async () => {
            try {
                setLoading(true);
                const data = await fetchCurrencies();
                setCurrencies(data);
                setLoading(false);
            } catch (err) {
                setError('Не удалось загрузить валюты');
                setLoading(false);
            }
        };

        loadCurrencies();
    }, []);

    const value = {
        currencies,
        loading,
        error,
        selectedCurrency,
        setSelectedCurrency
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};
