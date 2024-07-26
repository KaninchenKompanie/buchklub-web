import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shelf from './pages/Shelf'
import Statistics from './pages/Statistics'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shelf" element={<Shelf />} />
      <Route path="/statistics" element={<Statistics />} />
    </Routes>
    </>
  )
}

export default App
