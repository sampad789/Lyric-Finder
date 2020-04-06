import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Lyrics = () => {
  const { getLyrics, suggestions, lyrics } = useContext(GlobalContext);

  /** const fetchLyrics = (a, b) => {
    for (var i = 0; i < a.length && b.length; i++) {
      return getLyrics(a, b);
    }
  }; */

  const refactor = lyrics.split("<br>").map(function(item, key) {
    return (
      <span key={key}>
        {item}
        <br />
      </span>
    );
  });
  /**  const suggestionList = suggestions.map((song, index) => (
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
  ));*/

  return (
    <div>
      <div className="container">
        <p>{refactor}</p>
      </div>
    </div>
  );
};
