import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  // Default open on desktop screen (>= 1024px)
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Keyboard shortcut: Press '[' or 'Ctrl+B' or 'Escape' to toggle/close sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
        return;
      }

      if (!isInput && (e.key === '[' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b'))) {
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-primary)] relative">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Full-Width / Shifted Content Container */}
      <div className={`flex-1 flex flex-col min-h-screen w-full overflow-x-hidden transition-all duration-300 ${sidebarOpen ? 'lg:pl-[300px]' : 'lg:pl-0'}`}>
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
