
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-primary font-semibold text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary">S</span>
            </div>
            <span className="text-foreground">Serenity</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" isActive={isActive('/')} label="Home" />
            <NavLink to="/dashboard" isActive={isActive('/dashboard')} label="Dashboard" />
            <NavLink to="/breathe" isActive={isActive('/breathe')} label="Breathe" />
            <NavLink to="/mood" isActive={isActive('/mood')} label="Mood" />
            <NavLink to="/journal" isActive={isActive('/journal')} label="Journal" />
            <NavLink to="/resources" isActive={isActive('/resources')} label="Resources" />
            
            {user ? (
              <Link 
                to="/profile" 
                className="flex items-center gap-1 p-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <User size={18} className="text-primary" />
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-1.5 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
          
          <button 
            className="md:hidden p-2 rounded-md text-foreground hover:bg-background"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card m-3 rounded-xl overflow-hidden animate-fade-in">
          <nav className="flex flex-col py-3">
            <MobileNavLink to="/" isActive={isActive('/')} label="Home" />
            <MobileNavLink to="/dashboard" isActive={isActive('/dashboard')} label="Dashboard" />
            <MobileNavLink to="/breathe" isActive={isActive('/breathe')} label="Breathe" />
            <MobileNavLink to="/mood" isActive={isActive('/mood')} label="Mood" />
            <MobileNavLink to="/journal" isActive={isActive('/journal')} label="Journal" />
            <MobileNavLink to="/resources" isActive={isActive('/resources')} label="Resources" />
            
            {user ? (
              <MobileNavLink to="/profile" isActive={isActive('/profile')} label="Profile" />
            ) : (
              <MobileNavLink to="/login" isActive={isActive('/login')} label="Sign In" />
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, isActive, label }: { to: string; isActive: boolean; label: string }) => (
  <Link 
    to={to} 
    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive 
        ? 'text-primary font-semibold' 
        : 'text-foreground/80 hover:text-foreground hover:bg-primary/5'
    }`}
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, isActive, label }: { to: string; isActive: boolean; label: string }) => (
  <Link 
    to={to} 
    className={`px-6 py-3 text-base font-medium transition-all ${
      isActive 
        ? 'text-primary bg-primary/5 border-l-2 border-primary' 
        : 'text-foreground/80 hover:bg-primary/5 hover:border-l-2 hover:border-primary/30'
    }`}
  >
    {label}
  </Link>
);

export default Header;
