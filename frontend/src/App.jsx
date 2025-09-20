import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";



const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
  )
}

export default App
