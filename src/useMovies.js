import { useEffect, useState } from "react";

const KEY = "e27cbc5";

export function useMovies(query, callBack) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callBack?.();

      const controller = new AbortController();
      async function fetchMovies() {
        setIsloading(true);
        setError("");
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Somthing went wrong in fetching movies");

          // Ensure we properly invoke res.json()
          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not Found");
          if (data.Search) {
            setMovies(data.Search); // Set movies if the search results exist
            setError("");
          } else {
            setMovies([]); // Reset to an empty array if no search results
          }
          // setIsloading(false);
        } catch (error) {
          console.error("Error fetching movies:", error);
          setError(error.message);

          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsloading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //   handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },

    [query]
  );
  return { movies, isLoading, error };
}
