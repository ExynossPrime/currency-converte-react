import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCurrency } from '../hooks/useCurrency';

const Navbar = () => {
    const location = useLocation();
    const { loading } = useCurrency();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <i className="bi bi-currency-exchange me-2"></i>КонвертерВалют
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                                to="/"
                            >
                                <i className="bi bi-grid me-1"></i>Валюты
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/converter' ? 'active' : ''}`}
                                to="/converter"
                            >
                                <i className="bi bi-arrow-left-right me-1"></i>Конвертер
                            </Link>
                        </li>
                    </ul>
                    {loading && (
                        <div className="ms-auto text-light">
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
