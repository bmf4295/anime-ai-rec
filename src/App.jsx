import SearchForm from './form/SearchForm';
import { useQuery, gql } from '@apollo/client';


function App() {
  return (
    <>
      <div className="bg-sky-500 items-center justify-center min-h-screen flex flex-col space-y-8 w-full">
        <h1 className='text-8xl'>AnimeRec.io</h1>
        <div className="card">
          <SearchForm />

        </div>
      </div>
    </>
  )
}

export default App