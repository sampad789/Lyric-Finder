import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import apiURL from "../utils/apiUrl";
// Initial state
const initialState = {
  suggestions: [],
  lyrics: "",
  loading: true
};

//Creating a Context object

export const GlobalContext = createContext(initialState);

//Provider Component-Every Context object comes with a Provider React component that allows
//consuming components to subscribe to context changes.
//https://reactjs.org/docs/context.html#reactcreatecontext

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions

  async function getSuggestions(term) {
    try {
      const res = await axios.get(`${apiURL}/suggest/${term}`);
      dispatch({
        type: "GET_SUGGESTIONS",
        payload: res.data.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getLyrics(artist, songTitle) {
    try {
      const res = await axios.get(`${apiURL}/v1/${artist}/${songTitle}`);
      dispatch({
        type: "GET_LYRICS",
        payload: res.data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>")
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getMoreSongs(url) {
    try {
      const res = await axios.get(`https://cors-anywhere.herokuapp.com/${url}`);
      dispatch({
        type: "GET_SUGGESTIONS",
        payload: res.data.data
      });
    } catch (error) {}
  }
  return (
    <GlobalContext.Provider
      value={{
        suggestions: state.suggestions,
        lyrics: state.lyrics,
        loading: state.loading,
        getSuggestions,
        getLyrics,
        getMoreSongs
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
