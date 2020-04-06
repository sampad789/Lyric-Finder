import React, { useState, useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Header = () => {
  const [query, setQuery] = useState("");

  const { getSuggestions, suggestions, getLyrics } = useContext(GlobalContext);

  const focusSearch = useRef(null);

  const onSubmit = e => {
    e.preventDefault();
    getSuggestions(query);
  };

  const fetchLyrics = (a, b) => {
    for (var i = 0; i < a.length && b.length; i++) {
      return getLyrics(a, b);
    }
  };

  const suggestionList = suggestions.slice(0, 5).map((song, index) => (
    <div className="container" key={index}>
      <ul className="songs">
        <li>
          <span>
            <strong>{song.artist.name}</strong>- {song.title}
          </span>
          <button
            className="btn"
            onClick={() => fetchLyrics(song.artist.name, song.title)}
          >
            Get lyrics
          </button>
        </li>
      </ul>
    </div>
  ));

  useEffect(() => {
    focusSearch.current.focus();
  }, []);

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  //Only responds when query is changed
  useEffect(() => {
    let currentQuery = true;
    const controller = new AbortController();

    const loadJokes = async () => {
      if (!query) return null;

      await sleep(250);

      if (currentQuery) {
        await getSuggestions(query, controller);
      }
    };
    loadJokes();
    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [query]);

  return (
    <div>
      <header>
        <h1>LyricsSearch</h1>

        <form id="form" onSubmit={onSubmit}>
          <input
            type="text"
            id="search"
            placeholder="Enter artist or song name..."
            ref={focusSearch}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button>Search</button>
        </form>

        {suggestionList}
      </header>
    </div>
  );
};
