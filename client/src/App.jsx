// App.jsx — Root application component. Sets up routing with react-router-dom for Home and 404 pages.

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Loader from './components/Loader'

function App() {
  return (
    <div className="bg-base text-main min-h-screen font-sans font-light relative overflow-x-hidden">
      <Loader />

      {/* Raw Grid Lines (Visible structural elements) */}
      <div className="fixed left-4 md:left-12 top-0 bottom-0 w-px bg-white/[0.03] pointer-events-none z-50"></div>
      <div className="fixed right-4 md:right-12 top-0 bottom-0 w-px bg-white/[0.03] pointer-events-none z-50"></div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
