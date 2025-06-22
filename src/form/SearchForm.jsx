import { useState } from 'react';

const SearchForm = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); if (inputValue.trim()) {
            onSubmit(inputValue.trim());
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="  rounded-full bg-blue-800 w-full flex flex-row items-center">
            <div className="flex flex-row items-center">
                <input
                    id="search-input"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="username"
                    className="w-full px-4 py-2 rounded-full focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="w-1/4 mx-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <span>&#8594;</span>
                </button>
            </div>
        </form>
    );
};

export default SearchForm;
