import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCurrency } from '../hooks/useCurrency';

const CurrencyDetail = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const { selectedCurrency, getCurrencyDetails } = useCurrency();
    const [currency, setCurrency] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCurrencyDetails = async () => {
            try {
                setLoading(true);

                // Если валюта уже выбрана в контексте, используем ее
                if (selectedCurrency && selectedCurrency.code === code) {
                    setCurrency(selectedCurrency);
                } else {
                    // Иначе загружаем детали с API
                    const data = await getCurrencyDetails(code);
                    setCurrency({ code, ...data[code] });
                }

                setLoading(false);
            } catch (err) {
                setError(`Не удалось загрузить детали для ${code}`);
                setLoading(false);
            }
        };

        loadCurrencyDetails();
    }, [code, selectedCurrency, getCurrencyDetails]);

    // Функция для получения первой буквы валюты для символа
    const getCurrencySymbol = (code) => {
        return code.charAt(0);
    };

    // Функция для получения градиента фона для символа
    const getGradient = (code) => {
        const gradients = [
            'linear-gradient(135deg, #6366f1, #8b5cf6)',
            'linear-gradient(135deg, #10b981, #059669)',
            'linear-gradient(135deg, #f59e0b, #d97706)',
            'linear-gradient(135deg, #ef4444, #dc2626)',
            'linear-gradient(135deg, #0ea5e9, #0284c7)',
            'linear-gradient(135deg, #8b5cf6, #7c3aed)'
        ];
        return gradients[code.charCodeAt(0) % gradients.length];
    };

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

    if (!currency) {
        return (
            <div className="alert alert-warning" role="alert">
                Валюта не найдена
            </div>
        );
    }

    return (
        <div className="container py-4">
            <button
                className="btn btn-link p-0 mb-3"
                onClick={() => navigate('/')}
            >
                <i className="bi bi-arrow-left me-1"></i>Назад к списку валют
            </button>

            <div className="card glass-card">
                <div className="card-header d-flex align-items-center">
          <span
              className="currency-symbol"
              style={{ background: getGradient(code) }}
          >
            {getCurrencySymbol(code)}
          </span>
                    <h3 className="mb-0">Детали {code}</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="detail-item">
                                <h5>Код валюты</h5>
                                <p className="fs-4">{code}</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="detail-item">
                                <h5>Значение (к USD)</h5>
                                <p className="fs-4">{currency.value}</p>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="detail-item">
                                <h5>Последнее обновление</h5>
                                <p>{new Date(currency.last_updated_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrencyDetail;
