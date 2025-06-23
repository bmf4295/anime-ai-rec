import loading from '../assets/loading.gif';
const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <img src={loading} alt="Loading..." className="w-48 h-48 mx-auto" />  
            <p className="text-center text-2xl text-gray-800 mt-4 animate-ellipsis">Finding your recommendations</p>
        </div>
    )
}

export default LoadingSpinner;