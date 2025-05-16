import { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';
import { fetchCurrencyDetails, convertCurrency } from '../services/api';

export const useCurrency = () => {
    const context = useContext(CurrencyContext);

    if (!context) {
        throw new Error('useCurrency должен использоваться внутри CurrencyProvider');
    }

    const { currencies, loading, error, selectedCurrency, setSelectedCurrency } = context;

    const getCurrencyDetails = async (code) => {
        try {
            return await fetchCurrencyDetails(code);
        } catch (error) {
            console.error('Ошибка при получении деталей валюты:', error);
            throw error;
        }
    };

    const convertAmount = async (from, to, amount) => {
        try {
            return await convertCurrency(from, to, amount);
        } catch (error) {
            console.error('Ошибка при конвертации валюты:', error);
            throw error;
        }
    };

    return {
        currencies,
        loading,
        error,
        selectedCurrency,
        setSelectedCurrency,
        getCurrencyDetails,
        convertAmount
    };
};
