import React from 'react';
import './style.css';
import { Routes, Route } from "react-router-dom";
import FILE_UPLOAD from "./FILE_UPLOAD";
import TABLE from "./TABLE";
import DASHBOARD from "./DASHBOARD";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FILE_UPLOAD />} />
      <Route path="/TABLE" element={<TABLE />} />
      <Route path="/DASHBOARD" element={<DASHBOARD />} />
    </Routes>
  );
}

export default App;

