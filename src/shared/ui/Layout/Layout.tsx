import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/widgets';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
