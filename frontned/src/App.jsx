import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import EditorPage from "./pages/EditorPage.jsx"

import { Toaster } from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Toaster position='top-center'
          toastOptions={{
            success: {
              theme: {
                primary: '#4aed88',
              }
            }
          }} />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomID" element={<EditorPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
