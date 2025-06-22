import React from 'react';
import SearchForm from './form/SearchForm';

function App() {

  return (
    <>
      <div className="bg-sky-500 items-center justify-center min-h-screen flex flex-col space-y-8 w-full">
        <h1 className='text-8xl'>AnimeRec.io</h1>
        <div className="card">
          <SearchForm onSubmit={(searchValue) => {
            // Handle the search value here
            console.log('Searching for:', searchValue);
          }} />

        </div>
      </div>
    </>
  )
}

export default App