import SearchForm from './components/form/SearchForm';
import AnimeCard from './components/AnimeCard/AnimeCard'
import LoadingSpinner from './components/loadingSpinner/loadingSpinner';
import Error from './components/error/Error';
import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { ANIME_QUERY } from './scripts/AniChartAPI/AnimeSearch';
import getAIRecommendation from './scripts/OpenAI_API/AIRec';
function App() {
  const [RecommendationData, SetRecommendationData] = useState([]);

  const [getAnimeDetails, { loading, error }] = useLazyQuery(ANIME_QUERY);

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchValue) => {
    SetRecommendationData([]);
    setIsLoading(true);
    const recommendedAnime = await getAIRecommendation(searchValue);

    const detailsPromises = recommendedAnime.map(name =>
      getAnimeDetails({ variables: { search: name } })
    );

    const results = await Promise.all(detailsPromises);

    // Extract the data from the results and update state
    const finalData = results.map(result => result.data.Media).filter(Boolean);

    SetRecommendationData(finalData);
    setIsLoading(false);
  };

  return (
    <>
      <div className="font-inter bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 animate-gradient items-center justify-center min-h-screen flex flex-col space-y-8 w-full">
        <h1 className='font-gugi pt-4 text-4xl md:text-8xl'>AnimeRec.io</h1>
        <div className="card w-full max-w-2xl flex flex-col items-center">
          <SearchForm onSubmit={handleSearch} />

          {/* Use your manual isLoading state for the loading message */}
          {isLoading && (
            <div className="mt-8">
              <LoadingSpinner />
            </div>
          )}

          <Error error={error} />
        </div>
        {RecommendationData && (
          <div id="anime-results-container" className="flex flex-wrap justify-center gap-4 p-4">
            {RecommendationData.map((anime, index) => (
              <AnimeCard key={anime.id} anime={anime} index={index} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default App