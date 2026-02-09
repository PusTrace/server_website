import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, TrendingUp } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleanalysis = () => {
    navigate('/analysis');
  };


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <TrendingUp size={28} className="brand-icon" />
          <span>Steam Trading Bot</span>
        </Link>

        <div className="navbar-links">
          <Link 
            to="/dashboard" 
            className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}
          >
            <Activity size={18} />
            Dashboard
          </Link>
          
          
          <Link 
            to="/analysis" 
            className={location.pathname === '/analysis' ? 'nav-link active' : 'nav-link'}
          >
            <Activity size={18} />
            analysis
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
