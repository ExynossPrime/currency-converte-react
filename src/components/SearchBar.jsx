import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
    return (
        <div className="search-wrapper mb-4">
            <input
                type="text"
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
            />
            <i className="bi bi-search"></i>
        </div>
    );
};

export default SearchBar;
