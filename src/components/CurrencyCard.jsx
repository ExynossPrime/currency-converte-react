import React from 'react';

const CurrencyCard = ({ code, currency, onClick }) => {
    // Получаем первую букву кода валюты для символа
    const symbol = code.charAt(0);

    // Генерируем случайный градиент для фона символа
    const getRandomGradient = () => {
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

    return (
        <div className="card currency-card h-100" onClick={onClick}>
            <div className="card-body">
                <h5 className="card-title">
          <span
              className="currency-symbol"
              style={{ background: getRandomGradient() }}
          >
            {symbol}
          </span>
                    {code}
                </h5>
                <p className="card-text">Значение: {currency.value}</p>
            </div>
        </div>
    );
};

export default CurrencyCard;

