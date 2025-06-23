import { FaExclamationTriangle } from 'react-icons/fa';

const Error = ({ error }) => {
    if (!error) {
        return null;
    }

    return (
        <div 
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-8 rounded-md shadow-md w-full max-w-2xl flex items-center"
            role="alert"
        >
            <FaExclamationTriangle className="text-red-500 mr-4" size="1.5em" />
            <div>
                <p className="font-bold">Oops! Something went wrong.</p>
                <p>{error.message}</p>
            </div>
        </div>
    );
};

export default Error;
