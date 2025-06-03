import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Categories from './pages/Categories';
import BuildNotes from './pages/BuildNotes';
import BuildNoteDetail from './pages/BuildNoteDetail';
import Gallery from './pages/Gallery';
import GalleryItemDetail from './pages/GalleryItemDetail';
import Links from './pages/Links';
import TodoList from './pages/TodoList';
import PartDetails from './pages/PartDetails';
import Settings from './pages/Settings';
import { Toaster } from './components/ui/Toaster';
import { useThemeStore } from './store/themeStore';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className="flex min-h-screen bg-neutral-950 text-white overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden lg:pl-0 pl-16">
          <Header />
          <main className="flex-1 overflow-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/builds" element={<BuildNotes />} />
              <Route path="/builds/:id" element={<BuildNoteDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/:id" element={<GalleryItemDetail />} />
              <Route path="/links" element={<Links />} />
              <Route path="/todo" element={<TodoList />} />
              <Route path="/parts/:id" element={<PartDetails />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </div>
    </Router>
  );
}

export default App