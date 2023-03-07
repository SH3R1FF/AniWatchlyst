import React, { useState, useEffect } from 'react';
import './index.css'

function App() {
  const [animeList, setAnimeList] = useState(() => {
    const savedAnimeList = localStorage.getItem('animeList');
    return savedAnimeList ? JSON.parse(savedAnimeList) : [];
  });
  const [animeTitle, setAnimeTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('animeList', JSON.stringify(animeList));
  }, [animeList]);

  function handleSubmit(e) {
    e.preventDefault();
    setAnimeList(prevAnimeList => [...prevAnimeList, animeTitle]);
    setAnimeTitle('');
  }

  function handleDelete(animeTitleToDelete) {
    setAnimeList(prevAnimeList =>
      prevAnimeList.filter(title => title !== animeTitleToDelete)
    );
  }

  return (

  <div className='backdrop-blur-sm flex h-screen '>
    <div className="rounded-md shadow-lg w-500 m-auto p-4 hover:border-none">
      <h1 className="text-4xl font-bold mb-4 text-center ">AniWatchlyst</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="rounded px-4 py-2 w-full mb-4 shadow-lg focus:outline-none ring-2 focus:ring-red-400"
          type="text"
          placeholder="Add anime to the watchlist"
          value={animeTitle}
          onChange={e => setAnimeTitle(e.target.value)}
        />
        <button
          className=" text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add
        </button>
      </form>
      {animeList.length > 0 ? (
        <ul className="list-disc pl-4 py-34">
          {animeList.map(animeTitle => (
            <li  key={animeTitle} className="flex justify-between">{animeTitle} <button type='Delete' onClick={() => handleDelete(animeTitle)}>Delete</button></li>
         
            
          ))}
          
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">No anime added yet.</p>
      )}
    </div>
  </div>
  );
}



export default App;



