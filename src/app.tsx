import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AppShell from '@/components/layout/app-shell';
import ThemeSync from '@/components/providers/theme-sync';
import AboutPage from '@/pages/about-page';
import SearchPage from '@/pages/search-page';
import WishListPage from '@/pages/wishlist-page';

function App() {
  return (
    <BrowserRouter>
      <ThemeSync />
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to='/search' replace />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/wishlist' element={<WishListPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='*' element={<Navigate to='/search' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
