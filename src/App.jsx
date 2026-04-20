import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import Budget from './pages/Budget';
import Analytics from './pages/Analytics';
import { FaHome, FaList, FaPlus, FaWallet, FaChartPie } from 'react-icons/fa';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
  { path: '/transactions', label: 'Transactions', icon: <FaList /> },
  { path: '/transactions/new', label: 'Add Transaction', icon: <FaPlus /> },
  { path: '/budget', label: 'Budget', icon: <FaWallet /> },
  { path: '/analytics', label: 'Analytics', icon: <FaChartPie /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div
      style={{
        width: '260px',
        backgroundColor: '#fff',
        borderRight: '1px solid #E8E8E8',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
      }}
    >
      <h2 style={{ margin: '0 0 32px 16px', fontSize: '24px', fontWeight: 700, color: '#3498DB' }}>
        Finance App
      </h2>
      <nav style={{ flex: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                borderRadius: '12px',
                textDecoration: 'none',
                marginBottom: '8px',
                backgroundColor: isActive ? '#EBF5FB' : 'transparent',
                color: isActive ? '#3498DB' : '#666',
                fontWeight: isActive ? 600 : 500,
                transition: 'all 0.2s',
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

const AppLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F7FA' }}>
      <Sidebar />
      <div style={{ marginLeft: '260px', flex: 1 }}>{children}</div>
    </div>
  );
};

function App() {
  return (
    <FinanceProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/new" element={<AddTransaction />} />
            <Route path="/transactions/edit/:id" element={<AddTransaction />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </AppLayout>
      </Router>
    </FinanceProvider>
  );
}

export default App;