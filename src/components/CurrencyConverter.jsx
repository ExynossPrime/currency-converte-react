import React, { useState, useEffect } from 'react';
import { useCurrency } from '../hooks/useCurrency';

const CurrencyConverter = () => {
    const { currencies, convertAmount } = useCurrency();
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleConvert = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await convertAmount(fromCurrency, toCurrency, amount);
            setConvertedAmount(result);

            setLoading(false);
        } catch (err) {
            setError('Ошибка при конвертации');
            setLoading(false);
        }
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setConvertedAmount('');
    };

    useEffect(() => {
        // Сбрасываем результат при изменении валют или суммы
        setConvertedAmount('');
    }, [fromCurrency, toCurrency, amount]);

    return (
        <div className="container py-4">
            <h2 className="mb-4">Конвертер валют</h2>

            <div className="card glass-card">
                <div className="card-body">
                    <div className="currency-exchange">
                        <div className="row mb-4">
                            <div className="col-md-5">
                                <label htmlFor="from-currency" className="form-label">Из</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        id="amount"
                                        className="form-control"
                                        value={amount}
                                        onChange={(e) => setAmount(Math.max(0, e.target.value))}
                                        min="0"
                                        step="0.01"
                                    />
                                    <select
                                        id="from-currency"
                                        className="form-select"
                                        value={fromCurrency}
                                        onChange={(e) => setFromCurrency(e.target.value)}
                                    >
                                        {Object.keys(currencies).map((code) => (
                                            <option key={code} value={code}>
                                                {code}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-2 d-flex align-items-center justify-content-center my-3 my-md-0">
                                <button
                                    className="btn btn-light rounded-circle"
                                    onClick={handleSwap}
                                >
                                    <i className="bi bi-arrow-left-right"></i>
                                </button>
                            </div>

                            <div className="col-md-5">
                                <label htmlFor="to-currency" className="form-label">В</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="result-input"
                                        className="form-control"
                                        value={convertedAmount ? convertedAmount.toFixed(2) : ''}
                                        readOnly
                                    />
                                    <select
                                        id="to-currency"
                                        className="form-select"
                                        value={toCurrency}
                                        onChange={(e) => setToCurrency(e.target.value)}
                                    >
                                        {Object.keys(currencies).map((code) => (
                                            <option key={code} value={code}>
                                                {code}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary w-100"
                            onClick={handleConvert}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Конвертация...
                                </>
                            ) : (
                                'Конвертировать'
                            )}
                        </button>

                        {convertedAmount && (
                            <div className="result-card mt-4">
                                <h4 className="mb-0">
                                    {amount} {fromCurrency} = <strong>{convertedAmount.toFixed(2)} {toCurrency}</strong>
                                </h4>
                                <p className="mb-0 mt-2">
                                    1 {fromCurrency} = {(convertedAmount / amount).toFixed(4)} {toCurrency}
                                </p>
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger mt-3">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;
