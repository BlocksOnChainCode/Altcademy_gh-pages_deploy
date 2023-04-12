import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MovieFinder from "./components/Home";
import Home from "./components/Home";
import Movie from "./components/Movie";

const NotFound = () => {
  return <h1>404: Not Found</h1>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieFinder />} />
      <Route path="/Movie/:id" element={<Movie />} />
      <Route element={<NotFound />} />
    </Routes>
  );
}

export default App;
