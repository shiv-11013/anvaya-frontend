import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
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

      <div className="sidebar-footer">
        <p className="sidebar-user">{user?.name}</p>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar