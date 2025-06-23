import { useState } from 'react';
import { FaYoutube, FaLink, FaAmazon } from 'react-icons/fa';
import { SiCrunchyroll, SiNetflix, SiFunimation } from 'react-icons/si';
import {FaXTwitter} from 'react-icons/fa6';


const AnimeCard = ({ anime, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const iconMap = {
        'YouTube': FaYoutube,
        'Crunchyroll': SiCrunchyroll,
        'Funimation': SiFunimation,
        'Netflix': SiNetflix,
        'Amazon Prime Video': FaAmazon,
        'Twitter': FaXTwitter,
    };

    // Return null if there's no anime data to prevent errors
    if (!anime) {
        return null;
    }

    const description = anime.description || 'No description available.';
    // Only show the button if the description is long enough to be clamped
    const showReadMoreButton = description.length > 250;

    return (
        <div 
            className="w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl flex flex-col md:flex-row animate-fadeInDown"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Left Side: Image */}
            <div className="md:flex-shrink-0 md:w-1/3 bg-gray-800">
                <img 
                    className="h-full w-full object-contain md:object-cover"
                    src={anime.coverImage.large} 
                    alt={`Cover for ${anime.title.english || anime.title.romaji}`} 
                />
            </div>

            {/* Right Side: Text Content */}
            <div className="p-6 flex flex-col justify-between">
                <div>
                    {/* Titles */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {anime.title.english || anime.title.romaji}
                    </h3>
                    <h4 className="text-md text-gray-500 mb-3">
                        {anime.title.native}
                    </h4>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {anime.genres.map(genre => (
                            <span key={genre} className="bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                {genre}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <div 
                        className={`text-gray-700 text-sm mb-2 ${!isExpanded && 'line-clamp-4'}`}
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                    
                    {/* "Read More" button */}
                    {showReadMoreButton && (
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-sky-600 hover:text-sky-800 text-sm font-semibold focus:outline-none"
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>

                {/* Footer Info */}
                <div className="text-sm text-gray-500 mt-4">
                    <p>{anime.episodes || 'N/A'} episodes &bull; {anime.duration || 'N/A'} min/ep</p>
                    <p>
                        Aired: {new Date(anime.startDate.year, (anime.startDate.month ? anime.startDate.month - 1 : 0)).toLocaleDateString('default', { month: 'long', year: 'numeric' })} 
                        -{anime.endDate && anime.endDate.month ? (
                            new Date(anime.endDate.year, anime.endDate.month - 1).toLocaleDateString('default', { month: 'long', year: 'numeric' })
                        ) : 'Present'}
                    </p>
                    <p>Avg. Score: {anime.averageScore || 'N/A'}%</p>
                </div>

                {/* External Links */}
                {anime.externalLinks && anime.externalLinks.length > 0 && (
                    <div className="flex items-center gap-x-4 mt-3">
                        {anime.externalLinks.map(link => {
                            const IconComponent = iconMap[link.site] || FaLink;
                            return (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={link.site}
                                    className="text-gray-500 hover:text-sky-600 transition-colors duration-200"
                                >
                                    <IconComponent size="1.75em" />
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnimeCard;