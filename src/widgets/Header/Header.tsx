import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">CO₂ Dashboard</h1>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">
          About
        </Link>
      </nav>
    </header>
  );
};
