import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation()
  
  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Anvaya CRM</h2>
        <p>Lead Management</p>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/" className={`nav-item ${isActive('/')}`}>
          <span className="icon">🏠</span>
          <span>Dashboard</span>
        </Link>
        
        <Link to="/leads" className={`nav-item ${isActive('/leads')}`}>
          <span className="icon">📋</span>
          <span>Leads</span>
        </Link>
        
        <Link to="/agents" className={`nav-item ${isActive('/agents')}`}>
          <span className="icon">👤</span>
          <span>Sales Agents</span>
        </Link>
        
        <Link to="/reports" className={`nav-item ${isActive('/reports')}`}>
          <span className="icon">📊</span>
          <span>Reports</span>
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar