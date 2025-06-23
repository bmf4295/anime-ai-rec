import SearchForm from './form/SearchForm';
import AnimeCard from './AnimeCard/AnimeCard'
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
      <div className="bg-sky-500 items-center justify-center min-h-screen flex flex-col space-y-8 w-full">
        <h1 className='text-8xl'>AnimeRec.io</h1>
        <div className="card">
          <SearchForm onSubmit={handleSearch} />

          {/* Use your manual isLoading state for the loading message */}
          {isLoading && <p>Finding your recommendations...</p>}

          {/* But use the hook's error state for GraphQL errors */}
          {error && <p>Oh no! Something went wrong fetching details: {error.message}</p>}
        </div>
        {RecommendationData && (
          <div id="anime-results-container" className="flex flex-wrap justify-center gap-4 p-4">
            {RecommendationData.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default App