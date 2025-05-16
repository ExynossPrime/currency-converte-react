import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../hooks/useCurrency';
import CurrencyCard from './CurrencyCard';
import SearchBar from './SearchBar';

const CurrencyList = () => {
    const { currencies, loading, error, setSelectedCurrency } = useCurrency();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleCurrencyClick = (code, currency) => {
        setSelectedCurrency({ code, ...currency });
        navigate(`/currency/${code}`);
    };

    const filteredCurrencies = Object.entries(currencies).filter(([code]) =>
        code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="text-center p-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">Доступные валюты</h2>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Поиск валюты..."
            />

            <div className="row g-3 mt-3">
                {filteredCurrencies.map(([code, currency]) => (
                    <div className="col-sm-6 col-md-4 col-lg-3" key={code}>
                        <CurrencyCard
                            code={code}
                            currency={currency}
                            onClick={() => handleCurrencyClick(code, currency)}
                        />
                    </div>
                ))}

                {filteredCurrencies.length === 0 && (
                    <div className="col-12 text-center">
                        <p>Валюты не найдены</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrencyList;
