import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const SearchForm = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSubmit(inputValue.trim());
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmitOnEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center rounded-full bg-blue-600 w-full">
            <input
                id="search-input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleSubmitOnEnter}
                placeholder="Enter your favorite anime..."
                className="flex-grow w-full px-6 py-4 text-grey-800 bg-white rounded-l-full focus:outline-none placeholder-gray-800"
            />
            <button
                type="submit"
                className="flex-shrink-0 px-6 py-4 text-white bg-blue-700 rounded-r-full hover:bg-blue-800 focus:outline-none"
            >
                <FaArrowRight size="1.5em" />
                <span className="sr-only">Search</span>
            </button>
        </form>
    );
};

export default SearchForm;
