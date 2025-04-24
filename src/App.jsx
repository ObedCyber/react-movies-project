import { useState, useEffect } from 'react';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';

const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  // Fetch trending movies from the API
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  const fetchMovie = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const url = query ? `${API_BASE_URL}search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      // fetch is always used to make a request to an API endpoint.
      const response = await fetch(url, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // The response is in JSON format, so we need to parse it.
      const data = await response.json();
      // if fetching data failes
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      // if it succeeds
      setMovieList(data.results || []);

      // if a movies exist and query is made
      if (query && data.results.length > 0) {
        // update the search count in appwrite database
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movie data: ${error}`);
      setErrorMessage('Failed to fetch movie data. Please try again later..');
    } finally {
      setIsLoading(false);
    }
  }

  // this useEffect is empty, meaning it will run only once when the component mounts
  // and will not run again unless the component is unmounted and remounted.
  useEffect(() => {
    fetchMovie(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  } , []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                   <p>{index + 1}</p> 
                   <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* All Movies */}
        <section className='all-movies'>
          <h2>All Movies </h2>
          {/* check if is isLoading */}

          {isLoading ? ( // if loading is true, show loading message
            <Spinner />
          ) : errorMessage ? ( // else if there is an error, show error message
            <p className="text-red-500">{errorMessage}</p>
          ) : ( // else show the list of movies
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;