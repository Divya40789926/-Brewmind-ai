import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar({ cartCount }) {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black text-white">
      <div className="text-xl font-bold">BrewMind AI</div>
      <ul className="flex gap-6 text-sm items-center">
        <li><Link to="/" className="hover:text-amber-400">Home</Link></li>
        <li><Link to="/menu" className="hover:text-amber-400">Menu</Link></li>
        <li><Link to="/about" className="hover:text-amber-400">About</Link></li>
        <li><Link to="/contact" className="hover:text-amber-400">Contact</Link></li>

        {user ? (
          <>
            <li className="text-amber-400">Hi, {user.name}</li>
            <li><button onClick={logout} className="hover:text-amber-400">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="hover:text-amber-400">Login</Link></li>
            <li><Link to="/register" className="hover:text-amber-400">Register</Link></li>
          </>
        )}

        <li className="bg-amber-400 text-black px-3 py-1 rounded-full font-semibold">
          Cart ({cartCount})
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;