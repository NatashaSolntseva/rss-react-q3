import { Routes, Route } from 'react-router-dom';

import { Layout } from '@/shared/ui';
import { About, Home, NotFound } from '@/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="404-not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
