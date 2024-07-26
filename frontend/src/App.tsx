import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shelf from './pages/Shelf'
import Statistics from './pages/Statistics'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shelf" element={<Shelf />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </>
  )
}

export default App
