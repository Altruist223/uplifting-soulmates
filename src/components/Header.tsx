
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
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
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" isActive={isActive('/')} label="Home" />
            <NavLink to="/breathe" isActive={isActive('/breathe')} label="Breathe" />
            <NavLink to="/mood" isActive={isActive('/mood')} label="Mood" />
            <NavLink to="/journal" isActive={isActive('/journal')} label="Journal" />
            <NavLink to="/resources" isActive={isActive('/resources')} label="Resources" />
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
            <MobileNavLink to="/breathe" isActive={isActive('/breathe')} label="Breathe" />
            <MobileNavLink to="/mood" isActive={isActive('/mood')} label="Mood" />
            <MobileNavLink to="/journal" isActive={isActive('/journal')} label="Journal" />
            <MobileNavLink to="/resources" isActive={isActive('/resources')} label="Resources" />
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
